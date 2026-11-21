import { os } from '@orpc/server'
import * as v from 'valibot'
import { AudioFeaturesObjectSchema } from '../components'

export const getAudioFeatures = os
  .route({
    method: 'GET',
    path: '/audio-features',
    tags: ['Tracks'],
    summary: "Get Several Tracks' Audio Features\n",
    description: 'Get audio features for multiple tracks based on their Spotify IDs.\n',
    deprecated: true,
    successDescription: 'A set of audio features',
  })
  .input(
    v.object({
      ids: v.pipe(
        v.string(),
        v.description(
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids)\nfor the tracks. Maximum: 100 IDs.\n',
        ),
        v.metadata({
          examples: ['7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B'],
        }),
      ),
    }),
  )
  .output(v.object({ audio_features: v.array(AudioFeaturesObjectSchema) }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getAudioFeaturesId = os
  .route({
    method: 'GET',
    path: '/audio-features/{id}',
    tags: ['Tracks'],
    summary: "Get Track's Audio Features\n",
    description:
      'Get audio feature information for a single track identified by its unique\nSpotify ID.\n',
    deprecated: true,
    successDescription: 'Audio features for one track',
  })
  .input(
    v.object({
      id: v.pipe(
        v.string(),
        v.description(
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the track.\n',
        ),
        v.metadata({ examples: ['11dFghVXANMlKmJXsNCbNl'] }),
      ),
    }),
  )
  .output(AudioFeaturesObjectSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })
