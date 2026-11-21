import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import * as v from 'valibot'
import {
  ContainerFileListResourceSchema,
  ContainerFileResourceSchema,
  ContainerListResourceSchema,
  ContainerResourceSchema,
  CreateContainerBodySchema,
  CreateContainerFileBodySchema,
  ErrorResponseSchema,
  TooManyRequestsResponse,
} from '../components'

export const containersHandler = new Hono()
  .get(
    '/containers',
    describeRoute({
      summary: 'List containers',
      description: 'List Containers',
      operationId: 'ListContainers',
      responses: {
        '200': {
          description: 'Success',
          content: { 'application/json': { schema: resolver(ContainerListResourceSchema) } },
        },
        '404': {
          description: 'The container specified by `after` was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
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
        name: v.optional(v.string()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/containers',
    describeRoute({
      summary: 'Create container',
      description: 'Create Container',
      operationId: 'CreateContainer',
      responses: {
        '200': {
          description: 'Success',
          content: { 'application/json': { schema: resolver(ContainerResourceSchema) } },
        },
        '400': {
          description: 'The container configuration or supplied skill is invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('json', CreateContainerBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/containers/:container_id',
    describeRoute({
      summary: 'Retrieve container',
      description: 'Retrieve Container',
      operationId: 'RetrieveContainer',
      responses: {
        '200': {
          description: 'Success',
          content: { 'application/json': { schema: resolver(ContainerResourceSchema) } },
        },
        '404': {
          description: 'The container was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', v.object({ container_id: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/containers/:container_id',
    describeRoute({
      operationId: 'DeleteContainer',
      summary: 'Delete a container',
      description: 'Delete Container',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(
                v.object({
                  object: v.literal('container.deleted'),
                  deleted: v.boolean(),
                  id: v.string(),
                }),
              ),
            },
          },
        },
        '404': {
          description: 'The container was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', v.object({ container_id: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/containers/:container_id/files',
    describeRoute({
      summary: 'List container files',
      description: 'List Container files',
      operationId: 'ListContainerFiles',
      responses: {
        '200': {
          description: 'Success',
          content: { 'application/json': { schema: resolver(ContainerFileListResourceSchema) } },
        },
        '404': {
          description:
            'The container was not found or has expired, or the file specified by `after` was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', v.object({ container_id: v.string() })),
    validator(
      'query',
      v.object({
        limit: v.optional(
          v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()),
          '20',
        ),
        order: v.optional(v.picklist(['asc', 'desc']), 'desc'),
        after: v.optional(v.string()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/containers/:container_id/files',
    describeRoute({
      summary: 'Create container file',
      description:
        'Create a Container File\n\nYou can send either a multipart/form-data request with the raw file content, or a JSON request with a file ID.\n',
      operationId: 'CreateContainerFile',
      responses: {
        '200': {
          description: 'Success',
          content: { 'application/json': { schema: resolver(ContainerFileResourceSchema) } },
        },
        '400': {
          description: 'The file input is invalid, or the container file limit would be exceeded.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '404': {
          description: 'The container was not found or has expired.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', v.object({ container_id: v.string() })),
    validator('json', CreateContainerFileBodySchema),
    validator('form', CreateContainerFileBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/containers/:container_id/files/:file_id',
    describeRoute({
      summary: 'Retrieve container file',
      description: 'Retrieve Container File',
      operationId: 'RetrieveContainerFile',
      responses: {
        '200': {
          description: 'Success',
          content: { 'application/json': { schema: resolver(ContainerFileResourceSchema) } },
        },
        '404': {
          description:
            'The container was not found or has expired, or the file was not found in the container.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', v.object({ container_id: v.string(), file_id: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/containers/:container_id/files/:file_id',
    describeRoute({
      operationId: 'DeleteContainerFile',
      summary: 'Delete a container file',
      description: 'Delete Container File',
      responses: {
        '200': {
          description: 'OK',
          content: {
            'application/json': {
              schema: resolver(
                v.object({
                  object: v.literal('container.file.deleted'),
                  deleted: v.boolean(),
                  id: v.string(),
                }),
              ),
            },
          },
        },
        '404': {
          description:
            'The container was not found or has expired, or the file was not found in the container.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', v.object({ container_id: v.string(), file_id: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/containers/:container_id/files/:file_id/content',
    describeRoute({
      summary: 'Retrieve container file content',
      description: 'Retrieve Container File Content',
      operationId: 'RetrieveContainerFileContent',
      responses: {
        '200': { description: 'Success', content: { '*/*': { schema: resolver(v.file()) } } },
        '404': {
          description:
            'The container was not found or has expired, or the file was not found in the container.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', v.object({ container_id: v.string(), file_id: v.string() })),
    (c) => { throw new Error('Not implemented') },
  )
