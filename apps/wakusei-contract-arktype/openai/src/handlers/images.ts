import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const postImagesEdits = os.postImagesEdits.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postImagesGenerations = os.postImagesGenerations.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postImagesVariations = os.postImagesVariations.handler(async ({ input }) => { throw new Error('Not implemented') })
