import { t, type UnwrapSchema } from 'elysia'
import {
  ApplicationIncomingWebhookResponseSchema,
  ChannelFollowerWebhookResponseSchema,
  GuildIncomingWebhookResponseSchema,
  IncomingWebhookRequestPartialSchema,
  IncomingWebhookUpdateRequestPartialSchema,
  SnowflakeTypeSchema,
} from '../../components/schemas'

export const WebhooksModel = {
  get_webhookParams: t.Object({ webhook_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }) }),
  get_webhookResponse200: t.Union([
    ApplicationIncomingWebhookResponseSchema,
    ChannelFollowerWebhookResponseSchema,
    GuildIncomingWebhookResponseSchema,
  ]),
  delete_webhookParams: t.Object({ webhook_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }) }),
  update_webhookParams: t.Object({ webhook_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }) }),
  update_webhookBody: t.Object({
    name: t.Optional(t.String({ minLength: 1, maxLength: 80 })),
    avatar: t.Optional(t.Union([t.String(), t.Null()])),
    channel_id: t.Optional(t.Union([t.Null(), SnowflakeTypeSchema])),
  }),
  update_webhookResponse200: t.Union([
    ApplicationIncomingWebhookResponseSchema,
    ChannelFollowerWebhookResponseSchema,
    GuildIncomingWebhookResponseSchema,
  ]),
  get_webhook_by_tokenParams: t.Object({
    webhook_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    webhook_token: t.String({ maxLength: 152133 }),
  }),
  get_webhook_by_tokenResponse200: t.Union([
    ApplicationIncomingWebhookResponseSchema,
    ChannelFollowerWebhookResponseSchema,
    GuildIncomingWebhookResponseSchema,
  ]),
  execute_webhookParams: t.Object({
    webhook_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    webhook_token: t.String({ maxLength: 152133 }),
  }),
  execute_webhookQuery: t.Object({
    wait: t.Optional(t.Boolean()),
    thread_id: t.Optional(t.String({ pattern: '^(0|[1-9][0-9]*)$' })),
    with_components: t.Optional(t.Boolean()),
  }),
  execute_webhookBody: t.Union([
    IncomingWebhookRequestPartialSchema,
    IncomingWebhookUpdateRequestPartialSchema,
  ]),
  delete_webhook_by_tokenParams: t.Object({
    webhook_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    webhook_token: t.String({ maxLength: 152133 }),
  }),
  update_webhook_by_tokenParams: t.Object({
    webhook_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    webhook_token: t.String({ maxLength: 152133 }),
  }),
  update_webhook_by_tokenBody: t.Object({
    name: t.Optional(t.String({ minLength: 1, maxLength: 80 })),
    avatar: t.Optional(t.Union([t.String(), t.Null()])),
  }),
  update_webhook_by_tokenResponse200: t.Union([
    ApplicationIncomingWebhookResponseSchema,
    ChannelFollowerWebhookResponseSchema,
    GuildIncomingWebhookResponseSchema,
  ]),
  execute_github_compatible_webhookParams: t.Object({
    webhook_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    webhook_token: t.String({ maxLength: 152133 }),
  }),
  execute_github_compatible_webhookQuery: t.Object({
    wait: t.Optional(t.Boolean()),
    thread_id: t.Optional(t.String({ pattern: '^(0|[1-9][0-9]*)$' })),
  }),
  get_original_webhook_messageParams: t.Object({
    webhook_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    webhook_token: t.String({ maxLength: 152133 }),
  }),
  get_original_webhook_messageQuery: t.Object({
    thread_id: t.Optional(t.String({ pattern: '^(0|[1-9][0-9]*)$' })),
  }),
  delete_original_webhook_messageParams: t.Object({
    webhook_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    webhook_token: t.String({ maxLength: 152133 }),
  }),
  delete_original_webhook_messageQuery: t.Object({
    thread_id: t.Optional(t.String({ pattern: '^(0|[1-9][0-9]*)$' })),
  }),
  update_original_webhook_messageParams: t.Object({
    webhook_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    webhook_token: t.String({ maxLength: 152133 }),
  }),
  update_original_webhook_messageQuery: t.Object({
    thread_id: t.Optional(t.String({ pattern: '^(0|[1-9][0-9]*)$' })),
    with_components: t.Optional(t.Boolean()),
  }),
  get_webhook_messageParams: t.Object({
    webhook_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    webhook_token: t.String({ maxLength: 152133 }),
    message_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  get_webhook_messageQuery: t.Object({
    thread_id: t.Optional(t.String({ pattern: '^(0|[1-9][0-9]*)$' })),
  }),
  delete_webhook_messageParams: t.Object({
    webhook_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    webhook_token: t.String({ maxLength: 152133 }),
    message_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  delete_webhook_messageQuery: t.Object({
    thread_id: t.Optional(t.String({ pattern: '^(0|[1-9][0-9]*)$' })),
  }),
  update_webhook_messageParams: t.Object({
    webhook_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    webhook_token: t.String({ maxLength: 152133 }),
    message_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
  }),
  update_webhook_messageQuery: t.Object({
    thread_id: t.Optional(t.String({ pattern: '^(0|[1-9][0-9]*)$' })),
    with_components: t.Optional(t.Boolean()),
  }),
  execute_slack_compatible_webhookParams: t.Object({
    webhook_id: t.String({ pattern: '^(0|[1-9][0-9]*)$' }),
    webhook_token: t.String({ maxLength: 152133 }),
  }),
  execute_slack_compatible_webhookQuery: t.Object({
    wait: t.Optional(t.Boolean()),
    thread_id: t.Optional(t.String({ pattern: '^(0|[1-9][0-9]*)$' })),
  }),
  execute_slack_compatible_webhookResponse200: t.Union([t.String(), t.Null()]),
} as const

export type WebhooksModel = {
  [k in keyof typeof WebhooksModel]: UnwrapSchema<(typeof WebhooksModel)[k]>
}
