import { os } from '@orpc/server'
import { type } from 'arktype'
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
    type({
      'limit?': type('string').pipe((data, ctx) => {
        const value = Number(data)
        return Number.isSafeInteger(value) ? value : ctx.error('an integer')
      }),
      'order?': type("'asc' | 'desc'"),
      'after?': type('string'),
      'name?': type('string'),
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
  .input(type({ container_id: type('string') }))
  .output(ContainerResourceSchema)
  .handler(async ({ input }) => {})

export const deleteContainersContainerId = os
  .route({
    method: 'DELETE',
    path: '/containers/{container_id}',
    summary: 'Delete a container',
    description: 'Delete Container',
  })
  .input(type({ container_id: type('string') }))
  .output(type({ object: "'container.deleted'", deleted: 'boolean', id: 'string' }))
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
    type({
      container_id: type('string'),
      'limit?': type('string').pipe((data, ctx) => {
        const value = Number(data)
        return Number.isSafeInteger(value) ? value : ctx.error('an integer')
      }),
      'order?': type("'asc' | 'desc'"),
      'after?': type('string'),
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
    type({
      container_id: type('string'),
      'file_id?': type('string').describe('Name of the file to create.'),
      'file?': type('File').describe('The File object (not file name) to be uploaded.\n'),
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
  .input(type({ container_id: type('string'), file_id: type('string') }))
  .output(ContainerFileResourceSchema)
  .handler(async ({ input }) => {})

export const deleteContainersContainerIdFilesFileId = os
  .route({
    method: 'DELETE',
    path: '/containers/{container_id}/files/{file_id}',
    summary: 'Delete a container file',
    description: 'Delete Container File',
  })
  .input(type({ container_id: type('string'), file_id: type('string') }))
  .output(type({ object: "'container.file.deleted'", deleted: 'boolean', id: 'string' }))
  .handler(async ({ input }) => {})

export const getContainersContainerIdFilesFileIdContent = os
  .route({
    method: 'GET',
    path: '/containers/{container_id}/files/{file_id}/content',
    summary: 'Retrieve container file content',
    description: 'Retrieve Container File Content',
    successDescription: 'Success',
  })
  .input(type({ container_id: type('string'), file_id: type('string') }))
  .handler(async ({ input }) => {})
