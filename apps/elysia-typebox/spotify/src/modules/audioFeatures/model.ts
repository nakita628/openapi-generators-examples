import { t, type UnwrapSchema } from 'elysia'
import { AudioFeaturesObjectSchema, ErrorObjectSchema } from '../../components/schemas'

export const AudioFeaturesModel = {
  getSeveralAudioFeaturesQuery: t.Object({
    ids: t.String({
      example: '7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B',
      title: 'Spotify Track IDs',
      description:
        'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids)\nfor the tracks. Maximum: 100 IDs.\n',
    }),
  }),
  getSeveralAudioFeaturesResponse200: t.Object({
    audio_features: t.Array(AudioFeaturesObjectSchema),
  }),
  getSeveralAudioFeaturesResponse401: t.Object({ error: ErrorObjectSchema }),
  getSeveralAudioFeaturesResponse403: t.Object({ error: ErrorObjectSchema }),
  getSeveralAudioFeaturesResponse429: t.Object({ error: ErrorObjectSchema }),
  getAudioFeaturesParams: t.Object({
    id: t.String({
      example: '11dFghVXANMlKmJXsNCbNl',
      title: 'Spotify Track ID',
      description:
        'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the track.\n',
    }),
  }),
  getAudioFeaturesResponse401: t.Object({ error: ErrorObjectSchema }),
  getAudioFeaturesResponse403: t.Object({ error: ErrorObjectSchema }),
  getAudioFeaturesResponse429: t.Object({ error: ErrorObjectSchema }),
} as const

export type AudioFeaturesModel = {
  [k in keyof typeof AudioFeaturesModel]: UnwrapSchema<(typeof AudioFeaturesModel)[k]>
}
