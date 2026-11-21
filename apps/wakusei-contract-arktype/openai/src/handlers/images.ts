import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const postImagesEdits = os.postImagesEdits.handler(async ({ input }) => {})
export const postImagesGenerations = os.postImagesGenerations.handler(async ({ input }) => {})
export const postImagesVariations = os.postImagesVariations.handler(async ({ input }) => {})
