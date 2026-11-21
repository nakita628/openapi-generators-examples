import { os } from '@orpc/server'
import * as z from 'zod'
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
    z.object({
      limit: z.coerce.bigint().pipe(z.int64().min(1n).max(100n)).default(20n).exactOptional(),
      order: ListOrderParamSchema.default('desc').exactOptional(),
      after: z.string().min(0).max(1048576).exactOptional(),
      session_id: z.string().min(0).max(1048576).exactOptional(),
    }),
  )
  .output(
    z
      .strictObject({
        object: z
          .literal('list')
          .default('list')
          .meta({ description: 'The object type, which is always `list`.' }),
        data: z
          .array(AutomationResourceSchema)
          .min(0)
          .max(2000)
          .meta({
            description: 'The resources returned in this page, in the requested sort order.',
          }),
        first_id: z
          .string()
          .min(0)
          .nullable()
          .meta({
            description: 'The ID of the first resource in `data`, or `null` if the page is empty.',
          }),
        last_id: z
          .string()
          .min(0)
          .nullable()
          .meta({
            description:
              'The ID of the last resource in `data`, or `null` if the page is empty. Pass this as `after` with the same order and filters.',
          }),
        has_more: z
          .boolean()
          .meta({ description: 'Whether there are more resources to retrieve after this page.' }),
      })
      .meta({
        description: 'A page of Agents API resources, with IDs for retrieving additional pages.',
      }),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getAgentsAutomationsAutomationId = os
  .route({
    method: 'GET',
    path: '/agents/automations/{automation_id}',
    tags: ['Agents'],
    summary: 'Get an automation',
    description: 'Retrieves a project-owned automation.',
    successDescription: 'Successful response.',
  })
  .input(z.object({ automation_id: z.string().min(0).max(1048576) }))
  .output(AutomationResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    z.object({
      automation_id: z.string().min(0).max(1048576),
      name: z.string().min(1).max(256).exactOptional(),
      target: AutomationTargetParamSchema.exactOptional(),
      metadata: z
        .record(z.string(), z.string().min(0).max(512))
        .meta({ description: 'Replaces all metadata; omit to leave unchanged.' })
        .exactOptional(),
      expression: z
        .string()
        .min(1)
        .max(256)
        .meta({ description: 'Only accepted for periodic automations.' })
        .exactOptional(),
      timezone: z
        .string()
        .min(1)
        .max(128)
        .meta({ description: 'Only accepted for periodic automations.' })
        .exactOptional(),
      run_at: z
        .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
        .transform((val) => BigInt(val))
        .pipe(z.int64())
        .meta({
          description:
            'A future Unix timestamp in seconds; accepted only before a one-time scheduled invocation exists.',
        })
        .exactOptional(),
    }),
  )
  .output(AutomationResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
  .input(z.object({ automation_id: z.string().min(0).max(1048576) }))
  .output(DeletedAutomationResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postAgentsAutomationsAutomationIdPause = os
  .route({
    method: 'POST',
    path: '/agents/automations/{automation_id}/pause',
    tags: ['Agents'],
    summary: 'Pause an automation',
    description: 'Pauses future scheduled delivery without stopping an active session.',
    successDescription: 'Successful response.',
  })
  .input(z.object({ automation_id: z.string().min(0).max(1048576) }))
  .output(AutomationResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
  .input(z.object({ automation_id: z.string().min(0).max(1048576) }))
  .output(AutomationResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    z.object({
      automation_id: z.string().min(0).max(1048576),
      limit: z.coerce.bigint().pipe(z.int64().min(1n).max(100n)).default(20n).exactOptional(),
      order: ListOrderParamSchema.default('desc').exactOptional(),
      after: z.string().min(0).max(1048576).exactOptional(),
    }),
  )
  .output(
    z
      .strictObject({
        object: z
          .literal('list')
          .default('list')
          .meta({ description: 'The object type, which is always `list`.' }),
        data: z
          .array(AutomationInvocationResourceSchema)
          .min(0)
          .max(2000)
          .meta({
            description: 'The resources returned in this page, in the requested sort order.',
          }),
        first_id: z
          .string()
          .min(0)
          .nullable()
          .meta({
            description: 'The ID of the first resource in `data`, or `null` if the page is empty.',
          }),
        last_id: z
          .string()
          .min(0)
          .nullable()
          .meta({
            description:
              'The ID of the last resource in `data`, or `null` if the page is empty. Pass this as `after` with the same order and filters.',
          }),
        has_more: z
          .boolean()
          .meta({ description: 'Whether there are more resources to retrieve after this page.' }),
      })
      .meta({
        description: 'A page of Agents API resources, with IDs for retrieving additional pages.',
      }),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postAgentsAutomationsAutomationIdInvocations = os
  .route({
    method: 'POST',
    path: '/agents/automations/{automation_id}/invocations',
    tags: ['Agents'],
    summary: 'Invoke an automation',
    description: 'Queues a manual delivery without changing the saved schedule.',
    successDescription: 'The queued invocation.',
  })
  .input(z.object({ automation_id: z.string().min(0).max(1048576) }))
  .output(AutomationInvocationResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    z.object({
      automation_id: z.string().min(0).max(1048576),
      invocation_id: z.string().min(0).max(1048576),
    }),
  )
  .output(AutomationInvocationResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    z.object({
      limit: z.coerce.bigint().pipe(z.int64().min(1n).max(100n)).default(20n).exactOptional(),
      order: ListOrderParamSchema.default('desc').exactOptional(),
      after: z.string().min(0).max(1048576).exactOptional(),
      type: EnvironmentTypeParamSchema.exactOptional(),
    }),
  )
  .output(AgentEnvironmentListResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
  .input(z.object({ environment_id: z.string().min(0).max(1048576) }))
  .output(PublicEnvironmentResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    z.object({
      environment_id: z.string().min(0).max(1048576),
      path: z.string().min(0).max(1048576).nullable().exactOptional(),
      limit: z
        .preprocess(
          (val) => (val === 'null' ? null : val),
          z.coerce.bigint().pipe(z.int64().min(1n).max(100n)).nullable(),
        )
        .exactOptional(),
      order: ListOrderParamSchema.exactOptional(),
      page: z.string().min(0).max(1048576).exactOptional(),
    }),
  )
  .output(EnvironmentFileListResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
  .input(z.object({ environment_id: z.string().min(0).max(1048576) }))
  .output(EnvironmentFileResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    z.object({
      session_id: z.string().min(0).max(1048576),
      limit: z.coerce.bigint().pipe(z.int64().min(1n).max(100n)).default(20n).exactOptional(),
      order: ListOrderParamSchema.default('desc').exactOptional(),
      after: z.string().min(0).max(1048576).exactOptional(),
    }),
  )
  .output(
    z
      .strictObject({
        object: z
          .literal('list')
          .default('list')
          .meta({ description: 'The object type, which is always `list`.' }),
        data: z
          .array(SubagentResourceSchema)
          .min(0)
          .max(2000)
          .meta({
            description: 'The resources returned in this page, in the requested sort order.',
          }),
        first_id: z
          .string()
          .min(0)
          .nullable()
          .meta({
            description: 'The ID of the first resource in `data`, or `null` if the page is empty.',
          }),
        last_id: z
          .string()
          .min(0)
          .nullable()
          .meta({
            description:
              'The ID of the last resource in `data`, or `null` if the page is empty. Pass this as `after` with the same order and filters.',
          }),
        has_more: z
          .boolean()
          .meta({ description: 'Whether there are more resources to retrieve after this page.' }),
      })
      .meta({
        description: 'A page of Agents API resources, with IDs for retrieving additional pages.',
      }),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    z.object({
      session_id: z.string().min(0).max(1048576),
      subagent_id: z.string().min(0).max(1048576),
    }),
  )
  .output(SubagentResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    z.object({
      session_id: z.string().min(0).max(1048576),
      subagent_id: z.string().min(0).max(1048576),
      limit: z.coerce.bigint().pipe(z.int64().min(1n).max(100n)).default(20n).exactOptional(),
      order: ListOrderParamSchema.default('desc').exactOptional(),
      after: z.string().min(0).max(1048576).exactOptional(),
    }),
  )
  .output(SessionItemListResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    z.object({
      session_id: z.string().min(0).max(1048576),
      subagent_id: z.string().min(0).max(1048576),
      limit: z.coerce.bigint().pipe(z.int64().min(1n).max(100n)).default(20n).exactOptional(),
      order: ListOrderParamSchema.default('desc').exactOptional(),
      after: z.string().min(0).max(1048576).exactOptional(),
    }),
  )
  .output(SessionTurnListResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    z.object({
      session_id: z.string().min(0).max(1048576),
      subagent_id: z.string().min(0).max(1048576),
      turn_id: z.string().min(0).max(1048576),
    }),
  )
  .output(TurnResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    z.object({
      session_id: z.string().min(0).max(1048576),
      subagent_id: z.string().min(0).max(1048576),
      turn_id: z.string().min(0).max(1048576),
      limit: z.coerce.bigint().pipe(z.int64().min(1n).max(100n)).default(20n).exactOptional(),
      order: ListOrderParamSchema.default('desc').exactOptional(),
      after: z.string().min(0).max(1048576).exactOptional(),
    }),
  )
  .output(SessionItemListResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    z.object({
      limit: z.coerce.bigint().pipe(z.int64().min(1n).max(100n)).default(20n).exactOptional(),
      order: ListOrderParamSchema.default('desc').exactOptional(),
      after: z.string().min(0).max(1048576).exactOptional(),
    }),
  )
  .output(AgentListResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
  .input(z.object({ agent_id: z.string().min(0).max(1048576) }))
  .output(AgentResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    z.object({
      agent_id: z.string().min(0).max(1048576),
      experimental: ExperimentalConfigOverridesParamSchema.exactOptional(),
      model: z
        .string()
        .min(0)
        .max(1048576)
        .meta({
          description: 'The model to use for the agent. The requested model name is preserved.',
        })
        .exactOptional(),
      reasoning: z
        .union([ReasoningParamSchema, z.null().nullable()])
        .meta({
          description:
            "Configuration for model reasoning. Omit to keep the current settings; pass `null` to reset to the model's default effort.",
        })
        .exactOptional(),
      text: z
        .union([TextParamSchema, z.null().nullable()])
        .meta({ description: 'Configuration for text generated by the agent.' })
        .exactOptional(),
      service_tier: z
        .union([ServiceTierParamSchema, z.null().nullable()])
        .meta({ description: 'The service tier used for model requests.' })
        .exactOptional(),
      instructions: z
        .string()
        .min(0)
        .max(1048576)
        .nullable()
        .meta({
          description:
            "Additional instructions appended to the agent's default base instructions. Omit to leave unchanged.",
        })
        .exactOptional(),
      multi_agent: z
        .union([MultiAgentConfigCurrentParamSchema, z.null().nullable()])
        .meta({ description: 'Configuration for creating and coordinating subagents.' })
        .exactOptional(),
      compaction: z
        .union([CompactionParamSchema, z.null().nullable()])
        .meta({
          description:
            'Context compaction settings. Omit to keep the current settings. A supplied object replaces the settings; null or an empty object uses blocking compaction.',
        })
        .exactOptional(),
      metadata: z
        .record(z.string(), z.string().min(0).max(512))
        .nullable()
        .meta({
          description:
            'Replaces all metadata. Omit to leave unchanged, or pass null or {} to clear it. Up to 16 string key-value pairs, with keys up to 64 and values up to 512 characters.',
        })
        .exactOptional(),
      name: z
        .string()
        .min(0)
        .max(128)
        .nullable()
        .meta({
          description: 'A replacement name. Omit to leave unchanged, or pass null to clear it.',
        })
        .exactOptional(),
      tools: z
        .array(PersistedAgentToolConfigParamSchema)
        .min(0)
        .max(2000)
        .nullable()
        .meta({
          description:
            'Replaces the tool list. Omit to leave it unchanged, or pass null to clear it. The replacement must fit within 3 MiB (3,145,728 bytes) of compact UTF-8 JSON.',
        })
        .exactOptional(),
    }),
  )
  .output(AgentResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
  .input(z.object({ agent_id: z.string().min(0).max(1048576) }))
  .output(DeletedAgentResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    z.object({
      limit: z.coerce.bigint().pipe(z.int64().min(1n).max(100n)).default(20n).exactOptional(),
      order: ListOrderParamSchema.default('desc').exactOptional(),
      after: z.string().min(0).max(1048576).exactOptional(),
    }),
  )
  .output(EnvironmentTemplateListResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
  .input(z.object({ environment_template_id: z.string().min(0).max(1048576) }))
  .output(EnvironmentTemplateResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    z.object({
      environment_template_id: z.string().min(0).max(1048576),
      name: z
        .string()
        .min(1)
        .max(256)
        .nullable()
        .meta({
          description: 'A replacement human-readable display name, or `null` to clear the name.',
        })
        .exactOptional(),
      packages: z
        .union([EnvironmentPackagesParamSchema, z.null().nullable()])
        .meta({ description: 'Packages installed before the runtime network policy applies.' })
        .exactOptional(),
      setup_commands: z
        .array(SetupCommandParamSchema)
        .min(0)
        .max(16)
        .nullable()
        .meta({
          description:
            'Replacement confidential setup commands, never included in returned resources.',
        })
        .exactOptional(),
      network: z
        .union([NetworkPolicyParamSchema, z.null().nullable()])
        .meta({
          description:
            'Network access available after setup completes. Omit to preserve the current policy, or pass `null` to reset to the default policy.',
        })
        .exactOptional(),
      desktop: z
        .union([DesktopParamSchema, z.null().nullable()])
        .meta({ description: 'Replacement desktop configuration, or null to disable the desktop.' })
        .exactOptional(),
      env: z
        .record(z.string(), z.string().min(0).max(1048576))
        .nullable()
        .meta({ description: 'Replacement confidential environment values.' })
        .exactOptional(),
      capability_directories: z
        .array(z.string().min(0).max(1048576))
        .min(0)
        .max(16384)
        .nullable()
        .meta({ description: 'Directories that expose capabilities to the agent.' })
        .exactOptional(),
      skills: z
        .array(HostedSkillParamSchema)
        .min(0)
        .max(200)
        .nullable()
        .meta({ description: 'Replacement skill configuration installed for each new session.' })
        .exactOptional(),
      plugins: z
        .array(HostedPluginParamSchema)
        .min(0)
        .max(32)
        .nullable()
        .meta({ description: 'Replacement plugin configuration installed for each new session.' })
        .exactOptional(),
      files: z
        .array(HostedEnvironmentFileParamSchema)
        .min(0)
        .max(50)
        .nullable()
        .meta({ description: 'Replacement file configuration materialized for each new session.' })
        .exactOptional(),
    }),
  )
  .output(EnvironmentTemplateResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
  .input(z.object({ environment_template_id: z.string().min(0).max(1048576) }))
  .output(DeletedEnvironmentTemplateResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    z.object({
      limit: z.coerce.bigint().pipe(z.int64().min(1n).max(100n)).default(20n).exactOptional(),
      order: ListOrderParamSchema.default('desc').exactOptional(),
      after: z.string().min(0).max(1048576).exactOptional(),
      agent_id: z.string().min(0).max(1048576).exactOptional(),
      metadata: z
        .preprocess(
          (val) => {
            if (typeof val !== 'object' || val === null || Array.isArray(val)) return val
            const out = Object.entries(val).reduce<{ [k: string]: unknown }>(
              (acc, [key, value]) => {
                const name = /^[^[\]]+\[([^\]]+)\]$/u.exec(key)?.[1]
                return name === undefined ? acc : { ...acc, [name]: value }
              },
              {},
            )
            return Object.keys(out).length > 0 ? out : val
          },
          z.record(z.string(), z.string().min(0).max(512)),
        )
        .exactOptional(),
    }),
  )
  .output(SessionListResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
  .input(z.object({ session_id: z.string().min(0).max(1048576) }))
  .output(SessionResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    z.object({
      session_id: z.string().min(0).max(1048576),
      prompt_cache_options: z
        .union([PromptCacheOptionsParam2Schema, z.null().nullable()])
        .meta({
          description:
            'Default prompt cache lifetime for future turns. Send null to clear the session default.',
        })
        .exactOptional(),
      vault_ids: z
        .array(z.string().min(0).max(1048576))
        .min(0)
        .max(16384)
        .nullable()
        .meta({
          description:
            "Replaces the session's referenced vaults. Omit to retain them; null or [] clears them.",
        })
        .exactOptional(),
      review: SessionReviewParamSchema.exactOptional(),
      spend_control: z
        .union([SessionBudgetControlParamsSchema, z.null().nullable()])
        .meta({
          description:
            'Omit to retain the limit; null or a null limit removes it without resetting spend.',
        })
        .exactOptional(),
      agent: UpdateSessionAgentParamSchema.exactOptional(),
      metadata: z
        .record(z.string(), z.string().min(0).max(512))
        .nullable()
        .meta({
          description:
            'Replaces all metadata. Omit to leave unchanged, or pass null or {} to clear it. Up to 16 string key-value pairs, with keys up to 64 and values up to 512 characters.',
        })
        .exactOptional(),
    }),
  )
  .output(SessionResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
  .input(z.object({ session_id: z.string().min(0).max(1048576) }))
  .output(DeletedSessionResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    z.object({
      session_id: z.string().min(0).max(1048576),
      limit: z.coerce.bigint().pipe(z.int64().min(1n).max(100n)).default(20n).exactOptional(),
      order: ListOrderParamSchema.default('desc').exactOptional(),
      after: z.string().min(0).max(1048576).exactOptional(),
      environment_id: z.string().min(0).max(1048576).nullable().exactOptional(),
    }),
  )
  .output(SessionArtifactListResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    z.object({
      session_id: z.string().min(0).max(1048576),
      artifact_id: z.string().min(0).max(1048576),
    }),
  )
  .output(SessionArtifactResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    z.object({
      session_id: z.string().min(0).max(1048576),
      artifact_id: z.string().min(0).max(1048576),
    }),
  )
  .output(DeletedSessionArtifactResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    z.object({
      session_id: z.string().min(0).max(1048576),
      artifact_id: z.string().min(0).max(1048576),
    }),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    z.object({
      session_id: z.string().min(0).max(1048576),
      include_obfuscation: z.stringbool().default(true).exactOptional(),
    }),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    z.object({
      session_id: z.string().min(0).max(1048576),
      events: z
        .array(SessionInputParamSchema)
        .min(0)
        .max(16384)
        .meta({ description: 'The input events to submit to the session.' }),
    }),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    z.object({
      session_id: z.string().min(0).max(1048576),
      limit: z.coerce.bigint().pipe(z.int64().min(1n).max(100n)).default(20n).exactOptional(),
      order: ListOrderParamSchema.default('desc').exactOptional(),
      after: z.string().min(0).max(1048576).exactOptional(),
    }),
  )
  .output(SessionItemListResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    z.object({
      session_id: z.string().min(0).max(1048576),
      limit: z.coerce.bigint().pipe(z.int64().min(1n).max(100n)).default(20n).exactOptional(),
      order: ListOrderParamSchema.default('desc').exactOptional(),
      after: z.string().min(0).max(1048576).exactOptional(),
    }),
  )
  .output(SessionTraceListResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    z.object({
      session_id: z.string().min(0).max(1048576),
      limit: z.coerce.bigint().pipe(z.int64().min(1n).max(100n)).default(20n).exactOptional(),
      order: ListOrderParamSchema.default('desc').exactOptional(),
      after: z.string().min(0).max(1048576).exactOptional(),
    }),
  )
  .output(SessionTurnListResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    z.object({
      session_id: z.string().min(0).max(1048576),
      turn_id: z.string().min(0).max(1048576),
    }),
  )
  .output(TurnResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    z.object({
      session_id: z.string().min(0).max(1048576),
      turn_id: z.string().min(0).max(1048576),
      limit: z.coerce.bigint().pipe(z.int64().min(1n).max(100n)).default(20n).exactOptional(),
      order: ListOrderParamSchema.default('desc').exactOptional(),
      after: z.string().min(0).max(1048576).exactOptional(),
    }),
  )
  .output(SessionItemListResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })
