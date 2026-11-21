import { implement } from '@orpc/server'
import { contract } from '../contract'

const os = implement(contract)

export const postUser = os.postUser.handler(async ({ input }) => {})
export const postUserCreateWithList = os.postUserCreateWithList.handler(async ({ input }) => {})
export const getUserLogin = os.getUserLogin.handler(async ({ input }) => {})
export const getUserLogout = os.getUserLogout.handler(async ({ input }) => {})
export const getUserUsername = os.getUserUsername.handler(async ({ input }) => {})
export const putUserUsername = os.putUserUsername.handler(async ({ input }) => {})
export const deleteUserUsername = os.deleteUserUsername.handler(async ({ input }) => {})
