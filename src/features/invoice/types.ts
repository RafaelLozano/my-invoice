export type Party = {
  name: string
  rfc: string
  regimen?: string
  usoCfdi?: string
  address?: string
}

export type LineItem = {
  satKey: string  // Clave ProdServ
  description: string
  unitKey: string // Clave Unidad
  qty: number
  unitPrice: number
  ivaRate: number  // e.g. 0, 0.08, 0.16
  exempt?: boolean
}

export type Invoice = {
  series: string
  folio: number
  currency: 'MXN' | 'USD'
  emitter: Party
  receiver: Party
  items: LineItem[]
  dates: { issue: string, due: string }
  payment: { metodo: 'PUE' | 'PPD', forma: string }
  notes?: string
}
