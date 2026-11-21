import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import * as v from 'valibot'
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
          content: { 'application/json': { schema: resolver(ListAssistantsResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'query',
      v.object({
        limit: v.optional(
          v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()),
          '20',
        ),
        order: v.optional(v.picklist(['asc', 'desc']), 'desc'),
        after: v.optional(v.string()),
        before: v.optional(v.string()),
      }),
    ),
    (c) => {},
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
          content: { 'application/json': { schema: resolver(AssistantObjectSchema) } },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('json', CreateAssistantRequestSchema),
    (c) => {},
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
          content: { 'application/json': { schema: resolver(AssistantObjectSchema) } },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', v.object({ assistant_id: v.string() })),
    (c) => {},
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
          content: { 'application/json': { schema: resolver(AssistantObjectSchema) } },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', v.object({ assistant_id: v.string() })),
    validator('json', ModifyAssistantRequestSchema),
    (c) => {},
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
          content: { 'application/json': { schema: resolver(DeleteAssistantResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', v.object({ assistant_id: v.string() })),
    (c) => {},
  )
