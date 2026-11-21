import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const getContainers = os.getContainers.handler(async ({ input }) => {})
export const postContainers = os.postContainers.handler(async ({ input }) => {})
export const getContainersContainerId = os.getContainersContainerId.handler(async ({ input }) => {})
export const deleteContainersContainerId = os.deleteContainersContainerId.handler(
  async ({ input }) => {},
)
export const getContainersContainerIdFiles = os.getContainersContainerIdFiles.handler(
  async ({ input }) => {},
)
export const postContainersContainerIdFiles = os.postContainersContainerIdFiles.handler(
  async ({ input }) => {},
)
export const getContainersContainerIdFilesFileId = os.getContainersContainerIdFilesFileId.handler(
  async ({ input }) => {},
)
export const deleteContainersContainerIdFilesFileId =
  os.deleteContainersContainerIdFilesFileId.handler(async ({ input }) => {})
export const getContainersContainerIdFilesFileIdContent =
  os.getContainersContainerIdFilesFileIdContent.handler(async ({ input }) => {})
