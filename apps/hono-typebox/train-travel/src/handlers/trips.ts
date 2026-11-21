import { Hono } from 'hono'
import { tbValidator } from '@hono/typebox-validator'
import { Type, Codec } from 'typebox'

export const tripsHandler = new Hono().get(
  '/trips',
  tbValidator(
    'query',
    Type.Object({
      origin: Type.String({ format: 'uuid' }),
      destination: Type.String({ format: 'uuid' }),
      date: Type.String({ format: 'date-time' }),
      bicycles: Type.Optional(
        Codec(Type.Union([Type.Literal('true'), Type.Literal('false')], { default: 'false' }))
          .Decode((value) => value === 'true')
          .Encode((value) => (value ? 'true' : 'false')),
      ),
      dogs: Type.Optional(
        Codec(Type.Union([Type.Literal('true'), Type.Literal('false')], { default: 'false' }))
          .Decode((value) => value === 'true')
          .Encode((value) => (value ? 'true' : 'false')),
      ),
    }),
  ),
  (c) => { throw new Error('Not implemented') },
)
