import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import { Effect, Schema, SchemaTransformation } from 'effect'
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
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ContainerListResourceSchema)),
            },
          },
        },
        '404': {
          description: 'The container specified by `after` was not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
            .pipe(
              Schema.decodeTo(
                Schema.Finite,
                SchemaTransformation.transform({
                  decode: (input) => Number(input),
                  encode: (output) => String(output),
                }),
              ),
            )
            .check(Schema.isInt())
            .pipe(Schema.withDecodingDefaultType(Effect.succeed(20))),
          order: Schema.Literals(['asc', 'desc']).pipe(
            Schema.withDecodingDefaultType(Effect.succeed('desc')),
          ),
          after: Schema.optionalKey(Schema.String),
          name: Schema.optionalKey(Schema.String),
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
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ContainerResourceSchema)),
            },
          },
        },
        '400': {
          description: 'The container configuration or supplied skill is invalid.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('json', Schema.toStandardSchemaV1(CreateContainerBodySchema)),
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
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ContainerResourceSchema)),
            },
          },
        },
        '404': {
          description: 'The container was not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ container_id: Schema.String }))),
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
                Schema.toStandardSchemaV1(
                  Schema.Struct({
                    object: Schema.Literal('container.deleted'),
                    deleted: Schema.Boolean,
                    id: Schema.String,
                  }),
                ),
              ),
            },
          },
        },
        '404': {
          description: 'The container was not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ container_id: Schema.String }))),
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
              schema: resolver(Schema.toStandardSchemaV1(ContainerFileListResourceSchema)),
            },
          },
        },
        '404': {
          description:
            'The container was not found or has expired, or the file specified by `after` was not found.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ container_id: Schema.String }))),
    validator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
            .pipe(
              Schema.decodeTo(
                Schema.Finite,
                SchemaTransformation.transform({
                  decode: (input) => Number(input),
                  encode: (output) => String(output),
                }),
              ),
            )
            .check(Schema.isInt())
            .pipe(Schema.withDecodingDefaultType(Effect.succeed(20))),
          order: Schema.Literals(['asc', 'desc']).pipe(
            Schema.withDecodingDefaultType(Effect.succeed('desc')),
          ),
          after: Schema.optionalKey(Schema.String),
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
              schema: resolver(Schema.toStandardSchemaV1(ContainerFileResourceSchema)),
            },
          },
        },
        '400': {
          description: 'The file input is invalid, or the container file limit would be exceeded.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '404': {
          description: 'The container was not found or has expired.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', Schema.toStandardSchemaV1(Schema.Struct({ container_id: Schema.String }))),
    validator('json', Schema.toStandardSchemaV1(CreateContainerFileBodySchema)),
    validator('form', Schema.toStandardSchemaV1(CreateContainerFileBodySchema)),
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
              schema: resolver(Schema.toStandardSchemaV1(ContainerFileResourceSchema)),
            },
          },
        },
        '404': {
          description:
            'The container was not found or has expired, or the file was not found in the container.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ container_id: Schema.String, file_id: Schema.String }),
      ),
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
                Schema.toStandardSchemaV1(
                  Schema.Struct({
                    object: Schema.Literal('container.file.deleted'),
                    deleted: Schema.Boolean,
                    id: Schema.String,
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
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ container_id: Schema.String, file_id: Schema.String }),
      ),
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
          content: {
            '*/*': { schema: resolver(Schema.toStandardSchemaV1(Schema.instanceOf(File))) },
          },
        },
        '404': {
          description:
            'The container was not found or has expired, or the file was not found in the container.',
          content: {
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(ErrorResponseSchema)),
            },
          },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ container_id: Schema.String, file_id: Schema.String }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
