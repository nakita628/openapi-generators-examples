import { Elysia } from 'elysia'
import {
  AudiobookBaseSchema,
  AuthorObjectSchema,
  ChapterBaseSchema,
  ChapterObjectSchema,
  ChapterRestrictionObjectSchema,
  CopyrightObjectSchema,
  ErrorObjectSchema,
  ExternalUrlObjectSchema,
  ImageObjectSchema,
  NarratorObjectSchema,
  ResumePointObjectSchema,
  SimplifiedAudiobookObjectSchema,
} from '../../components/schemas'
import { ChaptersModel } from './model'

export const chapters = new Elysia()
  .model({
    AudiobookBase: AudiobookBaseSchema,
    AuthorObject: AuthorObjectSchema,
    ChapterBase: ChapterBaseSchema,
    ChapterObject: ChapterObjectSchema,
    ChapterRestrictionObject: ChapterRestrictionObjectSchema,
    CopyrightObject: CopyrightObjectSchema,
    ErrorObject: ErrorObjectSchema,
    ExternalUrlObject: ExternalUrlObjectSchema,
    ImageObject: ImageObjectSchema,
    NarratorObject: NarratorObjectSchema,
    ResumePointObject: ResumePointObjectSchema,
    SimplifiedAudiobookObject: SimplifiedAudiobookObjectSchema,
  })
  .get('/chapters/:id', ({ params, query }) => { throw new Error('Not implemented') }, {
    params: ChaptersModel.getAChapterParams,
    query: ChaptersModel.getAChapterQuery,
    response: {
      200: 'ChapterObject',
      401: ChaptersModel.getAChapterResponse401,
      403: ChaptersModel.getAChapterResponse403,
      429: ChaptersModel.getAChapterResponse429,
    },
    detail: {
      tags: ['Chapters'],
      summary: 'Get a Chapter\n',
      description:
        'Get Spotify catalog information for a single audiobook chapter. Chapters are only available within the US, UK, Canada, Ireland, New Zealand and Australia markets.\n',
      operationId: 'get-a-chapter',
      security: [{ oauth_2_0: [] }],
    },
  })
  .get('/chapters', ({ query }) => { throw new Error('Not implemented') }, {
    query: ChaptersModel.getSeveralChaptersQuery,
    response: {
      200: ChaptersModel.getSeveralChaptersResponse200,
      401: ChaptersModel.getSeveralChaptersResponse401,
      403: ChaptersModel.getSeveralChaptersResponse403,
      429: ChaptersModel.getSeveralChaptersResponse429,
    },
    detail: {
      tags: ['Chapters'],
      summary: 'Get Several Chapters\n',
      description:
        'Get Spotify catalog information for several audiobook chapters identified by their Spotify IDs. Chapters are only available within the US, UK, Canada, Ireland, New Zealand and Australia markets.\n',
      operationId: 'get-several-chapters',
      security: [{ oauth_2_0: [] }],
    },
  })
