import { os } from '@orpc/server'
import * as z from 'zod'
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
  .input(z.array(UserSchema))
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
  .input(z.object({ username: z.string().exactOptional(), password: z.string().exactOptional() }))
  .output(z.string())
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
  .input(z.object({ username: z.string() }))
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
  .input(z.object({ username: z.string() }))
  .handler(async ({ input }) => {})
