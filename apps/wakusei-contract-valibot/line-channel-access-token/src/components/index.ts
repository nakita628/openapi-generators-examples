import * as v from 'valibot'

export const IssueStatelessChannelTokenByJWTAssertionRequestSchema = v.pipe(
  v.object({
    grant_type: v.pipe(v.literal('client_credentials'), v.description('client_credentials')),
    client_assertion_type: v.pipe(
      v.literal('urn:ietf:params:oauth:client-assertion-type:jwt-bearer'),
      v.description(
        'URL-encoded value of `urn:ietf:params:oauth:client-assertion-type:jwt-bearer`',
      ),
    ),
    client_assertion: v.pipe(
      v.string(),
      v.description(
        'A JSON Web Token the client needs to create and sign with the private key of the Assertion Signing Key.',
      ),
    ),
  }),
  v.description('Request body to issue a new token with JWT assertion'),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#issue-stateless-channel-access-token',
    },
  }),
)

export type IssueStatelessChannelTokenByJWTAssertionRequestSchema = v.InferOutput<
  typeof IssueStatelessChannelTokenByJWTAssertionRequestSchema
>

export const IssueStatelessChannelTokenByClientSecretRequestSchema = v.pipe(
  v.object({
    grant_type: v.pipe(v.literal('client_credentials'), v.description('`client_credentials`')),
    client_id: v.pipe(v.string(), v.description('Channel ID.')),
    client_secret: v.pipe(v.string(), v.description('Channel secret.')),
  }),
  v.description('Request body to issue a new token with `client_id` and `client_secret`'),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#issue-stateless-channel-access-token',
    },
  }),
)

export type IssueStatelessChannelTokenByClientSecretRequestSchema = v.InferOutput<
  typeof IssueStatelessChannelTokenByClientSecretRequestSchema
>

export const IssueStatelessChannelAccessTokenResponseSchema = v.pipe(
  v.object({
    access_token: v.pipe(
      v.string(),
      v.description(
        'A stateless channel access token.\nThe token is an opaque string which means its format is an implementation detail\nand the consumer of this token should never try to use the data parsed from the token.\n',
      ),
    ),
    expires_in: v.pipe(
      v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
      v.description('Duration in seconds after which the issued access token expires'),
    ),
    token_type: v.pipe(
      v.optional(v.string(), 'Bearer'),
      v.description('Token type. The value is always `Bearer`.'),
    ),
  }),
  v.description('Issued stateless channel access token'),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#issue-stateless-channel-access-token',
    },
  }),
)

export type IssueStatelessChannelAccessTokenResponseSchema = v.InferOutput<
  typeof IssueStatelessChannelAccessTokenResponseSchema
>

export const ChannelAccessTokenKeyIdsResponseSchema = v.pipe(
  v.object({
    kids: v.pipe(v.array(v.string()), v.description('Array of channel access token key IDs.')),
  }),
  v.description('Channel access token key IDs'),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#get-all-valid-channel-access-token-key-ids-v2-1',
    },
  }),
)

export type ChannelAccessTokenKeyIdsResponseSchema = v.InferOutput<
  typeof ChannelAccessTokenKeyIdsResponseSchema
>

export const IssueShortLivedChannelAccessTokenResponseSchema = v.pipe(
  v.object({
    access_token: v.pipe(
      v.string(),
      v.description(
        'A short-lived channel access token. Valid for 30 days.\nNote: Channel access tokens cannot be refreshed.\n',
      ),
    ),
    expires_in: v.pipe(
      v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
      v.description(
        'Time until channel access token expires in seconds from time the token is issued.',
      ),
    ),
    token_type: v.pipe(
      v.optional(v.string(), 'Bearer'),
      v.description('Token type. The value is always `Bearer`.'),
    ),
  }),
  v.description('Issued short-lived channel access token'),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#issue-shortlived-channel-access-token',
    },
  }),
)

export type IssueShortLivedChannelAccessTokenResponseSchema = v.InferOutput<
  typeof IssueShortLivedChannelAccessTokenResponseSchema
>

export const IssueChannelAccessTokenResponseSchema = v.pipe(
  v.object({
    access_token: v.pipe(v.string(), v.description('Channel access token.\n')),
    expires_in: v.pipe(
      v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
      v.description(
        'Amount of time in seconds from issue to expiration of the channel access token',
      ),
    ),
    token_type: v.pipe(v.optional(v.string(), 'Bearer'), v.description('A token type.')),
    key_id: v.pipe(
      v.string(),
      v.description('Unique key ID for identifying the channel access token.'),
    ),
  }),
  v.description('Issued channel access token'),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#issue-channel-access-token-v2-1',
    },
  }),
)

export type IssueChannelAccessTokenResponseSchema = v.InferOutput<
  typeof IssueChannelAccessTokenResponseSchema
>

export const VerifyChannelAccessTokenResponseSchema = v.pipe(
  v.object({
    client_id: v.pipe(
      v.string(),
      v.description('The channel ID for which the channel access token was issued.'),
    ),
    expires_in: v.pipe(
      v.pipe(
        v.union([
          v.bigint(),
          v.pipe(v.number(), v.integer()),
          v.pipe(v.string(), v.regex(/^-?\d+$/)),
        ]),
        v.transform((input) => BigInt(input)),
        v.minValue(-9223372036854775808n),
        v.maxValue(9223372036854775807n),
      ),
      v.description('Number of seconds before the channel access token expires.'),
    ),
    scope: v.optional(
      v.pipe(v.string(), v.description('Permissions granted to the channel access token.')),
    ),
  }),
  v.description('Verification result'),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#verify-channel-access-token-v2-1',
    },
  }),
)

export type VerifyChannelAccessTokenResponseSchema = v.InferOutput<
  typeof VerifyChannelAccessTokenResponseSchema
>

export const ErrorResponseSchema = v.pipe(
  v.partial(
    v.object({
      error: v.pipe(v.string(), v.description('Error summary')),
      error_description: v.pipe(
        v.string(),
        v.description('Details of the error. Not returned in certain situations.'),
      ),
    }),
  ),
  v.description('Error response of the Channel access token'),
  v.metadata({
    externalDocs: {
      url: 'https://developers.line.biz/en/reference/messaging-api/#error-responses',
    },
  }),
)

export type ErrorResponseSchema = v.InferOutput<typeof ErrorResponseSchema>
