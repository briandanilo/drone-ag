const services = [
  {
    num: '01',
    title: 'Crop Spraying',
    tagline: 'Precise aerial application over any terrain',
    bullets: [
      'Fungicides, herbicides & pesticides',
      'Consistent coverage at variable rates',
      'Access to wet or soft fields',
      'Reduced chemical drift',
      'GPS-guided flight paths',
    ],
  },
  {
    num: '02',
    title: 'Cover Crop Seeding',
    tagline: 'Direct seeding into standing crops',
    bullets: [
      'Seed before harvest to maximize growth window',
      'No soil disturbance or compaction',
      'Uniform broadcast distribution',
      'Works in tight canopy conditions',
      'Faster than ground equipment',
    ],
  },
  {
    num: '03',
    title: 'Frost Seeding',
    tagline: 'Early spring establishment advantage',
    bullets: [
      'Seed clovers & grasses in late winter',
      'Freeze-thaw cycle works seed into soil',
      'No equipment in muddy fields',
      'Earlier establishment than drill seeding',
      'Cost-effective legume establishment',
    ],
  },
]

export default function Services() {
  return (
    <section className="section" id="services">
      <div className="container">
        <div className="section-header">
          <div className="section-label">What We Do</div>
          <h2 className="section-title">Drone Services Built for Ag</h2>
          <p className="section-sub">
            From fungicide runs to cover crop seeding, we keep your operation moving
            when ground equipment can't.
          </p>
        </div>
        <div className="services-grid">
          {services.map(s => (
            <div className="service-card" key={s.num}>
              <div className="service-num">{s.num}</div>
              <h3>{s.title}</h3>
              <p className="service-tagline">{s.tagline}</p>
              <ul className="service-bullets">
                {s.bullets.map(b => <li key={b}>{b}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
