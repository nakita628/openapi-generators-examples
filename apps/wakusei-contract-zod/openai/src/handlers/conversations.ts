import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const getConversationsConversationIdItems = os.getConversationsConversationIdItems.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const postConversationsConversationIdItems = os.postConversationsConversationIdItems.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const getConversationsConversationIdItemsItemId =
  os.getConversationsConversationIdItemsItemId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const deleteConversationsConversationIdItemsItemId =
  os.deleteConversationsConversationIdItemsItemId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postConversations = os.postConversations.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getConversationsConversationId = os.getConversationsConversationId.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const postConversationsConversationId = os.postConversationsConversationId.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const deleteConversationsConversationId = os.deleteConversationsConversationId.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
