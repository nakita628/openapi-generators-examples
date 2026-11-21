import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as v from 'valibot'
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
      v.partial(
        v.object({
          limit: v.pipe(
            v.string(),
            v.transform(Number),
            v.number(),
            v.safeInteger(),
            v.minValue(1),
            v.maxValue(100),
          ),
          after: v.union([
            v.pipe(v.string(), v.metadata({ examples: ['whe_123'] })),
            v.pipe(
              v.unknown(),
              v.transform((input) => (input === 'null' ? null : input)),
              v.nullable(v.null()),
            ),
          ]),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post('/webhook_endpoints', sValidator('json', PublicCreateEndpointBodySchema), (c) => { throw new Error('Not implemented') })
  .get(
    '/webhook_endpoints/:webhook_endpoint_id',
    sValidator(
      'param',
      v.object({ webhook_endpoint_id: v.pipe(v.string(), v.metadata({ examples: ['whe_123'] })) }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/webhook_endpoints/:webhook_endpoint_id',
    sValidator(
      'param',
      v.object({ webhook_endpoint_id: v.pipe(v.string(), v.metadata({ examples: ['whe_123'] })) }),
    ),
    sValidator('json', PublicUpdateEndpointBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/webhook_endpoints/:webhook_endpoint_id',
    sValidator(
      'param',
      v.object({ webhook_endpoint_id: v.pipe(v.string(), v.metadata({ examples: ['whe_123'] })) }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/webhook_endpoints/:webhook_endpoint_id/rotate_secret',
    sValidator(
      'param',
      v.object({ webhook_endpoint_id: v.pipe(v.string(), v.metadata({ examples: ['whe_123'] })) }),
    ),
    sValidator('json', PublicRotateSecretBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/webhook_endpoints/:webhook_endpoint_id/test',
    sValidator(
      'param',
      v.object({ webhook_endpoint_id: v.pipe(v.string(), v.metadata({ examples: ['whe_123'] })) }),
    ),
    sValidator('json', PublicTestEndpointBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
