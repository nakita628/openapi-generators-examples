import { Elysia, t } from 'elysia'
import {
  AlbumBaseSchema,
  AlbumRestrictionObjectSchema,
  CopyrightObjectSchema,
  EpisodeBaseSchema,
  EpisodeObjectSchema,
  EpisodeRestrictionObjectSchema,
  ErrorObjectSchema,
  ExternalIdObjectSchema,
  ExternalUrlObjectSchema,
  FollowersObjectSchema,
  ImageObjectSchema,
  LinkedTrackObjectSchema,
  PagingObjectSchema,
  PagingPlaylistTrackObjectSchema,
  PlaylistObjectSchema,
  PlaylistOwnerObjectSchema,
  PlaylistTrackObjectSchema,
  PlaylistUserObjectSchema,
  ResumePointObjectSchema,
  ShowBaseSchema,
  SimplifiedAlbumObjectSchema,
  SimplifiedArtistObjectSchema,
  SimplifiedShowObjectSchema,
  TrackObjectSchema,
  TrackRestrictionObjectSchema,
} from '../../components/schemas'
import { PlaylistsModel } from './model'

export const playlists = new Elysia()
  .model({
    AlbumBase: AlbumBaseSchema,
    AlbumRestrictionObject: AlbumRestrictionObjectSchema,
    CopyrightObject: CopyrightObjectSchema,
    EpisodeBase: EpisodeBaseSchema,
    EpisodeObject: EpisodeObjectSchema,
    EpisodeRestrictionObject: EpisodeRestrictionObjectSchema,
    ErrorObject: ErrorObjectSchema,
    ExternalIdObject: ExternalIdObjectSchema,
    ExternalUrlObject: ExternalUrlObjectSchema,
    FollowersObject: FollowersObjectSchema,
    ImageObject: ImageObjectSchema,
    LinkedTrackObject: LinkedTrackObjectSchema,
    PagingObject: PagingObjectSchema,
    PagingPlaylistTrackObject: PagingPlaylistTrackObjectSchema,
    PlaylistObject: PlaylistObjectSchema,
    PlaylistOwnerObject: PlaylistOwnerObjectSchema,
    PlaylistTrackObject: PlaylistTrackObjectSchema,
    PlaylistUserObject: PlaylistUserObjectSchema,
    ResumePointObject: ResumePointObjectSchema,
    ShowBase: ShowBaseSchema,
    SimplifiedAlbumObject: SimplifiedAlbumObjectSchema,
    SimplifiedArtistObject: SimplifiedArtistObjectSchema,
    SimplifiedShowObject: SimplifiedShowObjectSchema,
    TrackObject: TrackObjectSchema,
    TrackRestrictionObject: TrackRestrictionObjectSchema,
  })
  .get('/playlists/:playlist_id', ({ params, query }) => { throw new Error('Not implemented') }, {
    params: PlaylistsModel.getPlaylistParams,
    query: PlaylistsModel.getPlaylistQuery,
    response: {
      200: 'PlaylistObject',
      401: PlaylistsModel.getPlaylistResponse401,
      403: PlaylistsModel.getPlaylistResponse403,
      429: PlaylistsModel.getPlaylistResponse429,
    },
    detail: {
      tags: ['Playlists'],
      summary: 'Get Playlist\n',
      description: 'Get a playlist owned by a Spotify user.\n',
      operationId: 'get-playlist',
      security: [{ oauth_2_0: [] }],
    },
  })
  .put('/playlists/:playlist_id', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: PlaylistsModel.changePlaylistDetailsParams,
    body: PlaylistsModel.changePlaylistDetailsBody,
    response: {
      200: t.Void(),
      401: PlaylistsModel.changePlaylistDetailsResponse401,
      403: PlaylistsModel.changePlaylistDetailsResponse403,
      429: PlaylistsModel.changePlaylistDetailsResponse429,
    },
    detail: {
      tags: ['Playlists', 'Library'],
      summary: 'Change Playlist Details\n',
      description:
        "Change a playlist's name and public/private state. (The user must, of\ncourse, own the playlist.)\n",
      operationId: 'change-playlist-details',
      security: [{ oauth_2_0: ['playlist-modify-public', 'playlist-modify-private'] }],
    },
  })
  .get('/playlists/:playlist_id/tracks', ({ params, query }) => { throw new Error('Not implemented') }, {
    params: PlaylistsModel.getPlaylistsTracksParams,
    query: PlaylistsModel.getPlaylistsTracksQuery,
    response: {
      200: 'PagingPlaylistTrackObject',
      401: PlaylistsModel.getPlaylistsTracksResponse401,
      403: PlaylistsModel.getPlaylistsTracksResponse403,
      429: PlaylistsModel.getPlaylistsTracksResponse429,
    },
    detail: {
      tags: ['Playlists', 'Tracks'],
      summary: 'Get Playlist Items [DEPRECATED]\n',
      description:
        '**Deprecated:** Use [Get Playlist Items](/documentation/web-api/reference/get-playlists-items) instead.\n\nGet full details of the items of a playlist owned by a Spotify user.\n',
      operationId: 'get-playlists-tracks',
      security: [{ oauth_2_0: ['playlist-read-private'] }],
    },
  })
  .put('/playlists/:playlist_id/tracks', ({ params, query, body }) => { throw new Error('Not implemented') }, {
    params: PlaylistsModel.reorderOrReplacePlaylistsTracksParams,
    query: PlaylistsModel.reorderOrReplacePlaylistsTracksQuery,
    body: PlaylistsModel.reorderOrReplacePlaylistsTracksBody,
    response: {
      200: PlaylistsModel.reorderOrReplacePlaylistsTracksResponse200,
      401: PlaylistsModel.reorderOrReplacePlaylistsTracksResponse401,
      403: PlaylistsModel.reorderOrReplacePlaylistsTracksResponse403,
      429: PlaylistsModel.reorderOrReplacePlaylistsTracksResponse429,
    },
    detail: {
      tags: ['Playlists', 'Tracks'],
      summary: 'Update Playlist Items [DEPRECATED]\n',
      description:
        "**Deprecated:** Use [Update Playlist Items](/documentation/web-api/reference/reorder-or-replace-playlists-items) instead.\n\nEither reorder or replace items in a playlist depending on the request's parameters.\nTo reorder items, include `range_start`, `insert_before`, `range_length` and `snapshot_id` in the request's body.\nTo replace items, include `uris` as either a query parameter or in the request's body.\nReplacing items in a playlist will overwrite its existing items. This operation can be used for replacing or clearing items in a playlist.\n<br/>\n**Note**: Replace and reorder are mutually exclusive operations which share the same endpoint, but have different parameters.\nThese operations can't be applied together in a single request.\n",
      operationId: 'reorder-or-replace-playlists-tracks',
      security: [{ oauth_2_0: ['playlist-modify-public', 'playlist-modify-private'] }],
    },
  })
  .post('/playlists/:playlist_id/tracks', ({ params, query, body }) => { throw new Error('Not implemented') }, {
    params: PlaylistsModel.addTracksToPlaylistParams,
    query: PlaylistsModel.addTracksToPlaylistQuery,
    body: PlaylistsModel.addTracksToPlaylistBody,
    response: {
      201: PlaylistsModel.addTracksToPlaylistResponse201,
      401: PlaylistsModel.addTracksToPlaylistResponse401,
      403: PlaylistsModel.addTracksToPlaylistResponse403,
      429: PlaylistsModel.addTracksToPlaylistResponse429,
    },
    detail: {
      tags: ['Playlists', 'Tracks'],
      summary: 'Add Items to Playlist [DEPRECATED]\n',
      description:
        "**Deprecated:** Use [Add Items to Playlist](/documentation/web-api/reference/add-items-to-playlist) instead.\n\nAdd one or more items to a user's playlist.\n",
      operationId: 'add-tracks-to-playlist',
      security: [{ oauth_2_0: ['playlist-modify-public', 'playlist-modify-private'] }],
    },
  })
  .delete('/playlists/:playlist_id/tracks', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: PlaylistsModel.removeTracksPlaylistParams,
    body: PlaylistsModel.removeTracksPlaylistBody,
    response: {
      200: PlaylistsModel.removeTracksPlaylistResponse200,
      401: PlaylistsModel.removeTracksPlaylistResponse401,
      403: PlaylistsModel.removeTracksPlaylistResponse403,
      429: PlaylistsModel.removeTracksPlaylistResponse429,
    },
    detail: {
      tags: ['Playlists', 'Tracks'],
      summary: 'Remove Playlist Items [DEPRECATED]\n',
      description:
        "**Deprecated:** Use [Remove Playlist Items](/documentation/web-api/reference/remove-items-playlist) instead.\n\nRemove one or more items from a user's playlist.\n",
      operationId: 'remove-tracks-playlist',
      security: [{ oauth_2_0: ['playlist-modify-public', 'playlist-modify-private'] }],
    },
  })
  .get('/playlists/:playlist_id/items', ({ params, query }) => { throw new Error('Not implemented') }, {
    params: PlaylistsModel.getPlaylistsItemsParams,
    query: PlaylistsModel.getPlaylistsItemsQuery,
    response: {
      200: 'PagingPlaylistTrackObject',
      401: PlaylistsModel.getPlaylistsItemsResponse401,
      403: PlaylistsModel.getPlaylistsItemsResponse403,
      429: PlaylistsModel.getPlaylistsItemsResponse429,
    },
    detail: {
      tags: ['Playlists', 'Tracks'],
      summary: 'Get Playlist Items\n',
      description:
        'Get full details of the items of a playlist owned by a Spotify user.\n\n**Note**: This endpoint is only accessible for playlists owned by the current user or playlists the user is a collaborator of. A `403 Forbidden` status code will be returned if the user is neither the owner nor a collaborator of the playlist.\n',
      operationId: 'get-playlists-items',
      security: [{ oauth_2_0: ['playlist-read-private'] }],
    },
  })
  .put('/playlists/:playlist_id/items', ({ params, query, body }) => { throw new Error('Not implemented') }, {
    params: PlaylistsModel.reorderOrReplacePlaylistsItemsParams,
    query: PlaylistsModel.reorderOrReplacePlaylistsItemsQuery,
    body: PlaylistsModel.reorderOrReplacePlaylistsItemsBody,
    response: {
      200: PlaylistsModel.reorderOrReplacePlaylistsItemsResponse200,
      401: PlaylistsModel.reorderOrReplacePlaylistsItemsResponse401,
      403: PlaylistsModel.reorderOrReplacePlaylistsItemsResponse403,
      429: PlaylistsModel.reorderOrReplacePlaylistsItemsResponse429,
    },
    detail: {
      tags: ['Playlists', 'Tracks'],
      summary: 'Update Playlist Items\n',
      description:
        "Either reorder or replace items in a playlist depending on the request's parameters.\nTo reorder items, include `range_start`, `insert_before`, `range_length` and `snapshot_id` in the request's body.\nTo replace items, include `uris` as either a query parameter or in the request's body.\nReplacing items in a playlist will overwrite its existing items. This operation can be used for replacing or clearing items in a playlist.\n<br/>\n**Note**: Replace and reorder are mutually exclusive operations which share the same endpoint, but have different parameters.\nThese operations can't be applied together in a single request.\n",
      operationId: 'reorder-or-replace-playlists-items',
      security: [{ oauth_2_0: ['playlist-modify-public', 'playlist-modify-private'] }],
    },
  })
  .post('/playlists/:playlist_id/items', ({ params, query, body }) => { throw new Error('Not implemented') }, {
    params: PlaylistsModel.addItemsToPlaylistParams,
    query: PlaylistsModel.addItemsToPlaylistQuery,
    body: PlaylistsModel.addItemsToPlaylistBody,
    response: {
      201: PlaylistsModel.addItemsToPlaylistResponse201,
      401: PlaylistsModel.addItemsToPlaylistResponse401,
      403: PlaylistsModel.addItemsToPlaylistResponse403,
      429: PlaylistsModel.addItemsToPlaylistResponse429,
    },
    detail: {
      tags: ['Playlists', 'Tracks'],
      summary: 'Add Items to Playlist\n',
      description: "Add one or more items to a user's playlist.\n",
      operationId: 'add-items-to-playlist',
      security: [{ oauth_2_0: ['playlist-modify-public', 'playlist-modify-private'] }],
    },
  })
  .delete('/playlists/:playlist_id/items', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: PlaylistsModel.removeItemsPlaylistParams,
    body: PlaylistsModel.removeItemsPlaylistBody,
    response: {
      200: PlaylistsModel.removeItemsPlaylistResponse200,
      401: PlaylistsModel.removeItemsPlaylistResponse401,
      403: PlaylistsModel.removeItemsPlaylistResponse403,
      429: PlaylistsModel.removeItemsPlaylistResponse429,
    },
    detail: {
      tags: ['Playlists', 'Tracks'],
      summary: 'Remove Playlist Items\n',
      description: "Remove one or more items from a user's playlist.\n",
      operationId: 'remove-items-playlist',
      security: [{ oauth_2_0: ['playlist-modify-public', 'playlist-modify-private'] }],
    },
  })
  .put('/playlists/:playlist_id/followers', ({ params, body }) => { throw new Error('Not implemented') }, {
    params: PlaylistsModel.followPlaylistParams,
    body: PlaylistsModel.followPlaylistBody,
    response: {
      200: t.Void(),
      401: PlaylistsModel.followPlaylistResponse401,
      403: PlaylistsModel.followPlaylistResponse403,
      429: PlaylistsModel.followPlaylistResponse429,
    },
    detail: {
      tags: ['Users', 'Playlists'],
      summary: 'Follow Playlist\n',
      description:
        'Add the current user as a follower of a playlist.\n\n**Note:** This endpoint is deprecated. Use [Save Items to Library](/documentation/web-api/reference/save-library-items) instead.\n',
      operationId: 'follow-playlist',
      security: [{ oauth_2_0: ['playlist-modify-public', 'playlist-modify-private'] }],
    },
  })
  .delete('/playlists/:playlist_id/followers', ({ params }) => { throw new Error('Not implemented') }, {
    params: PlaylistsModel.unfollowPlaylistParams,
    response: {
      200: t.Void(),
      401: PlaylistsModel.unfollowPlaylistResponse401,
      403: PlaylistsModel.unfollowPlaylistResponse403,
      429: PlaylistsModel.unfollowPlaylistResponse429,
    },
    detail: {
      tags: ['Users', 'Playlists'],
      summary: 'Unfollow Playlist\n',
      description:
        'Remove the current user as a follower of a playlist.\n\n**Note:** This endpoint is deprecated. Use [Remove Items from Library](/documentation/web-api/reference/remove-library-items) instead.\n',
      operationId: 'unfollow-playlist',
      security: [{ oauth_2_0: ['playlist-modify-public', 'playlist-modify-private'] }],
    },
  })
  .get('/playlists/:playlist_id/images', ({ params }) => { throw new Error('Not implemented') }, {
    params: PlaylistsModel.getPlaylistCoverParams,
    response: {
      200: PlaylistsModel.getPlaylistCoverResponse200,
      401: PlaylistsModel.getPlaylistCoverResponse401,
      403: PlaylistsModel.getPlaylistCoverResponse403,
      429: PlaylistsModel.getPlaylistCoverResponse429,
    },
    detail: {
      tags: ['Playlists'],
      summary: 'Get Playlist Cover Image\n',
      description: 'Get the current image associated with a specific playlist.\n',
      operationId: 'get-playlist-cover',
      security: [{ oauth_2_0: [] }],
    },
  })
  .put('/playlists/:playlist_id/images', ({ params }) => { throw new Error('Not implemented') }, {
    params: PlaylistsModel.uploadCustomPlaylistCoverParams,
    response: {
      202: t.Void(),
      401: PlaylistsModel.uploadCustomPlaylistCoverResponse401,
      403: PlaylistsModel.uploadCustomPlaylistCoverResponse403,
      429: PlaylistsModel.uploadCustomPlaylistCoverResponse429,
    },
    detail: {
      tags: ['Playlists'],
      summary: 'Add Custom Playlist Cover Image\n',
      description: 'Replace the image used to represent a specific playlist.\n',
      operationId: 'upload-custom-playlist-cover',
      security: [
        { oauth_2_0: ['ugc-image-upload', 'playlist-modify-public', 'playlist-modify-private'] },
      ],
    },
  })
  .get('/playlists/:playlist_id/followers/contains', ({ params, query }) => { throw new Error('Not implemented') }, {
    params: PlaylistsModel.checkIfUserFollowsPlaylistParams,
    query: PlaylistsModel.checkIfUserFollowsPlaylistQuery,
    response: {
      200: PlaylistsModel.checkIfUserFollowsPlaylistResponse200,
      401: PlaylistsModel.checkIfUserFollowsPlaylistResponse401,
      403: PlaylistsModel.checkIfUserFollowsPlaylistResponse403,
      429: PlaylistsModel.checkIfUserFollowsPlaylistResponse429,
    },
    detail: {
      tags: ['Users', 'Playlists'],
      summary: 'Check if Current User Follows Playlist\n',
      description:
        "Check to see if the current user is following a specified playlist.\n\n**Note:** This endpoint is deprecated. Use [Check User's Saved Items](/documentation/web-api/reference/check-library-contains) instead.\n",
      operationId: 'check-if-user-follows-playlist',
      security: [{ oauth_2_0: [] }],
    },
  })
