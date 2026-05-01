const stats = [
  { value: '500+', label: 'Total Acres Treated' },
  { value: '2', label: 'Aircraft in Fleet' },
  { value: '40 ac/hr', label: 'Max Coverage Rate' },
  { value: '0', label: 'Soil Compaction' },
]

export default function StatsBand() {
  return (
    <div className="stats-band">
      <div className="container">
        <div className="stats-grid">
          {stats.map(s => (
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
