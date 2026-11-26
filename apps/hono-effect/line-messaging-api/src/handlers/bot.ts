import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { Schema } from 'effect'
import { PnpMessagesRequestSchema } from '../components'

export const botHandler = new Hono().post(
  '/bot/pnp/push',
  sValidator(
    'header',
    Schema.toStandardSchemaV1(
      Schema.Struct({
        'x-line-delivery-tag': Schema.optionalKey(
          Schema.String.check(
            Schema.makeFilter((input) => [...input].length >= 16, {
              expected: 'a string of at least 16 characters',
            }),
            Schema.makeFilter((input) => [...input].length <= 100, {
              expected: 'a string of at most 100 characters',
            }),
          ),
        ),
      }),
    ),
  ),
  sValidator('json', Schema.toStandardSchemaV1(PnpMessagesRequestSchema)),
  (c) => { throw new Error('Not implemented') },
)
