import { useState, useEffect } from 'react'

export default function Nav() {
  const [solid, setSolid] = useState(false)

  useEffect(() => {
    const handler = () => setSolid(window.scrollY > 60)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav className={`nav ${solid ? 'nav-solid' : 'nav-transparent'}`}>
      <div className="container">
        <div className="nav-inner">
          <a href="#home" className="nav-logo">SLO Drone<span> Spray</span></a>
          <ul className="nav-links">
            <li><a href="#services">Services</a></li>
            <li><a href="#how-it-works">How It Works</a></li>
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <div className="nav-ctas">
            <a href="tel:0000000000" className="nav-phone">(000) 000-0000</a>
            <a href="#contact" className="btn btn-primary">Get a Quote</a>
          </div>
        </div>
      </div>
    </nav>
  )
}
