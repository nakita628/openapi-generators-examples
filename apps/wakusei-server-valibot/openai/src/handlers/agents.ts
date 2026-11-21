import { os } from '@orpc/server'
import * as v from 'valibot'
import {
  AgentEnvironmentListResourceSchema,
  AgentListResourceSchema,
  AgentResourceSchema,
  AutomationInvocationResourceSchema,
  AutomationResourceSchema,
  AutomationTargetParamSchema,
  CompactionParamSchema,
  CreateAgentEnvironmentParamsSchema,
  CreateAgentParamsSchema,
  CreateAgentSessionParamsSchema,
  CreateAutomationParamsSchema,
  CreateEnvironmentTemplateParamsSchema,
  DeletedAgentResourceSchema,
  DeletedAutomationResourceSchema,
  DeletedEnvironmentTemplateResourceSchema,
  DeletedSessionArtifactResourceSchema,
  DeletedSessionResourceSchema,
  DesktopParamSchema,
  EnvironmentFileListResourceSchema,
  EnvironmentFileResourceSchema,
  EnvironmentPackagesParamSchema,
  EnvironmentTemplateListResourceSchema,
  EnvironmentTemplateResourceSchema,
  EnvironmentTypeParamSchema,
  ExperimentalConfigOverridesParamSchema,
  HostedEnvironmentFileParamSchema,
  HostedPluginParamSchema,
  HostedSkillParamSchema,
  ListOrderParamSchema,
  MultiAgentConfigCurrentParamSchema,
  NetworkPolicyParamSchema,
  PersistedAgentToolConfigParamSchema,
  PromptCacheOptionsParam2Schema,
  PublicEnvironmentResourceSchema,
  ReasoningParamSchema,
  ServiceTierParamSchema,
  SessionArtifactListResourceSchema,
  SessionArtifactResourceSchema,
  SessionBudgetControlParamsSchema,
  SessionInputParamSchema,
  SessionItemListResourceSchema,
  SessionListResourceSchema,
  SessionResourceSchema,
  SessionReviewParamSchema,
  SessionTraceListResourceSchema,
  SessionTurnListResourceSchema,
  SetupCommandParamSchema,
  SubagentResourceSchema,
  TextParamSchema,
  TurnResourceSchema,
  UpdateSessionAgentParamSchema,
} from '../components'

export const getAgentsAutomations = os
  .route({
    method: 'GET',
    path: '/agents/automations',
    tags: ['Agents'],
    summary: 'List automations',
    description: 'Lists project-owned automations, optionally filtered by target session.',
    successDescription: 'The automations.',
  })
  .input(
    v.object({
      limit: v.optional(
        v.optional(
          v.pipe(
            v.string(),
            v.regex(/^-?\d+$/),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(100n),
          ),
          '20',
        ),
      ),
      order: v.optional(v.optional(ListOrderParamSchema, 'desc')),
      after: v.optional(v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576))),
      session_id: v.optional(v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576))),
    }),
  )
  .output(
    v.pipe(
      v.strictObject({
        object: v.pipe(
          v.optional(v.literal('list'), 'list'),
          v.description('The object type, which is always `list`.'),
        ),
        data: v.pipe(
          v.pipe(v.array(AutomationResourceSchema), v.minLength(0), v.maxLength(2000)),
          v.description('The resources returned in this page, in the requested sort order.'),
        ),
        first_id: v.pipe(
          v.nullable(v.pipe(v.string(), v.minCodePoints(0))),
          v.description('The ID of the first resource in `data`, or `null` if the page is empty.'),
        ),
        last_id: v.pipe(
          v.nullable(v.pipe(v.string(), v.minCodePoints(0))),
          v.description(
            'The ID of the last resource in `data`, or `null` if the page is empty. Pass this as `after` with the same order and filters.',
          ),
        ),
        has_more: v.pipe(
          v.boolean(),
          v.description('Whether there are more resources to retrieve after this page.'),
        ),
      }),
      v.description('A page of Agents API resources, with IDs for retrieving additional pages.'),
    ),
  )
  .handler(async ({ input }) => {})

export const postAgentsAutomations = os
  .route({
    method: 'POST',
    path: '/agents/automations',
    tags: ['Agents'],
    summary: 'Create an automation',
    description: 'Saves an active automation without invoking it immediately.',
    successStatus: 201,
    successDescription: 'The created automation.',
  })
  .input(CreateAutomationParamsSchema)
  .output(AutomationResourceSchema)
  .handler(async ({ input }) => {})

export const getAgentsAutomationsAutomationId = os
  .route({
    method: 'GET',
    path: '/agents/automations/{automation_id}',
    tags: ['Agents'],
    summary: 'Get an automation',
    description: 'Retrieves a project-owned automation.',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({ automation_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)) }),
  )
  .output(AutomationResourceSchema)
  .handler(async ({ input }) => {})

export const postAgentsAutomationsAutomationId = os
  .route({
    method: 'POST',
    path: '/agents/automations/{automation_id}',
    tags: ['Agents'],
    summary: 'Update an automation',
    description: 'Updates supplied fields; target and metadata replace the whole field.',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({
      automation_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
      name: v.optional(v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(256))),
      target: v.optional(AutomationTargetParamSchema),
      metadata: v.optional(
        v.pipe(
          v.record(v.string(), v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(512))),
          v.description('Replaces all metadata; omit to leave unchanged.'),
        ),
      ),
      expression: v.optional(
        v.pipe(
          v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(256)),
          v.description('Only accepted for periodic automations.'),
        ),
      ),
      timezone: v.optional(
        v.pipe(
          v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(128)),
          v.description('Only accepted for periodic automations.'),
        ),
      ),
      run_at: v.optional(
        v.pipe(
          v.pipe(
            v.union([
              v.bigint(),
              v.pipe(v.number(), v.integer()),
              v.pipe(v.string(), v.regex(/^-?\d+$/)),
            ]),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
          ),
          v.description(
            'A future Unix timestamp in seconds; accepted only before a one-time scheduled invocation exists.',
          ),
        ),
      ),
    }),
  )
  .output(AutomationResourceSchema)
  .handler(async ({ input }) => {})

