import { t, type UnwrapSchema } from 'elysia'

export const WebhookEndpointsModel = {
  ListWebhookEndpointsQuery: t.Object({
    limit: t.Optional(t.Integer({ minimum: 1, maximum: 100 })),
    after: t.Optional(t.Union([t.String({ example: 'whe_123' }), t.Null()])),
  }),
  RetrieveWebhookEndpointParams: t.Object({
    webhook_endpoint_id: t.String({ example: 'whe_123' }),
  }),
  UpdateWebhookEndpointParams: t.Object({ webhook_endpoint_id: t.String({ example: 'whe_123' }) }),
  DeleteWebhookEndpointParams: t.Object({ webhook_endpoint_id: t.String({ example: 'whe_123' }) }),
  RotateWebhookEndpointSigningSecretParams: t.Object({
    webhook_endpoint_id: t.String({ example: 'whe_123' }),
  }),
  TestWebhookEndpointParams: t.Object({ webhook_endpoint_id: t.String({ example: 'whe_123' }) }),
} as const

export type WebhookEndpointsModel = {
  [k in keyof typeof WebhookEndpointsModel]: UnwrapSchema<(typeof WebhookEndpointsModel)[k]>
}
