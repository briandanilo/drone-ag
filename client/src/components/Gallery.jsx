import { useState, useEffect } from 'react'

const images = [
  {
    src: '/gallery/OsoFlacoLake_vis.jpg',
    type: 'Visible',
    location: 'Oso Flaco Lake, SLO County',
    title: 'Aerial Orthomosaic',
    desc: 'High-resolution mosaic stitched from hundreds of overlapping drone frames. Every acre captured at sub-inch resolution — the deliverable at the core of a field health analysis.',
  },
  {
    src: '/gallery/OceanoDunes_tir.jpg',
    type: 'Thermal',
    location: 'Oceano Dunes, SLO County',
    title: 'Thermal Orthomosaic',
    desc: 'False-color thermal map showing surface temperature variation across coastal terrain. Applied to your fields, this imaging pinpoints irrigation gaps, water stress zones, and failing emitters.',
  },
  {
    src: '/gallery/NakhonPhanomMar17_tir.jpg',
    type: 'Thermal',
    location: 'Nakhon Phanom, Thailand',
    title: 'Thermal Survey',
    desc: 'Thermal infrared mosaic over mixed land and waterway. Warm tones indicate heat-retaining and stressed surfaces; cooler zones show moisture retention. The same contrast tells you which rows aren\'t getting water.',
  },
  {
    src: '/gallery/KanabDam_vis.jpg',
    type: 'Visible',
    location: 'Kanab Creek, Utah',
    title: 'Terrain & Drainage Survey',
    desc: 'Visible orthomosaic used to derive a digital terrain model — revealing drainage flow, slope breaks, and low spots. The same process tells you where water pools or bypasses your crops.',
  },
  {
    src: '/gallery/NakhonPhanomMar17_vis.jpg',
    type: 'Visible',
    location: 'Mekong River Basin',
    title: 'High-Resolution Field Map',
    desc: 'Full orthomosaic covering mixed agricultural land, structures, and waterways. This level of detail supports precise field boundary mapping, crop row analysis, and anomaly detection.',
  },
]

const filters = ['All', 'Visible', 'Thermal']

export default function Gallery({ embedded = false }) {
  const [activeFilter, setActiveFilter] = useState('All')
  const [lightbox, setLightbox] = useState(null)

  const filtered = activeFilter === 'All' ? images : images.filter(i => i.type === activeFilter)

  const openLightbox = img => setLightbox(img)
  const closeLightbox = () => setLightbox(null)

  const navigate = dir => {
    const idx = filtered.findIndex(i => i.src === lightbox.src)
    const next = (idx + dir + filtered.length) % filtered.length
    setLightbox(filtered[next])
  }

  useEffect(() => {
    if (!lightbox) return
    const onKey = e => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') navigate(1)
      if (e.key === 'ArrowLeft') navigate(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox, filtered])

  useEffect(() => {
    document.body.style.overflow = lightbox ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lightbox])

  const inner = (
    <>
        <div className="gallery-filters">
          {filters.map(f => (
            <button
              key={f}
              className={`gallery-filter-btn${activeFilter === f ? ' active' : ''}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="gallery-grid">
          {filtered.map(img => (
            <button key={img.src} className="gallery-card" onClick={() => openLightbox(img)}>
              <div className="gallery-thumb">
                <img src={img.src} alt={img.title} loading="lazy" />
                <span className={`gallery-badge gallery-badge-${img.type.toLowerCase()}`}>{img.type}</span>
                <div className="gallery-thumb-overlay">
                  <span className="gallery-zoom-icon">⤢</span>
                </div>
              </div>
              <div className="gallery-card-body">
                <div className="gallery-card-location">{img.location}</div>
                <div className="gallery-card-title">{img.title}</div>
                <p className="gallery-card-desc">{img.desc}</p>
              </div>
            </button>
          ))}
        </div>

      {lightbox && (
        <div className="gallery-lightbox" onClick={closeLightbox}>
          <button className="gallery-lb-close" onClick={closeLightbox} aria-label="Close">✕</button>
          <button
            className="gallery-lb-nav gallery-lb-prev"
            onClick={e => { e.stopPropagation(); navigate(-1) }}
            aria-label="Previous"
          >‹</button>
          <div className="gallery-lb-inner" onClick={e => e.stopPropagation()}>
            <img src={lightbox.src} alt={lightbox.title} />
            <div className="gallery-lb-caption">
              <span className={`gallery-badge gallery-badge-${lightbox.type.toLowerCase()}`}>{lightbox.type}</span>
              <span className="gallery-lb-title">{lightbox.title}</span>
              <span className="gallery-lb-location">{lightbox.location}</span>
              <p className="gallery-lb-desc">{lightbox.desc}</p>
            </div>
          </div>
          <button
            className="gallery-lb-nav gallery-lb-next"
            onClick={e => { e.stopPropagation(); navigate(1) }}
            aria-label="Next"
          >›</button>
        </div>
      )}
    </>
  )

  if (embedded) return <div className="gallery-embedded">{inner}</div>

  return (
    <section className="section section-alt" id="gallery">
      <div className="container">
        <div className="section-header">
          <div className="section-label">Sample Imagery</div>
          <h2 className="section-title">See What the Drone Sees</h2>
          <p className="section-sub">
            Real orthomosaics and thermal surveys — the same deliverables included in your free field analysis.
          </p>
        </div>
        {inner}
      </div>
    </section>
  )
}
