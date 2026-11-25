import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as v from 'valibot'
import { BetaCreateResponseSchema } from '../components'

export const responsesBetaTrueHandler = new Hono().post(
  '/responses?beta=true',
  sValidator(
    'header',
    v.partial(
      v.object({
        'openai-beta': v.pipe(
          v.unknown(),
          v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
          v.array(v.literal('responses_multi_agent=v1')),
        ),
      }),
    ),
  ),
  sValidator('json', BetaCreateResponseSchema),
  (c) => { throw new Error('Not implemented') },
)
