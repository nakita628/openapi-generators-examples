import { Hono } from 'hono'
import {
  getAgentsAutomationsHandler,
  postAgentsAutomationsHandler,
  getAgentsAutomationsAutomationIdHandler,
  postAgentsAutomationsAutomationIdHandler,
  deleteAgentsAutomationsAutomationIdHandler,
  postAgentsAutomationsAutomationIdPauseHandler,
  postAgentsAutomationsAutomationIdResumeHandler,
  getAgentsAutomationsAutomationIdInvocationsHandler,
  postAgentsAutomationsAutomationIdInvocationsHandler,
  getAgentsAutomationsAutomationIdInvocationsInvocationIdHandler,
  getAgentsEnvironmentsHandler,
  postAgentsEnvironmentsHandler,
  getAgentsEnvironmentsEnvironmentIdHandler,
  getAgentsEnvironmentsEnvironmentIdFilesHandler,
  postAgentsEnvironmentsEnvironmentIdFilesHandler,
  getAgentsSessionsSessionIdSubagentsHandler,
  getAgentsSessionsSessionIdSubagentsSubagentIdHandler,
  getAgentsSessionsSessionIdSubagentsSubagentIdItemsHandler,
  getAgentsSessionsSessionIdSubagentsSubagentIdTurnsHandler,
  getAgentsSessionsSessionIdSubagentsSubagentIdTurnsTurnIdHandler,
  getAgentsSessionsSessionIdSubagentsSubagentIdTurnsTurnIdItemsHandler,
  getAgentsHandler,
  postAgentsHandler,
  getAgentsAgentIdHandler,
  postAgentsAgentIdHandler,
  deleteAgentsAgentIdHandler,
  getAgentsEnvironmentsTemplatesHandler,
  postAgentsEnvironmentsTemplatesHandler,
  getAgentsEnvironmentsTemplatesEnvironmentTemplateIdHandler,
  postAgentsEnvironmentsTemplatesEnvironmentTemplateIdHandler,
  deleteAgentsEnvironmentsTemplatesEnvironmentTemplateIdHandler,
  getAgentsSessionsHandler,
  postAgentsSessionsHandler,
  getAgentsSessionsSessionIdHandler,
  postAgentsSessionsSessionIdHandler,
  deleteAgentsSessionsSessionIdHandler,
  getAgentsSessionsSessionIdArtifactsHandler,
  getAgentsSessionsSessionIdArtifactsArtifactIdHandler,
  deleteAgentsSessionsSessionIdArtifactsArtifactIdHandler,
  getAgentsSessionsSessionIdArtifactsArtifactIdContentHandler,
  getAgentsSessionsSessionIdEventsHandler,
  postAgentsSessionsSessionIdEventsHandler,
  getAgentsSessionsSessionIdItemsHandler,
  getAgentsSessionsSessionIdTracesHandler,
  getAgentsSessionsSessionIdTurnsHandler,
  getAgentsSessionsSessionIdTurnsTurnIdHandler,
  getAgentsSessionsSessionIdTurnsTurnIdItemsHandler,
} from '../routes'

