import { Hono } from 'hono'
import { tbValidator } from '@hono/typebox-validator'
import { CreateContentProvenanceBodySchema } from '../components'

export const contentProvenanceChecksHandler = new Hono().post(
  '/content_provenance_checks',
  tbValidator('form', CreateContentProvenanceBodySchema),
  (c) => { throw new Error('Not implemented') },
)
