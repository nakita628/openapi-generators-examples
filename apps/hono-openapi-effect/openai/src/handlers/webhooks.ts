import { Hono } from 'hono'
import { describeRoute, validator } from 'hono-openapi'
import { Schema } from 'effect'
import {
  WebhookAgentEnvironmentExpiredSchema,
  WebhookAgentEnvironmentFailedSchema,
  WebhookAgentEnvironmentReadySchema,
  WebhookAgentEnvironmentSuspendedSchema,
  WebhookAgentSessionActionRequiredSchema,
  WebhookAgentSessionCreatedSchema,
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
} from '../components'

export const webhooksHandler = new Hono()
  .post(
    '/agent_environment_expired',
    describeRoute({
      description:
        'Sent when an agent environment expires and can no longer resume from a snapshot.\n',
      responses: {
        '200': {
          description:
            'Return a 200 status code to acknowledge receipt of the event. Non-200\nstatus codes will be retried.\n',
        },
      },
    }),
    validator('json', Schema.toStandardSchemaV1(WebhookAgentEnvironmentExpiredSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/agent_environment_failed',
    describeRoute({
      description:
        'Sent when setup fails for a prewarmed OpenAI-hosted environment before it is attached to a session.\n',
      responses: {
        '200': {
          description:
            'Return a 200 status code to acknowledge receipt of the event. Non-200\nstatus codes will be retried.\n',
        },
      },
    }),
    validator('json', Schema.toStandardSchemaV1(WebhookAgentEnvironmentFailedSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/agent_environment_ready',
    describeRoute({
      description:
        'Sent when a prewarmed OpenAI-hosted environment finishes setup before being attached to a session.\n',
      responses: {
        '200': {
          description:
            'Return a 200 status code to acknowledge receipt of the event. Non-200\nstatus codes will be retried.\n',
        },
      },
    }),
    validator('json', Schema.toStandardSchemaV1(WebhookAgentEnvironmentReadySchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/agent_environment_suspended',
    describeRoute({
      description: 'Sent when an agent environment is suspended and can resume from a snapshot.\n',
      responses: {
        '200': {
          description:
            'Return a 200 status code to acknowledge receipt of the event. Non-200\nstatus codes will be retried.\n',
        },
      },
    }),
    validator('json', Schema.toStandardSchemaV1(WebhookAgentEnvironmentSuspendedSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/agent_session_action_required',
    describeRoute({
      description:
        'Sent when an agent session requires an action. Retrieve the session for action details.\n',
      responses: {
        '200': {
          description:
            'Return a 200 status code to acknowledge receipt of the event. Non-200\nstatus codes will be retried.\n',
        },
      },
    }),
    validator('json', Schema.toStandardSchemaV1(WebhookAgentSessionActionRequiredSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/agent_session_created',
    describeRoute({
      description: 'Sent when an agent session is created.\n',
      responses: {
        '200': {
          description:
            'Return a 200 status code to acknowledge receipt of the event. Non-200\nstatus codes will be retried.\n',
        },
      },
    }),
    validator('json', Schema.toStandardSchemaV1(WebhookAgentSessionCreatedSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/agent_session_failed',
    describeRoute({
      description: 'Sent when an agent session fails.\n',
      responses: {
        '200': {
          description:
            'Return a 200 status code to acknowledge receipt of the event. Non-200\nstatus codes will be retried.\n',
        },
      },
    }),
    validator('json', Schema.toStandardSchemaV1(WebhookAgentSessionFailedSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/agent_session_idle',
    describeRoute({
      description: 'Sent when an agent session becomes idle.\n',
      responses: {
        '200': {
          description:
            'Return a 200 status code to acknowledge receipt of the event. Non-200\nstatus codes will be retried.\n',
        },
      },
    }),
    validator('json', Schema.toStandardSchemaV1(WebhookAgentSessionIdleSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/agent_session_in_progress',
    describeRoute({
      description: 'Sent when an agent session enters the in-progress state.\n',
      responses: {
        '200': {
          description:
            'Return a 200 status code to acknowledge receipt of the event. Non-200\nstatus codes will be retried.\n',
        },
      },
    }),
    validator('json', Schema.toStandardSchemaV1(WebhookAgentSessionInProgressSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/batch_cancelled',
    describeRoute({
      description: 'Sent when a batch has been cancelled.\n',
      responses: {
        '200': {
          description:
            'Return a 200 status code to acknowledge receipt of the event. Non-200 \nstatus codes will be retried.\n',
        },
      },
    }),
    validator('json', Schema.toStandardSchemaV1(WebhookBatchCancelledSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/batch_completed',
    describeRoute({
      description: 'Sent when a batch has completed processing.\n',
      responses: {
        '200': {
          description:
            'Return a 200 status code to acknowledge receipt of the event. Non-200 \nstatus codes will be retried.\n',
        },
      },
    }),
    validator('json', Schema.toStandardSchemaV1(WebhookBatchCompletedSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/batch_expired',
    describeRoute({
      description: 'Sent when a batch has expired before completion.\n',
      responses: {
        '200': {
          description:
            'Return a 200 status code to acknowledge receipt of the event. Non-200 \nstatus codes will be retried.\n',
        },
      },
    }),
    validator('json', Schema.toStandardSchemaV1(WebhookBatchExpiredSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/batch_failed',
    describeRoute({
      description: 'Sent when a batch has failed.\n',
      responses: {
        '200': {
          description:
            'Return a 200 status code to acknowledge receipt of the event. Non-200 \nstatus codes will be retried.\n',
        },
      },
    }),
    validator('json', Schema.toStandardSchemaV1(WebhookBatchFailedSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/eval_run_canceled',
    describeRoute({
      description: 'Sent when an eval run has been canceled.\n',
      responses: {
        '200': {
          description:
            'Return a 200 status code to acknowledge receipt of the event. Non-200 \nstatus codes will be retried. \n',
        },
      },
    }),
    validator('json', Schema.toStandardSchemaV1(WebhookEvalRunCanceledSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/eval_run_failed',
    describeRoute({
      description: 'Sent when an eval run has failed.\n',
      responses: {
        '200': {
          description:
            'Return a 200 status code to acknowledge receipt of the event. Non-200 \nstatus codes will be retried. \n',
        },
      },
    }),
    validator('json', Schema.toStandardSchemaV1(WebhookEvalRunFailedSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/eval_run_succeeded',
    describeRoute({
      description: 'Sent when an eval run has succeeded.\n',
      responses: {
        '200': {
          description:
            'Return a 200 status code to acknowledge receipt of the event. Non-200 \nstatus codes will be retried. \n',
        },
      },
    }),
    validator('json', Schema.toStandardSchemaV1(WebhookEvalRunSucceededSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/fine_tuning_job_cancelled',
    describeRoute({
      description: 'Sent when a fine-tuning job has been cancelled.\n',
      responses: {
        '200': {
          description:
            'Return a 200 status code to acknowledge receipt of the event. Non-200 \nstatus codes will be retried. \n',
        },
      },
    }),
    validator('json', Schema.toStandardSchemaV1(WebhookFineTuningJobCancelledSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/fine_tuning_job_failed',
    describeRoute({
      description: 'Sent when a fine-tuning job has failed.\n',
      responses: {
        '200': {
          description:
            'Return a 200 status code to acknowledge receipt of the event. Non-200 \nstatus codes will be retried. \n',
        },
      },
    }),
    validator('json', Schema.toStandardSchemaV1(WebhookFineTuningJobFailedSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/fine_tuning_job_succeeded',
    describeRoute({
      description: 'Sent when a fine-tuning job has succeeded.\n',
      responses: {
        '200': {
          description:
            'Return a 200 status code to acknowledge receipt of the event. Non-200 \nstatus codes will be retried. \n',
        },
      },
    }),
    validator('json', Schema.toStandardSchemaV1(WebhookFineTuningJobSucceededSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/live_call_incoming',
    describeRoute({
      deprecated: true,
      description:
        'Deprecated: use `live.transport.incoming`. Retained only for existing subscriptions.\nSent when an incoming API SIP session is available for Live acceptance.\n',
      responses: {
        '200': {
          description:
            'Return a 200 status code to acknowledge receipt of the event. Non-200\nstatus codes will be retried.\n',
        },
      },
    }),
    validator('json', Schema.toStandardSchemaV1(WebhookLiveCallIncomingSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/live_transport_connected',
    describeRoute({
      description:
        'Sent when a direct Live WebRTC session is created or an Instant Connect session activates.',
      responses: {
        '200': { description: 'Acknowledges delivery after the endpoint has recorded the work.' },
        '204': { description: 'Acknowledges delivery without a response body.' },
      },
    }),
    validator('json', Schema.toStandardSchemaV1(WebhookLiveTransportConnectedSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/live_transport_incoming',
    describeRoute({
      description: 'Sent when an incoming API SIP session is available for Live acceptance.\n',
      responses: {
        '200': {
          description:
            'Return a 200 status code to acknowledge receipt of the event. Non-200\nstatus codes will be retried.\n',
        },
      },
    }),
    validator('json', Schema.toStandardSchemaV1(WebhookLiveTransportIncomingSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/realtime_call_incoming',
    describeRoute({
      description: 'Sent when an incoming API SIP session is available for Realtime acceptance.\n',
      responses: {
        '200': {
          description:
            'Return a 200 status code to acknowledge receipt of the event. Non-200\nstatus codes will be retried.\n',
        },
      },
    }),
    validator('json', Schema.toStandardSchemaV1(WebhookRealtimeCallIncomingSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/response_cancelled',
    describeRoute({
      description: 'Sent when a background response has been cancelled.\n',
      responses: {
        '200': {
          description:
            'Return a 200 status code to acknowledge receipt of the event. Non-200 \nstatus codes will be retried.\n',
        },
      },
    }),
    validator('json', Schema.toStandardSchemaV1(WebhookResponseCancelledSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/response_completed',
    describeRoute({
      description: 'Sent when a background response has completed successfully.\n',
      responses: {
        '200': {
          description:
            'Return a 200 status code to acknowledge receipt of the event. Non-200 \nstatus codes will be retried. \n',
        },
      },
    }),
    validator('json', Schema.toStandardSchemaV1(WebhookResponseCompletedSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/response_failed',
    describeRoute({
      description: 'Sent when a background response has failed.\n',
      responses: {
        '200': {
          description:
            'Return a 200 status code to acknowledge receipt of the event. Non-200 \nstatus codes will be retried.\n',
        },
      },
    }),
    validator('json', Schema.toStandardSchemaV1(WebhookResponseFailedSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/response_incomplete',
    describeRoute({
      description: 'Sent when a background response is incomplete.\n',
      responses: {
        '200': {
          description:
            'Return a 200 status code to acknowledge receipt of the event. Non-200 \nstatus codes will be retried.\n',
        },
      },
    }),
    validator('json', Schema.toStandardSchemaV1(WebhookResponseIncompleteSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/safety_alert_created',
    describeRoute({
      description:
        'Sent when an approved safety alert is available for an API project.\nRetrieve the alert with a project API key granted `api.safety.alerts.read`.\n',
      responses: {
        '200': {
          description:
            'Return any 2xx status code to acknowledge receipt. A 410 Gone response also stops retries; other non-2xx responses are retried.',
        },
      },
    }),
    validator('json', Schema.toStandardSchemaV1(WebhookSafetyAlertCreatedSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/safety_deactivation_issued',
    describeRoute({
      description:
        'Sent when a deactivation is issued for a safety identifier in your organization.\nRetrieve the case details with `GET /v1/safety/cases/{id}` using `data.id`.\n',
      responses: {
        '200': {
          description:
            'Return any 2xx status code to acknowledge receipt. A 410 Gone response also stops retries; other non-2xx responses are retried.',
        },
      },
    }),
    validator('json', Schema.toStandardSchemaV1(WebhookSafetyDeactivationIssuedSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/safety_org_alert_created',
    describeRoute({
      description:
        "Sent when an approved safety alert is available for an enterprise workspace.\nRetrieve the alert from `https://api.chatgpt.com/v1/safety/alerts/{id}` with\nan administrator API key for the workspace's backing organization granted\n`chatgpt.enterprise.safety_alerts.read`.\n",
      responses: {
        '200': {
          description:
            'Return any 2xx status code to acknowledge receipt. A 410 Gone response also stops retries; other non-2xx responses are retried.',
        },
      },
    }),
    validator('json', Schema.toStandardSchemaV1(WebhookSafetyOrgAlertCreatedSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/safety_warning_issued',
    describeRoute({
      description:
        'Sent when a warning is issued for a safety identifier in your organization.\nRetrieve the case details with `GET /v1/safety/cases/{id}` using `data.id`.\n',
      responses: {
        '200': {
          description:
            'Return any 2xx status code to acknowledge receipt. A 410 Gone response also stops retries; other non-2xx responses are retried.',
        },
      },
    }),
    validator('json', Schema.toStandardSchemaV1(WebhookSafetyWarningIssuedSchema)),
    (c) => { throw new Error('Not implemented') },
  )
