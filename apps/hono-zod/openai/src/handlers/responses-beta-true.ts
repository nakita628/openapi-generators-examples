import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as z from 'zod'
import { BetaCreateResponseSchema } from '../components'

export const responsesBetaTrueHandler = new Hono().post(
  '/responses?beta=true',
  sValidator(
    'header',
    z.object({
      'openai-beta': z
        .preprocess(
          (val) => (val === undefined || Array.isArray(val) ? val : [val]),
          z.array(z.literal('responses_multi_agent=v1')),
        )
        .exactOptional(),
    }),
  ),
  sValidator('json', BetaCreateResponseSchema),
  (c) => { throw new Error('Not implemented') },
)
