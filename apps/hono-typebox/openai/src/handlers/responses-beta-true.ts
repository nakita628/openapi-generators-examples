import { Hono } from 'hono'
import { tbValidator } from '@hono/typebox-validator'
import { Type } from 'typebox'
import { BetaCreateResponseSchema } from '../components'

export const responsesBetaTrueHandler = new Hono().post(
  '/responses?beta=true',
  tbValidator(
    'header',
    Type.Object({
      'openai-beta': Type.Optional(Type.Array(Type.Literal('responses_multi_agent=v1'))),
    }),
  ),
  tbValidator('json', BetaCreateResponseSchema),
  (c) => { throw new Error('Not implemented') },
)
