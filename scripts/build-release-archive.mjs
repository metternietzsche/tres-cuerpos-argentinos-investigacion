import { createHash } from 'node:crypto';
import {
  copyFileSync,
  cpSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { basename, dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync, spawnSync } from 'node:child_process';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const packageJson = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
const release = process.env.RELEASE_VERSION || `v${packageJson.version}`;
const expectedRelease = `v${packageJson.version}`;

if (release !== expectedRelease) {
  throw new Error(`RELEASE_VERSION=${release} no coincide con package.json (${expectedRelease}).`);
}

const git = (...args) => execFileSync('git', args, { cwd: root, encoding: 'utf8' }).trim();
const sha256 = path => createHash('sha256').update(readFileSync(path)).digest('hex');
const normalizePath = path => path.split('\\').join('/');
const listFiles = directory => readdirSync(directory, { withFileTypes: true })
  .flatMap(entry => {
    const absolute = join(directory, entry.name);
    return entry.isDirectory() ? listFiles(absolute) : [absolute];
  })
  .sort((a, b) => normalizePath(a).localeCompare(normalizePath(b), 'en'));

const commit = process.env.RELEASE_COMMIT || git('rev-parse', 'HEAD');
const commitEpoch = Number(process.env.SOURCE_DATE_EPOCH || git('show', '-s', '--format=%ct', commit));
const commitDate = new Date(commitEpoch * 1000).toISOString();
const tagExists = git('tag', '--list', release) === release;
const tagType = tagExists ? git('cat-file', '-t', release) : null;
const tagTarget = tagType === 'tag' ? git('rev-list', '-n', '1', release) : null;
const tagObject = tagType === 'tag' ? git('rev-parse', release) : null;
const tagSigned = tagType === 'tag'
  ? spawnSync('git', ['verify-tag', release], { cwd: root, stdio: 'ignore' }).status === 0
  : null;
const workingTreeDirty = git('status', '--porcelain').length > 0;

if (process.env.GITHUB_REF_TYPE === 'tag' && tagType !== 'tag') {
  throw new Error(`${release} debe ser un tag anotado antes de publicar el release.`);
}
if (process.env.GITHUB_REF_TYPE === 'tag' && workingTreeDirty) {
  throw new Error('El workflow de release debe ejecutarse sobre un árbol limpio.');
}
if (tagTarget && tagTarget !== commit) {
  throw new Error(`${release} apunta a ${tagTarget}, pero el build usa ${commit}.`);
}

const outputRoot = resolve(root, process.env.RELEASE_OUTPUT_DIR || join('dist', 'releases', release));
const snapshotRoot = join(outputRoot, 'snapshot');
const siteRoot = join(snapshotRoot, 'site');
rmSync(outputRoot, { recursive: true, force: true });
mkdirSync(snapshotRoot, { recursive: true });
cpSync(join(root, 'web', 'static_prototype'), siteRoot, { recursive: true });
copyFileSync(join(root, 'LICENSE.md'), join(snapshotRoot, 'LICENSE.md'));
copyFileSync(join(root, 'CITATION.cff'), join(snapshotRoot, 'CITATION.cff'));

writeFileSync(join(snapshotRoot, 'PUBLIC_SNAPSHOT_README.txt'), [
  'EL PROBLEMA DE LOS TRES CUERPOS ARGENTINOS',
  `Snapshot público ${release}`,
  '',
  'Este archivo conserva exactamente los materiales ya servidos por el sitio público.',
  'No incorpora el repositorio privado ni el código fuente del videojuego.',
  'LICENSE.md conserva las licencias y excepciones vigentes; este release no las modifica.',
  'SHA256SUMS permite verificar la integridad de cada archivo incluido.',
  '',
  'Sitio canónico: https://lore.trescuerpos.arcagaucha.com/',
  'Repositorio: https://github.com/metternietzsche/tres-cuerpos-argentinos-investigacion',
  '',
].join('\n'));

const preliminaryFiles = listFiles(snapshotRoot);
const metadata = {
  schema: 'ARCA_GAUCHA_PUBLICATION_PROVENANCE_v1',
  release,
  title: 'El problema de los tres cuerpos argentinos: una lectura orbital del presidencialismo argentino',
  author: 'Alexandra Bustos Frati, PhD',
  copyright: 'Copyright © 2026 Alexandra Bustos Frati',
  license_notice: 'Las condiciones no cambian: consultar LICENSE.md para CC BY-NC 4.0 y sus excepciones.',
  canonical_url: 'https://lore.trescuerpos.arcagaucha.com/',
  repository_url: 'https://github.com/metternietzsche/tres-cuerpos-argentinos-investigacion',
  commit_sha: commit,
  commit_date: commitDate,
  tag: release,
  tag_kind: tagType === 'tag' ? 'annotated' : 'unresolved_before_tagging',
  tag_object_sha: tagObject,
  tag_signature: tagSigned === null ? 'unresolved_before_tagging' : (tagSigned ? 'verified' : 'not_present'),
  working_tree_dirty: workingTreeDirty,
  map_version: 'v0.4',
  whitepaper_version: 'v0.4',
  snapshot_scope: 'web/static_prototype plus the existing license and citation metadata',
  source_code_policy: 'No private source code is included. The snapshot contains only files already published by the Lore site.',
  internet_archive_role: 'Supplementary public corroboration only; not a copyright registry.',
  formal_registration_claimed: false,
  files_hashed: preliminaryFiles.length + 1,
  sha256_manifest: 'SHA256SUMS',
};
writeFileSync(join(snapshotRoot, 'RELEASE_METADATA.json'), `${JSON.stringify(metadata, null, 2)}\n`);

const hashedFiles = listFiles(snapshotRoot).filter(path => basename(path) !== 'SHA256SUMS');
const manifest = hashedFiles
  .map(path => `${sha256(path)}  ${normalizePath(relative(snapshotRoot, path))}`)
  .join('\n');
writeFileSync(join(snapshotRoot, 'SHA256SUMS'), `${manifest}\n`);

const archiveBase = `tres-cuerpos-lore-${release}-public.tar`;
const archiveTar = join(outputRoot, archiveBase);
execFileSync('tar', [
  '--sort=name',
  `--mtime=@${commitEpoch}`,
  '--owner=0',
  '--group=0',
  '--numeric-owner',
  '--format=posix',
  '--pax-option=delete=atime,delete=ctime',
  '-cf', archiveTar,
  '-C', snapshotRoot,
  '.',
], { cwd: root, stdio: 'inherit' });
execFileSync('gzip', ['-n', '-f', archiveTar], { cwd: root, stdio: 'inherit' });

const archive = `${archiveTar}.gz`;
const archiveDigest = sha256(archive);
writeFileSync(`${archive}.sha256`, `${archiveDigest}  ${basename(archive)}\n`);
copyFileSync(join(snapshotRoot, 'RELEASE_METADATA.json'), join(outputRoot, 'RELEASE_METADATA.json'));
copyFileSync(join(snapshotRoot, 'SHA256SUMS'), join(outputRoot, 'SHA256SUMS'));

const summary = {
  release,
  commit,
  archive: relative(root, archive),
  archive_sha256: archiveDigest,
  files: hashedFiles.length,
  bytes: statSync(archive).size,
};
process.stdout.write(`${JSON.stringify(summary, null, 2)}\n`);
