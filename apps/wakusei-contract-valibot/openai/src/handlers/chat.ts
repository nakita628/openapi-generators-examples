import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const getChatCompletions = os.getChatCompletions.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postChatCompletions = os.postChatCompletions.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getChatCompletionsCompletionId = os.getChatCompletionsCompletionId.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const postChatCompletionsCompletionId = os.postChatCompletionsCompletionId.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const deleteChatCompletionsCompletionId = os.deleteChatCompletionsCompletionId.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const getChatCompletionsCompletionIdMessages =
  os.getChatCompletionsCompletionIdMessages.handler(async ({ input }) => { throw new Error('Not implemented') })
