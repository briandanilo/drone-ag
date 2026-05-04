import { useContent } from '../lib/useContent.js'

export default function Hero() {
  const { hero, heroPromoItems, contact } = useContent()
  const promoItems = heroPromoItems
  return (
    <section className="hero" id="home">
      <div className="container">
        <div className="hero-inner">
          <div>
            <div className="hero-label">✈ FAA Licensed &amp; Fully Insured</div>
            <h1>{hero.line1 || 'Precision Drone'}<br /><span>{hero.line2 || 'Ag Spraying'}</span></h1>
            <p className="hero-sub">{hero.sub}</p>
            <div className="hero-actions">
              <a href="#contact" className="btn btn-primary">Get a Quote</a>
              <a href="#services" className="btn btn-outline">Our Services</a>
            </div>
          </div>

          <div className="hero-promo-card">
            <div>
              <span className="hero-promo-free-badge">Free This Season</span>
              <p className="hero-promo-card-title">Free Survey Includes</p>
            </div>
            <div className="hero-promo-items">
              {promoItems.map(item => (
                <div className="hero-promo-item" key={item.title}>
                  <span className="hero-promo-item-icon">{item.icon}</span>
                  <div>
                    <div className="hero-promo-item-title">{item.title}</div>
                    <div className="hero-promo-item-desc">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <a href="#contact" className="btn hero-promo-card-cta">
                Claim Your Free Survey →
              </a>
              <p className="hero-promo-card-note">Available to SLO County farms · While spots last</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
