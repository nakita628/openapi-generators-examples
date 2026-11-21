import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const getUsersUserId = os.getUsersUserId.handler(async ({ input }) => { throw new Error('Not implemented') })
export const getUsersUserIdPlaylists = os.getUsersUserIdPlaylists.handler(async ({ input }) => { throw new Error('Not implemented') })
export const postUsersUserIdPlaylists = os.postUsersUserIdPlaylists.handler(async ({ input }) => { throw new Error('Not implemented') })
