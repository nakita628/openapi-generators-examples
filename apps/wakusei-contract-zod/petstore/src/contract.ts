import { oc } from '@orpc/contract'
import * as z from 'zod'
import { ApiResponseSchema, OrderSchema, PetSchema, UserSchema } from './components'

export const contract = {
  postPet: oc
    .route({
      method: 'POST',
      path: '/pet',
      tags: ['pet'],
      summary: 'Add a new pet to the store.',
      description: 'Add a new pet to the store.',
      successDescription: 'Successful operation',
    })
    .input(PetSchema)
    .output(PetSchema),
  putPet: oc
    .route({
      method: 'PUT',
      path: '/pet',
      tags: ['pet'],
      summary: 'Update an existing pet.',
      description: 'Update an existing pet by Id.',
      successDescription: 'Successful operation',
    })
    .input(PetSchema)
    .output(PetSchema),
  getPetFindByStatus: oc
    .route({
      method: 'GET',
      path: '/pet/findByStatus',
      tags: ['pet'],
      summary: 'Finds Pets by status.',
      description: 'Multiple status values can be provided with comma separated strings.',
      successDescription: 'successful operation',
    })
    .input(z.object({ status: z.enum(['available', 'pending', 'sold']).default('available') }))
    .output(z.array(PetSchema)),
  getPetFindByTags: oc
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
      z.object({
        tags: z.preprocess(
          (val) => (val === undefined || Array.isArray(val) ? val : [val]),
          z.array(z.string()),
        ),
      }),
    )
    .output(z.array(PetSchema)),
  getPetPetId: oc
    .route({
      method: 'GET',
      path: '/pet/{petId}',
      tags: ['pet'],
      summary: 'Find pet by ID.',
      description: 'Returns a single pet.',
      successDescription: 'successful operation',
    })
    .input(z.object({ petId: z.coerce.bigint().pipe(z.int64()) }))
    .output(PetSchema),
  postPetPetId: oc
    .route({
      method: 'POST',
      path: '/pet/{petId}',
      tags: ['pet'],
      summary: 'Updates a pet in the store with form data.',
      description: 'Updates a pet resource based on the form data.',
      successDescription: 'successful operation',
    })
    .input(
      z.object({
        petId: z.coerce.bigint().pipe(z.int64()),
        name: z.string().exactOptional(),
        status: z.string().exactOptional(),
      }),
    )
    .output(PetSchema),
  deletePetPetId: oc
    .route({
      method: 'DELETE',
      path: '/pet/{petId}',
      tags: ['pet'],
      summary: 'Deletes a pet.',
      description: 'Delete a pet.',
      successDescription: 'Pet deleted',
    })
    .input(z.object({ petId: z.coerce.bigint().pipe(z.int64()) })),
  postPetPetIdUploadImage: oc
    .route({
      method: 'POST',
      path: '/pet/{petId}/uploadImage',
      tags: ['pet'],
      summary: 'Uploads an image.',
      description: 'Upload image of the pet.',
      successDescription: 'successful operation',
    })
    .input(
      z.object({
        petId: z.coerce.bigint().pipe(z.int64()),
        additionalMetadata: z.string().exactOptional(),
      }),
    )
    .output(ApiResponseSchema),
  getStoreInventory: oc
    .route({
      method: 'GET',
      path: '/store/inventory',
      tags: ['store'],
      summary: 'Returns pet inventories by status.',
      description: 'Returns a map of status codes to quantities.',
      successDescription: 'successful operation',
    })
    .output(z.record(z.string(), z.int32())),
  postStoreOrder: oc
    .route({
      method: 'POST',
      path: '/store/order',
      tags: ['store'],
      summary: 'Place an order for a pet.',
      description: 'Place a new order in the store.',
      successDescription: 'successful operation',
    })
    .input(OrderSchema)
    .output(OrderSchema),
  getStoreOrderOrderId: oc
    .route({
      method: 'GET',
      path: '/store/order/{orderId}',
      tags: ['store'],
      summary: 'Find purchase order by ID.',
      description:
        'For valid response try integer IDs with value <= 5 or > 10. Other values will generate exceptions.',
      successDescription: 'successful operation',
    })
    .input(z.object({ orderId: z.coerce.bigint().pipe(z.int64()) }))
    .output(OrderSchema),
  deleteStoreOrderOrderId: oc
    .route({
      method: 'DELETE',
      path: '/store/order/{orderId}',
      tags: ['store'],
      summary: 'Delete purchase order by identifier.',
      description:
        'For valid response try integer IDs with value < 1000. Anything above 1000 or non-integers will generate API errors.',
      successDescription: 'order deleted',
    })
    .input(z.object({ orderId: z.coerce.bigint().pipe(z.int64()) })),
  postUser: oc
    .route({
      method: 'POST',
      path: '/user',
      tags: ['user'],
      summary: 'Create user.',
      description: 'This can only be done by the logged in user.',
      successDescription: 'successful operation',
    })
    .input(UserSchema)
    .output(UserSchema),
  postUserCreateWithList: oc
    .route({
      method: 'POST',
      path: '/user/createWithList',
      tags: ['user'],
      summary: 'Creates list of users with given input array.',
      description: 'Creates list of users with given input array.',
      successDescription: 'Successful operation',
    })
    .input(z.array(UserSchema))
    .output(UserSchema),
  getUserLogin: oc
    .route({
      method: 'GET',
      path: '/user/login',
      tags: ['user'],
      summary: 'Logs user into the system.',
      description: 'Log into the system.',
      successDescription: 'successful operation',
    })
    .input(z.object({ username: z.string().exactOptional(), password: z.string().exactOptional() }))
    .output(z.string()),
  getUserLogout: oc.route({
    method: 'GET',
    path: '/user/logout',
    tags: ['user'],
    summary: 'Logs out current logged in user session.',
    description: 'Log user out of the system.',
    successDescription: 'successful operation',
  }),
  getUserUsername: oc
    .route({
      method: 'GET',
      path: '/user/{username}',
      tags: ['user'],
      summary: 'Get user by user name.',
      description: 'Get user detail based on username.',
      successDescription: 'successful operation',
    })
    .input(z.object({ username: z.string() }))
    .output(UserSchema),
  putUserUsername: oc
    .route({
      method: 'PUT',
      path: '/user/{username}',
      tags: ['user'],
      summary: 'Update user resource.',
      description: 'This can only be done by the logged in user.',
      successDescription: 'successful operation',
    })
    .input(
      z.object({
        username: z.string(),
        id: z
          .union([z.bigint(), z.number().int(), z.string().regex(/^-?\d+$/)])
          .transform((val) => BigInt(val))
          .pipe(z.int64())
          .meta({ examples: [10] })
          .exactOptional(),
        firstName: z
          .string()
          .meta({ examples: ['John'] })
          .exactOptional(),
        lastName: z
          .string()
          .meta({ examples: ['James'] })
          .exactOptional(),
        email: z
          .string()
          .meta({ examples: ['john@email.com'] })
          .exactOptional(),
        password: z
          .string()
          .meta({ examples: ['12345'] })
          .exactOptional(),
        phone: z
          .string()
          .meta({ examples: ['12345'] })
          .exactOptional(),
        userStatus: z
          .int32()
          .meta({ description: 'User Status', examples: [1] })
          .exactOptional(),
      }),
    ),
  deleteUserUsername: oc
    .route({
      method: 'DELETE',
      path: '/user/{username}',
      tags: ['user'],
      summary: 'Delete user resource.',
      description: 'This can only be done by the logged in user.',
      successDescription: 'User deleted',
    })
    .input(z.object({ username: z.string() })),
}
