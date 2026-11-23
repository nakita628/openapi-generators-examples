import useSWR from 'swr'
import useSWRImmutable from 'swr/immutable'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { WidgetResponse } from '../components/schemas'
import { client } from '../lib'

export function getApplicationsKey() {
  return ['applications'] as const
}

export function getChannelsKey() {
  return ['channels'] as const
}

export function getGatewayKey() {
  return ['gateway'] as const
}

export function getGuildsKey() {
  return ['guilds'] as const
}

export function getInteractionsKey() {
  return ['interactions'] as const
}

export function getInvitesKey() {
  return ['invites'] as const
}

export function getLobbiesKey() {
  return ['lobbies'] as const
}

export function getOauth2Key() {
  return ['oauth2'] as const
}

export function getPartnerSdkKey() {
  return ['partner-sdk'] as const
}

export function getSkusKey() {
  return ['skus'] as const
}

export function getSoundboardDefaultSoundsKey() {
  return ['soundboard-default-sounds'] as const
}

export function getStageInstancesKey() {
  return ['stage-instances'] as const
}

export function getStickerPacksKey() {
  return ['sticker-packs'] as const
}

export function getStickersKey() {
  return ['stickers'] as const
}

export function getUsersKey() {
  return ['users'] as const
}

export function getVoiceKey() {
  return ['voice'] as const
}

export function getWebhooksKey() {
  return ['webhooks'] as const
}

export function getGetApplicationsMeKey() {
  return ['applications', '/applications/@me'] as const
}

export function useGetApplicationsMe<
  TError = Exclude<Awaited<ReturnType<(typeof client.applications)['@me']['get']>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<(typeof client.applications)['@me']['get']>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<(typeof client.applications)['@me']['get']>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey === undefined ? getGetApplicationsMeKey() : customKey) : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<(typeof client.applications)['@me']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.applications['@me'].get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetApplicationsMe<
  TError = Exclude<Awaited<ReturnType<(typeof client.applications)['@me']['get']>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<(typeof client.applications)['@me']['get']>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<(typeof client.applications)['@me']['get']>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey === undefined ? getGetApplicationsMeKey() : customKey) : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<(typeof client.applications)['@me']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.applications['@me'].get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPatchApplicationsMeKey() {
  return ['applications', '/applications/@me', 'PATCH'] as const
}

