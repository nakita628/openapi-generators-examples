import { initTRPC, TRPCError } from '@trpc/server'
import { Effect, Schema } from 'effect'
import {
  ContainerFileListResourceSchema,
  ContainerFileResourceSchema,
  ContainerListResourceSchema,
  ContainerResourceSchema,
  CreateContainerBodySchema,
} from '../components'

const t = initTRPC.create()

export const containersRouter = t.router({
  getContainers: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.Number.check(Schema.isInt()).pipe(
            Schema.withDecodingDefault(Effect.succeed(20)),
          ),
          order: Schema.Literals(['asc', 'desc']).pipe(
            Schema.withDecodingDefault(Effect.succeed('desc')),
          ),
          after: Schema.optionalKey(Schema.String),
          name: Schema.optionalKey(Schema.String),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ContainerListResourceSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postContainers: t.procedure
    .input(Schema.toStandardSchemaV1(CreateContainerBodySchema))
    .output(Schema.toStandardSchemaV1(ContainerResourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getContainersContainerId: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ container_id: Schema.String })))
    .output(Schema.toStandardSchemaV1(ContainerResourceSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteContainersContainerId: t.procedure
    .input(Schema.toStandardSchemaV1(Schema.Struct({ container_id: Schema.String })))
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          object: Schema.Literal('container.deleted'),
          deleted: Schema.Boolean,
          id: Schema.String,
        }),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getContainersContainerIdFiles: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          container_id: Schema.String,
          limit: Schema.Number.check(Schema.isInt()).pipe(
            Schema.withDecodingDefault(Effect.succeed(20)),
          ),
          order: Schema.Literals(['asc', 'desc']).pipe(
            Schema.withDecodingDefault(Effect.succeed('desc')),
          ),
          after: Schema.optionalKey(Schema.String),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ContainerFileListResourceSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postContainersContainerIdFiles: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          container_id: Schema.String,
          file_id: Schema.optionalKey(
            Schema.String.annotate({ description: 'Name of the file to create.' }),
          ),
          file: Schema.optionalKey(
            Schema.instanceOf(File).annotate({
              description: 'The File object (not file name) to be uploaded.\n',
            }),
          ),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ContainerFileResourceSchema))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getContainersContainerIdFilesFileId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({ container_id: Schema.String, file_id: Schema.String }),
      ),
    )
    .output(Schema.toStandardSchemaV1(ContainerFileResourceSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteContainersContainerIdFilesFileId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({ container_id: Schema.String, file_id: Schema.String }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          object: Schema.Literal('container.file.deleted'),
          deleted: Schema.Boolean,
          id: Schema.String,
        }),
      ),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getContainersContainerIdFilesFileIdContent: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({ container_id: Schema.String, file_id: Schema.String }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
