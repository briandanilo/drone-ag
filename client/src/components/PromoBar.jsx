import { useState, useEffect } from 'react'

export default function PromoBar() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    document.documentElement.dataset.promoBar = visible ? 'true' : 'false'
    return () => { delete document.documentElement.dataset.promoBar }
  }, [visible])

  if (!visible) return null

  return (
    <div className="promo-bar">
      <div className="container">
        <div className="promo-bar-inner">
          <span className="promo-bar-pulse" />
          <p className="promo-bar-text">
            <span className="promo-bar-full">
              Free drone field analysis for SLO County farms — crop health maps, terrain models & thermal scans.{' '}
            </span>
            <span className="promo-bar-short">Free aerial field analysis for local farms. </span>
            <a href="#free-survey" className="promo-bar-link">Limited spots available →</a>
          </p>
          <button className="promo-bar-close" onClick={() => setVisible(false)} aria-label="Dismiss">✕</button>
        </div>
      </div>
    </div>
  )
}
