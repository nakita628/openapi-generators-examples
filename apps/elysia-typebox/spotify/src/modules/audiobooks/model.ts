import { t, type UnwrapSchema } from 'elysia'
import { AudiobookObjectSchema, ErrorObjectSchema } from '../../components/schemas'

export const AudiobooksModel = {
  getAnAudiobookParams: t.Object({
    id: t.String({
      example: '7iHfbu1YPACw6oZPAFJtqe',
      title: 'Spotify Audiobook ID',
      description:
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)\nfor the audiobook.\n',
    }),
  }),
  getAnAudiobookQuery: t.Object({
    market: t.Optional(
      t.String({
        example: 'ES',
        title: 'Market',
        description:
          'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
      }),
    ),
  }),
  getAnAudiobookResponse400: t.Object({ error: ErrorObjectSchema }),
  getAnAudiobookResponse401: t.Object({ error: ErrorObjectSchema }),
  getAnAudiobookResponse403: t.Object({ error: ErrorObjectSchema }),
  getAnAudiobookResponse404: t.Object({ error: ErrorObjectSchema }),
  getAnAudiobookResponse429: t.Object({ error: ErrorObjectSchema }),
  getMultipleAudiobooksQuery: t.Object({
    ids: t.String({
      example: '18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ,7iHfbu1YPACw6oZPAFJtqe',
      title: 'Spotify Audiobook IDs',
      description:
        'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=18yVqkdbdRvS24c0Ilj2ci,1HGw3J3NxZO1TP1BTtVhpZ`. Maximum: 50 IDs.\n',
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
  getMultipleAudiobooksResponse200: t.Object({ audiobooks: t.Array(AudiobookObjectSchema) }),
  getMultipleAudiobooksResponse401: t.Object({ error: ErrorObjectSchema }),
  getMultipleAudiobooksResponse403: t.Object({ error: ErrorObjectSchema }),
  getMultipleAudiobooksResponse429: t.Object({ error: ErrorObjectSchema }),
  getAudiobookChaptersParams: t.Object({
    id: t.String({
      example: '7iHfbu1YPACw6oZPAFJtqe',
      title: 'Spotify Audiobook ID',
      description:
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)\nfor the audiobook.\n',
    }),
  }),
  getAudiobookChaptersQuery: t.Object({
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
  getAudiobookChaptersResponse401: t.Object({ error: ErrorObjectSchema }),
  getAudiobookChaptersResponse403: t.Object({ error: ErrorObjectSchema }),
  getAudiobookChaptersResponse429: t.Object({ error: ErrorObjectSchema }),
} as const

export type AudiobooksModel = {
  [k in keyof typeof AudiobooksModel]: UnwrapSchema<(typeof AudiobooksModel)[k]>
}
