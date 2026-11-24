import { Hono } from 'hono'
import { v2Handler } from './handlers'

const app = new Hono()

export const api = app.route('/', v2Handler)

export default app
