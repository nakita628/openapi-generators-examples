export const BasicAuthSecurityScheme = {
  description:
    'Basic HTTP authentication. Allowed headers-- Authorization: Basic <api_key> | Authorization: Basic <base64 hash of `api_key:`>',
  scheme: 'basic',
  type: 'http',
} as const

export const BearerAuthSecurityScheme = {
  bearerFormat: 'auth-scheme',
  description: 'Bearer HTTP authentication. Allowed headers-- Authorization: Bearer <api_key>',
  scheme: 'bearer',
  type: 'http',
} as const
