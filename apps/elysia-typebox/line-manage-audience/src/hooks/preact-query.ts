import {
  useQuery,
  useSuspenseQuery,
  useMutation,
  queryOptions,
  mutationOptions,
} from '@tanstack/preact-query'
import type {
  UseQueryOptions,
  UseSuspenseQueryOptions,
  UseMutationOptions,
  QueryClient,
} from '@tanstack/preact-query'
import { client } from '../lib'

export function getV2Key() {
  return ['v2'] as const
}

export function getPutV2BotAudienceGroupUploadMutationKey() {
  return ['v2', '/v2/bot/audienceGroup/upload', 'PUT'] as const
}

export function getPutV2BotAudienceGroupUploadMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.audienceGroup.upload.put>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.audienceGroup.upload.put>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<typeof client.v2.bot.audienceGroup.upload.put>[0]
      options?: Parameters<typeof client.v2.bot.audienceGroup.upload.put>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPutV2BotAudienceGroupUploadMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.v2.bot.audienceGroup.upload.put(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePutV2BotAudienceGroupUpload<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.audienceGroup.upload.put>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        Extract<
          Awaited<ReturnType<typeof client.v2.bot.audienceGroup.upload.put>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<typeof client.v2.bot.audienceGroup.upload.put>[0]
          options?: Parameters<typeof client.v2.bot.audienceGroup.upload.put>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPutV2BotAudienceGroupUploadMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPostV2BotAudienceGroupUploadMutationKey() {
  return ['v2', '/v2/bot/audienceGroup/upload', 'POST'] as const
}

export function getPostV2BotAudienceGroupUploadMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.audienceGroup.upload.post>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.audienceGroup.upload.post>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<typeof client.v2.bot.audienceGroup.upload.post>[0]
      options?: Parameters<typeof client.v2.bot.audienceGroup.upload.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostV2BotAudienceGroupUploadMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.v2.bot.audienceGroup.upload.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostV2BotAudienceGroupUpload<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.audienceGroup.upload.post>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        Extract<
          Awaited<ReturnType<typeof client.v2.bot.audienceGroup.upload.post>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<typeof client.v2.bot.audienceGroup.upload.post>[0]
          options?: Parameters<typeof client.v2.bot.audienceGroup.upload.post>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostV2BotAudienceGroupUploadMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPutV2BotAudienceGroupUploadByFileMutationKey() {
  return ['v2', '/v2/bot/audienceGroup/upload/byFile', 'PUT'] as const
}

export function getPutV2BotAudienceGroupUploadByFileMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.audienceGroup.upload.byFile.put>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.audienceGroup.upload.byFile.put>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<typeof client.v2.bot.audienceGroup.upload.byFile.put>[0]
      options?: Parameters<typeof client.v2.bot.audienceGroup.upload.byFile.put>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPutV2BotAudienceGroupUploadByFileMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.v2.bot.audienceGroup.upload.byFile.put(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePutV2BotAudienceGroupUploadByFile<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.audienceGroup.upload.byFile.put>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        Extract<
          Awaited<ReturnType<typeof client.v2.bot.audienceGroup.upload.byFile.put>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<typeof client.v2.bot.audienceGroup.upload.byFile.put>[0]
          options?: Parameters<typeof client.v2.bot.audienceGroup.upload.byFile.put>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPutV2BotAudienceGroupUploadByFileMutationOptions<
    TError,
    TOnMutateResult
  >()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPostV2BotAudienceGroupUploadByFileMutationKey() {
  return ['v2', '/v2/bot/audienceGroup/upload/byFile', 'POST'] as const
}

export function getPostV2BotAudienceGroupUploadByFileMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.audienceGroup.upload.byFile.post>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.audienceGroup.upload.byFile.post>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<typeof client.v2.bot.audienceGroup.upload.byFile.post>[0]
      options?: Parameters<typeof client.v2.bot.audienceGroup.upload.byFile.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostV2BotAudienceGroupUploadByFileMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.v2.bot.audienceGroup.upload.byFile.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostV2BotAudienceGroupUploadByFile<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.audienceGroup.upload.byFile.post>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        Extract<
          Awaited<ReturnType<typeof client.v2.bot.audienceGroup.upload.byFile.post>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<typeof client.v2.bot.audienceGroup.upload.byFile.post>[0]
          options?: Parameters<typeof client.v2.bot.audienceGroup.upload.byFile.post>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostV2BotAudienceGroupUploadByFileMutationOptions<
    TError,
    TOnMutateResult
  >()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPostV2BotAudienceGroupClickMutationKey() {
  return ['v2', '/v2/bot/audienceGroup/click', 'POST'] as const
}

export function getPostV2BotAudienceGroupClickMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.audienceGroup.click.post>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.audienceGroup.click.post>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<typeof client.v2.bot.audienceGroup.click.post>[0]
      options?: Parameters<typeof client.v2.bot.audienceGroup.click.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostV2BotAudienceGroupClickMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.v2.bot.audienceGroup.click.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostV2BotAudienceGroupClick<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.audienceGroup.click.post>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        Extract<
          Awaited<ReturnType<typeof client.v2.bot.audienceGroup.click.post>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<typeof client.v2.bot.audienceGroup.click.post>[0]
          options?: Parameters<typeof client.v2.bot.audienceGroup.click.post>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostV2BotAudienceGroupClickMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPostV2BotAudienceGroupImpMutationKey() {
  return ['v2', '/v2/bot/audienceGroup/imp', 'POST'] as const
}

export function getPostV2BotAudienceGroupImpMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.v2.bot.audienceGroup.imp.post>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.audienceGroup.imp.post>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<typeof client.v2.bot.audienceGroup.imp.post>[0]
      options?: Parameters<typeof client.v2.bot.audienceGroup.imp.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostV2BotAudienceGroupImpMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.v2.bot.audienceGroup.imp.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostV2BotAudienceGroupImp<
  TError = Exclude<Awaited<ReturnType<typeof client.v2.bot.audienceGroup.imp.post>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        Extract<
          Awaited<ReturnType<typeof client.v2.bot.audienceGroup.imp.post>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<typeof client.v2.bot.audienceGroup.imp.post>[0]
          options?: Parameters<typeof client.v2.bot.audienceGroup.imp.post>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostV2BotAudienceGroupImpMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPutV2BotAudienceGroupAudienceGroupIdUpdateDescriptionMutationKey() {
  return ['v2', '/v2/bot/audienceGroup/{audienceGroupId}/updateDescription', 'PUT'] as const
}

export function getPutV2BotAudienceGroupAudienceGroupIdUpdateDescriptionMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.v2.bot.audienceGroup>['updateDescription']['put']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: Parameters<typeof client.v2.bot.audienceGroup>[0]) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<ReturnType<typeof client.v2.bot.audienceGroup>['updateDescription']['put']>
      >,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<
        ReturnType<typeof client.v2.bot.audienceGroup>['updateDescription']['put']
      >[0]
      options?: Parameters<
        ReturnType<typeof client.v2.bot.audienceGroup>['updateDescription']['put']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPutV2BotAudienceGroupAudienceGroupIdUpdateDescriptionMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.v2.bot
        .audienceGroup(params)
        .updateDescription.put(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePutV2BotAudienceGroupAudienceGroupIdUpdateDescription<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.v2.bot.audienceGroup>['updateDescription']['put']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.v2.bot.audienceGroup>[0],
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        Extract<
          Awaited<
            ReturnType<ReturnType<typeof client.v2.bot.audienceGroup>['updateDescription']['put']>
          >,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<
            ReturnType<typeof client.v2.bot.audienceGroup>['updateDescription']['put']
          >[0]
          options?: Parameters<
            ReturnType<typeof client.v2.bot.audienceGroup>['updateDescription']['put']
          >[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPutV2BotAudienceGroupAudienceGroupIdUpdateDescriptionMutationOptions<
    TError,
    TOnMutateResult
  >(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getV2BotAudienceGroupAudienceGroupIdQueryKey(
  params: Parameters<typeof client.v2.bot.audienceGroup>[0],
) {
  return ['v2', '/v2/bot/audienceGroup/{audienceGroupId}', params] as const
}

export function getV2BotAudienceGroupAudienceGroupIdQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.audienceGroup>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.audienceGroup>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.v2.bot.audienceGroup>[0],
  options?: Parameters<ReturnType<typeof client.v2.bot.audienceGroup>['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.v2.bot.audienceGroup>['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getV2BotAudienceGroupAudienceGroupIdQueryKey>
  >({
    queryKey: getV2BotAudienceGroupAudienceGroupIdQueryKey(params),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.v2.bot
        .audienceGroup(params)
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function useV2BotAudienceGroupAudienceGroupId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.audienceGroup>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.audienceGroup>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.v2.bot.audienceGroup>[0],
  options?: {
    query?: Omit<
      UseQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.v2.bot.audienceGroup>['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getV2BotAudienceGroupAudienceGroupIdQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.v2.bot.audienceGroup>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...getV2BotAudienceGroupAudienceGroupIdQueryOptions<TData, TError>(params, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspenseV2BotAudienceGroupAudienceGroupId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.audienceGroup>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.audienceGroup>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.v2.bot.audienceGroup>[0],
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.v2.bot.audienceGroup>['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getV2BotAudienceGroupAudienceGroupIdQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.v2.bot.audienceGroup>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...getV2BotAudienceGroupAudienceGroupIdQueryOptions<TData, TError>(params, clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function getDeleteV2BotAudienceGroupAudienceGroupIdMutationKey() {
  return ['v2', '/v2/bot/audienceGroup/{audienceGroupId}', 'DELETE'] as const
}

export function getDeleteV2BotAudienceGroupAudienceGroupIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.audienceGroup>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: Parameters<typeof client.v2.bot.audienceGroup>[0]) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.v2.bot.audienceGroup>['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<typeof client.v2.bot.audienceGroup>['delete']>[0]
      options?: Parameters<ReturnType<typeof client.v2.bot.audienceGroup>['delete']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteV2BotAudienceGroupAudienceGroupIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.v2.bot.audienceGroup(params).delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeleteV2BotAudienceGroupAudienceGroupId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.audienceGroup>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.v2.bot.audienceGroup>[0],
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.v2.bot.audienceGroup>['delete']>>,
          { error: null }
        >['data'],
        TError,
        {
          body?: Parameters<ReturnType<typeof client.v2.bot.audienceGroup>['delete']>[0]
          options?: Parameters<ReturnType<typeof client.v2.bot.audienceGroup>['delete']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteV2BotAudienceGroupAudienceGroupIdMutationOptions<
    TError,
    TOnMutateResult
  >(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getV2BotAudienceGroupListQueryKey(
  options: Parameters<typeof client.v2.bot.audienceGroup.list.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['v2', '/v2/bot/audienceGroup/list', keyArgs] as const
}

export function getV2BotAudienceGroupListQueryOptions<
  TData = Extract<
    Awaited<ReturnType<typeof client.v2.bot.audienceGroup.list.get>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.v2.bot.audienceGroup.list.get>>['error'], null>,
>(options: Parameters<typeof client.v2.bot.audienceGroup.list.get>[0]) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.audienceGroup.list.get>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getV2BotAudienceGroupListQueryKey>
  >({
    queryKey: getV2BotAudienceGroupListQueryKey(options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.v2.bot.audienceGroup.list.get({
        ...options,
        fetch: { ...options.fetch, signal },
      })
      if (error) throw error
      return data
    },
  })
}

export function useV2BotAudienceGroupList<
  TData = Extract<
    Awaited<ReturnType<typeof client.v2.bot.audienceGroup.list.get>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.v2.bot.audienceGroup.list.get>>['error'], null>,
>(
  options: {
    query?: Omit<
      UseQueryOptions<
        Extract<
          Awaited<ReturnType<typeof client.v2.bot.audienceGroup.list.get>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getV2BotAudienceGroupListQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.v2.bot.audienceGroup.list.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options
  return useQuery(
    { ...getV2BotAudienceGroupListQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
}

export function useSuspenseV2BotAudienceGroupList<
  TData = Extract<
    Awaited<ReturnType<typeof client.v2.bot.audienceGroup.list.get>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.v2.bot.audienceGroup.list.get>>['error'], null>,
>(
  options: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Extract<
          Awaited<ReturnType<typeof client.v2.bot.audienceGroup.list.get>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getV2BotAudienceGroupListQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.v2.bot.audienceGroup.list.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options
  return useSuspenseQuery(
    { ...getV2BotAudienceGroupListQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
}

export function getV2BotAudienceGroupSharedAudienceGroupIdQueryKey(
  params: Parameters<typeof client.v2.bot.audienceGroup.shared>[0],
) {
  return ['v2', '/v2/bot/audienceGroup/shared/{audienceGroupId}', params] as const
}

export function getV2BotAudienceGroupSharedAudienceGroupIdQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.audienceGroup.shared>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.audienceGroup.shared>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.v2.bot.audienceGroup.shared>[0],
  options?: Parameters<ReturnType<typeof client.v2.bot.audienceGroup.shared>['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.v2.bot.audienceGroup.shared>['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getV2BotAudienceGroupSharedAudienceGroupIdQueryKey>
  >({
    queryKey: getV2BotAudienceGroupSharedAudienceGroupIdQueryKey(params),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.v2.bot.audienceGroup
        .shared(params)
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function useV2BotAudienceGroupSharedAudienceGroupId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.audienceGroup.shared>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.audienceGroup.shared>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.v2.bot.audienceGroup.shared>[0],
  options?: {
    query?: Omit<
      UseQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.v2.bot.audienceGroup.shared>['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getV2BotAudienceGroupSharedAudienceGroupIdQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.v2.bot.audienceGroup.shared>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...getV2BotAudienceGroupSharedAudienceGroupIdQueryOptions<TData, TError>(
        params,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspenseV2BotAudienceGroupSharedAudienceGroupId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.audienceGroup.shared>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.audienceGroup.shared>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.v2.bot.audienceGroup.shared>[0],
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.v2.bot.audienceGroup.shared>['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getV2BotAudienceGroupSharedAudienceGroupIdQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.v2.bot.audienceGroup.shared>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    {
      ...getV2BotAudienceGroupSharedAudienceGroupIdQueryOptions<TData, TError>(
        params,
        clientOptions,
      ),
      ...queryOptions,
    },
    queryClient,
  )
}

export function getV2BotAudienceGroupSharedListQueryKey(
  options: Parameters<typeof client.v2.bot.audienceGroup.shared.list.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['v2', '/v2/bot/audienceGroup/shared/list', keyArgs] as const
}

export function getV2BotAudienceGroupSharedListQueryOptions<
  TData = Extract<
    Awaited<ReturnType<typeof client.v2.bot.audienceGroup.shared.list.get>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.audienceGroup.shared.list.get>>['error'],
    null
  >,
>(options: Parameters<typeof client.v2.bot.audienceGroup.shared.list.get>[0]) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.audienceGroup.shared.list.get>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getV2BotAudienceGroupSharedListQueryKey>
  >({
    queryKey: getV2BotAudienceGroupSharedListQueryKey(options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.v2.bot.audienceGroup.shared.list.get({
        ...options,
        fetch: { ...options.fetch, signal },
      })
      if (error) throw error
      return data
    },
  })
}

export function useV2BotAudienceGroupSharedList<
  TData = Extract<
    Awaited<ReturnType<typeof client.v2.bot.audienceGroup.shared.list.get>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.audienceGroup.shared.list.get>>['error'],
    null
  >,
>(
  options: {
    query?: Omit<
      UseQueryOptions<
        Extract<
          Awaited<ReturnType<typeof client.v2.bot.audienceGroup.shared.list.get>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getV2BotAudienceGroupSharedListQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.v2.bot.audienceGroup.shared.list.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options
  return useQuery(
    {
      ...getV2BotAudienceGroupSharedListQueryOptions<TData, TError>(clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}

export function useSuspenseV2BotAudienceGroupSharedList<
  TData = Extract<
    Awaited<ReturnType<typeof client.v2.bot.audienceGroup.shared.list.get>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.audienceGroup.shared.list.get>>['error'],
    null
  >,
>(
  options: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Extract<
          Awaited<ReturnType<typeof client.v2.bot.audienceGroup.shared.list.get>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getV2BotAudienceGroupSharedListQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.v2.bot.audienceGroup.shared.list.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options
  return useSuspenseQuery(
    {
      ...getV2BotAudienceGroupSharedListQueryOptions<TData, TError>(clientOptions),
      ...queryOptions,
    },
    queryClient,
  )
}
