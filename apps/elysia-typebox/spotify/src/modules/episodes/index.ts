import { Elysia } from 'elysia'
import {
  CopyrightObjectSchema,
  EpisodeBaseSchema,
  EpisodeObjectSchema,
  EpisodeRestrictionObjectSchema,
  ErrorObjectSchema,
  ExternalUrlObjectSchema,
  ImageObjectSchema,
  ResumePointObjectSchema,
  ShowBaseSchema,
  SimplifiedShowObjectSchema,
} from '../../components/schemas'
import { EpisodesModel } from './model'

export const episodes = new Elysia()
  .model({
    CopyrightObject: CopyrightObjectSchema,
    EpisodeBase: EpisodeBaseSchema,
    EpisodeObject: EpisodeObjectSchema,
    EpisodeRestrictionObject: EpisodeRestrictionObjectSchema,
    ErrorObject: ErrorObjectSchema,
    ExternalUrlObject: ExternalUrlObjectSchema,
    ImageObject: ImageObjectSchema,
    ResumePointObject: ResumePointObjectSchema,
    ShowBase: ShowBaseSchema,
    SimplifiedShowObject: SimplifiedShowObjectSchema,
  })
  .get('/episodes/:id', ({ params, query }) => { throw new Error('Not implemented') }, {
    params: EpisodesModel.getAnEpisodeParams,
    query: EpisodesModel.getAnEpisodeQuery,
    response: {
      200: 'EpisodeObject',
      401: EpisodesModel.getAnEpisodeResponse401,
      403: EpisodesModel.getAnEpisodeResponse403,
      429: EpisodesModel.getAnEpisodeResponse429,
    },
    detail: {
      tags: ['Episodes'],
      summary: 'Get Episode\n',
      description:
        'Get Spotify catalog information for a single episode identified by its\nunique Spotify ID.\n',
      operationId: 'get-an-episode',
      security: [{ oauth_2_0: ['user-read-playback-position'] }],
    },
  })
  .get('/episodes', ({ query }) => { throw new Error('Not implemented') }, {
    query: EpisodesModel.getMultipleEpisodesQuery,
    response: {
      200: EpisodesModel.getMultipleEpisodesResponse200,
      401: EpisodesModel.getMultipleEpisodesResponse401,
      403: EpisodesModel.getMultipleEpisodesResponse403,
      429: EpisodesModel.getMultipleEpisodesResponse429,
    },
    detail: {
      tags: ['Episodes'],
      summary: 'Get Several Episodes\n',
      description:
        'Get Spotify catalog information for several episodes based on their Spotify IDs.\n',
      operationId: 'get-multiple-episodes',
      security: [{ oauth_2_0: ['user-read-playback-position'] }],
    },
  })
