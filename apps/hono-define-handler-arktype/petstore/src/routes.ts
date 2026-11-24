import { defineHandler } from 'hono/factory'
import { type } from 'arktype'

export const OrderSchema = type({
  'id?': type('bigint | number.integer')
    .or(/^-?\d+$/)
    .pipe((data) => BigInt(data))
    .narrow(
      (data, ctx) =>
        (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
    ),
  'petId?': type('bigint | number.integer')
    .or(/^-?\d+$/)
    .pipe((data) => BigInt(data))
    .narrow(
      (data, ctx) =>
        (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
    ),
  'quantity?': 'number.integer >= -2147483648 & number.integer <= 2147483647',
  'shipDate?': type(
    /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
  ),
  'status?': type("'placed' | 'approved' | 'delivered'").describe('Order Status'),
  'complete?': 'boolean',
})

export type Order = typeof OrderSchema.infer

export const CategorySchema = type({
  'id?': type('bigint | number.integer')
    .or(/^-?\d+$/)
    .pipe((data) => BigInt(data))
    .narrow(
      (data, ctx) =>
        (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
    ),
  'name?': 'string',
})

export type Category = typeof CategorySchema.infer

export const UserSchema = type({
  'id?': type('bigint | number.integer')
    .or(/^-?\d+$/)
    .pipe((data) => BigInt(data))
    .narrow(
      (data, ctx) =>
        (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
    ),
  'username?': 'string',
  'firstName?': 'string',
  'lastName?': 'string',
  'email?': 'string',
  'password?': 'string',
  'phone?': 'string',
  'userStatus?': type('number.integer >= -2147483648 & number.integer <= 2147483647').describe(
    'User Status',
  ),
})

export type User = typeof UserSchema.infer

export const TagSchema = type({
  'id?': type('bigint | number.integer')
    .or(/^-?\d+$/)
    .pipe((data) => BigInt(data))
    .narrow(
      (data, ctx) =>
        (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
    ),
  'name?': 'string',
})

export type Tag = typeof TagSchema.infer

export const PetSchema = type({
  'id?': type('bigint | number.integer')
    .or(/^-?\d+$/)
    .pipe((data) => BigInt(data))
    .narrow(
      (data, ctx) =>
        (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
    ),
  name: 'string',
  'category?': CategorySchema,
  photoUrls: 'string[]',
  'tags?': type(TagSchema).array(),
  'status?': type("'available' | 'pending' | 'sold'").describe('pet status in the store'),
})

export type Pet = typeof PetSchema.infer

export const ApiResponseSchema = type({
  'code?': 'number.integer >= -2147483648 & number.integer <= 2147483647',
  'type?': 'string',
  'message?': 'string',
})

export type ApiResponse = typeof ApiResponseSchema.infer

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
  content: { 'application/json': { schema: type(UserSchema).array() } },
}

export const putPetHandler = defineHandler({
  form: {
    '~standard': type({
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
              .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
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
    })['~standard'],
  },
  json: { '~standard': PetSchema['~standard'] },
  response: { '~standard': PetSchema['~standard'] },
})

export const postPetHandler = defineHandler({
  form: {
    '~standard': type({
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
              .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
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
    })['~standard'],
  },
  json: { '~standard': PetSchema['~standard'] },
  response: { '~standard': PetSchema['~standard'] },
})

export const getPetFindByStatusHandler = defineHandler({
  query: { '~standard': type({ status: "'available' | 'pending' | 'sold'" })['~standard'] },
  response: { '~standard': type(PetSchema).array()['~standard'] },
})

export const getPetFindByTagsHandler = defineHandler({
  query: {
    '~standard': type({
      tags: type('unknown')
        .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
        .to('string[]'),
    })['~standard'],
  },
  response: { '~standard': type(PetSchema).array()['~standard'] },
})

export const getPetPetIdHandler = defineHandler({
  param: {
    '~standard': type({
      petId: type('string')
        .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
        .narrow(
          (data, ctx) =>
            (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
            ctx.mustBe('an int64'),
        ),
    })['~standard'],
  },
  response: { '~standard': PetSchema['~standard'] },
})

export const postPetPetIdHandler = defineHandler({
  param: {
    '~standard': type({
      petId: type('string')
        .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
        .narrow(
          (data, ctx) =>
            (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
            ctx.mustBe('an int64'),
        ),
    })['~standard'],
  },
  query: { '~standard': type({ 'name?': 'string', 'status?': 'string' })['~standard'] },
  response: { '~standard': PetSchema['~standard'] },
})

export const deletePetPetIdHandler = defineHandler({
  param: {
    '~standard': type({
      petId: type('string')
        .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
        .narrow(
          (data, ctx) =>
            (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
            ctx.mustBe('an int64'),
        ),
    })['~standard'],
  },
  header: { '~standard': type({ 'api_key?': 'string' })['~standard'] },
})

export const postPetPetIdUploadImageHandler = defineHandler({
  param: {
    '~standard': type({
      petId: type('string')
        .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
        .narrow(
          (data, ctx) =>
            (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
            ctx.mustBe('an int64'),
        ),
    })['~standard'],
  },
  query: { '~standard': type({ 'additionalMetadata?': 'string' })['~standard'] },
  response: { '~standard': ApiResponseSchema['~standard'] },
})

export const getStoreInventoryHandler = defineHandler({
  response: {
    '~standard': type({
      '[string]': 'number.integer >= -2147483648 & number.integer <= 2147483647',
    })['~standard'],
  },
})

export const postStoreOrderHandler = defineHandler({
  form: {
    '~standard': type({
      'id?': type('string')
        .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
        .narrow(
          (data, ctx) =>
            (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
            ctx.mustBe('an int64'),
        ),
      'petId?': type('string')
        .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
        .narrow(
          (data, ctx) =>
            (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
            ctx.mustBe('an int64'),
        ),
      'quantity?': type('string')
        .pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= -2147483648 & number.integer <= 2147483647'),
      'shipDate?': type(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
      'status?': type("'placed' | 'approved' | 'delivered'").describe('Order Status'),
      'complete?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe((data) =>
        /^(?:true|1|yes|on|y|enabled)$/i.test(data),
      ),
    })['~standard'],
  },
  json: { '~standard': OrderSchema['~standard'] },
  response: { '~standard': OrderSchema['~standard'] },
})

export const getStoreOrderOrderIdHandler = defineHandler({
  param: {
    '~standard': type({
      orderId: type('string')
        .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
        .narrow(
          (data, ctx) =>
            (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
            ctx.mustBe('an int64'),
        ),
    })['~standard'],
  },
  response: { '~standard': OrderSchema['~standard'] },
})

export const deleteStoreOrderOrderIdHandler = defineHandler({
  param: {
    '~standard': type({
      orderId: type('string')
        .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
        .narrow(
          (data, ctx) =>
            (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
            ctx.mustBe('an int64'),
        ),
    })['~standard'],
  },
})

export const postUserHandler = defineHandler({
  form: {
    '~standard': type({
      'id?': type('string')
        .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
        .narrow(
          (data, ctx) =>
            (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
            ctx.mustBe('an int64'),
        ),
      'username?': 'string',
      'firstName?': 'string',
      'lastName?': 'string',
      'email?': 'string',
      'password?': 'string',
      'phone?': 'string',
      'userStatus?': type('string')
        .pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= -2147483648 & number.integer <= 2147483647')
        .describe('User Status'),
    })['~standard'],
  },
  json: { '~standard': UserSchema['~standard'] },
  response: { '~standard': UserSchema['~standard'] },
})

export const postUserCreateWithListHandler = defineHandler({
  json: { '~standard': type(UserSchema).array()['~standard'] },
  response: { '~standard': UserSchema['~standard'] },
})

export const getUserLoginHandler = defineHandler({
  query: { '~standard': type({ 'username?': 'string', 'password?': 'string' })['~standard'] },
  response: { '~standard': type('string')['~standard'] },
})

export const getUserLogoutHandler = defineHandler({})

export const getUserUsernameHandler = defineHandler({
  param: { '~standard': type({ username: 'string' })['~standard'] },
  response: { '~standard': UserSchema['~standard'] },
})

export const putUserUsernameHandler = defineHandler({
  param: { '~standard': type({ username: 'string' })['~standard'] },
  form: {
    '~standard': type({
      'id?': type('string')
        .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
        .narrow(
          (data, ctx) =>
            (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
            ctx.mustBe('an int64'),
        ),
      'username?': 'string',
      'firstName?': 'string',
      'lastName?': 'string',
      'email?': 'string',
      'password?': 'string',
      'phone?': 'string',
      'userStatus?': type('string')
        .pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= -2147483648 & number.integer <= 2147483647')
        .describe('User Status'),
    })['~standard'],
  },
  json: { '~standard': UserSchema['~standard'] },
})

export const deleteUserUsernameHandler = defineHandler({
  param: { '~standard': type({ username: 'string' })['~standard'] },
})
