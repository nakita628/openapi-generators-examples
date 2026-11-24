import { Hono } from 'hono'
import { describeRoute, validator } from 'hono-openapi'
import { Type, type StaticDecode, type StaticEncode, type TSchema } from 'typebox'
import { Compile } from 'typebox/compile'
import {
  UnauthorizedResponse,
  ForbiddenResponse,
  TooManyRequestsResponse,
  OneAudioAnalysisResponse,
} from '../components'

const toStandardSchemaV1 = <T extends TSchema>(schema: T) => {
  const validator = Compile(schema)
  return Object.assign(validator, {
    '~standard': {
      version: 1 as const,
      vendor: 'typebox',
      validate: (value: unknown) =>
        validator.Check(value)
          ? { value: validator.Decode(value) }
          : {
              issues: validator.Errors(value).map((error) => ({
                message: error.message,
                path: error.instancePath
                  .split('/')
                  .slice(1)
                  .map((key) => key.replaceAll('~1', '/').replaceAll('~0', '~')),
              })),
            },
      types: undefined as
        | { readonly input: StaticEncode<T>; readonly output: StaticDecode<T> }
        | undefined,
    },
  })
}

export const audioAnalysisHandler = new Hono().get(
  '/audio-analysis/:id',
  describeRoute({
    deprecated: true,
    tags: ['Tracks'],
    operationId: 'get-audio-analysis',
    summary: "Get Track's Audio Analysis\n",
    description:
      'Get a low-level audio analysis for a track in the Spotify catalog. The audio analysis describes the track’s structure and musical content, including rhythm, pitch, and timbre.\n',
    responses: {
      '200': OneAudioAnalysisResponse,
      '401': UnauthorizedResponse,
      '403': ForbiddenResponse,
      '429': TooManyRequestsResponse,
    },
    security: [{ oauth_2_0: [] }],
  }),
  validator(
    'param',
    toStandardSchemaV1(
      Type.Object({
        id: Type.String({
          description:
            'The [Spotify ID](/documentation/web-api/concepts/spotify-uris-ids)\nfor the track.\n',
          examples: ['11dFghVXANMlKmJXsNCbNl'],
        }),
      }),
    ),
  ),
  (c) => { throw new Error('Not implemented') },
)
