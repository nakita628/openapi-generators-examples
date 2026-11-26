import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import { Type, Codec, type StaticDecode, type StaticEncode, type TSchema } from 'typebox'
import { Compile } from 'typebox/compile'
import {
  BatchSchema,
  CreateBatchRequestSchema,
  ErrorResponseSchema,
  ListBatchesResponseSchema,
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

export const batchesHandler = new Hono()
  .get(
    '/batches',
    describeRoute({
      operationId: 'listBatches',
      tags: ['Batch'],
      summary: 'List batches',
      description: "List your organization's batches.",
      responses: {
        '200': {
          description: 'Batch listed successfully.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ListBatchesResponseSchema)) },
          },
        },
        '400': {
          description: 'Invalid pagination parameters.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '404': {
          description: 'No batch was found with the specified pagination cursor.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '429': {
          description: 'The request was rejected because a rate limit was exceeded.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
      },
    }),
    validator(
      'query',
      toStandardSchemaV1(
        Type.Object({
          after: Type.Optional(Type.String()),
          limit: Type.Optional(
            Codec(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '20' }),
                (value) => Number.isSafeInteger(Number(value)),
                () => 'must be a safe integer',
              ),
            )
              .Decode((value) => Number(value))
              .Encode((value) => String(value)),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/batches',
    describeRoute({
      summary: 'Create batch',
      description: 'Creates and executes a batch from an uploaded file of requests',
      operationId: 'createBatch',
      tags: ['Batch'],
      responses: {
        '200': {
          description: 'Batch created successfully.',
          content: { 'application/json': { schema: resolver(toStandardSchemaV1(BatchSchema)) } },
        },
        '400': {
          description: 'The request is invalid or the account cannot create a batch.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '429': {
          description: 'The request was rejected because a rate limit was exceeded.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '500': {
          description: 'An internal error prevented the batch from being created.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '503': {
          description:
            'The batch could not be created because the service is temporarily unavailable.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
      },
    }),
    validator('json', toStandardSchemaV1(CreateBatchRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/batches/:batch_id',
    describeRoute({
      operationId: 'retrieveBatch',
      tags: ['Batch'],
      summary: 'Retrieve batch',
      description: 'Retrieves a batch.',
      responses: {
        '200': {
          description: 'Batch retrieved successfully.',
          content: { 'application/json': { schema: resolver(toStandardSchemaV1(BatchSchema)) } },
        },
        '400': {
          description: 'Invalid batch ID.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '404': {
          description: 'No batch was found with the specified ID.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '429': {
          description: 'The request was rejected because a rate limit was exceeded.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
      },
    }),
    validator('param', toStandardSchemaV1(Type.Object({ batch_id: Type.String() }))),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/batches/:batch_id/cancel',
    describeRoute({
      operationId: 'cancelBatch',
      tags: ['Batch'],
      summary: 'Cancel batch',
      description:
        'Cancels an in-progress batch. The batch will be in status `cancelling` for up to 10 minutes, before changing to `cancelled`, where it will have partial results (if any) available in the output file.',
      responses: {
        '200': {
          description: "Batch is cancelling. Returns the cancelling batch's details.",
          content: { 'application/json': { schema: resolver(toStandardSchemaV1(BatchSchema)) } },
        },
        '400': {
          description: 'Invalid batch ID.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '404': {
          description: 'No batch was found with the specified ID.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '409': {
          description: "The batch's current status does not allow cancellation.",
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '429': {
          description: 'The request was rejected because a rate limit was exceeded.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
      },
    }),
    validator('param', toStandardSchemaV1(Type.Object({ batch_id: Type.String() }))),
    (c) => { throw new Error('Not implemented') },
  )
