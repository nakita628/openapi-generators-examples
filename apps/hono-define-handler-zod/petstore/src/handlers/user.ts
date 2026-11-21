import { Hono } from 'hono'
import {
  postUserHandler,
  postUserCreateWithListHandler,
  getUserLoginHandler,
  getUserLogoutHandler,
  getUserUsernameHandler,
  putUserUsernameHandler,
  deleteUserUsernameHandler,
} from '../routes'

export const userHandler = new Hono()
  .post(
    '/user',
    postUserHandler(async (c, { form, json }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/user/createWithList',
    postUserCreateWithListHandler(async (c, { json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/user/login',
    getUserLoginHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/user/logout',
    getUserLogoutHandler(async (c) => { throw new Error('Not implemented') }),
  )
  .get(
    '/user/:username',
    getUserUsernameHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .put(
    '/user/:username',
    putUserUsernameHandler(async (c, { param, form, json }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/user/:username',
    deleteUserUsernameHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
