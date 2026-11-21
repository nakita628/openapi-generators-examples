import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const postResponses = os.postResponses.handler(async ({ input }) => {})
export const getResponsesResponseId = os.getResponsesResponseId.handler(async ({ input }) => {})
export const deleteResponsesResponseId = os.deleteResponsesResponseId.handler(
  async ({ input }) => {},
)
export const postResponsesResponseIdCancel = os.postResponsesResponseIdCancel.handler(
  async ({ input }) => {},
)
export const getResponsesResponseIdInputItems = os.getResponsesResponseIdInputItems.handler(
  async ({ input }) => {},
)
export const postResponsesInputTokens = os.postResponsesInputTokens.handler(async ({ input }) => {})
export const postResponsesCompact = os.postResponsesCompact.handler(async ({ input }) => {})
export const getResponsesResponseIdBetaTrue = os.getResponsesResponseIdBetaTrue.handler(
  async ({ input }) => {},
)
export const deleteResponsesResponseIdBetaTrue = os.deleteResponsesResponseIdBetaTrue.handler(
  async ({ input }) => {},
)
export const postResponsesResponseIdCancelBetaTrue =
  os.postResponsesResponseIdCancelBetaTrue.handler(async ({ input }) => {})
export const postResponsesCompactBetaTrue = os.postResponsesCompactBetaTrue.handler(
  async ({ input }) => {},
)
export const getResponsesResponseIdInputItemsBetaTrue =
  os.getResponsesResponseIdInputItemsBetaTrue.handler(async ({ input }) => {})
export const postResponsesInputTokensBetaTrue = os.postResponsesInputTokensBetaTrue.handler(
  async ({ input }) => {},
)
