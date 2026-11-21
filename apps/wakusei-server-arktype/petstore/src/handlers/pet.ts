import { os } from '@orpc/server'
import { type } from 'arktype'
import { ApiResponseSchema, PetSchema } from '../components'

export const postPet = os
  .route({
    method: 'POST',
    path: '/pet',
    tags: ['pet'],
    summary: 'Add a new pet to the store.',
    description: 'Add a new pet to the store.',
    successDescription: 'Successful operation',
  })
  .input(PetSchema)
  .output(PetSchema)
  .handler(async ({ input }) => {})

export const putPet = os
  .route({
    method: 'PUT',
    path: '/pet',
    tags: ['pet'],
    summary: 'Update an existing pet.',
    description: 'Update an existing pet by Id.',
    successDescription: 'Successful operation',
  })
  .input(PetSchema)
  .output(PetSchema)
  .handler(async ({ input }) => {})

export const getPetFindByStatus = os
  .route({
    method: 'GET',
    path: '/pet/findByStatus',
    tags: ['pet'],
    summary: 'Finds Pets by status.',
    description: 'Multiple status values can be provided with comma separated strings.',
    successDescription: 'successful operation',
  })
  .input(type({ status: type("'available' | 'pending' | 'sold'") }))
  .output(type(PetSchema).array())
  .handler(async ({ input }) => {})

export const getPetFindByTags = os
  .route({
    method: 'GET',
    path: '/pet/findByTags',
    tags: ['pet'],
    summary: 'Finds Pets by tags.',
    description:
      'Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.',
    successDescription: 'successful operation',
  })
  .input(
    type({
      tags: type('unknown')
        .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
        .to('string[]'),
    }),
  )
  .output(type(PetSchema).array())
  .handler(async ({ input }) => {})

export const getPetPetId = os
  .route({
    method: 'GET',
    path: '/pet/{petId}',
    tags: ['pet'],
    summary: 'Find pet by ID.',
    description: 'Returns a single pet.',
    successDescription: 'successful operation',
  })
  .input(
    type({
      petId: type('string')
        .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
        .narrow(
          (data, ctx) =>
            (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
            ctx.mustBe('an int64'),
        ),
    }),
  )
  .output(PetSchema)
  .handler(async ({ input }) => {})

export const postPetPetId = os
  .route({
    method: 'POST',
    path: '/pet/{petId}',
    tags: ['pet'],
    summary: 'Updates a pet in the store with form data.',
    description: 'Updates a pet resource based on the form data.',
    successDescription: 'successful operation',
  })
  .input(
    type({
      petId: type('string')
        .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
        .narrow(
          (data, ctx) =>
            (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
            ctx.mustBe('an int64'),
        ),
      'name?': type('string'),
      'status?': type('string'),
    }),
  )
  .output(PetSchema)
  .handler(async ({ input }) => {})

export const deletePetPetId = os
  .route({
    method: 'DELETE',
    path: '/pet/{petId}',
    tags: ['pet'],
    summary: 'Deletes a pet.',
    description: 'Delete a pet.',
    successDescription: 'Pet deleted',
  })
  .input(
    type({
      petId: type('string')
        .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
        .narrow(
          (data, ctx) =>
            (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
            ctx.mustBe('an int64'),
        ),
    }),
  )
  .handler(async ({ input }) => {})

export const postPetPetIdUploadImage = os
  .route({
    method: 'POST',
    path: '/pet/{petId}/uploadImage',
    tags: ['pet'],
    summary: 'Uploads an image.',
    description: 'Upload image of the pet.',
    successDescription: 'successful operation',
  })
  .input(
    type({
      petId: type('string')
        .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
        .narrow(
          (data, ctx) =>
            (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
            ctx.mustBe('an int64'),
        ),
      'additionalMetadata?': type('string'),
    }),
  )
  .output(ApiResponseSchema)
  .handler(async ({ input }) => {})
