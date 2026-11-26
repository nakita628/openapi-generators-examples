import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import { Schema } from 'effect'
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
        content: {
          'application/json': { schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)) },
        },
      },
    },
  }),
  validator(
    'header',
    Schema.toStandardSchemaV1(
      Schema.Struct({
        'x-line-delivery-tag': Schema.optionalKey(
          Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 16, {
              expected: 'a string of at least 16 characters',
            }),
            Schema.makeFilter((input) => [...input].length <= 100, {
              expected: 'a string of at most 100 characters',
            }),
          ),
        ),
      }),
    ),
  ),
  validator('json', Schema.toStandardSchemaV1(PnpMessagesRequestSchema)),
  (c) => { throw new Error('Not implemented') },
)
