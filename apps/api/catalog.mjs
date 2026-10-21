const parts = [
  { id: 'P001', name: 'Filtro de oleo', price: 125.9, stock: 8 },
  { id: 'P002', name: 'Pastilha de freio', price: 249.5, stock: 0 },
  { id: 'P003', name: 'Vela de ignicao', price: 49.9, stock: 20 }
];

export function listParts() {
  return parts.map(part => ({ ...part }));
}

export function findPart(id) {
  const part = parts.find(item => item.id === id);
  return part ? { ...part } : undefined;
}

export function quote(id, quantity) {
  const part = findPart(id);
  if (!part) throw new RangeError('Peca nao encontrada');
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > part.stock) {
    throw new RangeError('Quantidade invalida ou estoque insuficiente');
  }
  return { id, quantity, total: Math.round(part.price * quantity * 100) / 100 };
}
