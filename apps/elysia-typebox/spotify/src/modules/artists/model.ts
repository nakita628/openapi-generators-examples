import { t, type UnwrapSchema } from 'elysia'
import { ArtistObjectSchema, ErrorObjectSchema, TrackObjectSchema } from '../../components/schemas'

export const ArtistsModel = {
  getAnArtistParams: t.Object({
    id: t.String({
      example: '0TnOYISbd1XYRBk9myaseg',
      title: 'Spotify Artist ID',
      description:
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the artist.\n',
    }),
  }),
  getAnArtistResponse401: t.Object({ error: ErrorObjectSchema }),
  getAnArtistResponse403: t.Object({ error: ErrorObjectSchema }),
  getAnArtistResponse429: t.Object({ error: ErrorObjectSchema }),
  getMultipleArtistsQuery: t.Object({
    ids: t.String({
      example: '2CIMQHirSU0MQqyYHq0eOx,57dN52uHvrHOxijzpIgu3E,1vCWHaC5f2uS3yhpwWbIA6',
      title: 'Spotify Artist IDs',
      description:
        'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the artists. Maximum: 50 IDs.\n',
    }),
  }),
  getMultipleArtistsResponse200: t.Object({ artists: t.Array(ArtistObjectSchema) }),
  getMultipleArtistsResponse401: t.Object({ error: ErrorObjectSchema }),
  getMultipleArtistsResponse403: t.Object({ error: ErrorObjectSchema }),
  getMultipleArtistsResponse429: t.Object({ error: ErrorObjectSchema }),
  getAnArtistsAlbumsParams: t.Object({
    id: t.String({
      example: '0TnOYISbd1XYRBk9myaseg',
      title: 'Spotify Artist ID',
      description:
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the artist.\n',
    }),
  }),
  getAnArtistsAlbumsQuery: t.Object({
    include_groups: t.Optional(
      t.String({
        example: 'single,appears_on',
        title: 'Groups to include (single, album, appears_on, compilation)',
        description:
          'A comma-separated list of keywords that will be used to filter the response. If not supplied, all album types will be returned. <br/>\nValid values are:<br/>- `album`<br/>- `single`<br/>- `appears_on`<br/>- `compilation`<br/>For example: `include_groups=album,single`.\n',
      }),
    ),
    market: t.Optional(
      t.String({
        example: 'ES',
        title: 'Market',
        description:
          'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
      }),
    ),
    limit: t.Optional(
      t.Integer({
        minimum: 0,
        maximum: 10,
        example: 5,
        title: 'Limit',
        description:
          'The maximum number of items to return. Default: 5. Minimum: 1. Maximum: 10.\n',
        default: 5,
      }),
    ),
    offset: t.Optional(
      t.Integer({
        maximum: 9007199254740991,
        example: 5,
        title: 'Offset',
        description:
          'The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.\n',
        default: 0,
      }),
    ),
  }),
  getAnArtistsAlbumsResponse401: t.Object({ error: ErrorObjectSchema }),
  getAnArtistsAlbumsResponse403: t.Object({ error: ErrorObjectSchema }),
  getAnArtistsAlbumsResponse429: t.Object({ error: ErrorObjectSchema }),
  getAnArtistsTopTracksParams: t.Object({
    id: t.String({
      example: '0TnOYISbd1XYRBk9myaseg',
      title: 'Spotify Artist ID',
      description:
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the artist.\n',
    }),
  }),
  getAnArtistsTopTracksQuery: t.Object({
    market: t.Optional(
      t.String({
        example: 'ES',
        title: 'Market',
        description:
          'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
      }),
    ),
  }),
  getAnArtistsTopTracksResponse200: t.Object({ tracks: t.Array(TrackObjectSchema) }),
  getAnArtistsTopTracksResponse401: t.Object({ error: ErrorObjectSchema }),
  getAnArtistsTopTracksResponse403: t.Object({ error: ErrorObjectSchema }),
  getAnArtistsTopTracksResponse429: t.Object({ error: ErrorObjectSchema }),
  getAnArtistsRelatedArtistsParams: t.Object({
    id: t.String({
      example: '0TnOYISbd1XYRBk9myaseg',
      title: 'Spotify Artist ID',
      description:
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the artist.\n',
    }),
  }),
  getAnArtistsRelatedArtistsResponse200: t.Object({ artists: t.Array(ArtistObjectSchema) }),
  getAnArtistsRelatedArtistsResponse401: t.Object({ error: ErrorObjectSchema }),
  getAnArtistsRelatedArtistsResponse403: t.Object({ error: ErrorObjectSchema }),
  getAnArtistsRelatedArtistsResponse429: t.Object({ error: ErrorObjectSchema }),
} as const

export type ArtistsModel = {
  [k in keyof typeof ArtistsModel]: UnwrapSchema<(typeof ArtistsModel)[k]>
}
