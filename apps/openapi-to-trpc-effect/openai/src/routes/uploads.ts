import { initTRPC, TRPCError } from '@trpc/server'
import { Schema } from 'effect'
import { CreateUploadRequestSchema, UploadPartSchema, UploadSchema } from '../components'

const t = initTRPC.create()

export const uploadsRouter = t.router({
  postUploads: t.procedure
    .input(Schema.toStandardSchemaV1(CreateUploadRequestSchema))
    .output(Schema.toStandardSchemaV1(UploadSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postUploadsUploadIdCancel: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          upload_id: Schema.String.annotate({ jsonSchemaExamples: ['upload_abc123'] }),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(UploadSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postUploadsUploadIdComplete: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          upload_id: Schema.String.annotate({ jsonSchemaExamples: ['upload_abc123'] }),
          part_ids: Schema.Array(Schema.String).annotate({
            description: 'The ordered list of Part IDs.\n',
          }),
          md5: Schema.optional(
            Schema.String.annotate({
              description:
                'The optional md5 checksum for the file contents to verify if the bytes uploaded matches what you expect.\n',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(UploadSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postUploadsUploadIdParts: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          upload_id: Schema.String.annotate({ jsonSchemaExamples: ['upload_abc123'] }),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(UploadPartSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
