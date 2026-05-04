import { useState } from 'react'

const services = [
  {
    icon: '◈',
    title: 'Field Health Map',
    desc: 'High-res aerial mosaic of your entire field. Spots disease, pest pressure, and nutrient gaps weeks before they\'re visible on foot — with GPS-tagged problem zones you can walk straight to.',
  },
  {
    icon: '◉',
    title: 'Terrain & Drainage Map',
    desc: 'Precise elevation model showing where water pools, runs off too fast, or bypasses crops entirely. Guides irrigation layout, tile drain placement, and planting configuration.',
  },
  {
    icon: '◎',
    title: 'Thermal Irrigation Check',
    desc: 'Thermal imaging reveals heat-stressed zones and finds clogged emitters or failing irrigation sectors — often days before any visible wilting.',
  },
]

const badges = ['FAA Part 107 Licensed', 'Fully Insured', 'CA Pesticide Applicator', 'Based in SLO County']

function PromoForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', acreage: '', cropType: 'Free Field Analysis (Promo)', message: '' })
  const [status, setStatus] = useState(null)

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const submit = async e => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="promo-lp-success">
        <div className="promo-lp-success-icon">✓</div>
        <h3>You're on the list.</h3>
        <p>We'll reach out within 24 hours to schedule your survey. Check your email — it'll come from brian@slodronespray.com.</p>
      </div>
    )
  }

  return (
    <form className="promo-lp-form" onSubmit={submit}>
      <div className="form-row">
        <div className="form-group">
          <label>Your Name</label>
          <input required placeholder="John Smith" value={form.name} onChange={set('name')} />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input required placeholder="(805) 555-0100" value={form.phone} onChange={set('phone')} />
        </div>
      </div>
      <div className="form-group">
        <label>Email</label>
        <input required type="email" placeholder="you@email.com" value={form.email} onChange={set('email')} />
      </div>
      <div className="form-group">
        <label>Approximate Acreage</label>
        <input required type="number" placeholder="e.g. 120" value={form.acreage} onChange={set('acreage')} />
      </div>
      <div className="form-group">
        <label>Crop / Operation Type</label>
        <input placeholder="e.g. Vineyard, row crops, orchard…" value={form.message} onChange={set('message')} />
      </div>

      {status === 'error' && (
        <div className="promo-lp-error">Something went wrong — call us at (512) 202-8302 or email brian@slodronespray.com.</div>
      )}

      <button type="submit" className="btn promo-lp-submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Claim My Free Survey →'}
      </button>
      <p className="promo-lp-form-note">No cost, no commitment. We'll confirm your spot within 24 hours.</p>
    </form>
  )
}

export default function PromoLanding() {
  return (
    <div className="promo-lp">
      {/* Header */}
      <header className="promo-lp-header">
        <a href="/" className="promo-lp-logo">SLO Drone<span> Spray</span></a>
        <a href="tel:5122028302" className="promo-lp-phone">(512) 202-8302</a>
      </header>

      {/* Hero */}
      <section className="promo-lp-hero">
        <div className="promo-lp-hero-inner">
          <div className="promo-lp-hero-content">
            <div className="promo-lp-eyebrow">
              <span className="promo-lp-dot" />
              Free for SLO County Farms · Limited Availability
            </div>
            <h1>See Every Problem on Your Farm Before It Costs You</h1>
            <p className="promo-lp-hero-sub">
              We're SLO Drone Spray — FAA licensed, fully insured, and based right here in the county. This season we're offering a complimentary three-part drone survey to select local farms. No strings attached.
            </p>
            <div className="promo-lp-badges">
              {badges.map(b => (
                <span key={b} className="promo-lp-badge">✓ {b}</span>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="promo-lp-form-card">
            <div className="promo-lp-form-header">
              <span className="promo-lp-free-tag">Free This Season</span>
              <h2>Claim Your Free Survey</h2>
              <p>Fill in your details and we'll schedule around your operation.</p>
            </div>
            <PromoForm />
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="promo-lp-services">
        <div className="promo-lp-container">
          <div className="promo-lp-section-header">
            <h2>Three Deliverables. Zero Cost.</h2>
            <p>Every survey includes all three — a complete picture of your field's health, terrain, and irrigation.</p>
          </div>
          <div className="promo-lp-services-grid">
            {services.map(s => (
              <div key={s.title} className="promo-lp-service-card">
                <span className="promo-lp-service-icon">{s.icon}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="promo-lp-why">
        <div className="promo-lp-container promo-lp-why-inner">
          <div>
            <h2>Why are we doing this for free?</h2>
            <p>We're new to the county and want to show local farmers what precision drone imaging can actually do — not with a brochure, but with real data from your fields. If you find it useful, we hope you'll think of us when it's time for spraying or seeding. If not, no hard feelings.</p>
            <p style={{ marginTop: 16 }}>We're limiting this to a small number of farms so we can do each one properly. Once spots are gone, they're gone.</p>
          </div>
          <div className="promo-lp-stats">
            <div className="promo-lp-stat"><span>300+</span>acres mapped per hour</div>
            <div className="promo-lp-stat"><span>3</span>deliverables per survey</div>
            <div className="promo-lp-stat"><span>$0</span>cost to you</div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="promo-lp-bottom-cta">
        <div className="promo-lp-container" style={{ textAlign: 'center' }}>
          <h2>Ready to see your field from above?</h2>
          <p>Scroll up to claim your spot, or call us directly.</p>
          <a href="tel:5122028302" className="btn promo-lp-submit" style={{ marginTop: 24, display: 'inline-flex' }}>
            Call (512) 202-8302
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="promo-lp-footer">
        <span>© 2026 SLO Drone Spray · San Luis Obispo County</span>
        <a href="/">Back to main site</a>
      </footer>
    </div>
  )
}
