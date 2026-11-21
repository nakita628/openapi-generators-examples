import { Elysia } from 'elysia'
import {
  AlbumBaseSchema,
  AlbumObjectSchema,
  AlbumRestrictionObjectSchema,
  CopyrightObjectSchema,
  ErrorObjectSchema,
  ExternalIdObjectSchema,
  ExternalUrlObjectSchema,
  ImageObjectSchema,
  LinkedTrackObjectSchema,
  PagingObjectSchema,
  PagingSimplifiedTrackObjectSchema,
  SimplifiedArtistObjectSchema,
  SimplifiedTrackObjectSchema,
  TrackRestrictionObjectSchema,
} from '../../components/schemas'
import { AlbumsModel } from './model'

export const albums = new Elysia()
  .model({
    AlbumBase: AlbumBaseSchema,
    AlbumObject: AlbumObjectSchema,
    AlbumRestrictionObject: AlbumRestrictionObjectSchema,
    CopyrightObject: CopyrightObjectSchema,
    ErrorObject: ErrorObjectSchema,
    ExternalIdObject: ExternalIdObjectSchema,
    ExternalUrlObject: ExternalUrlObjectSchema,
    ImageObject: ImageObjectSchema,
    LinkedTrackObject: LinkedTrackObjectSchema,
    PagingObject: PagingObjectSchema,
    PagingSimplifiedTrackObject: PagingSimplifiedTrackObjectSchema,
    SimplifiedArtistObject: SimplifiedArtistObjectSchema,
    SimplifiedTrackObject: SimplifiedTrackObjectSchema,
    TrackRestrictionObject: TrackRestrictionObjectSchema,
  })
  .get('/albums/:id', ({ params, query }) => {}, {
    params: AlbumsModel.getAnAlbumParams,
    query: AlbumsModel.getAnAlbumQuery,
    response: {
      200: 'AlbumObject',
      401: AlbumsModel.getAnAlbumResponse401,
      403: AlbumsModel.getAnAlbumResponse403,
      429: AlbumsModel.getAnAlbumResponse429,
    },
    detail: {
      tags: ['Albums'],
      summary: 'Get Album\n',
      description: 'Get Spotify catalog information for a single album.\n',
      operationId: 'get-an-album',
      security: [{ oauth_2_0: [] }],
    },
  })
  .get('/albums', ({ query }) => {}, {
    query: AlbumsModel.getMultipleAlbumsQuery,
    response: {
      200: AlbumsModel.getMultipleAlbumsResponse200,
      401: AlbumsModel.getMultipleAlbumsResponse401,
      403: AlbumsModel.getMultipleAlbumsResponse403,
      429: AlbumsModel.getMultipleAlbumsResponse429,
    },
    detail: {
      tags: ['Albums'],
      summary: 'Get Several Albums\n',
      description:
        'Get Spotify catalog information for multiple albums identified by their Spotify IDs.\n',
      operationId: 'get-multiple-albums',
      security: [{ oauth_2_0: [] }],
    },
  })
  .get('/albums/:id/tracks', ({ params, query }) => {}, {
    params: AlbumsModel.getAnAlbumsTracksParams,
    query: AlbumsModel.getAnAlbumsTracksQuery,
    response: {
      200: 'PagingSimplifiedTrackObject',
      401: AlbumsModel.getAnAlbumsTracksResponse401,
      403: AlbumsModel.getAnAlbumsTracksResponse403,
      429: AlbumsModel.getAnAlbumsTracksResponse429,
    },
    detail: {
      tags: ['Albums', 'Tracks'],
      summary: 'Get Album Tracks\n',
      description:
        'Get Spotify catalog information about an album’s tracks.\nOptional parameters can be used to limit the number of tracks returned.\n',
      operationId: 'get-an-albums-tracks',
      security: [{ oauth_2_0: [] }],
    },
  })
