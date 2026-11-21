import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import * as v from 'valibot'
import {
  DeleteModelResponseSchema,
  ErrorResponseSchema,
  ListModelsResponseSchema,
  ModelSchema,
  PermissionErrorResponseSchema,
} from '../components'

export const modelsHandler = new Hono()
  .get(
    '/models',
    describeRoute({
      operationId: 'listModels',
      tags: ['Models'],
      summary: 'List models',
      description:
        'Lists the currently available models, and provides basic information about each one such as the owner and availability.',
      responses: {
        '200': {
          description: 'OK',
          content: { 'application/json': { schema: resolver(ListModelsResponseSchema) } },
        },
        '403': {
          description: 'The API credential does not have permission to list models.',
          content: { 'application/json': { schema: resolver(PermissionErrorResponseSchema) } },
        },
      },
    }),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/models/:model',
    describeRoute({
      operationId: 'retrieveModel',
      tags: ['Models'],
      summary: 'Retrieve model',
      description:
        'Retrieves a model instance, providing basic information about the model such as the owner and permissioning.',
      responses: {
        '200': {
          description: 'OK',
          content: { 'application/json': { schema: resolver(ModelSchema) } },
        },
        '403': {
          description: 'The API credential does not have permission to retrieve models.',
          content: { 'application/json': { schema: resolver(PermissionErrorResponseSchema) } },
        },
        '404': {
          description: 'The model was not found or is not accessible.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
      },
    }),
    validator(
      'param',
      v.object({ model: v.pipe(v.string(), v.metadata({ examples: ['gpt-6.2-astra'] })) }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/models/:model',
    describeRoute({
      operationId: 'deleteModel',
      tags: ['Models'],
      summary: 'Delete a fine-tuned model',
      description:
        'Delete a fine-tuned model. You must have the Owner role in your organization to delete a model.',
      responses: {
        '200': {
          description: 'OK',
          content: { 'application/json': { schema: resolver(DeleteModelResponseSchema) } },
        },
        '403': {
          description:
            'Insufficient permissions to delete the model. Model deletion requires the Owner role in the organization and a credential that permits deletion.',
          content: { 'application/json': { schema: resolver(PermissionErrorResponseSchema) } },
        },
        '404': {
          description:
            'The model was not found, is not accessible, or cannot be deleted through this endpoint.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
      },
    }),
    validator(
      'param',
      v.object({
        model: v.pipe(
          v.string(),
          v.metadata({ examples: ['ft:gpt-4.1-mini-2025-04-14:acemeco:suffix:abc123'] }),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
