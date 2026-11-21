import { t, type UnwrapSchema } from 'elysia'
import { ErrorObjectSchema, TrackObjectSchema } from '../../components/schemas'

export const TracksModel = {
  getTrackParams: t.Object({
    id: t.String({
      example: '11dFghVXANMlKmJXsNCbNl',
      title: 'Spotify Track ID',
      description:
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)\nfor the track.\n',
    }),
  }),
  getTrackQuery: t.Object({
    market: t.Optional(
      t.String({
        example: 'ES',
        title: 'Market',
        description:
          'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
      }),
    ),
  }),
  getTrackResponse401: t.Object({ error: ErrorObjectSchema }),
  getTrackResponse403: t.Object({ error: ErrorObjectSchema }),
  getTrackResponse429: t.Object({ error: ErrorObjectSchema }),
  getSeveralTracksQuery: t.Object({
    market: t.Optional(
      t.String({
        example: 'ES',
        title: 'Market',
        description:
          'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
      }),
    ),
    ids: t.String({
      example: '7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B',
      title: 'Spotify Track IDs',
      description:
        'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids). For example: `ids=4iV5W9uYEdYUVa79Axb7Rh,1301WleyT98MSxVHPZCA6M`. Maximum: 50 IDs.\n',
    }),
  }),
  getSeveralTracksResponse200: t.Object({ tracks: t.Array(TrackObjectSchema) }),
  getSeveralTracksResponse401: t.Object({ error: ErrorObjectSchema }),
  getSeveralTracksResponse403: t.Object({ error: ErrorObjectSchema }),
  getSeveralTracksResponse429: t.Object({ error: ErrorObjectSchema }),
} as const

export type TracksModel = { [k in keyof typeof TracksModel]: UnwrapSchema<(typeof TracksModel)[k]> }
