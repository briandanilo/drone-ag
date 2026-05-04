import { Router } from 'express'
import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'

const router = Router()
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const contentPath = path.join(__dirname, '../data/content.json')

function load() {
  try { return JSON.parse(readFileSync(contentPath, 'utf8')) }
  catch { return {} }
}

router.get('/', (_req, res) => {
  res.json(load())
})

router.post('/', (req, res) => {
  if (req.headers['x-admin-password'] !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  try {
    writeFileSync(contentPath, JSON.stringify(req.body, null, 2))
    res.json({ ok: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to save' })
  }
})

export default router
