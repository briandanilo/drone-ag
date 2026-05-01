export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div className="footer-logo">DRONE<span>AG</span></div>
          <ul className="footer-links">
            <li><a href="#services">Services</a></li>
            <li><a href="#how-it-works">How It Works</a></li>
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <div className="footer-copy">© {new Date().getFullYear()} DroneAg. All rights reserved.</div>
        </div>
      </div>
    </footer>
  )
}
