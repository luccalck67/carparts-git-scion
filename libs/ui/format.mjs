export function formatPrice(value) {
  if (typeof value !== 'number' || !Number.isFinite(value) || value < 0) {
    throw new TypeError('Preco deve ser um numero finito nao negativo');
  }
  return `R$ ${value.toFixed(2).replace('.', ',')}`;
}

export function stockLabel(stock) {
  if (!Number.isInteger(stock) || stock < 0) throw new TypeError('Estoque invalido');
  return stock === 0 ? 'Indisponivel' : `${stock} unidades`;
}
