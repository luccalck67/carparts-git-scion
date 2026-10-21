import test from 'node:test';
import assert from 'node:assert/strict';
import { listParts, findPart, quote } from './catalog.mjs';

test('consulta catalogo ficticio sem compartilhar objetos mutaveis', () => {
  assert.equal(listParts().length, 3);
  assert.equal(findPart('P001').stock, 8);
  const copy = findPart('P001');
  copy.stock = 0;
  assert.equal(findPart('P001').stock, 8);
  assert.equal(findPart('inexistente'), undefined);
});
test('orcamento valida quantidade e respeita estoque', () => {
  assert.equal(quote('P001', 2).total, 251.8);
  for (const qty of [0, -1, 1.5, '2', 9]) assert.throws(() => quote('P001', qty));
  assert.throws(() => quote('P002', 1));
  assert.throws(() => quote('inexistente', 1));
});
