import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const getFiles = os.getFiles.handler(async ({ input }) => {})
export const postFiles = os.postFiles.handler(async ({ input }) => {})
export const getFilesFileId = os.getFilesFileId.handler(async ({ input }) => {})
export const deleteFilesFileId = os.deleteFilesFileId.handler(async ({ input }) => {})
export const getFilesFileIdContent = os.getFilesFileIdContent.handler(async ({ input }) => {})
