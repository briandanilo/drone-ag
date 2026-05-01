const tiers = [
  { range: '1 – 100 acres', rate: '$12 / acre', min: '$400 minimum' },
  { range: '101 – 199 acres', rate: '$10 / acre', min: '' },
  { range: '200 – 499 acres', rate: '$9 / acre', min: '' },
  { range: '500+ acres', rate: 'Contact us', min: 'Volume pricing' },
]

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
        <div className="pricing-table">
          <div className="pricing-table-head">
            <span>Acreage</span>
            <span>Rate</span>
            <span>Notes</span>
          </div>
          {tiers.map(t => (
            <div className="pricing-row" key={t.range}>
              <span>{t.range}</span>
              <span className="price">{t.rate}</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>{t.min}</span>
            </div>
          ))}
        </div>
        <p className="pricing-note">$400 minimum per job &nbsp;·&nbsp; Product not included &nbsp;·&nbsp; Ferry fees may apply beyond 50 miles</p>
      </div>
    </section>
  )
}
