import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import * as v from 'valibot'
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
      v.object({
        id: v.optional(
          v.pipe(
            v.pipe(
              v.string(),
              v.regex(/^-?\d+$/),
              v.transform((input) => BigInt(input)),
              v.minValue(-9223372036854775808n),
              v.maxValue(9223372036854775807n),
            ),
            v.metadata({ examples: [10] }),
          ),
        ),
        name: v.pipe(v.string(), v.metadata({ examples: ['doggie'] })),
        category: v.optional(
          v.partial(
            v.object({
              id: v.pipe(
                v.pipe(
                  v.string(),
                  v.regex(/^-?\d+$/),
                  v.transform((input) => BigInt(input)),
                  v.minValue(-9223372036854775808n),
                  v.maxValue(9223372036854775807n),
                ),
                v.metadata({ examples: [1] }),
              ),
              name: v.pipe(v.string(), v.metadata({ examples: ['Dogs'] })),
            }),
          ),
        ),
        photoUrls: v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.string()),
        ),
        tags: v.optional(
          v.pipe(
            v.unknown(),
            v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
            v.array(
              v.partial(
                v.object({
                  id: v.pipe(
                    v.string(),
                    v.regex(/^-?\d+$/),
                    v.transform((input) => BigInt(input)),
                    v.minValue(-9223372036854775808n),
                    v.maxValue(9223372036854775807n),
                  ),
                  name: v.string(),
                }),
              ),
            ),
          ),
        ),
        status: v.optional(
          v.pipe(
            v.picklist(['available', 'pending', 'sold']),
            v.description('pet status in the store'),
          ),
        ),
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
      v.object({
        id: v.optional(
          v.pipe(
            v.pipe(
              v.string(),
              v.regex(/^-?\d+$/),
              v.transform((input) => BigInt(input)),
              v.minValue(-9223372036854775808n),
              v.maxValue(9223372036854775807n),
            ),
            v.metadata({ examples: [10] }),
          ),
        ),
        name: v.pipe(v.string(), v.metadata({ examples: ['doggie'] })),
        category: v.optional(
          v.partial(
            v.object({
              id: v.pipe(
                v.pipe(
                  v.string(),
                  v.regex(/^-?\d+$/),
                  v.transform((input) => BigInt(input)),
                  v.minValue(-9223372036854775808n),
                  v.maxValue(9223372036854775807n),
                ),
                v.metadata({ examples: [1] }),
              ),
              name: v.pipe(v.string(), v.metadata({ examples: ['Dogs'] })),
            }),
          ),
        ),
        photoUrls: v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.string()),
        ),
        tags: v.optional(
          v.pipe(
            v.unknown(),
            v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
            v.array(
              v.partial(
                v.object({
                  id: v.pipe(
                    v.string(),
                    v.regex(/^-?\d+$/),
                    v.transform((input) => BigInt(input)),
                    v.minValue(-9223372036854775808n),
                    v.maxValue(9223372036854775807n),
                  ),
                  name: v.string(),
                }),
              ),
            ),
          ),
        ),
        status: v.optional(
          v.pipe(
            v.picklist(['available', 'pending', 'sold']),
            v.description('pet status in the store'),
          ),
        ),
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
            'application/json': { schema: resolver(v.array(PetSchema)) },
            'application/xml': { schema: resolver(v.array(PetSchema)) },
          },
        },
        '400': { description: 'Invalid status value' },
        default: { description: 'Unexpected error' },
      },
      security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
    }),
    validator(
      'query',
      v.object({ status: v.optional(v.picklist(['available', 'pending', 'sold']), 'available') }),
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
            'application/json': { schema: resolver(v.array(PetSchema)) },
            'application/xml': { schema: resolver(v.array(PetSchema)) },
          },
        },
        '400': { description: 'Invalid tag value' },
        default: { description: 'Unexpected error' },
      },
      security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
    }),
    validator(
      'query',
      v.object({
        tags: v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.string()),
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
    validator(
      'param',
      v.object({
        petId: v.pipe(
          v.string(),
          v.regex(/^-?\d+$/),
          v.transform((input) => BigInt(input)),
          v.minValue(-9223372036854775808n),
          v.maxValue(9223372036854775807n),
        ),
      }),
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
      v.object({
        petId: v.pipe(
          v.string(),
          v.regex(/^-?\d+$/),
          v.transform((input) => BigInt(input)),
          v.minValue(-9223372036854775808n),
          v.maxValue(9223372036854775807n),
        ),
      }),
    ),
    validator('query', v.partial(v.object({ name: v.string(), status: v.string() }))),
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
      v.object({
        petId: v.pipe(
          v.string(),
          v.regex(/^-?\d+$/),
          v.transform((input) => BigInt(input)),
          v.minValue(-9223372036854775808n),
          v.maxValue(9223372036854775807n),
        ),
      }),
    ),
    validator('header', v.partial(v.object({ api_key: v.string() }))),
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
    validator(
      'param',
      v.object({
        petId: v.pipe(
          v.string(),
          v.regex(/^-?\d+$/),
          v.transform((input) => BigInt(input)),
          v.minValue(-9223372036854775808n),
          v.maxValue(9223372036854775807n),
        ),
      }),
    ),
    validator('query', v.partial(v.object({ additionalMetadata: v.string() }))),
    (c) => { throw new Error('Not implemented') },
  )
