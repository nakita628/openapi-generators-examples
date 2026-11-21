import { Hono } from 'hono'
import { petHandler, storeHandler, userHandler } from './handlers'

const app = new Hono()

export const api = app.route('/', petHandler).route('/', storeHandler).route('/', userHandler)

export default app
