import { initTRPC, TRPCError } from '@trpc/server'
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

const t = initTRPC.create()

export const skillsRouter = t.router({
  getSkills: t.procedure
    .input(
      z.object({
        limit: z.int().min(0).max(100).exactOptional(),
        order: OrderEnumSchema.exactOptional(),
        after: z
          .string()
          .meta({
            description: 'Identifier for the last item from the previous pagination request',
          })
          .exactOptional(),
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
    .input(z.object({ skill_id: z.string().meta({ examples: ['skill_123'] }) }))
    .output(SkillResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postSkillsSkillId: t.procedure
    .input(
      z.object({
        skill_id: z.string().meta({ examples: ['skill_123'] }),
        default_version: z
          .string()
          .meta({ description: 'The skill version number to set as default.' }),
      }),
    )
    .output(SkillResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteSkillsSkillId: t.procedure
    .input(z.object({ skill_id: z.string().meta({ examples: ['skill_123'] }) }))
    .output(DeletedSkillResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getSkillsSkillIdContent: t.procedure
    .input(z.object({ skill_id: z.string().meta({ examples: ['skill_123'] }) }))
    .output(z.string())
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getSkillsSkillIdVersions: t.procedure
    .input(
      z.object({
        skill_id: z.string().meta({ examples: ['skill_123'] }),
        limit: z.int().min(0).max(100).exactOptional(),
        order: OrderEnumSchema.exactOptional(),
        after: z
          .string()
          .meta({ examples: ['skillver_123'] })
          .exactOptional(),
      }),
    )
    .output(SkillVersionListResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postSkillsSkillIdVersions: t.procedure
    .input(
      z.object({
        skill_id: z.string().meta({ examples: ['skill_123'] }),
        files: z.xor([
          z
            .array(z.file())
            .max(500)
            .meta({
              description: 'Skill files to upload (directory upload) or a single zip file.',
            }),
          z.file().meta({ description: 'Skill zip file to upload.' }),
        ]),
        default: z
          .boolean()
          .meta({ description: 'Whether to set this version as the default.' })
          .exactOptional(),
      }),
    )
    .output(SkillVersionResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getSkillsSkillIdVersionsVersion: t.procedure
    .input(
      z.object({
        skill_id: z.string().meta({ examples: ['skill_123'] }),
        version: z.string().meta({ description: 'The version number to retrieve.' }),
      }),
    )
    .output(SkillVersionResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteSkillsSkillIdVersionsVersion: t.procedure
    .input(
      z.object({
        skill_id: z.string().meta({ examples: ['skill_123'] }),
        version: z.string().meta({ description: 'The skill version number.' }),
      }),
    )
    .output(DeletedSkillVersionResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getSkillsSkillIdVersionsVersionContent: t.procedure
    .input(
      z.object({
        skill_id: z.string().meta({ examples: ['skill_123'] }),
        version: z.string().meta({ description: 'The skill version number.' }),
      }),
    )
    .output(z.string())
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
