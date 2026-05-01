const testimonials = [
  {
    text: "Had standing water in half my cornfield and couldn\'t get the sprayer in. They were out the next day and covered everything. Saved the fungicide timing.",
    author: 'Mike R.',
    location: 'Corn & Soybean Farmer',
  },
  {
    text: "Used them for cover crop seeding into soybeans. Germination was excellent and I didn\'t have to wait until after harvest. Will be doing it every year.",
    author: 'Tom K.',
    location: 'Cash Crop Farmer',
  },
  {
    text: "Straightforward pricing, showed up on time, sent me a flight log after. Exactly what you want from a service provider.",
    author: 'Janet L.',
    location: 'Small Acreage Producer',
  },
]

export default function Testimonials() {
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
