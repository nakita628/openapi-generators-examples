import { Hono } from 'hono'
import { tbValidator } from '@hono/typebox-validator'
import { Type, Codec } from 'typebox'
import {
  OrderEnumSchema,
  CreateSkillBodySchema,
  SetDefaultSkillVersionBodySchema,
  CreateSkillVersionBodySchema,
} from '../components'

export const skillsHandler = new Hono()
  .get(
    '/skills',
    tbValidator(
      'query',
      Type.Object({
        limit: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                (value) => Number(value) >= 0,
                () => 'must be >= 0',
              ),
              (value) => Number(value) <= 100,
              () => 'must be <= 100',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        order: Type.Optional(OrderEnumSchema),
        after: Type.Optional(
          Type.String({
            description: 'Identifier for the last item from the previous pagination request',
          }),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/skills',
    tbValidator('json', CreateSkillBodySchema),
    tbValidator('form', CreateSkillBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/skills/:skill_id',
    tbValidator('param', Type.Object({ skill_id: Type.String({ examples: ['skill_123'] }) })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/skills/:skill_id',
    tbValidator('param', Type.Object({ skill_id: Type.String({ examples: ['skill_123'] }) })),
    tbValidator('json', SetDefaultSkillVersionBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/skills/:skill_id',
    tbValidator('param', Type.Object({ skill_id: Type.String({ examples: ['skill_123'] }) })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/skills/:skill_id/content',
    tbValidator('param', Type.Object({ skill_id: Type.String({ examples: ['skill_123'] }) })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/skills/:skill_id/versions',
    tbValidator('param', Type.Object({ skill_id: Type.String({ examples: ['skill_123'] }) })),
    tbValidator(
      'query',
      Type.Object({
        limit: Type.Optional(
          Codec(
            Type.Refine(
              Type.Refine(
                Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }),
                (value) => Number(value) >= 0,
                () => 'must be >= 0',
              ),
              (value) => Number(value) <= 100,
              () => 'must be <= 100',
            ),
          )
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        order: Type.Optional(OrderEnumSchema),
        after: Type.Optional(Type.String({ examples: ['skillver_123'] })),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/skills/:skill_id/versions',
    tbValidator('param', Type.Object({ skill_id: Type.String({ examples: ['skill_123'] }) })),
    tbValidator('json', CreateSkillVersionBodySchema),
    tbValidator(
      'form',
      Type.Object(
        {
          files: Type.Union([
            Type.Array(Type.String(), {
              maxItems: 500,
              description: 'Skill files to upload (directory upload) or a single zip file.',
            }),
            Type.String({ description: 'Skill zip file to upload.' }),
          ]),
          default: Type.Optional(
            Codec(
              Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
            )
              .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
              .Encode((value) => (value ? 'true' : 'false')),
          ),
        },
        { description: 'Uploads a new immutable version of a skill.' },
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/skills/:skill_id/versions/:version',
    tbValidator(
      'param',
      Type.Object({
        skill_id: Type.String({ examples: ['skill_123'] }),
        version: Type.String({ description: 'The version number to retrieve.' }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/skills/:skill_id/versions/:version',
    tbValidator(
      'param',
      Type.Object({
        skill_id: Type.String({ examples: ['skill_123'] }),
        version: Type.String({ description: 'The skill version number.' }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/skills/:skill_id/versions/:version/content',
    tbValidator(
      'param',
      Type.Object({
        skill_id: Type.String({ examples: ['skill_123'] }),
        version: Type.String({ description: 'The skill version number.' }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
