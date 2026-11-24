import { initTRPC, TRPCError } from '@trpc/server'
import { Schema } from 'effect'
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
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.optionalKey(
            Schema.Number.check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(0),
              Schema.isLessThanOrEqualTo(100),
            ),
          ),
          order: Schema.optionalKey(OrderEnumSchema),
          after: Schema.optionalKey(
            Schema.String.annotate({
              description: 'Identifier for the last item from the previous pagination request',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(SkillListResourceSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postSkills: t.procedure
    .input(Schema.toStandardSchemaV1(CreateSkillBodySchema))
    .output(Schema.toStandardSchemaV1(SkillResourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getSkillsSkillId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({ skill_id: Schema.String.annotate({ jsonSchemaExamples: ['skill_123'] }) }),
      ),
    )
    .output(Schema.toStandardSchemaV1(SkillResourceSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postSkillsSkillId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          skill_id: Schema.String.annotate({ jsonSchemaExamples: ['skill_123'] }),
          default_version: Schema.String.annotate({
            description: 'The skill version number to set as default.',
          }),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(SkillResourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteSkillsSkillId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({ skill_id: Schema.String.annotate({ jsonSchemaExamples: ['skill_123'] }) }),
      ),
    )
    .output(Schema.toStandardSchemaV1(DeletedSkillResourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getSkillsSkillIdContent: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({ skill_id: Schema.String.annotate({ jsonSchemaExamples: ['skill_123'] }) }),
      ),
    )
    .output(Schema.toStandardSchemaV1(Schema.String))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getSkillsSkillIdVersions: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          skill_id: Schema.String.annotate({ jsonSchemaExamples: ['skill_123'] }),
          limit: Schema.optionalKey(
            Schema.Number.check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(0),
              Schema.isLessThanOrEqualTo(100),
            ),
          ),
          order: Schema.optionalKey(OrderEnumSchema),
          after: Schema.optionalKey(
            Schema.String.annotate({ jsonSchemaExamples: ['skillver_123'] }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(SkillVersionListResourceSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postSkillsSkillIdVersions: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          skill_id: Schema.String.annotate({ jsonSchemaExamples: ['skill_123'] }),
          files: Schema.Union([
            Schema.Array(Schema.instanceOf(File))
              .check(Schema.isMaxLength(500))
              .annotate({
                description: 'Skill files to upload (directory upload) or a single zip file.',
              }),
            Schema.instanceOf(File).annotate({ description: 'Skill zip file to upload.' }),
          ]),
          default: Schema.optionalKey(
            Schema.Boolean.annotate({ description: 'Whether to set this version as the default.' }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(SkillVersionResourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getSkillsSkillIdVersionsVersion: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          skill_id: Schema.String.annotate({ jsonSchemaExamples: ['skill_123'] }),
          version: Schema.String.annotate({ description: 'The version number to retrieve.' }),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(SkillVersionResourceSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteSkillsSkillIdVersionsVersion: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          skill_id: Schema.String.annotate({ jsonSchemaExamples: ['skill_123'] }),
          version: Schema.String.annotate({ description: 'The skill version number.' }),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(DeletedSkillVersionResourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getSkillsSkillIdVersionsVersionContent: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          skill_id: Schema.String.annotate({ jsonSchemaExamples: ['skill_123'] }),
          version: Schema.String.annotate({ description: 'The skill version number.' }),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(Schema.String))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
