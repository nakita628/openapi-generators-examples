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
    getFilesHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/files',
    postFilesHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/files/:file_id',
    getFilesFileIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/files/:file_id',
    deleteFilesFileIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/files/:file_id/content',
    getFilesFileIdContentHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
