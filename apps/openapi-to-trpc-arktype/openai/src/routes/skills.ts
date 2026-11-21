import { initTRPC, TRPCError } from '@trpc/server'
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

const t = initTRPC.create()

export const skillsRouter = t.router({
  getSkills: t.procedure
    .input(
      type({
        'limit?': 'number.integer >= 0 & number.integer <= 100',
        'order?': OrderEnumSchema,
        'after?': type('string').describe(
          'Identifier for the last item from the previous pagination request',
        ),
      }),
    )
    .output(SkillListResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postSkills: t.procedure
    .input(CreateSkillBodySchema)
    .output(SkillResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getSkillsSkillId: t.procedure
    .input(type({ skill_id: 'string' }))
    .output(SkillResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postSkillsSkillId: t.procedure
    .input(
      type({
        skill_id: 'string',
        default_version: type('string').describe('The skill version number to set as default.'),
      }),
    )
    .output(SkillResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteSkillsSkillId: t.procedure
    .input(type({ skill_id: 'string' }))
    .output(DeletedSkillResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getSkillsSkillIdContent: t.procedure
    .input(type({ skill_id: 'string' }))
    .output(type('string'))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getSkillsSkillIdVersions: t.procedure
    .input(
      type({
        skill_id: 'string',
        'limit?': 'number.integer >= 0 & number.integer <= 100',
        'order?': OrderEnumSchema,
        'after?': 'string',
      }),
    )
    .output(SkillVersionListResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postSkillsSkillIdVersions: t.procedure
    .input(
      type({
        skill_id: 'string',
        files: type(
          type('File[]')
            .and(type('unknown[] <= 500'))
            .describe('Skill files to upload (directory upload) or a single zip file.'),
        ).or(type('File').describe('Skill zip file to upload.')),
        'default?': type('boolean').describe('Whether to set this version as the default.'),
      }),
    )
    .output(SkillVersionResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getSkillsSkillIdVersionsVersion: t.procedure
    .input(
      type({
        skill_id: 'string',
        version: type('string').describe('The version number to retrieve.'),
      }),
    )
    .output(SkillVersionResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteSkillsSkillIdVersionsVersion: t.procedure
    .input(
      type({ skill_id: 'string', version: type('string').describe('The skill version number.') }),
    )
    .output(DeletedSkillVersionResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getSkillsSkillIdVersionsVersionContent: t.procedure
    .input(
      type({ skill_id: 'string', version: type('string').describe('The skill version number.') }),
    )
    .output(type('string'))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
