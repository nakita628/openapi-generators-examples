import { Hono } from 'hono'
import { tbValidator } from '@hono/typebox-validator'
import { Type, Codec } from 'typebox'
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
    tbValidator(
      'query',
      Type.Object({
        limit: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '20' }),
                (value) => Number(value) >= 1,
                () => 'must be >= 1',
              ),
              (value) => Number(value) <= 100,
              () => 'must be <= 100',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        order: Type.Optional(Type.Intersect([ListOrderParamSchema], { default: 'desc' })),
        after: Type.Optional(Type.String({ minLength: 0, maxLength: 1048576 })),
        session_id: Type.Optional(Type.String({ minLength: 0, maxLength: 1048576 })),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post('/agents/automations', tbValidator('json', CreateAutomationParamsSchema), (c) => { throw new Error('Not implemented') })
  .get(
    '/agents/automations/:automation_id',
    tbValidator(
      'param',
      Type.Object({ automation_id: Type.String({ minLength: 0, maxLength: 1048576 }) }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/agents/automations/:automation_id',
    tbValidator(
      'param',
      Type.Object({ automation_id: Type.String({ minLength: 0, maxLength: 1048576 }) }),
    ),
    tbValidator('json', UpdateAutomationParamsSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/agents/automations/:automation_id',
    tbValidator(
      'param',
      Type.Object({ automation_id: Type.String({ minLength: 0, maxLength: 1048576 }) }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/agents/automations/:automation_id/pause',
    tbValidator(
      'param',
      Type.Object({ automation_id: Type.String({ minLength: 0, maxLength: 1048576 }) }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/agents/automations/:automation_id/resume',
    tbValidator(
      'param',
      Type.Object({ automation_id: Type.String({ minLength: 0, maxLength: 1048576 }) }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/automations/:automation_id/invocations',
    tbValidator(
      'param',
      Type.Object({ automation_id: Type.String({ minLength: 0, maxLength: 1048576 }) }),
    ),
    tbValidator(
      'query',
      Type.Object({
        limit: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '20' }),
                (value) => Number(value) >= 1,
                () => 'must be >= 1',
              ),
              (value) => Number(value) <= 100,
              () => 'must be <= 100',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        order: Type.Optional(Type.Intersect([ListOrderParamSchema], { default: 'desc' })),
        after: Type.Optional(Type.String({ minLength: 0, maxLength: 1048576 })),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/agents/automations/:automation_id/invocations',
    tbValidator(
      'param',
      Type.Object({ automation_id: Type.String({ minLength: 0, maxLength: 1048576 }) }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/automations/:automation_id/invocations/:invocation_id',
    tbValidator(
      'param',
      Type.Object({
        automation_id: Type.String({ minLength: 0, maxLength: 1048576 }),
        invocation_id: Type.String({ minLength: 0, maxLength: 1048576 }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/environments',
    tbValidator(
      'query',
      Type.Object({
        limit: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '20' }),
                (value) => Number(value) >= 1,
                () => 'must be >= 1',
              ),
              (value) => Number(value) <= 100,
              () => 'must be <= 100',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        order: Type.Optional(Type.Intersect([ListOrderParamSchema], { default: 'desc' })),
        after: Type.Optional(Type.String({ minLength: 0, maxLength: 1048576 })),
        type: Type.Optional(EnvironmentTypeParamSchema),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/agents/environments',
    tbValidator(
      'header',
      Type.Object({
        'idempotency-key': Type.Optional(Type.String({ minLength: 1, maxLength: 256 })),
      }),
    ),
    tbValidator('json', CreateAgentEnvironmentParamsSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/environments/:environment_id',
    tbValidator(
      'param',
      Type.Object({ environment_id: Type.String({ minLength: 0, maxLength: 1048576 }) }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/environments/:environment_id/files',
    tbValidator(
      'param',
      Type.Object({ environment_id: Type.String({ minLength: 0, maxLength: 1048576 }) }),
    ),
    tbValidator(
      'query',
      Type.Object({
        path: Type.Optional(
          Type.Union([Type.String({ minLength: 0, maxLength: 1048576 }), Type.Null()]),
        ),
        limit: Type.Optional(
          Type.Union([
            Codec(
              Type.Refine(
                Type.Refine(
                  Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                  (value) => Number(value) >= 1,
                  () => 'must be >= 1',
                ),
                (value) => Number(value) <= 100,
                () => 'must be <= 100',
              ),
            )
              .Decode((value) => Number(value))
              .Encode((value) => String(value)),
            Type.Null(),
          ]),
        ),
        order: Type.Optional(ListOrderParamSchema),
        page: Type.Optional(Type.String({ minLength: 0, maxLength: 1048576 })),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/agents/environments/:environment_id/files',
    tbValidator(
      'param',
      Type.Object({ environment_id: Type.String({ minLength: 0, maxLength: 1048576 }) }),
    ),
    tbValidator('json', HostedEnvironmentFileParamSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/sessions/:session_id/subagents',
    tbValidator(
      'param',
      Type.Object({ session_id: Type.String({ minLength: 0, maxLength: 1048576 }) }),
    ),
    tbValidator(
      'query',
      Type.Object({
        limit: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '20' }),
                (value) => Number(value) >= 1,
                () => 'must be >= 1',
              ),
              (value) => Number(value) <= 100,
              () => 'must be <= 100',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        order: Type.Optional(Type.Intersect([ListOrderParamSchema], { default: 'desc' })),
        after: Type.Optional(Type.String({ minLength: 0, maxLength: 1048576 })),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/sessions/:session_id/subagents/:subagent_id',
    tbValidator(
      'param',
      Type.Object({
        session_id: Type.String({ minLength: 0, maxLength: 1048576 }),
        subagent_id: Type.String({ minLength: 0, maxLength: 1048576 }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/sessions/:session_id/subagents/:subagent_id/items',
    tbValidator(
      'param',
      Type.Object({
        session_id: Type.String({ minLength: 0, maxLength: 1048576 }),
        subagent_id: Type.String({ minLength: 0, maxLength: 1048576 }),
      }),
    ),
    tbValidator(
      'query',
      Type.Object({
        limit: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '20' }),
                (value) => Number(value) >= 1,
                () => 'must be >= 1',
              ),
              (value) => Number(value) <= 100,
              () => 'must be <= 100',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        order: Type.Optional(Type.Intersect([ListOrderParamSchema], { default: 'desc' })),
        after: Type.Optional(Type.String({ minLength: 0, maxLength: 1048576 })),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/sessions/:session_id/subagents/:subagent_id/turns',
    tbValidator(
      'param',
      Type.Object({
        session_id: Type.String({ minLength: 0, maxLength: 1048576 }),
        subagent_id: Type.String({ minLength: 0, maxLength: 1048576 }),
      }),
    ),
    tbValidator(
      'query',
      Type.Object({
        limit: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '20' }),
                (value) => Number(value) >= 1,
                () => 'must be >= 1',
              ),
              (value) => Number(value) <= 100,
              () => 'must be <= 100',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        order: Type.Optional(Type.Intersect([ListOrderParamSchema], { default: 'desc' })),
        after: Type.Optional(Type.String({ minLength: 0, maxLength: 1048576 })),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/sessions/:session_id/subagents/:subagent_id/turns/:turn_id',
    tbValidator(
      'param',
      Type.Object({
        session_id: Type.String({ minLength: 0, maxLength: 1048576 }),
        subagent_id: Type.String({ minLength: 0, maxLength: 1048576 }),
        turn_id: Type.String({ minLength: 0, maxLength: 1048576 }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/sessions/:session_id/subagents/:subagent_id/turns/:turn_id/items',
    tbValidator(
      'param',
      Type.Object({
        session_id: Type.String({ minLength: 0, maxLength: 1048576 }),
        subagent_id: Type.String({ minLength: 0, maxLength: 1048576 }),
        turn_id: Type.String({ minLength: 0, maxLength: 1048576 }),
      }),
    ),
    tbValidator(
      'query',
      Type.Object({
        limit: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '20' }),
                (value) => Number(value) >= 1,
                () => 'must be >= 1',
              ),
              (value) => Number(value) <= 100,
              () => 'must be <= 100',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        order: Type.Optional(Type.Intersect([ListOrderParamSchema], { default: 'desc' })),
        after: Type.Optional(Type.String({ minLength: 0, maxLength: 1048576 })),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents',
    tbValidator(
      'query',
      Type.Object({
        limit: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '20' }),
                (value) => Number(value) >= 1,
                () => 'must be >= 1',
              ),
              (value) => Number(value) <= 100,
              () => 'must be <= 100',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        order: Type.Optional(Type.Intersect([ListOrderParamSchema], { default: 'desc' })),
        after: Type.Optional(Type.String({ minLength: 0, maxLength: 1048576 })),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post('/agents', tbValidator('json', CreateAgentParamsSchema), (c) => { throw new Error('Not implemented') })
  .get(
    '/agents/:agent_id',
    tbValidator(
      'param',
      Type.Object({ agent_id: Type.String({ minLength: 0, maxLength: 1048576 }) }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/agents/:agent_id',
    tbValidator(
      'param',
      Type.Object({ agent_id: Type.String({ minLength: 0, maxLength: 1048576 }) }),
    ),
    tbValidator('json', UpdateAgentParamsSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/agents/:agent_id',
    tbValidator(
      'param',
      Type.Object({ agent_id: Type.String({ minLength: 0, maxLength: 1048576 }) }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/environments/templates',
    tbValidator(
      'query',
      Type.Object({
        limit: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '20' }),
                (value) => Number(value) >= 1,
                () => 'must be >= 1',
              ),
              (value) => Number(value) <= 100,
              () => 'must be <= 100',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        order: Type.Optional(Type.Intersect([ListOrderParamSchema], { default: 'desc' })),
        after: Type.Optional(Type.String({ minLength: 0, maxLength: 1048576 })),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/agents/environments/templates',
    tbValidator('json', CreateEnvironmentTemplateParamsSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/environments/templates/:environment_template_id',
    tbValidator(
      'param',
      Type.Object({ environment_template_id: Type.String({ minLength: 0, maxLength: 1048576 }) }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/agents/environments/templates/:environment_template_id',
    tbValidator(
      'param',
      Type.Object({ environment_template_id: Type.String({ minLength: 0, maxLength: 1048576 }) }),
    ),
    tbValidator('json', UpdateEnvironmentTemplateParamsSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/agents/environments/templates/:environment_template_id',
    tbValidator(
      'param',
      Type.Object({ environment_template_id: Type.String({ minLength: 0, maxLength: 1048576 }) }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/sessions',
    tbValidator(
      'query',
      Type.Object({
        limit: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '20' }),
                (value) => Number(value) >= 1,
                () => 'must be >= 1',
              ),
              (value) => Number(value) <= 100,
              () => 'must be <= 100',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        order: Type.Optional(Type.Intersect([ListOrderParamSchema], { default: 'desc' })),
        after: Type.Optional(Type.String({ minLength: 0, maxLength: 1048576 })),
        agent_id: Type.Optional(Type.String({ minLength: 0, maxLength: 1048576 })),
        metadata: Type.Optional(
          Type.Record(Type.String(), Type.String({ minLength: 0, maxLength: 512 }), {
            minProperties: 0,
            maxProperties: 16,
            propertyNames: Type.String({ minLength: 1, maxLength: 64 }),
          }),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post('/agents/sessions', tbValidator('json', CreateAgentSessionParamsSchema), (c) => { throw new Error('Not implemented') })
  .get(
    '/agents/sessions/:session_id',
    tbValidator(
      'param',
      Type.Object({ session_id: Type.String({ minLength: 0, maxLength: 1048576 }) }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/agents/sessions/:session_id',
    tbValidator(
      'param',
      Type.Object({ session_id: Type.String({ minLength: 0, maxLength: 1048576 }) }),
    ),
    tbValidator('json', UpdateAgentSessionParamsSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/agents/sessions/:session_id',
    tbValidator(
      'param',
      Type.Object({ session_id: Type.String({ minLength: 0, maxLength: 1048576 }) }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/sessions/:session_id/artifacts',
    tbValidator(
      'param',
      Type.Object({ session_id: Type.String({ minLength: 0, maxLength: 1048576 }) }),
    ),
    tbValidator(
      'query',
      Type.Object({
        limit: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '20' }),
                (value) => Number(value) >= 1,
                () => 'must be >= 1',
              ),
              (value) => Number(value) <= 100,
              () => 'must be <= 100',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        order: Type.Optional(Type.Intersect([ListOrderParamSchema], { default: 'desc' })),
        after: Type.Optional(Type.String({ minLength: 0, maxLength: 1048576 })),
        environment_id: Type.Optional(
          Type.Union([Type.String({ minLength: 0, maxLength: 1048576 }), Type.Null()]),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/sessions/:session_id/artifacts/:artifact_id',
    tbValidator(
      'param',
      Type.Object({
        session_id: Type.String({ minLength: 0, maxLength: 1048576 }),
        artifact_id: Type.String({ minLength: 0, maxLength: 1048576 }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/agents/sessions/:session_id/artifacts/:artifact_id',
    tbValidator(
      'param',
      Type.Object({
        session_id: Type.String({ minLength: 0, maxLength: 1048576 }),
        artifact_id: Type.String({ minLength: 0, maxLength: 1048576 }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/sessions/:session_id/artifacts/:artifact_id/content',
    tbValidator(
      'param',
      Type.Object({
        session_id: Type.String({ minLength: 0, maxLength: 1048576 }),
        artifact_id: Type.String({ minLength: 0, maxLength: 1048576 }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/sessions/:session_id/events',
    tbValidator(
      'param',
      Type.Object({ session_id: Type.String({ minLength: 0, maxLength: 1048576 }) }),
    ),
    tbValidator(
      'query',
      Type.Object({
        include_obfuscation: Type.Optional(
          Codec(
            Type.String({
              pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
              default: 'true',
            }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/agents/sessions/:session_id/events',
    tbValidator(
      'param',
      Type.Object({ session_id: Type.String({ minLength: 0, maxLength: 1048576 }) }),
    ),
    tbValidator(
      'header',
      Type.Object({
        'idempotency-key': Type.Optional(Type.String({ minLength: 1, maxLength: 256 })),
      }),
    ),
    tbValidator('json', CreateSessionEventsParamsSchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/sessions/:session_id/items',
    tbValidator(
      'param',
      Type.Object({ session_id: Type.String({ minLength: 0, maxLength: 1048576 }) }),
    ),
    tbValidator(
      'query',
      Type.Object({
        limit: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '20' }),
                (value) => Number(value) >= 1,
                () => 'must be >= 1',
              ),
              (value) => Number(value) <= 100,
              () => 'must be <= 100',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        order: Type.Optional(Type.Intersect([ListOrderParamSchema], { default: 'desc' })),
        after: Type.Optional(Type.String({ minLength: 0, maxLength: 1048576 })),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/sessions/:session_id/traces',
    tbValidator(
      'param',
      Type.Object({ session_id: Type.String({ minLength: 0, maxLength: 1048576 }) }),
    ),
    tbValidator(
      'query',
      Type.Object({
        limit: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '20' }),
                (value) => Number(value) >= 1,
                () => 'must be >= 1',
              ),
              (value) => Number(value) <= 100,
              () => 'must be <= 100',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        order: Type.Optional(Type.Intersect([ListOrderParamSchema], { default: 'desc' })),
        after: Type.Optional(Type.String({ minLength: 0, maxLength: 1048576 })),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/sessions/:session_id/turns',
    tbValidator(
      'param',
      Type.Object({ session_id: Type.String({ minLength: 0, maxLength: 1048576 }) }),
    ),
    tbValidator(
      'query',
      Type.Object({
        limit: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '20' }),
                (value) => Number(value) >= 1,
                () => 'must be >= 1',
              ),
              (value) => Number(value) <= 100,
              () => 'must be <= 100',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        order: Type.Optional(Type.Intersect([ListOrderParamSchema], { default: 'desc' })),
        after: Type.Optional(Type.String({ minLength: 0, maxLength: 1048576 })),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/sessions/:session_id/turns/:turn_id',
    tbValidator(
      'param',
      Type.Object({
        session_id: Type.String({ minLength: 0, maxLength: 1048576 }),
        turn_id: Type.String({ minLength: 0, maxLength: 1048576 }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/agents/sessions/:session_id/turns/:turn_id/items',
    tbValidator(
      'param',
      Type.Object({
        session_id: Type.String({ minLength: 0, maxLength: 1048576 }),
        turn_id: Type.String({ minLength: 0, maxLength: 1048576 }),
      }),
    ),
    tbValidator(
      'query',
      Type.Object({
        limit: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '20' }),
                (value) => Number(value) >= 1,
                () => 'must be >= 1',
              ),
              (value) => Number(value) <= 100,
              () => 'must be <= 100',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        order: Type.Optional(Type.Intersect([ListOrderParamSchema], { default: 'desc' })),
        after: Type.Optional(Type.String({ minLength: 0, maxLength: 1048576 })),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
