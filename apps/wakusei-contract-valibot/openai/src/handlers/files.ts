import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const getFiles = os.getFiles.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postFiles = os.postFiles.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getFilesFileId = os.getFilesFileId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const deleteFilesFileId = os.deleteFilesFileId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getFilesFileIdContent = os.getFilesFileIdContent.handler(async ({ input }) => { throw new Error('Not implemented') })
