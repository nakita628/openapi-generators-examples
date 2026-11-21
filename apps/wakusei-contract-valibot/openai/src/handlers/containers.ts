import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const getContainers = os.getContainers.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postContainers = os.postContainers.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getContainersContainerId = os.getContainersContainerId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const deleteContainersContainerId = os.deleteContainersContainerId.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const getContainersContainerIdFiles = os.getContainersContainerIdFiles.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const postContainersContainerIdFiles = os.postContainersContainerIdFiles.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const getContainersContainerIdFilesFileId = os.getContainersContainerIdFilesFileId.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const deleteContainersContainerIdFilesFileId =
  os.deleteContainersContainerIdFilesFileId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getContainersContainerIdFilesFileIdContent =
  os.getContainersContainerIdFilesFileIdContent.handler(async ({ input }) => { throw new Error('Not implemented') })
