import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import { type } from 'arktype'
import {
  ListOrderParamSchema,
  AutomationResourceSchema,
  ErrorResponse2Schema,
  HostedEnvironmentFileParamSchema,
  CreateAutomationParamsSchema,
  UpdateAutomationParamsSchema,
  DeletedAutomationResourceSchema,
  AutomationInvocationResourceSchema,
  EnvironmentTypeParamSchema,
  PublicEnvironmentResourceSchema,
  AgentEnvironmentListResourceSchema,
  CreateAgentEnvironmentParamsSchema,
  EnvironmentFileResourceSchema,
  EnvironmentFileListResourceSchema,
  SubagentResourceSchema,
  SessionItemListResourceSchema,
  TurnResourceSchema,
  SessionTurnListResourceSchema,
  AgentResourceSchema,
  AgentListResourceSchema,
  CreateAgentParamsSchema,
  UpdateAgentParamsSchema,
  DeletedAgentResourceSchema,
  EnvironmentTemplateResourceSchema,
  EnvironmentTemplateListResourceSchema,
  CreateEnvironmentTemplateParamsSchema,
  UpdateEnvironmentTemplateParamsSchema,
  DeletedEnvironmentTemplateResourceSchema,
  SessionResourceSchema,
  SessionListResourceSchema,
  CreateAgentSessionParamsSchema,
  SessionEventSchema,
  UpdateAgentSessionParamsSchema,
  DeletedSessionResourceSchema,
  SessionArtifactResourceSchema,
  SessionArtifactListResourceSchema,
  DeletedSessionArtifactResourceSchema,
  CreateSessionEventsParamsSchema,
  SessionTraceListResourceSchema,
} from '../components'

