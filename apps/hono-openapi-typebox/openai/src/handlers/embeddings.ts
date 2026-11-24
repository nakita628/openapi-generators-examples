import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import { Type, type StaticDecode, type StaticEncode, type TSchema } from 'typebox'
import { Compile } from 'typebox/compile'
import {
  CreateEmbeddingRequestSchema,
  CreateEmbeddingResponseSchema,
  ErrorResponseSchema,
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

export const embeddingsHandler = new Hono().post(
  '/embeddings',
  describeRoute({
    operationId: 'createEmbedding',
    tags: ['Embeddings'],
    summary: 'Create embeddings',
    description: 'Creates an embedding vector representing the input text.',
    responses: {
      '200': {
        description: 'OK',
        content: {
          'application/json': {
            schema: resolver(toStandardSchemaV1(CreateEmbeddingResponseSchema)),
          },
        },
      },
      '400': {
        description: 'Invalid embedding input or request parameters.',
        content: {
          'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
        },
      },
      '401': {
        description:
          'Authentication failed because the API key is missing or revoked, or the client IP is not authorized.',
        content: {
          'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          'text/plain': {
            schema: resolver(
              toStandardSchemaV1(
                Type.String({
                  description:
                    'JSON-encoded error text containing an error object and the HTTP status.',
                }),
              ),
            ),
          },
        },
      },
      '403': {
        description: 'Access to a personal API organization is blocked by the organization policy.',
        content: {
          'text/plain': {
            schema: resolver(
              toStandardSchemaV1(
                Type.String({
                  description:
                    'JSON-encoded error text containing an error object and the HTTP status.',
                }),
              ),
            ),
          },
        },
      },
      '429': InferenceRateLimitedResponse,
      '500': {
        description: 'The embedding request could not be processed due to an internal error.',
        content: {
          'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
        },
      },
      '503': InferenceServiceUnavailableResponse,
    },
  }),
  validator('json', toStandardSchemaV1(CreateEmbeddingRequestSchema)),
  (c) => { throw new Error('Not implemented') },
)
