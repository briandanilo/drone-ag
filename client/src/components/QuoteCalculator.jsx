import { useState } from 'react'

const services = [
  { id: 'fungicide',  label: 'Fungicide',     icon: '🍇', note: 'Powdery mildew & botrytis' },
  { id: 'pesticide',  label: 'Pesticide',      icon: '🐛', note: 'Leafhoppers, mites & mealybugs' },
  { id: 'coverCrop',  label: 'Cover Crop',     icon: '🌱', note: 'Seeding between vine rows' },
  { id: 'frostSeed',  label: 'Frost Seeding',  icon: '❄️', note: 'Early spring establishment' },
]

const multipliers = { fungicide: 1.0, pesticide: 1.0, coverCrop: 1.15, frostSeed: 0.9 }

function getRate(acres) {
  if (acres <= 50)  return 14
  if (acres <= 100) return 12
  if (acres <= 200) return 10
  return 9
}

function estimate(acres, svc) {
  if (acres >= 500) return null
  const base = Math.max(400, acres * getRate(acres) * (multipliers[svc] ?? 1))
  return {
    lo: Math.round(base * 0.95 / 5) * 5,
    hi: Math.round(base * 1.08 / 5) * 5,
  }
}

export default function QuoteCalculator() {
  const [acres, setAcres] = useState(60)
  const [svc, setSvc] = useState('fungicide')

  const result = estimate(acres, svc)
  const selectedSvc = services.find(s => s.id === svc)

  return (
    <div className="calc-card">
      <div className="calc-header">
        <span className="calc-title">Estimate Your Cost</span>
        <span className="calc-tag">Application only · product separate</span>
      </div>

      {/* Acres slider */}
      <div className="calc-section">
        <div className="calc-label-row">
          <span className="calc-label">Field Size</span>
          <span className="calc-value-badge">
            {acres >= 500 ? '500+ acres' : `${acres} acres`}
          </span>
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
          <span>500+ ac</span>
        </div>
      </div>

      {/* Service selector */}
      <div className="calc-section">
        <div className="calc-label">Service Type</div>
        <div className="calc-pills">
          {services.map(s => (
            <button
              key={s.id}
              className={`calc-pill ${svc === s.id ? 'active' : ''}`}
              onClick={() => setSvc(s.id)}
            >
              {s.icon} {s.label}
            </button>
          ))}
        </div>
        <div className="calc-svc-note">{selectedSvc.note}</div>
      </div>

      {/* Result */}
      <div className="calc-result">
        {result ? (
          <>
            <div className="calc-price">
              ${result.lo.toLocaleString()}
              <span className="calc-price-sep"> – </span>
              ${result.hi.toLocaleString()}
            </div>
            <div className="calc-price-label">
              estimated total · {acres} acres · {getRate(acres) * (multipliers[svc] ?? 1) < 12 ? 'volume rate' : 'standard rate'}
            </div>
          </>
        ) : (
          <>
            <div className="calc-price" style={{ fontSize: '28px' }}>Volume Pricing</div>
            <div className="calc-price-label">Contact us for 500+ acre jobs — we offer custom rates</div>
          </>
        )}
        {result && acres < 29 && (
          <div className="calc-min-note">$400 minimum applies</div>
        )}
      </div>

      <a href="#contact" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
        Get Exact Quote →
      </a>
    </div>
  )
}
