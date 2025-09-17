import type { Invoice } from '../types'
import { computeTotals, toMoney } from '../money'

type Props = { invoice: Invoice, setInvoice: (updater: (v: Invoice) => Invoice) => void }

export default function Summary({ invoice, setInvoice }: Props) {
  const totals = computeTotals(invoice)

  const downloadJSON = () => {
    const blob = new Blob([JSON.stringify(invoice, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = `invoice_${invoice.series}${invoice.folio}.json`
    document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url)
  }

  return (
    <section className="summary">
      <div className="card" style={{padding:'16px'}}>
        <h3 style={{marginTop:0}}>Datos de la factura</h3>
        <div className="form__grid">
          <div className="form__row">
            <label className="label">Serie</label>
            <input className="input" value={invoice.series} onChange={e=>setInvoice(v=>({...v, series: e.target.value}))}/>
          </div>
          <div className="form__row">
            <label className="label">Folio</label>
            <input className="input" type="number" value={invoice.folio} onChange={e=>setInvoice(v=>({...v, folio: Number(e.target.value)}))}/>
          </div>
        </div>
        <div className="form__grid">
          <div className="form__row">
            <label className="label">Fecha de emisión</label>
            <input className="input" type="date" value={invoice.dates.issue} onChange={e=>setInvoice(v=>({...v, dates: {...v.dates, issue: e.target.value}}))}/>
          </div>
          <div className="form__row">
            <label className="label">Fecha de vencimiento</label>
            <input className="input" type="date" value={invoice.dates.due} onChange={e=>setInvoice(v=>({...v, dates: {...v.dates, due: e.target.value}}))}/>
          </div>
        </div>
        <div className="form__grid">
          <div className="form__row">
            <label className="label">Método de pago</label>
            <select className="input" value={invoice.payment.metodo} onChange={e=>setInvoice(v=>({...v, payment: {...v.payment, metodo: e.target.value as any}}))}>
              <option value="PUE">PUE - Pago en una sola exhibición</option>
              <option value="PPD">PPD - Pago en parcialidades</option>
            </select>
          </div>
          <div className="form__row">
            <label className="label">Moneda</label>
            <select className="input" value={invoice.currency} onChange={e=>setInvoice(v=>({...v, currency: e.target.value as any}))}>
              <option value="MXN">MXN</option>
              <option value="USD">USD</option>
            </select>
          </div>
        </div>
        <div className="form__row">
          <label className="label">Notas</label>
          <textarea className="input" rows={3} value={invoice.notes||''} onChange={e=>setInvoice(v=>({...v, notes: e.target.value}))}></textarea>
        </div>
      </div>

      <div className="card summary__totals">
        <h3 style={{marginTop:0}}>Totales</h3>
        <div style={{display:'grid', gap:8}}>
          <div style={{display:'flex', justifyContent:'space-between'}}><span>Subtotal</span><b>{toMoney(totals.subtotal)}</b></div>
          <div style={{display:'flex', justifyContent:'space-between'}}><span>IVA</span><b>{toMoney(totals.iva)}</b></div>
          <div style={{display:'flex', justifyContent:'space-between', fontSize:18}}><span>Total</span><b>{toMoney(totals.total)}</b></div>
        </div>
        <div className="summary__actions" style={{marginTop:12}}>
          <button className="btn" onClick={()=>window.print()}>Descargar PDF</button>
          <button className="btn btn--primary" onClick={downloadJSON}>Descargar JSON</button>
        </div>
      </div>
    </section>
  )
}
