import { oc } from '@orpc/contract'
import * as v from 'valibot'
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
    .input(
      v.object({ status: v.optional(v.picklist(['available', 'pending', 'sold']), 'available') }),
    )
    .output(v.array(PetSchema)),
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
      v.object({
        tags: v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.string()),
        ),
      }),
    )
    .output(v.array(PetSchema)),
  getPetPetId: oc
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
    ),
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
    .output(
      v.record(
        v.string(),
        v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
      ),
    ),
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
    .input(
      v.object({
        orderId: v.pipe(
          v.string(),
          v.regex(/^-?\d+$/),
          v.transform((input) => BigInt(input)),
          v.minValue(-9223372036854775808n),
          v.maxValue(9223372036854775807n),
        ),
      }),
    )
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
    .input(
      v.object({
        orderId: v.pipe(
          v.string(),
          v.regex(/^-?\d+$/),
          v.transform((input) => BigInt(input)),
          v.minValue(-9223372036854775808n),
          v.maxValue(9223372036854775807n),
        ),
      }),
    ),
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
    .input(v.array(UserSchema))
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
    .input(v.object({ username: v.optional(v.string()), password: v.optional(v.string()) }))
    .output(v.string()),
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
    .input(v.object({ username: v.string() }))
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
      v.object({
        username: v.string(),
        id: v.optional(
          v.pipe(
            v.pipe(
              v.union([
                v.bigint(),
                v.pipe(v.number(), v.integer()),
                v.pipe(v.string(), v.regex(/^-?\d+$/)),
              ]),
              v.transform((input) => BigInt(input)),
              v.minValue(-9223372036854775808n),
              v.maxValue(9223372036854775807n),
            ),
            v.metadata({ examples: [10] }),
          ),
        ),
        firstName: v.optional(v.pipe(v.string(), v.metadata({ examples: ['John'] }))),
        lastName: v.optional(v.pipe(v.string(), v.metadata({ examples: ['James'] }))),
        email: v.optional(v.pipe(v.string(), v.metadata({ examples: ['john@email.com'] }))),
        password: v.optional(v.pipe(v.string(), v.metadata({ examples: ['12345'] }))),
        phone: v.optional(v.pipe(v.string(), v.metadata({ examples: ['12345'] }))),
        userStatus: v.optional(
          v.pipe(
            v.pipe(v.number(), v.integer(), v.minValue(-2147483648), v.maxValue(2147483647)),
            v.description('User Status'),
            v.metadata({ examples: [1] }),
          ),
        ),
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
    .input(v.object({ username: v.string() })),
}
