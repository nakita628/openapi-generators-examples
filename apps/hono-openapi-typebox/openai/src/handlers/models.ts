import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import { Type, type StaticDecode, type StaticEncode, type TSchema } from 'typebox'
import { Compile } from 'typebox/compile'
import {
  DeleteModelResponseSchema,
  ErrorResponseSchema,
  ListModelsResponseSchema,
  ModelSchema,
  PermissionErrorResponseSchema,
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
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ListModelsResponseSchema)) },
          },
        },
        '403': {
          description: 'The API credential does not have permission to list models.',
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
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
          content: { 'application/json': { schema: resolver(toStandardSchemaV1(ModelSchema)) } },
        },
        '403': {
          description: 'The API credential does not have permission to retrieve models.',
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'The model was not found or is not accessible.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(Type.Object({ model: Type.String({ examples: ['gpt-6.2-astra'] }) })),
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
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(DeleteModelResponseSchema)) },
          },
        },
        '403': {
          description:
            'Insufficient permissions to delete the model. Model deletion requires the Owner role in the organization and a credential that permits deletion.',
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(PermissionErrorResponseSchema)),
            },
          },
        },
        '404': {
          description:
            'The model was not found, is not accessible, or cannot be deleted through this endpoint.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({
          model: Type.String({ examples: ['ft:gpt-4.1-mini-2025-04-14:acemeco:suffix:abc123'] }),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
