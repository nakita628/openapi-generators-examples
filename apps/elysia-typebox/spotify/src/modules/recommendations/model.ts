import { t, type UnwrapSchema } from 'elysia'
import { ErrorObjectSchema } from '../../components/schemas'

export const RecommendationsModel = {
  getRecommendationsQuery: t.Object({
    limit: t.Optional(
      t.Integer({
        minimum: 1,
        maximum: 100,
        example: 10,
        title: 'Limit',
        description:
          'The target size of the list of recommended tracks. For seeds with unusually small pools or when highly restrictive filtering is applied, it may be impossible to generate the requested number of recommended tracks. Debugging information for such cases is available in the response. Default: 20\\. Minimum: 1\\. Maximum: 100.\n',
        default: 20,
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
    seed_artists: t.Optional(
      t.String({
        example: '4NHQUGzhtTLFvgF5SZesLK',
        title: 'Spotify Artist ID Seeds',
        description:
          'A comma separated list of [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for seed artists.  Up to 5 seed values may be provided in any combination of `seed_artists`, `seed_tracks` and `seed_genres`.<br/> _**Note**: only required if `seed_genres` and `seed_tracks` are not set_.\n',
      }),
    ),
    seed_genres: t.Optional(
      t.String({
        example: 'classical,country',
        title: 'Genres Seeds',
        description:
          'A comma separated list of any genres in the set of [available genre seeds](/documentation/web-api/reference/get-recommendation-genres). Up to 5 seed values may be provided in any combination of `seed_artists`, `seed_tracks` and `seed_genres`.<br/> _**Note**: only required if `seed_artists` and `seed_tracks` are not set_.\n',
      }),
    ),
    seed_tracks: t.Optional(
      t.String({
        example: '0c6xIDDpzE81m2q797ordA',
        title: 'Spotify Track ID Seeds',
        description:
          'A comma separated list of [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for a seed track.  Up to 5 seed values may be provided in any combination of `seed_artists`, `seed_tracks` and `seed_genres`.<br/> _**Note**: only required if `seed_artists` and `seed_genres` are not set_.\n',
      }),
    ),
    min_acousticness: t.Optional(
      t.Number({
        minimum: 0,
        maximum: 1,
        title: 'Min. Acousticness',
        description:
          'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
      }),
    ),
    max_acousticness: t.Optional(
      t.Number({
        minimum: 0,
        maximum: 1,
        title: 'Max. Acousticness',
        description:
          'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
      }),
    ),
    target_acousticness: t.Optional(
      t.Number({
        minimum: 0,
        maximum: 1,
        title: 'Target Acousticness',
        description:
          'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
      }),
    ),
    min_danceability: t.Optional(
      t.Number({
        minimum: 0,
        maximum: 1,
        title: 'Min. Danceability',
        description:
          'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
      }),
    ),
    max_danceability: t.Optional(
      t.Number({
        minimum: 0,
        maximum: 1,
        title: 'Max. Danceability',
        description:
          'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
      }),
    ),
    target_danceability: t.Optional(
      t.Number({
        minimum: 0,
        maximum: 1,
        title: 'Target Danceability',
        description:
          'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
      }),
    ),
    min_duration_ms: t.Optional(
      t.Integer({
        maximum: 9007199254740991,
        title: 'Min. Duration (ms)',
        description:
          'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
      }),
    ),
    max_duration_ms: t.Optional(
      t.Integer({
        maximum: 9007199254740991,
        title: 'Max. Duration (ms)',
        description:
          'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
      }),
    ),
    target_duration_ms: t.Optional(
      t.Integer({
        maximum: 9007199254740991,
        title: 'Target Duration (ms)',
        description: 'Target duration of the track (ms)',
      }),
    ),
    min_energy: t.Optional(
      t.Number({
        minimum: 0,
        maximum: 1,
        title: 'Min. Energy',
        description:
          'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
      }),
    ),
    max_energy: t.Optional(
      t.Number({
        minimum: 0,
        maximum: 1,
        title: 'Max. Energy',
        description:
          'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
      }),
    ),
    target_energy: t.Optional(
      t.Number({
        minimum: 0,
        maximum: 1,
        title: 'Target Energy',
        description:
          'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
      }),
    ),
    min_instrumentalness: t.Optional(
      t.Number({
        minimum: 0,
        maximum: 1,
        title: 'Min. Instrumentalness',
        description:
          'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
      }),
    ),
    max_instrumentalness: t.Optional(
      t.Number({
        minimum: 0,
        maximum: 1,
        title: 'Max. Instrumentalness',
        description:
          'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
      }),
    ),
    target_instrumentalness: t.Optional(
      t.Number({
        minimum: 0,
        maximum: 1,
        title: 'Target Instrumentalness',
        description:
          'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
      }),
    ),
    min_key: t.Optional(
      t.Integer({
        minimum: 0,
        maximum: 11,
        title: 'Min. Key',
        description:
          'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
      }),
    ),
    max_key: t.Optional(
      t.Integer({
        minimum: 0,
        maximum: 11,
        title: 'Max. Key',
        description:
          'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
      }),
    ),
    target_key: t.Optional(
      t.Integer({
        minimum: 0,
        maximum: 11,
        title: 'Target Key',
        description:
          'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
      }),
    ),
    min_liveness: t.Optional(
      t.Number({
        minimum: 0,
        maximum: 1,
        title: 'Min. Liveness',
        description:
          'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
      }),
    ),
    max_liveness: t.Optional(
      t.Number({
        minimum: 0,
        maximum: 1,
        title: 'Max. Liveness',
        description:
          'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
      }),
    ),
    target_liveness: t.Optional(
      t.Number({
        minimum: 0,
        maximum: 1,
        title: 'Target Liveness',
        description:
          'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
      }),
    ),
    min_loudness: t.Optional(
      t.Number({
        title: 'Min. Loudness',
        description:
          'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
      }),
    ),
    max_loudness: t.Optional(
      t.Number({
        title: 'Max. Loudness',
        description:
          'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
      }),
    ),
    target_loudness: t.Optional(
      t.Number({
        title: 'Target Loudness',
        description:
          'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
      }),
    ),
    min_mode: t.Optional(
      t.Integer({
        minimum: 0,
        maximum: 1,
        title: 'Min. Mode',
        description:
          'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
      }),
    ),
    max_mode: t.Optional(
      t.Integer({
        minimum: 0,
        maximum: 1,
        title: 'Max. Mode',
        description:
          'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
      }),
    ),
    target_mode: t.Optional(
      t.Integer({
        minimum: 0,
        maximum: 1,
        title: 'Target Mode',
        description:
          'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
      }),
    ),
    min_popularity: t.Optional(
      t.Integer({
        minimum: 0,
        maximum: 100,
        title: 'Min. Popularity',
        description:
          'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
      }),
    ),
    max_popularity: t.Optional(
      t.Integer({
        minimum: 0,
        maximum: 100,
        title: 'Max. Popularity',
        description:
          'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
      }),
    ),
    target_popularity: t.Optional(
      t.Integer({
        minimum: 0,
        maximum: 100,
        title: 'Target Popularity',
        description:
          'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
      }),
    ),
    min_speechiness: t.Optional(
      t.Number({
        minimum: 0,
        maximum: 1,
        title: 'Min. Speechiness',
        description:
          'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
      }),
    ),
    max_speechiness: t.Optional(
      t.Number({
        minimum: 0,
        maximum: 1,
        title: 'Max. Speechiness',
        description:
          'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
      }),
    ),
    target_speechiness: t.Optional(
      t.Number({
        minimum: 0,
        maximum: 1,
        title: 'Target Speechiness',
        description:
          'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
      }),
    ),
    min_tempo: t.Optional(
      t.Number({
        title: 'Min. Tempo',
        description:
          'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
      }),
    ),
    max_tempo: t.Optional(
      t.Number({
        title: 'Max. Tempo',
        description:
          'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
      }),
    ),
    target_tempo: t.Optional(
      t.Number({ title: 'Target Tempo', description: 'Target tempo (BPM)' }),
    ),
    min_time_signature: t.Optional(
      t.Integer({
        maximum: 11,
        title: 'Min. Time Signature',
        description:
          'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
      }),
    ),
    max_time_signature: t.Optional(
      t.Integer({
        maximum: 9007199254740991,
        title: 'Max. Time Signature',
        description:
          'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
      }),
    ),
    target_time_signature: t.Optional(
      t.Integer({
        maximum: 9007199254740991,
        title: 'Target Time Signature',
        description:
          'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
      }),
    ),
    min_valence: t.Optional(
      t.Number({
        minimum: 0,
        maximum: 1,
        title: 'Min. Valence',
        description:
          'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
      }),
    ),
    max_valence: t.Optional(
      t.Number({
        minimum: 0,
        maximum: 1,
        title: 'Max. Valence',
        description:
          'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
      }),
    ),
    target_valence: t.Optional(
      t.Number({
        minimum: 0,
        maximum: 1,
        title: 'Target Valence',
        description:
          'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
      }),
    ),
  }),
  getRecommendationsResponse401: t.Object({ error: ErrorObjectSchema }),
  getRecommendationsResponse403: t.Object({ error: ErrorObjectSchema }),
  getRecommendationsResponse429: t.Object({ error: ErrorObjectSchema }),
  getRecommendationGenresResponse200: t.Object({
    genres: t.Array(t.String(), { example: ['alternative', 'samba'] }),
  }),
  getRecommendationGenresResponse401: t.Object({ error: ErrorObjectSchema }),
  getRecommendationGenresResponse403: t.Object({ error: ErrorObjectSchema }),
  getRecommendationGenresResponse429: t.Object({ error: ErrorObjectSchema }),
} as const

export type RecommendationsModel = {
  [k in keyof typeof RecommendationsModel]: UnwrapSchema<(typeof RecommendationsModel)[k]>
}
