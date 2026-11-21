import { resolver } from 'hono-openapi'
import * as z from 'zod'

export const OrderSchema = z
  .object({
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
  .meta({ ref: 'Order' })

export type Order = z.infer<typeof OrderSchema>

export const CategorySchema = z
  .object({
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
  .meta({ ref: 'Category' })

export type Category = z.infer<typeof CategorySchema>

export const UserSchema = z
  .object({
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
  .meta({ ref: 'User' })

export type User = z.infer<typeof UserSchema>

export const TagSchema = z
  .object({
    id: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .exactOptional(),
    name: z.string().exactOptional(),
  })
  .meta({ ref: 'Tag' })

export type Tag = z.infer<typeof TagSchema>

export const PetSchema = z
  .object({
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
  .meta({ ref: 'Pet' })

export type Pet = z.infer<typeof PetSchema>

export const ApiResponseSchema = z
  .object({
    code: z.int32().exactOptional(),
    type: z.string().exactOptional(),
    message: z.string().exactOptional(),
  })
  .meta({ ref: 'ApiResponse' })

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
  content: {
    'application/json': { schema: resolver(PetSchema) },
    'application/xml': { schema: resolver(PetSchema) },
  },
}
export const UserArrayRequestBody = {
  description: 'List of user object',
  content: { 'application/json': { schema: resolver(z.array(UserSchema)) } },
}
