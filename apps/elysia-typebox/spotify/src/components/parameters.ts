import { t } from 'elysia'

export const PathAlbumIdParamsSchema = t.String({
  example: '4aawyAB9vmqN3uQ7FjRGTy',
  title: 'Spotify Album ID',
  description: 'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the album.\n',
})

export const PathPlaylistIdParamsSchema = t.String({
  example: '3cEYpjA9oz9GiPac4AsH4n',
  title: 'Playlist ID',
  description:
    'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the playlist.\n',
})

export const QueryMarketParamsSchema = t.String({
  example: 'ES',
  title: 'Market',
  description:
    'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
})

export const QueryLimitParamsSchema = t.Integer({
  minimum: 1,
  maximum: 50,
  example: 10,
  title: 'Limit',
  description: 'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
  default: 20,
})

export const QueryOffsetParamsSchema = t.Integer({
  maximum: 9007199254740991,
  example: 5,
  title: 'Offset',
  description:
    'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
  default: 0,
})

export const QueryAdditionalTypesParamsSchema = t.String({
  title: 'Additional Types',
  description:
    'A comma-separated list of item types that your client supports besides the default `track` type. Valid types are: `track` and `episode`.<br/>\n_**Note**: This parameter was introduced to allow existing clients to maintain their current behaviour and might be deprecated in the future._<br/>\nIn addition to providing this parameter, make sure that your client properly handles cases of new types in the future by checking against the `type` field of each object.\n',
})

export const QueryAlbumIdsParamsSchema = t.String({
  example: '382ObEPsp2rxGrnsizN5TX,1A2GTWGtFfWp7KSQTwWOyo,2noRn2Aes5aoNVsU6iWThc',
  title: 'Spotify Album IDs',
  description:
    'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the albums. Maximum: 20 IDs.\n',
})

export const PathArtistIdParamsSchema = t.String({
  example: '0TnOYISbd1XYRBk9myaseg',
  title: 'Spotify Artist ID',
  description:
    'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the artist.\n',
})

export const PathShowIdParamsSchema = t.String({
  example: '38bS44xjbVVZ3No3ByF1dJ',
  title: 'Spotify Show ID',
  description:
    'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)\nfor the show.\n',
})

export const PathAudiobookIdParamsSchema = t.String({
  example: '7iHfbu1YPACw6oZPAFJtqe',
  title: 'Spotify Audiobook ID',
  description:
    'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)\nfor the audiobook.\n',
})

export const QueryAudiobookIdsParamsSchema = t.String({
  example: '18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ,7iHfbu1YPACw6oZPAFJtqe',
  title: 'Spotify Audiobook IDs',
  description:
    'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ`. Maximum: 50 IDs.\n',
})

export const PathChapterIdParamsSchema = t.String({
  example: '0D5wENdkdwbqlrHoaJ9g29',
  title: 'Spotify Chapter ID',
  description:
    'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)\nfor the chapter.\n',
})

export const QueryChapterIdsParamsSchema = t.String({
  example: '0IsXVP0JmcB2adSE338GkK,3ZXb8FKZGU0EHALYX6uCzU,0D5wENdkdwbqlrHoaJ9g29',
  title: 'Spotify Chapter IDs',
  description:
    'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=0IsXVP0JmcB2adSE338GkK,3ZXb8FKZGU0EHALYX6uCzU`. Maximum: 50 IDs.\n',
})

export const QueryTrackIdsParamsSchema = t.String({
  example: '7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B',
  title: 'Spotify Track IDs',
  description:
    'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=4iV5W9uYEdYUVa79Axb7Rh,1301WleyT98MSxVHPZCA6M`. Maximum: 50 IDs.\n',
})

export const QueryIncludeGroupsParamsSchema = t.String({
  example: 'single,appears_on',
  title: 'Groups to include (single, album, appears_on, compilation)',
  description:
    'A comma-separated list of keywords that will be used to filter the response. If not supplied, all album types will be returned. <br/>\nValid values are:<br/>- `album`<br/>- `single`<br/>- `appears_on`<br/>- `compilation`<br/>For example: `include_groups=album,single`.\n',
})

export const QueryShowIdsParamsSchema = t.String({
  example: '5CfCWKI5pZ28U0uOzXkDHe,5as3aKmN2k11yfDDDSrvaZ',
  title: 'Ids',
  description:
    'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the shows. Maximum: 50 IDs.\n',
})

export const PathUserIdParamsSchema = t.String({
  example: 'smedjan',
  title: 'User ID',
  description: "The user's [Spotify user ID](/documentation/web-api/concepts/spotify-uris-ids).\n",
})
