import { Hono } from 'hono'
import {
  putPetHandler,
  postPetHandler,
  getPetFindByStatusHandler,
  getPetFindByTagsHandler,
  getPetPetIdHandler,
  postPetPetIdHandler,
  deletePetPetIdHandler,
  postPetPetIdUploadImageHandler,
} from '../routes'

export const petHandler = new Hono()
  .put(
    '/pet',
    putPetHandler(async (c, { form, json }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/pet',
    postPetHandler(async (c, { form, json }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/pet/findByStatus',
    getPetFindByStatusHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/pet/findByTags',
    getPetFindByTagsHandler(async (c, { query }) => { throw new Error('Not implemented') }),
  )
  .get(
    '/pet/:petId',
    getPetPetIdHandler(async (c, { param }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/pet/:petId',
    postPetPetIdHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
  .delete(
    '/pet/:petId',
    deletePetPetIdHandler(async (c, { param, header }) => { throw new Error('Not implemented') }),
  )
  .post(
    '/pet/:petId/uploadImage',
    postPetPetIdUploadImageHandler(async (c, { param, query }) => { throw new Error('Not implemented') }),
  )
