import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const getChatCompletions = os.getChatCompletions.handler(async ({ input }) => {})
export const postChatCompletions = os.postChatCompletions.handler(async ({ input }) => {})
export const getChatCompletionsCompletionId = os.getChatCompletionsCompletionId.handler(
  async ({ input }) => {},
)
export const postChatCompletionsCompletionId = os.postChatCompletionsCompletionId.handler(
  async ({ input }) => {},
)
export const deleteChatCompletionsCompletionId = os.deleteChatCompletionsCompletionId.handler(
  async ({ input }) => {},
)
export const getChatCompletionsCompletionIdMessages =
  os.getChatCompletionsCompletionIdMessages.handler(async ({ input }) => {})
