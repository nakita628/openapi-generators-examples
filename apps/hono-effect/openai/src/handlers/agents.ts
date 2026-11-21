import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { Effect, Schema, SchemaTransformation } from 'effect'
import {
  ListOrderParamSchema,
  HostedEnvironmentFileParamSchema,
  CreateAutomationParamsSchema,
  UpdateAutomationParamsSchema,
  EnvironmentTypeParamSchema,
  CreateAgentEnvironmentParamsSchema,
  CreateAgentParamsSchema,
  UpdateAgentParamsSchema,
  CreateEnvironmentTemplateParamsSchema,
  UpdateEnvironmentTemplateParamsSchema,
  CreateAgentSessionParamsSchema,
  UpdateAgentSessionParamsSchema,
  CreateSessionEventsParamsSchema,
} from '../components'

export const agentsHandler = new Hono()
  .get(
    '/agents/automations',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.BigIntFromString.check(
            Schema.isBetweenBigInt({
              minimum: -9223372036854775808n,
              maximum: 9223372036854775807n,
            }),
            Schema.isGreaterThanOrEqualToBigInt(1n),
            Schema.isLessThanOrEqualToBigInt(100n),
          ).pipe(Schema.withDecodingDefaultType(Effect.succeed(20n))),
          order: ListOrderParamSchema.pipe(Schema.withDecodingDefaultType(Effect.succeed('desc'))),
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
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/agents/automations',
    sValidator('json', Schema.toStandardSchemaV1(CreateAutomationParamsSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/automations/:automation_id',
    sValidator(
      'param',
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
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/agents/automations/:automation_id',
    sValidator(
      'param',
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
    ),
    sValidator('json', Schema.toStandardSchemaV1(UpdateAutomationParamsSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/agents/automations/:automation_id',
    sValidator(
      'param',
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
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/agents/automations/:automation_id/pause',
    sValidator(
      'param',
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
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/agents/automations/:automation_id/resume',
    sValidator(
      'param',
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
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/automations/:automation_id/invocations',
    sValidator(
      'param',
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
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.BigIntFromString.check(
            Schema.isBetweenBigInt({
              minimum: -9223372036854775808n,
              maximum: 9223372036854775807n,
            }),
            Schema.isGreaterThanOrEqualToBigInt(1n),
            Schema.isLessThanOrEqualToBigInt(100n),
          ).pipe(Schema.withDecodingDefaultType(Effect.succeed(20n))),
          order: ListOrderParamSchema.pipe(Schema.withDecodingDefaultType(Effect.succeed('desc'))),
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
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/agents/automations/:automation_id/invocations',
    sValidator(
      'param',
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
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/automations/:automation_id/invocations/:invocation_id',
    sValidator(
      'param',
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
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/environments',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.BigIntFromString.check(
            Schema.isBetweenBigInt({
              minimum: -9223372036854775808n,
              maximum: 9223372036854775807n,
            }),
            Schema.isGreaterThanOrEqualToBigInt(1n),
            Schema.isLessThanOrEqualToBigInt(100n),
          ).pipe(Schema.withDecodingDefaultType(Effect.succeed(20n))),
          order: ListOrderParamSchema.pipe(Schema.withDecodingDefaultType(Effect.succeed('desc'))),
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
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/agents/environments',
    sValidator(
      'header',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          'idempotency-key': Schema.optional(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length >= 1, {
                expected: 'a string of at least 1 character',
              }),
              Schema.makeFilter((input) => [...input].length <= 256, {
                expected: 'a string of at most 256 characters',
              }),
            ),
          ),
        }),
      ),
    ),
    sValidator('json', Schema.toStandardSchemaV1(CreateAgentEnvironmentParamsSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/environments/:environment_id',
    sValidator(
      'param',
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
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/environments/:environment_id/files',
    sValidator(
      'param',
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
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
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
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) => (input === 'null' ? null : input),
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(
                Schema.NullOr(
                  Schema.BigIntFromString.check(
                    Schema.isBetweenBigInt({
                      minimum: -9223372036854775808n,
                      maximum: 9223372036854775807n,
                    }),
                    Schema.isGreaterThanOrEqualToBigInt(1n),
                    Schema.isLessThanOrEqualToBigInt(100n),
                  ),
                ),
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
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/agents/environments/:environment_id/files',
    sValidator(
      'param',
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
    ),
    sValidator('json', Schema.toStandardSchemaV1(HostedEnvironmentFileParamSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/sessions/:session_id/subagents',
    sValidator(
      'param',
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
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.BigIntFromString.check(
            Schema.isBetweenBigInt({
              minimum: -9223372036854775808n,
              maximum: 9223372036854775807n,
            }),
            Schema.isGreaterThanOrEqualToBigInt(1n),
            Schema.isLessThanOrEqualToBigInt(100n),
          ).pipe(Schema.withDecodingDefaultType(Effect.succeed(20n))),
          order: ListOrderParamSchema.pipe(Schema.withDecodingDefaultType(Effect.succeed('desc'))),
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
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/sessions/:session_id/subagents/:subagent_id',
    sValidator(
      'param',
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
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/sessions/:session_id/subagents/:subagent_id/items',
    sValidator(
      'param',
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
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.BigIntFromString.check(
            Schema.isBetweenBigInt({
              minimum: -9223372036854775808n,
              maximum: 9223372036854775807n,
            }),
            Schema.isGreaterThanOrEqualToBigInt(1n),
            Schema.isLessThanOrEqualToBigInt(100n),
          ).pipe(Schema.withDecodingDefaultType(Effect.succeed(20n))),
          order: ListOrderParamSchema.pipe(Schema.withDecodingDefaultType(Effect.succeed('desc'))),
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
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/sessions/:session_id/subagents/:subagent_id/turns',
    sValidator(
      'param',
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
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.BigIntFromString.check(
            Schema.isBetweenBigInt({
              minimum: -9223372036854775808n,
              maximum: 9223372036854775807n,
            }),
            Schema.isGreaterThanOrEqualToBigInt(1n),
            Schema.isLessThanOrEqualToBigInt(100n),
          ).pipe(Schema.withDecodingDefaultType(Effect.succeed(20n))),
          order: ListOrderParamSchema.pipe(Schema.withDecodingDefaultType(Effect.succeed('desc'))),
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
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/sessions/:session_id/subagents/:subagent_id/turns/:turn_id',
    sValidator(
      'param',
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
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/sessions/:session_id/subagents/:subagent_id/turns/:turn_id/items',
    sValidator(
      'param',
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
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.BigIntFromString.check(
            Schema.isBetweenBigInt({
              minimum: -9223372036854775808n,
              maximum: 9223372036854775807n,
            }),
            Schema.isGreaterThanOrEqualToBigInt(1n),
            Schema.isLessThanOrEqualToBigInt(100n),
          ).pipe(Schema.withDecodingDefaultType(Effect.succeed(20n))),
          order: ListOrderParamSchema.pipe(Schema.withDecodingDefaultType(Effect.succeed('desc'))),
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
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.BigIntFromString.check(
            Schema.isBetweenBigInt({
              minimum: -9223372036854775808n,
              maximum: 9223372036854775807n,
            }),
            Schema.isGreaterThanOrEqualToBigInt(1n),
            Schema.isLessThanOrEqualToBigInt(100n),
          ).pipe(Schema.withDecodingDefaultType(Effect.succeed(20n))),
          order: ListOrderParamSchema.pipe(Schema.withDecodingDefaultType(Effect.succeed('desc'))),
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
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/agents',
    sValidator('json', Schema.toStandardSchemaV1(CreateAgentParamsSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/:agent_id',
    sValidator(
      'param',
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
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/agents/:agent_id',
    sValidator(
      'param',
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
    ),
    sValidator('json', Schema.toStandardSchemaV1(UpdateAgentParamsSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/agents/:agent_id',
    sValidator(
      'param',
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
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/environments/templates',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.BigIntFromString.check(
            Schema.isBetweenBigInt({
              minimum: -9223372036854775808n,
              maximum: 9223372036854775807n,
            }),
            Schema.isGreaterThanOrEqualToBigInt(1n),
            Schema.isLessThanOrEqualToBigInt(100n),
          ).pipe(Schema.withDecodingDefaultType(Effect.succeed(20n))),
          order: ListOrderParamSchema.pipe(Schema.withDecodingDefaultType(Effect.succeed('desc'))),
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
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/agents/environments/templates',
    sValidator('json', Schema.toStandardSchemaV1(CreateEnvironmentTemplateParamsSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/environments/templates/:environment_template_id',
    sValidator(
      'param',
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
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/agents/environments/templates/:environment_template_id',
    sValidator(
      'param',
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
    ),
    sValidator('json', Schema.toStandardSchemaV1(UpdateEnvironmentTemplateParamsSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/agents/environments/templates/:environment_template_id',
    sValidator(
      'param',
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
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/sessions',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.BigIntFromString.check(
            Schema.isBetweenBigInt({
              minimum: -9223372036854775808n,
              maximum: 9223372036854775807n,
            }),
            Schema.isGreaterThanOrEqualToBigInt(1n),
            Schema.isLessThanOrEqualToBigInt(100n),
          ).pipe(Schema.withDecodingDefaultType(Effect.succeed(20n))),
          order: ListOrderParamSchema.pipe(Schema.withDecodingDefaultType(Effect.succeed('desc'))),
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
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/agents/sessions',
    sValidator('json', Schema.toStandardSchemaV1(CreateAgentSessionParamsSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/sessions/:session_id',
    sValidator(
      'param',
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
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/agents/sessions/:session_id',
    sValidator(
      'param',
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
    ),
    sValidator('json', Schema.toStandardSchemaV1(UpdateAgentSessionParamsSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/agents/sessions/:session_id',
    sValidator(
      'param',
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
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/sessions/:session_id/artifacts',
    sValidator(
      'param',
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
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.BigIntFromString.check(
            Schema.isBetweenBigInt({
              minimum: -9223372036854775808n,
              maximum: 9223372036854775807n,
            }),
            Schema.isGreaterThanOrEqualToBigInt(1n),
            Schema.isLessThanOrEqualToBigInt(100n),
          ).pipe(Schema.withDecodingDefaultType(Effect.succeed(20n))),
          order: ListOrderParamSchema.pipe(Schema.withDecodingDefaultType(Effect.succeed('desc'))),
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
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/sessions/:session_id/artifacts/:artifact_id',
    sValidator(
      'param',
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
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/agents/sessions/:session_id/artifacts/:artifact_id',
    sValidator(
      'param',
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
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/sessions/:session_id/artifacts/:artifact_id/content',
    sValidator(
      'param',
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
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/sessions/:session_id/events',
    sValidator(
      'param',
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
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          include_obfuscation: Schema.String.check(
            Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
          )
            .pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            )
            .pipe(Schema.withDecodingDefaultType(Effect.succeed(true))),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/agents/sessions/:session_id/events',
    sValidator(
      'param',
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
    ),
    sValidator(
      'header',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          'idempotency-key': Schema.optional(
            Schema.String.check(
              Schema.makeFilter((input) => [...input].length >= 1, {
                expected: 'a string of at least 1 character',
              }),
              Schema.makeFilter((input) => [...input].length <= 256, {
                expected: 'a string of at most 256 characters',
              }),
            ),
          ),
        }),
      ),
    ),
    sValidator('json', Schema.toStandardSchemaV1(CreateSessionEventsParamsSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/sessions/:session_id/items',
    sValidator(
      'param',
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
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.BigIntFromString.check(
            Schema.isBetweenBigInt({
              minimum: -9223372036854775808n,
              maximum: 9223372036854775807n,
            }),
            Schema.isGreaterThanOrEqualToBigInt(1n),
            Schema.isLessThanOrEqualToBigInt(100n),
          ).pipe(Schema.withDecodingDefaultType(Effect.succeed(20n))),
          order: ListOrderParamSchema.pipe(Schema.withDecodingDefaultType(Effect.succeed('desc'))),
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
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/sessions/:session_id/traces',
    sValidator(
      'param',
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
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.BigIntFromString.check(
            Schema.isBetweenBigInt({
              minimum: -9223372036854775808n,
              maximum: 9223372036854775807n,
            }),
            Schema.isGreaterThanOrEqualToBigInt(1n),
            Schema.isLessThanOrEqualToBigInt(100n),
          ).pipe(Schema.withDecodingDefaultType(Effect.succeed(20n))),
          order: ListOrderParamSchema.pipe(Schema.withDecodingDefaultType(Effect.succeed('desc'))),
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
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/sessions/:session_id/turns',
    sValidator(
      'param',
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
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.BigIntFromString.check(
            Schema.isBetweenBigInt({
              minimum: -9223372036854775808n,
              maximum: 9223372036854775807n,
            }),
            Schema.isGreaterThanOrEqualToBigInt(1n),
            Schema.isLessThanOrEqualToBigInt(100n),
          ).pipe(Schema.withDecodingDefaultType(Effect.succeed(20n))),
          order: ListOrderParamSchema.pipe(Schema.withDecodingDefaultType(Effect.succeed('desc'))),
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
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/sessions/:session_id/turns/:turn_id',
    sValidator(
      'param',
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
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/sessions/:session_id/turns/:turn_id/items',
    sValidator(
      'param',
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
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.BigIntFromString.check(
            Schema.isBetweenBigInt({
              minimum: -9223372036854775808n,
              maximum: 9223372036854775807n,
            }),
            Schema.isGreaterThanOrEqualToBigInt(1n),
            Schema.isLessThanOrEqualToBigInt(100n),
          ).pipe(Schema.withDecodingDefaultType(Effect.succeed(20n))),
          order: ListOrderParamSchema.pipe(Schema.withDecodingDefaultType(Effect.succeed('desc'))),
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
    ),
    (c) => { throw new Error('Not implemented') },
  )
