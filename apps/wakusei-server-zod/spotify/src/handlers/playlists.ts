import { os } from '@orpc/server'
import * as z from 'zod'
import {
  ImageObjectSchema,
  PagingPlaylistTrackObjectSchema,
  PlaylistObjectSchema,
} from '../components'

export const getPlaylistsPlaylistId = os
  .route({
    method: 'GET',
    path: '/playlists/{playlist_id}',
    tags: ['Playlists'],
    summary: 'Get Playlist\n',
    description: 'Get a playlist owned by a Spotify user.\n',
    successDescription: 'A playlist',
  })
  .input(
    z.object({
      playlist_id: z
        .string()
        .meta({
          description:
            'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
          examples: ['3cEYpjA9oz9GiPac4AsH4n'],
        }),
      market: z
        .string()
        .meta({
          description:
            'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
          examples: ['ES'],
        })
        .exactOptional(),
      fields: z
        .string()
        .meta({
          description:
            "Filters for the query: a comma-separated list of the\nfields to return. If omitted, all fields are returned. For example, to get\njust the playlist''s description and URI: `fields=description,uri`. A dot\nseparator can be used to specify non-reoccurring fields, while parentheses\ncan be used to specify reoccurring fields within objects. For example, to\nget just the added date and user ID of the adder: `fields=tracks.items(added_at,added_by.id)`.\nUse multiple parentheses to drill down into nested objects, for example: `fields=tracks.items(track(name,href,album(name,href)))`.\nFields can be excluded by prefixing them with an exclamation mark, for example:\n`fields=tracks.items(track(name,href,album(!name,href)))`\n",
          examples: ['items(added_by.id,track(name,href,album(name,href)))'],
        })
        .exactOptional(),
      additional_types: z
        .string()
        .meta({
          description:
            'A comma-separated list of item types that your client supports besides the default `track` type. Valid types are: `track` and `episode`.<br/>\n_**Note**: This parameter was introduced to allow existing clients to maintain their current behaviour and might be deprecated in the future._<br/>\nIn addition to providing this parameter, make sure that your client properly handles cases of new types in the future by checking against the `type` field of each object.\n',
        })
        .exactOptional(),
    }),
  )
  .output(PlaylistObjectSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const putPlaylistsPlaylistId = os
  .route({
    method: 'PUT',
    path: '/playlists/{playlist_id}',
    tags: ['Playlists', 'Library'],
    summary: 'Change Playlist Details\n',
    description:
      "Change a playlist's name and public/private state. (The user must, of\ncourse, own the playlist.)\n",
    successDescription: 'Playlist updated',
  })
  .input(
    z.object({
      playlist_id: z
        .string()
        .meta({
          description:
            'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
          examples: ['3cEYpjA9oz9GiPac4AsH4n'],
        }),
      name: z
        .string()
        .meta({
          description: 'The new name for the playlist, for example `"My New Playlist Title"`\n',
        })
        .exactOptional(),
      public: z
        .boolean()
        .meta({
          description:
            "The playlist's public/private status (if it should be added to the user's profile or not): `true` the playlist will be public, `false` the playlist will be private, `null` the playlist status is not relevant. For more about public/private status, see [Working with Playlists](/documentation/web-api/concepts/playlists)\n",
        })
        .exactOptional(),
      collaborative: z
        .boolean()
        .meta({
          description:
            'If `true`, the playlist will become collaborative and other users will be able to modify the playlist in their Spotify client. <br/>\n_**Note**: You can only set `collaborative` to `true` on non-public playlists._\n',
        })
        .exactOptional(),
      description: z
        .string()
        .meta({
          description:
            'Value for playlist description as displayed in Spotify Clients and in the Web API.\n',
        })
        .exactOptional(),
    }),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getPlaylistsPlaylistIdTracks = os
  .route({
    method: 'GET',
    path: '/playlists/{playlist_id}/tracks',
    tags: ['Playlists', 'Tracks'],
    summary: 'Get Playlist Items [DEPRECATED]\n',
    description:
      '**Deprecated:** Use [Get Playlist Items](/documentation/web-api/reference/get-playlists-items) instead.\n\nGet full details of the items of a playlist owned by a Spotify user.\n',
    deprecated: true,
    successDescription: 'Pages of tracks',
  })
  .input(
    z.object({
      playlist_id: z
        .string()
        .meta({
          description:
            'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
          examples: ['3cEYpjA9oz9GiPac4AsH4n'],
        }),
      market: z
        .string()
        .meta({
          description:
            'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
          examples: ['ES'],
        })
        .exactOptional(),
      fields: z
        .string()
        .meta({
          description:
            'Filters for the query: a comma-separated list of the\nfields to return. If omitted, all fields are returned. For example, to get\njust the total number of items and the request limit:<br/>`fields=total,limit`<br/>A\ndot separator can be used to specify non-reoccurring fields, while parentheses\ncan be used to specify reoccurring fields within objects. For example, to\nget just the added date and user ID of the adder:<br/>`fields=items(added_at,added_by.id)`<br/>Use\nmultiple parentheses to drill down into nested objects, for example:<br/>`fields=items(track(name,href,album(name,href)))`<br/>Fields\ncan be excluded by prefixing them with an exclamation mark, for example:<br/>`fields=items.track.album(!external_urls,images)`\n',
          examples: ['items(added_by.id,track(name,href,album(name,href)))'],
        })
        .exactOptional(),
      limit: z.coerce
        .number()
        .int()
        .min(1)
        .max(100)
        .default(20)
        .meta({
          description:
            'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 100.\n',
          examples: [10],
        })
        .exactOptional(),
      offset: z.coerce
        .number()
        .int()
        .default(0)
        .meta({
          description:
            'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
          examples: [5],
        })
        .exactOptional(),
      additional_types: z
        .string()
        .meta({
          description:
            'A comma-separated list of item types that your client supports besides the default `track` type. Valid types are: `track` and `episode`.<br/>\n_**Note**: This parameter was introduced to allow existing clients to maintain their current behaviour and might be deprecated in the future._<br/>\nIn addition to providing this parameter, make sure that your client properly handles cases of new types in the future by checking against the `type` field of each object.\n',
        })
        .exactOptional(),
    }),
  )
  .output(PagingPlaylistTrackObjectSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postPlaylistsPlaylistIdTracks = os
  .route({
    method: 'POST',
    path: '/playlists/{playlist_id}/tracks',
    tags: ['Playlists', 'Tracks'],
    summary: 'Add Items to Playlist [DEPRECATED]\n',
    description:
      "**Deprecated:** Use [Add Items to Playlist](/documentation/web-api/reference/add-items-to-playlist) instead.\n\nAdd one or more items to a user's playlist.\n",
    deprecated: true,
    successStatus: 201,
    successDescription: 'A snapshot ID for the playlist',
  })
  .input(
    z.object({
      playlist_id: z
        .string()
        .meta({
          description:
            'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
          examples: ['3cEYpjA9oz9GiPac4AsH4n'],
        }),
      position: z.coerce
        .number()
        .int()
        .meta({
          description:
            'The position to insert the items, a zero-based index. For example, to insert the items in the first position: `position=0`; to insert the items in the third position: `position=2`. If omitted, the items will be appended to the playlist. Items are added in the order they are listed in the query string or request body.\n',
          examples: [0],
        })
        .exactOptional(),
      uris: z
        .string()
        .meta({
          description:
            'A comma-separated list of [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids) to add, can be track or episode URIs. For example:<br/>`uris=spotify:track:4iV5W9uYEdYUVa79Axb7Rh, spotify:track:1301WleyT98MSxVHPZCA6M, spotify:episode:512ojhOuo1ktJprKbVcKyQ`<br/>A maximum of 100 items can be added in one request. <br/>\n_**Note**: it is likely that passing a large number of item URIs as a query parameter will exceed the maximum length of the request URI. When adding a large number of items, it is recommended to pass them in the request body, see below._\n',
          examples: ['spotify:track:4iV5W9uYEdYUVa79Axb7Rh,spotify:track:1301WleyT98MSxVHPZCA6M'],
        })
        .exactOptional(),
    }),
  )
  .output(
    z.object({
      snapshot_id: z
        .string()
        .meta({ examples: ['abc'] })
        .exactOptional(),
    }),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const putPlaylistsPlaylistIdTracks = os
  .route({
    method: 'PUT',
    path: '/playlists/{playlist_id}/tracks',
    tags: ['Playlists', 'Tracks'],
    summary: 'Update Playlist Items [DEPRECATED]\n',
    description:
      "**Deprecated:** Use [Update Playlist Items](/documentation/web-api/reference/reorder-or-replace-playlists-items) instead.\n\nEither reorder or replace items in a playlist depending on the request's parameters.\nTo reorder items, include `range_start`, `insert_before`, `range_length` and `snapshot_id` in the request's body.\nTo replace items, include `uris` as either a query parameter or in the request's body.\nReplacing items in a playlist will overwrite its existing items. This operation can be used for replacing or clearing items in a playlist.\n<br/>\n**Note**: Replace and reorder are mutually exclusive operations which share the same endpoint, but have different parameters.\nThese operations can't be applied together in a single request.\n",
    deprecated: true,
    successDescription: 'A snapshot ID for the playlist',
  })
  .input(
    z.object({
      playlist_id: z
        .string()
        .meta({
          description:
            'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
          examples: ['3cEYpjA9oz9GiPac4AsH4n'],
        }),
      uris: z
        .string()
        .meta({
          description:
            'A comma-separated list of [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids) to set, can be track or episode URIs. For example: `uris=spotify:track:4iV5W9uYEdYUVa79Axb7Rh,spotify:track:1301WleyT98MSxVHPZCA6M,spotify:episode:512ojhOuo1ktJprKbVcKyQ`<br/>A maximum of 100 items can be set in one request.\n',
        })
        .exactOptional(),
      range_start: z
        .int()
        .meta({ description: 'The position of the first item to be reordered.\n' })
        .exactOptional(),
      insert_before: z
        .int()
        .meta({
          description:
            'The position where the items should be inserted.<br/>To reorder the items to the end of the playlist, simply set _insert_before_ to the position after the last item.<br/>Examples:<br/>To reorder the first item to the last position in a playlist with 10 items, set _range_start_ to 0, and _insert_before_ to 10.<br/>To reorder the last item in a playlist with 10 items to the start of the playlist, set _range_start_ to 9, and _insert_before_ to 0.\n',
        })
        .exactOptional(),
      range_length: z
        .int()
        .meta({
          description:
            'The amount of items to be reordered. Defaults to 1 if not set.<br/>The range of items to be reordered begins from the _range_start_ position, and includes the _range_length_ subsequent items.<br/>Example:<br/>To move the items at index 9-10 to the start of the playlist, _range_start_ is set to 9, and _range_length_ is set to 2.\n',
        })
        .exactOptional(),
      snapshot_id: z
        .string()
        .meta({
          description: "The playlist's snapshot ID against which you want to make the changes.\n",
        })
        .exactOptional(),
    }),
  )
  .output(
    z.object({
      snapshot_id: z
        .string()
        .meta({ examples: ['abc'] })
        .exactOptional(),
    }),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deletePlaylistsPlaylistIdTracks = os
  .route({
    method: 'DELETE',
    path: '/playlists/{playlist_id}/tracks',
    tags: ['Playlists', 'Tracks'],
    summary: 'Remove Playlist Items [DEPRECATED]\n',
    description:
      "**Deprecated:** Use [Remove Playlist Items](/documentation/web-api/reference/remove-items-playlist) instead.\n\nRemove one or more items from a user's playlist.\n",
    deprecated: true,
    successDescription: 'A snapshot ID for the playlist',
  })
  .input(
    z.object({
      playlist_id: z
        .string()
        .meta({
          description:
            'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
          examples: ['3cEYpjA9oz9GiPac4AsH4n'],
        }),
      tracks: z
        .array(z.object({ uri: z.string().meta({ description: 'Spotify URI' }).exactOptional() }))
        .meta({
          description:
            'An array of objects containing [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids) of the tracks or episodes to remove.\nFor example: `{ "tracks": [{ "uri": "spotify:track:4iV5W9uYEdYUVa79Axb7Rh" },{ "uri": "spotify:track:1301WleyT98MSxVHPZCA6M" }] }`. A maximum of 100 objects can be sent at once.\n',
        }),
      snapshot_id: z
        .string()
        .meta({
          description:
            "The playlist's snapshot ID against which you want to make the changes.\nThe API will validate that the specified items exist and in the specified positions and make the changes,\neven if more recent changes have been made to the playlist.\n",
        })
        .exactOptional(),
    }),
  )
  .output(
    z.object({
      snapshot_id: z
        .string()
        .meta({ examples: ['abc'] })
        .exactOptional(),
    }),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getPlaylistsPlaylistIdItems = os
  .route({
    method: 'GET',
    path: '/playlists/{playlist_id}/items',
    tags: ['Playlists', 'Tracks'],
    summary: 'Get Playlist Items\n',
    description:
      'Get full details of the items of a playlist owned by a Spotify user.\n\n**Note**: This endpoint is only accessible for playlists owned by the current user or playlists the user is a collaborator of. A `403 Forbidden` status code will be returned if the user is neither the owner nor a collaborator of the playlist.\n',
    successDescription: 'Pages of tracks',
  })
  .input(
    z.object({
      playlist_id: z
        .string()
        .meta({
          description:
            'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
          examples: ['3cEYpjA9oz9GiPac4AsH4n'],
        }),
      market: z
        .string()
        .meta({
          description:
            'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
          examples: ['ES'],
        })
        .exactOptional(),
      fields: z
        .string()
        .meta({
          description:
            'Filters for the query: a comma-separated list of the\nfields to return. If omitted, all fields are returned. For example, to get\njust the total number of items and the request limit:<br/>`fields=total,limit`<br/>A\ndot separator can be used to specify non-reoccurring fields, while parentheses\ncan be used to specify reoccurring fields within objects. For example, to\nget just the added date and user ID of the adder:<br/>`fields=items(added_at,added_by.id)`<br/>Use\nmultiple parentheses to drill down into nested objects, for example:<br/>`fields=items(track(name,href,album(name,href)))`<br/>Fields\ncan be excluded by prefixing them with an exclamation mark, for example:<br/>`fields=items.track.album(!external_urls,images)`\n',
          examples: ['items(added_by.id,track(name,href,album(name,href)))'],
        })
        .exactOptional(),
      limit: z.coerce
        .number()
        .int()
        .min(1)
        .max(50)
        .default(20)
        .meta({
          description:
            'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
          examples: [10],
        })
        .exactOptional(),
      offset: z.coerce
        .number()
        .int()
        .default(0)
        .meta({
          description:
            'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
          examples: [5],
        })
        .exactOptional(),
      additional_types: z
        .string()
        .meta({
          description:
            'A comma-separated list of item types that your client supports besides the default `track` type. Valid types are: `track` and `episode`.<br/>\n_**Note**: This parameter was introduced to allow existing clients to maintain their current behaviour and might be deprecated in the future._<br/>\nIn addition to providing this parameter, make sure that your client properly handles cases of new types in the future by checking against the `type` field of each object.\n',
        })
        .exactOptional(),
    }),
  )
  .output(PagingPlaylistTrackObjectSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postPlaylistsPlaylistIdItems = os
  .route({
    method: 'POST',
    path: '/playlists/{playlist_id}/items',
    tags: ['Playlists', 'Tracks'],
    summary: 'Add Items to Playlist\n',
    description: "Add one or more items to a user's playlist.\n",
    successStatus: 201,
    successDescription: 'A snapshot ID for the playlist',
  })
  .input(
    z.object({
      playlist_id: z
        .string()
        .meta({
          description:
            'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
          examples: ['3cEYpjA9oz9GiPac4AsH4n'],
        }),
      position: z.coerce
        .number()
        .int()
        .meta({
          description:
            'The position to insert the items, a zero-based index. For example, to insert the items in the first position: `position=0`; to insert the items in the third position: `position=2`. If omitted, the items will be appended to the playlist. Items are added in the order they are listed in the query string or request body.\n',
          examples: [0],
        })
        .exactOptional(),
      uris: z
        .string()
        .meta({
          description:
            'A comma-separated list of [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids) to add, can be track or episode URIs. For example:<br/>`uris=spotify:track:4iV5W9uYEdYUVa79Axb7Rh, spotify:track:1301WleyT98MSxVHPZCA6M, spotify:episode:512ojhOuo1ktJprKbVcKyQ`<br/>A maximum of 100 items can be added in one request. <br/>\n_**Note**: it is likely that passing a large number of item URIs as a query parameter will exceed the maximum length of the request URI. When adding a large number of items, it is recommended to pass them in the request body, see below._\n',
          examples: ['spotify:track:4iV5W9uYEdYUVa79Axb7Rh,spotify:track:1301WleyT98MSxVHPZCA6M'],
        })
        .exactOptional(),
    }),
  )
  .output(
    z.object({
      snapshot_id: z
        .string()
        .meta({ examples: ['abc'] })
        .exactOptional(),
    }),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const putPlaylistsPlaylistIdItems = os
  .route({
    method: 'PUT',
    path: '/playlists/{playlist_id}/items',
    tags: ['Playlists', 'Tracks'],
    summary: 'Update Playlist Items\n',
    description:
      "Either reorder or replace items in a playlist depending on the request's parameters.\nTo reorder items, include `range_start`, `insert_before`, `range_length` and `snapshot_id` in the request's body.\nTo replace items, include `uris` as either a query parameter or in the request's body.\nReplacing items in a playlist will overwrite its existing items. This operation can be used for replacing or clearing items in a playlist.\n<br/>\n**Note**: Replace and reorder are mutually exclusive operations which share the same endpoint, but have different parameters.\nThese operations can't be applied together in a single request.\n",
    successDescription: 'A snapshot ID for the playlist',
  })
  .input(
    z.object({
      playlist_id: z
        .string()
        .meta({
          description:
            'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
          examples: ['3cEYpjA9oz9GiPac4AsH4n'],
        }),
      uris: z
        .string()
        .meta({
          description:
            'A comma-separated list of [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids) to set, can be track or episode URIs. For example: `uris=spotify:track:4iV5W9uYEdYUVa79Axb7Rh,spotify:track:1301WleyT98MSxVHPZCA6M,spotify:episode:512ojhOuo1ktJprKbVcKyQ`<br/>A maximum of 100 items can be set in one request.\n',
        })
        .exactOptional(),
      range_start: z
        .int()
        .meta({ description: 'The position of the first item to be reordered.\n' })
        .exactOptional(),
      insert_before: z
        .int()
        .meta({
          description:
            'The position where the items should be inserted.<br/>To reorder the items to the end of the playlist, simply set _insert_before_ to the position after the last item.<br/>Examples:<br/>To reorder the first item to the last position in a playlist with 10 items, set _range_start_ to 0, and _insert_before_ to 10.<br/>To reorder the last item in a playlist with 10 items to the start of the playlist, set _range_start_ to 9, and _insert_before_ to 0.\n',
        })
        .exactOptional(),
      range_length: z
        .int()
        .meta({
          description:
            'The amount of items to be reordered. Defaults to 1 if not set.<br/>The range of items to be reordered begins from the _range_start_ position, and includes the _range_length_ subsequent items.<br/>Example:<br/>To move the items at index 9-10 to the start of the playlist, _range_start_ is set to 9, and _range_length_ is set to 2.\n',
        })
        .exactOptional(),
      snapshot_id: z
        .string()
        .meta({
          description: "The playlist's snapshot ID against which you want to make the changes.\n",
        })
        .exactOptional(),
    }),
  )
  .output(
    z.object({
      snapshot_id: z
        .string()
        .meta({ examples: ['abc'] })
        .exactOptional(),
    }),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deletePlaylistsPlaylistIdItems = os
  .route({
    method: 'DELETE',
    path: '/playlists/{playlist_id}/items',
    tags: ['Playlists', 'Tracks'],
    summary: 'Remove Playlist Items\n',
    description: "Remove one or more items from a user's playlist.\n",
    successDescription: 'A snapshot ID for the playlist',
  })
  .input(
    z.object({
      playlist_id: z
        .string()
        .meta({
          description:
            'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
          examples: ['3cEYpjA9oz9GiPac4AsH4n'],
        }),
      items: z
        .array(z.object({ uri: z.string().meta({ description: 'Spotify URI' }).exactOptional() }))
        .meta({
          description:
            'An array of objects containing [Spotify URIs](/documentation/web-api/concepts/spotify-uris-ids) of the tracks or episodes to remove.\nFor example: `{ "items": [{ "uri": "spotify:track:4iV5W9uYEdYUVa79Axb7Rh" },{ "uri": "spotify:track:1301WleyT98MSxVHPZCA6M" }] }`. A maximum of 100 objects can be sent at once.\n',
        }),
      snapshot_id: z
        .string()
        .meta({
          description:
            "The playlist's snapshot ID against which you want to make the changes.\nThe API will validate that the specified items exist and in the specified positions and make the changes,\neven if more recent changes have been made to the playlist.\n",
        })
        .exactOptional(),
    }),
  )
  .output(
    z.object({
      snapshot_id: z
        .string()
        .meta({ examples: ['abc'] })
        .exactOptional(),
    }),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const putPlaylistsPlaylistIdFollowers = os
  .route({
    method: 'PUT',
    path: '/playlists/{playlist_id}/followers',
    tags: ['Users', 'Playlists'],
    summary: 'Follow Playlist\n',
    description:
      'Add the current user as a follower of a playlist.\n\n**Note:** This endpoint is deprecated. Use [Save Items to Library](/documentation/web-api/reference/save-library-items) instead.\n',
    deprecated: true,
    successDescription: 'Playlist followed',
  })
  .input(
    z.object({
      playlist_id: z
        .string()
        .meta({
          description:
            'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
          examples: ['3cEYpjA9oz9GiPac4AsH4n'],
        }),
      public: z
        .boolean()
        .meta({
          description:
            "Defaults to `true`. If `true` the playlist will be included in user's public playlists (added to profile), if `false` it will remain private. For more about public/private status, see [Working with Playlists](/documentation/web-api/concepts/playlists)\n",
        })
        .exactOptional(),
    }),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deletePlaylistsPlaylistIdFollowers = os
  .route({
    method: 'DELETE',
    path: '/playlists/{playlist_id}/followers',
    tags: ['Users', 'Playlists'],
    summary: 'Unfollow Playlist\n',
    description:
      'Remove the current user as a follower of a playlist.\n\n**Note:** This endpoint is deprecated. Use [Remove Items from Library](/documentation/web-api/reference/remove-library-items) instead.\n',
    deprecated: true,
    successDescription: 'Playlist unfollowed',
  })
  .input(
    z.object({
      playlist_id: z
        .string()
        .meta({
          description:
            'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
          examples: ['3cEYpjA9oz9GiPac4AsH4n'],
        }),
    }),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getPlaylistsPlaylistIdImages = os
  .route({
    method: 'GET',
    path: '/playlists/{playlist_id}/images',
    tags: ['Playlists'],
    summary: 'Get Playlist Cover Image\n',
    description: 'Get the current image associated with a specific playlist.\n',
    successDescription: 'A set of images',
  })
  .input(
    z.object({
      playlist_id: z
        .string()
        .meta({
          description:
            'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
          examples: ['3cEYpjA9oz9GiPac4AsH4n'],
        }),
    }),
  )
  .output(z.array(ImageObjectSchema))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const putPlaylistsPlaylistIdImages = os
  .route({
    method: 'PUT',
    path: '/playlists/{playlist_id}/images',
    tags: ['Playlists'],
    summary: 'Add Custom Playlist Cover Image\n',
    description: 'Replace the image used to represent a specific playlist.\n',
    successStatus: 202,
    successDescription: 'Image uploaded',
  })
  .input(
    z.object({
      playlist_id: z
        .string()
        .meta({
          description:
            'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
          examples: ['3cEYpjA9oz9GiPac4AsH4n'],
        }),
    }),
  )
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getPlaylistsPlaylistIdFollowersContains = os
  .route({
    method: 'GET',
    path: '/playlists/{playlist_id}/followers/contains',
    tags: ['Users', 'Playlists'],
    summary: 'Check if Current User Follows Playlist\n',
    description:
      "Check to see if the current user is following a specified playlist.\n\n**Note:** This endpoint is deprecated. Use [Check User's Saved Items](/documentation/web-api/reference/check-library-contains) instead.\n",
    deprecated: true,
    successDescription: 'Array of boolean, containing a single boolean',
  })
  .input(
    z.object({
      playlist_id: z
        .string()
        .meta({
          description:
            'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
          examples: ['3cEYpjA9oz9GiPac4AsH4n'],
        }),
      ids: z
        .string()
        .meta({
          description:
            "**Deprecated** A single item list containing current user's [Spotify Username](/documentation/web-api/concepts/spotify-uris-ids). Maximum: 1 id.\n",
          examples: ['jmperezperez'],
        })
        .exactOptional(),
    }),
  )
  .output(z.array(z.boolean()).meta({ examples: [[true]] }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })
