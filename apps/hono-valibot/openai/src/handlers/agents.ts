import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as v from 'valibot'
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
      v.object({
        limit: v.optional(
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
        order: v.optional(ListOrderParamSchema, 'desc'),
        after: v.optional(v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576))),
        session_id: v.optional(v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576))),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post('/agents/automations', sValidator('json', CreateAutomationParamsSchema), (c) => { throw new Error('Not implemented') })
  .get(
    '/agents/automations/:automation_id',
    sValidator(
      'param',
      v.object({ automation_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)) }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/agents/automations/:automation_id',
    sValidator(
      'param',
      v.object({ automation_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)) }),
    ),
    sValidator('json', UpdateAutomationParamsSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/agents/automations/:automation_id',
    sValidator(
      'param',
      v.object({ automation_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)) }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/agents/automations/:automation_id/pause',
    sValidator(
      'param',
      v.object({ automation_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)) }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/agents/automations/:automation_id/resume',
    sValidator(
      'param',
      v.object({ automation_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)) }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/automations/:automation_id/invocations',
    sValidator(
      'param',
      v.object({ automation_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)) }),
    ),
    sValidator(
      'query',
      v.object({
        limit: v.optional(
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
        order: v.optional(ListOrderParamSchema, 'desc'),
        after: v.optional(v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576))),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/agents/automations/:automation_id/invocations',
    sValidator(
      'param',
      v.object({ automation_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)) }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/automations/:automation_id/invocations/:invocation_id',
    sValidator(
      'param',
      v.object({
        automation_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
        invocation_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/environments',
    sValidator(
      'query',
      v.object({
        limit: v.optional(
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
        order: v.optional(ListOrderParamSchema, 'desc'),
        after: v.optional(v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576))),
        type: v.optional(EnvironmentTypeParamSchema),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/agents/environments',
    sValidator(
      'header',
      v.partial(
        v.object({
          'idempotency-key': v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(256)),
        }),
      ),
    ),
    sValidator('json', CreateAgentEnvironmentParamsSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/environments/:environment_id',
    sValidator(
      'param',
      v.object({
        environment_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/environments/:environment_id/files',
    sValidator(
      'param',
      v.object({
        environment_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
      }),
    ),
    sValidator(
      'query',
      v.partial(
        v.object({
          path: v.nullable(v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576))),
          limit: v.pipe(
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
          order: ListOrderParamSchema,
          page: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/agents/environments/:environment_id/files',
    sValidator(
      'param',
      v.object({
        environment_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
      }),
    ),
    sValidator('json', HostedEnvironmentFileParamSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/sessions/:session_id/subagents',
    sValidator(
      'param',
      v.object({ session_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)) }),
    ),
    sValidator(
      'query',
      v.object({
        limit: v.optional(
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
        order: v.optional(ListOrderParamSchema, 'desc'),
        after: v.optional(v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576))),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/sessions/:session_id/subagents/:subagent_id',
    sValidator(
      'param',
      v.object({
        session_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
        subagent_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/sessions/:session_id/subagents/:subagent_id/items',
    sValidator(
      'param',
      v.object({
        session_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
        subagent_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
      }),
    ),
    sValidator(
      'query',
      v.object({
        limit: v.optional(
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
        order: v.optional(ListOrderParamSchema, 'desc'),
        after: v.optional(v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576))),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/sessions/:session_id/subagents/:subagent_id/turns',
    sValidator(
      'param',
      v.object({
        session_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
        subagent_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
      }),
    ),
    sValidator(
      'query',
      v.object({
        limit: v.optional(
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
        order: v.optional(ListOrderParamSchema, 'desc'),
        after: v.optional(v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576))),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/sessions/:session_id/subagents/:subagent_id/turns/:turn_id',
    sValidator(
      'param',
      v.object({
        session_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
        subagent_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
        turn_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/sessions/:session_id/subagents/:subagent_id/turns/:turn_id/items',
    sValidator(
      'param',
      v.object({
        session_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
        subagent_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
        turn_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
      }),
    ),
    sValidator(
      'query',
      v.object({
        limit: v.optional(
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
        order: v.optional(ListOrderParamSchema, 'desc'),
        after: v.optional(v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576))),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents',
    sValidator(
      'query',
      v.object({
        limit: v.optional(
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
        order: v.optional(ListOrderParamSchema, 'desc'),
        after: v.optional(v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576))),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post('/agents', sValidator('json', CreateAgentParamsSchema), (c) => { throw new Error('Not implemented') })
  .get(
    '/agents/:agent_id',
    sValidator(
      'param',
      v.object({ agent_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)) }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/agents/:agent_id',
    sValidator(
      'param',
      v.object({ agent_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)) }),
    ),
    sValidator('json', UpdateAgentParamsSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/agents/:agent_id',
    sValidator(
      'param',
      v.object({ agent_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)) }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/environments/templates',
    sValidator(
      'query',
      v.object({
        limit: v.optional(
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
        order: v.optional(ListOrderParamSchema, 'desc'),
        after: v.optional(v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576))),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/agents/environments/templates',
    sValidator('json', CreateEnvironmentTemplateParamsSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/environments/templates/:environment_template_id',
    sValidator(
      'param',
      v.object({
        environment_template_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/agents/environments/templates/:environment_template_id',
    sValidator(
      'param',
      v.object({
        environment_template_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
      }),
    ),
    sValidator('json', UpdateEnvironmentTemplateParamsSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/agents/environments/templates/:environment_template_id',
    sValidator(
      'param',
      v.object({
        environment_template_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/sessions',
    sValidator(
      'query',
      v.object({
        limit: v.optional(
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
        order: v.optional(ListOrderParamSchema, 'desc'),
        after: v.optional(v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576))),
        agent_id: v.optional(v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576))),
        metadata: v.optional(
          v.record(v.string(), v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(512))),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post('/agents/sessions', sValidator('json', CreateAgentSessionParamsSchema), (c) => { throw new Error('Not implemented') })
  .get(
    '/agents/sessions/:session_id',
    sValidator(
      'param',
      v.object({ session_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)) }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/agents/sessions/:session_id',
    sValidator(
      'param',
      v.object({ session_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)) }),
    ),
    sValidator('json', UpdateAgentSessionParamsSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/agents/sessions/:session_id',
    sValidator(
      'param',
      v.object({ session_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)) }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/sessions/:session_id/artifacts',
    sValidator(
      'param',
      v.object({ session_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)) }),
    ),
    sValidator(
      'query',
      v.object({
        limit: v.optional(
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
        order: v.optional(ListOrderParamSchema, 'desc'),
        after: v.optional(v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576))),
        environment_id: v.optional(
          v.nullable(v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576))),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/sessions/:session_id/artifacts/:artifact_id',
    sValidator(
      'param',
      v.object({
        session_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
        artifact_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/agents/sessions/:session_id/artifacts/:artifact_id',
    sValidator(
      'param',
      v.object({
        session_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
        artifact_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/sessions/:session_id/artifacts/:artifact_id/content',
    sValidator(
      'param',
      v.object({
        session_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
        artifact_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/sessions/:session_id/events',
    sValidator(
      'param',
      v.object({ session_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)) }),
    ),
    sValidator(
      'query',
      v.object({
        include_obfuscation: v.optional(
          v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          'true',
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/agents/sessions/:session_id/events',
    sValidator(
      'param',
      v.object({ session_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)) }),
    ),
    sValidator(
      'header',
      v.partial(
        v.object({
          'idempotency-key': v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(256)),
        }),
      ),
    ),
    sValidator('json', CreateSessionEventsParamsSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/sessions/:session_id/items',
    sValidator(
      'param',
      v.object({ session_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)) }),
    ),
    sValidator(
      'query',
      v.object({
        limit: v.optional(
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
        order: v.optional(ListOrderParamSchema, 'desc'),
        after: v.optional(v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576))),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/sessions/:session_id/traces',
    sValidator(
      'param',
      v.object({ session_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)) }),
    ),
    sValidator(
      'query',
      v.object({
        limit: v.optional(
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
        order: v.optional(ListOrderParamSchema, 'desc'),
        after: v.optional(v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576))),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/sessions/:session_id/turns',
    sValidator(
      'param',
      v.object({ session_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)) }),
    ),
    sValidator(
      'query',
      v.object({
        limit: v.optional(
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
        order: v.optional(ListOrderParamSchema, 'desc'),
        after: v.optional(v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576))),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/sessions/:session_id/turns/:turn_id',
    sValidator(
      'param',
      v.object({
        session_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
        turn_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/sessions/:session_id/turns/:turn_id/items',
    sValidator(
      'param',
      v.object({
        session_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
        turn_id: v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576)),
      }),
    ),
    sValidator(
      'query',
      v.object({
        limit: v.optional(
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
        order: v.optional(ListOrderParamSchema, 'desc'),
        after: v.optional(v.pipe(v.string(), v.minCodePoints(0), v.maxCodePoints(1048576))),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
