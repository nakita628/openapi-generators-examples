import { Elysia } from 'elysia'
import {
  AudiobookBaseSchema,
  AudiobookObjectSchema,
  AuthorObjectSchema,
  ChapterBaseSchema,
  ChapterRestrictionObjectSchema,
  CopyrightObjectSchema,
  ErrorObjectSchema,
  ExternalUrlObjectSchema,
  ImageObjectSchema,
  NarratorObjectSchema,
  PagingObjectSchema,
  PagingSimplifiedChapterObjectSchema,
  ResumePointObjectSchema,
  SimplifiedChapterObjectSchema,
} from '../../components/schemas'
import { AudiobooksModel } from './model'

export const audiobooks = new Elysia()
  .model({
    AudiobookBase: AudiobookBaseSchema,
    AudiobookObject: AudiobookObjectSchema,
    AuthorObject: AuthorObjectSchema,
    ChapterBase: ChapterBaseSchema,
    ChapterRestrictionObject: ChapterRestrictionObjectSchema,
    CopyrightObject: CopyrightObjectSchema,
    ErrorObject: ErrorObjectSchema,
    ExternalUrlObject: ExternalUrlObjectSchema,
    ImageObject: ImageObjectSchema,
    NarratorObject: NarratorObjectSchema,
    PagingObject: PagingObjectSchema,
    PagingSimplifiedChapterObject: PagingSimplifiedChapterObjectSchema,
    ResumePointObject: ResumePointObjectSchema,
    SimplifiedChapterObject: SimplifiedChapterObjectSchema,
  })
  .get('/audiobooks/:id', ({ params, query }) => {}, {
    params: AudiobooksModel.getAnAudiobookParams,
    query: AudiobooksModel.getAnAudiobookQuery,
    response: {
      200: 'AudiobookObject',
      400: AudiobooksModel.getAnAudiobookResponse400,
      401: AudiobooksModel.getAnAudiobookResponse401,
      403: AudiobooksModel.getAnAudiobookResponse403,
      404: AudiobooksModel.getAnAudiobookResponse404,
      429: AudiobooksModel.getAnAudiobookResponse429,
    },
    detail: {
      tags: ['Audiobooks'],
      summary: 'Get an Audiobook\n',
      description:
        'Get Spotify catalog information for a single audiobook. Audiobooks are only available within the US, UK, Canada, Ireland, New Zealand and Australia markets.\n',
      operationId: 'get-an-audiobook',
      security: [{ oauth_2_0: [] }],
    },
  })
  .get('/audiobooks', ({ query }) => {}, {
    query: AudiobooksModel.getMultipleAudiobooksQuery,
    response: {
      200: AudiobooksModel.getMultipleAudiobooksResponse200,
      401: AudiobooksModel.getMultipleAudiobooksResponse401,
      403: AudiobooksModel.getMultipleAudiobooksResponse403,
      429: AudiobooksModel.getMultipleAudiobooksResponse429,
    },
    detail: {
      tags: ['Audiobooks'],
      summary: 'Get Several Audiobooks\n',
      description:
        'Get Spotify catalog information for several audiobooks identified by their Spotify IDs. Audiobooks are only available within the US, UK, Canada, Ireland, New Zealand and Australia markets.\n',
      operationId: 'get-multiple-audiobooks',
      security: [{ oauth_2_0: [] }],
    },
  })
  .get('/audiobooks/:id/chapters', ({ params, query }) => {}, {
    params: AudiobooksModel.getAudiobookChaptersParams,
    query: AudiobooksModel.getAudiobookChaptersQuery,
    response: {
      200: 'PagingSimplifiedChapterObject',
      401: AudiobooksModel.getAudiobookChaptersResponse401,
      403: AudiobooksModel.getAudiobookChaptersResponse403,
      429: AudiobooksModel.getAudiobookChaptersResponse429,
    },
    detail: {
      tags: ['Audiobooks', 'Chapters'],
      summary: 'Get Audiobook Chapters\n',
      description:
        "Get Spotify catalog information about an audiobook's chapters. Audiobooks are only available within the US, UK, Canada, Ireland, New Zealand and Australia markets.\n",
      operationId: 'get-audiobook-chapters',
      security: [{ oauth_2_0: [] }],
    },
  })
