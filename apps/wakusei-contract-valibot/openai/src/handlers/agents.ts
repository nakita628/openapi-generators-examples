import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const getAgentsAutomations = os.getAgentsAutomations.handler(async ({ input }) => {})
export const postAgentsAutomations = os.postAgentsAutomations.handler(async ({ input }) => {})
export const getAgentsAutomationsAutomationId = os.getAgentsAutomationsAutomationId.handler(
  async ({ input }) => {},
)
export const postAgentsAutomationsAutomationId = os.postAgentsAutomationsAutomationId.handler(
  async ({ input }) => {},
)
export const deleteAgentsAutomationsAutomationId = os.deleteAgentsAutomationsAutomationId.handler(
  async ({ input }) => {},
)
export const postAgentsAutomationsAutomationIdPause =
  os.postAgentsAutomationsAutomationIdPause.handler(async ({ input }) => {})
export const postAgentsAutomationsAutomationIdResume =
  os.postAgentsAutomationsAutomationIdResume.handler(async ({ input }) => {})
export const getAgentsAutomationsAutomationIdInvocations =
  os.getAgentsAutomationsAutomationIdInvocations.handler(async ({ input }) => {})
export const postAgentsAutomationsAutomationIdInvocations =
  os.postAgentsAutomationsAutomationIdInvocations.handler(async ({ input }) => {})
export const getAgentsAutomationsAutomationIdInvocationsInvocationId =
  os.getAgentsAutomationsAutomationIdInvocationsInvocationId.handler(async ({ input }) => {})
export const getAgentsEnvironments = os.getAgentsEnvironments.handler(async ({ input }) => {})
export const postAgentsEnvironments = os.postAgentsEnvironments.handler(async ({ input }) => {})
export const getAgentsEnvironmentsEnvironmentId = os.getAgentsEnvironmentsEnvironmentId.handler(
  async ({ input }) => {},
)
export const getAgentsEnvironmentsEnvironmentIdFiles =
  os.getAgentsEnvironmentsEnvironmentIdFiles.handler(async ({ input }) => {})
export const postAgentsEnvironmentsEnvironmentIdFiles =
  os.postAgentsEnvironmentsEnvironmentIdFiles.handler(async ({ input }) => {})
export const getAgentsSessionsSessionIdSubagents = os.getAgentsSessionsSessionIdSubagents.handler(
  async ({ input }) => {},
)
export const getAgentsSessionsSessionIdSubagentsSubagentId =
  os.getAgentsSessionsSessionIdSubagentsSubagentId.handler(async ({ input }) => {})
export const getAgentsSessionsSessionIdSubagentsSubagentIdItems =
  os.getAgentsSessionsSessionIdSubagentsSubagentIdItems.handler(async ({ input }) => {})
export const getAgentsSessionsSessionIdSubagentsSubagentIdTurns =
  os.getAgentsSessionsSessionIdSubagentsSubagentIdTurns.handler(async ({ input }) => {})
export const getAgentsSessionsSessionIdSubagentsSubagentIdTurnsTurnId =
  os.getAgentsSessionsSessionIdSubagentsSubagentIdTurnsTurnId.handler(async ({ input }) => {})
export const getAgentsSessionsSessionIdSubagentsSubagentIdTurnsTurnIdItems =
  os.getAgentsSessionsSessionIdSubagentsSubagentIdTurnsTurnIdItems.handler(async ({ input }) => {})
export const getAgents = os.getAgents.handler(async ({ input }) => {})
export const postAgents = os.postAgents.handler(async ({ input }) => {})
export const getAgentsAgentId = os.getAgentsAgentId.handler(async ({ input }) => {})
export const postAgentsAgentId = os.postAgentsAgentId.handler(async ({ input }) => {})
export const deleteAgentsAgentId = os.deleteAgentsAgentId.handler(async ({ input }) => {})
export const getAgentsEnvironmentsTemplates = os.getAgentsEnvironmentsTemplates.handler(
  async ({ input }) => {},
)
export const postAgentsEnvironmentsTemplates = os.postAgentsEnvironmentsTemplates.handler(
  async ({ input }) => {},
)
export const getAgentsEnvironmentsTemplatesEnvironmentTemplateId =
  os.getAgentsEnvironmentsTemplatesEnvironmentTemplateId.handler(async ({ input }) => {})
export const postAgentsEnvironmentsTemplatesEnvironmentTemplateId =
  os.postAgentsEnvironmentsTemplatesEnvironmentTemplateId.handler(async ({ input }) => {})
export const deleteAgentsEnvironmentsTemplatesEnvironmentTemplateId =
  os.deleteAgentsEnvironmentsTemplatesEnvironmentTemplateId.handler(async ({ input }) => {})
export const getAgentsSessions = os.getAgentsSessions.handler(async ({ input }) => {})
export const postAgentsSessions = os.postAgentsSessions.handler(async ({ input }) => {})
export const getAgentsSessionsSessionId = os.getAgentsSessionsSessionId.handler(
  async ({ input }) => {},
)
export const postAgentsSessionsSessionId = os.postAgentsSessionsSessionId.handler(
  async ({ input }) => {},
)
export const deleteAgentsSessionsSessionId = os.deleteAgentsSessionsSessionId.handler(
  async ({ input }) => {},
)
export const getAgentsSessionsSessionIdArtifacts = os.getAgentsSessionsSessionIdArtifacts.handler(
  async ({ input }) => {},
)
export const getAgentsSessionsSessionIdArtifactsArtifactId =
  os.getAgentsSessionsSessionIdArtifactsArtifactId.handler(async ({ input }) => {})
export const deleteAgentsSessionsSessionIdArtifactsArtifactId =
  os.deleteAgentsSessionsSessionIdArtifactsArtifactId.handler(async ({ input }) => {})
export const getAgentsSessionsSessionIdArtifactsArtifactIdContent =
  os.getAgentsSessionsSessionIdArtifactsArtifactIdContent.handler(async ({ input }) => {})
export const getAgentsSessionsSessionIdEvents = os.getAgentsSessionsSessionIdEvents.handler(
  async ({ input }) => {},
)
export const postAgentsSessionsSessionIdEvents = os.postAgentsSessionsSessionIdEvents.handler(
  async ({ input }) => {},
)
export const getAgentsSessionsSessionIdItems = os.getAgentsSessionsSessionIdItems.handler(
  async ({ input }) => {},
)
export const getAgentsSessionsSessionIdTraces = os.getAgentsSessionsSessionIdTraces.handler(
  async ({ input }) => {},
)
export const getAgentsSessionsSessionIdTurns = os.getAgentsSessionsSessionIdTurns.handler(
  async ({ input }) => {},
)
export const getAgentsSessionsSessionIdTurnsTurnId =
  os.getAgentsSessionsSessionIdTurnsTurnId.handler(async ({ input }) => {})
export const getAgentsSessionsSessionIdTurnsTurnIdItems =
  os.getAgentsSessionsSessionIdTurnsTurnIdItems.handler(async ({ input }) => {})
