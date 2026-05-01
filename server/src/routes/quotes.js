import { Router } from 'express'
import prisma from '../lib/prisma.js'

const router = Router()

router.post('/', async (req, res) => {
  const { name, email, phone, acreage, cropType, message } = req.body
  try {
    const quote = await prisma.quote.create({
      data: { name, email, phone, acreage: parseFloat(acreage), cropType, message }
    })
    res.status(201).json(quote)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to submit quote request' })
  }
})

router.get('/', async (_req, res) => {
  try {
    const quotes = await prisma.quote.findMany({ orderBy: { createdAt: 'desc' } })
    res.json(quotes)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch quotes' })
  }
})

export default router
