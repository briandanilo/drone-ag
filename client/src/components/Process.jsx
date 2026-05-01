const steps = [
  { num: 1, title: 'Request a Quote', desc: 'Fill out our quick form with your acreage, crop type, and target application.' },
  { num: 2, title: 'Field Assessment', desc: 'We review your field layout, obstacles, and schedule a flight window.' },
  { num: 3, title: 'Schedule Service', desc: 'We confirm a date — often same week — and coordinate product delivery.' },
  { num: 4, title: 'Application Day', desc: 'We fly, apply, and send you a completion report with flight data.' },
]

export default function Process() {
  return (
    <section className="section section-alt" id="how-it-works">
      <div className="container">
        <div className="section-header" style={{ textAlign: 'center' }}>
          <div className="section-label">How It Works</div>
          <h2 className="section-title">From Quote to Done in Days</h2>
        </div>
        <div className="process-steps">
          {steps.map(s => (
            <div className="process-step" key={s.num}>
              <div className="step-num">{s.num}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
