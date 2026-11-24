import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { type } from 'arktype'
import { UserSchema } from '../components'

export const userHandler = new Hono()
  .post(
    '/user',
    sValidator('json', UserSchema),
    sValidator(
      'form',
      type({
        'id?': type('string')
          .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          ),
        'username?': 'string',
        'firstName?': 'string',
        'lastName?': 'string',
        'email?': 'string',
        'password?': 'string',
        'phone?': 'string',
        'userStatus?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= -2147483648 & number.integer <= 2147483647')
          .describe('User Status'),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post('/user/createWithList', sValidator('json', type(UserSchema).array()), (c) => { throw new Error('Not implemented') })
  .get(
    '/user/login',
    sValidator('query', type({ 'username?': 'string', 'password?': 'string' })),
    (c) => { throw new Error('Not implemented') },
  )
  .get('/user/logout', (c) => { throw new Error('Not implemented') })
  .get('/user/:username', sValidator('param', type({ username: 'string' })), (c) => { throw new Error('Not implemented') })
  .put(
    '/user/:username',
    sValidator('param', type({ username: 'string' })),
    sValidator('json', UserSchema),
    sValidator(
      'form',
      type({
        'id?': type('string')
          .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
          .narrow(
            (data, ctx) =>
              (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
              ctx.mustBe('an int64'),
          ),
        'username?': 'string',
        'firstName?': 'string',
        'lastName?': 'string',
        'email?': 'string',
        'password?': 'string',
        'phone?': 'string',
        'userStatus?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= -2147483648 & number.integer <= 2147483647')
          .describe('User Status'),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete('/user/:username', sValidator('param', type({ username: 'string' })), (c) => { throw new Error('Not implemented') })
