import { initTRPC, TRPCError } from '@trpc/server'
import { Schema } from 'effect'
import { AudioAnalysisObjectSchema } from '../components'

const t = initTRPC.create()

export const audioAnalysisRouter = t.router({
  getAudioAnalysisId: t.procedure
    .input(
      Schema.toStandardSchemaV1(
        Schema.Struct({
          id: Schema.String.annotate({
            description:
              'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)\nfor the track.\n',
            jsonSchemaExamples: ['11dFghVXANMlKmJXsNCbNl'],
          }),
        }),
      ),
    )
    .output(Schema.toStandardSchemaV1(AudioAnalysisObjectSchema))
    .query(() => {
      throw new TRPCError({ code: 'NOT_IMPLEMENTED' })
    }),
})
