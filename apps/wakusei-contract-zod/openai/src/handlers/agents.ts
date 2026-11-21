import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const getAgentsAutomations = os.getAgentsAutomations.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postAgentsAutomations = os.postAgentsAutomations.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getAgentsAutomationsAutomationId = os.getAgentsAutomationsAutomationId.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const postAgentsAutomationsAutomationId = os.postAgentsAutomationsAutomationId.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const deleteAgentsAutomationsAutomationId = os.deleteAgentsAutomationsAutomationId.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const postAgentsAutomationsAutomationIdPause =
  os.postAgentsAutomationsAutomationIdPause.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postAgentsAutomationsAutomationIdResume =
  os.postAgentsAutomationsAutomationIdResume.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getAgentsAutomationsAutomationIdInvocations =
  os.getAgentsAutomationsAutomationIdInvocations.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postAgentsAutomationsAutomationIdInvocations =
  os.postAgentsAutomationsAutomationIdInvocations.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getAgentsAutomationsAutomationIdInvocationsInvocationId =
  os.getAgentsAutomationsAutomationIdInvocationsInvocationId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getAgentsEnvironments = os.getAgentsEnvironments.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postAgentsEnvironments = os.postAgentsEnvironments.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getAgentsEnvironmentsEnvironmentId = os.getAgentsEnvironmentsEnvironmentId.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const getAgentsEnvironmentsEnvironmentIdFiles =
  os.getAgentsEnvironmentsEnvironmentIdFiles.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postAgentsEnvironmentsEnvironmentIdFiles =
  os.postAgentsEnvironmentsEnvironmentIdFiles.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getAgentsSessionsSessionIdSubagents = os.getAgentsSessionsSessionIdSubagents.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const getAgentsSessionsSessionIdSubagentsSubagentId =
  os.getAgentsSessionsSessionIdSubagentsSubagentId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getAgentsSessionsSessionIdSubagentsSubagentIdItems =
  os.getAgentsSessionsSessionIdSubagentsSubagentIdItems.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getAgentsSessionsSessionIdSubagentsSubagentIdTurns =
  os.getAgentsSessionsSessionIdSubagentsSubagentIdTurns.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getAgentsSessionsSessionIdSubagentsSubagentIdTurnsTurnId =
  os.getAgentsSessionsSessionIdSubagentsSubagentIdTurnsTurnId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getAgentsSessionsSessionIdSubagentsSubagentIdTurnsTurnIdItems =
  os.getAgentsSessionsSessionIdSubagentsSubagentIdTurnsTurnIdItems.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getAgents = os.getAgents.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postAgents = os.postAgents.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getAgentsAgentId = os.getAgentsAgentId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postAgentsAgentId = os.postAgentsAgentId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const deleteAgentsAgentId = os.deleteAgentsAgentId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getAgentsEnvironmentsTemplates = os.getAgentsEnvironmentsTemplates.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const postAgentsEnvironmentsTemplates = os.postAgentsEnvironmentsTemplates.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const getAgentsEnvironmentsTemplatesEnvironmentTemplateId =
  os.getAgentsEnvironmentsTemplatesEnvironmentTemplateId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postAgentsEnvironmentsTemplatesEnvironmentTemplateId =
  os.postAgentsEnvironmentsTemplatesEnvironmentTemplateId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const deleteAgentsEnvironmentsTemplatesEnvironmentTemplateId =
  os.deleteAgentsEnvironmentsTemplatesEnvironmentTemplateId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getAgentsSessions = os.getAgentsSessions.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postAgentsSessions = os.postAgentsSessions.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getAgentsSessionsSessionId = os.getAgentsSessionsSessionId.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const postAgentsSessionsSessionId = os.postAgentsSessionsSessionId.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const deleteAgentsSessionsSessionId = os.deleteAgentsSessionsSessionId.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const getAgentsSessionsSessionIdArtifacts = os.getAgentsSessionsSessionIdArtifacts.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const getAgentsSessionsSessionIdArtifactsArtifactId =
  os.getAgentsSessionsSessionIdArtifactsArtifactId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const deleteAgentsSessionsSessionIdArtifactsArtifactId =
  os.deleteAgentsSessionsSessionIdArtifactsArtifactId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getAgentsSessionsSessionIdArtifactsArtifactIdContent =
  os.getAgentsSessionsSessionIdArtifactsArtifactIdContent.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getAgentsSessionsSessionIdEvents = os.getAgentsSessionsSessionIdEvents.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const postAgentsSessionsSessionIdEvents = os.postAgentsSessionsSessionIdEvents.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const getAgentsSessionsSessionIdItems = os.getAgentsSessionsSessionIdItems.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const getAgentsSessionsSessionIdTraces = os.getAgentsSessionsSessionIdTraces.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const getAgentsSessionsSessionIdTurns = os.getAgentsSessionsSessionIdTurns.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const getAgentsSessionsSessionIdTurnsTurnId =
  os.getAgentsSessionsSessionIdTurnsTurnId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getAgentsSessionsSessionIdTurnsTurnIdItems =
  os.getAgentsSessionsSessionIdTurnsTurnIdItems.handler(async ({ input }) => { throw new Error('Not implemented') })
