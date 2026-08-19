import { createHash } from 'node:crypto';
import { mkdtempSync, readFileSync, readdirSync, rmSync, statSync } from 'node:fs';
import { basename, dirname, join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const packageJson = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
const release = process.env.RELEASE_VERSION || `v${packageJson.version}`;
const outputRoot = resolve(root, process.env.RELEASE_OUTPUT_DIR || join('dist', 'releases', release));
const archive = join(outputRoot, `tres-cuerpos-lore-${release}-public.tar.gz`);
const archiveChecksum = `${archive}.sha256`;
const sha256 = path => createHash('sha256').update(readFileSync(path)).digest('hex');
const normalizePath = path => path.split('\\').join('/');
const listFiles = directory => readdirSync(directory, { withFileTypes: true })
  .flatMap(entry => {
    const absolute = join(directory, entry.name);
    return entry.isDirectory() ? listFiles(absolute) : [absolute];
  })
  .sort((a, b) => normalizePath(a).localeCompare(normalizePath(b), 'en'));
const temporary = mkdtempSync(join(tmpdir(), 'tres-cuerpos-release-'));

try {
  const checksumLine = readFileSync(archiveChecksum, 'utf8').trim();
  const [expectedArchiveHash, archiveName] = checksumLine.split(/\s{2,}/);
  if (archiveName !== basename(archive) || sha256(archive) !== expectedArchiveHash) {
    throw new Error('El SHA-256 del archivo público no coincide.');
  }

  execFileSync('tar', ['-xzf', archive, '-C', temporary], { stdio: 'inherit' });
  const metadata = JSON.parse(readFileSync(join(temporary, 'RELEASE_METADATA.json'), 'utf8'));
  if (metadata.release !== release || metadata.license_notice !== 'Las condiciones no cambian: consultar LICENSE.md para CC BY-NC 4.0 y sus excepciones.') {
    throw new Error('La metadata de versión o licencia es inválida.');
  }
  if (readFileSync(join(temporary, 'LICENSE.md'), 'utf8') !== readFileSync(join(root, 'LICENSE.md'), 'utf8')) {
    throw new Error('LICENSE.md cambió dentro del snapshot.');
  }

  const allowedRoots = new Set([
    'site',
    'LICENSE.md',
    'CITATION.cff',
    'PUBLIC_SNAPSHOT_README.txt',
    'RELEASE_METADATA.json',
  ]);
  const manifestLines = readFileSync(join(temporary, 'SHA256SUMS'), 'utf8').trim().split('\n');
  const manifestPaths = [];
  for (const line of manifestLines) {
    const [expected, relativePath] = line.split(/\s{2,}/);
    if (!expected || !relativePath || relativePath.startsWith('/') || relativePath.split('/').includes('..')) {
      throw new Error(`Entrada insegura en SHA256SUMS: ${line}`);
    }
    const rootSegment = relativePath.split('/')[0];
    if (!allowedRoots.has(rootSegment)) throw new Error(`Ruta fuera del snapshot público: ${relativePath}`);
    manifestPaths.push(relativePath);
    const target = resolve(temporary, relativePath);
    if (!target.startsWith(`${temporary}/`) || sha256(target) !== expected) {
      throw new Error(`Falla de integridad: ${relativePath}`);
    }
  }

  const archivedPaths = listFiles(temporary)
    .map(path => normalizePath(path.slice(temporary.length + 1)))
    .filter(path => path !== 'SHA256SUMS');
  if (JSON.stringify(manifestPaths.sort()) !== JSON.stringify(archivedPaths.sort())) {
    throw new Error('SHA256SUMS no describe exactamente todos los archivos del snapshot.');
  }
  if (metadata.files_hashed !== manifestLines.length) {
    throw new Error('RELEASE_METADATA.json no coincide con la cantidad de archivos preservados.');
  }

  const prohibited = execFileSync('tar', ['-tzf', archive], { encoding: 'utf8' })
    .split('\n')
    .filter(Boolean)
    .filter(path => /(^|\/)(\.git|node_modules|scripts|tests|e2e)(\/|$)/.test(path));
  if (prohibited.length) throw new Error(`El snapshot contiene rutas prohibidas: ${prohibited.join(', ')}`);

  process.stdout.write(`Release ${release} verificado: ${manifestLines.length} archivos, ${statSync(archive).size} bytes.\n`);
} finally {
  rmSync(temporary, { recursive: true, force: true });
}
