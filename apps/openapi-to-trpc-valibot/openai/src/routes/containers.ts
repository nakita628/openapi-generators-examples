import { initTRPC, TRPCError } from '@trpc/server'
import * as v from 'valibot'
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
      v.object({
        limit: v.optional(v.pipe(v.number(), v.integer()), 20),
        order: v.optional(v.picklist(['asc', 'desc']), 'desc'),
        after: v.optional(v.string()),
        name: v.optional(v.string()),
      }),
    )
    .output(ContainerListResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postContainers: t.procedure
    .input(CreateContainerBodySchema)
    .output(ContainerResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getContainersContainerId: t.procedure
    .input(v.object({ container_id: v.string() }))
    .output(ContainerResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteContainersContainerId: t.procedure
    .input(v.object({ container_id: v.string() }))
    .output(
      v.object({ object: v.literal('container.deleted'), deleted: v.boolean(), id: v.string() }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getContainersContainerIdFiles: t.procedure
    .input(
      v.object({
        container_id: v.string(),
        limit: v.optional(v.pipe(v.number(), v.integer()), 20),
        order: v.optional(v.picklist(['asc', 'desc']), 'desc'),
        after: v.optional(v.string()),
      }),
    )
    .output(ContainerFileListResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postContainersContainerIdFiles: t.procedure
    .input(
      v.object({
        container_id: v.string(),
        file_id: v.optional(v.pipe(v.string(), v.description('Name of the file to create.'))),
        file: v.optional(
          v.pipe(v.file(), v.description('The File object (not file name) to be uploaded.\n')),
        ),
      }),
    )
    .output(ContainerFileResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getContainersContainerIdFilesFileId: t.procedure
    .input(v.object({ container_id: v.string(), file_id: v.string() }))
    .output(ContainerFileResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteContainersContainerIdFilesFileId: t.procedure
    .input(v.object({ container_id: v.string(), file_id: v.string() }))
    .output(
      v.object({
        object: v.literal('container.file.deleted'),
        deleted: v.boolean(),
        id: v.string(),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getContainersContainerIdFilesFileIdContent: t.procedure
    .input(v.object({ container_id: v.string(), file_id: v.string() }))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
