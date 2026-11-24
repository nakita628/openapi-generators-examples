import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import type { StaticDecode, StaticEncode, TSchema } from 'typebox'
import { Compile } from 'typebox/compile'
import { DecisionRequestSchema, DecisionResponseSchema } from '../components'

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

export const decisionsHandler = new Hono().post(
  '/decisions',
  describeRoute({
    operationId: 'createDecision',
    summary: 'Create a decision',
    description:
      'Use this endpoint to quickly answer classification or scoring questions about some input. You can ask multiple questions in one request.',
    tags: ['Decisions'],
    responses: {
      '200': {
        description: 'The answers and token usage.',
        content: {
          'application/json': { schema: resolver(toStandardSchemaV1(DecisionResponseSchema)) },
        },
      },
    },
  }),
  validator('json', toStandardSchemaV1(DecisionRequestSchema)),
  (c) => { throw new Error('Not implemented') },
)
