import { os } from '@orpc/server'
import { type } from 'arktype'
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
    type({
      ids: type('string').describe(
        'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids)\nfor the tracks. Maximum: 100 IDs.\n',
      ),
    }),
  )
  .output(type({ audio_features: type(AudioFeaturesObjectSchema).array() }))
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
    type({
      id: type('string').describe(
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the track.\n',
      ),
    }),
  )
  .output(AudioFeaturesObjectSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })
