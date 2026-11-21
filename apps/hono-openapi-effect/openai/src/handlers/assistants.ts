import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import { Effect, Schema } from 'effect'
import {
  AssistantObjectSchema,
  CreateAssistantRequestSchema,
  DeleteAssistantResponseSchema,
  ListAssistantsResponseSchema,
  ModifyAssistantRequestSchema,
  TooManyRequestsResponse,
} from '../components'

export const assistantsHandler = new Hono()
  .get(
    '/assistants',
    describeRoute({
      operationId: 'listAssistants',
      tags: ['Assistants'],
      summary: 'List assistants',
      description: 'Returns a list of assistants.',
      deprecated: true,
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ListAssistantsResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.FiniteFromString.check(Schema.isInt()).pipe(
            Schema.withDecodingDefaultType(Effect.succeed(20)),
          ),
          order: Schema.Literals(['asc', 'desc']).pipe(
            Schema.withDecodingDefaultType(Effect.succeed('desc')),
          ),
          after: Schema.optional(Schema.String),
          before: Schema.optional(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/assistants',
    describeRoute({
      operationId: 'createAssistant',
      tags: ['Assistants'],
      summary: 'Create assistant',
      description: 'Create an assistant with a model and instructions.',
      deprecated: true,
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(AssistantObjectSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('json', Schema.toStandardSchemaV1(CreateAssistantRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/assistants/:assistant_id',
    describeRoute({
      operationId: 'getAssistant',
      tags: ['Assistants'],
      summary: 'Retrieve assistant',
      description: 'Retrieves an assistant.',
      deprecated: true,
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(AssistantObjectSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ assistant_id: Schema.String }))),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/assistants/:assistant_id',
    describeRoute({
      operationId: 'modifyAssistant',
      tags: ['Assistants'],
      summary: 'Modify assistant',
      description: 'Modifies an assistant.',
      deprecated: true,
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(AssistantObjectSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ assistant_id: Schema.String }))),
    validator('json', Schema.toStandardSchemaV1(ModifyAssistantRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/assistants/:assistant_id',
    describeRoute({
      operationId: 'deleteAssistant',
      tags: ['Assistants'],
      summary: 'Delete assistant',
      description: 'Delete an assistant.',
      deprecated: true,
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(DeleteAssistantResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ assistant_id: Schema.String }))),
    (c) => { throw new Error('Not implemented') },
  )
