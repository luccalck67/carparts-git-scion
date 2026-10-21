import { formatPrice, stockLabel } from '../../libs/ui/format.mjs';

export function catalogCards(parts) {
  if (!Array.isArray(parts)) throw new TypeError('Catalogo deve ser uma lista');
  return parts.map(({ id, name, price, stock }) => ({
    id, name, price: formatPrice(price), stock: stockLabel(stock)
  }));
}
