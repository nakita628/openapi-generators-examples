import { Hono } from 'hono'
import { tbValidator } from '@hono/typebox-validator'
import { DecisionRequestSchema } from '../components'

export const decisionsHandler = new Hono().post(
  '/decisions',
  tbValidator('json', DecisionRequestSchema),
  (c) => { throw new Error('Not implemented') },
)
