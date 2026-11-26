import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import * as v from 'valibot'
import { PnpMessagesRequestSchema, ErrorResponseSchema } from '../components'

export const botHandler = new Hono().post(
  '/bot/pnp/push',
  describeRoute({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/partner-docs/#send-line-notification-message',
    },
    tags: ['messaging-api'],
    operationId: 'pushMessagesByPhone',
    description: 'Send LINE notification message',
    responses: {
      '200': { description: 'OK' },
      '422': {
        description: 'Unprocessable Entity',
        content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
      },
    },
  }),
  validator(
    'header',
    v.partial(
      v.object({
        'x-line-delivery-tag': v.pipe(v.string(), v.minCodePoints(16), v.maxCodePoints(100)),
      }),
    ),
  ),
  validator('json', PnpMessagesRequestSchema),
  (c) => { throw new Error('Not implemented') },
)
