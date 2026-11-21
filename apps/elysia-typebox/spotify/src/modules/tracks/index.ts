import { Elysia } from 'elysia'
import {
  AlbumBaseSchema,
  AlbumRestrictionObjectSchema,
  ErrorObjectSchema,
  ExternalIdObjectSchema,
  ExternalUrlObjectSchema,
  ImageObjectSchema,
  LinkedTrackObjectSchema,
  SimplifiedAlbumObjectSchema,
  SimplifiedArtistObjectSchema,
  TrackObjectSchema,
  TrackRestrictionObjectSchema,
} from '../../components/schemas'
import { TracksModel } from './model'

export const tracks = new Elysia()
  .model({
    AlbumBase: AlbumBaseSchema,
    AlbumRestrictionObject: AlbumRestrictionObjectSchema,
    ErrorObject: ErrorObjectSchema,
    ExternalIdObject: ExternalIdObjectSchema,
    ExternalUrlObject: ExternalUrlObjectSchema,
    ImageObject: ImageObjectSchema,
    LinkedTrackObject: LinkedTrackObjectSchema,
    SimplifiedAlbumObject: SimplifiedAlbumObjectSchema,
    SimplifiedArtistObject: SimplifiedArtistObjectSchema,
    TrackObject: TrackObjectSchema,
    TrackRestrictionObject: TrackRestrictionObjectSchema,
  })
  .get('/tracks/:id', ({ params, query }) => {}, {
    params: TracksModel.getTrackParams,
    query: TracksModel.getTrackQuery,
    response: {
      200: 'TrackObject',
      401: TracksModel.getTrackResponse401,
      403: TracksModel.getTrackResponse403,
      429: TracksModel.getTrackResponse429,
    },
    detail: {
      tags: ['Tracks'],
      summary: 'Get Track\n',
      description:
        'Get Spotify catalog information for a single track identified by its\nunique Spotify ID.\n',
      operationId: 'get-track',
      security: [{ oauth_2_0: [] }],
    },
  })
  .get('/tracks', ({ query }) => {}, {
    query: TracksModel.getSeveralTracksQuery,
    response: {
      200: TracksModel.getSeveralTracksResponse200,
      401: TracksModel.getSeveralTracksResponse401,
      403: TracksModel.getSeveralTracksResponse403,
      429: TracksModel.getSeveralTracksResponse429,
    },
    detail: {
      tags: ['Tracks'],
      summary: 'Get Several Tracks\n',
      description:
        'Get Spotify catalog information for multiple tracks based on their Spotify IDs.\n',
      operationId: 'get-several-tracks',
      security: [{ oauth_2_0: [] }],
    },
  })
