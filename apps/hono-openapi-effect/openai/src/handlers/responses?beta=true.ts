import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import { Schema, SchemaTransformation } from 'effect'
import {
  BetaErrorResponseSchema,
  BetaResponseSchema,
  BetaCreateResponseSchema,
  BetaResponseStreamEventSchema,
  InferenceRateLimitedResponse,
  InferenceServiceUnavailableResponse,
} from '../components'

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
          'application/json': { schema: resolver(Schema.toStandardSchemaV1(BetaResponseSchema)) },
          'text/event-stream': {
            schema: resolver(Schema.toStandardSchemaV1(BetaResponseStreamEventSchema)),
          },
        },
      },
      '400': {
        description: 'Invalid response request or incompatible request parameters.',
        content: {
          'application/json': {
            schema: resolver(Schema.toStandardSchemaV1(BetaErrorResponseSchema)),
          },
        },
      },
      '404': {
        description:
          'The requested model or a referenced resource was not found or is unavailable to this caller.',
        content: {
          'application/json': {
            schema: resolver(Schema.toStandardSchemaV1(BetaErrorResponseSchema)),
          },
        },
      },
      '429': InferenceRateLimitedResponse,
      '503': InferenceServiceUnavailableResponse,
    },
  }),
  validator(
    'header',
    Schema.toStandardSchemaV1(
      Schema.Struct({
        'openai-beta': Schema.optional(
          Schema.Unknown.pipe(
            Schema.decodeTo(
              Schema.Unknown,
              SchemaTransformation.transform<unknown, unknown>({
                decode: (input) => (input === undefined || Array.isArray(input) ? input : [input]),
                encode: (output) => output,
              }),
            ),
            Schema.decodeTo(Schema.Array(Schema.Literal('responses_multi_agent=v1'))),
          ),
        ),
      }),
    ),
  ),
  validator('json', Schema.toStandardSchemaV1(BetaCreateResponseSchema)),
  (c) => {},
)
