import { useContent } from '../lib/useContent.js'

export default function Services() {
  const { services } = useContent()
  return (
    <section className="section" id="services">
      <div className="container">
        <div className="section-header">
          <div className="section-label">What We Do</div>
          <h2 className="section-title">Drone Services Built for Ag</h2>
          <p className="section-sub">
            Vineyards, berries, avocados, row crops, rangeland — if it grows in SLO County, we can spray it.
          </p>
        </div>
        <div className="services-grid">
          {services.map(s => (
            <div className="service-card" key={s.num}>
              <div className="service-card-body">
                {s.icon && <div className="service-icon">{s.icon}</div>}
                <h3>{s.title}</h3>
                <p className="service-tagline">{s.tagline}</p>
                <ul className="service-bullets">
                  {s.bullets.map(b => <li key={b}>{b}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
