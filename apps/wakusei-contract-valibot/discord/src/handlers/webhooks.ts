import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const getWebhooksWebhookId = os.getWebhooksWebhookId.handler(async ({ input }) => {})
export const deleteWebhooksWebhookId = os.deleteWebhooksWebhookId.handler(async ({ input }) => {})
export const patchWebhooksWebhookId = os.patchWebhooksWebhookId.handler(async ({ input }) => {})
export const getWebhooksWebhookIdWebhookToken = os.getWebhooksWebhookIdWebhookToken.handler(
  async ({ input }) => {},
)
export const postWebhooksWebhookIdWebhookToken = os.postWebhooksWebhookIdWebhookToken.handler(
  async ({ input }) => {},
)
export const deleteWebhooksWebhookIdWebhookToken = os.deleteWebhooksWebhookIdWebhookToken.handler(
  async ({ input }) => {},
)
export const patchWebhooksWebhookIdWebhookToken = os.patchWebhooksWebhookIdWebhookToken.handler(
  async ({ input }) => {},
)
export const postWebhooksWebhookIdWebhookTokenGithub =
  os.postWebhooksWebhookIdWebhookTokenGithub.handler(async ({ input }) => {})
export const getWebhooksWebhookIdWebhookTokenMessagesOriginal =
  os.getWebhooksWebhookIdWebhookTokenMessagesOriginal.handler(async ({ input }) => {})
export const deleteWebhooksWebhookIdWebhookTokenMessagesOriginal =
  os.deleteWebhooksWebhookIdWebhookTokenMessagesOriginal.handler(async ({ input }) => {})
export const patchWebhooksWebhookIdWebhookTokenMessagesOriginal =
  os.patchWebhooksWebhookIdWebhookTokenMessagesOriginal.handler(async ({ input }) => {})
export const getWebhooksWebhookIdWebhookTokenMessagesMessageId =
  os.getWebhooksWebhookIdWebhookTokenMessagesMessageId.handler(async ({ input }) => {})
export const deleteWebhooksWebhookIdWebhookTokenMessagesMessageId =
  os.deleteWebhooksWebhookIdWebhookTokenMessagesMessageId.handler(async ({ input }) => {})
export const patchWebhooksWebhookIdWebhookTokenMessagesMessageId =
  os.patchWebhooksWebhookIdWebhookTokenMessagesMessageId.handler(async ({ input }) => {})
export const postWebhooksWebhookIdWebhookTokenSlack =
  os.postWebhooksWebhookIdWebhookTokenSlack.handler(async ({ input }) => {})
