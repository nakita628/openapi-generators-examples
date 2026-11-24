import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { Effect, Schema, SchemaTransformation } from 'effect'
import {
  PublicAssignOrganizationGroupRoleBodySchema,
  PublicCreateOrganizationRoleBodySchema,
  PublicUpdateOrganizationRoleBodySchema,
} from '../components'

export const projectsHandler = new Hono()
  .get(
    '/projects/:project_id/groups/:group_id/roles',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ project_id: Schema.String, group_id: Schema.String }),
      ),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(
                Schema.isInt(),
                Schema.isGreaterThanOrEqualTo(0),
                Schema.isLessThanOrEqualTo(1000),
              ),
          ),
          after: Schema.optionalKey(Schema.String),
          order: Schema.optionalKey(Schema.Literals(['asc', 'desc'])),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/projects/:project_id/groups/:group_id/roles',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ project_id: Schema.String, group_id: Schema.String }),
      ),
    ),
    sValidator('json', Schema.toStandardSchemaV1(PublicAssignOrganizationGroupRoleBodySchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/projects/:project_id/groups/:group_id/roles/:role_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          project_id: Schema.String,
          group_id: Schema.String,
          role_id: Schema.String,
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/projects/:project_id/groups/:group_id/roles/:role_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          project_id: Schema.String,
          group_id: Schema.String,
          role_id: Schema.String,
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/projects/:project_id/roles',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ project_id: Schema.String }))),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
            .pipe(
              Schema.decodeTo(
                Schema.Finite,
                SchemaTransformation.transform({
                  decode: (input) => Number(input),
                  encode: (output) => String(output),
                }),
              ),
            )
            .check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(0),
              Schema.isLessThanOrEqualTo(1000),
            )
            .pipe(Schema.withDecodingDefaultType(Effect.succeed(1000))),
          after: Schema.optionalKey(Schema.String),
          order: Schema.Literals(['asc', 'desc']).pipe(
            Schema.withDecodingDefaultType(Effect.succeed('asc')),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/projects/:project_id/roles',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ project_id: Schema.String }))),
    sValidator('json', Schema.toStandardSchemaV1(PublicCreateOrganizationRoleBodySchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/projects/:project_id/roles/:role_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ project_id: Schema.String, role_id: Schema.String }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/projects/:project_id/roles/:role_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ project_id: Schema.String, role_id: Schema.String }),
      ),
    ),
    sValidator('json', Schema.toStandardSchemaV1(PublicUpdateOrganizationRoleBodySchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/projects/:project_id/roles/:role_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ project_id: Schema.String, role_id: Schema.String }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/projects/:project_id/users/:user_id/roles',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ project_id: Schema.String, user_id: Schema.String }),
      ),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.optionalKey(
            Schema.String.check(Schema.isPattern(/^-?(?:0|[1-9]\d*)$/))
              .pipe(
                Schema.decodeTo(
                  Schema.Finite,
                  SchemaTransformation.transform({
                    decode: (input) => Number(input),
                    encode: (output) => String(output),
                  }),
                ),
              )
              .check(
                Schema.isInt(),
                Schema.isGreaterThanOrEqualTo(0),
                Schema.isLessThanOrEqualTo(1000),
              ),
          ),
          after: Schema.optionalKey(Schema.String),
          order: Schema.optionalKey(Schema.Literals(['asc', 'desc'])),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/projects/:project_id/users/:user_id/roles',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({ project_id: Schema.String, user_id: Schema.String }),
      ),
    ),
    sValidator('json', Schema.toStandardSchemaV1(PublicAssignOrganizationGroupRoleBodySchema)),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/projects/:project_id/users/:user_id/roles/:role_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          project_id: Schema.String,
          user_id: Schema.String,
          role_id: Schema.String,
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/projects/:project_id/users/:user_id/roles/:role_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          project_id: Schema.String,
          user_id: Schema.String,
          role_id: Schema.String,
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
