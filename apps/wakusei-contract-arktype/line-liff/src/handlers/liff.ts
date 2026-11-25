import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const getLiffV1Apps = os.getLiffV1Apps.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postLiffV1Apps = os.postLiffV1Apps.handler(async ({ input }) => { throw new Error('Not implemented') })
export const putLiffV1AppsLiffId = os.putLiffV1AppsLiffId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const deleteLiffV1AppsLiffId = os.deleteLiffV1AppsLiffId.handler(async ({ input }) => { throw new Error('Not implemented') })
