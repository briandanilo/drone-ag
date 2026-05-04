import { Router } from 'express'
import { Resend } from 'resend'

const router = Router()
const resend = new Resend(process.env.RESEND_API_KEY)

router.post('/', async (req, res) => {
  const { name, email, phone, acreage, cropType, message } = req.body

  try {
    await resend.emails.send({
      from: 'SLO Drone Spray <onboarding@resend.dev>',
      to: 'brian.danilo@gmail.com',
      reply_to: email,
      subject: `New inquiry: ${cropType} — ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#0f172a">
          <div style="background:#16a34a;padding:20px 28px;border-radius:8px 8px 0 0">
            <h2 style="color:white;margin:0;font-size:18px">New Form Submission</h2>
            <p style="color:rgba(255,255,255,0.75);margin:4px 0 0;font-size:14px">SLO Drone Spray website</p>
          </div>
          <div style="border:1px solid #e2e8f0;border-top:none;border-radius:0 0 8px 8px;padding:28px">
            <table style="width:100%;border-collapse:collapse;font-size:15px">
              <tr><td style="padding:8px 0;color:#64748b;width:110px">Name</td><td style="padding:8px 0;font-weight:600">${name}</td></tr>
              <tr><td style="padding:8px 0;color:#64748b">Email</td><td style="padding:8px 0"><a href="mailto:${email}" style="color:#16a34a">${email}</a></td></tr>
              <tr><td style="padding:8px 0;color:#64748b">Phone</td><td style="padding:8px 0">${phone || '—'}</td></tr>
              <tr><td style="padding:8px 0;color:#64748b">Acres</td><td style="padding:8px 0">${acreage}</td></tr>
              <tr><td style="padding:8px 0;color:#64748b">Service</td><td style="padding:8px 0"><strong>${cropType}</strong></td></tr>
              ${message ? `<tr><td style="padding:8px 0;color:#64748b;vertical-align:top">Message</td><td style="padding:8px 0">${message}</td></tr>` : ''}
            </table>
            <div style="margin-top:24px;padding-top:20px;border-top:1px solid #e2e8f0">
              <a href="mailto:${email}" style="display:inline-block;background:#16a34a;color:white;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:600;font-size:14px">Reply to ${name} →</a>
            </div>
          </div>
        </div>
      `,
    })

    res.status(201).json({ ok: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to send' })
  }
})

export default router
