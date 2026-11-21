import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { Effect, Schema } from 'effect'
import { CreateContainerBodySchema, CreateContainerFileBodySchema } from '../components'

export const containersHandler = new Hono()
  .get(
    '/containers',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.FiniteFromString.check(Schema.isInt()).pipe(
            Schema.withDecodingDefaultType(Effect.succeed(20)),
          ),
          order: Schema.Literals(['asc', 'desc']).pipe(
            Schema.withDecodingDefaultType(Effect.succeed('desc')),
          ),
          after: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/containers',
    sValidator('json', Schema.toStandardSchemaV1(CreateContainerBodySchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/containers/:container_id',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ container_id: Schema.String }))),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/containers/:container_id',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ container_id: Schema.String }))),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/containers/:container_id/files',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ container_id: Schema.String }))),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.FiniteFromString.check(Schema.isInt()).pipe(
            Schema.withDecodingDefaultType(Effect.succeed(20)),
          ),
          order: Schema.Literals(['asc', 'desc']).pipe(
            Schema.withDecodingDefaultType(Effect.succeed('desc')),
          ),
          after: Schema.optional(Schema.String),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/containers/:container_id/files',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ container_id: Schema.String }))),
    sValidator('json', Schema.toStandardSchemaV1(CreateContainerFileBodySchema)),
    sValidator('form', Schema.toStandardSchemaV1(CreateContainerFileBodySchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/containers/:container_id/files/:file_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ container_id: Schema.String, file_id: Schema.String }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/containers/:container_id/files/:file_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ container_id: Schema.String, file_id: Schema.String }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/containers/:container_id/files/:file_id/content',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ container_id: Schema.String, file_id: Schema.String }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
