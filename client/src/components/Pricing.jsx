import QuoteCalculator from './QuoteCalculator.jsx'

export default function Pricing() {
  return (
    <section className="section section-alt" id="pricing">
      <div className="container">
        <div className="section-header" style={{ textAlign: 'center' }}>
          <div className="section-label">Transparent Pricing</div>
          <h2 className="section-title">No Hidden Fees</h2>
          <p className="section-sub" style={{ margin: '0 auto' }}>
            Product cost is separate. These rates cover application only.
          </p>
        </div>
        <div className="pricing-calc-wrap">
          <QuoteCalculator />
        </div>
      </div>
    </section>
  )
}
