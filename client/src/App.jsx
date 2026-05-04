import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PromoBar from './components/PromoBar.jsx'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Services from './components/Services.jsx'
import FarmerPromo from './components/FarmerPromo.jsx'
import Gallery from './components/Gallery.jsx'
import StatsBand from './components/StatsBand.jsx'
import Process from './components/Process.jsx'
import Comparison from './components/Comparison.jsx'
import Pricing from './components/Pricing.jsx'
import FAQ from './components/FAQ.jsx'
import Testimonials from './components/Testimonials.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import PromoLanding from './pages/PromoLanding.jsx'
import Admin from './pages/Admin.jsx'

function MainSite() {
  return (
    <>
      <PromoBar />
      <Nav />
      <Hero />
      <Services />
      <FarmerPromo />
      <StatsBand />
      <Process />
      <Comparison />
      <Pricing />
      <FAQ />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainSite />} />
        <Route path="/free-survey" element={<PromoLanding />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  )
}
