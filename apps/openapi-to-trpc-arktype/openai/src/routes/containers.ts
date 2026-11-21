import { initTRPC, TRPCError } from '@trpc/server'
import { type } from 'arktype'
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
      type({
        'limit?': 'number.integer',
        'order?': "'asc' | 'desc'",
        'after?': 'string',
        'name?': 'string',
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
    .input(type({ container_id: 'string' }))
    .output(ContainerResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteContainersContainerId: t.procedure
    .input(type({ container_id: 'string' }))
    .output(type({ object: "'container.deleted'", deleted: 'boolean', id: 'string' }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getContainersContainerIdFiles: t.procedure
    .input(
      type({
        container_id: 'string',
        'limit?': 'number.integer',
        'order?': "'asc' | 'desc'",
        'after?': 'string',
      }),
    )
    .output(ContainerFileListResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postContainersContainerIdFiles: t.procedure
    .input(
      type({
        container_id: 'string',
        'file_id?': type('string').describe('Name of the file to create.'),
        'file?': type('File').describe('The File object (not file name) to be uploaded.\n'),
      }),
    )
    .output(ContainerFileResourceSchema)
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getContainersContainerIdFilesFileId: t.procedure
    .input(type({ container_id: 'string', file_id: 'string' }))
    .output(ContainerFileResourceSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deleteContainersContainerIdFilesFileId: t.procedure
    .input(type({ container_id: 'string', file_id: 'string' }))
    .output(type({ object: "'container.file.deleted'", deleted: 'boolean', id: 'string' }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getContainersContainerIdFilesFileIdContent: t.procedure
    .input(type({ container_id: 'string', file_id: 'string' }))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
