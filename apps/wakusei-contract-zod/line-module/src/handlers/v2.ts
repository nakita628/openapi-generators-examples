import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const postV2BotChannelDetach = os.postV2BotChannelDetach.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postV2BotChatChatIdControlAcquire = os.postV2BotChatChatIdControlAcquire.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const postV2BotChatChatIdControlRelease = os.postV2BotChatChatIdControlRelease.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const getV2BotList = os.getV2BotList.handler(async ({ input }) => { throw new Error('Not implemented') })
