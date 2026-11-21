import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import * as v from 'valibot'
import {
  CreateCompletionRequestSchema,
  CreateCompletionResponseSchema,
  ErrorResponseSchema,
  InferenceRateLimitedResponse,
  InferenceServiceUnavailableResponse,
} from '../components'

export const completionsHandler = new Hono().post(
  '/completions',
  describeRoute({
    operationId: 'createCompletion',
    tags: ['Completions'],
    summary: 'Create completion',
    description:
      'Creates a completion for the provided prompt and parameters.\n\nReturns a completion object, or a sequence of completion objects if the request is streamed.\n',
    responses: {
      '200': {
        description: 'OK',
        content: {
          'application/json': { schema: resolver(CreateCompletionResponseSchema) },
          'text/event-stream': { schema: resolver(CreateCompletionResponseSchema) },
        },
      },
      '400': {
        description: 'Invalid completion request or incompatible request parameters.',
        content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
      },
      '401': {
        description:
          'Authentication failed because the API key is missing or revoked, or the client IP is not authorized.',
        content: {
          'application/json': { schema: resolver(ErrorResponseSchema) },
          'text/plain': {
            schema: resolver(
              v.pipe(
                v.string(),
                v.description(
                  'JSON-encoded error text containing an error object and the HTTP status.',
                ),
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
              v.pipe(
                v.string(),
                v.description(
                  'JSON-encoded error text containing an error object and the HTTP status.',
                ),
              ),
            ),
          },
        },
      },
      '404': {
        description:
          'The requested model was not found, is unavailable, or does not support this endpoint.',
        content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
      },
      '429': InferenceRateLimitedResponse,
      '500': {
        description: 'The completion could not be processed due to an internal error.',
        content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
      },
      '503': InferenceServiceUnavailableResponse,
    },
  }),
  validator('json', CreateCompletionRequestSchema),
  (c) => { throw new Error('Not implemented') },
)
