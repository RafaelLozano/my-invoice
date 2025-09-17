import type { Invoice } from './types'

export function toMoney(n: number) {
  return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 2 }).format(n || 0)
}

export function computeTotals(inv: Invoice) {
  const subtotal = inv.items.reduce((acc, it) => acc + it.qty * it.unitPrice, 0)
  const iva = inv.items.reduce((acc, it) => acc + (it.exempt ? 0 : (it.qty * it.unitPrice * (it.ivaRate || 0))), 0)
  const total = subtotal + iva
  return { subtotal, iva, total }
}
