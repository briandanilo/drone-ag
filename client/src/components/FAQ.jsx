import { useState } from 'react'
import { useContent } from '../lib/useContent.js'

export default function FAQ() {
  const [open, setOpen] = useState(null)
  const { faq } = useContent()

  return (
    <section className="section" id="faq">
      <div className="container">
        <div className="section-header" style={{ textAlign: 'center' }}>
          <div className="section-label">FAQ</div>
          <h2 className="section-title">Common Questions</h2>
        </div>
        <div className="faq-list">
          {faq.map((f, i) => (
            <div className="faq-item" key={i}>
              <button className="faq-question" onClick={() => setOpen(open === i ? null : i)}>
                {f.q}
                <span className={`faq-chevron ${open === i ? 'open' : ''}`}>▼</span>
              </button>
              {open === i && <div className="faq-answer">{f.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
