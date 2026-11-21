import { Hono } from 'hono'
import {
  postImagesEditsHandler,
  postImagesGenerationsHandler,
  postImagesVariationsHandler,
} from '../routes'

export const imagesHandler = new Hono()
  .post(
    '/images/edits',
    postImagesEditsHandler(async (c, { form, json }) => {}),
  )
  .post(
    '/images/generations',
    postImagesGenerationsHandler(async (c, { json }) => {}),
  )
  .post(
    '/images/variations',
    postImagesVariationsHandler(async (c, { form }) => {}),
  )