export const deleteAgentsAutomationsAutomationId = os
  .route({
    method: 'DELETE',
    path: '/agents/automations/{automation_id}',
    tags: ['Agents'],
    summary: 'Delete an automation',
    description:
      'Deletes the automation and prevents future invocations without deleting its target session.',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({ automation_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)) }),
  )
  .output(DeletedAutomationResourceSchema)
  .handler(async ({ input }) => {})

export const postAgentsAutomationsAutomationIdPause = os
  .route({
    method: 'POST',
    path: '/agents/automations/{automation_id}/pause',
    tags: ['Agents'],
    summary: 'Pause an automation',
    description: 'Pauses future scheduled delivery without stopping an active session.',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({ automation_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)) }),
  )
  .output(AutomationResourceSchema)
  .handler(async ({ input }) => {})

export const postAgentsAutomationsAutomationIdResume = os
  .route({
    method: 'POST',
    path: '/agents/automations/{automation_id}/resume',
    tags: ['Agents'],
    summary: 'Resume an automation',
    description:
      'Resumes scheduled delivery; one-time automations without a pending invocation require a future run_at.',
    successDescription: 'Successful response.',
  })
  .input(
    v.object({ automation_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)) }),
  )
  .output(AutomationResourceSchema)
  .handler(async ({ input }) => {})

export const getAgentsAutomationsAutomationIdInvocations = os
  .route({
    method: 'GET',
    path: '/agents/automations/{automation_id}/invocations',
    tags: ['Agents'],
    summary: 'List automation invocations',
    description: 'Lists delivery records for a project-owned automation.',
    successDescription: 'The invocation history.',
  })
  .input(
    v.object({
      automation_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
      limit: v.optional(
        v.optional(
          v.pipe(
            v.string(),
            v.regex(/^-?\d+$/),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(100n),
          ),
          '20',
        ),
      ),
      order: v.optional(v.optional(ListOrderParamSchema, 'desc')),
      after: v.optional(v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576))),
    }),
  )
  .output(
    v.pipe(
      v.strictObject({
        object: v.pipe(
          v.optional(v.literal('list'), 'list'),
          v.description('The object type, which is always `list`.'),
        ),
        data: v.pipe(
          v.pipe(v.array(AutomationInvocationResourceSchema), v.minLength(0), v.maxLength(2000)),
          v.description('The resources returned in this page, in the requested sort order.'),
        ),
        first_id: v.pipe(
          v.nullable(v.pipe(v.string(), v.minCodePoints(0))),
          v.description('The ID of the first resource in `data`, or `null` if the page is empty.'),
        ),
        last_id: v.pipe(
          v.nullable(v.pipe(v.string(), v.minCodePoints(0))),
          v.description(
            'The ID of the last resource in `data`, or `null` if the page is empty. Pass this as `after` with the same order and filters.',
          ),
        ),
        has_more: v.pipe(
          v.boolean(),
          v.description('Whether there are more resources to retrieve after this page.'),
        ),
      }),
      v.description('A page of Agents API resources, with IDs for retrieving additional pages.'),
    ),
  )
  .handler(async ({ input }) => {})

export const postAgentsAutomationsAutomationIdInvocations = os
  .route({
    method: 'POST',
    path: '/agents/automations/{automation_id}/invocations',
    tags: ['Agents'],
    summary: 'Invoke an automation',
    description: 'Queues a manual delivery without changing the saved schedule.',
    successDescription: 'The queued invocation.',
  })
  .input(
    v.object({ automation_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)) }),
  )
  .output(AutomationInvocationResourceSchema)
  .handler(async ({ input }) => {})

export const getAgentsAutomationsAutomationIdInvocationsInvocationId = os
  .route({
    method: 'GET',
    path: '/agents/automations/{automation_id}/invocations/{invocation_id}',
    tags: ['Agents'],
    summary: 'Get an automation invocation',
    description: 'Retrieves a delivery record for a project-owned automation.',
    successDescription: 'The invocation.',
  })
  .input(
    v.object({
      automation_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
      invocation_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
    }),
  )
  .output(AutomationInvocationResourceSchema)
  .handler(async ({ input }) => {})

export const getAgentsEnvironments = os
  .route({
    method: 'GET',
    path: '/agents/environments',
    tags: ['Agents'],
    summary: 'List agent environments',
    description:
      'Lists OpenAI-hosted environments owned by the authenticated principal. Requires access to the prewarming beta.',
    successDescription: 'A page of owned environments.',
  })
  .input(
    v.object({
      limit: v.optional(
        v.optional(
          v.pipe(
            v.string(),
            v.regex(/^-?\d+$/),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(100n),
          ),
          '20',
        ),
      ),
      order: v.optional(v.optional(ListOrderParamSchema, 'desc')),
      after: v.optional(v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576))),
      type: v.optional(EnvironmentTypeParamSchema),
    }),
  )
  .output(AgentEnvironmentListResourceSchema)
  .handler(async ({ input }) => {})

export const postAgentsEnvironments = os
  .route({
    method: 'POST',
    path: '/agents/environments',
    tags: ['Agents'],
    summary: 'Create an agent environment',
    description:
      'Creates an OpenAI-hosted environment before creating a session. Requires access to the prewarming beta.',
    successStatus: 201,
    successDescription: 'The created OpenAI-hosted environment.',
  })
  .input(CreateAgentEnvironmentParamsSchema)
  .output(PublicEnvironmentResourceSchema)
  .handler(async ({ input }) => {})

