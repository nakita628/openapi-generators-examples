import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const postUploads = os.postUploads.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postUploadsUploadIdCancel = os.postUploadsUploadIdCancel.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const postUploadsUploadIdComplete = os.postUploadsUploadIdComplete.handler(
  async ({ input }) => { throw new Error('Not implemented') },
)
export const postUploadsUploadIdParts = os.postUploadsUploadIdParts.handler(async ({ input }) => { throw new Error('Not implemented') })
