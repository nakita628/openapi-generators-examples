import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const postOauth2V3Token = os.postOauth2V3Token.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getOauth2V21TokensKid = os.getOauth2V21TokensKid.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postOauth2V21Token = os.postOauth2V21Token.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getOauth2V21Verify = os.getOauth2V21Verify.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postOauth2V21Revoke = os.postOauth2V21Revoke.handler(async ({ input }) => { throw new Error('Not implemented') })
