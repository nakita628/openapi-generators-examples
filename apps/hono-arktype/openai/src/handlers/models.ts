import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { type } from 'arktype'

export const modelsHandler = new Hono()
  .get('/models', (c) => { throw new Error('Not implemented') })
  .get('/models/:model', sValidator('param', type({ model: 'string' })), (c) => { throw new Error('Not implemented') })
  .delete('/models/:model', sValidator('param', type({ model: 'string' })), (c) => { throw new Error('Not implemented') })
