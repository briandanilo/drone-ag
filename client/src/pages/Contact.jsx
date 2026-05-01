import { useState } from 'react'

const initial = { name: '', email: '', phone: '', acreage: '', cropType: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(initial)
  const [status, setStatus] = useState(null)

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      setForm(initial)
    } catch {
      setStatus('error')
    }
  }

  return (
    <main>
      <h1>Get a Quote</h1>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />
        <input name="acreage" type="number" placeholder="Acres" value={form.acreage} onChange={handleChange} required />
        <input name="cropType" placeholder="Crop type" value={form.cropType} onChange={handleChange} required />
        <textarea name="message" placeholder="Additional details" value={form.message} onChange={handleChange} />
        <button type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending...' : 'Submit'}
        </button>
      </form>
      {status === 'success' && <p>Got it — we'll be in touch soon!</p>}
      {status === 'error' && <p>Something went wrong. Please try again.</p>}
    </main>
  )
}
