import { t, type UnwrapSchema } from 'elysia'
import {
  ApplicationIdentityProviderAuthTypeSchema,
  SnowflakeTypeSchema,
} from '../../components/schemas'

export const PartnerSdkModel = {
  update_user_message_external_moderation_metadataParams: t.Object({
    user_id_1: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    user_id_2: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    message_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  update_user_message_external_moderation_metadataBody: t.Record(
    t.String(),
    t.String({ maxLength: 2000 }),
    { maxProperties: 5, description: 'The moderation metadata attached to the message' },
  ),
  partner_sdk_unmerge_provisional_accountBody: t.Object({
    client_id: SnowflakeTypeSchema,
    client_secret: t.Optional(t.Union([t.String({ maxLength: 1024 }), t.Null()])),
    external_auth_token: t.String({ minLength: 1, maxLength: 10240 }),
    external_auth_type: ApplicationIdentityProviderAuthTypeSchema,
  }),
  bot_partner_sdk_unmerge_provisional_accountBody: t.Object({
    external_user_id: t.String({ minLength: 1, maxLength: 1024 }),
  }),
  partner_sdk_tokenBody: t.Object({
    client_id: SnowflakeTypeSchema,
    client_secret: t.Optional(t.Union([t.String({ maxLength: 1024 }), t.Null()])),
    external_auth_token: t.String({ minLength: 1, maxLength: 10240 }),
    external_auth_type: ApplicationIdentityProviderAuthTypeSchema,
  }),
  bot_partner_sdk_tokenBody: t.Object({
    provisional_user_id: t.Optional(t.Union([t.Null(), SnowflakeTypeSchema])),
    external_user_id: t.String({ minLength: 1, maxLength: 1024 }),
    preferred_global_name: t.Optional(
      t.Union([t.String({ minLength: 1, maxLength: 32 }), t.Null()]),
    ),
  }),
} as const

export type PartnerSdkModel = {
  [k in keyof typeof PartnerSdkModel]: UnwrapSchema<(typeof PartnerSdkModel)[k]>
}
