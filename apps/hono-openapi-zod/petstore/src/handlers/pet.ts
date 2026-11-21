import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import * as z from 'zod'
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
      z.object({
        id: z.coerce
          .bigint()
          .pipe(z.int64())
          .meta({ examples: [10] })
          .exactOptional(),
        name: z.string().meta({ examples: ['doggie'] }),
        category: z
          .object({
            id: z.coerce
              .bigint()
              .pipe(z.int64())
              .meta({ examples: [1] })
              .exactOptional(),
            name: z
              .string()
              .meta({ examples: ['Dogs'] })
              .exactOptional(),
          })
          .exactOptional(),
        photoUrls: z.preprocess(
          (val) => (val === undefined || Array.isArray(val) ? val : [val]),
          z.array(z.string()),
        ),
        tags: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(
              z.object({
                id: z.coerce.bigint().pipe(z.int64()).exactOptional(),
                name: z.string().exactOptional(),
              }),
            ),
          )
          .exactOptional(),
        status: z
          .enum(['available', 'pending', 'sold'])
          .meta({ description: 'pet status in the store' })
          .exactOptional(),
      }),
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
      z.object({
        id: z.coerce
          .bigint()
          .pipe(z.int64())
          .meta({ examples: [10] })
          .exactOptional(),
        name: z.string().meta({ examples: ['doggie'] }),
        category: z
          .object({
            id: z.coerce
              .bigint()
              .pipe(z.int64())
              .meta({ examples: [1] })
              .exactOptional(),
            name: z
              .string()
              .meta({ examples: ['Dogs'] })
              .exactOptional(),
          })
          .exactOptional(),
        photoUrls: z.preprocess(
          (val) => (val === undefined || Array.isArray(val) ? val : [val]),
          z.array(z.string()),
        ),
        tags: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(
              z.object({
                id: z.coerce.bigint().pipe(z.int64()).exactOptional(),
                name: z.string().exactOptional(),
              }),
            ),
          )
          .exactOptional(),
        status: z
          .enum(['available', 'pending', 'sold'])
          .meta({ description: 'pet status in the store' })
          .exactOptional(),
      }),
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
            'application/json': { schema: resolver(z.array(PetSchema)) },
            'application/xml': { schema: resolver(z.array(PetSchema)) },
          },
        },
        '400': { description: 'Invalid status value' },
        default: { description: 'Unexpected error' },
      },
      security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
    }),
    validator(
      'query',
      z.object({ status: z.enum(['available', 'pending', 'sold']).default('available') }),
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
            'application/json': { schema: resolver(z.array(PetSchema)) },
            'application/xml': { schema: resolver(z.array(PetSchema)) },
          },
        },
        '400': { description: 'Invalid tag value' },
        default: { description: 'Unexpected error' },
      },
      security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
    }),
    validator(
      'query',
      z.object({
        tags: z.preprocess(
          (val) => (val === undefined || Array.isArray(val) ? val : [val]),
          z.array(z.string()),
        ),
      }),
    ),
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
    validator('param', z.object({ petId: z.coerce.bigint().pipe(z.int64()) })),
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
            'application/json': { schema: resolver(PetSchema) },
            'application/xml': { schema: resolver(PetSchema) },
          },
        },
        '400': { description: 'Invalid input' },
        default: { description: 'Unexpected error' },
      },
      security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
    }),
    validator('param', z.object({ petId: z.coerce.bigint().pipe(z.int64()) })),
    validator(
      'query',
      z.object({ name: z.string().exactOptional(), status: z.string().exactOptional() }),
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
    validator('param', z.object({ petId: z.coerce.bigint().pipe(z.int64()) })),
    validator('header', z.object({ api_key: z.string().exactOptional() })),
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
          content: { 'application/json': { schema: resolver(ApiResponseSchema) } },
        },
        '400': { description: 'No file uploaded' },
        '404': { description: 'Pet not found' },
        default: { description: 'Unexpected error' },
      },
      security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
    }),
    validator('param', z.object({ petId: z.coerce.bigint().pipe(z.int64()) })),
    validator('query', z.object({ additionalMetadata: z.string().exactOptional() })),
    (c) => { throw new Error('Not implemented') },
  )
