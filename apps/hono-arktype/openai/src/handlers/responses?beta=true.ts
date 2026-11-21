import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { type } from 'arktype'
import { BetaCreateResponseSchema } from '../components'

export const responsesBetaTrueHandler = new Hono().post(
  '/responses?beta=true',
  sValidator(
    'header',
    type({
      'openai-beta?': type('unknown')
        .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
        .to("'responses_multi_agent=v1'[]"),
    }),
  ),
  sValidator('json', BetaCreateResponseSchema),
  (c) => {},
)
