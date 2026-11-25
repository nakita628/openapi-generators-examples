import { Hono } from 'hono'
import { v1Handler } from './handlers'

const app = new Hono()

export const api = app.route('/', v1Handler)

export default app
