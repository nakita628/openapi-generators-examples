import { t } from 'elysia'

export const IssueStatelessChannelTokenByJWTAssertionRequestSchema = t.Object(
  {
    grant_type: t.Literal('client_credentials', { description: 'client_credentials' }),
    client_assertion_type: t.Literal('urn:ietf:params:oauth:client-assertion-type:jwt-bearer', {
      description: 'URL-encoded value of `urn:ietf:params:oauth:client-assertion-type:jwt-bearer`',
    }),
    client_assertion: t.String({
      description:
        'A JSON Web Token the client needs to create and sign with the private key of the Assertion Signing Key.',
    }),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#issue-stateless-channel-access-token',
    },
    description: 'Request body to issue a new token with JWT assertion',
  },
)

export const IssueStatelessChannelTokenByClientSecretRequestSchema = t.Object(
  {
    grant_type: t.Literal('client_credentials', { description: '`client_credentials`' }),
    client_id: t.String({ description: 'Channel ID.' }),
    client_secret: t.String({ description: 'Channel secret.' }),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#issue-stateless-channel-access-token',
    },
    description: 'Request body to issue a new token with `client_id` and `client_secret`',
  },
)

export const IssueStatelessChannelAccessTokenResponseSchema = t.Object(
  {
    access_token: t.String({
      description:
        'A stateless channel access token.\nThe token is an opaque string which means its format is an implementation detail\nand the consumer of this token should never try to use the data parsed from the token.\n',
    }),
    expires_in: t.Integer({
      format: 'int32',
      minimum: -2147483648,
      maximum: 2147483647,
      description: 'Duration in seconds after which the issued access token expires',
    }),
    token_type: t.String({
      description: 'Token type. The value is always `Bearer`.',
      default: 'Bearer',
    }),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#issue-stateless-channel-access-token',
    },
    description: 'Issued stateless channel access token',
  },
)

export const ChannelAccessTokenKeyIdsResponseSchema = t.Object(
  { kids: t.Array(t.String(), { description: 'Array of channel access token key IDs.' }) },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-all-valid-channel-access-token-key-ids-v2-1',
    },
    description: 'Channel access token key IDs',
  },
)

export const IssueShortLivedChannelAccessTokenResponseSchema = t.Object(
  {
    access_token: t.String({
      description:
        'A short-lived channel access token. Valid for 30 days.\nNote: Channel access tokens cannot be refreshed.\n',
    }),
    expires_in: t.Integer({
      format: 'int32',
      minimum: -2147483648,
      maximum: 2147483647,
      description:
        'Time until channel access token expires in seconds from time the token is issued.',
    }),
    token_type: t.String({
      description: 'Token type. The value is always `Bearer`.',
      default: 'Bearer',
    }),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#issue-shortlived-channel-access-token',
    },
    description: 'Issued short-lived channel access token',
  },
)

export const IssueChannelAccessTokenResponseSchema = t.Object(
  {
    access_token: t.String({ description: 'Channel access token.\n' }),
    expires_in: t.Integer({
      format: 'int32',
      minimum: -2147483648,
      maximum: 2147483647,
      description: 'Amount of time in seconds from issue to expiration of the channel access token',
    }),
    token_type: t.String({ description: 'A token type.', default: 'Bearer' }),
    key_id: t.String({ description: 'Unique key ID for identifying the channel access token.' }),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#issue-channel-access-token-v2-1',
    },
    description: 'Issued channel access token',
  },
)

export const VerifyChannelAccessTokenResponseSchema = t.Object(
  {
    client_id: t.String({
      description: 'The channel ID for which the channel access token was issued.',
    }),
    expires_in: t.Integer({
      format: 'int64',
      maximum: 9007199254740991,
      description: 'Number of seconds before the channel access token expires.',
    }),
    scope: t.Optional(
      t.String({ description: 'Permissions granted to the channel access token.' }),
    ),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#verify-channel-access-token-v2-1',
    },
    description: 'Verification result',
  },
)

export const ErrorResponseSchema = t.Object(
  {
    error: t.Optional(t.String({ description: 'Error summary' })),
    error_description: t.Optional(
      t.String({ description: 'Details of the error. Not returned in certain situations.' }),
    ),
  },
  {
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#error-responses',
    },
    description: 'Error response of the Channel access token',
  },
)
