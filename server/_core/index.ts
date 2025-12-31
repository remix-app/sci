import 'dotenv/config'
import express from 'express'
import { createServer } from 'http'
import cors from 'cors'
import helmet from 'helmet'
import path from 'path'
import { fileURLToPath } from 'url'
import { createExpressMiddleware } from '@trpc/server/adapters/express'
import { appRouter } from '../routers'
import { createContext } from './context'
import { ENV } from './env'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const server = createServer(app)

app.use(helmet({
  contentSecurityPolicy: false, // Deshabilitar para facilitar despliegue inicial si hay problemas con assets externos
}))

app.use(cors({
  origin: true, // Permitir todos los orígenes en desarrollo/despliegue inicial
  credentials: true,
}))

app.use(express.json({ limit: '10mb' }))

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.use(
  '/api/trpc',
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
)

// En producción, servimos los archivos estáticos de Vite
if (process.env.NODE_ENV === 'production') {
  const publicPath = path.resolve(__dirname, '../../dist/public')
  app.use(express.static(publicPath))
  app.get('*', (_req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'))
  })
}

const PORT = ENV.PORT

server.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Servidor en puerto ${PORT}`)
})
