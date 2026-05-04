import { useState, useEffect } from 'react'
import { invalidateContent, defaults } from '../lib/useContent.js'

const ADMIN_PASSWORD = 'slo2026'

// ── Field components ─────────────────────────────────────────────────────────

function Field({ label, value, onChange, multiline = false, hint }) {
  return (
    <div className="admin-field">
      <label className="admin-label">{label}</label>
      {hint && <p className="admin-hint">{hint}</p>}
      {multiline
        ? <textarea className="admin-input admin-textarea" value={value || ''} onChange={e => onChange(e.target.value)} rows={3} />
        : <input className="admin-input" value={value || ''} onChange={e => onChange(e.target.value)} />
      }
    </div>
  )
}

function BulletsField({ label, value, onChange }) {
  return (
    <div className="admin-field">
      <label className="admin-label">{label}</label>
      <p className="admin-hint">One bullet per line</p>
      <textarea
        className="admin-input admin-textarea"
        value={(value || []).join('\n')}
        onChange={e => onChange(e.target.value.split('\n'))}
        rows={4}
      />
    </div>
  )
}

function Section({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="admin-section">
      <button className="admin-section-toggle" onClick={() => setOpen(o => !o)}>
        <span>{title}</span>
        <span className="admin-section-chevron">{open ? '▲' : '▼'}</span>
      </button>
      {open && <div className="admin-section-body">{children}</div>}
    </div>
  )
}

function CardList({ items, onChange, renderCard, onAdd, addLabel }) {
  return (
    <div className="admin-card-list">
      {items.map((item, i) => (
        <div key={i} className="admin-card-item">
          <div className="admin-card-item-header">
            <span>#{i + 1}</span>
            <button className="admin-remove-btn" onClick={() => onChange(items.filter((_, j) => j !== i))}>Remove</button>
          </div>
          {renderCard(item, newItem => {
            const next = [...items]; next[i] = newItem; onChange(next)
          })}
        </div>
      ))}
      {onAdd && (
        <button className="admin-add-btn" onClick={onAdd}>{addLabel || '+ Add'}</button>
      )}
    </div>
  )
}

// ── Main admin ────────────────────────────────────────────────────────────────

