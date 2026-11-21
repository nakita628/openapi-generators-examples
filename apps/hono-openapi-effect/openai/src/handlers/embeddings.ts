import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import { Schema } from 'effect'
import {
  CreateEmbeddingRequestSchema,
  CreateEmbeddingResponseSchema,
  ErrorResponseSchema,
  InferenceRateLimitedResponse,
  InferenceServiceUnavailableResponse,
} from '../components'

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
            schema: resolver(Schema.toStandardSchemaV1(CreateEmbeddingResponseSchema)),
          },
        },
      },
      '400': {
        description: 'Invalid embedding input or request parameters.',
        content: {
          'application/json': { schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)) },
        },
      },
      '401': {
        description:
          'Authentication failed because the API key is missing or revoked, or the client IP is not authorized.',
        content: {
          'application/json': { schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)) },
          'text/plain': {
            schema: resolver(
              Schema.toStandardSchemaV1(
                Schema.String.annotate({
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
              Schema.toStandardSchemaV1(
                Schema.String.annotate({
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
          'application/json': { schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)) },
        },
      },
      '503': InferenceServiceUnavailableResponse,
    },
  }),
  validator('json', Schema.toStandardSchemaV1(CreateEmbeddingRequestSchema)),
  (c) => { throw new Error('Not implemented') },
)
