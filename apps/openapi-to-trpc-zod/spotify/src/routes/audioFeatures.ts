import { initTRPC, TRPCError } from '@trpc/server'
import * as z from 'zod'
import { AudioFeaturesObjectSchema } from '../components'

const t = initTRPC.create()

export const audioFeaturesRouter = t.router({
  getAudioFeatures: t.procedure
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAudioFeaturesId: t.procedure
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
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