export const getAgentsEnvironmentsEnvironmentId = os
  .route({
    method: 'GET',
    path: '/agents/environments/{environment_id}',
    tags: ['Agents'],
    summary: 'Retrieve an agent environment',
    description:
      "Retrieves an execution environment's connection status and safe installed metadata. See [environment lifecycle](https://developers.openai.com/api/docs/guides/agents-api/environments/lifecycle).",
    successDescription: 'The requested environment.',
  })
  .input(
    v.object({ environment_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)) }),
  )
  .output(PublicEnvironmentResourceSchema)
  .handler(async ({ input }) => {})

export const getAgentsEnvironmentsEnvironmentIdFiles = os
  .route({
    method: 'GET',
    path: '/agents/environments/{environment_id}/files',
    tags: ['Agents'],
    summary: 'List agent environment files',
    description:
      'Lists live files on a connected execution environment with optional directory filtering and opaque cursor pagination. See [environment files](https://developers.openai.com/api/docs/guides/agents-api/environments/files).',
    successDescription: 'A page of live environment files.',
  })
  .input(
    v.object({
      environment_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
      path: v.optional(
        v.nullable(v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576))),
      ),
      limit: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => (input === 'null' ? null : input)),
          v.nullable(
            v.pipe(
              v.string(),
              v.regex(/^-?\d+$/),
              v.transform((input) => BigInt(input)),
              v.minValue(-9223372036854775808n),
              v.maxValue(9223372036854775807n),
              v.minValue(1n),
              v.maxValue(100n),
            ),
          ),
        ),
      ),
      order: v.optional(ListOrderParamSchema),
      page: v.optional(v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576))),
    }),
  )
  .output(EnvironmentFileListResourceSchema)
  .handler(async ({ input }) => {})

export const postAgentsEnvironmentsEnvironmentIdFiles = os
  .route({
    method: 'POST',
    path: '/agents/environments/{environment_id}/files',
    tags: ['Agents'],
    summary: 'Write an agent environment file',
    description:
      'Copies inline bytes or a Files API file into a connected execution environment, replacing an existing regular file at the same path. Upload between turns and wait for success before starting the next turn. See [environment files](https://developers.openai.com/api/docs/guides/agents-api/environments/files).',
    successStatus: 201,
    successDescription: 'The written live environment file.',
  })
  .input(
    v.object({ environment_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)) }),
  )
  .output(EnvironmentFileResourceSchema)
  .handler(async ({ input }) => {})

export const getAgentsSessionsSessionIdSubagents = os
  .route({
    method: 'GET',
    path: '/agents/sessions/{session_id}/subagents',
    tags: ['Agents'],
    summary: 'List session subagents',
    description:
      'Lists subagents in a session, including nested and closed subagents. See [subagent workflows](https://developers.openai.com/api/docs/guides/agents-api/multi-agent).',
    successDescription: 'The requested subagents.',
  })
  .input(
    v.object({
      session_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
      limit: v.optional(
        v.optional(
          v.pipe(
            v.string(),
            v.regex(/^-?\d+$/),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(100n),
          ),
          '20',
        ),
      ),
      order: v.optional(v.optional(ListOrderParamSchema, 'desc')),
      after: v.optional(v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576))),
    }),
  )
  .output(
    v.pipe(
      v.strictObject({
        object: v.pipe(
          v.optional(v.literal('list'), 'list'),
          v.description('The object type, which is always `list`.'),
        ),
        data: v.pipe(
          v.pipe(v.array(SubagentResourceSchema), v.minLength(0), v.maxLength(2000)),
          v.description('The resources returned in this page, in the requested sort order.'),
        ),
        first_id: v.pipe(
          v.nullable(v.pipe(v.string(), v.minCodePoints(0))),
          v.description('The ID of the first resource in `data`, or `null` if the page is empty.'),
        ),
        last_id: v.pipe(
          v.nullable(v.pipe(v.string(), v.minCodePoints(0))),
          v.description(
            'The ID of the last resource in `data`, or `null` if the page is empty. Pass this as `after` with the same order and filters.',
          ),
        ),
        has_more: v.pipe(
          v.boolean(),
          v.description('Whether there are more resources to retrieve after this page.'),
        ),
      }),
      v.description('A page of Agents API resources, with IDs for retrieving additional pages.'),
    ),
  )
  .handler(async ({ input }) => {})

export const getAgentsSessionsSessionIdSubagentsSubagentId = os
  .route({
    method: 'GET',
    path: '/agents/sessions/{session_id}/subagents/{subagent_id}',
    tags: ['Agents'],
    summary: 'Retrieve a session subagent',
    description:
      'Retrieves a subagent belonging to this session. See [subagent workflows](https://developers.openai.com/api/docs/guides/agents-api/multi-agent).',
    successDescription: 'The requested subagent.',
  })
  .input(
    v.object({
      session_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
      subagent_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
    }),
  )
  .output(SubagentResourceSchema)
  .handler(async ({ input }) => {})

export const getAgentsSessionsSessionIdSubagentsSubagentIdItems = os
  .route({
    method: 'GET',
    path: '/agents/sessions/{session_id}/subagents/{subagent_id}/items',
    tags: ['Agents'],
    summary: 'List subagent items',
    description:
      "Lists this subagent's own items across all of its turns. See [subagent workflows](https://developers.openai.com/api/docs/guides/agents-api/multi-agent).",
    successDescription: 'The requested subagent history.',
  })
  .input(
    v.object({
      session_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
      subagent_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
      limit: v.optional(
        v.optional(
          v.pipe(
            v.string(),
            v.regex(/^-?\d+$/),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(100n),
          ),
          '20',
        ),
      ),
      order: v.optional(v.optional(ListOrderParamSchema, 'desc')),
      after: v.optional(v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576))),
    }),
  )
  .output(SessionItemListResourceSchema)
  .handler(async ({ input }) => {})

