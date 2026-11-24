import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import { Type, Codec, type StaticDecode, type StaticEncode, type TSchema } from 'typebox'
import { Compile } from 'typebox/compile'
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
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(ContainerListResourceSchema)),
            },
          },
        },
        '404': {
          description: 'The container specified by `after` was not found.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'query',
      toStandardSchemaV1(
        Type.Object({
          limit: Type.Optional(
            Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '20' }))
              .Decode((value) => Number(value))
              .Encode((value) => String(value)),
          ),
          order: Type.Optional(
            Type.Union([Type.Literal('asc'), Type.Literal('desc')], { default: 'desc' }),
          ),
          after: Type.Optional(Type.String()),
          name: Type.Optional(Type.String()),
        }),
      ),
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
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ContainerResourceSchema)) },
          },
        },
        '400': {
          description: 'The container configuration or supplied skill is invalid.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('json', toStandardSchemaV1(CreateContainerBodySchema)),
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
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ContainerResourceSchema)) },
          },
        },
        '404': {
          description: 'The container was not found.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', toStandardSchemaV1(Type.Object({ container_id: Type.String() }))),
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
                toStandardSchemaV1(
                  Type.Object({
                    object: Type.Literal('container.deleted'),
                    deleted: Type.Boolean(),
                    id: Type.String(),
                  }),
                ),
              ),
            },
          },
        },
        '404': {
          description: 'The container was not found.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', toStandardSchemaV1(Type.Object({ container_id: Type.String() }))),
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
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(ContainerFileListResourceSchema)),
            },
          },
        },
        '404': {
          description:
            'The container was not found or has expired, or the file specified by `after` was not found.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', toStandardSchemaV1(Type.Object({ container_id: Type.String() }))),
    validator(
      'query',
      toStandardSchemaV1(
        Type.Object({
          limit: Type.Optional(
            Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '20' }))
              .Decode((value) => Number(value))
              .Encode((value) => String(value)),
          ),
          order: Type.Optional(
            Type.Union([Type.Literal('asc'), Type.Literal('desc')], { default: 'desc' }),
          ),
          after: Type.Optional(Type.String()),
        }),
      ),
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
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(ContainerFileResourceSchema)),
            },
          },
        },
        '400': {
          description: 'The file input is invalid, or the container file limit would be exceeded.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '404': {
          description: 'The container was not found or has expired.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', toStandardSchemaV1(Type.Object({ container_id: Type.String() }))),
    validator('json', toStandardSchemaV1(CreateContainerFileBodySchema)),
    validator('form', toStandardSchemaV1(CreateContainerFileBodySchema)),
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
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(ContainerFileResourceSchema)),
            },
          },
        },
        '404': {
          description:
            'The container was not found or has expired, or the file was not found in the container.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(Type.Object({ container_id: Type.String(), file_id: Type.String() })),
    ),
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
                toStandardSchemaV1(
                  Type.Object({
                    object: Type.Literal('container.file.deleted'),
                    deleted: Type.Boolean(),
                    id: Type.String(),
                  }),
                ),
              ),
            },
          },
        },
        '404': {
          description:
            'The container was not found or has expired, or the file was not found in the container.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(Type.Object({ container_id: Type.String(), file_id: Type.String() })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/containers/:container_id/files/:file_id/content',
    describeRoute({
      summary: 'Retrieve container file content',
      description: 'Retrieve Container File Content',
      operationId: 'RetrieveContainerFileContent',
      responses: {
        '200': {
          description: 'Success',
          content: { '*/*': { schema: resolver(toStandardSchemaV1(Type.String())) } },
        },
        '404': {
          description:
            'The container was not found or has expired, or the file was not found in the container.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponseSchema)) },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(Type.Object({ container_id: Type.String(), file_id: Type.String() })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
