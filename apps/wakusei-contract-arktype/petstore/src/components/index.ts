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

export type OrderSchema = typeof OrderSchema.infer

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

export type CategorySchema = typeof CategorySchema.infer

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

export type UserSchema = typeof UserSchema.infer

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

export type TagSchema = typeof TagSchema.infer

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

export type PetSchema = typeof PetSchema.infer

export const ApiResponseSchema = type({
  'code?': 'number.integer >= -2147483648 & number.integer <= 2147483647',
  'type?': 'string',
  'message?': 'string',
})

export type ApiResponseSchema = typeof ApiResponseSchema.infer
