import { Elysia, t } from 'elysia'
import {
  AgentEnvironmentEventSchema,
  AgentSessionActionRequiredPayloadResourceSchema,
  AgentSessionConnectPayloadResourceSchema,
  AgentSessionCreatedPayloadResourceSchema,
  AgentSessionEnvironmentPayloadResourceSchema,
  AgentSessionRequiredActionPayloadResourceSchema,
  AgentSessionRequiredActionTypeResourceSchema,
  WebhookAgentEnvironmentExpiredSchema,
  WebhookAgentEnvironmentFailedSchema,
  WebhookAgentEnvironmentReadySchema,
  WebhookAgentEnvironmentSuspendedSchema,
  WebhookAgentSessionActionRequiredSchema,
  WebhookAgentSessionCreatedSchema,
  WebhookAgentSessionEnvelopeSchema,
  WebhookAgentSessionFailedSchema,
  WebhookAgentSessionIdleSchema,
  WebhookAgentSessionInProgressSchema,
  WebhookBatchCancelledSchema,
  WebhookBatchCompletedSchema,
  WebhookBatchExpiredSchema,
  WebhookBatchFailedSchema,
  WebhookEvalRunCanceledSchema,
  WebhookEvalRunFailedSchema,
  WebhookEvalRunSucceededSchema,
  WebhookFineTuningJobCancelledSchema,
  WebhookFineTuningJobFailedSchema,
  WebhookFineTuningJobSucceededSchema,
  WebhookLiveCallIncomingSchema,
  WebhookLiveTransportConnectedSchema,
  WebhookLiveTransportIncomingSchema,
  WebhookRealtimeCallIncomingSchema,
  WebhookResponseCancelledSchema,
  WebhookResponseCompletedSchema,
  WebhookResponseFailedSchema,
  WebhookResponseIncompleteSchema,
  WebhookSafetyAlertCreatedSchema,
  WebhookSafetyDeactivationIssuedSchema,
  WebhookSafetyOrgAlertCreatedSchema,
  WebhookSafetyWarningIssuedSchema,
} from '../../components/schemas'
import { WebhooksModel } from './model'

