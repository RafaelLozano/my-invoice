import { USO_CFDI } from '../sat-catalogs'
import type { Party } from '../types'

type Props = { value: Party, onChange: (p: Party) => void }

export default function ReceiverForm({ value, onChange }: Props) {
  return (
    <div className="form">
      <h3 style={{margin:'4px 0 8px'}}>Receptor</h3>
      <div className="form__row">
        <label className="label">Nombre</label>
        <input className="input" value={value.name} onChange={e=>onChange({...value, name: e.target.value})}/>
      </div>
      <div className="form__grid">
        <div className="form__row">
          <label className="label">RFC</label>
          <input className="input" value={value.rfc} onChange={e=>onChange({...value, rfc: e.target.value.toUpperCase()})}/>
        </div>
        <div className="form__row">
          <label className="label">Uso CFDI</label>
          <select className="input" value={value.usoCfdi ?? 'G03'} onChange={e=>onChange({...value, usoCfdi: e.target.value})}>
            {USO_CFDI.map(u => <option key={u.code} value={u.code}>{u.code} - {u.name}</option>)}
          </select>
        </div>
      </div>
      <div className="form__row">
        <label className="label">Dirección</label>
        <input className="input" value={value.address||''} onChange={e=>onChange({...value, address: e.target.value})}/>
      </div>
    </div>
  )
}
