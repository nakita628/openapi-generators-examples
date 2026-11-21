import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as z from 'zod'
import { UserSchema } from '../components'

export const userHandler = new Hono()
  .post(
    '/user',
    sValidator('json', UserSchema),
    sValidator(
      'form',
      z.object({
        id: z.coerce
          .bigint()
          .pipe(z.int64())
          .meta({ examples: [10] })
          .exactOptional(),
        username: z
          .string()
          .meta({ examples: ['theUser'] })
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
        userStatus: z.coerce
          .number()
          .pipe(z.int32())
          .meta({ description: 'User Status', examples: [1] })
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post('/user/createWithList', sValidator('json', z.array(UserSchema)), (c) => { throw new Error('Not implemented') })
  .get(
    '/user/login',
    sValidator(
      'query',
      z.object({ username: z.string().exactOptional(), password: z.string().exactOptional() }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get('/user/logout', (c) => { throw new Error('Not implemented') })
  .get('/user/:username', sValidator('param', z.object({ username: z.string() })), (c) => { throw new Error('Not implemented') })
  .put(
    '/user/:username',
    sValidator('param', z.object({ username: z.string() })),
    sValidator('json', UserSchema),
    sValidator(
      'form',
      z.object({
        id: z.coerce
          .bigint()
          .pipe(z.int64())
          .meta({ examples: [10] })
          .exactOptional(),
        username: z
          .string()
          .meta({ examples: ['theUser'] })
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
        userStatus: z.coerce
          .number()
          .pipe(z.int32())
          .meta({ description: 'User Status', examples: [1] })
          .exactOptional(),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete('/user/:username', sValidator('param', z.object({ username: z.string() })), (c) => { throw new Error('Not implemented') })
