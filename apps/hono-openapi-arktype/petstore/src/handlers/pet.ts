import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import { type } from 'arktype'
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
            'application/json': { schema: resolver(PetSchema) },
            'application/xml': { schema: resolver(PetSchema) },
          },
        },
        '400': { description: 'Invalid ID supplied' },
        '404': { description: 'Pet not found' },
        '422': { description: 'Validation exception' },
        default: { description: 'Unexpected error' },
      },
      security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
    }),
    validator('json', PetSchema),
    validator(
      'form',
      type({
        'id?': type('string')
          .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          ),
        name: 'string',
        'category?': type({
          'id?': type('string')
            .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
            .narrow(
              (data, ctx) =>
                (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
                ctx.mustBe('an int64'),
            ),
          'name?': 'string',
        }),
        photoUrls: type('unknown')
          .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
          .to('string[]'),
        'tags?': type('unknown').pipe(
          (data) => (data === undefined || Array.isArray(data) ? data : [data]),
          type(
            type({
              'id?': type('string')
                .pipe((data, ctx) =>
                  /^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer'),
                )
                .narrow(
                  (data, ctx) =>
                    (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
                    ctx.mustBe('an int64'),
                ),
              'name?': 'string',
            }),
          ).array(),
        ),
        'status?': type("'available' | 'pending' | 'sold'").describe('pet status in the store'),
      }),
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
            'application/json': { schema: resolver(PetSchema) },
            'application/xml': { schema: resolver(PetSchema) },
          },
        },
        '400': { description: 'Invalid input' },
        '422': { description: 'Validation exception' },
        default: { description: 'Unexpected error' },
      },
      security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
    }),
    validator('json', PetSchema),
    validator(
      'form',
      type({
        'id?': type('string')
          .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          ),
        name: 'string',
        'category?': type({
          'id?': type('string')
            .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
            .narrow(
              (data, ctx) =>
                (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
                ctx.mustBe('an int64'),
            ),
          'name?': 'string',
        }),
        photoUrls: type('unknown')
          .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
          .to('string[]'),
        'tags?': type('unknown').pipe(
          (data) => (data === undefined || Array.isArray(data) ? data : [data]),
          type(
            type({
              'id?': type('string')
                .pipe((data, ctx) =>
                  /^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer'),
                )
                .narrow(
                  (data, ctx) =>
                    (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
                    ctx.mustBe('an int64'),
                ),
              'name?': 'string',
            }),
          ).array(),
        ),
        'status?': type("'available' | 'pending' | 'sold'").describe('pet status in the store'),
      }),
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
            'application/json': { schema: resolver(type(PetSchema).array()) },
            'application/xml': { schema: resolver(type(PetSchema).array()) },
          },
        },
        '400': { description: 'Invalid status value' },
        default: { description: 'Unexpected error' },
      },
      security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
    }),
    validator('query', type({ status: "'available' | 'pending' | 'sold'" })),
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
            'application/json': { schema: resolver(type(PetSchema).array()) },
            'application/xml': { schema: resolver(type(PetSchema).array()) },
          },
        },
        '400': { description: 'Invalid tag value' },
        default: { description: 'Unexpected error' },
      },
      security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
    }),
    validator(
      'query',
      type({
        tags: type('unknown')
          .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
          .to('string[]'),
      }),
    ),
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
            'application/json': { schema: resolver(PetSchema) },
            'application/xml': { schema: resolver(PetSchema) },
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
      type({
        petId: type('string')
          .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          ),
      }),
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
            'application/json': { schema: resolver(PetSchema) },
            'application/xml': { schema: resolver(PetSchema) },
          },
        },
        '400': { description: 'Invalid input' },
        default: { description: 'Unexpected error' },
      },
      security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
    }),
    validator(
      'param',
      type({
        petId: type('string')
          .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          ),
      }),
    ),
    validator('query', type({ 'name?': 'string', 'status?': 'string' })),
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
      type({
        petId: type('string')
          .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          ),
      }),
    ),
    validator('header', type({ 'api_key?': 'string' })),
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
          content: { 'application/json': { schema: resolver(ApiResponseSchema) } },
        },
        '400': { description: 'No file uploaded' },
        '404': { description: 'Pet not found' },
        default: { description: 'Unexpected error' },
      },
      security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
    }),
    validator(
      'param',
      type({
        petId: type('string')
          .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          ),
      }),
    ),
    validator('query', type({ 'additionalMetadata?': 'string' })),
    (c) => {},
  )
