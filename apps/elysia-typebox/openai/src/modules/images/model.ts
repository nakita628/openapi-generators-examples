import { t, type UnwrapSchema } from 'elysia'

export const ImagesModel = {
  createImageVariationBody: t.Form(
    {
      image: t.File({
        description:
          'The image to use as the basis for the variation(s). Must be a valid PNG file, less than 4MB, and square.',
      }),
      model: t.Optional(
        t.Union([t.String(), t.Literal('dall-e-2'), t.Null()], {
          example: 'dall-e-2',
          description:
            'The legacy model used by the retired image variations endpoint. This endpoint no longer accepts requests.',
          default: 'dall-e-2',
        }),
      ),
      n: t.Optional(
        t
          .Transform(
            t.Union([
              t.Literal('null'),
              t.Union([
                t.Integer({
                  minimum: 1,
                  maximum: 10,
                  example: 1,
                  description: 'The number of images to generate. Must be between 1 and 10.',
                  default: 1,
                }),
                t.Null(),
              ]),
            ]),
          )
          .Decode((v) => (v === 'null' ? null : v))
          .Encode((v) => v),
      ),
      response_format: t.Optional(
        t.Union([
          t.Union([t.Literal('url'), t.Literal('b64_json'), t.Null()], {
            example: 'url',
            description:
              'The format in which the generated images are returned. Must be one of `url` or `b64_json`. URLs are only valid for 60 minutes after the image has been generated.',
            default: 'url',
          }),
          t.Null(),
        ]),
      ),
      size: t.Optional(
        t.Union([
          t.Union([t.Literal('256x256'), t.Literal('512x512'), t.Literal('1024x1024'), t.Null()], {
            example: '1024x1024',
            description:
              'The size of the generated images. Must be one of `256x256`, `512x512`, or `1024x1024`.',
            default: '1024x1024',
          }),
          t.Null(),
        ]),
      ),
      user: t.Optional(
        t.String({
          example: 'user-1234',
          description:
            'A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse. [Learn more](https://developers.openai.com/api/docs/guides/safety-best-practices#implement-safety-identifiers).\n',
        }),
      ),
    },
    { description: 'Legacy request for the retired image variations endpoint.', deprecated: true },
  ),
} as const

export type ImagesModel = { [k in keyof typeof ImagesModel]: UnwrapSchema<(typeof ImagesModel)[k]> }