export const getAgentsSessionsSessionIdSubagentsSubagentIdTurns = os
  .route({
    method: 'GET',
    path: '/agents/sessions/{session_id}/subagents/{subagent_id}/turns',
    tags: ['Agents'],
    summary: 'List subagent turns',
    description:
      'Lists all turns of this subagent, including turns after a resume. See [subagent workflows](https://developers.openai.com/api/docs/guides/agents-api/multi-agent).',
    successDescription: 'The requested subagent history.',
  })
  .input(
    v.object({
      session_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
      subagent_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
      limit: v.optional(
        v.optional(
          v.pipe(
            v.string(),
            v.regex(/^-?\d+$/),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(100n),
          ),
          '20',
        ),
      ),
      order: v.optional(v.optional(ListOrderParamSchema, 'desc')),
      after: v.optional(v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576))),
    }),
  )
  .output(SessionTurnListResourceSchema)
  .handler(async ({ input }) => {})

export const getAgentsSessionsSessionIdSubagentsSubagentIdTurnsTurnId = os
  .route({
    method: 'GET',
    path: '/agents/sessions/{session_id}/subagents/{subagent_id}/turns/{turn_id}',
    tags: ['Agents'],
    summary: 'Retrieve a subagent turn',
    description:
      'Retrieves a turn belonging to this subagent. See [subagent workflows](https://developers.openai.com/api/docs/guides/agents-api/multi-agent).',
    successDescription: 'The requested subagent history.',
  })
  .input(
    v.object({
      session_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
      subagent_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
      turn_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
    }),
  )
  .output(TurnResourceSchema)
  .handler(async ({ input }) => {})

export const getAgentsSessionsSessionIdSubagentsSubagentIdTurnsTurnIdItems = os
  .route({
    method: 'GET',
    path: '/agents/sessions/{session_id}/subagents/{subagent_id}/turns/{turn_id}/items',
    tags: ['Agents'],
    summary: 'List subagent turn items',
    description:
      'Lists items belonging to one turn of this subagent. See [subagent workflows](https://developers.openai.com/api/docs/guides/agents-api/multi-agent).',
    successDescription: 'The requested subagent history.',
  })
  .input(
    v.object({
      session_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
      subagent_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
      turn_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
      limit: v.optional(
        v.optional(
          v.pipe(
            v.string(),
            v.regex(/^-?\d+$/),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(100n),
          ),
          '20',
        ),
      ),
      order: v.optional(v.optional(ListOrderParamSchema, 'desc')),
      after: v.optional(v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576))),
    }),
  )
  .output(SessionItemListResourceSchema)
  .handler(async ({ input }) => {})

export const getAgents = os
  .route({
    method: 'GET',
    path: '/agents',
    tags: ['Agents'],
    summary: 'List agents',
    description:
      'Lists reusable agents in the current project. See [agent configuration](https://developers.openai.com/api/docs/guides/agents-api/configuration).',
    successDescription: 'A page of agents.',
  })
  .input(
    v.object({
      limit: v.optional(
        v.optional(
          v.pipe(
            v.string(),
            v.regex(/^-?\d+$/),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(100n),
          ),
          '20',
        ),
      ),
      order: v.optional(v.optional(ListOrderParamSchema, 'desc')),
      after: v.optional(v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576))),
    }),
  )
  .output(AgentListResourceSchema)
  .handler(async ({ input }) => {})

export const postAgents = os
  .route({
    method: 'POST',
    path: '/agents',
    tags: ['Agents'],
    summary: 'Create an agent',
    description:
      'Creates a reusable agent without storing credentials. See [agent configuration](https://developers.openai.com/api/docs/guides/agents-api/configuration).',
    successStatus: 201,
    successDescription: 'The created agent.',
  })
  .input(CreateAgentParamsSchema)
  .output(AgentResourceSchema)
  .handler(async ({ input }) => {})

export const getAgentsAgentId = os
  .route({
    method: 'GET',
    path: '/agents/{agent_id}',
    tags: ['Agents'],
    summary: 'Retrieve an agent',
    description:
      'Retrieves a reusable agent by ID. See [agent configuration](https://developers.openai.com/api/docs/guides/agents-api/configuration).',
    successDescription: 'The requested agent.',
  })
  .input(v.object({ agent_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)) }))
  .output(AgentResourceSchema)
  .handler(async ({ input }) => {})

