import { Elysia, t } from 'elysia'
import {
  AlbumBaseSchema,
  AlbumObjectSchema,
  AlbumRestrictionObjectSchema,
  ArtistObjectSchema,
  AudiobookBaseSchema,
  AudiobookObjectSchema,
  AuthorObjectSchema,
  ChapterBaseSchema,
  ChapterRestrictionObjectSchema,
  ContextObjectSchema,
  CopyrightObjectSchema,
  CurrentlyPlayingContextObjectSchema,
  CurrentlyPlayingObjectSchema,
  CursorObjectSchema,
  CursorPagingObjectSchema,
  CursorPagingPlayHistoryObjectSchema,
  CursorPagingSimplifiedArtistObjectSchema,
  DeviceObjectSchema,
  DisallowsObjectSchema,
  EpisodeBaseSchema,
  EpisodeObjectSchema,
  EpisodeRestrictionObjectSchema,
  ErrorObjectSchema,
  ExplicitContentSettingsObjectSchema,
  ExternalIdObjectSchema,
  ExternalUrlObjectSchema,
  FollowersObjectSchema,
  ImageObjectSchema,
  LinkedTrackObjectSchema,
  NarratorObjectSchema,
  PagingArtistObjectSchema,
  PagingObjectSchema,
  PagingPlaylistObjectSchema,
  PagingPlaylistTrackObjectSchema,
  PagingSavedAlbumObjectSchema,
  PagingSavedAudiobookObjectSchema,
  PagingSavedEpisodeObjectSchema,
  PagingSavedShowObjectSchema,
  PagingSavedTrackObjectSchema,
  PagingSimplifiedChapterObjectSchema,
  PagingSimplifiedTrackObjectSchema,
  PagingTrackObjectSchema,
  PlayHistoryObjectSchema,
  PlaylistObjectSchema,
  PlaylistOwnerObjectSchema,
  PlaylistTrackObjectSchema,
  PlaylistTracksRefObjectSchema,
  PlaylistUserObjectSchema,
  PrivateUserObjectSchema,
  QueueObjectSchema,
  ResumePointObjectSchema,
  SavedAlbumObjectSchema,
  SavedAudiobookObjectSchema,
  SavedEpisodeObjectSchema,
  SavedShowObjectSchema,
  SavedTrackObjectSchema,
  ShowBaseSchema,
  SimplifiedAlbumObjectSchema,
  SimplifiedArtistObjectSchema,
  SimplifiedChapterObjectSchema,
  SimplifiedPlaylistObjectSchema,
  SimplifiedShowObjectSchema,
  SimplifiedTrackObjectSchema,
  TrackObjectSchema,
  TrackRestrictionObjectSchema,
} from '../../components/schemas'
import { MeModel } from './model'

