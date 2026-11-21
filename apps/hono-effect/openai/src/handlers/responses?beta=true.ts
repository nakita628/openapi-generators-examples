import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { Schema, SchemaTransformation } from 'effect'
import { BetaCreateResponseSchema } from '../components'

export const responsesBetaTrueHandler = new Hono().post(
  '/responses?beta=true',
  sValidator(
    'header',
    Schema.toStandardSchemaV1(
      Schema.Struct({
        'openai-beta': Schema.optional(
          Schema.Unknown.pipe(
            Schema.decodeTo(
              Schema.Unknown,
              SchemaTransformation.transform<unknown, unknown>({
                decode: (input) => (input === undefined || Array.isArray(input) ? input : [input]),
                encode: (output) => output,
              }),
            ),
            Schema.decodeTo(Schema.Array(Schema.Literal('responses_multi_agent=v1'))),
          ),
        ),
      }),
    ),
  ),
  sValidator('json', Schema.toStandardSchemaV1(BetaCreateResponseSchema)),
  (c) => { throw new Error('Not implemented') },
)
