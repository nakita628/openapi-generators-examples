import { Hono } from 'hono'
import { describeRoute, validator } from 'hono-openapi'
import { Effect, Schema } from 'effect'
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
      Schema.toStandardSchemaV1(
        Schema.Struct({
          limit: Schema.FiniteFromString.check(
            Schema.isInt(),
            Schema.isGreaterThanOrEqualTo(1),
            Schema.isLessThanOrEqualTo(100),
          )
            .pipe(Schema.withDecodingDefaultType(Effect.succeed(20)))
            .annotate({
              description:
                'The target size of the list of recommended tracks. For seeds with unusually small pools or when highly restrictive filtering is applied, it may be impossible to generate the requested number of recommended tracks. Debugging information for such cases is available in the response. Default: 20\\. Minimum: 1\\. Maximum: 100.\n',
              jsonSchemaExamples: [10],
            }),
          market: Schema.optional(
            Schema.String.annotate({
              description:
                'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
              jsonSchemaExamples: ['ES'],
            }),
          ),
          seed_artists: Schema.optional(
            Schema.String.annotate({
              description:
                'A comma separated list of [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for seed artists.  Up to 5 seed values may be provided in any combination of `seed_artists`, `seed_tracks` and `seed_genres`.<br/> _**Note**: only required if `seed_genres` and `seed_tracks` are not set_.\n',
              jsonSchemaExamples: ['4NHQUGzhtTLFvgF5SZesLK'],
            }),
          ),
          seed_genres: Schema.optional(
            Schema.String.annotate({
              description:
                'A comma separated list of any genres in the set of [available genre seeds](/documentation/web-api/reference/get-recommendation-genres). Up to 5 seed values may be provided in any combination of `seed_artists`, `seed_tracks` and `seed_genres`.<br/> _**Note**: only required if `seed_artists` and `seed_tracks` are not set_.\n',
              jsonSchemaExamples: ['classical,country'],
            }),
          ),
          seed_tracks: Schema.optional(
            Schema.String.annotate({
              description:
                'A comma separated list of [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for a seed track.  Up to 5 seed values may be provided in any combination of `seed_artists`, `seed_tracks` and `seed_genres`.<br/> _**Note**: only required if `seed_artists` and `seed_genres` are not set_.\n',
              jsonSchemaExamples: ['0c6xIDDpzE81m2q797ordA'],
            }),
          ),
          min_acousticness: Schema.optional(
            Schema.FiniteFromString.check(
              Schema.isGreaterThanOrEqualTo(0),
              Schema.isLessThanOrEqualTo(1),
            ).annotate({
              description:
                'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
            }),
          ),
          max_acousticness: Schema.optional(
            Schema.FiniteFromString.check(
              Schema.isGreaterThanOrEqualTo(0),
              Schema.isLessThanOrEqualTo(1),
            ).annotate({
              description:
                'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
            }),
          ),
          target_acousticness: Schema.optional(
            Schema.FiniteFromString.check(
              Schema.isGreaterThanOrEqualTo(0),
              Schema.isLessThanOrEqualTo(1),
            ).annotate({
              description:
                'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
            }),
          ),
          min_danceability: Schema.optional(
            Schema.FiniteFromString.check(
              Schema.isGreaterThanOrEqualTo(0),
              Schema.isLessThanOrEqualTo(1),
            ).annotate({
              description:
                'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
            }),
          ),
          max_danceability: Schema.optional(
            Schema.FiniteFromString.check(
              Schema.isGreaterThanOrEqualTo(0),
              Schema.isLessThanOrEqualTo(1),
            ).annotate({
              description:
                'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
            }),
          ),
          target_danceability: Schema.optional(
            Schema.FiniteFromString.check(
              Schema.isGreaterThanOrEqualTo(0),
              Schema.isLessThanOrEqualTo(1),
            ).annotate({
              description:
                'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
            }),
          ),
          min_duration_ms: Schema.optional(
            Schema.FiniteFromString.check(Schema.isInt()).annotate({
              description:
                'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
            }),
          ),
          max_duration_ms: Schema.optional(
            Schema.FiniteFromString.check(Schema.isInt()).annotate({
              description:
                'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
            }),
          ),
          target_duration_ms: Schema.optional(
            Schema.FiniteFromString.check(Schema.isInt()).annotate({
              description: 'Target duration of the track (ms)',
            }),
          ),
          min_energy: Schema.optional(
            Schema.FiniteFromString.check(
              Schema.isGreaterThanOrEqualTo(0),
              Schema.isLessThanOrEqualTo(1),
            ).annotate({
              description:
                'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
            }),
          ),
          max_energy: Schema.optional(
            Schema.FiniteFromString.check(
              Schema.isGreaterThanOrEqualTo(0),
              Schema.isLessThanOrEqualTo(1),
            ).annotate({
              description:
                'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
            }),
          ),
          target_energy: Schema.optional(
            Schema.FiniteFromString.check(
              Schema.isGreaterThanOrEqualTo(0),
              Schema.isLessThanOrEqualTo(1),
            ).annotate({
              description:
                'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
            }),
          ),
          min_instrumentalness: Schema.optional(
            Schema.FiniteFromString.check(
              Schema.isGreaterThanOrEqualTo(0),
              Schema.isLessThanOrEqualTo(1),
            ).annotate({
              description:
                'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
            }),
          ),
          max_instrumentalness: Schema.optional(
            Schema.FiniteFromString.check(
              Schema.isGreaterThanOrEqualTo(0),
              Schema.isLessThanOrEqualTo(1),
            ).annotate({
              description:
                'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
            }),
          ),
          target_instrumentalness: Schema.optional(
            Schema.FiniteFromString.check(
              Schema.isGreaterThanOrEqualTo(0),
              Schema.isLessThanOrEqualTo(1),
            ).annotate({
              description:
                'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
            }),
          ),
          min_key: Schema.optional(
            Schema.FiniteFromString.check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(0),
              Schema.isLessThanOrEqualTo(11),
            ).annotate({
              description:
                'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
            }),
          ),
          max_key: Schema.optional(
            Schema.FiniteFromString.check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(0),
              Schema.isLessThanOrEqualTo(11),
            ).annotate({
              description:
                'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
            }),
          ),
          target_key: Schema.optional(
            Schema.FiniteFromString.check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(0),
              Schema.isLessThanOrEqualTo(11),
            ).annotate({
              description:
                'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
            }),
          ),
          min_liveness: Schema.optional(
            Schema.FiniteFromString.check(
              Schema.isGreaterThanOrEqualTo(0),
              Schema.isLessThanOrEqualTo(1),
            ).annotate({
              description:
                'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
            }),
          ),
          max_liveness: Schema.optional(
            Schema.FiniteFromString.check(
              Schema.isGreaterThanOrEqualTo(0),
              Schema.isLessThanOrEqualTo(1),
            ).annotate({
              description:
                'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
            }),
          ),
          target_liveness: Schema.optional(
            Schema.FiniteFromString.check(
              Schema.isGreaterThanOrEqualTo(0),
              Schema.isLessThanOrEqualTo(1),
            ).annotate({
              description:
                'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
            }),
          ),
          min_loudness: Schema.optional(
            Schema.FiniteFromString.annotate({
              description:
                'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
            }),
          ),
          max_loudness: Schema.optional(
            Schema.FiniteFromString.annotate({
              description:
                'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
            }),
          ),
          target_loudness: Schema.optional(
            Schema.FiniteFromString.annotate({
              description:
                'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
            }),
          ),
          min_mode: Schema.optional(
            Schema.FiniteFromString.check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(0),
              Schema.isLessThanOrEqualTo(1),
            ).annotate({
              description:
                'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
            }),
          ),
          max_mode: Schema.optional(
            Schema.FiniteFromString.check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(0),
              Schema.isLessThanOrEqualTo(1),
            ).annotate({
              description:
                'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
            }),
          ),
          target_mode: Schema.optional(
            Schema.FiniteFromString.check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(0),
              Schema.isLessThanOrEqualTo(1),
            ).annotate({
              description:
                'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
            }),
          ),
          min_popularity: Schema.optional(
            Schema.FiniteFromString.check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(0),
              Schema.isLessThanOrEqualTo(100),
            ).annotate({
              description:
                'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
            }),
          ),
          max_popularity: Schema.optional(
            Schema.FiniteFromString.check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(0),
              Schema.isLessThanOrEqualTo(100),
            ).annotate({
              description:
                'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
            }),
          ),
          target_popularity: Schema.optional(
            Schema.FiniteFromString.check(
              Schema.isInt(),
              Schema.isGreaterThanOrEqualTo(0),
              Schema.isLessThanOrEqualTo(100),
            ).annotate({
              description:
                'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
            }),
          ),
          min_speechiness: Schema.optional(
            Schema.FiniteFromString.check(
              Schema.isGreaterThanOrEqualTo(0),
              Schema.isLessThanOrEqualTo(1),
            ).annotate({
              description:
                'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
            }),
          ),
          max_speechiness: Schema.optional(
            Schema.FiniteFromString.check(
              Schema.isGreaterThanOrEqualTo(0),
              Schema.isLessThanOrEqualTo(1),
            ).annotate({
              description:
                'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
            }),
          ),
          target_speechiness: Schema.optional(
            Schema.FiniteFromString.check(
              Schema.isGreaterThanOrEqualTo(0),
              Schema.isLessThanOrEqualTo(1),
            ).annotate({
              description:
                'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
            }),
          ),
          min_tempo: Schema.optional(
            Schema.FiniteFromString.annotate({
              description:
                'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
            }),
          ),
          max_tempo: Schema.optional(
            Schema.FiniteFromString.annotate({
              description:
                'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
            }),
          ),
          target_tempo: Schema.optional(
            Schema.FiniteFromString.annotate({ description: 'Target tempo (BPM)' }),
          ),
          min_time_signature: Schema.optional(
            Schema.FiniteFromString.check(Schema.isInt(), Schema.isLessThanOrEqualTo(11)).annotate({
              description:
                'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
            }),
          ),
          max_time_signature: Schema.optional(
            Schema.FiniteFromString.check(Schema.isInt()).annotate({
              description:
                'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
            }),
          ),
          target_time_signature: Schema.optional(
            Schema.FiniteFromString.check(Schema.isInt()).annotate({
              description:
                'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
            }),
          ),
          min_valence: Schema.optional(
            Schema.FiniteFromString.check(
              Schema.isGreaterThanOrEqualTo(0),
              Schema.isLessThanOrEqualTo(1),
            ).annotate({
              description:
                'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
            }),
          ),
          max_valence: Schema.optional(
            Schema.FiniteFromString.check(
              Schema.isGreaterThanOrEqualTo(0),
              Schema.isLessThanOrEqualTo(1),
            ).annotate({
              description:
                'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
            }),
          ),
          target_valence: Schema.optional(
            Schema.FiniteFromString.check(
              Schema.isGreaterThanOrEqualTo(0),
              Schema.isLessThanOrEqualTo(1),
            ).annotate({
              description:
                'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
            }),
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
