import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import * as z from 'zod'
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
      z.object({
        limit: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int(),
          )
          .default(20)
          .exactOptional(),
        order: z.enum(['asc', 'desc']).default('desc').exactOptional(),
        after: z.string().exactOptional(),
        before: z.string().exactOptional(),
      }),
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
          content: { 'application/json': { schema: resolver(AssistantObjectSchema) } },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('json', CreateAssistantRequestSchema),
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
          content: { 'application/json': { schema: resolver(AssistantObjectSchema) } },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', z.object({ assistant_id: z.string() })),
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
          content: { 'application/json': { schema: resolver(AssistantObjectSchema) } },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', z.object({ assistant_id: z.string() })),
    validator('json', ModifyAssistantRequestSchema),
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
          content: { 'application/json': { schema: resolver(DeleteAssistantResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', z.object({ assistant_id: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
