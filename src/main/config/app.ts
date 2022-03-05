
import express, { Express } from 'express'
import setupMiddlewares from './middlewares'
import setupRoutes from '@/main/config/routes'

export const setupApp = async (): Promise<Express> => {
  const app = express()
  setupMiddlewares(app)
  setupRoutes(app)
  return app
}
