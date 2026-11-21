import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const getOauth2Me = os.getOauth2Me.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getOauth2ApplicationsMe = os.getOauth2ApplicationsMe.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getOauth2Keys = os.getOauth2Keys.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getOauth2Userinfo = os.getOauth2Userinfo.handler(async ({ input }) => { throw new Error('Not implemented') })
