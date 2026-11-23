import { os } from '@orpc/server'
import { type } from 'arktype'
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
    type({
      application_id: SnowflakeTypeSchema,
      'sku_ids?': type('unknown').pipe((data, ctx) => {
        for (const branch of [
          type('string'),
          type('unknown').pipe(
            (data) => (data === undefined || Array.isArray(data) ? data : [data]),
            type(
              type(
                type('unknown').pipe(
                  (data) => (data === 'null' ? null : data),
                  type(
                    type('unknown').pipe((data, ctx) => {
                      for (const branch of [
                        type('unknown')
                          .pipe((data) => (data === 'null' ? null : data))
                          .to('null'),
                        SnowflakeTypeSchema,
                      ]) {
                        const out = branch(data)
                        if (!(out instanceof type.errors)) return out
                      }
                      return ctx.error('one of the members')
                    }),
                  ).or('null'),
                ),
              ).array(),
            )
              .and(type('unknown[] <= 100'))
              .narrow((data: unknown[], ctx) => new Set(data).size === data.length),
          ),
        ]) {
          const out = branch(data)
          if (!(out instanceof type.errors)) return out
        }
        return ctx.error('one of the members')
      }),
      'exclude_consumed?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
        (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
      ),
    }),
  )
  .output(type(EntitlementResponseSchema).array())
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getUsersMeApplicationsApplicationIdRoleConnection = os
  .route({
    method: 'GET',
    path: '/users/@me/applications/{application_id}/role-connection',
    successDescription: '200 response for get_application_user_role_connection',
  })
  .input(type({ application_id: SnowflakeTypeSchema }))
  .output(ApplicationUserRoleConnectionResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const putUsersMeApplicationsApplicationIdRoleConnection = os
  .route({
    method: 'PUT',
    path: '/users/@me/applications/{application_id}/role-connection',
    successDescription: '200 response for update_application_user_role_connection',
  })
  .input(
    type({
      application_id: SnowflakeTypeSchema,
      'platform_name?': type(
        type('string').narrow(
          (data, ctx) => [...data].length <= 50 || ctx.mustBe('at most 50 characters'),
        ),
      ).or('null'),
      'platform_username?': type(
        type('string').narrow(
          (data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters'),
        ),
      ).or('null'),
      'metadata?': type(
        type({
          '[string]': type('string')
            .narrow((data, ctx) => [...data].length >= 1 || ctx.mustBe('at least 1 character'))
            .narrow((data, ctx) => [...data].length <= 100 || ctx.mustBe('at most 100 characters')),
        }),
      ).or('null'),
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
  .input(type({ application_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const postUsersMeChannels = os
  .route({
    method: 'POST',
    path: '/users/@me/channels',
    successDescription: '200 response for create_dm',
  })
  .input(CreatePrivateChannelRequestSchema)
  .output(type(PrivateChannelResponseSchema).or(PrivateGroupChannelResponseSchema))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getUsersMeConnections = os
  .route({
    method: 'GET',
    path: '/users/@me/connections',
    successDescription: '200 response for list_my_connections',
  })
  .output(type(type(ConnectedAccountResponseSchema).array()).or('null'))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getUsersMeGuilds = os
  .route({
    method: 'GET',
    path: '/users/@me/guilds',
    successDescription: '200 response for list_my_guilds',
  })
  .input(
    type({
      'before?': SnowflakeTypeSchema,
      'after?': SnowflakeTypeSchema,
      'limit?': type('string')
        .pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 1 & number.integer <= 200'),
      'shard?': type('string')
        .pipe((data, ctx) => {
          const value = /^-?(?:0|[1-9]\d*)$/.test(data) ? Number(data) : Number.NaN
          return Number.isSafeInteger(value) ? value : ctx.error('an integer')
        })
        .to('number.integer >= 0'),
      'with_counts?': type(/^(?:true|1|yes|on|y|enabled|false|0|no|off|n|disabled)$/i).pipe(
        (data) => /^(?:true|1|yes|on|y|enabled)$/i.test(data),
      ),
    }),
  )
  .output(type(type(MyGuildResponseSchema).array()).or('null'))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const deleteUsersMeGuildsGuildId = os
  .route({
    method: 'DELETE',
    path: '/users/@me/guilds/{guild_id}',
    successStatus: 204,
    successDescription: '204 response for leave_guild',
  })
  .input(type({ guild_id: SnowflakeTypeSchema }))
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getUsersMeGuildsGuildIdMember = os
  .route({
    method: 'GET',
    path: '/users/@me/guilds/{guild_id}/member',
    successDescription: '200 response for get_my_guild_member',
  })
  .input(type({ guild_id: SnowflakeTypeSchema }))
  .output(PrivateGuildMemberResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })

export const getUsersUserId = os
  .route({
    method: 'GET',
    path: '/users/{user_id}',
    successDescription: '200 response for get_user',
  })
  .input(type({ user_id: SnowflakeTypeSchema }))
  .output(UserResponseSchema)
  .handler(async ({ input }) => { throw new Error('Not implemented') })
