import { Hono } from 'hono'
import {
  getUsersUserIdHandler,
  getUsersUserIdPlaylistsHandler,
  postUsersUserIdPlaylistsHandler,
} from '../routes'

export const usersHandler = new Hono()
  .get(
    '/users/:user_id',
    getUsersUserIdHandler(async (c, { param }) => {}),
  )
  .get(
    '/users/:user_id/playlists',
    getUsersUserIdPlaylistsHandler(async (c, { param, query }) => {}),
  )
  .post(
    '/users/:user_id/playlists',
    postUsersUserIdPlaylistsHandler(async (c, { param, json }) => {}),
  )
