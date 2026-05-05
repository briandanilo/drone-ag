import { useState } from 'react'

function getRate(acres) {
  return acres < 100 ? 14 : 10
}

function estimate(acres) {
  const rate = getRate(acres)
  const base = Math.max(400, acres * rate)
  return {
    lo: Math.round(base * 0.95 / 5) * 5,
    hi: Math.round(base * 1.08 / 5) * 5,
    rate,
  }
}

export default function QuoteCalculator() {
  const [acres, setAcres] = useState(60)
  const result = estimate(acres)

  return (
    <div className="calc-card">
      <div className="calc-header">
        <span className="calc-title">Estimate Your Cost</span>
        <span className="calc-tag">Application only · product separate</span>
      </div>

      <div className="calc-tiers">
        <div className={`calc-tier ${acres < 100 ? 'active' : ''}`}>
          <span className="calc-tier-range">Under 100 acres</span>
          <span className="calc-tier-rate">$14 / acre</span>
        </div>
        <div className={`calc-tier ${acres >= 100 ? 'active' : ''}`}>
          <span className="calc-tier-range">100+ acres</span>
          <span className="calc-tier-rate">$10 / acre</span>
        </div>
      </div>

      <div className="calc-section">
        <div className="calc-label-row">
          <span className="calc-label">Field Size</span>
          <span className="calc-value-badge">{acres} acres</span>
        </div>
        <input
          type="range"
          min={5}
          max={500}
          step={5}
          value={acres}
          onChange={e => setAcres(Number(e.target.value))}
          className="calc-slider"
        />
        <div className="calc-slider-ends">
          <span>5 ac</span>
          <span>500 ac</span>
        </div>
      </div>

      <div className="calc-result">
        <div className="calc-price">
          ${result.lo.toLocaleString()}
          <span className="calc-price-sep"> – </span>
          ${result.hi.toLocaleString()}
        </div>
        <div className="calc-price-label">
          estimated total · {acres} acres · ${result.rate}/acre
        </div>
        {acres < 29 && (
          <div className="calc-min-note">$400 minimum applies</div>
        )}
      </div>

      <a href="#contact" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
        Get Exact Quote →
      </a>
    </div>
  )
}
