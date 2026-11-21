import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { CreateContentProvenanceBodySchema } from '../components'

export const contentProvenanceChecksHandler = new Hono().post(
  '/content_provenance_checks',
  sValidator('form', CreateContentProvenanceBodySchema),
  (c) => {},
)
