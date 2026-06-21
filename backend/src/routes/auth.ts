import { Router, Request, Response } from 'express'
import pool from '../config/database'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const router = Router()

// REGISTER
router.post('/register', async (req: Request, res: Response) => {
  const { email, password, first_name, last_name, tenant_id } = req.body
  try {
    const password_hash = await bcrypt.hash(password, 10)
    const result = await pool.query(
      `INSERT INTO users (tenant_id, email, password_hash, first_name, last_name) 
       VALUES ($1, $2, $3, $4, $5) RETURNING id, email, first_name, last_name, role`,
      [tenant_id, email, password_hash, first_name, last_name]
    )
    const user = result.rows[0]
    const token = jwt.sign(
      { user_id: user.id, tenant_id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    )
    res.status(201).json({ user, token })
  } catch (error) {
    res.status(500).json({ error: String(error) })
  }
})

// LOGIN
router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email])
    if (result.rows.length === 0) return res.status(401).json({ error: 'Invalid credentials' })
    const user = result.rows[0]
    const valid = await bcrypt.compare(password, user.password_hash)
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' })
    const token = jwt.sign(
      { user_id: user.id, tenant_id: user.tenant_id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    )
    res.json({ user: { id: user.id, email: user.email, first_name: user.first_name, last_name: user.last_name, role: user.role }, token })
  } catch (error) {
    res.status(500).json({ error: String(error) })
  }
})

export default router