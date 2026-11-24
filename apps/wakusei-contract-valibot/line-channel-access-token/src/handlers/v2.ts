import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const postV2OauthAccessToken = os.postV2OauthAccessToken.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postV2OauthVerify = os.postV2OauthVerify.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postV2OauthRevoke = os.postV2OauthRevoke.handler(async ({ input }) => { throw new Error('Not implemented') })
