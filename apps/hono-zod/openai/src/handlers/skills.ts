import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as z from 'zod'
import {
  OrderEnumSchema,
  CreateSkillBodySchema,
  SetDefaultSkillVersionBodySchema,
  CreateSkillVersionBodySchema,
} from '../components'

export const skillsHandler = new Hono()
  .get(
    '/skills',
    sValidator(
      'query',
      z.object({
        limit: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0).max(100),
          )
          .exactOptional(),
        order: OrderEnumSchema.exactOptional(),
        after: z
          .string()
          .meta({
            description: 'Identifier for the last item from the previous pagination request',
          })
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/skills',
    sValidator('json', CreateSkillBodySchema),
    sValidator(
      'form',
      z
        .object({
          files: z.union([
            z
              .preprocess(
                (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                z.array(z.file()).max(500),
              )
              .meta({
                description: 'Skill files to upload (directory upload) or a single zip file.',
              }),
            z.file().meta({ description: 'Skill zip file to upload.' }),
          ]),
        })
        .meta({
          description:
            'Uploads a skill either as a directory (multipart `files[]`) or as a single zip file.',
        }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/skills/:skill_id',
    sValidator('param', z.object({ skill_id: z.string().meta({ examples: ['skill_123'] }) })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/skills/:skill_id',
    sValidator('param', z.object({ skill_id: z.string().meta({ examples: ['skill_123'] }) })),
    sValidator('json', SetDefaultSkillVersionBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/skills/:skill_id',
    sValidator('param', z.object({ skill_id: z.string().meta({ examples: ['skill_123'] }) })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/skills/:skill_id/content',
    sValidator('param', z.object({ skill_id: z.string().meta({ examples: ['skill_123'] }) })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/skills/:skill_id/versions',
    sValidator('param', z.object({ skill_id: z.string().meta({ examples: ['skill_123'] }) })),
    sValidator(
      'query',
      z.object({
        limit: z
          .preprocess(
            (val) =>
              typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val,
            z.number().int().min(0).max(100),
          )
          .exactOptional(),
        order: OrderEnumSchema.exactOptional(),
        after: z
          .string()
          .meta({ examples: ['skillver_123'] })
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/skills/:skill_id/versions',
    sValidator('param', z.object({ skill_id: z.string().meta({ examples: ['skill_123'] }) })),
    sValidator('json', CreateSkillVersionBodySchema),
    sValidator(
      'form',
      z
        .object({
          files: z.union([
            z
              .preprocess(
                (val) => (val === undefined || Array.isArray(val) ? val : [val]),
                z.array(z.file()).max(500),
              )
              .meta({
                description: 'Skill files to upload (directory upload) or a single zip file.',
              }),
            z.file().meta({ description: 'Skill zip file to upload.' }),
          ]),
          default: z
            .stringbool()
            .meta({ description: 'Whether to set this version as the default.' })
            .exactOptional(),
        })
        .meta({ description: 'Uploads a new immutable version of a skill.' }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/skills/:skill_id/versions/:version',
    sValidator(
      'param',
      z.object({
        skill_id: z.string().meta({ examples: ['skill_123'] }),
        version: z.string().meta({ description: 'The version number to retrieve.' }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/skills/:skill_id/versions/:version',
    sValidator(
      'param',
      z.object({
        skill_id: z.string().meta({ examples: ['skill_123'] }),
        version: z.string().meta({ description: 'The skill version number.' }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/skills/:skill_id/versions/:version/content',
    sValidator(
      'param',
      z.object({
        skill_id: z.string().meta({ examples: ['skill_123'] }),
        version: z.string().meta({ description: 'The skill version number.' }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
