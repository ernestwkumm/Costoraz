import { Router, Response } from 'express'
import pool from '../config/database'
import { authenticate, AuthRequest } from '../middleware/auth'

const router = Router({ mergeParams: true })

// GET materials for project
router.get('/', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const result = await pool.query(
      'SELECT * FROM materials WHERE project_id = $1 AND tenant_id = $2 ORDER BY created_at ASC',
      [req.params.id, req.user?.tenant_id]
    )
    res.json(result.rows)
  } catch (error) {
    res.status(500).json({ error: String(error) })
  }
})

/// POST add material
router.post('/', authenticate, async (req: AuthRequest, res: Response) => {
  const { name, quantity, unit, unit_cost, supplier } = req.body
  try {
    const result = await pool.query(
      `INSERT INTO materials (tenant_id, project_id, name, quantity, unit, unit_cost, supplier)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [req.user?.tenant_id, req.params.id, name, quantity, unit, unit_cost, supplier]
    )

    // Update project total
    await pool.query(
      `UPDATE projects SET total_cost = (
        SELECT COALESCE(SUM(total_cost), 0) FROM materials WHERE project_id = $1
      ) WHERE id = $1`,
      [req.params.id]
    )

    res.status(201).json(result.rows[0])
  } catch (error) {
    res.status(500).json({ error: String(error) })
  }
})

export default router