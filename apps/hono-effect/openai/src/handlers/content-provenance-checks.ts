import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { Schema } from 'effect'
import { CreateContentProvenanceBodySchema } from '../components'

export const contentProvenanceChecksHandler = new Hono().post(
  '/content_provenance_checks',
  sValidator('form', Schema.toStandardSchemaV1(CreateContentProvenanceBodySchema)),
  (c) => { throw new Error('Not implemented') },
)
