import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as v from 'valibot'
import { UserSchema } from '../components'

export const userHandler = new Hono()
  .post(
    '/user',
    sValidator('json', UserSchema),
    sValidator(
      'form',
      v.partial(
        v.object({
          id: v.pipe(
            v.pipe(
              v.string(),
              v.regex(/^-?\d+$/),
              v.transform((input) => BigInt(input)),
              v.minValue(-9223372036854775808n),
              v.maxValue(9223372036854775807n),
            ),
            v.metadata({ examples: [10] }),
          ),
          username: v.pipe(v.string(), v.metadata({ examples: ['theUser'] })),
          firstName: v.pipe(v.string(), v.metadata({ examples: ['John'] })),
          lastName: v.pipe(v.string(), v.metadata({ examples: ['James'] })),
          email: v.pipe(v.string(), v.metadata({ examples: ['john@email.com'] })),
          password: v.pipe(v.string(), v.metadata({ examples: ['12345'] })),
          phone: v.pipe(v.string(), v.metadata({ examples: ['12345'] })),
          userStatus: v.pipe(
            v.pipe(
              v.string(),
              v.transform(Number),
              v.number(),
              v.safeInteger(),
              v.minValue(-2147483648),
              v.maxValue(2147483647),
            ),
            v.description('User Status'),
            v.metadata({ examples: [1] }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post('/user/createWithList', sValidator('json', v.array(UserSchema)), (c) => { throw new Error('Not implemented') })
  .get(
    '/user/login',
    sValidator('query', v.partial(v.object({ username: v.string(), password: v.string() }))),
    (c) => { throw new Error('Not implemented') },
  )
  .get('/user/logout', (c) => { throw new Error('Not implemented') })
  .get('/user/:username', sValidator('param', v.object({ username: v.string() })), (c) => { throw new Error('Not implemented') })
  .put(
    '/user/:username',
    sValidator('param', v.object({ username: v.string() })),
    sValidator('json', UserSchema),
    sValidator(
      'form',
      v.partial(
        v.object({
          id: v.pipe(
            v.pipe(
              v.string(),
              v.regex(/^-?\d+$/),
              v.transform((input) => BigInt(input)),
              v.minValue(-9223372036854775808n),
              v.maxValue(9223372036854775807n),
            ),
            v.metadata({ examples: [10] }),
          ),
          username: v.pipe(v.string(), v.metadata({ examples: ['theUser'] })),
          firstName: v.pipe(v.string(), v.metadata({ examples: ['John'] })),
          lastName: v.pipe(v.string(), v.metadata({ examples: ['James'] })),
          email: v.pipe(v.string(), v.metadata({ examples: ['john@email.com'] })),
          password: v.pipe(v.string(), v.metadata({ examples: ['12345'] })),
          phone: v.pipe(v.string(), v.metadata({ examples: ['12345'] })),
          userStatus: v.pipe(
            v.pipe(
              v.string(),
              v.transform(Number),
              v.number(),
              v.safeInteger(),
              v.minValue(-2147483648),
              v.maxValue(2147483647),
            ),
            v.description('User Status'),
            v.metadata({ examples: [1] }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete('/user/:username', sValidator('param', v.object({ username: v.string() })), (c) => { throw new Error('Not implemented') })
