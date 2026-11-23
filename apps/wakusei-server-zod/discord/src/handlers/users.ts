import { os } from '@orpc/server'
import * as z from 'zod'
import {
  ApplicationUserRoleConnectionResponseSchema,
  BotAccountPatchRequestSchema,
  ConnectedAccountResponseSchema,
  CreatePrivateChannelRequestSchema,
  EntitlementResponseSchema,
  MyGuildResponseSchema,
  PrivateChannelResponseSchema,
  PrivateGroupChannelResponseSchema,
  PrivateGuildMemberResponseSchema,
  SnowflakeTypeSchema,
  UserPIIResponseSchema,
  UserResponseSchema,
} from '../components'

export const getUsersMe = os
  .route({ method: 'GET', path: '/users/@me', successDescription: '200 response for get_my_user' })
  .output(UserPIIResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const patchUsersMe = os
  .route({
    method: 'PATCH',
    path: '/users/@me',
    successDescription: '200 response for update_my_user',
  })
  .input(BotAccountPatchRequestSchema)
  .output(UserPIIResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getUsersMeApplicationsApplicationIdEntitlements = os
  .route({
    method: 'GET',
    path: '/users/@me/applications/{application_id}/entitlements',
    successDescription: '200 response for get_current_user_application_entitlements',
  })
  .input(
    z.object({
      application_id: SnowflakeTypeSchema,
      sku_ids: z
        .union([
          z.string(),
          z.preprocess(
            (val) => (val === undefined || Array.isArray(val) ? val : [val]),
            z
              .array(
                z.preprocess(
                  (val) => (val === 'null' ? null : val),
                  z
                    .union([
                      z.preprocess((val) => (val === 'null' ? null : val), z.null()),
                      SnowflakeTypeSchema,
                    ])
                    .nullable(),
                ),
              )
              .max(100)
              .refine((val) => new Set(val).size === val.length),
          ),
        ])
        .exactOptional(),
      exclude_consumed: z.stringbool().exactOptional(),
    }),
  )
  .output(z.array(EntitlementResponseSchema))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getUsersMeApplicationsApplicationIdRoleConnection = os
  .route({
    method: 'GET',
    path: '/users/@me/applications/{application_id}/role-connection',
    successDescription: '200 response for get_application_user_role_connection',
  })
  .input(z.object({ application_id: SnowflakeTypeSchema }))
  .output(ApplicationUserRoleConnectionResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const putUsersMeApplicationsApplicationIdRoleConnection = os
  .route({
    method: 'PUT',
    path: '/users/@me/applications/{application_id}/role-connection',
    successDescription: '200 response for update_application_user_role_connection',
  })
  .input(
    z.object({
      application_id: SnowflakeTypeSchema,
      platform_name: z.string().max(50).nullable().exactOptional(),
      platform_username: z.string().max(100).nullable().exactOptional(),
      metadata: z.record(z.string(), z.string().min(1).max(100)).nullable().exactOptional(),
    }),
  )
  .output(ApplicationUserRoleConnectionResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteUsersMeApplicationsApplicationIdRoleConnection = os
  .route({
    method: 'DELETE',
    path: '/users/@me/applications/{application_id}/role-connection',
    successStatus: 204,
    successDescription: '204 response for delete_application_user_role_connection',
  })
  .input(z.object({ application_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postUsersMeChannels = os
  .route({
    method: 'POST',
    path: '/users/@me/channels',
    successDescription: '200 response for create_dm',
  })
  .input(CreatePrivateChannelRequestSchema)
  .output(z.xor([PrivateChannelResponseSchema, PrivateGroupChannelResponseSchema]))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getUsersMeConnections = os
  .route({
    method: 'GET',
    path: '/users/@me/connections',
    successDescription: '200 response for list_my_connections',
  })
  .output(z.array(ConnectedAccountResponseSchema).nullable())
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getUsersMeGuilds = os
  .route({
    method: 'GET',
    path: '/users/@me/guilds',
    successDescription: '200 response for list_my_guilds',
  })
  .input(
    z.object({
      before: SnowflakeTypeSchema.exactOptional(),
      after: SnowflakeTypeSchema.exactOptional(),
      limit: z
        .preprocess(
          (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
          z.number().int().min(1).max(200),
        )
        .exactOptional(),
      shard: z
        .preprocess(
          (val) => (typeof val === 'string' && /^-?(?:0|[1-9]\d*)$/.test(val) ? Number(val) : val),
          z.number().int().min(0),
        )
        .exactOptional(),
      with_counts: z.stringbool().exactOptional(),
    }),
  )
  .output(z.array(MyGuildResponseSchema).nullable())
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteUsersMeGuildsGuildId = os
  .route({
    method: 'DELETE',
    path: '/users/@me/guilds/{guild_id}',
    successStatus: 204,
    successDescription: '204 response for leave_guild',
  })
  .input(z.object({ guild_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getUsersMeGuildsGuildIdMember = os
  .route({
    method: 'GET',
    path: '/users/@me/guilds/{guild_id}/member',
    successDescription: '200 response for get_my_guild_member',
  })
  .input(z.object({ guild_id: SnowflakeTypeSchema }))
  .output(PrivateGuildMemberResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getUsersUserId = os
  .route({
    method: 'GET',
    path: '/users/{user_id}',
    successDescription: '200 response for get_user',
  })
  .input(z.object({ user_id: SnowflakeTypeSchema }))
  .output(UserResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })
