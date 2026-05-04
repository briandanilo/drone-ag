import { useState, useEffect } from 'react'
import { invalidateContent } from '../lib/useContent.js'

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'slo2026'

function Field({ label, value, onChange, multiline = false, hint }) {
  return (
    <div className="admin-field">
      <label className="admin-label">{label}</label>
      {hint && <p className="admin-hint">{hint}</p>}
      {multiline
        ? <textarea className="admin-input admin-textarea" value={value} onChange={e => onChange(e.target.value)} rows={4} />
        : <input className="admin-input" value={value} onChange={e => onChange(e.target.value)} />
      }
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div className="admin-section">
      <h2 className="admin-section-title">{title}</h2>
      {children}
    </div>
  )
}

export default function Admin() {
  const [authed, setAuthed] = useState(false)
  const [pw, setPw] = useState('')
  const [pwError, setPwError] = useState(false)
  const [content, setContent] = useState(null)
  const [status, setStatus] = useState(null)

  useEffect(() => {
    if (!authed) return
    fetch('/api/content').then(r => r.json()).then(setContent)
  }, [authed])

  const set = (section, key) => val =>
    setContent(c => ({ ...c, [section]: { ...c[section], [key]: val } }))

  const save = async () => {
    setStatus('saving')
    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-password': ADMIN_PASSWORD },
        body: JSON.stringify(content),
      })
      if (res.ok) {
        invalidateContent()
        setStatus('saved')
        setTimeout(() => setStatus(null), 3000)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (!authed) {
    return (
      <div className="admin-login">
        <div className="admin-login-card">
          <h1>Site Admin</h1>
          <p>Enter the admin password to edit copy.</p>
          <input
            className="admin-input"
            type="password"
            placeholder="Password"
            value={pw}
            onChange={e => setPw(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                if (pw === ADMIN_PASSWORD) setAuthed(true)
                else setPwError(true)
              }
            }}
          />
          {pwError && <p className="admin-error">Wrong password.</p>}
          <button className="admin-btn" onClick={() => {
            if (pw === ADMIN_PASSWORD) setAuthed(true)
            else setPwError(true)
          }}>Sign In</button>
        </div>
      </div>
    )
  }

  if (!content) return <div className="admin-loading">Loading…</div>

  return (
    <div className="admin-wrap">
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Site Editor</h1>
          <p className="admin-sub">Changes go live as soon as you save. They'll reset if the site is redeployed — let Brian know to commit them.</p>
        </div>
        <div className="admin-header-actions">
          {status === 'saved' && <span className="admin-saved-msg">✓ Saved!</span>}
          {status === 'error' && <span className="admin-error">Save failed.</span>}
          <button className="admin-btn" onClick={save} disabled={status === 'saving'}>
            {status === 'saving' ? 'Saving…' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="admin-body">
        <Section title="Contact Info">
          <Field label="Phone (display)" value={content.contact.phone} onChange={set('contact', 'phone')} hint="e.g. (512) 202-8302" />
          <Field label="Phone (raw, for tel: links)" value={content.contact.phoneRaw} onChange={set('contact', 'phoneRaw')} hint="Digits only, e.g. 5122028302" />
          <Field label="Email" value={content.contact.email} onChange={set('contact', 'email')} />
          <Field label="Service Area" value={content.contact.serviceArea} onChange={set('contact', 'serviceArea')} />
        </Section>

        <Section title="Announcement Bar">
          <Field label="Main text" value={content.promoBar.text} onChange={set('promoBar', 'text')} multiline />
          <Field label="Link text" value={content.promoBar.linkText} onChange={set('promoBar', 'linkText')} />
        </Section>

        <Section title="Homepage Hero">
          <Field label="Headline line 1" value={content.hero.line1} onChange={set('hero', 'line1')} hint="Displays in white" />
          <Field label="Headline line 2" value={content.hero.line2} onChange={set('hero', 'line2')} hint="Displays in green" />
          <Field label="Sub-text" value={content.hero.sub} onChange={set('hero', 'sub')} multiline />
        </Section>

        <Section title="Free Survey Section (Homepage)">
          <Field label="Headline" value={content.farmerPromo.headline} onChange={set('farmerPromo', 'headline')} />
          <Field label="Sub-text" value={content.farmerPromo.sub} onChange={set('farmerPromo', 'sub')} multiline />
          <Field label="CTA note (below button)" value={content.farmerPromo.ctaNote} onChange={set('farmerPromo', 'ctaNote')} />
        </Section>

        <Section title="Free Survey Landing Page (/free-survey)">
          <Field label="Headline" value={content.promoLanding.headline} onChange={set('promoLanding', 'headline')} />
          <Field label="Sub-text" value={content.promoLanding.sub} onChange={set('promoLanding', 'sub')} multiline />
          <Field label="'Why free?' headline" value={content.promoLanding.whyHeadline} onChange={set('promoLanding', 'whyHeadline')} />
          <Field label="'Why free?' paragraph 1" value={content.promoLanding.whyBody} onChange={set('promoLanding', 'whyBody')} multiline />
          <Field label="'Why free?' paragraph 2" value={content.promoLanding.whyBody2} onChange={set('promoLanding', 'whyBody2')} multiline />
        </Section>
      </div>

      <div className="admin-footer-bar">
        <button className="admin-btn" onClick={save} disabled={status === 'saving'}>
          {status === 'saving' ? 'Saving…' : 'Save Changes'}
        </button>
        {status === 'saved' && <span className="admin-saved-msg">✓ Saved and live!</span>}
      </div>
    </div>
  )
}
