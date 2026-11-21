import { defineHandler } from 'hono/factory'
import { Effect, Schema, SchemaTransformation } from 'effect'

export const OrderSchema = Schema.Struct({
  id: Schema.optional(
    Schema.Union([
      Schema.BigInt,
      Schema.Number.check(Schema.isInt()),
      Schema.String.check(Schema.isPattern(/^-?\d+$/)),
    ])
      .pipe(
        Schema.decodeTo(
          Schema.BigInt,
          SchemaTransformation.transform({
            decode: (input) => BigInt(input),
            encode: (output) => output,
          }),
        ),
      )
      .check(
        Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
      )
      .annotate({ jsonSchemaExamples: [10] }),
  ),
  petId: Schema.optional(
    Schema.Union([
      Schema.BigInt,
      Schema.Number.check(Schema.isInt()),
      Schema.String.check(Schema.isPattern(/^-?\d+$/)),
    ])
      .pipe(
        Schema.decodeTo(
          Schema.BigInt,
          SchemaTransformation.transform({
            decode: (input) => BigInt(input),
            encode: (output) => output,
          }),
        ),
      )
      .check(
        Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
      )
      .annotate({ jsonSchemaExamples: [198772] }),
  ),
  quantity: Schema.optional(
    Schema.Number.check(Schema.isInt32()).annotate({ jsonSchemaExamples: [7] }),
  ),
  shipDate: Schema.optional(
    Schema.String.check(
      Schema.isPattern(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ),
  ),
  status: Schema.optional(
    Schema.Literals(['placed', 'approved', 'delivered']).annotate({
      description: 'Order Status',
      jsonSchemaExamples: ['approved'],
    }),
  ),
  complete: Schema.optional(Schema.Boolean),
})

export type Order = Schema.Schema.Type<typeof OrderSchema>

export const CategorySchema = Schema.Struct({
  id: Schema.optional(
    Schema.Union([
      Schema.BigInt,
      Schema.Number.check(Schema.isInt()),
      Schema.String.check(Schema.isPattern(/^-?\d+$/)),
    ])
      .pipe(
        Schema.decodeTo(
          Schema.BigInt,
          SchemaTransformation.transform({
            decode: (input) => BigInt(input),
            encode: (output) => output,
          }),
        ),
      )
      .check(
        Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
      )
      .annotate({ jsonSchemaExamples: [1] }),
  ),
  name: Schema.optional(Schema.String.annotate({ jsonSchemaExamples: ['Dogs'] })),
})

export type Category = Schema.Schema.Type<typeof CategorySchema>

export const UserSchema = Schema.Struct({
  id: Schema.optional(
    Schema.Union([
      Schema.BigInt,
      Schema.Number.check(Schema.isInt()),
      Schema.String.check(Schema.isPattern(/^-?\d+$/)),
    ])
      .pipe(
        Schema.decodeTo(
          Schema.BigInt,
          SchemaTransformation.transform({
            decode: (input) => BigInt(input),
            encode: (output) => output,
          }),
        ),
      )
      .check(
        Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
      )
      .annotate({ jsonSchemaExamples: [10] }),
  ),
  username: Schema.optional(Schema.String.annotate({ jsonSchemaExamples: ['theUser'] })),
  firstName: Schema.optional(Schema.String.annotate({ jsonSchemaExamples: ['John'] })),
  lastName: Schema.optional(Schema.String.annotate({ jsonSchemaExamples: ['James'] })),
  email: Schema.optional(Schema.String.annotate({ jsonSchemaExamples: ['john@email.com'] })),
  password: Schema.optional(Schema.String.annotate({ jsonSchemaExamples: ['12345'] })),
  phone: Schema.optional(Schema.String.annotate({ jsonSchemaExamples: ['12345'] })),
  userStatus: Schema.optional(
    Schema.Number.check(Schema.isInt32()).annotate({
      description: 'User Status',
      jsonSchemaExamples: [1],
    }),
  ),
})

export type User = Schema.Schema.Type<typeof UserSchema>

export const TagSchema = Schema.Struct({
  id: Schema.optional(
    Schema.Union([
      Schema.BigInt,
      Schema.Number.check(Schema.isInt()),
      Schema.String.check(Schema.isPattern(/^-?\d+$/)),
    ])
      .pipe(
        Schema.decodeTo(
          Schema.BigInt,
          SchemaTransformation.transform({
            decode: (input) => BigInt(input),
            encode: (output) => output,
          }),
        ),
      )
      .check(
        Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
      ),
  ),
  name: Schema.optional(Schema.String),
})

export type Tag = Schema.Schema.Type<typeof TagSchema>

export const PetSchema = Schema.Struct({
  id: Schema.optional(
    Schema.Union([
      Schema.BigInt,
      Schema.Number.check(Schema.isInt()),
      Schema.String.check(Schema.isPattern(/^-?\d+$/)),
    ])
      .pipe(
        Schema.decodeTo(
          Schema.BigInt,
          SchemaTransformation.transform({
            decode: (input) => BigInt(input),
            encode: (output) => output,
          }),
        ),
      )
      .check(
        Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
      )
      .annotate({ jsonSchemaExamples: [10] }),
  ),
  name: Schema.String.annotate({ jsonSchemaExamples: ['doggie'] }),
  category: Schema.optional(CategorySchema),
  photoUrls: Schema.Array(Schema.String),
  tags: Schema.optional(Schema.Array(TagSchema)),
  status: Schema.optional(
    Schema.Literals(['available', 'pending', 'sold']).annotate({
      description: 'pet status in the store',
    }),
  ),
})

export type Pet = Schema.Schema.Type<typeof PetSchema>

export const ApiResponseSchema = Schema.Struct({
  code: Schema.optional(Schema.Number.check(Schema.isInt32())),
  type: Schema.optional(Schema.String),
  message: Schema.optional(Schema.String),
})

export type ApiResponse = Schema.Schema.Type<typeof ApiResponseSchema>

export const PetstoreAuthSecurityScheme = {
  type: 'oauth2',
  flows: {
    implicit: {
      authorizationUrl: 'https://petstore3.swagger.io/oauth/authorize',
      scopes: { 'write:pets': 'modify pets in your account', 'read:pets': 'read your pets' },
    },
  },
}
export const ApiKeySecurityScheme = { type: 'apiKey', name: 'api_key', in: 'header' }

export const PetRequestBody = {
  description: 'Pet object that needs to be added to the store',
  content: { 'application/json': { schema: PetSchema }, 'application/xml': { schema: PetSchema } },
}
export const UserArrayRequestBody = {
  description: 'List of user object',
  content: { 'application/json': { schema: Schema.Array(UserSchema) } },
}

export const putPetHandler = defineHandler({
  form: Schema.toStandardSchemaV1(
    Schema.Struct({
      id: Schema.optional(
        Schema.BigIntFromString.check(
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
        ).annotate({ jsonSchemaExamples: [10] }),
      ),
      name: Schema.String.annotate({ jsonSchemaExamples: ['doggie'] }),
      category: Schema.optional(
        Schema.Struct({
          id: Schema.optional(
            Schema.BigIntFromString.check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
            ).annotate({ jsonSchemaExamples: [1] }),
          ),
          name: Schema.optional(Schema.String.annotate({ jsonSchemaExamples: ['Dogs'] })),
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
      tags: Schema.optional(
        Schema.Unknown.pipe(
          Schema.decodeTo(
            Schema.Unknown,
            SchemaTransformation.transform<unknown, unknown>({
              decode: (input) => (input === undefined || Array.isArray(input) ? input : [input]),
              encode: (output) => output,
            }),
          ),
          Schema.decodeTo(
            Schema.Array(
              Schema.Struct({
                id: Schema.optional(
                  Schema.BigIntFromString.check(
                    Schema.isBetweenBigInt({
                      minimum: -9223372036854775808n,
                      maximum: 9223372036854775807n,
                    }),
                  ),
                ),
                name: Schema.optional(Schema.String),
              }),
            ),
          ),
        ),
      ),
      status: Schema.optional(
        Schema.Literals(['available', 'pending', 'sold']).annotate({
          description: 'pet status in the store',
        }),
      ),
    }),
  ),
  json: Schema.toStandardSchemaV1(PetSchema),
  response: Schema.toStandardSchemaV1(PetSchema),
})

export const postPetHandler = defineHandler({
  form: Schema.toStandardSchemaV1(
    Schema.Struct({
      id: Schema.optional(
        Schema.BigIntFromString.check(
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
        ).annotate({ jsonSchemaExamples: [10] }),
      ),
      name: Schema.String.annotate({ jsonSchemaExamples: ['doggie'] }),
      category: Schema.optional(
        Schema.Struct({
          id: Schema.optional(
            Schema.BigIntFromString.check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
            ).annotate({ jsonSchemaExamples: [1] }),
          ),
          name: Schema.optional(Schema.String.annotate({ jsonSchemaExamples: ['Dogs'] })),
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
      tags: Schema.optional(
        Schema.Unknown.pipe(
          Schema.decodeTo(
            Schema.Unknown,
            SchemaTransformation.transform<unknown, unknown>({
              decode: (input) => (input === undefined || Array.isArray(input) ? input : [input]),
              encode: (output) => output,
            }),
          ),
          Schema.decodeTo(
            Schema.Array(
              Schema.Struct({
                id: Schema.optional(
                  Schema.BigIntFromString.check(
                    Schema.isBetweenBigInt({
                      minimum: -9223372036854775808n,
                      maximum: 9223372036854775807n,
                    }),
                  ),
                ),
                name: Schema.optional(Schema.String),
              }),
            ),
          ),
        ),
      ),
      status: Schema.optional(
        Schema.Literals(['available', 'pending', 'sold']).annotate({
          description: 'pet status in the store',
        }),
      ),
    }),
  ),
  json: Schema.toStandardSchemaV1(PetSchema),
  response: Schema.toStandardSchemaV1(PetSchema),
})

export const getPetFindByStatusHandler = defineHandler({
  query: Schema.toStandardSchemaV1(
    Schema.Struct({
      status: Schema.Literals(['available', 'pending', 'sold']).pipe(
        Schema.withDecodingDefaultType(Effect.succeed('available')),
      ),
    }),
  ),
  response: Schema.toStandardSchemaV1(Schema.Array(PetSchema)),
})

export const getPetFindByTagsHandler = defineHandler({
  query: Schema.toStandardSchemaV1(
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
  response: Schema.toStandardSchemaV1(Schema.Array(PetSchema)),
})

export const getPetPetIdHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
    Schema.Struct({
      petId: Schema.BigIntFromString.check(
        Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
      ),
    }),
  ),
  response: Schema.toStandardSchemaV1(PetSchema),
})

export const postPetPetIdHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
    Schema.Struct({
      petId: Schema.BigIntFromString.check(
        Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
      ),
    }),
  ),
  query: Schema.toStandardSchemaV1(
    Schema.Struct({ name: Schema.optional(Schema.String), status: Schema.optional(Schema.String) }),
  ),
  response: Schema.toStandardSchemaV1(PetSchema),
})

