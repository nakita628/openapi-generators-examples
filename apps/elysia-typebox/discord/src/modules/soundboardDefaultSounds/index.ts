import { Elysia } from 'elysia'
import {
  ErrorSchema,
  ErrorDetailsSchema,
  ErrorResponseSchema,
  InnerErrorsSchema,
  Int53TypeSchema,
  NameplatePaletteSchema,
  RatelimitedResponseSchema,
  SnowflakeTypeSchema,
  SoundboardSoundResponseSchema,
  UserAvatarDecorationResponseSchema,
  UserCollectiblesResponseSchema,
  UserNameplateResponseSchema,
  UserPrimaryGuildResponseSchema,
  UserResponseSchema,
} from '../../components/schemas'
import { SoundboardDefaultSoundsModel } from './model'

export const soundboardDefaultSounds = new Elysia()
  .model({
    Error: ErrorSchema,
    ErrorDetails: ErrorDetailsSchema,
    ErrorResponse: ErrorResponseSchema,
    InnerErrors: InnerErrorsSchema,
    Int53Type: Int53TypeSchema,
    NameplatePalette: NameplatePaletteSchema,
    RatelimitedResponse: RatelimitedResponseSchema,
    SnowflakeType: SnowflakeTypeSchema,
    SoundboardSoundResponse: SoundboardSoundResponseSchema,
    UserAvatarDecorationResponse: UserAvatarDecorationResponseSchema,
    UserCollectiblesResponse: UserCollectiblesResponseSchema,
    UserNameplateResponse: UserNameplateResponseSchema,
    UserPrimaryGuildResponse: UserPrimaryGuildResponseSchema,
    UserResponse: UserResponseSchema,
  })
  .get('/soundboard-default-sounds', () => { throw new Error('Not implemented') }, {
    response: {
      200: SoundboardDefaultSoundsModel.get_soundboard_default_soundsResponse200,
      429: 'RatelimitedResponse',
      '4XX': 'ErrorResponse',
    },
    detail: {
      tags: [],
      operationId: 'get_soundboard_default_sounds',
      security: [{ BotToken: [] }],
    },
  })
