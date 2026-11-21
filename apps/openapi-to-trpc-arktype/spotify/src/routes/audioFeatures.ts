import { initTRPC, TRPCError } from '@trpc/server'
import { type } from 'arktype'
import { AudioFeaturesObjectSchema } from '../components'

const t = initTRPC.create()

export const audioFeaturesRouter = t.router({
  getAudioFeatures: t.procedure
    .input(
      type({
        ids: type('string').describe(
          'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids)\nfor the tracks. Maximum: 100 IDs.\n',
        ),
      }),
    )
    .output(type({ audio_features: type(AudioFeaturesObjectSchema).array() }))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAudioFeaturesId: t.procedure
    .input(
      type({
        id: type('string').describe(
          'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the track.\n',
        ),
      }),
    )
    .output(AudioFeaturesObjectSchema)
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
