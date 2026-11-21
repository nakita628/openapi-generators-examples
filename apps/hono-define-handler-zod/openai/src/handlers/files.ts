import { Hono } from 'hono'
import {
  getFilesHandler,
  postFilesHandler,
  getFilesFileIdHandler,
  deleteFilesFileIdHandler,
  getFilesFileIdContentHandler,
} from '../routes'

export const filesHandler = new Hono()
  .get(
    '/files',
    getFilesHandler(async (c, { query }) => {}),
  )
  .post(
    '/files',
    postFilesHandler(async (c, { form }) => {}),
  )
  .get(
    '/files/:file_id',
    getFilesFileIdHandler(async (c, { param }) => {}),
  )
  .delete(
    '/files/:file_id',
    deleteFilesFileIdHandler(async (c, { param }) => {}),
  )
  .get(
    '/files/:file_id/content',
    getFilesFileIdContentHandler(async (c, { param }) => {}),
  )
