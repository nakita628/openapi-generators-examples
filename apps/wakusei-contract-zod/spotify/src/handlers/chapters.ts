import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const getChaptersId = os.getChaptersId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getChapters = os.getChapters.handler(async ({ input }) => { throw new Error('Not implemented') })