export const postAgentsAgentId = os
  .route({
    method: 'POST',
    path: '/agents/{agent_id}',
    tags: ['Agents'],
    summary: 'Update an agent',
    description:
      'Updates a reusable agent. See [agent configuration](https://developers.openai.com/api/docs/guides/agents-api/configuration).',
    successDescription: 'The updated agent.',
  })
  .input(
    v.object({
      agent_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
      experimental: v.optional(ExperimentalConfigOverridesParamSchema),
      model: v.optional(
        v.pipe(
          v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
          v.description('The model to use for the agent. The requested model name is preserved.'),
        ),
      ),
      reasoning: v.optional(
        v.pipe(
          v.union([ReasoningParamSchema, v.nullable(v.null())]),
          v.description(
            "Configuration for model reasoning. Omit to keep the current settings; pass `null` to reset to the model's default effort.",
          ),
        ),
      ),
      text: v.optional(
        v.pipe(
          v.union([TextParamSchema, v.nullable(v.null())]),
          v.description('Configuration for text generated by the agent.'),
        ),
      ),
      service_tier: v.optional(
        v.pipe(
          v.union([ServiceTierParamSchema, v.nullable(v.null())]),
          v.description('The service tier used for model requests.'),
        ),
      ),
      instructions: v.optional(
        v.pipe(
          v.nullable(v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576))),
          v.description(
            "Additional instructions appended to the agent's default base instructions. Omit to leave unchanged.",
          ),
        ),
      ),
      multi_agent: v.optional(
        v.pipe(
          v.union([MultiAgentConfigCurrentParamSchema, v.nullable(v.null())]),
          v.description('Configuration for creating and coordinating subagents.'),
        ),
      ),
      compaction: v.optional(
        v.pipe(
          v.union([CompactionParamSchema, v.nullable(v.null())]),
          v.description(
            'Context compaction settings. Omit to keep the current settings. A supplied object replaces the settings; null or an empty object uses blocking compaction.',
          ),
        ),
      ),
      metadata: v.optional(
        v.pipe(
          v.nullable(
            v.record(v.string(), v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(512))),
          ),
          v.description(
            'Replaces all metadata. Omit to leave unchanged, or pass null or {} to clear it. Up to 16 string key-value pairs, with keys up to 64 and values up to 512 characters.',
          ),
        ),
      ),
      name: v.optional(
        v.pipe(
          v.nullable(v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(128))),
          v.description('A replacement name. Omit to leave unchanged, or pass null to clear it.'),
        ),
      ),
      tools: v.optional(
        v.pipe(
          v.nullable(
            v.pipe(v.array(PersistedAgentToolConfigParamSchema), v.minLength(0), v.maxLength(2000)),
          ),
          v.description(
            'Replaces the tool list. Omit to leave it unchanged, or pass null to clear it. The replacement must fit within 3 MiB (3,145,728 bytes) of compact UTF-8 JSON.',
          ),
        ),
      ),
    }),
  )
  .output(AgentResourceSchema)
  .handler(async ({ input }) => {})

export const deleteAgentsAgentId = os
  .route({
    method: 'DELETE',
    path: '/agents/{agent_id}',
    tags: ['Agents'],
    summary: 'Delete an agent',
    description:
      'Deletes a reusable agent. See [agent configuration](https://developers.openai.com/api/docs/guides/agents-api/configuration).',
    successDescription: 'The deleted agent.',
  })
  .input(v.object({ agent_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)) }))
  .output(DeletedAgentResourceSchema)
  .handler(async ({ input }) => {})

export const getAgentsEnvironmentsTemplates = os
  .route({
    method: 'GET',
    path: '/agents/environments/templates',
    tags: ['Agents'],
    summary: 'List agent environment templates',
    description:
      'Lists reusable environment templates without returning confidential values. See [reusing a hosted setup](https://developers.openai.com/api/docs/guides/agents-api/tools#reuse-a-hosted-plugin-setup).',
    successDescription: 'A page of environment templates.',
  })
  .input(
    v.object({
      limit: v.optional(
        v.optional(
          v.pipe(
            v.string(),
            v.regex(/^-?\d+$/),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(100n),
          ),
          '20',
        ),
      ),
      order: v.optional(v.optional(ListOrderParamSchema, 'desc')),
      after: v.optional(v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576))),
    }),
  )
  .output(EnvironmentTemplateListResourceSchema)
  .handler(async ({ input }) => {})

export const postAgentsEnvironmentsTemplates = os
  .route({
    method: 'POST',
    path: '/agents/environments/templates',
    tags: ['Agents'],
    summary: 'Create an agent environment template',
    description:
      'Creates reusable environment configuration without returning confidential setup commands or environment values. See [reusing a hosted setup](https://developers.openai.com/api/docs/guides/agents-api/tools#reuse-a-hosted-plugin-setup).',
    successStatus: 201,
    successDescription: 'The created environment template.',
  })
  .input(CreateEnvironmentTemplateParamsSchema)
  .output(EnvironmentTemplateResourceSchema)
  .handler(async ({ input }) => {})

export const getAgentsEnvironmentsTemplatesEnvironmentTemplateId = os
  .route({
    method: 'GET',
    path: '/agents/environments/templates/{environment_template_id}',
    tags: ['Agents'],
    summary: 'Retrieve an agent environment template',
    description:
      'Retrieves reusable environment configuration without returning confidential values. See [reusing a hosted setup](https://developers.openai.com/api/docs/guides/agents-api/tools#reuse-a-hosted-plugin-setup).',
    successDescription: 'The requested environment template.',
  })
  .input(
    v.object({
      environment_template_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
    }),
  )
  .output(EnvironmentTemplateResourceSchema)
  .handler(async ({ input }) => {})

