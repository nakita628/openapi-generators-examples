import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { type } from 'arktype'
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
      type({
        'limit?': type('string')
          .pipe((data, ctx) => {
            const value = Number(data)
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 0 & number.integer <= 100'),
        'order?': OrderEnumSchema,
        'after?': type('string').describe(
          'Identifier for the last item from the previous pagination request',
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/skills',
    sValidator('json', CreateSkillBodySchema),
    sValidator(
      'form',
      type({
        files: type('unknown').pipe((data, ctx) => {
          for (const branch of [
            type('unknown')
              .pipe(
                (data) => (data === undefined || Array.isArray(data) ? data : [data]),
                type('File[]').and(type('unknown[] <= 500')),
              )
              .describe('Skill files to upload (directory upload) or a single zip file.'),
            type('File').describe('Skill zip file to upload.'),
          ]) {
            const out = branch(data)
            if (!(out instanceof type.errors)) return out
          }
          return ctx.error('one of the members')
        }),
      }).describe(
        'Uploads a skill either as a directory (multipart `files[]`) or as a single zip file.',
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get('/skills/:skill_id', sValidator('param', type({ skill_id: 'string' })), (c) => { throw new Error('Not implemented') })
  .post(
    '/skills/:skill_id',
    sValidator('param', type({ skill_id: 'string' })),
    sValidator('json', SetDefaultSkillVersionBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete('/skills/:skill_id', sValidator('param', type({ skill_id: 'string' })), (c) => { throw new Error('Not implemented') })
  .get('/skills/:skill_id/content', sValidator('param', type({ skill_id: 'string' })), (c) => { throw new Error('Not implemented') })
  .get(
    '/skills/:skill_id/versions',
    sValidator('param', type({ skill_id: 'string' })),
    sValidator(
      'query',
      type({
        'limit?': type('string')
          .pipe((data, ctx) => {
            const value = Number(data)
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 0 & number.integer <= 100'),
        'order?': OrderEnumSchema,
        'after?': 'string',
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/skills/:skill_id/versions',
    sValidator('param', type({ skill_id: 'string' })),
    sValidator('json', CreateSkillVersionBodySchema),
    sValidator(
      'form',
      type({
        files: type('unknown').pipe((data, ctx) => {
          for (const branch of [
            type('unknown')
              .pipe(
                (data) => (data === undefined || Array.isArray(data) ? data : [data]),
                type('File[]').and(type('unknown[] <= 500')),
              )
              .describe('Skill files to upload (directory upload) or a single zip file.'),
            type('File').describe('Skill zip file to upload.'),
          ]) {
            const out = branch(data)
            if (!(out instanceof type.errors)) return out
          }
          return ctx.error('one of the members')
        }),
        'default?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i)
          .pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data))
          .describe('Whether to set this version as the default.'),
      }).describe('Uploads a new immutable version of a skill.'),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/skills/:skill_id/versions/:version',
    sValidator(
      'param',
      type({
        skill_id: 'string',
        version: type('string').describe('The version number to retrieve.'),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/skills/:skill_id/versions/:version',
    sValidator(
      'param',
      type({ skill_id: 'string', version: type('string').describe('The skill version number.') }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/skills/:skill_id/versions/:version/content',
    sValidator(
      'param',
      type({ skill_id: 'string', version: type('string').describe('The skill version number.') }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
