import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as z from 'zod'
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
      z.object({
        limit: z.coerce.bigint().pipe(z.int64().min(1n).max(100n)).default(20n).exactOptional(),
        order: ListOrderParamSchema.default('desc').exactOptional(),
        after: z.string().min(0).max(1048576).exactOptional(),
        session_id: z.string().min(0).max(1048576).exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post('/agents/automations', sValidator('json', CreateAutomationParamsSchema), (c) => { throw new Error('Not implemented') })
  .get(
    '/agents/automations/:automation_id',
    sValidator('param', z.object({ automation_id: z.string().min(0).max(1048576) })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/agents/automations/:automation_id',
    sValidator('param', z.object({ automation_id: z.string().min(0).max(1048576) })),
    sValidator('json', UpdateAutomationParamsSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/agents/automations/:automation_id',
    sValidator('param', z.object({ automation_id: z.string().min(0).max(1048576) })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/agents/automations/:automation_id/pause',
    sValidator('param', z.object({ automation_id: z.string().min(0).max(1048576) })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/agents/automations/:automation_id/resume',
    sValidator('param', z.object({ automation_id: z.string().min(0).max(1048576) })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/automations/:automation_id/invocations',
    sValidator('param', z.object({ automation_id: z.string().min(0).max(1048576) })),
    sValidator(
      'query',
      z.object({
        limit: z.coerce.bigint().pipe(z.int64().min(1n).max(100n)).default(20n).exactOptional(),
        order: ListOrderParamSchema.default('desc').exactOptional(),
        after: z.string().min(0).max(1048576).exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/agents/automations/:automation_id/invocations',
    sValidator('param', z.object({ automation_id: z.string().min(0).max(1048576) })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/automations/:automation_id/invocations/:invocation_id',
    sValidator(
      'param',
      z.object({
        automation_id: z.string().min(0).max(1048576),
        invocation_id: z.string().min(0).max(1048576),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/environments',
    sValidator(
      'query',
      z.object({
        limit: z.coerce.bigint().pipe(z.int64().min(1n).max(100n)).default(20n).exactOptional(),
        order: ListOrderParamSchema.default('desc').exactOptional(),
        after: z.string().min(0).max(1048576).exactOptional(),
        type: EnvironmentTypeParamSchema.exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/agents/environments',
    sValidator(
      'header',
      z.object({ 'idempotency-key': z.string().min(1).max(256).exactOptional() }),
    ),
    sValidator('json', CreateAgentEnvironmentParamsSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/environments/:environment_id',
    sValidator('param', z.object({ environment_id: z.string().min(0).max(1048576) })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/environments/:environment_id/files',
    sValidator('param', z.object({ environment_id: z.string().min(0).max(1048576) })),
    sValidator(
      'query',
      z.object({
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
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/agents/environments/:environment_id/files',
    sValidator('param', z.object({ environment_id: z.string().min(0).max(1048576) })),
    sValidator('json', HostedEnvironmentFileParamSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/sessions/:session_id/subagents',
    sValidator('param', z.object({ session_id: z.string().min(0).max(1048576) })),
    sValidator(
      'query',
      z.object({
        limit: z.coerce.bigint().pipe(z.int64().min(1n).max(100n)).default(20n).exactOptional(),
        order: ListOrderParamSchema.default('desc').exactOptional(),
        after: z.string().min(0).max(1048576).exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/sessions/:session_id/subagents/:subagent_id',
    sValidator(
      'param',
      z.object({
        session_id: z.string().min(0).max(1048576),
        subagent_id: z.string().min(0).max(1048576),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/sessions/:session_id/subagents/:subagent_id/items',
    sValidator(
      'param',
      z.object({
        session_id: z.string().min(0).max(1048576),
        subagent_id: z.string().min(0).max(1048576),
      }),
    ),
    sValidator(
      'query',
      z.object({
        limit: z.coerce.bigint().pipe(z.int64().min(1n).max(100n)).default(20n).exactOptional(),
        order: ListOrderParamSchema.default('desc').exactOptional(),
        after: z.string().min(0).max(1048576).exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/sessions/:session_id/subagents/:subagent_id/turns',
    sValidator(
      'param',
      z.object({
        session_id: z.string().min(0).max(1048576),
        subagent_id: z.string().min(0).max(1048576),
      }),
    ),
    sValidator(
      'query',
      z.object({
        limit: z.coerce.bigint().pipe(z.int64().min(1n).max(100n)).default(20n).exactOptional(),
        order: ListOrderParamSchema.default('desc').exactOptional(),
        after: z.string().min(0).max(1048576).exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/sessions/:session_id/subagents/:subagent_id/turns/:turn_id',
    sValidator(
      'param',
      z.object({
        session_id: z.string().min(0).max(1048576),
        subagent_id: z.string().min(0).max(1048576),
        turn_id: z.string().min(0).max(1048576),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/sessions/:session_id/subagents/:subagent_id/turns/:turn_id/items',
    sValidator(
      'param',
      z.object({
        session_id: z.string().min(0).max(1048576),
        subagent_id: z.string().min(0).max(1048576),
        turn_id: z.string().min(0).max(1048576),
      }),
    ),
    sValidator(
      'query',
      z.object({
        limit: z.coerce.bigint().pipe(z.int64().min(1n).max(100n)).default(20n).exactOptional(),
        order: ListOrderParamSchema.default('desc').exactOptional(),
        after: z.string().min(0).max(1048576).exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents',
    sValidator(
      'query',
      z.object({
        limit: z.coerce.bigint().pipe(z.int64().min(1n).max(100n)).default(20n).exactOptional(),
        order: ListOrderParamSchema.default('desc').exactOptional(),
        after: z.string().min(0).max(1048576).exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post('/agents', sValidator('json', CreateAgentParamsSchema), (c) => { throw new Error('Not implemented') })
  .get(
    '/agents/:agent_id',
    sValidator('param', z.object({ agent_id: z.string().min(0).max(1048576) })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/agents/:agent_id',
    sValidator('param', z.object({ agent_id: z.string().min(0).max(1048576) })),
    sValidator('json', UpdateAgentParamsSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/agents/:agent_id',
    sValidator('param', z.object({ agent_id: z.string().min(0).max(1048576) })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/environments/templates',
    sValidator(
      'query',
      z.object({
        limit: z.coerce.bigint().pipe(z.int64().min(1n).max(100n)).default(20n).exactOptional(),
        order: ListOrderParamSchema.default('desc').exactOptional(),
        after: z.string().min(0).max(1048576).exactOptional(),
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
    sValidator('param', z.object({ environment_template_id: z.string().min(0).max(1048576) })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/agents/environments/templates/:environment_template_id',
    sValidator('param', z.object({ environment_template_id: z.string().min(0).max(1048576) })),
    sValidator('json', UpdateEnvironmentTemplateParamsSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/agents/environments/templates/:environment_template_id',
    sValidator('param', z.object({ environment_template_id: z.string().min(0).max(1048576) })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/sessions',
    sValidator(
      'query',
      z.object({
        limit: z.coerce.bigint().pipe(z.int64().min(1n).max(100n)).default(20n).exactOptional(),
        order: ListOrderParamSchema.default('desc').exactOptional(),
        after: z.string().min(0).max(1048576).exactOptional(),
        agent_id: z.string().min(0).max(1048576).exactOptional(),
        metadata: z.record(z.string(), z.string().min(0).max(512)).exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post('/agents/sessions', sValidator('json', CreateAgentSessionParamsSchema), (c) => { throw new Error('Not implemented') })
  .get(
    '/agents/sessions/:session_id',
    sValidator('param', z.object({ session_id: z.string().min(0).max(1048576) })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/agents/sessions/:session_id',
    sValidator('param', z.object({ session_id: z.string().min(0).max(1048576) })),
    sValidator('json', UpdateAgentSessionParamsSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/agents/sessions/:session_id',
    sValidator('param', z.object({ session_id: z.string().min(0).max(1048576) })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/sessions/:session_id/artifacts',
    sValidator('param', z.object({ session_id: z.string().min(0).max(1048576) })),
    sValidator(
      'query',
      z.object({
        limit: z.coerce.bigint().pipe(z.int64().min(1n).max(100n)).default(20n).exactOptional(),
        order: ListOrderParamSchema.default('desc').exactOptional(),
        after: z.string().min(0).max(1048576).exactOptional(),
        environment_id: z.string().min(0).max(1048576).nullable().exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/sessions/:session_id/artifacts/:artifact_id',
    sValidator(
      'param',
      z.object({
        session_id: z.string().min(0).max(1048576),
        artifact_id: z.string().min(0).max(1048576),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/agents/sessions/:session_id/artifacts/:artifact_id',
    sValidator(
      'param',
      z.object({
        session_id: z.string().min(0).max(1048576),
        artifact_id: z.string().min(0).max(1048576),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/sessions/:session_id/artifacts/:artifact_id/content',
    sValidator(
      'param',
      z.object({
        session_id: z.string().min(0).max(1048576),
        artifact_id: z.string().min(0).max(1048576),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/sessions/:session_id/events',
    sValidator('param', z.object({ session_id: z.string().min(0).max(1048576) })),
    sValidator(
      'query',
      z.object({ include_obfuscation: z.stringbool().default(true).exactOptional() }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/agents/sessions/:session_id/events',
    sValidator('param', z.object({ session_id: z.string().min(0).max(1048576) })),
    sValidator(
      'header',
      z.object({ 'idempotency-key': z.string().min(1).max(256).exactOptional() }),
    ),
    sValidator('json', CreateSessionEventsParamsSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/sessions/:session_id/items',
    sValidator('param', z.object({ session_id: z.string().min(0).max(1048576) })),
    sValidator(
      'query',
      z.object({
        limit: z.coerce.bigint().pipe(z.int64().min(1n).max(100n)).default(20n).exactOptional(),
        order: ListOrderParamSchema.default('desc').exactOptional(),
        after: z.string().min(0).max(1048576).exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/sessions/:session_id/traces',
    sValidator('param', z.object({ session_id: z.string().min(0).max(1048576) })),
    sValidator(
      'query',
      z.object({
        limit: z.coerce.bigint().pipe(z.int64().min(1n).max(100n)).default(20n).exactOptional(),
        order: ListOrderParamSchema.default('desc').exactOptional(),
        after: z.string().min(0).max(1048576).exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/sessions/:session_id/turns',
    sValidator('param', z.object({ session_id: z.string().min(0).max(1048576) })),
    sValidator(
      'query',
      z.object({
        limit: z.coerce.bigint().pipe(z.int64().min(1n).max(100n)).default(20n).exactOptional(),
        order: ListOrderParamSchema.default('desc').exactOptional(),
        after: z.string().min(0).max(1048576).exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/sessions/:session_id/turns/:turn_id',
    sValidator(
      'param',
      z.object({
        session_id: z.string().min(0).max(1048576),
        turn_id: z.string().min(0).max(1048576),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/sessions/:session_id/turns/:turn_id/items',
    sValidator(
      'param',
      z.object({
        session_id: z.string().min(0).max(1048576),
        turn_id: z.string().min(0).max(1048576),
      }),
    ),
    sValidator(
      'query',
      z.object({
        limit: z.coerce.bigint().pipe(z.int64().min(1n).max(100n)).default(20n).exactOptional(),
        order: ListOrderParamSchema.default('desc').exactOptional(),
        after: z.string().min(0).max(1048576).exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
