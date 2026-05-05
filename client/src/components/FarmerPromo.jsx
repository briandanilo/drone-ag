import { useState } from 'react'
import { useContent } from '../lib/useContent.js'

const serviceImages = [
  { src: '/gallery/crop-health.jpg',        alt: 'Aerial drone view of agricultural fields showing crop variation' },
  { src: '/gallery/irrigation-planning.jpg',alt: 'Aerial view of irrigated agricultural fields' },
  { src: '/gallery/water-stress.png',       alt: 'Drone thermal scan showing crop water stress' },
]

export default function FarmerPromo() {
  const { farmerPromo } = useContent()
  const promoServices = farmerPromo.services
  const [active, setActive] = useState(0)
  const s = promoServices[active]
  const img = serviceImages[active] ?? serviceImages[0]

  return (
    <section className="section promo-section" id="free-survey">
      <div className="container">
        <div className="promo-header">
          <div className="promo-badge">Free for Local Farms · Limited Availability</div>
          <h2 className="section-title promo-title">{farmerPromo.headline}</h2>
          <p className="promo-sub">{farmerPromo.sub}</p>
        </div>

        <div className="promo-tabs">
          {promoServices.map((ps, i) => (
            <button
              key={ps.label}
              className={`promo-tab${i === active ? ' active' : ''}`}
              onClick={() => setActive(i)}
            >
              <span className="promo-tab-icon">{ps.icon}</span>
              {ps.label}
            </button>
          ))}
        </div>

        <div className="promo-panel">
          <div className="promo-panel-img-wrap">
            <img src={img.src} alt={img.alt} className="promo-panel-img" />
          </div>
          <div className="promo-panel-content">
            <div className="promo-card-top">
              <span className="promo-icon">{s.icon}</span>
              <span className="promo-card-label">{s.label}</span>
            </div>
            <h3 className="promo-card-title">{s.title}</h3>
            <p className="promo-card-tagline">{s.tagline}</p>
            <ul className="promo-bullets">
              {s.bullets.map(b => <li key={b}>{b}</li>)}
            </ul>
          </div>
        </div>

        <div className="promo-cta-row">
          <a href="#contact" className="btn btn-primary promo-cta-btn">
            Claim Your Free Survey
          </a>
          <p className="promo-cta-note">{farmerPromo.ctaNote}</p>
        </div>
      </div>
    </section>
  )
}
