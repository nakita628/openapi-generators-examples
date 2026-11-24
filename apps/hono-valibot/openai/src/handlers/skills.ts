import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as v from 'valibot'
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
      v.partial(
        v.object({
          limit: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(0),
            v.maxValue(100),
          ),
          order: OrderEnumSchema,
          after: v.pipe(
            v.string(),
            v.description('Identifier for the last item from the previous pagination request'),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/skills',
    sValidator('json', CreateSkillBodySchema),
    sValidator(
      'form',
      v.pipe(
        v.object({
          files: v.union([
            v.pipe(
              v.pipe(
                v.unknown(),
                v.transform((input) =>
                  input === undefined || Array.isArray(input) ? input : [input],
                ),
                v.array(v.file()),
                v.maxLength(500),
              ),
              v.description('Skill files to upload (directory upload) or a single zip file.'),
            ),
            v.pipe(v.file(), v.description('Skill zip file to upload.')),
          ]),
        }),
        v.description(
          'Uploads a skill either as a directory (multipart `files[]`) or as a single zip file.',
        ),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/skills/:skill_id',
    sValidator(
      'param',
      v.object({ skill_id: v.pipe(v.string(), v.metadata({ examples: ['skill_123'] })) }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/skills/:skill_id',
    sValidator(
      'param',
      v.object({ skill_id: v.pipe(v.string(), v.metadata({ examples: ['skill_123'] })) }),
    ),
    sValidator('json', SetDefaultSkillVersionBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/skills/:skill_id',
    sValidator(
      'param',
      v.object({ skill_id: v.pipe(v.string(), v.metadata({ examples: ['skill_123'] })) }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/skills/:skill_id/content',
    sValidator(
      'param',
      v.object({ skill_id: v.pipe(v.string(), v.metadata({ examples: ['skill_123'] })) }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/skills/:skill_id/versions',
    sValidator(
      'param',
      v.object({ skill_id: v.pipe(v.string(), v.metadata({ examples: ['skill_123'] })) }),
    ),
    sValidator(
      'query',
      v.partial(
        v.object({
          limit: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
            v.minValue(0),
            v.maxValue(100),
          ),
          order: OrderEnumSchema,
          after: v.pipe(v.string(), v.metadata({ examples: ['skillver_123'] })),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/skills/:skill_id/versions',
    sValidator(
      'param',
      v.object({ skill_id: v.pipe(v.string(), v.metadata({ examples: ['skill_123'] })) }),
    ),
    sValidator('json', CreateSkillVersionBodySchema),
    sValidator(
      'form',
      v.pipe(
        v.object({
          files: v.union([
            v.pipe(
              v.pipe(
                v.unknown(),
                v.transform((input) =>
                  input === undefined || Array.isArray(input) ? input : [input],
                ),
                v.array(v.file()),
                v.maxLength(500),
              ),
              v.description('Skill files to upload (directory upload) or a single zip file.'),
            ),
            v.pipe(v.file(), v.description('Skill zip file to upload.')),
          ]),
          default: v.optional(
            v.pipe(
              v.pipe(
                v.string(),
                v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
                v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
              ),
              v.description('Whether to set this version as the default.'),
            ),
          ),
        }),
        v.description('Uploads a new immutable version of a skill.'),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/skills/:skill_id/versions/:version',
    sValidator(
      'param',
      v.object({
        skill_id: v.pipe(v.string(), v.metadata({ examples: ['skill_123'] })),
        version: v.pipe(v.string(), v.description('The version number to retrieve.')),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/skills/:skill_id/versions/:version',
    sValidator(
      'param',
      v.object({
        skill_id: v.pipe(v.string(), v.metadata({ examples: ['skill_123'] })),
        version: v.pipe(v.string(), v.description('The skill version number.')),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/skills/:skill_id/versions/:version/content',
    sValidator(
      'param',
      v.object({
        skill_id: v.pipe(v.string(), v.metadata({ examples: ['skill_123'] })),
        version: v.pipe(v.string(), v.description('The skill version number.')),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
