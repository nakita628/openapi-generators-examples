import { Hono } from 'hono'
import {
  getUsersUserIdHandler,
  getUsersUserIdPlaylistsHandler,
  postUsersUserIdPlaylistsHandler,
} from '../routes'

export const usersHandler = new Hono()
  .get(
    '/users/:user_id',
    getUsersUserIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/users/:user_id/playlists',
    getUsersUserIdPlaylistsHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/users/:user_id/playlists',
    postUsersUserIdPlaylistsHandler(async (c, { param, json }) => { throw new Error('Not implemented') }),
  )
