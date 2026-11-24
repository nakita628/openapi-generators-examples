import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { Schema, SchemaTransformation } from 'effect'
import { SnowflakeTypeSchema } from '../components'

export const invitesHandler = new Hono()
  .get(
    '/invites/:code',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          code: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 152133, {
              expected: 'a string of at most 152133 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          with_counts: Schema.optionalKey(
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
          guild_scheduled_event_id: Schema.optionalKey(SnowflakeTypeSchema),
          target_channel_id: Schema.optionalKey(SnowflakeTypeSchema),
          target_message_id: Schema.optionalKey(SnowflakeTypeSchema),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/invites/:code',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          code: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 152133, {
              expected: 'a string of at most 152133 characters',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/invites/:code/target-users',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          code: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 152133, {
              expected: 'a string of at most 152133 characters',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/invites/:code/target-users',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          code: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 152133, {
              expected: 'a string of at most 152133 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'form',
      Schema.toStandardSchemaV1(Schema.Struct({ target_users_file: Schema.String })),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/invites/:code/target-users/bulk-add',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          code: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 152133, {
              expected: 'a string of at most 152133 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'json',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          user_ids: Schema.Array(SnowflakeTypeSchema)
            .check(Schema.isMinLength(1), Schema.isMaxLength(1000))
            .annotate({ description: 'The IDs of the users to target.' }),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/invites/:code/target-users/bulk-delete',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          code: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 152133, {
              expected: 'a string of at most 152133 characters',
            }),
          ),
        }),
      ),
    ),
    sValidator(
      'json',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          user_ids: Schema.Array(SnowflakeTypeSchema)
            .check(Schema.isMinLength(1), Schema.isMaxLength(1000))
            .annotate({ description: 'The IDs of the users to stop targeting.' }),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/invites/:code/target-users/job-status',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          code: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 152133, {
              expected: 'a string of at most 152133 characters',
            }),
          ),
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .put(
    '/invites/:code/target-users/:user_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          code: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 152133, {
              expected: 'a string of at most 152133 characters',
            }),
          ),
          user_id: SnowflakeTypeSchema,
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/invites/:code/target-users/:user_id',
    sValidator(
      'param',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          code: Schema.String.check(
            Schema.makeFilter((input) => [...input].length <= 152133, {
              expected: 'a string of at most 152133 characters',
            }),
          ),
          user_id: SnowflakeTypeSchema,
        }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
