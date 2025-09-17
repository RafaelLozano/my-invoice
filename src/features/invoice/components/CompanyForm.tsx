import { REGIMEN } from '../sat-catalogs'
import type { Party } from '../types'

type Props = { value: Party, onChange: (p: Party) => void }

export default function CompanyForm({ value, onChange }: Props) {
  return (
    <div className="form">
      <h3 style={{margin:'4px 0 8px'}}>Emisor</h3>
      <div className="form__row">
        <label className="label">Nombre/Razón Social</label>
        <input className="input" value={value.name} onChange={e=>onChange({...value, name: e.target.value})}/>
      </div>
      <div className="form__grid">
        <div className="form__row">
          <label className="label">RFC</label>
          <input className="input" value={value.rfc} onChange={e=>onChange({...value, rfc: e.target.value.toUpperCase()})}/>
        </div>
        <div className="form__row">
          <label className="label">Régimen Fiscal</label>
          <select className="input" value={value.regimen ?? '601'} onChange={e=>onChange({...value, regimen: e.target.value})}>
            {REGIMEN.map(r => <option key={r.code} value={r.code}>{r.code} - {r.name}</option>)}
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
