import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { Effect, Schema, SchemaTransformation } from 'effect'
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
  .post(
    '/responses',
    sValidator('json', Schema.toStandardSchemaV1(CreateResponseSchema)),
    (c) => {},
  )
  .get(
    '/responses/:response_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          response_id: Schema.String.annotate({
            jsonSchemaExamples: ['resp_677efb5139a88190b512bc3fef8e535d'],
          }),
        }),
      ),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          include: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(Schema.Array(IncludeEnumSchema)),
            ),
          ),
          stream: Schema.optional(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
          starting_after: Schema.optional(Schema.FiniteFromString.check(Schema.isInt())),
          include_obfuscation: Schema.optional(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
        }),
      ),
    ),
    (c) => {},
  )
  .delete(
    '/responses/:response_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          response_id: Schema.String.annotate({
            jsonSchemaExamples: ['resp_677efb5139a88190b512bc3fef8e535d'],
          }),
        }),
      ),
    ),
    (c) => {},
  )
  .post(
    '/responses/:response_id/cancel',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          response_id: Schema.String.annotate({
            jsonSchemaExamples: ['resp_677efb5139a88190b512bc3fef8e535d'],
          }),
        }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/responses/:response_id/input_items',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ response_id: Schema.String }))),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.FiniteFromString.check(Schema.isInt()).pipe(
            Schema.withDecodingDefaultType(Effect.succeed(20)),
          ),
          order: Schema.optional(Schema.Literals(['asc', 'desc'])),
          after: Schema.optional(Schema.String),
          include: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(Schema.Array(IncludeEnumSchema)),
            ),
          ),
        }),
      ),
    ),
    (c) => {},
  )
  .post(
    '/responses/input_tokens',
    sValidator('json', Schema.toStandardSchemaV1(TokenCountsBodySchema)),
    (c) => {},
  )
  .post(
    '/responses/compact',
    sValidator('json', Schema.toStandardSchemaV1(CompactResponseMethodPublicBodySchema)),
    (c) => {},
  )
  .get(
    '/responses/:response_id?beta=true',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          response_id: Schema.String.annotate({
            jsonSchemaExamples: ['resp_677efb5139a88190b512bc3fef8e535d'],
          }),
        }),
      ),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          include: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(Schema.Array(BetaIncludeEnumSchema)),
            ),
          ),
          stream: Schema.optional(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
          starting_after: Schema.optional(Schema.FiniteFromString.check(Schema.isInt())),
          include_obfuscation: Schema.optional(
            Schema.String.check(
              Schema.isPattern(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
            ).pipe(
              Schema.decodeTo(
                Schema.Boolean,
                SchemaTransformation.transform({
                  decode: (input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input),
                  encode: (output) => (output ? 'true' : 'false'),
                }),
              ),
            ),
          ),
        }),
      ),
    ),
    sValidator(
      'header',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          'openai-beta': Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(Schema.Array(Schema.Literal('responses_multi_agent=v1'))),
            ),
          ),
        }),
      ),
    ),
    (c) => {},
  )
  .delete(
    '/responses/:response_id?beta=true',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          response_id: Schema.String.annotate({
            jsonSchemaExamples: ['resp_677efb5139a88190b512bc3fef8e535d'],
          }),
        }),
      ),
    ),
    sValidator(
      'header',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          'openai-beta': Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(Schema.Array(Schema.Literal('responses_multi_agent=v1'))),
            ),
          ),
        }),
      ),
    ),
    (c) => {},
  )
  .post(
    '/responses/:response_id/cancel?beta=true',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          response_id: Schema.String.annotate({
            jsonSchemaExamples: ['resp_677efb5139a88190b512bc3fef8e535d'],
          }),
        }),
      ),
    ),
    sValidator(
      'header',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          'openai-beta': Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(Schema.Array(Schema.Literal('responses_multi_agent=v1'))),
            ),
          ),
        }),
      ),
    ),
    (c) => {},
  )
  .post(
    '/responses/compact?beta=true',
    sValidator(
      'header',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          'openai-beta': Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(Schema.Array(Schema.Literal('responses_multi_agent=v1'))),
            ),
          ),
        }),
      ),
    ),
    sValidator('json', Schema.toStandardSchemaV1(BetaCompactResponseMethodPublicBodySchema)),
    (c) => {},
  )
  .get(
    '/responses/:response_id/input_items?beta=true',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ response_id: Schema.String }))),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.FiniteFromString.check(Schema.isInt()).pipe(
            Schema.withDecodingDefaultType(Effect.succeed(20)),
          ),
          order: Schema.optional(Schema.Literals(['asc', 'desc'])),
          after: Schema.optional(Schema.String),
          include: Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(Schema.Array(BetaIncludeEnumSchema)),
            ),
          ),
        }),
      ),
    ),
    sValidator(
      'header',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          'openai-beta': Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(Schema.Array(Schema.Literal('responses_multi_agent=v1'))),
            ),
          ),
        }),
      ),
    ),
    (c) => {},
  )
  .post(
    '/responses/input_tokens?beta=true',
    sValidator(
      'header',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          'openai-beta': Schema.optional(
            Schema.Unknown.pipe(
              Schema.decodeTo(
                Schema.Unknown,
                SchemaTransformation.transform<unknown, unknown>({
                  decode: (input) =>
                    input === undefined || Array.isArray(input) ? input : [input],
                  encode: (output) => output,
                }),
              ),
              Schema.decodeTo(Schema.Array(Schema.Literal('responses_multi_agent=v1'))),
            ),
          ),
        }),
      ),
    ),
    sValidator('json', Schema.toStandardSchemaV1(BetaTokenCountsBodySchema)),
    (c) => {},
  )
