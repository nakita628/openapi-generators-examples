import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { type } from 'arktype'

export const modelsHandler = new Hono()
  .get('/models', (c) => {})
  .get('/models/:model', sValidator('param', type({ model: 'string' })), (c) => {})
  .delete('/models/:model', sValidator('param', type({ model: 'string' })), (c) => {})
