import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const postResponses = os.postResponses.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getResponsesResponseId = os.getResponsesResponseId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const deleteResponsesResponseId = os.deleteResponsesResponseId.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const postResponsesResponseIdCancel = os.postResponsesResponseIdCancel.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const getResponsesResponseIdInputItems = os.getResponsesResponseIdInputItems.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const postResponsesInputTokens = os.postResponsesInputTokens.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postResponsesCompact = os.postResponsesCompact.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getResponsesResponseIdBetaTrue = os.getResponsesResponseIdBetaTrue.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const deleteResponsesResponseIdBetaTrue = os.deleteResponsesResponseIdBetaTrue.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const postResponsesResponseIdCancelBetaTrue =
  os.postResponsesResponseIdCancelBetaTrue.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postResponsesCompactBetaTrue = os.postResponsesCompactBetaTrue.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const getResponsesResponseIdInputItemsBetaTrue =
  os.getResponsesResponseIdInputItemsBetaTrue.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postResponsesInputTokensBetaTrue = os.postResponsesInputTokensBetaTrue.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
