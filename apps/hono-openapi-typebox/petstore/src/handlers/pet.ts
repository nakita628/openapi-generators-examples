import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import { Type, Codec } from 'typebox'
import { Compile } from 'typebox/compile'
import { PetSchema, ApiResponseSchema } from '../components'

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
            'application/json': { schema: resolver(Compile(PetSchema)) },
            'application/xml': { schema: resolver(Compile(PetSchema)) },
          },
        },
        '400': { description: 'Invalid ID supplied' },
        '404': { description: 'Pet not found' },
        '422': { description: 'Validation exception' },
        default: { description: 'Unexpected error' },
      },
      security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
    }),
    validator('json', Compile(PetSchema)),
    validator(
      'form',
      Compile(
        Type.Object({
          id: Type.Optional(
            Codec(Type.String())
              .Decode((value) => Number.parseInt(value, 10))
              .Encode((value) => String(value)),
          ),
          name: Type.String({ examples: ['doggie'] }),
          category: Type.Optional(
            Type.Object({
              id: Type.Optional(
                Codec(Type.String())
                  .Decode((value) => Number.parseInt(value, 10))
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
                  Codec(Type.String())
                    .Decode((value) => Number.parseInt(value, 10))
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
    (c) => {},
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
            'application/json': { schema: resolver(Compile(PetSchema)) },
            'application/xml': { schema: resolver(Compile(PetSchema)) },
          },
        },
        '400': { description: 'Invalid input' },
        '422': { description: 'Validation exception' },
        default: { description: 'Unexpected error' },
      },
      security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
    }),
    validator('json', Compile(PetSchema)),
    validator(
      'form',
      Compile(
        Type.Object({
          id: Type.Optional(
            Codec(Type.String())
              .Decode((value) => Number.parseInt(value, 10))
              .Encode((value) => String(value)),
          ),
          name: Type.String({ examples: ['doggie'] }),
          category: Type.Optional(
            Type.Object({
              id: Type.Optional(
                Codec(Type.String())
                  .Decode((value) => Number.parseInt(value, 10))
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
                  Codec(Type.String())
                    .Decode((value) => Number.parseInt(value, 10))
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
    (c) => {},
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
            'application/json': { schema: resolver(Compile(Type.Array(PetSchema))) },
            'application/xml': { schema: resolver(Compile(Type.Array(PetSchema))) },
          },
        },
        '400': { description: 'Invalid status value' },
        default: { description: 'Unexpected error' },
      },
      security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
    }),
    validator(
      'query',
      Compile(
        Type.Object({
          status: Type.Optional(
            Type.Union([Type.Literal('available'), Type.Literal('pending'), Type.Literal('sold')], {
              default: 'available',
            }),
          ),
        }),
      ),
    ),
    (c) => {},
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
            'application/json': { schema: resolver(Compile(Type.Array(PetSchema))) },
            'application/xml': { schema: resolver(Compile(Type.Array(PetSchema))) },
          },
        },
        '400': { description: 'Invalid tag value' },
        default: { description: 'Unexpected error' },
      },
      security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
    }),
    validator('query', Compile(Type.Object({ tags: Type.Array(Type.String()) }))),
    (c) => {},
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
            'application/json': { schema: resolver(Compile(PetSchema)) },
            'application/xml': { schema: resolver(Compile(PetSchema)) },
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
      Compile(
        Type.Object({
          petId: Codec(Type.String())
            .Decode((value) => Number.parseInt(value, 10))
            .Encode((value) => String(value)),
        }),
      ),
    ),
    (c) => {},
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
            'application/json': { schema: resolver(Compile(PetSchema)) },
            'application/xml': { schema: resolver(Compile(PetSchema)) },
          },
        },
        '400': { description: 'Invalid input' },
        default: { description: 'Unexpected error' },
      },
      security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
    }),
    validator(
      'param',
      Compile(
        Type.Object({
          petId: Codec(Type.String())
            .Decode((value) => Number.parseInt(value, 10))
            .Encode((value) => String(value)),
        }),
      ),
    ),
    validator(
      'query',
      Compile(
        Type.Object({ name: Type.Optional(Type.String()), status: Type.Optional(Type.String()) }),
      ),
    ),
    (c) => {},
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
      Compile(
        Type.Object({
          petId: Codec(Type.String())
            .Decode((value) => Number.parseInt(value, 10))
            .Encode((value) => String(value)),
        }),
      ),
    ),
    validator('header', Compile(Type.Object({ api_key: Type.Optional(Type.String()) }))),
    (c) => {},
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
          content: { 'application/json': { schema: resolver(Compile(ApiResponseSchema)) } },
        },
        '400': { description: 'No file uploaded' },
        '404': { description: 'Pet not found' },
        default: { description: 'Unexpected error' },
      },
      security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
    }),
    validator(
      'param',
      Compile(
        Type.Object({
          petId: Codec(Type.String())
            .Decode((value) => Number.parseInt(value, 10))
            .Encode((value) => String(value)),
        }),
      ),
    ),
    validator('query', Compile(Type.Object({ additionalMetadata: Type.Optional(Type.String()) }))),
    (c) => {},
  )
