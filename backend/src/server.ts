import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

import tenantsRouter from './routes/tenants'
import authRouter from './routes/auth'
import projectsRouter from './routes/projects'
import { authenticate, AuthRequest } from './middleware/auth'

import { Pool } from 'pg'

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
})

console.log('DB Config:', {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
})

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.get('/test', (req, res) => res.json({ message: 'test works' }))
app.use('/api/tenants', tenantsRouter)
app.use('/api/auth', authRouter)
app.use('/api/projects', projectsRouter)


app.get('/health', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()')
    res.json({ 
      status: 'Costoraz API is running',
      database: 'connected',
      timestamp: result.rows[0].now
    })
  } catch (error) {
    console.error('DB Error:', error)
    res.status(500).json({ 
      status: 'API running',
      database: 'disconnected',
      error: String(error)
    })
  }
})

app.get('/api/me', authenticate, (req: AuthRequest, res) => {
  res.json({ user: req.user })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

export default app