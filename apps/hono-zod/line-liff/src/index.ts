import { Hono } from 'hono'
import { liffHandler } from './handlers'

const app = new Hono()

export const api = app.route('/', liffHandler)

export default app