export const me = new Elysia()
  .model({
    AlbumBase: AlbumBaseSchema,
    AlbumObject: AlbumObjectSchema,
    AlbumRestrictionObject: AlbumRestrictionObjectSchema,
    ArtistObject: ArtistObjectSchema,
    AudiobookBase: AudiobookBaseSchema,
    AudiobookObject: AudiobookObjectSchema,
    AuthorObject: AuthorObjectSchema,
    ChapterBase: ChapterBaseSchema,
    ChapterRestrictionObject: ChapterRestrictionObjectSchema,
    ContextObject: ContextObjectSchema,
    CopyrightObject: CopyrightObjectSchema,
    CurrentlyPlayingContextObject: CurrentlyPlayingContextObjectSchema,
    CurrentlyPlayingObject: CurrentlyPlayingObjectSchema,
    CursorObject: CursorObjectSchema,
    CursorPagingObject: CursorPagingObjectSchema,
    CursorPagingPlayHistoryObject: CursorPagingPlayHistoryObjectSchema,
    CursorPagingSimplifiedArtistObject: CursorPagingSimplifiedArtistObjectSchema,
    DeviceObject: DeviceObjectSchema,
    DisallowsObject: DisallowsObjectSchema,
    EpisodeBase: EpisodeBaseSchema,
    EpisodeObject: EpisodeObjectSchema,
    EpisodeRestrictionObject: EpisodeRestrictionObjectSchema,
    ErrorObject: ErrorObjectSchema,
    ExplicitContentSettingsObject: ExplicitContentSettingsObjectSchema,
    ExternalIdObject: ExternalIdObjectSchema,
    ExternalUrlObject: ExternalUrlObjectSchema,
    FollowersObject: FollowersObjectSchema,
    ImageObject: ImageObjectSchema,
    LinkedTrackObject: LinkedTrackObjectSchema,
    NarratorObject: NarratorObjectSchema,
    PagingArtistObject: PagingArtistObjectSchema,
    PagingObject: PagingObjectSchema,
    PagingPlaylistObject: PagingPlaylistObjectSchema,
    PagingPlaylistTrackObject: PagingPlaylistTrackObjectSchema,
    PagingSavedAlbumObject: PagingSavedAlbumObjectSchema,
    PagingSavedAudiobookObject: PagingSavedAudiobookObjectSchema,
    PagingSavedEpisodeObject: PagingSavedEpisodeObjectSchema,
    PagingSavedShowObject: PagingSavedShowObjectSchema,
    PagingSavedTrackObject: PagingSavedTrackObjectSchema,
    PagingSimplifiedChapterObject: PagingSimplifiedChapterObjectSchema,
    PagingSimplifiedTrackObject: PagingSimplifiedTrackObjectSchema,
    PagingTrackObject: PagingTrackObjectSchema,
    PlayHistoryObject: PlayHistoryObjectSchema,
    PlaylistObject: PlaylistObjectSchema,
    PlaylistOwnerObject: PlaylistOwnerObjectSchema,
    PlaylistTrackObject: PlaylistTrackObjectSchema,
    PlaylistTracksRefObject: PlaylistTracksRefObjectSchema,
    PlaylistUserObject: PlaylistUserObjectSchema,
    PrivateUserObject: PrivateUserObjectSchema,
    QueueObject: QueueObjectSchema,
    ResumePointObject: ResumePointObjectSchema,
    SavedAlbumObject: SavedAlbumObjectSchema,
    SavedAudiobookObject: SavedAudiobookObjectSchema,
    SavedEpisodeObject: SavedEpisodeObjectSchema,
    SavedShowObject: SavedShowObjectSchema,
    SavedTrackObject: SavedTrackObjectSchema,
    ShowBase: ShowBaseSchema,
    SimplifiedAlbumObject: SimplifiedAlbumObjectSchema,
    SimplifiedArtistObject: SimplifiedArtistObjectSchema,
    SimplifiedChapterObject: SimplifiedChapterObjectSchema,
    SimplifiedPlaylistObject: SimplifiedPlaylistObjectSchema,
    SimplifiedShowObject: SimplifiedShowObjectSchema,
    SimplifiedTrackObject: SimplifiedTrackObjectSchema,
    TrackObject: TrackObjectSchema,
    TrackRestrictionObject: TrackRestrictionObjectSchema,
  })
  .get('/me/audiobooks', ({ query }) => { throw new Error('Not implemented') }, {
    query: MeModel.getUsersSavedAudiobooksQuery,
    response: {
      200: 'PagingSavedAudiobookObject',
      401: MeModel.getUsersSavedAudiobooksResponse401,
      403: MeModel.getUsersSavedAudiobooksResponse403,
      429: MeModel.getUsersSavedAudiobooksResponse429,
    },
    detail: {
      tags: ['Audiobooks', 'Library'],
      summary: "Get User's Saved Audiobooks\n",
      description:
        "Get a list of the audiobooks saved in the current Spotify user's 'Your Music' library.\n",
      operationId: 'get-users-saved-audiobooks',
      security: [{ oauth_2_0: ['user-library-read'] }],
    },
  })
  .put('/me/audiobooks', ({ query }) => { throw new Error('Not implemented') }, {
    query: MeModel.saveAudiobooksUserQuery,
    response: {
      200: t.Void(),
      401: MeModel.saveAudiobooksUserResponse401,
      403: MeModel.saveAudiobooksUserResponse403,
      429: MeModel.saveAudiobooksUserResponse429,
    },
    detail: {
      tags: ['Audiobooks', 'Library'],
      summary: 'Save Audiobooks for Current User\n',
      description:
        "Save one or more audiobooks to the current Spotify user's library.\n\n**Note:** This endpoint is deprecated. Use [Save Items to Library](/documentation/web-api/reference/save-library-items) instead.\n",
      operationId: 'save-audiobooks-user',
      security: [{ oauth_2_0: ['user-library-modify'] }],
    },
  })
  .delete('/me/audiobooks', ({ query }) => { throw new Error('Not implemented') }, {
    query: MeModel.removeAudiobooksUserQuery,
    response: {
      200: t.Void(),
      401: MeModel.removeAudiobooksUserResponse401,
      403: MeModel.removeAudiobooksUserResponse403,
      429: MeModel.removeAudiobooksUserResponse429,
    },
    detail: {
      tags: ['Audiobooks', 'Library'],
      summary: "Remove User's Saved Audiobooks\n",
      description:
        "Remove one or more audiobooks from the Spotify user's library.\n\n**Note:** This endpoint is deprecated. Use [Remove Items from Library](/documentation/web-api/reference/remove-library-items) instead.\n",
      operationId: 'remove-audiobooks-user',
      security: [{ oauth_2_0: ['user-library-modify'] }],
    },
  })
  .get('/me/audiobooks/contains', ({ query }) => { throw new Error('Not implemented') }, {
    query: MeModel.checkUsersSavedAudiobooksQuery,
    response: {
      200: MeModel.checkUsersSavedAudiobooksResponse200,
      401: MeModel.checkUsersSavedAudiobooksResponse401,
      403: MeModel.checkUsersSavedAudiobooksResponse403,
      429: MeModel.checkUsersSavedAudiobooksResponse429,
    },
    detail: {
      tags: ['Audiobooks', 'Library'],
      summary: "Check User's Saved Audiobooks\n",
      description:
        "Check if one or more audiobooks are already saved in the current Spotify user's library.\n\n**Note:** This endpoint is deprecated. Use [Check User's Saved Items](/documentation/web-api/reference/check-library-contains) instead.\n",
      operationId: 'check-users-saved-audiobooks',
      security: [{ oauth_2_0: ['user-library-read'] }],
    },
  })
  .get('/me', () => { throw new Error('Not implemented') }, {
    response: {
      200: 'PrivateUserObject',
      401: MeModel.getCurrentUsersProfileResponse401,
      403: MeModel.getCurrentUsersProfileResponse403,
      429: MeModel.getCurrentUsersProfileResponse429,
    },
    detail: {
      tags: ['Users'],
      summary: "Get Current User's Profile\n",
      description:
        "Get detailed profile information about the current user (including the\ncurrent user's username).\n",
      operationId: 'get-current-users-profile',
      security: [{ oauth_2_0: ['user-read-private', 'user-read-email'] }],
    },
  })
  .get('/me/playlists', ({ query }) => { throw new Error('Not implemented') }, {
    query: MeModel.getAListOfCurrentUsersPlaylistsQuery,
    response: {
      200: 'PagingPlaylistObject',
      401: MeModel.getAListOfCurrentUsersPlaylistsResponse401,
      403: MeModel.getAListOfCurrentUsersPlaylistsResponse403,
      429: MeModel.getAListOfCurrentUsersPlaylistsResponse429,
    },
    detail: {
      tags: ['Playlists', 'Library'],
      summary: "Get Current User's Playlists\n",
      description: 'Get a list of the playlists owned or followed by the current Spotify\nuser.\n',
      operationId: 'get-a-list-of-current-users-playlists',
      security: [{ oauth_2_0: ['playlist-read-private'] }],
    },
  })
  .post('/me/playlists', ({ body }) => { throw new Error('Not implemented') }, {
    body: MeModel.createPlaylistBody,
    response: {
      201: 'PlaylistObject',
      401: MeModel.createPlaylistResponse401,
      403: MeModel.createPlaylistResponse403,
      429: MeModel.createPlaylistResponse429,
    },
    detail: {
      tags: ['Playlists', 'Library'],
      summary: 'Create Playlist\n',
      description:
        'Create a playlist for the current Spotify user. (The playlist will be empty until\nyou [add tracks](/documentation/web-api/reference/add-tracks-to-playlist).)\nEach user is generally limited to a maximum of 11000 playlists.\n',
      operationId: 'create-playlist',
      security: [{ oauth_2_0: ['playlist-modify-public', 'playlist-modify-private'] }],
    },
  })
  .put('/me/library', ({ query }) => { throw new Error('Not implemented') }, {
    query: MeModel.saveLibraryItemsQuery,
    response: {
      200: t.Void(),
      400: 'ErrorObject',
      401: MeModel.saveLibraryItemsResponse401,
      403: MeModel.saveLibraryItemsResponse403,
      429: MeModel.saveLibraryItemsResponse429,
    },
    detail: {
      tags: ['Library'],
      summary: 'Save Items to Library\n',
      description:
        "Add one or more items to the current user's library. Accepts Spotify URIs for tracks, albums, episodes, shows, audiobooks, users, and playlists.\n",
      operationId: 'save-library-items',
      security: [
        { oauth_2_0: ['user-library-modify', 'user-follow-modify', 'playlist-modify-public'] },
      ],
    },
  })
  .delete('/me/library', ({ query }) => { throw new Error('Not implemented') }, {
    query: MeModel.removeLibraryItemsQuery,
    response: {
      200: t.Void(),
      400: 'ErrorObject',
      401: MeModel.removeLibraryItemsResponse401,
      403: MeModel.removeLibraryItemsResponse403,
      429: MeModel.removeLibraryItemsResponse429,
    },
    detail: {
      tags: ['Library'],
      summary: 'Remove Items from Library\n',
      description:
        "Remove one or more items from the current user's library. Accepts Spotify URIs for tracks, albums, episodes, shows, audiobooks, users, and playlists.\n",
      operationId: 'remove-library-items',
      security: [
        { oauth_2_0: ['user-library-modify', 'user-follow-modify', 'playlist-modify-public'] },
      ],
    },
  })
  .get('/me/library/contains', ({ query }) => { throw new Error('Not implemented') }, {
    query: MeModel.checkLibraryContainsQuery,
    response: {
      200: MeModel.checkLibraryContainsResponse200,
      400: 'ErrorObject',
      401: MeModel.checkLibraryContainsResponse401,
      403: MeModel.checkLibraryContainsResponse403,
      429: MeModel.checkLibraryContainsResponse429,
    },
    detail: {
      tags: ['Library'],
      summary: "Check User's Saved Items\n",
      description:
        "Check if one or more items are already saved in the current user's library. Accepts Spotify URIs for tracks, albums, episodes, shows, audiobooks, artists, users, and playlists.\n",
      operationId: 'check-library-contains',
      security: [{ oauth_2_0: ['user-library-read', 'user-follow-read', 'playlist-read-private'] }],
    },
  })
  .get('/me/albums', ({ query }) => { throw new Error('Not implemented') }, {
    query: MeModel.getUsersSavedAlbumsQuery,
    response: {
      200: 'PagingSavedAlbumObject',
      401: MeModel.getUsersSavedAlbumsResponse401,
      403: MeModel.getUsersSavedAlbumsResponse403,
      429: MeModel.getUsersSavedAlbumsResponse429,
    },
    detail: {
      tags: ['Albums', 'Library'],
      summary: "Get User's Saved Albums\n",
      description:
        "Get a list of the albums saved in the current Spotify user's 'Your Music' library.\n",
      operationId: 'get-users-saved-albums',
      security: [{ oauth_2_0: ['user-library-read'] }],
    },
  })
  .put('/me/albums', ({ query, body }) => { throw new Error('Not implemented') }, {
    query: MeModel.saveAlbumsUserQuery,
    body: MeModel.saveAlbumsUserBody,
    response: {
      200: t.Void(),
      401: MeModel.saveAlbumsUserResponse401,
      403: MeModel.saveAlbumsUserResponse403,
      429: MeModel.saveAlbumsUserResponse429,
    },
    detail: {
      tags: ['Albums', 'Library'],
      summary: 'Save Albums for Current User\n',
      description:
        "Save one or more albums to the current user's 'Your Music' library.\n\n**Note:** This endpoint is deprecated. Use [Save Items to Library](/documentation/web-api/reference/save-library-items) instead.\n",
      operationId: 'save-albums-user',
      security: [{ oauth_2_0: ['user-library-modify'] }],
    },
  })
  .delete('/me/albums', ({ query, body }) => { throw new Error('Not implemented') }, {
    query: MeModel.removeAlbumsUserQuery,
    body: MeModel.removeAlbumsUserBody,
    response: {
      200: t.Void(),
      401: MeModel.removeAlbumsUserResponse401,
      403: MeModel.removeAlbumsUserResponse403,
      429: MeModel.removeAlbumsUserResponse429,
    },
    detail: {
      tags: ['Albums', 'Library'],
      summary: "Remove Users' Saved Albums\n",
      description:
        "Remove one or more albums from the current user's 'Your Music' library.\n\n**Note:** This endpoint is deprecated. Use [Remove Items from Library](/documentation/web-api/reference/remove-library-items) instead.\n",
      operationId: 'remove-albums-user',
      security: [{ oauth_2_0: ['user-library-modify'] }],
    },
  })
  .get('/me/albums/contains', ({ query }) => { throw new Error('Not implemented') }, {
    query: MeModel.checkUsersSavedAlbumsQuery,
    response: {
      200: MeModel.checkUsersSavedAlbumsResponse200,
      401: MeModel.checkUsersSavedAlbumsResponse401,
      403: MeModel.checkUsersSavedAlbumsResponse403,
      429: MeModel.checkUsersSavedAlbumsResponse429,
    },
    detail: {
      tags: ['Albums', 'Library'],
      summary: "Check User's Saved Albums\n",
      description:
        "Check if one or more albums is already saved in the current Spotify user's 'Your Music' library.\n\n**Note:** This endpoint is deprecated. Use [Check User's Saved Items](/documentation/web-api/reference/check-library-contains) instead.\n",
      operationId: 'check-users-saved-albums',
      security: [{ oauth_2_0: ['user-library-read'] }],
    },
  })
  .get('/me/tracks', ({ query }) => { throw new Error('Not implemented') }, {
    query: MeModel.getUsersSavedTracksQuery,
    response: {
      200: 'PagingSavedTrackObject',
      401: MeModel.getUsersSavedTracksResponse401,
      403: MeModel.getUsersSavedTracksResponse403,
      429: MeModel.getUsersSavedTracksResponse429,
    },
    detail: {
      tags: ['Tracks', 'Library'],
      summary: "Get User's Saved Tracks\n",
      description:
        "Get a list of the songs saved in the current Spotify user's 'Your Music' library.\n",
      operationId: 'get-users-saved-tracks',
      security: [{ oauth_2_0: ['user-library-read'] }],
    },
  })
  .put('/me/tracks', ({ body }) => { throw new Error('Not implemented') }, {
    body: MeModel.saveTracksUserBody,
    response: {
      200: t.Void(),
      401: MeModel.saveTracksUserResponse401,
      403: MeModel.saveTracksUserResponse403,
      429: MeModel.saveTracksUserResponse429,
    },
    detail: {
      tags: ['Tracks', 'Library'],
      summary: 'Save Tracks for Current User\n',
      description:
        "Save one or more tracks to the current user's 'Your Music' library.\n\n**Note:** This endpoint is deprecated. Use [Save Items to Library](/documentation/web-api/reference/save-library-items) instead.\n",
      operationId: 'save-tracks-user',
      security: [{ oauth_2_0: ['user-library-modify'] }],
    },
  })
  .delete('/me/tracks', ({ query, body }) => { throw new Error('Not implemented') }, {
    query: MeModel.removeTracksUserQuery,
    body: MeModel.removeTracksUserBody,
    response: {
      200: t.Void(),
      401: MeModel.removeTracksUserResponse401,
      403: MeModel.removeTracksUserResponse403,
      429: MeModel.removeTracksUserResponse429,
    },
    detail: {
      tags: ['Tracks', 'Library'],
      summary: "Remove User's Saved Tracks\n",
      description:
        "Remove one or more tracks from the current user's 'Your Music' library.\n\n**Note:** This endpoint is deprecated. Use [Remove Items from Library](/documentation/web-api/reference/remove-library-items) instead.\n",
      operationId: 'remove-tracks-user',
      security: [{ oauth_2_0: ['user-library-modify'] }],
    },
  })
  .get('/me/tracks/contains', ({ query }) => { throw new Error('Not implemented') }, {
    query: MeModel.checkUsersSavedTracksQuery,
    response: {
      200: MeModel.checkUsersSavedTracksResponse200,
      401: MeModel.checkUsersSavedTracksResponse401,
      403: MeModel.checkUsersSavedTracksResponse403,
      429: MeModel.checkUsersSavedTracksResponse429,
    },
    detail: {
      tags: ['Tracks', 'Library'],
      summary: "Check User's Saved Tracks\n",
      description:
        "Check if one or more tracks is already saved in the current Spotify user's 'Your Music' library.\n\n**Note:** This endpoint is deprecated. Use [Check User's Saved Items](/documentation/web-api/reference/check-library-contains) instead.\n",
      operationId: 'check-users-saved-tracks',
      security: [{ oauth_2_0: ['user-library-read'] }],
    },
  })
  .get('/me/episodes', ({ query }) => { throw new Error('Not implemented') }, {
    query: MeModel.getUsersSavedEpisodesQuery,
    response: {
      200: 'PagingSavedEpisodeObject',
      401: MeModel.getUsersSavedEpisodesResponse401,
      403: MeModel.getUsersSavedEpisodesResponse403,
      429: MeModel.getUsersSavedEpisodesResponse429,
    },
    detail: {
      tags: ['Episodes', 'Library'],
      summary: "Get User's Saved Episodes\n",
      description: "Get a list of the episodes saved in the current Spotify user's library.\n",
      operationId: 'get-users-saved-episodes',
      security: [{ oauth_2_0: ['user-library-read', 'user-read-playback-position'] }],
    },
  })
  .put('/me/episodes', ({ query, body }) => { throw new Error('Not implemented') }, {
    query: MeModel.saveEpisodesUserQuery,
    body: MeModel.saveEpisodesUserBody,
    response: {
      200: t.Void(),
      401: MeModel.saveEpisodesUserResponse401,
      403: MeModel.saveEpisodesUserResponse403,
      429: MeModel.saveEpisodesUserResponse429,
    },
    detail: {
      tags: ['Episodes', 'Library'],
      summary: 'Save Episodes for Current User\n',
      description:
        "Save one or more episodes to the current user's library.\n\n**Note:** This endpoint is deprecated. Use [Save Items to Library](/documentation/web-api/reference/save-library-items) instead.\n",
      operationId: 'save-episodes-user',
      security: [{ oauth_2_0: ['user-library-modify'] }],
    },
  })
  .delete('/me/episodes', ({ query, body }) => { throw new Error('Not implemented') }, {
    query: MeModel.removeEpisodesUserQuery,
    body: MeModel.removeEpisodesUserBody,
    response: {
      200: t.Void(),
      401: MeModel.removeEpisodesUserResponse401,
      403: MeModel.removeEpisodesUserResponse403,
      429: MeModel.removeEpisodesUserResponse429,
    },
    detail: {
      tags: ['Episodes', 'Library'],
      summary: "Remove User's Saved Episodes\n",
      description:
        "Remove one or more episodes from the current user's library.\n\n**Note:** This endpoint is deprecated. Use [Remove Items from Library](/documentation/web-api/reference/remove-library-items) instead.\n",
      operationId: 'remove-episodes-user',
      security: [{ oauth_2_0: ['user-library-modify'] }],
    },
  })
  .get('/me/episodes/contains', ({ query }) => { throw new Error('Not implemented') }, {
    query: MeModel.checkUsersSavedEpisodesQuery,
    response: {
      200: MeModel.checkUsersSavedEpisodesResponse200,
      401: MeModel.checkUsersSavedEpisodesResponse401,
      403: MeModel.checkUsersSavedEpisodesResponse403,
      429: MeModel.checkUsersSavedEpisodesResponse429,
    },
    detail: {
      tags: ['Episodes', 'Library'],
      summary: "Check User's Saved Episodes\n",
      description:
        "Check if one or more episodes is already saved in the current Spotify user's 'Your Episodes' library.\n\n**Note:** This endpoint is deprecated. Use [Check User's Saved Items](/documentation/web-api/reference/check-library-contains) instead.\n",
      operationId: 'check-users-saved-episodes',
      security: [{ oauth_2_0: ['user-library-read'] }],
    },
  })
  .get('/me/shows', ({ query }) => { throw new Error('Not implemented') }, {
    query: MeModel.getUsersSavedShowsQuery,
    response: {
      200: 'PagingSavedShowObject',
      401: MeModel.getUsersSavedShowsResponse401,
      403: MeModel.getUsersSavedShowsResponse403,
      429: MeModel.getUsersSavedShowsResponse429,
    },
    detail: {
      tags: ['Shows', 'Library'],
      summary: "Get User's Saved Shows\n",
      description:
        "Get a list of shows saved in the current Spotify user's library. Optional parameters can be used to limit the number of shows returned.\n",
      operationId: 'get-users-saved-shows',
      security: [{ oauth_2_0: ['user-library-read'] }],
    },
  })
  .put('/me/shows', ({ query, body }) => { throw new Error('Not implemented') }, {
    query: MeModel.saveShowsUserQuery,
    body: MeModel.saveShowsUserBody,
    response: {
      200: t.Void(),
      401: MeModel.saveShowsUserResponse401,
      403: MeModel.saveShowsUserResponse403,
      429: MeModel.saveShowsUserResponse429,
    },
    detail: {
      tags: ['Shows', 'Library'],
      summary: 'Save Shows for Current User\n',
      description:
        "Save one or more shows to current Spotify user's library.\n\n**Note:** This endpoint is deprecated. Use [Save Items to Library](/documentation/web-api/reference/save-library-items) instead.\n",
      operationId: 'save-shows-user',
      security: [{ oauth_2_0: ['user-library-modify'] }],
    },
  })
  .delete('/me/shows', ({ query, body }) => { throw new Error('Not implemented') }, {
    query: MeModel.removeShowsUserQuery,
    body: MeModel.removeShowsUserBody,
    response: {
      200: t.Void(),
      401: MeModel.removeShowsUserResponse401,
      403: MeModel.removeShowsUserResponse403,
      429: MeModel.removeShowsUserResponse429,
    },
    detail: {
      tags: ['Shows', 'Library'],
      summary: "Remove User's Saved Shows\n",
      description:
        "Delete one or more shows from current Spotify user's library.\n\n**Note:** This endpoint is deprecated. Use [Remove Items from Library](/documentation/web-api/reference/remove-library-items) instead.\n",
      operationId: 'remove-shows-user',
      security: [{ oauth_2_0: ['user-library-modify'] }],
    },
  })
  .get('/me/shows/contains', ({ query }) => { throw new Error('Not implemented') }, {
    query: MeModel.checkUsersSavedShowsQuery,
    response: {
      200: MeModel.checkUsersSavedShowsResponse200,
      401: MeModel.checkUsersSavedShowsResponse401,
      403: MeModel.checkUsersSavedShowsResponse403,
      429: MeModel.checkUsersSavedShowsResponse429,
    },
    detail: {
      tags: ['Shows', 'Library'],
      summary: "Check User's Saved Shows\n",
      description:
        "Check if one or more shows is already saved in the current Spotify user's library.\n\n**Note:** This endpoint is deprecated. Use [Check User's Saved Items](/documentation/web-api/reference/check-library-contains) instead.\n",
      operationId: 'check-users-saved-shows',
      security: [{ oauth_2_0: ['user-library-read'] }],
    },
  })
  .get('/me/following', ({ query }) => { throw new Error('Not implemented') }, {
    query: MeModel.getFollowedQuery,
    response: {
      200: MeModel.getFollowedResponse200,
      401: MeModel.getFollowedResponse401,
      403: MeModel.getFollowedResponse403,
      429: MeModel.getFollowedResponse429,
    },
    detail: {
      tags: ['Users', 'Library', 'Artists'],
      summary: 'Get Followed Artists\n',
      description: "Get the current user's followed artists.\n",
      operationId: 'get-followed',
      security: [{ oauth_2_0: ['user-follow-read'] }],
    },
  })
  .put('/me/following', ({ query, body }) => { throw new Error('Not implemented') }, {
    query: MeModel.followArtistsUsersQuery,
    body: MeModel.followArtistsUsersBody,
    response: {
      204: t.Void(),
      401: MeModel.followArtistsUsersResponse401,
      403: MeModel.followArtistsUsersResponse403,
      429: MeModel.followArtistsUsersResponse429,
    },
    detail: {
      tags: ['Users', 'Artists', 'Library'],
      summary: 'Follow Artists or Users\n',
      description:
        'Add the current user as a follower of one or more artists or other Spotify users.\n\n**Note:** This endpoint is deprecated. Use [Save Items to Library](/documentation/web-api/reference/save-library-items) instead.\n',
      operationId: 'follow-artists-users',
      security: [{ oauth_2_0: ['user-follow-modify'] }],
    },
  })
  .delete('/me/following', ({ query, body }) => { throw new Error('Not implemented') }, {
    query: MeModel.unfollowArtistsUsersQuery,
    body: MeModel.unfollowArtistsUsersBody,
    response: {
      204: t.Void(),
      401: MeModel.unfollowArtistsUsersResponse401,
      403: MeModel.unfollowArtistsUsersResponse403,
      429: MeModel.unfollowArtistsUsersResponse429,
    },
    detail: {
      tags: ['Users', 'Artists', 'Library'],
      summary: 'Unfollow Artists or Users\n',
      description:
        'Remove the current user as a follower of one or more artists or other Spotify users.\n\n**Note:** This endpoint is deprecated. Use [Remove Items from Library](/documentation/web-api/reference/remove-library-items) instead.\n',
      operationId: 'unfollow-artists-users',
      security: [{ oauth_2_0: ['user-follow-modify'] }],
    },
  })
  .get('/me/following/contains', ({ query }) => { throw new Error('Not implemented') }, {
    query: MeModel.checkCurrentUserFollowsQuery,
    response: {
      200: MeModel.checkCurrentUserFollowsResponse200,
      401: MeModel.checkCurrentUserFollowsResponse401,
      403: MeModel.checkCurrentUserFollowsResponse403,
      429: MeModel.checkCurrentUserFollowsResponse429,
    },
    detail: {
      tags: ['Users', 'Artists', 'Library'],
      summary: 'Check If User Follows Artists or Users\n',
      description:
        "Check to see if the current user is following one or more artists or other Spotify users.\n\n**Note:** This endpoint is deprecated. Use [Check User's Saved Items](/documentation/web-api/reference/check-library-contains) instead.\n",
      operationId: 'check-current-user-follows',
      security: [{ oauth_2_0: ['user-follow-read'] }],
    },
  })
  .get('/me/player', ({ query }) => { throw new Error('Not implemented') }, {
    query: MeModel.getInformationAboutTheUsersCurrentPlaybackQuery,
    response: {
      200: 'CurrentlyPlayingContextObject',
      204: t.Void(),
      401: MeModel.getInformationAboutTheUsersCurrentPlaybackResponse401,
      403: MeModel.getInformationAboutTheUsersCurrentPlaybackResponse403,
      429: MeModel.getInformationAboutTheUsersCurrentPlaybackResponse429,
    },
    detail: {
      tags: ['Player'],
      summary: 'Get Playback State\n',
      description:
        'Get information about the user’s current playback state, including track or episode, progress, and active device.\n',
      operationId: 'get-information-about-the-users-current-playback',
      security: [{ oauth_2_0: ['user-read-playback-state'] }],
    },
  })
  .put('/me/player', ({ body }) => { throw new Error('Not implemented') }, {
    body: MeModel.transferAUsersPlaybackBody,
    response: {
      204: t.Void(),
      401: MeModel.transferAUsersPlaybackResponse401,
      403: MeModel.transferAUsersPlaybackResponse403,
      429: MeModel.transferAUsersPlaybackResponse429,
    },
    detail: {
      tags: ['Player'],
      summary: 'Transfer Playback\n',
      description:
        'Transfer playback to a new device and optionally begin playback. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.\n',
      operationId: 'transfer-a-users-playback',
      security: [{ oauth_2_0: ['user-modify-playback-state'] }],
    },
  })
  .get('/me/player/devices', () => { throw new Error('Not implemented') }, {
    response: {
      200: MeModel.getAUsersAvailableDevicesResponse200,
      401: MeModel.getAUsersAvailableDevicesResponse401,
      403: MeModel.getAUsersAvailableDevicesResponse403,
      429: MeModel.getAUsersAvailableDevicesResponse429,
    },
    detail: {
      tags: ['Player'],
      summary: 'Get Available Devices\n',
      description:
        'Get information about a user’s available Spotify Connect devices. Some device models are not supported and will not be listed in the API response.\n',
      operationId: 'get-a-users-available-devices',
      security: [{ oauth_2_0: ['user-read-playback-state'] }],
    },
  })
  .get('/me/player/currently-playing', ({ query }) => { throw new Error('Not implemented') }, {
    query: MeModel.getTheUsersCurrentlyPlayingTrackQuery,
    response: {
      200: 'CurrentlyPlayingObject',
      401: MeModel.getTheUsersCurrentlyPlayingTrackResponse401,
      403: MeModel.getTheUsersCurrentlyPlayingTrackResponse403,
      429: MeModel.getTheUsersCurrentlyPlayingTrackResponse429,
    },
    detail: {
      tags: ['Player'],
      summary: 'Get Currently Playing Track\n',
      description: "Get the object currently being played on the user's Spotify account.\n",
      operationId: 'get-the-users-currently-playing-track',
      security: [{ oauth_2_0: ['user-read-currently-playing'] }],
    },
  })
  .put('/me/player/play', ({ query, body }) => { throw new Error('Not implemented') }, {
    query: MeModel.startAUsersPlaybackQuery,
    body: MeModel.startAUsersPlaybackBody,
    response: {
      204: t.Void(),
      401: MeModel.startAUsersPlaybackResponse401,
      403: MeModel.startAUsersPlaybackResponse403,
      429: MeModel.startAUsersPlaybackResponse429,
    },
    detail: {
      tags: ['Player'],
      summary: 'Start/Resume Playback\n',
      description:
        "Start a new context or resume current playback on the user's active device. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.\n",
      operationId: 'start-a-users-playback',
      security: [{ oauth_2_0: ['user-modify-playback-state'] }],
    },
  })
  .put('/me/player/pause', ({ query }) => { throw new Error('Not implemented') }, {
    query: MeModel.pauseAUsersPlaybackQuery,
    response: {
      204: t.Void(),
      401: MeModel.pauseAUsersPlaybackResponse401,
      403: MeModel.pauseAUsersPlaybackResponse403,
      429: MeModel.pauseAUsersPlaybackResponse429,
    },
    detail: {
      tags: ['Player'],
      summary: 'Pause Playback\n',
      description:
        "Pause playback on the user's account. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.\n",
      operationId: 'pause-a-users-playback',
      security: [{ oauth_2_0: ['user-modify-playback-state'] }],
    },
  })
  .post('/me/player/next', ({ query }) => { throw new Error('Not implemented') }, {
    query: MeModel.skipUsersPlaybackToNextTrackQuery,
    response: {
      204: t.Void(),
      401: MeModel.skipUsersPlaybackToNextTrackResponse401,
      403: MeModel.skipUsersPlaybackToNextTrackResponse403,
      429: MeModel.skipUsersPlaybackToNextTrackResponse429,
    },
    detail: {
      tags: ['Player'],
      summary: 'Skip To Next\n',
      description:
        'Skips to next track in the user’s queue. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.\n',
      operationId: 'skip-users-playback-to-next-track',
      security: [{ oauth_2_0: ['user-modify-playback-state'] }],
    },
  })
  .post('/me/player/previous', ({ query }) => { throw new Error('Not implemented') }, {
    query: MeModel.skipUsersPlaybackToPreviousTrackQuery,
    response: {
      204: t.Void(),
      401: MeModel.skipUsersPlaybackToPreviousTrackResponse401,
      403: MeModel.skipUsersPlaybackToPreviousTrackResponse403,
      429: MeModel.skipUsersPlaybackToPreviousTrackResponse429,
    },
    detail: {
      tags: ['Player'],
      summary: 'Skip To Previous\n',
      description:
        'Skips to previous track in the user’s queue. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.\n',
      operationId: 'skip-users-playback-to-previous-track',
      security: [{ oauth_2_0: ['user-modify-playback-state'] }],
    },
  })
  .put('/me/player/seek', ({ query }) => { throw new Error('Not implemented') }, {
    query: MeModel.seekToPositionInCurrentlyPlayingTrackQuery,
    response: {
      204: t.Void(),
      401: MeModel.seekToPositionInCurrentlyPlayingTrackResponse401,
      403: MeModel.seekToPositionInCurrentlyPlayingTrackResponse403,
      429: MeModel.seekToPositionInCurrentlyPlayingTrackResponse429,
    },
    detail: {
      tags: ['Player'],
      summary: 'Seek To Position\n',
      description:
        'Seeks to the given position in the user’s currently playing track. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.\n',
      operationId: 'seek-to-position-in-currently-playing-track',
      security: [{ oauth_2_0: ['user-modify-playback-state'] }],
    },
  })
  .put('/me/player/repeat', ({ query }) => { throw new Error('Not implemented') }, {
    query: MeModel.setRepeatModeOnUsersPlaybackQuery,
    response: {
      204: t.Void(),
      401: MeModel.setRepeatModeOnUsersPlaybackResponse401,
      403: MeModel.setRepeatModeOnUsersPlaybackResponse403,
      429: MeModel.setRepeatModeOnUsersPlaybackResponse429,
    },
    detail: {
      tags: ['Player'],
      summary: 'Set Repeat Mode\n',
      description:
        "Set the repeat mode for the user's playback. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.\n",
      operationId: 'set-repeat-mode-on-users-playback',
      security: [{ oauth_2_0: ['user-modify-playback-state'] }],
    },
  })
  .put('/me/player/volume', ({ query }) => { throw new Error('Not implemented') }, {
    query: MeModel.setVolumeForUsersPlaybackQuery,
    response: {
      204: t.Void(),
      401: MeModel.setVolumeForUsersPlaybackResponse401,
      403: MeModel.setVolumeForUsersPlaybackResponse403,
      429: MeModel.setVolumeForUsersPlaybackResponse429,
    },
    detail: {
      tags: ['Player'],
      summary: 'Set Playback Volume\n',
      description:
        'Set the volume for the user’s current playback device. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.\n',
      operationId: 'set-volume-for-users-playback',
      security: [{ oauth_2_0: ['user-modify-playback-state'] }],
    },
  })
  .put('/me/player/shuffle', ({ query }) => { throw new Error('Not implemented') }, {
    query: MeModel.toggleShuffleForUsersPlaybackQuery,
    response: {
      204: t.Void(),
      401: MeModel.toggleShuffleForUsersPlaybackResponse401,
      403: MeModel.toggleShuffleForUsersPlaybackResponse403,
      429: MeModel.toggleShuffleForUsersPlaybackResponse429,
    },
    detail: {
      tags: ['Player'],
      summary: 'Toggle Playback Shuffle\n',
      description:
        'Toggle shuffle on or off for user’s playback. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.\n',
      operationId: 'toggle-shuffle-for-users-playback',
      security: [{ oauth_2_0: ['user-modify-playback-state'] }],
    },
  })
  .get('/me/player/recently-played', ({ query }) => { throw new Error('Not implemented') }, {
    query: MeModel.getRecentlyPlayedQuery,
    response: {
      200: 'CursorPagingPlayHistoryObject',
      401: MeModel.getRecentlyPlayedResponse401,
      403: MeModel.getRecentlyPlayedResponse403,
      429: MeModel.getRecentlyPlayedResponse429,
    },
    detail: {
      tags: ['Player'],
      summary: 'Get Recently Played Tracks\n',
      description:
        "Get tracks from the current user's recently played tracks.\n_**Note**: Currently doesn't support podcast episodes._\n",
      operationId: 'get-recently-played',
      security: [{ oauth_2_0: ['user-read-recently-played'] }],
    },
  })
  .get('/me/player/queue', () => { throw new Error('Not implemented') }, {
    response: {
      200: 'QueueObject',
      401: MeModel.getQueueResponse401,
      403: MeModel.getQueueResponse403,
      429: MeModel.getQueueResponse429,
    },
    detail: {
      tags: ['Player'],
      summary: "Get the User's Queue\n",
      description: "Get the list of objects that make up the user's queue.\n",
      operationId: 'get-queue',
      security: [{ oauth_2_0: ['user-read-currently-playing', 'user-read-playback-state'] }],
    },
  })
  .post('/me/player/queue', ({ query }) => { throw new Error('Not implemented') }, {
    query: MeModel.addToQueueQuery,
    response: {
      204: t.Void(),
      401: MeModel.addToQueueResponse401,
      403: MeModel.addToQueueResponse403,
      429: MeModel.addToQueueResponse429,
    },
    detail: {
      tags: ['Player'],
      summary: 'Add Item to Playback Queue\n',
      description:
        "Add an item to be played next in the user's current playback queue. This API only works for users who have Spotify Premium. The order of execution is not guaranteed when you use this API with other Player API endpoints.\n",
      operationId: 'add-to-queue',
      security: [{ oauth_2_0: ['user-modify-playback-state'] }],
    },
  })
  .get('/me/top/artists', ({ query }) => { throw new Error('Not implemented') }, {
    query: MeModel.getUsersTopArtistsQuery,
    response: {
      200: 'PagingArtistObject',
      401: MeModel.getUsersTopArtistsResponse401,
      403: MeModel.getUsersTopArtistsResponse403,
      429: MeModel.getUsersTopArtistsResponse429,
    },
    detail: {
      tags: ['Users', 'Artists', 'Library'],
      summary: "Get User's Top Artists\n",
      description: "Get the current user's top artists based on calculated affinity.\n",
      operationId: 'get-users-top-artists',
      security: [{ oauth_2_0: ['user-top-read'] }],
    },
  })
  .get('/me/top/tracks', ({ query }) => { throw new Error('Not implemented') }, {
    query: MeModel.getUsersTopTracksQuery,
    response: {
      200: 'PagingTrackObject',
      401: MeModel.getUsersTopTracksResponse401,
      403: MeModel.getUsersTopTracksResponse403,
      429: MeModel.getUsersTopTracksResponse429,
    },
    detail: {
      tags: ['Users', 'Tracks', 'Library'],
      summary: "Get User's Top Tracks\n",
      description: "Get the current user's top tracks based on calculated affinity.\n",
      operationId: 'get-users-top-tracks',
      security: [{ oauth_2_0: ['user-top-read'] }],
    },
  })
