import { os } from '@orpc/server'
import * as z from 'zod'
import {
  ContainerFileListResourceSchema,
  ContainerFileResourceSchema,
  ContainerListResourceSchema,
  ContainerResourceSchema,
  CreateContainerBodySchema,
} from '../components'

export const getContainers = os
  .route({
    method: 'GET',
    path: '/containers',
    summary: 'List containers',
    description: 'List Containers',
    successDescription: 'Success',
  })
  .input(
    z.object({
      limit: z.coerce.number().int().default(20).exactOptional(),
      order: z.enum(['asc', 'desc']).default('desc').exactOptional(),
      after: z.string().exactOptional(),
      name: z.string().exactOptional(),
    }),
  )
  .output(ContainerListResourceSchema)
  .handler(async ({ input }) => {})

export const postContainers = os
  .route({
    method: 'POST',
    path: '/containers',
    summary: 'Create container',
    description: 'Create Container',
    successDescription: 'Success',
  })
  .input(CreateContainerBodySchema)
  .output(ContainerResourceSchema)
  .handler(async ({ input }) => {})

export const getContainersContainerId = os
  .route({
    method: 'GET',
    path: '/containers/{container_id}',
    summary: 'Retrieve container',
    description: 'Retrieve Container',
    successDescription: 'Success',
  })
  .input(z.object({ container_id: z.string() }))
  .output(ContainerResourceSchema)
  .handler(async ({ input }) => {})

export const deleteContainersContainerId = os
  .route({
    method: 'DELETE',
    path: '/containers/{container_id}',
    summary: 'Delete a container',
    description: 'Delete Container',
  })
  .input(z.object({ container_id: z.string() }))
  .output(
    z.object({ object: z.literal('container.deleted'), deleted: z.boolean(), id: z.string() }),
  )
  .handler(async ({ input }) => {})

export const getContainersContainerIdFiles = os
  .route({
    method: 'GET',
    path: '/containers/{container_id}/files',
    summary: 'List container files',
    description: 'List Container files',
    successDescription: 'Success',
  })
  .input(
    z.object({
      container_id: z.string(),
      limit: z.coerce.number().int().default(20).exactOptional(),
      order: z.enum(['asc', 'desc']).default('desc').exactOptional(),
      after: z.string().exactOptional(),
    }),
  )
  .output(ContainerFileListResourceSchema)
  .handler(async ({ input }) => {})

export const postContainersContainerIdFiles = os
  .route({
    method: 'POST',
    path: '/containers/{container_id}/files',
    summary: 'Create container file',
    description:
      'Create a Container File\n\nYou can send either a multipart/form-data request with the raw file content, or a JSON request with a file ID.\n',
    successDescription: 'Success',
  })
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
  .handler(async ({ input }) => {})

export const getContainersContainerIdFilesFileId = os
  .route({
    method: 'GET',
    path: '/containers/{container_id}/files/{file_id}',
    summary: 'Retrieve container file',
    description: 'Retrieve Container File',
    successDescription: 'Success',
  })
  .input(z.object({ container_id: z.string(), file_id: z.string() }))
  .output(ContainerFileResourceSchema)
  .handler(async ({ input }) => {})

export const deleteContainersContainerIdFilesFileId = os
  .route({
    method: 'DELETE',
    path: '/containers/{container_id}/files/{file_id}',
    summary: 'Delete a container file',
    description: 'Delete Container File',
  })
  .input(z.object({ container_id: z.string(), file_id: z.string() }))
  .output(
    z.object({ object: z.literal('container.file.deleted'), deleted: z.boolean(), id: z.string() }),
  )
  .handler(async ({ input }) => {})

export const getContainersContainerIdFilesFileIdContent = os
  .route({
    method: 'GET',
    path: '/containers/{container_id}/files/{file_id}/content',
    summary: 'Retrieve container file content',
    description: 'Retrieve Container File Content',
    successDescription: 'Success',
  })
  .input(z.object({ container_id: z.string(), file_id: z.string() }))
  .handler(async ({ input }) => {})
