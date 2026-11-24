import { defineHandler } from 'hono/factory'
import * as z from 'zod'

export const OrderSchema = z.object({
  id: z
    .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
    .transform((val) => BigInt(val))
    .pipe(z.int64())
    .meta({ examples: [10] })
    .exactOptional(),
  petId: z
    .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
    .transform((val) => BigInt(val))
    .pipe(z.int64())
    .meta({ examples: [198772] })
    .exactOptional(),
  quantity: z
    .int32()
    .meta({ examples: [7] })
    .exactOptional(),
  shipDate: z.iso.datetime({ offset: true }).exactOptional(),
  status: z
    .enum(['placed', 'approved', 'delivered'])
    .meta({ description: 'Order Status', examples: ['approved'] })
    .exactOptional(),
  complete: z.boolean().exactOptional(),
})

export type Order = z.infer<typeof OrderSchema>

export const CategorySchema = z.object({
  id: z
    .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
    .transform((val) => BigInt(val))
    .pipe(z.int64())
    .meta({ examples: [1] })
    .exactOptional(),
  name: z
    .string()
    .meta({ examples: ['Dogs'] })
    .exactOptional(),
})

export type Category = z.infer<typeof CategorySchema>

export const UserSchema = z.object({
  id: z
    .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
    .transform((val) => BigInt(val))
    .pipe(z.int64())
    .meta({ examples: [10] })
    .exactOptional(),
  username: z
    .string()
    .meta({ examples: ['theUser'] })
    .exactOptional(),
  firstName: z
    .string()
    .meta({ examples: ['John'] })
    .exactOptional(),
  lastName: z
    .string()
    .meta({ examples: ['James'] })
    .exactOptional(),
  email: z
    .string()
    .meta({ examples: ['john@email.com'] })
    .exactOptional(),
  password: z
    .string()
    .meta({ examples: ['12345'] })
    .exactOptional(),
  phone: z
    .string()
    .meta({ examples: ['12345'] })
    .exactOptional(),
  userStatus: z
    .int32()
    .meta({ description: 'User Status', examples: [1] })
    .exactOptional(),
})

export type User = z.infer<typeof UserSchema>

export const TagSchema = z.object({
  id: z
    .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
    .transform((val) => BigInt(val))
    .pipe(z.int64())
    .exactOptional(),
  name: z.string().exactOptional(),
})

export type Tag = z.infer<typeof TagSchema>

export const PetSchema = z.object({
  id: z
    .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
    .transform((val) => BigInt(val))
    .pipe(z.int64())
    .meta({ examples: [10] })
    .exactOptional(),
  name: z.string().meta({ examples: ['doggie'] }),
  category: CategorySchema.exactOptional(),
  photoUrls: z.array(z.string()),
  tags: z.array(TagSchema).exactOptional(),
  status: z
    .enum(['available', 'pending', 'sold'])
    .meta({ description: 'pet status in the store' })
    .exactOptional(),
})

export type Pet = z.infer<typeof PetSchema>

export const ApiResponseSchema = z.object({
  code: z.int32().exactOptional(),
  type: z.string().exactOptional(),
  message: z.string().exactOptional(),
})

export type ApiResponse = z.infer<typeof ApiResponseSchema>

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
  content: { 'application/json': { schema: z.array(UserSchema) } },
}

