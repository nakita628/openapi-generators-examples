import { Elysia } from 'elysia'
import {
  AlbumBaseSchema,
  AlbumRestrictionObjectSchema,
  CategoryObjectSchema,
  ErrorObjectSchema,
  ExternalUrlObjectSchema,
  ImageObjectSchema,
  PagingFeaturedPlaylistObjectSchema,
  PagingObjectSchema,
  PagingPlaylistObjectSchema,
  PagingSimplifiedAlbumObjectSchema,
  PlaylistOwnerObjectSchema,
  PlaylistTracksRefObjectSchema,
  PlaylistUserObjectSchema,
  SimplifiedAlbumObjectSchema,
  SimplifiedArtistObjectSchema,
  SimplifiedPlaylistObjectSchema,
} from '../../components/schemas'
import { BrowseModel } from './model'

export const browse = new Elysia()
  .model({
    AlbumBase: AlbumBaseSchema,
    AlbumRestrictionObject: AlbumRestrictionObjectSchema,
    CategoryObject: CategoryObjectSchema,
    ErrorObject: ErrorObjectSchema,
    ExternalUrlObject: ExternalUrlObjectSchema,
    ImageObject: ImageObjectSchema,
    PagingFeaturedPlaylistObject: PagingFeaturedPlaylistObjectSchema,
    PagingObject: PagingObjectSchema,
    PagingPlaylistObject: PagingPlaylistObjectSchema,
    PagingSimplifiedAlbumObject: PagingSimplifiedAlbumObjectSchema,
    PlaylistOwnerObject: PlaylistOwnerObjectSchema,
    PlaylistTracksRefObject: PlaylistTracksRefObjectSchema,
    PlaylistUserObject: PlaylistUserObjectSchema,
    SimplifiedAlbumObject: SimplifiedAlbumObjectSchema,
    SimplifiedArtistObject: SimplifiedArtistObjectSchema,
    SimplifiedPlaylistObject: SimplifiedPlaylistObjectSchema,
  })
  .get('/browse/featured-playlists', ({ query }) => { throw new Error('Not implemented') }, {
    query: BrowseModel.getFeaturedPlaylistsQuery,
    response: {
      200: 'PagingFeaturedPlaylistObject',
      401: BrowseModel.getFeaturedPlaylistsResponse401,
      403: BrowseModel.getFeaturedPlaylistsResponse403,
      429: BrowseModel.getFeaturedPlaylistsResponse429,
    },
    detail: {
      tags: ['Playlists'],
      summary: 'Get Featured Playlists\n',
      description:
        "Get a list of Spotify featured playlists (shown, for example, on a Spotify player's 'Browse' tab).\n",
      operationId: 'get-featured-playlists',
      security: [{ oauth_2_0: [] }],
    },
  })
  .get('/browse/categories', ({ query }) => { throw new Error('Not implemented') }, {
    query: BrowseModel.getCategoriesQuery,
    response: {
      200: BrowseModel.getCategoriesResponse200,
      401: BrowseModel.getCategoriesResponse401,
      403: BrowseModel.getCategoriesResponse403,
      429: BrowseModel.getCategoriesResponse429,
    },
    detail: {
      tags: ['Categories'],
      summary: 'Get Several Browse Categories\n',
      description:
        'Get a list of categories used to tag items in Spotify (on, for example, the Spotify player’s “Browse” tab).\n',
      operationId: 'get-categories',
      security: [{ oauth_2_0: [] }],
    },
  })
  .get('/browse/categories/:category_id', ({ params, query }) => { throw new Error('Not implemented') }, {
    params: BrowseModel.getACategoryParams,
    query: BrowseModel.getACategoryQuery,
    response: {
      200: 'CategoryObject',
      401: BrowseModel.getACategoryResponse401,
      403: BrowseModel.getACategoryResponse403,
      429: BrowseModel.getACategoryResponse429,
    },
    detail: {
      tags: ['Categories'],
      summary: 'Get Single Browse Category\n',
      description:
        'Get a single category used to tag items in Spotify (on, for example, the Spotify player’s “Browse” tab).\n',
      operationId: 'get-a-category',
      security: [{ oauth_2_0: [] }],
    },
  })
  .get('/browse/categories/:category_id/playlists', ({ params, query }) => { throw new Error('Not implemented') }, {
    params: BrowseModel.getACategoriesPlaylistsParams,
    query: BrowseModel.getACategoriesPlaylistsQuery,
    response: {
      200: 'PagingFeaturedPlaylistObject',
      401: BrowseModel.getACategoriesPlaylistsResponse401,
      403: BrowseModel.getACategoriesPlaylistsResponse403,
      429: BrowseModel.getACategoriesPlaylistsResponse429,
    },
    detail: {
      tags: ['Playlists', 'Categories'],
      summary: "Get Category's Playlists\n",
      description: 'Get a list of Spotify playlists tagged with a particular category.\n',
      operationId: 'get-a-categories-playlists',
      security: [{ oauth_2_0: [] }],
    },
  })
  .get('/browse/new-releases', ({ query }) => { throw new Error('Not implemented') }, {
    query: BrowseModel.getNewReleasesQuery,
    response: {
      200: BrowseModel.getNewReleasesResponse200,
      401: BrowseModel.getNewReleasesResponse401,
      403: BrowseModel.getNewReleasesResponse403,
      429: BrowseModel.getNewReleasesResponse429,
    },
    detail: {
      tags: ['Albums'],
      summary: 'Get New Releases\n',
      description:
        'Get a list of new album releases featured in Spotify (shown, for example, on a Spotify player’s “Browse” tab).\n',
      operationId: 'get-new-releases',
      security: [{ oauth_2_0: [] }],
    },
  })
