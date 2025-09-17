import { useEffect, useState } from 'react'
import type { Invoice, LineItem, Party } from './types'

const KEY = 'mx-invoice-state-v1'

export function useInvoiceState() {
  const [invoice, setInvoice] = useState<Invoice>(() => {
    const raw = localStorage.getItem(KEY)
    if (raw) return JSON.parse(raw)
    return {
      series: 'A', folio: 1, currency: 'MXN',
      emitter: { name: '', rfc: '', regimen: '601', address: '' },
      receiver: { name: '', rfc: '', usoCfdi: 'G03', address: '' },
      items: [],
      dates: { issue: new Date().toISOString().slice(0,10), due: '' },
      payment: { metodo: 'PUE', forma: '03' }, // Transferencia
      notes: ''
    }
  })

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(invoice))
  }, [invoice])

  const addItem = (it: LineItem) => setInvoice(v => ({ ...v, items: [...v.items, it] }))
  const updateItem = (idx: number, patch: Partial<LineItem>) =>
    setInvoice(v => ({ ...v, items: v.items.map((it, i) => i === idx ? { ...it, ...patch } : it) }))
  const removeItem = (idx: number) => setInvoice(v => ({ ...v, items: v.items.filter((_, i) => i !== idx) }))

  const setEmitter = (p: Party) => setInvoice(v => ({ ...v, emitter: p }))
  const setReceiver = (p: Party) => setInvoice(v => ({ ...v, receiver: p }))

  return { invoice, setInvoice, addItem, updateItem, removeItem, setEmitter, setReceiver }
}
