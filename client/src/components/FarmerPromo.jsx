import Gallery from './Gallery.jsx'
import { useContent } from '../lib/useContent.js'

export default function FarmerPromo() {
  const { farmerPromo } = useContent()
  const promoServices = farmerPromo.services
  return (
    <section className="section promo-section" id="free-survey">
      <div className="container">
        <div className="promo-header">
          <div className="promo-badge">Free for Local Farms · Limited Availability</div>
          <h2 className="section-title promo-title">{farmerPromo.headline}</h2>
          <p className="promo-sub">{farmerPromo.sub}</p>
        </div>

        <div className="promo-grid">
          {promoServices.map(s => (
            <div className="promo-card" key={s.title}>
              <div className="promo-card-top">
                <span className="promo-icon">{s.icon}</span>
                <span className="promo-card-label">{s.label}</span>
              </div>
              <h3 className="promo-card-title">{s.title}</h3>
              <p className="promo-card-tagline">{s.tagline}</p>
              <ul className="promo-bullets">
                {s.bullets.map(b => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Gallery embedded />

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
