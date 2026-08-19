import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import test from 'node:test';

const root = resolve('.');
const packageJson = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
const release = `v${packageJson.version}`;
const output = join(root, 'dist', 'releases', release);

test('el snapshot de release es reproducible, verificable y no empaqueta fuentes privadas', () => {
  execFileSync(process.execPath, ['scripts/build-release-archive.mjs'], { cwd: root });
  const firstArchiveHash = readFileSync(join(output, `tres-cuerpos-lore-${release}-public.tar.gz.sha256`), 'utf8');
  execFileSync(process.execPath, ['scripts/build-release-archive.mjs'], { cwd: root });
  const secondArchiveHash = readFileSync(join(output, `tres-cuerpos-lore-${release}-public.tar.gz.sha256`), 'utf8');
  execFileSync(process.execPath, ['scripts/verify-release-archive.mjs'], { cwd: root });

  assert.equal(firstArchiveHash, secondArchiveHash);
  const metadata = JSON.parse(readFileSync(join(output, 'RELEASE_METADATA.json'), 'utf8'));
  assert.equal(metadata.release, release);
  assert.equal(metadata.author, 'Alexandra Bustos Frati, PhD');
  assert.equal(metadata.formal_registration_claimed, false);
  assert.match(metadata.license_notice, /no cambian|no cambia/i);
  assert.match(metadata.source_code_policy, /No private source code/i);
});
