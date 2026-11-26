import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as v from 'valibot'
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
  .post('/responses', sValidator('json', CreateResponseSchema), (c) => { throw new Error('Not implemented') })
  .get(
    '/responses/:response_id',
    sValidator(
      'param',
      v.object({
        response_id: v.pipe(
          v.string(),
          v.metadata({ examples: ['resp_677efb5139a88190b512bc3fef8e535d'] }),
        ),
      }),
    ),
    sValidator(
      'query',
      v.partial(
        v.object({
          include: v.pipe(
            v.unknown(),
            v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
            v.array(IncludeEnumSchema),
          ),
          stream: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          starting_after: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.metadata({ type: 'integer' }),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
          include_obfuscation: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/responses/:response_id',
    sValidator(
      'param',
      v.object({
        response_id: v.pipe(
          v.string(),
          v.metadata({ examples: ['resp_677efb5139a88190b512bc3fef8e535d'] }),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/responses/:response_id/cancel',
    sValidator(
      'param',
      v.object({
        response_id: v.pipe(
          v.string(),
          v.metadata({ examples: ['resp_677efb5139a88190b512bc3fef8e535d'] }),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/responses/:response_id/input_items',
    sValidator('param', v.object({ response_id: v.string() })),
    sValidator(
      'query',
      v.object({
        limit: v.pipe(
          v.optional(
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.metadata({ type: 'integer' }),
              v.transform((input) => Number(input)),
              v.number(),
              v.safeInteger(),
            ),
            '20',
          ),
          v.metadata({ default: 20 }),
        ),
        order: v.optional(v.picklist(['asc', 'desc'])),
        after: v.optional(v.string()),
        include: v.optional(
          v.pipe(
            v.unknown(),
            v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
            v.array(IncludeEnumSchema),
          ),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post('/responses/input_tokens', sValidator('json', TokenCountsBodySchema), (c) => { throw new Error('Not implemented') })
  .post('/responses/compact', sValidator('json', CompactResponseMethodPublicBodySchema), (c) => { throw new Error('Not implemented') })
  .get(
    '/responses/:response_id?beta=true',
    sValidator(
      'param',
      v.object({
        response_id: v.pipe(
          v.string(),
          v.metadata({ examples: ['resp_677efb5139a88190b512bc3fef8e535d'] }),
        ),
      }),
    ),
    sValidator(
      'query',
      v.partial(
        v.object({
          include: v.pipe(
            v.unknown(),
            v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
            v.array(BetaIncludeEnumSchema),
          ),
          stream: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
          starting_after: v.pipe(
            v.string(),
            v.regex(/^-?(?:0|[1-9]\d*)$/),
            v.metadata({ type: 'integer' }),
            v.transform((input) => Number(input)),
            v.number(),
            v.safeInteger(),
          ),
          include_obfuscation: v.pipe(
            v.string(),
            v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
          ),
        }),
      ),
    ),
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
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/responses/:response_id?beta=true',
    sValidator(
      'param',
      v.object({
        response_id: v.pipe(
          v.string(),
          v.metadata({ examples: ['resp_677efb5139a88190b512bc3fef8e535d'] }),
        ),
      }),
    ),
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
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/responses/:response_id/cancel?beta=true',
    sValidator(
      'param',
      v.object({
        response_id: v.pipe(
          v.string(),
          v.metadata({ examples: ['resp_677efb5139a88190b512bc3fef8e535d'] }),
        ),
      }),
    ),
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
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/responses/compact?beta=true',
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
    sValidator('json', BetaCompactResponseMethodPublicBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/responses/:response_id/input_items?beta=true',
    sValidator('param', v.object({ response_id: v.string() })),
    sValidator(
      'query',
      v.object({
        limit: v.pipe(
          v.optional(
            v.pipe(
              v.string(),
              v.regex(/^-?(?:0|[1-9]\d*)$/),
              v.metadata({ type: 'integer' }),
              v.transform((input) => Number(input)),
              v.number(),
              v.safeInteger(),
            ),
            '20',
          ),
          v.metadata({ default: 20 }),
        ),
        order: v.optional(v.picklist(['asc', 'desc'])),
        after: v.optional(v.string()),
        include: v.optional(
          v.pipe(
            v.unknown(),
            v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
            v.array(BetaIncludeEnumSchema),
          ),
        ),
      }),
    ),
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
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/responses/input_tokens?beta=true',
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
    sValidator('json', BetaTokenCountsBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
