import app from './app'
import { prisma } from './lib/prisma'
import redis from './lib/redis'

const PORT = process.env.PORT ?? 3333

async function main() {
  await prisma.$connect()
  await redis.connect()

  app.listen(PORT, () => {
    console.log(`[Server] Running on http://localhost:${PORT}`)
    console.log(`[Server] Environment: ${process.env.NODE_ENV ?? 'development'}`)
  })
}

main().catch((err) => {
  console.error('[Server] Failed to start:', err)
  process.exit(1)
})
