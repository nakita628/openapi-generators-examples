import { t, type UnwrapSchema } from 'elysia'
import { AlbumObjectSchema, ErrorObjectSchema } from '../../components/schemas'

export const AlbumsModel = {
  getAnAlbumParams: t.Object({
    id: t.String({
      example: '4aawyAB9vmqN3uQ7FjRGTy',
      title: 'Spotify Album ID',
      description:
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the album.\n',
    }),
  }),
  getAnAlbumQuery: t.Object({
    market: t.Optional(
      t.String({
        example: 'ES',
        title: 'Market',
        description:
          'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
      }),
    ),
  }),
  getAnAlbumResponse401: t.Object({ error: ErrorObjectSchema }),
  getAnAlbumResponse403: t.Object({ error: ErrorObjectSchema }),
  getAnAlbumResponse429: t.Object({ error: ErrorObjectSchema }),
  getMultipleAlbumsQuery: t.Object({
    ids: t.String({
      example: '382ObEPsp2rxGrnsizN5TX,1A2GTWGtFfWp7KSQTwWOyo,2noRn2Aes5aoNVsU6iWThc',
      title: 'Spotify Album IDs',
      description:
        'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the albums. Maximum: 20 IDs.\n',
    }),
    market: t.Optional(
      t.String({
        example: 'ES',
        title: 'Market',
        description:
          'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
      }),
    ),
  }),
  getMultipleAlbumsResponse200: t.Object({ albums: t.Array(AlbumObjectSchema) }),
  getMultipleAlbumsResponse401: t.Object({ error: ErrorObjectSchema }),
  getMultipleAlbumsResponse403: t.Object({ error: ErrorObjectSchema }),
  getMultipleAlbumsResponse429: t.Object({ error: ErrorObjectSchema }),
  getAnAlbumsTracksParams: t.Object({
    id: t.String({
      example: '4aawyAB9vmqN3uQ7FjRGTy',
      title: 'Spotify Album ID',
      description:
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) of the album.\n',
    }),
  }),
  getAnAlbumsTracksQuery: t.Object({
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
        minimum: 1,
        maximum: 50,
        example: 10,
        title: 'Limit',
        description:
          'The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.\n',
        default: 20,
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
  getAnAlbumsTracksResponse401: t.Object({ error: ErrorObjectSchema }),
  getAnAlbumsTracksResponse403: t.Object({ error: ErrorObjectSchema }),
  getAnAlbumsTracksResponse429: t.Object({ error: ErrorObjectSchema }),
} as const

export type AlbumsModel = { [k in keyof typeof AlbumsModel]: UnwrapSchema<(typeof AlbumsModel)[k]> }
