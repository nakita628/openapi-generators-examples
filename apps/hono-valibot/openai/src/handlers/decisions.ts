import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { DecisionRequestSchema } from '../components'

export const decisionsHandler = new Hono().post(
  '/decisions',
  sValidator('json', DecisionRequestSchema),
  (c) => { throw new Error('Not implemented') },
)
