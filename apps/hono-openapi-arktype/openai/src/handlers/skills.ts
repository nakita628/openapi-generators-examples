import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import { type } from 'arktype'
import {
  ErrorResponseSchema,
  OrderEnumSchema,
  SkillResourceSchema,
  SkillListResourceSchema,
  CreateSkillBodySchema,
  SetDefaultSkillVersionBodySchema,
  DeletedSkillResourceSchema,
  SkillVersionResourceSchema,
  SkillVersionListResourceSchema,
  CreateSkillVersionBodySchema,
  DeletedSkillVersionResourceSchema,
  TooManyRequestsResponse,
} from '../components'

export const skillsHandler = new Hono()
  .get(
    '/skills',
    describeRoute({
      tags: ['Skills'],
      summary: 'List Skills',
      description: 'List all skills for the current project.',
      operationId: 'ListSkills',
      responses: {
        '200': {
          description: 'Success',
          content: { 'application/json': { schema: resolver(SkillListResourceSchema) } },
        },
        '404': {
          description: 'The skill specified by `after` was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'query',
      type({
        'limit?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
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
    describeRoute({
      tags: ['Skills'],
      summary: 'Create Skill',
      description: 'Create a new skill.',
      operationId: 'CreateSkill',
      responses: {
        '200': {
          description: 'Success',
          content: { 'application/json': { schema: resolver(SkillResourceSchema) } },
        },
        '400': {
          description: 'The uploaded skill files or archive are invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
        '500': {
          description: 'The skill could not be saved.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
      },
    }),
    validator('json', CreateSkillBodySchema),
    validator(
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
  .get(
    '/skills/:skill_id',
    describeRoute({
      tags: ['Skills'],
      summary: 'Get Skill',
      description: 'Get a skill by its ID.',
      operationId: 'GetSkill',
      responses: {
        '200': {
          description: 'Success',
          content: { 'application/json': { schema: resolver(SkillResourceSchema) } },
        },
        '404': {
          description: 'The skill was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', type({ skill_id: 'string' })),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/skills/:skill_id',
    describeRoute({
      tags: ['Skills'],
      summary: 'Update Skill Default Version',
      description: 'Update the default version pointer for a skill.',
      operationId: 'UpdateSkillDefaultVersion',
      responses: {
        '200': {
          description: 'Success',
          content: { 'application/json': { schema: resolver(SkillResourceSchema) } },
        },
        '400': {
          description: 'The requested version is invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '404': {
          description: 'The skill or requested skill version was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', type({ skill_id: 'string' })),
    validator('json', SetDefaultSkillVersionBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/skills/:skill_id',
    describeRoute({
      tags: ['Skills'],
      summary: 'Delete Skill',
      description: 'Delete a skill by its ID.',
      operationId: 'DeleteSkill',
      responses: {
        '200': {
          description: 'Success',
          content: { 'application/json': { schema: resolver(DeletedSkillResourceSchema) } },
        },
        '404': {
          description: 'The skill was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', type({ skill_id: 'string' })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/skills/:skill_id/content',
    describeRoute({
      tags: ['Skills'],
      summary: 'Get Skill Content',
      description: 'Download a skill zip bundle by its ID.',
      operationId: 'GetSkillContent',
      responses: {
        '200': {
          description: 'The skill zip bundle.',
          content: {
            'application/zip': { schema: resolver(type('File')) },
            'application/json': { schema: resolver(type('string')) },
          },
        },
        '404': {
          description: 'The skill was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', type({ skill_id: 'string' })),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/skills/:skill_id/versions',
    describeRoute({
      tags: ['Skills'],
      summary: 'List Skill Versions',
      description: 'List skill versions for a skill.',
      operationId: 'ListSkillVersions',
      responses: {
        '200': {
          description: 'Success',
          content: { 'application/json': { schema: resolver(SkillVersionListResourceSchema) } },
        },
        '400': {
          description: 'The version specified by `after` does not belong to this skill.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '404': {
          description: 'The skill or the version specified by `after` was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator('param', type({ skill_id: 'string' })),
    validator(
      'query',
      type({
        'limit?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
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
    describeRoute({
      tags: ['Skills'],
      summary: 'Create Skill Version',
      description: 'Create a new immutable skill version.',
      operationId: 'CreateSkillVersion',
      responses: {
        '200': {
          description: 'Success',
          content: { 'application/json': { schema: resolver(SkillVersionResourceSchema) } },
        },
        '400': {
          description: 'The uploaded skill files or archive are invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '404': {
          description: 'The skill was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
        '500': {
          description: 'The skill version could not be saved.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
      },
    }),
    validator('param', type({ skill_id: 'string' })),
    validator('json', CreateSkillVersionBodySchema),
    validator(
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
    describeRoute({
      tags: ['Skills'],
      summary: 'Get Skill Version',
      description: 'Get a specific skill version.',
      operationId: 'GetSkillVersion',
      responses: {
        '200': {
          description: 'Success',
          content: { 'application/json': { schema: resolver(SkillVersionResourceSchema) } },
        },
        '400': {
          description: 'The requested version is invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '404': {
          description: 'The skill or requested skill version was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
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
    describeRoute({
      tags: ['Skills'],
      summary: 'Delete Skill Version',
      description: 'Delete a skill version.',
      operationId: 'DeleteSkillVersion',
      responses: {
        '200': {
          description: 'Success',
          content: { 'application/json': { schema: resolver(DeletedSkillVersionResourceSchema) } },
        },
        '400': {
          description:
            'The requested version is invalid, or it is the default version and other versions remain.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '404': {
          description: 'The skill or requested skill version was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'param',
      type({ skill_id: 'string', version: type('string').describe('The skill version number.') }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/skills/:skill_id/versions/:version/content',
    describeRoute({
      tags: ['Skills'],
      summary: 'Get Skill Version Content',
      description: 'Download a skill version zip bundle.',
      operationId: 'GetSkillVersionContent',
      responses: {
        '200': {
          description: 'The skill zip bundle.',
          content: {
            'application/zip': { schema: resolver(type('File')) },
            'application/json': { schema: resolver(type('string')) },
          },
        },
        '400': {
          description: 'The requested version is invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '404': {
          description: 'The skill or requested skill version was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': TooManyRequestsResponse,
      },
    }),
    validator(
      'param',
      type({ skill_id: 'string', version: type('string').describe('The skill version number.') }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
