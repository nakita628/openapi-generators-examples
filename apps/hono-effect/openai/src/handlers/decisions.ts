import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { Schema } from 'effect'
import { DecisionRequestSchema } from '../components'

export const decisionsHandler = new Hono().post(
  '/decisions',
  sValidator('json', Schema.toStandardSchemaV1(DecisionRequestSchema)),
  (c) => {},
)
