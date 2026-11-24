import * as z from 'zod'

export const IssueStatelessChannelTokenByJWTAssertionRequestSchema = z
  .object({
    grant_type: z.literal('client_credentials').meta({ description: 'client_credentials' }),
    client_assertion_type: z
      .literal('urn:ietf:params:oauth:client-assertion-type:jwt-bearer')
      .meta({
        description:
          'URL-encoded value of `urn:ietf:params:oauth:client-assertion-type:jwt-bearer`',
      }),
    client_assertion: z
      .string()
      .meta({
        description:
          'A JSON Web Token the client needs to create and sign with the private key of the Assertion Signing Key.',
      }),
  })
  .meta({
    description: 'Request body to issue a new token with JWT assertion',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#issue-stateless-channel-access-token',
    },
  })
  .meta({ ref: 'IssueStatelessChannelTokenByJWTAssertionRequest' })

export type IssueStatelessChannelTokenByJWTAssertionRequest = z.infer<
  typeof IssueStatelessChannelTokenByJWTAssertionRequestSchema
>

export const IssueStatelessChannelTokenByClientSecretRequestSchema = z
  .object({
    grant_type: z.literal('client_credentials').meta({ description: '`client_credentials`' }),
    client_id: z.string().meta({ description: 'Channel ID.' }),
    client_secret: z.string().meta({ description: 'Channel secret.' }),
  })
  .meta({
    description: 'Request body to issue a new token with `client_id` and `client_secret`',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#issue-stateless-channel-access-token',
    },
  })
  .meta({ ref: 'IssueStatelessChannelTokenByClientSecretRequest' })

export type IssueStatelessChannelTokenByClientSecretRequest = z.infer<
  typeof IssueStatelessChannelTokenByClientSecretRequestSchema
>

export const IssueStatelessChannelAccessTokenResponseSchema = z
  .object({
    access_token: z
      .string()
      .meta({
        description:
          'A stateless channel access token.\nThe token is an opaque string which means its format is an implementation detail\nand the consumer of this token should never try to use the data parsed from the token.\n',
      }),
    expires_in: z
      .int32()
      .meta({ description: 'Duration in seconds after which the issued access token expires' }),
    token_type: z
      .string()
      .default('Bearer')
      .meta({ description: 'Token type. The value is always `Bearer`.' }),
  })
  .meta({
    description: 'Issued stateless channel access token',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#issue-stateless-channel-access-token',
    },
  })
  .meta({ ref: 'IssueStatelessChannelAccessTokenResponse' })

export type IssueStatelessChannelAccessTokenResponse = z.infer<
  typeof IssueStatelessChannelAccessTokenResponseSchema
>

export const ChannelAccessTokenKeyIdsResponseSchema = z
  .object({
    kids: z.array(z.string()).meta({ description: 'Array of channel access token key IDs.' }),
  })
  .meta({
    description: 'Channel access token key IDs',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-all-valid-channel-access-token-key-ids-v2-1',
    },
  })
  .meta({ ref: 'ChannelAccessTokenKeyIdsResponse' })

export type ChannelAccessTokenKeyIdsResponse = z.infer<
  typeof ChannelAccessTokenKeyIdsResponseSchema
>

export const IssueShortLivedChannelAccessTokenResponseSchema = z
  .object({
    access_token: z
      .string()
      .meta({
        description:
          'A short-lived channel access token. Valid for 30 days.\nNote: Channel access tokens cannot be refreshed.\n',
      }),
    expires_in: z
      .int32()
      .meta({
        description:
          'Time until channel access token expires in seconds from time the token is issued.',
      }),
    token_type: z
      .string()
      .default('Bearer')
      .meta({ description: 'Token type. The value is always `Bearer`.' }),
  })
  .meta({
    description: 'Issued short-lived channel access token',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#issue-shortlived-channel-access-token',
    },
  })
  .meta({ ref: 'IssueShortLivedChannelAccessTokenResponse' })

export type IssueShortLivedChannelAccessTokenResponse = z.infer<
  typeof IssueShortLivedChannelAccessTokenResponseSchema
>

export const IssueChannelAccessTokenResponseSchema = z
  .object({
    access_token: z.string().meta({ description: 'Channel access token.\n' }),
    expires_in: z
      .int32()
      .meta({
        description:
          'Amount of time in seconds from issue to expiration of the channel access token',
      }),
    token_type: z.string().default('Bearer').meta({ description: 'A token type.' }),
    key_id: z
      .string()
      .meta({ description: 'Unique key ID for identifying the channel access token.' }),
  })
  .meta({
    description: 'Issued channel access token',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#issue-channel-access-token-v2-1',
    },
  })
  .meta({ ref: 'IssueChannelAccessTokenResponse' })

export type IssueChannelAccessTokenResponse = z.infer<typeof IssueChannelAccessTokenResponseSchema>

export const VerifyChannelAccessTokenResponseSchema = z
  .object({
    client_id: z
      .string()
      .meta({ description: 'The channel ID for which the channel access token was issued.' }),
    expires_in: z
      .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
      .transform((val) => BigInt(val))
      .pipe(z.int64())
      .meta({ description: 'Number of seconds before the channel access token expires.' }),
    scope: z
      .string()
      .meta({ description: 'Permissions granted to the channel access token.' })
      .exactOptional(),
  })
  .meta({
    description: 'Verification result',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#verify-channel-access-token-v2-1',
    },
  })
  .meta({ ref: 'VerifyChannelAccessTokenResponse' })

export type VerifyChannelAccessTokenResponse = z.infer<
  typeof VerifyChannelAccessTokenResponseSchema
>

export const ErrorResponseSchema = z
  .object({
    error: z.string().meta({ description: 'Error summary' }).exactOptional(),
    error_description: z
      .string()
      .meta({ description: 'Details of the error. Not returned in certain situations.' })
      .exactOptional(),
  })
  .meta({
    description: 'Error response of the Channel access token',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#error-responses',
    },
  })
  .meta({ ref: 'ErrorResponse' })

export type ErrorResponse = z.infer<typeof ErrorResponseSchema>
