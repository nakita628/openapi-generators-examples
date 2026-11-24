import { Type, type Static } from 'typebox'

export const IssueStatelessChannelTokenByJWTAssertionRequestSchema = Type.Object(
  {
    grant_type: Type.Literal('client_credentials', { description: 'client_credentials' }),
    client_assertion_type: Type.Literal('urn:ietf:params:oauth:client-assertion-type:jwt-bearer', {
      description: 'URL-encoded value of `urn:ietf:params:oauth:client-assertion-type:jwt-bearer`',
    }),
    client_assertion: Type.String({
      description:
        'A JSON Web Token the client needs to create and sign with the private key of the Assertion Signing Key.',
    }),
  },
  {
    ref: 'IssueStatelessChannelTokenByJWTAssertionRequest',
    description: 'Request body to issue a new token with JWT assertion',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#issue-stateless-channel-access-token',
    },
  },
)

export type IssueStatelessChannelTokenByJWTAssertionRequest = Static<
  typeof IssueStatelessChannelTokenByJWTAssertionRequestSchema
>

export const IssueStatelessChannelTokenByClientSecretRequestSchema = Type.Object(
  {
    grant_type: Type.Literal('client_credentials', { description: '`client_credentials`' }),
    client_id: Type.String({ description: 'Channel ID.' }),
    client_secret: Type.String({ description: 'Channel secret.' }),
  },
  {
    ref: 'IssueStatelessChannelTokenByClientSecretRequest',
    description: 'Request body to issue a new token with `client_id` and `client_secret`',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#issue-stateless-channel-access-token',
    },
  },
)

export type IssueStatelessChannelTokenByClientSecretRequest = Static<
  typeof IssueStatelessChannelTokenByClientSecretRequestSchema
>

export const IssueStatelessChannelAccessTokenResponseSchema = Type.Object(
  {
    access_token: Type.String({
      description:
        'A stateless channel access token.\nThe token is an opaque string which means its format is an implementation detail\nand the consumer of this token should never try to use the data parsed from the token.\n',
    }),
    expires_in: Type.Integer({
      description: 'Duration in seconds after which the issued access token expires',
    }),
    token_type: Type.Optional(
      Type.String({ description: 'Token type. The value is always `Bearer`.', default: 'Bearer' }),
    ),
  },
  {
    ref: 'IssueStatelessChannelAccessTokenResponse',
    description: 'Issued stateless channel access token',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#issue-stateless-channel-access-token',
    },
  },
)

export type IssueStatelessChannelAccessTokenResponse = Static<
  typeof IssueStatelessChannelAccessTokenResponseSchema
>

export const ChannelAccessTokenKeyIdsResponseSchema = Type.Object(
  { kids: Type.Array(Type.String(), { description: 'Array of channel access token key IDs.' }) },
  {
    ref: 'ChannelAccessTokenKeyIdsResponse',
    description: 'Channel access token key IDs',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-all-valid-channel-access-token-key-ids-v2-1',
    },
  },
)

export type ChannelAccessTokenKeyIdsResponse = Static<typeof ChannelAccessTokenKeyIdsResponseSchema>

export const IssueShortLivedChannelAccessTokenResponseSchema = Type.Object(
  {
    access_token: Type.String({
      description:
        'A short-lived channel access token. Valid for 30 days.\nNote: Channel access tokens cannot be refreshed.\n',
    }),
    expires_in: Type.Integer({
      description:
        'Time until channel access token expires in seconds from time the token is issued.',
    }),
    token_type: Type.Optional(
      Type.String({ description: 'Token type. The value is always `Bearer`.', default: 'Bearer' }),
    ),
  },
  {
    ref: 'IssueShortLivedChannelAccessTokenResponse',
    description: 'Issued short-lived channel access token',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#issue-shortlived-channel-access-token',
    },
  },
)

export type IssueShortLivedChannelAccessTokenResponse = Static<
  typeof IssueShortLivedChannelAccessTokenResponseSchema
>

export const IssueChannelAccessTokenResponseSchema = Type.Object(
  {
    access_token: Type.String({ description: 'Channel access token.\n' }),
    expires_in: Type.Integer({
      description: 'Amount of time in seconds from issue to expiration of the channel access token',
    }),
    token_type: Type.Optional(Type.String({ description: 'A token type.', default: 'Bearer' })),
    key_id: Type.String({ description: 'Unique key ID for identifying the channel access token.' }),
  },
  {
    ref: 'IssueChannelAccessTokenResponse',
    description: 'Issued channel access token',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#issue-channel-access-token-v2-1',
    },
  },
)

export type IssueChannelAccessTokenResponse = Static<typeof IssueChannelAccessTokenResponseSchema>

export const VerifyChannelAccessTokenResponseSchema = Type.Object(
  {
    client_id: Type.String({
      description: 'The channel ID for which the channel access token was issued.',
    }),
    expires_in: Type.Integer({
      description: 'Number of seconds before the channel access token expires.',
    }),
    scope: Type.Optional(
      Type.String({ description: 'Permissions granted to the channel access token.' }),
    ),
  },
  {
    ref: 'VerifyChannelAccessTokenResponse',
    description: 'Verification result',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#verify-channel-access-token-v2-1',
    },
  },
)

export type VerifyChannelAccessTokenResponse = Static<typeof VerifyChannelAccessTokenResponseSchema>

export const ErrorResponseSchema = Type.Object(
  {
    error: Type.Optional(Type.String({ description: 'Error summary' })),
    error_description: Type.Optional(
      Type.String({ description: 'Details of the error. Not returned in certain situations.' }),
    ),
  },
  {
    ref: 'ErrorResponse',
    description: 'Error response of the Channel access token',
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#error-responses',
    },
  },
)

export type ErrorResponse = Static<typeof ErrorResponseSchema>
