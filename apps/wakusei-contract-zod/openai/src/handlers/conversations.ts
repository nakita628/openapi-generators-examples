import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const getConversationsConversationIdItems = os.getConversationsConversationIdItems.handler(
  async ({ input }) => {},
)
export const postConversationsConversationIdItems = os.postConversationsConversationIdItems.handler(
  async ({ input }) => {},
)
export const getConversationsConversationIdItemsItemId =
  os.getConversationsConversationIdItemsItemId.handler(async ({ input }) => {})
export const deleteConversationsConversationIdItemsItemId =
  os.deleteConversationsConversationIdItemsItemId.handler(async ({ input }) => {})
export const postConversations = os.postConversations.handler(async ({ input }) => {})
export const getConversationsConversationId = os.getConversationsConversationId.handler(
  async ({ input }) => {},
)
export const postConversationsConversationId = os.postConversationsConversationId.handler(
  async ({ input }) => {},
)
export const deleteConversationsConversationId = os.deleteConversationsConversationId.handler(
  async ({ input }) => {},
)
