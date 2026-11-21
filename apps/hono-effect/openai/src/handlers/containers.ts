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
    (c) => {},
  )
  .post(
    '/containers',
    sValidator('json', Schema.toStandardSchemaV1(CreateContainerBodySchema)),
    (c) => {},
  )
  .get(
    '/containers/:container_id',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ container_id: Schema.String }))),
    (c) => {},
  )
  .delete(
    '/containers/:container_id',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ container_id: Schema.String }))),
    (c) => {},
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
    (c) => {},
  )
  .post(
    '/containers/:container_id/files',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ container_id: Schema.String }))),
    sValidator('json', Schema.toStandardSchemaV1(CreateContainerFileBodySchema)),
    sValidator('form', Schema.toStandardSchemaV1(CreateContainerFileBodySchema)),
    (c) => {},
  )
  .get(
    '/containers/:container_id/files/:file_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ container_id: Schema.String, file_id: Schema.String }),
      ),
    ),
    (c) => {},
  )
  .delete(
    '/containers/:container_id/files/:file_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ container_id: Schema.String, file_id: Schema.String }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/containers/:container_id/files/:file_id/content',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ container_id: Schema.String, file_id: Schema.String }),
      ),
    ),
    (c) => {},
  )
