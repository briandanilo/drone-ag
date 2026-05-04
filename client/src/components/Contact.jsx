import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', acreage: '', cropType: '', message: '' })
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
        setForm({ name: '', email: '', phone: '', acreage: '', cropType: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="section section-alt" id="contact">
      <div className="container">
        <div className="contact-grid">
          <div className="contact-info">
            <div className="section-label">Get in Touch</div>
            <h2 className="section-title">Claim Your Free Survey or Request a Quote</h2>
            <p>Fill out the form and we'll follow up within 24 hours — usually same day.</p>
            <div className="contact-detail">
              <div className="contact-icon">📞</div>
              <div>
                <div className="contact-detail-label">Phone</div>
                <div className="contact-detail-value">(000) 000-0000</div>
              </div>
            </div>
            <div className="contact-detail">
              <div className="contact-icon">✉</div>
              <div>
                <div className="contact-detail-label">Email</div>
                <div className="contact-detail-value">info@yourbusiness.com</div>
              </div>
            </div>
            <div className="contact-detail">
              <div className="contact-icon">📍</div>
              <div>
                <div className="contact-detail-label">Service Area</div>
                <div className="contact-detail-value">Your Region — 250 mile radius</div>
              </div>
            </div>
          </div>

          <form className="form" onSubmit={submit}>
            <div className="form-row">
              <div className="form-group">
                <label>Name</label>
                <input required placeholder="John Smith" value={form.name} onChange={set('name')} />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input placeholder="(000) 000-0000" value={form.phone} onChange={set('phone')} />
              </div>
            </div>
            <div className="form-group">
              <label>Email</label>
              <input required type="email" placeholder="you@email.com" value={form.email} onChange={set('email')} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Acres</label>
                <input required type="number" placeholder="e.g. 120" value={form.acreage} onChange={set('acreage')} />
              </div>
              <div className="form-group">
                <label>Service Type</label>
                <select value={form.cropType} onChange={set('cropType')} required>
                  <option value="">Select…</option>
                  <option>Free Field Analysis (Promo)</option>
                  <option>Crop Spraying</option>
                  <option>Cover Crop Seeding</option>
                  <option>Frost Seeding</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Details (crop type, product, timing, etc.)</label>
              <textarea placeholder="Anything that helps us quote accurately..." value={form.message} onChange={set('message')} />
            </div>

            {status === 'success' && (
              <div className="form-success">Message received. We'll follow up within 24 hours.</div>
            )}
            {status === 'error' && (
              <div className="form-success" style={{ background: 'rgba(239,68,68,0.1)', borderColor: 'rgba(239,68,68,0.3)', color: '#dc2626' }}>
                Something went wrong — please call or email directly.
              </div>
            )}

            <button type="submit" className="btn btn-primary" disabled={status === 'sending'} style={{ alignSelf: 'flex-start', padding: '14px 32px' }}>
              {status === 'sending' ? 'Sending…' : 'Send Request'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
