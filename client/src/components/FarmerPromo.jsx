import Gallery from './Gallery.jsx'
import { useContent } from '../lib/useContent.js'

const promoServices = [
  {
    icon: '◈',
    label: 'Crop Health',
    title: 'Field Health Map',
    tagline: 'Spot problems before they spread',
    bullets: [
      'High-res aerial mosaic of your entire field in one pass',
      'Reveals disease, pest pressure & nutrient deficiency',
      'Stress shows up weeks before it\'s visible on foot',
      'GPS-tagged problem zones you can walk straight to',
    ],
  },
  {
    icon: '◉',
    label: 'Irrigation & Planning',
    title: 'Terrain & Drainage Map',
    tagline: 'See where water flows — and where it doesn\'t',
    bullets: [
      'Precise elevation model of every acre',
      'Shows where water pools, runs off fast, or bypasses crops',
      'Guides irrigation zone layout and tile drain decisions',
      'Useful for planting configuration and harvest planning',
    ],
  },
  {
    icon: '◎',
    label: 'Water Stress Detection',
    title: 'Thermal Irrigation Check',
    tagline: 'Find your dry spots before yield is lost',
    bullets: [
      'Thermal imaging reveals heat-stressed zones across the field',
      'Finds clogged emitters and failing irrigation sectors',
      'Plants heat up days before any visible wilting',
      'Saves you hours of manual field-walking to find problems',
    ],
  },
]

export default function FarmerPromo() {
  const { farmerPromo } = useContent()
  return (
    <section className="section promo-section" id="free-survey">
      <div className="container">
        <div className="promo-header">
          <div className="promo-badge">Free for Local Farms · Limited Availability</div>
          <h2 className="section-title promo-title">{farmerPromo.headline}</h2>
          <p className="promo-sub">{farmerPromo.sub}</p>
        </div>

        <div className="promo-grid">
          {promoServices.map(s => (
            <div className="promo-card" key={s.title}>
              <div className="promo-card-top">
                <span className="promo-icon">{s.icon}</span>
                <span className="promo-card-label">{s.label}</span>
              </div>
              <h3 className="promo-card-title">{s.title}</h3>
              <p className="promo-card-tagline">{s.tagline}</p>
              <ul className="promo-bullets">
                {s.bullets.map(b => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Gallery embedded />

        <div className="promo-cta-row">
          <a href="#contact" className="btn btn-primary promo-cta-btn">
            Claim Your Free Survey
          </a>
          <p className="promo-cta-note">{farmerPromo.ctaNote}</p>
        </div>
      </div>
    </section>
  )
}
