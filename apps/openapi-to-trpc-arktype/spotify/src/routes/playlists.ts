import { initTRPC, TRPCError } from '@trpc/server'
import { type } from 'arktype'
import {
  ImageObjectSchema,
  PagingPlaylistTrackObjectSchema,
  PlaylistObjectSchema,
} from '../components'

const t = initTRPC.create()

export const playlistsRouter = t.router({
  getPlaylistsPlaylistId: t.procedure
    .input(
      type({
        playlist_id: type('string').describe(
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
        ),
        'market?': type('string').describe(
          'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
        ),
        'fields?': type('string').describe(
          "Filters for the query: a comma-separated list of the\nfields to return. If omitted, all fields are returned. For example, to get\njust the playlist''s description and URI: `fields=description,uri`. A dot\nseparator can be used to specify non-reoccurring fields, while parentheses\ncan be used to specify reoccurring fields within objects. For example, to\nget just the added date and user ID of the adder: `fields=tracks.items(added_at,added_by.id)`.\nUse multiple parentheses to drill down into nested objects, for example: `fields=tracks.items(track(name,href,album(name,href)))`.\nFields can be excluded by prefixing them with an exclamation mark, for example:\n`fields=tracks.items(track(name,href,album(!name,href)))`\n",
        ),
        'additional_types?': type('string').describe(
          'A comma-separated list of item types that your client supports besides the default `track` type. Valid types are: `track` and `episode`.<br/>\n_**Note**: This parameter was introduced to allow existing clients to maintain their current behaviour and might be deprecated in the future._<br/>\nIn addition to providing this parameter, make sure that your client properly handles cases of new types in the future by checking against the `type` field of each object.\n',
        ),
      }),
    )
    .output(PlaylistObjectSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putPlaylistsPlaylistId: t.procedure
    .input(
      type({
        playlist_id: type('string').describe(
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
        ),
        'name?': type('string').describe(
          'The new name for the playlist, for example `"My New Playlist Title"`\n',
        ),
        'public?': type('boolean').describe(
          "The playlist's public/private status (if it should be added to the user's profile or not): `true` the playlist will be public, `false` the playlist will be private, `null` the playlist status is not relevant. For more about public/private status, see [Working with Playlists](/documentation/web-api/concepts/playlists)\n",
        ),
        'collaborative?': type('boolean').describe(
          'If `true`, the playlist will become collaborative and other users will be able to modify the playlist in their Spotify client. <br/>\n_**Note**: You can only set `collaborative` to `true` on non-public playlists._\n',
        ),
        'description?': type('string').describe(
          'Value for playlist description as displayed in Spotify Clients and in the Web API.\n',
        ),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getPlaylistsPlaylistIdTracks: t.procedure
    .input(
      type({
        playlist_id: type('string').describe(
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
        ),
        'market?': type('string').describe(
          'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
        ),
        'fields?': type('string').describe(
          'Filters for the query: a comma-separated list of the\nfields to return. If omitted, all fields are returned. For example, to get\njust the total number of items and the request limit:<br/>`fields=total,limit`<br/>A\ndot separator can be used to specify non-reoccurring fields, while parentheses\ncan be used to specify reoccurring fields within objects. For example, to\nget just the added date and user ID of the adder:<br/>`fields=items(added_at,added_by.id)`<br/>Use\nmultiple parentheses to drill down into nested objects, for example:<br/>`fields=items(track(name,href,album(name,href)))`<br/>Fields\ncan be excluded by prefixing them with an exclamation mark, for example:<br/>`fields=items.track.album(!external_urls,images)`\n',
        ),
        'limit?': type('number.integer >= 1 & number.integer <= 100').describe(
          'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 100.\n',
        ),
        'offset?': type('number.integer').describe(
          'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
        ),
        'additional_types?': type('string').describe(
          'A comma-separated list of item types that your client supports besides the default `track` type. Valid types are: `track` and `episode`.<br/>\n_**Note**: This parameter was introduced to allow existing clients to maintain their current behaviour and might be deprecated in the future._<br/>\nIn addition to providing this parameter, make sure that your client properly handles cases of new types in the future by checking against the `type` field of each object.\n',
        ),
      }),
    )
    .output(PagingPlaylistTrackObjectSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putPlaylistsPlaylistIdTracks: t.procedure
    .input(
      type({
        playlist_id: type('string').describe(
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
        ),
        'uris?': type('string').describe(
          'A comma-separated list of [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids) to set, can be track or episode URIs. For example: `uris=spotify:track:4iV5W9uYEdYUVa79Axb7Rh,spotify:track:1301WleyT98MSxVHPZCA6M,spotify:episode:512ojhOuo1ktJprKbVcKyQ`<br/>A maximum of 100 items can be set in one request.\n',
        ),
        'range_start?': type('number.integer').describe(
          'The position of the first item to be reordered.\n',
        ),
        'insert_before?': type('number.integer').describe(
          'The position where the items should be inserted.<br/>To reorder the items to the end of the playlist, simply set _insert_before_ to the position after the last item.<br/>Examples:<br/>To reorder the first item to the last position in a playlist with 10 items, set _range_start_ to 0, and _insert_before_ to 10.<br/>To reorder the last item in a playlist with 10 items to the start of the playlist, set _range_start_ to 9, and _insert_before_ to 0.\n',
        ),
        'range_length?': type('number.integer').describe(
          'The amount of items to be reordered. Defaults to 1 if not set.<br/>The range of items to be reordered begins from the _range_start_ position, and includes the _range_length_ subsequent items.<br/>Example:<br/>To move the items at index 9-10 to the start of the playlist, _range_start_ is set to 9, and _range_length_ is set to 2.\n',
        ),
        'snapshot_id?': type('string').describe(
          "The playlist's snapshot ID against which you want to make the changes.\n",
        ),
      }),
    )
    .output(type({ 'snapshot_id?': 'string' }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postPlaylistsPlaylistIdTracks: t.procedure
    .input(
      type({
        playlist_id: type('string').describe(
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
        ),
        'position?': type('number.integer').describe(
          'The position to insert the items, a zero-based index. For example, to insert the items in the first position: `position=0`; to insert the items in the third position: `position=2`. If omitted, the items will be appended to the playlist. Items are added in the order they are listed in the query string or request body.\n',
        ),
        'uris?': type('string').describe(
          'A comma-separated list of [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids) to add, can be track or episode URIs. For example:<br/>`uris=spotify:track:4iV5W9uYEdYUVa79Axb7Rh, spotify:track:1301WleyT98MSxVHPZCA6M, spotify:episode:512ojhOuo1ktJprKbVcKyQ`<br/>A maximum of 100 items can be added in one request. <br/>\n_**Note**: it is likely that passing a large number of item URIs as a query parameter will exceed the maximum length of the request URI. When adding a large number of items, it is recommended to pass them in the request body, see below._\n',
        ),
      }),
    )
    .output(type({ 'snapshot_id?': 'string' }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deletePlaylistsPlaylistIdTracks: t.procedure
    .input(
      type({
        playlist_id: type('string').describe(
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
        ),
        tracks: type(type({ 'uri?': type('string').describe('Spotify URI') }))
          .array()
          .describe(
            'An array of objects containing [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids) of the tracks or episodes to remove.\nFor example: `{ "tracks": [{ "uri": "spotify:track:4iV5W9uYEdYUVa79Axb7Rh" },{ "uri": "spotify:track:1301WleyT98MSxVHPZCA6M" }] }`. A maximum of 100 objects can be sent at once.\n',
          ),
        'snapshot_id?': type('string').describe(
          "The playlist's snapshot ID against which you want to make the changes.\nThe API will validate that the specified items exist and in the specified positions and make the changes,\neven if more recent changes have been made to the playlist.\n",
        ),
      }),
    )
    .output(type({ 'snapshot_id?': 'string' }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getPlaylistsPlaylistIdItems: t.procedure
    .input(
      type({
        playlist_id: type('string').describe(
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
        ),
        'market?': type('string').describe(
          'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
        ),
        'fields?': type('string').describe(
          'Filters for the query: a comma-separated list of the\nfields to return. If omitted, all fields are returned. For example, to get\njust the total number of items and the request limit:<br/>`fields=total,limit`<br/>A\ndot separator can be used to specify non-reoccurring fields, while parentheses\ncan be used to specify reoccurring fields within objects. For example, to\nget just the added date and user ID of the adder:<br/>`fields=items(added_at,added_by.id)`<br/>Use\nmultiple parentheses to drill down into nested objects, for example:<br/>`fields=items(track(name,href,album(name,href)))`<br/>Fields\ncan be excluded by prefixing them with an exclamation mark, for example:<br/>`fields=items.track.album(!external_urls,images)`\n',
        ),
        'limit?': type('number.integer >= 1 & number.integer <= 50').describe(
          'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
        ),
        'offset?': type('number.integer').describe(
          'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
        ),
        'additional_types?': type('string').describe(
          'A comma-separated list of item types that your client supports besides the default `track` type. Valid types are: `track` and `episode`.<br/>\n_**Note**: This parameter was introduced to allow existing clients to maintain their current behaviour and might be deprecated in the future._<br/>\nIn addition to providing this parameter, make sure that your client properly handles cases of new types in the future by checking against the `type` field of each object.\n',
        ),
      }),
    )
    .output(PagingPlaylistTrackObjectSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putPlaylistsPlaylistIdItems: t.procedure
    .input(
      type({
        playlist_id: type('string').describe(
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
        ),
        'uris?': type('string').describe(
          'A comma-separated list of [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids) to set, can be track or episode URIs. For example: `uris=spotify:track:4iV5W9uYEdYUVa79Axb7Rh,spotify:track:1301WleyT98MSxVHPZCA6M,spotify:episode:512ojhOuo1ktJprKbVcKyQ`<br/>A maximum of 100 items can be set in one request.\n',
        ),
        'range_start?': type('number.integer').describe(
          'The position of the first item to be reordered.\n',
        ),
        'insert_before?': type('number.integer').describe(
          'The position where the items should be inserted.<br/>To reorder the items to the end of the playlist, simply set _insert_before_ to the position after the last item.<br/>Examples:<br/>To reorder the first item to the last position in a playlist with 10 items, set _range_start_ to 0, and _insert_before_ to 10.<br/>To reorder the last item in a playlist with 10 items to the start of the playlist, set _range_start_ to 9, and _insert_before_ to 0.\n',
        ),
        'range_length?': type('number.integer').describe(
          'The amount of items to be reordered. Defaults to 1 if not set.<br/>The range of items to be reordered begins from the _range_start_ position, and includes the _range_length_ subsequent items.<br/>Example:<br/>To move the items at index 9-10 to the start of the playlist, _range_start_ is set to 9, and _range_length_ is set to 2.\n',
        ),
        'snapshot_id?': type('string').describe(
          "The playlist's snapshot ID against which you want to make the changes.\n",
        ),
      }),
    )
    .output(type({ 'snapshot_id?': 'string' }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  postPlaylistsPlaylistIdItems: t.procedure
    .input(
      type({
        playlist_id: type('string').describe(
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
        ),
        'position?': type('number.integer').describe(
          'The position to insert the items, a zero-based index. For example, to insert the items in the first position: `position=0`; to insert the items in the third position: `position=2`. If omitted, the items will be appended to the playlist. Items are added in the order they are listed in the query string or request body.\n',
        ),
        'uris?': type('string').describe(
          'A comma-separated list of [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids) to add, can be track or episode URIs. For example:<br/>`uris=spotify:track:4iV5W9uYEdYUVa79Axb7Rh, spotify:track:1301WleyT98MSxVHPZCA6M, spotify:episode:512ojhOuo1ktJprKbVcKyQ`<br/>A maximum of 100 items can be added in one request. <br/>\n_**Note**: it is likely that passing a large number of item URIs as a query parameter will exceed the maximum length of the request URI. When adding a large number of items, it is recommended to pass them in the request body, see below._\n',
        ),
      }),
    )
    .output(type({ 'snapshot_id?': 'string' }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deletePlaylistsPlaylistIdItems: t.procedure
    .input(
      type({
        playlist_id: type('string').describe(
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
        ),
        items: type(type({ 'uri?': type('string').describe('Spotify URI') }))
          .array()
          .describe(
            'An array of objects containing [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids) of the tracks or episodes to remove.\nFor example: `{ "items": [{ "uri": "spotify:track:4iV5W9uYEdYUVa79Axb7Rh" },{ "uri": "spotify:track:1301WleyT98MSxVHPZCA6M" }] }`. A maximum of 100 objects can be sent at once.\n',
          ),
        'snapshot_id?': type('string').describe(
          "The playlist's snapshot ID against which you want to make the changes.\nThe API will validate that the specified items exist and in the specified positions and make the changes,\neven if more recent changes have been made to the playlist.\n",
        ),
      }),
    )
    .output(type({ 'snapshot_id?': 'string' }))
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putPlaylistsPlaylistIdFollowers: t.procedure
    .input(
      type({
        playlist_id: type('string').describe(
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
        ),
        'public?': type('boolean').describe(
          "Defaults to `true`. If `true` the playlist will be included in user's public playlists (added to profile), if `false` it will remain private. For more about public/private status, see [Working with Playlists](/documentation/web-api/concepts/playlists)\n",
        ),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  deletePlaylistsPlaylistIdFollowers: t.procedure
    .input(
      type({
        playlist_id: type('string').describe(
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
        ),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getPlaylistsPlaylistIdImages: t.procedure
    .input(
      type({
        playlist_id: type('string').describe(
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
        ),
      }),
    )
    .output(type(ImageObjectSchema).array())
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  putPlaylistsPlaylistIdImages: t.procedure
    .input(
      type({
        playlist_id: type('string').describe(
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
        ),
      }),
    )
    .mutation(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getPlaylistsPlaylistIdFollowersContains: t.procedure
    .input(
      type({
        playlist_id: type('string').describe(
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
        ),
        'ids?': type('string').describe(
          "**Deprecated** A single item list containing current user's [Spotify Username](/documentation/web-api/concepts/spotify-uris-ids). Maximum: 1 id.\n",
        ),
      }),
    )
    .output(type('boolean[]'))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
