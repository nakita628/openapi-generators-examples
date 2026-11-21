import { os } from '@orpc/server'
import * as z from 'zod'
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
    z.object({
      limit: z.coerce.number().int().min(0).max(100).exactOptional(),
      order: OrderEnumSchema.exactOptional(),
      after: z
        .string()
        .meta({ description: 'Identifier for the last item from the previous pagination request' })
        .exactOptional(),
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
  .input(z.object({ skill_id: z.string().meta({ examples: ['skill_123'] }) }))
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
    z.object({
      skill_id: z.string().meta({ examples: ['skill_123'] }),
      default_version: z
        .string()
        .meta({ description: 'The skill version number to set as default.' }),
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
  .input(z.object({ skill_id: z.string().meta({ examples: ['skill_123'] }) }))
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
  .input(z.object({ skill_id: z.string().meta({ examples: ['skill_123'] }) }))
  .output(z.string())
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
    z.object({
      skill_id: z.string().meta({ examples: ['skill_123'] }),
      limit: z.coerce.number().int().min(0).max(100).exactOptional(),
      order: OrderEnumSchema.exactOptional(),
      after: z
        .string()
        .meta({ examples: ['skillver_123'] })
        .exactOptional(),
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
    z.object({
      skill_id: z.string().meta({ examples: ['skill_123'] }),
      files: z.xor([
        z
          .array(z.file())
          .max(500)
          .meta({ description: 'Skill files to upload (directory upload) or a single zip file.' }),
        z.file().meta({ description: 'Skill zip file to upload.' }),
      ]),
      default: z
        .boolean()
        .meta({ description: 'Whether to set this version as the default.' })
        .exactOptional(),
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
    z.object({
      skill_id: z.string().meta({ examples: ['skill_123'] }),
      version: z.string().meta({ description: 'The version number to retrieve.' }),
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
    z.object({
      skill_id: z.string().meta({ examples: ['skill_123'] }),
      version: z.string().meta({ description: 'The skill version number.' }),
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
    z.object({
      skill_id: z.string().meta({ examples: ['skill_123'] }),
      version: z.string().meta({ description: 'The skill version number.' }),
    }),
  )
  .output(z.string())
  .handler(async ({ input }) => { throw new Error('Not implemented') })
