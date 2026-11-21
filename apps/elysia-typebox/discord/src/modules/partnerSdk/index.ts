import { Elysia, t } from 'elysia'
import {
  ApplicationIdentityProviderAuthTypeSchema,
  ErrorSchema,
  ErrorDetailsSchema,
  ErrorResponseSchema,
  InnerErrorsSchema,
  ProvisionalTokenResponseSchema,
  RatelimitedResponseSchema,
  SnowflakeTypeSchema,
} from '../../components/schemas'
import { PartnerSdkModel } from './model'

export const partnerSdk = new Elysia()
  .model({
    ApplicationIdentityProviderAuthType: ApplicationIdentityProviderAuthTypeSchema,
    Error: ErrorSchema,
    ErrorDetails: ErrorDetailsSchema,
    ErrorResponse: ErrorResponseSchema,
    InnerErrors: InnerErrorsSchema,
    ProvisionalTokenResponse: ProvisionalTokenResponseSchema,
    RatelimitedResponse: RatelimitedResponseSchema,
    SnowflakeType: SnowflakeTypeSchema,
  })
  .put(
    '/partner-sdk/dms/:user_id_1/:user_id_2/messages/:message_id/moderation-metadata',
    ({ params, body }) => { throw new Error('Not implemented') },
    {
      params: PartnerSdkModel.update_user_message_external_moderation_metadataParams,
      body: PartnerSdkModel.update_user_message_external_moderation_metadataBody,
      response: { 204: t.Void(), 429: 'RatelimitedResponse', '4XX': 'ErrorResponse' },
      detail: {
        tags: [],
        description: 'Update the external moderation metadata for a user message (DM).',
        operationId: 'update_user_message_external_moderation_metadata',
        security: [{ BotToken: [] }],
      },
    },
  )
  .post('/partner-sdk/provisional-accounts/unmerge', ({ body }) => { throw new Error('Not implemented') }, {
    body: PartnerSdkModel.partner_sdk_unmerge_provisional_accountBody,
    response: { 204: t.Void(), 429: 'RatelimitedResponse', '4XX': 'ErrorResponse' },
    detail: {
      tags: [],
      operationId: 'partner_sdk_unmerge_provisional_account',
      security: [{}, { BotToken: [] }],
    },
  })
  .post('/partner-sdk/provisional-accounts/unmerge/bot', ({ body }) => { throw new Error('Not implemented') }, {
    body: PartnerSdkModel.bot_partner_sdk_unmerge_provisional_accountBody,
    response: { 204: t.Void(), 429: 'RatelimitedResponse', '4XX': 'ErrorResponse' },
    detail: {
      tags: [],
      operationId: 'bot_partner_sdk_unmerge_provisional_account',
      security: [{ BotToken: [] }],
    },
  })
  .post('/partner-sdk/token', ({ body }) => { throw new Error('Not implemented') }, {
    body: PartnerSdkModel.partner_sdk_tokenBody,
    response: {
      200: 'ProvisionalTokenResponse',
      429: 'RatelimitedResponse',
      '4XX': 'ErrorResponse',
    },
    detail: { tags: [], operationId: 'partner_sdk_token', security: [{}, { BotToken: [] }] },
  })
  .post('/partner-sdk/token/bot', ({ body }) => { throw new Error('Not implemented') }, {
    body: PartnerSdkModel.bot_partner_sdk_tokenBody,
    response: {
      200: 'ProvisionalTokenResponse',
      429: 'RatelimitedResponse',
      '4XX': 'ErrorResponse',
    },
    detail: { tags: [], operationId: 'bot_partner_sdk_token', security: [{ BotToken: [] }] },
  })
