import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import * as z from 'zod'
import {
  BatchSchema,
  CreateBatchRequestSchema,
  ErrorResponseSchema,
  ListBatchesResponseSchema,
} from '../components'

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
          content: { 'application/json': { schema: resolver(ListBatchesResponseSchema) } },
        },
        '400': {
          description: 'Invalid pagination parameters.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '404': {
          description: 'No batch was found with the specified pagination cursor.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': {
          description: 'The request was rejected because a rate limit was exceeded.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
      },
    }),
    validator(
      'query',
      z.object({
        after: z.string().exactOptional(),
        limit: z.coerce.number().int().default(20).exactOptional(),
      }),
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
          content: { 'application/json': { schema: resolver(BatchSchema) } },
        },
        '400': {
          description: 'The request is invalid or the account cannot create a batch.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': {
          description: 'The request was rejected because a rate limit was exceeded.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '500': {
          description: 'An internal error prevented the batch from being created.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '503': {
          description:
            'The batch could not be created because the service is temporarily unavailable.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
      },
    }),
    validator('json', CreateBatchRequestSchema),
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
          content: { 'application/json': { schema: resolver(BatchSchema) } },
        },
        '400': {
          description: 'Invalid batch ID.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '404': {
          description: 'No batch was found with the specified ID.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': {
          description: 'The request was rejected because a rate limit was exceeded.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
      },
    }),
    validator('param', z.object({ batch_id: z.string() })),
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
          content: { 'application/json': { schema: resolver(BatchSchema) } },
        },
        '400': {
          description: 'Invalid batch ID.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '404': {
          description: 'No batch was found with the specified ID.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '409': {
          description: "The batch's current status does not allow cancellation.",
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': {
          description: 'The request was rejected because a rate limit was exceeded.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
      },
    }),
    validator('param', z.object({ batch_id: z.string() })),
    (c) => { throw new Error('Not implemented') },
  )
