import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const getUsersUserId = os.getUsersUserId.handler(async ({ input }) => {})
export const getUsersUserIdPlaylists = os.getUsersUserIdPlaylists.handler(async ({ input }) => {})
export const postUsersUserIdPlaylists = os.postUsersUserIdPlaylists.handler(async ({ input }) => {})
