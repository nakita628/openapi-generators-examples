import { os } from '@orpc/server'
import * as z from 'zod'
import { RecommendationsObjectSchema } from '../components'

export const getRecommendations = os
  .route({
    method: 'GET',
    path: '/recommendations',
    tags: ['Tracks'],
    summary: 'Get Recommendations\n',
    description:
      'Recommendations are generated based on the available information for a given seed entity and matched against similar artists and tracks. If there is sufficient information about the provided seeds, a list of tracks will be returned together with pool size details.\n\nFor artists and tracks that are very new or obscure there might not be enough data to generate a list of tracks.\n',
    deprecated: true,
    successDescription: 'A set of recommendations',
  })
  .input(
    z.object({
      limit: z
        .preprocess(
          (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
          z.number().int().min(1).max(100),
        )
        .default(20)
        .meta({
          description:
            'The target size of the list of recommended tracks. For seeds with unusually small pools or when highly restrictive filtering is applied, it may be impossible to generate the requested number of recommended tracks. Debugging information for such cases is available in the response. Default: 20\\. Minimum: 1\\. Maximum: 100.\n',
          examples: [10],
        })
        .exactOptional(),
      market: z
        .string()
        .meta({
          description:
            'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
          examples: ['ES'],
        })
        .exactOptional(),
      seed_artists: z
        .string()
        .meta({
          description:
            'A comma separated list of [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for seed artists.  Up to 5 seed values may be provided in any combination of `seed_artists`, `seed_tracks` and `seed_genres`.<br/> _**Note**: only required if `seed_genres` and `seed_tracks` are not set_.\n',
          examples: ['4NHQUGzhtTLFvgF5SZesLK'],
        })
        .exactOptional(),
      seed_genres: z
        .string()
        .meta({
          description:
            'A comma separated list of any genres in the set of [available genre seeds](/documentation/web-api/reference/get-recommendation-genres). Up to 5 seed values may be provided in any combination of `seed_artists`, `seed_tracks` and `seed_genres`.<br/> _**Note**: only required if `seed_artists` and `seed_tracks` are not set_.\n',
          examples: ['classical,country'],
        })
        .exactOptional(),
      seed_tracks: z
        .string()
        .meta({
          description:
            'A comma separated list of [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for a seed track.  Up to 5 seed values may be provided in any combination of `seed_artists`, `seed_tracks` and `seed_genres`.<br/> _**Note**: only required if `seed_artists` and `seed_genres` are not set_.\n',
          examples: ['0c6xIDDpzE81m2q797ordA'],
        })
        .exactOptional(),
      min_acousticness: z
        .preprocess(
          (val) =>
            typeof val === 'string' && /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(val)
              ? Number(val)
              : val,
          z.number().min(0).max(1),
        )
        .meta({
          description:
            'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
        })
        .exactOptional(),
      max_acousticness: z
        .preprocess(
          (val) =>
            typeof val === 'string' && /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(val)
              ? Number(val)
              : val,
          z.number().min(0).max(1),
        )
        .meta({
          description:
            'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
        })
        .exactOptional(),
      target_acousticness: z
        .preprocess(
          (val) =>
            typeof val === 'string' && /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(val)
              ? Number(val)
              : val,
          z.number().min(0).max(1),
        )
        .meta({
          description:
            'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
        })
        .exactOptional(),
      min_danceability: z
        .preprocess(
          (val) =>
            typeof val === 'string' && /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(val)
              ? Number(val)
              : val,
          z.number().min(0).max(1),
        )
        .meta({
          description:
            'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
        })
        .exactOptional(),
      max_danceability: z
        .preprocess(
          (val) =>
            typeof val === 'string' && /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(val)
              ? Number(val)
              : val,
          z.number().min(0).max(1),
        )
        .meta({
          description:
            'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
        })
        .exactOptional(),
      target_danceability: z
        .preprocess(
          (val) =>
            typeof val === 'string' && /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(val)
              ? Number(val)
              : val,
          z.number().min(0).max(1),
        )
        .meta({
          description:
            'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
        })
        .exactOptional(),
      min_duration_ms: z
        .preprocess(
          (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
          z.number().int(),
        )
        .meta({
          description:
            'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
        })
        .exactOptional(),
      max_duration_ms: z
        .preprocess(
          (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
          z.number().int(),
        )
        .meta({
          description:
            'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
        })
        .exactOptional(),
      target_duration_ms: z
        .preprocess(
          (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
          z.number().int(),
        )
        .meta({ description: 'Target duration of the track (ms)' })
        .exactOptional(),
      min_energy: z
        .preprocess(
          (val) =>
            typeof val === 'string' && /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(val)
              ? Number(val)
              : val,
          z.number().min(0).max(1),
        )
        .meta({
          description:
            'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
        })
        .exactOptional(),
      max_energy: z
        .preprocess(
          (val) =>
            typeof val === 'string' && /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(val)
              ? Number(val)
              : val,
          z.number().min(0).max(1),
        )
        .meta({
          description:
            'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
        })
        .exactOptional(),
      target_energy: z
        .preprocess(
          (val) =>
            typeof val === 'string' && /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(val)
              ? Number(val)
              : val,
          z.number().min(0).max(1),
        )
        .meta({
          description:
            'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
        })
        .exactOptional(),
      min_instrumentalness: z
        .preprocess(
          (val) =>
            typeof val === 'string' && /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(val)
              ? Number(val)
              : val,
          z.number().min(0).max(1),
        )
        .meta({
          description:
            'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
        })
        .exactOptional(),
      max_instrumentalness: z
        .preprocess(
          (val) =>
            typeof val === 'string' && /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(val)
              ? Number(val)
              : val,
          z.number().min(0).max(1),
        )
        .meta({
          description:
            'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
        })
        .exactOptional(),
      target_instrumentalness: z
        .preprocess(
          (val) =>
            typeof val === 'string' && /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(val)
              ? Number(val)
              : val,
          z.number().min(0).max(1),
        )
        .meta({
          description:
            'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
        })
        .exactOptional(),
      min_key: z
        .preprocess(
          (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
          z.number().int().min(0).max(11),
        )
        .meta({
          description:
            'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
        })
        .exactOptional(),
      max_key: z
        .preprocess(
          (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
          z.number().int().min(0).max(11),
        )
        .meta({
          description:
            'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
        })
        .exactOptional(),
      target_key: z
        .preprocess(
          (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
          z.number().int().min(0).max(11),
        )
        .meta({
          description:
            'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
        })
        .exactOptional(),
      min_liveness: z
        .preprocess(
          (val) =>
            typeof val === 'string' && /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(val)
              ? Number(val)
              : val,
          z.number().min(0).max(1),
        )
        .meta({
          description:
            'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
        })
        .exactOptional(),
      max_liveness: z
        .preprocess(
          (val) =>
            typeof val === 'string' && /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(val)
              ? Number(val)
              : val,
          z.number().min(0).max(1),
        )
        .meta({
          description:
            'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
        })
        .exactOptional(),
      target_liveness: z
        .preprocess(
          (val) =>
            typeof val === 'string' && /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(val)
              ? Number(val)
              : val,
          z.number().min(0).max(1),
        )
        .meta({
          description:
            'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
        })
        .exactOptional(),
      min_loudness: z
        .preprocess(
          (val) =>
            typeof val === 'string' && /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(val)
              ? Number(val)
              : val,
          z.number(),
        )
        .meta({
          description:
            'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
        })
        .exactOptional(),
      max_loudness: z
        .preprocess(
          (val) =>
            typeof val === 'string' && /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(val)
              ? Number(val)
              : val,
          z.number(),
        )
        .meta({
          description:
            'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
        })
        .exactOptional(),
      target_loudness: z
        .preprocess(
          (val) =>
            typeof val === 'string' && /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(val)
              ? Number(val)
              : val,
          z.number(),
        )
        .meta({
          description:
            'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
        })
        .exactOptional(),
      min_mode: z
        .preprocess(
          (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
          z.number().int().min(0).max(1),
        )
        .meta({
          description:
            'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
        })
        .exactOptional(),
      max_mode: z
        .preprocess(
          (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
          z.number().int().min(0).max(1),
        )
        .meta({
          description:
            'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
        })
        .exactOptional(),
      target_mode: z
        .preprocess(
          (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
          z.number().int().min(0).max(1),
        )
        .meta({
          description:
            'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
        })
        .exactOptional(),
      min_popularity: z
        .preprocess(
          (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
          z.number().int().min(0).max(100),
        )
        .meta({
          description:
            'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
        })
        .exactOptional(),
      max_popularity: z
        .preprocess(
          (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
          z.number().int().min(0).max(100),
        )
        .meta({
          description:
            'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
        })
        .exactOptional(),
      target_popularity: z
        .preprocess(
          (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
          z.number().int().min(0).max(100),
        )
        .meta({
          description:
            'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
        })
        .exactOptional(),
      min_speechiness: z
        .preprocess(
          (val) =>
            typeof val === 'string' && /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(val)
              ? Number(val)
              : val,
          z.number().min(0).max(1),
        )
        .meta({
          description:
            'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
        })
        .exactOptional(),
      max_speechiness: z
        .preprocess(
          (val) =>
            typeof val === 'string' && /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(val)
              ? Number(val)
              : val,
          z.number().min(0).max(1),
        )
        .meta({
          description:
            'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
        })
        .exactOptional(),
      target_speechiness: z
        .preprocess(
          (val) =>
            typeof val === 'string' && /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(val)
              ? Number(val)
              : val,
          z.number().min(0).max(1),
        )
        .meta({
          description:
            'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
        })
        .exactOptional(),
      min_tempo: z
        .preprocess(
          (val) =>
            typeof val === 'string' && /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(val)
              ? Number(val)
              : val,
          z.number(),
        )
        .meta({
          description:
            'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
        })
        .exactOptional(),
      max_tempo: z
        .preprocess(
          (val) =>
            typeof val === 'string' && /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(val)
              ? Number(val)
              : val,
          z.number(),
        )
        .meta({
          description:
            'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
        })
        .exactOptional(),
      target_tempo: z
        .preprocess(
          (val) =>
            typeof val === 'string' && /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(val)
              ? Number(val)
              : val,
          z.number(),
        )
        .meta({ description: 'Target tempo (BPM)' })
        .exactOptional(),
      min_time_signature: z
        .preprocess(
          (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
          z.number().int().max(11),
        )
        .meta({
          description:
            'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
        })
        .exactOptional(),
      max_time_signature: z
        .preprocess(
          (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
          z.number().int(),
        )
        .meta({
          description:
            'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
        })
        .exactOptional(),
      target_time_signature: z
        .preprocess(
          (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
          z.number().int(),
        )
        .meta({
          description:
            'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
        })
        .exactOptional(),
      min_valence: z
        .preprocess(
          (val) =>
            typeof val === 'string' && /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(val)
              ? Number(val)
              : val,
          z.number().min(0).max(1),
        )
        .meta({
          description:
            'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
        })
        .exactOptional(),
      max_valence: z
        .preprocess(
          (val) =>
            typeof val === 'string' && /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(val)
              ? Number(val)
              : val,
          z.number().min(0).max(1),
        )
        .meta({
          description:
            'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
        })
        .exactOptional(),
      target_valence: z
        .preprocess(
          (val) =>
            typeof val === 'string' && /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/.test(val)
              ? Number(val)
              : val,
          z.number().min(0).max(1),
        )
        .meta({
          description:
            'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
        })
        .exactOptional(),
    }),
  )
  .output(RecommendationsObjectSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getRecommendationsAvailableGenreSeeds = os
  .route({
    method: 'GET',
    path: '/recommendations/available-genre-seeds',
    tags: ['Genres'],
    summary: 'Get Available Genre Seeds\n',
    description:
      'Retrieve a list of available genres seed parameter values for [recommendations](/documentation/web-api/reference/get-recommendations).\n',
    deprecated: true,
    successDescription: 'A set of genres',
  })
  .output(z.object({ genres: z.array(z.string()).meta({ examples: [['alternative', 'samba']] }) }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })
