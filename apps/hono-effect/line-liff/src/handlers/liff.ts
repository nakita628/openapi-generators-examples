import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { Schema } from 'effect'
import { AddLiffAppRequestSchema, UpdateLiffAppRequestSchema } from '../components'

export const liffHandler = new Hono()
  .get('/liff/v1/apps', (c) => { throw new Error('Not implemented') })
  .post(
    '/liff/v1/apps',
    sValidator('json', Schema.toStandardSchemaV1(AddLiffAppRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/liff/v1/apps/:liffId',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ liffId: Schema.String }))),
    sValidator('json', Schema.toStandardSchemaV1(UpdateLiffAppRequestSchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/liff/v1/apps/:liffId',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ liffId: Schema.String }))),
    (c) => { throw new Error('Not implemented') },
  )
