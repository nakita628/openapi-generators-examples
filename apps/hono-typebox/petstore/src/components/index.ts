import { Type, type Static } from 'typebox'

export const OrderSchema = Type.Object({
  id: Type.Optional(Type.Integer({ examples: [10] })),
  petId: Type.Optional(Type.Integer({ examples: [198772] })),
  quantity: Type.Optional(Type.Integer({ examples: [7] })),
  shipDate: Type.Optional(Type.String({ format: 'date-time' })),
  status: Type.Optional(
    Type.Union([Type.Literal('placed'), Type.Literal('approved'), Type.Literal('delivered')], {
      description: 'Order Status',
      examples: ['approved'],
    }),
  ),
  complete: Type.Optional(Type.Boolean()),
})

export type Order = Static<typeof OrderSchema>

export const CategorySchema = Type.Object({
  id: Type.Optional(Type.Integer({ examples: [1] })),
  name: Type.Optional(Type.String({ examples: ['Dogs'] })),
})

export type Category = Static<typeof CategorySchema>

export const UserSchema = Type.Object({
  id: Type.Optional(Type.Integer({ examples: [10] })),
  username: Type.Optional(Type.String({ examples: ['theUser'] })),
  firstName: Type.Optional(Type.String({ examples: ['John'] })),
  lastName: Type.Optional(Type.String({ examples: ['James'] })),
  email: Type.Optional(Type.String({ examples: ['john@email.com'] })),
  password: Type.Optional(Type.String({ examples: ['12345'] })),
  phone: Type.Optional(Type.String({ examples: ['12345'] })),
  userStatus: Type.Optional(Type.Integer({ description: 'User Status', examples: [1] })),
})

export type User = Static<typeof UserSchema>

export const TagSchema = Type.Object({
  id: Type.Optional(Type.Integer()),
  name: Type.Optional(Type.String()),
})

export type Tag = Static<typeof TagSchema>

export const PetSchema = Type.Object({
  id: Type.Optional(Type.Integer({ examples: [10] })),
  name: Type.String({ examples: ['doggie'] }),
  category: Type.Optional(CategorySchema),
  photoUrls: Type.Array(Type.String()),
  tags: Type.Optional(Type.Array(TagSchema)),
  status: Type.Optional(
    Type.Union([Type.Literal('available'), Type.Literal('pending'), Type.Literal('sold')], {
      description: 'pet status in the store',
    }),
  ),
})

export type Pet = Static<typeof PetSchema>

export const ApiResponseSchema = Type.Object({
  code: Type.Optional(Type.Integer()),
  type: Type.Optional(Type.String()),
  message: Type.Optional(Type.String()),
})

export type ApiResponse = Static<typeof ApiResponseSchema>

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
  content: { 'application/json': { schema: Type.Array(UserSchema) } },
}
