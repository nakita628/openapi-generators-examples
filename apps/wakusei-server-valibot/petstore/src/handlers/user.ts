import { os } from '@orpc/server'
import * as v from 'valibot'
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
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postUserCreateWithList = os
  .route({
    method: 'POST',
    path: '/user/createWithList',
    tags: ['user'],
    summary: 'Creates list of users with given input array.',
    description: 'Creates list of users with given input array.',
    successDescription: 'Successful operation',
  })
  .input(v.array(UserSchema))
  .output(UserSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getUserLogin = os
  .route({
    method: 'GET',
    path: '/user/login',
    tags: ['user'],
    summary: 'Logs user into the system.',
    description: 'Log into the system.',
    successDescription: 'successful operation',
  })
  .input(v.object({ username: v.optional(v.string()), password: v.optional(v.string()) }))
  .output(v.string())
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getUserLogout = os
  .route({
    method: 'GET',
    path: '/user/logout',
    tags: ['user'],
    summary: 'Logs out current logged in user session.',
    description: 'Log user out of the system.',
    successDescription: 'successful operation',
  })
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getUserUsername = os
  .route({
    method: 'GET',
    path: '/user/{username}',
    tags: ['user'],
    summary: 'Get user by user name.',
    description: 'Get user detail based on username.',
    successDescription: 'successful operation',
  })
  .input(v.object({ username: v.string() }))
  .output(UserSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

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
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteUserUsername = os
  .route({
    method: 'DELETE',
    path: '/user/{username}',
    tags: ['user'],
    summary: 'Delete user resource.',
    description: 'This can only be done by the logged in user.',
    successDescription: 'User deleted',
  })
  .input(v.object({ username: v.string() }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })
