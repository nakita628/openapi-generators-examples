import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import { Type, Codec, type StaticDecode, type StaticEncode, type TSchema } from 'typebox'
import { Compile } from 'typebox/compile'
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

const toStandardSchemaV1 = <T extends TSchema>(schema: T) => {
  const validator = Compile(schema)
  return Object.assign(validator, {
    '~standard': {
      version: 1 as const,
      vendor: 'typebox',
      validate: (value: unknown) =>
        validator.Check(value)
          ? { value: validator.Decode(value) }
          : {
              issues: validator.Errors(value).map((error) => ({
                message: error.message,
                path: error.instancePath
                  .split('/')
                  .slice(1)
                  .map((key) => key.replaceAll('~1', '/').replaceAll('~0', '~')),
              })),
            },
      types: undefined as
        | { readonly input: StaticEncode<T>; readonly output: StaticDecode<T> }
        | undefined,
    },
  })
}

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
                toStandardSchemaV1(
                  Type.Object(
                    {
                      object: Type.Optional(
                        Type.Literal('list', {
                          description: 'The object type, which is always `list`.',
                          default: 'list',
                        }),
                      ),
                      data: Type.Array(AutomationResourceSchema, {
                        minItems: 0,
                        maxItems: 2000,
                        description:
                          'The resources returned in this page, in the requested sort order.',
                      }),
                      first_id: Type.Union([
                        Type.String({
                          minLength: 0,
                          description:
                            'The ID of the first resource in `data`, or `null` if the page is empty.',
                        }),
                        Type.Null(),
                      ]),
                      last_id: Type.Union([
                        Type.String({
                          minLength: 0,
                          description:
                            'The ID of the last resource in `data`, or `null` if the page is empty. Pass this as `after` with the same order and filters.',
                        }),
                        Type.Null(),
                      ]),
                      has_more: Type.Boolean({
                        description:
                          'Whether there are more resources to retrieve after this page.',
                      }),
                    },
                    {
                      additionalProperties: false,
                      description:
                        'A page of Agents API resources, with IDs for retrieving additional pages.',
                    },
                  ),
                ),
              ),
            },
          },
        },
        '400': {
          description: 'The request was invalid.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '403': {
          description: 'The API key lacks the required permission.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '404': {
          description: 'The requested session or event was not found.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '409': {
          description: 'The request conflicted with the current session state.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '500': {
          description: 'An internal error occurred.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '501': {
          description: 'Automation listing is not implemented.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
      },
    }),
    validator(
      'query',
      toStandardSchemaV1(
        Type.Object({
          limit: Type.Optional(
            Codec(
              Type.Refine(
                Type.Refine(
                  Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '20' }),
                  (value) => Number(value) >= 1,
                  () => 'must be >= 1',
                ),
                (value) => Number(value) <= 100,
                () => 'must be <= 100',
              ),
            )
              .Decode((value) => Number(value))
              .Encode((value) => String(value)),
          ),
          order: Type.Optional(Type.Intersect([ListOrderParamSchema], { default: 'desc' })),
          after: Type.Optional(Type.String({ minLength: 0, maxLength: 1048576 })),
          session_id: Type.Optional(Type.String({ minLength: 0, maxLength: 1048576 })),
        }),
      ),
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
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(AutomationResourceSchema)) },
          },
        },
        '400': {
          description: 'The request was invalid.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '403': {
          description: 'The API key lacks the required permission.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '404': {
          description: 'The requested session or event was not found.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '409': {
          description: 'The request conflicted with the current session state.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '500': {
          description: 'An internal error occurred.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
      },
    }),
    validator('json', toStandardSchemaV1(CreateAutomationParamsSchema)),
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
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(AutomationResourceSchema)) },
          },
        },
        '400': {
          description: 'The request was invalid.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '403': {
          description: 'The API key lacks the required permission.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '404': {
          description: 'The requested session or event was not found.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '409': {
          description: 'The request conflicted with the current session state.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '500': {
          description: 'An internal error occurred.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({ automation_id: Type.String({ minLength: 0, maxLength: 1048576 }) }),
      ),
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
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(AutomationResourceSchema)) },
          },
        },
        '400': {
          description: 'The request was invalid.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '403': {
          description: 'The API key lacks the required permission.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '404': {
          description: 'The requested session or event was not found.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '409': {
          description: 'The request conflicted with the current session state.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '500': {
          description: 'An internal error occurred.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({ automation_id: Type.String({ minLength: 0, maxLength: 1048576 }) }),
      ),
    ),
    validator('json', toStandardSchemaV1(UpdateAutomationParamsSchema)),
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
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(DeletedAutomationResourceSchema)),
            },
          },
        },
        '400': {
          description: 'The request was invalid.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '403': {
          description: 'The API key lacks the required permission.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '404': {
          description: 'The requested session or event was not found.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '409': {
          description: 'The request conflicted with the current session state.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '500': {
          description: 'An internal error occurred.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({ automation_id: Type.String({ minLength: 0, maxLength: 1048576 }) }),
      ),
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
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(AutomationResourceSchema)) },
          },
        },
        '400': {
          description: 'The request was invalid.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '403': {
          description: 'The API key lacks the required permission.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '404': {
          description: 'The requested session or event was not found.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '409': {
          description: 'The request conflicted with the current session state.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '500': {
          description: 'An internal error occurred.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({ automation_id: Type.String({ minLength: 0, maxLength: 1048576 }) }),
      ),
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
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(AutomationResourceSchema)) },
          },
        },
        '400': {
          description: 'The request was invalid.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '403': {
          description: 'The API key lacks the required permission.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '404': {
          description: 'The requested session or event was not found.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '409': {
          description: 'The request conflicted with the current session state.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '500': {
          description: 'An internal error occurred.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({ automation_id: Type.String({ minLength: 0, maxLength: 1048576 }) }),
      ),
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
                toStandardSchemaV1(
                  Type.Object(
                    {
                      object: Type.Optional(
                        Type.Literal('list', {
                          description: 'The object type, which is always `list`.',
                          default: 'list',
                        }),
                      ),
                      data: Type.Array(AutomationInvocationResourceSchema, {
                        minItems: 0,
                        maxItems: 2000,
                        description:
                          'The resources returned in this page, in the requested sort order.',
                      }),
                      first_id: Type.Union([
                        Type.String({
                          minLength: 0,
                          description:
                            'The ID of the first resource in `data`, or `null` if the page is empty.',
                        }),
                        Type.Null(),
                      ]),
                      last_id: Type.Union([
                        Type.String({
                          minLength: 0,
                          description:
                            'The ID of the last resource in `data`, or `null` if the page is empty. Pass this as `after` with the same order and filters.',
                        }),
                        Type.Null(),
                      ]),
                      has_more: Type.Boolean({
                        description:
                          'Whether there are more resources to retrieve after this page.',
                      }),
                    },
                    {
                      additionalProperties: false,
                      description:
                        'A page of Agents API resources, with IDs for retrieving additional pages.',
                    },
                  ),
                ),
              ),
            },
          },
        },
        '400': {
          description: 'The request was invalid.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '403': {
          description: 'The API key lacks the required permission.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '404': {
          description: 'The requested session or event was not found.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '409': {
          description: 'The request conflicted with the current session state.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '500': {
          description: 'An internal error occurred.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '501': {
          description: 'This operation is not implemented.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({ automation_id: Type.String({ minLength: 0, maxLength: 1048576 }) }),
      ),
    ),
    validator(
      'query',
      toStandardSchemaV1(
        Type.Object({
          limit: Type.Optional(
            Codec(
              Type.Refine(
                Type.Refine(
                  Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '20' }),
                  (value) => Number(value) >= 1,
                  () => 'must be >= 1',
                ),
                (value) => Number(value) <= 100,
                () => 'must be <= 100',
              ),
            )
              .Decode((value) => Number(value))
              .Encode((value) => String(value)),
          ),
          order: Type.Optional(Type.Intersect([ListOrderParamSchema], { default: 'desc' })),
          after: Type.Optional(Type.String({ minLength: 0, maxLength: 1048576 })),
        }),
      ),
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
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(AutomationInvocationResourceSchema)),
            },
          },
        },
        '400': {
          description: 'The request was invalid.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '403': {
          description: 'The API key lacks the required permission.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '404': {
          description: 'The requested session or event was not found.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '409': {
          description: 'The request conflicted with the current session state.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '500': {
          description: 'An internal error occurred.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({ automation_id: Type.String({ minLength: 0, maxLength: 1048576 }) }),
      ),
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
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(AutomationInvocationResourceSchema)),
            },
          },
        },
        '400': {
          description: 'The request was invalid.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '403': {
          description: 'The API key lacks the required permission.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '404': {
          description: 'The requested session or event was not found.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '409': {
          description: 'The request conflicted with the current session state.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '500': {
          description: 'An internal error occurred.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({
          automation_id: Type.String({ minLength: 0, maxLength: 1048576 }),
          invocation_id: Type.String({ minLength: 0, maxLength: 1048576 }),
        }),
      ),
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
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(AgentEnvironmentListResourceSchema)),
            },
          },
        },
        '400': {
          description: 'The request was invalid.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '403': {
          description: 'The API key lacks the required permission.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '404': {
          description: 'The requested environment or referenced resource was not found.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '409': {
          description: 'The request conflicted with the current environment state.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '429': {
          description: 'The request exceeded a rate or capacity limit.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '500': {
          description: 'An internal error occurred.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
      },
    }),
    validator(
      'query',
      toStandardSchemaV1(
        Type.Object({
          limit: Type.Optional(
            Codec(
              Type.Refine(
                Type.Refine(
                  Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '20' }),
                  (value) => Number(value) >= 1,
                  () => 'must be >= 1',
                ),
                (value) => Number(value) <= 100,
                () => 'must be <= 100',
              ),
            )
              .Decode((value) => Number(value))
              .Encode((value) => String(value)),
          ),
          order: Type.Optional(Type.Intersect([ListOrderParamSchema], { default: 'desc' })),
          after: Type.Optional(Type.String({ minLength: 0, maxLength: 1048576 })),
          type: Type.Optional(EnvironmentTypeParamSchema),
        }),
      ),
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
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(PublicEnvironmentResourceSchema)),
            },
          },
        },
        '400': {
          description: 'The request was invalid.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '403': {
          description: 'The API key lacks the required permission.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '404': {
          description: 'The requested environment or referenced resource was not found.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '409': {
          description: 'The request conflicted with the current environment state.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '429': {
          description: 'The request exceeded a rate or capacity limit.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '500': {
          description: 'An internal error occurred.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
      },
    }),
    validator(
      'header',
      toStandardSchemaV1(
        Type.Object({
          'idempotency-key': Type.Optional(Type.String({ minLength: 1, maxLength: 256 })),
        }),
      ),
    ),
    validator('json', toStandardSchemaV1(CreateAgentEnvironmentParamsSchema)),
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
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(PublicEnvironmentResourceSchema)),
            },
          },
        },
        '400': {
          description: 'The request was invalid.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '403': {
          description: 'The API key lacks the required permission.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '404': {
          description: 'The requested session or event was not found.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '409': {
          description: 'The request conflicted with the current session state.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '500': {
          description: 'An internal error occurred.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({ environment_id: Type.String({ minLength: 0, maxLength: 1048576 }) }),
      ),
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
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(EnvironmentFileListResourceSchema)),
            },
          },
        },
        '400': {
          description: 'The request was invalid.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '403': {
          description: 'The API key lacks the required permission.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '404': {
          description: 'The requested session or event was not found.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '409': {
          description: 'The request conflicted with the current session state.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '500': {
          description: 'An internal error occurred.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({ environment_id: Type.String({ minLength: 0, maxLength: 1048576 }) }),
      ),
    ),
    validator(
      'query',
      toStandardSchemaV1(
        Type.Object({
          path: Type.Optional(
            Type.Union([Type.String({ minLength: 0, maxLength: 1048576 }), Type.Null()]),
          ),
          limit: Type.Optional(
            Type.Union([
              Codec(
                Type.Refine(
                  Type.Refine(
                    Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                    (value) => Number(value) >= 1,
                    () => 'must be >= 1',
                  ),
                  (value) => Number(value) <= 100,
                  () => 'must be <= 100',
                ),
              )
                .Decode((value) => Number(value))
                .Encode((value) => String(value)),
              Type.Null(),
            ]),
          ),
          order: Type.Optional(ListOrderParamSchema),
          page: Type.Optional(Type.String({ minLength: 0, maxLength: 1048576 })),
        }),
      ),
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
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(EnvironmentFileResourceSchema)),
            },
          },
        },
        '400': {
          description: 'The request was invalid.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '403': {
          description: 'The API key lacks the required permission.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '404': {
          description: 'The requested session or event was not found.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '409': {
          description: 'The request conflicted with the current session state.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '429': {
          description:
            'The Files API rate limit for your user has been exceeded. This status also applies to the endpoint rate limit.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '500': {
          description: 'An internal error occurred.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({ environment_id: Type.String({ minLength: 0, maxLength: 1048576 }) }),
      ),
    ),
    validator('json', toStandardSchemaV1(HostedEnvironmentFileParamSchema)),
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
                toStandardSchemaV1(
                  Type.Object(
                    {
                      object: Type.Optional(
                        Type.Literal('list', {
                          description: 'The object type, which is always `list`.',
                          default: 'list',
                        }),
                      ),
                      data: Type.Array(SubagentResourceSchema, {
                        minItems: 0,
                        maxItems: 2000,
                        description:
                          'The resources returned in this page, in the requested sort order.',
                      }),
                      first_id: Type.Union([
                        Type.String({
                          minLength: 0,
                          description:
                            'The ID of the first resource in `data`, or `null` if the page is empty.',
                        }),
                        Type.Null(),
                      ]),
                      last_id: Type.Union([
                        Type.String({
                          minLength: 0,
                          description:
                            'The ID of the last resource in `data`, or `null` if the page is empty. Pass this as `after` with the same order and filters.',
                        }),
                        Type.Null(),
                      ]),
                      has_more: Type.Boolean({
                        description:
                          'Whether there are more resources to retrieve after this page.',
                      }),
                    },
                    {
                      additionalProperties: false,
                      description:
                        'A page of Agents API resources, with IDs for retrieving additional pages.',
                    },
                  ),
                ),
              ),
            },
          },
        },
        '400': {
          description: 'The request was invalid.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '403': {
          description: 'The API key lacks the required permission.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '404': {
          description: 'The requested session or event was not found.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '409': {
          description: 'The request conflicted with the current session state.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '500': {
          description: 'An internal error occurred.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({ session_id: Type.String({ minLength: 0, maxLength: 1048576 }) }),
      ),
    ),
    validator(
      'query',
      toStandardSchemaV1(
        Type.Object({
          limit: Type.Optional(
            Codec(
              Type.Refine(
                Type.Refine(
                  Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '20' }),
                  (value) => Number(value) >= 1,
                  () => 'must be >= 1',
                ),
                (value) => Number(value) <= 100,
                () => 'must be <= 100',
              ),
            )
              .Decode((value) => Number(value))
              .Encode((value) => String(value)),
          ),
          order: Type.Optional(Type.Intersect([ListOrderParamSchema], { default: 'desc' })),
          after: Type.Optional(Type.String({ minLength: 0, maxLength: 1048576 })),
        }),
      ),
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
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(SubagentResourceSchema)) },
          },
        },
        '400': {
          description: 'The request was invalid.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '403': {
          description: 'The API key lacks the required permission.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '404': {
          description: 'The requested session or event was not found.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '409': {
          description: 'The request conflicted with the current session state.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '500': {
          description: 'An internal error occurred.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({
          session_id: Type.String({ minLength: 0, maxLength: 1048576 }),
          subagent_id: Type.String({ minLength: 0, maxLength: 1048576 }),
        }),
      ),
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
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(SessionItemListResourceSchema)),
            },
          },
        },
        '400': {
          description: 'The request was invalid.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '403': {
          description: 'The API key lacks the required permission.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '404': {
          description: 'The requested session or event was not found.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '409': {
          description: 'The request conflicted with the current session state.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '500': {
          description: 'An internal error occurred.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({
          session_id: Type.String({ minLength: 0, maxLength: 1048576 }),
          subagent_id: Type.String({ minLength: 0, maxLength: 1048576 }),
        }),
      ),
    ),
    validator(
      'query',
      toStandardSchemaV1(
        Type.Object({
          limit: Type.Optional(
            Codec(
              Type.Refine(
                Type.Refine(
                  Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '20' }),
                  (value) => Number(value) >= 1,
                  () => 'must be >= 1',
                ),
                (value) => Number(value) <= 100,
                () => 'must be <= 100',
              ),
            )
              .Decode((value) => Number(value))
              .Encode((value) => String(value)),
          ),
          order: Type.Optional(Type.Intersect([ListOrderParamSchema], { default: 'desc' })),
          after: Type.Optional(Type.String({ minLength: 0, maxLength: 1048576 })),
        }),
      ),
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
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(SessionTurnListResourceSchema)),
            },
          },
        },
        '400': {
          description: 'The request was invalid.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '403': {
          description: 'The API key lacks the required permission.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '404': {
          description: 'The requested session or event was not found.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '409': {
          description: 'The request conflicted with the current session state.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '500': {
          description: 'An internal error occurred.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({
          session_id: Type.String({ minLength: 0, maxLength: 1048576 }),
          subagent_id: Type.String({ minLength: 0, maxLength: 1048576 }),
        }),
      ),
    ),
    validator(
      'query',
      toStandardSchemaV1(
        Type.Object({
          limit: Type.Optional(
            Codec(
              Type.Refine(
                Type.Refine(
                  Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '20' }),
                  (value) => Number(value) >= 1,
                  () => 'must be >= 1',
                ),
                (value) => Number(value) <= 100,
                () => 'must be <= 100',
              ),
            )
              .Decode((value) => Number(value))
              .Encode((value) => String(value)),
          ),
          order: Type.Optional(Type.Intersect([ListOrderParamSchema], { default: 'desc' })),
          after: Type.Optional(Type.String({ minLength: 0, maxLength: 1048576 })),
        }),
      ),
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
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(TurnResourceSchema)) },
          },
        },
        '400': {
          description: 'The request was invalid.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '403': {
          description: 'The API key lacks the required permission.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '404': {
          description: 'The requested session or event was not found.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '409': {
          description: 'The request conflicted with the current session state.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '500': {
          description: 'An internal error occurred.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({
          session_id: Type.String({ minLength: 0, maxLength: 1048576 }),
          subagent_id: Type.String({ minLength: 0, maxLength: 1048576 }),
          turn_id: Type.String({ minLength: 0, maxLength: 1048576 }),
        }),
      ),
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
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(SessionItemListResourceSchema)),
            },
          },
        },
        '400': {
          description: 'The request was invalid.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '403': {
          description: 'The API key lacks the required permission.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '404': {
          description: 'The requested session or event was not found.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '409': {
          description: 'The request conflicted with the current session state.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '500': {
          description: 'An internal error occurred.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({
          session_id: Type.String({ minLength: 0, maxLength: 1048576 }),
          subagent_id: Type.String({ minLength: 0, maxLength: 1048576 }),
          turn_id: Type.String({ minLength: 0, maxLength: 1048576 }),
        }),
      ),
    ),
    validator(
      'query',
      toStandardSchemaV1(
        Type.Object({
          limit: Type.Optional(
            Codec(
              Type.Refine(
                Type.Refine(
                  Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '20' }),
                  (value) => Number(value) >= 1,
                  () => 'must be >= 1',
                ),
                (value) => Number(value) <= 100,
                () => 'must be <= 100',
              ),
            )
              .Decode((value) => Number(value))
              .Encode((value) => String(value)),
          ),
          order: Type.Optional(Type.Intersect([ListOrderParamSchema], { default: 'desc' })),
          after: Type.Optional(Type.String({ minLength: 0, maxLength: 1048576 })),
        }),
      ),
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
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(AgentListResourceSchema)) },
          },
        },
        '400': {
          description: 'The request was invalid.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '403': {
          description: 'The API key lacks the required permission.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '404': {
          description: 'The requested session or event was not found.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '409': {
          description: 'The request conflicted with the current session state.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '500': {
          description: 'An internal error occurred.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
      },
    }),
    validator(
      'query',
      toStandardSchemaV1(
        Type.Object({
          limit: Type.Optional(
            Codec(
              Type.Refine(
                Type.Refine(
                  Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '20' }),
                  (value) => Number(value) >= 1,
                  () => 'must be >= 1',
                ),
                (value) => Number(value) <= 100,
                () => 'must be <= 100',
              ),
            )
              .Decode((value) => Number(value))
              .Encode((value) => String(value)),
          ),
          order: Type.Optional(Type.Intersect([ListOrderParamSchema], { default: 'desc' })),
          after: Type.Optional(Type.String({ minLength: 0, maxLength: 1048576 })),
        }),
      ),
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
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(AgentResourceSchema)) },
          },
        },
        '400': {
          description: 'The request was invalid.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '403': {
          description: 'The API key lacks the required permission.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '404': {
          description: 'The requested session or event was not found.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '409': {
          description: 'The request conflicted with the current session state.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '500': {
          description: 'An internal error occurred.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
      },
    }),
    validator('json', toStandardSchemaV1(CreateAgentParamsSchema)),
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
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(AgentResourceSchema)) },
          },
        },
        '400': {
          description: 'The request was invalid.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '403': {
          description: 'The API key lacks the required permission.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '404': {
          description: 'The requested session or event was not found.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '409': {
          description: 'The request conflicted with the current session state.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '500': {
          description: 'An internal error occurred.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({ agent_id: Type.String({ minLength: 0, maxLength: 1048576 }) }),
      ),
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
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(AgentResourceSchema)) },
          },
        },
        '400': {
          description: 'The request was invalid.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '403': {
          description: 'The API key lacks the required permission.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '404': {
          description: 'The requested session or event was not found.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '409': {
          description: 'The request conflicted with the current session state.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '500': {
          description: 'An internal error occurred.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({ agent_id: Type.String({ minLength: 0, maxLength: 1048576 }) }),
      ),
    ),
    validator('json', toStandardSchemaV1(UpdateAgentParamsSchema)),
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
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(DeletedAgentResourceSchema)),
            },
          },
        },
        '400': {
          description: 'The request was invalid.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '403': {
          description: 'The API key lacks the required permission.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '404': {
          description: 'The requested session or event was not found.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '409': {
          description: 'The request conflicted with the current session state.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '500': {
          description: 'An internal error occurred.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({ agent_id: Type.String({ minLength: 0, maxLength: 1048576 }) }),
      ),
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
            'application/json': {
              schema: resolver(toStandardSchemaV1(EnvironmentTemplateListResourceSchema)),
            },
          },
        },
        '400': {
          description: 'The request was invalid.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '403': {
          description: 'The API key lacks the required management permission.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '404': {
          description: 'The requested environment definition was not found.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '500': {
          description: 'An internal error occurred.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
      },
    }),
    validator(
      'query',
      toStandardSchemaV1(
        Type.Object({
          limit: Type.Optional(
            Codec(
              Type.Refine(
                Type.Refine(
                  Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '20' }),
                  (value) => Number(value) >= 1,
                  () => 'must be >= 1',
                ),
                (value) => Number(value) <= 100,
                () => 'must be <= 100',
              ),
            )
              .Decode((value) => Number(value))
              .Encode((value) => String(value)),
          ),
          order: Type.Optional(Type.Intersect([ListOrderParamSchema], { default: 'desc' })),
          after: Type.Optional(Type.String({ minLength: 0, maxLength: 1048576 })),
        }),
      ),
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
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(EnvironmentTemplateResourceSchema)),
            },
          },
        },
        '400': {
          description: 'The request was invalid.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '403': {
          description: 'The API key lacks the required management permission.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '404': {
          description: 'The requested environment definition was not found.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '500': {
          description: 'An internal error occurred.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
      },
    }),
    validator('json', toStandardSchemaV1(CreateEnvironmentTemplateParamsSchema)),
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
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(EnvironmentTemplateResourceSchema)),
            },
          },
        },
        '400': {
          description: 'The request was invalid.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '403': {
          description: 'The API key lacks the required management permission.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '404': {
          description: 'The requested environment definition was not found.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '500': {
          description: 'An internal error occurred.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({ environment_template_id: Type.String({ minLength: 0, maxLength: 1048576 }) }),
      ),
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
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(EnvironmentTemplateResourceSchema)),
            },
          },
        },
        '400': {
          description: 'The request was invalid.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '403': {
          description: 'The API key lacks the required management permission.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '404': {
          description: 'The requested environment definition was not found.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '409': {
          description: 'The request conflicted with the current environment state.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '500': {
          description: 'An internal error occurred.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({ environment_template_id: Type.String({ minLength: 0, maxLength: 1048576 }) }),
      ),
    ),
    validator('json', toStandardSchemaV1(UpdateEnvironmentTemplateParamsSchema)),
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
            'application/json': {
              schema: resolver(toStandardSchemaV1(DeletedEnvironmentTemplateResourceSchema)),
            },
          },
        },
        '400': {
          description: 'The request was invalid.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '403': {
          description: 'The API key lacks the required management permission.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '404': {
          description: 'The requested environment definition was not found.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '409': {
          description: 'The request conflicted with the current environment state.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '500': {
          description: 'An internal error occurred.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({ environment_template_id: Type.String({ minLength: 0, maxLength: 1048576 }) }),
      ),
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
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(SessionListResourceSchema)) },
          },
        },
        '400': {
          description: 'The request was invalid.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '403': {
          description: 'The API key lacks the required permission.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '404': {
          description: 'The requested session or event was not found.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '409': {
          description: 'The request conflicted with the current session state.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '500': {
          description: 'An internal error occurred.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
      },
    }),
    validator(
      'query',
      toStandardSchemaV1(
        Type.Object({
          limit: Type.Optional(
            Codec(
              Type.Refine(
                Type.Refine(
                  Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '20' }),
                  (value) => Number(value) >= 1,
                  () => 'must be >= 1',
                ),
                (value) => Number(value) <= 100,
                () => 'must be <= 100',
              ),
            )
              .Decode((value) => Number(value))
              .Encode((value) => String(value)),
          ),
          order: Type.Optional(Type.Intersect([ListOrderParamSchema], { default: 'desc' })),
          after: Type.Optional(Type.String({ minLength: 0, maxLength: 1048576 })),
          agent_id: Type.Optional(Type.String({ minLength: 0, maxLength: 1048576 })),
          metadata: Type.Optional(
            Type.Record(Type.String(), Type.String({ minLength: 0, maxLength: 512 }), {
              minProperties: 0,
              maxProperties: 16,
              propertyNames: Type.String({ minLength: 1, maxLength: 64 }),
            }),
          ),
        }),
      ),
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
            'application/json': { schema: resolver(toStandardSchemaV1(SessionResourceSchema)) },
            'text/event-stream': { schema: resolver(toStandardSchemaV1(SessionEventSchema)) },
          },
        },
        '400': {
          description: 'The request was invalid.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '403': {
          description: 'The API key lacks the required permission.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '404': {
          description: 'The requested session or event was not found.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '409': {
          description: 'The request conflicted with the current session state.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '429': {
          description:
            'The Files API rate limit for your user has been exceeded. This status also applies to the endpoint rate limit.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '500': {
          description: 'An internal error occurred.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
      },
    }),
    validator('json', toStandardSchemaV1(CreateAgentSessionParamsSchema)),
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
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(SessionResourceSchema)) },
          },
        },
        '400': {
          description: 'The request was invalid.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '403': {
          description: 'The API key lacks the required permission.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '404': {
          description: 'The requested session or event was not found.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '409': {
          description: 'The request conflicted with the current session state.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '500': {
          description: 'An internal error occurred.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({ session_id: Type.String({ minLength: 0, maxLength: 1048576 }) }),
      ),
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
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(SessionResourceSchema)) },
          },
        },
        '400': {
          description: 'The request was invalid.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '403': {
          description: 'The API key lacks the required permission.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '404': {
          description: 'The requested session or event was not found.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '409': {
          description: 'The request conflicted with the current session state.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '500': {
          description: 'An internal error occurred.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({ session_id: Type.String({ minLength: 0, maxLength: 1048576 }) }),
      ),
    ),
    validator('json', toStandardSchemaV1(UpdateAgentSessionParamsSchema)),
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
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(DeletedSessionResourceSchema)),
            },
          },
        },
        '400': {
          description: 'The request was invalid.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '403': {
          description: 'The API key lacks the required permission.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '404': {
          description: 'The requested session or event was not found.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '409': {
          description: 'The request conflicted with the current session state.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '500': {
          description: 'An internal error occurred.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({ session_id: Type.String({ minLength: 0, maxLength: 1048576 }) }),
      ),
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
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(SessionArtifactListResourceSchema)),
            },
          },
        },
        '400': {
          description: 'The request was invalid.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '403': {
          description: 'The API key lacks the required permission.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '404': {
          description: 'The requested session or event was not found.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '409': {
          description: 'The request conflicted with the current session state.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '500': {
          description: 'An internal error occurred.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({ session_id: Type.String({ minLength: 0, maxLength: 1048576 }) }),
      ),
    ),
    validator(
      'query',
      toStandardSchemaV1(
        Type.Object({
          limit: Type.Optional(
            Codec(
              Type.Refine(
                Type.Refine(
                  Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '20' }),
                  (value) => Number(value) >= 1,
                  () => 'must be >= 1',
                ),
                (value) => Number(value) <= 100,
                () => 'must be <= 100',
              ),
            )
              .Decode((value) => Number(value))
              .Encode((value) => String(value)),
          ),
          order: Type.Optional(Type.Intersect([ListOrderParamSchema], { default: 'desc' })),
          after: Type.Optional(Type.String({ minLength: 0, maxLength: 1048576 })),
          environment_id: Type.Optional(
            Type.Union([Type.String({ minLength: 0, maxLength: 1048576 }), Type.Null()]),
          ),
        }),
      ),
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
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(SessionArtifactResourceSchema)),
            },
          },
        },
        '400': {
          description: 'The request was invalid.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '403': {
          description: 'The API key lacks the required permission.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '404': {
          description: 'The requested session or event was not found.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '409': {
          description: 'The request conflicted with the current session state.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '500': {
          description: 'An internal error occurred.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({
          session_id: Type.String({ minLength: 0, maxLength: 1048576 }),
          artifact_id: Type.String({ minLength: 0, maxLength: 1048576 }),
        }),
      ),
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
            'application/json': {
              schema: resolver(toStandardSchemaV1(DeletedSessionArtifactResourceSchema)),
            },
          },
        },
        '400': {
          description: 'The request was invalid.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '403': {
          description: 'The API key lacks the required permission.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '404': {
          description: 'The requested session or event was not found.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '409': {
          description: 'The request conflicted with the current session state.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '500': {
          description: 'An internal error occurred.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({
          session_id: Type.String({ minLength: 0, maxLength: 1048576 }),
          artifact_id: Type.String({ minLength: 0, maxLength: 1048576 }),
        }),
      ),
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
          content: {
            'application/octet-stream': { schema: resolver(toStandardSchemaV1(Type.String())) },
          },
        },
        '400': {
          description: 'The request was invalid.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '403': {
          description: 'The API key lacks the required permission.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '404': {
          description: 'The requested session or event was not found.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '409': {
          description: 'The request conflicted with the current session state.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '500': {
          description: 'An internal error occurred.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({
          session_id: Type.String({ minLength: 0, maxLength: 1048576 }),
          artifact_id: Type.String({ minLength: 0, maxLength: 1048576 }),
        }),
      ),
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
          content: {
            'text/event-stream': { schema: resolver(toStandardSchemaV1(SessionEventSchema)) },
          },
        },
        '400': {
          description: 'The request was invalid.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '403': {
          description: 'The API key lacks the required permission.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '404': {
          description: 'The requested session or event was not found.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '409': {
          description: 'The request conflicted with the current session state.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '500': {
          description: 'An internal error occurred.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({ session_id: Type.String({ minLength: 0, maxLength: 1048576 }) }),
      ),
    ),
    validator(
      'query',
      toStandardSchemaV1(
        Type.Object({
          include_obfuscation: Type.Optional(
            Codec(
              Type.String({
                pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
                default: 'true',
              }),
            )
              .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
              .Encode((value) => (value ? 'true' : 'false')),
          ),
        }),
      ),
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
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '403': {
          description: 'The API key lacks the required permission.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '404': {
          description: 'The requested session or event was not found.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '409': {
          description: 'The request conflicted with the current session state.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '500': {
          description: 'An internal error occurred.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({ session_id: Type.String({ minLength: 0, maxLength: 1048576 }) }),
      ),
    ),
    validator(
      'header',
      toStandardSchemaV1(
        Type.Object({
          'idempotency-key': Type.Optional(Type.String({ minLength: 1, maxLength: 256 })),
        }),
      ),
    ),
    validator('json', toStandardSchemaV1(CreateSessionEventsParamsSchema)),
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
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(SessionItemListResourceSchema)),
            },
          },
        },
        '400': {
          description: 'The request was invalid.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '403': {
          description: 'The API key lacks the required permission.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '404': {
          description: 'The requested session or event was not found.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '409': {
          description: 'The request conflicted with the current session state.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '500': {
          description: 'An internal error occurred.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({ session_id: Type.String({ minLength: 0, maxLength: 1048576 }) }),
      ),
    ),
    validator(
      'query',
      toStandardSchemaV1(
        Type.Object({
          limit: Type.Optional(
            Codec(
              Type.Refine(
                Type.Refine(
                  Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '20' }),
                  (value) => Number(value) >= 1,
                  () => 'must be >= 1',
                ),
                (value) => Number(value) <= 100,
                () => 'must be <= 100',
              ),
            )
              .Decode((value) => Number(value))
              .Encode((value) => String(value)),
          ),
          order: Type.Optional(Type.Intersect([ListOrderParamSchema], { default: 'desc' })),
          after: Type.Optional(Type.String({ minLength: 0, maxLength: 1048576 })),
        }),
      ),
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
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(SessionTraceListResourceSchema)),
            },
          },
        },
        '400': {
          description: 'The request was invalid.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '403': {
          description: 'The API key lacks the required permission.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '404': {
          description: 'The requested session or event was not found.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '409': {
          description: 'The request conflicted with the current session state.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '500': {
          description: 'An internal error occurred.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({ session_id: Type.String({ minLength: 0, maxLength: 1048576 }) }),
      ),
    ),
    validator(
      'query',
      toStandardSchemaV1(
        Type.Object({
          limit: Type.Optional(
            Codec(
              Type.Refine(
                Type.Refine(
                  Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '20' }),
                  (value) => Number(value) >= 1,
                  () => 'must be >= 1',
                ),
                (value) => Number(value) <= 100,
                () => 'must be <= 100',
              ),
            )
              .Decode((value) => Number(value))
              .Encode((value) => String(value)),
          ),
          order: Type.Optional(Type.Intersect([ListOrderParamSchema], { default: 'desc' })),
          after: Type.Optional(Type.String({ minLength: 0, maxLength: 1048576 })),
        }),
      ),
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
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(SessionTurnListResourceSchema)),
            },
          },
        },
        '400': {
          description: 'The request was invalid.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '403': {
          description: 'The API key lacks the required permission.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '404': {
          description: 'The requested session or event was not found.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '409': {
          description: 'The request conflicted with the current session state.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '500': {
          description: 'An internal error occurred.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({ session_id: Type.String({ minLength: 0, maxLength: 1048576 }) }),
      ),
    ),
    validator(
      'query',
      toStandardSchemaV1(
        Type.Object({
          limit: Type.Optional(
            Codec(
              Type.Refine(
                Type.Refine(
                  Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '20' }),
                  (value) => Number(value) >= 1,
                  () => 'must be >= 1',
                ),
                (value) => Number(value) <= 100,
                () => 'must be <= 100',
              ),
            )
              .Decode((value) => Number(value))
              .Encode((value) => String(value)),
          ),
          order: Type.Optional(Type.Intersect([ListOrderParamSchema], { default: 'desc' })),
          after: Type.Optional(Type.String({ minLength: 0, maxLength: 1048576 })),
        }),
      ),
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
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(TurnResourceSchema)) },
          },
        },
        '400': {
          description: 'The request was invalid.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '403': {
          description: 'The API key lacks the required permission.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '404': {
          description: 'The requested session or event was not found.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '409': {
          description: 'The request conflicted with the current session state.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '500': {
          description: 'An internal error occurred.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({
          session_id: Type.String({ minLength: 0, maxLength: 1048576 }),
          turn_id: Type.String({ minLength: 0, maxLength: 1048576 }),
        }),
      ),
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
          content: {
            'application/json': {
              schema: resolver(toStandardSchemaV1(SessionItemListResourceSchema)),
            },
          },
        },
        '400': {
          description: 'The request was invalid.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '401': {
          description: 'Authentication or project context was missing.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '403': {
          description: 'The API key lacks the required permission.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '404': {
          description: 'The requested session or event was not found.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '409': {
          description: 'The request conflicted with the current session state.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '429': {
          description: "The request exceeded this endpoint's rate limit.",
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '500': {
          description: 'An internal error occurred.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
        '503': {
          description: 'The service is temporarily unavailable.',
          content: {
            'application/json': { schema: resolver(toStandardSchemaV1(ErrorResponse2Schema)) },
          },
        },
      },
    }),
    validator(
      'param',
      toStandardSchemaV1(
        Type.Object({
          session_id: Type.String({ minLength: 0, maxLength: 1048576 }),
          turn_id: Type.String({ minLength: 0, maxLength: 1048576 }),
        }),
      ),
    ),
    validator(
      'query',
      toStandardSchemaV1(
        Type.Object({
          limit: Type.Optional(
            Codec(
              Type.Refine(
                Type.Refine(
                  Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '20' }),
                  (value) => Number(value) >= 1,
                  () => 'must be >= 1',
                ),
                (value) => Number(value) <= 100,
                () => 'must be <= 100',
              ),
            )
              .Decode((value) => Number(value))
              .Encode((value) => String(value)),
          ),
          order: Type.Optional(Type.Intersect([ListOrderParamSchema], { default: 'desc' })),
          after: Type.Optional(Type.String({ minLength: 0, maxLength: 1048576 })),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
