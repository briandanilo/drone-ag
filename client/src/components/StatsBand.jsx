import { useContent } from '../lib/useContent.js'

export default function StatsBand() {
  const { statsBand } = useContent()
  return (
    <div className="stats-band">
      <div className="container">
        <div className="stats-grid">
          {statsBand.map(s => (
            <div key={s.label}>
              <div className="band-stat-value">{s.value}</div>
              <div className="band-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
