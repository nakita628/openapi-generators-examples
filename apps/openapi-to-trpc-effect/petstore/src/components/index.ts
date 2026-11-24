import { Schema, SchemaTransformation } from 'effect'

export const OrderSchema = Schema.Struct({
  id: Schema.optionalKey(
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
  petId: Schema.optionalKey(
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
  quantity: Schema.optionalKey(
    Schema.Number.check(Schema.isInt32()).annotate({ jsonSchemaExamples: [7] }),
  ),
  shipDate: Schema.optionalKey(
    Schema.String.check(
      Schema.isPattern(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ),
  ),
  status: Schema.optionalKey(
    Schema.Literals(['placed', 'approved', 'delivered']).annotate({
      description: 'Order Status',
      jsonSchemaExamples: ['approved'],
    }),
  ),
  complete: Schema.optionalKey(Schema.Boolean),
})

export type OrderSchema = Schema.Schema.Type<typeof OrderSchema>

export const CategorySchema = Schema.Struct({
  id: Schema.optionalKey(
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
  name: Schema.optionalKey(Schema.String.annotate({ jsonSchemaExamples: ['Dogs'] })),
})

export type CategorySchema = Schema.Schema.Type<typeof CategorySchema>

export const UserSchema = Schema.Struct({
  id: Schema.optionalKey(
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
  username: Schema.optionalKey(Schema.String.annotate({ jsonSchemaExamples: ['theUser'] })),
  firstName: Schema.optionalKey(Schema.String.annotate({ jsonSchemaExamples: ['John'] })),
  lastName: Schema.optionalKey(Schema.String.annotate({ jsonSchemaExamples: ['James'] })),
  email: Schema.optionalKey(Schema.String.annotate({ jsonSchemaExamples: ['john@email.com'] })),
  password: Schema.optionalKey(Schema.String.annotate({ jsonSchemaExamples: ['12345'] })),
  phone: Schema.optionalKey(Schema.String.annotate({ jsonSchemaExamples: ['12345'] })),
  userStatus: Schema.optionalKey(
    Schema.Number.check(Schema.isInt32()).annotate({
      description: 'User Status',
      jsonSchemaExamples: [1],
    }),
  ),
})

export type UserSchema = Schema.Schema.Type<typeof UserSchema>

export const TagSchema = Schema.Struct({
  id: Schema.optionalKey(
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
  name: Schema.optionalKey(Schema.String),
})

export type TagSchema = Schema.Schema.Type<typeof TagSchema>

export const PetSchema = Schema.Struct({
  id: Schema.optionalKey(
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
  category: Schema.optionalKey(CategorySchema),
  photoUrls: Schema.Array(Schema.String),
  tags: Schema.optionalKey(Schema.Array(TagSchema)),
  status: Schema.optionalKey(
    Schema.Literals(['available', 'pending', 'sold']).annotate({
      description: 'pet status in the store',
    }),
  ),
})

export type PetSchema = Schema.Schema.Type<typeof PetSchema>

export const ApiResponseSchema = Schema.Struct({
  code: Schema.optionalKey(Schema.Number.check(Schema.isInt32())),
  type: Schema.optionalKey(Schema.String),
  message: Schema.optionalKey(Schema.String),
})

export type ApiResponseSchema = Schema.Schema.Type<typeof ApiResponseSchema>
