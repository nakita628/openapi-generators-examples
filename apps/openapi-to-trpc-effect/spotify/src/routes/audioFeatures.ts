import { initTRPC, TRPCError } from '@trpc/server'
import { Schema } from 'effect'
import { AudioFeaturesObjectSchema } from '../components'

const t = initTRPC.create()

export const audioFeaturesRouter = t.router({
  getAudioFeatures: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          ids: Schema.String.annotate({
            description:
              'A comma-separated list of the [Spotify IDs](/documentation/web-api/concepts/spotify-uris-ids)\nfor the tracks. Maximum: 100 IDs.\n',
            jsonSchemaExamples: [
              '7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B',
            ],
          }),
        }),
      ),
    )
    .output(
      Schema.toStandardSchemaV1(
        Schema.Struct({ audio_features: Schema.Array(AudioFeaturesObjectSchema) }),
      ),
    )
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
  getAudioFeaturesId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          id: Schema.String.annotate({
            description:
              'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids) for the track.\n',
            jsonSchemaExamples: ['11dFghVXANMlKmJXsNCbNl'],
          }),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(AudioFeaturesObjectSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
