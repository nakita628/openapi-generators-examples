import { Hono } from 'hono'
import { describeRoute, validator } from 'hono-openapi'
import { Type, Codec } from 'typebox'
import { Compile } from 'typebox/compile'
import {
  UnauthorizedResponse,
  ForbiddenResponse,
  TooManyRequestsResponse,
  ManyGenresResponse,
  OneRecommendationsResponse,
} from '../components'

export const recommendationsHandler = new Hono()
  .get(
    '/recommendations',
    describeRoute({
      deprecated: true,
      tags: ['Tracks'],
      operationId: 'get-recommendations',
      summary: 'Get Recommendations\n',
      description:
        'Recommendations are generated based on the available information for a given seed entity and matched against similar artists and tracks. If there is sufficient information about the provided seeds, a list of tracks will be returned together with pool size details.\n\nFor artists and tracks that are very new or obscure there might not be enough data to generate a list of tracks.\n',
      responses: {
        '200': OneRecommendationsResponse,
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
      },
      security: [{ oauth_2_0: [] }],
    }),
    validator(
      'query',
      Compile(
        Type.Object({
          limit: Type.Optional(
            Codec(Type.String({ default: '20' }))
              .Decode((value) => Number.parseInt(value, 10))
              .Encode((value) => String(value)),
          ),
          market: Type.Optional(
            Type.String({
              description:
                'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
              examples: ['ES'],
            }),
          ),
          seed_artists: Type.Optional(
            Type.String({
              description:
                'A comma separated list of [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for seed artists.  Up to 5 seed values may be provided in any combination of `seed_artists`, `seed_tracks` and `seed_genres`.<br/> _**Note**: only required if `seed_genres` and `seed_tracks` are not set_.\n',
              examples: ['4NHQUGzhtTLFvgF5SZesLK'],
            }),
          ),
          seed_genres: Type.Optional(
            Type.String({
              description:
                'A comma separated list of any genres in the set of [available genre seeds](/documentation/web-api/reference/get-recommendation-genres). Up to 5 seed values may be provided in any combination of `seed_artists`, `seed_tracks` and `seed_genres`.<br/> _**Note**: only required if `seed_artists` and `seed_tracks` are not set_.\n',
              examples: ['classical,country'],
            }),
          ),
          seed_tracks: Type.Optional(
            Type.String({
              description:
                'A comma separated list of [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for a seed track.  Up to 5 seed values may be provided in any combination of `seed_artists`, `seed_tracks` and `seed_genres`.<br/> _**Note**: only required if `seed_artists` and `seed_genres` are not set_.\n',
              examples: ['0c6xIDDpzE81m2q797ordA'],
            }),
          ),
          min_acousticness: Type.Optional(
            Codec(Type.String())
              .Decode((value) => Number(value))
              .Encode((value) => String(value)),
          ),
          max_acousticness: Type.Optional(
            Codec(Type.String())
              .Decode((value) => Number(value))
              .Encode((value) => String(value)),
          ),
          target_acousticness: Type.Optional(
            Codec(Type.String())
              .Decode((value) => Number(value))
              .Encode((value) => String(value)),
          ),
          min_danceability: Type.Optional(
            Codec(Type.String())
              .Decode((value) => Number(value))
              .Encode((value) => String(value)),
          ),
          max_danceability: Type.Optional(
            Codec(Type.String())
              .Decode((value) => Number(value))
              .Encode((value) => String(value)),
          ),
          target_danceability: Type.Optional(
            Codec(Type.String())
              .Decode((value) => Number(value))
              .Encode((value) => String(value)),
          ),
          min_duration_ms: Type.Optional(
            Codec(Type.String())
              .Decode((value) => Number.parseInt(value, 10))
              .Encode((value) => String(value)),
          ),
          max_duration_ms: Type.Optional(
            Codec(Type.String())
              .Decode((value) => Number.parseInt(value, 10))
              .Encode((value) => String(value)),
          ),
          target_duration_ms: Type.Optional(
            Codec(Type.String())
              .Decode((value) => Number.parseInt(value, 10))
              .Encode((value) => String(value)),
          ),
          min_energy: Type.Optional(
            Codec(Type.String())
              .Decode((value) => Number(value))
              .Encode((value) => String(value)),
          ),
          max_energy: Type.Optional(
            Codec(Type.String())
              .Decode((value) => Number(value))
              .Encode((value) => String(value)),
          ),
          target_energy: Type.Optional(
            Codec(Type.String())
              .Decode((value) => Number(value))
              .Encode((value) => String(value)),
          ),
          min_instrumentalness: Type.Optional(
            Codec(Type.String())
              .Decode((value) => Number(value))
              .Encode((value) => String(value)),
          ),
          max_instrumentalness: Type.Optional(
            Codec(Type.String())
              .Decode((value) => Number(value))
              .Encode((value) => String(value)),
          ),
          target_instrumentalness: Type.Optional(
            Codec(Type.String())
              .Decode((value) => Number(value))
              .Encode((value) => String(value)),
          ),
          min_key: Type.Optional(
            Codec(Type.String())
              .Decode((value) => Number.parseInt(value, 10))
              .Encode((value) => String(value)),
          ),
          max_key: Type.Optional(
            Codec(Type.String())
              .Decode((value) => Number.parseInt(value, 10))
              .Encode((value) => String(value)),
          ),
          target_key: Type.Optional(
            Codec(Type.String())
              .Decode((value) => Number.parseInt(value, 10))
              .Encode((value) => String(value)),
          ),
          min_liveness: Type.Optional(
            Codec(Type.String())
              .Decode((value) => Number(value))
              .Encode((value) => String(value)),
          ),
          max_liveness: Type.Optional(
            Codec(Type.String())
              .Decode((value) => Number(value))
              .Encode((value) => String(value)),
          ),
          target_liveness: Type.Optional(
            Codec(Type.String())
              .Decode((value) => Number(value))
              .Encode((value) => String(value)),
          ),
          min_loudness: Type.Optional(
            Codec(Type.String())
              .Decode((value) => Number(value))
              .Encode((value) => String(value)),
          ),
          max_loudness: Type.Optional(
            Codec(Type.String())
              .Decode((value) => Number(value))
              .Encode((value) => String(value)),
          ),
          target_loudness: Type.Optional(
            Codec(Type.String())
              .Decode((value) => Number(value))
              .Encode((value) => String(value)),
          ),
          min_mode: Type.Optional(
            Codec(Type.String())
              .Decode((value) => Number.parseInt(value, 10))
              .Encode((value) => String(value)),
          ),
          max_mode: Type.Optional(
            Codec(Type.String())
              .Decode((value) => Number.parseInt(value, 10))
              .Encode((value) => String(value)),
          ),
          target_mode: Type.Optional(
            Codec(Type.String())
              .Decode((value) => Number.parseInt(value, 10))
              .Encode((value) => String(value)),
          ),
          min_popularity: Type.Optional(
            Codec(Type.String())
              .Decode((value) => Number.parseInt(value, 10))
              .Encode((value) => String(value)),
          ),
          max_popularity: Type.Optional(
            Codec(Type.String())
              .Decode((value) => Number.parseInt(value, 10))
              .Encode((value) => String(value)),
          ),
          target_popularity: Type.Optional(
            Codec(Type.String())
              .Decode((value) => Number.parseInt(value, 10))
              .Encode((value) => String(value)),
          ),
          min_speechiness: Type.Optional(
            Codec(Type.String())
              .Decode((value) => Number(value))
              .Encode((value) => String(value)),
          ),
          max_speechiness: Type.Optional(
            Codec(Type.String())
              .Decode((value) => Number(value))
              .Encode((value) => String(value)),
          ),
          target_speechiness: Type.Optional(
            Codec(Type.String())
              .Decode((value) => Number(value))
              .Encode((value) => String(value)),
          ),
          min_tempo: Type.Optional(
            Codec(Type.String())
              .Decode((value) => Number(value))
              .Encode((value) => String(value)),
          ),
          max_tempo: Type.Optional(
            Codec(Type.String())
              .Decode((value) => Number(value))
              .Encode((value) => String(value)),
          ),
          target_tempo: Type.Optional(
            Codec(Type.String())
              .Decode((value) => Number(value))
              .Encode((value) => String(value)),
          ),
          min_time_signature: Type.Optional(
            Codec(Type.String())
              .Decode((value) => Number.parseInt(value, 10))
              .Encode((value) => String(value)),
          ),
          max_time_signature: Type.Optional(
            Codec(Type.String())
              .Decode((value) => Number.parseInt(value, 10))
              .Encode((value) => String(value)),
          ),
          target_time_signature: Type.Optional(
            Codec(Type.String())
              .Decode((value) => Number.parseInt(value, 10))
              .Encode((value) => String(value)),
          ),
          min_valence: Type.Optional(
            Codec(Type.String())
              .Decode((value) => Number(value))
              .Encode((value) => String(value)),
          ),
          max_valence: Type.Optional(
            Codec(Type.String())
              .Decode((value) => Number(value))
              .Encode((value) => String(value)),
          ),
          target_valence: Type.Optional(
            Codec(Type.String())
              .Decode((value) => Number(value))
              .Encode((value) => String(value)),
          ),
        }),
      ),
    ),
    (c) => {},
  )
  .get(
    '/recommendations/available-genre-seeds',
    describeRoute({
      deprecated: true,
      tags: ['Genres'],
      operationId: 'get-recommendation-genres',
      summary: 'Get Available Genre Seeds\n',
      description:
        'Retrieve a list of available genres seed parameter values for [recommendations](/documentation/web-api/reference/get-recommendations).\n',
      responses: {
        '200': ManyGenresResponse,
        '401': UnauthorizedResponse,
        '403': ForbiddenResponse,
        '429': TooManyRequestsResponse,
      },
      security: [{ oauth_2_0: [] }],
    }),
    (c) => {},
  )
