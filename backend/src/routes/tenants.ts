import { Router, Request, Response } from 'express'
import pool from '../config/database'

const router = Router()

// GET all tenants
router.get('/', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM tenants ORDER BY created_at DESC')
    res.json(result.rows)
  } catch (error) {
    res.status(500).json({ error: String(error) })
  }
})

// POST create tenant
router.post('/', async (req: Request, res: Response) => {
  const { name, slug, plan } = req.body
  try {
    const result = await pool.query(
      'INSERT INTO tenants (name, slug, plan) VALUES ($1, $2, $3) RETURNING *',
      [name, slug, plan || 'starter']
    )
    res.status(201).json(result.rows[0])
  } catch (error) {
    res.status(500).json({ error: String(error) })
  }
})

export default router
