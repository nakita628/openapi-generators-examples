import { initTRPC, TRPCError } from '@trpc/server'
import { Schema } from 'effect'
import { DeleteFileResponseSchema, ListFilesResponseSchema, OpenAIFileSchema } from '../components'

const t = initTRPC.create()

export const filesRouter = t.router({
  getFiles: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          purpose: Schema.optional(Schema.String),
          limit: Schema.Number.check(Schema.isInt()).pipe(
            Schema.withDecodingDefault(Effect.succeed(10000)),
          ),
          order: Schema.Literals(['asc', 'desc']).pipe(
            Schema.withDecodingDefault(Effect.succeed('desc')),
          ),
          after: Schema.optional(Schema.String),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ListFilesResponseSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postFiles: t.procedure.output(Schema.toStandardSchemaV1(OpenAIFileSchema)).mutation(() => {
    throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
  }),
  getFilesFileId: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ file_id: Schema.String })))
    .output(Schema.toStandardSchemaV1(OpenAIFileSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteFilesFileId: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ file_id: Schema.String })))
    .output(Schema.toStandardSchemaV1(DeleteFileResponseSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getFilesFileIdContent: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ file_id: Schema.String })))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
