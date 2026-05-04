import { useContent } from '../lib/useContent.js'

export default function Process() {
  const { process } = useContent()
  return (
    <section className="section section-alt" id="how-it-works">
      <div className="container">
        <div className="section-header" style={{ textAlign: 'center' }}>
          <div className="section-label">How It Works</div>
          <h2 className="section-title">From Quote to Done in Days</h2>
        </div>
        <div className="process-steps">
          {process.map((s, i) => (
            <div className="process-step" key={i}>
              <div className="step-num">{i + 1}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
