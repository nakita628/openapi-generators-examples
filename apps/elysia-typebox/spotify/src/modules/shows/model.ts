import { t, type UnwrapSchema } from 'elysia'
import { ErrorObjectSchema, SimplifiedShowObjectSchema } from '../../components/schemas'

export const ShowsModel = {
  getAShowParams: t.Object({
    id: t.String({
      example: '38bS44xjbVVZ3No3ByF1dJ',
      title: 'Spotify Show ID',
      description:
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)\nfor the show.\n',
    }),
  }),
  getAShowQuery: t.Object({
    market: t.Optional(
      t.String({
        example: 'ES',
        title: 'Market',
        description:
          'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
      }),
    ),
  }),
  getAShowResponse401: t.Object({ error: ErrorObjectSchema }),
  getAShowResponse403: t.Object({ error: ErrorObjectSchema }),
  getAShowResponse429: t.Object({ error: ErrorObjectSchema }),
  getMultipleShowsQuery: t.Object({
    market: t.Optional(
      t.String({
        example: 'ES',
        title: 'Market',
        description:
          'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
      }),
    ),
    ids: t.String({
      example: '5CfCWKI5pZ28U0uOzXkDHe,5as3aKmN2k11yfDDDSrvaZ',
      title: 'Ids',
      description:
        'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for the shows. Maximum: 50 IDs.\n',
    }),
  }),
  getMultipleShowsResponse200: t.Object({ shows: t.Array(SimplifiedShowObjectSchema) }),
  getMultipleShowsResponse401: t.Object({ error: ErrorObjectSchema }),
  getMultipleShowsResponse403: t.Object({ error: ErrorObjectSchema }),
  getMultipleShowsResponse429: t.Object({ error: ErrorObjectSchema }),
  getAShowsEpisodesParams: t.Object({
    id: t.String({
      example: '38bS44xjbVVZ3No3ByF1dJ',
      title: 'Spotify Show ID',
      description:
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)\nfor the show.\n',
    }),
  }),
  getAShowsEpisodesQuery: t.Object({
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
  getAShowsEpisodesResponse401: t.Object({ error: ErrorObjectSchema }),
  getAShowsEpisodesResponse403: t.Object({ error: ErrorObjectSchema }),
  getAShowsEpisodesResponse429: t.Object({ error: ErrorObjectSchema }),
} as const

export type ShowsModel = { [k in keyof typeof ShowsModel]: UnwrapSchema<(typeof ShowsModel)[k]> }
