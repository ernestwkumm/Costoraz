import { Router, Response } from 'express'
import pool from '../config/database'
import { authenticate, AuthRequest } from '../middleware/auth'

const router = Router()

/// GET all projects for tenant
router.get('/', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const result = await pool.query(
      `SELECT p.*, 
        COALESCE((SELECT SUM(total_cost) FROM materials WHERE project_id = p.id), 0) as total_cost
       FROM projects p 
       WHERE p.tenant_id = $1 
       ORDER BY p.created_at DESC`,
      [req.user?.tenant_id]
    )
    res.json(result.rows)
  } catch (error) {
    res.status(500).json({ error: String(error) })
  }
})

// POST create project
router.post('/', authenticate, async (req: AuthRequest, res: Response) => {
  const { name, client_name, category, description } = req.body
  try {
    const result = await pool.query(
      `INSERT INTO projects (tenant_id, user_id, name, client_name, category, description) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [req.user?.tenant_id, req.user?.user_id, name, client_name, category, description]
    )
    res.status(201).json(result.rows[0])
  } catch (error) {
    res.status(500).json({ error: String(error) })
  }
})

// GET single project
router.get('/:id', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const result = await pool.query(
      'SELECT * FROM projects WHERE id = $1 AND tenant_id = $2',
      [req.params.id, req.user?.tenant_id]
    )
    if (result.rows.length === 0) return res.status(404).json({ error: 'Project not found' })
    res.json(result.rows[0])
  } catch (error) {
    res.status(500).json({ error: String(error) })
  }
})

export default router