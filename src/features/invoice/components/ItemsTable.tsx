import { PROD_SERV, UNIDADES } from '../sat-catalogs'
import type { LineItem } from '../types'
import { useState } from 'react'
import { toMoney } from '../money'

type Props = {
  items: LineItem[]
  onAdd: (it: LineItem) => void
  onUpdate: (idx: number, patch: Partial<LineItem>) => void
  onRemove: (idx: number) => void
}

export default function ItemsTable({ items, onAdd, onUpdate, onRemove }: Props) {
  const [draft, setDraft] = useState<LineItem>({
    satKey: '', description: '', unitKey: 'E48', qty: 1, unitPrice: 0, ivaRate: 0.16
  })

  const add = () => {
    if (!draft.description) return
    onAdd(draft)
    setDraft({ satKey: '', description: '', unitKey: 'E48', qty: 1, unitPrice: 0, ivaRate: 0.16 })
  }

  const filteredProd = (q: string) => PROD_SERV.filter(p => (p.code + p.name).toLowerCase().includes(q.toLowerCase())).slice(0, 50)

  return (
    <div className="items">
      <div className="items__toolbar">
        <h3 style={{margin:0}}>Conceptos</h3>
        <button className="btn btn--primary" onClick={add}>Agregar concepto</button>
      </div>

      <div className="items__table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th style={{width: '14rem'}}>Clave SAT</th>
              <th>Descripción</th>
              <th>Unidad</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>IVA</th>
              <th className="table__actions">Importe</th>
            </tr>
          </thead>
          <tbody>
            {items.map((it, i) => (
              <tr key={i}>
                <td><input className="input" value={it.satKey} onChange={e=>onUpdate(i, { satKey: e.target.value })}/></td>
                <td><input className="input" value={it.description} onChange={e=>onUpdate(i, { description: e.target.value })}/></td>
                <td>
                  <select className="input" value={it.unitKey} onChange={e=>onUpdate(i, { unitKey: e.target.value })}>
                    {UNIDADES.map(u => <option key={u.code} value={u.code}>{u.code} - {u.name}</option>)}
                  </select>
                </td>
                <td><input className="input" type="number" min={0} step="0.01" value={it.qty} onChange={e=>onUpdate(i, { qty: Number(e.target.value) })}/></td>
                <td><input className="input" type="number" min={0} step="0.01" value={it.unitPrice} onChange={e=>onUpdate(i, { unitPrice: Number(e.target.value) })}/></td>
                <td>
                  <select className="input" value={it.exempt ? 'EXE' : String(it.ivaRate)} onChange={e=>{
                    const v = e.target.value
                    if (v === 'EXE') onUpdate(i, { exempt: true, ivaRate: 0 })
                    else onUpdate(i, { exempt: false, ivaRate: Number(v) })
                  }}>
                    <option value="0">0%</option>
                    <option value="0.08">8%</option>
                    <option value="0.16">16%</option>
                    <option value="EXE">Exento</option>
                  </select>
                </td>
                <td className="table__actions">
                  {toMoney(it.qty * it.unitPrice * (1 + (it.exempt ? 0 : it.ivaRate)))}
                  <button className="btn btn--danger" style={{marginLeft:8}} onClick={()=>onRemove(i)}>Eliminar</button>
                </td>
              </tr>
            ))}
            <tr>
              <td>
                <input className="input" placeholder="Buscar SAT..." value={draft.satKey}
                  onChange={e=>setDraft(d=>({...d, satKey: e.target.value}))} list="sat-keys" />
                <datalist id="sat-keys">
                  {filteredProd(draft.satKey).map(p => <option key={p.code} value={p.code}>{p.name}</option>)}
                </datalist>
              </td>
              <td><input className="input" placeholder="Descripción" value={draft.description} onChange={e=>setDraft(d=>({...d, description: e.target.value}))}/></td>
              <td>
                <select className="input" value={draft.unitKey} onChange={e=>setDraft(d=>({...d, unitKey: e.target.value}))}>
                  {UNIDADES.map(u => <option key={u.code} value={u.code}>{u.code} - {u.name}</option>)}
                </select>
              </td>
              <td><input className="input" type="number" min={0} step="0.01" value={draft.qty} onChange={e=>setDraft(d=>({...d, qty: Number(e.target.value)}))}/></td>
              <td><input className="input" type="number" min={0} step="0.01" value={draft.unitPrice} onChange={e=>setDraft(d=>({...d, unitPrice: Number(e.target.value)}))}/></td>
              <td>
                <select className="input" value={String(draft.ivaRate)} onChange={e=>setDraft(d=>({...d, ivaRate: Number(e.target.value)}))}>
                  <option value="0">0%</option>
                  <option value="0.08">8%</option>
                  <option value="0.16">16%</option>
                </select>
              </td>
              <td className="table__actions"><em className="label">{toMoney(draft.qty * draft.unitPrice * (1 + draft.ivaRate))}</em></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
