import { os } from '@orpc/server'
import * as v from 'valibot'
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
  .handler(async ({ input }) => {})

export const patchUsersMe = os
  .route({
    method: 'PATCH',
    path: '/users/@me',
    successDescription: '200 response for update_my_user',
  })
  .input(BotAccountPatchRequestSchema)
  .output(UserPIIResponseSchema)
  .handler(async ({ input }) => {})

export const getUsersMeApplicationsApplicationIdEntitlements = os
  .route({
    method: 'GET',
    path: '/users/@me/applications/{application_id}/entitlements',
    successDescription: '200 response for get_current_user_application_entitlements',
  })
  .input(
    v.object({
      application_id: SnowflakeTypeSchema,
      sku_ids: v.optional(
        v.union([
          v.string(),
          v.pipe(
            v.unknown(),
            v.transform((input) => (input === undefined || Array.isArray(input) ? input : [input])),
            v.array(
              v.pipe(
                v.unknown(),
                v.transform((input) => (input === 'null' ? null : input)),
                v.nullable(
                  v.union([
                    v.pipe(
                      v.unknown(),
                      v.transform((input) => (input === 'null' ? null : input)),
                      v.nullable(v.null()),
                    ),
                    SnowflakeTypeSchema,
                  ]),
                ),
              ),
            ),
            v.maxLength(100),
            v.check((input) => new Set(input).size === input.length),
          ),
        ]),
      ),
      exclude_consumed: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
          v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
        ),
      ),
    }),
  )
  .output(v.array(EntitlementResponseSchema))
  .handler(async ({ input }) => {})

export const getUsersMeApplicationsApplicationIdRoleConnection = os
  .route({
    method: 'GET',
    path: '/users/@me/applications/{application_id}/role-connection',
    successDescription: '200 response for get_application_user_role_connection',
  })
  .input(v.object({ application_id: SnowflakeTypeSchema }))
  .output(ApplicationUserRoleConnectionResponseSchema)
  .handler(async ({ input }) => {})

export const putUsersMeApplicationsApplicationIdRoleConnection = os
  .route({
    method: 'PUT',
    path: '/users/@me/applications/{application_id}/role-connection',
    successDescription: '200 response for update_application_user_role_connection',
  })
  .input(
    v.object({
      application_id: SnowflakeTypeSchema,
      platform_name: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(50)))),
      platform_username: v.optional(v.nullable(v.pipe(v.string(), v.maxCodePoints(100)))),
      metadata: v.optional(
        v.nullable(
          v.record(v.string(), v.pipe(v.string(), v.minCodePoints(1), v.maxCodePoints(100))),
        ),
      ),
    }),
  )
  .output(ApplicationUserRoleConnectionResponseSchema)
  .handler(async ({ input }) => {})

export const deleteUsersMeApplicationsApplicationIdRoleConnection = os
  .route({
    method: 'DELETE',
    path: '/users/@me/applications/{application_id}/role-connection',
    successStatus: 204,
    successDescription: '204 response for delete_application_user_role_connection',
  })
  .input(v.object({ application_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => {})

export const postUsersMeChannels = os
  .route({
    method: 'POST',
    path: '/users/@me/channels',
    successDescription: '200 response for create_dm',
  })
  .input(CreatePrivateChannelRequestSchema)
  .output(v.union([PrivateChannelResponseSchema, PrivateGroupChannelResponseSchema]))
  .handler(async ({ input }) => {})

export const getUsersMeConnections = os
  .route({
    method: 'GET',
    path: '/users/@me/connections',
    successDescription: '200 response for list_my_connections',
  })
  .output(v.nullable(v.array(ConnectedAccountResponseSchema)))
  .handler(async ({ input }) => {})

export const getUsersMeGuilds = os
  .route({
    method: 'GET',
    path: '/users/@me/guilds',
    successDescription: '200 response for list_my_guilds',
  })
  .input(
    v.object({
      before: v.optional(SnowflakeTypeSchema),
      after: v.optional(SnowflakeTypeSchema),
      limit: v.optional(
        v.pipe(
          v.string(),
          v.transform(Number),
          v.number(),
          v.safeInteger(),
          v.minValue(1),
          v.maxValue(200),
        ),
      ),
      shard: v.optional(
        v.pipe(v.string(), v.transform(Number), v.number(), v.safeInteger(), v.minValue(0)),
      ),
      with_counts: v.optional(
        v.pipe(
          v.string(),
          v.regex(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i),
          v.transform((input) => /^(?:true|1|yes|on|y|enabled)$/i.test(input)),
        ),
      ),
    }),
  )
  .output(v.nullable(v.array(MyGuildResponseSchema)))
  .handler(async ({ input }) => {})

export const deleteUsersMeGuildsGuildId = os
  .route({
    method: 'DELETE',
    path: '/users/@me/guilds/{guild_id}',
    successStatus: 204,
    successDescription: '204 response for leave_guild',
  })
  .input(v.object({ guild_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => {})

export const getUsersMeGuildsGuildIdMember = os
  .route({
    method: 'GET',
    path: '/users/@me/guilds/{guild_id}/member',
    successDescription: '200 response for get_my_guild_member',
  })
  .input(v.object({ guild_id: SnowflakeTypeSchema }))
  .output(PrivateGuildMemberResponseSchema)
  .handler(async ({ input }) => {})

export const getUsersUserId = os
  .route({
    method: 'GET',
    path: '/users/{user_id}',
    successDescription: '200 response for get_user',
  })
  .input(v.object({ user_id: SnowflakeTypeSchema }))
  .output(UserResponseSchema)
  .handler(async ({ input }) => {})
