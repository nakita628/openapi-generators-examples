import { os } from '@orpc/server'
import * as v from 'valibot'
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
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getPetFindByStatus = os
  .route({
    method: 'GET',
    path: '/pet/findByStatus',
    tags: ['pet'],
    summary: 'Finds Pets by status.',
    description: 'Multiple status values can be provided with comma separated strings.',
    successDescription: 'successful operation',
  })
  .input(
    v.object({ status: v.optional(v.picklist(['available', 'pending', 'sold']), 'available') }),
  )
  .output(v.array(PetSchema))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    v.object({
      tags: v.pipe(
        v.unknown(),
        v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
        v.array(v.string()),
      ),
    }),
  )
  .output(v.array(PetSchema))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    v.object({
      petId: v.pipe(
        v.string(),
        v.regex(/^-?\d+$/),
        v.transform((input) => BigInt(input)),
        v.minValue(-9223372036854775808n),
        v.maxValue(9223372036854775807n),
      ),
    }),
  )
  .output(PetSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    v.object({
      petId: v.pipe(
        v.string(),
        v.regex(/^-?\d+$/),
        v.transform((input) => BigInt(input)),
        v.minValue(-9223372036854775808n),
        v.maxValue(9223372036854775807n),
      ),
      name: v.optional(v.string()),
      status: v.optional(v.string()),
    }),
  )
  .output(PetSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    v.object({
      petId: v.pipe(
        v.string(),
        v.regex(/^-?\d+$/),
        v.transform((input) => BigInt(input)),
        v.minValue(-9223372036854775808n),
        v.maxValue(9223372036854775807n),
      ),
    }),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
    v.object({
      petId: v.pipe(
        v.string(),
        v.regex(/^-?\d+$/),
        v.transform((input) => BigInt(input)),
        v.minValue(-9223372036854775808n),
        v.maxValue(9223372036854775807n),
      ),
      additionalMetadata: v.optional(v.string()),
    }),
  )
  .output(ApiResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })
