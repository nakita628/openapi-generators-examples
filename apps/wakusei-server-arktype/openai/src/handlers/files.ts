import { os } from '@orpc/server'
import { type } from 'arktype'
import { DeleteFileResponseSchema, ListFilesResponseSchema, OpenAIFileSchema } from '../components'

export const getFiles = os
  .route({
    method: 'GET',
    path: '/files',
    tags: ['Files'],
    summary: 'List files',
    description: 'Returns a list of files.',
  })
  .input(
    type({
      'purpose?': type('string'),
      'limit?': type('string').pipe((data, ctx) => {
        const value = Number(data)
        return Number.isSafeInteger(value) ? value : ctx.error('an integer')
      }),
      'order?': type("'asc' | 'desc'"),
      'after?': type('string'),
    }),
  )
  .output(ListFilesResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postFiles = os
  .route({
    method: 'POST',
    path: '/files',
    tags: ['Files'],
    summary: 'Upload file',
    description:
      'Upload a file that can be used across various endpoints. Individual files\ncan be up to 512 MB, and each project can store up to 2.5 TB of files in\ntotal. There is no organization-wide storage limit. Uploads to this\nendpoint are rate-limited to 1,000 requests per minute per authenticated\nuser.\n\n- The Assistants API supports files up to 2 million tokens and of specific\n  file types. See the [Assistants Tools guide](https://developers.openai.com/api/docs/guides/tools) for\n  details.\n- The Fine-tuning API only supports `.jsonl` files. The input also has\n  certain required formats for fine-tuning\n  [chat](https://developers.openai.com/api/docs/guides/supervised-fine-tuning#formatting-your-data) or\n  [completions](https://developers.openai.com/api/docs/guides/supervised-fine-tuning#formatting-your-data) models.\n- The Batch API only supports `.jsonl` files up to 200 MB in size. The input\n  also has a specific required\n  [format](https://developers.openai.com/api/docs/guides/batch#1-prepare-your-batch-file).\n- For Retrieval or `file_search` ingestion, upload files here first. If\n  you need to attach multiple uploaded files to the same vector store, use\n  [`/vector_stores/{vector_store_id}/file_batches`](https://developers.openai.com/api/reference/resources/vector_stores/subresources/file_batches/methods/create)\n  instead of attaching them one by one. Vector store attachment has separate\n  limits from file upload, including 2,000 attached files per minute per\n  organization.\n\nPlease [contact us](https://help.openai.com/) if you need to increase these\nstorage limits.\n',
  })
  .output(OpenAIFileSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getFilesFileId = os
  .route({
    method: 'GET',
    path: '/files/{file_id}',
    tags: ['Files'],
    summary: 'Retrieve file',
    description: 'Returns information about a specific file.',
  })
  .input(type({ file_id: type('string') }))
  .output(OpenAIFileSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteFilesFileId = os
  .route({
    method: 'DELETE',
    path: '/files/{file_id}',
    tags: ['Files'],
    summary: 'Delete file',
    description: 'Delete a file and remove it from all vector stores.',
  })
  .input(type({ file_id: type('string') }))
  .output(DeleteFileResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getFilesFileIdContent = os
  .route({
    method: 'GET',
    path: '/files/{file_id}/content',
    tags: ['Files'],
    summary: 'Retrieve file content',
    description: 'Returns a response containing the contents of the specified file.',
  })
  .input(type({ file_id: type('string') }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })
