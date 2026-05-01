import { useState, useEffect } from 'react'

const links = [
  { href: '#services', label: 'Services' },
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contact', label: 'Contact' },
]

export default function Nav() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setSolid(window.scrollY > 60)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const close = () => setOpen(false)

  return (
    <>
      <nav className={`nav ${solid || open ? 'nav-solid' : 'nav-transparent'}`}>
        <div className="container">
          <div className="nav-inner">
            <a href="#home" className="nav-logo" onClick={close}>SLO Drone<span> Spray</span></a>

            <ul className="nav-links">
              {links.map(l => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}
            </ul>

            <div className="nav-ctas">
              <a href="tel:0000000000" className="nav-phone">(000) 000-0000</a>
              <a href="#contact" className="btn btn-primary">Get a Quote</a>
            </div>

            <button className="nav-hamburger" onClick={() => setOpen(o => !o)} aria-label="Menu">
              <span className={`ham-line ${open ? 'open' : ''}`} />
              <span className={`ham-line ${open ? 'open' : ''}`} />
              <span className={`ham-line ${open ? 'open' : ''}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="nav-drawer">
          <ul className="nav-drawer-links">
            {links.map(l => (
              <li key={l.href}>
                <a href={l.href} onClick={close}>{l.label}</a>
              </li>
            ))}
          </ul>
          <a href="#contact" className="btn btn-primary" style={{ margin: '8px 24px 0' }} onClick={close}>
            Get a Quote
          </a>
          <a href="tel:0000000000" className="nav-drawer-phone">(000) 000-0000</a>
        </div>
      )}
    </>
  )
}
