import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as z from 'zod'
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
    sValidator(
      'param',
      z.object({
        response_id: z.string().meta({ examples: ['resp_677efb5139a88190b512bc3fef8e535d'] }),
      }),
    ),
    sValidator(
      'query',
      z.object({
        include: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(IncludeEnumSchema),
          )
          .exactOptional(),
        stream: z.stringbool().exactOptional(),
        starting_after: z.coerce.number().int().exactOptional(),
        include_obfuscation: z.stringbool().exactOptional(),
      }),
    ),
    (c) => {},
  )
  .delete(
    '/responses/:response_id',
    sValidator(
      'param',
      z.object({
        response_id: z.string().meta({ examples: ['resp_677efb5139a88190b512bc3fef8e535d'] }),
      }),
    ),
    (c) => {},
  )
  .post(
    '/responses/:response_id/cancel',
    sValidator(
      'param',
      z.object({
        response_id: z.string().meta({ examples: ['resp_677efb5139a88190b512bc3fef8e535d'] }),
      }),
    ),
    (c) => {},
  )
  .get(
    '/responses/:response_id/input_items',
    sValidator('param', z.object({ response_id: z.string() })),
    sValidator(
      'query',
      z.object({
        limit: z.coerce.number().int().default(20).exactOptional(),
        order: z.enum(['asc', 'desc']).exactOptional(),
        after: z.string().exactOptional(),
        include: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(IncludeEnumSchema),
          )
          .exactOptional(),
      }),
    ),
    (c) => {},
  )
  .post('/responses/input_tokens', sValidator('json', TokenCountsBodySchema), (c) => {})
  .post('/responses/compact', sValidator('json', CompactResponseMethodPublicBodySchema), (c) => {})
  .get(
    '/responses/:response_id?beta=true',
    sValidator(
      'param',
      z.object({
        response_id: z.string().meta({ examples: ['resp_677efb5139a88190b512bc3fef8e535d'] }),
      }),
    ),
    sValidator(
      'query',
      z.object({
        include: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(BetaIncludeEnumSchema),
          )
          .exactOptional(),
        stream: z.stringbool().exactOptional(),
        starting_after: z.coerce.number().int().exactOptional(),
        include_obfuscation: z.stringbool().exactOptional(),
      }),
    ),
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
    (c) => {},
  )
  .delete(
    '/responses/:response_id?beta=true',
    sValidator(
      'param',
      z.object({
        response_id: z.string().meta({ examples: ['resp_677efb5139a88190b512bc3fef8e535d'] }),
      }),
    ),
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
    (c) => {},
  )
  .post(
    '/responses/:response_id/cancel?beta=true',
    sValidator(
      'param',
      z.object({
        response_id: z.string().meta({ examples: ['resp_677efb5139a88190b512bc3fef8e535d'] }),
      }),
    ),
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
    (c) => {},
  )
  .post(
    '/responses/compact?beta=true',
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
    sValidator('json', BetaCompactResponseMethodPublicBodySchema),
    (c) => {},
  )
  .get(
    '/responses/:response_id/input_items?beta=true',
    sValidator('param', z.object({ response_id: z.string() })),
    sValidator(
      'query',
      z.object({
        limit: z.coerce.number().int().default(20).exactOptional(),
        order: z.enum(['asc', 'desc']).exactOptional(),
        after: z.string().exactOptional(),
        include: z
          .preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z.array(BetaIncludeEnumSchema),
          )
          .exactOptional(),
      }),
    ),
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
    (c) => {},
  )
  .post(
    '/responses/input_tokens?beta=true',
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
    sValidator('json', BetaTokenCountsBodySchema),
    (c) => {},
  )
