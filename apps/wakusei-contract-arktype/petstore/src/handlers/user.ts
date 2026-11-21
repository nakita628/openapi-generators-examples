import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const postUser = os.postUser.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postUserCreateWithList = os.postUserCreateWithList.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getUserLogin = os.getUserLogin.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getUserLogout = os.getUserLogout.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getUserUsername = os.getUserUsername.handler(async ({ input }) => { throw new Error('Not implemented') })
export const putUserUsername = os.putUserUsername.handler(async ({ input }) => { throw new Error('Not implemented') })
export const deleteUserUsername = os.deleteUserUsername.handler(async ({ input }) => { throw new Error('Not implemented') })
