import { os } from '@orpc/server'
import { type } from 'arktype'
import { UserSchema } from '../components'

export const postUser = os
  .route({
    method: 'POST',
    path: '/user',
    tags: ['user'],
    summary: 'Create user.',
    description: 'This can only be done by the logged in user.',
    successDescription: 'successful operation',
  })
  .input(UserSchema)
  .output(UserSchema)
  .handler(async ({ input }) => {})

export const postUserCreateWithList = os
  .route({
    method: 'POST',
    path: '/user/createWithList',
    tags: ['user'],
    summary: 'Creates list of users with given input array.',
    description: 'Creates list of users with given input array.',
    successDescription: 'Successful operation',
  })
  .input(type(UserSchema).array())
  .output(UserSchema)
  .handler(async ({ input }) => {})

export const getUserLogin = os
  .route({
    method: 'GET',
    path: '/user/login',
    tags: ['user'],
    summary: 'Logs user into the system.',
    description: 'Log into the system.',
    successDescription: 'successful operation',
  })
  .input(type({ 'username?': type('string'), 'password?': type('string') }))
  .output(type('string'))
  .handler(async ({ input }) => {})

export const getUserLogout = os
  .route({
    method: 'GET',
    path: '/user/logout',
    tags: ['user'],
    summary: 'Logs out current logged in user session.',
    description: 'Log user out of the system.',
    successDescription: 'successful operation',
  })
  .handler(async ({ input }) => {})

export const getUserUsername = os
  .route({
    method: 'GET',
    path: '/user/{username}',
    tags: ['user'],
    summary: 'Get user by user name.',
    description: 'Get user detail based on username.',
    successDescription: 'successful operation',
  })
  .input(type({ username: type('string') }))
  .output(UserSchema)
  .handler(async ({ input }) => {})

export const putUserUsername = os
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
      'userStatus?': type('number.integer >= -2147483648 & number.integer <= 2147483647').describe(
        'User Status',
      ),
    }),
  )
  .handler(async ({ input }) => {})

export const deleteUserUsername = os
  .route({
    method: 'DELETE',
    path: '/user/{username}',
    tags: ['user'],
    summary: 'Delete user resource.',
    description: 'This can only be done by the logged in user.',
    successDescription: 'User deleted',
  })
  .input(type({ username: type('string') }))
  .handler(async ({ input }) => {})
