import { os } from '@orpc/server'
import * as z from 'zod'
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
    z.object({
      ids: z
        .string()
        .meta({
          description:
            'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids)\nfor the tracks. Maximum: 100 IDs.\n',
          examples: ['7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B'],
        }),
    }),
  )
  .output(z.object({ audio_features: z.array(AudioFeaturesObjectSchema) }))
  .handler(async ({ input }) => {})

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
    z.object({
      id: z
        .string()
        .meta({
          description:
            'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the track.\n',
          examples: ['11dFghVXANMlKmJXsNCbNl'],
        }),
    }),
  )
  .output(AudioFeaturesObjectSchema)
  .handler(async ({ input }) => {})
