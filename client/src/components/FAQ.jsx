import { useState } from 'react'

const faqs = [
  {
    q: 'What is the minimum job size?',
    a: 'We have a $400 minimum per job, which covers up to ~33 acres at our base rate. Smaller fields are welcome — you just pay the minimum.',
  },
  {
    q: 'Can you fly in wet or muddy conditions?',
    a: 'Yes — that\'s one of the biggest advantages of drone application. As long as it\'s not actively raining and winds are under 15 mph, we can fly when ground equipment is stuck.',
  },
  {
    q: 'Do you supply the chemical/product?',
    a: 'No, product cost is separate. We work with your agronomist or co-op to coordinate delivery, or you can supply it directly. We handle loading, calibration, and application.',
  },
  {
    q: 'How far in advance do I need to book?',
    a: 'We typically schedule within the same week, sometimes same day for urgent applications. Book early during peak fungicide season (late June–July) as slots fill fast.',
  },
  {
    q: 'Are you licensed and insured?',
    a: 'Yes. We hold an FAA Part 107 Remote Pilot Certificate and carry full commercial liability insurance. Applicator certification details available on request.',
  },
  {
    q: 'What drones do you fly?',
    a: 'Our primary fleet is DJI Agras series — high-volume agricultural drones purpose-built for spray applications with RTK GPS precision.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState(null)

  return (
    <section className="section" id="faq">
      <div className="container">
        <div className="section-header" style={{ textAlign: 'center' }}>
          <div className="section-label">FAQ</div>
          <h2 className="section-title">Common Questions</h2>
        </div>
        <div className="faq-list">
          {faqs.map((f, i) => (
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
