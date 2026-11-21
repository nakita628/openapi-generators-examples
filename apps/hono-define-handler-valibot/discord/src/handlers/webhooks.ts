import { Hono } from 'hono'
import {
  getWebhooksWebhookIdHandler,
  deleteWebhooksWebhookIdHandler,
  patchWebhooksWebhookIdHandler,
  getWebhooksWebhookIdWebhookTokenHandler,
  postWebhooksWebhookIdWebhookTokenHandler,
  deleteWebhooksWebhookIdWebhookTokenHandler,
  patchWebhooksWebhookIdWebhookTokenHandler,
  postWebhooksWebhookIdWebhookTokenGithubHandler,
  getWebhooksWebhookIdWebhookTokenMessagesOriginalHandler,
  deleteWebhooksWebhookIdWebhookTokenMessagesOriginalHandler,
  patchWebhooksWebhookIdWebhookTokenMessagesOriginalHandler,
  getWebhooksWebhookIdWebhookTokenMessagesMessageIdHandler,
  deleteWebhooksWebhookIdWebhookTokenMessagesMessageIdHandler,
  patchWebhooksWebhookIdWebhookTokenMessagesMessageIdHandler,
  postWebhooksWebhookIdWebhookTokenSlackHandler,
} from '../routes'

export const webhooksHandler = new Hono()
  .get(
    '/webhooks/:webhook_id',
    getWebhooksWebhookIdHandler(async (c, { param }) => {}),
  )
  .delete(
    '/webhooks/:webhook_id',
    deleteWebhooksWebhookIdHandler(async (c, { param }) => {}),
  )
  .patch(
    '/webhooks/:webhook_id',
    patchWebhooksWebhookIdHandler(async (c, { param, json }) => {}),
  )
  .get(
    '/webhooks/:webhook_id/:webhook_token',
    getWebhooksWebhookIdWebhookTokenHandler(async (c, { param }) => {}),
  )
  .post(
    '/webhooks/:webhook_id/:webhook_token',
    postWebhooksWebhookIdWebhookTokenHandler(async (c, { param, query, form, json }) => {}),
  )
  .delete(
    '/webhooks/:webhook_id/:webhook_token',
    deleteWebhooksWebhookIdWebhookTokenHandler(async (c, { param }) => {}),
  )
  .patch(
    '/webhooks/:webhook_id/:webhook_token',
    patchWebhooksWebhookIdWebhookTokenHandler(async (c, { param, json }) => {}),
  )
  .post(
    '/webhooks/:webhook_id/:webhook_token/github',
    postWebhooksWebhookIdWebhookTokenGithubHandler(async (c, { param, query, json }) => {}),
  )
  .get(
    '/webhooks/:webhook_id/:webhook_token/messages/@original',
    getWebhooksWebhookIdWebhookTokenMessagesOriginalHandler(async (c, { param, query }) => {}),
  )
  .delete(
    '/webhooks/:webhook_id/:webhook_token/messages/@original',
    deleteWebhooksWebhookIdWebhookTokenMessagesOriginalHandler(async (c, { param, query }) => {}),
  )
  .patch(
    '/webhooks/:webhook_id/:webhook_token/messages/@original',
    patchWebhooksWebhookIdWebhookTokenMessagesOriginalHandler(
      async (c, { param, query, form, json }) => {},
    ),
  )
  .get(
    '/webhooks/:webhook_id/:webhook_token/messages/:message_id',
    getWebhooksWebhookIdWebhookTokenMessagesMessageIdHandler(async (c, { param, query }) => {}),
  )
  .delete(
    '/webhooks/:webhook_id/:webhook_token/messages/:message_id',
    deleteWebhooksWebhookIdWebhookTokenMessagesMessageIdHandler(async (c, { param, query }) => {}),
  )
  .patch(
    '/webhooks/:webhook_id/:webhook_token/messages/:message_id',
    patchWebhooksWebhookIdWebhookTokenMessagesMessageIdHandler(
      async (c, { param, query, form, json }) => {},
    ),
  )
  .post(
    '/webhooks/:webhook_id/:webhook_token/slack',
    postWebhooksWebhookIdWebhookTokenSlackHandler(async (c, { param, query, form, json }) => {}),
  )
