import { Hono } from 'hono'
import { describeRoute, resolver, validator } from 'hono-openapi'
import * as v from 'valibot'
import {
  DeleteFileResponseSchema,
  ErrorResponseSchema,
  ListFilesResponseSchema,
  OpenAIFileSchema,
} from '../components'

export const filesHandler = new Hono()
  .get(
    '/files',
    describeRoute({
      operationId: 'listFiles',
      tags: ['Files'],
      summary: 'List files',
      description: 'Returns a list of files.',
      responses: {
        '200': {
          description: 'OK',
          content: { 'application/json': { schema: resolver(ListFilesResponseSchema) } },
        },
        '400': {
          description: 'The file listing parameters are invalid.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '404': {
          description: 'The file specified by the after cursor was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': {
          description: 'Too many file requests. Reduce the request rate and try again later.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
      },
    }),
    validator(
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
    (c) => {},
  )
  .post(
    '/files',
    describeRoute({
      operationId: 'createFile',
      tags: ['Files'],
      summary: 'Upload file',
      description:
        'Upload a file that can be used across various endpoints. Individual files\ncan be up to 512 MB, and each project can store up to 2.5 TB of files in\ntotal. There is no organization-wide storage limit. Uploads to this\nendpoint are rate-limited to 1,000 requests per minute per authenticated\nuser.\n\n- The Assistants API supports files up to 2 million tokens and of specific\n  file types. See the [Assistants Tools guide](https://developers.openai.com/api/docs/guides/tools) for\n  details.\n- The Fine-tuning API only supports `.jsonl` files. The input also has\n  certain required formats for fine-tuning\n  [chat](https://developers.openai.com/api/docs/guides/supervised-fine-tuning#formatting-your-data) or\n  [completions](https://developers.openai.com/api/docs/guides/supervised-fine-tuning#formatting-your-data) models.\n- The Batch API only supports `.jsonl` files up to 200 MB in size. The input\n  also has a specific required\n  [format](https://developers.openai.com/api/docs/guides/batch#1-prepare-your-batch-file).\n- For Retrieval or `file_search` ingestion, upload files here first. If\n  you need to attach multiple uploaded files to the same vector store, use\n  [`/vector_stores/{vector_store_id}/file_batches`](https://developers.openai.com/api/reference/resources/vector_stores/subresources/file_batches/methods/create)\n  instead of attaching them one by one. Vector store attachment has separate\n  limits from file upload, including 2,000 attached files per minute per\n  organization.\n\nPlease [contact us](https://help.openai.com/) if you need to increase these\nstorage limits.\n',
      responses: {
        '200': {
          description: 'OK',
          content: { 'application/json': { schema: resolver(OpenAIFileSchema) } },
        },
        '400': {
          description:
            'The file upload request is invalid or exceeds a file size or storage quota limit.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': {
          description: 'Too many file requests. Reduce the request rate and try again later.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '500': {
          description: 'The file could not be uploaded because of a server error.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
      },
    }),
    validator(
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
    (c) => {},
  )
  .get(
    '/files/:file_id',
    describeRoute({
      operationId: 'retrieveFile',
      tags: ['Files'],
      summary: 'Retrieve file',
      description: 'Returns information about a specific file.',
      responses: {
        '200': {
          description: 'OK',
          content: { 'application/json': { schema: resolver(OpenAIFileSchema) } },
        },
        '404': {
          description: 'The file was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': {
          description: 'Too many file requests. Reduce the request rate and try again later.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
      },
    }),
    validator('param', v.object({ file_id: v.string() })),
    (c) => {},
  )
  .delete(
    '/files/:file_id',
    describeRoute({
      operationId: 'deleteFile',
      tags: ['Files'],
      summary: 'Delete file',
      description: 'Delete a file and remove it from all vector stores.',
      responses: {
        '200': {
          description: 'OK',
          content: { 'application/json': { schema: resolver(DeleteFileResponseSchema) } },
        },
        '404': {
          description: 'The file was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': {
          description: 'Too many file requests. Reduce the request rate and try again later.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
      },
    }),
    validator('param', v.object({ file_id: v.string() })),
    (c) => {},
  )
  .get(
    '/files/:file_id/content',
    describeRoute({
      operationId: 'downloadFile',
      tags: ['Files'],
      summary: 'Retrieve file content',
      description: 'Returns a response containing the contents of the specified file.',
      responses: {
        '200': {
          description: 'OK',
          content: { 'application/octet-stream': { schema: resolver(v.file()) } },
        },
        '400': {
          description:
            'The file cannot be downloaded for its purpose or the account does not have permission to download it.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '404': {
          description: 'The file was not found.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '429': {
          description: 'Too many file requests. Reduce the request rate and try again later.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
        '500': {
          description: 'The file could not be downloaded because of a server error.',
          content: { 'application/json': { schema: resolver(ErrorResponseSchema) } },
        },
      },
    }),
    validator('param', v.object({ file_id: v.string() })),
    (c) => {},
  )
