import useSWR from 'swr'
import useSWRImmutable from 'swr/immutable'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import { client } from '../lib'

export function getV2Key() {
  return ['v2'] as const
}

export function getPutV2BotAudienceGroupUploadKey() {
  return ['v2', '/v2/bot/audienceGroup/upload', 'PUT'] as const
}

export function usePutV2BotAudienceGroupUpload<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.audienceGroup.upload.put>>['error'],
    null
  >,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.audienceGroup.upload.put>>,
      { error: null }
    >['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.v2.bot.audienceGroup.upload.put>[0]
      options?: Parameters<typeof client.v2.bot.audienceGroup.upload.put>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutV2BotAudienceGroupUploadKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<typeof client.v2.bot.audienceGroup.upload.put>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.v2.bot.audienceGroup.upload.put>[0]
        options?: Parameters<typeof client.v2.bot.audienceGroup.upload.put>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.v2.bot.audienceGroup.upload.put>[0]
            options?: Parameters<typeof client.v2.bot.audienceGroup.upload.put>[1]
          }
        },
      ) => {
        const { data, error } = await client.v2.bot.audienceGroup.upload.put(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostV2BotAudienceGroupUploadKey() {
  return ['v2', '/v2/bot/audienceGroup/upload', 'POST'] as const
}

export function usePostV2BotAudienceGroupUpload<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.audienceGroup.upload.post>>['error'],
    null
  >,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.audienceGroup.upload.post>>,
      { error: null }
    >['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.v2.bot.audienceGroup.upload.post>[0]
      options?: Parameters<typeof client.v2.bot.audienceGroup.upload.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostV2BotAudienceGroupUploadKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<typeof client.v2.bot.audienceGroup.upload.post>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.v2.bot.audienceGroup.upload.post>[0]
        options?: Parameters<typeof client.v2.bot.audienceGroup.upload.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.v2.bot.audienceGroup.upload.post>[0]
            options?: Parameters<typeof client.v2.bot.audienceGroup.upload.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.v2.bot.audienceGroup.upload.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPutV2BotAudienceGroupUploadByFileKey() {
  return ['v2', '/v2/bot/audienceGroup/upload/byFile', 'PUT'] as const
}

export function usePutV2BotAudienceGroupUploadByFile<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.audienceGroup.upload.byFile.put>>['error'],
    null
  >,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.audienceGroup.upload.byFile.put>>,
      { error: null }
    >['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.v2.bot.audienceGroup.upload.byFile.put>[0]
      options?: Parameters<typeof client.v2.bot.audienceGroup.upload.byFile.put>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutV2BotAudienceGroupUploadByFileKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<typeof client.v2.bot.audienceGroup.upload.byFile.put>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.v2.bot.audienceGroup.upload.byFile.put>[0]
        options?: Parameters<typeof client.v2.bot.audienceGroup.upload.byFile.put>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.v2.bot.audienceGroup.upload.byFile.put>[0]
            options?: Parameters<typeof client.v2.bot.audienceGroup.upload.byFile.put>[1]
          }
        },
      ) => {
        const { data, error } = await client.v2.bot.audienceGroup.upload.byFile.put(
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

export function getPostV2BotAudienceGroupUploadByFileKey() {
  return ['v2', '/v2/bot/audienceGroup/upload/byFile', 'POST'] as const
}

export function usePostV2BotAudienceGroupUploadByFile<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.audienceGroup.upload.byFile.post>>['error'],
    null
  >,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.audienceGroup.upload.byFile.post>>,
      { error: null }
    >['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.v2.bot.audienceGroup.upload.byFile.post>[0]
      options?: Parameters<typeof client.v2.bot.audienceGroup.upload.byFile.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostV2BotAudienceGroupUploadByFileKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<typeof client.v2.bot.audienceGroup.upload.byFile.post>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.v2.bot.audienceGroup.upload.byFile.post>[0]
        options?: Parameters<typeof client.v2.bot.audienceGroup.upload.byFile.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.v2.bot.audienceGroup.upload.byFile.post>[0]
            options?: Parameters<typeof client.v2.bot.audienceGroup.upload.byFile.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.v2.bot.audienceGroup.upload.byFile.post(
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

export function getPostV2BotAudienceGroupClickKey() {
  return ['v2', '/v2/bot/audienceGroup/click', 'POST'] as const
}

export function usePostV2BotAudienceGroupClick<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.audienceGroup.click.post>>['error'],
    null
  >,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.audienceGroup.click.post>>,
      { error: null }
    >['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.v2.bot.audienceGroup.click.post>[0]
      options?: Parameters<typeof client.v2.bot.audienceGroup.click.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostV2BotAudienceGroupClickKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<typeof client.v2.bot.audienceGroup.click.post>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.v2.bot.audienceGroup.click.post>[0]
        options?: Parameters<typeof client.v2.bot.audienceGroup.click.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.v2.bot.audienceGroup.click.post>[0]
            options?: Parameters<typeof client.v2.bot.audienceGroup.click.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.v2.bot.audienceGroup.click.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostV2BotAudienceGroupImpKey() {
  return ['v2', '/v2/bot/audienceGroup/imp', 'POST'] as const
}

export function usePostV2BotAudienceGroupImp<
  TError = Exclude<Awaited<ReturnType<typeof client.v2.bot.audienceGroup.imp.post>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.audienceGroup.imp.post>>,
      { error: null }
    >['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.v2.bot.audienceGroup.imp.post>[0]
      options?: Parameters<typeof client.v2.bot.audienceGroup.imp.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostV2BotAudienceGroupImpKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<typeof client.v2.bot.audienceGroup.imp.post>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.v2.bot.audienceGroup.imp.post>[0]
        options?: Parameters<typeof client.v2.bot.audienceGroup.imp.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.v2.bot.audienceGroup.imp.post>[0]
            options?: Parameters<typeof client.v2.bot.audienceGroup.imp.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.v2.bot.audienceGroup.imp.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPutV2BotAudienceGroupAudienceGroupIdUpdateDescriptionKey() {
  return ['v2', '/v2/bot/audienceGroup/{audienceGroupId}/updateDescription', 'PUT'] as const
}

export function usePutV2BotAudienceGroupAudienceGroupIdUpdateDescription<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.v2.bot.audienceGroup>['updateDescription']['put']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.v2.bot.audienceGroup>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<typeof client.v2.bot.audienceGroup>['updateDescription']['put']>
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<
          ReturnType<typeof client.v2.bot.audienceGroup>['updateDescription']['put']
        >[0]
        options?: Parameters<
          ReturnType<typeof client.v2.bot.audienceGroup>['updateDescription']['put']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutV2BotAudienceGroupAudienceGroupIdUpdateDescriptionKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<ReturnType<typeof client.v2.bot.audienceGroup>['updateDescription']['put']>
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<
          ReturnType<typeof client.v2.bot.audienceGroup>['updateDescription']['put']
        >[0]
        options?: Parameters<
          ReturnType<typeof client.v2.bot.audienceGroup>['updateDescription']['put']
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
              ReturnType<typeof client.v2.bot.audienceGroup>['updateDescription']['put']
            >[0]
            options?: Parameters<
              ReturnType<typeof client.v2.bot.audienceGroup>['updateDescription']['put']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client.v2.bot
          .audienceGroup(params)
          .updateDescription.put(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetV2BotAudienceGroupAudienceGroupIdKey(
  params: Parameters<typeof client.v2.bot.audienceGroup>[0],
) {
  return ['v2', '/v2/bot/audienceGroup/{audienceGroupId}', params] as const
}

export function useGetV2BotAudienceGroupAudienceGroupId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.audienceGroup>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.v2.bot.audienceGroup>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.audienceGroup>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.v2.bot.audienceGroup>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotAudienceGroupAudienceGroupIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.audienceGroup>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.audienceGroup(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetV2BotAudienceGroupAudienceGroupId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.audienceGroup>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.v2.bot.audienceGroup>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.audienceGroup>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.v2.bot.audienceGroup>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotAudienceGroupAudienceGroupIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.audienceGroup>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.audienceGroup(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getDeleteV2BotAudienceGroupAudienceGroupIdKey() {
  return ['v2', '/v2/bot/audienceGroup/{audienceGroupId}', 'DELETE'] as const
}

export function useDeleteV2BotAudienceGroupAudienceGroupId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.audienceGroup>['delete']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.v2.bot.audienceGroup>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.audienceGroup>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.v2.bot.audienceGroup>['delete']>[0]
        options?: Parameters<ReturnType<typeof client.v2.bot.audienceGroup>['delete']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteV2BotAudienceGroupAudienceGroupIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.audienceGroup>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.v2.bot.audienceGroup>['delete']>[0]
        options?: Parameters<ReturnType<typeof client.v2.bot.audienceGroup>['delete']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<ReturnType<typeof client.v2.bot.audienceGroup>['delete']>[0]
            options?: Parameters<ReturnType<typeof client.v2.bot.audienceGroup>['delete']>[1]
          }
        },
      ) => {
        const { data, error } = await client.v2.bot
          .audienceGroup(params)
          .delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetV2BotAudienceGroupListKey(
  options: Parameters<typeof client.v2.bot.audienceGroup.list.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['v2', '/v2/bot/audienceGroup/list', keyArgs] as const
}

export function useGetV2BotAudienceGroupList<
  TError = Exclude<Awaited<ReturnType<typeof client.v2.bot.audienceGroup.list.get>>['error'], null>,
>(options: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.audienceGroup.list.get>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options: Parameters<typeof client.v2.bot.audienceGroup.list.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotAudienceGroupListKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<typeof client.v2.bot.audienceGroup.list.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.audienceGroup.list.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetV2BotAudienceGroupList<
  TError = Exclude<Awaited<ReturnType<typeof client.v2.bot.audienceGroup.list.get>>['error'], null>,
>(options: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.audienceGroup.list.get>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options: Parameters<typeof client.v2.bot.audienceGroup.list.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotAudienceGroupListKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<typeof client.v2.bot.audienceGroup.list.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.audienceGroup.list.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetV2BotAudienceGroupSharedAudienceGroupIdKey(
  params: Parameters<typeof client.v2.bot.audienceGroup.shared>[0],
) {
  return ['v2', '/v2/bot/audienceGroup/shared/{audienceGroupId}', params] as const
}

export function useGetV2BotAudienceGroupSharedAudienceGroupId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.audienceGroup.shared>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.v2.bot.audienceGroup.shared>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.audienceGroup.shared>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.v2.bot.audienceGroup.shared>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotAudienceGroupSharedAudienceGroupIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.audienceGroup.shared>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.audienceGroup.shared(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetV2BotAudienceGroupSharedAudienceGroupId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.audienceGroup.shared>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.v2.bot.audienceGroup.shared>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.audienceGroup.shared>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.v2.bot.audienceGroup.shared>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotAudienceGroupSharedAudienceGroupIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.audienceGroup.shared>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.audienceGroup.shared(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetV2BotAudienceGroupSharedListKey(
  options: Parameters<typeof client.v2.bot.audienceGroup.shared.list.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['v2', '/v2/bot/audienceGroup/shared/list', keyArgs] as const
}

export function useGetV2BotAudienceGroupSharedList<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.audienceGroup.shared.list.get>>['error'],
    null
  >,
>(options: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.audienceGroup.shared.list.get>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options: Parameters<typeof client.v2.bot.audienceGroup.shared.list.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotAudienceGroupSharedListKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<typeof client.v2.bot.audienceGroup.shared.list.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.audienceGroup.shared.list.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetV2BotAudienceGroupSharedList<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.audienceGroup.shared.list.get>>['error'],
    null
  >,
>(options: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.audienceGroup.shared.list.get>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options: Parameters<typeof client.v2.bot.audienceGroup.shared.list.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotAudienceGroupSharedListKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<typeof client.v2.bot.audienceGroup.shared.list.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.audienceGroup.shared.list.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}
