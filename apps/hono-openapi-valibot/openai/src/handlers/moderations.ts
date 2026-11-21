import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import * as v from 'valibot'
import {
  CreateModerationRequestSchema,
  CreateModerationResponseSchema,
  ErrorResponseSchema,
  CreateCSAMModerationResponseSchema,
  InferenceRateLimitedResponse,
  InferenceServiceUnavailableResponse,
} from '../components'

export const moderationsHandler = new Hono().post(
  '/moderations',
  describeRoute({
    operationId: 'createModeration',
    tags: ['Moderations'],
    summary: 'Create moderation',
    description:
      'Classifies if text and/or image inputs are potentially harmful. Learn\nmore in the [moderation guide](https://developers.openai.com/api/docs/guides/moderation).\n',
    responses: {
      '200': {
        description: 'OK',
        content: {
          'application/json': {
            schema: resolver(
              v.union([CreateModerationResponseSchema, CreateCSAMModerationResponseSchema]),
            ),
          },
        },
      },
      '400': {
        description: 'Invalid moderation input or unsupported request parameters.',
        content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
      },
      '403': {
        description: 'Access to the requested moderation model was denied.',
        content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
      },
      '429': InferenceRateLimitedResponse,
      '500': {
        description: 'The moderation request could not be processed due to an internal error.',
        content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
      },
      '503': InferenceServiceUnavailableResponse,
    },
  }),
  validator('json', CreateModerationRequestSchema),
  (c) => { throw new Error('Not implemented') },
)
