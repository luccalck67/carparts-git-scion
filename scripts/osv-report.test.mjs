import test from 'node:test';
import assert from 'node:assert/strict';
import { verifyReport } from './osv-report.mjs';

const lock = { packages: { '': {}, 'node_modules/express': { version: '5.3.0' } } };
const report = () => ({ results: [{ packages: [{ package: { name: 'express', version: '5.3.0', ecosystem: 'npm' } }] }] });
test('exige cobertura da versao exata do lockfile', () => {
  assert.deepEqual(verifyReport(lock, report()), { expected: 1, scanned: 1, vulnerabilities: 0 });
});
test('bloqueia relatorio vazio ou dependencia ausente', () => {
  assert.throws(() => verifyReport(lock, { results: [] }));
  assert.throws(() => verifyReport(lock, { results: [{ packages: [] }] }));
});
test('bloqueia vulnerabilidade encontrada', () => {
  const data = report();
  data.results[0].packages[0].vulnerabilities = [{ id: 'TEST-FIXTURE' }];
  assert.throws(() => verifyReport(lock, data));
});
test('nao aceita outra versao como cobertura', () => {
  const data = report();
  data.results[0].packages[0].package.version = '1.0.0';
  assert.throws(() => verifyReport(lock, data));
});
