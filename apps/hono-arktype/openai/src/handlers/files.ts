import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import { type } from 'arktype'

export const filesHandler = new Hono()
  .get(
    '/files',
    sValidator(
      'query',
      type({
        'purpose?': 'string',
        'limit?': type('string').pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        }),
        'order?': "'asc' | 'desc'",
        'after?': 'string',
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/files',
    sValidator(
      'form',
      type({
        file: type('File').describe('The File object (not file name) to be uploaded.\n'),
        purpose: type(
          "'assistants' | 'batch' | 'fine-tune' | 'vision' | 'user_data' | 'evals'",
        ).describe(
          'The intended purpose of the uploaded file. One of:\n- `assistants`: Used in the Assistants API\n- `batch`: Used in the Batch API\n- `fine-tune`: Used for fine-tuning\n- `vision`: Images used for vision fine-tuning\n- `user_data`: Flexible file type for any purpose\n- `evals`: Used for eval data sets\n',
        ),
        'expires_after?': type({
          anchor: type("'created_at'").describe(
            'Anchor timestamp after which the expiration policy applies. Supported anchors: `created_at`.',
          ),
          seconds: type('string')
            .pipe((data, ctx) => (/^-?\d+$/.test(data) ? BigInt(data) : ctx.error('an integer')))
            .narrow(
              (data, ctx) =>
                (data >= -9223372036854775808n && data <= 9223372036854775807n) ||
                ctx.mustBe('an int64'),
            )
            .narrow((data, ctx) => data >= 3600n || ctx.mustBe('at least 3600'))
            .narrow((data, ctx) => data <= 2592000n || ctx.mustBe('at most 2592000'))
            .describe(
              'The number of seconds after the anchor time that the file will expire. Must be between 3600 (1 hour) and 2592000 (30 days).',
            ),
        }).describe(
          'The expiration policy for a file. By default, files with `purpose=batch` expire after 30 days and all other files are persisted until they are manually deleted.',
        ),
        '+': 'reject',
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get('/files/:file_id', sValidator('param', type({ file_id: 'string' })), (c) => { throw new Error('Not implemented') })
  .delete('/files/:file_id', sValidator('param', type({ file_id: 'string' })), (c) => { throw new Error('Not implemented') })
  .get('/files/:file_id/content', sValidator('param', type({ file_id: 'string' })), (c) => { throw new Error('Not implemented') })
