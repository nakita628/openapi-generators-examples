import { initTRPC, TRPCError } from '@trpc/server'
import { Schema } from 'effect'
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
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.Union([
            Schema.BigInt,
            Schema.Number.check(Schema.isInt()),
            Schema.String.check(Schema.isPattern(/^-?\d+$/)),
          ])
            .pipe(
              Schema.decodeTo(
                Schema.BigInt,
                SchemaTransformation.transform({
                  decode: (input) => BigInt(input),
                  encode: (output) => output,
                }),
              ),
            )
            .check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
              Schema.isGreaterThanOrEqualToBigInt(1n),
              Schema.isLessThanOrEqualToBigInt(100n),
            )
            .pipe(Schema.withDecodingDefault(Effect.succeed(20n))),
          order: ListOrderParamSchema.pipe(Schema.withDecodingDefault(Effect.succeed('desc'))),
          after: Schema.optional(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length >= 0, {
                expected: 'a string of at least 0 characters',
              }),
              Schema.makeFilter((input) => [...input].length <= 1048576, {
                expected: 'a string of at most 1048576 characters',
              }),
            ),
          ),
          session_id: Schema.optional(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length >= 0, {
                expected: 'a string of at least 0 characters',
              }),
              Schema.makeFilter((input) => [...input].length <= 1048576, {
                expected: 'a string of at most 1048576 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          object: Schema.Literal('list')
            .pipe(Schema.withDecodingDefault(Effect.succeed('list')))
            .annotate({ description: 'The object type, which is always `list`.' }),
          data: Schema.Array(AutomationResourceSchema)
            .check(Schema.isMinLength(0), Schema.isMaxLength(2000))
            .annotate({
              description: 'The resources returned in this page, in the requested sort order.',
            }),
          first_id: Schema.NullOr(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length >= 0, {
                expected: 'a string of at least 0 characters',
              }),
            ),
          ).annotate({
            description: 'The ID of the first resource in `data`, or `null` if the page is empty.',
          }),
          last_id: Schema.NullOr(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length >= 0, {
                expected: 'a string of at least 0 characters',
              }),
            ),
          ).annotate({
            description:
              'The ID of the last resource in `data`, or `null` if the page is empty. Pass this as `after` with the same order and filters.',
          }),
          has_more: Schema.Boolean.annotate({
            description: 'Whether there are more resources to retrieve after this page.',
          }),
        })
          .annotate({ parseOptions: { onExcessProperty: 'error' } })
          .annotate({
            description:
              'A page of Agents API resources, with IDs for retrieving additional pages.',
          }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postAgentsAutomations: t.procedure
    .input(Schema.toStandardSchemaV1(CreateAutomationParamsSchema))
    .output(Schema.toStandardSchemaV1(AutomationResourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsAutomationsAutomationId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          automation_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 0, {
              expected: 'a string of at least 0 characters',
            }),
            Schema.makeFilter((input) => [...input].length <= 1048576, {
              expected: 'a string of at most 1048576 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(AutomationResourceSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postAgentsAutomationsAutomationId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          automation_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 0, {
              expected: 'a string of at least 0 characters',
            }),
            Schema.makeFilter((input) => [...input].length <= 1048576, {
              expected: 'a string of at most 1048576 characters',
            }),
          ),
          name: Schema.optional(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length >= 1, {
                expected: 'a string of at least 1 character',
              }),
              Schema.makeFilter((input) => [...input].length <= 256, {
                expected: 'a string of at most 256 characters',
              }),
            ),
          ),
          target: Schema.optional(
            AutomationTargetParamSchema.annotate({
              description:
                'Replaces the complete target, retaining its type and any creator session.',
            }),
          ),
          metadata: Schema.optional(
            Schema.Record(
              Schema.String,
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length >= 0, {
                  expected: 'a string of at least 0 characters',
                }),
                Schema.makeFilter((input) => [...input].length <= 512, {
                  expected: 'a string of at most 512 characters',
                }),
              ),
            ).annotate({ description: 'Replaces all metadata; omit to leave unchanged.' }),
          ),
          expression: Schema.optional(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length >= 1, {
                expected: 'a string of at least 1 character',
              }),
              Schema.makeFilter((input) => [...input].length <= 256, {
                expected: 'a string of at most 256 characters',
              }),
            ).annotate({ description: 'Only accepted for periodic automations.' }),
          ),
          timezone: Schema.optional(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length >= 1, {
                expected: 'a string of at least 1 character',
              }),
              Schema.makeFilter((input) => [...input].length <= 128, {
                expected: 'a string of at most 128 characters',
              }),
            ).annotate({ description: 'Only accepted for periodic automations.' }),
          ),
          run_at: Schema.optional(
            Schema.Union([
              Schema.BigInt,
              Schema.Number.check(Schema.isInt()),
              Schema.String.check(Schema.isPattern(/^-?\d+$/)),
            ])
              .pipe(
                Schema.decodeTo(
                  Schema.BigInt,
                  SchemaTransformation.transform({
                    decode: (input) => BigInt(input),
                    encode: (output) => output,
                  }),
                ),
              )
              .check(
                Schema.isBetweenBigInt({
                  minimum: -9223372036854775808n,
                  maximum: 9223372036854775807n,
                }),
              )
              .annotate({
                description:
                  'A future Unix timestamp in seconds; accepted only before a one-time scheduled invocation exists.',
              }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(AutomationResourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteAgentsAutomationsAutomationId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          automation_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 0, {
              expected: 'a string of at least 0 characters',
            }),
            Schema.makeFilter((input) => [...input].length <= 1048576, {
              expected: 'a string of at most 1048576 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(DeletedAutomationResourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postAgentsAutomationsAutomationIdPause: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          automation_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 0, {
              expected: 'a string of at least 0 characters',
            }),
            Schema.makeFilter((input) => [...input].length <= 1048576, {
              expected: 'a string of at most 1048576 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(AutomationResourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postAgentsAutomationsAutomationIdResume: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          automation_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 0, {
              expected: 'a string of at least 0 characters',
            }),
            Schema.makeFilter((input) => [...input].length <= 1048576, {
              expected: 'a string of at most 1048576 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(AutomationResourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsAutomationsAutomationIdInvocations: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          automation_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 0, {
              expected: 'a string of at least 0 characters',
            }),
            Schema.makeFilter((input) => [...input].length <= 1048576, {
              expected: 'a string of at most 1048576 characters',
            }),
          ),
          limit: Schema.Union([
            Schema.BigInt,
            Schema.Number.check(Schema.isInt()),
            Schema.String.check(Schema.isPattern(/^-?\d+$/)),
          ])
            .pipe(
              Schema.decodeTo(
                Schema.BigInt,
                SchemaTransformation.transform({
                  decode: (input) => BigInt(input),
                  encode: (output) => output,
                }),
              ),
            )
            .check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
              Schema.isGreaterThanOrEqualToBigInt(1n),
              Schema.isLessThanOrEqualToBigInt(100n),
            )
            .pipe(Schema.withDecodingDefault(Effect.succeed(20n))),
          order: ListOrderParamSchema.pipe(Schema.withDecodingDefault(Effect.succeed('desc'))),
          after: Schema.optional(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length >= 0, {
                expected: 'a string of at least 0 characters',
              }),
              Schema.makeFilter((input) => [...input].length <= 1048576, {
                expected: 'a string of at most 1048576 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          object: Schema.Literal('list')
            .pipe(Schema.withDecodingDefault(Effect.succeed('list')))
            .annotate({ description: 'The object type, which is always `list`.' }),
          data: Schema.Array(AutomationInvocationResourceSchema)
            .check(Schema.isMinLength(0), Schema.isMaxLength(2000))
            .annotate({
              description: 'The resources returned in this page, in the requested sort order.',
            }),
          first_id: Schema.NullOr(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length >= 0, {
                expected: 'a string of at least 0 characters',
              }),
            ),
          ).annotate({
            description: 'The ID of the first resource in `data`, or `null` if the page is empty.',
          }),
          last_id: Schema.NullOr(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length >= 0, {
                expected: 'a string of at least 0 characters',
              }),
            ),
          ).annotate({
            description:
              'The ID of the last resource in `data`, or `null` if the page is empty. Pass this as `after` with the same order and filters.',
          }),
          has_more: Schema.Boolean.annotate({
            description: 'Whether there are more resources to retrieve after this page.',
          }),
        })
          .annotate({ parseOptions: { onExcessProperty: 'error' } })
          .annotate({
            description:
              'A page of Agents API resources, with IDs for retrieving additional pages.',
          }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postAgentsAutomationsAutomationIdInvocations: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          automation_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 0, {
              expected: 'a string of at least 0 characters',
            }),
            Schema.makeFilter((input) => [...input].length <= 1048576, {
              expected: 'a string of at most 1048576 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(AutomationInvocationResourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsAutomationsAutomationIdInvocationsInvocationId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          automation_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 0, {
              expected: 'a string of at least 0 characters',
            }),
            Schema.makeFilter((input) => [...input].length <= 1048576, {
              expected: 'a string of at most 1048576 characters',
            }),
          ),
          invocation_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 0, {
              expected: 'a string of at least 0 characters',
            }),
            Schema.makeFilter((input) => [...input].length <= 1048576, {
              expected: 'a string of at most 1048576 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(AutomationInvocationResourceSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsEnvironments: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.Union([
            Schema.BigInt,
            Schema.Number.check(Schema.isInt()),
            Schema.String.check(Schema.isPattern(/^-?\d+$/)),
          ])
            .pipe(
              Schema.decodeTo(
                Schema.BigInt,
                SchemaTransformation.transform({
                  decode: (input) => BigInt(input),
                  encode: (output) => output,
                }),
              ),
            )
            .check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
              Schema.isGreaterThanOrEqualToBigInt(1n),
              Schema.isLessThanOrEqualToBigInt(100n),
            )
            .pipe(Schema.withDecodingDefault(Effect.succeed(20n))),
          order: ListOrderParamSchema.pipe(Schema.withDecodingDefault(Effect.succeed('desc'))),
          after: Schema.optional(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length >= 0, {
                expected: 'a string of at least 0 characters',
              }),
              Schema.makeFilter((input) => [...input].length <= 1048576, {
                expected: 'a string of at most 1048576 characters',
              }),
            ),
          ),
          type: Schema.optional(EnvironmentTypeParamSchema),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        AgentEnvironmentListResourceSchema.annotate({
          description: 'An ID-paginated list of owned environments.',
        }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postAgentsEnvironments: t.procedure
    .input(Schema.toStandardSchemaV1(CreateAgentEnvironmentParamsSchema))
    .output(Schema.toStandardSchemaV1(PublicEnvironmentResourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsEnvironmentsEnvironmentId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          environment_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 0, {
              expected: 'a string of at least 0 characters',
            }),
            Schema.makeFilter((input) => [...input].length <= 1048576, {
              expected: 'a string of at most 1048576 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(PublicEnvironmentResourceSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsEnvironmentsEnvironmentIdFiles: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          environment_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 0, {
              expected: 'a string of at least 0 characters',
            }),
            Schema.makeFilter((input) => [...input].length <= 1048576, {
              expected: 'a string of at most 1048576 characters',
            }),
          ),
          path: Schema.optional(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length >= 0, {
                  expected: 'a string of at least 0 characters',
                }),
                Schema.makeFilter((input) => [...input].length <= 1048576, {
                  expected: 'a string of at most 1048576 characters',
                }),
              ),
            ),
          ),
          limit: Schema.optional(
            Schema.NullOr(
              Schema.Union([
                Schema.BigInt,
                Schema.Number.check(Schema.isInt()),
                Schema.String.check(Schema.isPattern(/^-?\d+$/)),
              ])
                .pipe(
                  Schema.decodeTo(
                    Schema.BigInt,
                    SchemaTransformation.transform({
                      decode: (input) => BigInt(input),
                      encode: (output) => output,
                    }),
                  ),
                )
                .check(
                  Schema.isBetweenBigInt({
                    minimum: -9223372036854775808n,
                    maximum: 9223372036854775807n,
                  }),
                  Schema.isGreaterThanOrEqualToBigInt(1n),
                  Schema.isLessThanOrEqualToBigInt(100n),
                ),
            ),
          ),
          order: Schema.optional(ListOrderParamSchema),
          page: Schema.optional(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length >= 0, {
                expected: 'a string of at least 0 characters',
              }),
              Schema.makeFilter((input) => [...input].length <= 1048576, {
                expected: 'a string of at most 1048576 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(EnvironmentFileListResourceSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postAgentsEnvironmentsEnvironmentIdFiles: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          environment_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 0, {
              expected: 'a string of at least 0 characters',
            }),
            Schema.makeFilter((input) => [...input].length <= 1048576, {
              expected: 'a string of at most 1048576 characters',
            }),
          ),
          body: HostedEnvironmentFileParamSchema,
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(EnvironmentFileResourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsSessionsSessionIdSubagents: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          session_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 0, {
              expected: 'a string of at least 0 characters',
            }),
            Schema.makeFilter((input) => [...input].length <= 1048576, {
              expected: 'a string of at most 1048576 characters',
            }),
          ),
          limit: Schema.Union([
            Schema.BigInt,
            Schema.Number.check(Schema.isInt()),
            Schema.String.check(Schema.isPattern(/^-?\d+$/)),
          ])
            .pipe(
              Schema.decodeTo(
                Schema.BigInt,
                SchemaTransformation.transform({
                  decode: (input) => BigInt(input),
                  encode: (output) => output,
                }),
              ),
            )
            .check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
              Schema.isGreaterThanOrEqualToBigInt(1n),
              Schema.isLessThanOrEqualToBigInt(100n),
            )
            .pipe(Schema.withDecodingDefault(Effect.succeed(20n))),
          order: ListOrderParamSchema.pipe(Schema.withDecodingDefault(Effect.succeed('desc'))),
          after: Schema.optional(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length >= 0, {
                expected: 'a string of at least 0 characters',
              }),
              Schema.makeFilter((input) => [...input].length <= 1048576, {
                expected: 'a string of at most 1048576 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          object: Schema.Literal('list')
            .pipe(Schema.withDecodingDefault(Effect.succeed('list')))
            .annotate({ description: 'The object type, which is always `list`.' }),
          data: Schema.Array(SubagentResourceSchema)
            .check(Schema.isMinLength(0), Schema.isMaxLength(2000))
            .annotate({
              description: 'The resources returned in this page, in the requested sort order.',
            }),
          first_id: Schema.NullOr(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length >= 0, {
                expected: 'a string of at least 0 characters',
              }),
            ),
          ).annotate({
            description: 'The ID of the first resource in `data`, or `null` if the page is empty.',
          }),
          last_id: Schema.NullOr(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length >= 0, {
                expected: 'a string of at least 0 characters',
              }),
            ),
          ).annotate({
            description:
              'The ID of the last resource in `data`, or `null` if the page is empty. Pass this as `after` with the same order and filters.',
          }),
          has_more: Schema.Boolean.annotate({
            description: 'Whether there are more resources to retrieve after this page.',
          }),
        })
          .annotate({ parseOptions: { onExcessProperty: 'error' } })
          .annotate({
            description:
              'A page of Agents API resources, with IDs for retrieving additional pages.',
          }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsSessionsSessionIdSubagentsSubagentId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          session_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 0, {
              expected: 'a string of at least 0 characters',
            }),
            Schema.makeFilter((input) => [...input].length <= 1048576, {
              expected: 'a string of at most 1048576 characters',
            }),
          ),
          subagent_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 0, {
              expected: 'a string of at least 0 characters',
            }),
            Schema.makeFilter((input) => [...input].length <= 1048576, {
              expected: 'a string of at most 1048576 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(SubagentResourceSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsSessionsSessionIdSubagentsSubagentIdItems: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          session_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 0, {
              expected: 'a string of at least 0 characters',
            }),
            Schema.makeFilter((input) => [...input].length <= 1048576, {
              expected: 'a string of at most 1048576 characters',
            }),
          ),
          subagent_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 0, {
              expected: 'a string of at least 0 characters',
            }),
            Schema.makeFilter((input) => [...input].length <= 1048576, {
              expected: 'a string of at most 1048576 characters',
            }),
          ),
          limit: Schema.Union([
            Schema.BigInt,
            Schema.Number.check(Schema.isInt()),
            Schema.String.check(Schema.isPattern(/^-?\d+$/)),
          ])
            .pipe(
              Schema.decodeTo(
                Schema.BigInt,
                SchemaTransformation.transform({
                  decode: (input) => BigInt(input),
                  encode: (output) => output,
                }),
              ),
            )
            .check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
              Schema.isGreaterThanOrEqualToBigInt(1n),
              Schema.isLessThanOrEqualToBigInt(100n),
            )
            .pipe(Schema.withDecodingDefault(Effect.succeed(20n))),
          order: ListOrderParamSchema.pipe(Schema.withDecodingDefault(Effect.succeed('desc'))),
          after: Schema.optional(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length >= 0, {
                expected: 'a string of at least 0 characters',
              }),
              Schema.makeFilter((input) => [...input].length <= 1048576, {
                expected: 'a string of at most 1048576 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(SessionItemListResourceSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsSessionsSessionIdSubagentsSubagentIdTurns: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          session_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 0, {
              expected: 'a string of at least 0 characters',
            }),
            Schema.makeFilter((input) => [...input].length <= 1048576, {
              expected: 'a string of at most 1048576 characters',
            }),
          ),
          subagent_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 0, {
              expected: 'a string of at least 0 characters',
            }),
            Schema.makeFilter((input) => [...input].length <= 1048576, {
              expected: 'a string of at most 1048576 characters',
            }),
          ),
          limit: Schema.Union([
            Schema.BigInt,
            Schema.Number.check(Schema.isInt()),
            Schema.String.check(Schema.isPattern(/^-?\d+$/)),
          ])
            .pipe(
              Schema.decodeTo(
                Schema.BigInt,
                SchemaTransformation.transform({
                  decode: (input) => BigInt(input),
                  encode: (output) => output,
                }),
              ),
            )
            .check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
              Schema.isGreaterThanOrEqualToBigInt(1n),
              Schema.isLessThanOrEqualToBigInt(100n),
            )
            .pipe(Schema.withDecodingDefault(Effect.succeed(20n))),
          order: ListOrderParamSchema.pipe(Schema.withDecodingDefault(Effect.succeed('desc'))),
          after: Schema.optional(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length >= 0, {
                expected: 'a string of at least 0 characters',
              }),
              Schema.makeFilter((input) => [...input].length <= 1048576, {
                expected: 'a string of at most 1048576 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        SessionTurnListResourceSchema.annotate({
          description: 'A page of turns from an agent session or subagent.',
        }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsSessionsSessionIdSubagentsSubagentIdTurnsTurnId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          session_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 0, {
              expected: 'a string of at least 0 characters',
            }),
            Schema.makeFilter((input) => [...input].length <= 1048576, {
              expected: 'a string of at most 1048576 characters',
            }),
          ),
          subagent_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 0, {
              expected: 'a string of at least 0 characters',
            }),
            Schema.makeFilter((input) => [...input].length <= 1048576, {
              expected: 'a string of at most 1048576 characters',
            }),
          ),
          turn_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 0, {
              expected: 'a string of at least 0 characters',
            }),
            Schema.makeFilter((input) => [...input].length <= 1048576, {
              expected: 'a string of at most 1048576 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(TurnResourceSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsSessionsSessionIdSubagentsSubagentIdTurnsTurnIdItems: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          session_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 0, {
              expected: 'a string of at least 0 characters',
            }),
            Schema.makeFilter((input) => [...input].length <= 1048576, {
              expected: 'a string of at most 1048576 characters',
            }),
          ),
          subagent_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 0, {
              expected: 'a string of at least 0 characters',
            }),
            Schema.makeFilter((input) => [...input].length <= 1048576, {
              expected: 'a string of at most 1048576 characters',
            }),
          ),
          turn_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 0, {
              expected: 'a string of at least 0 characters',
            }),
            Schema.makeFilter((input) => [...input].length <= 1048576, {
              expected: 'a string of at most 1048576 characters',
            }),
          ),
          limit: Schema.Union([
            Schema.BigInt,
            Schema.Number.check(Schema.isInt()),
            Schema.String.check(Schema.isPattern(/^-?\d+$/)),
          ])
            .pipe(
              Schema.decodeTo(
                Schema.BigInt,
                SchemaTransformation.transform({
                  decode: (input) => BigInt(input),
                  encode: (output) => output,
                }),
              ),
            )
            .check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
              Schema.isGreaterThanOrEqualToBigInt(1n),
              Schema.isLessThanOrEqualToBigInt(100n),
            )
            .pipe(Schema.withDecodingDefault(Effect.succeed(20n))),
          order: ListOrderParamSchema.pipe(Schema.withDecodingDefault(Effect.succeed('desc'))),
          after: Schema.optional(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length >= 0, {
                expected: 'a string of at least 0 characters',
              }),
              Schema.makeFilter((input) => [...input].length <= 1048576, {
                expected: 'a string of at most 1048576 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(SessionItemListResourceSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgents: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.Union([
            Schema.BigInt,
            Schema.Number.check(Schema.isInt()),
            Schema.String.check(Schema.isPattern(/^-?\d+$/)),
          ])
            .pipe(
              Schema.decodeTo(
                Schema.BigInt,
                SchemaTransformation.transform({
                  decode: (input) => BigInt(input),
                  encode: (output) => output,
                }),
              ),
            )
            .check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
              Schema.isGreaterThanOrEqualToBigInt(1n),
              Schema.isLessThanOrEqualToBigInt(100n),
            )
            .pipe(Schema.withDecodingDefault(Effect.succeed(20n))),
          order: ListOrderParamSchema.pipe(Schema.withDecodingDefault(Effect.succeed('desc'))),
          after: Schema.optional(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length >= 0, {
                expected: 'a string of at least 0 characters',
              }),
              Schema.makeFilter((input) => [...input].length <= 1048576, {
                expected: 'a string of at most 1048576 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        AgentListResourceSchema.annotate({ description: 'A page of reusable agents.' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postAgents: t.procedure
    .input(Schema.toStandardSchemaV1(CreateAgentParamsSchema))
    .output(Schema.toStandardSchemaV1(AgentResourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsAgentId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          agent_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 0, {
              expected: 'a string of at least 0 characters',
            }),
            Schema.makeFilter((input) => [...input].length <= 1048576, {
              expected: 'a string of at most 1048576 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(AgentResourceSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postAgentsAgentId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          agent_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 0, {
              expected: 'a string of at least 0 characters',
            }),
            Schema.makeFilter((input) => [...input].length <= 1048576, {
              expected: 'a string of at most 1048576 characters',
            }),
          ),
          experimental: ExperimentalConfigOverridesParamSchema.pipe(
            Schema.withDecodingDefault(Effect.succeed({})),
          ).annotate({
            description:
              'Experimental settings to merge by key. Omitted settings keep their current values.',
          }),
          model: Schema.optional(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length >= 0, {
                expected: 'a string of at least 0 characters',
              }),
              Schema.makeFilter((input) => [...input].length <= 1048576, {
                expected: 'a string of at most 1048576 characters',
              }),
            ).annotate({
              description: 'The model to use for the agent. The requested model name is preserved.',
            }),
          ),
          reasoning: Schema.optional(
            Schema.Union([ReasoningParamSchema, Schema.NullOr(Schema.Null)]).annotate({
              description:
                "Configuration for model reasoning. Omit to keep the current settings; pass `null` to reset to the model's default effort.",
            }),
          ),
          text: Schema.optional(
            Schema.Union([TextParamSchema, Schema.NullOr(Schema.Null)]).annotate({
              description: 'Configuration for text generated by the agent.',
            }),
          ),
          service_tier: Schema.optional(
            Schema.Union([ServiceTierParamSchema, Schema.NullOr(Schema.Null)]).annotate({
              description: 'The service tier used for model requests.',
            }),
          ),
          instructions: Schema.optional(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length >= 0, {
                  expected: 'a string of at least 0 characters',
                }),
                Schema.makeFilter((input) => [...input].length <= 1048576, {
                  expected: 'a string of at most 1048576 characters',
                }),
              ),
            ).annotate({
              description:
                "Additional instructions appended to the agent's default base instructions. Omit to leave unchanged.",
            }),
          ),
          multi_agent: Schema.optional(
            Schema.Union([MultiAgentConfigCurrentParamSchema, Schema.NullOr(Schema.Null)]).annotate(
              { description: 'Configuration for creating and coordinating subagents.' },
            ),
          ),
          compaction: Schema.optional(
            Schema.Union([CompactionParamSchema, Schema.NullOr(Schema.Null)]).annotate({
              description:
                'Context compaction settings. Omit to keep the current settings. A supplied object replaces the settings; null or an empty object uses blocking compaction.',
            }),
          ),
          metadata: Schema.optional(
            Schema.NullOr(
              Schema.Record(
                Schema.String,
                Schema.String.check(
                  Schema.makeFilter((input) => [...input].length >= 0, {
                    expected: 'a string of at least 0 characters',
                  }),
                  Schema.makeFilter((input) => [...input].length <= 512, {
                    expected: 'a string of at most 512 characters',
                  }),
                ),
              ),
            ).annotate({
              description:
                'Replaces all metadata. Omit to leave unchanged, or pass null or {} to clear it. Up to 16 string key-value pairs, with keys up to 64 and values up to 512 characters.',
            }),
          ),
          name: Schema.optional(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length >= 0, {
                  expected: 'a string of at least 0 characters',
                }),
                Schema.makeFilter((input) => [...input].length <= 128, {
                  expected: 'a string of at most 128 characters',
                }),
              ),
            ).annotate({
              description: 'A replacement name. Omit to leave unchanged, or pass null to clear it.',
            }),
          ),
          tools: Schema.optional(
            Schema.NullOr(
              Schema.Array(PersistedAgentToolConfigParamSchema).check(
                Schema.isMinLength(0),
                Schema.isMaxLength(2000),
              ),
            ).annotate({
              description:
                'Replaces the tool list. Omit to leave it unchanged, or pass null to clear it. The replacement must fit within 3 MiB (3,145,728 bytes) of compact UTF-8 JSON.',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(AgentResourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteAgentsAgentId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          agent_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 0, {
              expected: 'a string of at least 0 characters',
            }),
            Schema.makeFilter((input) => [...input].length <= 1048576, {
              expected: 'a string of at most 1048576 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(DeletedAgentResourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsEnvironmentsTemplates: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.Union([
            Schema.BigInt,
            Schema.Number.check(Schema.isInt()),
            Schema.String.check(Schema.isPattern(/^-?\d+$/)),
          ])
            .pipe(
              Schema.decodeTo(
                Schema.BigInt,
                SchemaTransformation.transform({
                  decode: (input) => BigInt(input),
                  encode: (output) => output,
                }),
              ),
            )
            .check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
              Schema.isGreaterThanOrEqualToBigInt(1n),
              Schema.isLessThanOrEqualToBigInt(100n),
            )
            .pipe(Schema.withDecodingDefault(Effect.succeed(20n))),
          order: ListOrderParamSchema.pipe(Schema.withDecodingDefault(Effect.succeed('desc'))),
          after: Schema.optional(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length >= 0, {
                expected: 'a string of at least 0 characters',
              }),
              Schema.makeFilter((input) => [...input].length <= 1048576, {
                expected: 'a string of at most 1048576 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        EnvironmentTemplateListResourceSchema.annotate({
          description: 'A page of reusable environment templates.',
        }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postAgentsEnvironmentsTemplates: t.procedure
    .input(Schema.toStandardSchemaV1(CreateEnvironmentTemplateParamsSchema))
    .output(Schema.toStandardSchemaV1(EnvironmentTemplateResourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsEnvironmentsTemplatesEnvironmentTemplateId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          environment_template_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 0, {
              expected: 'a string of at least 0 characters',
            }),
            Schema.makeFilter((input) => [...input].length <= 1048576, {
              expected: 'a string of at most 1048576 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(EnvironmentTemplateResourceSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postAgentsEnvironmentsTemplatesEnvironmentTemplateId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          environment_template_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 0, {
              expected: 'a string of at least 0 characters',
            }),
            Schema.makeFilter((input) => [...input].length <= 1048576, {
              expected: 'a string of at most 1048576 characters',
            }),
          ),
          name: Schema.optional(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length >= 1, {
                  expected: 'a string of at least 1 character',
                }),
                Schema.makeFilter((input) => [...input].length <= 256, {
                  expected: 'a string of at most 256 characters',
                }),
              ),
            ).annotate({
              description:
                'A replacement human-readable display name, or `null` to clear the name.',
            }),
          ),
          packages: Schema.optional(
            Schema.Union([EnvironmentPackagesParamSchema, Schema.NullOr(Schema.Null)]).annotate({
              description: 'Packages installed before the runtime network policy applies.',
            }),
          ),
          setup_commands: Schema.optional(
            Schema.NullOr(
              Schema.Array(SetupCommandParamSchema).check(
                Schema.isMinLength(0),
                Schema.isMaxLength(16),
              ),
            ).annotate({
              description:
                'Replacement confidential setup commands, never included in returned resources.',
            }),
          ),
          network: Schema.optional(
            Schema.Union([NetworkPolicyParamSchema, Schema.NullOr(Schema.Null)]).annotate({
              description:
                'Network access available after setup completes. Omit to preserve the current policy, or pass `null` to reset to the default policy.',
            }),
          ),
          desktop: Schema.optional(
            Schema.Union([DesktopParamSchema, Schema.NullOr(Schema.Null)]).annotate({
              description: 'Replacement desktop configuration, or null to disable the desktop.',
            }),
          ),
          env: Schema.optional(
            Schema.NullOr(
              Schema.Record(
                Schema.String,
                Schema.String.check(
                  Schema.makeFilter((input) => [...input].length >= 0, {
                    expected: 'a string of at least 0 characters',
                  }),
                  Schema.makeFilter((input) => [...input].length <= 1048576, {
                    expected: 'a string of at most 1048576 characters',
                  }),
                ),
              ),
            ).annotate({ description: 'Replacement confidential environment values.' }),
          ),
          capability_directories: Schema.optional(
            Schema.NullOr(
              Schema.Array(
                Schema.String.check(
                  Schema.makeFilter((input) => [...input].length >= 0, {
                    expected: 'a string of at least 0 characters',
                  }),
                  Schema.makeFilter((input) => [...input].length <= 1048576, {
                    expected: 'a string of at most 1048576 characters',
                  }),
                ),
              ).check(Schema.isMinLength(0), Schema.isMaxLength(16384)),
            ).annotate({ description: 'Directories that expose capabilities to the agent.' }),
          ),
          skills: Schema.optional(
            Schema.NullOr(
              Schema.Array(HostedSkillParamSchema).check(
                Schema.isMinLength(0),
                Schema.isMaxLength(200),
              ),
            ).annotate({
              description: 'Replacement skill configuration installed for each new session.',
            }),
          ),
          plugins: Schema.optional(
            Schema.NullOr(
              Schema.Array(HostedPluginParamSchema).check(
                Schema.isMinLength(0),
                Schema.isMaxLength(32),
              ),
            ).annotate({
              description: 'Replacement plugin configuration installed for each new session.',
            }),
          ),
          files: Schema.optional(
            Schema.NullOr(
              Schema.Array(HostedEnvironmentFileParamSchema).check(
                Schema.isMinLength(0),
                Schema.isMaxLength(50),
              ),
            ).annotate({
              description: 'Replacement file configuration materialized for each new session.',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(EnvironmentTemplateResourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteAgentsEnvironmentsTemplatesEnvironmentTemplateId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          environment_template_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 0, {
              expected: 'a string of at least 0 characters',
            }),
            Schema.makeFilter((input) => [...input].length <= 1048576, {
              expected: 'a string of at most 1048576 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(DeletedEnvironmentTemplateResourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsSessions: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.Union([
            Schema.BigInt,
            Schema.Number.check(Schema.isInt()),
            Schema.String.check(Schema.isPattern(/^-?\d+$/)),
          ])
            .pipe(
              Schema.decodeTo(
                Schema.BigInt,
                SchemaTransformation.transform({
                  decode: (input) => BigInt(input),
                  encode: (output) => output,
                }),
              ),
            )
            .check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
              Schema.isGreaterThanOrEqualToBigInt(1n),
              Schema.isLessThanOrEqualToBigInt(100n),
            )
            .pipe(Schema.withDecodingDefault(Effect.succeed(20n))),
          order: ListOrderParamSchema.pipe(Schema.withDecodingDefault(Effect.succeed('desc'))),
          after: Schema.optional(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length >= 0, {
                expected: 'a string of at least 0 characters',
              }),
              Schema.makeFilter((input) => [...input].length <= 1048576, {
                expected: 'a string of at most 1048576 characters',
              }),
            ),
          ),
          agent_id: Schema.optional(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length >= 0, {
                expected: 'a string of at least 0 characters',
              }),
              Schema.makeFilter((input) => [...input].length <= 1048576, {
                expected: 'a string of at most 1048576 characters',
              }),
            ),
          ),
          metadata: Schema.optional(
            Schema.Record(
              Schema.String,
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length >= 0, {
                  expected: 'a string of at least 0 characters',
                }),
                Schema.makeFilter((input) => [...input].length <= 512, {
                  expected: 'a string of at most 512 characters',
                }),
              ),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        SessionListResourceSchema.annotate({ description: 'A paginated list of sessions.' }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postAgentsSessions: t.procedure
    .input(Schema.toStandardSchemaV1(CreateAgentSessionParamsSchema))
    .output(Schema.toStandardSchemaV1(SessionResourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsSessionsSessionId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          session_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 0, {
              expected: 'a string of at least 0 characters',
            }),
            Schema.makeFilter((input) => [...input].length <= 1048576, {
              expected: 'a string of at most 1048576 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(SessionResourceSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postAgentsSessionsSessionId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          session_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 0, {
              expected: 'a string of at least 0 characters',
            }),
            Schema.makeFilter((input) => [...input].length <= 1048576, {
              expected: 'a string of at most 1048576 characters',
            }),
          ),
          prompt_cache_options: Schema.optional(
            Schema.Union([PromptCacheOptionsParam2Schema, Schema.NullOr(Schema.Null)]).annotate({
              description:
                'Default prompt cache lifetime for future turns. Send null to clear the session default.',
            }),
          ),
          vault_ids: Schema.optional(
            Schema.NullOr(
              Schema.Array(
                Schema.String.check(
                  Schema.makeFilter((input) => [...input].length >= 0, {
                    expected: 'a string of at least 0 characters',
                  }),
                  Schema.makeFilter((input) => [...input].length <= 1048576, {
                    expected: 'a string of at most 1048576 characters',
                  }),
                ),
              ).check(Schema.isMinLength(0), Schema.isMaxLength(16384)),
            ).annotate({
              description:
                "Replaces the session's referenced vaults. Omit to retain them; null or [] clears them.",
            }),
          ),
          review: Schema.optional(
            SessionReviewParamSchema.annotate({
              description:
                'Default action review for new root turns. Existing turns and their subagents keep their review mode.',
            }),
          ),
          spend_control: Schema.optional(
            Schema.Union([SessionBudgetControlParamsSchema, Schema.NullOr(Schema.Null)]).annotate({
              description:
                'Omit to retain the limit; null or a null limit removes it without resetting spend.',
            }),
          ),
          agent: Schema.optional(
            UpdateSessionAgentParamSchema.annotate({
              description:
                'Agent settings to update on this session. Omitted fields stay unchanged.',
            }),
          ),
          metadata: Schema.optional(
            Schema.NullOr(
              Schema.Record(
                Schema.String,
                Schema.String.check(
                  Schema.makeFilter((input) => [...input].length >= 0, {
                    expected: 'a string of at least 0 characters',
                  }),
                  Schema.makeFilter((input) => [...input].length <= 512, {
                    expected: 'a string of at most 512 characters',
                  }),
                ),
              ),
            ).annotate({
              description:
                'Replaces all metadata. Omit to leave unchanged, or pass null or {} to clear it. Up to 16 string key-value pairs, with keys up to 64 and values up to 512 characters.',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(SessionResourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteAgentsSessionsSessionId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          session_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 0, {
              expected: 'a string of at least 0 characters',
            }),
            Schema.makeFilter((input) => [...input].length <= 1048576, {
              expected: 'a string of at most 1048576 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(DeletedSessionResourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsSessionsSessionIdArtifacts: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          session_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 0, {
              expected: 'a string of at least 0 characters',
            }),
            Schema.makeFilter((input) => [...input].length <= 1048576, {
              expected: 'a string of at most 1048576 characters',
            }),
          ),
          limit: Schema.Union([
            Schema.BigInt,
            Schema.Number.check(Schema.isInt()),
            Schema.String.check(Schema.isPattern(/^-?\d+$/)),
          ])
            .pipe(
              Schema.decodeTo(
                Schema.BigInt,
                SchemaTransformation.transform({
                  decode: (input) => BigInt(input),
                  encode: (output) => output,
                }),
              ),
            )
            .check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
              Schema.isGreaterThanOrEqualToBigInt(1n),
              Schema.isLessThanOrEqualToBigInt(100n),
            )
            .pipe(Schema.withDecodingDefault(Effect.succeed(20n))),
          order: ListOrderParamSchema.pipe(Schema.withDecodingDefault(Effect.succeed('desc'))),
          after: Schema.optional(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length >= 0, {
                expected: 'a string of at least 0 characters',
              }),
              Schema.makeFilter((input) => [...input].length <= 1048576, {
                expected: 'a string of at most 1048576 characters',
              }),
            ),
          ),
          environment_id: Schema.optional(
            Schema.NullOr(
              Schema.String.check(
                Schema.makeFilter((input) => [...input].length >= 0, {
                  expected: 'a string of at least 0 characters',
                }),
                Schema.makeFilter((input) => [...input].length <= 1048576, {
                  expected: 'a string of at most 1048576 characters',
                }),
              ),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        SessionArtifactListResourceSchema.annotate({
          description: 'A page of durable artifacts published by a session.',
        }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsSessionsSessionIdArtifactsArtifactId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          session_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 0, {
              expected: 'a string of at least 0 characters',
            }),
            Schema.makeFilter((input) => [...input].length <= 1048576, {
              expected: 'a string of at most 1048576 characters',
            }),
          ),
          artifact_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 0, {
              expected: 'a string of at least 0 characters',
            }),
            Schema.makeFilter((input) => [...input].length <= 1048576, {
              expected: 'a string of at most 1048576 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(SessionArtifactResourceSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteAgentsSessionsSessionIdArtifactsArtifactId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          session_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 0, {
              expected: 'a string of at least 0 characters',
            }),
            Schema.makeFilter((input) => [...input].length <= 1048576, {
              expected: 'a string of at most 1048576 characters',
            }),
          ),
          artifact_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 0, {
              expected: 'a string of at least 0 characters',
            }),
            Schema.makeFilter((input) => [...input].length <= 1048576, {
              expected: 'a string of at most 1048576 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(DeletedSessionArtifactResourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsSessionsSessionIdArtifactsArtifactIdContent: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          session_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 0, {
              expected: 'a string of at least 0 characters',
            }),
            Schema.makeFilter((input) => [...input].length <= 1048576, {
              expected: 'a string of at most 1048576 characters',
            }),
          ),
          artifact_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 0, {
              expected: 'a string of at least 0 characters',
            }),
            Schema.makeFilter((input) => [...input].length <= 1048576, {
              expected: 'a string of at most 1048576 characters',
            }),
          ),
        }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsSessionsSessionIdEvents: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          session_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 0, {
              expected: 'a string of at least 0 characters',
            }),
            Schema.makeFilter((input) => [...input].length <= 1048576, {
              expected: 'a string of at most 1048576 characters',
            }),
          ),
          include_obfuscation: Schema.Boolean.pipe(
            Schema.withDecodingDefault(Effect.succeed(true)),
          ),
        }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postAgentsSessionsSessionIdEvents: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          session_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 0, {
              expected: 'a string of at least 0 characters',
            }),
            Schema.makeFilter((input) => [...input].length <= 1048576, {
              expected: 'a string of at most 1048576 characters',
            }),
          ),
          events: Schema.Array(SessionInputParamSchema)
            .check(Schema.isMinLength(0), Schema.isMaxLength(16384))
            .annotate({ description: 'The input events to submit to the session.' }),
        }),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsSessionsSessionIdItems: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          session_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 0, {
              expected: 'a string of at least 0 characters',
            }),
            Schema.makeFilter((input) => [...input].length <= 1048576, {
              expected: 'a string of at most 1048576 characters',
            }),
          ),
          limit: Schema.Union([
            Schema.BigInt,
            Schema.Number.check(Schema.isInt()),
            Schema.String.check(Schema.isPattern(/^-?\d+$/)),
          ])
            .pipe(
              Schema.decodeTo(
                Schema.BigInt,
                SchemaTransformation.transform({
                  decode: (input) => BigInt(input),
                  encode: (output) => output,
                }),
              ),
            )
            .check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
              Schema.isGreaterThanOrEqualToBigInt(1n),
              Schema.isLessThanOrEqualToBigInt(100n),
            )
            .pipe(Schema.withDecodingDefault(Effect.succeed(20n))),
          order: ListOrderParamSchema.pipe(Schema.withDecodingDefault(Effect.succeed('desc'))),
          after: Schema.optional(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length >= 0, {
                expected: 'a string of at least 0 characters',
              }),
              Schema.makeFilter((input) => [...input].length <= 1048576, {
                expected: 'a string of at most 1048576 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(SessionItemListResourceSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsSessionsSessionIdTraces: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          session_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 0, {
              expected: 'a string of at least 0 characters',
            }),
            Schema.makeFilter((input) => [...input].length <= 1048576, {
              expected: 'a string of at most 1048576 characters',
            }),
          ),
          limit: Schema.Union([
            Schema.BigInt,
            Schema.Number.check(Schema.isInt()),
            Schema.String.check(Schema.isPattern(/^-?\d+$/)),
          ])
            .pipe(
              Schema.decodeTo(
                Schema.BigInt,
                SchemaTransformation.transform({
                  decode: (input) => BigInt(input),
                  encode: (output) => output,
                }),
              ),
            )
            .check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
              Schema.isGreaterThanOrEqualToBigInt(1n),
              Schema.isLessThanOrEqualToBigInt(100n),
            )
            .pipe(Schema.withDecodingDefault(Effect.succeed(20n))),
          order: ListOrderParamSchema.pipe(Schema.withDecodingDefault(Effect.succeed('desc'))),
          after: Schema.optional(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length >= 0, {
                expected: 'a string of at least 0 characters',
              }),
              Schema.makeFilter((input) => [...input].length <= 1048576, {
                expected: 'a string of at most 1048576 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        SessionTraceListResourceSchema.annotate({
          description: 'A page of published session traces.',
        }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsSessionsSessionIdTurns: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          session_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 0, {
              expected: 'a string of at least 0 characters',
            }),
            Schema.makeFilter((input) => [...input].length <= 1048576, {
              expected: 'a string of at most 1048576 characters',
            }),
          ),
          limit: Schema.Union([
            Schema.BigInt,
            Schema.Number.check(Schema.isInt()),
            Schema.String.check(Schema.isPattern(/^-?\d+$/)),
          ])
            .pipe(
              Schema.decodeTo(
                Schema.BigInt,
                SchemaTransformation.transform({
                  decode: (input) => BigInt(input),
                  encode: (output) => output,
                }),
              ),
            )
            .check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
              Schema.isGreaterThanOrEqualToBigInt(1n),
              Schema.isLessThanOrEqualToBigInt(100n),
            )
            .pipe(Schema.withDecodingDefault(Effect.succeed(20n))),
          order: ListOrderParamSchema.pipe(Schema.withDecodingDefault(Effect.succeed('desc'))),
          after: Schema.optional(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length >= 0, {
                expected: 'a string of at least 0 characters',
              }),
              Schema.makeFilter((input) => [...input].length <= 1048576, {
                expected: 'a string of at most 1048576 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        SessionTurnListResourceSchema.annotate({
          description: 'A page of turns from an agent session or subagent.',
        }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsSessionsSessionIdTurnsTurnId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          session_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 0, {
              expected: 'a string of at least 0 characters',
            }),
            Schema.makeFilter((input) => [...input].length <= 1048576, {
              expected: 'a string of at most 1048576 characters',
            }),
          ),
          turn_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 0, {
              expected: 'a string of at least 0 characters',
            }),
            Schema.makeFilter((input) => [...input].length <= 1048576, {
              expected: 'a string of at most 1048576 characters',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(TurnResourceSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAgentsSessionsSessionIdTurnsTurnIdItems: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          session_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 0, {
              expected: 'a string of at least 0 characters',
            }),
            Schema.makeFilter((input) => [...input].length <= 1048576, {
              expected: 'a string of at most 1048576 characters',
            }),
          ),
          turn_id: Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 0, {
              expected: 'a string of at least 0 characters',
            }),
            Schema.makeFilter((input) => [...input].length <= 1048576, {
              expected: 'a string of at most 1048576 characters',
            }),
          ),
          limit: Schema.Union([
            Schema.BigInt,
            Schema.Number.check(Schema.isInt()),
            Schema.String.check(Schema.isPattern(/^-?\d+$/)),
          ])
            .pipe(
              Schema.decodeTo(
                Schema.BigInt,
                SchemaTransformation.transform({
                  decode: (input) => BigInt(input),
                  encode: (output) => output,
                }),
              ),
            )
            .check(
              Schema.isBetweenBigInt({
                minimum: -9223372036854775808n,
                maximum: 9223372036854775807n,
              }),
              Schema.isGreaterThanOrEqualToBigInt(1n),
              Schema.isLessThanOrEqualToBigInt(100n),
            )
            .pipe(Schema.withDecodingDefault(Effect.succeed(20n))),
          order: ListOrderParamSchema.pipe(Schema.withDecodingDefault(Effect.succeed('desc'))),
          after: Schema.optional(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length >= 0, {
                expected: 'a string of at least 0 characters',
              }),
              Schema.makeFilter((input) => [...input].length <= 1048576, {
                expected: 'a string of at most 1048576 characters',
              }),
            ),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(SessionItemListResourceSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
