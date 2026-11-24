import { Effect, Schema, SchemaTransformation } from 'effect'

export const IssueStatelessChannelTokenByJWTAssertionRequestSchema = Schema.Struct({
  grant_type: Schema.Literal('client_credentials').annotate({ description: 'client_credentials' }),
  client_assertion_type: Schema.Literal(
    'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
  ).annotate({
    description: 'URL-encoded value of `urn:ietf:params:oauth:client-assertion-type:jwt-bearer`',
  }),
  client_assertion: Schema.String.annotate({
    description:
      'A JSON Web Token the client needs to create and sign with the private key of the Assertion Signing Key.',
  }),
}).annotate({
  description: 'Request body to issue a new token with JWT assertion',
  jsonSchemaExternalDocs: {
    url: 'https://developers.line.biz/en/reference/messaging-api/#issue-stateless-channel-access-token',
  },
})

export type IssueStatelessChannelTokenByJWTAssertionRequest = Schema.Schema.Type<
  typeof IssueStatelessChannelTokenByJWTAssertionRequestSchema
>

export const IssueStatelessChannelTokenByClientSecretRequestSchema = Schema.Struct({
  grant_type: Schema.Literal('client_credentials').annotate({
    description: '`client_credentials`',
  }),
  client_id: Schema.String.annotate({ description: 'Channel ID.' }),
  client_secret: Schema.String.annotate({ description: 'Channel secret.' }),
}).annotate({
  description: 'Request body to issue a new token with `client_id` and `client_secret`',
  jsonSchemaExternalDocs: {
    url: 'https://developers.line.biz/en/reference/messaging-api/#issue-stateless-channel-access-token',
  },
})

export type IssueStatelessChannelTokenByClientSecretRequest = Schema.Schema.Type<
  typeof IssueStatelessChannelTokenByClientSecretRequestSchema
>

export const IssueStatelessChannelAccessTokenResponseSchema = Schema.Struct({
  access_token: Schema.String.annotate({
    description:
      'A stateless channel access token.\nThe token is an opaque string which means its format is an implementation detail\nand the consumer of this token should never try to use the data parsed from the token.\n',
  }),
  expires_in: Schema.Number.check(Schema.isInt32()).annotate({
    description: 'Duration in seconds after which the issued access token expires',
  }),
  token_type: Schema.String.pipe(Schema.withDecodingDefault(Effect.succeed('Bearer'))).annotate({
    description: 'Token type. The value is always `Bearer`.',
  }),
}).annotate({
  description: 'Issued stateless channel access token',
  jsonSchemaExternalDocs: {
    url: 'https://developers.line.biz/en/reference/messaging-api/#issue-stateless-channel-access-token',
  },
})

export type IssueStatelessChannelAccessTokenResponse = Schema.Schema.Type<
  typeof IssueStatelessChannelAccessTokenResponseSchema
>

export const ChannelAccessTokenKeyIdsResponseSchema = Schema.Struct({
  kids: Schema.Array(Schema.String).annotate({
    description: 'Array of channel access token key IDs.',
  }),
}).annotate({
  description: 'Channel access token key IDs',
  jsonSchemaExternalDocs: {
    url: 'https://developers.line.biz/en/reference/messaging-api/#get-all-valid-channel-access-token-key-ids-v2-1',
  },
})

export type ChannelAccessTokenKeyIdsResponse = Schema.Schema.Type<
  typeof ChannelAccessTokenKeyIdsResponseSchema
>

export const IssueShortLivedChannelAccessTokenResponseSchema = Schema.Struct({
  access_token: Schema.String.annotate({
    description:
      'A short-lived channel access token. Valid for 30 days.\nNote: Channel access tokens cannot be refreshed.\n',
  }),
  expires_in: Schema.Number.check(Schema.isInt32()).annotate({
    description:
      'Time until channel access token expires in seconds from time the token is issued.',
  }),
  token_type: Schema.String.pipe(Schema.withDecodingDefault(Effect.succeed('Bearer'))).annotate({
    description: 'Token type. The value is always `Bearer`.',
  }),
}).annotate({
  description: 'Issued short-lived channel access token',
  jsonSchemaExternalDocs: {
    url: 'https://developers.line.biz/en/reference/messaging-api/#issue-shortlived-channel-access-token',
  },
})

export type IssueShortLivedChannelAccessTokenResponse = Schema.Schema.Type<
  typeof IssueShortLivedChannelAccessTokenResponseSchema
>

export const IssueChannelAccessTokenResponseSchema = Schema.Struct({
  access_token: Schema.String.annotate({ description: 'Channel access token.\n' }),
  expires_in: Schema.Number.check(Schema.isInt32()).annotate({
    description: 'Amount of time in seconds from issue to expiration of the channel access token',
  }),
  token_type: Schema.String.pipe(Schema.withDecodingDefault(Effect.succeed('Bearer'))).annotate({
    description: 'A token type.',
  }),
  key_id: Schema.String.annotate({
    description: 'Unique key ID for identifying the channel access token.',
  }),
}).annotate({
  description: 'Issued channel access token',
  jsonSchemaExternalDocs: {
    url: 'https://developers.line.biz/en/reference/messaging-api/#issue-channel-access-token-v2-1',
  },
})

export type IssueChannelAccessTokenResponse = Schema.Schema.Type<
  typeof IssueChannelAccessTokenResponseSchema
>

export const VerifyChannelAccessTokenResponseSchema = Schema.Struct({
  client_id: Schema.String.annotate({
    description: 'The channel ID for which the channel access token was issued.',
  }),
  expires_in: Schema.Union([
    Schema.BigInt,
    Schema.Number.check(Schema.isInt()),
    Schema.String.check(Schema.isPattern(/^-?\d+$/)),
  ])
    .pipe(
      Schema.decodeTo(
        Schema.BigInt,
        SchemaTransformation.transform({
          decode: (input) => BigInt(input),
          encode: (output) => output,
        }),
      ),
    )
    .check(
      Schema.isBetweenBigInt({ minimum: -9223372036854775808n, maximum: 9223372036854775807n }),
    )
    .annotate({ description: 'Number of seconds before the channel access token expires.' }),
  scope: Schema.optionalKey(
    Schema.String.annotate({ description: 'Permissions granted to the channel access token.' }),
  ),
}).annotate({
  description: 'Verification result',
  jsonSchemaExternalDocs: {
    url: 'https://developers.line.biz/en/reference/messaging-api/#verify-channel-access-token-v2-1',
  },
})

export type VerifyChannelAccessTokenResponse = Schema.Schema.Type<
  typeof VerifyChannelAccessTokenResponseSchema
>

export const ErrorResponseSchema = Schema.Struct({
  error: Schema.optionalKey(Schema.String.annotate({ description: 'Error summary' })),
  error_description: Schema.optionalKey(
    Schema.String.annotate({
      description: 'Details of the error. Not returned in certain situations.',
    }),
  ),
}).annotate({
  description: 'Error response of the Channel access token',
  jsonSchemaExternalDocs: {
    url: 'https://developers.line.biz/en/reference/messaging-api/#error-responses',
  },
})

export type ErrorResponse = Schema.Schema.Type<typeof ErrorResponseSchema>
