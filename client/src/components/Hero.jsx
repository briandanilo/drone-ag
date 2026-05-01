import QuoteCalculator from './QuoteCalculator.jsx'

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="container">
        <div className="hero-inner">
          <div>
            <div className="hero-label">✈ FAA Licensed &amp; Fully Insured</div>
            <h1>Precision Drone<br /><span>Ag Spraying</span></h1>
            <p className="hero-sub">
              Serving San Luis Obispo County vineyards, row crops, and orchards.
              Same-week scheduling. Zero soil compaction.
            </p>
            <div className="hero-actions">
              <a href="#contact" className="btn btn-primary">Get a Quote</a>
              <a href="#services" className="btn btn-outline">Our Services</a>
            </div>
            <div className="hero-badges">
              <div className="badge">
                <div className="badge-icon">✓</div>
                FAA Part 107
              </div>
              <div className="badge">
                <div className="badge-icon">✓</div>
                Fully Insured
              </div>
              <div className="badge">
                <div className="badge-icon">✓</div>
                CA Applicator Cert
              </div>
              <div className="badge">
                <div className="badge-icon">✓</div>
                Same-Week Service
              </div>
            </div>
          </div>
          <QuoteCalculator />
        </div>
      </div>
    </section>
  )
}
