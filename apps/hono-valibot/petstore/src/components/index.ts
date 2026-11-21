import * as v from 'valibot'

export const OrderSchema = v.partial(
  v.object({
    id: v.pipe(
      v.pipe(
        v.union([
          v.bigint(),
          v.pipe(v.number(), v.integer()),
          v.pipe(v.string(), v.regex(/^-?\d+$/)),
        ]),
        v.transform((input) => BigInt(input)),
        v.minValue(-9223372036854775808n),
        v.maxValue(9223372036854775807n),
      ),
      v.metadata({ examples: [10] }),
    ),
    petId: v.pipe(
      v.pipe(
        v.union([
          v.bigint(),
          v.pipe(v.number(), v.integer()),
          v.pipe(v.string(), v.regex(/^-?\d+$/)),
        ]),
        v.transform((input) => BigInt(input)),
        v.minValue(-9223372036854775808n),
        v.maxValue(9223372036854775807n),
      ),
      v.metadata({ examples: [198772] }),
    ),
    quantity: v.pipe(
      v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
      v.metadata({ examples: [7] }),
    ),
    shipDate: v.pipe(
      v.string(),
      v.regex(
        /^(?:(?:\d\d[2468][048]|\d\d[13579][26]|\d\d0[48]|[02468][048]00|[13579][26]00)-02-29|\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\d|30)|(?:02)-(?:0[1-9]|1\d|2[0-8])))T(?:(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|([+-](?:[01]\d|2[0-3]):[0-5]\d)))$/,
      ),
    ),
    status: v.pipe(
      v.picklist(['placed', 'approved', 'delivered']),
      v.description('Order Status'),
      v.metadata({ examples: ['approved'] }),
    ),
    complete: v.boolean(),
  }),
)

export type Order = v.InferOutput<typeof OrderSchema>

export const CategorySchema = v.partial(
  v.object({
    id: v.pipe(
      v.pipe(
        v.union([
          v.bigint(),
          v.pipe(v.number(), v.integer()),
          v.pipe(v.string(), v.regex(/^-?\d+$/)),
        ]),
        v.transform((input) => BigInt(input)),
        v.minValue(-9223372036854775808n),
        v.maxValue(9223372036854775807n),
      ),
      v.metadata({ examples: [1] }),
    ),
    name: v.pipe(v.string(), v.metadata({ examples: ['Dogs'] })),
  }),
)

export type Category = v.InferOutput<typeof CategorySchema>

export const UserSchema = v.partial(
  v.object({
    id: v.pipe(
      v.pipe(
        v.union([
          v.bigint(),
          v.pipe(v.number(), v.integer()),
          v.pipe(v.string(), v.regex(/^-?\d+$/)),
        ]),
        v.transform((input) => BigInt(input)),
        v.minValue(-9223372036854775808n),
        v.maxValue(9223372036854775807n),
      ),
      v.metadata({ examples: [10] }),
    ),
    username: v.pipe(v.string(), v.metadata({ examples: ['theUser'] })),
    firstName: v.pipe(v.string(), v.metadata({ examples: ['John'] })),
    lastName: v.pipe(v.string(), v.metadata({ examples: ['James'] })),
    email: v.pipe(v.string(), v.metadata({ examples: ['john@email.com'] })),
    password: v.pipe(v.string(), v.metadata({ examples: ['12345'] })),
    phone: v.pipe(v.string(), v.metadata({ examples: ['12345'] })),
    userStatus: v.pipe(
      v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
      v.description('User Status'),
      v.metadata({ examples: [1] }),
    ),
  }),
)

export type User = v.InferOutput<typeof UserSchema>

export const TagSchema = v.partial(
  v.object({
    id: v.pipe(
      v.union([
        v.bigint(),
        v.pipe(v.number(), v.integer()),
        v.pipe(v.string(), v.regex(/^-?\d+$/)),
      ]),
      v.transform((input) => BigInt(input)),
      v.minValue(-9223372036854775808n),
      v.maxValue(9223372036854775807n),
    ),
    name: v.string(),
  }),
)

export type Tag = v.InferOutput<typeof TagSchema>

export const PetSchema = v.object({
  id: v.optional(
    v.pipe(
      v.pipe(
        v.union([
          v.bigint(),
          v.pipe(v.number(), v.integer()),
          v.pipe(v.string(), v.regex(/^-?\d+$/)),
        ]),
        v.transform((input) => BigInt(input)),
        v.minValue(-9223372036854775808n),
        v.maxValue(9223372036854775807n),
      ),
      v.metadata({ examples: [10] }),
    ),
  ),
  name: v.pipe(v.string(), v.metadata({ examples: ['doggie'] })),
  category: v.optional(CategorySchema),
  photoUrls: v.array(v.string()),
  tags: v.optional(v.array(TagSchema)),
  status: v.optional(
    v.pipe(v.picklist(['available', 'pending', 'sold']), v.description('pet status in the store')),
  ),
})

export type Pet = v.InferOutput<typeof PetSchema>

export const ApiResponseSchema = v.partial(
  v.object({
    code: v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
    type: v.string(),
    message: v.string(),
  }),
)

export type ApiResponse = v.InferOutput<typeof ApiResponseSchema>

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
  content: { 'application/json': { schema: v.array(UserSchema) } },
}
