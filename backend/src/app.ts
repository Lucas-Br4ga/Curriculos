import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import { globalLimiter } from './middlewares/rateLimiter.middleware'
import { errorHandler } from './middlewares/errorHandler.middleware'
import authRoutes from './routes/auth.routes'
import perfilRoutes from './routes/perfil.routes'
import vagasRoutes from './routes/vagas.routes'

const app = express()

app.use(helmet())
app.use(
  cors({
    origin: process.env.CORS_ORIGIN ?? 'http://localhost:5173',
    credentials: true,
  }),
)
app.use(express.json({ limit: '10mb' }))
app.use(cookieParser())
app.use(globalLimiter)

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.use('/auth', authRoutes)
app.use('/perfil', perfilRoutes)
app.use('/vagas', vagasRoutes)

app.use(errorHandler)

export default app