export default function Admin() {
  const [authed, setAuthed] = useState(false)
  const [pw, setPw] = useState('')
  const [pwError, setPwError] = useState(false)
  const [content, setContent] = useState(null)
  const [status, setStatus] = useState(null)

  useEffect(() => {
    if (!authed) return
    fetch('/api/content')
      .then(r => { if (!r.ok) throw new Error(r.status); return r.json() })
      .then(data => setContent({ ...defaults, ...data, heroPromoCard: { ...defaults.heroPromoCard, ...(data.heroPromoCard || {}) }, faq: data.faq || defaults.faq, testimonials: data.testimonials || defaults.testimonials, services: data.services || defaults.services, statsBand: data.statsBand || defaults.statsBand, process: data.process || defaults.process, heroPromoItems: data.heroPromoItems || defaults.heroPromoItems, farmerPromo: { ...defaults.farmerPromo, ...data.farmerPromo, services: data.farmerPromo?.services || defaults.farmerPromo.services } }))
      .catch(() => setContent(null))
  }, [authed])

  const set = (section, key) => val =>
    setContent(c => ({ ...c, [section]: { ...c[section], [key]: val } }))

  const setArr = key => val => setContent(c => ({ ...c, [key]: val }))

  const setNested = (section, key) => val =>
    setContent(c => ({ ...c, [section]: { ...c[section], [key]: val } }))

  const save = async () => {
    setStatus('saving')
    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-password': ADMIN_PASSWORD },
        body: JSON.stringify(content),
      })
      if (res.ok) { invalidateContent(); setStatus('saved'); setTimeout(() => setStatus(null), 3000) }
      else setStatus('error')
    } catch { setStatus('error') }
  }

  // ── Login ──
  if (!authed) {
    return (
      <div className="admin-login">
        <div className="admin-login-card">
          <h1>Site Admin</h1>
          <p>Enter the admin password to edit copy.</p>
          <input className="admin-input" type="password" placeholder="Password" value={pw}
            onChange={e => { setPw(e.target.value); setPwError(false) }}
            onKeyDown={e => e.key === 'Enter' && (pw === ADMIN_PASSWORD ? setAuthed(true) : setPwError(true))}
          />
          {pwError && <p className="admin-error">Wrong password.</p>}
          <button className="admin-btn" onClick={() => pw === ADMIN_PASSWORD ? setAuthed(true) : setPwError(true)}>
            Sign In
          </button>
        </div>
      </div>
    )
  }

  if (content === null) return <div className="admin-loading" style={{ color: '#dc2626' }}>Could not reach server. Make sure the local server is running on port 3001.</div>
  if (!content) return <div className="admin-loading">Loading…</div>

  return (
    <div className="admin-wrap">
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Site Editor</h1>
          <p className="admin-sub">Changes go live immediately. They reset on next deploy — tell Brian to commit the JSON file to make them permanent.</p>
        </div>
        <div className="admin-header-actions">
          {status === 'saved' && <span className="admin-saved-msg">✓ Saved and live!</span>}
          {status === 'error' && <span className="admin-error">Save failed.</span>}
          <button className="admin-btn" onClick={save} disabled={status === 'saving'}>
            {status === 'saving' ? 'Saving…' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="admin-body">

        {/* ── SITE-WIDE ── */}
        <div className="admin-group-label">Site-Wide</div>

        <Section title="Contact Info" defaultOpen>
          <Field label="Phone (display)" value={content.contact.phone} onChange={set('contact', 'phone')} hint="e.g. (512) 202-8302" />
          <Field label="Phone (raw — for tel: links, digits only)" value={content.contact.phoneRaw} onChange={set('contact', 'phoneRaw')} />
          <Field label="Email" value={content.contact.email} onChange={set('contact', 'email')} />
          <Field label="Service Area" value={content.contact.serviceArea} onChange={set('contact', 'serviceArea')} />
        </Section>

        <Section title="Announcement Bar">
          <Field label="Text" value={content.promoBar.text} onChange={set('promoBar', 'text')} multiline />
          <Field label="Link text" value={content.promoBar.linkText} onChange={set('promoBar', 'linkText')} />
        </Section>

        {/* ── HOMEPAGE ── */}
        <div className="admin-group-label">Homepage</div>

        <Section title="Hero">
          <Field label="Headline — line 1 (white)" value={content.hero.line1} onChange={set('hero', 'line1')} />
          <Field label="Headline — line 2 (green)" value={content.hero.line2} onChange={set('hero', 'line2')} />
          <Field label="Sub-text" value={content.hero.sub} onChange={set('hero', 'sub')} multiline />
        </Section>

        <Section title="Hero — Free Survey Card">
          <Field label="Badge text" value={content.heroPromoCard.badge} onChange={set('heroPromoCard', 'badge')} />
          <Field label="Card title" value={content.heroPromoCard.title} onChange={set('heroPromoCard', 'title')} />
          <Field label="CTA button text" value={content.heroPromoCard.cta} onChange={set('heroPromoCard', 'cta')} />
          <Field label="Note below button" value={content.heroPromoCard.note} onChange={set('heroPromoCard', 'note')} />
          <div className="admin-subheading">Service Items</div>
          <CardList
            items={content.heroPromoItems}
            onChange={setArr('heroPromoItems')}
            renderCard={(item, update) => (
              <>
                <Field label="Title" value={item.title} onChange={v => update({ ...item, title: v })} />
                <Field label="Description" value={item.desc} onChange={v => update({ ...item, desc: v })} multiline />
              </>
            )}
          />
        </Section>

        <Section title="Services (Spraying, Seeding, Frost)">
          <CardList
            items={content.services}
            onChange={setArr('services')}
            renderCard={(item, update) => (
              <>
                <Field label="Title" value={item.title} onChange={v => update({ ...item, title: v })} />
                <Field label="Tagline" value={item.tagline} onChange={v => update({ ...item, tagline: v })} />
                <BulletsField label="Bullets" value={item.bullets} onChange={v => update({ ...item, bullets: v })} />
              </>
            )}
          />
        </Section>

        <Section title="Free Survey Promo Section">
          <Field label="Headline" value={content.farmerPromo.headline} onChange={set('farmerPromo', 'headline')} />
          <Field label="Sub-text" value={content.farmerPromo.sub} onChange={set('farmerPromo', 'sub')} multiline />
          <Field label="CTA note (below button)" value={content.farmerPromo.ctaNote} onChange={set('farmerPromo', 'ctaNote')} />
          <div className="admin-subheading">Survey Service Cards</div>
          <CardList
            items={content.farmerPromo.services}
            onChange={v => setContent(c => ({ ...c, farmerPromo: { ...c.farmerPromo, services: v } }))}
            renderCard={(item, update) => (
              <>
                <Field label="Label (small tag)" value={item.label} onChange={v => update({ ...item, label: v })} />
                <Field label="Title" value={item.title} onChange={v => update({ ...item, title: v })} />
                <Field label="Tagline" value={item.tagline} onChange={v => update({ ...item, tagline: v })} />
                <BulletsField label="Bullets" value={item.bullets} onChange={v => update({ ...item, bullets: v })} />
              </>
            )}
          />
        </Section>

        <Section title="Stats Band">
          <CardList
            items={content.statsBand}
            onChange={setArr('statsBand')}
            renderCard={(item, update) => (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <Field label="Value" value={item.value} onChange={v => update({ ...item, value: v })} />
                <Field label="Label" value={item.label} onChange={v => update({ ...item, label: v })} />
              </div>
            )}
          />
        </Section>

        <Section title="How It Works (Process Steps)">
          <CardList
            items={content.process}
            onChange={setArr('process')}
            renderCard={(item, update) => (
              <>
                <Field label="Step title" value={item.title} onChange={v => update({ ...item, title: v })} />
                <Field label="Description" value={item.desc} onChange={v => update({ ...item, desc: v })} multiline />
              </>
            )}
          />
        </Section>

        <Section title="Pricing Note">
          <Field label="Note below pricing table" value={content.pricing.note} onChange={set('pricing', 'note')} />
        </Section>

        <Section title="FAQ">
          <CardList
            items={content.faq}
            onChange={setArr('faq')}
            onAdd={() => setArr('faq')([...content.faq, { q: '', a: '' }])}
            addLabel="+ Add Question"
            renderCard={(item, update) => (
              <>
                <Field label="Question" value={item.q} onChange={v => update({ ...item, q: v })} />
                <Field label="Answer" value={item.a} onChange={v => update({ ...item, a: v })} multiline />
              </>
            )}
          />
        </Section>

        <Section title="Testimonials">
          <CardList
            items={content.testimonials}
            onChange={setArr('testimonials')}
            onAdd={() => setArr('testimonials')([...content.testimonials, { text: '', author: '', location: '' }])}
            addLabel="+ Add Testimonial"
            renderCard={(item, update) => (
              <>
                <Field label="Quote" value={item.text} onChange={v => update({ ...item, text: v })} multiline />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <Field label="Name" value={item.author} onChange={v => update({ ...item, author: v })} />
                  <Field label="Farm / Role" value={item.location} onChange={v => update({ ...item, location: v })} />
                </div>
              </>
            )}
          />
        </Section>

        {/* ── FREE SURVEY PAGE ── */}
        <div className="admin-group-label">Free Survey Landing Page (/free-survey)</div>

        <Section title="Hero">
          <Field label="Headline" value={content.promoLanding.headline} onChange={set('promoLanding', 'headline')} />
          <Field label="Sub-text" value={content.promoLanding.sub} onChange={set('promoLanding', 'sub')} multiline />
        </Section>

        <Section title="Why Free Section">
          <Field label="Headline" value={content.promoLanding.whyHeadline} onChange={set('promoLanding', 'whyHeadline')} />
          <Field label="Paragraph 1" value={content.promoLanding.whyBody} onChange={set('promoLanding', 'whyBody')} multiline />
          <Field label="Paragraph 2" value={content.promoLanding.whyBody2} onChange={set('promoLanding', 'whyBody2')} multiline />
        </Section>

      </div>

      <div className="admin-footer-bar">
        <button className="admin-btn" onClick={save} disabled={status === 'saving'}>
          {status === 'saving' ? 'Saving…' : 'Save Changes'}
        </button>
        {status === 'saved' && <span className="admin-saved-msg">✓ Saved and live!</span>}
        {status === 'error' && <span className="admin-error">Save failed — check server.</span>}
      </div>
    </div>
  )
}
