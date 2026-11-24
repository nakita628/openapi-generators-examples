import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import { Effect, Schema, SchemaTransformation } from 'effect'
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
            'application/json': { schema: resolver(Schema.toStandardSchemaV1(PetSchema)) },
            'application/xml': { schema: resolver(Schema.toStandardSchemaV1(PetSchema)) },
          },
        },
        '400': { description: 'Invalid ID supplied' },
        '404': { description: 'Pet not found' },
        '422': { description: 'Validation exception' },
        default: { description: 'Unexpected error' },
      },
      security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
    }),
    validator('json', Schema.toStandardSchemaV1(PetSchema)),
    validator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          id: Schema.optionalKey(
            Schema.BigIntFromString.check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
            ).annotate({ jsonSchemaExamples: [10] }),
          ),
          name: Schema.String.annotate({ jsonSchemaExamples: ['doggie'] }),
          category: Schema.optionalKey(
            Schema.Struct({
              id: Schema.optionalKey(
                Schema.BigIntFromString.check(
                  Schema.isBetweenBigInt({
                    minimum: -9223372036854775808n,
                    maximum: 9223372036854775807n,
                  }),
                ).annotate({ jsonSchemaExamples: [1] }),
              ),
              name: Schema.optionalKey(Schema.String.annotate({ jsonSchemaExamples: ['Dogs'] })),
            }),
          ),
          photoUrls: Schema.Unknown.pipe(
            Schema.decodeTo(
              Schema.Unknown,
              SchemaTransformation.transform<unknown, unknown>({
                decode: (input) => (input === undefined || Array.isArray(input) ? input : [input]),
                encode: (output) => output,
              }),
            ),
            Schema.decodeTo(Schema.Array(Schema.String)),
          ),
          tags: Schema.optionalKey(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(
                Schema.Array(
                  Schema.Struct({
                    id: Schema.optionalKey(
                      Schema.BigIntFromString.check(
                        Schema.isBetweenBigInt({
                          minimum: -9223372036854775808n,
                          maximum: 9223372036854775807n,
                        }),
                      ),
                    ),
                    name: Schema.optionalKey(Schema.String),
                  }),
                ),
              ),
            ),
          ),
          status: Schema.optionalKey(
            Schema.Literals(['available', 'pending', 'sold']).annotate({
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
            'application/json': { schema: resolver(Schema.toStandardSchemaV1(PetSchema)) },
            'application/xml': { schema: resolver(Schema.toStandardSchemaV1(PetSchema)) },
          },
        },
        '400': { description: 'Invalid input' },
        '422': { description: 'Validation exception' },
        default: { description: 'Unexpected error' },
      },
      security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
    }),
    validator('json', Schema.toStandardSchemaV1(PetSchema)),
    validator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          id: Schema.optionalKey(
            Schema.BigIntFromString.check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
            ).annotate({ jsonSchemaExamples: [10] }),
          ),
          name: Schema.String.annotate({ jsonSchemaExamples: ['doggie'] }),
          category: Schema.optionalKey(
            Schema.Struct({
              id: Schema.optionalKey(
                Schema.BigIntFromString.check(
                  Schema.isBetweenBigInt({
                    minimum: -9223372036854775808n,
                    maximum: 9223372036854775807n,
                  }),
                ).annotate({ jsonSchemaExamples: [1] }),
              ),
              name: Schema.optionalKey(Schema.String.annotate({ jsonSchemaExamples: ['Dogs'] })),
            }),
          ),
          photoUrls: Schema.Unknown.pipe(
            Schema.decodeTo(
              Schema.Unknown,
              SchemaTransformation.transform<unknown, unknown>({
                decode: (input) => (input === undefined || Array.isArray(input) ? input : [input]),
                encode: (output) => output,
              }),
            ),
            Schema.decodeTo(Schema.Array(Schema.String)),
          ),
          tags: Schema.optionalKey(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(
                Schema.Array(
                  Schema.Struct({
                    id: Schema.optionalKey(
                      Schema.BigIntFromString.check(
                        Schema.isBetweenBigInt({
                          minimum: -9223372036854775808n,
                          maximum: 9223372036854775807n,
                        }),
                      ),
                    ),
                    name: Schema.optionalKey(Schema.String),
                  }),
                ),
              ),
            ),
          ),
          status: Schema.optionalKey(
            Schema.Literals(['available', 'pending', 'sold']).annotate({
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
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(Schema.Array(PetSchema))),
            },
            'application/xml': {
              schema: resolver(Schema.toStandardSchemaV1(Schema.Array(PetSchema))),
            },
          },
        },
        '400': { description: 'Invalid status value' },
        default: { description: 'Unexpected error' },
      },
      security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
    }),
    validator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          status: Schema.Literals(['available', 'pending', 'sold']).pipe(
            Schema.withDecodingDefaultType(Effect.succeed('available')),
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
            'application/json': {
              schema: resolver(Schema.toStandardSchemaV1(Schema.Array(PetSchema))),
            },
            'application/xml': {
              schema: resolver(Schema.toStandardSchemaV1(Schema.Array(PetSchema))),
            },
          },
        },
        '400': { description: 'Invalid tag value' },
        default: { description: 'Unexpected error' },
      },
      security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
    }),
    validator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          tags: Schema.Unknown.pipe(
            Schema.decodeTo(
              Schema.Unknown,
              SchemaTransformation.transform<unknown, unknown>({
                decode: (input) => (input === undefined || Array.isArray(input) ? input : [input]),
                encode: (output) => output,
              }),
            ),
            Schema.decodeTo(Schema.Array(Schema.String)),
          ),
        }),
      ),
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
            'application/json': { schema: resolver(Schema.toStandardSchemaV1(PetSchema)) },
            'application/xml': { schema: resolver(Schema.toStandardSchemaV1(PetSchema)) },
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
      Schema.toStandardSchemaV1(
        Schema.Struct({
          petId: Schema.BigIntFromString.check(
            Schema.isBetweenBigInt({
              minimum: -9223372036854775808n,
              maximum: 9223372036854775807n,
            }),
          ),
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
            'application/json': { schema: resolver(Schema.toStandardSchemaV1(PetSchema)) },
            'application/xml': { schema: resolver(Schema.toStandardSchemaV1(PetSchema)) },
          },
        },
        '400': { description: 'Invalid input' },
        default: { description: 'Unexpected error' },
      },
      security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
    }),
    validator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          petId: Schema.BigIntFromString.check(
            Schema.isBetweenBigInt({
              minimum: -9223372036854775808n,
              maximum: 9223372036854775807n,
            }),
          ),
        }),
      ),
    ),
    validator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          name: Schema.optionalKey(Schema.String),
          status: Schema.optionalKey(Schema.String),
        }),
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
      Schema.toStandardSchemaV1(
        Schema.Struct({
          petId: Schema.BigIntFromString.check(
            Schema.isBetweenBigInt({
              minimum: -9223372036854775808n,
              maximum: 9223372036854775807n,
            }),
          ),
        }),
      ),
    ),
    validator(
      'header',
      Schema.toStandardSchemaV1(Schema.Struct({ api_key: Schema.optionalKey(Schema.String) })),
    ),
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
            'application/json': { schema: resolver(Schema.toStandardSchemaV1(ApiResponseSchema)) },
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
      Schema.toStandardSchemaV1(
        Schema.Struct({
          petId: Schema.BigIntFromString.check(
            Schema.isBetweenBigInt({
              minimum: -9223372036854775808n,
              maximum: 9223372036854775807n,
            }),
          ),
        }),
      ),
    ),
    validator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({ additionalMetadata: Schema.optionalKey(Schema.String) }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
