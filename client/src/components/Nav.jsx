import { useState, useEffect } from 'react'

const links = [
  { href: '#free-survey', label: 'Free Survey', promo: true },
  { href: '#services', label: 'Services' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contact', label: 'Contact' },
]

export default function Nav() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const close = () => setOpen(false)

  return (
    <>
      <nav className={`nav ${solid || open ? 'nav-solid' : 'nav-transparent'}`}>
        <div className="container">
          <div className="nav-inner">
            <a href="#home" className="nav-logo" onClick={close}>
              SLO Drone<span> Spray</span>
            </a>

            <ul className="nav-links">
              {links.map(l => (
                <li key={l.href}>
                  <a href={l.href} className={l.promo ? 'nav-link-promo' : ''}>{l.label}</a>
                </li>
              ))}
            </ul>

            <div className="nav-ctas">
              <a href="tel:0000000000" className="nav-phone">(000) 000-0000</a>
              <a href="#contact" className="btn btn-primary">Get a Quote</a>
            </div>

            <button
              className="nav-burger"
              onClick={() => setOpen(o => !o)}
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              <span className={open ? 'x' : ''} />
              <span className={open ? 'x' : ''} />
              <span className={open ? 'x' : ''} />
            </button>
          </div>
        </div>
      </nav>

      <div className={`nav-drawer ${open ? 'nav-drawer-open' : ''}`}>
        <div className="container">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              className={`nav-drawer-link${l.promo ? ' nav-drawer-link-promo' : ''}`}
              onClick={close}
            >
              {l.label}
            </a>
          ))}
          <a href="#contact" className="btn btn-primary nav-drawer-cta" onClick={close}>
            Get a Quote
          </a>
          <a href="tel:0000000000" className="nav-drawer-phone">(000) 000-0000</a>
        </div>
      </div>
    </>
  )
}
