import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { type } from 'arktype'
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
      type({
        'limit?': type('string')
          .pipe((data, ctx) => {
            const value = Number(data)
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 1 & number.integer <= 100'),
        'after?': type('unknown').pipe((data, ctx) => {
          for (const branch of [
            type('string'),
            type('unknown')
              .pipe((data) => (data === 'null' ? null : data))
              .to('null | null'),
          ]) {
            const out = branch(data)
            if (!(out instanceof type.errors)) return out
          }
          return ctx.error('one of the members')
        }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post('/webhook_endpoints', sValidator('json', PublicCreateEndpointBodySchema), (c) => { throw new Error('Not implemented') })
  .get(
    '/webhook_endpoints/:webhook_endpoint_id',
    sValidator('param', type({ webhook_endpoint_id: 'string' })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/webhook_endpoints/:webhook_endpoint_id',
    sValidator('param', type({ webhook_endpoint_id: 'string' })),
    sValidator('json', PublicUpdateEndpointBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/webhook_endpoints/:webhook_endpoint_id',
    sValidator('param', type({ webhook_endpoint_id: 'string' })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/webhook_endpoints/:webhook_endpoint_id/rotate_secret',
    sValidator('param', type({ webhook_endpoint_id: 'string' })),
    sValidator('json', PublicRotateSecretBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/webhook_endpoints/:webhook_endpoint_id/test',
    sValidator('param', type({ webhook_endpoint_id: 'string' })),
    sValidator('json', PublicTestEndpointBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
