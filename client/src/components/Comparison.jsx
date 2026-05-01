const rows = [
  { factor: 'Soil Compaction', drone: '✓ None', ground: '✗ Heavy', aircraft: '✓ None' },
  { factor: 'Works in Wet Conditions', drone: '✓ Yes', ground: '✗ No', aircraft: '✓ Yes' },
  { factor: 'Precision Application', drone: '✓ GPS-guided', ground: '~ Moderate', aircraft: '✗ Low' },
  { factor: 'Minimum Acreage', drone: '✓ 1 acre', ground: '✗ 50+ acres', aircraft: '✗ 100+ acres' },
  { factor: 'Chemical Drift Risk', drone: '✓ Minimal', ground: '~ Moderate', aircraft: '✗ High' },
  { factor: 'Access to Saturated Fields', drone: '✓ Always', ground: '✗ Limited', aircraft: '✓ Always' },
  { factor: 'Same-Week Scheduling', drone: '✓ Yes', ground: '~ Seasonal', aircraft: '✗ Rare' },
  { factor: 'Crop Canopy Penetration', drone: '✓ Downwash-aided', ground: '~ Boom dependent', aircraft: '✗ Low' },
]

export default function Comparison() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <div className="section-label">Why Drone</div>
          <h2 className="section-title">How We Stack Up</h2>
          <p className="section-sub">
            Drones aren't always the answer — but in most ag spraying scenarios, they win on flexibility, precision, and access.
          </p>
        </div>
        <div className="table-scroll">
        <table className="comparison-table">
          <thead>
            <tr>
              <th>Factor</th>
              <th>Drone (Us)</th>
              <th>Ground Sprayer</th>
              <th>Manned Aircraft</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.factor}>
                <td>{r.factor}</td>
                <td className={r.drone.startsWith('✓') ? 'check' : 'neutral'}>{r.drone}</td>
                <td className={r.ground.startsWith('✗') ? 'cross' : 'neutral'}>{r.ground}</td>
                <td className={r.aircraft.startsWith('✗') ? 'cross' : 'neutral'}>{r.aircraft}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </section>
  )
}
