import { useState, useEffect } from 'react'

const defaults = {
  promoBar: {
    text: 'Free drone field analysis for SLO County farms — crop health maps, terrain models & thermal scans.',
    linkText: 'Limited spots available →',
  },
  hero: {
    line1: 'Precision Drone',
    line2: 'Ag Spraying',
    sub: 'Serving San Luis Obispo County vineyards, row crops, and orchards. Same-week scheduling. Zero soil compaction.',
  },
  farmerPromo: {
    headline: "A Bird's-Eye View of Your Field — On Us",
    sub: "We're offering a complimentary drone survey to a limited number of farms in San Luis Obispo County this season. No cost, no obligation — just actionable data to help you get ahead of problems before the season gets away from you.",
    ctaNote: "We'll confirm your spot and schedule a time that works around your operation.",
  },
  promoLanding: {
    headline: 'See Every Problem on Your Farm Before It Costs You',
    sub: 'A complimentary three-part drone survey for select SLO County farms — field health maps, terrain models, and thermal irrigation scans. No cost, no commitment.',
    whyHeadline: 'Why are we doing this for free?',
    whyBody: "We're new to the county and want to show local farmers what precision drone imaging can actually do — not with a brochure, but with real data from your fields. If you find it useful, we hope you'll think of us when it's time for spraying or seeding. If not, no hard feelings.",
    whyBody2: "We're limiting this to a small number of farms so we can do each one properly. Once spots are gone, they're gone.",
  },
  contact: {
    phone: '(512) 202-8302',
    phoneRaw: '5122028302',
    email: 'brian@slodronespray.com',
    serviceArea: 'San Luis Obispo County',
  },
}

let cache = null

export function useContent() {
  const [content, setContent] = useState(cache || defaults)

  useEffect(() => {
    if (cache) return
    fetch('/api/content')
      .then(r => r.json())
      .then(data => {
        const merged = {
          promoBar: { ...defaults.promoBar, ...data.promoBar },
          hero: { ...defaults.hero, ...data.hero },
          farmerPromo: { ...defaults.farmerPromo, ...data.farmerPromo },
          promoLanding: { ...defaults.promoLanding, ...data.promoLanding },
          contact: { ...defaults.contact, ...data.contact },
        }
        cache = merged
        setContent(merged)
      })
      .catch(() => {})
  }, [])

  return content
}

export function invalidateContent() {
  cache = null
}
