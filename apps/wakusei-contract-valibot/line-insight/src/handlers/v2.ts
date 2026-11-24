import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const getV2BotInsightDemographic = os.getV2BotInsightDemographic.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const getV2BotInsightMessageDelivery = os.getV2BotInsightMessageDelivery.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const getV2BotInsightFollowers = os.getV2BotInsightFollowers.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getV2BotInsightMessageEvent = os.getV2BotInsightMessageEvent.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const getV2BotInsightMessageEventAggregation =
  os.getV2BotInsightMessageEventAggregation.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getV2BotInsightRichmenuRichMenuIdSummary =
  os.getV2BotInsightRichmenuRichMenuIdSummary.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getV2BotInsightRichmenuRichMenuIdDaily =
  os.getV2BotInsightRichmenuRichMenuIdDaily.handler(async ({ input }) => { throw new Error('Not implemented') })
