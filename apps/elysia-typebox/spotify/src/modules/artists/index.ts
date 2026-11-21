import { Elysia } from 'elysia'
import {
  AlbumBaseSchema,
  AlbumRestrictionObjectSchema,
  ArtistDiscographyAlbumObjectSchema,
  ArtistObjectSchema,
  ErrorObjectSchema,
  ExternalIdObjectSchema,
  ExternalUrlObjectSchema,
  FollowersObjectSchema,
  ImageObjectSchema,
  LinkedTrackObjectSchema,
  PagingArtistDiscographyAlbumObjectSchema,
  PagingObjectSchema,
  SimplifiedAlbumObjectSchema,
  SimplifiedArtistObjectSchema,
  TrackObjectSchema,
  TrackRestrictionObjectSchema,
} from '../../components/schemas'
import { ArtistsModel } from './model'

export const artists = new Elysia()
  .model({
    AlbumBase: AlbumBaseSchema,
    AlbumRestrictionObject: AlbumRestrictionObjectSchema,
    ArtistDiscographyAlbumObject: ArtistDiscographyAlbumObjectSchema,
    ArtistObject: ArtistObjectSchema,
    ErrorObject: ErrorObjectSchema,
    ExternalIdObject: ExternalIdObjectSchema,
    ExternalUrlObject: ExternalUrlObjectSchema,
    FollowersObject: FollowersObjectSchema,
    ImageObject: ImageObjectSchema,
    LinkedTrackObject: LinkedTrackObjectSchema,
    PagingArtistDiscographyAlbumObject: PagingArtistDiscographyAlbumObjectSchema,
    PagingObject: PagingObjectSchema,
    SimplifiedAlbumObject: SimplifiedAlbumObjectSchema,
    SimplifiedArtistObject: SimplifiedArtistObjectSchema,
    TrackObject: TrackObjectSchema,
    TrackRestrictionObject: TrackRestrictionObjectSchema,
  })
  .get('/artists/:id', ({ params }) => { throw new Error('Not implemented') }, {
    params: ArtistsModel.getAnArtistParams,
    response: {
      200: 'ArtistObject',
      401: ArtistsModel.getAnArtistResponse401,
      403: ArtistsModel.getAnArtistResponse403,
      429: ArtistsModel.getAnArtistResponse429,
    },
    detail: {
      tags: ['Artists'],
      summary: 'Get Artist\n',
      description:
        'Get Spotify catalog information for a single artist identified by their unique Spotify ID.\n',
      operationId: 'get-an-artist',
      security: [{ oauth_2_0: [] }],
    },
  })
  .get('/artists', ({ query }) => { throw new Error('Not implemented') }, {
    query: ArtistsModel.getMultipleArtistsQuery,
    response: {
      200: ArtistsModel.getMultipleArtistsResponse200,
      401: ArtistsModel.getMultipleArtistsResponse401,
      403: ArtistsModel.getMultipleArtistsResponse403,
      429: ArtistsModel.getMultipleArtistsResponse429,
    },
    detail: {
      tags: ['Artists'],
      summary: 'Get Several Artists\n',
      description:
        'Get Spotify catalog information for several artists based on their Spotify IDs.\n',
      operationId: 'get-multiple-artists',
      security: [{ oauth_2_0: [] }],
    },
  })
  .get('/artists/:id/albums', ({ params, query }) => { throw new Error('Not implemented') }, {
    params: ArtistsModel.getAnArtistsAlbumsParams,
    query: ArtistsModel.getAnArtistsAlbumsQuery,
    response: {
      200: 'PagingArtistDiscographyAlbumObject',
      401: ArtistsModel.getAnArtistsAlbumsResponse401,
      403: ArtistsModel.getAnArtistsAlbumsResponse403,
      429: ArtistsModel.getAnArtistsAlbumsResponse429,
    },
    detail: {
      tags: ['Artists', 'Albums'],
      summary: "Get Artist's Albums\n",
      description: "Get Spotify catalog information about an artist's albums.\n",
      operationId: 'get-an-artists-albums',
      security: [{ oauth_2_0: [] }],
    },
  })
  .get('/artists/:id/top-tracks', ({ params, query }) => { throw new Error('Not implemented') }, {
    params: ArtistsModel.getAnArtistsTopTracksParams,
    query: ArtistsModel.getAnArtistsTopTracksQuery,
    response: {
      200: ArtistsModel.getAnArtistsTopTracksResponse200,
      401: ArtistsModel.getAnArtistsTopTracksResponse401,
      403: ArtistsModel.getAnArtistsTopTracksResponse403,
      429: ArtistsModel.getAnArtistsTopTracksResponse429,
    },
    detail: {
      tags: ['Artists', 'Tracks'],
      summary: "Get Artist's Top Tracks\n",
      description: "Get Spotify catalog information about an artist's top tracks by country.\n",
      operationId: 'get-an-artists-top-tracks',
      security: [{ oauth_2_0: [] }],
    },
  })
  .get('/artists/:id/related-artists', ({ params }) => { throw new Error('Not implemented') }, {
    params: ArtistsModel.getAnArtistsRelatedArtistsParams,
    response: {
      200: ArtistsModel.getAnArtistsRelatedArtistsResponse200,
      401: ArtistsModel.getAnArtistsRelatedArtistsResponse401,
      403: ArtistsModel.getAnArtistsRelatedArtistsResponse403,
      429: ArtistsModel.getAnArtistsRelatedArtistsResponse429,
    },
    detail: {
      tags: ['Artists'],
      summary: "Get Artist's Related Artists\n",
      description:
        "Get Spotify catalog information about artists similar to a given artist. Similarity is based on analysis of the Spotify community's listening history.\n",
      operationId: 'get-an-artists-related-artists',
      security: [{ oauth_2_0: [] }],
    },
  })
