import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import { Type, Codec, type StaticDecode, type StaticEncode, type TSchema } from 'typebox'
import { Compile } from 'typebox/compile'
import { PetSchema, ApiResponseSchema } from '../components'

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

export const petHandler = new Hono()
  .put(
    '/pet',
    describeRoute({
      tags: ['pet'],
      summary: 'Update an existing pet.',
      description: 'Update an existing pet by Id.',
      operationId: 'updatePet',
      responses: {
        '200': {
          description: 'Successful operation',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(PetSchema)) },
            'application/xml': { schema: resolver(toStandardSchemaV1(PetSchema)) },
          },
        },
        '400': { description: 'Invalid ID supplied' },
        '404': { description: 'Pet not found' },
        '422': { description: 'Validation exception' },
        default: { description: 'Unexpected error' },
      },
      security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
    }),
    validator('json', toStandardSchemaV1(PetSchema)),
    validator(
      'form',
      toStandardSchemaV1(
        Type.Object({
          id: Type.Optional(
            Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
              .Decode((value) => Number(value))
              .Encode((value) => String(value)),
          ),
          name: Type.String({ examples: ['doggie'] }),
          category: Type.Optional(
            Type.Object({
              id: Type.Optional(
                Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
                  .Decode((value) => Number(value))
                  .Encode((value) => String(value)),
              ),
              name: Type.Optional(Type.String({ examples: ['Dogs'] })),
            }),
          ),
          photoUrls: Type.Array(Type.String()),
          tags: Type.Optional(
            Type.Array(
              Type.Object({
                id: Type.Optional(
                  Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
                    .Decode((value) => Number(value))
                    .Encode((value) => String(value)),
                ),
                name: Type.Optional(Type.String()),
              }),
            ),
          ),
          status: Type.Optional(
            Type.Union([Type.Literal('available'), Type.Literal('pending'), Type.Literal('sold')], {
              description: 'pet status in the store',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/pet',
    describeRoute({
      tags: ['pet'],
      summary: 'Add a new pet to the store.',
      description: 'Add a new pet to the store.',
      operationId: 'addPet',
      responses: {
        '200': {
          description: 'Successful operation',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(PetSchema)) },
            'application/xml': { schema: resolver(toStandardSchemaV1(PetSchema)) },
          },
        },
        '400': { description: 'Invalid input' },
        '422': { description: 'Validation exception' },
        default: { description: 'Unexpected error' },
      },
      security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
    }),
    validator('json', toStandardSchemaV1(PetSchema)),
    validator(
      'form',
      toStandardSchemaV1(
        Type.Object({
          id: Type.Optional(
            Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
              .Decode((value) => Number(value))
              .Encode((value) => String(value)),
          ),
          name: Type.String({ examples: ['doggie'] }),
          category: Type.Optional(
            Type.Object({
              id: Type.Optional(
                Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
                  .Decode((value) => Number(value))
                  .Encode((value) => String(value)),
              ),
              name: Type.Optional(Type.String({ examples: ['Dogs'] })),
            }),
          ),
          photoUrls: Type.Array(Type.String()),
          tags: Type.Optional(
            Type.Array(
              Type.Object({
                id: Type.Optional(
                  Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
                    .Decode((value) => Number(value))
                    .Encode((value) => String(value)),
                ),
                name: Type.Optional(Type.String()),
              }),
            ),
          ),
          status: Type.Optional(
            Type.Union([Type.Literal('available'), Type.Literal('pending'), Type.Literal('sold')], {
              description: 'pet status in the store',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/pet/findByStatus',
    describeRoute({
      tags: ['pet'],
      summary: 'Finds Pets by status.',
      description: 'Multiple status values can be provided with comma separated strings.',
      operationId: 'findPetsByStatus',
      responses: {
        '200': {
          description: 'successful operation',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(Type.Array(PetSchema))) },
            'application/xml': { schema: resolver(toStandardSchemaV1(Type.Array(PetSchema))) },
          },
        },
        '400': { description: 'Invalid status value' },
        default: { description: 'Unexpected error' },
      },
      security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
    }),
    validator(
      'query',
      toStandardSchemaV1(
        Type.Object({
          status: Type.Optional(
            Type.Union([Type.Literal('available'), Type.Literal('pending'), Type.Literal('sold')], {
              default: 'available',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/pet/findByTags',
    describeRoute({
      tags: ['pet'],
      summary: 'Finds Pets by tags.',
      description:
        'Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.',
      operationId: 'findPetsByTags',
      responses: {
        '200': {
          description: 'successful operation',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(Type.Array(PetSchema))) },
            'application/xml': { schema: resolver(toStandardSchemaV1(Type.Array(PetSchema))) },
          },
        },
        '400': { description: 'Invalid tag value' },
        default: { description: 'Unexpected error' },
      },
      security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
    }),
    validator('query', toStandardSchemaV1(Type.Object({ tags: Type.Array(Type.String()) }))),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/pet/:petId',
    describeRoute({
      tags: ['pet'],
      summary: 'Find pet by ID.',
      description: 'Returns a single pet.',
      operationId: 'getPetById',
      responses: {
        '200': {
          description: 'successful operation',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(PetSchema)) },
            'application/xml': { schema: resolver(toStandardSchemaV1(PetSchema)) },
          },
        },
        '400': { description: 'Invalid ID supplied' },
        '404': { description: 'Pet not found' },
        default: { description: 'Unexpected error' },
      },
      security: [{ api_key: [] }, { petstore_auth: ['write:pets', 'read:pets'] }],
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({
          petId: Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/pet/:petId',
    describeRoute({
      tags: ['pet'],
      summary: 'Updates a pet in the store with form data.',
      description: 'Updates a pet resource based on the form data.',
      operationId: 'updatePetWithForm',
      responses: {
        '200': {
          description: 'successful operation',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(PetSchema)) },
            'application/xml': { schema: resolver(toStandardSchemaV1(PetSchema)) },
          },
        },
        '400': { description: 'Invalid input' },
        default: { description: 'Unexpected error' },
      },
      security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({
          petId: Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        }),
      ),
    ),
    validator(
      'query',
      toStandardSchemaV1(
        Type.Object({ name: Type.Optional(Type.String()), status: Type.Optional(Type.String()) }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/pet/:petId',
    describeRoute({
      tags: ['pet'],
      summary: 'Deletes a pet.',
      description: 'Delete a pet.',
      operationId: 'deletePet',
      responses: {
        '200': { description: 'Pet deleted' },
        '400': { description: 'Invalid pet value' },
        default: { description: 'Unexpected error' },
      },
      security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({
          petId: Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        }),
      ),
    ),
    validator('header', toStandardSchemaV1(Type.Object({ api_key: Type.Optional(Type.String()) }))),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/pet/:petId/uploadImage',
    describeRoute({
      tags: ['pet'],
      summary: 'Uploads an image.',
      description: 'Upload image of the pet.',
      operationId: 'uploadFile',
      responses: {
        '200': {
          description: 'successful operation',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ApiResponseSchema)) },
          },
        },
        '400': { description: 'No file uploaded' },
        '404': { description: 'Pet not found' },
        default: { description: 'Unexpected error' },
      },
      security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({
          petId: Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        }),
      ),
    ),
    validator(
      'query',
      toStandardSchemaV1(Type.Object({ additionalMetadata: Type.Optional(Type.String()) })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
