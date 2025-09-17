import CompanyForm from './components/CompanyForm'
import ReceiverForm from './components/ReceiverForm'
import ItemsTable from './components/ItemsTable'
import Summary from './components/Summary'
import { useInvoiceState } from './state'
import './invoice.css'

export default function InvoicePage() {
  const state = useInvoiceState()
  const { invoice } = state

  return (
    <div className="layout invoice-app">
      <aside className="invoice-app__sidebar card">
        <div className="header" style={{padding:'16px'}}>
          <h2 style={{margin:0}}>Factura MX</h2>
          <span className="tag">Demo</span>
        </div>
        <div className="invoice-app__panel">
          <CompanyForm value={invoice.emitter} onChange={state.setEmitter} />
        </div>
        <div className="invoice-app__panel">
          <ReceiverForm value={invoice.receiver} onChange={state.setReceiver} />
        </div>
      </aside>

      <main className="invoice-app__main">
        <div className="card" style={{padding:'16px'}}>
          <ItemsTable items={invoice.items} onAdd={state.addItem} onUpdate={state.updateItem} onRemove={state.removeItem} />
        </div>
        <Summary invoice={invoice} setInvoice={state.setInvoice} />
      </main>
    </div>
  )
}
