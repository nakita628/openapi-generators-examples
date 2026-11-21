import { Elysia } from 'elysia'
import {
  CopyrightObjectSchema,
  EpisodeBaseSchema,
  EpisodeRestrictionObjectSchema,
  ErrorObjectSchema,
  ExternalUrlObjectSchema,
  ImageObjectSchema,
  PagingObjectSchema,
  PagingSimplifiedEpisodeObjectSchema,
  ResumePointObjectSchema,
  ShowBaseSchema,
  ShowObjectSchema,
  SimplifiedEpisodeObjectSchema,
  SimplifiedShowObjectSchema,
} from '../../components/schemas'
import { ShowsModel } from './model'

export const shows = new Elysia()
  .model({
    CopyrightObject: CopyrightObjectSchema,
    EpisodeBase: EpisodeBaseSchema,
    EpisodeRestrictionObject: EpisodeRestrictionObjectSchema,
    ErrorObject: ErrorObjectSchema,
    ExternalUrlObject: ExternalUrlObjectSchema,
    ImageObject: ImageObjectSchema,
    PagingObject: PagingObjectSchema,
    PagingSimplifiedEpisodeObject: PagingSimplifiedEpisodeObjectSchema,
    ResumePointObject: ResumePointObjectSchema,
    ShowBase: ShowBaseSchema,
    ShowObject: ShowObjectSchema,
    SimplifiedEpisodeObject: SimplifiedEpisodeObjectSchema,
    SimplifiedShowObject: SimplifiedShowObjectSchema,
  })
  .get('/shows/:id', ({ params, query }) => { throw new Error('Not implemented') }, {
    params: ShowsModel.getAShowParams,
    query: ShowsModel.getAShowQuery,
    response: {
      200: 'ShowObject',
      401: ShowsModel.getAShowResponse401,
      403: ShowsModel.getAShowResponse403,
      429: ShowsModel.getAShowResponse429,
    },
    detail: {
      tags: ['Shows'],
      summary: 'Get Show\n',
      description:
        'Get Spotify catalog information for a single show identified by its\nunique Spotify ID.\n',
      operationId: 'get-a-show',
      security: [{ oauth_2_0: ['user-read-playback-position'] }],
    },
  })
  .get('/shows', ({ query }) => { throw new Error('Not implemented') }, {
    query: ShowsModel.getMultipleShowsQuery,
    response: {
      200: ShowsModel.getMultipleShowsResponse200,
      401: ShowsModel.getMultipleShowsResponse401,
      403: ShowsModel.getMultipleShowsResponse403,
      429: ShowsModel.getMultipleShowsResponse429,
    },
    detail: {
      tags: ['Shows'],
      summary: 'Get Several Shows\n',
      description:
        'Get Spotify catalog information for several shows based on their Spotify IDs.\n',
      operationId: 'get-multiple-shows',
      security: [{ oauth_2_0: [] }],
    },
  })
  .get('/shows/:id/episodes', ({ params, query }) => { throw new Error('Not implemented') }, {
    params: ShowsModel.getAShowsEpisodesParams,
    query: ShowsModel.getAShowsEpisodesQuery,
    response: {
      200: 'PagingSimplifiedEpisodeObject',
      401: ShowsModel.getAShowsEpisodesResponse401,
      403: ShowsModel.getAShowsEpisodesResponse403,
      429: ShowsModel.getAShowsEpisodesResponse429,
    },
    detail: {
      tags: ['Shows', 'Episodes'],
      summary: 'Get Show Episodes\n',
      description:
        'Get Spotify catalog information about an show’s episodes. Optional parameters can be used to limit the number of episodes returned.\n',
      operationId: 'get-a-shows-episodes',
      security: [{ oauth_2_0: ['user-read-playback-position'] }],
    },
  })
