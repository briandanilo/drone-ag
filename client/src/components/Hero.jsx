const promoItems = [
  {
    icon: '◈',
    title: 'Field Health Map',
    desc: 'Spots disease, pest pressure & nutrient gaps weeks before they\'re visible on foot',
  },
  {
    icon: '◉',
    title: 'Terrain & Drainage Map',
    desc: 'Shows where water pools, runs off, or bypasses crops so you can fix it',
  },
  {
    icon: '◎',
    title: 'Thermal Irrigation Check',
    desc: 'Finds dry zones and failing emitters before they cost you yield',
  },
]

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="container">
        <div className="hero-inner">
          <div>
            <div className="hero-label hero-promo-label">
              <span className="hero-label-dot" />
              Free for SLO County Farms &nbsp;·&nbsp; Limited Availability
            </div>
            <h1>Free Aerial Field<br />Analysis for <span>Local Farms</span></h1>
            <p className="hero-sub">
              We're SLO Drone Spray — FAA licensed, fully insured, and based right here in the county.
              This season, we're surveying select local farms at no charge: three deliverables that
              help you catch problems early and farm smarter.
            </p>
            <div className="hero-actions">
              <a href="#contact" className="btn btn-primary">Claim Your Free Survey</a>
              <a href="#services" className="btn btn-outline">View Paid Services</a>
            </div>
            <div className="hero-badges">
              <div className="badge"><div className="badge-icon">✓</div>FAA Part 107</div>
              <div className="badge"><div className="badge-icon">✓</div>Fully Insured</div>
              <div className="badge"><div className="badge-icon">✓</div>CA Applicator Cert</div>
              <div className="badge"><div className="badge-icon">✓</div>Same-Week Service</div>
            </div>
          </div>

          <div className="hero-promo-card">
            <div>
              <span className="hero-promo-free-badge">Free This Season</span>
              <p className="hero-promo-card-title">What's included in your survey</p>
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
