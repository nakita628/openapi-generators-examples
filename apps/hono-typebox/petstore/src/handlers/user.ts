import { Hono } from 'hono'
import { tbValidator } from '@hono/typebox-validator'
import { Type, Codec } from 'typebox'
import { UserSchema } from '../components'

export const userHandler = new Hono()
  .post(
    '/user',
    tbValidator('json', UserSchema),
    tbValidator(
      'form',
      Type.Object({
        id: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        username: Type.Optional(Type.String({ examples: ['theUser'] })),
        firstName: Type.Optional(Type.String({ examples: ['John'] })),
        lastName: Type.Optional(Type.String({ examples: ['James'] })),
        email: Type.Optional(Type.String({ examples: ['john@email.com'] })),
        password: Type.Optional(Type.String({ examples: ['12345'] })),
        phone: Type.Optional(Type.String({ examples: ['12345'] })),
        userStatus: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post('/user/createWithList', tbValidator('json', Type.Array(UserSchema)), (c) => { throw new Error('Not implemented') })
  .get(
    '/user/login',
    tbValidator(
      'query',
      Type.Object({
        username: Type.Optional(Type.String()),
        password: Type.Optional(Type.String()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get('/user/logout', (c) => { throw new Error('Not implemented') })
  .get('/user/:username', tbValidator('param', Type.Object({ username: Type.String() })), (c) => { throw new Error('Not implemented') })
  .put(
    '/user/:username',
    tbValidator('param', Type.Object({ username: Type.String() })),
    tbValidator('json', UserSchema),
    tbValidator(
      'form',
      Type.Object({
        id: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        username: Type.Optional(Type.String({ examples: ['theUser'] })),
        firstName: Type.Optional(Type.String({ examples: ['John'] })),
        lastName: Type.Optional(Type.String({ examples: ['James'] })),
        email: Type.Optional(Type.String({ examples: ['john@email.com'] })),
        password: Type.Optional(Type.String({ examples: ['12345'] })),
        phone: Type.Optional(Type.String({ examples: ['12345'] })),
        userStatus: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/user/:username',
    tbValidator('param', Type.Object({ username: Type.String() })),
    (c) => { throw new Error('Not implemented') },
  )
