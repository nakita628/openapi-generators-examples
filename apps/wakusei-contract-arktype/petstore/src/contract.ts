import { oc } from '@orpc/contract'
import { type } from 'arktype'
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
    .input(type({ status: type("'available' | 'pending' | 'sold'") }))
    .output(type(PetSchema).array()),
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
      type({
        tags: type('unknown')
          .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
          .to('string[]'),
      }),
    )
    .output(type(PetSchema).array()),
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
      type({
        petId: type('string')
          .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
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
    .output(type({ '[string]': 'number.integer >= -2147483648 & number.integer <= 2147483647' })),
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
      type({
        orderId: type('string')
          .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
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
      type({
        orderId: type('string')
          .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
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
    .input(type(UserSchema).array())
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
    .input(type({ 'username?': type('string'), 'password?': type('string') }))
    .output(type('string')),
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
    .input(type({ username: type('string') }))
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
      type({
        username: type('string'),
        'id?': type('bigint | number.integer')
          .or(/^-?\d+$/)
          .pipe((data) => BigInt(data))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          ),
        'firstName?': type('string'),
        'lastName?': type('string'),
        'email?': type('string'),
        'password?': type('string'),
        'phone?': type('string'),
        'userStatus?': type(
          'number.integer >= -2147483648 & number.integer <= 2147483647',
        ).describe('User Status'),
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
    .input(type({ username: type('string') })),
}
