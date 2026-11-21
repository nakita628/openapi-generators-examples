import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const getStickerPacks = os.getStickerPacks.handler(async ({ input }) => {})
export const getStickerPacksPackId = os.getStickerPacksPackId.handler(async ({ input }) => {})
