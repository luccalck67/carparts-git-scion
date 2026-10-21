import test from 'node:test';
import assert from 'node:assert/strict';
import { formatPrice, stockLabel } from './format.mjs';

test('formata reais com duas casas', () => {
  assert.equal(formatPrice(125.9), 'R$ 125,90');
  assert.equal(formatPrice(0), 'R$ 0,00');
});
test('recusa preco negativo ou nao numerico', () => {
  for (const value of [-1, NaN, Infinity, '12']) assert.throws(() => formatPrice(value));
});
test('distingue disponibilidade e valida estoque', () => {
  assert.equal(stockLabel(0), 'Indisponivel');
  assert.equal(stockLabel(8), '8 unidades');
  for (const value of [-1, 1.5, '8']) assert.throws(() => stockLabel(value));
});
