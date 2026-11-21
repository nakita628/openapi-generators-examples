import { t } from 'elysia'

export const OrderSchema = t.Object({
  id: t.Optional(t.Integer({ format: 'int64', maximum: 9007199254740991, example: 10 })),
  petId: t.Optional(t.Integer({ format: 'int64', maximum: 9007199254740991, example: 198772 })),
  quantity: t.Optional(
    t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647, example: 7 }),
  ),
  shipDate: t.Optional(t.Date()),
  status: t.Optional(
    t.UnionEnum(['placed', 'approved', 'delivered'], {
      example: 'approved',
      description: 'Order Status',
      default: undefined,
    }),
  ),
  complete: t.Optional(t.Boolean()),
})

export const CategorySchema = t.Object({
  id: t.Optional(t.Integer({ format: 'int64', maximum: 9007199254740991, example: 1 })),
  name: t.Optional(t.String({ example: 'Dogs' })),
})

export const UserSchema = t.Object({
  id: t.Optional(t.Integer({ format: 'int64', maximum: 9007199254740991, example: 10 })),
  username: t.Optional(t.String({ example: 'theUser' })),
  firstName: t.Optional(t.String({ example: 'John' })),
  lastName: t.Optional(t.String({ example: 'James' })),
  email: t.Optional(t.String({ example: 'john@email.com' })),
  password: t.Optional(t.String({ example: '12345' })),
  phone: t.Optional(t.String({ example: '12345' })),
  userStatus: t.Optional(
    t.Integer({
      format: 'int32',
      minimum: -2147483648,
      maximum: 2147483647,
      example: 1,
      description: 'User Status',
    }),
  ),
})

export const TagSchema = t.Object({
  id: t.Optional(t.Integer({ format: 'int64', maximum: 9007199254740991 })),
  name: t.Optional(t.String()),
})

export const PetSchema = t.Object({
  id: t.Optional(t.Integer({ format: 'int64', maximum: 9007199254740991, example: 10 })),
  name: t.String({ example: 'doggie' }),
  category: t.Optional(CategorySchema),
  photoUrls: t.Array(t.String()),
  tags: t.Optional(t.Array(TagSchema)),
  status: t.Optional(
    t.UnionEnum(['available', 'pending', 'sold'], {
      description: 'pet status in the store',
      default: undefined,
    }),
  ),
})

export const ApiResponseSchema = t.Object({
  code: t.Optional(t.Integer({ format: 'int32', minimum: -2147483648, maximum: 2147483647 })),
  type: t.Optional(t.String()),
  message: t.Optional(t.String()),
})
