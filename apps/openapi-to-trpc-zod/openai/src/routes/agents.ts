import { initTRPC, TRPCError } from '@trpc/server'
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

const t = initTRPC.create()

export const agentsRouter = t.router({
  getAgentsAutomations: t.procedure
    .input(
      z.object({
        limit: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64().min(1n).max(100n))
          .default(20n)
          .exactOptional(),
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
              description:
                'The ID of the first resource in `data`, or `null` if the page is empty.',
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postAgentsAutomations: t.procedure
    .input(CreateAutomationParamsSchema)
    .output(AutomationResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsAutomationsAutomationId: t.procedure
    .input(z.object({ automation_id: z.string().min(0).max(1048576) }))
    .output(AutomationResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postAgentsAutomationsAutomationId: t.procedure
    .input(
      z.object({
        automation_id: z.string().min(0).max(1048576),
        name: z.string().min(1).max(256).exactOptional(),
        target: AutomationTargetParamSchema.meta({
          description: 'Replaces the complete target, retaining its type and any creator session.',
        }).exactOptional(),
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
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteAgentsAutomationsAutomationId: t.procedure
    .input(z.object({ automation_id: z.string().min(0).max(1048576) }))
    .output(DeletedAutomationResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postAgentsAutomationsAutomationIdPause: t.procedure
    .input(z.object({ automation_id: z.string().min(0).max(1048576) }))
    .output(AutomationResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postAgentsAutomationsAutomationIdResume: t.procedure
    .input(z.object({ automation_id: z.string().min(0).max(1048576) }))
    .output(AutomationResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsAutomationsAutomationIdInvocations: t.procedure
    .input(
      z.object({
        automation_id: z.string().min(0).max(1048576),
        limit: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64().min(1n).max(100n))
          .default(20n)
          .exactOptional(),
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
              description:
                'The ID of the first resource in `data`, or `null` if the page is empty.',
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postAgentsAutomationsAutomationIdInvocations: t.procedure
    .input(z.object({ automation_id: z.string().min(0).max(1048576) }))
    .output(AutomationInvocationResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsAutomationsAutomationIdInvocationsInvocationId: t.procedure
    .input(
      z.object({
        automation_id: z.string().min(0).max(1048576),
        invocation_id: z.string().min(0).max(1048576),
      }),
    )
    .output(AutomationInvocationResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsEnvironments: t.procedure
    .input(
      z.object({
        limit: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64().min(1n).max(100n))
          .default(20n)
          .exactOptional(),
        order: ListOrderParamSchema.default('desc').exactOptional(),
        after: z.string().min(0).max(1048576).exactOptional(),
        type: EnvironmentTypeParamSchema.exactOptional(),
      }),
    )
    .output(
      AgentEnvironmentListResourceSchema.meta({
        description: 'An ID-paginated list of owned environments.',
      }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postAgentsEnvironments: t.procedure
    .input(CreateAgentEnvironmentParamsSchema)
    .output(PublicEnvironmentResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsEnvironmentsEnvironmentId: t.procedure
    .input(z.object({ environment_id: z.string().min(0).max(1048576) }))
    .output(PublicEnvironmentResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsEnvironmentsEnvironmentIdFiles: t.procedure
    .input(
      z.object({
        environment_id: z.string().min(0).max(1048576),
        path: z.string().min(0).max(1048576).nullable().exactOptional(),
        limit: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64().min(1n).max(100n))
          .nullable()
          .exactOptional(),
        order: ListOrderParamSchema.exactOptional(),
        page: z.string().min(0).max(1048576).exactOptional(),
      }),
    )
    .output(EnvironmentFileListResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postAgentsEnvironmentsEnvironmentIdFiles: t.procedure
    .input(
      z.object({
        environment_id: z.string().min(0).max(1048576),
        body: HostedEnvironmentFileParamSchema,
      }),
    )
    .output(EnvironmentFileResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsSessionsSessionIdSubagents: t.procedure
    .input(
      z.object({
        session_id: z.string().min(0).max(1048576),
        limit: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64().min(1n).max(100n))
          .default(20n)
          .exactOptional(),
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
              description:
                'The ID of the first resource in `data`, or `null` if the page is empty.',
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsSessionsSessionIdSubagentsSubagentId: t.procedure
    .input(
      z.object({
        session_id: z.string().min(0).max(1048576),
        subagent_id: z.string().min(0).max(1048576),
      }),
    )
    .output(SubagentResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsSessionsSessionIdSubagentsSubagentIdItems: t.procedure
    .input(
      z.object({
        session_id: z.string().min(0).max(1048576),
        subagent_id: z.string().min(0).max(1048576),
        limit: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64().min(1n).max(100n))
          .default(20n)
          .exactOptional(),
        order: ListOrderParamSchema.default('desc').exactOptional(),
        after: z.string().min(0).max(1048576).exactOptional(),
      }),
    )
    .output(SessionItemListResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsSessionsSessionIdSubagentsSubagentIdTurns: t.procedure
    .input(
      z.object({
        session_id: z.string().min(0).max(1048576),
        subagent_id: z.string().min(0).max(1048576),
        limit: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64().min(1n).max(100n))
          .default(20n)
          .exactOptional(),
        order: ListOrderParamSchema.default('desc').exactOptional(),
        after: z.string().min(0).max(1048576).exactOptional(),
      }),
    )
    .output(
      SessionTurnListResourceSchema.meta({
        description: 'A page of turns from an agent session or subagent.',
      }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsSessionsSessionIdSubagentsSubagentIdTurnsTurnId: t.procedure
    .input(
      z.object({
        session_id: z.string().min(0).max(1048576),
        subagent_id: z.string().min(0).max(1048576),
        turn_id: z.string().min(0).max(1048576),
      }),
    )
    .output(TurnResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsSessionsSessionIdSubagentsSubagentIdTurnsTurnIdItems: t.procedure
    .input(
      z.object({
        session_id: z.string().min(0).max(1048576),
        subagent_id: z.string().min(0).max(1048576),
        turn_id: z.string().min(0).max(1048576),
        limit: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64().min(1n).max(100n))
          .default(20n)
          .exactOptional(),
        order: ListOrderParamSchema.default('desc').exactOptional(),
        after: z.string().min(0).max(1048576).exactOptional(),
      }),
    )
    .output(SessionItemListResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgents: t.procedure
    .input(
      z.object({
        limit: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64().min(1n).max(100n))
          .default(20n)
          .exactOptional(),
        order: ListOrderParamSchema.default('desc').exactOptional(),
        after: z.string().min(0).max(1048576).exactOptional(),
      }),
    )
    .output(AgentListResourceSchema.meta({ description: 'A page of reusable agents.' }))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postAgents: t.procedure
    .input(CreateAgentParamsSchema)
    .output(AgentResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsAgentId: t.procedure
    .input(z.object({ agent_id: z.string().min(0).max(1048576) }))
    .output(AgentResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postAgentsAgentId: t.procedure
    .input(
      z.object({
        agent_id: z.string().min(0).max(1048576),
        experimental: ExperimentalConfigOverridesParamSchema.default({})
          .meta({
            description:
              'Experimental settings to merge by key. Omitted settings keep their current values.',
          })
          .exactOptional(),
        model: z
          .string()
          .min(0)
          .max(1048576)
          .meta({
            description: 'The model to use for the agent. The requested model name is preserved.',
          })
          .exactOptional(),
        reasoning: z
          .union([ReasoningParamSchema, z.null()])
          .meta({
            description:
              "Configuration for model reasoning. Omit to keep the current settings; pass `null` to reset to the model's default effort.",
          })
          .exactOptional(),
        text: z
          .union([TextParamSchema, z.null()])
          .meta({ description: 'Configuration for text generated by the agent.' })
          .exactOptional(),
        service_tier: z
          .union([ServiceTierParamSchema, z.null()])
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
          .union([MultiAgentConfigCurrentParamSchema, z.null()])
          .meta({ description: 'Configuration for creating and coordinating subagents.' })
          .exactOptional(),
        compaction: z
          .union([CompactionParamSchema, z.null()])
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
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteAgentsAgentId: t.procedure
    .input(z.object({ agent_id: z.string().min(0).max(1048576) }))
    .output(DeletedAgentResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsEnvironmentsTemplates: t.procedure
    .input(
      z.object({
        limit: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64().min(1n).max(100n))
          .default(20n)
          .exactOptional(),
        order: ListOrderParamSchema.default('desc').exactOptional(),
        after: z.string().min(0).max(1048576).exactOptional(),
      }),
    )
    .output(
      EnvironmentTemplateListResourceSchema.meta({
        description: 'A page of reusable environment templates.',
      }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postAgentsEnvironmentsTemplates: t.procedure
    .input(CreateEnvironmentTemplateParamsSchema)
    .output(EnvironmentTemplateResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsEnvironmentsTemplatesEnvironmentTemplateId: t.procedure
    .input(z.object({ environment_template_id: z.string().min(0).max(1048576) }))
    .output(EnvironmentTemplateResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postAgentsEnvironmentsTemplatesEnvironmentTemplateId: t.procedure
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
          .union([EnvironmentPackagesParamSchema, z.null()])
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
          .union([NetworkPolicyParamSchema, z.null()])
          .meta({
            description:
              'Network access available after setup completes. Omit to preserve the current policy, or pass `null` to reset to the default policy.',
          })
          .exactOptional(),
        desktop: z
          .union([DesktopParamSchema, z.null()])
          .meta({
            description: 'Replacement desktop configuration, or null to disable the desktop.',
          })
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
          .meta({
            description: 'Replacement file configuration materialized for each new session.',
          })
          .exactOptional(),
      }),
    )
    .output(EnvironmentTemplateResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteAgentsEnvironmentsTemplatesEnvironmentTemplateId: t.procedure
    .input(z.object({ environment_template_id: z.string().min(0).max(1048576) }))
    .output(DeletedEnvironmentTemplateResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsSessions: t.procedure
    .input(
      z.object({
        limit: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64().min(1n).max(100n))
          .default(20n)
          .exactOptional(),
        order: ListOrderParamSchema.default('desc').exactOptional(),
        after: z.string().min(0).max(1048576).exactOptional(),
        agent_id: z.string().min(0).max(1048576).exactOptional(),
        metadata: z.record(z.string(), z.string().min(0).max(512)).exactOptional(),
      }),
    )
    .output(SessionListResourceSchema.meta({ description: 'A paginated list of sessions.' }))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postAgentsSessions: t.procedure
    .input(CreateAgentSessionParamsSchema)
    .output(SessionResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsSessionsSessionId: t.procedure
    .input(z.object({ session_id: z.string().min(0).max(1048576) }))
    .output(SessionResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postAgentsSessionsSessionId: t.procedure
    .input(
      z.object({
        session_id: z.string().min(0).max(1048576),
        prompt_cache_options: z
          .union([PromptCacheOptionsParam2Schema, z.null()])
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
        review: SessionReviewParamSchema.meta({
          description:
            'Default action review for new root turns. Existing turns and their subagents keep their review mode.',
        }).exactOptional(),
        spend_control: z
          .union([SessionBudgetControlParamsSchema, z.null()])
          .meta({
            description:
              'Omit to retain the limit; null or a null limit removes it without resetting spend.',
          })
          .exactOptional(),
        agent: UpdateSessionAgentParamSchema.meta({
          description: 'Agent settings to update on this session. Omitted fields stay unchanged.',
        }).exactOptional(),
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
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteAgentsSessionsSessionId: t.procedure
    .input(z.object({ session_id: z.string().min(0).max(1048576) }))
    .output(DeletedSessionResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsSessionsSessionIdArtifacts: t.procedure
    .input(
      z.object({
        session_id: z.string().min(0).max(1048576),
        limit: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64().min(1n).max(100n))
          .default(20n)
          .exactOptional(),
        order: ListOrderParamSchema.default('desc').exactOptional(),
        after: z.string().min(0).max(1048576).exactOptional(),
        environment_id: z.string().min(0).max(1048576).nullable().exactOptional(),
      }),
    )
    .output(
      SessionArtifactListResourceSchema.meta({
        description: 'A page of durable artifacts published by a session.',
      }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsSessionsSessionIdArtifactsArtifactId: t.procedure
    .input(
      z.object({
        session_id: z.string().min(0).max(1048576),
        artifact_id: z.string().min(0).max(1048576),
      }),
    )
    .output(SessionArtifactResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteAgentsSessionsSessionIdArtifactsArtifactId: t.procedure
    .input(
      z.object({
        session_id: z.string().min(0).max(1048576),
        artifact_id: z.string().min(0).max(1048576),
      }),
    )
    .output(DeletedSessionArtifactResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsSessionsSessionIdArtifactsArtifactIdContent: t.procedure
    .input(
      z.object({
        session_id: z.string().min(0).max(1048576),
        artifact_id: z.string().min(0).max(1048576),
      }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsSessionsSessionIdEvents: t.procedure
    .input(
      z.object({
        session_id: z.string().min(0).max(1048576),
        include_obfuscation: z.boolean().default(true).exactOptional(),
      }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postAgentsSessionsSessionIdEvents: t.procedure
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
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsSessionsSessionIdItems: t.procedure
    .input(
      z.object({
        session_id: z.string().min(0).max(1048576),
        limit: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64().min(1n).max(100n))
          .default(20n)
          .exactOptional(),
        order: ListOrderParamSchema.default('desc').exactOptional(),
        after: z.string().min(0).max(1048576).exactOptional(),
      }),
    )
    .output(SessionItemListResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsSessionsSessionIdTraces: t.procedure
    .input(
      z.object({
        session_id: z.string().min(0).max(1048576),
        limit: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64().min(1n).max(100n))
          .default(20n)
          .exactOptional(),
        order: ListOrderParamSchema.default('desc').exactOptional(),
        after: z.string().min(0).max(1048576).exactOptional(),
      }),
    )
    .output(
      SessionTraceListResourceSchema.meta({ description: 'A page of published session traces.' }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsSessionsSessionIdTurns: t.procedure
    .input(
      z.object({
        session_id: z.string().min(0).max(1048576),
        limit: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64().min(1n).max(100n))
          .default(20n)
          .exactOptional(),
        order: ListOrderParamSchema.default('desc').exactOptional(),
        after: z.string().min(0).max(1048576).exactOptional(),
      }),
    )
    .output(
      SessionTurnListResourceSchema.meta({
        description: 'A page of turns from an agent session or subagent.',
      }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsSessionsSessionIdTurnsTurnId: t.procedure
    .input(
      z.object({
        session_id: z.string().min(0).max(1048576),
        turn_id: z.string().min(0).max(1048576),
      }),
    )
    .output(TurnResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsSessionsSessionIdTurnsTurnIdItems: t.procedure
    .input(
      z.object({
        session_id: z.string().min(0).max(1048576),
        turn_id: z.string().min(0).max(1048576),
        limit: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64().min(1n).max(100n))
          .default(20n)
          .exactOptional(),
        order: ListOrderParamSchema.default('desc').exactOptional(),
        after: z.string().min(0).max(1048576).exactOptional(),
      }),
    )
    .output(SessionItemListResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
