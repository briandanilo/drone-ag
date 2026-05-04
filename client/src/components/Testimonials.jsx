import { useContent } from '../lib/useContent.js'

export default function Testimonials() {
  const { testimonials } = useContent()
  return (
    <section className="section section-dark">
      <div className="container">
        <div className="section-header" style={{ textAlign: 'center' }}>
          <div className="section-label" style={{ color: 'var(--primary-light)' }}>Testimonials</div>
          <h2 className="section-title" style={{ color: 'white' }}>Farmers We've Worked With</h2>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <div className="testimonial-card" key={i}>
              <div className="testimonial-stars">★★★★★</div>
              <p className="testimonial-text">"{t.text}"</p>
              <div className="testimonial-author">{t.author}</div>
              <div className="testimonial-location">{t.location}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
