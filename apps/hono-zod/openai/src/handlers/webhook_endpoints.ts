import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as z from 'zod'
import {
  PublicCreateEndpointBodySchema,
  PublicUpdateEndpointBodySchema,
  PublicRotateSecretBodySchema,
  PublicTestEndpointBodySchema,
} from '../components'

export const webhookEndpointsHandler = new Hono()
  .get(
    '/webhook_endpoints',
    sValidator(
      'query',
      z.object({
        limit: z.coerce.number().int().min(1).max(100).exactOptional(),
        after: z
          .union([
            z.string().meta({ examples: ['whe_123'] }),
            z.preprocess((val) => (val === 'null' ? null : val), z.null().nullable()),
          ])
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post('/webhook_endpoints', sValidator('json', PublicCreateEndpointBodySchema), (c) => { throw new Error('Not implemented') })
  .get(
    '/webhook_endpoints/:webhook_endpoint_id',
    sValidator(
      'param',
      z.object({ webhook_endpoint_id: z.string().meta({ examples: ['whe_123'] }) }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/webhook_endpoints/:webhook_endpoint_id',
    sValidator(
      'param',
      z.object({ webhook_endpoint_id: z.string().meta({ examples: ['whe_123'] }) }),
    ),
    sValidator('json', PublicUpdateEndpointBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/webhook_endpoints/:webhook_endpoint_id',
    sValidator(
      'param',
      z.object({ webhook_endpoint_id: z.string().meta({ examples: ['whe_123'] }) }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/webhook_endpoints/:webhook_endpoint_id/rotate_secret',
    sValidator(
      'param',
      z.object({ webhook_endpoint_id: z.string().meta({ examples: ['whe_123'] }) }),
    ),
    sValidator('json', PublicRotateSecretBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/webhook_endpoints/:webhook_endpoint_id/test',
    sValidator(
      'param',
      z.object({ webhook_endpoint_id: z.string().meta({ examples: ['whe_123'] }) }),
    ),
    sValidator('json', PublicTestEndpointBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
