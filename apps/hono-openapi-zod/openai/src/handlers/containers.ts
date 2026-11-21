import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import * as z from 'zod'
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
      z.object({
        limit: z.coerce.number().int().default(20).exactOptional(),
        order: z.enum(['asc', 'desc']).default('desc').exactOptional(),
        after: z.string().exactOptional(),
        name: z.string().exactOptional(),
      }),
    ),
    (c) => {},
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
    (c) => {},
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
    validator('param', z.object({ container_id: z.string() })),
    (c) => {},
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
                z.object({
                  object: z.literal('container.deleted'),
                  deleted: z.boolean(),
                  id: z.string(),
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
    validator('param', z.object({ container_id: z.string() })),
    (c) => {},
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
    validator('param', z.object({ container_id: z.string() })),
    validator(
      'query',
      z.object({
        limit: z.coerce.number().int().default(20).exactOptional(),
        order: z.enum(['asc', 'desc']).default('desc').exactOptional(),
        after: z.string().exactOptional(),
      }),
    ),
    (c) => {},
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
    validator('param', z.object({ container_id: z.string() })),
    validator('json', CreateContainerFileBodySchema),
    validator('form', CreateContainerFileBodySchema),
    (c) => {},
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
    validator('param', z.object({ container_id: z.string(), file_id: z.string() })),
    (c) => {},
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
                z.object({
                  object: z.literal('container.file.deleted'),
                  deleted: z.boolean(),
                  id: z.string(),
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
    validator('param', z.object({ container_id: z.string(), file_id: z.string() })),
    (c) => {},
  )
  .get(
    '/containers/:container_id/files/:file_id/content',
    describeRoute({
      summary: 'Retrieve container file content',
      description: 'Retrieve Container File Content',
      operationId: 'RetrieveContainerFileContent',
      responses: {
        '200': { description: 'Success', content: { '*/*': { schema: resolver(z.file()) } } },
        '404': {
          description:
            'The container was not found or has expired, or the file was not found in the container.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', z.object({ container_id: z.string(), file_id: z.string() })),
    (c) => {},
  )
