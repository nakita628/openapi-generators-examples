import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import type { StaticDecode, StaticEncode, TSchema } from 'typebox'
import { Compile } from 'typebox/compile'
import { ErrorResponseSchema, WebhookEventTypeListResourceSchema } from '../components'

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

export const webhookEventTypesHandler = new Hono().get(
  '/webhook_event_types',
  describeRoute({
    summary: 'List Webhook Event Types',
    description: 'Returns webhook event types visible to the authenticated project.',
    operationId: 'ListWebhookEventTypes',
    responses: {
      '200': {
        description: 'Success',
        content: {
          'application/json': {
            schema: resolver(toStandardSchemaV1(WebhookEventTypeListResourceSchema)),
          },
        },
      },
      '401': {
        description: 'The request does not contain authentication credentials.',
        headers: {
          'WWW-Authenticate': {
            description: 'The bearer authentication challenge returned by the service.',
            schema: { type: 'string' },
            example: 'Bearer realm="OpenAI API"',
          },
        },
        content: {
          'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
        },
      },
    },
  }),
  (c) => { throw new Error('Not implemented') },
)
