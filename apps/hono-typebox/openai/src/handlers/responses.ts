import { Hono } from 'hono'
import { tbValidator } from '@hono/typebox-validator'
import { Type, Codec } from 'typebox'
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
  .post('/responses', tbValidator('json', CreateResponseSchema), (c) => { throw new Error('Not implemented') })
  .get(
    '/responses/:response_id',
    tbValidator(
      'param',
      Type.Object({
        response_id: Type.String({ examples: ['resp_677efb5139a88190b512bc3fef8e535d'] }),
      }),
    ),
    tbValidator(
      'query',
      Type.Object({
        include: Type.Optional(Type.Array(IncludeEnumSchema)),
        stream: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        starting_after: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        include_obfuscation: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/responses/:response_id',
    tbValidator(
      'param',
      Type.Object({
        response_id: Type.String({ examples: ['resp_677efb5139a88190b512bc3fef8e535d'] }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/responses/:response_id/cancel',
    tbValidator(
      'param',
      Type.Object({
        response_id: Type.String({ examples: ['resp_677efb5139a88190b512bc3fef8e535d'] }),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/responses/:response_id/input_items',
    tbValidator('param', Type.Object({ response_id: Type.String() })),
    tbValidator(
      'query',
      Type.Object({
        limit: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '20' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        order: Type.Optional(Type.Union([Type.Literal('asc'), Type.Literal('desc')])),
        after: Type.Optional(Type.String()),
        include: Type.Optional(Type.Array(IncludeEnumSchema)),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post('/responses/input_tokens', tbValidator('json', TokenCountsBodySchema), (c) => { throw new Error('Not implemented') })
  .post('/responses/compact', tbValidator('json', CompactResponseMethodPublicBodySchema), (c) => { throw new Error('Not implemented') })
  .get(
    '/responses/:response_id?beta=true',
    tbValidator(
      'param',
      Type.Object({
        response_id: Type.String({ examples: ['resp_677efb5139a88190b512bc3fef8e535d'] }),
      }),
    ),
    tbValidator(
      'query',
      Type.Object({
        include: Type.Optional(Type.Array(BetaIncludeEnumSchema)),
        stream: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
        starting_after: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        include_obfuscation: Type.Optional(
          Codec(
            Type.String({ pattern: /^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i }),
          )
            .Decode((value) => /^(?:true|1|yes|on|y|enabled)$/i.test(value))
            .Encode((value) => (value ? 'true' : 'false')),
        ),
      }),
    ),
    tbValidator(
      'header',
      Type.Object({
        'openai-beta': Type.Optional(Type.Array(Type.Literal('responses_multi_agent=v1'))),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/responses/:response_id?beta=true',
    tbValidator(
      'param',
      Type.Object({
        response_id: Type.String({ examples: ['resp_677efb5139a88190b512bc3fef8e535d'] }),
      }),
    ),
    tbValidator(
      'header',
      Type.Object({
        'openai-beta': Type.Optional(Type.Array(Type.Literal('responses_multi_agent=v1'))),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/responses/:response_id/cancel?beta=true',
    tbValidator(
      'param',
      Type.Object({
        response_id: Type.String({ examples: ['resp_677efb5139a88190b512bc3fef8e535d'] }),
      }),
    ),
    tbValidator(
      'header',
      Type.Object({
        'openai-beta': Type.Optional(Type.Array(Type.Literal('responses_multi_agent=v1'))),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/responses/compact?beta=true',
    tbValidator(
      'header',
      Type.Object({
        'openai-beta': Type.Optional(Type.Array(Type.Literal('responses_multi_agent=v1'))),
      }),
    ),
    tbValidator('json', BetaCompactResponseMethodPublicBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/responses/:response_id/input_items?beta=true',
    tbValidator('param', Type.Object({ response_id: Type.String() })),
    tbValidator(
      'query',
      Type.Object({
        limit: Type.Optional(
          Codec(Type.String({ pattern: '^-?(?:0|[1-9]\\d*)$', default: '20' }))
            .Decode((value) => Number(value))
            .Encode((value) => String(value)),
        ),
        order: Type.Optional(Type.Union([Type.Literal('asc'), Type.Literal('desc')])),
        after: Type.Optional(Type.String()),
        include: Type.Optional(Type.Array(BetaIncludeEnumSchema)),
      }),
    ),
    tbValidator(
      'header',
      Type.Object({
        'openai-beta': Type.Optional(Type.Array(Type.Literal('responses_multi_agent=v1'))),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/responses/input_tokens?beta=true',
    tbValidator(
      'header',
      Type.Object({
        'openai-beta': Type.Optional(Type.Array(Type.Literal('responses_multi_agent=v1'))),
      }),
    ),
    tbValidator('json', BetaTokenCountsBodySchema),
    (c) => { throw new Error('Not implemented') },
  )
