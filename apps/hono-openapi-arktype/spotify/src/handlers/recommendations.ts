import { Hono } from 'hono'
import { describeRoute, validator } from 'hono-openapi'
import { type } from 'arktype'
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
      type({
        'limit?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 1 & number.integer <= 100')
          .describe(
            'The target size of the list of recommended tracks. For seeds with unusually small pools or when highly restrictive filtering is applied, it may be impossible to generate the requested number of recommended tracks. Debugging information for such cases is available in the response. Default: 20\\. Minimum: 1\\. Maximum: 100.\n',
          ),
        'market?': type('string').describe(
          'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
        ),
        'seed_artists?': type('string').describe(
          'A comma separated list of [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for seed artists.  Up to 5 seed values may be provided in any combination of `seed_artists`, `seed_tracks` and `seed_genres`.<br/> _**Note**: only required if `seed_genres` and `seed_tracks` are not set_.\n',
        ),
        'seed_genres?': type('string').describe(
          'A comma separated list of any genres in the set of [available genre seeds](/documentation/web-api/reference/get-recommendation-genres). Up to 5 seed values may be provided in any combination of `seed_artists`, `seed_tracks` and `seed_genres`.<br/> _**Note**: only required if `seed_artists` and `seed_tracks` are not set_.\n',
        ),
        'seed_tracks?': type('string').describe(
          'A comma separated list of [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for a seed track.  Up to 5 seed values may be provided in any combination of `seed_artists`, `seed_tracks` and `seed_genres`.<br/> _**Note**: only required if `seed_artists` and `seed_genres` are not set_.\n',
        ),
        'min_acousticness?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(data)
              ? Number(data)
              : Number.NaN
            return Number.isFinite(value) ? value : ctx.error('a number')
          })
          .to('number >= 0 & number <= 1')
          .describe(
            'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
          ),
        'max_acousticness?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(data)
              ? Number(data)
              : Number.NaN
            return Number.isFinite(value) ? value : ctx.error('a number')
          })
          .to('number >= 0 & number <= 1')
          .describe(
            'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
          ),
        'target_acousticness?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(data)
              ? Number(data)
              : Number.NaN
            return Number.isFinite(value) ? value : ctx.error('a number')
          })
          .to('number >= 0 & number <= 1')
          .describe(
            'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
          ),
        'min_danceability?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(data)
              ? Number(data)
              : Number.NaN
            return Number.isFinite(value) ? value : ctx.error('a number')
          })
          .to('number >= 0 & number <= 1')
          .describe(
            'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
          ),
        'max_danceability?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(data)
              ? Number(data)
              : Number.NaN
            return Number.isFinite(value) ? value : ctx.error('a number')
          })
          .to('number >= 0 & number <= 1')
          .describe(
            'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
          ),
        'target_danceability?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(data)
              ? Number(data)
              : Number.NaN
            return Number.isFinite(value) ? value : ctx.error('a number')
          })
          .to('number >= 0 & number <= 1')
          .describe(
            'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
          ),
        'min_duration_ms?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .describe(
            'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
          ),
        'max_duration_ms?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .describe(
            'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
          ),
        'target_duration_ms?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .describe('Target duration of the track (ms)'),
        'min_energy?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(data)
              ? Number(data)
              : Number.NaN
            return Number.isFinite(value) ? value : ctx.error('a number')
          })
          .to('number >= 0 & number <= 1')
          .describe(
            'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
          ),
        'max_energy?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(data)
              ? Number(data)
              : Number.NaN
            return Number.isFinite(value) ? value : ctx.error('a number')
          })
          .to('number >= 0 & number <= 1')
          .describe(
            'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
          ),
        'target_energy?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(data)
              ? Number(data)
              : Number.NaN
            return Number.isFinite(value) ? value : ctx.error('a number')
          })
          .to('number >= 0 & number <= 1')
          .describe(
            'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
          ),
        'min_instrumentalness?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(data)
              ? Number(data)
              : Number.NaN
            return Number.isFinite(value) ? value : ctx.error('a number')
          })
          .to('number >= 0 & number <= 1')
          .describe(
            'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
          ),
        'max_instrumentalness?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(data)
              ? Number(data)
              : Number.NaN
            return Number.isFinite(value) ? value : ctx.error('a number')
          })
          .to('number >= 0 & number <= 1')
          .describe(
            'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
          ),
        'target_instrumentalness?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(data)
              ? Number(data)
              : Number.NaN
            return Number.isFinite(value) ? value : ctx.error('a number')
          })
          .to('number >= 0 & number <= 1')
          .describe(
            'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
          ),
        'min_key?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 0 & number.integer <= 11')
          .describe(
            'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
          ),
        'max_key?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 0 & number.integer <= 11')
          .describe(
            'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
          ),
        'target_key?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 0 & number.integer <= 11')
          .describe(
            'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
          ),
        'min_liveness?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(data)
              ? Number(data)
              : Number.NaN
            return Number.isFinite(value) ? value : ctx.error('a number')
          })
          .to('number >= 0 & number <= 1')
          .describe(
            'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
          ),
        'max_liveness?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(data)
              ? Number(data)
              : Number.NaN
            return Number.isFinite(value) ? value : ctx.error('a number')
          })
          .to('number >= 0 & number <= 1')
          .describe(
            'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
          ),
        'target_liveness?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(data)
              ? Number(data)
              : Number.NaN
            return Number.isFinite(value) ? value : ctx.error('a number')
          })
          .to('number >= 0 & number <= 1')
          .describe(
            'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
          ),
        'min_loudness?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(data)
              ? Number(data)
              : Number.NaN
            return Number.isFinite(value) ? value : ctx.error('a number')
          })
          .describe(
            'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
          ),
        'max_loudness?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(data)
              ? Number(data)
              : Number.NaN
            return Number.isFinite(value) ? value : ctx.error('a number')
          })
          .describe(
            'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
          ),
        'target_loudness?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(data)
              ? Number(data)
              : Number.NaN
            return Number.isFinite(value) ? value : ctx.error('a number')
          })
          .describe(
            'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
          ),
        'min_mode?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 0 & number.integer <= 1')
          .describe(
            'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
          ),
        'max_mode?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 0 & number.integer <= 1')
          .describe(
            'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
          ),
        'target_mode?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 0 & number.integer <= 1')
          .describe(
            'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
          ),
        'min_popularity?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 0 & number.integer <= 100')
          .describe(
            'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
          ),
        'max_popularity?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 0 & number.integer <= 100')
          .describe(
            'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
          ),
        'target_popularity?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer >= 0 & number.integer <= 100')
          .describe(
            'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
          ),
        'min_speechiness?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(data)
              ? Number(data)
              : Number.NaN
            return Number.isFinite(value) ? value : ctx.error('a number')
          })
          .to('number >= 0 & number <= 1')
          .describe(
            'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
          ),
        'max_speechiness?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(data)
              ? Number(data)
              : Number.NaN
            return Number.isFinite(value) ? value : ctx.error('a number')
          })
          .to('number >= 0 & number <= 1')
          .describe(
            'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
          ),
        'target_speechiness?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(data)
              ? Number(data)
              : Number.NaN
            return Number.isFinite(value) ? value : ctx.error('a number')
          })
          .to('number >= 0 & number <= 1')
          .describe(
            'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
          ),
        'min_tempo?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(data)
              ? Number(data)
              : Number.NaN
            return Number.isFinite(value) ? value : ctx.error('a number')
          })
          .describe(
            'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
          ),
        'max_tempo?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(data)
              ? Number(data)
              : Number.NaN
            return Number.isFinite(value) ? value : ctx.error('a number')
          })
          .describe(
            'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
          ),
        'target_tempo?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(data)
              ? Number(data)
              : Number.NaN
            return Number.isFinite(value) ? value : ctx.error('a number')
          })
          .describe('Target tempo (BPM)'),
        'min_time_signature?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .to('number.integer <= 11')
          .describe(
            'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
          ),
        'max_time_signature?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .describe(
            'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
          ),
        'target_time_signature?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
            return Number.isSafeInteger(value) ? value : ctx.error('an integer')
          })
          .describe(
            'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
          ),
        'min_valence?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(data)
              ? Number(data)
              : Number.NaN
            return Number.isFinite(value) ? value : ctx.error('a number')
          })
          .to('number >= 0 & number <= 1')
          .describe(
            'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
          ),
        'max_valence?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(data)
              ? Number(data)
              : Number.NaN
            return Number.isFinite(value) ? value : ctx.error('a number')
          })
          .to('number >= 0 & number <= 1')
          .describe(
            'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
          ),
        'target_valence?': type('string')
          .pipe((data, ctx) => {
            const value = /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(data)
              ? Number(data)
              : Number.NaN
            return Number.isFinite(value) ? value : ctx.error('a number')
          })
          .to('number >= 0 & number <= 1')
          .describe(
            'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
          ),
      }),
    ),
    (c) => { throw new Error('Not implemented') },
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
    (c) => { throw new Error('Not implemented') },
  )