export const putPetHandler = defineHandler({
  form: z.object({
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
  json: PetSchema,
  response: PetSchema,
})

export const postPetHandler = defineHandler({
  form: z.object({
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
  json: PetSchema,
  response: PetSchema,
})

export const getPetFindByStatusHandler = defineHandler({
  query: z.object({ status: z.enum(['available', 'pending', 'sold']).default('available') }),
  response: z.array(PetSchema),
})

export const getPetFindByTagsHandler = defineHandler({
  query: z.object({
    tags: z.preprocess(
      (val) => (val === undefined || Array.isArray(val) ? val : [val]),
      z.array(z.string()),
    ),
  }),
  response: z.array(PetSchema),
})

export const getPetPetIdHandler = defineHandler({
  param: z.object({ petId: z.coerce.bigint().pipe(z.int64()) }),
  response: PetSchema,
})

export const postPetPetIdHandler = defineHandler({
  param: z.object({ petId: z.coerce.bigint().pipe(z.int64()) }),
  query: z.object({ name: z.string().exactOptional(), status: z.string().exactOptional() }),
  response: PetSchema,
})

export const deletePetPetIdHandler = defineHandler({
  param: z.object({ petId: z.coerce.bigint().pipe(z.int64()) }),
  header: z.object({ api_key: z.string().exactOptional() }),
})

export const postPetPetIdUploadImageHandler = defineHandler({
  param: z.object({ petId: z.coerce.bigint().pipe(z.int64()) }),
  query: z.object({ additionalMetadata: z.string().exactOptional() }),
  response: ApiResponseSchema,
})

export const getStoreInventoryHandler = defineHandler({ response: z.record(z.string(), z.int32()) })

export const postStoreOrderHandler = defineHandler({
  form: z.object({
    id: z.coerce
      .bigint()
      .pipe(z.int64())
      .meta({ examples: [10] })
      .exactOptional(),
    petId: z.coerce
      .bigint()
      .pipe(z.int64())
      .meta({ examples: [198772] })
      .exactOptional(),
    quantity: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.int32(),
      )
      .meta({ examples: [7] })
      .exactOptional(),
    shipDate: z.iso.datetime({ offset: true }).exactOptional(),
    status: z
      .enum(['placed', 'approved', 'delivered'])
      .meta({ description: 'Order Status', examples: ['approved'] })
      .exactOptional(),
    complete: z.stringbool().exactOptional(),
  }),
  json: OrderSchema,
  response: OrderSchema,
})

export const getStoreOrderOrderIdHandler = defineHandler({
  param: z.object({ orderId: z.coerce.bigint().pipe(z.int64()) }),
  response: OrderSchema,
})

export const deleteStoreOrderOrderIdHandler = defineHandler({
  param: z.object({ orderId: z.coerce.bigint().pipe(z.int64()) }),
})

export const postUserHandler = defineHandler({
  form: z.object({
    id: z.coerce
      .bigint()
      .pipe(z.int64())
      .meta({ examples: [10] })
      .exactOptional(),
    username: z
      .string()
      .meta({ examples: ['theUser'] })
      .exactOptional(),
    firstName: z
      .string()
      .meta({ examples: ['John'] })
      .exactOptional(),
    lastName: z
      .string()
      .meta({ examples: ['James'] })
      .exactOptional(),
    email: z
      .string()
      .meta({ examples: ['john@email.com'] })
      .exactOptional(),
    password: z
      .string()
      .meta({ examples: ['12345'] })
      .exactOptional(),
    phone: z
      .string()
      .meta({ examples: ['12345'] })
      .exactOptional(),
    userStatus: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.int32(),
      )
      .meta({ description: 'User Status', examples: [1] })
      .exactOptional(),
  }),
  json: UserSchema,
  response: UserSchema,
})

export const postUserCreateWithListHandler = defineHandler({
  json: z.array(UserSchema),
  response: UserSchema,
})

export const getUserLoginHandler = defineHandler({
  query: z.object({ username: z.string().exactOptional(), password: z.string().exactOptional() }),
  response: z.string(),
})

export const getUserLogoutHandler = defineHandler({})

export const getUserUsernameHandler = defineHandler({
  param: z.object({ username: z.string() }),
  response: UserSchema,
})

export const putUserUsernameHandler = defineHandler({
  param: z.object({ username: z.string() }),
  form: z.object({
    id: z.coerce
      .bigint()
      .pipe(z.int64())
      .meta({ examples: [10] })
      .exactOptional(),
    username: z
      .string()
      .meta({ examples: ['theUser'] })
      .exactOptional(),
    firstName: z
      .string()
      .meta({ examples: ['John'] })
      .exactOptional(),
    lastName: z
      .string()
      .meta({ examples: ['James'] })
      .exactOptional(),
    email: z
      .string()
      .meta({ examples: ['john@email.com'] })
      .exactOptional(),
    password: z
      .string()
      .meta({ examples: ['12345'] })
      .exactOptional(),
    phone: z
      .string()
      .meta({ examples: ['12345'] })
      .exactOptional(),
    userStatus: z
      .preprocess(
        (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
        z.int32(),
      )
      .meta({ description: 'User Status', examples: [1] })
      .exactOptional(),
  }),
  json: UserSchema,
})

export const deleteUserUsernameHandler = defineHandler({
  param: z.object({ username: z.string() }),
})
