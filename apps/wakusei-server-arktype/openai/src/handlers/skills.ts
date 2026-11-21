import { os } from '@orpc/server'
import { type } from 'arktype'
import {
  CreateSkillBodySchema,
  DeletedSkillResourceSchema,
  DeletedSkillVersionResourceSchema,
  OrderEnumSchema,
  SkillListResourceSchema,
  SkillResourceSchema,
  SkillVersionListResourceSchema,
  SkillVersionResourceSchema,
} from '../components'

export const getSkills = os
  .route({
    method: 'GET',
    path: '/skills',
    tags: ['Skills'],
    summary: 'List Skills',
    description: 'List all skills for the current project.',
    successDescription: 'Success',
  })
  .input(
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
  )
  .output(SkillListResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postSkills = os
  .route({
    method: 'POST',
    path: '/skills',
    tags: ['Skills'],
    summary: 'Create Skill',
    description: 'Create a new skill.',
    successDescription: 'Success',
  })
  .input(CreateSkillBodySchema)
  .output(SkillResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getSkillsSkillId = os
  .route({
    method: 'GET',
    path: '/skills/{skill_id}',
    tags: ['Skills'],
    summary: 'Get Skill',
    description: 'Get a skill by its ID.',
    successDescription: 'Success',
  })
  .input(type({ skill_id: type('string') }))
  .output(SkillResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postSkillsSkillId = os
  .route({
    method: 'POST',
    path: '/skills/{skill_id}',
    tags: ['Skills'],
    summary: 'Update Skill Default Version',
    description: 'Update the default version pointer for a skill.',
    successDescription: 'Success',
  })
  .input(
    type({
      skill_id: type('string'),
      default_version: type('string').describe('The skill version number to set as default.'),
    }),
  )
  .output(SkillResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteSkillsSkillId = os
  .route({
    method: 'DELETE',
    path: '/skills/{skill_id}',
    tags: ['Skills'],
    summary: 'Delete Skill',
    description: 'Delete a skill by its ID.',
    successDescription: 'Success',
  })
  .input(type({ skill_id: type('string') }))
  .output(DeletedSkillResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getSkillsSkillIdContent = os
  .route({
    method: 'GET',
    path: '/skills/{skill_id}/content',
    tags: ['Skills'],
    summary: 'Get Skill Content',
    description: 'Download a skill zip bundle by its ID.',
    successDescription: 'The skill zip bundle.',
  })
  .input(type({ skill_id: type('string') }))
  .output(type('string'))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getSkillsSkillIdVersions = os
  .route({
    method: 'GET',
    path: '/skills/{skill_id}/versions',
    tags: ['Skills'],
    summary: 'List Skill Versions',
    description: 'List skill versions for a skill.',
    successDescription: 'Success',
  })
  .input(
    type({
      skill_id: type('string'),
      'limit?': type('string')
        .pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 0 & number.integer <= 100'),
      'order?': OrderEnumSchema,
      'after?': type('string'),
    }),
  )
  .output(SkillVersionListResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postSkillsSkillIdVersions = os
  .route({
    method: 'POST',
    path: '/skills/{skill_id}/versions',
    tags: ['Skills'],
    summary: 'Create Skill Version',
    description: 'Create a new immutable skill version.',
    successDescription: 'Success',
  })
  .input(
    type({
      skill_id: type('string'),
      files: type(
        type('File[]')
          .and(type('unknown[] <= 500'))
          .describe('Skill files to upload (directory upload) or a single zip file.'),
      ).or(type('File').describe('Skill zip file to upload.')),
      'default?': type('boolean').describe('Whether to set this version as the default.'),
    }),
  )
  .output(SkillVersionResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getSkillsSkillIdVersionsVersion = os
  .route({
    method: 'GET',
    path: '/skills/{skill_id}/versions/{version}',
    tags: ['Skills'],
    summary: 'Get Skill Version',
    description: 'Get a specific skill version.',
    successDescription: 'Success',
  })
  .input(
    type({
      skill_id: type('string'),
      version: type('string').describe('The version number to retrieve.'),
    }),
  )
  .output(SkillVersionResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteSkillsSkillIdVersionsVersion = os
  .route({
    method: 'DELETE',
    path: '/skills/{skill_id}/versions/{version}',
    tags: ['Skills'],
    summary: 'Delete Skill Version',
    description: 'Delete a skill version.',
    successDescription: 'Success',
  })
  .input(
    type({
      skill_id: type('string'),
      version: type('string').describe('The skill version number.'),
    }),
  )
  .output(DeletedSkillVersionResourceSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getSkillsSkillIdVersionsVersionContent = os
  .route({
    method: 'GET',
    path: '/skills/{skill_id}/versions/{version}/content',
    tags: ['Skills'],
    summary: 'Get Skill Version Content',
    description: 'Download a skill version zip bundle.',
    successDescription: 'The skill zip bundle.',
  })
  .input(
    type({
      skill_id: type('string'),
      version: type('string').describe('The skill version number.'),
    }),
  )
  .output(type('string'))
  .handler(async ({ input }) => { throw new Error('Not implemented') })
