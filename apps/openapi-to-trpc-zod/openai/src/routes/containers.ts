import { initTRPC, TRPCError } from '@trpc/server'
import * as z from 'zod'
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
      z.object({
        limit: z.int().default(20).exactOptional(),
        order: z.enum(['asc', 'desc']).default('desc').exactOptional(),
        after: z.string().exactOptional(),
        name: z.string().exactOptional(),
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
    .input(z.object({ container_id: z.string() }))
    .output(ContainerResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteContainersContainerId: t.procedure
    .input(z.object({ container_id: z.string() }))
    .output(
      z.object({ object: z.literal('container.deleted'), deleted: z.boolean(), id: z.string() }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getContainersContainerIdFiles: t.procedure
    .input(
      z.object({
        container_id: z.string(),
        limit: z.int().default(20).exactOptional(),
        order: z.enum(['asc', 'desc']).default('desc').exactOptional(),
        after: z.string().exactOptional(),
      }),
    )
    .output(ContainerFileListResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postContainersContainerIdFiles: t.procedure
    .input(
      z.object({
        container_id: z.string(),
        file_id: z.string().meta({ description: 'Name of the file to create.' }).exactOptional(),
        file: z
          .file()
          .meta({ description: 'The File object (not file name) to be uploaded.\n' })
          .exactOptional(),
      }),
    )
    .output(ContainerFileResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getContainersContainerIdFilesFileId: t.procedure
    .input(z.object({ container_id: z.string(), file_id: z.string() }))
    .output(ContainerFileResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteContainersContainerIdFilesFileId: t.procedure
    .input(z.object({ container_id: z.string(), file_id: z.string() }))
    .output(
      z.object({
        object: z.literal('container.file.deleted'),
        deleted: z.boolean(),
        id: z.string(),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getContainersContainerIdFilesFileIdContent: t.procedure
    .input(z.object({ container_id: z.string(), file_id: z.string() }))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
