import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import { type } from 'arktype'
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
    type({
      'x-line-delivery-tag?': type('string')
        .narrow((data, ctx) => [...data].length >= 16 || ctx.mustBe('at least 16 characters'))
        .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
    }),
  ),
  validator('json', PnpMessagesRequestSchema),
  (c) => { throw new Error('Not implemented') },
)
