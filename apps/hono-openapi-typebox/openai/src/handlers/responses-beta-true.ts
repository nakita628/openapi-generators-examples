import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import { Type, type StaticDecode, type StaticEncode, type TSchema } from 'typebox'
import { Compile } from 'typebox/compile'
import {
  BetaErrorResponseSchema,
  BetaResponseSchema,
  BetaCreateResponseSchema,
  BetaResponseStreamEventSchema,
  InferenceRateLimitedResponse,
  InferenceServiceUnavailableResponse,
} from '../components'

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

export const responsesBetaTrueHandler = new Hono().post(
  '/responses?beta=true',
  describeRoute({
    operationId: 'beta_createResponse',
    tags: ['Responses'],
    summary: 'Create a model response',
    description:
      "Creates a model response. Provide [text](https://developers.openai.com/api/docs/guides/text) or\n[image](https://developers.openai.com/api/docs/guides/images-vision) inputs to generate [text](https://developers.openai.com/api/docs/guides/text)\nor [JSON](https://developers.openai.com/api/docs/guides/structured-outputs) outputs. Have the model call\nyour own [custom code](https://developers.openai.com/api/docs/guides/function-calling) or use built-in\n[tools](https://developers.openai.com/api/docs/guides/tools) like [web search](https://developers.openai.com/api/docs/guides/tools-web-search)\nor [file search](https://developers.openai.com/api/docs/guides/tools-file-search) to use your own data\nas input for the model's response.\n",
    responses: {
      '200': {
        description: 'OK',
        content: {
          'application/json': { schema: resolver(toStandardSchemaV1(BetaResponseSchema)) },
          'text/event-stream': {
            schema: resolver(toStandardSchemaV1(BetaResponseStreamEventSchema)),
          },
        },
      },
      '400': {
        description: 'Invalid response request or incompatible request parameters.',
        content: {
          'application/json': { schema: resolver(toStandardSchemaV1(BetaErrorResponseSchema)) },
        },
      },
      '404': {
        description:
          'The requested model or a referenced resource was not found or is unavailable to this caller.',
        content: {
          'application/json': { schema: resolver(toStandardSchemaV1(BetaErrorResponseSchema)) },
        },
      },
      '429': InferenceRateLimitedResponse,
      '503': InferenceServiceUnavailableResponse,
    },
  }),
  validator(
    'header',
    toStandardSchemaV1(
      Type.Object({
        'openai-beta': Type.Optional(Type.Array(Type.Literal('responses_multi_agent=v1'))),
      }),
    ),
  ),
  validator('json', toStandardSchemaV1(BetaCreateResponseSchema)),
  (c) => { throw new Error('Not implemented') },
)
