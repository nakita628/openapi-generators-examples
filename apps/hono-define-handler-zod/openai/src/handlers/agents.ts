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
    getAgentsAutomationsHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/agents/automations',
    postAgentsAutomationsHandler(async (c, { json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/agents/automations/:automation_id',
    getAgentsAutomationsAutomationIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/agents/automations/:automation_id',
    postAgentsAutomationsAutomationIdHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/agents/automations/:automation_id',
    deleteAgentsAutomationsAutomationIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/agents/automations/:automation_id/pause',
    postAgentsAutomationsAutomationIdPauseHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/agents/automations/:automation_id/resume',
    postAgentsAutomationsAutomationIdResumeHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/agents/automations/:automation_id/invocations',
    getAgentsAutomationsAutomationIdInvocationsHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/agents/automations/:automation_id/invocations',
    postAgentsAutomationsAutomationIdInvocationsHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/agents/automations/:automation_id/invocations/:invocation_id',
    getAgentsAutomationsAutomationIdInvocationsInvocationIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/agents/environments',
    getAgentsEnvironmentsHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/agents/environments',
    postAgentsEnvironmentsHandler(async (c, { header, json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/agents/environments/:environment_id',
    getAgentsEnvironmentsEnvironmentIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/agents/environments/:environment_id/files',
    getAgentsEnvironmentsEnvironmentIdFilesHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/agents/environments/:environment_id/files',
    postAgentsEnvironmentsEnvironmentIdFilesHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/agents/sessions/:session_id/subagents',
    getAgentsSessionsSessionIdSubagentsHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/agents/sessions/:session_id/subagents/:subagent_id',
    getAgentsSessionsSessionIdSubagentsSubagentIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/agents/sessions/:session_id/subagents/:subagent_id/items',
    getAgentsSessionsSessionIdSubagentsSubagentIdItemsHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/agents/sessions/:session_id/subagents/:subagent_id/turns',
    getAgentsSessionsSessionIdSubagentsSubagentIdTurnsHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/agents/sessions/:session_id/subagents/:subagent_id/turns/:turn_id',
    getAgentsSessionsSessionIdSubagentsSubagentIdTurnsTurnIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/agents/sessions/:session_id/subagents/:subagent_id/turns/:turn_id/items',
    getAgentsSessionsSessionIdSubagentsSubagentIdTurnsTurnIdItemsHandler(
      async (c, { param, query }) => { throw new Error('Not implemented') },
    ),
  )
  .get(
    '/agents',
    getAgentsHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/agents',
    postAgentsHandler(async (c, { json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/agents/:agent_id',
    getAgentsAgentIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/agents/:agent_id',
    postAgentsAgentIdHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/agents/:agent_id',
    deleteAgentsAgentIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/agents/environments/templates',
    getAgentsEnvironmentsTemplatesHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/agents/environments/templates',
    postAgentsEnvironmentsTemplatesHandler(async (c, { json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/agents/environments/templates/:environment_template_id',
    getAgentsEnvironmentsTemplatesEnvironmentTemplateIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/agents/environments/templates/:environment_template_id',
    postAgentsEnvironmentsTemplatesEnvironmentTemplateIdHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/agents/environments/templates/:environment_template_id',
    deleteAgentsEnvironmentsTemplatesEnvironmentTemplateIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/agents/sessions',
    getAgentsSessionsHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/agents/sessions',
    postAgentsSessionsHandler(async (c, { json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/agents/sessions/:session_id',
    getAgentsSessionsSessionIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/agents/sessions/:session_id',
    postAgentsSessionsSessionIdHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/agents/sessions/:session_id',
    deleteAgentsSessionsSessionIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/agents/sessions/:session_id/artifacts',
    getAgentsSessionsSessionIdArtifactsHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/agents/sessions/:session_id/artifacts/:artifact_id',
    getAgentsSessionsSessionIdArtifactsArtifactIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/agents/sessions/:session_id/artifacts/:artifact_id',
    deleteAgentsSessionsSessionIdArtifactsArtifactIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/agents/sessions/:session_id/artifacts/:artifact_id/content',
    getAgentsSessionsSessionIdArtifactsArtifactIdContentHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/agents/sessions/:session_id/events',
    getAgentsSessionsSessionIdEventsHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/agents/sessions/:session_id/events',
    postAgentsSessionsSessionIdEventsHandler(async (c, { param, header, json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/agents/sessions/:session_id/items',
    getAgentsSessionsSessionIdItemsHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/agents/sessions/:session_id/traces',
    getAgentsSessionsSessionIdTracesHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/agents/sessions/:session_id/turns',
    getAgentsSessionsSessionIdTurnsHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/agents/sessions/:session_id/turns/:turn_id',
    getAgentsSessionsSessionIdTurnsTurnIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/agents/sessions/:session_id/turns/:turn_id/items',
    getAgentsSessionsSessionIdTurnsTurnIdItemsHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
