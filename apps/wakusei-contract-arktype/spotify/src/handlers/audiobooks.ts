import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const getAudiobooksId = os.getAudiobooksId.handler(async ({ input }) => {})
export const getAudiobooks = os.getAudiobooks.handler(async ({ input }) => {})
export const getAudiobooksIdChapters = os.getAudiobooksIdChapters.handler(async ({ input }) => {})
