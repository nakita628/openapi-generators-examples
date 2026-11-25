import { Hono } from 'hono'
import { tbValidator } from '@hono/typebox-validator'
import { Type, Codec } from 'typebox'
import {
  PublicCreateEndpointBodySchema,
  PublicUpdateEndpointBodySchema,
  PublicRotateSecretBodySchema,
  PublicTestEndpointBodySchema,
} from '../components'

export const webhookEndpointsHandler = new Hono()
  .get(
    '/webhook_endpoints',
    tbValidator(
      'query',
      Type.Object({
        limit: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                (value) => Number(value) >= 1,
                () => 'must be >= 1',
              ),
              (value) => Number(value) <= 100,
              () => 'must be <= 100',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        after: Type.Optional(Type.Union([Type.String({ examples: ['whe_123'] }), Type.Null()])),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post('/webhook_endpoints', tbValidator('json', PublicCreateEndpointBodySchema), (c) => { throw new Error('Not implemented') })
  .get(
    '/webhook_endpoints/:webhook_endpoint_id',
    tbValidator(
      'param',
      Type.Object({ webhook_endpoint_id: Type.String({ examples: ['whe_123'] }) }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/webhook_endpoints/:webhook_endpoint_id',
    tbValidator(
      'param',
      Type.Object({ webhook_endpoint_id: Type.String({ examples: ['whe_123'] }) }),
    ),
    tbValidator('json', PublicUpdateEndpointBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/webhook_endpoints/:webhook_endpoint_id',
    tbValidator(
      'param',
      Type.Object({ webhook_endpoint_id: Type.String({ examples: ['whe_123'] }) }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/webhook_endpoints/:webhook_endpoint_id/rotate_secret',
    tbValidator(
      'param',
      Type.Object({ webhook_endpoint_id: Type.String({ examples: ['whe_123'] }) }),
    ),
    tbValidator('json', PublicRotateSecretBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/webhook_endpoints/:webhook_endpoint_id/test',
    tbValidator(
      'param',
      Type.Object({ webhook_endpoint_id: Type.String({ examples: ['whe_123'] }) }),
    ),
    tbValidator('json', PublicTestEndpointBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
