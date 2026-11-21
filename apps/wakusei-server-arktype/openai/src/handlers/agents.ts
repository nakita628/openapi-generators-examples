import { os } from '@orpc/server'
import { type } from 'arktype'
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
  )
  .output(
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
        .describe('The ID of the first resource in `data`, or `null` if the page is empty.'),
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
    }).describe('A page of Agents API resources, with IDs for retrieving additional pages.'),
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
  .input(
    type({
      automation_id: type('string')
        .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
        .narrow(
          (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
        ),
    }),
  )
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
    type({
      automation_id: type('string')
        .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
        .narrow(
          (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
        ),
      'name?': type('string')
        .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
        .narrow((data, ctx) => [...data].length <= 256 || ctx.mustBe('at most 256 characters')),
      'target?': AutomationTargetParamSchema,
      'metadata?': type({
        '[string]': type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow((data, ctx) => [...data].length <= 512 || ctx.mustBe('at most 512 characters')),
      }).describe('Replaces all metadata; omit to leave unchanged.'),
      'expression?': type('string')
        .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
        .narrow((data, ctx) => [...data].length <= 256 || ctx.mustBe('at most 256 characters'))
        .describe('Only accepted for periodic automations.'),
      'timezone?': type('string')
        .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
        .narrow((data, ctx) => [...data].length <= 128 || ctx.mustBe('at most 128 characters'))
        .describe('Only accepted for periodic automations.'),
      'run_at?': type('bigint | number.integer')
        .or(/^-?\d+$/)
        .pipe((data) => BigInt(data))
        .narrow(
          (data, ctx) =>
            (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
            ctx.mustBe('an int64'),
        )
        .describe(
          'A future Unix timestamp in seconds; accepted only before a one-time scheduled invocation exists.',
        ),
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
  .input(
    type({
      automation_id: type('string')
        .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
        .narrow(
          (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
        ),
    }),
  )
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
  .input(
    type({
      automation_id: type('string')
        .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
        .narrow(
          (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
        ),
    }),
  )
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
  .input(
    type({
      automation_id: type('string')
        .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
        .narrow(
          (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
        ),
    }),
  )
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
    type({
      automation_id: type('string')
        .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
        .narrow(
          (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
        ),
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
  )
  .output(
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
        .describe('The ID of the first resource in `data`, or `null` if the page is empty.'),
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
    }).describe('A page of Agents API resources, with IDs for retrieving additional pages.'),
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
  .input(
    type({
      automation_id: type('string')
        .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
        .narrow(
          (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
        ),
    }),
  )
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
  .input(
    type({
      environment_id: type('string')
        .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
        .narrow(
          (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
        ),
    }),
  )
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
    type({
      environment_id: type('string')
        .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
        .narrow(
          (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
        ),
      'path?': type(
        type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
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
  .input(
    type({
      environment_id: type('string')
        .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
        .narrow(
          (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
        ),
    }),
  )
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
    type({
      session_id: type('string')
        .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
        .narrow(
          (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
        ),
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
  )
  .output(
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
        .describe('The ID of the first resource in `data`, or `null` if the page is empty.'),
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
    }).describe('A page of Agents API resources, with IDs for retrieving additional pages.'),
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
  .input(
    type({
      agent_id: type('string')
        .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
        .narrow(
          (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
        ),
    }),
  )
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
    type({
      agent_id: type('string')
        .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
        .narrow(
          (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
        ),
      'experimental?': ExperimentalConfigOverridesParamSchema,
      'model?': type('string')
        .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
        .narrow(
          (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
        )
        .describe('The model to use for the agent. The requested model name is preserved.'),
      'reasoning?': type(ReasoningParamSchema)
        .or('null | null')
        .describe(
          "Configuration for model reasoning. Omit to keep the current settings; pass `null` to reset to the model's default effort.",
        ),
      'text?': type(TextParamSchema)
        .or('null | null')
        .describe('Configuration for text generated by the agent.'),
      'service_tier?': type(ServiceTierParamSchema)
        .or('null | null')
        .describe('The service tier used for model requests.'),
      'instructions?': type(
        type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
      )
        .or('null')
        .describe(
          "Additional instructions appended to the agent's default base instructions. Omit to leave unchanged.",
        ),
      'multi_agent?': type(MultiAgentConfigCurrentParamSchema)
        .or('null | null')
        .describe('Configuration for creating and coordinating subagents.'),
      'compaction?': type(CompactionParamSchema)
        .or('null | null')
        .describe(
          'Context compaction settings. Omit to keep the current settings. A supplied object replaces the settings; null or an empty object uses blocking compaction.',
        ),
      'metadata?': type(
        type({
          '[string]': type('string')
            .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
            .narrow((data, ctx) => [...data].length <= 512 || ctx.mustBe('at most 512 characters')),
        }),
      )
        .or('null')
        .describe(
          'Replaces all metadata. Omit to leave unchanged, or pass null or {} to clear it. Up to 16 string key-value pairs, with keys up to 64 and values up to 512 characters.',
        ),
      'name?': type(
        type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow((data, ctx) => [...data].length <= 128 || ctx.mustBe('at most 128 characters')),
      )
        .or('null')
        .describe('A replacement name. Omit to leave unchanged, or pass null to clear it.'),
      'tools?': type(
        type(type(PersistedAgentToolConfigParamSchema).array()).and(type('0 <= unknown[] <= 2000')),
      )
        .or('null')
        .describe(
          'Replaces the tool list. Omit to leave it unchanged, or pass null to clear it. The replacement must fit within 3 MiB (3,145,728 bytes) of compact UTF-8 JSON.',
        ),
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
  .input(
    type({
      agent_id: type('string')
        .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
        .narrow(
          (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
        ),
    }),
  )
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
  .input(
    type({
      environment_template_id: type('string')
        .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
        .narrow(
          (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
        ),
    }),
  )
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
    type({
      environment_template_id: type('string')
        .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
        .narrow(
          (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
        ),
      'name?': type(
        type('string')
          .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
          .narrow((data, ctx) => [...data].length <= 256 || ctx.mustBe('at most 256 characters')),
      )
        .or('null')
        .describe('A replacement human-readable display name, or `null` to clear the name.'),
      'packages?': type(EnvironmentPackagesParamSchema)
        .or('null | null')
        .describe('Packages installed before the runtime network policy applies.'),
      'setup_commands?': type(
        type(type(SetupCommandParamSchema).array()).and(type('0 <= unknown[] <= 16')),
      )
        .or('null')
        .describe('Replacement confidential setup commands, never included in returned resources.'),
      'network?': type(NetworkPolicyParamSchema)
        .or('null | null')
        .describe(
          'Network access available after setup completes. Omit to preserve the current policy, or pass `null` to reset to the default policy.',
        ),
      'desktop?': type(DesktopParamSchema)
        .or('null | null')
        .describe('Replacement desktop configuration, or null to disable the desktop.'),
      'env?': type(
        type({
          '[string]': type('string')
            .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
            .narrow(
              (data, ctx) =>
                [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
            ),
        }),
      )
        .or('null')
        .describe('Replacement confidential environment values.'),
      'capability_directories?': type(
        type(
          type(
            type('string')
              .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
              .narrow(
                (data, ctx) =>
                  [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
              ),
          ).array(),
        ).and(type('0 <= unknown[] <= 16384')),
      )
        .or('null')
        .describe('Directories that expose capabilities to the agent.'),
      'skills?': type(type(type(HostedSkillParamSchema).array()).and(type('0 <= unknown[] <= 200')))
        .or('null')
        .describe('Replacement skill configuration installed for each new session.'),
      'plugins?': type(
        type(type(HostedPluginParamSchema).array()).and(type('0 <= unknown[] <= 32')),
      )
        .or('null')
        .describe('Replacement plugin configuration installed for each new session.'),
      'files?': type(
        type(type(HostedEnvironmentFileParamSchema).array()).and(type('0 <= unknown[] <= 50')),
      )
        .or('null')
        .describe('Replacement file configuration materialized for each new session.'),
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
  .input(
    type({
      environment_template_id: type('string')
        .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
        .narrow(
          (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
        ),
    }),
  )
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
      'metadata?': type('unknown').pipe(
        (data) => {
          if (typeof data !== 'object' || data === null || Array.isArray(data)) return data
          const out = Object.entries(data).reduce<{ [k: string]: unknown }>((acc, [key, value]) => {
            const name = /^[^[\]]+\[([^\]]+)\]$/u.exec(key)?.[1]
            return name === undefined ? acc : { ...acc, [name]: value }
          }, {})
          return Object.keys(out).length > 0 ? out : data
        },
        type({
          '[string]': type('string')
            .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
            .narrow((data, ctx) => [...data].length <= 512 || ctx.mustBe('at most 512 characters')),
        }),
      ),
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
  .input(
    type({
      session_id: type('string')
        .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
        .narrow(
          (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
        ),
    }),
  )
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
    type({
      session_id: type('string')
        .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
        .narrow(
          (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
        ),
      'prompt_cache_options?': type(PromptCacheOptionsParam2Schema)
        .or('null | null')
        .describe(
          'Default prompt cache lifetime for future turns. Send null to clear the session default.',
        ),
      'vault_ids?': type(
        type(
          type(
            type('string')
              .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
              .narrow(
                (data, ctx) =>
                  [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
              ),
          ).array(),
        ).and(type('0 <= unknown[] <= 16384')),
      )
        .or('null')
        .describe(
          "Replaces the session's referenced vaults. Omit to retain them; null or [] clears them.",
        ),
      'review?': SessionReviewParamSchema,
      'spend_control?': type(SessionBudgetControlParamsSchema)
        .or('null | null')
        .describe(
          'Omit to retain the limit; null or a null limit removes it without resetting spend.',
        ),
      'agent?': UpdateSessionAgentParamSchema,
      'metadata?': type(
        type({
          '[string]': type('string')
            .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
            .narrow((data, ctx) => [...data].length <= 512 || ctx.mustBe('at most 512 characters')),
        }),
      )
        .or('null')
        .describe(
          'Replaces all metadata. Omit to leave unchanged, or pass null or {} to clear it. Up to 16 string key-value pairs, with keys up to 64 and values up to 512 characters.',
        ),
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
  .input(
    type({
      session_id: type('string')
        .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
        .narrow(
          (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
        ),
    }),
  )
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
    type({
      session_id: type('string')
        .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
        .narrow(
          (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
        ),
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
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
      ).or('null'),
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
    type({
      session_id: type('string')
        .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
        .narrow(
          (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
        ),
      'include_obfuscation?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
        (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
      ),
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
    type({
      session_id: type('string')
        .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
        .narrow(
          (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
        ),
      events: type(type(SessionInputParamSchema).array())
        .and(type('0 <= unknown[] <= 16384'))
        .describe('The input events to submit to the session.'),
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
    type({
      session_id: type('string')
        .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
        .narrow(
          (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
        ),
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
    type({
      session_id: type('string')
        .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
        .narrow(
          (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
        ),
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
    type({
      session_id: type('string')
        .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
        .narrow(
          (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
        ),
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
  )
  .output(SessionItemListResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })
