import { os } from '@orpc/server'
import * as v from 'valibot'
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
    v.object({
      limit: v.optional(
        v.optional(v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()), '20'),
      ),
      order: v.optional(v.optional(v.picklist(['asc', 'desc']), 'desc')),
      after: v.optional(v.string()),
      name: v.optional(v.string()),
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
  .input(v.object({ container_id: v.string() }))
  .output(ContainerResourceSchema)
  .handler(async ({ input }) => {})

export const deleteContainersContainerId = os
  .route({
    method: 'DELETE',
    path: '/containers/{container_id}',
    summary: 'Delete a container',
    description: 'Delete Container',
  })
  .input(v.object({ container_id: v.string() }))
  .output(
    v.object({ object: v.literal('container.deleted'), deleted: v.boolean(), id: v.string() }),
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
    v.object({
      container_id: v.string(),
      limit: v.optional(
        v.optional(v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()), '20'),
      ),
      order: v.optional(v.optional(v.picklist(['asc', 'desc']), 'desc')),
      after: v.optional(v.string()),
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
    v.object({
      container_id: v.string(),
      file_id: v.optional(v.pipe(v.string(), v.description('Name of the file to create.'))),
      file: v.optional(
        v.pipe(v.file(), v.description('The File object (not file name) to be uploaded.\n')),
      ),
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
  .input(v.object({ container_id: v.string(), file_id: v.string() }))
  .output(ContainerFileResourceSchema)
  .handler(async ({ input }) => {})

export const deleteContainersContainerIdFilesFileId = os
  .route({
    method: 'DELETE',
    path: '/containers/{container_id}/files/{file_id}',
    summary: 'Delete a container file',
    description: 'Delete Container File',
  })
  .input(v.object({ container_id: v.string(), file_id: v.string() }))
  .output(
    v.object({ object: v.literal('container.file.deleted'), deleted: v.boolean(), id: v.string() }),
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
  .input(v.object({ container_id: v.string(), file_id: v.string() }))
  .handler(async ({ input }) => {})
