import { Hono } from 'hono'
import { postModerationsHandler } from '../routes'

export const moderationsHandler = new Hono().post(
  '/moderations',
  postModerationsHandler(async (c, { json }) => {}),
)
