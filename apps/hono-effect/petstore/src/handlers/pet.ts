import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { Effect, Schema, SchemaTransformation } from 'effect'
import { PetSchema } from '../components'

export const petHandler = new Hono()
  .put(
    '/pet',
    sValidator('json', Schema.toStandardSchemaV1(PetSchema)),
    sValidator(
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
    sValidator('json', Schema.toStandardSchemaV1(PetSchema)),
    sValidator(
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
    sValidator(
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
    sValidator(
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
    sValidator(
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
    sValidator(
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
    sValidator(
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
    sValidator(
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
    sValidator(
      'header',
      Schema.toStandardSchemaV1(Schema.Struct({ api_key: Schema.optionalKey(Schema.String) })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/pet/:petId/uploadImage',
    sValidator(
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
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({ additionalMetadata: Schema.optionalKey(Schema.String) }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