export const agentsHandler = new Hono()
  .get(
    '/agents/automations',
    getAgentsAutomationsHandler(async (c, { query }) => {}),
  )
  .post(
    '/agents/automations',
    postAgentsAutomationsHandler(async (c, { json }) => {}),
  )
  .get(
    '/agents/automations/:automation_id',
    getAgentsAutomationsAutomationIdHandler(async (c, { param }) => {}),
  )
  .post(
    '/agents/automations/:automation_id',
    postAgentsAutomationsAutomationIdHandler(async (c, { param, json }) => {}),
  )
  .delete(
    '/agents/automations/:automation_id',
    deleteAgentsAutomationsAutomationIdHandler(async (c, { param }) => {}),
  )
  .post(
    '/agents/automations/:automation_id/pause',
    postAgentsAutomationsAutomationIdPauseHandler(async (c, { param }) => {}),
  )
  .post(
    '/agents/automations/:automation_id/resume',
    postAgentsAutomationsAutomationIdResumeHandler(async (c, { param }) => {}),
  )
  .get(
    '/agents/automations/:automation_id/invocations',
    getAgentsAutomationsAutomationIdInvocationsHandler(async (c, { param, query }) => {}),
  )
  .post(
    '/agents/automations/:automation_id/invocations',
    postAgentsAutomationsAutomationIdInvocationsHandler(async (c, { param }) => {}),
  )
  .get(
    '/agents/automations/:automation_id/invocations/:invocation_id',
    getAgentsAutomationsAutomationIdInvocationsInvocationIdHandler(async (c, { param }) => {}),
  )
  .get(
    '/agents/environments',
    getAgentsEnvironmentsHandler(async (c, { query }) => {}),
  )
  .post(
    '/agents/environments',
    postAgentsEnvironmentsHandler(async (c, { header, json }) => {}),
  )
  .get(
    '/agents/environments/:environment_id',
    getAgentsEnvironmentsEnvironmentIdHandler(async (c, { param }) => {}),
  )
  .get(
    '/agents/environments/:environment_id/files',
    getAgentsEnvironmentsEnvironmentIdFilesHandler(async (c, { param, query }) => {}),
  )
  .post(
    '/agents/environments/:environment_id/files',
    postAgentsEnvironmentsEnvironmentIdFilesHandler(async (c, { param, json }) => {}),
  )
  .get(
    '/agents/sessions/:session_id/subagents',
    getAgentsSessionsSessionIdSubagentsHandler(async (c, { param, query }) => {}),
  )
  .get(
    '/agents/sessions/:session_id/subagents/:subagent_id',
    getAgentsSessionsSessionIdSubagentsSubagentIdHandler(async (c, { param }) => {}),
  )
  .get(
    '/agents/sessions/:session_id/subagents/:subagent_id/items',
    getAgentsSessionsSessionIdSubagentsSubagentIdItemsHandler(async (c, { param, query }) => {}),
  )
  .get(
    '/agents/sessions/:session_id/subagents/:subagent_id/turns',
    getAgentsSessionsSessionIdSubagentsSubagentIdTurnsHandler(async (c, { param, query }) => {}),
  )
  .get(
    '/agents/sessions/:session_id/subagents/:subagent_id/turns/:turn_id',
    getAgentsSessionsSessionIdSubagentsSubagentIdTurnsTurnIdHandler(async (c, { param }) => {}),
  )
  .get(
    '/agents/sessions/:session_id/subagents/:subagent_id/turns/:turn_id/items',
    getAgentsSessionsSessionIdSubagentsSubagentIdTurnsTurnIdItemsHandler(
      async (c, { param, query }) => {},
    ),
  )
  .get(
    '/agents',
    getAgentsHandler(async (c, { query }) => {}),
  )
  .post(
    '/agents',
    postAgentsHandler(async (c, { json }) => {}),
  )
  .get(
    '/agents/:agent_id',
    getAgentsAgentIdHandler(async (c, { param }) => {}),
  )
  .post(
    '/agents/:agent_id',
    postAgentsAgentIdHandler(async (c, { param, json }) => {}),
  )
  .delete(
    '/agents/:agent_id',
    deleteAgentsAgentIdHandler(async (c, { param }) => {}),
  )
  .get(
    '/agents/environments/templates',
    getAgentsEnvironmentsTemplatesHandler(async (c, { query }) => {}),
  )
  .post(
    '/agents/environments/templates',
    postAgentsEnvironmentsTemplatesHandler(async (c, { json }) => {}),
  )
  .get(
    '/agents/environments/templates/:environment_template_id',
    getAgentsEnvironmentsTemplatesEnvironmentTemplateIdHandler(async (c, { param }) => {}),
  )
  .post(
    '/agents/environments/templates/:environment_template_id',
    postAgentsEnvironmentsTemplatesEnvironmentTemplateIdHandler(async (c, { param, json }) => {}),
  )
  .delete(
    '/agents/environments/templates/:environment_template_id',
    deleteAgentsEnvironmentsTemplatesEnvironmentTemplateIdHandler(async (c, { param }) => {}),
  )
  .get(
    '/agents/sessions',
    getAgentsSessionsHandler(async (c, { query }) => {}),
  )
  .post(
    '/agents/sessions',
    postAgentsSessionsHandler(async (c, { json }) => {}),
  )
  .get(
    '/agents/sessions/:session_id',
    getAgentsSessionsSessionIdHandler(async (c, { param }) => {}),
  )
  .post(
    '/agents/sessions/:session_id',
    postAgentsSessionsSessionIdHandler(async (c, { param, json }) => {}),
  )
  .delete(
    '/agents/sessions/:session_id',
    deleteAgentsSessionsSessionIdHandler(async (c, { param }) => {}),
  )
  .get(
    '/agents/sessions/:session_id/artifacts',
    getAgentsSessionsSessionIdArtifactsHandler(async (c, { param, query }) => {}),
  )
  .get(
    '/agents/sessions/:session_id/artifacts/:artifact_id',
    getAgentsSessionsSessionIdArtifactsArtifactIdHandler(async (c, { param }) => {}),
  )
  .delete(
    '/agents/sessions/:session_id/artifacts/:artifact_id',
    deleteAgentsSessionsSessionIdArtifactsArtifactIdHandler(async (c, { param }) => {}),
  )
  .get(
    '/agents/sessions/:session_id/artifacts/:artifact_id/content',
    getAgentsSessionsSessionIdArtifactsArtifactIdContentHandler(async (c, { param }) => {}),
  )
  .get(
    '/agents/sessions/:session_id/events',
    getAgentsSessionsSessionIdEventsHandler(async (c, { param, query }) => {}),
  )
  .post(
    '/agents/sessions/:session_id/events',
    postAgentsSessionsSessionIdEventsHandler(async (c, { param, header, json }) => {}),
  )
  .get(
    '/agents/sessions/:session_id/items',
    getAgentsSessionsSessionIdItemsHandler(async (c, { param, query }) => {}),
  )
  .get(
    '/agents/sessions/:session_id/traces',
    getAgentsSessionsSessionIdTracesHandler(async (c, { param, query }) => {}),
  )
  .get(
    '/agents/sessions/:session_id/turns',
    getAgentsSessionsSessionIdTurnsHandler(async (c, { param, query }) => {}),
  )
  .get(
    '/agents/sessions/:session_id/turns/:turn_id',
    getAgentsSessionsSessionIdTurnsTurnIdHandler(async (c, { param }) => {}),
  )
  .get(
    '/agents/sessions/:session_id/turns/:turn_id/items',
    getAgentsSessionsSessionIdTurnsTurnIdItemsHandler(async (c, { param, query }) => {}),
  )
