import { t, type UnwrapSchema } from 'elysia'
import {
  AutomationInvocationResourceSchema,
  AutomationResourceSchema,
  EnvironmentTypeParamSchema,
  ListOrderParamSchema,
  SubagentResourceSchema,
} from '../../components/schemas'

export const AgentsModel = {
  listAgentAutomationsQuery: t.Object({
    limit: t.Optional(t.Integer({ format: 'int64', minimum: 1, maximum: 100, default: 20 })),
    order: t.Optional(ListOrderParamSchema),
    after: t.Optional(t.String({ minLength: 0, maxLength: 1048576 })),
    session_id: t.Optional(t.String({ minLength: 0, maxLength: 1048576 })),
  }),
  listAgentAutomationsResponse200: t.Object(
    {
      object: t.Literal('list', {
        description: 'The object type, which is always `list`.',
        default: 'list',
      }),
      data: t.Array(AutomationResourceSchema, {
        minItems: 0,
        maxItems: 2000,
        description: 'The resources returned in this page, in the requested sort order.',
      }),
      first_id: t.Union([
        t.String({
          minLength: 0,
          description: 'The ID of the first resource in `data`, or `null` if the page is empty.',
        }),
        t.Null(),
      ]),
      last_id: t.Union([
        t.String({
          minLength: 0,
          description:
            'The ID of the last resource in `data`, or `null` if the page is empty. Pass this as `after` with the same order and filters.',
        }),
        t.Null(),
      ]),
      has_more: t.Boolean({
        description: 'Whether there are more resources to retrieve after this page.',
      }),
    },
    {
      additionalProperties: false,
      description: 'A page of Agents API resources, with IDs for retrieving additional pages.',
    },
  ),
  getAgentAutomationParams: t.Object({
    automation_id: t.String({ minLength: 0, maxLength: 1048576 }),
  }),
  updateAgentAutomationParams: t.Object({
    automation_id: t.String({ minLength: 0, maxLength: 1048576 }),
  }),
  deleteAgentAutomationParams: t.Object({
    automation_id: t.String({ minLength: 0, maxLength: 1048576 }),
  }),
  pauseAgentAutomationParams: t.Object({
    automation_id: t.String({ minLength: 0, maxLength: 1048576 }),
  }),
  resumeAgentAutomationParams: t.Object({
    automation_id: t.String({ minLength: 0, maxLength: 1048576 }),
  }),
  listAgentAutomationInvocationsParams: t.Object({
    automation_id: t.String({ minLength: 0, maxLength: 1048576 }),
  }),
  listAgentAutomationInvocationsQuery: t.Object({
    limit: t.Optional(t.Integer({ format: 'int64', minimum: 1, maximum: 100, default: 20 })),
    order: t.Optional(ListOrderParamSchema),
    after: t.Optional(t.String({ minLength: 0, maxLength: 1048576 })),
  }),
  listAgentAutomationInvocationsResponse200: t.Object(
    {
      object: t.Literal('list', {
        description: 'The object type, which is always `list`.',
        default: 'list',
      }),
      data: t.Array(AutomationInvocationResourceSchema, {
        minItems: 0,
        maxItems: 2000,
        description: 'The resources returned in this page, in the requested sort order.',
      }),
      first_id: t.Union([
        t.String({
          minLength: 0,
          description: 'The ID of the first resource in `data`, or `null` if the page is empty.',
        }),
        t.Null(),
      ]),
      last_id: t.Union([
        t.String({
          minLength: 0,
          description:
            'The ID of the last resource in `data`, or `null` if the page is empty. Pass this as `after` with the same order and filters.',
        }),
        t.Null(),
      ]),
      has_more: t.Boolean({
        description: 'Whether there are more resources to retrieve after this page.',
      }),
    },
    {
      additionalProperties: false,
      description: 'A page of Agents API resources, with IDs for retrieving additional pages.',
    },
  ),
  createAgentAutomationInvocationParams: t.Object({
    automation_id: t.String({ minLength: 0, maxLength: 1048576 }),
  }),
  getAgentAutomationInvocationParams: t.Object({
    automation_id: t.String({ minLength: 0, maxLength: 1048576 }),
    invocation_id: t.String({ minLength: 0, maxLength: 1048576 }),
  }),
  listAgentEnvironmentsQuery: t.Object({
    limit: t.Optional(t.Integer({ format: 'int64', minimum: 1, maximum: 100, default: 20 })),
    order: t.Optional(ListOrderParamSchema),
    after: t.Optional(t.String({ minLength: 0, maxLength: 1048576 })),
    type: t.Optional(EnvironmentTypeParamSchema),
  }),
  createAgentEnvironmentHeaders: t.Object({
    'Idempotency-Key': t.Optional(t.String({ minLength: 1, maxLength: 256 })),
  }),
  retrieveAgentEnvironmentParams: t.Object({
    environment_id: t.String({ minLength: 0, maxLength: 1048576 }),
  }),
  listAgentEnvironmentFilesParams: t.Object({
    environment_id: t.String({ minLength: 0, maxLength: 1048576 }),
  }),
  listAgentEnvironmentFilesQuery: t.Object({
    path: t.Optional(t.Union([t.String({ minLength: 0, maxLength: 1048576 }), t.Null()])),
    limit: t.Optional(
      t.Union([t.Integer({ format: 'int64', minimum: 1, maximum: 100 }), t.Null()]),
    ),
    order: t.Optional(ListOrderParamSchema),
    page: t.Optional(t.String({ minLength: 0, maxLength: 1048576 })),
  }),
  createAgentEnvironmentFileParams: t.Object({
    environment_id: t.String({ minLength: 0, maxLength: 1048576 }),
  }),
  listAgentSessionSubagentsParams: t.Object({
    session_id: t.String({ minLength: 0, maxLength: 1048576 }),
  }),
  listAgentSessionSubagentsQuery: t.Object({
    limit: t.Optional(t.Integer({ format: 'int64', minimum: 1, maximum: 100, default: 20 })),
    order: t.Optional(ListOrderParamSchema),
    after: t.Optional(t.String({ minLength: 0, maxLength: 1048576 })),
  }),
  listAgentSessionSubagentsResponse200: t.Object(
    {
      object: t.Literal('list', {
        description: 'The object type, which is always `list`.',
        default: 'list',
      }),
      data: t.Array(SubagentResourceSchema, {
        minItems: 0,
        maxItems: 2000,
        description: 'The resources returned in this page, in the requested sort order.',
      }),
      first_id: t.Union([
        t.String({
          minLength: 0,
          description: 'The ID of the first resource in `data`, or `null` if the page is empty.',
        }),
        t.Null(),
      ]),
      last_id: t.Union([
        t.String({
          minLength: 0,
          description:
            'The ID of the last resource in `data`, or `null` if the page is empty. Pass this as `after` with the same order and filters.',
        }),
        t.Null(),
      ]),
      has_more: t.Boolean({
        description: 'Whether there are more resources to retrieve after this page.',
      }),
    },
    {
      additionalProperties: false,
      description: 'A page of Agents API resources, with IDs for retrieving additional pages.',
    },
  ),
  retrieveAgentSessionSubagentParams: t.Object({
    session_id: t.String({ minLength: 0, maxLength: 1048576 }),
    subagent_id: t.String({ minLength: 0, maxLength: 1048576 }),
  }),
  listAgentSessionSubagentItemsParams: t.Object({
    session_id: t.String({ minLength: 0, maxLength: 1048576 }),
    subagent_id: t.String({ minLength: 0, maxLength: 1048576 }),
  }),
  listAgentSessionSubagentItemsQuery: t.Object({
    limit: t.Optional(t.Integer({ format: 'int64', minimum: 1, maximum: 100, default: 20 })),
    order: t.Optional(ListOrderParamSchema),
    after: t.Optional(t.String({ minLength: 0, maxLength: 1048576 })),
  }),
  listAgentSessionSubagentTurnsParams: t.Object({
    session_id: t.String({ minLength: 0, maxLength: 1048576 }),
    subagent_id: t.String({ minLength: 0, maxLength: 1048576 }),
  }),
  listAgentSessionSubagentTurnsQuery: t.Object({
    limit: t.Optional(t.Integer({ format: 'int64', minimum: 1, maximum: 100, default: 20 })),
    order: t.Optional(ListOrderParamSchema),
    after: t.Optional(t.String({ minLength: 0, maxLength: 1048576 })),
  }),
  retrieveAgentSessionSubagentTurnParams: t.Object({
    session_id: t.String({ minLength: 0, maxLength: 1048576 }),
    subagent_id: t.String({ minLength: 0, maxLength: 1048576 }),
    turn_id: t.String({ minLength: 0, maxLength: 1048576 }),
  }),
  listAgentSessionSubagentTurnItemsParams: t.Object({
    session_id: t.String({ minLength: 0, maxLength: 1048576 }),
    subagent_id: t.String({ minLength: 0, maxLength: 1048576 }),
    turn_id: t.String({ minLength: 0, maxLength: 1048576 }),
  }),
  listAgentSessionSubagentTurnItemsQuery: t.Object({
    limit: t.Optional(t.Integer({ format: 'int64', minimum: 1, maximum: 100, default: 20 })),
    order: t.Optional(ListOrderParamSchema),
    after: t.Optional(t.String({ minLength: 0, maxLength: 1048576 })),
  }),
  listAgentsQuery: t.Object({
    limit: t.Optional(t.Integer({ format: 'int64', minimum: 1, maximum: 100, default: 20 })),
    order: t.Optional(ListOrderParamSchema),
    after: t.Optional(t.String({ minLength: 0, maxLength: 1048576 })),
  }),
  retrieveAgentParams: t.Object({ agent_id: t.String({ minLength: 0, maxLength: 1048576 }) }),
  updateAgentParams: t.Object({ agent_id: t.String({ minLength: 0, maxLength: 1048576 }) }),
  deleteAgentParams: t.Object({ agent_id: t.String({ minLength: 0, maxLength: 1048576 }) }),
  listAgentEnvironmentTemplatesQuery: t.Object({
    limit: t.Optional(t.Integer({ format: 'int64', minimum: 1, maximum: 100, default: 20 })),
    order: t.Optional(ListOrderParamSchema),
    after: t.Optional(t.String({ minLength: 0, maxLength: 1048576 })),
  }),
  retrieveAgentEnvironmentTemplateParams: t.Object({
    environment_template_id: t.String({ minLength: 0, maxLength: 1048576 }),
  }),
  updateAgentEnvironmentTemplateParams: t.Object({
    environment_template_id: t.String({ minLength: 0, maxLength: 1048576 }),
  }),
  deleteAgentEnvironmentTemplateParams: t.Object({
    environment_template_id: t.String({ minLength: 0, maxLength: 1048576 }),
  }),
  listAgentSessionsQuery: t.Object({
    limit: t.Optional(t.Integer({ format: 'int64', minimum: 1, maximum: 100, default: 20 })),
    order: t.Optional(ListOrderParamSchema),
    after: t.Optional(t.String({ minLength: 0, maxLength: 1048576 })),
    agent_id: t.Optional(t.String({ minLength: 0, maxLength: 1048576 })),
    metadata: t.Optional(
      t.Record(t.String(), t.String({ minLength: 0, maxLength: 512 }), {
        minProperties: 0,
        maxProperties: 16,
      }),
    ),
  }),
  retrieveAgentSessionParams: t.Object({
    session_id: t.String({ minLength: 0, maxLength: 1048576 }),
  }),
  updateAgentSessionParams: t.Object({
    session_id: t.String({ minLength: 0, maxLength: 1048576 }),
  }),
  deleteAgentSessionParams: t.Object({
    session_id: t.String({ minLength: 0, maxLength: 1048576 }),
  }),
  listAgentSessionArtifactsParams: t.Object({
    session_id: t.String({ minLength: 0, maxLength: 1048576 }),
  }),
  listAgentSessionArtifactsQuery: t.Object({
    limit: t.Optional(t.Integer({ format: 'int64', minimum: 1, maximum: 100, default: 20 })),
    order: t.Optional(ListOrderParamSchema),
    after: t.Optional(t.String({ minLength: 0, maxLength: 1048576 })),
    environment_id: t.Optional(t.Union([t.String({ minLength: 0, maxLength: 1048576 }), t.Null()])),
  }),
  retrieveAgentSessionArtifactParams: t.Object({
    session_id: t.String({ minLength: 0, maxLength: 1048576 }),
    artifact_id: t.String({ minLength: 0, maxLength: 1048576 }),
  }),
  deleteAgentSessionArtifactParams: t.Object({
    session_id: t.String({ minLength: 0, maxLength: 1048576 }),
    artifact_id: t.String({ minLength: 0, maxLength: 1048576 }),
  }),
  retrieveAgentSessionArtifactContentParams: t.Object({
    session_id: t.String({ minLength: 0, maxLength: 1048576 }),
    artifact_id: t.String({ minLength: 0, maxLength: 1048576 }),
  }),
  listAgentSessionEventsParams: t.Object({
    session_id: t.String({ minLength: 0, maxLength: 1048576 }),
  }),
  listAgentSessionEventsQuery: t.Object({
    include_obfuscation: t.Optional(t.Boolean({ default: true })),
  }),
  createAgentSessionEventsParams: t.Object({
    session_id: t.String({ minLength: 0, maxLength: 1048576 }),
  }),
  createAgentSessionEventsHeaders: t.Object({
    'Idempotency-Key': t.Optional(t.String({ minLength: 1, maxLength: 256 })),
  }),
  listAgentSessionItemsParams: t.Object({
    session_id: t.String({ minLength: 0, maxLength: 1048576 }),
  }),
  listAgentSessionItemsQuery: t.Object({
    limit: t.Optional(t.Integer({ format: 'int64', minimum: 1, maximum: 100, default: 20 })),
    order: t.Optional(ListOrderParamSchema),
    after: t.Optional(t.String({ minLength: 0, maxLength: 1048576 })),
  }),
  listAgentSessionTracesParams: t.Object({
    session_id: t.String({ minLength: 0, maxLength: 1048576 }),
  }),
  listAgentSessionTracesQuery: t.Object({
    limit: t.Optional(t.Integer({ format: 'int64', minimum: 1, maximum: 100, default: 20 })),
    order: t.Optional(ListOrderParamSchema),
    after: t.Optional(t.String({ minLength: 0, maxLength: 1048576 })),
  }),
  listAgentSessionTurnsParams: t.Object({
    session_id: t.String({ minLength: 0, maxLength: 1048576 }),
  }),
  listAgentSessionTurnsQuery: t.Object({
    limit: t.Optional(t.Integer({ format: 'int64', minimum: 1, maximum: 100, default: 20 })),
    order: t.Optional(ListOrderParamSchema),
    after: t.Optional(t.String({ minLength: 0, maxLength: 1048576 })),
  }),
  retrieveAgentSessionTurnParams: t.Object({
    session_id: t.String({ minLength: 0, maxLength: 1048576 }),
    turn_id: t.String({ minLength: 0, maxLength: 1048576 }),
  }),
  listAgentSessionTurnItemsParams: t.Object({
    session_id: t.String({ minLength: 0, maxLength: 1048576 }),
    turn_id: t.String({ minLength: 0, maxLength: 1048576 }),
  }),
  listAgentSessionTurnItemsQuery: t.Object({
    limit: t.Optional(t.Integer({ format: 'int64', minimum: 1, maximum: 100, default: 20 })),
    order: t.Optional(ListOrderParamSchema),
    after: t.Optional(t.String({ minLength: 0, maxLength: 1048576 })),
  }),
} as const

export type AgentsModel = { [k in keyof typeof AgentsModel]: UnwrapSchema<(typeof AgentsModel)[k]> }
