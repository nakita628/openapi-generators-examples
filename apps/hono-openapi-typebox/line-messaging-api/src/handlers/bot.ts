import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import { Type, type StaticDecode, type StaticEncode, type TSchema } from 'typebox'
import { Compile } from 'typebox/compile'
import { PnpMessagesRequestSchema, ErrorResponseSchema } from '../components'

const toStandardSchemaV1 = <T extends TSchema>(schema: T) => {
  const validator = Compile(schema)
  return Object.assign(validator, {
    '~standard': {
      version: 1 as const,
      vendor: 'typebox',
      validate: (value: unknown) =>
        validator.Check(value)
          ? { value: validator.Decode(value) }
          : {
              issues: validator.Errors(value).map((error) => ({
                message: error.message,
                path: error.instancePath
                  .split('/')
                  .slice(1)
                  .map((key) => key.replaceAll('~1', '/').replaceAll('~0', '~')),
              })),
            },
      types: undefined as
        | { readonly input: StaticEncode<T>; readonly output: StaticDecode<T> }
        | undefined,
    },
  })
}

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
          'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
        },
      },
    },
  }),
  validator(
    'header',
    toStandardSchemaV1(
      Type.Object({
        'x-line-delivery-tag': Type.Optional(Type.String({ minLength: 16, maxLength: 100 })),
      }),
    ),
  ),
  validator('json', toStandardSchemaV1(PnpMessagesRequestSchema)),
  (c) => { throw new Error('Not implemented') },
)