export const agentsHandler = new Hono()
  .get(
    '/agents/automations',
    describeRoute({
      operationId: 'listAgentAutomations',
      summary: 'List automations',
      description: 'Lists project-owned automations, optionally filtered by target session.',
      tags: ['Agents'],
      responses: {
        '200': {
          description: 'The automations.',
          content: {
            'application/json': {
              schema: resolver(
                type({
                  object: type("'list'").describe('The object type, which is always `list`.'),
                  data: type(type(AutomationResourceSchema).array())
                    .and(type('0 <= unknown[] <= 2000'))
                    .describe('The resources returned in this page, in the requested sort order.'),
                  first_id: type(
                    type('string').narrow(
                      (data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'),
                    ),
                  )
                    .or('null')
                    .describe(
                      'The ID of the first resource in `data`, or `null` if the page is empty.',
                    ),
                  last_id: type(
                    type('string').narrow(
                      (data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'),
                    ),
                  )
                    .or('null')
                    .describe(
                      'The ID of the last resource in `data`, or `null` if the page is empty. Pass this as `after` with the same order and filters.',
                    ),
                  has_more: type('boolean').describe(
                    'Whether there are more resources to retrieve after this page.',
                  ),
                  '+': 'reject',
                }).describe(
                  'A page of Agents API resources, with IDs for retrieving additional pages.',
                ),
              ),
            },
          },
        },
        '400': {
          description: 'The request was invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '403': {
          description: 'The API key lacks the required permission.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '404': {
          description: 'The requested session or event was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '409': {
          description: 'The request conflicted with the current session state.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '500': {
          description: 'An internal error occurred.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '501': {
          description: 'Automation listing is not implemented.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
      },
    }),
    validator(
      'query',
      type({
        'limit?': type('string')
          .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 100n || ctx.mustBe('at most 100')),
        'order?': ListOrderParamSchema,
        'after?': type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
        'session_id?': type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/agents/automations',
    describeRoute({
      operationId: 'createAgentAutomation',
      summary: 'Create an automation',
      description: 'Saves an active automation without invoking it immediately.',
      tags: ['Agents'],
      responses: {
        '201': {
          description: 'The created automation.',
          content: { 'application/json': { schema: resolver(AutomationResourceSchema) } },
        },
        '400': {
          description: 'The request was invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '403': {
          description: 'The API key lacks the required permission.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '404': {
          description: 'The requested session or event was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '409': {
          description: 'The request conflicted with the current session state.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '500': {
          description: 'An internal error occurred.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
      },
    }),
    validator('json', CreateAutomationParamsSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/automations/:automation_id',
    describeRoute({
      operationId: 'getAgentAutomation',
      summary: 'Get an automation',
      description: 'Retrieves a project-owned automation.',
      tags: ['Agents'],
      responses: {
        '200': {
          description: 'Successful response.',
          content: { 'application/json': { schema: resolver(AutomationResourceSchema) } },
        },
        '400': {
          description: 'The request was invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '403': {
          description: 'The API key lacks the required permission.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '404': {
          description: 'The requested session or event was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '409': {
          description: 'The request conflicted with the current session state.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '500': {
          description: 'An internal error occurred.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
      },
    }),
    validator(
      'param',
      type({
        automation_id: type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/agents/automations/:automation_id',
    describeRoute({
      operationId: 'updateAgentAutomation',
      summary: 'Update an automation',
      description: 'Updates supplied fields; target and metadata replace the whole field.',
      tags: ['Agents'],
      responses: {
        '200': {
          description: 'Successful response.',
          content: { 'application/json': { schema: resolver(AutomationResourceSchema) } },
        },
        '400': {
          description: 'The request was invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '403': {
          description: 'The API key lacks the required permission.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '404': {
          description: 'The requested session or event was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '409': {
          description: 'The request conflicted with the current session state.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '500': {
          description: 'An internal error occurred.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
      },
    }),
    validator(
      'param',
      type({
        automation_id: type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
      }),
    ),
    validator('json', UpdateAutomationParamsSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/agents/automations/:automation_id',
    describeRoute({
      operationId: 'deleteAgentAutomation',
      summary: 'Delete an automation',
      description:
        'Deletes the automation and prevents future invocations without deleting its target session.',
      tags: ['Agents'],
      responses: {
        '200': {
          description: 'Successful response.',
          content: { 'application/json': { schema: resolver(DeletedAutomationResourceSchema) } },
        },
        '400': {
          description: 'The request was invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '403': {
          description: 'The API key lacks the required permission.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '404': {
          description: 'The requested session or event was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '409': {
          description: 'The request conflicted with the current session state.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '500': {
          description: 'An internal error occurred.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
      },
    }),
    validator(
      'param',
      type({
        automation_id: type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/agents/automations/:automation_id/pause',
    describeRoute({
      operationId: 'pauseAgentAutomation',
      summary: 'Pause an automation',
      description: 'Pauses future scheduled delivery without stopping an active session.',
      tags: ['Agents'],
      responses: {
        '200': {
          description: 'Successful response.',
          content: { 'application/json': { schema: resolver(AutomationResourceSchema) } },
        },
        '400': {
          description: 'The request was invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '403': {
          description: 'The API key lacks the required permission.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '404': {
          description: 'The requested session or event was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '409': {
          description: 'The request conflicted with the current session state.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '500': {
          description: 'An internal error occurred.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
      },
    }),
    validator(
      'param',
      type({
        automation_id: type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/agents/automations/:automation_id/resume',
    describeRoute({
      operationId: 'resumeAgentAutomation',
      summary: 'Resume an automation',
      description:
        'Resumes scheduled delivery; one-time automations without a pending invocation require a future run_at.',
      tags: ['Agents'],
      responses: {
        '200': {
          description: 'Successful response.',
          content: { 'application/json': { schema: resolver(AutomationResourceSchema) } },
        },
        '400': {
          description: 'The request was invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '403': {
          description: 'The API key lacks the required permission.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '404': {
          description: 'The requested session or event was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '409': {
          description: 'The request conflicted with the current session state.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '500': {
          description: 'An internal error occurred.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
      },
    }),
    validator(
      'param',
      type({
        automation_id: type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/automations/:automation_id/invocations',
    describeRoute({
      operationId: 'listAgentAutomationInvocations',
      summary: 'List automation invocations',
      description: 'Lists delivery records for a project-owned automation.',
      tags: ['Agents'],
      responses: {
        '200': {
          description: 'The invocation history.',
          content: {
            'application/json': {
              schema: resolver(
                type({
                  object: type("'list'").describe('The object type, which is always `list`.'),
                  data: type(type(AutomationInvocationResourceSchema).array())
                    .and(type('0 <= unknown[] <= 2000'))
                    .describe('The resources returned in this page, in the requested sort order.'),
                  first_id: type(
                    type('string').narrow(
                      (data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'),
                    ),
                  )
                    .or('null')
                    .describe(
                      'The ID of the first resource in `data`, or `null` if the page is empty.',
                    ),
                  last_id: type(
                    type('string').narrow(
                      (data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'),
                    ),
                  )
                    .or('null')
                    .describe(
                      'The ID of the last resource in `data`, or `null` if the page is empty. Pass this as `after` with the same order and filters.',
                    ),
                  has_more: type('boolean').describe(
                    'Whether there are more resources to retrieve after this page.',
                  ),
                  '+': 'reject',
                }).describe(
                  'A page of Agents API resources, with IDs for retrieving additional pages.',
                ),
              ),
            },
          },
        },
        '400': {
          description: 'The request was invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '403': {
          description: 'The API key lacks the required permission.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '404': {
          description: 'The requested session or event was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '409': {
          description: 'The request conflicted with the current session state.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '500': {
          description: 'An internal error occurred.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '501': {
          description: 'This operation is not implemented.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
      },
    }),
    validator(
      'param',
      type({
        automation_id: type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
      }),
    ),
    validator(
      'query',
      type({
        'limit?': type('string')
          .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 100n || ctx.mustBe('at most 100')),
        'order?': ListOrderParamSchema,
        'after?': type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/agents/automations/:automation_id/invocations',
    describeRoute({
      operationId: 'createAgentAutomationInvocation',
      summary: 'Invoke an automation',
      description: 'Queues a manual delivery without changing the saved schedule.',
      tags: ['Agents'],
      responses: {
        '200': {
          description: 'The queued invocation.',
          content: { 'application/json': { schema: resolver(AutomationInvocationResourceSchema) } },
        },
        '400': {
          description: 'The request was invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '403': {
          description: 'The API key lacks the required permission.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '404': {
          description: 'The requested session or event was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '409': {
          description: 'The request conflicted with the current session state.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '500': {
          description: 'An internal error occurred.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
      },
    }),
    validator(
      'param',
      type({
        automation_id: type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/automations/:automation_id/invocations/:invocation_id',
    describeRoute({
      operationId: 'getAgentAutomationInvocation',
      summary: 'Get an automation invocation',
      description: 'Retrieves a delivery record for a project-owned automation.',
      tags: ['Agents'],
      responses: {
        '200': {
          description: 'The invocation.',
          content: { 'application/json': { schema: resolver(AutomationInvocationResourceSchema) } },
        },
        '400': {
          description: 'The request was invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '403': {
          description: 'The API key lacks the required permission.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '404': {
          description: 'The requested session or event was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '409': {
          description: 'The request conflicted with the current session state.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '500': {
          description: 'An internal error occurred.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
      },
    }),
    validator(
      'param',
      type({
        automation_id: type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
        invocation_id: type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/environments',
    describeRoute({
      operationId: 'listAgentEnvironments',
      summary: 'List agent environments',
      description:
        'Lists OpenAI-hosted environments owned by the authenticated principal. Requires access to the prewarming beta.',
      tags: ['Agents'],
      responses: {
        '200': {
          description: 'A page of owned environments.',
          content: { 'application/json': { schema: resolver(AgentEnvironmentListResourceSchema) } },
        },
        '400': {
          description: 'The request was invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '403': {
          description: 'The API key lacks the required permission.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '404': {
          description: 'The requested environment or referenced resource was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '409': {
          description: 'The request conflicted with the current environment state.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '429': {
          description: 'The request exceeded a rate or capacity limit.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '500': {
          description: 'An internal error occurred.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
      },
    }),
    validator(
      'query',
      type({
        'limit?': type('string')
          .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 100n || ctx.mustBe('at most 100')),
        'order?': ListOrderParamSchema,
        'after?': type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
        'type?': EnvironmentTypeParamSchema,
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/agents/environments',
    describeRoute({
      operationId: 'createAgentEnvironment',
      summary: 'Create an agent environment',
      description:
        'Creates an OpenAI-hosted environment before creating a session. Requires access to the prewarming beta.',
      tags: ['Agents'],
      responses: {
        '201': {
          description: 'The created OpenAI-hosted environment.',
          content: { 'application/json': { schema: resolver(PublicEnvironmentResourceSchema) } },
        },
        '400': {
          description: 'The request was invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '403': {
          description: 'The API key lacks the required permission.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '404': {
          description: 'The requested environment or referenced resource was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '409': {
          description: 'The request conflicted with the current environment state.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '429': {
          description: 'The request exceeded a rate or capacity limit.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '500': {
          description: 'An internal error occurred.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
      },
    }),
    validator(
      'header',
      type({
        'idempotency-key?': type('string')
          .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
          .narrow((data, ctx) => [...data].length <= 256 || ctx.mustBe('at most 256 characters')),
      }),
    ),
    validator('json', CreateAgentEnvironmentParamsSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/environments/:environment_id',
    describeRoute({
      operationId: 'retrieveAgentEnvironment',
      summary: 'Retrieve an agent environment',
      description:
        "Retrieves an execution environment's connection status and safe installed metadata. See [environment lifecycle](https://developers.openai.com/api/docs/guides/agents-api/environments/lifecycle).",
      tags: ['Agents'],
      responses: {
        '200': {
          description: 'The requested environment.',
          content: { 'application/json': { schema: resolver(PublicEnvironmentResourceSchema) } },
        },
        '400': {
          description: 'The request was invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '403': {
          description: 'The API key lacks the required permission.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '404': {
          description: 'The requested session or event was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '409': {
          description: 'The request conflicted with the current session state.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '500': {
          description: 'An internal error occurred.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
      },
    }),
    validator(
      'param',
      type({
        environment_id: type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/environments/:environment_id/files',
    describeRoute({
      operationId: 'listAgentEnvironmentFiles',
      summary: 'List agent environment files',
      description:
        'Lists live files on a connected execution environment with optional directory filtering and opaque cursor pagination. See [environment files](https://developers.openai.com/api/docs/guides/agents-api/environments/files).',
      tags: ['Agents'],
      responses: {
        '200': {
          description: 'A page of live environment files.',
          content: { 'application/json': { schema: resolver(EnvironmentFileListResourceSchema) } },
        },
        '400': {
          description: 'The request was invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '403': {
          description: 'The API key lacks the required permission.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '404': {
          description: 'The requested session or event was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '409': {
          description: 'The request conflicted with the current session state.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '500': {
          description: 'An internal error occurred.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
      },
    }),
    validator(
      'param',
      type({
        environment_id: type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
      }),
    ),
    validator(
      'query',
      type({
        'path?': type(
          type('string')
            .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
            .narrow(
              (data, ctx) =>
                [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
            ),
        ).or('null'),
        'limit?': type('unknown').pipe(
          (data) => (data === 'null' ? null : data),
          type(
            type('string')
              .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
              .narrow(
                (data, ctx) =>
                  (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
                  ctx.mustBe('an int64'),
              )
              .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
              .narrow((data, ctx) => data <= 100n || ctx.mustBe('at most 100')),
          ).or('null'),
        ),
        'order?': ListOrderParamSchema,
        'page?': type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/agents/environments/:environment_id/files',
    describeRoute({
      operationId: 'createAgentEnvironmentFile',
      summary: 'Write an agent environment file',
      description:
        'Copies inline bytes or a Files API file into a connected execution environment, replacing an existing regular file at the same path. Upload between turns and wait for success before starting the next turn. See [environment files](https://developers.openai.com/api/docs/guides/agents-api/environments/files).',
      tags: ['Agents'],
      responses: {
        '201': {
          description: 'The written live environment file.',
          content: { 'application/json': { schema: resolver(EnvironmentFileResourceSchema) } },
        },
        '400': {
          description: 'The request was invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '403': {
          description: 'The API key lacks the required permission.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '404': {
          description: 'The requested session or event was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '409': {
          description: 'The request conflicted with the current session state.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '429': {
          description:
            'The Files API rate limit for your user has been exceeded. This status also applies to the endpoint rate limit.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '500': {
          description: 'An internal error occurred.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
      },
    }),
    validator(
      'param',
      type({
        environment_id: type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
      }),
    ),
    validator('json', HostedEnvironmentFileParamSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/sessions/:session_id/subagents',
    describeRoute({
      operationId: 'listAgentSessionSubagents',
      summary: 'List session subagents',
      description:
        'Lists subagents in a session, including nested and closed subagents. See [subagent workflows](https://developers.openai.com/api/docs/guides/agents-api/multi-agent).',
      tags: ['Agents'],
      responses: {
        '200': {
          description: 'The requested subagents.',
          content: {
            'application/json': {
              schema: resolver(
                type({
                  object: type("'list'").describe('The object type, which is always `list`.'),
                  data: type(type(SubagentResourceSchema).array())
                    .and(type('0 <= unknown[] <= 2000'))
                    .describe('The resources returned in this page, in the requested sort order.'),
                  first_id: type(
                    type('string').narrow(
                      (data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'),
                    ),
                  )
                    .or('null')
                    .describe(
                      'The ID of the first resource in `data`, or `null` if the page is empty.',
                    ),
                  last_id: type(
                    type('string').narrow(
                      (data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'),
                    ),
                  )
                    .or('null')
                    .describe(
                      'The ID of the last resource in `data`, or `null` if the page is empty. Pass this as `after` with the same order and filters.',
                    ),
                  has_more: type('boolean').describe(
                    'Whether there are more resources to retrieve after this page.',
                  ),
                  '+': 'reject',
                }).describe(
                  'A page of Agents API resources, with IDs for retrieving additional pages.',
                ),
              ),
            },
          },
        },
        '400': {
          description: 'The request was invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '403': {
          description: 'The API key lacks the required permission.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '404': {
          description: 'The requested session or event was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '409': {
          description: 'The request conflicted with the current session state.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '500': {
          description: 'An internal error occurred.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
      },
    }),
    validator(
      'param',
      type({
        session_id: type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
      }),
    ),
    validator(
      'query',
      type({
        'limit?': type('string')
          .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 100n || ctx.mustBe('at most 100')),
        'order?': ListOrderParamSchema,
        'after?': type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/sessions/:session_id/subagents/:subagent_id',
    describeRoute({
      operationId: 'retrieveAgentSessionSubagent',
      summary: 'Retrieve a session subagent',
      description:
        'Retrieves a subagent belonging to this session. See [subagent workflows](https://developers.openai.com/api/docs/guides/agents-api/multi-agent).',
      tags: ['Agents'],
      responses: {
        '200': {
          description: 'The requested subagent.',
          content: { 'application/json': { schema: resolver(SubagentResourceSchema) } },
        },
        '400': {
          description: 'The request was invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '403': {
          description: 'The API key lacks the required permission.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '404': {
          description: 'The requested session or event was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '409': {
          description: 'The request conflicted with the current session state.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '500': {
          description: 'An internal error occurred.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
      },
    }),
    validator(
      'param',
      type({
        session_id: type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
        subagent_id: type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/sessions/:session_id/subagents/:subagent_id/items',
    describeRoute({
      operationId: 'listAgentSessionSubagentItems',
      summary: 'List subagent items',
      description:
        "Lists this subagent's own items across all of its turns. See [subagent workflows](https://developers.openai.com/api/docs/guides/agents-api/multi-agent).",
      tags: ['Agents'],
      responses: {
        '200': {
          description: 'The requested subagent history.',
          content: { 'application/json': { schema: resolver(SessionItemListResourceSchema) } },
        },
        '400': {
          description: 'The request was invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '403': {
          description: 'The API key lacks the required permission.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '404': {
          description: 'The requested session or event was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '409': {
          description: 'The request conflicted with the current session state.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '500': {
          description: 'An internal error occurred.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
      },
    }),
    validator(
      'param',
      type({
        session_id: type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
        subagent_id: type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
      }),
    ),
    validator(
      'query',
      type({
        'limit?': type('string')
          .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 100n || ctx.mustBe('at most 100')),
        'order?': ListOrderParamSchema,
        'after?': type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/sessions/:session_id/subagents/:subagent_id/turns',
    describeRoute({
      operationId: 'listAgentSessionSubagentTurns',
      summary: 'List subagent turns',
      description:
        'Lists all turns of this subagent, including turns after a resume. See [subagent workflows](https://developers.openai.com/api/docs/guides/agents-api/multi-agent).',
      tags: ['Agents'],
      responses: {
        '200': {
          description: 'The requested subagent history.',
          content: { 'application/json': { schema: resolver(SessionTurnListResourceSchema) } },
        },
        '400': {
          description: 'The request was invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '403': {
          description: 'The API key lacks the required permission.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '404': {
          description: 'The requested session or event was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '409': {
          description: 'The request conflicted with the current session state.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '500': {
          description: 'An internal error occurred.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
      },
    }),
    validator(
      'param',
      type({
        session_id: type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
        subagent_id: type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
      }),
    ),
    validator(
      'query',
      type({
        'limit?': type('string')
          .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 100n || ctx.mustBe('at most 100')),
        'order?': ListOrderParamSchema,
        'after?': type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/sessions/:session_id/subagents/:subagent_id/turns/:turn_id',
    describeRoute({
      operationId: 'retrieveAgentSessionSubagentTurn',
      summary: 'Retrieve a subagent turn',
      description:
        'Retrieves a turn belonging to this subagent. See [subagent workflows](https://developers.openai.com/api/docs/guides/agents-api/multi-agent).',
      tags: ['Agents'],
      responses: {
        '200': {
          description: 'The requested subagent history.',
          content: { 'application/json': { schema: resolver(TurnResourceSchema) } },
        },
        '400': {
          description: 'The request was invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '403': {
          description: 'The API key lacks the required permission.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '404': {
          description: 'The requested session or event was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '409': {
          description: 'The request conflicted with the current session state.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '500': {
          description: 'An internal error occurred.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
      },
    }),
    validator(
      'param',
      type({
        session_id: type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
        subagent_id: type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
        turn_id: type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/sessions/:session_id/subagents/:subagent_id/turns/:turn_id/items',
    describeRoute({
      operationId: 'listAgentSessionSubagentTurnItems',
      summary: 'List subagent turn items',
      description:
        'Lists items belonging to one turn of this subagent. See [subagent workflows](https://developers.openai.com/api/docs/guides/agents-api/multi-agent).',
      tags: ['Agents'],
      responses: {
        '200': {
          description: 'The requested subagent history.',
          content: { 'application/json': { schema: resolver(SessionItemListResourceSchema) } },
        },
        '400': {
          description: 'The request was invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '403': {
          description: 'The API key lacks the required permission.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '404': {
          description: 'The requested session or event was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '409': {
          description: 'The request conflicted with the current session state.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '500': {
          description: 'An internal error occurred.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
      },
    }),
    validator(
      'param',
      type({
        session_id: type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
        subagent_id: type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
        turn_id: type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
      }),
    ),
    validator(
      'query',
      type({
        'limit?': type('string')
          .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 100n || ctx.mustBe('at most 100')),
        'order?': ListOrderParamSchema,
        'after?': type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents',
    describeRoute({
      operationId: 'listAgents',
      summary: 'List agents',
      description:
        'Lists reusable agents in the current project. See [agent configuration](https://developers.openai.com/api/docs/guides/agents-api/configuration).',
      tags: ['Agents'],
      responses: {
        '200': {
          description: 'A page of agents.',
          content: { 'application/json': { schema: resolver(AgentListResourceSchema) } },
        },
        '400': {
          description: 'The request was invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '403': {
          description: 'The API key lacks the required permission.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '404': {
          description: 'The requested session or event was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '409': {
          description: 'The request conflicted with the current session state.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '500': {
          description: 'An internal error occurred.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
      },
    }),
    validator(
      'query',
      type({
        'limit?': type('string')
          .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 100n || ctx.mustBe('at most 100')),
        'order?': ListOrderParamSchema,
        'after?': type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/agents',
    describeRoute({
      operationId: 'createAgent',
      summary: 'Create an agent',
      description:
        'Creates a reusable agent without storing credentials. See [agent configuration](https://developers.openai.com/api/docs/guides/agents-api/configuration).',
      tags: ['Agents'],
      responses: {
        '201': {
          description: 'The created agent.',
          content: { 'application/json': { schema: resolver(AgentResourceSchema) } },
        },
        '400': {
          description: 'The request was invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '403': {
          description: 'The API key lacks the required permission.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '404': {
          description: 'The requested session or event was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '409': {
          description: 'The request conflicted with the current session state.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '500': {
          description: 'An internal error occurred.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
      },
    }),
    validator('json', CreateAgentParamsSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/:agent_id',
    describeRoute({
      operationId: 'retrieveAgent',
      summary: 'Retrieve an agent',
      description:
        'Retrieves a reusable agent by ID. See [agent configuration](https://developers.openai.com/api/docs/guides/agents-api/configuration).',
      tags: ['Agents'],
      responses: {
        '200': {
          description: 'The requested agent.',
          content: { 'application/json': { schema: resolver(AgentResourceSchema) } },
        },
        '400': {
          description: 'The request was invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '403': {
          description: 'The API key lacks the required permission.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '404': {
          description: 'The requested session or event was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '409': {
          description: 'The request conflicted with the current session state.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '500': {
          description: 'An internal error occurred.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
      },
    }),
    validator(
      'param',
      type({
        agent_id: type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/agents/:agent_id',
    describeRoute({
      operationId: 'updateAgent',
      summary: 'Update an agent',
      description:
        'Updates a reusable agent. See [agent configuration](https://developers.openai.com/api/docs/guides/agents-api/configuration).',
      tags: ['Agents'],
      responses: {
        '200': {
          description: 'The updated agent.',
          content: { 'application/json': { schema: resolver(AgentResourceSchema) } },
        },
        '400': {
          description: 'The request was invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '403': {
          description: 'The API key lacks the required permission.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '404': {
          description: 'The requested session or event was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '409': {
          description: 'The request conflicted with the current session state.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '500': {
          description: 'An internal error occurred.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
      },
    }),
    validator(
      'param',
      type({
        agent_id: type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
      }),
    ),
    validator('json', UpdateAgentParamsSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/agents/:agent_id',
    describeRoute({
      operationId: 'deleteAgent',
      summary: 'Delete an agent',
      description:
        'Deletes a reusable agent. See [agent configuration](https://developers.openai.com/api/docs/guides/agents-api/configuration).',
      tags: ['Agents'],
      responses: {
        '200': {
          description: 'The deleted agent.',
          content: { 'application/json': { schema: resolver(DeletedAgentResourceSchema) } },
        },
        '400': {
          description: 'The request was invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '403': {
          description: 'The API key lacks the required permission.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '404': {
          description: 'The requested session or event was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '409': {
          description: 'The request conflicted with the current session state.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '500': {
          description: 'An internal error occurred.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
      },
    }),
    validator(
      'param',
      type({
        agent_id: type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/environments/templates',
    describeRoute({
      operationId: 'listAgentEnvironmentTemplates',
      summary: 'List agent environment templates',
      description:
        'Lists reusable environment templates without returning confidential values. See [reusing a hosted setup](https://developers.openai.com/api/docs/guides/agents-api/tools#reuse-a-hosted-plugin-setup).',
      tags: ['Agents'],
      responses: {
        '200': {
          description: 'A page of environment templates.',
          content: {
            'application/json': { schema: resolver(EnvironmentTemplateListResourceSchema) },
          },
        },
        '400': {
          description: 'The request was invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '403': {
          description: 'The API key lacks the required management permission.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '404': {
          description: 'The requested environment definition was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '500': {
          description: 'An internal error occurred.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
      },
    }),
    validator(
      'query',
      type({
        'limit?': type('string')
          .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 100n || ctx.mustBe('at most 100')),
        'order?': ListOrderParamSchema,
        'after?': type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/agents/environments/templates',
    describeRoute({
      operationId: 'createAgentEnvironmentTemplate',
      summary: 'Create an agent environment template',
      description:
        'Creates reusable environment configuration without returning confidential setup commands or environment values. See [reusing a hosted setup](https://developers.openai.com/api/docs/guides/agents-api/tools#reuse-a-hosted-plugin-setup).',
      tags: ['Agents'],
      responses: {
        '201': {
          description: 'The created environment template.',
          content: { 'application/json': { schema: resolver(EnvironmentTemplateResourceSchema) } },
        },
        '400': {
          description: 'The request was invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '403': {
          description: 'The API key lacks the required management permission.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '404': {
          description: 'The requested environment definition was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '500': {
          description: 'An internal error occurred.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
      },
    }),
    validator('json', CreateEnvironmentTemplateParamsSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/environments/templates/:environment_template_id',
    describeRoute({
      operationId: 'retrieveAgentEnvironmentTemplate',
      summary: 'Retrieve an agent environment template',
      description:
        'Retrieves reusable environment configuration without returning confidential values. See [reusing a hosted setup](https://developers.openai.com/api/docs/guides/agents-api/tools#reuse-a-hosted-plugin-setup).',
      tags: ['Agents'],
      responses: {
        '200': {
          description: 'The requested environment template.',
          content: { 'application/json': { schema: resolver(EnvironmentTemplateResourceSchema) } },
        },
        '400': {
          description: 'The request was invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '403': {
          description: 'The API key lacks the required management permission.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '404': {
          description: 'The requested environment definition was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '500': {
          description: 'An internal error occurred.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
      },
    }),
    validator(
      'param',
      type({
        environment_template_id: type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/agents/environments/templates/:environment_template_id',
    describeRoute({
      operationId: 'updateAgentEnvironmentTemplate',
      summary: 'Update an agent environment template',
      description:
        'Updates reusable environment configuration without returning confidential values. See [reusing a hosted setup](https://developers.openai.com/api/docs/guides/agents-api/tools#reuse-a-hosted-plugin-setup).',
      tags: ['Agents'],
      responses: {
        '200': {
          description: 'The updated environment template.',
          content: { 'application/json': { schema: resolver(EnvironmentTemplateResourceSchema) } },
        },
        '400': {
          description: 'The request was invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '403': {
          description: 'The API key lacks the required management permission.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '404': {
          description: 'The requested environment definition was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '409': {
          description: 'The request conflicted with the current environment state.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '500': {
          description: 'An internal error occurred.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
      },
    }),
    validator(
      'param',
      type({
        environment_template_id: type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
      }),
    ),
    validator('json', UpdateEnvironmentTemplateParamsSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/agents/environments/templates/:environment_template_id',
    describeRoute({
      operationId: 'deleteAgentEnvironmentTemplate',
      summary: 'Delete an agent environment template',
      description:
        'Deletes reusable environment configuration and all confidential template inputs. See [reusing a hosted setup](https://developers.openai.com/api/docs/guides/agents-api/tools#reuse-a-hosted-plugin-setup).',
      tags: ['Agents'],
      responses: {
        '200': {
          description: 'The deleted environment template.',
          content: {
            'application/json': { schema: resolver(DeletedEnvironmentTemplateResourceSchema) },
          },
        },
        '400': {
          description: 'The request was invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '403': {
          description: 'The API key lacks the required management permission.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '404': {
          description: 'The requested environment definition was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '409': {
          description: 'The request conflicted with the current environment state.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '500': {
          description: 'An internal error occurred.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
      },
    }),
    validator(
      'param',
      type({
        environment_template_id: type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/sessions',
    describeRoute({
      operationId: 'listAgentSessions',
      summary: 'List agent sessions',
      description:
        'Lists managed agent sessions using ID-based pagination and the requested sort order. See [managing sessions](https://developers.openai.com/api/docs/guides/agents-api/sessions/manage).',
      tags: ['Agents'],
      responses: {
        '200': {
          description: 'A page of sessions.',
          content: { 'application/json': { schema: resolver(SessionListResourceSchema) } },
        },
        '400': {
          description: 'The request was invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '403': {
          description: 'The API key lacks the required permission.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '404': {
          description: 'The requested session or event was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '409': {
          description: 'The request conflicted with the current session state.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '500': {
          description: 'An internal error occurred.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
      },
    }),
    validator(
      'query',
      type({
        'limit?': type('string')
          .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 100n || ctx.mustBe('at most 100')),
        'order?': ListOrderParamSchema,
        'after?': type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
        'agent_id?': type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
        'metadata?': type({
          '[string]': type('string')
            .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
            .narrow((data, ctx) => [...data].length <= 512 || ctx.mustBe('at most 512 characters')),
        }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/agents/sessions',
    describeRoute({
      operationId: 'createAgentSession',
      summary: 'Create an agent session',
      description:
        'Creates a managed agent session, optionally submits initial input, and returns the session or streams its events when stream is true. See [running sessions](https://developers.openai.com/api/docs/guides/agents-api/sessions).',
      tags: ['Agents'],
      responses: {
        '201': {
          description: 'The created session or its event stream.',
          content: {
            'application/json': { schema: resolver(SessionResourceSchema) },
            'text/event-stream': { schema: resolver(SessionEventSchema) },
          },
        },
        '400': {
          description: 'The request was invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '403': {
          description: 'The API key lacks the required permission.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '404': {
          description: 'The requested session or event was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '409': {
          description: 'The request conflicted with the current session state.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '429': {
          description:
            'The Files API rate limit for your user has been exceeded. This status also applies to the endpoint rate limit.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '500': {
          description: 'An internal error occurred.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
      },
    }),
    validator('json', CreateAgentSessionParamsSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/sessions/:session_id',
    describeRoute({
      operationId: 'retrieveAgentSession',
      summary: 'Retrieve an agent session',
      description:
        'Retrieves the current state of a managed agent session. See [managing sessions](https://developers.openai.com/api/docs/guides/agents-api/sessions/manage).',
      tags: ['Agents'],
      responses: {
        '200': {
          description: 'The requested session.',
          content: { 'application/json': { schema: resolver(SessionResourceSchema) } },
        },
        '400': {
          description: 'The request was invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '403': {
          description: 'The API key lacks the required permission.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '404': {
          description: 'The requested session or event was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '409': {
          description: 'The request conflicted with the current session state.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '500': {
          description: 'An internal error occurred.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
      },
    }),
    validator(
      'param',
      type({
        session_id: type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/agents/sessions/:session_id',
    describeRoute({
      operationId: 'updateAgentSession',
      summary: 'Update an agent session',
      description:
        'Updates session tools, vaults, metadata, model, reasoning effort, service tier, or the default prompt cache lifetime. Model settings apply to subsequent turns. Omitted fields are unchanged. See [managing sessions](https://developers.openai.com/api/docs/guides/agents-api/sessions/manage).',
      tags: ['Agents'],
      responses: {
        '200': {
          description: 'The updated session.',
          content: { 'application/json': { schema: resolver(SessionResourceSchema) } },
        },
        '400': {
          description: 'The request was invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '403': {
          description: 'The API key lacks the required permission.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '404': {
          description: 'The requested session or event was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '409': {
          description: 'The request conflicted with the current session state.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '500': {
          description: 'An internal error occurred.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
      },
    }),
    validator(
      'param',
      type({
        session_id: type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
      }),
    ),
    validator('json', UpdateAgentSessionParamsSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/agents/sessions/:session_id',
    describeRoute({
      operationId: 'deleteAgentSession',
      summary: 'Delete an agent session',
      description:
        'Removes a managed agent session from the public API and returns a deletion confirmation. If backend execution has ended, deletion can cancel a still-open public turn and abandon unpublished outputs. Running execution must be cancelled first. Physical cleanup may continue asynchronously. See [managing sessions](https://developers.openai.com/api/docs/guides/agents-api/sessions/manage).',
      tags: ['Agents'],
      responses: {
        '200': {
          description: 'The deleted session.',
          content: { 'application/json': { schema: resolver(DeletedSessionResourceSchema) } },
        },
        '400': {
          description: 'The request was invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '403': {
          description: 'The API key lacks the required permission.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '404': {
          description: 'The requested session or event was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '409': {
          description: 'The request conflicted with the current session state.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '500': {
          description: 'An internal error occurred.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
      },
    }),
    validator(
      'param',
      type({
        session_id: type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/sessions/:session_id/artifacts',
    describeRoute({
      operationId: 'listAgentSessionArtifacts',
      summary: 'List agent session artifacts',
      description:
        'Lists immutable artifacts published by completed hosted session turns. See [session artifacts](https://developers.openai.com/api/docs/guides/agents-api/environments/files#openai-hosted-artifacts).',
      tags: ['Agents'],
      responses: {
        '200': {
          description: 'A page of durable session artifacts.',
          content: { 'application/json': { schema: resolver(SessionArtifactListResourceSchema) } },
        },
        '400': {
          description: 'The request was invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '403': {
          description: 'The API key lacks the required permission.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '404': {
          description: 'The requested session or event was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '409': {
          description: 'The request conflicted with the current session state.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '500': {
          description: 'An internal error occurred.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
      },
    }),
    validator(
      'param',
      type({
        session_id: type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
      }),
    ),
    validator(
      'query',
      type({
        'limit?': type('string')
          .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 100n || ctx.mustBe('at most 100')),
        'order?': ListOrderParamSchema,
        'after?': type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
        'environment_id?': type(
          type('string')
            .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
            .narrow(
              (data, ctx) =>
                [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
            ),
        ).or('null'),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/sessions/:session_id/artifacts/:artifact_id',
    describeRoute({
      operationId: 'retrieveAgentSessionArtifact',
      summary: 'Retrieve an agent session artifact',
      description:
        'Retrieves immutable metadata for one durable session artifact. See [session artifacts](https://developers.openai.com/api/docs/guides/agents-api/environments/files#openai-hosted-artifacts).',
      tags: ['Agents'],
      responses: {
        '200': {
          description: 'The requested session artifact.',
          content: { 'application/json': { schema: resolver(SessionArtifactResourceSchema) } },
        },
        '400': {
          description: 'The request was invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '403': {
          description: 'The API key lacks the required permission.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '404': {
          description: 'The requested session or event was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '409': {
          description: 'The request conflicted with the current session state.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '500': {
          description: 'An internal error occurred.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
      },
    }),
    validator(
      'param',
      type({
        session_id: type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
        artifact_id: type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/agents/sessions/:session_id/artifacts/:artifact_id',
    describeRoute({
      operationId: 'deleteAgentSessionArtifact',
      summary: 'Delete an agent session artifact',
      description:
        'Deletes an immutable session artifact without deleting its live environment file or original Files API object. See [session artifacts](https://developers.openai.com/api/docs/guides/agents-api/environments/files#openai-hosted-artifacts).',
      tags: ['Agents'],
      responses: {
        '200': {
          description: 'The deleted session artifact.',
          content: {
            'application/json': { schema: resolver(DeletedSessionArtifactResourceSchema) },
          },
        },
        '400': {
          description: 'The request was invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '403': {
          description: 'The API key lacks the required permission.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '404': {
          description: 'The requested session or event was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '409': {
          description: 'The request conflicted with the current session state.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '500': {
          description: 'An internal error occurred.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
      },
    }),
    validator(
      'param',
      type({
        session_id: type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
        artifact_id: type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/sessions/:session_id/artifacts/:artifact_id/content',
    describeRoute({
      operationId: 'retrieveAgentSessionArtifactContent',
      summary: 'Retrieve agent session artifact content',
      description:
        'Downloads immutable session artifact bytes after the execution environment expires. See [session artifacts](https://developers.openai.com/api/docs/guides/agents-api/environments/files#openai-hosted-artifacts).',
      tags: ['Agents'],
      responses: {
        '200': {
          description: 'The immutable artifact contents.',
          content: { 'application/octet-stream': { schema: resolver(type('File')) } },
        },
        '400': {
          description: 'The request was invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '403': {
          description: 'The API key lacks the required permission.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '404': {
          description: 'The requested session or event was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '409': {
          description: 'The request conflicted with the current session state.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '500': {
          description: 'An internal error occurred.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
      },
    }),
    validator(
      'param',
      type({
        session_id: type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
        artifact_id: type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/sessions/:session_id/events',
    describeRoute({
      operationId: 'listAgentSessionEvents',
      summary: 'Stream agent session events',
      description:
        'Streams live events for an agent session. See [session events](https://developers.openai.com/api/docs/guides/agents-api/sessions/events).',
      tags: ['Agents'],
      responses: {
        '200': {
          description: 'A live stream of session events.',
          content: { 'text/event-stream': { schema: resolver(SessionEventSchema) } },
        },
        '400': {
          description: 'The request was invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '403': {
          description: 'The API key lacks the required permission.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '404': {
          description: 'The requested session or event was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '409': {
          description: 'The request conflicted with the current session state.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '500': {
          description: 'An internal error occurred.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
      },
    }),
    validator(
      'param',
      type({
        session_id: type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
      }),
    ),
    validator(
      'query',
      type({
        'include_obfuscation?': type(
          /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
        ).pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/agents/sessions/:session_id/events',
    describeRoute({
      operationId: 'createAgentSessionEvents',
      summary: 'Create agent session input events',
      description:
        'Submits message, cancellation, tool-result, or computer-use approval-response events to a managed agent session. Cancellation can recover a still-open turn whose backend execution has ended by marking it cancelled and abandoning unpublished outputs. Saved results, published files, and existing terminal outcomes are preserved. HTTP 202 confirms acceptance, not durable completion. See [session events](https://developers.openai.com/api/docs/guides/agents-api/sessions/events).',
      tags: ['Agents'],
      responses: {
        '202': { description: 'The events were accepted.' },
        '400': {
          description: 'The request was invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '403': {
          description: 'The API key lacks the required permission.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '404': {
          description: 'The requested session or event was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '409': {
          description: 'The request conflicted with the current session state.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '500': {
          description: 'An internal error occurred.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
      },
    }),
    validator(
      'param',
      type({
        session_id: type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
      }),
    ),
    validator(
      'header',
      type({
        'idempotency-key?': type('string')
          .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
          .narrow((data, ctx) => [...data].length <= 256 || ctx.mustBe('at most 256 characters')),
      }),
    ),
    validator('json', CreateSessionEventsParamsSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/sessions/:session_id/items',
    describeRoute({
      operationId: 'listAgentSessionItems',
      summary: 'List agent session items',
      description:
        "Lists items produced by the session's root agent, including its interactions with subagents. Each subagent has its own item history. See [inspecting agent output](https://developers.openai.com/api/docs/guides/agents-api/observability).",
      tags: ['Agents'],
      responses: {
        '200': {
          description: 'A page of session items.',
          content: { 'application/json': { schema: resolver(SessionItemListResourceSchema) } },
        },
        '400': {
          description: 'The request was invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '403': {
          description: 'The API key lacks the required permission.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '404': {
          description: 'The requested session or event was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '409': {
          description: 'The request conflicted with the current session state.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '500': {
          description: 'An internal error occurred.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
      },
    }),
    validator(
      'param',
      type({
        session_id: type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
      }),
    ),
    validator(
      'query',
      type({
        'limit?': type('string')
          .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 100n || ctx.mustBe('at most 100')),
        'order?': ListOrderParamSchema,
        'after?': type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/sessions/:session_id/traces',
    describeRoute({
      operationId: 'listAgentSessionTraces',
      summary: 'List agent session traces',
      description:
        'Lists published root-turn traces as OTLP JSON, ordered by turn creation time and ID. Unpublished traces are skipped. Each page returns data available when read; it does not wait for late traces. Pages may contain fewer traces than requested to fit the 16 MiB response limit. When `has_more` is true, pass `last_id` as `after` to continue. If the first trace exceeds 16 MiB before conversion or cannot fit on a page by itself, the API returns a `trace_too_large` error.',
      tags: ['Agents'],
      responses: {
        '200': {
          description: 'A page of published session traces.',
          content: { 'application/json': { schema: resolver(SessionTraceListResourceSchema) } },
        },
        '400': {
          description: 'The request was invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '403': {
          description: 'The API key lacks the required permission.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '404': {
          description: 'The requested session or event was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '409': {
          description: 'The request conflicted with the current session state.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '500': {
          description: 'An internal error occurred.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
      },
    }),
    validator(
      'param',
      type({
        session_id: type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
      }),
    ),
    validator(
      'query',
      type({
        'limit?': type('string')
          .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 100n || ctx.mustBe('at most 100')),
        'order?': ListOrderParamSchema,
        'after?': type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/sessions/:session_id/turns',
    describeRoute({
      operationId: 'listAgentSessionTurns',
      summary: 'List agent session turns',
      description:
        'Lists turns by creation time and turn ID. The after cursor is exclusive in the selected order. See [session turns](https://developers.openai.com/api/docs/guides/agents-api/sessions/manage#inspect-session-turns).',
      tags: ['Agents'],
      responses: {
        '200': {
          description: 'A page of session turns.',
          content: { 'application/json': { schema: resolver(SessionTurnListResourceSchema) } },
        },
        '400': {
          description: 'The request was invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '403': {
          description: 'The API key lacks the required permission.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '404': {
          description: 'The requested session or event was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '409': {
          description: 'The request conflicted with the current session state.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '500': {
          description: 'An internal error occurred.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
      },
    }),
    validator(
      'param',
      type({
        session_id: type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
      }),
    ),
    validator(
      'query',
      type({
        'limit?': type('string')
          .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 100n || ctx.mustBe('at most 100')),
        'order?': ListOrderParamSchema,
        'after?': type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/sessions/:session_id/turns/:turn_id',
    describeRoute({
      operationId: 'retrieveAgentSessionTurn',
      summary: 'Retrieve an agent session turn',
      description:
        "Retrieves a turn's current status, timestamps, usage, and error. Returns 404 if the turn does not belong to the session. See [session turns](https://developers.openai.com/api/docs/guides/agents-api/sessions/manage#inspect-session-turns).",
      tags: ['Agents'],
      responses: {
        '200': {
          description: 'The requested turn.',
          content: { 'application/json': { schema: resolver(TurnResourceSchema) } },
        },
        '400': {
          description: 'The request was invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '403': {
          description: 'The API key lacks the required permission.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '404': {
          description: 'The requested session or event was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '409': {
          description: 'The request conflicted with the current session state.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '500': {
          description: 'An internal error occurred.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
      },
    }),
    validator(
      'param',
      type({
        session_id: type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
        turn_id: type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/sessions/:session_id/turns/:turn_id/items',
    describeRoute({
      operationId: 'listAgentSessionTurnItems',
      summary: 'List agent session turn items',
      description:
        'Lists items belonging to one root-agent turn, including its interactions with subagents. See [inspecting agent output](https://developers.openai.com/api/docs/guides/agents-api/observability).',
      tags: ['Agents'],
      responses: {
        '200': {
          description: 'A page of session turn items.',
          content: { 'application/json': { schema: resolver(SessionItemListResourceSchema) } },
        },
        '400': {
          description: 'The request was invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '403': {
          description: 'The API key lacks the required permission.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '404': {
          description: 'The requested session or event was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '409': {
          description: 'The request conflicted with the current session state.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '500': {
          description: 'An internal error occurred.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: { 'application/json': { schema: resolver(ErrorResponse2Schema) } },
        },
      },
    }),
    validator(
      'param',
      type({
        session_id: type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
        turn_id: type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
      }),
    ),
    validator(
      'query',
      type({
        'limit?': type('string')
          .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          )
          .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
          .narrow((data, ctx) => data <= 100n || ctx.mustBe('at most 100')),
        'order?': ListOrderParamSchema,
        'after?': type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
