import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const getAssistants = os.getAssistants.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postAssistants = os.postAssistants.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getAssistantsAssistantId = os.getAssistantsAssistantId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postAssistantsAssistantId = os.postAssistantsAssistantId.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const deleteAssistantsAssistantId = os.deleteAssistantsAssistantId.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
