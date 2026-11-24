import { initTRPC, TRPCError } from '@trpc/server'
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

const t = initTRPC.create()

export const agentsRouter = t.router({
  getAgentsAutomations: t.procedure
    .input(
      v.object({
        limit: v.optional(
          v.pipe(
            v.union([
              v.bigint(),
              v.pipe(v.number(), v.integer()),
              v.pipe(v.string(), v.regex(/^-?\d+$/)),
            ]),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(100n),
          ),
          20n,
        ),
        order: v.optional(ListOrderParamSchema, 'desc'),
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
            v.description(
              'The ID of the first resource in `data`, or `null` if the page is empty.',
            ),
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
    .input(
      v.object({ automation_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)) }),
    )
    .output(AutomationResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postAgentsAutomationsAutomationId: t.procedure
    .input(
      v.object({
        automation_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
        name: v.optional(v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(256))),
        target: v.optional(
          v.pipe(
            AutomationTargetParamSchema,
            v.description(
              'Replaces the complete target, retaining its type and any creator session.',
            ),
          ),
        ),
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
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteAgentsAutomationsAutomationId: t.procedure
    .input(
      v.object({ automation_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)) }),
    )
    .output(DeletedAutomationResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postAgentsAutomationsAutomationIdPause: t.procedure
    .input(
      v.object({ automation_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)) }),
    )
    .output(AutomationResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postAgentsAutomationsAutomationIdResume: t.procedure
    .input(
      v.object({ automation_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)) }),
    )
    .output(AutomationResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsAutomationsAutomationIdInvocations: t.procedure
    .input(
      v.object({
        automation_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
        limit: v.optional(
          v.pipe(
            v.union([
              v.bigint(),
              v.pipe(v.number(), v.integer()),
              v.pipe(v.string(), v.regex(/^-?\d+$/)),
            ]),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(100n),
          ),
          20n,
        ),
        order: v.optional(ListOrderParamSchema, 'desc'),
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
            v.description(
              'The ID of the first resource in `data`, or `null` if the page is empty.',
            ),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postAgentsAutomationsAutomationIdInvocations: t.procedure
    .input(
      v.object({ automation_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)) }),
    )
    .output(AutomationInvocationResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsAutomationsAutomationIdInvocationsInvocationId: t.procedure
    .input(
      v.object({
        automation_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
        invocation_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
      }),
    )
    .output(AutomationInvocationResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsEnvironments: t.procedure
    .input(
      v.object({
        limit: v.optional(
          v.pipe(
            v.union([
              v.bigint(),
              v.pipe(v.number(), v.integer()),
              v.pipe(v.string(), v.regex(/^-?\d+$/)),
            ]),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(100n),
          ),
          20n,
        ),
        order: v.optional(ListOrderParamSchema, 'desc'),
        after: v.optional(v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576))),
        type: v.optional(EnvironmentTypeParamSchema),
      }),
    )
    .output(
      v.pipe(
        AgentEnvironmentListResourceSchema,
        v.description('An ID-paginated list of owned environments.'),
      ),
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
    .input(
      v.object({
        environment_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
      }),
    )
    .output(PublicEnvironmentResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsEnvironmentsEnvironmentIdFiles: t.procedure
    .input(
      v.object({
        environment_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
        path: v.optional(
          v.nullable(v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576))),
        ),
        limit: v.optional(
          v.nullable(
            v.pipe(
              v.union([
                v.bigint(),
                v.pipe(v.number(), v.integer()),
                v.pipe(v.string(), v.regex(/^-?\d+$/)),
              ]),
              v.transform((input) => BigInt(input)),
              v.minValue(-9223372036854775808n),
              v.maxValue(9223372036854775807n),
              v.minValue(1n),
              v.maxValue(100n),
            ),
          ),
        ),
        order: v.optional(ListOrderParamSchema),
        page: v.optional(v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576))),
      }),
    )
    .output(EnvironmentFileListResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postAgentsEnvironmentsEnvironmentIdFiles: t.procedure
    .input(
      v.object({
        environment_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
        body: HostedEnvironmentFileParamSchema,
      }),
    )
    .output(EnvironmentFileResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsSessionsSessionIdSubagents: t.procedure
    .input(
      v.object({
        session_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
        limit: v.optional(
          v.pipe(
            v.union([
              v.bigint(),
              v.pipe(v.number(), v.integer()),
              v.pipe(v.string(), v.regex(/^-?\d+$/)),
            ]),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(100n),
          ),
          20n,
        ),
        order: v.optional(ListOrderParamSchema, 'desc'),
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
            v.description(
              'The ID of the first resource in `data`, or `null` if the page is empty.',
            ),
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsSessionsSessionIdSubagentsSubagentId: t.procedure
    .input(
      v.object({
        session_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
        subagent_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
      }),
    )
    .output(SubagentResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsSessionsSessionIdSubagentsSubagentIdItems: t.procedure
    .input(
      v.object({
        session_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
        subagent_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
        limit: v.optional(
          v.pipe(
            v.union([
              v.bigint(),
              v.pipe(v.number(), v.integer()),
              v.pipe(v.string(), v.regex(/^-?\d+$/)),
            ]),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(100n),
          ),
          20n,
        ),
        order: v.optional(ListOrderParamSchema, 'desc'),
        after: v.optional(v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576))),
      }),
    )
    .output(SessionItemListResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsSessionsSessionIdSubagentsSubagentIdTurns: t.procedure
    .input(
      v.object({
        session_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
        subagent_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
        limit: v.optional(
          v.pipe(
            v.union([
              v.bigint(),
              v.pipe(v.number(), v.integer()),
              v.pipe(v.string(), v.regex(/^-?\d+$/)),
            ]),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(100n),
          ),
          20n,
        ),
        order: v.optional(ListOrderParamSchema, 'desc'),
        after: v.optional(v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576))),
      }),
    )
    .output(
      v.pipe(
        SessionTurnListResourceSchema,
        v.description('A page of turns from an agent session or subagent.'),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsSessionsSessionIdSubagentsSubagentIdTurnsTurnId: t.procedure
    .input(
      v.object({
        session_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
        subagent_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
        turn_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
      }),
    )
    .output(TurnResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsSessionsSessionIdSubagentsSubagentIdTurnsTurnIdItems: t.procedure
    .input(
      v.object({
        session_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
        subagent_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
        turn_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
        limit: v.optional(
          v.pipe(
            v.union([
              v.bigint(),
              v.pipe(v.number(), v.integer()),
              v.pipe(v.string(), v.regex(/^-?\d+$/)),
            ]),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(100n),
          ),
          20n,
        ),
        order: v.optional(ListOrderParamSchema, 'desc'),
        after: v.optional(v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576))),
      }),
    )
    .output(SessionItemListResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgents: t.procedure
    .input(
      v.object({
        limit: v.optional(
          v.pipe(
            v.union([
              v.bigint(),
              v.pipe(v.number(), v.integer()),
              v.pipe(v.string(), v.regex(/^-?\d+$/)),
            ]),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(100n),
          ),
          20n,
        ),
        order: v.optional(ListOrderParamSchema, 'desc'),
        after: v.optional(v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576))),
      }),
    )
    .output(v.pipe(AgentListResourceSchema, v.description('A page of reusable agents.')))
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
    .input(v.object({ agent_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)) }))
    .output(AgentResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postAgentsAgentId: t.procedure
    .input(
      v.object({
        agent_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
        experimental: v.pipe(
          v.optional(ExperimentalConfigOverridesParamSchema, {}),
          v.description(
            'Experimental settings to merge by key. Omitted settings keep their current values.',
          ),
        ),
        model: v.optional(
          v.pipe(
            v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
            v.description('The model to use for the agent. The requested model name is preserved.'),
          ),
        ),
        reasoning: v.optional(
          v.pipe(
            v.union([ReasoningParamSchema, v.null()]),
            v.description(
              "Configuration for model reasoning. Omit to keep the current settings; pass `null` to reset to the model's default effort.",
            ),
          ),
        ),
        text: v.optional(
          v.pipe(
            v.union([TextParamSchema, v.null()]),
            v.description('Configuration for text generated by the agent.'),
          ),
        ),
        service_tier: v.optional(
          v.pipe(
            v.union([ServiceTierParamSchema, v.null()]),
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
            v.union([MultiAgentConfigCurrentParamSchema, v.null()]),
            v.description('Configuration for creating and coordinating subagents.'),
          ),
        ),
        compaction: v.optional(
          v.pipe(
            v.union([CompactionParamSchema, v.null()]),
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
              v.pipe(
                v.array(PersistedAgentToolConfigParamSchema),
                v.minLength(0),
                v.maxLength(2000),
              ),
            ),
            v.description(
              'Replaces the tool list. Omit to leave it unchanged, or pass null to clear it. The replacement must fit within 3 MiB (3,145,728 bytes) of compact UTF-8 JSON.',
            ),
          ),
        ),
      }),
    )
    .output(AgentResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteAgentsAgentId: t.procedure
    .input(v.object({ agent_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)) }))
    .output(DeletedAgentResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsEnvironmentsTemplates: t.procedure
    .input(
      v.object({
        limit: v.optional(
          v.pipe(
            v.union([
              v.bigint(),
              v.pipe(v.number(), v.integer()),
              v.pipe(v.string(), v.regex(/^-?\d+$/)),
            ]),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(100n),
          ),
          20n,
        ),
        order: v.optional(ListOrderParamSchema, 'desc'),
        after: v.optional(v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576))),
      }),
    )
    .output(
      v.pipe(
        EnvironmentTemplateListResourceSchema,
        v.description('A page of reusable environment templates.'),
      ),
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
    .input(
      v.object({
        environment_template_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
      }),
    )
    .output(EnvironmentTemplateResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postAgentsEnvironmentsTemplatesEnvironmentTemplateId: t.procedure
    .input(
      v.object({
        environment_template_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
        name: v.optional(
          v.pipe(
            v.nullable(v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(256))),
            v.description(
              'A replacement human-readable display name, or `null` to clear the name.',
            ),
          ),
        ),
        packages: v.optional(
          v.pipe(
            v.union([EnvironmentPackagesParamSchema, v.null()]),
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
            v.union([NetworkPolicyParamSchema, v.null()]),
            v.description(
              'Network access available after setup completes. Omit to preserve the current policy, or pass `null` to reset to the default policy.',
            ),
          ),
        ),
        desktop: v.optional(
          v.pipe(
            v.union([DesktopParamSchema, v.null()]),
            v.description('Replacement desktop configuration, or null to disable the desktop.'),
          ),
        ),
        env: v.optional(
          v.pipe(
            v.nullable(
              v.record(
                v.string(),
                v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
              ),
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
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteAgentsEnvironmentsTemplatesEnvironmentTemplateId: t.procedure
    .input(
      v.object({
        environment_template_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
      }),
    )
    .output(DeletedEnvironmentTemplateResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsSessions: t.procedure
    .input(
      v.object({
        limit: v.optional(
          v.pipe(
            v.union([
              v.bigint(),
              v.pipe(v.number(), v.integer()),
              v.pipe(v.string(), v.regex(/^-?\d+$/)),
            ]),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(100n),
          ),
          20n,
        ),
        order: v.optional(ListOrderParamSchema, 'desc'),
        after: v.optional(v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576))),
        agent_id: v.optional(v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576))),
        metadata: v.optional(
          v.record(v.string(), v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(512))),
        ),
      }),
    )
    .output(v.pipe(SessionListResourceSchema, v.description('A paginated list of sessions.')))
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
    .input(
      v.object({ session_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)) }),
    )
    .output(SessionResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postAgentsSessionsSessionId: t.procedure
    .input(
      v.object({
        session_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
        prompt_cache_options: v.optional(
          v.pipe(
            v.union([PromptCacheOptionsParam2Schema, v.null()]),
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
        review: v.optional(
          v.pipe(
            SessionReviewParamSchema,
            v.description(
              'Default action review for new root turns. Existing turns and their subagents keep their review mode.',
            ),
          ),
        ),
        spend_control: v.optional(
          v.pipe(
            v.union([SessionBudgetControlParamsSchema, v.null()]),
            v.description(
              'Omit to retain the limit; null or a null limit removes it without resetting spend.',
            ),
          ),
        ),
        agent: v.optional(
          v.pipe(
            UpdateSessionAgentParamSchema,
            v.description(
              'Agent settings to update on this session. Omitted fields stay unchanged.',
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
      }),
    )
    .output(SessionResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteAgentsSessionsSessionId: t.procedure
    .input(
      v.object({ session_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)) }),
    )
    .output(DeletedSessionResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsSessionsSessionIdArtifacts: t.procedure
    .input(
      v.object({
        session_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
        limit: v.optional(
          v.pipe(
            v.union([
              v.bigint(),
              v.pipe(v.number(), v.integer()),
              v.pipe(v.string(), v.regex(/^-?\d+$/)),
            ]),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(100n),
          ),
          20n,
        ),
        order: v.optional(ListOrderParamSchema, 'desc'),
        after: v.optional(v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576))),
        environment_id: v.optional(
          v.nullable(v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576))),
        ),
      }),
    )
    .output(
      v.pipe(
        SessionArtifactListResourceSchema,
        v.description('A page of durable artifacts published by a session.'),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsSessionsSessionIdArtifactsArtifactId: t.procedure
    .input(
      v.object({
        session_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
        artifact_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
      }),
    )
    .output(SessionArtifactResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteAgentsSessionsSessionIdArtifactsArtifactId: t.procedure
    .input(
      v.object({
        session_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
        artifact_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
      }),
    )
    .output(DeletedSessionArtifactResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsSessionsSessionIdArtifactsArtifactIdContent: t.procedure
    .input(
      v.object({
        session_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
        artifact_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
      }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsSessionsSessionIdEvents: t.procedure
    .input(
      v.object({
        session_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
        include_obfuscation: v.optional(v.boolean(), true),
      }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postAgentsSessionsSessionIdEvents: t.procedure
    .input(
      v.object({
        session_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
        events: v.pipe(
          v.pipe(v.array(SessionInputParamSchema), v.minLength(0), v.maxLength(16384)),
          v.description('The input events to submit to the session.'),
        ),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsSessionsSessionIdItems: t.procedure
    .input(
      v.object({
        session_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
        limit: v.optional(
          v.pipe(
            v.union([
              v.bigint(),
              v.pipe(v.number(), v.integer()),
              v.pipe(v.string(), v.regex(/^-?\d+$/)),
            ]),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(100n),
          ),
          20n,
        ),
        order: v.optional(ListOrderParamSchema, 'desc'),
        after: v.optional(v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576))),
      }),
    )
    .output(SessionItemListResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsSessionsSessionIdTraces: t.procedure
    .input(
      v.object({
        session_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
        limit: v.optional(
          v.pipe(
            v.union([
              v.bigint(),
              v.pipe(v.number(), v.integer()),
              v.pipe(v.string(), v.regex(/^-?\d+$/)),
            ]),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(100n),
          ),
          20n,
        ),
        order: v.optional(ListOrderParamSchema, 'desc'),
        after: v.optional(v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576))),
      }),
    )
    .output(
      v.pipe(SessionTraceListResourceSchema, v.description('A page of published session traces.')),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsSessionsSessionIdTurns: t.procedure
    .input(
      v.object({
        session_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
        limit: v.optional(
          v.pipe(
            v.union([
              v.bigint(),
              v.pipe(v.number(), v.integer()),
              v.pipe(v.string(), v.regex(/^-?\d+$/)),
            ]),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(100n),
          ),
          20n,
        ),
        order: v.optional(ListOrderParamSchema, 'desc'),
        after: v.optional(v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576))),
      }),
    )
    .output(
      v.pipe(
        SessionTurnListResourceSchema,
        v.description('A page of turns from an agent session or subagent.'),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsSessionsSessionIdTurnsTurnId: t.procedure
    .input(
      v.object({
        session_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
        turn_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
      }),
    )
    .output(TurnResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsSessionsSessionIdTurnsTurnIdItems: t.procedure
    .input(
      v.object({
        session_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
        turn_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
        limit: v.optional(
          v.pipe(
            v.union([
              v.bigint(),
              v.pipe(v.number(), v.integer()),
              v.pipe(v.string(), v.regex(/^-?\d+$/)),
            ]),
            v.transform((input) => BigInt(input)),
            v.minValue(-9223372036854775808n),
            v.maxValue(9223372036854775807n),
            v.minValue(1n),
            v.maxValue(100n),
          ),
          20n,
        ),
        order: v.optional(ListOrderParamSchema, 'desc'),
        after: v.optional(v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576))),
      }),
    )
    .output(SessionItemListResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
