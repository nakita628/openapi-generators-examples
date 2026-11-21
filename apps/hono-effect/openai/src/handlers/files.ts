import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { Effect, Schema } from 'effect'

export const filesHandler = new Hono()
  .get(
    '/files',
    sValidator(
      'query',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          purpose: Schema.optional(Schema.String),
          limit: Schema.FiniteFromString.check(Schema.isInt()).pipe(
            Schema.withDecodingDefaultType(Effect.succeed(10000)),
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
    '/files',
    sValidator(
      'form',
      Schema.toStandardSchemaV1(
        Schema.Struct({
          file: Schema.instanceOf(File).annotate({
            description: 'The File object (not file name) to be uploaded.\n',
          }),
          purpose: Schema.Literals([
            'assistants',
            'batch',
            'fine-tune',
            'vision',
            'user_data',
            'evals',
          ]).annotate({
            description:
              'The intended purpose of the uploaded file. One of:\n- `assistants`: Used in the Assistants API\n- `batch`: Used in the Batch API\n- `fine-tune`: Used for fine-tuning\n- `vision`: Images used for vision fine-tuning\n- `user_data`: Flexible file type for any purpose\n- `evals`: Used for eval data sets\n',
          }),
          expires_after: Schema.optional(
            Schema.Struct({
              anchor: Schema.Literal('created_at').annotate({
                description:
                  'Anchor timestamp after which the expiration policy applies. Supported anchors: `created_at`.',
              }),
              seconds: Schema.BigIntFromString.check(
                Schema.isBetweenBigInt({
                  minimum: -9223372036854775808n,
                  maximum: 9223372036854775807n,
                }),
                Schema.isGreaterThanOrEqualToBigInt(3600n),
                Schema.isLessThanOrEqualToBigInt(2592000n),
              ).annotate({
                description:
                  'The number of seconds after the anchor time that the file will expire. Must be between 3600 (1 hour) and 2592000 (30 days).',
              }),
            }).annotate({
              description:
                'The expiration policy for a file. By default, files with `purpose=batch` expire after 30 days and all other files are persisted until they are manually deleted.',
            }),
          ),
        }).annotate({ parseOptions: { onExcessProperty: 'error' } }),
      ),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/files/:file_id',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ file_id: Schema.String }))),
    (c) => { throw new Error('Not implemented') },
  )
  .delete(
    '/files/:file_id',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ file_id: Schema.String }))),
    (c) => { throw new Error('Not implemented') },
  )
  .get(
    '/files/:file_id/content',
    sValidator('param', Schema.toStandardSchemaV1(Schema.Struct({ file_id: Schema.String }))),
    (c) => { throw new Error('Not implemented') },
  )
