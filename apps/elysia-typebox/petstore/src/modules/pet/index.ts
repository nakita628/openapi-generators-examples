import { Elysia, t } from 'elysia'
import { ApiResponseSchema, CategorySchema, PetSchema, TagSchema } from '../../components/schemas'
import { PetModel } from './model'

export const pet = new Elysia()
  .model({
    ApiResponse: ApiResponseSchema,
    Category: CategorySchema,
    Pet: PetSchema,
    Tag: TagSchema,
  })
  .put('/pet', ({ body }) => { throw new Error('Not implemented') }, {
    body: 'Pet',
    response: { 200: 'Pet', 400: t.Void(), 404: t.Void(), 422: t.Void(), default: t.Void() },
    detail: {
      tags: ['pet'],
      summary: 'Update an existing pet.',
      description: 'Update an existing pet by Id.',
      operationId: 'updatePet',
      security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
    },
  })
  .post('/pet', ({ body }) => { throw new Error('Not implemented') }, {
    body: 'Pet',
    response: { 200: 'Pet', 400: t.Void(), 422: t.Void(), default: t.Void() },
    detail: {
      tags: ['pet'],
      summary: 'Add a new pet to the store.',
      description: 'Add a new pet to the store.',
      operationId: 'addPet',
      security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
    },
  })
  .get('/pet/findByStatus', ({ query }) => { throw new Error('Not implemented') }, {
    query: PetModel.findPetsByStatusQuery,
    response: { 200: PetModel.findPetsByStatusResponse200, 400: t.Void(), default: t.Void() },
    detail: {
      tags: ['pet'],
      summary: 'Finds Pets by status.',
      description: 'Multiple status values can be provided with comma separated strings.',
      operationId: 'findPetsByStatus',
      security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
    },
  })
  .get('/pet/findByTags', ({ query }) => { throw new Error('Not implemented') }, {
    query: PetModel.findPetsByTagsQuery,
    response: { 200: PetModel.findPetsByTagsResponse200, 400: t.Void(), default: t.Void() },
    detail: {
      tags: ['pet'],
      summary: 'Finds Pets by tags.',
      description:
        'Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.',
      operationId: 'findPetsByTags',
      security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
    },
  })
  .get('/pet/:petId', ({ params }) => { throw new Error('Not implemented') }, {
    params: PetModel.getPetByIdParams,
    response: { 200: 'Pet', 400: t.Void(), 404: t.Void(), default: t.Void() },
    detail: {
      tags: ['pet'],
      summary: 'Find pet by ID.',
      description: 'Returns a single pet.',
      operationId: 'getPetById',
      security: [{ api_key: [] }, { petstore_auth: ['write:pets', 'read:pets'] }],
    },
  })
  .post('/pet/:petId', ({ params, query }) => { throw new Error('Not implemented') }, {
    params: PetModel.updatePetWithFormParams,
    query: PetModel.updatePetWithFormQuery,
    response: { 200: 'Pet', 400: t.Void(), default: t.Void() },
    detail: {
      tags: ['pet'],
      summary: 'Updates a pet in the store with form data.',
      description: 'Updates a pet resource based on the form data.',
      operationId: 'updatePetWithForm',
      security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
    },
  })
  .delete('/pet/:petId', ({ params, headers }) => { throw new Error('Not implemented') }, {
    params: PetModel.deletePetParams,
    headers: PetModel.deletePetHeaders,
    response: { 200: t.Void(), 400: t.Void(), default: t.Void() },
    detail: {
      tags: ['pet'],
      summary: 'Deletes a pet.',
      description: 'Delete a pet.',
      operationId: 'deletePet',
      security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
    },
  })
  .post('/pet/:petId/uploadImage', ({ params, query, body }) => { throw new Error('Not implemented') }, {
    params: PetModel.uploadFileParams,
    query: PetModel.uploadFileQuery,
    body: PetModel.uploadFileBody,
    response: { 200: 'ApiResponse', 400: t.Void(), 404: t.Void(), default: t.Void() },
    detail: {
      tags: ['pet'],
      summary: 'Uploads an image.',
      description: 'Upload image of the pet.',
      operationId: 'uploadFile',
      security: [{ petstore_auth: ['write:pets', 'read:pets'] }],
    },
  })
