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
    postUserHandler(async (c, { form, json }) => {}),
  )
  .post(
    '/user/createWithList',
    postUserCreateWithListHandler(async (c, { json }) => {}),
  )
  .get(
    '/user/login',
    getUserLoginHandler(async (c, { query }) => {}),
  )
  .get(
    '/user/logout',
    getUserLogoutHandler(async (c) => {}),
  )
  .get(
    '/user/:username',
    getUserUsernameHandler(async (c, { param }) => {}),
  )
  .put(
    '/user/:username',
    putUserUsernameHandler(async (c, { param, form, json }) => {}),
  )
  .delete(
    '/user/:username',
    deleteUserUsernameHandler(async (c, { param }) => {}),
  )