export const postAgentsEnvironmentsTemplatesEnvironmentTemplateId = os
  .route({
    method: 'POST',
    path: '/agents/environments/templates/{environment_template_id}',
    tags: ['Agents'],
    summary: 'Update an agent environment template',
    description:
      'Updates reusable environment configuration without returning confidential values. See [reusing a hosted setup](https://developers.openai.com/api/docs/guides/agents-api/tools#reuse-a-hosted-plugin-setup).',
    successDescription: 'The updated environment template.',
  })
  .input(
    v.object({
      environment_template_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
      name: v.optional(
        v.pipe(
          v.nullable(v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(256))),
          v.description('A replacement human-readable display name, or `null` to clear the name.'),
        ),
      ),
      packages: v.optional(
        v.pipe(
          v.union([EnvironmentPackagesParamSchema, v.nullable(v.null())]),
          v.description('Packages installed before the runtime network policy applies.'),
        ),
      ),
      setup_commands: v.optional(
        v.pipe(
          v.nullable(v.pipe(v.array(SetupCommandParamSchema), v.minLength(0), v.maxLength(16))),
          v.description(
            'Replacement confidential setup commands, never included in returned resources.',
          ),
        ),
      ),
      network: v.optional(
        v.pipe(
          v.union([NetworkPolicyParamSchema, v.nullable(v.null())]),
          v.description(
            'Network access available after setup completes. Omit to preserve the current policy, or pass `null` to reset to the default policy.',
          ),
        ),
      ),
      desktop: v.optional(
        v.pipe(
          v.union([DesktopParamSchema, v.nullable(v.null())]),
          v.description('Replacement desktop configuration, or null to disable the desktop.'),
        ),
      ),
      env: v.optional(
        v.pipe(
          v.nullable(
            v.record(v.string(), v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576))),
          ),
          v.description('Replacement confidential environment values.'),
        ),
      ),
      capability_directories: v.optional(
        v.pipe(
          v.nullable(
            v.pipe(
              v.array(v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576))),
              v.minLength(0),
              v.maxLength(16384),
            ),
          ),
          v.description('Directories that expose capabilities to the agent.'),
        ),
      ),
      skills: v.optional(
        v.pipe(
          v.nullable(v.pipe(v.array(HostedSkillParamSchema), v.minLength(0), v.maxLength(200))),
          v.description('Replacement skill configuration installed for each new session.'),
        ),
      ),
      plugins: v.optional(
        v.pipe(
          v.nullable(v.pipe(v.array(HostedPluginParamSchema), v.minLength(0), v.maxLength(32))),
          v.description('Replacement plugin configuration installed for each new session.'),
        ),
      ),
      files: v.optional(
        v.pipe(
          v.nullable(
            v.pipe(v.array(HostedEnvironmentFileParamSchema), v.minLength(0), v.maxLength(50)),
          ),
          v.description('Replacement file configuration materialized for each new session.'),
        ),
      ),
    }),
  )
  .output(EnvironmentTemplateResourceSchema)
  .handler(async ({ input }) => {})

export const deleteAgentsEnvironmentsTemplatesEnvironmentTemplateId = os
  .route({
    method: 'DELETE',
    path: '/agents/environments/templates/{environment_template_id}',
    tags: ['Agents'],
    summary: 'Delete an agent environment template',
    description:
      'Deletes reusable environment configuration and all confidential template inputs. See [reusing a hosted setup](https://developers.openai.com/api/docs/guides/agents-api/tools#reuse-a-hosted-plugin-setup).',
    successDescription: 'The deleted environment template.',
  })
  .input(
    v.object({
      environment_template_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
    }),
  )
  .output(DeletedEnvironmentTemplateResourceSchema)
  .handler(async ({ input }) => {})

export const getAgentsSessions = os
  .route({
    method: 'GET',
    path: '/agents/sessions',
    tags: ['Agents'],
    summary: 'List agent sessions',
    description:
      'Lists managed agent sessions using ID-based pagination and the requested sort order. See [managing sessions](https://developers.openai.com/api/docs/guides/agents-api/sessions/manage).',
    successDescription: 'A page of sessions.',
  })
  .input(
    v.object({
      limit: v.optional(
        v.optional(
          v.pipe(
            v.string(),
            v.regex(/^-?\d+$/),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(100n),
          ),
          '20',
        ),
      ),
      order: v.optional(v.optional(ListOrderParamSchema, 'desc')),
      after: v.optional(v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576))),
      agent_id: v.optional(v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576))),
      metadata: v.optional(
        v.pipe(
          v.unknown(),
          v.transform((input) => {
            if (typeof input !== 'object' || input === null || Array.isArray(input)) return input
            const out = Object.entries(input).reduce<{ [k: string]: unknown }>(
              (acc, [key, value]) => {
                const name = /^[^[\]]+\[([^\]]+)\]$/u.exec(key)?.[1]
                return name === undefined ? acc : { ...acc, [name]: value }
              },
              {},
            )
            return Object.keys(out).length > 0 ? out : input
          }),
          v.record(v.string(), v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(512))),
        ),
      ),
    }),
  )
  .output(SessionListResourceSchema)
  .handler(async ({ input }) => {})

export const postAgentsSessions = os
  .route({
    method: 'POST',
    path: '/agents/sessions',
    tags: ['Agents'],
    summary: 'Create an agent session',
    description:
      'Creates a managed agent session, optionally submits initial input, and returns the session or streams its events when stream is true. See [running sessions](https://developers.openai.com/api/docs/guides/agents-api/sessions).',
    successStatus: 201,
    successDescription: 'The created session or its event stream.',
  })
  .input(CreateAgentSessionParamsSchema)
  .output(SessionResourceSchema)
  .handler(async ({ input }) => {})

export const getAgentsSessionsSessionId = os
  .route({
    method: 'GET',
    path: '/agents/sessions/{session_id}',
    tags: ['Agents'],
    summary: 'Retrieve an agent session',
    description:
      'Retrieves the current state of a managed agent session. See [managing sessions](https://developers.openai.com/api/docs/guides/agents-api/sessions/manage).',
    successDescription: 'The requested session.',
  })
  .input(v.object({ session_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)) }))
  .output(SessionResourceSchema)
  .handler(async ({ input }) => {})

