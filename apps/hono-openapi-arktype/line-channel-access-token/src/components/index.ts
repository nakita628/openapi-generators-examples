import { type } from 'arktype'

declare global {
  interface ArkEnv {
    meta(): { ref?: string }
  }
}

export const IssueStatelessChannelTokenByJWTAssertionRequestSchema = type({
  grant_type: type("'client_credentials'").describe('client_credentials'),
  client_assertion_type: type("'urn:ietf:params:oauth:client-assertion-type:jwt-bearer'").describe(
    'URL-encoded value of `urn:ietf:params:oauth:client-assertion-type:jwt-bearer`',
  ),
  client_assertion: type('string').describe(
    'A JSON Web Token the client needs to create and sign with the private key of the Assertion Signing Key.',
  ),
})
  .describe('Request body to issue a new token with JWT assertion')
  .configure({ ref: 'IssueStatelessChannelTokenByJWTAssertionRequest' })

export type IssueStatelessChannelTokenByJWTAssertionRequest =
  typeof IssueStatelessChannelTokenByJWTAssertionRequestSchema.infer

export const IssueStatelessChannelTokenByClientSecretRequestSchema = type({
  grant_type: type("'client_credentials'").describe('`client_credentials`'),
  client_id: type('string').describe('Channel ID.'),
  client_secret: type('string').describe('Channel secret.'),
})
  .describe('Request body to issue a new token with `client_id` and `client_secret`')
  .configure({ ref: 'IssueStatelessChannelTokenByClientSecretRequest' })

export type IssueStatelessChannelTokenByClientSecretRequest =
  typeof IssueStatelessChannelTokenByClientSecretRequestSchema.infer

export const IssueStatelessChannelAccessTokenResponseSchema = type({
  access_token: type('string').describe(
    'A stateless channel access token.\nThe token is an opaque string which means its format is an implementation detail\nand the consumer of this token should never try to use the data parsed from the token.\n',
  ),
  expires_in: type('number.integer >= -2147483648 & number.integer <= 2147483647').describe(
    'Duration in seconds after which the issued access token expires',
  ),
  token_type: type('string').describe('Token type. The value is always `Bearer`.'),
})
  .describe('Issued stateless channel access token')
  .configure({ ref: 'IssueStatelessChannelAccessTokenResponse' })

export type IssueStatelessChannelAccessTokenResponse =
  typeof IssueStatelessChannelAccessTokenResponseSchema.infer

export const ChannelAccessTokenKeyIdsResponseSchema = type({
  kids: type('string[]').describe('Array of channel access token key IDs.'),
})
  .describe('Channel access token key IDs')
  .configure({ ref: 'ChannelAccessTokenKeyIdsResponse' })

export type ChannelAccessTokenKeyIdsResponse = typeof ChannelAccessTokenKeyIdsResponseSchema.infer

export const IssueShortLivedChannelAccessTokenResponseSchema = type({
  access_token: type('string').describe(
    'A short-lived channel access token. Valid for 30 days.\nNote: Channel access tokens cannot be refreshed.\n',
  ),
  expires_in: type('number.integer >= -2147483648 & number.integer <= 2147483647').describe(
    'Time until channel access token expires in seconds from time the token is issued.',
  ),
  token_type: type('string').describe('Token type. The value is always `Bearer`.'),
})
  .describe('Issued short-lived channel access token')
  .configure({ ref: 'IssueShortLivedChannelAccessTokenResponse' })

export type IssueShortLivedChannelAccessTokenResponse =
  typeof IssueShortLivedChannelAccessTokenResponseSchema.infer

export const IssueChannelAccessTokenResponseSchema = type({
  access_token: type('string').describe('Channel access token.\n'),
  expires_in: type('number.integer >= -2147483648 & number.integer <= 2147483647').describe(
    'Amount of time in seconds from issue to expiration of the channel access token',
  ),
  token_type: type('string').describe('A token type.'),
  key_id: type('string').describe('Unique key ID for identifying the channel access token.'),
})
  .describe('Issued channel access token')
  .configure({ ref: 'IssueChannelAccessTokenResponse' })

export type IssueChannelAccessTokenResponse = typeof IssueChannelAccessTokenResponseSchema.infer

export const VerifyChannelAccessTokenResponseSchema = type({
  client_id: type('string').describe(
    'The channel ID for which the channel access token was issued.',
  ),
  expires_in: type('bigint | number.integer')
    .or(/^-?\d+$/)
    .pipe((data) => BigInt(data))
    .narrow(
      (data, ctx) =>
        (data >= -9223372036854775808n && data <= 9223372036854775807n) || ctx.mustBe('an int64'),
    )
    .describe('Number of seconds before the channel access token expires.'),
  'scope?': type('string').describe('Permissions granted to the channel access token.'),
})
  .describe('Verification result')
  .configure({ ref: 'VerifyChannelAccessTokenResponse' })

export type VerifyChannelAccessTokenResponse = typeof VerifyChannelAccessTokenResponseSchema.infer

export const ErrorResponseSchema = type({
  'error?': type('string').describe('Error summary'),
  'error_description?': type('string').describe(
    'Details of the error. Not returned in certain situations.',
  ),
})
  .describe('Error response of the Channel access token')
  .configure({ ref: 'ErrorResponse' })

export type ErrorResponse = typeof ErrorResponseSchema.infer
