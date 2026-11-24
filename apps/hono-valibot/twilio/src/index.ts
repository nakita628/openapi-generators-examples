import { Hono } from 'hono'
import { _20100401Handler } from './handlers'

const app = new Hono()

export const api = app.route('/', _20100401Handler)

export default app
