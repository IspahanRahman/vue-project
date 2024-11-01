import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes'

dotenv.config()

const app = express()
app.use(cors({
  origin: 'http://localhost:5173',  // Allow your frontend origin
  credentials: true,
}))
app.use(express.json())
app.use('/api/auth', authRoutes)

app.listen(3001, () => {
  console.log('Backend running on http://localhost:3001')
})