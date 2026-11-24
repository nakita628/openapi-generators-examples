import { initTRPC, TRPCError } from '@trpc/server'
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

const t = initTRPC.create()

export const agentsRouter = t.router({
  getAgentsAutomations: t.procedure
    .input(
      type({
        'limit?': type('bigint | number.integer')
          .or(/^-?\d+$/)
          .pipe((data) => BigInt(data))
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
      type({
        automation_id: type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
      }),
    )
    .output(AutomationResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postAgentsAutomationsAutomationId: t.procedure
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
        'target?': AutomationTargetParamSchema.describe(
          'Replaces the complete target, retaining its type and any creator session.',
        ),
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
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteAgentsAutomationsAutomationId: t.procedure
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
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postAgentsAutomationsAutomationIdPause: t.procedure
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
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postAgentsAutomationsAutomationIdResume: t.procedure
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
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsAutomationsAutomationIdInvocations: t.procedure
    .input(
      type({
        automation_id: type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
        'limit?': type('bigint | number.integer')
          .or(/^-?\d+$/)
          .pipe((data) => BigInt(data))
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postAgentsAutomationsAutomationIdInvocations: t.procedure
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
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsAutomationsAutomationIdInvocationsInvocationId: t.procedure
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsEnvironments: t.procedure
    .input(
      type({
        'limit?': type('bigint | number.integer')
          .or(/^-?\d+$/)
          .pipe((data) => BigInt(data))
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
    .output(
      AgentEnvironmentListResourceSchema.describe('An ID-paginated list of owned environments.'),
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
      type({
        environment_id: type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
      }),
    )
    .output(PublicEnvironmentResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsEnvironmentsEnvironmentIdFiles: t.procedure
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
              (data, ctx) =>
                [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
            ),
        ).or('null'),
        'limit?': type(
          type('bigint | number.integer')
            .or(/^-?\d+$/)
            .pipe((data) => BigInt(data))
            .narrow(
              (data, ctx) =>
                (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
                ctx.mustBe('an int64'),
            )
            .narrow((data, ctx) => data >= 1n || ctx.mustBe('at least 1'))
            .narrow((data, ctx) => data <= 100n || ctx.mustBe('at most 100')),
        ).or('null'),
        'order?': ListOrderParamSchema,
        'page?': type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
      }),
    )
    .output(EnvironmentFileListResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postAgentsEnvironmentsEnvironmentIdFiles: t.procedure
    .input(
      type({
        environment_id: type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
        body: HostedEnvironmentFileParamSchema,
      }),
    )
    .output(EnvironmentFileResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsSessionsSessionIdSubagents: t.procedure
    .input(
      type({
        session_id: type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
        'limit?': type('bigint | number.integer')
          .or(/^-?\d+$/)
          .pipe((data) => BigInt(data))
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsSessionsSessionIdSubagentsSubagentId: t.procedure
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsSessionsSessionIdSubagentsSubagentIdItems: t.procedure
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
        'limit?': type('bigint | number.integer')
          .or(/^-?\d+$/)
          .pipe((data) => BigInt(data))
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsSessionsSessionIdSubagentsSubagentIdTurns: t.procedure
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
        'limit?': type('bigint | number.integer')
          .or(/^-?\d+$/)
          .pipe((data) => BigInt(data))
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
      SessionTurnListResourceSchema.describe('A page of turns from an agent session or subagent.'),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsSessionsSessionIdSubagentsSubagentIdTurnsTurnId: t.procedure
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsSessionsSessionIdSubagentsSubagentIdTurnsTurnIdItems: t.procedure
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
        'limit?': type('bigint | number.integer')
          .or(/^-?\d+$/)
          .pipe((data) => BigInt(data))
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgents: t.procedure
    .input(
      type({
        'limit?': type('bigint | number.integer')
          .or(/^-?\d+$/)
          .pipe((data) => BigInt(data))
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
    .output(AgentListResourceSchema.describe('A page of reusable agents.'))
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postAgentsAgentId: t.procedure
    .input(
      type({
        agent_id: type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
        'experimental?': ExperimentalConfigOverridesParamSchema.describe(
          'Experimental settings to merge by key. Omitted settings keep their current values.',
        ),
        'model?': type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          )
          .describe('The model to use for the agent. The requested model name is preserved.'),
        'reasoning?': type(ReasoningParamSchema)
          .or('null')
          .describe(
            "Configuration for model reasoning. Omit to keep the current settings; pass `null` to reset to the model's default effort.",
          ),
        'text?': type(TextParamSchema)
          .or('null')
          .describe('Configuration for text generated by the agent.'),
        'service_tier?': type(ServiceTierParamSchema)
          .or('null')
          .describe('The service tier used for model requests.'),
        'instructions?': type(
          type('string')
            .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
            .narrow(
              (data, ctx) =>
                [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
            ),
        )
          .or('null')
          .describe(
            "Additional instructions appended to the agent's default base instructions. Omit to leave unchanged.",
          ),
        'multi_agent?': type(MultiAgentConfigCurrentParamSchema)
          .or('null')
          .describe('Configuration for creating and coordinating subagents.'),
        'compaction?': type(CompactionParamSchema)
          .or('null')
          .describe(
            'Context compaction settings. Omit to keep the current settings. A supplied object replaces the settings; null or an empty object uses blocking compaction.',
          ),
        'metadata?': type(
          type({
            '[string]': type('string')
              .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
              .narrow(
                (data, ctx) => [...data].length <= 512 || ctx.mustBe('at most 512 characters'),
              ),
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
          type(type(PersistedAgentToolConfigParamSchema).array()).and(
            type('0 <= unknown[] <= 2000'),
          ),
        )
          .or('null')
          .describe(
            'Replaces the tool list. Omit to leave it unchanged, or pass null to clear it. The replacement must fit within 3 MiB (3,145,728 bytes) of compact UTF-8 JSON.',
          ),
      }),
    )
    .output(AgentResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteAgentsAgentId: t.procedure
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
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsEnvironmentsTemplates: t.procedure
    .input(
      type({
        'limit?': type('bigint | number.integer')
          .or(/^-?\d+$/)
          .pipe((data) => BigInt(data))
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
      EnvironmentTemplateListResourceSchema.describe('A page of reusable environment templates.'),
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
      type({
        environment_template_id: type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
      }),
    )
    .output(EnvironmentTemplateResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postAgentsEnvironmentsTemplatesEnvironmentTemplateId: t.procedure
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
          .or('null')
          .describe('Packages installed before the runtime network policy applies.'),
        'setup_commands?': type(
          type(type(SetupCommandParamSchema).array()).and(type('0 <= unknown[] <= 16')),
        )
          .or('null')
          .describe(
            'Replacement confidential setup commands, never included in returned resources.',
          ),
        'network?': type(NetworkPolicyParamSchema)
          .or('null')
          .describe(
            'Network access available after setup completes. Omit to preserve the current policy, or pass `null` to reset to the default policy.',
          ),
        'desktop?': type(DesktopParamSchema)
          .or('null')
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
        'skills?': type(
          type(type(HostedSkillParamSchema).array()).and(type('0 <= unknown[] <= 200')),
        )
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
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteAgentsEnvironmentsTemplatesEnvironmentTemplateId: t.procedure
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
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsSessions: t.procedure
    .input(
      type({
        'limit?': type('bigint | number.integer')
          .or(/^-?\d+$/)
          .pipe((data) => BigInt(data))
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
    )
    .output(SessionListResourceSchema.describe('A paginated list of sessions.'))
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
      type({
        session_id: type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
      }),
    )
    .output(SessionResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postAgentsSessionsSessionId: t.procedure
    .input(
      type({
        session_id: type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
        'prompt_cache_options?': type(PromptCacheOptionsParam2Schema)
          .or('null')
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
        'review?': SessionReviewParamSchema.describe(
          'Default action review for new root turns. Existing turns and their subagents keep their review mode.',
        ),
        'spend_control?': type(SessionBudgetControlParamsSchema)
          .or('null')
          .describe(
            'Omit to retain the limit; null or a null limit removes it without resetting spend.',
          ),
        'agent?': UpdateSessionAgentParamSchema.describe(
          'Agent settings to update on this session. Omitted fields stay unchanged.',
        ),
        'metadata?': type(
          type({
            '[string]': type('string')
              .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
              .narrow(
                (data, ctx) => [...data].length <= 512 || ctx.mustBe('at most 512 characters'),
              ),
          }),
        )
          .or('null')
          .describe(
            'Replaces all metadata. Omit to leave unchanged, or pass null or {} to clear it. Up to 16 string key-value pairs, with keys up to 64 and values up to 512 characters.',
          ),
      }),
    )
    .output(SessionResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteAgentsSessionsSessionId: t.procedure
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
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsSessionsSessionIdArtifacts: t.procedure
    .input(
      type({
        session_id: type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
        'limit?': type('bigint | number.integer')
          .or(/^-?\d+$/)
          .pipe((data) => BigInt(data))
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
    )
    .output(
      SessionArtifactListResourceSchema.describe(
        'A page of durable artifacts published by a session.',
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsSessionsSessionIdArtifactsArtifactId: t.procedure
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteAgentsSessionsSessionIdArtifactsArtifactId: t.procedure
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
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsSessionsSessionIdArtifactsArtifactIdContent: t.procedure
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsSessionsSessionIdEvents: t.procedure
    .input(
      type({
        session_id: type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
        'include_obfuscation?': 'boolean',
      }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postAgentsSessionsSessionIdEvents: t.procedure
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
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsSessionsSessionIdItems: t.procedure
    .input(
      type({
        session_id: type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
        'limit?': type('bigint | number.integer')
          .or(/^-?\d+$/)
          .pipe((data) => BigInt(data))
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsSessionsSessionIdTraces: t.procedure
    .input(
      type({
        session_id: type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
        'limit?': type('bigint | number.integer')
          .or(/^-?\d+$/)
          .pipe((data) => BigInt(data))
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
    .output(SessionTraceListResourceSchema.describe('A page of published session traces.'))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsSessionsSessionIdTurns: t.procedure
    .input(
      type({
        session_id: type('string')
          .narrow((data, ctx) => [...data].length >= 0 || ctx.mustBe('at least 0 characters'))
          .narrow(
            (data, ctx) => [...data].length <= 1048576 || ctx.mustBe('at most 1048576 characters'),
          ),
        'limit?': type('bigint | number.integer')
          .or(/^-?\d+$/)
          .pipe((data) => BigInt(data))
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
      SessionTurnListResourceSchema.describe('A page of turns from an agent session or subagent.'),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsSessionsSessionIdTurnsTurnId: t.procedure
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsSessionsSessionIdTurnsTurnIdItems: t.procedure
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
        'limit?': type('bigint | number.integer')
          .or(/^-?\d+$/)
          .pipe((data) => BigInt(data))
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
