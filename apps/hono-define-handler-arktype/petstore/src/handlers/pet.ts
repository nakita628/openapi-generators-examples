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
    putPetHandler(async (c, { form, json }) => {}),
  )
  .post(
    '/pet',
    postPetHandler(async (c, { form, json }) => {}),
  )
  .get(
    '/pet/findByStatus',
    getPetFindByStatusHandler(async (c, { query }) => {}),
  )
  .get(
    '/pet/findByTags',
    getPetFindByTagsHandler(async (c, { query }) => {}),
  )
  .get(
    '/pet/:petId',
    getPetPetIdHandler(async (c, { param }) => {}),
  )
  .post(
    '/pet/:petId',
    postPetPetIdHandler(async (c, { param, query }) => {}),
  )
  .delete(
    '/pet/:petId',
    deletePetPetIdHandler(async (c, { param, header }) => {}),
  )
  .post(
    '/pet/:petId/uploadImage',
    postPetPetIdUploadImageHandler(async (c, { param, query }) => {}),
  )