export const postAgentsSessionsSessionId = os
  .route({
    method: 'POST',
    path: '/agents/sessions/{session_id}',
    tags: ['Agents'],
    summary: 'Update an agent session',
    description:
      'Updates session tools, vaults, metadata, model, reasoning effort, service tier, or the default prompt cache lifetime. Model settings apply to subsequent turns. Omitted fields are unchanged. See [managing sessions](https://developers.openai.com/api/docs/guides/agents-api/sessions/manage).',
    successDescription: 'The updated session.',
  })
  .input(
    v.object({
      session_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
      prompt_cache_options: v.optional(
        v.pipe(
          v.union([PromptCacheOptionsParam2Schema, v.nullable(v.null())]),
          v.description(
            'Default prompt cache lifetime for future turns. Send null to clear the session default.',
          ),
        ),
      ),
      vault_ids: v.optional(
        v.pipe(
          v.nullable(
            v.pipe(
              v.array(v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576))),
              v.minLength(0),
              v.maxLength(16384),
            ),
          ),
          v.description(
            "Replaces the session's referenced vaults. Omit to retain them; null or [] clears them.",
          ),
        ),
      ),
      review: v.optional(SessionReviewParamSchema),
      spend_control: v.optional(
        v.pipe(
          v.union([SessionBudgetControlParamsSchema, v.nullable(v.null())]),
          v.description(
            'Omit to retain the limit; null or a null limit removes it without resetting spend.',
          ),
        ),
      ),
      agent: v.optional(UpdateSessionAgentParamSchema),
      metadata: v.optional(
        v.pipe(
          v.nullable(
            v.record(v.string(), v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(512))),
          ),
          v.description(
            'Replaces all metadata. Omit to leave unchanged, or pass null or {} to clear it. Up to 16 string key-value pairs, with keys up to 64 and values up to 512 characters.',
          ),
        ),
      ),
    }),
  )
  .output(SessionResourceSchema)
  .handler(async ({ input }) => {})

export const deleteAgentsSessionsSessionId = os
  .route({
    method: 'DELETE',
    path: '/agents/sessions/{session_id}',
    tags: ['Agents'],
    summary: 'Delete an agent session',
    description:
      'Removes a managed agent session from the public API and returns a deletion confirmation. If backend execution has ended, deletion can cancel a still-open public turn and abandon unpublished outputs. Running execution must be cancelled first. Physical cleanup may continue asynchronously. See [managing sessions](https://developers.openai.com/api/docs/guides/agents-api/sessions/manage).',
    successDescription: 'The deleted session.',
  })
  .input(v.object({ session_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)) }))
  .output(DeletedSessionResourceSchema)
  .handler(async ({ input }) => {})

export const getAgentsSessionsSessionIdArtifacts = os
  .route({
    method: 'GET',
    path: '/agents/sessions/{session_id}/artifacts',
    tags: ['Agents'],
    summary: 'List agent session artifacts',
    description:
      'Lists immutable artifacts published by completed hosted session turns. See [session artifacts](https://developers.openai.com/api/docs/guides/agents-api/environments/files#openai-hosted-artifacts).',
    successDescription: 'A page of durable session artifacts.',
  })
  .input(
    v.object({
      session_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
      limit: v.optional(
        v.optional(
          v.pipe(
            v.string(),
            v.regex(/^-?\d+$/),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(100n),
          ),
          '20',
        ),
      ),
      order: v.optional(v.optional(ListOrderParamSchema, 'desc')),
      after: v.optional(v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576))),
      environment_id: v.optional(
        v.nullable(v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576))),
      ),
    }),
  )
  .output(SessionArtifactListResourceSchema)
  .handler(async ({ input }) => {})

export const getAgentsSessionsSessionIdArtifactsArtifactId = os
  .route({
    method: 'GET',
    path: '/agents/sessions/{session_id}/artifacts/{artifact_id}',
    tags: ['Agents'],
    summary: 'Retrieve an agent session artifact',
    description:
      'Retrieves immutable metadata for one durable session artifact. See [session artifacts](https://developers.openai.com/api/docs/guides/agents-api/environments/files#openai-hosted-artifacts).',
    successDescription: 'The requested session artifact.',
  })
  .input(
    v.object({
      session_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
      artifact_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
    }),
  )
  .output(SessionArtifactResourceSchema)
  .handler(async ({ input }) => {})

export const deleteAgentsSessionsSessionIdArtifactsArtifactId = os
  .route({
    method: 'DELETE',
    path: '/agents/sessions/{session_id}/artifacts/{artifact_id}',
    tags: ['Agents'],
    summary: 'Delete an agent session artifact',
    description:
      'Deletes an immutable session artifact without deleting its live environment file or original Files API object. See [session artifacts](https://developers.openai.com/api/docs/guides/agents-api/environments/files#openai-hosted-artifacts).',
    successDescription: 'The deleted session artifact.',
  })
  .input(
    v.object({
      session_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
      artifact_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
    }),
  )
  .output(DeletedSessionArtifactResourceSchema)
  .handler(async ({ input }) => {})

export const getAgentsSessionsSessionIdArtifactsArtifactIdContent = os
  .route({
    method: 'GET',
    path: '/agents/sessions/{session_id}/artifacts/{artifact_id}/content',
    tags: ['Agents'],
    summary: 'Retrieve agent session artifact content',
    description:
      'Downloads immutable session artifact bytes after the execution environment expires. See [session artifacts](https://developers.openai.com/api/docs/guides/agents-api/environments/files#openai-hosted-artifacts).',
    successDescription: 'The immutable artifact contents.',
  })
  .input(
    v.object({
      session_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
      artifact_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
    }),
  )
  .handler(async ({ input }) => {})

export const getAgentsSessionsSessionIdEvents = os
  .route({
    method: 'GET',
    path: '/agents/sessions/{session_id}/events',
    tags: ['Agents'],
    summary: 'Stream agent session events',
    description:
      'Streams live events for an agent session. See [session events](https://developers.openai.com/api/docs/guides/agents-api/sessions/events).',
    successDescription: 'A live stream of session events.',
  })
  .input(
    v.object({
      session_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
      include_obfuscation: v.optional(
        v.optional(
          v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          'true',
        ),
      ),
    }),
  )
  .handler(async ({ input }) => {})

