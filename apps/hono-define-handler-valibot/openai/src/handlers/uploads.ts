import { Hono } from 'hono'
import {
  postUploadsHandler,
  postUploadsUploadIdCancelHandler,
  postUploadsUploadIdCompleteHandler,
  postUploadsUploadIdPartsHandler,
} from '../routes'

export const uploadsHandler = new Hono()
  .post(
    '/uploads',
    postUploadsHandler(async (c, { json }) => {}),
  )
  .post(
    '/uploads/:upload_id/cancel',
    postUploadsUploadIdCancelHandler(async (c, { param }) => {}),
  )
  .post(
    '/uploads/:upload_id/complete',
    postUploadsUploadIdCompleteHandler(async (c, { param, json }) => {}),
  )
  .post(
    '/uploads/:upload_id/parts',
    postUploadsUploadIdPartsHandler(async (c, { param, form }) => {}),
  )