export const deletePetPetIdHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
    Schema.Struct({
      petId: Schema.BigIntFromString.check(
        Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
      ),
    }),
  ),
  header: Schema.toStandardSchemaV1(Schema.Struct({ api_key: Schema.optional(Schema.String) })),
})

export const postPetPetIdUploadImageHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
    Schema.Struct({
      petId: Schema.BigIntFromString.check(
        Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
      ),
    }),
  ),
  query: Schema.toStandardSchemaV1(
    Schema.Struct({ additionalMetadata: Schema.optional(Schema.String) }),
  ),
  response: Schema.toStandardSchemaV1(ApiResponseSchema),
})

export const getStoreInventoryHandler = defineHandler({
  response: Schema.toStandardSchemaV1(
    Schema.Record(Schema.String, Schema.Number.check(Schema.isInt32())),
  ),
})

export const postStoreOrderHandler = defineHandler({
  form: Schema.toStandardSchemaV1(
    Schema.Struct({
      id: Schema.optional(
        Schema.BigIntFromString.check(
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
        ).annotate({ jsonSchemaExamples: [10] }),
      ),
      petId: Schema.optional(
        Schema.BigIntFromString.check(
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
        ).annotate({ jsonSchemaExamples: [198772] }),
      ),
      quantity: Schema.optional(
        Schema.FiniteFromString.check(Schema.isInt32()).annotate({ jsonSchemaExamples: [7] }),
      ),
      shipDate: Schema.optional(
        Schema.String.check(
          Schema.isPattern(
            /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
          ),
        ),
      ),
      status: Schema.optional(
        Schema.Literals(['placed', 'approved', 'delivered']).annotate({
          description: 'Order Status',
          jsonSchemaExamples: ['approved'],
        }),
      ),
      complete: Schema.optional(
        Schema.String.check(
          Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
        ).pipe(
          Schema.decodeTo(
            Schema.Boolean,
            SchemaTransformation.transform({
              decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
              encode: (output) => (output ? 'true' : 'false'),
            }),
          ),
        ),
      ),
    }),
  ),
  json: Schema.toStandardSchemaV1(OrderSchema),
  response: Schema.toStandardSchemaV1(OrderSchema),
})

export const getStoreOrderOrderIdHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
    Schema.Struct({
      orderId: Schema.BigIntFromString.check(
        Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
      ),
    }),
  ),
  response: Schema.toStandardSchemaV1(OrderSchema),
})

export const deleteStoreOrderOrderIdHandler = defineHandler({
  param: Schema.toStandardSchemaV1(
    Schema.Struct({
      orderId: Schema.BigIntFromString.check(
        Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
      ),
    }),
  ),
})

export const postUserHandler = defineHandler({
  form: Schema.toStandardSchemaV1(
    Schema.Struct({
      id: Schema.optional(
        Schema.BigIntFromString.check(
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
        ).annotate({ jsonSchemaExamples: [10] }),
      ),
      username: Schema.optional(Schema.String.annotate({ jsonSchemaExamples: ['theUser'] })),
      firstName: Schema.optional(Schema.String.annotate({ jsonSchemaExamples: ['John'] })),
      lastName: Schema.optional(Schema.String.annotate({ jsonSchemaExamples: ['James'] })),
      email: Schema.optional(Schema.String.annotate({ jsonSchemaExamples: ['john@email.com'] })),
      password: Schema.optional(Schema.String.annotate({ jsonSchemaExamples: ['12345'] })),
      phone: Schema.optional(Schema.String.annotate({ jsonSchemaExamples: ['12345'] })),
      userStatus: Schema.optional(
        Schema.FiniteFromString.check(Schema.isInt32()).annotate({
          description: 'User Status',
          jsonSchemaExamples: [1],
        }),
      ),
    }),
  ),
  json: Schema.toStandardSchemaV1(UserSchema),
  response: Schema.toStandardSchemaV1(UserSchema),
})

