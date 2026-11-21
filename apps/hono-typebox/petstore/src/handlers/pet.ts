import { Hono } from 'hono'
import { tbValidator } from '@hono/typebox-validator'
import { Type, Codec } from 'typebox'
import { PetSchema } from '../components'

export const petHandler = new Hono()
  .put(
    '/pet',
    tbValidator('json', PetSchema),
    tbValidator(
      'form',
      Type.Object({
        id: Type.Optional(
          Codec(Type.String())
            .Decode((value) => Number.parseInt(value, 10))
            .Encode((value) => String(value)),
        ),
        name: Type.String({ examples: ['doggie'] }),
        category: Type.Optional(
          Type.Object({
            id: Type.Optional(
              Codec(Type.String())
                .Decode((value) => Number.parseInt(value, 10))
                .Encode((value) => String(value)),
            ),
            name: Type.Optional(Type.String({ examples: ['Dogs'] })),
          }),
        ),
        photoUrls: Type.Array(Type.String()),
        tags: Type.Optional(
          Type.Array(
            Type.Object({
              id: Type.Optional(
                Codec(Type.String())
                  .Decode((value) => Number.parseInt(value, 10))
                  .Encode((value) => String(value)),
              ),
              name: Type.Optional(Type.String()),
            }),
          ),
        ),
        status: Type.Optional(
          Type.Union([Type.Literal('available'), Type.Literal('pending'), Type.Literal('sold')], {
            description: 'pet status in the store',
          }),
        ),
      }),
    ),
    (c) => {},
  )
  .post(
    '/pet',
    tbValidator('json', PetSchema),
    tbValidator(
      'form',
      Type.Object({
        id: Type.Optional(
          Codec(Type.String())
            .Decode((value) => Number.parseInt(value, 10))
            .Encode((value) => String(value)),
        ),
        name: Type.String({ examples: ['doggie'] }),
        category: Type.Optional(
          Type.Object({
            id: Type.Optional(
              Codec(Type.String())
                .Decode((value) => Number.parseInt(value, 10))
                .Encode((value) => String(value)),
            ),
            name: Type.Optional(Type.String({ examples: ['Dogs'] })),
          }),
        ),
        photoUrls: Type.Array(Type.String()),
        tags: Type.Optional(
          Type.Array(
            Type.Object({
              id: Type.Optional(
                Codec(Type.String())
                  .Decode((value) => Number.parseInt(value, 10))
                  .Encode((value) => String(value)),
              ),
              name: Type.Optional(Type.String()),
            }),
          ),
        ),
        status: Type.Optional(
          Type.Union([Type.Literal('available'), Type.Literal('pending'), Type.Literal('sold')], {
            description: 'pet status in the store',
          }),
        ),
      }),
    ),
    (c) => {},
  )
  .get(
    '/pet/findByStatus',
    tbValidator(
      'query',
      Type.Object({
        status: Type.Optional(
          Type.Union([Type.Literal('available'), Type.Literal('pending'), Type.Literal('sold')], {
            default: 'available',
          }),
        ),
      }),
    ),
    (c) => {},
  )
  .get(
    '/pet/findByTags',
    tbValidator('query', Type.Object({ tags: Type.Array(Type.String()) })),
    (c) => {},
  )
  .get(
    '/pet/:petId',
    tbValidator(
      'param',
      Type.Object({
        petId: Codec(Type.String())
          .Decode((value) => Number.parseInt(value, 10))
          .Encode((value) => String(value)),
      }),
    ),
    (c) => {},
  )
  .post(
    '/pet/:petId',
    tbValidator(
      'param',
      Type.Object({
        petId: Codec(Type.String())
          .Decode((value) => Number.parseInt(value, 10))
          .Encode((value) => String(value)),
      }),
    ),
    tbValidator(
      'query',
      Type.Object({ name: Type.Optional(Type.String()), status: Type.Optional(Type.String()) }),
    ),
    (c) => {},
  )
  .delete(
    '/pet/:petId',
    tbValidator(
      'param',
      Type.Object({
        petId: Codec(Type.String())
          .Decode((value) => Number.parseInt(value, 10))
          .Encode((value) => String(value)),
      }),
    ),
    tbValidator('header', Type.Object({ api_key: Type.Optional(Type.String()) })),
    (c) => {},
  )
  .post(
    '/pet/:petId/uploadImage',
    tbValidator(
      'param',
      Type.Object({
        petId: Codec(Type.String())
          .Decode((value) => Number.parseInt(value, 10))
          .Encode((value) => String(value)),
      }),
    ),
    tbValidator('query', Type.Object({ additionalMetadata: Type.Optional(Type.String()) })),
    (c) => {},
  )