export function usePatchApplicationsMe<
  TError = Exclude<
    Awaited<ReturnType<(typeof client.applications)['@me']['patch']>>['error'],
    null
  >,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<
      Awaited<ReturnType<(typeof client.applications)['@me']['patch']>>,
      { error: null }
    >['data'],
    TError,
    Key,
    {
      body: Parameters<(typeof client.applications)['@me']['patch']>[0]
      options?: Parameters<(typeof client.applications)['@me']['patch']>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPatchApplicationsMeKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<(typeof client.applications)['@me']['patch']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<(typeof client.applications)['@me']['patch']>[0]
        options?: Parameters<(typeof client.applications)['@me']['patch']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<(typeof client.applications)['@me']['patch']>[0]
            options?: Parameters<(typeof client.applications)['@me']['patch']>[1]
          }
        },
      ) => {
        const { data, error } = await client.applications['@me'].patch(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetApplicationsApplicationIdKey(
  params: Parameters<typeof client.applications>[0],
) {
  return ['applications', '/applications/{application_id}', params] as const
}

export function useGetApplicationsApplicationId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.applications>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.applications>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.applications>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.applications>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetApplicationsApplicationIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.applications>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.applications(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetApplicationsApplicationId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.applications>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.applications>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.applications>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.applications>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetApplicationsApplicationIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.applications>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.applications(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPatchApplicationsApplicationIdKey() {
  return ['applications', '/applications/{application_id}', 'PATCH'] as const
}

export function usePatchApplicationsApplicationId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.applications>['patch']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.applications>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.applications>['patch']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.applications>['patch']>[0]
        options?: Parameters<ReturnType<typeof client.applications>['patch']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPatchApplicationsApplicationIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.applications>['patch']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.applications>['patch']>[0]
        options?: Parameters<ReturnType<typeof client.applications>['patch']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.applications>['patch']>[0]
            options?: Parameters<ReturnType<typeof client.applications>['patch']>[1]
          }
        },
      ) => {
        const { data, error } = await client.applications(params).patch(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetApplicationsApplicationIdActivityInstancesInstanceIdKey(
  params: Parameters<typeof client.applications>[0],
  params2: Parameters<ReturnType<typeof client.applications>['activity-instances']>[0],
) {
  return [
    'applications',
    '/applications/{application_id}/activity-instances/{instance_id}',
    params,
    params2,
  ] as const
}

export function useGetApplicationsApplicationIdActivityInstancesInstanceId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.applications>['activity-instances']>['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.applications>[0],
  params2: Parameters<ReturnType<typeof client.applications>['activity-instances']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<typeof client.applications>['activity-instances']>['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<typeof client.applications>['activity-instances']>['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetApplicationsApplicationIdActivityInstancesInstanceIdKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<typeof client.applications>['activity-instances']>['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client
          .applications(params)
          ['activity-instances'](params2)
          .get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetApplicationsApplicationIdActivityInstancesInstanceId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.applications>['activity-instances']>['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.applications>[0],
  params2: Parameters<ReturnType<typeof client.applications>['activity-instances']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<typeof client.applications>['activity-instances']>['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<typeof client.applications>['activity-instances']>['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetApplicationsApplicationIdActivityInstancesInstanceIdKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<typeof client.applications>['activity-instances']>['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client
          .applications(params)
          ['activity-instances'](params2)
          .get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostApplicationsApplicationIdAttachmentKey() {
  return ['applications', '/applications/{application_id}/attachment', 'POST'] as const
}

export function usePostApplicationsApplicationIdAttachment<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.applications>['attachment']['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.applications>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.applications>['attachment']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.applications>['attachment']['post']>[0]
        options?: Parameters<ReturnType<typeof client.applications>['attachment']['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostApplicationsApplicationIdAttachmentKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.applications>['attachment']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.applications>['attachment']['post']>[0]
        options?: Parameters<ReturnType<typeof client.applications>['attachment']['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.applications>['attachment']['post']>[0]
            options?: Parameters<ReturnType<typeof client.applications>['attachment']['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client
          .applications(params)
          .attachment.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetApplicationsApplicationIdCommandsKey(
  params: Parameters<typeof client.applications>[0],
  options?: Parameters<ReturnType<typeof client.applications>['commands']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['applications', '/applications/{application_id}/commands', params, keyArgs] as const
}

export function useGetApplicationsApplicationIdCommands<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.applications>['commands']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.applications>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.applications>['commands']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.applications>['commands']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetApplicationsApplicationIdCommandsKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.applications>['commands']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.applications(params).commands.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetApplicationsApplicationIdCommands<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.applications>['commands']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.applications>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.applications>['commands']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.applications>['commands']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetApplicationsApplicationIdCommandsKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.applications>['commands']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.applications(params).commands.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPutApplicationsApplicationIdCommandsKey() {
  return ['applications', '/applications/{application_id}/commands', 'PUT'] as const
}

export function usePutApplicationsApplicationIdCommands<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.applications>['commands']['put']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.applications>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.applications>['commands']['put']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.applications>['commands']['put']>[0]
        options?: Parameters<ReturnType<typeof client.applications>['commands']['put']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutApplicationsApplicationIdCommandsKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.applications>['commands']['put']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.applications>['commands']['put']>[0]
        options?: Parameters<ReturnType<typeof client.applications>['commands']['put']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.applications>['commands']['put']>[0]
            options?: Parameters<ReturnType<typeof client.applications>['commands']['put']>[1]
          }
        },
      ) => {
        const { data, error } = await client
          .applications(params)
          .commands.put(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostApplicationsApplicationIdCommandsKey() {
  return ['applications', '/applications/{application_id}/commands', 'POST'] as const
}

export function usePostApplicationsApplicationIdCommands<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.applications>['commands']['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.applications>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.applications>['commands']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.applications>['commands']['post']>[0]
        options?: Parameters<ReturnType<typeof client.applications>['commands']['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostApplicationsApplicationIdCommandsKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.applications>['commands']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.applications>['commands']['post']>[0]
        options?: Parameters<ReturnType<typeof client.applications>['commands']['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.applications>['commands']['post']>[0]
            options?: Parameters<ReturnType<typeof client.applications>['commands']['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client
          .applications(params)
          .commands.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetApplicationsApplicationIdCommandsCommandIdKey(
  params: Parameters<typeof client.applications>[0],
  params2: Parameters<ReturnType<typeof client.applications>['commands']>[0],
) {
  return [
    'applications',
    '/applications/{application_id}/commands/{command_id}',
    params,
    params2,
  ] as const
}

export function useGetApplicationsApplicationIdCommandsCommandId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.applications>['commands']>['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.applications>[0],
  params2: Parameters<ReturnType<typeof client.applications>['commands']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.applications>['commands']>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<ReturnType<typeof client.applications>['commands']>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetApplicationsApplicationIdCommandsCommandIdKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.applications>['commands']>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client
          .applications(params)
          .commands(params2)
          .get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetApplicationsApplicationIdCommandsCommandId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.applications>['commands']>['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.applications>[0],
  params2: Parameters<ReturnType<typeof client.applications>['commands']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.applications>['commands']>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<ReturnType<typeof client.applications>['commands']>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetApplicationsApplicationIdCommandsCommandIdKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.applications>['commands']>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client
          .applications(params)
          .commands(params2)
          .get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getDeleteApplicationsApplicationIdCommandsCommandIdKey() {
  return ['applications', '/applications/{application_id}/commands/{command_id}', 'DELETE'] as const
}

export function useDeleteApplicationsApplicationIdCommandsCommandId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.applications>['commands']>['delete']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.applications>[0],
  params2: Parameters<ReturnType<typeof client.applications>['commands']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.applications>['commands']>['delete']>
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<ReturnType<typeof client.applications>['commands']>['delete']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.applications>['commands']>['delete']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteApplicationsApplicationIdCommandsCommandIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.applications>['commands']>['delete']>
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<ReturnType<typeof client.applications>['commands']>['delete']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.applications>['commands']>['delete']
        >[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<
              ReturnType<ReturnType<typeof client.applications>['commands']>['delete']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.applications>['commands']>['delete']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .applications(params)
          .commands(params2)
          .delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPatchApplicationsApplicationIdCommandsCommandIdKey() {
  return ['applications', '/applications/{application_id}/commands/{command_id}', 'PATCH'] as const
}

export function usePatchApplicationsApplicationIdCommandsCommandId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.applications>['commands']>['patch']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.applications>[0],
  params2: Parameters<ReturnType<typeof client.applications>['commands']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.applications>['commands']>['patch']>
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<ReturnType<typeof client.applications>['commands']>['patch']>[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.applications>['commands']>['patch']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPatchApplicationsApplicationIdCommandsCommandIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.applications>['commands']>['patch']>
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<ReturnType<typeof client.applications>['commands']>['patch']>[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.applications>['commands']>['patch']
        >[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<
              ReturnType<ReturnType<typeof client.applications>['commands']>['patch']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.applications>['commands']>['patch']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .applications(params)
          .commands(params2)
          .patch(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetApplicationsApplicationIdEmojisKey(
  params: Parameters<typeof client.applications>[0],
) {
  return ['applications', '/applications/{application_id}/emojis', params] as const
}

export function useGetApplicationsApplicationIdEmojis<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.applications>['emojis']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.applications>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.applications>['emojis']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.applications>['emojis']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetApplicationsApplicationIdEmojisKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.applications>['emojis']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.applications(params).emojis.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetApplicationsApplicationIdEmojis<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.applications>['emojis']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.applications>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.applications>['emojis']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.applications>['emojis']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetApplicationsApplicationIdEmojisKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.applications>['emojis']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.applications(params).emojis.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostApplicationsApplicationIdEmojisKey() {
  return ['applications', '/applications/{application_id}/emojis', 'POST'] as const
}

export function usePostApplicationsApplicationIdEmojis<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.applications>['emojis']['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.applications>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.applications>['emojis']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.applications>['emojis']['post']>[0]
        options?: Parameters<ReturnType<typeof client.applications>['emojis']['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostApplicationsApplicationIdEmojisKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.applications>['emojis']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.applications>['emojis']['post']>[0]
        options?: Parameters<ReturnType<typeof client.applications>['emojis']['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.applications>['emojis']['post']>[0]
            options?: Parameters<ReturnType<typeof client.applications>['emojis']['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client.applications(params).emojis.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetApplicationsApplicationIdEmojisEmojiIdKey(
  params: Parameters<typeof client.applications>[0],
  params2: Parameters<ReturnType<typeof client.applications>['emojis']>[0],
) {
  return [
    'applications',
    '/applications/{application_id}/emojis/{emoji_id}',
    params,
    params2,
  ] as const
}

export function useGetApplicationsApplicationIdEmojisEmojiId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.applications>['emojis']>['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.applications>[0],
  params2: Parameters<ReturnType<typeof client.applications>['emojis']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.applications>['emojis']>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<ReturnType<typeof client.applications>['emojis']>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetApplicationsApplicationIdEmojisEmojiIdKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.applications>['emojis']>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.applications(params).emojis(params2).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetApplicationsApplicationIdEmojisEmojiId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.applications>['emojis']>['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.applications>[0],
  params2: Parameters<ReturnType<typeof client.applications>['emojis']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.applications>['emojis']>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<ReturnType<typeof client.applications>['emojis']>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetApplicationsApplicationIdEmojisEmojiIdKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.applications>['emojis']>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.applications(params).emojis(params2).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getDeleteApplicationsApplicationIdEmojisEmojiIdKey() {
  return ['applications', '/applications/{application_id}/emojis/{emoji_id}', 'DELETE'] as const
}

export function useDeleteApplicationsApplicationIdEmojisEmojiId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.applications>['emojis']>['delete']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.applications>[0],
  params2: Parameters<ReturnType<typeof client.applications>['emojis']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.applications>['emojis']>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<ReturnType<typeof client.applications>['emojis']>['delete']>[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.applications>['emojis']>['delete']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteApplicationsApplicationIdEmojisEmojiIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.applications>['emojis']>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<ReturnType<typeof client.applications>['emojis']>['delete']>[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.applications>['emojis']>['delete']
        >[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<
              ReturnType<ReturnType<typeof client.applications>['emojis']>['delete']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.applications>['emojis']>['delete']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .applications(params)
          .emojis(params2)
          .delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPatchApplicationsApplicationIdEmojisEmojiIdKey() {
  return ['applications', '/applications/{application_id}/emojis/{emoji_id}', 'PATCH'] as const
}

export function usePatchApplicationsApplicationIdEmojisEmojiId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.applications>['emojis']>['patch']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.applications>[0],
  params2: Parameters<ReturnType<typeof client.applications>['emojis']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.applications>['emojis']>['patch']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<ReturnType<typeof client.applications>['emojis']>['patch']>[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.applications>['emojis']>['patch']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPatchApplicationsApplicationIdEmojisEmojiIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.applications>['emojis']>['patch']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<ReturnType<typeof client.applications>['emojis']>['patch']>[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.applications>['emojis']>['patch']
        >[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<
              ReturnType<ReturnType<typeof client.applications>['emojis']>['patch']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.applications>['emojis']>['patch']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .applications(params)
          .emojis(params2)
          .patch(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetApplicationsApplicationIdEntitlementsKey(
  params: Parameters<typeof client.applications>[0],
  options?: Parameters<ReturnType<typeof client.applications>['entitlements']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['applications', '/applications/{application_id}/entitlements', params, keyArgs] as const
}

export function useGetApplicationsApplicationIdEntitlements<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.applications>['entitlements']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.applications>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.applications>['entitlements']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.applications>['entitlements']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetApplicationsApplicationIdEntitlementsKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.applications>['entitlements']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.applications(params).entitlements.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetApplicationsApplicationIdEntitlements<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.applications>['entitlements']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.applications>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.applications>['entitlements']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.applications>['entitlements']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetApplicationsApplicationIdEntitlementsKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.applications>['entitlements']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.applications(params).entitlements.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostApplicationsApplicationIdEntitlementsKey() {
  return ['applications', '/applications/{application_id}/entitlements', 'POST'] as const
}

export function usePostApplicationsApplicationIdEntitlements<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.applications>['entitlements']['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.applications>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.applications>['entitlements']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.applications>['entitlements']['post']>[0]
        options?: Parameters<ReturnType<typeof client.applications>['entitlements']['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostApplicationsApplicationIdEntitlementsKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.applications>['entitlements']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.applications>['entitlements']['post']>[0]
        options?: Parameters<ReturnType<typeof client.applications>['entitlements']['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.applications>['entitlements']['post']>[0]
            options?: Parameters<ReturnType<typeof client.applications>['entitlements']['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client
          .applications(params)
          .entitlements.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetApplicationsApplicationIdEntitlementsEntitlementIdKey(
  params: Parameters<typeof client.applications>[0],
  params2: Parameters<ReturnType<typeof client.applications>['entitlements']>[0],
) {
  return [
    'applications',
    '/applications/{application_id}/entitlements/{entitlement_id}',
    params,
    params2,
  ] as const
}

export function useGetApplicationsApplicationIdEntitlementsEntitlementId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.applications>['entitlements']>['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.applications>[0],
  params2: Parameters<ReturnType<typeof client.applications>['entitlements']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.applications>['entitlements']>['get']>
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<typeof client.applications>['entitlements']>['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetApplicationsApplicationIdEntitlementsEntitlementIdKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.applications>['entitlements']>['get']>
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client
          .applications(params)
          .entitlements(params2)
          .get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetApplicationsApplicationIdEntitlementsEntitlementId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.applications>['entitlements']>['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.applications>[0],
  params2: Parameters<ReturnType<typeof client.applications>['entitlements']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.applications>['entitlements']>['get']>
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<typeof client.applications>['entitlements']>['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetApplicationsApplicationIdEntitlementsEntitlementIdKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.applications>['entitlements']>['get']>
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client
          .applications(params)
          .entitlements(params2)
          .get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getDeleteApplicationsApplicationIdEntitlementsEntitlementIdKey() {
  return [
    'applications',
    '/applications/{application_id}/entitlements/{entitlement_id}',
    'DELETE',
  ] as const
}

export function useDeleteApplicationsApplicationIdEntitlementsEntitlementId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.applications>['entitlements']>['delete']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.applications>[0],
  params2: Parameters<ReturnType<typeof client.applications>['entitlements']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.applications>['entitlements']>['delete']>
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<ReturnType<typeof client.applications>['entitlements']>['delete']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.applications>['entitlements']>['delete']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteApplicationsApplicationIdEntitlementsEntitlementIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.applications>['entitlements']>['delete']>
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<ReturnType<typeof client.applications>['entitlements']>['delete']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.applications>['entitlements']>['delete']
        >[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<
              ReturnType<ReturnType<typeof client.applications>['entitlements']>['delete']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.applications>['entitlements']>['delete']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .applications(params)
          .entitlements(params2)
          .delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostApplicationsApplicationIdEntitlementsEntitlementIdConsumeKey() {
  return [
    'applications',
    '/applications/{application_id}/entitlements/{entitlement_id}/consume',
    'POST',
  ] as const
}

export function usePostApplicationsApplicationIdEntitlementsEntitlementIdConsume<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<typeof client.applications>['entitlements']>['consume']['post']
      >
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.applications>[0],
  params2: Parameters<ReturnType<typeof client.applications>['entitlements']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<typeof client.applications>['entitlements']>['consume']['post']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<ReturnType<typeof client.applications>['entitlements']>['consume']['post']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.applications>['entitlements']>['consume']['post']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostApplicationsApplicationIdEntitlementsEntitlementIdConsumeKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<typeof client.applications>['entitlements']>['consume']['post']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<ReturnType<typeof client.applications>['entitlements']>['consume']['post']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.applications>['entitlements']>['consume']['post']
        >[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<
              ReturnType<ReturnType<typeof client.applications>['entitlements']>['consume']['post']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.applications>['entitlements']>['consume']['post']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .applications(params)
          .entitlements(params2)
          .consume.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetApplicationsApplicationIdGuildsGuildIdCommandsKey(
  params: Parameters<typeof client.applications>[0],
  params2: Parameters<ReturnType<typeof client.applications>['guilds']>[0],
  options?: Parameters<
    ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']['get']
  >[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'applications',
    '/applications/{application_id}/guilds/{guild_id}/commands',
    params,
    params2,
    keyArgs,
  ] as const
}

export function useGetApplicationsApplicationIdGuildsGuildIdCommands<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.applications>[0],
  params2: Parameters<ReturnType<typeof client.applications>['guilds']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetApplicationsApplicationIdGuildsGuildIdCommandsKey(params, params2, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client
          .applications(params)
          .guilds(params2)
          .commands.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetApplicationsApplicationIdGuildsGuildIdCommands<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.applications>[0],
  params2: Parameters<ReturnType<typeof client.applications>['guilds']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetApplicationsApplicationIdGuildsGuildIdCommandsKey(params, params2, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client
          .applications(params)
          .guilds(params2)
          .commands.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPutApplicationsApplicationIdGuildsGuildIdCommandsKey() {
  return [
    'applications',
    '/applications/{application_id}/guilds/{guild_id}/commands',
    'PUT',
  ] as const
}

export function usePutApplicationsApplicationIdGuildsGuildIdCommands<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']['put']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.applications>[0],
  params2: Parameters<ReturnType<typeof client.applications>['guilds']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']['put']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<
          ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']['put']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']['put']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutApplicationsApplicationIdGuildsGuildIdCommandsKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']['put']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<
          ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']['put']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']['put']
        >[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<
              ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']['put']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']['put']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .applications(params)
          .guilds(params2)
          .commands.put(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostApplicationsApplicationIdGuildsGuildIdCommandsKey() {
  return [
    'applications',
    '/applications/{application_id}/guilds/{guild_id}/commands',
    'POST',
  ] as const
}

export function usePostApplicationsApplicationIdGuildsGuildIdCommands<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']['post']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.applications>[0],
  params2: Parameters<ReturnType<typeof client.applications>['guilds']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']['post']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<
          ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']['post']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']['post']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostApplicationsApplicationIdGuildsGuildIdCommandsKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']['post']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<
          ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']['post']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']['post']
        >[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<
              ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']['post']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']['post']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .applications(params)
          .guilds(params2)
          .commands.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetApplicationsApplicationIdGuildsGuildIdCommandsPermissionsKey(
  params: Parameters<typeof client.applications>[0],
  params2: Parameters<ReturnType<typeof client.applications>['guilds']>[0],
) {
  return [
    'applications',
    '/applications/{application_id}/guilds/{guild_id}/commands/permissions',
    params,
    params2,
  ] as const
}

export function useGetApplicationsApplicationIdGuildsGuildIdCommandsPermissions<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<
          ReturnType<typeof client.applications>['guilds']
        >['commands']['permissions']['get']
      >
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.applications>[0],
  params2: Parameters<ReturnType<typeof client.applications>['guilds']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<
              ReturnType<typeof client.applications>['guilds']
            >['commands']['permissions']['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']['permissions']['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetApplicationsApplicationIdGuildsGuildIdCommandsPermissionsKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<
              ReturnType<typeof client.applications>['guilds']
            >['commands']['permissions']['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client
          .applications(params)
          .guilds(params2)
          .commands.permissions.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetApplicationsApplicationIdGuildsGuildIdCommandsPermissions<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<
          ReturnType<typeof client.applications>['guilds']
        >['commands']['permissions']['get']
      >
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.applications>[0],
  params2: Parameters<ReturnType<typeof client.applications>['guilds']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<
              ReturnType<typeof client.applications>['guilds']
            >['commands']['permissions']['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']['permissions']['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetApplicationsApplicationIdGuildsGuildIdCommandsPermissionsKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<
              ReturnType<typeof client.applications>['guilds']
            >['commands']['permissions']['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client
          .applications(params)
          .guilds(params2)
          .commands.permissions.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetApplicationsApplicationIdGuildsGuildIdCommandsCommandIdKey(
  params: Parameters<typeof client.applications>[0],
  params2: Parameters<ReturnType<typeof client.applications>['guilds']>[0],
  params3: Parameters<ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']>[0],
) {
  return [
    'applications',
    '/applications/{application_id}/guilds/{guild_id}/commands/{command_id}',
    params,
    params2,
    params3,
  ] as const
}

export function useGetApplicationsApplicationIdGuildsGuildIdCommandsCommandId<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']>['get']
      >
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.applications>[0],
  params2: Parameters<ReturnType<typeof client.applications>['guilds']>[0],
  params3: Parameters<ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<
              ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']
            >['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']>['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetApplicationsApplicationIdGuildsGuildIdCommandsCommandIdKey(params, params2, params3)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<
              ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']
            >['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client
          .applications(params)
          .guilds(params2)
          .commands(params3)
          .get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetApplicationsApplicationIdGuildsGuildIdCommandsCommandId<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']>['get']
      >
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.applications>[0],
  params2: Parameters<ReturnType<typeof client.applications>['guilds']>[0],
  params3: Parameters<ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<
              ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']
            >['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']>['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetApplicationsApplicationIdGuildsGuildIdCommandsCommandIdKey(params, params2, params3)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<
              ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']
            >['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client
          .applications(params)
          .guilds(params2)
          .commands(params3)
          .get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getDeleteApplicationsApplicationIdGuildsGuildIdCommandsCommandIdKey() {
  return [
    'applications',
    '/applications/{application_id}/guilds/{guild_id}/commands/{command_id}',
    'DELETE',
  ] as const
}

export function useDeleteApplicationsApplicationIdGuildsGuildIdCommandsCommandId<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<
          ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']
        >['delete']
      >
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.applications>[0],
  params2: Parameters<ReturnType<typeof client.applications>['guilds']>[0],
  params3: Parameters<ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<
              ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']
            >['delete']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<
            ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']
          >['delete']
        >[0]
        options?: Parameters<
          ReturnType<
            ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']
          >['delete']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteApplicationsApplicationIdGuildsGuildIdCommandsCommandIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<
              ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']
            >['delete']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<
            ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']
          >['delete']
        >[0]
        options?: Parameters<
          ReturnType<
            ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']
          >['delete']
        >[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<
              ReturnType<
                ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']
              >['delete']
            >[0]
            options?: Parameters<
              ReturnType<
                ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']
              >['delete']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .applications(params)
          .guilds(params2)
          .commands(params3)
          .delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPatchApplicationsApplicationIdGuildsGuildIdCommandsCommandIdKey() {
  return [
    'applications',
    '/applications/{application_id}/guilds/{guild_id}/commands/{command_id}',
    'PATCH',
  ] as const
}

export function usePatchApplicationsApplicationIdGuildsGuildIdCommandsCommandId<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<
          ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']
        >['patch']
      >
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.applications>[0],
  params2: Parameters<ReturnType<typeof client.applications>['guilds']>[0],
  params3: Parameters<ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<
              ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']
            >['patch']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<
          ReturnType<
            ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']
          >['patch']
        >[0]
        options?: Parameters<
          ReturnType<
            ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']
          >['patch']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPatchApplicationsApplicationIdGuildsGuildIdCommandsCommandIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<
              ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']
            >['patch']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<
          ReturnType<
            ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']
          >['patch']
        >[0]
        options?: Parameters<
          ReturnType<
            ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']
          >['patch']
        >[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<
              ReturnType<
                ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']
              >['patch']
            >[0]
            options?: Parameters<
              ReturnType<
                ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']
              >['patch']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .applications(params)
          .guilds(params2)
          .commands(params3)
          .patch(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissionsKey(
  params: Parameters<typeof client.applications>[0],
  params2: Parameters<ReturnType<typeof client.applications>['guilds']>[0],
  params3: Parameters<ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']>[0],
) {
  return [
    'applications',
    '/applications/{application_id}/guilds/{guild_id}/commands/{command_id}/permissions',
    params,
    params2,
    params3,
  ] as const
}

export function useGetApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissions<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<
          ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']
        >['permissions']['get']
      >
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.applications>[0],
  params2: Parameters<ReturnType<typeof client.applications>['guilds']>[0],
  params3: Parameters<ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<
              ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']
            >['permissions']['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<
        ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']
      >['permissions']['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissionsKey(
            params,
            params2,
            params3,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<
              ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']
            >['permissions']['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client
          .applications(params)
          .guilds(params2)
          .commands(params3)
          .permissions.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissions<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<
          ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']
        >['permissions']['get']
      >
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.applications>[0],
  params2: Parameters<ReturnType<typeof client.applications>['guilds']>[0],
  params3: Parameters<ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<
              ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']
            >['permissions']['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<
        ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']
      >['permissions']['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissionsKey(
            params,
            params2,
            params3,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<
              ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']
            >['permissions']['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client
          .applications(params)
          .guilds(params2)
          .commands(params3)
          .permissions.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPutApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissionsKey() {
  return [
    'applications',
    '/applications/{application_id}/guilds/{guild_id}/commands/{command_id}/permissions',
    'PUT',
  ] as const
}

export function usePutApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissions<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<
          ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']
        >['permissions']['put']
      >
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.applications>[0],
  params2: Parameters<ReturnType<typeof client.applications>['guilds']>[0],
  params3: Parameters<ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<
              ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']
            >['permissions']['put']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<
          ReturnType<
            ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']
          >['permissions']['put']
        >[0]
        options?: Parameters<
          ReturnType<
            ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']
          >['permissions']['put']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey =
    customKey ?? getPutApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissionsKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<
              ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']
            >['permissions']['put']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<
          ReturnType<
            ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']
          >['permissions']['put']
        >[0]
        options?: Parameters<
          ReturnType<
            ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']
          >['permissions']['put']
        >[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<
              ReturnType<
                ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']
              >['permissions']['put']
            >[0]
            options?: Parameters<
              ReturnType<
                ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']
              >['permissions']['put']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .applications(params)
          .guilds(params2)
          .commands(params3)
          .permissions.put(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetApplicationsApplicationIdRoleConnectionsMetadataKey(
  params: Parameters<typeof client.applications>[0],
) {
  return [
    'applications',
    '/applications/{application_id}/role-connections/metadata',
    params,
  ] as const
}

export function useGetApplicationsApplicationIdRoleConnectionsMetadata<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.applications>['role-connections']['metadata']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.applications>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<typeof client.applications>['role-connections']['metadata']['get']>
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<typeof client.applications>['role-connections']['metadata']['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetApplicationsApplicationIdRoleConnectionsMetadataKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<
          ReturnType<ReturnType<typeof client.applications>['role-connections']['metadata']['get']>
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client
          .applications(params)
          ['role-connections'].metadata.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetApplicationsApplicationIdRoleConnectionsMetadata<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.applications>['role-connections']['metadata']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.applications>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<typeof client.applications>['role-connections']['metadata']['get']>
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<typeof client.applications>['role-connections']['metadata']['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetApplicationsApplicationIdRoleConnectionsMetadataKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<
          ReturnType<ReturnType<typeof client.applications>['role-connections']['metadata']['get']>
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client
          .applications(params)
          ['role-connections'].metadata.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPutApplicationsApplicationIdRoleConnectionsMetadataKey() {
  return [
    'applications',
    '/applications/{application_id}/role-connections/metadata',
    'PUT',
  ] as const
}

export function usePutApplicationsApplicationIdRoleConnectionsMetadata<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.applications>['role-connections']['metadata']['put']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.applications>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<typeof client.applications>['role-connections']['metadata']['put']>
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<
          ReturnType<typeof client.applications>['role-connections']['metadata']['put']
        >[0]
        options?: Parameters<
          ReturnType<typeof client.applications>['role-connections']['metadata']['put']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutApplicationsApplicationIdRoleConnectionsMetadataKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<ReturnType<typeof client.applications>['role-connections']['metadata']['put']>
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<
          ReturnType<typeof client.applications>['role-connections']['metadata']['put']
        >[0]
        options?: Parameters<
          ReturnType<typeof client.applications>['role-connections']['metadata']['put']
        >[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<
              ReturnType<typeof client.applications>['role-connections']['metadata']['put']
            >[0]
            options?: Parameters<
              ReturnType<typeof client.applications>['role-connections']['metadata']['put']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .applications(params)
          ['role-connections'].metadata.put(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetChannelsChannelIdKey(params: Parameters<typeof client.channels>[0]) {
  return ['channels', '/channels/{channel_id}', params] as const
}

export function useGetChannelsChannelId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.channels>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.channels>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.channels>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.channels>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetChannelsChannelIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.channels>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.channels(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetChannelsChannelId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.channels>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.channels>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.channels>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.channels>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetChannelsChannelIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.channels>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.channels(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getDeleteChannelsChannelIdKey() {
  return ['channels', '/channels/{channel_id}', 'DELETE'] as const
}

export function useDeleteChannelsChannelId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.channels>['delete']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.channels>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.channels>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.channels>['delete']>[0]
        options?: Parameters<ReturnType<typeof client.channels>['delete']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteChannelsChannelIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.channels>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.channels>['delete']>[0]
        options?: Parameters<ReturnType<typeof client.channels>['delete']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<ReturnType<typeof client.channels>['delete']>[0]
            options?: Parameters<ReturnType<typeof client.channels>['delete']>[1]
          }
        },
      ) => {
        const { data, error } = await client.channels(params).delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPatchChannelsChannelIdKey() {
  return ['channels', '/channels/{channel_id}', 'PATCH'] as const
}

export function usePatchChannelsChannelId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.channels>['patch']>>['error'], null>,
>(
  params: Parameters<typeof client.channels>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.channels>['patch']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.channels>['patch']>[0]
        options?: Parameters<ReturnType<typeof client.channels>['patch']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPatchChannelsChannelIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.channels>['patch']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.channels>['patch']>[0]
        options?: Parameters<ReturnType<typeof client.channels>['patch']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.channels>['patch']>[0]
            options?: Parameters<ReturnType<typeof client.channels>['patch']>[1]
          }
        },
      ) => {
        const { data, error } = await client.channels(params).patch(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostChannelsChannelIdFollowersKey() {
  return ['channels', '/channels/{channel_id}/followers', 'POST'] as const
}

export function usePostChannelsChannelIdFollowers<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.channels>['followers']['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.channels>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.channels>['followers']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.channels>['followers']['post']>[0]
        options?: Parameters<ReturnType<typeof client.channels>['followers']['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostChannelsChannelIdFollowersKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.channels>['followers']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.channels>['followers']['post']>[0]
        options?: Parameters<ReturnType<typeof client.channels>['followers']['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.channels>['followers']['post']>[0]
            options?: Parameters<ReturnType<typeof client.channels>['followers']['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client.channels(params).followers.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetChannelsChannelIdInvitesKey(params: Parameters<typeof client.channels>[0]) {
  return ['channels', '/channels/{channel_id}/invites', params] as const
}

export function useGetChannelsChannelIdInvites<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.channels>['invites']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.channels>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.channels>['invites']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.channels>['invites']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetChannelsChannelIdInvitesKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.channels>['invites']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.channels(params).invites.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetChannelsChannelIdInvites<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.channels>['invites']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.channels>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.channels>['invites']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.channels>['invites']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetChannelsChannelIdInvitesKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.channels>['invites']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.channels(params).invites.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostChannelsChannelIdInvitesKey() {
  return ['channels', '/channels/{channel_id}/invites', 'POST'] as const
}

export function usePostChannelsChannelIdInvites<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.channels>['invites']['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.channels>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.channels>['invites']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.channels>['invites']['post']>[0]
        options?: Parameters<ReturnType<typeof client.channels>['invites']['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostChannelsChannelIdInvitesKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.channels>['invites']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.channels>['invites']['post']>[0]
        options?: Parameters<ReturnType<typeof client.channels>['invites']['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.channels>['invites']['post']>[0]
            options?: Parameters<ReturnType<typeof client.channels>['invites']['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client.channels(params).invites.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetChannelsChannelIdMessagesKey(
  params: Parameters<typeof client.channels>[0],
  options?: Parameters<ReturnType<typeof client.channels>['messages']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['channels', '/channels/{channel_id}/messages', params, keyArgs] as const
}

export function useGetChannelsChannelIdMessages<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.channels>['messages']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.channels>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.channels>['messages']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.channels>['messages']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetChannelsChannelIdMessagesKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.channels>['messages']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.channels(params).messages.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetChannelsChannelIdMessages<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.channels>['messages']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.channels>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.channels>['messages']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.channels>['messages']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetChannelsChannelIdMessagesKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.channels>['messages']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.channels(params).messages.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostChannelsChannelIdMessagesKey() {
  return ['channels', '/channels/{channel_id}/messages', 'POST'] as const
}

export function usePostChannelsChannelIdMessages<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.channels>['messages']['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.channels>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.channels>['messages']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.channels>['messages']['post']>[0]
        options?: Parameters<ReturnType<typeof client.channels>['messages']['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostChannelsChannelIdMessagesKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.channels>['messages']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.channels>['messages']['post']>[0]
        options?: Parameters<ReturnType<typeof client.channels>['messages']['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.channels>['messages']['post']>[0]
            options?: Parameters<ReturnType<typeof client.channels>['messages']['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client.channels(params).messages.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostChannelsChannelIdMessagesBulkDeleteKey() {
  return ['channels', '/channels/{channel_id}/messages/bulk-delete', 'POST'] as const
}

export function usePostChannelsChannelIdMessagesBulkDelete<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.channels>['messages']['bulk-delete']['post']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.channels>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.channels>['messages']['bulk-delete']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.channels>['messages']['bulk-delete']['post']>[0]
        options?: Parameters<
          ReturnType<typeof client.channels>['messages']['bulk-delete']['post']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostChannelsChannelIdMessagesBulkDeleteKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.channels>['messages']['bulk-delete']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.channels>['messages']['bulk-delete']['post']>[0]
        options?: Parameters<
          ReturnType<typeof client.channels>['messages']['bulk-delete']['post']
        >[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<
              ReturnType<typeof client.channels>['messages']['bulk-delete']['post']
            >[0]
            options?: Parameters<
              ReturnType<typeof client.channels>['messages']['bulk-delete']['post']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .channels(params)
          .messages['bulk-delete'].post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetChannelsChannelIdMessagesPinsKey(
  params: Parameters<typeof client.channels>[0],
  options?: Parameters<ReturnType<typeof client.channels>['messages']['pins']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['channels', '/channels/{channel_id}/messages/pins', params, keyArgs] as const
}

export function useGetChannelsChannelIdMessagesPins<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.channels>['messages']['pins']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.channels>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.channels>['messages']['pins']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.channels>['messages']['pins']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetChannelsChannelIdMessagesPinsKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.channels>['messages']['pins']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.channels(params).messages.pins.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetChannelsChannelIdMessagesPins<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.channels>['messages']['pins']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.channels>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.channels>['messages']['pins']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.channels>['messages']['pins']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetChannelsChannelIdMessagesPinsKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.channels>['messages']['pins']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.channels(params).messages.pins.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPutChannelsChannelIdMessagesPinsMessageIdKey() {
  return ['channels', '/channels/{channel_id}/messages/pins/{message_id}', 'PUT'] as const
}

export function usePutChannelsChannelIdMessagesPinsMessageId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']['pins']>['put']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.channels>[0],
  params2: Parameters<ReturnType<typeof client.channels>['messages']['pins']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']['pins']>['put']>
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<ReturnType<typeof client.channels>['messages']['pins']>['put']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.channels>['messages']['pins']>['put']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutChannelsChannelIdMessagesPinsMessageIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']['pins']>['put']>
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<ReturnType<typeof client.channels>['messages']['pins']>['put']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.channels>['messages']['pins']>['put']
        >[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<
              ReturnType<ReturnType<typeof client.channels>['messages']['pins']>['put']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.channels>['messages']['pins']>['put']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .channels(params)
          .messages.pins(params2)
          .put(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getDeleteChannelsChannelIdMessagesPinsMessageIdKey() {
  return ['channels', '/channels/{channel_id}/messages/pins/{message_id}', 'DELETE'] as const
}

export function useDeleteChannelsChannelIdMessagesPinsMessageId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']['pins']>['delete']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.channels>[0],
  params2: Parameters<ReturnType<typeof client.channels>['messages']['pins']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']['pins']>['delete']>
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<ReturnType<typeof client.channels>['messages']['pins']>['delete']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.channels>['messages']['pins']>['delete']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteChannelsChannelIdMessagesPinsMessageIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']['pins']>['delete']>
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<ReturnType<typeof client.channels>['messages']['pins']>['delete']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.channels>['messages']['pins']>['delete']
        >[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<
              ReturnType<ReturnType<typeof client.channels>['messages']['pins']>['delete']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.channels>['messages']['pins']>['delete']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .channels(params)
          .messages.pins(params2)
          .delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetChannelsChannelIdMessagesMessageIdKey(
  params: Parameters<typeof client.channels>[0],
  params2: Parameters<ReturnType<typeof client.channels>['messages']>[0],
) {
  return ['channels', '/channels/{channel_id}/messages/{message_id}', params, params2] as const
}

export function useGetChannelsChannelIdMessagesMessageId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.channels>[0],
  params2: Parameters<ReturnType<typeof client.channels>['messages']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<ReturnType<typeof client.channels>['messages']>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetChannelsChannelIdMessagesMessageIdKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.channels(params).messages(params2).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetChannelsChannelIdMessagesMessageId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.channels>[0],
  params2: Parameters<ReturnType<typeof client.channels>['messages']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<ReturnType<typeof client.channels>['messages']>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetChannelsChannelIdMessagesMessageIdKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.channels(params).messages(params2).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getDeleteChannelsChannelIdMessagesMessageIdKey() {
  return ['channels', '/channels/{channel_id}/messages/{message_id}', 'DELETE'] as const
}

export function useDeleteChannelsChannelIdMessagesMessageId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['delete']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.channels>[0],
  params2: Parameters<ReturnType<typeof client.channels>['messages']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<ReturnType<typeof client.channels>['messages']>['delete']>[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.channels>['messages']>['delete']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteChannelsChannelIdMessagesMessageIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<ReturnType<typeof client.channels>['messages']>['delete']>[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.channels>['messages']>['delete']
        >[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<
              ReturnType<ReturnType<typeof client.channels>['messages']>['delete']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.channels>['messages']>['delete']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .channels(params)
          .messages(params2)
          .delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPatchChannelsChannelIdMessagesMessageIdKey() {
  return ['channels', '/channels/{channel_id}/messages/{message_id}', 'PATCH'] as const
}

export function usePatchChannelsChannelIdMessagesMessageId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['patch']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.channels>[0],
  params2: Parameters<ReturnType<typeof client.channels>['messages']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['patch']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<ReturnType<typeof client.channels>['messages']>['patch']>[0]
        options?: Parameters<ReturnType<ReturnType<typeof client.channels>['messages']>['patch']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPatchChannelsChannelIdMessagesMessageIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['patch']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<ReturnType<typeof client.channels>['messages']>['patch']>[0]
        options?: Parameters<ReturnType<ReturnType<typeof client.channels>['messages']>['patch']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<ReturnType<typeof client.channels>['messages']>['patch']>[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.channels>['messages']>['patch']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .channels(params)
          .messages(params2)
          .patch(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostChannelsChannelIdMessagesMessageIdCrosspostKey() {
  return ['channels', '/channels/{channel_id}/messages/{message_id}/crosspost', 'POST'] as const
}

export function usePostChannelsChannelIdMessagesMessageIdCrosspost<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['crosspost']['post']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.channels>[0],
  params2: Parameters<ReturnType<typeof client.channels>['messages']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<typeof client.channels>['messages']>['crosspost']['post']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<ReturnType<typeof client.channels>['messages']>['crosspost']['post']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.channels>['messages']>['crosspost']['post']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostChannelsChannelIdMessagesMessageIdCrosspostKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<typeof client.channels>['messages']>['crosspost']['post']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<ReturnType<typeof client.channels>['messages']>['crosspost']['post']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.channels>['messages']>['crosspost']['post']
        >[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<
              ReturnType<ReturnType<typeof client.channels>['messages']>['crosspost']['post']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.channels>['messages']>['crosspost']['post']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .channels(params)
          .messages(params2)
          .crosspost.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getDeleteChannelsChannelIdMessagesMessageIdReactionsKey() {
  return ['channels', '/channels/{channel_id}/messages/{message_id}/reactions', 'DELETE'] as const
}

export function useDeleteChannelsChannelIdMessagesMessageIdReactions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']['delete']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.channels>[0],
  params2: Parameters<ReturnType<typeof client.channels>['messages']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']['delete']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']['delete']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']['delete']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteChannelsChannelIdMessagesMessageIdReactionsKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']['delete']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']['delete']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']['delete']
        >[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<
              ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']['delete']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']['delete']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .channels(params)
          .messages(params2)
          .reactions.delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetChannelsChannelIdMessagesMessageIdReactionsEmojiNameKey(
  params: Parameters<typeof client.channels>[0],
  params2: Parameters<ReturnType<typeof client.channels>['messages']>[0],
  params3: Parameters<ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']>[0],
  options?: Parameters<
    ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']>['get']
  >[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'channels',
    '/channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}',
    params,
    params2,
    params3,
    keyArgs,
  ] as const
}

export function useGetChannelsChannelIdMessagesMessageIdReactionsEmojiName<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']>['get']
      >
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.channels>[0],
  params2: Parameters<ReturnType<typeof client.channels>['messages']>[0],
  params3: Parameters<ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<
              ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']
            >['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']>['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetChannelsChannelIdMessagesMessageIdReactionsEmojiNameKey(
            params,
            params2,
            params3,
            clientOptions,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<
              ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']
            >['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client
          .channels(params)
          .messages(params2)
          .reactions(params3)
          .get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetChannelsChannelIdMessagesMessageIdReactionsEmojiName<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']>['get']
      >
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.channels>[0],
  params2: Parameters<ReturnType<typeof client.channels>['messages']>[0],
  params3: Parameters<ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<
              ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']
            >['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']>['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetChannelsChannelIdMessagesMessageIdReactionsEmojiNameKey(
            params,
            params2,
            params3,
            clientOptions,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<
              ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']
            >['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client
          .channels(params)
          .messages(params2)
          .reactions(params3)
          .get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameKey() {
  return [
    'channels',
    '/channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}',
    'DELETE',
  ] as const
}

export function useDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiName<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<
          ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']
        >['delete']
      >
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.channels>[0],
  params2: Parameters<ReturnType<typeof client.channels>['messages']>[0],
  params3: Parameters<ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<
              ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']
            >['delete']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<
            ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']
          >['delete']
        >[0]
        options?: Parameters<
          ReturnType<
            ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']
          >['delete']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<
              ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']
            >['delete']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<
            ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']
          >['delete']
        >[0]
        options?: Parameters<
          ReturnType<
            ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']
          >['delete']
        >[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<
              ReturnType<
                ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']
              >['delete']
            >[0]
            options?: Parameters<
              ReturnType<
                ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']
              >['delete']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .channels(params)
          .messages(params2)
          .reactions(params3)
          .delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPutChannelsChannelIdMessagesMessageIdReactionsEmojiNameMeKey() {
  return [
    'channels',
    '/channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}/@me',
    'PUT',
  ] as const
}

export function usePutChannelsChannelIdMessagesMessageIdReactionsEmojiNameMe<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<
          ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']
        >['@me']['put']
      >
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.channels>[0],
  params2: Parameters<ReturnType<typeof client.channels>['messages']>[0],
  params3: Parameters<ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<
              ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']
            >['@me']['put']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<
            ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']
          >['@me']['put']
        >[0]
        options?: Parameters<
          ReturnType<
            ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']
          >['@me']['put']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutChannelsChannelIdMessagesMessageIdReactionsEmojiNameMeKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<
              ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']
            >['@me']['put']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<
            ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']
          >['@me']['put']
        >[0]
        options?: Parameters<
          ReturnType<
            ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']
          >['@me']['put']
        >[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<
              ReturnType<
                ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']
              >['@me']['put']
            >[0]
            options?: Parameters<
              ReturnType<
                ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']
              >['@me']['put']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .channels(params)
          .messages(params2)
          .reactions(params3)
          ['@me'].put(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameMeKey() {
  return [
    'channels',
    '/channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}/@me',
    'DELETE',
  ] as const
}

export function useDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameMe<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<
          ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']
        >['@me']['delete']
      >
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.channels>[0],
  params2: Parameters<ReturnType<typeof client.channels>['messages']>[0],
  params3: Parameters<ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<
              ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']
            >['@me']['delete']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<
            ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']
          >['@me']['delete']
        >[0]
        options?: Parameters<
          ReturnType<
            ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']
          >['@me']['delete']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameMeKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<
              ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']
            >['@me']['delete']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<
            ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']
          >['@me']['delete']
        >[0]
        options?: Parameters<
          ReturnType<
            ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']
          >['@me']['delete']
        >[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<
              ReturnType<
                ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']
              >['@me']['delete']
            >[0]
            options?: Parameters<
              ReturnType<
                ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']
              >['@me']['delete']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .channels(params)
          .messages(params2)
          .reactions(params3)
          ['@me'].delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameUserIdKey() {
  return [
    'channels',
    '/channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}/{user_id}',
    'DELETE',
  ] as const
}

export function useDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameUserId<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<
          ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']>
        >['delete']
      >
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.channels>[0],
  params2: Parameters<ReturnType<typeof client.channels>['messages']>[0],
  params3: Parameters<ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']>[0],
  params4: Parameters<
    ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']>
  >[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<
              ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']>
            >['delete']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<
            ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']>
          >['delete']
        >[0]
        options?: Parameters<
          ReturnType<
            ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']>
          >['delete']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey =
    customKey ?? getDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameUserIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<
              ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']>
            >['delete']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<
            ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']>
          >['delete']
        >[0]
        options?: Parameters<
          ReturnType<
            ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']>
          >['delete']
        >[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<
              ReturnType<
                ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']>
              >['delete']
            >[0]
            options?: Parameters<
              ReturnType<
                ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']>
              >['delete']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .channels(params)
          .messages(params2)
          .reactions(params3)(params4)
          .delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostChannelsChannelIdMessagesMessageIdThreadsKey() {
  return ['channels', '/channels/{channel_id}/messages/{message_id}/threads', 'POST'] as const
}

export function usePostChannelsChannelIdMessagesMessageIdThreads<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['threads']['post']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.channels>[0],
  params2: Parameters<ReturnType<typeof client.channels>['messages']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['threads']['post']>
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<
          ReturnType<ReturnType<typeof client.channels>['messages']>['threads']['post']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.channels>['messages']>['threads']['post']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostChannelsChannelIdMessagesMessageIdThreadsKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['threads']['post']>
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<
          ReturnType<ReturnType<typeof client.channels>['messages']>['threads']['post']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.channels>['messages']>['threads']['post']
        >[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<
              ReturnType<ReturnType<typeof client.channels>['messages']>['threads']['post']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.channels>['messages']>['threads']['post']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .channels(params)
          .messages(params2)
          .threads.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetChannelsChannelIdPermissionsMemberUserIdKey(
  params: Parameters<typeof client.channels>[0],
  params2: Parameters<ReturnType<typeof client.channels>['permissions']['member']>[0],
  options?: Parameters<
    ReturnType<ReturnType<typeof client.channels>['permissions']['member']>['get']
  >[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'channels',
    '/channels/{channel_id}/permissions/member/{user_id}',
    params,
    params2,
    keyArgs,
  ] as const
}

export function useGetChannelsChannelIdPermissionsMemberUserId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['permissions']['member']>['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.channels>[0],
  params2: Parameters<ReturnType<typeof client.channels>['permissions']['member']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.channels>['permissions']['member']>['get']>
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<typeof client.channels>['permissions']['member']>['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetChannelsChannelIdPermissionsMemberUserIdKey(params, params2, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.channels>['permissions']['member']>['get']>
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client
          .channels(params)
          .permissions.member(params2)
          .get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetChannelsChannelIdPermissionsMemberUserId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['permissions']['member']>['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.channels>[0],
  params2: Parameters<ReturnType<typeof client.channels>['permissions']['member']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.channels>['permissions']['member']>['get']>
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<typeof client.channels>['permissions']['member']>['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetChannelsChannelIdPermissionsMemberUserIdKey(params, params2, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.channels>['permissions']['member']>['get']>
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client
          .channels(params)
          .permissions.member(params2)
          .get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetChannelsChannelIdPermissionsRoleRoleIdKey(
  params: Parameters<typeof client.channels>[0],
  params2: Parameters<ReturnType<typeof client.channels>['permissions']['role']>[0],
  options?: Parameters<
    ReturnType<ReturnType<typeof client.channels>['permissions']['role']>['get']
  >[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'channels',
    '/channels/{channel_id}/permissions/role/{role_id}',
    params,
    params2,
    keyArgs,
  ] as const
}

export function useGetChannelsChannelIdPermissionsRoleRoleId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['permissions']['role']>['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.channels>[0],
  params2: Parameters<ReturnType<typeof client.channels>['permissions']['role']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.channels>['permissions']['role']>['get']>
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<typeof client.channels>['permissions']['role']>['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetChannelsChannelIdPermissionsRoleRoleIdKey(params, params2, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.channels>['permissions']['role']>['get']>
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client
          .channels(params)
          .permissions.role(params2)
          .get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetChannelsChannelIdPermissionsRoleRoleId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['permissions']['role']>['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.channels>[0],
  params2: Parameters<ReturnType<typeof client.channels>['permissions']['role']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.channels>['permissions']['role']>['get']>
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<typeof client.channels>['permissions']['role']>['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetChannelsChannelIdPermissionsRoleRoleIdKey(params, params2, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.channels>['permissions']['role']>['get']>
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client
          .channels(params)
          .permissions.role(params2)
          .get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPutChannelsChannelIdPermissionsOverwriteIdKey() {
  return ['channels', '/channels/{channel_id}/permissions/{overwrite_id}', 'PUT'] as const
}

export function usePutChannelsChannelIdPermissionsOverwriteId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['permissions']>['put']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.channels>[0],
  params2: Parameters<ReturnType<typeof client.channels>['permissions']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.channels>['permissions']>['put']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<ReturnType<typeof client.channels>['permissions']>['put']>[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.channels>['permissions']>['put']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutChannelsChannelIdPermissionsOverwriteIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.channels>['permissions']>['put']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<ReturnType<typeof client.channels>['permissions']>['put']>[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.channels>['permissions']>['put']
        >[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<
              ReturnType<ReturnType<typeof client.channels>['permissions']>['put']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.channels>['permissions']>['put']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .channels(params)
          .permissions(params2)
          .put(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getDeleteChannelsChannelIdPermissionsOverwriteIdKey() {
  return ['channels', '/channels/{channel_id}/permissions/{overwrite_id}', 'DELETE'] as const
}

export function useDeleteChannelsChannelIdPermissionsOverwriteId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['permissions']>['delete']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.channels>[0],
  params2: Parameters<ReturnType<typeof client.channels>['permissions']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.channels>['permissions']>['delete']>
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<ReturnType<typeof client.channels>['permissions']>['delete']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.channels>['permissions']>['delete']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteChannelsChannelIdPermissionsOverwriteIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.channels>['permissions']>['delete']>
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<ReturnType<typeof client.channels>['permissions']>['delete']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.channels>['permissions']>['delete']
        >[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<
              ReturnType<ReturnType<typeof client.channels>['permissions']>['delete']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.channels>['permissions']>['delete']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .channels(params)
          .permissions(params2)
          .delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetChannelsChannelIdPinsKey(params: Parameters<typeof client.channels>[0]) {
  return ['channels', '/channels/{channel_id}/pins', params] as const
}

export function useGetChannelsChannelIdPins<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.channels>['pins']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.channels>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.channels>['pins']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.channels>['pins']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetChannelsChannelIdPinsKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.channels>['pins']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.channels(params).pins.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetChannelsChannelIdPins<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.channels>['pins']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.channels>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.channels>['pins']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.channels>['pins']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetChannelsChannelIdPinsKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.channels>['pins']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.channels(params).pins.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPutChannelsChannelIdPinsMessageIdKey() {
  return ['channels', '/channels/{channel_id}/pins/{message_id}', 'PUT'] as const
}

export function usePutChannelsChannelIdPinsMessageId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.channels>['pins']>['put']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.channels>[0],
  params2: Parameters<ReturnType<typeof client.channels>['pins']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.channels>['pins']>['put']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<ReturnType<typeof client.channels>['pins']>['put']>[0]
        options?: Parameters<ReturnType<ReturnType<typeof client.channels>['pins']>['put']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutChannelsChannelIdPinsMessageIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.channels>['pins']>['put']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<ReturnType<typeof client.channels>['pins']>['put']>[0]
        options?: Parameters<ReturnType<ReturnType<typeof client.channels>['pins']>['put']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<ReturnType<ReturnType<typeof client.channels>['pins']>['put']>[0]
            options?: Parameters<ReturnType<ReturnType<typeof client.channels>['pins']>['put']>[1]
          }
        },
      ) => {
        const { data, error } = await client
          .channels(params)
          .pins(params2)
          .put(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getDeleteChannelsChannelIdPinsMessageIdKey() {
  return ['channels', '/channels/{channel_id}/pins/{message_id}', 'DELETE'] as const
}

export function useDeleteChannelsChannelIdPinsMessageId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.channels>['pins']>['delete']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.channels>[0],
  params2: Parameters<ReturnType<typeof client.channels>['pins']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.channels>['pins']>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<ReturnType<typeof client.channels>['pins']>['delete']>[0]
        options?: Parameters<ReturnType<ReturnType<typeof client.channels>['pins']>['delete']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteChannelsChannelIdPinsMessageIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.channels>['pins']>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<ReturnType<typeof client.channels>['pins']>['delete']>[0]
        options?: Parameters<ReturnType<ReturnType<typeof client.channels>['pins']>['delete']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<ReturnType<ReturnType<typeof client.channels>['pins']>['delete']>[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.channels>['pins']>['delete']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .channels(params)
          .pins(params2)
          .delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetChannelsChannelIdPollsMessageIdAnswersAnswerIdKey(
  params: Parameters<typeof client.channels>[0],
  params2: Parameters<ReturnType<typeof client.channels>['polls']>[0],
  params3: Parameters<ReturnType<ReturnType<typeof client.channels>['polls']>['answers']>[0],
  options?: Parameters<
    ReturnType<ReturnType<ReturnType<typeof client.channels>['polls']>['answers']>['get']
  >[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'channels',
    '/channels/{channel_id}/polls/{message_id}/answers/{answer_id}',
    params,
    params2,
    params3,
    keyArgs,
  ] as const
}

export function useGetChannelsChannelIdPollsMessageIdAnswersAnswerId<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<ReturnType<typeof client.channels>['polls']>['answers']>['get']
      >
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.channels>[0],
  params2: Parameters<ReturnType<typeof client.channels>['polls']>[0],
  params3: Parameters<ReturnType<ReturnType<typeof client.channels>['polls']>['answers']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<ReturnType<typeof client.channels>['polls']>['answers']>['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['polls']>['answers']>['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetChannelsChannelIdPollsMessageIdAnswersAnswerIdKey(
            params,
            params2,
            params3,
            clientOptions,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<ReturnType<typeof client.channels>['polls']>['answers']>['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client
          .channels(params)
          .polls(params2)
          .answers(params3)
          .get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetChannelsChannelIdPollsMessageIdAnswersAnswerId<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<ReturnType<typeof client.channels>['polls']>['answers']>['get']
      >
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.channels>[0],
  params2: Parameters<ReturnType<typeof client.channels>['polls']>[0],
  params3: Parameters<ReturnType<ReturnType<typeof client.channels>['polls']>['answers']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<ReturnType<typeof client.channels>['polls']>['answers']>['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['polls']>['answers']>['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetChannelsChannelIdPollsMessageIdAnswersAnswerIdKey(
            params,
            params2,
            params3,
            clientOptions,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<ReturnType<typeof client.channels>['polls']>['answers']>['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client
          .channels(params)
          .polls(params2)
          .answers(params3)
          .get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostChannelsChannelIdPollsMessageIdExpireKey() {
  return ['channels', '/channels/{channel_id}/polls/{message_id}/expire', 'POST'] as const
}

export function usePostChannelsChannelIdPollsMessageIdExpire<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['polls']>['expire']['post']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.channels>[0],
  params2: Parameters<ReturnType<typeof client.channels>['polls']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.channels>['polls']>['expire']['post']>
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<ReturnType<typeof client.channels>['polls']>['expire']['post']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.channels>['polls']>['expire']['post']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostChannelsChannelIdPollsMessageIdExpireKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.channels>['polls']>['expire']['post']>
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<ReturnType<typeof client.channels>['polls']>['expire']['post']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.channels>['polls']>['expire']['post']
        >[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<
              ReturnType<ReturnType<typeof client.channels>['polls']>['expire']['post']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.channels>['polls']>['expire']['post']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .channels(params)
          .polls(params2)
          .expire.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPutChannelsChannelIdRecipientsUserIdKey() {
  return ['channels', '/channels/{channel_id}/recipients/{user_id}', 'PUT'] as const
}

export function usePutChannelsChannelIdRecipientsUserId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['recipients']>['put']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.channels>[0],
  params2: Parameters<ReturnType<typeof client.channels>['recipients']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.channels>['recipients']>['put']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<ReturnType<typeof client.channels>['recipients']>['put']>[0]
        options?: Parameters<ReturnType<ReturnType<typeof client.channels>['recipients']>['put']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutChannelsChannelIdRecipientsUserIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.channels>['recipients']>['put']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<ReturnType<typeof client.channels>['recipients']>['put']>[0]
        options?: Parameters<ReturnType<ReturnType<typeof client.channels>['recipients']>['put']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<ReturnType<typeof client.channels>['recipients']>['put']>[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.channels>['recipients']>['put']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .channels(params)
          .recipients(params2)
          .put(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getDeleteChannelsChannelIdRecipientsUserIdKey() {
  return ['channels', '/channels/{channel_id}/recipients/{user_id}', 'DELETE'] as const
}

export function useDeleteChannelsChannelIdRecipientsUserId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['recipients']>['delete']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.channels>[0],
  params2: Parameters<ReturnType<typeof client.channels>['recipients']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.channels>['recipients']>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<ReturnType<typeof client.channels>['recipients']>['delete']>[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.channels>['recipients']>['delete']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteChannelsChannelIdRecipientsUserIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.channels>['recipients']>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<ReturnType<typeof client.channels>['recipients']>['delete']>[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.channels>['recipients']>['delete']
        >[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<
              ReturnType<ReturnType<typeof client.channels>['recipients']>['delete']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.channels>['recipients']>['delete']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .channels(params)
          .recipients(params2)
          .delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostChannelsChannelIdSendSoundboardSoundKey() {
  return ['channels', '/channels/{channel_id}/send-soundboard-sound', 'POST'] as const
}

export function usePostChannelsChannelIdSendSoundboardSound<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.channels>['send-soundboard-sound']['post']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.channels>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.channels>['send-soundboard-sound']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.channels>['send-soundboard-sound']['post']>[0]
        options?: Parameters<ReturnType<typeof client.channels>['send-soundboard-sound']['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostChannelsChannelIdSendSoundboardSoundKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.channels>['send-soundboard-sound']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.channels>['send-soundboard-sound']['post']>[0]
        options?: Parameters<ReturnType<typeof client.channels>['send-soundboard-sound']['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.channels>['send-soundboard-sound']['post']>[0]
            options?: Parameters<
              ReturnType<typeof client.channels>['send-soundboard-sound']['post']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .channels(params)
          ['send-soundboard-sound'].post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetChannelsChannelIdThreadMembersKey(
  params: Parameters<typeof client.channels>[0],
  options?: Parameters<ReturnType<typeof client.channels>['thread-members']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['channels', '/channels/{channel_id}/thread-members', params, keyArgs] as const
}

export function useGetChannelsChannelIdThreadMembers<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.channels>['thread-members']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.channels>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.channels>['thread-members']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.channels>['thread-members']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetChannelsChannelIdThreadMembersKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.channels>['thread-members']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.channels(params)['thread-members'].get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetChannelsChannelIdThreadMembers<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.channels>['thread-members']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.channels>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.channels>['thread-members']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.channels>['thread-members']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetChannelsChannelIdThreadMembersKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.channels>['thread-members']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.channels(params)['thread-members'].get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPutChannelsChannelIdThreadMembersMeKey() {
  return ['channels', '/channels/{channel_id}/thread-members/@me', 'PUT'] as const
}

export function usePutChannelsChannelIdThreadMembersMe<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.channels>['thread-members']['@me']['put']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.channels>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.channels>['thread-members']['@me']['put']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.channels>['thread-members']['@me']['put']>[0]
        options?: Parameters<ReturnType<typeof client.channels>['thread-members']['@me']['put']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutChannelsChannelIdThreadMembersMeKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.channels>['thread-members']['@me']['put']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.channels>['thread-members']['@me']['put']>[0]
        options?: Parameters<ReturnType<typeof client.channels>['thread-members']['@me']['put']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<ReturnType<typeof client.channels>['thread-members']['@me']['put']>[0]
            options?: Parameters<
              ReturnType<typeof client.channels>['thread-members']['@me']['put']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .channels(params)
          ['thread-members']['@me'].put(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getDeleteChannelsChannelIdThreadMembersMeKey() {
  return ['channels', '/channels/{channel_id}/thread-members/@me', 'DELETE'] as const
}

export function useDeleteChannelsChannelIdThreadMembersMe<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.channels>['thread-members']['@me']['delete']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.channels>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.channels>['thread-members']['@me']['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.channels>['thread-members']['@me']['delete']>[0]
        options?: Parameters<
          ReturnType<typeof client.channels>['thread-members']['@me']['delete']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteChannelsChannelIdThreadMembersMeKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.channels>['thread-members']['@me']['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.channels>['thread-members']['@me']['delete']>[0]
        options?: Parameters<
          ReturnType<typeof client.channels>['thread-members']['@me']['delete']
        >[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<
              ReturnType<typeof client.channels>['thread-members']['@me']['delete']
            >[0]
            options?: Parameters<
              ReturnType<typeof client.channels>['thread-members']['@me']['delete']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .channels(params)
          ['thread-members']['@me'].delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetChannelsChannelIdThreadMembersUserIdKey(
  params: Parameters<typeof client.channels>[0],
  params2: Parameters<ReturnType<typeof client.channels>['thread-members']>[0],
  options?: Parameters<ReturnType<ReturnType<typeof client.channels>['thread-members']>['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'channels',
    '/channels/{channel_id}/thread-members/{user_id}',
    params,
    params2,
    keyArgs,
  ] as const
}

export function useGetChannelsChannelIdThreadMembersUserId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['thread-members']>['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.channels>[0],
  params2: Parameters<ReturnType<typeof client.channels>['thread-members']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.channels>['thread-members']>['get']>
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<ReturnType<typeof client.channels>['thread-members']>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetChannelsChannelIdThreadMembersUserIdKey(params, params2, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.channels>['thread-members']>['get']>
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client
          .channels(params)
          ['thread-members'](params2)
          .get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetChannelsChannelIdThreadMembersUserId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['thread-members']>['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.channels>[0],
  params2: Parameters<ReturnType<typeof client.channels>['thread-members']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.channels>['thread-members']>['get']>
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<ReturnType<typeof client.channels>['thread-members']>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetChannelsChannelIdThreadMembersUserIdKey(params, params2, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.channels>['thread-members']>['get']>
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client
          .channels(params)
          ['thread-members'](params2)
          .get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPutChannelsChannelIdThreadMembersUserIdKey() {
  return ['channels', '/channels/{channel_id}/thread-members/{user_id}', 'PUT'] as const
}

export function usePutChannelsChannelIdThreadMembersUserId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['thread-members']>['put']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.channels>[0],
  params2: Parameters<ReturnType<typeof client.channels>['thread-members']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.channels>['thread-members']>['put']>
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<ReturnType<typeof client.channels>['thread-members']>['put']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.channels>['thread-members']>['put']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutChannelsChannelIdThreadMembersUserIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.channels>['thread-members']>['put']>
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<ReturnType<typeof client.channels>['thread-members']>['put']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.channels>['thread-members']>['put']
        >[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<
              ReturnType<ReturnType<typeof client.channels>['thread-members']>['put']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.channels>['thread-members']>['put']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .channels(params)
          ['thread-members'](params2)
          .put(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getDeleteChannelsChannelIdThreadMembersUserIdKey() {
  return ['channels', '/channels/{channel_id}/thread-members/{user_id}', 'DELETE'] as const
}

export function useDeleteChannelsChannelIdThreadMembersUserId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['thread-members']>['delete']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.channels>[0],
  params2: Parameters<ReturnType<typeof client.channels>['thread-members']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.channels>['thread-members']>['delete']>
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<ReturnType<typeof client.channels>['thread-members']>['delete']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.channels>['thread-members']>['delete']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteChannelsChannelIdThreadMembersUserIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.channels>['thread-members']>['delete']>
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<ReturnType<typeof client.channels>['thread-members']>['delete']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.channels>['thread-members']>['delete']
        >[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<
              ReturnType<ReturnType<typeof client.channels>['thread-members']>['delete']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.channels>['thread-members']>['delete']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .channels(params)
          ['thread-members'](params2)
          .delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostChannelsChannelIdThreadsKey() {
  return ['channels', '/channels/{channel_id}/threads', 'POST'] as const
}

export function usePostChannelsChannelIdThreads<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.channels>['threads']['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.channels>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.channels>['threads']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.channels>['threads']['post']>[0]
        options?: Parameters<ReturnType<typeof client.channels>['threads']['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostChannelsChannelIdThreadsKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.channels>['threads']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.channels>['threads']['post']>[0]
        options?: Parameters<ReturnType<typeof client.channels>['threads']['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.channels>['threads']['post']>[0]
            options?: Parameters<ReturnType<typeof client.channels>['threads']['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client.channels(params).threads.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetChannelsChannelIdThreadsArchivedPrivateKey(
  params: Parameters<typeof client.channels>[0],
  options?: Parameters<
    ReturnType<typeof client.channels>['threads']['archived']['private']['get']
  >[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['channels', '/channels/{channel_id}/threads/archived/private', params, keyArgs] as const
}

export function useGetChannelsChannelIdThreadsArchivedPrivate<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.channels>['threads']['archived']['private']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.channels>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<typeof client.channels>['threads']['archived']['private']['get']>
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<typeof client.channels>['threads']['archived']['private']['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetChannelsChannelIdThreadsArchivedPrivateKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<
          ReturnType<ReturnType<typeof client.channels>['threads']['archived']['private']['get']>
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client
          .channels(params)
          .threads.archived.private.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetChannelsChannelIdThreadsArchivedPrivate<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.channels>['threads']['archived']['private']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.channels>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<typeof client.channels>['threads']['archived']['private']['get']>
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<typeof client.channels>['threads']['archived']['private']['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetChannelsChannelIdThreadsArchivedPrivateKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<
          ReturnType<ReturnType<typeof client.channels>['threads']['archived']['private']['get']>
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client
          .channels(params)
          .threads.archived.private.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetChannelsChannelIdThreadsArchivedPublicKey(
  params: Parameters<typeof client.channels>[0],
  options?: Parameters<
    ReturnType<typeof client.channels>['threads']['archived']['public']['get']
  >[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['channels', '/channels/{channel_id}/threads/archived/public', params, keyArgs] as const
}

export function useGetChannelsChannelIdThreadsArchivedPublic<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.channels>['threads']['archived']['public']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.channels>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<typeof client.channels>['threads']['archived']['public']['get']>
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<typeof client.channels>['threads']['archived']['public']['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetChannelsChannelIdThreadsArchivedPublicKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<
          ReturnType<ReturnType<typeof client.channels>['threads']['archived']['public']['get']>
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client
          .channels(params)
          .threads.archived.public.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetChannelsChannelIdThreadsArchivedPublic<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.channels>['threads']['archived']['public']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.channels>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<typeof client.channels>['threads']['archived']['public']['get']>
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<typeof client.channels>['threads']['archived']['public']['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetChannelsChannelIdThreadsArchivedPublicKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<
          ReturnType<ReturnType<typeof client.channels>['threads']['archived']['public']['get']>
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client
          .channels(params)
          .threads.archived.public.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetChannelsChannelIdThreadsSearchKey(
  params: Parameters<typeof client.channels>[0],
  options?: Parameters<ReturnType<typeof client.channels>['threads']['search']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['channels', '/channels/{channel_id}/threads/search', params, keyArgs] as const
}

export function useGetChannelsChannelIdThreadsSearch<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.channels>['threads']['search']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.channels>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.channels>['threads']['search']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.channels>['threads']['search']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetChannelsChannelIdThreadsSearchKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.channels>['threads']['search']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.channels(params).threads.search.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetChannelsChannelIdThreadsSearch<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.channels>['threads']['search']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.channels>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.channels>['threads']['search']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.channels>['threads']['search']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetChannelsChannelIdThreadsSearchKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.channels>['threads']['search']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.channels(params).threads.search.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostChannelsChannelIdTypingKey() {
  return ['channels', '/channels/{channel_id}/typing', 'POST'] as const
}

export function usePostChannelsChannelIdTyping<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.channels>['typing']['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.channels>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.channels>['typing']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.channels>['typing']['post']>[0]
        options?: Parameters<ReturnType<typeof client.channels>['typing']['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostChannelsChannelIdTypingKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.channels>['typing']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.channels>['typing']['post']>[0]
        options?: Parameters<ReturnType<typeof client.channels>['typing']['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<ReturnType<typeof client.channels>['typing']['post']>[0]
            options?: Parameters<ReturnType<typeof client.channels>['typing']['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client.channels(params).typing.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetChannelsChannelIdUsersMeThreadsArchivedPrivateKey(
  params: Parameters<typeof client.channels>[0],
  options?: Parameters<
    ReturnType<typeof client.channels>['users']['@me']['threads']['archived']['private']['get']
  >[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'channels',
    '/channels/{channel_id}/users/@me/threads/archived/private',
    params,
    keyArgs,
  ] as const
}

export function useGetChannelsChannelIdUsersMeThreadsArchivedPrivate<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<typeof client.channels>['users']['@me']['threads']['archived']['private']['get']
      >
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.channels>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<
              typeof client.channels
            >['users']['@me']['threads']['archived']['private']['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<typeof client.channels>['users']['@me']['threads']['archived']['private']['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetChannelsChannelIdUsersMeThreadsArchivedPrivateKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<
              typeof client.channels
            >['users']['@me']['threads']['archived']['private']['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client
          .channels(params)
          .users['@me'].threads.archived.private.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetChannelsChannelIdUsersMeThreadsArchivedPrivate<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<typeof client.channels>['users']['@me']['threads']['archived']['private']['get']
      >
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.channels>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<
              typeof client.channels
            >['users']['@me']['threads']['archived']['private']['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<typeof client.channels>['users']['@me']['threads']['archived']['private']['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetChannelsChannelIdUsersMeThreadsArchivedPrivateKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<
              typeof client.channels
            >['users']['@me']['threads']['archived']['private']['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client
          .channels(params)
          .users['@me'].threads.archived.private.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPutChannelsChannelIdVoiceStatusKey() {
  return ['channels', '/channels/{channel_id}/voice-status', 'PUT'] as const
}

export function usePutChannelsChannelIdVoiceStatus<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.channels>['voice-status']['put']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.channels>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.channels>['voice-status']['put']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.channels>['voice-status']['put']>[0]
        options?: Parameters<ReturnType<typeof client.channels>['voice-status']['put']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutChannelsChannelIdVoiceStatusKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.channels>['voice-status']['put']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.channels>['voice-status']['put']>[0]
        options?: Parameters<ReturnType<typeof client.channels>['voice-status']['put']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.channels>['voice-status']['put']>[0]
            options?: Parameters<ReturnType<typeof client.channels>['voice-status']['put']>[1]
          }
        },
      ) => {
        const { data, error } = await client
          .channels(params)
          ['voice-status'].put(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetChannelsChannelIdWebhooksKey(params: Parameters<typeof client.channels>[0]) {
  return ['channels', '/channels/{channel_id}/webhooks', params] as const
}

export function useGetChannelsChannelIdWebhooks<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.channels>['webhooks']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.channels>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.channels>['webhooks']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.channels>['webhooks']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetChannelsChannelIdWebhooksKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.channels>['webhooks']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.channels(params).webhooks.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetChannelsChannelIdWebhooks<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.channels>['webhooks']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.channels>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.channels>['webhooks']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.channels>['webhooks']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetChannelsChannelIdWebhooksKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.channels>['webhooks']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.channels(params).webhooks.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostChannelsChannelIdWebhooksKey() {
  return ['channels', '/channels/{channel_id}/webhooks', 'POST'] as const
}

export function usePostChannelsChannelIdWebhooks<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.channels>['webhooks']['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.channels>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.channels>['webhooks']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.channels>['webhooks']['post']>[0]
        options?: Parameters<ReturnType<typeof client.channels>['webhooks']['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostChannelsChannelIdWebhooksKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.channels>['webhooks']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.channels>['webhooks']['post']>[0]
        options?: Parameters<ReturnType<typeof client.channels>['webhooks']['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.channels>['webhooks']['post']>[0]
            options?: Parameters<ReturnType<typeof client.channels>['webhooks']['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client.channels(params).webhooks.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetGatewayKey() {
  return ['gateway', '/gateway'] as const
}

export function useGetGateway<
  TError = Exclude<Awaited<ReturnType<typeof client.gateway.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.gateway.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.gateway.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey === undefined ? getGetGatewayKey() : customKey) : null
  return {
    swrKey,
    ...useSWR<
      Extract<Awaited<ReturnType<typeof client.gateway.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.gateway.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetGateway<
  TError = Exclude<Awaited<ReturnType<typeof client.gateway.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.gateway.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.gateway.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey === undefined ? getGetGatewayKey() : customKey) : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<Awaited<ReturnType<typeof client.gateway.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.gateway.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetGatewayBotKey() {
  return ['gateway', '/gateway/bot'] as const
}

export function useGetGatewayBot<
  TError = Exclude<Awaited<ReturnType<typeof client.gateway.bot.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.gateway.bot.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.gateway.bot.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey === undefined ? getGetGatewayBotKey() : customKey) : null
  return {
    swrKey,
    ...useSWR<
      Extract<Awaited<ReturnType<typeof client.gateway.bot.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.gateway.bot.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetGatewayBot<
  TError = Exclude<Awaited<ReturnType<typeof client.gateway.bot.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.gateway.bot.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.gateway.bot.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey === undefined ? getGetGatewayBotKey() : customKey) : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<Awaited<ReturnType<typeof client.gateway.bot.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.gateway.bot.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetGuildsTemplatesCodeKey(
  params: Parameters<typeof client.guilds.templates>[0],
) {
  return ['guilds', '/guilds/templates/{code}', params] as const
}

export function useGetGuildsTemplatesCode<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds.templates>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds.templates>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds.templates>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.guilds.templates>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsTemplatesCodeKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds.templates>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.guilds.templates(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetGuildsTemplatesCode<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds.templates>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds.templates>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds.templates>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.guilds.templates>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsTemplatesCodeKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds.templates>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.guilds.templates(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetGuildsGuildIdKey(
  params: Parameters<typeof client.guilds>[0],
  options?: Parameters<ReturnType<typeof client.guilds>['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['guilds', '/guilds/{guild_id}', params, keyArgs] as const
}

export function useGetGuildsGuildId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.guilds>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.guilds>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.guilds(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetGuildsGuildId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.guilds>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.guilds>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.guilds(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPatchGuildsGuildIdKey() {
  return ['guilds', '/guilds/{guild_id}', 'PATCH'] as const
}

export function usePatchGuildsGuildId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.guilds>['patch']>>['error'], null>,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['patch']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.guilds>['patch']>[0]
        options?: Parameters<ReturnType<typeof client.guilds>['patch']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPatchGuildsGuildIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['patch']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.guilds>['patch']>[0]
        options?: Parameters<ReturnType<typeof client.guilds>['patch']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.guilds>['patch']>[0]
            options?: Parameters<ReturnType<typeof client.guilds>['patch']>[1]
          }
        },
      ) => {
        const { data, error } = await client.guilds(params).patch(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetGuildsGuildIdAuditLogsKey(
  params: Parameters<typeof client.guilds>[0],
  options?: Parameters<ReturnType<typeof client.guilds>['audit-logs']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['guilds', '/guilds/{guild_id}/audit-logs', params, keyArgs] as const
}

export function useGetGuildsGuildIdAuditLogs<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['audit-logs']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['audit-logs']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.guilds>['audit-logs']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdAuditLogsKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['audit-logs']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.guilds(params)['audit-logs'].get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetGuildsGuildIdAuditLogs<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['audit-logs']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['audit-logs']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.guilds>['audit-logs']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdAuditLogsKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['audit-logs']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.guilds(params)['audit-logs'].get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetGuildsGuildIdAutoModerationRulesKey(
  params: Parameters<typeof client.guilds>[0],
) {
  return ['guilds', '/guilds/{guild_id}/auto-moderation/rules', params] as const
}

export function useGetGuildsGuildIdAutoModerationRules<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.guilds>['auto-moderation']['rules']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdAutoModerationRulesKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client
          .guilds(params)
          ['auto-moderation'].rules.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetGuildsGuildIdAutoModerationRules<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.guilds>['auto-moderation']['rules']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdAutoModerationRulesKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client
          .guilds(params)
          ['auto-moderation'].rules.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostGuildsGuildIdAutoModerationRulesKey() {
  return ['guilds', '/guilds/{guild_id}/auto-moderation/rules', 'POST'] as const
}

export function usePostGuildsGuildIdAutoModerationRules<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']['post']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.guilds>['auto-moderation']['rules']['post']>[0]
        options?: Parameters<
          ReturnType<typeof client.guilds>['auto-moderation']['rules']['post']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostGuildsGuildIdAutoModerationRulesKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.guilds>['auto-moderation']['rules']['post']>[0]
        options?: Parameters<
          ReturnType<typeof client.guilds>['auto-moderation']['rules']['post']
        >[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<
              ReturnType<typeof client.guilds>['auto-moderation']['rules']['post']
            >[0]
            options?: Parameters<
              ReturnType<typeof client.guilds>['auto-moderation']['rules']['post']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .guilds(params)
          ['auto-moderation'].rules.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetGuildsGuildIdAutoModerationRulesRuleIdKey(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['auto-moderation']['rules']>[0],
) {
  return ['guilds', '/guilds/{guild_id}/auto-moderation/rules/{rule_id}', params, params2] as const
}

export function useGetGuildsGuildIdAutoModerationRulesRuleId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']>['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['auto-moderation']['rules']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']>['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']>['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdAutoModerationRulesRuleIdKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']>['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client
          .guilds(params)
          ['auto-moderation'].rules(params2)
          .get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetGuildsGuildIdAutoModerationRulesRuleId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']>['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['auto-moderation']['rules']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']>['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']>['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdAutoModerationRulesRuleIdKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']>['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client
          .guilds(params)
          ['auto-moderation'].rules(params2)
          .get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getDeleteGuildsGuildIdAutoModerationRulesRuleIdKey() {
  return ['guilds', '/guilds/{guild_id}/auto-moderation/rules/{rule_id}', 'DELETE'] as const
}

export function useDeleteGuildsGuildIdAutoModerationRulesRuleId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']>['delete']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['auto-moderation']['rules']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']>['delete']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']>['delete']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']>['delete']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteGuildsGuildIdAutoModerationRulesRuleIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']>['delete']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']>['delete']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']>['delete']
        >[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<
              ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']>['delete']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']>['delete']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .guilds(params)
          ['auto-moderation'].rules(params2)
          .delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPatchGuildsGuildIdAutoModerationRulesRuleIdKey() {
  return ['guilds', '/guilds/{guild_id}/auto-moderation/rules/{rule_id}', 'PATCH'] as const
}

export function usePatchGuildsGuildIdAutoModerationRulesRuleId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']>['patch']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['auto-moderation']['rules']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']>['patch']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<
          ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']>['patch']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']>['patch']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPatchGuildsGuildIdAutoModerationRulesRuleIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']>['patch']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<
          ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']>['patch']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']>['patch']
        >[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<
              ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']>['patch']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']>['patch']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .guilds(params)
          ['auto-moderation'].rules(params2)
          .patch(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetGuildsGuildIdBansKey(
  params: Parameters<typeof client.guilds>[0],
  options?: Parameters<ReturnType<typeof client.guilds>['bans']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['guilds', '/guilds/{guild_id}/bans', params, keyArgs] as const
}

export function useGetGuildsGuildIdBans<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['bans']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['bans']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.guilds>['bans']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdBansKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['bans']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.guilds(params).bans.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetGuildsGuildIdBans<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['bans']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['bans']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.guilds>['bans']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdBansKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['bans']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.guilds(params).bans.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetGuildsGuildIdBansUserIdKey(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['bans']>[0],
) {
  return ['guilds', '/guilds/{guild_id}/bans/{user_id}', params, params2] as const
}

export function useGetGuildsGuildIdBansUserId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['bans']>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['bans']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['bans']>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['bans']>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdBansUserIdKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['bans']>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.guilds(params).bans(params2).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetGuildsGuildIdBansUserId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['bans']>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['bans']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['bans']>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['bans']>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdBansUserIdKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['bans']>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.guilds(params).bans(params2).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPutGuildsGuildIdBansUserIdKey() {
  return ['guilds', '/guilds/{guild_id}/bans/{user_id}', 'PUT'] as const
}

export function usePutGuildsGuildIdBansUserId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['bans']>['put']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['bans']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['bans']>['put']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<ReturnType<typeof client.guilds>['bans']>['put']>[0]
        options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['bans']>['put']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutGuildsGuildIdBansUserIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['bans']>['put']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<ReturnType<typeof client.guilds>['bans']>['put']>[0]
        options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['bans']>['put']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<ReturnType<typeof client.guilds>['bans']>['put']>[0]
            options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['bans']>['put']>[1]
          }
        },
      ) => {
        const { data, error } = await client.guilds(params).bans(params2).put(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getDeleteGuildsGuildIdBansUserIdKey() {
  return ['guilds', '/guilds/{guild_id}/bans/{user_id}', 'DELETE'] as const
}

export function useDeleteGuildsGuildIdBansUserId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['bans']>['delete']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['bans']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['bans']>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<ReturnType<typeof client.guilds>['bans']>['delete']>[0]
        options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['bans']>['delete']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteGuildsGuildIdBansUserIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['bans']>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<ReturnType<typeof client.guilds>['bans']>['delete']>[0]
        options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['bans']>['delete']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<ReturnType<typeof client.guilds>['bans']>['delete']>[0]
            options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['bans']>['delete']>[1]
          }
        },
      ) => {
        const { data, error } = await client
          .guilds(params)
          .bans(params2)
          .delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostGuildsGuildIdBulkBanKey() {
  return ['guilds', '/guilds/{guild_id}/bulk-ban', 'POST'] as const
}

export function usePostGuildsGuildIdBulkBan<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['bulk-ban']['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['bulk-ban']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.guilds>['bulk-ban']['post']>[0]
        options?: Parameters<ReturnType<typeof client.guilds>['bulk-ban']['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostGuildsGuildIdBulkBanKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['bulk-ban']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.guilds>['bulk-ban']['post']>[0]
        options?: Parameters<ReturnType<typeof client.guilds>['bulk-ban']['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.guilds>['bulk-ban']['post']>[0]
            options?: Parameters<ReturnType<typeof client.guilds>['bulk-ban']['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client.guilds(params)['bulk-ban'].post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetGuildsGuildIdChannelsKey(params: Parameters<typeof client.guilds>[0]) {
  return ['guilds', '/guilds/{guild_id}/channels', params] as const
}

export function useGetGuildsGuildIdChannels<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['channels']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['channels']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.guilds>['channels']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdChannelsKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['channels']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.guilds(params).channels.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetGuildsGuildIdChannels<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['channels']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['channels']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.guilds>['channels']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdChannelsKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['channels']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.guilds(params).channels.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostGuildsGuildIdChannelsKey() {
  return ['guilds', '/guilds/{guild_id}/channels', 'POST'] as const
}

export function usePostGuildsGuildIdChannels<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['channels']['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['channels']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.guilds>['channels']['post']>[0]
        options?: Parameters<ReturnType<typeof client.guilds>['channels']['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostGuildsGuildIdChannelsKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['channels']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.guilds>['channels']['post']>[0]
        options?: Parameters<ReturnType<typeof client.guilds>['channels']['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.guilds>['channels']['post']>[0]
            options?: Parameters<ReturnType<typeof client.guilds>['channels']['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client.guilds(params).channels.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPatchGuildsGuildIdChannelsKey() {
  return ['guilds', '/guilds/{guild_id}/channels', 'PATCH'] as const
}

export function usePatchGuildsGuildIdChannels<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['channels']['patch']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['channels']['patch']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.guilds>['channels']['patch']>[0]
        options?: Parameters<ReturnType<typeof client.guilds>['channels']['patch']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPatchGuildsGuildIdChannelsKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['channels']['patch']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.guilds>['channels']['patch']>[0]
        options?: Parameters<ReturnType<typeof client.guilds>['channels']['patch']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.guilds>['channels']['patch']>[0]
            options?: Parameters<ReturnType<typeof client.guilds>['channels']['patch']>[1]
          }
        },
      ) => {
        const { data, error } = await client.guilds(params).channels.patch(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetGuildsGuildIdEmojisKey(params: Parameters<typeof client.guilds>[0]) {
  return ['guilds', '/guilds/{guild_id}/emojis', params] as const
}

export function useGetGuildsGuildIdEmojis<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['emojis']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['emojis']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.guilds>['emojis']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdEmojisKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['emojis']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.guilds(params).emojis.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetGuildsGuildIdEmojis<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['emojis']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['emojis']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.guilds>['emojis']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdEmojisKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['emojis']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.guilds(params).emojis.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostGuildsGuildIdEmojisKey() {
  return ['guilds', '/guilds/{guild_id}/emojis', 'POST'] as const
}

export function usePostGuildsGuildIdEmojis<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['emojis']['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['emojis']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.guilds>['emojis']['post']>[0]
        options?: Parameters<ReturnType<typeof client.guilds>['emojis']['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostGuildsGuildIdEmojisKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['emojis']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.guilds>['emojis']['post']>[0]
        options?: Parameters<ReturnType<typeof client.guilds>['emojis']['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.guilds>['emojis']['post']>[0]
            options?: Parameters<ReturnType<typeof client.guilds>['emojis']['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client.guilds(params).emojis.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetGuildsGuildIdEmojisEmojiIdKey(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['emojis']>[0],
) {
  return ['guilds', '/guilds/{guild_id}/emojis/{emoji_id}', params, params2] as const
}

export function useGetGuildsGuildIdEmojisEmojiId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['emojis']>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['emojis']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['emojis']>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['emojis']>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdEmojisEmojiIdKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['emojis']>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.guilds(params).emojis(params2).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetGuildsGuildIdEmojisEmojiId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['emojis']>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['emojis']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['emojis']>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['emojis']>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdEmojisEmojiIdKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['emojis']>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.guilds(params).emojis(params2).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getDeleteGuildsGuildIdEmojisEmojiIdKey() {
  return ['guilds', '/guilds/{guild_id}/emojis/{emoji_id}', 'DELETE'] as const
}

export function useDeleteGuildsGuildIdEmojisEmojiId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['emojis']>['delete']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['emojis']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['emojis']>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<ReturnType<typeof client.guilds>['emojis']>['delete']>[0]
        options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['emojis']>['delete']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteGuildsGuildIdEmojisEmojiIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['emojis']>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<ReturnType<typeof client.guilds>['emojis']>['delete']>[0]
        options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['emojis']>['delete']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<ReturnType<ReturnType<typeof client.guilds>['emojis']>['delete']>[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.guilds>['emojis']>['delete']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .guilds(params)
          .emojis(params2)
          .delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPatchGuildsGuildIdEmojisEmojiIdKey() {
  return ['guilds', '/guilds/{guild_id}/emojis/{emoji_id}', 'PATCH'] as const
}

export function usePatchGuildsGuildIdEmojisEmojiId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['emojis']>['patch']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['emojis']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['emojis']>['patch']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<ReturnType<typeof client.guilds>['emojis']>['patch']>[0]
        options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['emojis']>['patch']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPatchGuildsGuildIdEmojisEmojiIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['emojis']>['patch']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<ReturnType<typeof client.guilds>['emojis']>['patch']>[0]
        options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['emojis']>['patch']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<ReturnType<typeof client.guilds>['emojis']>['patch']>[0]
            options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['emojis']>['patch']>[1]
          }
        },
      ) => {
        const { data, error } = await client
          .guilds(params)
          .emojis(params2)
          .patch(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPutGuildsGuildIdIncidentActionsKey() {
  return ['guilds', '/guilds/{guild_id}/incident-actions', 'PUT'] as const
}

export function usePutGuildsGuildIdIncidentActions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['incident-actions']['put']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['incident-actions']['put']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.guilds>['incident-actions']['put']>[0]
        options?: Parameters<ReturnType<typeof client.guilds>['incident-actions']['put']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutGuildsGuildIdIncidentActionsKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['incident-actions']['put']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.guilds>['incident-actions']['put']>[0]
        options?: Parameters<ReturnType<typeof client.guilds>['incident-actions']['put']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.guilds>['incident-actions']['put']>[0]
            options?: Parameters<ReturnType<typeof client.guilds>['incident-actions']['put']>[1]
          }
        },
      ) => {
        const { data, error } = await client
          .guilds(params)
          ['incident-actions'].put(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetGuildsGuildIdIntegrationsKey(params: Parameters<typeof client.guilds>[0]) {
  return ['guilds', '/guilds/{guild_id}/integrations', params] as const
}

export function useGetGuildsGuildIdIntegrations<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['integrations']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['integrations']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.guilds>['integrations']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdIntegrationsKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['integrations']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.guilds(params).integrations.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetGuildsGuildIdIntegrations<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['integrations']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['integrations']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.guilds>['integrations']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdIntegrationsKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['integrations']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.guilds(params).integrations.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getDeleteGuildsGuildIdIntegrationsIntegrationIdKey() {
  return ['guilds', '/guilds/{guild_id}/integrations/{integration_id}', 'DELETE'] as const
}

export function useDeleteGuildsGuildIdIntegrationsIntegrationId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['integrations']>['delete']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['integrations']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['integrations']>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<ReturnType<typeof client.guilds>['integrations']>['delete']>[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.guilds>['integrations']>['delete']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteGuildsGuildIdIntegrationsIntegrationIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['integrations']>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<ReturnType<typeof client.guilds>['integrations']>['delete']>[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.guilds>['integrations']>['delete']
        >[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<
              ReturnType<ReturnType<typeof client.guilds>['integrations']>['delete']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.guilds>['integrations']>['delete']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .guilds(params)
          .integrations(params2)
          .delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetGuildsGuildIdInvitesKey(params: Parameters<typeof client.guilds>[0]) {
  return ['guilds', '/guilds/{guild_id}/invites', params] as const
}

export function useGetGuildsGuildIdInvites<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['invites']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['invites']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.guilds>['invites']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdInvitesKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['invites']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.guilds(params).invites.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetGuildsGuildIdInvites<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['invites']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['invites']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.guilds>['invites']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdInvitesKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['invites']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.guilds(params).invites.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetGuildsGuildIdMembersKey(
  params: Parameters<typeof client.guilds>[0],
  options?: Parameters<ReturnType<typeof client.guilds>['members']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['guilds', '/guilds/{guild_id}/members', params, keyArgs] as const
}

export function useGetGuildsGuildIdMembers<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['members']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['members']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.guilds>['members']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdMembersKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['members']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.guilds(params).members.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetGuildsGuildIdMembers<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['members']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['members']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.guilds>['members']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdMembersKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['members']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.guilds(params).members.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPatchGuildsGuildIdMembersMeKey() {
  return ['guilds', '/guilds/{guild_id}/members/@me', 'PATCH'] as const
}

export function usePatchGuildsGuildIdMembersMe<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['members']['@me']['patch']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['members']['@me']['patch']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.guilds>['members']['@me']['patch']>[0]
        options?: Parameters<ReturnType<typeof client.guilds>['members']['@me']['patch']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPatchGuildsGuildIdMembersMeKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['members']['@me']['patch']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.guilds>['members']['@me']['patch']>[0]
        options?: Parameters<ReturnType<typeof client.guilds>['members']['@me']['patch']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.guilds>['members']['@me']['patch']>[0]
            options?: Parameters<ReturnType<typeof client.guilds>['members']['@me']['patch']>[1]
          }
        },
      ) => {
        const { data, error } = await client
          .guilds(params)
          .members['@me'].patch(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetGuildsGuildIdMembersSearchKey(
  params: Parameters<typeof client.guilds>[0],
  options: Parameters<ReturnType<typeof client.guilds>['members']['search']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['guilds', '/guilds/{guild_id}/members/search', params, keyArgs] as const
}

export function useGetGuildsGuildIdMembersSearch<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['members']['search']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['members']['search']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options: Parameters<ReturnType<typeof client.guilds>['members']['search']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdMembersSearchKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['members']['search']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.guilds(params).members.search.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetGuildsGuildIdMembersSearch<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['members']['search']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['members']['search']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options: Parameters<ReturnType<typeof client.guilds>['members']['search']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdMembersSearchKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['members']['search']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.guilds(params).members.search.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetGuildsGuildIdMembersUserIdKey(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['members']>[0],
) {
  return ['guilds', '/guilds/{guild_id}/members/{user_id}', params, params2] as const
}

export function useGetGuildsGuildIdMembersUserId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['members']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['members']>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdMembersUserIdKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.guilds(params).members(params2).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetGuildsGuildIdMembersUserId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['members']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['members']>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdMembersUserIdKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.guilds(params).members(params2).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPutGuildsGuildIdMembersUserIdKey() {
  return ['guilds', '/guilds/{guild_id}/members/{user_id}', 'PUT'] as const
}

export function usePutGuildsGuildIdMembersUserId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['put']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['members']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['put']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<ReturnType<typeof client.guilds>['members']>['put']>[0]
        options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['members']>['put']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutGuildsGuildIdMembersUserIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['put']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<ReturnType<typeof client.guilds>['members']>['put']>[0]
        options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['members']>['put']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<ReturnType<typeof client.guilds>['members']>['put']>[0]
            options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['members']>['put']>[1]
          }
        },
      ) => {
        const { data, error } = await client
          .guilds(params)
          .members(params2)
          .put(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getDeleteGuildsGuildIdMembersUserIdKey() {
  return ['guilds', '/guilds/{guild_id}/members/{user_id}', 'DELETE'] as const
}

export function useDeleteGuildsGuildIdMembersUserId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['delete']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['members']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<ReturnType<typeof client.guilds>['members']>['delete']>[0]
        options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['members']>['delete']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteGuildsGuildIdMembersUserIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<ReturnType<typeof client.guilds>['members']>['delete']>[0]
        options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['members']>['delete']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<ReturnType<ReturnType<typeof client.guilds>['members']>['delete']>[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.guilds>['members']>['delete']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .guilds(params)
          .members(params2)
          .delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPatchGuildsGuildIdMembersUserIdKey() {
  return ['guilds', '/guilds/{guild_id}/members/{user_id}', 'PATCH'] as const
}

export function usePatchGuildsGuildIdMembersUserId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['patch']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['members']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['patch']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<ReturnType<typeof client.guilds>['members']>['patch']>[0]
        options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['members']>['patch']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPatchGuildsGuildIdMembersUserIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['patch']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<ReturnType<typeof client.guilds>['members']>['patch']>[0]
        options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['members']>['patch']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<ReturnType<typeof client.guilds>['members']>['patch']>[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.guilds>['members']>['patch']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .guilds(params)
          .members(params2)
          .patch(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPutGuildsGuildIdMembersUserIdRolesRoleIdKey() {
  return ['guilds', '/guilds/{guild_id}/members/{user_id}/roles/{role_id}', 'PUT'] as const
}

export function usePutGuildsGuildIdMembersUserIdRolesRoleId<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['roles']>['put']
      >
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['members']>[0],
  params3: Parameters<ReturnType<ReturnType<typeof client.guilds>['members']>['roles']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['roles']>['put']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['roles']>['put']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['roles']>['put']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutGuildsGuildIdMembersUserIdRolesRoleIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['roles']>['put']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['roles']>['put']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['roles']>['put']
        >[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<
              ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['roles']>['put']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['roles']>['put']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .guilds(params)
          .members(params2)
          .roles(params3)
          .put(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getDeleteGuildsGuildIdMembersUserIdRolesRoleIdKey() {
  return ['guilds', '/guilds/{guild_id}/members/{user_id}/roles/{role_id}', 'DELETE'] as const
}

export function useDeleteGuildsGuildIdMembersUserIdRolesRoleId<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['roles']>['delete']
      >
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['members']>[0],
  params3: Parameters<ReturnType<ReturnType<typeof client.guilds>['members']>['roles']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['roles']>['delete']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['roles']>['delete']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['roles']>['delete']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteGuildsGuildIdMembersUserIdRolesRoleIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['roles']>['delete']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['roles']>['delete']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['roles']>['delete']
        >[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<
              ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['roles']>['delete']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['roles']>['delete']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .guilds(params)
          .members(params2)
          .roles(params3)
          .delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetGuildsGuildIdMessagesSearchKey(
  params: Parameters<typeof client.guilds>[0],
  options?: Parameters<ReturnType<typeof client.guilds>['messages']['search']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['guilds', '/guilds/{guild_id}/messages/search', params, keyArgs] as const
}

export function useGetGuildsGuildIdMessagesSearch<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['messages']['search']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['messages']['search']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.guilds>['messages']['search']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdMessagesSearchKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['messages']['search']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.guilds(params).messages.search.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetGuildsGuildIdMessagesSearch<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['messages']['search']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['messages']['search']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.guilds>['messages']['search']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdMessagesSearchKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['messages']['search']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.guilds(params).messages.search.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetGuildsGuildIdNewMemberWelcomeKey(
  params: Parameters<typeof client.guilds>[0],
) {
  return ['guilds', '/guilds/{guild_id}/new-member-welcome', params] as const
}

export function useGetGuildsGuildIdNewMemberWelcome<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['new-member-welcome']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['new-member-welcome']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.guilds>['new-member-welcome']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdNewMemberWelcomeKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['new-member-welcome']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.guilds(params)['new-member-welcome'].get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetGuildsGuildIdNewMemberWelcome<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['new-member-welcome']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['new-member-welcome']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.guilds>['new-member-welcome']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdNewMemberWelcomeKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['new-member-welcome']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.guilds(params)['new-member-welcome'].get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetGuildsGuildIdOnboardingKey(params: Parameters<typeof client.guilds>[0]) {
  return ['guilds', '/guilds/{guild_id}/onboarding', params] as const
}

export function useGetGuildsGuildIdOnboarding<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['onboarding']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['onboarding']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.guilds>['onboarding']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdOnboardingKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['onboarding']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.guilds(params).onboarding.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetGuildsGuildIdOnboarding<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['onboarding']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['onboarding']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.guilds>['onboarding']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdOnboardingKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['onboarding']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.guilds(params).onboarding.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPutGuildsGuildIdOnboardingKey() {
  return ['guilds', '/guilds/{guild_id}/onboarding', 'PUT'] as const
}

export function usePutGuildsGuildIdOnboarding<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['onboarding']['put']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['onboarding']['put']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.guilds>['onboarding']['put']>[0]
        options?: Parameters<ReturnType<typeof client.guilds>['onboarding']['put']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutGuildsGuildIdOnboardingKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['onboarding']['put']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.guilds>['onboarding']['put']>[0]
        options?: Parameters<ReturnType<typeof client.guilds>['onboarding']['put']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.guilds>['onboarding']['put']>[0]
            options?: Parameters<ReturnType<typeof client.guilds>['onboarding']['put']>[1]
          }
        },
      ) => {
        const { data, error } = await client.guilds(params).onboarding.put(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetGuildsGuildIdPermissionsMemberUserIdKey(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['permissions']['member']>[0],
) {
  return ['guilds', '/guilds/{guild_id}/permissions/member/{user_id}', params, params2] as const
}

export function useGetGuildsGuildIdPermissionsMemberUserId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['permissions']['member']>['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['permissions']['member']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.guilds>['permissions']['member']>['get']>
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<typeof client.guilds>['permissions']['member']>['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdPermissionsMemberUserIdKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.guilds>['permissions']['member']>['get']>
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client
          .guilds(params)
          .permissions.member(params2)
          .get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetGuildsGuildIdPermissionsMemberUserId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['permissions']['member']>['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['permissions']['member']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.guilds>['permissions']['member']>['get']>
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<typeof client.guilds>['permissions']['member']>['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdPermissionsMemberUserIdKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.guilds>['permissions']['member']>['get']>
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client
          .guilds(params)
          .permissions.member(params2)
          .get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetGuildsGuildIdPermissionsRoleRoleIdKey(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['permissions']['role']>[0],
) {
  return ['guilds', '/guilds/{guild_id}/permissions/role/{role_id}', params, params2] as const
}

export function useGetGuildsGuildIdPermissionsRoleRoleId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['permissions']['role']>['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['permissions']['role']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.guilds>['permissions']['role']>['get']>
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<typeof client.guilds>['permissions']['role']>['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdPermissionsRoleRoleIdKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.guilds>['permissions']['role']>['get']>
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client
          .guilds(params)
          .permissions.role(params2)
          .get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetGuildsGuildIdPermissionsRoleRoleId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['permissions']['role']>['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['permissions']['role']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.guilds>['permissions']['role']>['get']>
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<typeof client.guilds>['permissions']['role']>['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdPermissionsRoleRoleIdKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.guilds>['permissions']['role']>['get']>
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client
          .guilds(params)
          .permissions.role(params2)
          .get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetGuildsGuildIdPreviewKey(params: Parameters<typeof client.guilds>[0]) {
  return ['guilds', '/guilds/{guild_id}/preview', params] as const
}

export function useGetGuildsGuildIdPreview<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['preview']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['preview']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.guilds>['preview']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdPreviewKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['preview']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.guilds(params).preview.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetGuildsGuildIdPreview<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['preview']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['preview']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.guilds>['preview']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdPreviewKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['preview']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.guilds(params).preview.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetGuildsGuildIdPruneKey(
  params: Parameters<typeof client.guilds>[0],
  options?: Parameters<ReturnType<typeof client.guilds>['prune']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['guilds', '/guilds/{guild_id}/prune', params, keyArgs] as const
}

export function useGetGuildsGuildIdPrune<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['prune']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['prune']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.guilds>['prune']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdPruneKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['prune']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.guilds(params).prune.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetGuildsGuildIdPrune<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['prune']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['prune']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.guilds>['prune']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdPruneKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['prune']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.guilds(params).prune.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostGuildsGuildIdPruneKey() {
  return ['guilds', '/guilds/{guild_id}/prune', 'POST'] as const
}

export function usePostGuildsGuildIdPrune<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['prune']['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['prune']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.guilds>['prune']['post']>[0]
        options?: Parameters<ReturnType<typeof client.guilds>['prune']['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostGuildsGuildIdPruneKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['prune']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.guilds>['prune']['post']>[0]
        options?: Parameters<ReturnType<typeof client.guilds>['prune']['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.guilds>['prune']['post']>[0]
            options?: Parameters<ReturnType<typeof client.guilds>['prune']['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client.guilds(params).prune.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetGuildsGuildIdRegionsKey(params: Parameters<typeof client.guilds>[0]) {
  return ['guilds', '/guilds/{guild_id}/regions', params] as const
}

export function useGetGuildsGuildIdRegions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['regions']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['regions']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.guilds>['regions']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdRegionsKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['regions']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.guilds(params).regions.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetGuildsGuildIdRegions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['regions']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['regions']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.guilds>['regions']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdRegionsKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['regions']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.guilds(params).regions.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetGuildsGuildIdRequestsKey(
  params: Parameters<typeof client.guilds>[0],
  options?: Parameters<ReturnType<typeof client.guilds>['requests']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['guilds', '/guilds/{guild_id}/requests', params, keyArgs] as const
}

export function useGetGuildsGuildIdRequests<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['requests']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['requests']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.guilds>['requests']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdRequestsKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['requests']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.guilds(params).requests.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetGuildsGuildIdRequests<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['requests']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['requests']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.guilds>['requests']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdRequestsKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['requests']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.guilds(params).requests.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPatchGuildsGuildIdRequestsRequestIdKey() {
  return ['guilds', '/guilds/{guild_id}/requests/{request_id}', 'PATCH'] as const
}

export function usePatchGuildsGuildIdRequestsRequestId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['requests']>['patch']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['requests']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['requests']>['patch']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<ReturnType<typeof client.guilds>['requests']>['patch']>[0]
        options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['requests']>['patch']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPatchGuildsGuildIdRequestsRequestIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['requests']>['patch']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<ReturnType<typeof client.guilds>['requests']>['patch']>[0]
        options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['requests']>['patch']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<ReturnType<typeof client.guilds>['requests']>['patch']>[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.guilds>['requests']>['patch']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .guilds(params)
          .requests(params2)
          .patch(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetGuildsGuildIdRolesKey(params: Parameters<typeof client.guilds>[0]) {
  return ['guilds', '/guilds/{guild_id}/roles', params] as const
}

export function useGetGuildsGuildIdRoles<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['roles']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['roles']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.guilds>['roles']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdRolesKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['roles']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.guilds(params).roles.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetGuildsGuildIdRoles<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['roles']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['roles']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.guilds>['roles']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdRolesKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['roles']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.guilds(params).roles.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostGuildsGuildIdRolesKey() {
  return ['guilds', '/guilds/{guild_id}/roles', 'POST'] as const
}

export function usePostGuildsGuildIdRoles<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['roles']['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['roles']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.guilds>['roles']['post']>[0]
        options?: Parameters<ReturnType<typeof client.guilds>['roles']['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostGuildsGuildIdRolesKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['roles']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.guilds>['roles']['post']>[0]
        options?: Parameters<ReturnType<typeof client.guilds>['roles']['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.guilds>['roles']['post']>[0]
            options?: Parameters<ReturnType<typeof client.guilds>['roles']['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client.guilds(params).roles.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPatchGuildsGuildIdRolesKey() {
  return ['guilds', '/guilds/{guild_id}/roles', 'PATCH'] as const
}

export function usePatchGuildsGuildIdRoles<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['roles']['patch']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['roles']['patch']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.guilds>['roles']['patch']>[0]
        options?: Parameters<ReturnType<typeof client.guilds>['roles']['patch']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPatchGuildsGuildIdRolesKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['roles']['patch']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.guilds>['roles']['patch']>[0]
        options?: Parameters<ReturnType<typeof client.guilds>['roles']['patch']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.guilds>['roles']['patch']>[0]
            options?: Parameters<ReturnType<typeof client.guilds>['roles']['patch']>[1]
          }
        },
      ) => {
        const { data, error } = await client.guilds(params).roles.patch(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetGuildsGuildIdRolesMemberCountsKey(
  params: Parameters<typeof client.guilds>[0],
) {
  return ['guilds', '/guilds/{guild_id}/roles/member-counts', params] as const
}

export function useGetGuildsGuildIdRolesMemberCounts<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['roles']['member-counts']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['roles']['member-counts']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.guilds>['roles']['member-counts']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdRolesMemberCountsKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['roles']['member-counts']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client
          .guilds(params)
          .roles['member-counts'].get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetGuildsGuildIdRolesMemberCounts<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['roles']['member-counts']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['roles']['member-counts']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.guilds>['roles']['member-counts']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdRolesMemberCountsKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['roles']['member-counts']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client
          .guilds(params)
          .roles['member-counts'].get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetGuildsGuildIdRolesRoleIdKey(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['roles']>[0],
) {
  return ['guilds', '/guilds/{guild_id}/roles/{role_id}', params, params2] as const
}

export function useGetGuildsGuildIdRolesRoleId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['roles']>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['roles']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['roles']>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['roles']>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdRolesRoleIdKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['roles']>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.guilds(params).roles(params2).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetGuildsGuildIdRolesRoleId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['roles']>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['roles']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['roles']>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['roles']>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdRolesRoleIdKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['roles']>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.guilds(params).roles(params2).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getDeleteGuildsGuildIdRolesRoleIdKey() {
  return ['guilds', '/guilds/{guild_id}/roles/{role_id}', 'DELETE'] as const
}

export function useDeleteGuildsGuildIdRolesRoleId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['roles']>['delete']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['roles']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['roles']>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<ReturnType<typeof client.guilds>['roles']>['delete']>[0]
        options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['roles']>['delete']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteGuildsGuildIdRolesRoleIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['roles']>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<ReturnType<typeof client.guilds>['roles']>['delete']>[0]
        options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['roles']>['delete']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<ReturnType<ReturnType<typeof client.guilds>['roles']>['delete']>[0]
            options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['roles']>['delete']>[1]
          }
        },
      ) => {
        const { data, error } = await client
          .guilds(params)
          .roles(params2)
          .delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPatchGuildsGuildIdRolesRoleIdKey() {
  return ['guilds', '/guilds/{guild_id}/roles/{role_id}', 'PATCH'] as const
}

export function usePatchGuildsGuildIdRolesRoleId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['roles']>['patch']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['roles']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['roles']>['patch']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<ReturnType<typeof client.guilds>['roles']>['patch']>[0]
        options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['roles']>['patch']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPatchGuildsGuildIdRolesRoleIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['roles']>['patch']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<ReturnType<typeof client.guilds>['roles']>['patch']>[0]
        options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['roles']>['patch']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<ReturnType<typeof client.guilds>['roles']>['patch']>[0]
            options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['roles']>['patch']>[1]
          }
        },
      ) => {
        const { data, error } = await client
          .guilds(params)
          .roles(params2)
          .patch(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetGuildsGuildIdScheduledEventsKey(
  params: Parameters<typeof client.guilds>[0],
  options?: Parameters<ReturnType<typeof client.guilds>['scheduled-events']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['guilds', '/guilds/{guild_id}/scheduled-events', params, keyArgs] as const
}

export function useGetGuildsGuildIdScheduledEvents<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.guilds>['scheduled-events']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdScheduledEventsKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.guilds(params)['scheduled-events'].get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetGuildsGuildIdScheduledEvents<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.guilds>['scheduled-events']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdScheduledEventsKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.guilds(params)['scheduled-events'].get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostGuildsGuildIdScheduledEventsKey() {
  return ['guilds', '/guilds/{guild_id}/scheduled-events', 'POST'] as const
}

export function usePostGuildsGuildIdScheduledEvents<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.guilds>['scheduled-events']['post']>[0]
        options?: Parameters<ReturnType<typeof client.guilds>['scheduled-events']['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostGuildsGuildIdScheduledEventsKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.guilds>['scheduled-events']['post']>[0]
        options?: Parameters<ReturnType<typeof client.guilds>['scheduled-events']['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.guilds>['scheduled-events']['post']>[0]
            options?: Parameters<ReturnType<typeof client.guilds>['scheduled-events']['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client
          .guilds(params)
          ['scheduled-events'].post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetGuildsGuildIdScheduledEventsGuildScheduledEventIdKey(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['scheduled-events']>[0],
  options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'guilds',
    '/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}',
    params,
    params2,
    keyArgs,
  ] as const
}

export function useGetGuildsGuildIdScheduledEventsGuildScheduledEventId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['scheduled-events']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['get']>
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdScheduledEventsGuildScheduledEventIdKey(params, params2, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['get']>
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client
          .guilds(params)
          ['scheduled-events'](params2)
          .get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetGuildsGuildIdScheduledEventsGuildScheduledEventId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['scheduled-events']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['get']>
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdScheduledEventsGuildScheduledEventIdKey(params, params2, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['get']>
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client
          .guilds(params)
          ['scheduled-events'](params2)
          .get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getDeleteGuildsGuildIdScheduledEventsGuildScheduledEventIdKey() {
  return [
    'guilds',
    '/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}',
    'DELETE',
  ] as const
}

export function useDeleteGuildsGuildIdScheduledEventsGuildScheduledEventId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['delete']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['scheduled-events']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['delete']>
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['delete']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['delete']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteGuildsGuildIdScheduledEventsGuildScheduledEventIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['delete']>
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['delete']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['delete']
        >[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<
              ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['delete']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['delete']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .guilds(params)
          ['scheduled-events'](params2)
          .delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPatchGuildsGuildIdScheduledEventsGuildScheduledEventIdKey() {
  return [
    'guilds',
    '/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}',
    'PATCH',
  ] as const
}

export function usePatchGuildsGuildIdScheduledEventsGuildScheduledEventId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['patch']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['scheduled-events']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['patch']>
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<
          ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['patch']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['patch']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPatchGuildsGuildIdScheduledEventsGuildScheduledEventIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['patch']>
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<
          ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['patch']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['patch']
        >[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<
              ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['patch']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['patch']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .guilds(params)
          ['scheduled-events'](params2)
          .patch(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostGuildsGuildIdScheduledEventsGuildScheduledEventIdExceptionsKey() {
  return [
    'guilds',
    '/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}/exceptions',
    'POST',
  ] as const
}

export function usePostGuildsGuildIdScheduledEventsGuildScheduledEventIdExceptions<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['exceptions']['post']
      >
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['scheduled-events']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['exceptions']['post']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<
          ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['exceptions']['post']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['exceptions']['post']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey =
    customKey ?? getPostGuildsGuildIdScheduledEventsGuildScheduledEventIdExceptionsKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['exceptions']['post']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<
          ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['exceptions']['post']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['exceptions']['post']
        >[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<
              ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['exceptions']['post']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['exceptions']['post']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .guilds(params)
          ['scheduled-events'](params2)
          .exceptions.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getDeleteGuildsGuildIdScheduledEventsGuildScheduledEventIdExceptionsExceptionIdKey() {
  return [
    'guilds',
    '/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}/exceptions/{exception_id}',
    'DELETE',
  ] as const
}

export function useDeleteGuildsGuildIdScheduledEventsGuildScheduledEventIdExceptionsExceptionId<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<
          ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['exceptions']
        >['delete']
      >
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['scheduled-events']>[0],
  params3: Parameters<
    ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['exceptions']
  >[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<
              ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['exceptions']
            >['delete']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<
            ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['exceptions']
          >['delete']
        >[0]
        options?: Parameters<
          ReturnType<
            ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['exceptions']
          >['delete']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey =
    customKey ??
    getDeleteGuildsGuildIdScheduledEventsGuildScheduledEventIdExceptionsExceptionIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<
              ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['exceptions']
            >['delete']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<
            ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['exceptions']
          >['delete']
        >[0]
        options?: Parameters<
          ReturnType<
            ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['exceptions']
          >['delete']
        >[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<
              ReturnType<
                ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['exceptions']
              >['delete']
            >[0]
            options?: Parameters<
              ReturnType<
                ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['exceptions']
              >['delete']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .guilds(params)
          ['scheduled-events'](params2)
          .exceptions(params3)
          .delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPatchGuildsGuildIdScheduledEventsGuildScheduledEventIdExceptionsExceptionIdKey() {
  return [
    'guilds',
    '/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}/exceptions/{exception_id}',
    'PATCH',
  ] as const
}

export function usePatchGuildsGuildIdScheduledEventsGuildScheduledEventIdExceptionsExceptionId<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<
          ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['exceptions']
        >['patch']
      >
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['scheduled-events']>[0],
  params3: Parameters<
    ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['exceptions']
  >[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<
              ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['exceptions']
            >['patch']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<
          ReturnType<
            ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['exceptions']
          >['patch']
        >[0]
        options?: Parameters<
          ReturnType<
            ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['exceptions']
          >['patch']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey =
    customKey ?? getPatchGuildsGuildIdScheduledEventsGuildScheduledEventIdExceptionsExceptionIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<
              ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['exceptions']
            >['patch']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<
          ReturnType<
            ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['exceptions']
          >['patch']
        >[0]
        options?: Parameters<
          ReturnType<
            ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['exceptions']
          >['patch']
        >[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<
              ReturnType<
                ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['exceptions']
              >['patch']
            >[0]
            options?: Parameters<
              ReturnType<
                ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['exceptions']
              >['patch']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .guilds(params)
          ['scheduled-events'](params2)
          .exceptions(params3)
          .patch(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetGuildsGuildIdScheduledEventsGuildScheduledEventIdUsersKey(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['scheduled-events']>[0],
  options?: Parameters<
    ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['users']['get']
  >[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'guilds',
    '/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}/users',
    params,
    params2,
    keyArgs,
  ] as const
}

export function useGetGuildsGuildIdScheduledEventsGuildScheduledEventIdUsers<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['users']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['scheduled-events']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['users']['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['users']['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdScheduledEventsGuildScheduledEventIdUsersKey(
            params,
            params2,
            clientOptions,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['users']['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client
          .guilds(params)
          ['scheduled-events'](params2)
          .users.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetGuildsGuildIdScheduledEventsGuildScheduledEventIdUsers<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['users']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['scheduled-events']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['users']['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['users']['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdScheduledEventsGuildScheduledEventIdUsersKey(
            params,
            params2,
            clientOptions,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['users']['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client
          .guilds(params)
          ['scheduled-events'](params2)
          .users.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetGuildsGuildIdScheduledEventsGuildScheduledEventIdUsersCountsKey(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['scheduled-events']>[0],
  options?: Parameters<
    ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['users']['counts']['get']
  >[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'guilds',
    '/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}/users/counts',
    params,
    params2,
    keyArgs,
  ] as const
}

export function useGetGuildsGuildIdScheduledEventsGuildScheduledEventIdUsersCounts<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['users']['counts']['get']
      >
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['scheduled-events']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<
              ReturnType<typeof client.guilds>['scheduled-events']
            >['users']['counts']['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['users']['counts']['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdScheduledEventsGuildScheduledEventIdUsersCountsKey(
            params,
            params2,
            clientOptions,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<
              ReturnType<typeof client.guilds>['scheduled-events']
            >['users']['counts']['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client
          .guilds(params)
          ['scheduled-events'](params2)
          .users.counts.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetGuildsGuildIdScheduledEventsGuildScheduledEventIdUsersCounts<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['users']['counts']['get']
      >
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['scheduled-events']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<
              ReturnType<typeof client.guilds>['scheduled-events']
            >['users']['counts']['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['users']['counts']['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdScheduledEventsGuildScheduledEventIdUsersCountsKey(
            params,
            params2,
            clientOptions,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<
              ReturnType<typeof client.guilds>['scheduled-events']
            >['users']['counts']['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client
          .guilds(params)
          ['scheduled-events'](params2)
          .users.counts.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetGuildsGuildIdScheduledEventsGuildScheduledEventIdGuildScheduledEventExceptionIdUsersKey(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['scheduled-events']>[0],
  params3: Parameters<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>>[0],
  options?: Parameters<
    ReturnType<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>>['users']['get']
  >[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'guilds',
    '/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}/{guild_scheduled_event_exception_id}/users',
    params,
    params2,
    params3,
    keyArgs,
  ] as const
}

export function useGetGuildsGuildIdScheduledEventsGuildScheduledEventIdGuildScheduledEventExceptionIdUsers<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>>['users']['get']
      >
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['scheduled-events']>[0],
  params3: Parameters<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<
              ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>
            >['users']['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>>['users']['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdScheduledEventsGuildScheduledEventIdGuildScheduledEventExceptionIdUsersKey(
            params,
            params2,
            params3,
            clientOptions,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<
              ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>
            >['users']['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client
          .guilds(params)
          ['scheduled-events'](params2)(params3)
          .users.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetGuildsGuildIdScheduledEventsGuildScheduledEventIdGuildScheduledEventExceptionIdUsers<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>>['users']['get']
      >
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['scheduled-events']>[0],
  params3: Parameters<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<
              ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>
            >['users']['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>>['users']['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdScheduledEventsGuildScheduledEventIdGuildScheduledEventExceptionIdUsersKey(
            params,
            params2,
            params3,
            clientOptions,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<
              ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>
            >['users']['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client
          .guilds(params)
          ['scheduled-events'](params2)(params3)
          .users.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetGuildsGuildIdSoundboardSoundsKey(
  params: Parameters<typeof client.guilds>[0],
) {
  return ['guilds', '/guilds/{guild_id}/soundboard-sounds', params] as const
}

export function useGetGuildsGuildIdSoundboardSounds<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.guilds>['soundboard-sounds']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdSoundboardSoundsKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.guilds(params)['soundboard-sounds'].get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetGuildsGuildIdSoundboardSounds<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.guilds>['soundboard-sounds']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdSoundboardSoundsKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.guilds(params)['soundboard-sounds'].get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostGuildsGuildIdSoundboardSoundsKey() {
  return ['guilds', '/guilds/{guild_id}/soundboard-sounds', 'POST'] as const
}

export function usePostGuildsGuildIdSoundboardSounds<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.guilds>['soundboard-sounds']['post']>[0]
        options?: Parameters<ReturnType<typeof client.guilds>['soundboard-sounds']['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostGuildsGuildIdSoundboardSoundsKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.guilds>['soundboard-sounds']['post']>[0]
        options?: Parameters<ReturnType<typeof client.guilds>['soundboard-sounds']['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.guilds>['soundboard-sounds']['post']>[0]
            options?: Parameters<ReturnType<typeof client.guilds>['soundboard-sounds']['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client
          .guilds(params)
          ['soundboard-sounds'].post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetGuildsGuildIdSoundboardSoundsSoundIdKey(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['soundboard-sounds']>[0],
) {
  return ['guilds', '/guilds/{guild_id}/soundboard-sounds/{sound_id}', params, params2] as const
}

export function useGetGuildsGuildIdSoundboardSoundsSoundId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']>['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['soundboard-sounds']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']>['get']>
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']>['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdSoundboardSoundsSoundIdKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']>['get']>
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client
          .guilds(params)
          ['soundboard-sounds'](params2)
          .get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetGuildsGuildIdSoundboardSoundsSoundId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']>['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['soundboard-sounds']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']>['get']>
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']>['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdSoundboardSoundsSoundIdKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']>['get']>
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client
          .guilds(params)
          ['soundboard-sounds'](params2)
          .get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getDeleteGuildsGuildIdSoundboardSoundsSoundIdKey() {
  return ['guilds', '/guilds/{guild_id}/soundboard-sounds/{sound_id}', 'DELETE'] as const
}

export function useDeleteGuildsGuildIdSoundboardSoundsSoundId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']>['delete']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['soundboard-sounds']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']>['delete']>
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']>['delete']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']>['delete']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteGuildsGuildIdSoundboardSoundsSoundIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']>['delete']>
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']>['delete']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']>['delete']
        >[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<
              ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']>['delete']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']>['delete']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .guilds(params)
          ['soundboard-sounds'](params2)
          .delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPatchGuildsGuildIdSoundboardSoundsSoundIdKey() {
  return ['guilds', '/guilds/{guild_id}/soundboard-sounds/{sound_id}', 'PATCH'] as const
}

export function usePatchGuildsGuildIdSoundboardSoundsSoundId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']>['patch']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['soundboard-sounds']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']>['patch']>
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<
          ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']>['patch']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']>['patch']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPatchGuildsGuildIdSoundboardSoundsSoundIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']>['patch']>
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<
          ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']>['patch']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']>['patch']
        >[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<
              ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']>['patch']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']>['patch']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .guilds(params)
          ['soundboard-sounds'](params2)
          .patch(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetGuildsGuildIdStickersKey(params: Parameters<typeof client.guilds>[0]) {
  return ['guilds', '/guilds/{guild_id}/stickers', params] as const
}

export function useGetGuildsGuildIdStickers<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['stickers']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['stickers']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.guilds>['stickers']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdStickersKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['stickers']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.guilds(params).stickers.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetGuildsGuildIdStickers<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['stickers']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['stickers']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.guilds>['stickers']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdStickersKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['stickers']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.guilds(params).stickers.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostGuildsGuildIdStickersKey() {
  return ['guilds', '/guilds/{guild_id}/stickers', 'POST'] as const
}

export function usePostGuildsGuildIdStickers<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['stickers']['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['stickers']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.guilds>['stickers']['post']>[0]
        options?: Parameters<ReturnType<typeof client.guilds>['stickers']['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostGuildsGuildIdStickersKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['stickers']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.guilds>['stickers']['post']>[0]
        options?: Parameters<ReturnType<typeof client.guilds>['stickers']['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.guilds>['stickers']['post']>[0]
            options?: Parameters<ReturnType<typeof client.guilds>['stickers']['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client.guilds(params).stickers.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetGuildsGuildIdStickersStickerIdKey(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['stickers']>[0],
) {
  return ['guilds', '/guilds/{guild_id}/stickers/{sticker_id}', params, params2] as const
}

export function useGetGuildsGuildIdStickersStickerId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['stickers']>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['stickers']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['stickers']>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['stickers']>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdStickersStickerIdKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['stickers']>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.guilds(params).stickers(params2).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetGuildsGuildIdStickersStickerId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['stickers']>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['stickers']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['stickers']>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['stickers']>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdStickersStickerIdKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['stickers']>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.guilds(params).stickers(params2).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getDeleteGuildsGuildIdStickersStickerIdKey() {
  return ['guilds', '/guilds/{guild_id}/stickers/{sticker_id}', 'DELETE'] as const
}

export function useDeleteGuildsGuildIdStickersStickerId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['stickers']>['delete']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['stickers']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['stickers']>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<ReturnType<typeof client.guilds>['stickers']>['delete']>[0]
        options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['stickers']>['delete']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteGuildsGuildIdStickersStickerIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['stickers']>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<ReturnType<typeof client.guilds>['stickers']>['delete']>[0]
        options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['stickers']>['delete']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<ReturnType<ReturnType<typeof client.guilds>['stickers']>['delete']>[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.guilds>['stickers']>['delete']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .guilds(params)
          .stickers(params2)
          .delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPatchGuildsGuildIdStickersStickerIdKey() {
  return ['guilds', '/guilds/{guild_id}/stickers/{sticker_id}', 'PATCH'] as const
}

export function usePatchGuildsGuildIdStickersStickerId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['stickers']>['patch']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['stickers']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['stickers']>['patch']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<ReturnType<typeof client.guilds>['stickers']>['patch']>[0]
        options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['stickers']>['patch']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPatchGuildsGuildIdStickersStickerIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['stickers']>['patch']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<ReturnType<typeof client.guilds>['stickers']>['patch']>[0]
        options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['stickers']>['patch']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<ReturnType<typeof client.guilds>['stickers']>['patch']>[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.guilds>['stickers']>['patch']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .guilds(params)
          .stickers(params2)
          .patch(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetGuildsGuildIdTemplatesKey(params: Parameters<typeof client.guilds>[0]) {
  return ['guilds', '/guilds/{guild_id}/templates', params] as const
}

export function useGetGuildsGuildIdTemplates<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['templates']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['templates']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.guilds>['templates']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdTemplatesKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['templates']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.guilds(params).templates.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetGuildsGuildIdTemplates<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['templates']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['templates']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.guilds>['templates']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdTemplatesKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['templates']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.guilds(params).templates.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostGuildsGuildIdTemplatesKey() {
  return ['guilds', '/guilds/{guild_id}/templates', 'POST'] as const
}

export function usePostGuildsGuildIdTemplates<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['templates']['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['templates']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.guilds>['templates']['post']>[0]
        options?: Parameters<ReturnType<typeof client.guilds>['templates']['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostGuildsGuildIdTemplatesKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['templates']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.guilds>['templates']['post']>[0]
        options?: Parameters<ReturnType<typeof client.guilds>['templates']['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.guilds>['templates']['post']>[0]
            options?: Parameters<ReturnType<typeof client.guilds>['templates']['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client.guilds(params).templates.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPutGuildsGuildIdTemplatesCodeKey() {
  return ['guilds', '/guilds/{guild_id}/templates/{code}', 'PUT'] as const
}

export function usePutGuildsGuildIdTemplatesCode<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['templates']>['put']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['templates']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['templates']>['put']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<ReturnType<typeof client.guilds>['templates']>['put']>[0]
        options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['templates']>['put']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutGuildsGuildIdTemplatesCodeKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['templates']>['put']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<ReturnType<typeof client.guilds>['templates']>['put']>[0]
        options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['templates']>['put']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<ReturnType<ReturnType<typeof client.guilds>['templates']>['put']>[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.guilds>['templates']>['put']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .guilds(params)
          .templates(params2)
          .put(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getDeleteGuildsGuildIdTemplatesCodeKey() {
  return ['guilds', '/guilds/{guild_id}/templates/{code}', 'DELETE'] as const
}

export function useDeleteGuildsGuildIdTemplatesCode<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['templates']>['delete']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['templates']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['templates']>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<ReturnType<typeof client.guilds>['templates']>['delete']>[0]
        options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['templates']>['delete']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteGuildsGuildIdTemplatesCodeKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['templates']>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<ReturnType<typeof client.guilds>['templates']>['delete']>[0]
        options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['templates']>['delete']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<
              ReturnType<ReturnType<typeof client.guilds>['templates']>['delete']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.guilds>['templates']>['delete']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .guilds(params)
          .templates(params2)
          .delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPatchGuildsGuildIdTemplatesCodeKey() {
  return ['guilds', '/guilds/{guild_id}/templates/{code}', 'PATCH'] as const
}

export function usePatchGuildsGuildIdTemplatesCode<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['templates']>['patch']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['templates']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['templates']>['patch']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<ReturnType<typeof client.guilds>['templates']>['patch']>[0]
        options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['templates']>['patch']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPatchGuildsGuildIdTemplatesCodeKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['templates']>['patch']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<ReturnType<typeof client.guilds>['templates']>['patch']>[0]
        options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['templates']>['patch']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<ReturnType<typeof client.guilds>['templates']>['patch']>[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.guilds>['templates']>['patch']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .guilds(params)
          .templates(params2)
          .patch(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetGuildsGuildIdThreadsActiveKey(params: Parameters<typeof client.guilds>[0]) {
  return ['guilds', '/guilds/{guild_id}/threads/active', params] as const
}

export function useGetGuildsGuildIdThreadsActive<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['threads']['active']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['threads']['active']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.guilds>['threads']['active']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdThreadsActiveKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['threads']['active']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.guilds(params).threads.active.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetGuildsGuildIdThreadsActive<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['threads']['active']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['threads']['active']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.guilds>['threads']['active']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdThreadsActiveKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['threads']['active']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.guilds(params).threads.active.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetGuildsGuildIdVanityUrlKey(params: Parameters<typeof client.guilds>[0]) {
  return ['guilds', '/guilds/{guild_id}/vanity-url', params] as const
}

export function useGetGuildsGuildIdVanityUrl<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['vanity-url']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['vanity-url']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.guilds>['vanity-url']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdVanityUrlKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['vanity-url']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.guilds(params)['vanity-url'].get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetGuildsGuildIdVanityUrl<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['vanity-url']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['vanity-url']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.guilds>['vanity-url']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdVanityUrlKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['vanity-url']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.guilds(params)['vanity-url'].get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetGuildsGuildIdVoiceStatesMeKey(params: Parameters<typeof client.guilds>[0]) {
  return ['guilds', '/guilds/{guild_id}/voice-states/@me', params] as const
}

export function useGetGuildsGuildIdVoiceStatesMe<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['voice-states']['@me']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['voice-states']['@me']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.guilds>['voice-states']['@me']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdVoiceStatesMeKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['voice-states']['@me']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client
          .guilds(params)
          ['voice-states']['@me'].get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetGuildsGuildIdVoiceStatesMe<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['voice-states']['@me']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['voice-states']['@me']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.guilds>['voice-states']['@me']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdVoiceStatesMeKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['voice-states']['@me']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client
          .guilds(params)
          ['voice-states']['@me'].get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPatchGuildsGuildIdVoiceStatesMeKey() {
  return ['guilds', '/guilds/{guild_id}/voice-states/@me', 'PATCH'] as const
}

export function usePatchGuildsGuildIdVoiceStatesMe<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['voice-states']['@me']['patch']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['voice-states']['@me']['patch']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.guilds>['voice-states']['@me']['patch']>[0]
        options?: Parameters<ReturnType<typeof client.guilds>['voice-states']['@me']['patch']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPatchGuildsGuildIdVoiceStatesMeKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['voice-states']['@me']['patch']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.guilds>['voice-states']['@me']['patch']>[0]
        options?: Parameters<ReturnType<typeof client.guilds>['voice-states']['@me']['patch']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.guilds>['voice-states']['@me']['patch']>[0]
            options?: Parameters<
              ReturnType<typeof client.guilds>['voice-states']['@me']['patch']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .guilds(params)
          ['voice-states']['@me'].patch(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetGuildsGuildIdVoiceStatesUserIdKey(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['voice-states']>[0],
) {
  return ['guilds', '/guilds/{guild_id}/voice-states/{user_id}', params, params2] as const
}

export function useGetGuildsGuildIdVoiceStatesUserId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['voice-states']>['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['voice-states']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['voice-states']>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['voice-states']>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdVoiceStatesUserIdKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['voice-states']>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client
          .guilds(params)
          ['voice-states'](params2)
          .get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetGuildsGuildIdVoiceStatesUserId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['voice-states']>['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['voice-states']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['voice-states']>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['voice-states']>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdVoiceStatesUserIdKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['voice-states']>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client
          .guilds(params)
          ['voice-states'](params2)
          .get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPatchGuildsGuildIdVoiceStatesUserIdKey() {
  return ['guilds', '/guilds/{guild_id}/voice-states/{user_id}', 'PATCH'] as const
}

export function usePatchGuildsGuildIdVoiceStatesUserId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['voice-states']>['patch']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  params2: Parameters<ReturnType<typeof client.guilds>['voice-states']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['voice-states']>['patch']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<ReturnType<typeof client.guilds>['voice-states']>['patch']>[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.guilds>['voice-states']>['patch']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPatchGuildsGuildIdVoiceStatesUserIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['voice-states']>['patch']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<ReturnType<typeof client.guilds>['voice-states']>['patch']>[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.guilds>['voice-states']>['patch']
        >[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<
              ReturnType<ReturnType<typeof client.guilds>['voice-states']>['patch']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.guilds>['voice-states']>['patch']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .guilds(params)
          ['voice-states'](params2)
          .patch(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetGuildsGuildIdWebhooksKey(params: Parameters<typeof client.guilds>[0]) {
  return ['guilds', '/guilds/{guild_id}/webhooks', params] as const
}

export function useGetGuildsGuildIdWebhooks<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['webhooks']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['webhooks']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.guilds>['webhooks']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdWebhooksKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['webhooks']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.guilds(params).webhooks.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetGuildsGuildIdWebhooks<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['webhooks']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['webhooks']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.guilds>['webhooks']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdWebhooksKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['webhooks']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.guilds(params).webhooks.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetGuildsGuildIdWelcomeScreenKey(params: Parameters<typeof client.guilds>[0]) {
  return ['guilds', '/guilds/{guild_id}/welcome-screen', params] as const
}

export function useGetGuildsGuildIdWelcomeScreen<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['welcome-screen']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['welcome-screen']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.guilds>['welcome-screen']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdWelcomeScreenKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['welcome-screen']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.guilds(params)['welcome-screen'].get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetGuildsGuildIdWelcomeScreen<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['welcome-screen']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['welcome-screen']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.guilds>['welcome-screen']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdWelcomeScreenKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['welcome-screen']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.guilds(params)['welcome-screen'].get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPatchGuildsGuildIdWelcomeScreenKey() {
  return ['guilds', '/guilds/{guild_id}/welcome-screen', 'PATCH'] as const
}

export function usePatchGuildsGuildIdWelcomeScreen<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['welcome-screen']['patch']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['welcome-screen']['patch']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.guilds>['welcome-screen']['patch']>[0]
        options?: Parameters<ReturnType<typeof client.guilds>['welcome-screen']['patch']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPatchGuildsGuildIdWelcomeScreenKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['welcome-screen']['patch']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.guilds>['welcome-screen']['patch']>[0]
        options?: Parameters<ReturnType<typeof client.guilds>['welcome-screen']['patch']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.guilds>['welcome-screen']['patch']>[0]
            options?: Parameters<ReturnType<typeof client.guilds>['welcome-screen']['patch']>[1]
          }
        },
      ) => {
        const { data, error } = await client
          .guilds(params)
          ['welcome-screen'].patch(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetGuildsGuildIdWidgetKey(params: Parameters<typeof client.guilds>[0]) {
  return ['guilds', '/guilds/{guild_id}/widget', params] as const
}

export function useGetGuildsGuildIdWidget<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['widget']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['widget']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.guilds>['widget']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdWidgetKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['widget']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.guilds(params).widget.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetGuildsGuildIdWidget<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['widget']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['widget']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.guilds>['widget']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdWidgetKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['widget']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.guilds(params).widget.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPatchGuildsGuildIdWidgetKey() {
  return ['guilds', '/guilds/{guild_id}/widget', 'PATCH'] as const
}

export function usePatchGuildsGuildIdWidget<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['widget']['patch']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.guilds>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['widget']['patch']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.guilds>['widget']['patch']>[0]
        options?: Parameters<ReturnType<typeof client.guilds>['widget']['patch']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPatchGuildsGuildIdWidgetKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.guilds>['widget']['patch']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.guilds>['widget']['patch']>[0]
        options?: Parameters<ReturnType<typeof client.guilds>['widget']['patch']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.guilds>['widget']['patch']>[0]
            options?: Parameters<ReturnType<typeof client.guilds>['widget']['patch']>[1]
          }
        },
      ) => {
        const { data, error } = await client.guilds(params).widget.patch(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetGuildsGuildIdWidgetJsonKey(guild_id: string) {
  return ['guilds', '/guilds/{guild_id}/widget.json', guild_id] as const
}

export function useGetGuildsGuildIdWidgetJson<TError = unknown>(
  guild_id: string,
  options?: {
    swr?: SWRConfiguration<WidgetResponse, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdWidgetJsonKey(guild_id)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<WidgetResponse, TError>(
      swrKey,
      async () => {
        const res = await fetch(`/guilds/${encodeURIComponent(guild_id)}/widget.json`, {
          headers: clientOptions?.headers,
        })
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetGuildsGuildIdWidgetJson<TError = unknown>(
  guild_id: string,
  options?: {
    swr?: SWRConfiguration<WidgetResponse, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdWidgetJsonKey(guild_id)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<WidgetResponse, TError>(
      swrKey,
      async () => {
        const res = await fetch(`/guilds/${encodeURIComponent(guild_id)}/widget.json`, {
          headers: clientOptions?.headers,
        })
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getGetGuildsGuildIdWidgetPngKey(
  guild_id: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return ['guilds', '/guilds/{guild_id}/widget.png', guild_id, keyArgs] as const
}

export function useGetGuildsGuildIdWidgetPng<TError = unknown>(
  guild_id: string,
  options?: {
    swr?: SWRConfiguration<void, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdWidgetPngKey(guild_id, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<void, TError>(
      swrKey,
      async () => {
        const search = new URLSearchParams()
        for (const [k, v] of Object.entries(clientOptions?.query ?? {})) {
          if (v === undefined) continue
          if (Array.isArray(v)) {
            for (const x of v) {
              search.append(k, String(x))
            }
          } else {
            search.set(k, String(v))
          }
        }
        const res = await fetch(
          `/guilds/${encodeURIComponent(guild_id)}/widget.png${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetGuildsGuildIdWidgetPng<TError = unknown>(
  guild_id: string,
  options?: {
    swr?: SWRConfiguration<void, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetGuildsGuildIdWidgetPngKey(guild_id, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<void, TError>(
      swrKey,
      async () => {
        const search = new URLSearchParams()
        for (const [k, v] of Object.entries(clientOptions?.query ?? {})) {
          if (v === undefined) continue
          if (Array.isArray(v)) {
            for (const x of v) {
              search.append(k, String(x))
            }
          } else {
            search.set(k, String(v))
          }
        }
        const res = await fetch(
          `/guilds/${encodeURIComponent(guild_id)}/widget.png${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getPostInteractionsInteractionIdInteractionTokenCallbackKey() {
  return [
    'interactions',
    '/interactions/{interaction_id}/{interaction_token}/callback',
    'POST',
  ] as const
}

export function usePostInteractionsInteractionIdInteractionTokenCallback<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.interactions>>['callback']['post']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.interactions>[0],
  params2: Parameters<ReturnType<typeof client.interactions>>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.interactions>>['callback']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<ReturnType<typeof client.interactions>>['callback']['post']>[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.interactions>>['callback']['post']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostInteractionsInteractionIdInteractionTokenCallbackKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.interactions>>['callback']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<ReturnType<typeof client.interactions>>['callback']['post']>[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.interactions>>['callback']['post']
        >[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<
              ReturnType<ReturnType<typeof client.interactions>>['callback']['post']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.interactions>>['callback']['post']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .interactions(params)(params2)
          .callback.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetInvitesCodeKey(
  params: Parameters<typeof client.invites>[0],
  options?: Parameters<ReturnType<typeof client.invites>['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['invites', '/invites/{code}', params, keyArgs] as const
}

export function useGetInvitesCode<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.invites>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.invites>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.invites>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.invites>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetInvitesCodeKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.invites>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.invites(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetInvitesCode<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.invites>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.invites>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.invites>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.invites>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetInvitesCodeKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.invites>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.invites(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getDeleteInvitesCodeKey() {
  return ['invites', '/invites/{code}', 'DELETE'] as const
}

export function useDeleteInvitesCode<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.invites>['delete']>>['error'], null>,
>(
  params: Parameters<typeof client.invites>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.invites>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.invites>['delete']>[0]
        options?: Parameters<ReturnType<typeof client.invites>['delete']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteInvitesCodeKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.invites>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.invites>['delete']>[0]
        options?: Parameters<ReturnType<typeof client.invites>['delete']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<ReturnType<typeof client.invites>['delete']>[0]
            options?: Parameters<ReturnType<typeof client.invites>['delete']>[1]
          }
        },
      ) => {
        const { data, error } = await client.invites(params).delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetInvitesCodeTargetUsersKey(params: Parameters<typeof client.invites>[0]) {
  return ['invites', '/invites/{code}/target-users', params] as const
}

export function useGetInvitesCodeTargetUsers<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.invites>['target-users']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.invites>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.invites>['target-users']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.invites>['target-users']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetInvitesCodeTargetUsersKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.invites>['target-users']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.invites(params)['target-users'].get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetInvitesCodeTargetUsers<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.invites>['target-users']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.invites>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.invites>['target-users']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.invites>['target-users']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetInvitesCodeTargetUsersKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.invites>['target-users']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.invites(params)['target-users'].get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPutInvitesCodeTargetUsersKey() {
  return ['invites', '/invites/{code}/target-users', 'PUT'] as const
}

export function usePutInvitesCodeTargetUsers<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.invites>['target-users']['put']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.invites>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.invites>['target-users']['put']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.invites>['target-users']['put']>[0]
        options?: Parameters<ReturnType<typeof client.invites>['target-users']['put']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutInvitesCodeTargetUsersKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.invites>['target-users']['put']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.invites>['target-users']['put']>[0]
        options?: Parameters<ReturnType<typeof client.invites>['target-users']['put']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.invites>['target-users']['put']>[0]
            options?: Parameters<ReturnType<typeof client.invites>['target-users']['put']>[1]
          }
        },
      ) => {
        const { data, error } = await client
          .invites(params)
          ['target-users'].put(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostInvitesCodeTargetUsersBulkAddKey() {
  return ['invites', '/invites/{code}/target-users/bulk-add', 'POST'] as const
}

export function usePostInvitesCodeTargetUsersBulkAdd<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.invites>['target-users']['bulk-add']['post']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.invites>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.invites>['target-users']['bulk-add']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.invites>['target-users']['bulk-add']['post']>[0]
        options?: Parameters<
          ReturnType<typeof client.invites>['target-users']['bulk-add']['post']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostInvitesCodeTargetUsersBulkAddKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.invites>['target-users']['bulk-add']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.invites>['target-users']['bulk-add']['post']>[0]
        options?: Parameters<
          ReturnType<typeof client.invites>['target-users']['bulk-add']['post']
        >[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<
              ReturnType<typeof client.invites>['target-users']['bulk-add']['post']
            >[0]
            options?: Parameters<
              ReturnType<typeof client.invites>['target-users']['bulk-add']['post']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .invites(params)
          ['target-users']['bulk-add'].post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostInvitesCodeTargetUsersBulkDeleteKey() {
  return ['invites', '/invites/{code}/target-users/bulk-delete', 'POST'] as const
}

export function usePostInvitesCodeTargetUsersBulkDelete<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.invites>['target-users']['bulk-delete']['post']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.invites>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<typeof client.invites>['target-users']['bulk-delete']['post']>
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<
          ReturnType<typeof client.invites>['target-users']['bulk-delete']['post']
        >[0]
        options?: Parameters<
          ReturnType<typeof client.invites>['target-users']['bulk-delete']['post']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostInvitesCodeTargetUsersBulkDeleteKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<ReturnType<typeof client.invites>['target-users']['bulk-delete']['post']>
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<
          ReturnType<typeof client.invites>['target-users']['bulk-delete']['post']
        >[0]
        options?: Parameters<
          ReturnType<typeof client.invites>['target-users']['bulk-delete']['post']
        >[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<
              ReturnType<typeof client.invites>['target-users']['bulk-delete']['post']
            >[0]
            options?: Parameters<
              ReturnType<typeof client.invites>['target-users']['bulk-delete']['post']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .invites(params)
          ['target-users']['bulk-delete'].post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetInvitesCodeTargetUsersJobStatusKey(
  params: Parameters<typeof client.invites>[0],
) {
  return ['invites', '/invites/{code}/target-users/job-status', params] as const
}

export function useGetInvitesCodeTargetUsersJobStatus<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.invites>['target-users']['job-status']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.invites>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.invites>['target-users']['job-status']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.invites>['target-users']['job-status']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetInvitesCodeTargetUsersJobStatusKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.invites>['target-users']['job-status']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client
          .invites(params)
          ['target-users']['job-status'].get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetInvitesCodeTargetUsersJobStatus<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.invites>['target-users']['job-status']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.invites>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.invites>['target-users']['job-status']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.invites>['target-users']['job-status']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetInvitesCodeTargetUsersJobStatusKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.invites>['target-users']['job-status']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client
          .invites(params)
          ['target-users']['job-status'].get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPutInvitesCodeTargetUsersUserIdKey() {
  return ['invites', '/invites/{code}/target-users/{user_id}', 'PUT'] as const
}

export function usePutInvitesCodeTargetUsersUserId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.invites>['target-users']>['put']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.invites>[0],
  params2: Parameters<ReturnType<typeof client.invites>['target-users']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.invites>['target-users']>['put']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<ReturnType<typeof client.invites>['target-users']>['put']>[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.invites>['target-users']>['put']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutInvitesCodeTargetUsersUserIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.invites>['target-users']>['put']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<ReturnType<typeof client.invites>['target-users']>['put']>[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.invites>['target-users']>['put']
        >[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<
              ReturnType<ReturnType<typeof client.invites>['target-users']>['put']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.invites>['target-users']>['put']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .invites(params)
          ['target-users'](params2)
          .put(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getDeleteInvitesCodeTargetUsersUserIdKey() {
  return ['invites', '/invites/{code}/target-users/{user_id}', 'DELETE'] as const
}

export function useDeleteInvitesCodeTargetUsersUserId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.invites>['target-users']>['delete']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.invites>[0],
  params2: Parameters<ReturnType<typeof client.invites>['target-users']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.invites>['target-users']>['delete']>
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<ReturnType<typeof client.invites>['target-users']>['delete']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.invites>['target-users']>['delete']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteInvitesCodeTargetUsersUserIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.invites>['target-users']>['delete']>
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<ReturnType<typeof client.invites>['target-users']>['delete']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.invites>['target-users']>['delete']
        >[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<
              ReturnType<ReturnType<typeof client.invites>['target-users']>['delete']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.invites>['target-users']>['delete']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .invites(params)
          ['target-users'](params2)
          .delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPutLobbiesKey() {
  return ['lobbies', '/lobbies', 'PUT'] as const
}

export function usePutLobbies<
  TError = Exclude<Awaited<ReturnType<typeof client.lobbies.put>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.lobbies.put>>, { error: null }>['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.lobbies.put>[0]
      options?: Parameters<typeof client.lobbies.put>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutLobbiesKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<Awaited<ReturnType<typeof client.lobbies.put>>, { error: null }>['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.lobbies.put>[0]
        options?: Parameters<typeof client.lobbies.put>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.lobbies.put>[0]
            options?: Parameters<typeof client.lobbies.put>[1]
          }
        },
      ) => {
        const { data, error } = await client.lobbies.put(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostLobbiesKey() {
  return ['lobbies', '/lobbies', 'POST'] as const
}

export function usePostLobbies<
  TError = Exclude<Awaited<ReturnType<typeof client.lobbies.post>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.lobbies.post>>, { error: null }>['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.lobbies.post>[0]
      options?: Parameters<typeof client.lobbies.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostLobbiesKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<Awaited<ReturnType<typeof client.lobbies.post>>, { error: null }>['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.lobbies.post>[0]
        options?: Parameters<typeof client.lobbies.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.lobbies.post>[0]
            options?: Parameters<typeof client.lobbies.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.lobbies.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetLobbiesLobbyIdKey(params: Parameters<typeof client.lobbies>[0]) {
  return ['lobbies', '/lobbies/{lobby_id}', params] as const
}

export function useGetLobbiesLobbyId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.lobbies>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.lobbies>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.lobbies>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.lobbies>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetLobbiesLobbyIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.lobbies>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.lobbies(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetLobbiesLobbyId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.lobbies>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.lobbies>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.lobbies>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.lobbies>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetLobbiesLobbyIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.lobbies>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.lobbies(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getDeleteLobbiesLobbyIdKey() {
  return ['lobbies', '/lobbies/{lobby_id}', 'DELETE'] as const
}

export function useDeleteLobbiesLobbyId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.lobbies>['delete']>>['error'], null>,
>(
  params: Parameters<typeof client.lobbies>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.lobbies>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.lobbies>['delete']>[0]
        options?: Parameters<ReturnType<typeof client.lobbies>['delete']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteLobbiesLobbyIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.lobbies>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.lobbies>['delete']>[0]
        options?: Parameters<ReturnType<typeof client.lobbies>['delete']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<ReturnType<typeof client.lobbies>['delete']>[0]
            options?: Parameters<ReturnType<typeof client.lobbies>['delete']>[1]
          }
        },
      ) => {
        const { data, error } = await client.lobbies(params).delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPatchLobbiesLobbyIdKey() {
  return ['lobbies', '/lobbies/{lobby_id}', 'PATCH'] as const
}

export function usePatchLobbiesLobbyId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.lobbies>['patch']>>['error'], null>,
>(
  params: Parameters<typeof client.lobbies>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.lobbies>['patch']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.lobbies>['patch']>[0]
        options?: Parameters<ReturnType<typeof client.lobbies>['patch']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPatchLobbiesLobbyIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.lobbies>['patch']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.lobbies>['patch']>[0]
        options?: Parameters<ReturnType<typeof client.lobbies>['patch']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.lobbies>['patch']>[0]
            options?: Parameters<ReturnType<typeof client.lobbies>['patch']>[1]
          }
        },
      ) => {
        const { data, error } = await client.lobbies(params).patch(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPatchLobbiesLobbyIdChannelLinkingKey() {
  return ['lobbies', '/lobbies/{lobby_id}/channel-linking', 'PATCH'] as const
}

export function usePatchLobbiesLobbyIdChannelLinking<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.lobbies>['channel-linking']['patch']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.lobbies>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.lobbies>['channel-linking']['patch']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.lobbies>['channel-linking']['patch']>[0]
        options?: Parameters<ReturnType<typeof client.lobbies>['channel-linking']['patch']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPatchLobbiesLobbyIdChannelLinkingKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.lobbies>['channel-linking']['patch']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.lobbies>['channel-linking']['patch']>[0]
        options?: Parameters<ReturnType<typeof client.lobbies>['channel-linking']['patch']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.lobbies>['channel-linking']['patch']>[0]
            options?: Parameters<ReturnType<typeof client.lobbies>['channel-linking']['patch']>[1]
          }
        },
      ) => {
        const { data, error } = await client
          .lobbies(params)
          ['channel-linking'].patch(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getDeleteLobbiesLobbyIdMembersMeKey() {
  return ['lobbies', '/lobbies/{lobby_id}/members/@me', 'DELETE'] as const
}

export function useDeleteLobbiesLobbyIdMembersMe<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.lobbies>['members']['@me']['delete']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.lobbies>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.lobbies>['members']['@me']['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.lobbies>['members']['@me']['delete']>[0]
        options?: Parameters<ReturnType<typeof client.lobbies>['members']['@me']['delete']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteLobbiesLobbyIdMembersMeKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.lobbies>['members']['@me']['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.lobbies>['members']['@me']['delete']>[0]
        options?: Parameters<ReturnType<typeof client.lobbies>['members']['@me']['delete']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<ReturnType<typeof client.lobbies>['members']['@me']['delete']>[0]
            options?: Parameters<ReturnType<typeof client.lobbies>['members']['@me']['delete']>[1]
          }
        },
      ) => {
        const { data, error } = await client
          .lobbies(params)
          .members['@me'].delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostLobbiesLobbyIdMembersMeInvitesKey() {
  return ['lobbies', '/lobbies/{lobby_id}/members/@me/invites', 'POST'] as const
}

export function usePostLobbiesLobbyIdMembersMeInvites<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.lobbies>['members']['@me']['invites']['post']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.lobbies>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.lobbies>['members']['@me']['invites']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.lobbies>['members']['@me']['invites']['post']>[0]
        options?: Parameters<
          ReturnType<typeof client.lobbies>['members']['@me']['invites']['post']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostLobbiesLobbyIdMembersMeInvitesKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.lobbies>['members']['@me']['invites']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.lobbies>['members']['@me']['invites']['post']>[0]
        options?: Parameters<
          ReturnType<typeof client.lobbies>['members']['@me']['invites']['post']
        >[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<
              ReturnType<typeof client.lobbies>['members']['@me']['invites']['post']
            >[0]
            options?: Parameters<
              ReturnType<typeof client.lobbies>['members']['@me']['invites']['post']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .lobbies(params)
          .members['@me'].invites.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostLobbiesLobbyIdMembersBulkKey() {
  return ['lobbies', '/lobbies/{lobby_id}/members/bulk', 'POST'] as const
}

export function usePostLobbiesLobbyIdMembersBulk<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.lobbies>['members']['bulk']['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.lobbies>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.lobbies>['members']['bulk']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.lobbies>['members']['bulk']['post']>[0]
        options?: Parameters<ReturnType<typeof client.lobbies>['members']['bulk']['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostLobbiesLobbyIdMembersBulkKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.lobbies>['members']['bulk']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.lobbies>['members']['bulk']['post']>[0]
        options?: Parameters<ReturnType<typeof client.lobbies>['members']['bulk']['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.lobbies>['members']['bulk']['post']>[0]
            options?: Parameters<ReturnType<typeof client.lobbies>['members']['bulk']['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client
          .lobbies(params)
          .members.bulk.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPutLobbiesLobbyIdMembersUserIdKey() {
  return ['lobbies', '/lobbies/{lobby_id}/members/{user_id}', 'PUT'] as const
}

export function usePutLobbiesLobbyIdMembersUserId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.lobbies>['members']>['put']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.lobbies>[0],
  params2: Parameters<ReturnType<typeof client.lobbies>['members']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.lobbies>['members']>['put']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<ReturnType<typeof client.lobbies>['members']>['put']>[0]
        options?: Parameters<ReturnType<ReturnType<typeof client.lobbies>['members']>['put']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutLobbiesLobbyIdMembersUserIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.lobbies>['members']>['put']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<ReturnType<typeof client.lobbies>['members']>['put']>[0]
        options?: Parameters<ReturnType<ReturnType<typeof client.lobbies>['members']>['put']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<ReturnType<typeof client.lobbies>['members']>['put']>[0]
            options?: Parameters<ReturnType<ReturnType<typeof client.lobbies>['members']>['put']>[1]
          }
        },
      ) => {
        const { data, error } = await client
          .lobbies(params)
          .members(params2)
          .put(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getDeleteLobbiesLobbyIdMembersUserIdKey() {
  return ['lobbies', '/lobbies/{lobby_id}/members/{user_id}', 'DELETE'] as const
}

export function useDeleteLobbiesLobbyIdMembersUserId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.lobbies>['members']>['delete']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.lobbies>[0],
  params2: Parameters<ReturnType<typeof client.lobbies>['members']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.lobbies>['members']>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<ReturnType<typeof client.lobbies>['members']>['delete']>[0]
        options?: Parameters<ReturnType<ReturnType<typeof client.lobbies>['members']>['delete']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteLobbiesLobbyIdMembersUserIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.lobbies>['members']>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<ReturnType<typeof client.lobbies>['members']>['delete']>[0]
        options?: Parameters<ReturnType<ReturnType<typeof client.lobbies>['members']>['delete']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<ReturnType<ReturnType<typeof client.lobbies>['members']>['delete']>[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.lobbies>['members']>['delete']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .lobbies(params)
          .members(params2)
          .delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostLobbiesLobbyIdMembersUserIdInvitesKey() {
  return ['lobbies', '/lobbies/{lobby_id}/members/{user_id}/invites', 'POST'] as const
}

export function usePostLobbiesLobbyIdMembersUserIdInvites<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.lobbies>['members']>['invites']['post']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.lobbies>[0],
  params2: Parameters<ReturnType<typeof client.lobbies>['members']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.lobbies>['members']>['invites']['post']>
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<ReturnType<typeof client.lobbies>['members']>['invites']['post']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.lobbies>['members']>['invites']['post']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostLobbiesLobbyIdMembersUserIdInvitesKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.lobbies>['members']>['invites']['post']>
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<ReturnType<typeof client.lobbies>['members']>['invites']['post']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.lobbies>['members']>['invites']['post']
        >[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<
              ReturnType<ReturnType<typeof client.lobbies>['members']>['invites']['post']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.lobbies>['members']>['invites']['post']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .lobbies(params)
          .members(params2)
          .invites.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetLobbiesLobbyIdMessagesKey(
  params: Parameters<typeof client.lobbies>[0],
  options?: Parameters<ReturnType<typeof client.lobbies>['messages']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['lobbies', '/lobbies/{lobby_id}/messages', params, keyArgs] as const
}

export function useGetLobbiesLobbyIdMessages<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.lobbies>['messages']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.lobbies>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.lobbies>['messages']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.lobbies>['messages']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetLobbiesLobbyIdMessagesKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.lobbies>['messages']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.lobbies(params).messages.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetLobbiesLobbyIdMessages<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.lobbies>['messages']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.lobbies>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.lobbies>['messages']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.lobbies>['messages']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetLobbiesLobbyIdMessagesKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.lobbies>['messages']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.lobbies(params).messages.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostLobbiesLobbyIdMessagesKey() {
  return ['lobbies', '/lobbies/{lobby_id}/messages', 'POST'] as const
}

export function usePostLobbiesLobbyIdMessages<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.lobbies>['messages']['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.lobbies>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.lobbies>['messages']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.lobbies>['messages']['post']>[0]
        options?: Parameters<ReturnType<typeof client.lobbies>['messages']['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostLobbiesLobbyIdMessagesKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.lobbies>['messages']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.lobbies>['messages']['post']>[0]
        options?: Parameters<ReturnType<typeof client.lobbies>['messages']['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.lobbies>['messages']['post']>[0]
            options?: Parameters<ReturnType<typeof client.lobbies>['messages']['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client.lobbies(params).messages.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPutLobbiesLobbyIdMessagesMessageIdModerationMetadataKey() {
  return [
    'lobbies',
    '/lobbies/{lobby_id}/messages/{message_id}/moderation-metadata',
    'PUT',
  ] as const
}

export function usePutLobbiesLobbyIdMessagesMessageIdModerationMetadata<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<typeof client.lobbies>['messages']>['moderation-metadata']['put']
      >
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.lobbies>[0],
  params2: Parameters<ReturnType<typeof client.lobbies>['messages']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<typeof client.lobbies>['messages']>['moderation-metadata']['put']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<
          ReturnType<ReturnType<typeof client.lobbies>['messages']>['moderation-metadata']['put']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.lobbies>['messages']>['moderation-metadata']['put']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutLobbiesLobbyIdMessagesMessageIdModerationMetadataKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<typeof client.lobbies>['messages']>['moderation-metadata']['put']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<
          ReturnType<ReturnType<typeof client.lobbies>['messages']>['moderation-metadata']['put']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.lobbies>['messages']>['moderation-metadata']['put']
        >[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<
              ReturnType<
                ReturnType<typeof client.lobbies>['messages']
              >['moderation-metadata']['put']
            >[0]
            options?: Parameters<
              ReturnType<
                ReturnType<typeof client.lobbies>['messages']
              >['moderation-metadata']['put']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .lobbies(params)
          .messages(params2)
          ['moderation-metadata'].put(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetOauth2MeKey() {
  return ['oauth2', '/oauth2/@me'] as const
}

export function useGetOauth2Me<
  TError = Exclude<Awaited<ReturnType<(typeof client.oauth2)['@me']['get']>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<(typeof client.oauth2)['@me']['get']>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<(typeof client.oauth2)['@me']['get']>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey === undefined ? getGetOauth2MeKey() : customKey) : null
  return {
    swrKey,
    ...useSWR<
      Extract<Awaited<ReturnType<(typeof client.oauth2)['@me']['get']>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.oauth2['@me'].get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetOauth2Me<
  TError = Exclude<Awaited<ReturnType<(typeof client.oauth2)['@me']['get']>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<(typeof client.oauth2)['@me']['get']>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<(typeof client.oauth2)['@me']['get']>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey === undefined ? getGetOauth2MeKey() : customKey) : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<Awaited<ReturnType<(typeof client.oauth2)['@me']['get']>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.oauth2['@me'].get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetOauth2ApplicationsMeKey() {
  return ['oauth2', '/oauth2/applications/@me'] as const
}

export function useGetOauth2ApplicationsMe<
  TError = Exclude<
    Awaited<ReturnType<(typeof client.oauth2.applications)['@me']['get']>>['error'],
    null
  >,
>(options?: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<(typeof client.oauth2.applications)['@me']['get']>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<(typeof client.oauth2.applications)['@me']['get']>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOauth2ApplicationsMeKey()
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<(typeof client.oauth2.applications)['@me']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.oauth2.applications['@me'].get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetOauth2ApplicationsMe<
  TError = Exclude<
    Awaited<ReturnType<(typeof client.oauth2.applications)['@me']['get']>>['error'],
    null
  >,
>(options?: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<(typeof client.oauth2.applications)['@me']['get']>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<(typeof client.oauth2.applications)['@me']['get']>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOauth2ApplicationsMeKey()
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<(typeof client.oauth2.applications)['@me']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.oauth2.applications['@me'].get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetOauth2KeysKey() {
  return ['oauth2', '/oauth2/keys'] as const
}

export function useGetOauth2Keys<
  TError = Exclude<Awaited<ReturnType<typeof client.oauth2.keys.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.oauth2.keys.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.oauth2.keys.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey === undefined ? getGetOauth2KeysKey() : customKey) : null
  return {
    swrKey,
    ...useSWR<
      Extract<Awaited<ReturnType<typeof client.oauth2.keys.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.oauth2.keys.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetOauth2Keys<
  TError = Exclude<Awaited<ReturnType<typeof client.oauth2.keys.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.oauth2.keys.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.oauth2.keys.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey === undefined ? getGetOauth2KeysKey() : customKey) : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<Awaited<ReturnType<typeof client.oauth2.keys.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.oauth2.keys.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetOauth2UserinfoKey() {
  return ['oauth2', '/oauth2/userinfo'] as const
}

export function useGetOauth2Userinfo<
  TError = Exclude<Awaited<ReturnType<typeof client.oauth2.userinfo.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.oauth2.userinfo.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.oauth2.userinfo.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey === undefined ? getGetOauth2UserinfoKey() : customKey) : null
  return {
    swrKey,
    ...useSWR<
      Extract<Awaited<ReturnType<typeof client.oauth2.userinfo.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.oauth2.userinfo.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetOauth2Userinfo<
  TError = Exclude<Awaited<ReturnType<typeof client.oauth2.userinfo.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.oauth2.userinfo.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.oauth2.userinfo.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey === undefined ? getGetOauth2UserinfoKey() : customKey) : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<Awaited<ReturnType<typeof client.oauth2.userinfo.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.oauth2.userinfo.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPutPartnerSdkDmsUserId1UserId2MessagesMessageIdModerationMetadataKey() {
  return [
    'partner-sdk',
    '/partner-sdk/dms/{user_id_1}/{user_id_2}/messages/{message_id}/moderation-metadata',
    'PUT',
  ] as const
}

export function usePutPartnerSdkDmsUserId1UserId2MessagesMessageIdModerationMetadata<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<
          ReturnType<ReturnType<(typeof client)['partner-sdk']['dms']>>['messages']
        >['moderation-metadata']['put']
      >
    >['error'],
    null
  >,
>(
  params: Parameters<(typeof client)['partner-sdk']['dms']>[0],
  params2: Parameters<ReturnType<(typeof client)['partner-sdk']['dms']>>[0],
  params3: Parameters<ReturnType<ReturnType<(typeof client)['partner-sdk']['dms']>>['messages']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<
              ReturnType<ReturnType<(typeof client)['partner-sdk']['dms']>>['messages']
            >['moderation-metadata']['put']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<
          ReturnType<
            ReturnType<ReturnType<(typeof client)['partner-sdk']['dms']>>['messages']
          >['moderation-metadata']['put']
        >[0]
        options?: Parameters<
          ReturnType<
            ReturnType<ReturnType<(typeof client)['partner-sdk']['dms']>>['messages']
          >['moderation-metadata']['put']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey =
    customKey ?? getPutPartnerSdkDmsUserId1UserId2MessagesMessageIdModerationMetadataKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<
              ReturnType<ReturnType<(typeof client)['partner-sdk']['dms']>>['messages']
            >['moderation-metadata']['put']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<
          ReturnType<
            ReturnType<ReturnType<(typeof client)['partner-sdk']['dms']>>['messages']
          >['moderation-metadata']['put']
        >[0]
        options?: Parameters<
          ReturnType<
            ReturnType<ReturnType<(typeof client)['partner-sdk']['dms']>>['messages']
          >['moderation-metadata']['put']
        >[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<
              ReturnType<
                ReturnType<ReturnType<(typeof client)['partner-sdk']['dms']>>['messages']
              >['moderation-metadata']['put']
            >[0]
            options?: Parameters<
              ReturnType<
                ReturnType<ReturnType<(typeof client)['partner-sdk']['dms']>>['messages']
              >['moderation-metadata']['put']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client['partner-sdk']
          .dms(params)(params2)
          .messages(params3)
          ['moderation-metadata'].put(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostPartnerSdkProvisionalAccountsUnmergeKey() {
  return ['partner-sdk', '/partner-sdk/provisional-accounts/unmerge', 'POST'] as const
}

export function usePostPartnerSdkProvisionalAccountsUnmerge<
  TError = Exclude<
    Awaited<
      ReturnType<(typeof client)['partner-sdk']['provisional-accounts']['unmerge']['post']>
    >['error'],
    null
  >,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<
      Awaited<
        ReturnType<(typeof client)['partner-sdk']['provisional-accounts']['unmerge']['post']>
      >,
      { error: null }
    >['data'],
    TError,
    Key,
    {
      body: Parameters<(typeof client)['partner-sdk']['provisional-accounts']['unmerge']['post']>[0]
      options?: Parameters<
        (typeof client)['partner-sdk']['provisional-accounts']['unmerge']['post']
      >[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostPartnerSdkProvisionalAccountsUnmergeKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<(typeof client)['partner-sdk']['provisional-accounts']['unmerge']['post']>
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<
          (typeof client)['partner-sdk']['provisional-accounts']['unmerge']['post']
        >[0]
        options?: Parameters<
          (typeof client)['partner-sdk']['provisional-accounts']['unmerge']['post']
        >[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<
              (typeof client)['partner-sdk']['provisional-accounts']['unmerge']['post']
            >[0]
            options?: Parameters<
              (typeof client)['partner-sdk']['provisional-accounts']['unmerge']['post']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client['partner-sdk']['provisional-accounts'].unmerge.post(
          arg.body,
          arg.options,
        )
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostPartnerSdkProvisionalAccountsUnmergeBotKey() {
  return ['partner-sdk', '/partner-sdk/provisional-accounts/unmerge/bot', 'POST'] as const
}

export function usePostPartnerSdkProvisionalAccountsUnmergeBot<
  TError = Exclude<
    Awaited<
      ReturnType<(typeof client)['partner-sdk']['provisional-accounts']['unmerge']['bot']['post']>
    >['error'],
    null
  >,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<
      Awaited<
        ReturnType<(typeof client)['partner-sdk']['provisional-accounts']['unmerge']['bot']['post']>
      >,
      { error: null }
    >['data'],
    TError,
    Key,
    {
      body: Parameters<
        (typeof client)['partner-sdk']['provisional-accounts']['unmerge']['bot']['post']
      >[0]
      options?: Parameters<
        (typeof client)['partner-sdk']['provisional-accounts']['unmerge']['bot']['post']
      >[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostPartnerSdkProvisionalAccountsUnmergeBotKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<
            (typeof client)['partner-sdk']['provisional-accounts']['unmerge']['bot']['post']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<
          (typeof client)['partner-sdk']['provisional-accounts']['unmerge']['bot']['post']
        >[0]
        options?: Parameters<
          (typeof client)['partner-sdk']['provisional-accounts']['unmerge']['bot']['post']
        >[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<
              (typeof client)['partner-sdk']['provisional-accounts']['unmerge']['bot']['post']
            >[0]
            options?: Parameters<
              (typeof client)['partner-sdk']['provisional-accounts']['unmerge']['bot']['post']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client['partner-sdk'][
          'provisional-accounts'
        ].unmerge.bot.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostPartnerSdkTokenKey() {
  return ['partner-sdk', '/partner-sdk/token', 'POST'] as const
}

export function usePostPartnerSdkToken<
  TError = Exclude<
    Awaited<ReturnType<(typeof client)['partner-sdk']['token']['post']>>['error'],
    null
  >,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<
      Awaited<ReturnType<(typeof client)['partner-sdk']['token']['post']>>,
      { error: null }
    >['data'],
    TError,
    Key,
    {
      body: Parameters<(typeof client)['partner-sdk']['token']['post']>[0]
      options?: Parameters<(typeof client)['partner-sdk']['token']['post']>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostPartnerSdkTokenKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<(typeof client)['partner-sdk']['token']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<(typeof client)['partner-sdk']['token']['post']>[0]
        options?: Parameters<(typeof client)['partner-sdk']['token']['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<(typeof client)['partner-sdk']['token']['post']>[0]
            options?: Parameters<(typeof client)['partner-sdk']['token']['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client['partner-sdk'].token.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostPartnerSdkTokenBotKey() {
  return ['partner-sdk', '/partner-sdk/token/bot', 'POST'] as const
}

export function usePostPartnerSdkTokenBot<
  TError = Exclude<
    Awaited<ReturnType<(typeof client)['partner-sdk']['token']['bot']['post']>>['error'],
    null
  >,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<
      Awaited<ReturnType<(typeof client)['partner-sdk']['token']['bot']['post']>>,
      { error: null }
    >['data'],
    TError,
    Key,
    {
      body: Parameters<(typeof client)['partner-sdk']['token']['bot']['post']>[0]
      options?: Parameters<(typeof client)['partner-sdk']['token']['bot']['post']>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostPartnerSdkTokenBotKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<(typeof client)['partner-sdk']['token']['bot']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<(typeof client)['partner-sdk']['token']['bot']['post']>[0]
        options?: Parameters<(typeof client)['partner-sdk']['token']['bot']['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<(typeof client)['partner-sdk']['token']['bot']['post']>[0]
            options?: Parameters<(typeof client)['partner-sdk']['token']['bot']['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client['partner-sdk'].token.bot.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetSkusSkuIdSubscriptionsKey(
  params: Parameters<typeof client.skus>[0],
  options?: Parameters<ReturnType<typeof client.skus>['subscriptions']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['skus', '/skus/{sku_id}/subscriptions', params, keyArgs] as const
}

export function useGetSkusSkuIdSubscriptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.skus>['subscriptions']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.skus>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.skus>['subscriptions']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.skus>['subscriptions']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetSkusSkuIdSubscriptionsKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.skus>['subscriptions']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.skus(params).subscriptions.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetSkusSkuIdSubscriptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.skus>['subscriptions']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.skus>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.skus>['subscriptions']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.skus>['subscriptions']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetSkusSkuIdSubscriptionsKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.skus>['subscriptions']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.skus(params).subscriptions.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetSkusSkuIdSubscriptionsSubscriptionIdKey(
  params: Parameters<typeof client.skus>[0],
  params2: Parameters<ReturnType<typeof client.skus>['subscriptions']>[0],
  options?: Parameters<ReturnType<ReturnType<typeof client.skus>['subscriptions']>['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'skus',
    '/skus/{sku_id}/subscriptions/{subscription_id}',
    params,
    params2,
    keyArgs,
  ] as const
}

export function useGetSkusSkuIdSubscriptionsSubscriptionId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.skus>['subscriptions']>['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.skus>[0],
  params2: Parameters<ReturnType<typeof client.skus>['subscriptions']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.skus>['subscriptions']>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<ReturnType<typeof client.skus>['subscriptions']>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetSkusSkuIdSubscriptionsSubscriptionIdKey(params, params2, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.skus>['subscriptions']>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.skus(params).subscriptions(params2).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetSkusSkuIdSubscriptionsSubscriptionId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.skus>['subscriptions']>['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.skus>[0],
  params2: Parameters<ReturnType<typeof client.skus>['subscriptions']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.skus>['subscriptions']>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<ReturnType<typeof client.skus>['subscriptions']>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetSkusSkuIdSubscriptionsSubscriptionIdKey(params, params2, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.skus>['subscriptions']>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.skus(params).subscriptions(params2).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetSoundboardDefaultSoundsKey() {
  return ['soundboard-default-sounds', '/soundboard-default-sounds'] as const
}

export function useGetSoundboardDefaultSounds<
  TError = Exclude<
    Awaited<ReturnType<(typeof client)['soundboard-default-sounds']['get']>>['error'],
    null
  >,
>(options?: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<(typeof client)['soundboard-default-sounds']['get']>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<(typeof client)['soundboard-default-sounds']['get']>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetSoundboardDefaultSoundsKey()
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<(typeof client)['soundboard-default-sounds']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client['soundboard-default-sounds'].get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetSoundboardDefaultSounds<
  TError = Exclude<
    Awaited<ReturnType<(typeof client)['soundboard-default-sounds']['get']>>['error'],
    null
  >,
>(options?: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<(typeof client)['soundboard-default-sounds']['get']>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<(typeof client)['soundboard-default-sounds']['get']>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetSoundboardDefaultSoundsKey()
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<(typeof client)['soundboard-default-sounds']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client['soundboard-default-sounds'].get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostStageInstancesKey() {
  return ['stage-instances', '/stage-instances', 'POST'] as const
}

export function usePostStageInstances<
  TError = Exclude<Awaited<ReturnType<(typeof client)['stage-instances']['post']>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<
      Awaited<ReturnType<(typeof client)['stage-instances']['post']>>,
      { error: null }
    >['data'],
    TError,
    Key,
    {
      body: Parameters<(typeof client)['stage-instances']['post']>[0]
      options?: Parameters<(typeof client)['stage-instances']['post']>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostStageInstancesKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<(typeof client)['stage-instances']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<(typeof client)['stage-instances']['post']>[0]
        options?: Parameters<(typeof client)['stage-instances']['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<(typeof client)['stage-instances']['post']>[0]
            options?: Parameters<(typeof client)['stage-instances']['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client['stage-instances'].post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetStageInstancesChannelIdKey(
  params: Parameters<(typeof client)['stage-instances']>[0],
) {
  return ['stage-instances', '/stage-instances/{channel_id}', params] as const
}

export function useGetStageInstancesChannelId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<(typeof client)['stage-instances']>['get']>>['error'],
    null
  >,
>(
  params: Parameters<(typeof client)['stage-instances']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<(typeof client)['stage-instances']>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<(typeof client)['stage-instances']>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetStageInstancesChannelIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<(typeof client)['stage-instances']>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client['stage-instances'](params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetStageInstancesChannelId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<(typeof client)['stage-instances']>['get']>>['error'],
    null
  >,
>(
  params: Parameters<(typeof client)['stage-instances']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<(typeof client)['stage-instances']>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<(typeof client)['stage-instances']>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetStageInstancesChannelIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<(typeof client)['stage-instances']>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client['stage-instances'](params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getDeleteStageInstancesChannelIdKey() {
  return ['stage-instances', '/stage-instances/{channel_id}', 'DELETE'] as const
}

export function useDeleteStageInstancesChannelId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<(typeof client)['stage-instances']>['delete']>>['error'],
    null
  >,
>(
  params: Parameters<(typeof client)['stage-instances']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<(typeof client)['stage-instances']>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<(typeof client)['stage-instances']>['delete']>[0]
        options?: Parameters<ReturnType<(typeof client)['stage-instances']>['delete']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteStageInstancesChannelIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<(typeof client)['stage-instances']>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<(typeof client)['stage-instances']>['delete']>[0]
        options?: Parameters<ReturnType<(typeof client)['stage-instances']>['delete']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<ReturnType<(typeof client)['stage-instances']>['delete']>[0]
            options?: Parameters<ReturnType<(typeof client)['stage-instances']>['delete']>[1]
          }
        },
      ) => {
        const { data, error } = await client['stage-instances'](params).delete(
          arg.body,
          arg.options,
        )
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPatchStageInstancesChannelIdKey() {
  return ['stage-instances', '/stage-instances/{channel_id}', 'PATCH'] as const
}

export function usePatchStageInstancesChannelId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<(typeof client)['stage-instances']>['patch']>>['error'],
    null
  >,
>(
  params: Parameters<(typeof client)['stage-instances']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<(typeof client)['stage-instances']>['patch']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<(typeof client)['stage-instances']>['patch']>[0]
        options?: Parameters<ReturnType<(typeof client)['stage-instances']>['patch']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPatchStageInstancesChannelIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<(typeof client)['stage-instances']>['patch']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<(typeof client)['stage-instances']>['patch']>[0]
        options?: Parameters<ReturnType<(typeof client)['stage-instances']>['patch']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<(typeof client)['stage-instances']>['patch']>[0]
            options?: Parameters<ReturnType<(typeof client)['stage-instances']>['patch']>[1]
          }
        },
      ) => {
        const { data, error } = await client['stage-instances'](params).patch(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetStickerPacksKey() {
  return ['sticker-packs', '/sticker-packs'] as const
}

export function useGetStickerPacks<
  TError = Exclude<Awaited<ReturnType<(typeof client)['sticker-packs']['get']>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<(typeof client)['sticker-packs']['get']>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<(typeof client)['sticker-packs']['get']>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey === undefined ? getGetStickerPacksKey() : customKey) : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<(typeof client)['sticker-packs']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client['sticker-packs'].get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetStickerPacks<
  TError = Exclude<Awaited<ReturnType<(typeof client)['sticker-packs']['get']>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<(typeof client)['sticker-packs']['get']>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<(typeof client)['sticker-packs']['get']>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey === undefined ? getGetStickerPacksKey() : customKey) : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<(typeof client)['sticker-packs']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client['sticker-packs'].get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetStickerPacksPackIdKey(
  params: Parameters<(typeof client)['sticker-packs']>[0],
) {
  return ['sticker-packs', '/sticker-packs/{pack_id}', params] as const
}

export function useGetStickerPacksPackId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<(typeof client)['sticker-packs']>['get']>>['error'],
    null
  >,
>(
  params: Parameters<(typeof client)['sticker-packs']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<(typeof client)['sticker-packs']>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<(typeof client)['sticker-packs']>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetStickerPacksPackIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<(typeof client)['sticker-packs']>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client['sticker-packs'](params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetStickerPacksPackId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<(typeof client)['sticker-packs']>['get']>>['error'],
    null
  >,
>(
  params: Parameters<(typeof client)['sticker-packs']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<(typeof client)['sticker-packs']>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<(typeof client)['sticker-packs']>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetStickerPacksPackIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<(typeof client)['sticker-packs']>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client['sticker-packs'](params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetStickersStickerIdKey(params: Parameters<typeof client.stickers>[0]) {
  return ['stickers', '/stickers/{sticker_id}', params] as const
}

export function useGetStickersStickerId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.stickers>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.stickers>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.stickers>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.stickers>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetStickersStickerIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.stickers>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.stickers(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetStickersStickerId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.stickers>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.stickers>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.stickers>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.stickers>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetStickersStickerIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.stickers>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.stickers(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetUsersMeKey() {
  return ['users', '/users/@me'] as const
}

export function useGetUsersMe<
  TError = Exclude<Awaited<ReturnType<(typeof client.users)['@me']['get']>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<(typeof client.users)['@me']['get']>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<(typeof client.users)['@me']['get']>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey === undefined ? getGetUsersMeKey() : customKey) : null
  return {
    swrKey,
    ...useSWR<
      Extract<Awaited<ReturnType<(typeof client.users)['@me']['get']>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.users['@me'].get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetUsersMe<
  TError = Exclude<Awaited<ReturnType<(typeof client.users)['@me']['get']>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<(typeof client.users)['@me']['get']>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<(typeof client.users)['@me']['get']>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey === undefined ? getGetUsersMeKey() : customKey) : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<Awaited<ReturnType<(typeof client.users)['@me']['get']>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.users['@me'].get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPatchUsersMeKey() {
  return ['users', '/users/@me', 'PATCH'] as const
}

export function usePatchUsersMe<
  TError = Exclude<Awaited<ReturnType<(typeof client.users)['@me']['patch']>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<(typeof client.users)['@me']['patch']>>, { error: null }>['data'],
    TError,
    Key,
    {
      body: Parameters<(typeof client.users)['@me']['patch']>[0]
      options?: Parameters<(typeof client.users)['@me']['patch']>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPatchUsersMeKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<Awaited<ReturnType<(typeof client.users)['@me']['patch']>>, { error: null }>['data'],
      TError,
      Key,
      {
        body: Parameters<(typeof client.users)['@me']['patch']>[0]
        options?: Parameters<(typeof client.users)['@me']['patch']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<(typeof client.users)['@me']['patch']>[0]
            options?: Parameters<(typeof client.users)['@me']['patch']>[1]
          }
        },
      ) => {
        const { data, error } = await client.users['@me'].patch(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetUsersMeApplicationsApplicationIdEntitlementsKey(
  params: Parameters<(typeof client.users)['@me']['applications']>[0],
  options?: Parameters<
    ReturnType<(typeof client.users)['@me']['applications']>['entitlements']['get']
  >[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'users',
    '/users/@me/applications/{application_id}/entitlements',
    params,
    keyArgs,
  ] as const
}

export function useGetUsersMeApplicationsApplicationIdEntitlements<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<(typeof client.users)['@me']['applications']>['entitlements']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<(typeof client.users)['@me']['applications']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<(typeof client.users)['@me']['applications']>['entitlements']['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<(typeof client.users)['@me']['applications']>['entitlements']['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetUsersMeApplicationsApplicationIdEntitlementsKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<(typeof client.users)['@me']['applications']>['entitlements']['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.users['@me']
          .applications(params)
          .entitlements.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetUsersMeApplicationsApplicationIdEntitlements<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<(typeof client.users)['@me']['applications']>['entitlements']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<(typeof client.users)['@me']['applications']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<(typeof client.users)['@me']['applications']>['entitlements']['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<(typeof client.users)['@me']['applications']>['entitlements']['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetUsersMeApplicationsApplicationIdEntitlementsKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<(typeof client.users)['@me']['applications']>['entitlements']['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.users['@me']
          .applications(params)
          .entitlements.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetUsersMeApplicationsApplicationIdRoleConnectionKey(
  params: Parameters<(typeof client.users)['@me']['applications']>[0],
) {
  return ['users', '/users/@me/applications/{application_id}/role-connection', params] as const
}

export function useGetUsersMeApplicationsApplicationIdRoleConnection<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<(typeof client.users)['@me']['applications']>['role-connection']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<(typeof client.users)['@me']['applications']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<(typeof client.users)['@me']['applications']>['role-connection']['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<(typeof client.users)['@me']['applications']>['role-connection']['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetUsersMeApplicationsApplicationIdRoleConnectionKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<(typeof client.users)['@me']['applications']>['role-connection']['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.users['@me']
          .applications(params)
          ['role-connection'].get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetUsersMeApplicationsApplicationIdRoleConnection<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<(typeof client.users)['@me']['applications']>['role-connection']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<(typeof client.users)['@me']['applications']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<(typeof client.users)['@me']['applications']>['role-connection']['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<(typeof client.users)['@me']['applications']>['role-connection']['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetUsersMeApplicationsApplicationIdRoleConnectionKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<(typeof client.users)['@me']['applications']>['role-connection']['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.users['@me']
          .applications(params)
          ['role-connection'].get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPutUsersMeApplicationsApplicationIdRoleConnectionKey() {
  return ['users', '/users/@me/applications/{application_id}/role-connection', 'PUT'] as const
}

export function usePutUsersMeApplicationsApplicationIdRoleConnection<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<(typeof client.users)['@me']['applications']>['role-connection']['put']>
    >['error'],
    null
  >,
>(
  params: Parameters<(typeof client.users)['@me']['applications']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<(typeof client.users)['@me']['applications']>['role-connection']['put']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<
          ReturnType<(typeof client.users)['@me']['applications']>['role-connection']['put']
        >[0]
        options?: Parameters<
          ReturnType<(typeof client.users)['@me']['applications']>['role-connection']['put']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutUsersMeApplicationsApplicationIdRoleConnectionKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<(typeof client.users)['@me']['applications']>['role-connection']['put']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<
          ReturnType<(typeof client.users)['@me']['applications']>['role-connection']['put']
        >[0]
        options?: Parameters<
          ReturnType<(typeof client.users)['@me']['applications']>['role-connection']['put']
        >[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<
              ReturnType<(typeof client.users)['@me']['applications']>['role-connection']['put']
            >[0]
            options?: Parameters<
              ReturnType<(typeof client.users)['@me']['applications']>['role-connection']['put']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client.users['@me']
          .applications(params)
          ['role-connection'].put(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getDeleteUsersMeApplicationsApplicationIdRoleConnectionKey() {
  return ['users', '/users/@me/applications/{application_id}/role-connection', 'DELETE'] as const
}

export function useDeleteUsersMeApplicationsApplicationIdRoleConnection<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<(typeof client.users)['@me']['applications']>['role-connection']['delete']
      >
    >['error'],
    null
  >,
>(
  params: Parameters<(typeof client.users)['@me']['applications']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<(typeof client.users)['@me']['applications']>['role-connection']['delete']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<(typeof client.users)['@me']['applications']>['role-connection']['delete']
        >[0]
        options?: Parameters<
          ReturnType<(typeof client.users)['@me']['applications']>['role-connection']['delete']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteUsersMeApplicationsApplicationIdRoleConnectionKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<(typeof client.users)['@me']['applications']>['role-connection']['delete']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<(typeof client.users)['@me']['applications']>['role-connection']['delete']
        >[0]
        options?: Parameters<
          ReturnType<(typeof client.users)['@me']['applications']>['role-connection']['delete']
        >[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<
              ReturnType<(typeof client.users)['@me']['applications']>['role-connection']['delete']
            >[0]
            options?: Parameters<
              ReturnType<(typeof client.users)['@me']['applications']>['role-connection']['delete']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client.users['@me']
          .applications(params)
          ['role-connection'].delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostUsersMeChannelsKey() {
  return ['users', '/users/@me/channels', 'POST'] as const
}

export function usePostUsersMeChannels<
  TError = Exclude<
    Awaited<ReturnType<(typeof client.users)['@me']['channels']['post']>>['error'],
    null
  >,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<
      Awaited<ReturnType<(typeof client.users)['@me']['channels']['post']>>,
      { error: null }
    >['data'],
    TError,
    Key,
    {
      body: Parameters<(typeof client.users)['@me']['channels']['post']>[0]
      options?: Parameters<(typeof client.users)['@me']['channels']['post']>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostUsersMeChannelsKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<(typeof client.users)['@me']['channels']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<(typeof client.users)['@me']['channels']['post']>[0]
        options?: Parameters<(typeof client.users)['@me']['channels']['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<(typeof client.users)['@me']['channels']['post']>[0]
            options?: Parameters<(typeof client.users)['@me']['channels']['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client.users['@me'].channels.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetUsersMeConnectionsKey() {
  return ['users', '/users/@me/connections'] as const
}

export function useGetUsersMeConnections<
  TError = Exclude<
    Awaited<ReturnType<(typeof client.users)['@me']['connections']['get']>>['error'],
    null
  >,
>(options?: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<(typeof client.users)['@me']['connections']['get']>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<(typeof client.users)['@me']['connections']['get']>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey === undefined ? getGetUsersMeConnectionsKey() : customKey) : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<(typeof client.users)['@me']['connections']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.users['@me'].connections.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetUsersMeConnections<
  TError = Exclude<
    Awaited<ReturnType<(typeof client.users)['@me']['connections']['get']>>['error'],
    null
  >,
>(options?: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<(typeof client.users)['@me']['connections']['get']>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<(typeof client.users)['@me']['connections']['get']>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey === undefined ? getGetUsersMeConnectionsKey() : customKey) : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<(typeof client.users)['@me']['connections']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.users['@me'].connections.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetUsersMeGuildsKey(
  options?: Parameters<(typeof client.users)['@me']['guilds']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['users', '/users/@me/guilds', keyArgs] as const
}

export function useGetUsersMeGuilds<
  TError = Exclude<
    Awaited<ReturnType<(typeof client.users)['@me']['guilds']['get']>>['error'],
    null
  >,
>(options?: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<(typeof client.users)['@me']['guilds']['get']>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<(typeof client.users)['@me']['guilds']['get']>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetUsersMeGuildsKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<(typeof client.users)['@me']['guilds']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.users['@me'].guilds.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetUsersMeGuilds<
  TError = Exclude<
    Awaited<ReturnType<(typeof client.users)['@me']['guilds']['get']>>['error'],
    null
  >,
>(options?: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<(typeof client.users)['@me']['guilds']['get']>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<(typeof client.users)['@me']['guilds']['get']>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetUsersMeGuildsKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<(typeof client.users)['@me']['guilds']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.users['@me'].guilds.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getDeleteUsersMeGuildsGuildIdKey() {
  return ['users', '/users/@me/guilds/{guild_id}', 'DELETE'] as const
}

export function useDeleteUsersMeGuildsGuildId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<(typeof client.users)['@me']['guilds']>['delete']>>['error'],
    null
  >,
>(
  params: Parameters<(typeof client.users)['@me']['guilds']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<(typeof client.users)['@me']['guilds']>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<(typeof client.users)['@me']['guilds']>['delete']>[0]
        options?: Parameters<ReturnType<(typeof client.users)['@me']['guilds']>['delete']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteUsersMeGuildsGuildIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<(typeof client.users)['@me']['guilds']>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<(typeof client.users)['@me']['guilds']>['delete']>[0]
        options?: Parameters<ReturnType<(typeof client.users)['@me']['guilds']>['delete']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<ReturnType<(typeof client.users)['@me']['guilds']>['delete']>[0]
            options?: Parameters<ReturnType<(typeof client.users)['@me']['guilds']>['delete']>[1]
          }
        },
      ) => {
        const { data, error } = await client.users['@me']
          .guilds(params)
          .delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetUsersMeGuildsGuildIdMemberKey(
  params: Parameters<(typeof client.users)['@me']['guilds']>[0],
) {
  return ['users', '/users/@me/guilds/{guild_id}/member', params] as const
}

export function useGetUsersMeGuildsGuildIdMember<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<(typeof client.users)['@me']['guilds']>['member']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<(typeof client.users)['@me']['guilds']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<(typeof client.users)['@me']['guilds']>['member']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<(typeof client.users)['@me']['guilds']>['member']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetUsersMeGuildsGuildIdMemberKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<(typeof client.users)['@me']['guilds']>['member']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.users['@me'].guilds(params).member.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetUsersMeGuildsGuildIdMember<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<(typeof client.users)['@me']['guilds']>['member']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<(typeof client.users)['@me']['guilds']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<(typeof client.users)['@me']['guilds']>['member']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<(typeof client.users)['@me']['guilds']>['member']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetUsersMeGuildsGuildIdMemberKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<(typeof client.users)['@me']['guilds']>['member']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.users['@me'].guilds(params).member.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetUsersUserIdKey(params: Parameters<typeof client.users>[0]) {
  return ['users', '/users/{user_id}', params] as const
}

export function useGetUsersUserId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.users>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.users>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<Awaited<ReturnType<ReturnType<typeof client.users>['get']>>, { error: null }>['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.users>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey === undefined ? getGetUsersUserIdKey(params) : customKey) : null
  return {
    swrKey,
    ...useSWR<
      Extract<Awaited<ReturnType<ReturnType<typeof client.users>['get']>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.users(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetUsersUserId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.users>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.users>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<Awaited<ReturnType<ReturnType<typeof client.users>['get']>>, { error: null }>['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.users>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey === undefined ? getGetUsersUserIdKey(params) : customKey) : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<Awaited<ReturnType<ReturnType<typeof client.users>['get']>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.users(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetVoiceRegionsKey() {
  return ['voice', '/voice/regions'] as const
}

export function useGetVoiceRegions<
  TError = Exclude<Awaited<ReturnType<typeof client.voice.regions.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.voice.regions.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.voice.regions.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey === undefined ? getGetVoiceRegionsKey() : customKey) : null
  return {
    swrKey,
    ...useSWR<
      Extract<Awaited<ReturnType<typeof client.voice.regions.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.voice.regions.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetVoiceRegions<
  TError = Exclude<Awaited<ReturnType<typeof client.voice.regions.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.voice.regions.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.voice.regions.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey === undefined ? getGetVoiceRegionsKey() : customKey) : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<Awaited<ReturnType<typeof client.voice.regions.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.voice.regions.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetWebhooksWebhookIdKey(params: Parameters<typeof client.webhooks>[0]) {
  return ['webhooks', '/webhooks/{webhook_id}', params] as const
}

export function useGetWebhooksWebhookId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.webhooks>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.webhooks>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.webhooks>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.webhooks>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetWebhooksWebhookIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.webhooks>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.webhooks(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetWebhooksWebhookId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.webhooks>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.webhooks>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.webhooks>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.webhooks>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetWebhooksWebhookIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.webhooks>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.webhooks(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getDeleteWebhooksWebhookIdKey() {
  return ['webhooks', '/webhooks/{webhook_id}', 'DELETE'] as const
}

export function useDeleteWebhooksWebhookId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.webhooks>['delete']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.webhooks>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.webhooks>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.webhooks>['delete']>[0]
        options?: Parameters<ReturnType<typeof client.webhooks>['delete']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteWebhooksWebhookIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.webhooks>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.webhooks>['delete']>[0]
        options?: Parameters<ReturnType<typeof client.webhooks>['delete']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<ReturnType<typeof client.webhooks>['delete']>[0]
            options?: Parameters<ReturnType<typeof client.webhooks>['delete']>[1]
          }
        },
      ) => {
        const { data, error } = await client.webhooks(params).delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPatchWebhooksWebhookIdKey() {
  return ['webhooks', '/webhooks/{webhook_id}', 'PATCH'] as const
}

export function usePatchWebhooksWebhookId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.webhooks>['patch']>>['error'], null>,
>(
  params: Parameters<typeof client.webhooks>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.webhooks>['patch']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.webhooks>['patch']>[0]
        options?: Parameters<ReturnType<typeof client.webhooks>['patch']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPatchWebhooksWebhookIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.webhooks>['patch']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.webhooks>['patch']>[0]
        options?: Parameters<ReturnType<typeof client.webhooks>['patch']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.webhooks>['patch']>[0]
            options?: Parameters<ReturnType<typeof client.webhooks>['patch']>[1]
          }
        },
      ) => {
        const { data, error } = await client.webhooks(params).patch(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetWebhooksWebhookIdWebhookTokenKey(
  params: Parameters<typeof client.webhooks>[0],
  params2: Parameters<ReturnType<typeof client.webhooks>>[0],
) {
  return ['webhooks', '/webhooks/{webhook_id}/{webhook_token}', params, params2] as const
}

export function useGetWebhooksWebhookIdWebhookToken<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.webhooks>[0],
  params2: Parameters<ReturnType<typeof client.webhooks>>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<ReturnType<typeof client.webhooks>>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetWebhooksWebhookIdWebhookTokenKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.webhooks(params)(params2).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetWebhooksWebhookIdWebhookToken<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.webhooks>[0],
  params2: Parameters<ReturnType<typeof client.webhooks>>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<ReturnType<typeof client.webhooks>>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetWebhooksWebhookIdWebhookTokenKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.webhooks(params)(params2).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostWebhooksWebhookIdWebhookTokenKey() {
  return ['webhooks', '/webhooks/{webhook_id}/{webhook_token}', 'POST'] as const
}

export function usePostWebhooksWebhookIdWebhookToken<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.webhooks>[0],
  params2: Parameters<ReturnType<typeof client.webhooks>>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<ReturnType<typeof client.webhooks>>['post']>[0]
        options?: Parameters<ReturnType<ReturnType<typeof client.webhooks>>['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostWebhooksWebhookIdWebhookTokenKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<ReturnType<typeof client.webhooks>>['post']>[0]
        options?: Parameters<ReturnType<ReturnType<typeof client.webhooks>>['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<ReturnType<typeof client.webhooks>>['post']>[0]
            options?: Parameters<ReturnType<ReturnType<typeof client.webhooks>>['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client.webhooks(params)(params2).post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getDeleteWebhooksWebhookIdWebhookTokenKey() {
  return ['webhooks', '/webhooks/{webhook_id}/{webhook_token}', 'DELETE'] as const
}

export function useDeleteWebhooksWebhookIdWebhookToken<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['delete']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.webhooks>[0],
  params2: Parameters<ReturnType<typeof client.webhooks>>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<ReturnType<typeof client.webhooks>>['delete']>[0]
        options?: Parameters<ReturnType<ReturnType<typeof client.webhooks>>['delete']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteWebhooksWebhookIdWebhookTokenKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<ReturnType<typeof client.webhooks>>['delete']>[0]
        options?: Parameters<ReturnType<ReturnType<typeof client.webhooks>>['delete']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<ReturnType<ReturnType<typeof client.webhooks>>['delete']>[0]
            options?: Parameters<ReturnType<ReturnType<typeof client.webhooks>>['delete']>[1]
          }
        },
      ) => {
        const { data, error } = await client.webhooks(params)(params2).delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPatchWebhooksWebhookIdWebhookTokenKey() {
  return ['webhooks', '/webhooks/{webhook_id}/{webhook_token}', 'PATCH'] as const
}

export function usePatchWebhooksWebhookIdWebhookToken<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['patch']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.webhooks>[0],
  params2: Parameters<ReturnType<typeof client.webhooks>>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['patch']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<ReturnType<typeof client.webhooks>>['patch']>[0]
        options?: Parameters<ReturnType<ReturnType<typeof client.webhooks>>['patch']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPatchWebhooksWebhookIdWebhookTokenKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['patch']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<ReturnType<typeof client.webhooks>>['patch']>[0]
        options?: Parameters<ReturnType<ReturnType<typeof client.webhooks>>['patch']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<ReturnType<typeof client.webhooks>>['patch']>[0]
            options?: Parameters<ReturnType<ReturnType<typeof client.webhooks>>['patch']>[1]
          }
        },
      ) => {
        const { data, error } = await client.webhooks(params)(params2).patch(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostWebhooksWebhookIdWebhookTokenGithubKey() {
  return ['webhooks', '/webhooks/{webhook_id}/{webhook_token}/github', 'POST'] as const
}

export function usePostWebhooksWebhookIdWebhookTokenGithub<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['github']['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.webhooks>[0],
  params2: Parameters<ReturnType<typeof client.webhooks>>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['github']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<ReturnType<typeof client.webhooks>>['github']['post']>[0]
        options?: Parameters<ReturnType<ReturnType<typeof client.webhooks>>['github']['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostWebhooksWebhookIdWebhookTokenGithubKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['github']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<ReturnType<typeof client.webhooks>>['github']['post']>[0]
        options?: Parameters<ReturnType<ReturnType<typeof client.webhooks>>['github']['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<ReturnType<typeof client.webhooks>>['github']['post']>[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.webhooks>>['github']['post']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .webhooks(params)(params2)
          .github.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetWebhooksWebhookIdWebhookTokenMessagesOriginalKey(
  params: Parameters<typeof client.webhooks>[0],
  params2: Parameters<ReturnType<typeof client.webhooks>>[0],
  options?: Parameters<
    ReturnType<ReturnType<typeof client.webhooks>>['messages']['@original']['get']
  >[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'webhooks',
    '/webhooks/{webhook_id}/{webhook_token}/messages/@original',
    params,
    params2,
    keyArgs,
  ] as const
}

export function useGetWebhooksWebhookIdWebhookTokenMessagesOriginal<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']['@original']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.webhooks>[0],
  params2: Parameters<ReturnType<typeof client.webhooks>>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']['@original']['get']>
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<typeof client.webhooks>>['messages']['@original']['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetWebhooksWebhookIdWebhookTokenMessagesOriginalKey(params, params2, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']['@original']['get']>
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client
          .webhooks(params)(params2)
          .messages['@original'].get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetWebhooksWebhookIdWebhookTokenMessagesOriginal<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']['@original']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.webhooks>[0],
  params2: Parameters<ReturnType<typeof client.webhooks>>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']['@original']['get']>
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<typeof client.webhooks>>['messages']['@original']['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetWebhooksWebhookIdWebhookTokenMessagesOriginalKey(params, params2, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']['@original']['get']>
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client
          .webhooks(params)(params2)
          .messages['@original'].get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getDeleteWebhooksWebhookIdWebhookTokenMessagesOriginalKey() {
  return [
    'webhooks',
    '/webhooks/{webhook_id}/{webhook_token}/messages/@original',
    'DELETE',
  ] as const
}

export function useDeleteWebhooksWebhookIdWebhookTokenMessagesOriginal<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']['@original']['delete']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.webhooks>[0],
  params2: Parameters<ReturnType<typeof client.webhooks>>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<typeof client.webhooks>>['messages']['@original']['delete']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<ReturnType<typeof client.webhooks>>['messages']['@original']['delete']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.webhooks>>['messages']['@original']['delete']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteWebhooksWebhookIdWebhookTokenMessagesOriginalKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<typeof client.webhooks>>['messages']['@original']['delete']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<ReturnType<typeof client.webhooks>>['messages']['@original']['delete']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.webhooks>>['messages']['@original']['delete']
        >[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<
              ReturnType<ReturnType<typeof client.webhooks>>['messages']['@original']['delete']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.webhooks>>['messages']['@original']['delete']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .webhooks(params)(params2)
          .messages['@original'].delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPatchWebhooksWebhookIdWebhookTokenMessagesOriginalKey() {
  return ['webhooks', '/webhooks/{webhook_id}/{webhook_token}/messages/@original', 'PATCH'] as const
}

export function usePatchWebhooksWebhookIdWebhookTokenMessagesOriginal<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']['@original']['patch']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.webhooks>[0],
  params2: Parameters<ReturnType<typeof client.webhooks>>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<typeof client.webhooks>>['messages']['@original']['patch']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<
          ReturnType<ReturnType<typeof client.webhooks>>['messages']['@original']['patch']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.webhooks>>['messages']['@original']['patch']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPatchWebhooksWebhookIdWebhookTokenMessagesOriginalKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<typeof client.webhooks>>['messages']['@original']['patch']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<
          ReturnType<ReturnType<typeof client.webhooks>>['messages']['@original']['patch']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.webhooks>>['messages']['@original']['patch']
        >[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<
              ReturnType<ReturnType<typeof client.webhooks>>['messages']['@original']['patch']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.webhooks>>['messages']['@original']['patch']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .webhooks(params)(params2)
          .messages['@original'].patch(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetWebhooksWebhookIdWebhookTokenMessagesMessageIdKey(
  params: Parameters<typeof client.webhooks>[0],
  params2: Parameters<ReturnType<typeof client.webhooks>>[0],
  params3: Parameters<ReturnType<ReturnType<typeof client.webhooks>>['messages']>[0],
  options?: Parameters<
    ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']>['get']
  >[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'webhooks',
    '/webhooks/{webhook_id}/{webhook_token}/messages/{message_id}',
    params,
    params2,
    params3,
    keyArgs,
  ] as const
}

export function useGetWebhooksWebhookIdWebhookTokenMessagesMessageId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']>['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.webhooks>[0],
  params2: Parameters<ReturnType<typeof client.webhooks>>[0],
  params3: Parameters<ReturnType<ReturnType<typeof client.webhooks>>['messages']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']>['get']>
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']>['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetWebhooksWebhookIdWebhookTokenMessagesMessageIdKey(
            params,
            params2,
            params3,
            clientOptions,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']>['get']>
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client
          .webhooks(params)(params2)
          .messages(params3)
          .get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetWebhooksWebhookIdWebhookTokenMessagesMessageId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']>['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.webhooks>[0],
  params2: Parameters<ReturnType<typeof client.webhooks>>[0],
  params3: Parameters<ReturnType<ReturnType<typeof client.webhooks>>['messages']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']>['get']>
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']>['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetWebhooksWebhookIdWebhookTokenMessagesMessageIdKey(
            params,
            params2,
            params3,
            clientOptions,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']>['get']>
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client
          .webhooks(params)(params2)
          .messages(params3)
          .get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getDeleteWebhooksWebhookIdWebhookTokenMessagesMessageIdKey() {
  return [
    'webhooks',
    '/webhooks/{webhook_id}/{webhook_token}/messages/{message_id}',
    'DELETE',
  ] as const
}

export function useDeleteWebhooksWebhookIdWebhookTokenMessagesMessageId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']>['delete']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.webhooks>[0],
  params2: Parameters<ReturnType<typeof client.webhooks>>[0],
  params3: Parameters<ReturnType<ReturnType<typeof client.webhooks>>['messages']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']>['delete']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']>['delete']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']>['delete']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteWebhooksWebhookIdWebhookTokenMessagesMessageIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']>['delete']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']>['delete']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']>['delete']
        >[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<
              ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']>['delete']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']>['delete']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .webhooks(params)(params2)
          .messages(params3)
          .delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPatchWebhooksWebhookIdWebhookTokenMessagesMessageIdKey() {
  return [
    'webhooks',
    '/webhooks/{webhook_id}/{webhook_token}/messages/{message_id}',
    'PATCH',
  ] as const
}

export function usePatchWebhooksWebhookIdWebhookTokenMessagesMessageId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']>['patch']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.webhooks>[0],
  params2: Parameters<ReturnType<typeof client.webhooks>>[0],
  params3: Parameters<ReturnType<ReturnType<typeof client.webhooks>>['messages']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']>['patch']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<
          ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']>['patch']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']>['patch']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPatchWebhooksWebhookIdWebhookTokenMessagesMessageIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']>['patch']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<
          ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']>['patch']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']>['patch']
        >[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<
              ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']>['patch']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']>['patch']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .webhooks(params)(params2)
          .messages(params3)
          .patch(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostWebhooksWebhookIdWebhookTokenSlackKey() {
  return ['webhooks', '/webhooks/{webhook_id}/{webhook_token}/slack', 'POST'] as const
}

export function usePostWebhooksWebhookIdWebhookTokenSlack<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['slack']['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.webhooks>[0],
  params2: Parameters<ReturnType<typeof client.webhooks>>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['slack']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<ReturnType<typeof client.webhooks>>['slack']['post']>[0]
        options?: Parameters<ReturnType<ReturnType<typeof client.webhooks>>['slack']['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostWebhooksWebhookIdWebhookTokenSlackKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['slack']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<ReturnType<typeof client.webhooks>>['slack']['post']>[0]
        options?: Parameters<ReturnType<ReturnType<typeof client.webhooks>>['slack']['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<ReturnType<typeof client.webhooks>>['slack']['post']>[0]
            options?: Parameters<ReturnType<ReturnType<typeof client.webhooks>>['slack']['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client
          .webhooks(params)(params2)
          .slack.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}
