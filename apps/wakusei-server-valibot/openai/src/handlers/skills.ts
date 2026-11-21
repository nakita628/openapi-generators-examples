import { os } from '@orpc/server'
import * as v from 'valibot'
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
    v.object({
      limit: v.optional(
        v.pipe(
          v.string(),
          v.transform(Number),
          v.number(),
          v.safeInteger(),
          v.minValue(0),
          v.maxValue(100),
        ),
      ),
      order: v.optional(OrderEnumSchema),
      after: v.optional(
        v.pipe(
          v.string(),
          v.description('Identifier for the last item from the previous pagination request'),
        ),
      ),
    }),
  )
  .output(SkillListResourceSchema)
  .handler(async ({ input }) => {})

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
  .handler(async ({ input }) => {})

export const getSkillsSkillId = os
  .route({
    method: 'GET',
    path: '/skills/{skill_id}',
    tags: ['Skills'],
    summary: 'Get Skill',
    description: 'Get a skill by its ID.',
    successDescription: 'Success',
  })
  .input(v.object({ skill_id: v.pipe(v.string(), v.metadata({ examples: ['skill_123'] })) }))
  .output(SkillResourceSchema)
  .handler(async ({ input }) => {})

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
    v.object({
      skill_id: v.pipe(v.string(), v.metadata({ examples: ['skill_123'] })),
      default_version: v.pipe(
        v.string(),
        v.description('The skill version number to set as default.'),
      ),
    }),
  )
  .output(SkillResourceSchema)
  .handler(async ({ input }) => {})

export const deleteSkillsSkillId = os
  .route({
    method: 'DELETE',
    path: '/skills/{skill_id}',
    tags: ['Skills'],
    summary: 'Delete Skill',
    description: 'Delete a skill by its ID.',
    successDescription: 'Success',
  })
  .input(v.object({ skill_id: v.pipe(v.string(), v.metadata({ examples: ['skill_123'] })) }))
  .output(DeletedSkillResourceSchema)
  .handler(async ({ input }) => {})

export const getSkillsSkillIdContent = os
  .route({
    method: 'GET',
    path: '/skills/{skill_id}/content',
    tags: ['Skills'],
    summary: 'Get Skill Content',
    description: 'Download a skill zip bundle by its ID.',
    successDescription: 'The skill zip bundle.',
  })
  .input(v.object({ skill_id: v.pipe(v.string(), v.metadata({ examples: ['skill_123'] })) }))
  .output(v.string())
  .handler(async ({ input }) => {})

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
    v.object({
      skill_id: v.pipe(v.string(), v.metadata({ examples: ['skill_123'] })),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.transform(Number),
          v.number(),
          v.safeInteger(),
          v.minValue(0),
          v.maxValue(100),
        ),
      ),
      order: v.optional(OrderEnumSchema),
      after: v.optional(v.pipe(v.string(), v.metadata({ examples: ['skillver_123'] }))),
    }),
  )
  .output(SkillVersionListResourceSchema)
  .handler(async ({ input }) => {})

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
    v.object({
      skill_id: v.pipe(v.string(), v.metadata({ examples: ['skill_123'] })),
      files: v.union([
        v.pipe(
          v.pipe(v.array(v.file()), v.maxLength(500)),
          v.description('Skill files to upload (directory upload) or a single zip file.'),
        ),
        v.pipe(v.file(), v.description('Skill zip file to upload.')),
      ]),
      default: v.optional(
        v.pipe(v.boolean(), v.description('Whether to set this version as the default.')),
      ),
    }),
  )
  .output(SkillVersionResourceSchema)
  .handler(async ({ input }) => {})

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
    v.object({
      skill_id: v.pipe(v.string(), v.metadata({ examples: ['skill_123'] })),
      version: v.pipe(v.string(), v.description('The version number to retrieve.')),
    }),
  )
  .output(SkillVersionResourceSchema)
  .handler(async ({ input }) => {})

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
    v.object({
      skill_id: v.pipe(v.string(), v.metadata({ examples: ['skill_123'] })),
      version: v.pipe(v.string(), v.description('The skill version number.')),
    }),
  )
  .output(DeletedSkillVersionResourceSchema)
  .handler(async ({ input }) => {})

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
    v.object({
      skill_id: v.pipe(v.string(), v.metadata({ examples: ['skill_123'] })),
      version: v.pipe(v.string(), v.description('The skill version number.')),
    }),
  )
  .output(v.string())
  .handler(async ({ input }) => {})
