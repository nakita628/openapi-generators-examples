import { initTRPC, TRPCError } from '@trpc/server'
import * as v from 'valibot'
import { RecommendationsObjectSchema } from '../components'

const t = initTRPC.create()

export const recommendationsRouter = t.router({
  getRecommendations: t.procedure
    .input(
      v.object({
        limit: v.pipe(
          v.optional(v.pipe(v.number(), v.integer(), v.minValue(1), v.maxValue(100)), 20),
          v.description(
            'The target size of the list of recommended tracks. For seeds with unusually small pools or when highly restrictive filtering is applied, it may be impossible to generate the requested number of recommended tracks. Debugging information for such cases is available in the response. Default: 20\\. Minimum: 1\\. Maximum: 100.\n',
          ),
          v.metadata({ examples: [10] }),
        ),
        market: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'An [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).\n  If a country code is specified, only content that is available in that market will be returned.<br/>\n  If a valid user access token is specified in the request header, the country associated with\n  the user account will take priority over this parameter.<br/>\n  _**Note**: If neither market or user country are provided, the content is considered unavailable for the client._<br/>\n  Users can view the country that is associated with their account in the [account settings](https://www.spotify.com/account/overview/).\n',
            ),
            v.metadata({ examples: ['ES'] }),
          ),
        ),
        seed_artists: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'A comma separated list of [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for seed artists.  Up to 5 seed values may be provided in any combination of `seed_artists`, `seed_tracks` and `seed_genres`.<br/> _**Note**: only required if `seed_genres` and `seed_tracks` are not set_.\n',
            ),
            v.metadata({ examples: ['4NHQUGzhtTLFvgF5SZesLK'] }),
          ),
        ),
        seed_genres: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'A comma separated list of any genres in the set of [available genre seeds](/documentation/web-api/reference/get-recommendation-genres). Up to 5 seed values may be provided in any combination of `seed_artists`, `seed_tracks` and `seed_genres`.<br/> _**Note**: only required if `seed_artists` and `seed_tracks` are not set_.\n',
            ),
            v.metadata({ examples: ['classical,country'] }),
          ),
        ),
        seed_tracks: v.optional(
          v.pipe(
            v.string(),
            v.description(
              'A comma separated list of [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids) for a seed track.  Up to 5 seed values may be provided in any combination of `seed_artists`, `seed_tracks` and `seed_genres`.<br/> _**Note**: only required if `seed_artists` and `seed_genres` are not set_.\n',
            ),
            v.metadata({ examples: ['0c6xIDDpzE81m2q797ordA'] }),
          ),
        ),
        min_acousticness: v.optional(
          v.pipe(
            v.pipe(v.number(), v.minValue(0), v.maxValue(1)),
            v.description(
              'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
            ),
          ),
        ),
        max_acousticness: v.optional(
          v.pipe(
            v.pipe(v.number(), v.minValue(0), v.maxValue(1)),
            v.description(
              'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
            ),
          ),
        ),
        target_acousticness: v.optional(
          v.pipe(
            v.pipe(v.number(), v.minValue(0), v.maxValue(1)),
            v.description(
              'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
            ),
          ),
        ),
        min_danceability: v.optional(
          v.pipe(
            v.pipe(v.number(), v.minValue(0), v.maxValue(1)),
            v.description(
              'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
            ),
          ),
        ),
        max_danceability: v.optional(
          v.pipe(
            v.pipe(v.number(), v.minValue(0), v.maxValue(1)),
            v.description(
              'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
            ),
          ),
        ),
        target_danceability: v.optional(
          v.pipe(
            v.pipe(v.number(), v.minValue(0), v.maxValue(1)),
            v.description(
              'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
            ),
          ),
        ),
        min_duration_ms: v.optional(
          v.pipe(
            v.pipe(v.number(), v.integer()),
            v.description(
              'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
            ),
          ),
        ),
        max_duration_ms: v.optional(
          v.pipe(
            v.pipe(v.number(), v.integer()),
            v.description(
              'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
            ),
          ),
        ),
        target_duration_ms: v.optional(
          v.pipe(
            v.pipe(v.number(), v.integer()),
            v.description('Target duration of the track (ms)'),
          ),
        ),
        min_energy: v.optional(
          v.pipe(
            v.pipe(v.number(), v.minValue(0), v.maxValue(1)),
            v.description(
              'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
            ),
          ),
        ),
        max_energy: v.optional(
          v.pipe(
            v.pipe(v.number(), v.minValue(0), v.maxValue(1)),
            v.description(
              'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
            ),
          ),
        ),
        target_energy: v.optional(
          v.pipe(
            v.pipe(v.number(), v.minValue(0), v.maxValue(1)),
            v.description(
              'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
            ),
          ),
        ),
        min_instrumentalness: v.optional(
          v.pipe(
            v.pipe(v.number(), v.minValue(0), v.maxValue(1)),
            v.description(
              'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
            ),
          ),
        ),
        max_instrumentalness: v.optional(
          v.pipe(
            v.pipe(v.number(), v.minValue(0), v.maxValue(1)),
            v.description(
              'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
            ),
          ),
        ),
        target_instrumentalness: v.optional(
          v.pipe(
            v.pipe(v.number(), v.minValue(0), v.maxValue(1)),
            v.description(
              'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
            ),
          ),
        ),
        min_key: v.optional(
          v.pipe(
            v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(11)),
            v.description(
              'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
            ),
          ),
        ),
        max_key: v.optional(
          v.pipe(
            v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(11)),
            v.description(
              'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
            ),
          ),
        ),
        target_key: v.optional(
          v.pipe(
            v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(11)),
            v.description(
              'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
            ),
          ),
        ),
        min_liveness: v.optional(
          v.pipe(
            v.pipe(v.number(), v.minValue(0), v.maxValue(1)),
            v.description(
              'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
            ),
          ),
        ),
        max_liveness: v.optional(
          v.pipe(
            v.pipe(v.number(), v.minValue(0), v.maxValue(1)),
            v.description(
              'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
            ),
          ),
        ),
        target_liveness: v.optional(
          v.pipe(
            v.pipe(v.number(), v.minValue(0), v.maxValue(1)),
            v.description(
              'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
            ),
          ),
        ),
        min_loudness: v.optional(
          v.pipe(
            v.number(),
            v.description(
              'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
            ),
          ),
        ),
        max_loudness: v.optional(
          v.pipe(
            v.number(),
            v.description(
              'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
            ),
          ),
        ),
        target_loudness: v.optional(
          v.pipe(
            v.number(),
            v.description(
              'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
            ),
          ),
        ),
        min_mode: v.optional(
          v.pipe(
            v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(1)),
            v.description(
              'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
            ),
          ),
        ),
        max_mode: v.optional(
          v.pipe(
            v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(1)),
            v.description(
              'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
            ),
          ),
        ),
        target_mode: v.optional(
          v.pipe(
            v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(1)),
            v.description(
              'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
            ),
          ),
        ),
        min_popularity: v.optional(
          v.pipe(
            v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(100)),
            v.description(
              'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
            ),
          ),
        ),
        max_popularity: v.optional(
          v.pipe(
            v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(100)),
            v.description(
              'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
            ),
          ),
        ),
        target_popularity: v.optional(
          v.pipe(
            v.pipe(v.number(), v.integer(), v.minValue(0), v.maxValue(100)),
            v.description(
              'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
            ),
          ),
        ),
        min_speechiness: v.optional(
          v.pipe(
            v.pipe(v.number(), v.minValue(0), v.maxValue(1)),
            v.description(
              'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
            ),
          ),
        ),
        max_speechiness: v.optional(
          v.pipe(
            v.pipe(v.number(), v.minValue(0), v.maxValue(1)),
            v.description(
              'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
            ),
          ),
        ),
        target_speechiness: v.optional(
          v.pipe(
            v.pipe(v.number(), v.minValue(0), v.maxValue(1)),
            v.description(
              'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
            ),
          ),
        ),
        min_tempo: v.optional(
          v.pipe(
            v.number(),
            v.description(
              'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
            ),
          ),
        ),
        max_tempo: v.optional(
          v.pipe(
            v.number(),
            v.description(
              'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
            ),
          ),
        ),
        target_tempo: v.optional(v.pipe(v.number(), v.description('Target tempo (BPM)'))),
        min_time_signature: v.optional(
          v.pipe(
            v.pipe(v.number(), v.integer(), v.maxValue(11)),
            v.description(
              'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
            ),
          ),
        ),
        max_time_signature: v.optional(
          v.pipe(
            v.pipe(v.number(), v.integer()),
            v.description(
              'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
            ),
          ),
        ),
        target_time_signature: v.optional(
          v.pipe(
            v.pipe(v.number(), v.integer()),
            v.description(
              'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
            ),
          ),
        ),
        min_valence: v.optional(
          v.pipe(
            v.pipe(v.number(), v.minValue(0), v.maxValue(1)),
            v.description(
              'For each tunable track attribute, a hard floor on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `min_tempo=140` would restrict results to only those tracks with a tempo of greater than 140 beats per minute.\n',
            ),
          ),
        ),
        max_valence: v.optional(
          v.pipe(
            v.pipe(v.number(), v.minValue(0), v.maxValue(1)),
            v.description(
              'For each tunable track attribute, a hard ceiling on the selected track attribute’s value can be provided. See tunable track attributes below for the list of available options. For example, `max_instrumentalness=0.35` would filter out most tracks that are likely to be instrumental.\n',
            ),
          ),
        ),
        target_valence: v.optional(
          v.pipe(
            v.pipe(v.number(), v.minValue(0), v.maxValue(1)),
            v.description(
              'For each of the tunable track attributes (below) a target value may be provided. Tracks with the attribute values nearest to the target values will be preferred. For example, you might request `target_energy=0.6` and `target_danceability=0.8`. All target values will be weighed equally in ranking results.\n',
            ),
          ),
        ),
      }),
    )
    .output(RecommendationsObjectSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getRecommendationsAvailableGenreSeeds: t.procedure
    .output(
      v.object({
        genres: v.pipe(v.array(v.string()), v.metadata({ examples: [['alternative', 'samba']] })),
      }),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
