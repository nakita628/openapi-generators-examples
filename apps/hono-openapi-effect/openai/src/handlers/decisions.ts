import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import { Schema } from 'effect'
import { DecisionRequestSchema, DecisionResponseSchema } from '../components'

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
          'application/json': {
            schema: resolver(Schema.toStandardSchemaV1(DecisionResponseSchema)),
          },
        },
      },
    },
  }),
  validator('json', Schema.toStandardSchemaV1(DecisionRequestSchema)),
  (c) => { throw new Error('Not implemented') },
)
