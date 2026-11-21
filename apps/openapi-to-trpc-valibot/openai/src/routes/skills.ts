import { initTRPC, TRPCError } from '@trpc/server'
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

const t = initTRPC.create()

export const skillsRouter = t.router({
  getSkills: t.procedure
    .input(
      v.partial(
        v.object({
          limit: v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(100)),
          order: OrderEnumSchema,
          after: v.pipe(
            v.string(),
            v.description('Identifier for the last item from the previous pagination request'),
          ),
        }),
      ),
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
    .input(v.object({ skill_id: v.pipe(v.string(), v.metadata({ examples: ['skill_123'] })) }))
    .output(SkillResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postSkillsSkillId: t.procedure
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
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteSkillsSkillId: t.procedure
    .input(v.object({ skill_id: v.pipe(v.string(), v.metadata({ examples: ['skill_123'] })) }))
    .output(DeletedSkillResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getSkillsSkillIdContent: t.procedure
    .input(v.object({ skill_id: v.pipe(v.string(), v.metadata({ examples: ['skill_123'] })) }))
    .output(v.string())
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getSkillsSkillIdVersions: t.procedure
    .input(
      v.object({
        skill_id: v.pipe(v.string(), v.metadata({ examples: ['skill_123'] })),
        limit: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(100))),
        order: v.optional(OrderEnumSchema),
        after: v.optional(v.pipe(v.string(), v.metadata({ examples: ['skillver_123'] }))),
      }),
    )
    .output(SkillVersionListResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postSkillsSkillIdVersions: t.procedure
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
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getSkillsSkillIdVersionsVersion: t.procedure
    .input(
      v.object({
        skill_id: v.pipe(v.string(), v.metadata({ examples: ['skill_123'] })),
        version: v.pipe(v.string(), v.description('The version number to retrieve.')),
      }),
    )
    .output(SkillVersionResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteSkillsSkillIdVersionsVersion: t.procedure
    .input(
      v.object({
        skill_id: v.pipe(v.string(), v.metadata({ examples: ['skill_123'] })),
        version: v.pipe(v.string(), v.description('The skill version number.')),
      }),
    )
    .output(DeletedSkillVersionResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getSkillsSkillIdVersionsVersionContent: t.procedure
    .input(
      v.object({
        skill_id: v.pipe(v.string(), v.metadata({ examples: ['skill_123'] })),
        version: v.pipe(v.string(), v.description('The skill version number.')),
      }),
    )
    .output(v.string())
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