export const webhooks = new Elysia()
  .model({
    AgentEnvironmentEvent: AgentEnvironmentEventSchema,
    AgentSessionActionRequiredPayloadResource: AgentSessionActionRequiredPayloadResourceSchema,
    AgentSessionConnectPayloadResource: AgentSessionConnectPayloadResourceSchema,
    AgentSessionCreatedPayloadResource: AgentSessionCreatedPayloadResourceSchema,
    AgentSessionEnvironmentPayloadResource: AgentSessionEnvironmentPayloadResourceSchema,
    AgentSessionRequiredActionPayloadResource: AgentSessionRequiredActionPayloadResourceSchema,
    AgentSessionRequiredActionTypeResource: AgentSessionRequiredActionTypeResourceSchema,
    WebhookAgentEnvironmentExpired: WebhookAgentEnvironmentExpiredSchema,
    WebhookAgentEnvironmentFailed: WebhookAgentEnvironmentFailedSchema,
    WebhookAgentEnvironmentReady: WebhookAgentEnvironmentReadySchema,
    WebhookAgentEnvironmentSuspended: WebhookAgentEnvironmentSuspendedSchema,
    WebhookAgentSessionActionRequired: WebhookAgentSessionActionRequiredSchema,
    WebhookAgentSessionCreated: WebhookAgentSessionCreatedSchema,
    WebhookAgentSessionEnvelope: WebhookAgentSessionEnvelopeSchema,
    WebhookAgentSessionFailed: WebhookAgentSessionFailedSchema,
    WebhookAgentSessionIdle: WebhookAgentSessionIdleSchema,
    WebhookAgentSessionInProgress: WebhookAgentSessionInProgressSchema,
    WebhookBatchCancelled: WebhookBatchCancelledSchema,
    WebhookBatchCompleted: WebhookBatchCompletedSchema,
    WebhookBatchExpired: WebhookBatchExpiredSchema,
    WebhookBatchFailed: WebhookBatchFailedSchema,
    WebhookEvalRunCanceled: WebhookEvalRunCanceledSchema,
    WebhookEvalRunFailed: WebhookEvalRunFailedSchema,
    WebhookEvalRunSucceeded: WebhookEvalRunSucceededSchema,
    WebhookFineTuningJobCancelled: WebhookFineTuningJobCancelledSchema,
    WebhookFineTuningJobFailed: WebhookFineTuningJobFailedSchema,
    WebhookFineTuningJobSucceeded: WebhookFineTuningJobSucceededSchema,
    WebhookLiveCallIncoming: WebhookLiveCallIncomingSchema,
    WebhookLiveTransportConnected: WebhookLiveTransportConnectedSchema,
    WebhookLiveTransportIncoming: WebhookLiveTransportIncomingSchema,
    WebhookRealtimeCallIncoming: WebhookRealtimeCallIncomingSchema,
    WebhookResponseCancelled: WebhookResponseCancelledSchema,
    WebhookResponseCompleted: WebhookResponseCompletedSchema,
    WebhookResponseFailed: WebhookResponseFailedSchema,
    WebhookResponseIncomplete: WebhookResponseIncompleteSchema,
    WebhookSafetyAlertCreated: WebhookSafetyAlertCreatedSchema,
    WebhookSafetyDeactivationIssued: WebhookSafetyDeactivationIssuedSchema,
    WebhookSafetyOrgAlertCreated: WebhookSafetyOrgAlertCreatedSchema,
    WebhookSafetyWarningIssued: WebhookSafetyWarningIssuedSchema,
  })
  .post('/webhooks/agent_environment_expired', ({ body }) => {}, {
    body: 'WebhookAgentEnvironmentExpired',
    response: { 200: t.Void() },
    detail: {
      tags: [],
      description:
        'Sent when an agent environment expires and can no longer resume from a snapshot.\n',
      operationId: 'postWebhooksAgent_environment_expired',
    },
  })
  .post('/webhooks/agent_environment_failed', ({ body }) => {}, {
    body: 'WebhookAgentEnvironmentFailed',
    response: { 200: t.Void() },
    detail: {
      tags: [],
      description:
        'Sent when setup fails for a prewarmed OpenAI-hosted environment before it is attached to a session.\n',
      operationId: 'postWebhooksAgent_environment_failed',
    },
  })
  .post('/webhooks/agent_environment_ready', ({ body }) => {}, {
    body: 'WebhookAgentEnvironmentReady',
    response: { 200: t.Void() },
    detail: {
      tags: [],
      description:
        'Sent when a prewarmed OpenAI-hosted environment finishes setup before being attached to a session.\n',
      operationId: 'postWebhooksAgent_environment_ready',
    },
  })
  .post('/webhooks/agent_environment_suspended', ({ body }) => {}, {
    body: 'WebhookAgentEnvironmentSuspended',
    response: { 200: t.Void() },
    detail: {
      tags: [],
      description: 'Sent when an agent environment is suspended and can resume from a snapshot.\n',
      operationId: 'postWebhooksAgent_environment_suspended',
    },
  })
  .post('/webhooks/agent_session_action_required', ({ body }) => {}, {
    body: 'WebhookAgentSessionActionRequired',
    response: { 200: t.Void() },
    detail: {
      tags: [],
      description:
        'Sent when an agent session requires an action. Retrieve the session for action details.\n',
      operationId: 'postWebhooksAgent_session_action_required',
    },
  })
  .post('/webhooks/agent_session_created', ({ body }) => {}, {
    body: 'WebhookAgentSessionCreated',
    response: { 200: t.Void() },
    detail: {
      tags: [],
      description: 'Sent when an agent session is created.\n',
      operationId: 'postWebhooksAgent_session_created',
    },
  })
  .post('/webhooks/agent_session_failed', ({ body }) => {}, {
    body: 'WebhookAgentSessionFailed',
    response: { 200: t.Void() },
    detail: {
      tags: [],
      description: 'Sent when an agent session fails.\n',
      operationId: 'postWebhooksAgent_session_failed',
    },
  })
  .post('/webhooks/agent_session_idle', ({ body }) => {}, {
    body: 'WebhookAgentSessionIdle',
    response: { 200: t.Void() },
    detail: {
      tags: [],
      description: 'Sent when an agent session becomes idle.\n',
      operationId: 'postWebhooksAgent_session_idle',
    },
  })
  .post('/webhooks/agent_session_in_progress', ({ body }) => {}, {
    body: 'WebhookAgentSessionInProgress',
    response: { 200: t.Void() },
    detail: {
      tags: [],
      description: 'Sent when an agent session enters the in-progress state.\n',
      operationId: 'postWebhooksAgent_session_in_progress',
    },
  })
  .post('/webhooks/batch_cancelled', ({ body }) => {}, {
    body: 'WebhookBatchCancelled',
    response: { 200: t.Void() },
    detail: {
      tags: [],
      description: 'Sent when a batch has been cancelled.\n',
      operationId: 'postWebhooksBatch_cancelled',
    },
  })
  .post('/webhooks/batch_completed', ({ body }) => {}, {
    body: 'WebhookBatchCompleted',
    response: { 200: t.Void() },
    detail: {
      tags: [],
      description: 'Sent when a batch has completed processing.\n',
      operationId: 'postWebhooksBatch_completed',
    },
  })
  .post('/webhooks/batch_expired', ({ body }) => {}, {
    body: 'WebhookBatchExpired',
    response: { 200: t.Void() },
    detail: {
      tags: [],
      description: 'Sent when a batch has expired before completion.\n',
      operationId: 'postWebhooksBatch_expired',
    },
  })
  .post('/webhooks/batch_failed', ({ body }) => {}, {
    body: 'WebhookBatchFailed',
    response: { 200: t.Void() },
    detail: {
      tags: [],
      description: 'Sent when a batch has failed.\n',
      operationId: 'postWebhooksBatch_failed',
    },
  })
  .post('/webhooks/eval_run_canceled', ({ body }) => {}, {
    body: 'WebhookEvalRunCanceled',
    response: { 200: t.Void() },
    detail: {
      tags: [],
      description: 'Sent when an eval run has been canceled.\n',
      operationId: 'postWebhooksEval_run_canceled',
    },
  })
  .post('/webhooks/eval_run_failed', ({ body }) => {}, {
    body: 'WebhookEvalRunFailed',
    response: { 200: t.Void() },
    detail: {
      tags: [],
      description: 'Sent when an eval run has failed.\n',
      operationId: 'postWebhooksEval_run_failed',
    },
  })
  .post('/webhooks/eval_run_succeeded', ({ body }) => {}, {
    body: 'WebhookEvalRunSucceeded',
    response: { 200: t.Void() },
    detail: {
      tags: [],
      description: 'Sent when an eval run has succeeded.\n',
      operationId: 'postWebhooksEval_run_succeeded',
    },
  })
  .post('/webhooks/fine_tuning_job_cancelled', ({ body }) => {}, {
    body: 'WebhookFineTuningJobCancelled',
    response: { 200: t.Void() },
    detail: {
      tags: [],
      description: 'Sent when a fine-tuning job has been cancelled.\n',
      operationId: 'postWebhooksFine_tuning_job_cancelled',
    },
  })
  .post('/webhooks/fine_tuning_job_failed', ({ body }) => {}, {
    body: 'WebhookFineTuningJobFailed',
    response: { 200: t.Void() },
    detail: {
      tags: [],
      description: 'Sent when a fine-tuning job has failed.\n',
      operationId: 'postWebhooksFine_tuning_job_failed',
    },
  })
  .post('/webhooks/fine_tuning_job_succeeded', ({ body }) => {}, {
    body: 'WebhookFineTuningJobSucceeded',
    response: { 200: t.Void() },
    detail: {
      tags: [],
      description: 'Sent when a fine-tuning job has succeeded.\n',
      operationId: 'postWebhooksFine_tuning_job_succeeded',
    },
  })
  .post('/webhooks/live_call_incoming', ({ body }) => {}, {
    body: 'WebhookLiveCallIncoming',
    response: { 200: t.Void() },
    detail: {
      tags: [],
      description:
        'Deprecated: use `live.transport.incoming`. Retained only for existing subscriptions.\nSent when an incoming API SIP session is available for Live acceptance.\n',
      operationId: 'postWebhooksLive_call_incoming',
    },
  })
  .post('/webhooks/live_transport_connected', ({ body }) => {}, {
    body: 'WebhookLiveTransportConnected',
    response: { 200: t.Void(), 204: t.Void() },
    detail: {
      tags: [],
      description:
        'Sent when a direct Live WebRTC session is created or an Instant Connect session activates.',
      operationId: 'postWebhooksLive_transport_connected',
    },
  })
  .post('/webhooks/live_transport_incoming', ({ body }) => {}, {
    body: 'WebhookLiveTransportIncoming',
    response: { 200: t.Void() },
    detail: {
      tags: [],
      description: 'Sent when an incoming API SIP session is available for Live acceptance.\n',
      operationId: 'postWebhooksLive_transport_incoming',
    },
  })
  .post('/webhooks/realtime_call_incoming', ({ body }) => {}, {
    body: 'WebhookRealtimeCallIncoming',
    response: { 200: t.Void() },
    detail: {
      tags: [],
      description: 'Sent when an incoming API SIP session is available for Realtime acceptance.\n',
      operationId: 'postWebhooksRealtime_call_incoming',
    },
  })
  .post('/webhooks/response_cancelled', ({ body }) => {}, {
    body: 'WebhookResponseCancelled',
    response: { 200: t.Void() },
    detail: {
      tags: [],
      description: 'Sent when a background response has been cancelled.\n',
      operationId: 'postWebhooksResponse_cancelled',
    },
  })
  .post('/webhooks/response_completed', ({ body }) => {}, {
    body: 'WebhookResponseCompleted',
    response: { 200: t.Void() },
    detail: {
      tags: [],
      description: 'Sent when a background response has completed successfully.\n',
      operationId: 'postWebhooksResponse_completed',
    },
  })
  .post('/webhooks/response_failed', ({ body }) => {}, {
    body: 'WebhookResponseFailed',
    response: { 200: t.Void() },
    detail: {
      tags: [],
      description: 'Sent when a background response has failed.\n',
      operationId: 'postWebhooksResponse_failed',
    },
  })
  .post('/webhooks/response_incomplete', ({ body }) => {}, {
    body: 'WebhookResponseIncomplete',
    response: { 200: t.Void() },
    detail: {
      tags: [],
      description: 'Sent when a background response is incomplete.\n',
      operationId: 'postWebhooksResponse_incomplete',
    },
  })
  .post('/webhooks/safety_alert_created', ({ body }) => {}, {
    body: 'WebhookSafetyAlertCreated',
    response: { 200: t.Void() },
    detail: {
      tags: [],
      description:
        'Sent when an approved safety alert is available for an API project.\nRetrieve the alert with a project API key granted `api.safety.alerts.read`.\n',
      operationId: 'postWebhooksSafety_alert_created',
    },
  })
  .post('/webhooks/safety_deactivation_issued', ({ body }) => {}, {
    body: 'WebhookSafetyDeactivationIssued',
    response: { 200: t.Void() },
    detail: {
      tags: [],
      description:
        'Sent when a deactivation is issued for a safety identifier in your organization.\nRetrieve the case details with `GET /v1/safety/cases/{id}` using `data.id`.\n',
      operationId: 'postWebhooksSafety_deactivation_issued',
    },
  })
  .post('/webhooks/safety_org_alert_created', ({ body }) => {}, {
    body: 'WebhookSafetyOrgAlertCreated',
    response: { 200: t.Void() },
    detail: {
      tags: [],
      description:
        "Sent when an approved safety alert is available for an enterprise workspace.\nRetrieve the alert from `https://api.chatgpt.com/v1/safety/alerts/{id}` with\nan administrator API key for the workspace's backing organization granted\n`chatgpt.enterprise.safety_alerts.read`.\n",
      operationId: 'postWebhooksSafety_org_alert_created',
    },
  })
  .post('/webhooks/safety_warning_issued', ({ body }) => {}, {
    body: 'WebhookSafetyWarningIssued',
    response: { 200: t.Void() },
    detail: {
      tags: [],
      description:
        'Sent when a warning is issued for a safety identifier in your organization.\nRetrieve the case details with `GET /v1/safety/cases/{id}` using `data.id`.\n',
      operationId: 'postWebhooksSafety_warning_issued',
    },
  })
