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

export type OrderSchema = z.infer<typeof OrderSchema>

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

export type CategorySchema = z.infer<typeof CategorySchema>

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

export type UserSchema = z.infer<typeof UserSchema>

export const TagSchema = z.object({
  id: z
    .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
    .transform((val) => BigInt(val))
    .pipe(z.int64())
    .exactOptional(),
  name: z.string().exactOptional(),
})

export type TagSchema = z.infer<typeof TagSchema>

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

export type PetSchema = z.infer<typeof PetSchema>

export const ApiResponseSchema = z.object({
  code: z.int32().exactOptional(),
  type: z.string().exactOptional(),
  message: z.string().exactOptional(),
})

export type ApiResponseSchema = z.infer<typeof ApiResponseSchema>
