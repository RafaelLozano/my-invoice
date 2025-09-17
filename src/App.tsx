import { useEffect, useRef } from 'react'
import InvoicePage from './features/invoice/InvoicePage'
import { gsap } from 'gsap'

export default function App() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!ref.current) return
    // light enter animation (only once)
    gsap.fromTo(ref.current, { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: .45, ease: 'power2.out' })
  }, [])
  return (
    <div ref={ref}>
      <InvoicePage />
    </div>
  )
}
