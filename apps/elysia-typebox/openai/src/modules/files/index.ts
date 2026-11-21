import { Elysia, t } from 'elysia'
import {
  CreateFileRequestSchema,
  DeleteFileResponseSchema,
  ErrorSchema,
  ErrorResponseSchema,
  FileExpirationAfterSchema,
  ListFilesResponseSchema,
  MisalignmentErrorDetailsResourceSchema,
  OpenAIFileSchema,
  MisalignmentErrorTypeSchema,
  MisalignmentSteerSchema,
} from '../../components/schemas'
import { FilesModel } from './model'

export const files = new Elysia()
  .model({
    CreateFileRequest: CreateFileRequestSchema,
    DeleteFileResponse: DeleteFileResponseSchema,
    Error: ErrorSchema,
    ErrorResponse: ErrorResponseSchema,
    FileExpirationAfter: FileExpirationAfterSchema,
    ListFilesResponse: ListFilesResponseSchema,
    MisalignmentErrorDetailsResource: MisalignmentErrorDetailsResourceSchema,
    OpenAIFile: OpenAIFileSchema,
    MisalignmentErrorType: MisalignmentErrorTypeSchema,
    MisalignmentSteer: MisalignmentSteerSchema,
  })
  .get('/files', ({ query }) => {}, {
    query: FilesModel.listFilesQuery,
    response: {
      200: 'ListFilesResponse',
      400: 'ErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
    },
    detail: {
      tags: ['Files'],
      summary: 'List files',
      description: 'Returns a list of files.',
      operationId: 'listFiles',
    },
  })
  .post('/files', ({ body }) => {}, {
    body: 'CreateFileRequest',
    response: {
      200: 'OpenAIFile',
      400: 'ErrorResponse',
      429: 'ErrorResponse',
      500: 'ErrorResponse',
    },
    detail: {
      tags: ['Files'],
      summary: 'Upload file',
      description:
        'Upload a file that can be used across various endpoints. Individual files\ncan be up to 512 MB, and each project can store up to 2.5 TB of files in\ntotal. There is no organization-wide storage limit. Uploads to this\nendpoint are rate-limited to 1,000 requests per minute per authenticated\nuser.\n\n- The Assistants API supports files up to 2 million tokens and of specific\n  file types. See the [Assistants Tools guide](https://developers.openai.com/api/docs/guides/tools) for\n  details.\n- The Fine-tuning API only supports `.jsonl` files. The input also has\n  certain required formats for fine-tuning\n  [chat](https://developers.openai.com/api/docs/guides/supervised-fine-tuning#formatting-your-data) or\n  [completions](https://developers.openai.com/api/docs/guides/supervised-fine-tuning#formatting-your-data) models.\n- The Batch API only supports `.jsonl` files up to 200 MB in size. The input\n  also has a specific required\n  [format](https://developers.openai.com/api/docs/guides/batch#1-prepare-your-batch-file).\n- For Retrieval or `file_search` ingestion, upload files here first. If\n  you need to attach multiple uploaded files to the same vector store, use\n  [`/vector_stores/{vector_store_id}/file_batches`](https://developers.openai.com/api/reference/resources/vector_stores/subresources/file_batches/methods/create)\n  instead of attaching them one by one. Vector store attachment has separate\n  limits from file upload, including 2,000 attached files per minute per\n  organization.\n\nPlease [contact us](https://help.openai.com/) if you need to increase these\nstorage limits.\n',
      operationId: 'createFile',
    },
  })
  .get('/files/:file_id', ({ params }) => {}, {
    params: FilesModel.retrieveFileParams,
    response: { 200: 'OpenAIFile', 404: 'ErrorResponse', 429: 'ErrorResponse' },
    detail: {
      tags: ['Files'],
      summary: 'Retrieve file',
      description: 'Returns information about a specific file.',
      operationId: 'retrieveFile',
    },
  })
  .delete('/files/:file_id', ({ params }) => {}, {
    params: FilesModel.deleteFileParams,
    response: { 200: 'DeleteFileResponse', 404: 'ErrorResponse', 429: 'ErrorResponse' },
    detail: {
      tags: ['Files'],
      summary: 'Delete file',
      description: 'Delete a file and remove it from all vector stores.',
      operationId: 'deleteFile',
    },
  })
  .get('/files/:file_id/content', ({ params }) => {}, {
    params: FilesModel.downloadFileParams,
    response: {
      200: t.Void(),
      400: 'ErrorResponse',
      404: 'ErrorResponse',
      429: 'ErrorResponse',
      500: 'ErrorResponse',
    },
    detail: {
      tags: ['Files'],
      summary: 'Retrieve file content',
      description: 'Returns a response containing the contents of the specified file.',
      operationId: 'downloadFile',
    },
  })
