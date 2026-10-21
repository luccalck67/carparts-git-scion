import test from 'node:test';
import assert from 'node:assert/strict';
import { catalogCards } from './catalog.mjs';

test('monta dados do portal usando biblioteca compartilhada', () => {
  const cards = catalogCards([{ id: 'P001', name: 'Filtro', price: 125.9, stock: 8 }]);
  assert.deepEqual(cards, [{ id: 'P001', name: 'Filtro', price: 'R$ 125,90', stock: '8 unidades' }]);
});
test('aceita catalogo vazio e rejeita entrada invalida', () => {
  assert.deepEqual(catalogCards([]), []);
  assert.throws(() => catalogCards(null));
});
