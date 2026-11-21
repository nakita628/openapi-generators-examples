import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const getWebhooksWebhookId = os.getWebhooksWebhookId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const deleteWebhooksWebhookId = os.deleteWebhooksWebhookId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const patchWebhooksWebhookId = os.patchWebhooksWebhookId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getWebhooksWebhookIdWebhookToken = os.getWebhooksWebhookIdWebhookToken.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const postWebhooksWebhookIdWebhookToken = os.postWebhooksWebhookIdWebhookToken.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const deleteWebhooksWebhookIdWebhookToken = os.deleteWebhooksWebhookIdWebhookToken.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const patchWebhooksWebhookIdWebhookToken = os.patchWebhooksWebhookIdWebhookToken.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const postWebhooksWebhookIdWebhookTokenGithub =
  os.postWebhooksWebhookIdWebhookTokenGithub.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getWebhooksWebhookIdWebhookTokenMessagesOriginal =
  os.getWebhooksWebhookIdWebhookTokenMessagesOriginal.handler(async ({ input }) => { throw new Error('Not implemented') })
export const deleteWebhooksWebhookIdWebhookTokenMessagesOriginal =
  os.deleteWebhooksWebhookIdWebhookTokenMessagesOriginal.handler(async ({ input }) => { throw new Error('Not implemented') })
export const patchWebhooksWebhookIdWebhookTokenMessagesOriginal =
  os.patchWebhooksWebhookIdWebhookTokenMessagesOriginal.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getWebhooksWebhookIdWebhookTokenMessagesMessageId =
  os.getWebhooksWebhookIdWebhookTokenMessagesMessageId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const deleteWebhooksWebhookIdWebhookTokenMessagesMessageId =
  os.deleteWebhooksWebhookIdWebhookTokenMessagesMessageId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const patchWebhooksWebhookIdWebhookTokenMessagesMessageId =
  os.patchWebhooksWebhookIdWebhookTokenMessagesMessageId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postWebhooksWebhookIdWebhookTokenSlack =
  os.postWebhooksWebhookIdWebhookTokenSlack.handler(async ({ input }) => { throw new Error('Not implemented') })
