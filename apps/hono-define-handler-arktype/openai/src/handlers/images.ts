import { Hono } from 'hono'
import {
  postImagesEditsHandler,
  postImagesGenerationsHandler,
  postImagesVariationsHandler,
} from '../routes'

export const imagesHandler = new Hono()
  .post(
    '/images/edits',
    postImagesEditsHandler(async (c, { form, json }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/images/generations',
    postImagesGenerationsHandler(async (c, { json }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/images/variations',
    postImagesVariationsHandler(async (c, { form }) => { throw new Error('Not implemented') }),
  )
