import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { type } from 'arktype'
import {
  CreateResponseSchema,
  IncludeEnumSchema,
  TokenCountsBodySchema,
  CompactResponseMethodPublicBodySchema,
  BetaTokenCountsBodySchema,
  BetaCompactResponseMethodPublicBodySchema,
  BetaIncludeEnumSchema,
} from '../components'

export const responsesHandler = new Hono()
  .post('/responses', sValidator('json', CreateResponseSchema), (c) => {})
  .get(
    '/responses/:response_id',
    sValidator('param', type({ response_id: 'string' })),
    sValidator(
      'query',
      type({
        'include?': type('unknown').pipe(
          (data) => (data === undefined || Array.isArray(data) ? data : [data]),
          type(IncludeEnumSchema).array(),
        ),
        'stream?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe((data) =>
          /^(?:true|1|yes|on|y|enabled)$/i.test(data),
        ),
        'starting_after?': type('string').pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
        'include_obfuscation?': type(
          /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
        ).pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data)),
      }),
    ),
    (c) => {},
  )
  .delete(
    '/responses/:response_id',
    sValidator('param', type({ response_id: 'string' })),
    (c) => {},
  )
  .post(
    '/responses/:response_id/cancel',
    sValidator('param', type({ response_id: 'string' })),
    (c) => {},
  )
  .get(
    '/responses/:response_id/input_items',
    sValidator('param', type({ response_id: 'string' })),
    sValidator(
      'query',
      type({
        'limit?': type('string').pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
        'order?': "'asc' | 'desc'",
        'after?': 'string',
        'include?': type('unknown').pipe(
          (data) => (data === undefined || Array.isArray(data) ? data : [data]),
          type(IncludeEnumSchema).array(),
        ),
      }),
    ),
    (c) => {},
  )
  .post('/responses/input_tokens', sValidator('json', TokenCountsBodySchema), (c) => {})
  .post('/responses/compact', sValidator('json', CompactResponseMethodPublicBodySchema), (c) => {})
  .get(
    '/responses/:response_id?beta=true',
    sValidator('param', type({ response_id: 'string' })),
    sValidator(
      'query',
      type({
        'include?': type('unknown').pipe(
          (data) => (data === undefined || Array.isArray(data) ? data : [data]),
          type(BetaIncludeEnumSchema).array(),
        ),
        'stream?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe((data) =>
          /^(?:true|1|yes|on|y|enabled)$/i.test(data),
        ),
        'starting_after?': type('string').pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
        'include_obfuscation?': type(
          /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i,
        ).pipe((data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data)),
      }),
    ),
    sValidator(
      'header',
      type({
        'openai-beta?': type('unknown')
          .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
          .to("'responses_multi_agent=v1'[]"),
      }),
    ),
    (c) => {},
  )
  .delete(
    '/responses/:response_id?beta=true',
    sValidator('param', type({ response_id: 'string' })),
    sValidator(
      'header',
      type({
        'openai-beta?': type('unknown')
          .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
          .to("'responses_multi_agent=v1'[]"),
      }),
    ),
    (c) => {},
  )
  .post(
    '/responses/:response_id/cancel?beta=true',
    sValidator('param', type({ response_id: 'string' })),
    sValidator(
      'header',
      type({
        'openai-beta?': type('unknown')
          .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
          .to("'responses_multi_agent=v1'[]"),
      }),
    ),
    (c) => {},
  )
  .post(
    '/responses/compact?beta=true',
    sValidator(
      'header',
      type({
        'openai-beta?': type('unknown')
          .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
          .to("'responses_multi_agent=v1'[]"),
      }),
    ),
    sValidator('json', BetaCompactResponseMethodPublicBodySchema),
    (c) => {},
  )
  .get(
    '/responses/:response_id/input_items?beta=true',
    sValidator('param', type({ response_id: 'string' })),
    sValidator(
      'query',
      type({
        'limit?': type('string').pipe((data, ctx) => {
          const value = Number(data)
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
        'order?': "'asc' | 'desc'",
        'after?': 'string',
        'include?': type('unknown').pipe(
          (data) => (data === undefined || Array.isArray(data) ? data : [data]),
          type(BetaIncludeEnumSchema).array(),
        ),
      }),
    ),
    sValidator(
      'header',
      type({
        'openai-beta?': type('unknown')
          .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
          .to("'responses_multi_agent=v1'[]"),
      }),
    ),
    (c) => {},
  )
  .post(
    '/responses/input_tokens?beta=true',
    sValidator(
      'header',
      type({
        'openai-beta?': type('unknown')
          .pipe((data) => (data === undefined || Array.isArray(data) ? data : [data]))
          .to("'responses_multi_agent=v1'[]"),
      }),
    ),
    sValidator('json', BetaTokenCountsBodySchema),
    (c) => {},
  )