export const postAgentsSessionsSessionIdEvents = os
  .route({
    method: 'POST',
    path: '/agents/sessions/{session_id}/events',
    tags: ['Agents'],
    summary: 'Create agent session input events',
    description:
      'Submits message, cancellation, tool-result, or computer-use approval-response events to a managed agent session. Cancellation can recover a still-open turn whose backend execution has ended by marking it cancelled and abandoning unpublished outputs. Saved results, published files, and existing terminal outcomes are preserved. HTTP 202 confirms acceptance, not durable completion. See [session events](https://developers.openai.com/api/docs/guides/agents-api/sessions/events).',
    successStatus: 202,
    successDescription: 'The events were accepted.',
  })
  .input(
    v.object({
      session_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
      events: v.pipe(
        v.pipe(v.array(SessionInputParamSchema), v.minLength(0), v.maxLength(16384)),
        v.description('The input events to submit to the session.'),
      ),
    }),
  )
  .handler(async ({ input }) => {})

export const getAgentsSessionsSessionIdItems = os
  .route({
    method: 'GET',
    path: '/agents/sessions/{session_id}/items',
    tags: ['Agents'],
    summary: 'List agent session items',
    description:
      "Lists items produced by the session's root agent, including its interactions with subagents. Each subagent has its own item history. See [inspecting agent output](https://developers.openai.com/api/docs/guides/agents-api/observability).",
    successDescription: 'A page of session items.',
  })
  .input(
    v.object({
      session_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
      limit: v.optional(
        v.optional(
          v.pipe(
            v.string(),
            v.regex(/^-?\d+$/),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(100n),
          ),
          '20',
        ),
      ),
      order: v.optional(v.optional(ListOrderParamSchema, 'desc')),
      after: v.optional(v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576))),
    }),
  )
  .output(SessionItemListResourceSchema)
  .handler(async ({ input }) => {})

export const getAgentsSessionsSessionIdTraces = os
  .route({
    method: 'GET',
    path: '/agents/sessions/{session_id}/traces',
    tags: ['Agents'],
    summary: 'List agent session traces',
    description:
      'Lists published root-turn traces as OTLP JSON, ordered by turn creation time and ID. Unpublished traces are skipped. Each page returns data available when read; it does not wait for late traces. Pages may contain fewer traces than requested to fit the 16 MiB response limit. When `has_more` is true, pass `last_id` as `after` to continue. If the first trace exceeds 16 MiB before conversion or cannot fit on a page by itself, the API returns a `trace_too_large` error.',
    successDescription: 'A page of published session traces.',
  })
  .input(
    v.object({
      session_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
      limit: v.optional(
        v.optional(
          v.pipe(
            v.string(),
            v.regex(/^-?\d+$/),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(100n),
          ),
          '20',
        ),
      ),
      order: v.optional(v.optional(ListOrderParamSchema, 'desc')),
      after: v.optional(v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576))),
    }),
  )
  .output(SessionTraceListResourceSchema)
  .handler(async ({ input }) => {})

export const getAgentsSessionsSessionIdTurns = os
  .route({
    method: 'GET',
    path: '/agents/sessions/{session_id}/turns',
    tags: ['Agents'],
    summary: 'List agent session turns',
    description:
      'Lists turns by creation time and turn ID. The after cursor is exclusive in the selected order. See [session turns](https://developers.openai.com/api/docs/guides/agents-api/sessions/manage#inspect-session-turns).',
    successDescription: 'A page of session turns.',
  })
  .input(
    v.object({
      session_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
      limit: v.optional(
        v.optional(
          v.pipe(
            v.string(),
            v.regex(/^-?\d+$/),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(100n),
          ),
          '20',
        ),
      ),
      order: v.optional(v.optional(ListOrderParamSchema, 'desc')),
      after: v.optional(v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576))),
    }),
  )
  .output(SessionTurnListResourceSchema)
  .handler(async ({ input }) => {})

export const getAgentsSessionsSessionIdTurnsTurnId = os
  .route({
    method: 'GET',
    path: '/agents/sessions/{session_id}/turns/{turn_id}',
    tags: ['Agents'],
    summary: 'Retrieve an agent session turn',
    description:
      "Retrieves a turn's current status, timestamps, usage, and error. Returns 404 if the turn does not belong to the session. See [session turns](https://developers.openai.com/api/docs/guides/agents-api/sessions/manage#inspect-session-turns).",
    successDescription: 'The requested turn.',
  })
  .input(
    v.object({
      session_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
      turn_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
    }),
  )
  .output(TurnResourceSchema)
  .handler(async ({ input }) => {})

export const getAgentsSessionsSessionIdTurnsTurnIdItems = os
  .route({
    method: 'GET',
    path: '/agents/sessions/{session_id}/turns/{turn_id}/items',
    tags: ['Agents'],
    summary: 'List agent session turn items',
    description:
      'Lists items belonging to one root-agent turn, including its interactions with subagents. See [inspecting agent output](https://developers.openai.com/api/docs/guides/agents-api/observability).',
    successDescription: 'A page of session turn items.',
  })
  .input(
    v.object({
      session_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
      turn_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
      limit: v.optional(
        v.optional(
          v.pipe(
            v.string(),
            v.regex(/^-?\d+$/),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(100n),
          ),
          '20',
        ),
      ),
      order: v.optional(v.optional(ListOrderParamSchema, 'desc')),
      after: v.optional(v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576))),
    }),
  )
  .output(SessionItemListResourceSchema)
  .handler(async ({ input }) => {})
