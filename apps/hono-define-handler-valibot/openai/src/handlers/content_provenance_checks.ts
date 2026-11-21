import { Hono } from 'hono'
import { postContentProvenanceChecksHandler } from '../routes'

export const contentProvenanceChecksHandler = new Hono().post(
  '/content_provenance_checks',
  postContentProvenanceChecksHandler(async (c, { form }) => {}),
)