export const postUserCreateWithListHandler = defineHandler({
  json: Schema.toStandardSchemaV1(Schema.Array(UserSchema)),
  response: Schema.toStandardSchemaV1(UserSchema),
})

export const getUserLoginHandler = defineHandler({
  query: Schema.toStandardSchemaV1(
    Schema.Struct({
      username: Schema.optional(Schema.String),
      password: Schema.optional(Schema.String),
    }),
  ),
  response: Schema.toStandardSchemaV1(Schema.String),
})

export const getUserLogoutHandler = defineHandler({})

export const getUserUsernameHandler = defineHandler({
  param: Schema.toStandardSchemaV1(Schema.Struct({ username: Schema.String })),
  response: Schema.toStandardSchemaV1(UserSchema),
})

export const putUserUsernameHandler = defineHandler({
  param: Schema.toStandardSchemaV1(Schema.Struct({ username: Schema.String })),
  form: Schema.toStandardSchemaV1(
    Schema.Struct({
      id: Schema.optional(
        Schema.BigIntFromString.check(
          Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
        ).annotate({ jsonSchemaExamples: [10] }),
      ),
      username: Schema.optional(Schema.String.annotate({ jsonSchemaExamples: ['theUser'] })),
      firstName: Schema.optional(Schema.String.annotate({ jsonSchemaExamples: ['John'] })),
      lastName: Schema.optional(Schema.String.annotate({ jsonSchemaExamples: ['James'] })),
      email: Schema.optional(Schema.String.annotate({ jsonSchemaExamples: ['john@email.com'] })),
      password: Schema.optional(Schema.String.annotate({ jsonSchemaExamples: ['12345'] })),
      phone: Schema.optional(Schema.String.annotate({ jsonSchemaExamples: ['12345'] })),
      userStatus: Schema.optional(
        Schema.FiniteFromString.check(Schema.isInt32()).annotate({
          description: 'User Status',
          jsonSchemaExamples: [1],
        }),
      ),
    }),
  ),
  json: Schema.toStandardSchemaV1(UserSchema),
})

export const deleteUserUsernameHandler = defineHandler({
  param: Schema.toStandardSchemaV1(Schema.Struct({ username: Schema.String })),
})
