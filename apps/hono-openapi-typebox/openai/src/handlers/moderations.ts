import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import { Type, type StaticDecode, type StaticEncode, type TSchema } from 'typebox'
import { Compile } from 'typebox/compile'
import {
  CreateModerationRequestSchema,
  CreateModerationResponseSchema,
  ErrorResponseSchema,
  CreateCSAMModerationResponseSchema,
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
              toStandardSchemaV1(
                Type.Union([CreateModerationResponseSchema, CreateCSAMModerationResponseSchema]),
              ),
            ),
          },
        },
      },
      '400': {
        description: 'Invalid moderation input or unsupported request parameters.',
        content: {
          'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
        },
      },
      '403': {
        description: 'Access to the requested moderation model was denied.',
        content: {
          'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
        },
      },
      '429': InferenceRateLimitedResponse,
      '500': {
        description: 'The moderation request could not be processed due to an internal error.',
        content: {
          'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
        },
      },
      '503': InferenceServiceUnavailableResponse,
    },
  }),
  validator('json', toStandardSchemaV1(CreateModerationRequestSchema)),
  (c) => { throw new Error('Not implemented') },
)
