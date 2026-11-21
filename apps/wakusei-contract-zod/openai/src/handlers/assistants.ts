import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const getAssistants = os.getAssistants.handler(async ({ input }) => {})
export const postAssistants = os.postAssistants.handler(async ({ input }) => {})
export const getAssistantsAssistantId = os.getAssistantsAssistantId.handler(async ({ input }) => {})
export const postAssistantsAssistantId = os.postAssistantsAssistantId.handler(
  async ({ input }) => {},
)
export const deleteAssistantsAssistantId = os.deleteAssistantsAssistantId.handler(
  async ({ input }) => {},
)
