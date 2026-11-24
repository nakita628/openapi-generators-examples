import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import { type } from 'arktype'
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
      type({
        'limit?': type('string').pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
        'order?': "'asc' | 'desc'",
        'after?': 'string',
        'name?': 'string',
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
    validator('param', type({ container_id: 'string' })),
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
                type({ object: "'container.deleted'", deleted: 'boolean', id: 'string' }),
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
    validator('param', type({ container_id: 'string' })),
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
    validator('param', type({ container_id: 'string' })),
    validator(
      'query',
      type({
        'limit?': type('string').pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
        'order?': "'asc' | 'desc'",
        'after?': 'string',
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
    validator('param', type({ container_id: 'string' })),
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
    validator('param', type({ container_id: 'string', file_id: 'string' })),
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
                type({ object: "'container.file.deleted'", deleted: 'boolean', id: 'string' }),
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
    validator('param', type({ container_id: 'string', file_id: 'string' })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/containers/:container_id/files/:file_id/content',
    describeRoute({
      summary: 'Retrieve container file content',
      description: 'Retrieve Container File Content',
      operationId: 'RetrieveContainerFileContent',
      responses: {
        '200': { description: 'Success', content: { '*/*': { schema: resolver(type('File')) } } },
        '404': {
          description:
            'The container was not found or has expired, or the file was not found in the container.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', type({ container_id: 'string', file_id: 'string' })),
    (c) => { throw new Error('Not implemented') },
  )
