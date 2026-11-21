import { Hono } from 'hono'
import { sValidator } from '@hono/standard-validator'
import * as v from 'valibot'

export const filesHandler = new Hono()
  .get(
    '/files',
    sValidator(
      'query',
      v.object({
        purpose: v.optional(v.string()),
        limit: v.optional(
          v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger()),
          '10000',
        ),
        order: v.optional(v.picklist(['asc', 'desc']), 'desc'),
        after: v.optional(v.string()),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .post(
    '/files',
    sValidator(
      'form',
      v.strictObject({
        file: v.pipe(v.file(), v.description('The File object (not file name) to be uploaded.\n')),
        purpose: v.pipe(
          v.picklist(['assistants', 'batch', 'fine-tune', 'vision', 'user_data', 'evals']),
          v.description(
            'The intended purpose of the uploaded file. One of:\n- `assistants`: Used in the Assistants API\n- `batch`: Used in the Batch API\n- `fine-tune`: Used for fine-tuning\n- `vision`: Images used for vision fine-tuning\n- `user_data`: Flexible file type for any purpose\n- `evals`: Used for eval data sets\n',
          ),
        ),
        expires_after: v.optional(
          v.pipe(
            v.object({
              anchor: v.pipe(
                v.literal('created_at'),
                v.description(
                  'Anchor timestamp after which the expiration policy applies. Supported anchors: `created_at`.',
                ),
              ),
              seconds: v.pipe(
                v.pipe(
                  v.string(),
                  v.regex(/^-?\d+$/),
                  v.transform((input) => BigInt(input)),
                  v.minValue(-9223372036854775808n),
                  v.maxValue(9223372036854775807n),
                  v.minValue(3600n),
                  v.maxValue(2592000n),
                ),
                v.description(
                  'The number of seconds after the anchor time that the file will expire. Must be between 3600 (1 hour) and 2592000 (30 days).',
                ),
              ),
            }),
            v.description(
              'The expiration policy for a file. By default, files with `purpose=batch` expire after 30 days and all other files are persisted until they are manually deleted.',
            ),
          ),
        ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
  )
  .get('/files/:file_id', sValidator('param', v.object({ file_id: v.string() })), (c) => { throw new Error('Not implemented') })
  .delete('/files/:file_id', sValidator('param', v.object({ file_id: v.string() })), (c) => { throw new Error('Not implemented') })
  .get('/files/:file_id/content', sValidator('param', v.object({ file_id: v.string() })), (c) => { throw new Error('Not implemented') })
