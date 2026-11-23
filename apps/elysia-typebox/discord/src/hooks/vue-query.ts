import { useQuery, useMutation, mutationOptions } from '@tanstack/vue-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseMutationOptions,
  QueryClient,
} from '@tanstack/vue-query'
import { computed, toValue } from 'vue'
import type { MaybeRefOrGetter } from 'vue'
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

export function getApplicationsMeQueryKey() {
  return ['applications', '/applications/@me'] as const
}

export function getApplicationsMeQueryOptions(
  options?: Parameters<(typeof client.applications)['@me']['get']>[0],
) {
  return {
    queryKey: getApplicationsMeQueryKey(),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.applications['@me'].get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useApplicationsMe<
  TData = Extract<
    Awaited<ReturnType<(typeof client.applications)['@me']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<(typeof client.applications)['@me']['get']>>['error'], null>,
>(
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<(typeof client.applications)['@me']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<(typeof client.applications)['@me']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getApplicationsMeQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<(typeof client.applications)['@me']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: getApplicationsMeQueryKey(),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.applications['@me'].get({
          ...clientOptions,
          fetch: { ...clientOptions?.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPatchApplicationsMeMutationKey() {
  return ['applications', '/applications/@me', 'PATCH'] as const
}

export function getPatchApplicationsMeMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<(typeof client.applications)['@me']['patch']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<(typeof client.applications)['@me']['patch']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<(typeof client.applications)['@me']['patch']>[0]
      options?: Parameters<(typeof client.applications)['@me']['patch']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPatchApplicationsMeMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.applications['@me'].patch(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePatchApplicationsMe<
  TError = Exclude<
    Awaited<ReturnType<(typeof client.applications)['@me']['patch']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<(typeof client.applications)['@me']['patch']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<(typeof client.applications)['@me']['patch']>[0]
            options?: Parameters<(typeof client.applications)['@me']['patch']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPatchApplicationsMeMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getApplicationsApplicationIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.applications>[0]>,
) {
  return ['applications', '/applications/{application_id}', toValue(params)] as const
}

export function getApplicationsApplicationIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.applications>[0]>,
  options?: Parameters<ReturnType<typeof client.applications>['get']>[0],
) {
  return {
    queryKey: computed(() => getApplicationsApplicationIdQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .applications(toValue(params))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useApplicationsApplicationId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.applications>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.applications>['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.applications>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.applications>['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.applications>['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getApplicationsApplicationIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.applications>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getApplicationsApplicationIdQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .applications(toValue(params))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPatchApplicationsApplicationIdMutationKey() {
  return ['applications', '/applications/{application_id}', 'PATCH'] as const
}

export function getPatchApplicationsApplicationIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.applications>['patch']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.applications>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.applications>['patch']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.applications>['patch']>[0]
      options?: Parameters<ReturnType<typeof client.applications>['patch']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPatchApplicationsApplicationIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.applications(toValue(params)).patch(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePatchApplicationsApplicationId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.applications>['patch']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.applications>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.applications>['patch']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.applications>['patch']>[0]
            options?: Parameters<ReturnType<typeof client.applications>['patch']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPatchApplicationsApplicationIdMutationOptions<
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

export function getApplicationsApplicationIdActivityInstancesInstanceIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.applications>[0]>,
  params2: MaybeRefOrGetter<
    Parameters<ReturnType<typeof client.applications>['activity-instances']>[0]
  >,
) {
  return [
    'applications',
    '/applications/{application_id}/activity-instances/{instance_id}',
    toValue(params),
    toValue(params2),
  ] as const
}

export function getApplicationsApplicationIdActivityInstancesInstanceIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.applications>[0]>,
  params2: MaybeRefOrGetter<
    Parameters<ReturnType<typeof client.applications>['activity-instances']>[0]
  >,
  options?: Parameters<
    ReturnType<ReturnType<typeof client.applications>['activity-instances']>['get']
  >[0],
) {
  return {
    queryKey: computed(() =>
      getApplicationsApplicationIdActivityInstancesInstanceIdQueryKey(params, params2),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .applications(toValue(params))
        ['activity-instances'](toValue(params2))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useApplicationsApplicationIdActivityInstancesInstanceId<
  TData = Extract<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.applications>['activity-instances']>['get']>
    >,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.applications>['activity-instances']>['get']>
    >['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.applications>[0]>,
  params2: MaybeRefOrGetter<
    Parameters<ReturnType<typeof client.applications>['activity-instances']>[0]
  >,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<
              ReturnType<
                ReturnType<ReturnType<typeof client.applications>['activity-instances']>['get']
              >
            >,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<
              ReturnType<
                ReturnType<ReturnType<typeof client.applications>['activity-instances']>['get']
              >
            >,
            { error: null }
          >['data'],
          ReturnType<typeof getApplicationsApplicationIdActivityInstancesInstanceIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<
      ReturnType<ReturnType<typeof client.applications>['activity-instances']>['get']
    >[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() =>
        getApplicationsApplicationIdActivityInstancesInstanceIdQueryKey(params, params2),
      ),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .applications(toValue(params))
          ['activity-instances'](toValue(params2))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostApplicationsApplicationIdAttachmentMutationKey() {
  return ['applications', '/applications/{application_id}/attachment', 'POST'] as const
}

export function getPostApplicationsApplicationIdAttachmentMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.applications>['attachment']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.applications>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.applications>['attachment']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.applications>['attachment']['post']>[0]
      options?: Parameters<ReturnType<typeof client.applications>['attachment']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostApplicationsApplicationIdAttachmentMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .applications(toValue(params))
        .attachment.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostApplicationsApplicationIdAttachment<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.applications>['attachment']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.applications>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.applications>['attachment']['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.applications>['attachment']['post']>[0]
            options?: Parameters<ReturnType<typeof client.applications>['attachment']['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostApplicationsApplicationIdAttachmentMutationOptions<
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

export function getApplicationsApplicationIdCommandsQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.applications>[0]>,
  options?: Parameters<ReturnType<typeof client.applications>['commands']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'applications',
    '/applications/{application_id}/commands',
    toValue(params),
    keyArgs,
  ] as const
}

export function getApplicationsApplicationIdCommandsQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.applications>[0]>,
  options?: Parameters<ReturnType<typeof client.applications>['commands']['get']>[0],
) {
  return {
    queryKey: computed(() => getApplicationsApplicationIdCommandsQueryKey(params, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .applications(toValue(params))
        .commands.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useApplicationsApplicationIdCommands<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.applications>['commands']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.applications>['commands']['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.applications>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.applications>['commands']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.applications>['commands']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getApplicationsApplicationIdCommandsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.applications>['commands']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getApplicationsApplicationIdCommandsQueryKey(params, clientOptions)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .applications(toValue(params))
          .commands.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPutApplicationsApplicationIdCommandsMutationKey() {
  return ['applications', '/applications/{application_id}/commands', 'PUT'] as const
}

export function getPutApplicationsApplicationIdCommandsMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.applications>['commands']['put']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.applications>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.applications>['commands']['put']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.applications>['commands']['put']>[0]
      options?: Parameters<ReturnType<typeof client.applications>['commands']['put']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPutApplicationsApplicationIdCommandsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.applications(toValue(params)).commands.put(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePutApplicationsApplicationIdCommands<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.applications>['commands']['put']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.applications>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.applications>['commands']['put']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.applications>['commands']['put']>[0]
            options?: Parameters<ReturnType<typeof client.applications>['commands']['put']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPutApplicationsApplicationIdCommandsMutationOptions<
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

export function getPostApplicationsApplicationIdCommandsMutationKey() {
  return ['applications', '/applications/{application_id}/commands', 'POST'] as const
}

export function getPostApplicationsApplicationIdCommandsMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.applications>['commands']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.applications>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.applications>['commands']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.applications>['commands']['post']>[0]
      options?: Parameters<ReturnType<typeof client.applications>['commands']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostApplicationsApplicationIdCommandsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .applications(toValue(params))
        .commands.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostApplicationsApplicationIdCommands<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.applications>['commands']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.applications>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.applications>['commands']['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.applications>['commands']['post']>[0]
            options?: Parameters<ReturnType<typeof client.applications>['commands']['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostApplicationsApplicationIdCommandsMutationOptions<
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

export function getApplicationsApplicationIdCommandsCommandIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.applications>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.applications>['commands']>[0]>,
) {
  return [
    'applications',
    '/applications/{application_id}/commands/{command_id}',
    toValue(params),
    toValue(params2),
  ] as const
}

export function getApplicationsApplicationIdCommandsCommandIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.applications>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.applications>['commands']>[0]>,
  options?: Parameters<ReturnType<ReturnType<typeof client.applications>['commands']>['get']>[0],
) {
  return {
    queryKey: computed(() =>
      getApplicationsApplicationIdCommandsCommandIdQueryKey(params, params2),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .applications(toValue(params))
        .commands(toValue(params2))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useApplicationsApplicationIdCommandsCommandId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.applications>['commands']>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.applications>['commands']>['get']>
    >['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.applications>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.applications>['commands']>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<
              ReturnType<ReturnType<ReturnType<typeof client.applications>['commands']>['get']>
            >,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<
              ReturnType<ReturnType<ReturnType<typeof client.applications>['commands']>['get']>
            >,
            { error: null }
          >['data'],
          ReturnType<typeof getApplicationsApplicationIdCommandsCommandIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<ReturnType<typeof client.applications>['commands']>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() =>
        getApplicationsApplicationIdCommandsCommandIdQueryKey(params, params2),
      ),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .applications(toValue(params))
          .commands(toValue(params2))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getDeleteApplicationsApplicationIdCommandsCommandIdMutationKey() {
  return ['applications', '/applications/{application_id}/commands/{command_id}', 'DELETE'] as const
}

export function getDeleteApplicationsApplicationIdCommandsCommandIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.applications>['commands']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.applications>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.applications>['commands']>[0]>,
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.applications>['commands']>['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<ReturnType<typeof client.applications>['commands']>['delete']>[0]
      options?: Parameters<
        ReturnType<ReturnType<typeof client.applications>['commands']>['delete']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteApplicationsApplicationIdCommandsCommandIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .applications(toValue(params))
        .commands(toValue(params2))
        .delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeleteApplicationsApplicationIdCommandsCommandId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.applications>['commands']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.applications>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.applications>['commands']>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<ReturnType<ReturnType<typeof client.applications>['commands']>['delete']>
            >,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<
              ReturnType<ReturnType<typeof client.applications>['commands']>['delete']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.applications>['commands']>['delete']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteApplicationsApplicationIdCommandsCommandIdMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPatchApplicationsApplicationIdCommandsCommandIdMutationKey() {
  return ['applications', '/applications/{application_id}/commands/{command_id}', 'PATCH'] as const
}

export function getPatchApplicationsApplicationIdCommandsCommandIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.applications>['commands']>['patch']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.applications>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.applications>['commands']>[0]>,
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.applications>['commands']>['patch']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<ReturnType<typeof client.applications>['commands']>['patch']>[0]
      options?: Parameters<
        ReturnType<ReturnType<typeof client.applications>['commands']>['patch']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPatchApplicationsApplicationIdCommandsCommandIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .applications(toValue(params))
        .commands(toValue(params2))
        .patch(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePatchApplicationsApplicationIdCommandsCommandId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.applications>['commands']>['patch']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.applications>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.applications>['commands']>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<ReturnType<ReturnType<typeof client.applications>['commands']>['patch']>
            >,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<
              ReturnType<ReturnType<typeof client.applications>['commands']>['patch']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.applications>['commands']>['patch']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPatchApplicationsApplicationIdCommandsCommandIdMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getApplicationsApplicationIdEmojisQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.applications>[0]>,
) {
  return ['applications', '/applications/{application_id}/emojis', toValue(params)] as const
}

export function getApplicationsApplicationIdEmojisQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.applications>[0]>,
  options?: Parameters<ReturnType<typeof client.applications>['emojis']['get']>[0],
) {
  return {
    queryKey: computed(() => getApplicationsApplicationIdEmojisQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .applications(toValue(params))
        .emojis.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useApplicationsApplicationIdEmojis<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.applications>['emojis']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.applications>['emojis']['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.applications>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.applications>['emojis']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.applications>['emojis']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getApplicationsApplicationIdEmojisQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.applications>['emojis']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getApplicationsApplicationIdEmojisQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .applications(toValue(params))
          .emojis.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostApplicationsApplicationIdEmojisMutationKey() {
  return ['applications', '/applications/{application_id}/emojis', 'POST'] as const
}

export function getPostApplicationsApplicationIdEmojisMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.applications>['emojis']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.applications>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.applications>['emojis']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.applications>['emojis']['post']>[0]
      options?: Parameters<ReturnType<typeof client.applications>['emojis']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostApplicationsApplicationIdEmojisMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.applications(toValue(params)).emojis.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostApplicationsApplicationIdEmojis<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.applications>['emojis']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.applications>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.applications>['emojis']['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.applications>['emojis']['post']>[0]
            options?: Parameters<ReturnType<typeof client.applications>['emojis']['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostApplicationsApplicationIdEmojisMutationOptions<
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

export function getApplicationsApplicationIdEmojisEmojiIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.applications>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.applications>['emojis']>[0]>,
) {
  return [
    'applications',
    '/applications/{application_id}/emojis/{emoji_id}',
    toValue(params),
    toValue(params2),
  ] as const
}

export function getApplicationsApplicationIdEmojisEmojiIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.applications>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.applications>['emojis']>[0]>,
  options?: Parameters<ReturnType<ReturnType<typeof client.applications>['emojis']>['get']>[0],
) {
  return {
    queryKey: computed(() => getApplicationsApplicationIdEmojisEmojiIdQueryKey(params, params2)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .applications(toValue(params))
        .emojis(toValue(params2))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useApplicationsApplicationIdEmojisEmojiId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.applications>['emojis']>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.applications>['emojis']>['get']>
    >['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.applications>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.applications>['emojis']>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<
              ReturnType<ReturnType<ReturnType<typeof client.applications>['emojis']>['get']>
            >,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<
              ReturnType<ReturnType<ReturnType<typeof client.applications>['emojis']>['get']>
            >,
            { error: null }
          >['data'],
          ReturnType<typeof getApplicationsApplicationIdEmojisEmojiIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<ReturnType<typeof client.applications>['emojis']>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getApplicationsApplicationIdEmojisEmojiIdQueryKey(params, params2)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .applications(toValue(params))
          .emojis(toValue(params2))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getDeleteApplicationsApplicationIdEmojisEmojiIdMutationKey() {
  return ['applications', '/applications/{application_id}/emojis/{emoji_id}', 'DELETE'] as const
}

export function getDeleteApplicationsApplicationIdEmojisEmojiIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.applications>['emojis']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.applications>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.applications>['emojis']>[0]>,
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.applications>['emojis']>['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<ReturnType<typeof client.applications>['emojis']>['delete']>[0]
      options?: Parameters<
        ReturnType<ReturnType<typeof client.applications>['emojis']>['delete']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteApplicationsApplicationIdEmojisEmojiIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .applications(toValue(params))
        .emojis(toValue(params2))
        .delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeleteApplicationsApplicationIdEmojisEmojiId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.applications>['emojis']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.applications>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.applications>['emojis']>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<ReturnType<ReturnType<typeof client.applications>['emojis']>['delete']>
            >,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<
              ReturnType<ReturnType<typeof client.applications>['emojis']>['delete']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.applications>['emojis']>['delete']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteApplicationsApplicationIdEmojisEmojiIdMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPatchApplicationsApplicationIdEmojisEmojiIdMutationKey() {
  return ['applications', '/applications/{application_id}/emojis/{emoji_id}', 'PATCH'] as const
}

export function getPatchApplicationsApplicationIdEmojisEmojiIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.applications>['emojis']>['patch']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.applications>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.applications>['emojis']>[0]>,
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.applications>['emojis']>['patch']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<ReturnType<typeof client.applications>['emojis']>['patch']>[0]
      options?: Parameters<ReturnType<ReturnType<typeof client.applications>['emojis']>['patch']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPatchApplicationsApplicationIdEmojisEmojiIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .applications(toValue(params))
        .emojis(toValue(params2))
        .patch(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePatchApplicationsApplicationIdEmojisEmojiId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.applications>['emojis']>['patch']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.applications>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.applications>['emojis']>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<ReturnType<ReturnType<typeof client.applications>['emojis']>['patch']>
            >,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<
              ReturnType<ReturnType<typeof client.applications>['emojis']>['patch']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.applications>['emojis']>['patch']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPatchApplicationsApplicationIdEmojisEmojiIdMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getApplicationsApplicationIdEntitlementsQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.applications>[0]>,
  options?: Parameters<ReturnType<typeof client.applications>['entitlements']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'applications',
    '/applications/{application_id}/entitlements',
    toValue(params),
    keyArgs,
  ] as const
}

export function getApplicationsApplicationIdEntitlementsQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.applications>[0]>,
  options?: Parameters<ReturnType<typeof client.applications>['entitlements']['get']>[0],
) {
  return {
    queryKey: computed(() => getApplicationsApplicationIdEntitlementsQueryKey(params, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .applications(toValue(params))
        .entitlements.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useApplicationsApplicationIdEntitlements<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.applications>['entitlements']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.applications>['entitlements']['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.applications>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.applications>['entitlements']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.applications>['entitlements']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getApplicationsApplicationIdEntitlementsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.applications>['entitlements']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() =>
        getApplicationsApplicationIdEntitlementsQueryKey(params, clientOptions),
      ),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .applications(toValue(params))
          .entitlements.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostApplicationsApplicationIdEntitlementsMutationKey() {
  return ['applications', '/applications/{application_id}/entitlements', 'POST'] as const
}

export function getPostApplicationsApplicationIdEntitlementsMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.applications>['entitlements']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.applications>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.applications>['entitlements']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.applications>['entitlements']['post']>[0]
      options?: Parameters<ReturnType<typeof client.applications>['entitlements']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostApplicationsApplicationIdEntitlementsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .applications(toValue(params))
        .entitlements.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostApplicationsApplicationIdEntitlements<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.applications>['entitlements']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.applications>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.applications>['entitlements']['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.applications>['entitlements']['post']>[0]
            options?: Parameters<ReturnType<typeof client.applications>['entitlements']['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostApplicationsApplicationIdEntitlementsMutationOptions<
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

export function getApplicationsApplicationIdEntitlementsEntitlementIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.applications>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.applications>['entitlements']>[0]>,
) {
  return [
    'applications',
    '/applications/{application_id}/entitlements/{entitlement_id}',
    toValue(params),
    toValue(params2),
  ] as const
}

export function getApplicationsApplicationIdEntitlementsEntitlementIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.applications>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.applications>['entitlements']>[0]>,
  options?: Parameters<
    ReturnType<ReturnType<typeof client.applications>['entitlements']>['get']
  >[0],
) {
  return {
    queryKey: computed(() =>
      getApplicationsApplicationIdEntitlementsEntitlementIdQueryKey(params, params2),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .applications(toValue(params))
        .entitlements(toValue(params2))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useApplicationsApplicationIdEntitlementsEntitlementId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.applications>['entitlements']>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.applications>['entitlements']>['get']>
    >['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.applications>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.applications>['entitlements']>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<
              ReturnType<ReturnType<ReturnType<typeof client.applications>['entitlements']>['get']>
            >,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<
              ReturnType<ReturnType<ReturnType<typeof client.applications>['entitlements']>['get']>
            >,
            { error: null }
          >['data'],
          ReturnType<typeof getApplicationsApplicationIdEntitlementsEntitlementIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<
      ReturnType<ReturnType<typeof client.applications>['entitlements']>['get']
    >[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() =>
        getApplicationsApplicationIdEntitlementsEntitlementIdQueryKey(params, params2),
      ),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .applications(toValue(params))
          .entitlements(toValue(params2))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getDeleteApplicationsApplicationIdEntitlementsEntitlementIdMutationKey() {
  return [
    'applications',
    '/applications/{application_id}/entitlements/{entitlement_id}',
    'DELETE',
  ] as const
}

export function getDeleteApplicationsApplicationIdEntitlementsEntitlementIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.applications>['entitlements']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.applications>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.applications>['entitlements']>[0]>,
) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<ReturnType<ReturnType<typeof client.applications>['entitlements']>['delete']>
      >,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<
        ReturnType<ReturnType<typeof client.applications>['entitlements']>['delete']
      >[0]
      options?: Parameters<
        ReturnType<ReturnType<typeof client.applications>['entitlements']>['delete']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteApplicationsApplicationIdEntitlementsEntitlementIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .applications(toValue(params))
        .entitlements(toValue(params2))
        .delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeleteApplicationsApplicationIdEntitlementsEntitlementId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.applications>['entitlements']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.applications>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.applications>['entitlements']>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<
                ReturnType<ReturnType<typeof client.applications>['entitlements']>['delete']
              >
            >,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<
              ReturnType<ReturnType<typeof client.applications>['entitlements']>['delete']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.applications>['entitlements']>['delete']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults =
    getDeleteApplicationsApplicationIdEntitlementsEntitlementIdMutationOptions<
      TError,
      TOnMutateResult
    >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPostApplicationsApplicationIdEntitlementsEntitlementIdConsumeMutationKey() {
  return [
    'applications',
    '/applications/{application_id}/entitlements/{entitlement_id}/consume',
    'POST',
  ] as const
}

export function getPostApplicationsApplicationIdEntitlementsEntitlementIdConsumeMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<typeof client.applications>['entitlements']>['consume']['post']
      >
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.applications>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.applications>['entitlements']>[0]>,
) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<
          ReturnType<ReturnType<typeof client.applications>['entitlements']>['consume']['post']
        >
      >,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<
        ReturnType<ReturnType<typeof client.applications>['entitlements']>['consume']['post']
      >[0]
      options?: Parameters<
        ReturnType<ReturnType<typeof client.applications>['entitlements']>['consume']['post']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostApplicationsApplicationIdEntitlementsEntitlementIdConsumeMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .applications(toValue(params))
        .entitlements(toValue(params2))
        .consume.post(body, options)
      if (error) throw error
      return data
    },
  })
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
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.applications>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.applications>['entitlements']>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<
                ReturnType<
                  ReturnType<typeof client.applications>['entitlements']
                >['consume']['post']
              >
            >,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<
              ReturnType<ReturnType<typeof client.applications>['entitlements']>['consume']['post']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.applications>['entitlements']>['consume']['post']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults =
    getPostApplicationsApplicationIdEntitlementsEntitlementIdConsumeMutationOptions<
      TError,
      TOnMutateResult
    >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getApplicationsApplicationIdGuildsGuildIdCommandsQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.applications>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.applications>['guilds']>[0]>,
  options?: Parameters<
    ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']['get']
  >[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'applications',
    '/applications/{application_id}/guilds/{guild_id}/commands',
    toValue(params),
    toValue(params2),
    keyArgs,
  ] as const
}

export function getApplicationsApplicationIdGuildsGuildIdCommandsQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.applications>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.applications>['guilds']>[0]>,
  options?: Parameters<
    ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']['get']
  >[0],
) {
  return {
    queryKey: computed(() =>
      getApplicationsApplicationIdGuildsGuildIdCommandsQueryKey(params, params2, options),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .applications(toValue(params))
        .guilds(toValue(params2))
        .commands.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useApplicationsApplicationIdGuildsGuildIdCommands<
  TData = Extract<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']['get']>
    >,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']['get']>
    >['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.applications>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.applications>['guilds']>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<
              ReturnType<
                ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']['get']
              >
            >,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<
              ReturnType<
                ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']['get']
              >
            >,
            { error: null }
          >['data'],
          ReturnType<typeof getApplicationsApplicationIdGuildsGuildIdCommandsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<
      ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']['get']
    >[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() =>
        getApplicationsApplicationIdGuildsGuildIdCommandsQueryKey(params, params2, clientOptions),
      ),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .applications(toValue(params))
          .guilds(toValue(params2))
          .commands.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPutApplicationsApplicationIdGuildsGuildIdCommandsMutationKey() {
  return [
    'applications',
    '/applications/{application_id}/guilds/{guild_id}/commands',
    'PUT',
  ] as const
}

export function getPutApplicationsApplicationIdGuildsGuildIdCommandsMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']['put']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.applications>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.applications>['guilds']>[0]>,
) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']['put']>
      >,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<
        ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']['put']
      >[0]
      options?: Parameters<
        ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']['put']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPutApplicationsApplicationIdGuildsGuildIdCommandsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .applications(toValue(params))
        .guilds(toValue(params2))
        .commands.put(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePutApplicationsApplicationIdGuildsGuildIdCommands<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']['put']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.applications>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.applications>['guilds']>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<
                ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']['put']
              >
            >,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<
              ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']['put']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']['put']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPutApplicationsApplicationIdGuildsGuildIdCommandsMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPostApplicationsApplicationIdGuildsGuildIdCommandsMutationKey() {
  return [
    'applications',
    '/applications/{application_id}/guilds/{guild_id}/commands',
    'POST',
  ] as const
}

export function getPostApplicationsApplicationIdGuildsGuildIdCommandsMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.applications>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.applications>['guilds']>[0]>,
) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']['post']>
      >,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<
        ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']['post']
      >[0]
      options?: Parameters<
        ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']['post']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostApplicationsApplicationIdGuildsGuildIdCommandsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .applications(toValue(params))
        .guilds(toValue(params2))
        .commands.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostApplicationsApplicationIdGuildsGuildIdCommands<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.applications>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.applications>['guilds']>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<
                ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']['post']
              >
            >,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<
              ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']['post']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']['post']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostApplicationsApplicationIdGuildsGuildIdCommandsMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getApplicationsApplicationIdGuildsGuildIdCommandsPermissionsQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.applications>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.applications>['guilds']>[0]>,
) {
  return [
    'applications',
    '/applications/{application_id}/guilds/{guild_id}/commands/permissions',
    toValue(params),
    toValue(params2),
  ] as const
}

export function getApplicationsApplicationIdGuildsGuildIdCommandsPermissionsQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.applications>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.applications>['guilds']>[0]>,
  options?: Parameters<
    ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']['permissions']['get']
  >[0],
) {
  return {
    queryKey: computed(() =>
      getApplicationsApplicationIdGuildsGuildIdCommandsPermissionsQueryKey(params, params2),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .applications(toValue(params))
        .guilds(toValue(params2))
        .commands.permissions.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useApplicationsApplicationIdGuildsGuildIdCommandsPermissions<
  TData = Extract<
    Awaited<
      ReturnType<
        ReturnType<
          ReturnType<typeof client.applications>['guilds']
        >['commands']['permissions']['get']
      >
    >,
    { error: null }
  >['data'],
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
  params: MaybeRefOrGetter<Parameters<typeof client.applications>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.applications>['guilds']>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
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
          TError,
          TData,
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
          ReturnType<typeof getApplicationsApplicationIdGuildsGuildIdCommandsPermissionsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<
      ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']['permissions']['get']
    >[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() =>
        getApplicationsApplicationIdGuildsGuildIdCommandsPermissionsQueryKey(params, params2),
      ),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .applications(toValue(params))
          .guilds(toValue(params2))
          .commands.permissions.get({
            ...clientOptions,
            fetch: { ...clientOptions?.fetch, signal },
          })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getApplicationsApplicationIdGuildsGuildIdCommandsCommandIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.applications>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.applications>['guilds']>[0]>,
  params3: MaybeRefOrGetter<
    Parameters<ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']>[0]
  >,
) {
  return [
    'applications',
    '/applications/{application_id}/guilds/{guild_id}/commands/{command_id}',
    toValue(params),
    toValue(params2),
    toValue(params3),
  ] as const
}

export function getApplicationsApplicationIdGuildsGuildIdCommandsCommandIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.applications>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.applications>['guilds']>[0]>,
  params3: MaybeRefOrGetter<
    Parameters<ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']>[0]
  >,
  options?: Parameters<
    ReturnType<ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']>['get']
  >[0],
) {
  return {
    queryKey: computed(() =>
      getApplicationsApplicationIdGuildsGuildIdCommandsCommandIdQueryKey(params, params2, params3),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .applications(toValue(params))
        .guilds(toValue(params2))
        .commands(toValue(params3))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useApplicationsApplicationIdGuildsGuildIdCommandsCommandId<
  TData = Extract<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']>['get']
      >
    >,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']>['get']
      >
    >['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.applications>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.applications>['guilds']>[0]>,
  params3: MaybeRefOrGetter<
    Parameters<ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']>[0]
  >,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
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
          TError,
          TData,
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
          ReturnType<typeof getApplicationsApplicationIdGuildsGuildIdCommandsCommandIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<
      ReturnType<ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']>['get']
    >[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() =>
        getApplicationsApplicationIdGuildsGuildIdCommandsCommandIdQueryKey(
          params,
          params2,
          params3,
        ),
      ),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .applications(toValue(params))
          .guilds(toValue(params2))
          .commands(toValue(params3))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getDeleteApplicationsApplicationIdGuildsGuildIdCommandsCommandIdMutationKey() {
  return [
    'applications',
    '/applications/{application_id}/guilds/{guild_id}/commands/{command_id}',
    'DELETE',
  ] as const
}

export function getDeleteApplicationsApplicationIdGuildsGuildIdCommandsCommandIdMutationOptions<
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
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.applications>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.applications>['guilds']>[0]>,
  params3: MaybeRefOrGetter<
    Parameters<ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']>[0]
  >,
) {
  return mutationOptions<
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
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteApplicationsApplicationIdGuildsGuildIdCommandsCommandIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .applications(toValue(params))
        .guilds(toValue(params2))
        .commands(toValue(params3))
        .delete(body, options)
      if (error) throw error
      return data
    },
  })
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
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.applications>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.applications>['guilds']>[0]>,
  params3: MaybeRefOrGetter<
    Parameters<ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']>[0]
  >,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
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
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults =
    getDeleteApplicationsApplicationIdGuildsGuildIdCommandsCommandIdMutationOptions<
      TError,
      TOnMutateResult
    >(params, params2, params3)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPatchApplicationsApplicationIdGuildsGuildIdCommandsCommandIdMutationKey() {
  return [
    'applications',
    '/applications/{application_id}/guilds/{guild_id}/commands/{command_id}',
    'PATCH',
  ] as const
}

export function getPatchApplicationsApplicationIdGuildsGuildIdCommandsCommandIdMutationOptions<
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
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.applications>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.applications>['guilds']>[0]>,
  params3: MaybeRefOrGetter<
    Parameters<ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']>[0]
  >,
) {
  return mutationOptions<
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
    },
    TOnMutateResult
  >({
    mutationKey: getPatchApplicationsApplicationIdGuildsGuildIdCommandsCommandIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .applications(toValue(params))
        .guilds(toValue(params2))
        .commands(toValue(params3))
        .patch(body, options)
      if (error) throw error
      return data
    },
  })
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
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.applications>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.applications>['guilds']>[0]>,
  params3: MaybeRefOrGetter<
    Parameters<ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']>[0]
  >,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
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
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults =
    getPatchApplicationsApplicationIdGuildsGuildIdCommandsCommandIdMutationOptions<
      TError,
      TOnMutateResult
    >(params, params2, params3)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissionsQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.applications>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.applications>['guilds']>[0]>,
  params3: MaybeRefOrGetter<
    Parameters<ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']>[0]
  >,
) {
  return [
    'applications',
    '/applications/{application_id}/guilds/{guild_id}/commands/{command_id}/permissions',
    toValue(params),
    toValue(params2),
    toValue(params3),
  ] as const
}

export function getApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissionsQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.applications>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.applications>['guilds']>[0]>,
  params3: MaybeRefOrGetter<
    Parameters<ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']>[0]
  >,
  options?: Parameters<
    ReturnType<
      ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']
    >['permissions']['get']
  >[0],
) {
  return {
    queryKey: computed(() =>
      getApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissionsQueryKey(
        params,
        params2,
        params3,
      ),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .applications(toValue(params))
        .guilds(toValue(params2))
        .commands(toValue(params3))
        .permissions.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissions<
  TData = Extract<
    Awaited<
      ReturnType<
        ReturnType<
          ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']
        >['permissions']['get']
      >
    >,
    { error: null }
  >['data'],
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
  params: MaybeRefOrGetter<Parameters<typeof client.applications>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.applications>['guilds']>[0]>,
  params3: MaybeRefOrGetter<
    Parameters<ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']>[0]
  >,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
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
          TError,
          TData,
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
          ReturnType<
            typeof getApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissionsQueryKey
          >
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<
      ReturnType<
        ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']
      >['permissions']['get']
    >[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() =>
        getApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissionsQueryKey(
          params,
          params2,
          params3,
        ),
      ),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .applications(toValue(params))
          .guilds(toValue(params2))
          .commands(toValue(params3))
          .permissions.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPutApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissionsMutationKey() {
  return [
    'applications',
    '/applications/{application_id}/guilds/{guild_id}/commands/{command_id}/permissions',
    'PUT',
  ] as const
}

export function getPutApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissionsMutationOptions<
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
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.applications>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.applications>['guilds']>[0]>,
  params3: MaybeRefOrGetter<
    Parameters<ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']>[0]
  >,
) {
  return mutationOptions<
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
    },
    TOnMutateResult
  >({
    mutationKey:
      getPutApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissionsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .applications(toValue(params))
        .guilds(toValue(params2))
        .commands(toValue(params3))
        .permissions.put(body, options)
      if (error) throw error
      return data
    },
  })
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
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.applications>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.applications>['guilds']>[0]>,
  params3: MaybeRefOrGetter<
    Parameters<ReturnType<ReturnType<typeof client.applications>['guilds']>['commands']>[0]
  >,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
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
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults =
    getPutApplicationsApplicationIdGuildsGuildIdCommandsCommandIdPermissionsMutationOptions<
      TError,
      TOnMutateResult
    >(params, params2, params3)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getApplicationsApplicationIdRoleConnectionsMetadataQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.applications>[0]>,
) {
  return [
    'applications',
    '/applications/{application_id}/role-connections/metadata',
    toValue(params),
  ] as const
}

export function getApplicationsApplicationIdRoleConnectionsMetadataQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.applications>[0]>,
  options?: Parameters<
    ReturnType<typeof client.applications>['role-connections']['metadata']['get']
  >[0],
) {
  return {
    queryKey: computed(() => getApplicationsApplicationIdRoleConnectionsMetadataQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .applications(toValue(params))
        ['role-connections'].metadata.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useApplicationsApplicationIdRoleConnectionsMetadata<
  TData = Extract<
    Awaited<
      ReturnType<ReturnType<typeof client.applications>['role-connections']['metadata']['get']>
    >,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.applications>['role-connections']['metadata']['get']>
    >['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.applications>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<
              ReturnType<
                ReturnType<typeof client.applications>['role-connections']['metadata']['get']
              >
            >,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<
              ReturnType<
                ReturnType<typeof client.applications>['role-connections']['metadata']['get']
              >
            >,
            { error: null }
          >['data'],
          ReturnType<typeof getApplicationsApplicationIdRoleConnectionsMetadataQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<
      ReturnType<typeof client.applications>['role-connections']['metadata']['get']
    >[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getApplicationsApplicationIdRoleConnectionsMetadataQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .applications(toValue(params))
          ['role-connections'].metadata.get({
            ...clientOptions,
            fetch: { ...clientOptions?.fetch, signal },
          })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPutApplicationsApplicationIdRoleConnectionsMetadataMutationKey() {
  return [
    'applications',
    '/applications/{application_id}/role-connections/metadata',
    'PUT',
  ] as const
}

export function getPutApplicationsApplicationIdRoleConnectionsMetadataMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.applications>['role-connections']['metadata']['put']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.applications>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<ReturnType<typeof client.applications>['role-connections']['metadata']['put']>
      >,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<
        ReturnType<typeof client.applications>['role-connections']['metadata']['put']
      >[0]
      options?: Parameters<
        ReturnType<typeof client.applications>['role-connections']['metadata']['put']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPutApplicationsApplicationIdRoleConnectionsMetadataMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .applications(toValue(params))
        ['role-connections'].metadata.put(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePutApplicationsApplicationIdRoleConnectionsMetadata<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.applications>['role-connections']['metadata']['put']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.applications>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<
                ReturnType<typeof client.applications>['role-connections']['metadata']['put']
              >
            >,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<
              ReturnType<typeof client.applications>['role-connections']['metadata']['put']
            >[0]
            options?: Parameters<
              ReturnType<typeof client.applications>['role-connections']['metadata']['put']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPutApplicationsApplicationIdRoleConnectionsMetadataMutationOptions<
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

export function getChannelsChannelIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
) {
  return ['channels', '/channels/{channel_id}', toValue(params)] as const
}

export function getChannelsChannelIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  options?: Parameters<ReturnType<typeof client.channels>['get']>[0],
) {
  return {
    queryKey: computed(() => getChannelsChannelIdQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .channels(toValue(params))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useChannelsChannelId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.channels>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.channels>['get']>>['error'], null>,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.channels>['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.channels>['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getChannelsChannelIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.channels>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getChannelsChannelIdQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .channels(toValue(params))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getDeleteChannelsChannelIdMutationKey() {
  return ['channels', '/channels/{channel_id}', 'DELETE'] as const
}

export function getDeleteChannelsChannelIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.channels>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.channels>['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<typeof client.channels>['delete']>[0]
      options?: Parameters<ReturnType<typeof client.channels>['delete']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteChannelsChannelIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.channels(toValue(params)).delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeleteChannelsChannelId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.channels>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.channels>['delete']>>,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<ReturnType<typeof client.channels>['delete']>[0]
            options?: Parameters<ReturnType<typeof client.channels>['delete']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteChannelsChannelIdMutationOptions<TError, TOnMutateResult>(
    params,
  )
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPatchChannelsChannelIdMutationKey() {
  return ['channels', '/channels/{channel_id}', 'PATCH'] as const
}

export function getPatchChannelsChannelIdMutationOptions<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.channels>['patch']>>['error'], null>,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.channels>['patch']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.channels>['patch']>[0]
      options?: Parameters<ReturnType<typeof client.channels>['patch']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPatchChannelsChannelIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.channels(toValue(params)).patch(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePatchChannelsChannelId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.channels>['patch']>>['error'], null>,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.channels>['patch']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.channels>['patch']>[0]
            options?: Parameters<ReturnType<typeof client.channels>['patch']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPatchChannelsChannelIdMutationOptions<TError, TOnMutateResult>(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPostChannelsChannelIdFollowersMutationKey() {
  return ['channels', '/channels/{channel_id}/followers', 'POST'] as const
}

export function getPostChannelsChannelIdFollowersMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.channels>['followers']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.channels>['followers']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.channels>['followers']['post']>[0]
      options?: Parameters<ReturnType<typeof client.channels>['followers']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostChannelsChannelIdFollowersMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.channels(toValue(params)).followers.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostChannelsChannelIdFollowers<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.channels>['followers']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.channels>['followers']['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.channels>['followers']['post']>[0]
            options?: Parameters<ReturnType<typeof client.channels>['followers']['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostChannelsChannelIdFollowersMutationOptions<
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

export function getChannelsChannelIdInvitesQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
) {
  return ['channels', '/channels/{channel_id}/invites', toValue(params)] as const
}

export function getChannelsChannelIdInvitesQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  options?: Parameters<ReturnType<typeof client.channels>['invites']['get']>[0],
) {
  return {
    queryKey: computed(() => getChannelsChannelIdInvitesQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .channels(toValue(params))
        .invites.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useChannelsChannelIdInvites<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.channels>['invites']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.channels>['invites']['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.channels>['invites']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.channels>['invites']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getChannelsChannelIdInvitesQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.channels>['invites']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getChannelsChannelIdInvitesQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .channels(toValue(params))
          .invites.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostChannelsChannelIdInvitesMutationKey() {
  return ['channels', '/channels/{channel_id}/invites', 'POST'] as const
}

export function getPostChannelsChannelIdInvitesMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.channels>['invites']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.channels>['invites']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.channels>['invites']['post']>[0]
      options?: Parameters<ReturnType<typeof client.channels>['invites']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostChannelsChannelIdInvitesMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.channels(toValue(params)).invites.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostChannelsChannelIdInvites<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.channels>['invites']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.channels>['invites']['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.channels>['invites']['post']>[0]
            options?: Parameters<ReturnType<typeof client.channels>['invites']['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostChannelsChannelIdInvitesMutationOptions<TError, TOnMutateResult>(
    params,
  )
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getChannelsChannelIdMessagesQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  options?: Parameters<ReturnType<typeof client.channels>['messages']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['channels', '/channels/{channel_id}/messages', toValue(params), keyArgs] as const
}

export function getChannelsChannelIdMessagesQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  options?: Parameters<ReturnType<typeof client.channels>['messages']['get']>[0],
) {
  return {
    queryKey: computed(() => getChannelsChannelIdMessagesQueryKey(params, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .channels(toValue(params))
        .messages.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useChannelsChannelIdMessages<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.channels>['messages']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.channels>['messages']['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.channels>['messages']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.channels>['messages']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getChannelsChannelIdMessagesQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.channels>['messages']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getChannelsChannelIdMessagesQueryKey(params, clientOptions)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .channels(toValue(params))
          .messages.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostChannelsChannelIdMessagesMutationKey() {
  return ['channels', '/channels/{channel_id}/messages', 'POST'] as const
}

export function getPostChannelsChannelIdMessagesMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.channels>['messages']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.channels>['messages']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.channels>['messages']['post']>[0]
      options?: Parameters<ReturnType<typeof client.channels>['messages']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostChannelsChannelIdMessagesMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.channels(toValue(params)).messages.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostChannelsChannelIdMessages<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.channels>['messages']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.channels>['messages']['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.channels>['messages']['post']>[0]
            options?: Parameters<ReturnType<typeof client.channels>['messages']['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostChannelsChannelIdMessagesMutationOptions<TError, TOnMutateResult>(
    params,
  )
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPostChannelsChannelIdMessagesBulkDeleteMutationKey() {
  return ['channels', '/channels/{channel_id}/messages/bulk-delete', 'POST'] as const
}

export function getPostChannelsChannelIdMessagesBulkDeleteMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.channels>['messages']['bulk-delete']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.channels>['messages']['bulk-delete']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.channels>['messages']['bulk-delete']['post']>[0]
      options?: Parameters<ReturnType<typeof client.channels>['messages']['bulk-delete']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostChannelsChannelIdMessagesBulkDeleteMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .channels(toValue(params))
        .messages['bulk-delete'].post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostChannelsChannelIdMessagesBulkDelete<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.channels>['messages']['bulk-delete']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<ReturnType<typeof client.channels>['messages']['bulk-delete']['post']>
            >,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<
              ReturnType<typeof client.channels>['messages']['bulk-delete']['post']
            >[0]
            options?: Parameters<
              ReturnType<typeof client.channels>['messages']['bulk-delete']['post']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostChannelsChannelIdMessagesBulkDeleteMutationOptions<
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

export function getChannelsChannelIdMessagesPinsQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  options?: Parameters<ReturnType<typeof client.channels>['messages']['pins']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['channels', '/channels/{channel_id}/messages/pins', toValue(params), keyArgs] as const
}

export function getChannelsChannelIdMessagesPinsQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  options?: Parameters<ReturnType<typeof client.channels>['messages']['pins']['get']>[0],
) {
  return {
    queryKey: computed(() => getChannelsChannelIdMessagesPinsQueryKey(params, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .channels(toValue(params))
        .messages.pins.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useChannelsChannelIdMessagesPins<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.channels>['messages']['pins']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.channels>['messages']['pins']['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.channels>['messages']['pins']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.channels>['messages']['pins']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getChannelsChannelIdMessagesPinsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.channels>['messages']['pins']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getChannelsChannelIdMessagesPinsQueryKey(params, clientOptions)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .channels(toValue(params))
          .messages.pins.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPutChannelsChannelIdMessagesPinsMessageIdMutationKey() {
  return ['channels', '/channels/{channel_id}/messages/pins/{message_id}', 'PUT'] as const
}

export function getPutChannelsChannelIdMessagesPinsMessageIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']['pins']>['put']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.channels>['messages']['pins']>[0]>,
) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']['pins']>['put']>
      >,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<
        ReturnType<ReturnType<typeof client.channels>['messages']['pins']>['put']
      >[0]
      options?: Parameters<
        ReturnType<ReturnType<typeof client.channels>['messages']['pins']>['put']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPutChannelsChannelIdMessagesPinsMessageIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .channels(toValue(params))
        .messages.pins(toValue(params2))
        .put(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePutChannelsChannelIdMessagesPinsMessageId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']['pins']>['put']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.channels>['messages']['pins']>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']['pins']>['put']>
            >,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<
              ReturnType<ReturnType<typeof client.channels>['messages']['pins']>['put']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.channels>['messages']['pins']>['put']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPutChannelsChannelIdMessagesPinsMessageIdMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getDeleteChannelsChannelIdMessagesPinsMessageIdMutationKey() {
  return ['channels', '/channels/{channel_id}/messages/pins/{message_id}', 'DELETE'] as const
}

export function getDeleteChannelsChannelIdMessagesPinsMessageIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']['pins']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.channels>['messages']['pins']>[0]>,
) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']['pins']>['delete']>
      >,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<
        ReturnType<ReturnType<typeof client.channels>['messages']['pins']>['delete']
      >[0]
      options?: Parameters<
        ReturnType<ReturnType<typeof client.channels>['messages']['pins']>['delete']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteChannelsChannelIdMessagesPinsMessageIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .channels(toValue(params))
        .messages.pins(toValue(params2))
        .delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeleteChannelsChannelIdMessagesPinsMessageId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']['pins']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.channels>['messages']['pins']>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<
                ReturnType<ReturnType<typeof client.channels>['messages']['pins']>['delete']
              >
            >,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<
              ReturnType<ReturnType<typeof client.channels>['messages']['pins']>['delete']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.channels>['messages']['pins']>['delete']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteChannelsChannelIdMessagesPinsMessageIdMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getChannelsChannelIdMessagesMessageIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.channels>['messages']>[0]>,
) {
  return [
    'channels',
    '/channels/{channel_id}/messages/{message_id}',
    toValue(params),
    toValue(params2),
  ] as const
}

export function getChannelsChannelIdMessagesMessageIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.channels>['messages']>[0]>,
  options?: Parameters<ReturnType<ReturnType<typeof client.channels>['messages']>['get']>[0],
) {
  return {
    queryKey: computed(() => getChannelsChannelIdMessagesMessageIdQueryKey(params, params2)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .channels(toValue(params))
        .messages(toValue(params2))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useChannelsChannelIdMessagesMessageId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.channels>['messages']>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getChannelsChannelIdMessagesMessageIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<ReturnType<typeof client.channels>['messages']>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getChannelsChannelIdMessagesMessageIdQueryKey(params, params2)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .channels(toValue(params))
          .messages(toValue(params2))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getDeleteChannelsChannelIdMessagesMessageIdMutationKey() {
  return ['channels', '/channels/{channel_id}/messages/{message_id}', 'DELETE'] as const
}

export function getDeleteChannelsChannelIdMessagesMessageIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.channels>['messages']>[0]>,
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<ReturnType<typeof client.channels>['messages']>['delete']>[0]
      options?: Parameters<ReturnType<ReturnType<typeof client.channels>['messages']>['delete']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteChannelsChannelIdMessagesMessageIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .channels(toValue(params))
        .messages(toValue(params2))
        .delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeleteChannelsChannelIdMessagesMessageId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.channels>['messages']>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['delete']>
            >,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<
              ReturnType<ReturnType<typeof client.channels>['messages']>['delete']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.channels>['messages']>['delete']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteChannelsChannelIdMessagesMessageIdMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPatchChannelsChannelIdMessagesMessageIdMutationKey() {
  return ['channels', '/channels/{channel_id}/messages/{message_id}', 'PATCH'] as const
}

export function getPatchChannelsChannelIdMessagesMessageIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['patch']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.channels>['messages']>[0]>,
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['patch']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<ReturnType<typeof client.channels>['messages']>['patch']>[0]
      options?: Parameters<ReturnType<ReturnType<typeof client.channels>['messages']>['patch']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPatchChannelsChannelIdMessagesMessageIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .channels(toValue(params))
        .messages(toValue(params2))
        .patch(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePatchChannelsChannelIdMessagesMessageId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['patch']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.channels>['messages']>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['patch']>
            >,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<ReturnType<typeof client.channels>['messages']>['patch']>[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.channels>['messages']>['patch']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPatchChannelsChannelIdMessagesMessageIdMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPostChannelsChannelIdMessagesMessageIdCrosspostMutationKey() {
  return ['channels', '/channels/{channel_id}/messages/{message_id}/crosspost', 'POST'] as const
}

export function getPostChannelsChannelIdMessagesMessageIdCrosspostMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['crosspost']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.channels>['messages']>[0]>,
) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['crosspost']['post']>
      >,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<
        ReturnType<ReturnType<typeof client.channels>['messages']>['crosspost']['post']
      >[0]
      options?: Parameters<
        ReturnType<ReturnType<typeof client.channels>['messages']>['crosspost']['post']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostChannelsChannelIdMessagesMessageIdCrosspostMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .channels(toValue(params))
        .messages(toValue(params2))
        .crosspost.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostChannelsChannelIdMessagesMessageIdCrosspost<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['crosspost']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.channels>['messages']>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<
                ReturnType<ReturnType<typeof client.channels>['messages']>['crosspost']['post']
              >
            >,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<
              ReturnType<ReturnType<typeof client.channels>['messages']>['crosspost']['post']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.channels>['messages']>['crosspost']['post']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostChannelsChannelIdMessagesMessageIdCrosspostMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getDeleteChannelsChannelIdMessagesMessageIdReactionsMutationKey() {
  return ['channels', '/channels/{channel_id}/messages/{message_id}/reactions', 'DELETE'] as const
}

export function getDeleteChannelsChannelIdMessagesMessageIdReactionsMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.channels>['messages']>[0]>,
) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<
          ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']['delete']
        >
      >,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<
        ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']['delete']
      >[0]
      options?: Parameters<
        ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']['delete']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteChannelsChannelIdMessagesMessageIdReactionsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .channels(toValue(params))
        .messages(toValue(params2))
        .reactions.delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeleteChannelsChannelIdMessagesMessageIdReactions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.channels>['messages']>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<
                ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']['delete']
              >
            >,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<
              ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']['delete']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']['delete']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteChannelsChannelIdMessagesMessageIdReactionsMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getChannelsChannelIdMessagesMessageIdReactionsEmojiNameQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.channels>['messages']>[0]>,
  params3: MaybeRefOrGetter<
    Parameters<ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']>[0]
  >,
  options?: Parameters<
    ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']>['get']
  >[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'channels',
    '/channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}',
    toValue(params),
    toValue(params2),
    toValue(params3),
    keyArgs,
  ] as const
}

export function getChannelsChannelIdMessagesMessageIdReactionsEmojiNameQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.channels>['messages']>[0]>,
  params3: MaybeRefOrGetter<
    Parameters<ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']>[0]
  >,
  options?: Parameters<
    ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']>['get']
  >[0],
) {
  return {
    queryKey: computed(() =>
      getChannelsChannelIdMessagesMessageIdReactionsEmojiNameQueryKey(
        params,
        params2,
        params3,
        options,
      ),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .channels(toValue(params))
        .messages(toValue(params2))
        .reactions(toValue(params3))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useChannelsChannelIdMessagesMessageIdReactionsEmojiName<
  TData = Extract<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']>['get']
      >
    >,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']>['get']
      >
    >['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.channels>['messages']>[0]>,
  params3: MaybeRefOrGetter<
    Parameters<ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']>[0]
  >,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
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
          TError,
          TData,
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
          ReturnType<typeof getChannelsChannelIdMessagesMessageIdReactionsEmojiNameQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']>['get']
    >[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() =>
        getChannelsChannelIdMessagesMessageIdReactionsEmojiNameQueryKey(
          params,
          params2,
          params3,
          clientOptions,
        ),
      ),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .channels(toValue(params))
          .messages(toValue(params2))
          .reactions(toValue(params3))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameMutationKey() {
  return [
    'channels',
    '/channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}',
    'DELETE',
  ] as const
}

export function getDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameMutationOptions<
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
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.channels>['messages']>[0]>,
  params3: MaybeRefOrGetter<
    Parameters<ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']>[0]
  >,
) {
  return mutationOptions<
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
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .channels(toValue(params))
        .messages(toValue(params2))
        .reactions(toValue(params3))
        .delete(body, options)
      if (error) throw error
      return data
    },
  })
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
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.channels>['messages']>[0]>,
  params3: MaybeRefOrGetter<
    Parameters<ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']>[0]
  >,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
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
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults =
    getDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameMutationOptions<
      TError,
      TOnMutateResult
    >(params, params2, params3)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPutChannelsChannelIdMessagesMessageIdReactionsEmojiNameMeMutationKey() {
  return [
    'channels',
    '/channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}/@me',
    'PUT',
  ] as const
}

export function getPutChannelsChannelIdMessagesMessageIdReactionsEmojiNameMeMutationOptions<
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
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.channels>['messages']>[0]>,
  params3: MaybeRefOrGetter<
    Parameters<ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']>[0]
  >,
) {
  return mutationOptions<
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
    },
    TOnMutateResult
  >({
    mutationKey: getPutChannelsChannelIdMessagesMessageIdReactionsEmojiNameMeMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .channels(toValue(params))
        .messages(toValue(params2))
        .reactions(toValue(params3))
        ['@me'].put(body, options)
      if (error) throw error
      return data
    },
  })
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
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.channels>['messages']>[0]>,
  params3: MaybeRefOrGetter<
    Parameters<ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']>[0]
  >,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
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
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults =
    getPutChannelsChannelIdMessagesMessageIdReactionsEmojiNameMeMutationOptions<
      TError,
      TOnMutateResult
    >(params, params2, params3)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameMeMutationKey() {
  return [
    'channels',
    '/channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}/@me',
    'DELETE',
  ] as const
}

export function getDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameMeMutationOptions<
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
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.channels>['messages']>[0]>,
  params3: MaybeRefOrGetter<
    Parameters<ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']>[0]
  >,
) {
  return mutationOptions<
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
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameMeMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .channels(toValue(params))
        .messages(toValue(params2))
        .reactions(toValue(params3))
        ['@me'].delete(body, options)
      if (error) throw error
      return data
    },
  })
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
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.channels>['messages']>[0]>,
  params3: MaybeRefOrGetter<
    Parameters<ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']>[0]
  >,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
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
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults =
    getDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameMeMutationOptions<
      TError,
      TOnMutateResult
    >(params, params2, params3)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameUserIdMutationKey() {
  return [
    'channels',
    '/channels/{channel_id}/messages/{message_id}/reactions/{emoji_name}/{user_id}',
    'DELETE',
  ] as const
}

export function getDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameUserIdMutationOptions<
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
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.channels>['messages']>[0]>,
  params3: MaybeRefOrGetter<
    Parameters<ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']>[0]
  >,
  params4: MaybeRefOrGetter<
    Parameters<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']>
    >[0]
  >,
) {
  return mutationOptions<
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
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameUserIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .channels(toValue(params))
        .messages(toValue(params2))
        .reactions(toValue(params3))(toValue(params4))
        .delete(body, options)
      if (error) throw error
      return data
    },
  })
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
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.channels>['messages']>[0]>,
  params3: MaybeRefOrGetter<
    Parameters<ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']>[0]
  >,
  params4: MaybeRefOrGetter<
    Parameters<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']>
    >[0]
  >,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<
                ReturnType<
                  ReturnType<
                    ReturnType<ReturnType<typeof client.channels>['messages']>['reactions']
                  >
                >['delete']
              >
            >,
            { error: null }
          >['data'],
          TError,
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
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults =
    getDeleteChannelsChannelIdMessagesMessageIdReactionsEmojiNameUserIdMutationOptions<
      TError,
      TOnMutateResult
    >(params, params2, params3, params4)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPostChannelsChannelIdMessagesMessageIdThreadsMutationKey() {
  return ['channels', '/channels/{channel_id}/messages/{message_id}/threads', 'POST'] as const
}

export function getPostChannelsChannelIdMessagesMessageIdThreadsMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['threads']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.channels>['messages']>[0]>,
) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['threads']['post']>
      >,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<
        ReturnType<ReturnType<typeof client.channels>['messages']>['threads']['post']
      >[0]
      options?: Parameters<
        ReturnType<ReturnType<typeof client.channels>['messages']>['threads']['post']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostChannelsChannelIdMessagesMessageIdThreadsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .channels(toValue(params))
        .messages(toValue(params2))
        .threads.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostChannelsChannelIdMessagesMessageIdThreads<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['messages']>['threads']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.channels>['messages']>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<
                ReturnType<ReturnType<typeof client.channels>['messages']>['threads']['post']
              >
            >,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<
              ReturnType<ReturnType<typeof client.channels>['messages']>['threads']['post']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.channels>['messages']>['threads']['post']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostChannelsChannelIdMessagesMessageIdThreadsMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getChannelsChannelIdPermissionsMemberUserIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  params2: MaybeRefOrGetter<
    Parameters<ReturnType<typeof client.channels>['permissions']['member']>[0]
  >,
  options?: Parameters<
    ReturnType<ReturnType<typeof client.channels>['permissions']['member']>['get']
  >[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'channels',
    '/channels/{channel_id}/permissions/member/{user_id}',
    toValue(params),
    toValue(params2),
    keyArgs,
  ] as const
}

export function getChannelsChannelIdPermissionsMemberUserIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  params2: MaybeRefOrGetter<
    Parameters<ReturnType<typeof client.channels>['permissions']['member']>[0]
  >,
  options?: Parameters<
    ReturnType<ReturnType<typeof client.channels>['permissions']['member']>['get']
  >[0],
) {
  return {
    queryKey: computed(() =>
      getChannelsChannelIdPermissionsMemberUserIdQueryKey(params, params2, options),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .channels(toValue(params))
        .permissions.member(toValue(params2))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useChannelsChannelIdPermissionsMemberUserId<
  TData = Extract<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['permissions']['member']>['get']>
    >,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['permissions']['member']>['get']>
    >['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  params2: MaybeRefOrGetter<
    Parameters<ReturnType<typeof client.channels>['permissions']['member']>[0]
  >,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<
              ReturnType<
                ReturnType<ReturnType<typeof client.channels>['permissions']['member']>['get']
              >
            >,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<
              ReturnType<
                ReturnType<ReturnType<typeof client.channels>['permissions']['member']>['get']
              >
            >,
            { error: null }
          >['data'],
          ReturnType<typeof getChannelsChannelIdPermissionsMemberUserIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<
      ReturnType<ReturnType<typeof client.channels>['permissions']['member']>['get']
    >[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() =>
        getChannelsChannelIdPermissionsMemberUserIdQueryKey(params, params2, clientOptions),
      ),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .channels(toValue(params))
          .permissions.member(toValue(params2))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getChannelsChannelIdPermissionsRoleRoleIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  params2: MaybeRefOrGetter<
    Parameters<ReturnType<typeof client.channels>['permissions']['role']>[0]
  >,
  options?: Parameters<
    ReturnType<ReturnType<typeof client.channels>['permissions']['role']>['get']
  >[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'channels',
    '/channels/{channel_id}/permissions/role/{role_id}',
    toValue(params),
    toValue(params2),
    keyArgs,
  ] as const
}

export function getChannelsChannelIdPermissionsRoleRoleIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  params2: MaybeRefOrGetter<
    Parameters<ReturnType<typeof client.channels>['permissions']['role']>[0]
  >,
  options?: Parameters<
    ReturnType<ReturnType<typeof client.channels>['permissions']['role']>['get']
  >[0],
) {
  return {
    queryKey: computed(() =>
      getChannelsChannelIdPermissionsRoleRoleIdQueryKey(params, params2, options),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .channels(toValue(params))
        .permissions.role(toValue(params2))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useChannelsChannelIdPermissionsRoleRoleId<
  TData = Extract<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['permissions']['role']>['get']>
    >,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['permissions']['role']>['get']>
    >['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  params2: MaybeRefOrGetter<
    Parameters<ReturnType<typeof client.channels>['permissions']['role']>[0]
  >,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<
              ReturnType<
                ReturnType<ReturnType<typeof client.channels>['permissions']['role']>['get']
              >
            >,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<
              ReturnType<
                ReturnType<ReturnType<typeof client.channels>['permissions']['role']>['get']
              >
            >,
            { error: null }
          >['data'],
          ReturnType<typeof getChannelsChannelIdPermissionsRoleRoleIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<
      ReturnType<ReturnType<typeof client.channels>['permissions']['role']>['get']
    >[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() =>
        getChannelsChannelIdPermissionsRoleRoleIdQueryKey(params, params2, clientOptions),
      ),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .channels(toValue(params))
          .permissions.role(toValue(params2))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPutChannelsChannelIdPermissionsOverwriteIdMutationKey() {
  return ['channels', '/channels/{channel_id}/permissions/{overwrite_id}', 'PUT'] as const
}

export function getPutChannelsChannelIdPermissionsOverwriteIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['permissions']>['put']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.channels>['permissions']>[0]>,
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.channels>['permissions']>['put']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<ReturnType<typeof client.channels>['permissions']>['put']>[0]
      options?: Parameters<ReturnType<ReturnType<typeof client.channels>['permissions']>['put']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPutChannelsChannelIdPermissionsOverwriteIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .channels(toValue(params))
        .permissions(toValue(params2))
        .put(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePutChannelsChannelIdPermissionsOverwriteId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['permissions']>['put']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.channels>['permissions']>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<ReturnType<ReturnType<typeof client.channels>['permissions']>['put']>
            >,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<
              ReturnType<ReturnType<typeof client.channels>['permissions']>['put']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.channels>['permissions']>['put']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPutChannelsChannelIdPermissionsOverwriteIdMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getDeleteChannelsChannelIdPermissionsOverwriteIdMutationKey() {
  return ['channels', '/channels/{channel_id}/permissions/{overwrite_id}', 'DELETE'] as const
}

export function getDeleteChannelsChannelIdPermissionsOverwriteIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['permissions']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.channels>['permissions']>[0]>,
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.channels>['permissions']>['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<ReturnType<typeof client.channels>['permissions']>['delete']>[0]
      options?: Parameters<
        ReturnType<ReturnType<typeof client.channels>['permissions']>['delete']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteChannelsChannelIdPermissionsOverwriteIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .channels(toValue(params))
        .permissions(toValue(params2))
        .delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeleteChannelsChannelIdPermissionsOverwriteId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['permissions']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.channels>['permissions']>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<ReturnType<ReturnType<typeof client.channels>['permissions']>['delete']>
            >,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<
              ReturnType<ReturnType<typeof client.channels>['permissions']>['delete']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.channels>['permissions']>['delete']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteChannelsChannelIdPermissionsOverwriteIdMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getChannelsChannelIdPinsQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
) {
  return ['channels', '/channels/{channel_id}/pins', toValue(params)] as const
}

export function getChannelsChannelIdPinsQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  options?: Parameters<ReturnType<typeof client.channels>['pins']['get']>[0],
) {
  return {
    queryKey: computed(() => getChannelsChannelIdPinsQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .channels(toValue(params))
        .pins.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useChannelsChannelIdPins<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.channels>['pins']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.channels>['pins']['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.channels>['pins']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.channels>['pins']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getChannelsChannelIdPinsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.channels>['pins']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getChannelsChannelIdPinsQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .channels(toValue(params))
          .pins.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPutChannelsChannelIdPinsMessageIdMutationKey() {
  return ['channels', '/channels/{channel_id}/pins/{message_id}', 'PUT'] as const
}

export function getPutChannelsChannelIdPinsMessageIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.channels>['pins']>['put']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.channels>['pins']>[0]>,
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.channels>['pins']>['put']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<ReturnType<typeof client.channels>['pins']>['put']>[0]
      options?: Parameters<ReturnType<ReturnType<typeof client.channels>['pins']>['put']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPutChannelsChannelIdPinsMessageIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .channels(toValue(params))
        .pins(toValue(params2))
        .put(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePutChannelsChannelIdPinsMessageId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.channels>['pins']>['put']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.channels>['pins']>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<ReturnType<typeof client.channels>['pins']>['put']>>,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<ReturnType<ReturnType<typeof client.channels>['pins']>['put']>[0]
            options?: Parameters<ReturnType<ReturnType<typeof client.channels>['pins']>['put']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPutChannelsChannelIdPinsMessageIdMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getDeleteChannelsChannelIdPinsMessageIdMutationKey() {
  return ['channels', '/channels/{channel_id}/pins/{message_id}', 'DELETE'] as const
}

export function getDeleteChannelsChannelIdPinsMessageIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.channels>['pins']>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.channels>['pins']>[0]>,
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.channels>['pins']>['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<ReturnType<typeof client.channels>['pins']>['delete']>[0]
      options?: Parameters<ReturnType<ReturnType<typeof client.channels>['pins']>['delete']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteChannelsChannelIdPinsMessageIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .channels(toValue(params))
        .pins(toValue(params2))
        .delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeleteChannelsChannelIdPinsMessageId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.channels>['pins']>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.channels>['pins']>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<ReturnType<typeof client.channels>['pins']>['delete']>>,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<ReturnType<ReturnType<typeof client.channels>['pins']>['delete']>[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.channels>['pins']>['delete']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteChannelsChannelIdPinsMessageIdMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getChannelsChannelIdPollsMessageIdAnswersAnswerIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.channels>['polls']>[0]>,
  params3: MaybeRefOrGetter<
    Parameters<ReturnType<ReturnType<typeof client.channels>['polls']>['answers']>[0]
  >,
  options?: Parameters<
    ReturnType<ReturnType<ReturnType<typeof client.channels>['polls']>['answers']>['get']
  >[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'channels',
    '/channels/{channel_id}/polls/{message_id}/answers/{answer_id}',
    toValue(params),
    toValue(params2),
    toValue(params3),
    keyArgs,
  ] as const
}

export function getChannelsChannelIdPollsMessageIdAnswersAnswerIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.channels>['polls']>[0]>,
  params3: MaybeRefOrGetter<
    Parameters<ReturnType<ReturnType<typeof client.channels>['polls']>['answers']>[0]
  >,
  options?: Parameters<
    ReturnType<ReturnType<ReturnType<typeof client.channels>['polls']>['answers']>['get']
  >[0],
) {
  return {
    queryKey: computed(() =>
      getChannelsChannelIdPollsMessageIdAnswersAnswerIdQueryKey(params, params2, params3, options),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .channels(toValue(params))
        .polls(toValue(params2))
        .answers(toValue(params3))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useChannelsChannelIdPollsMessageIdAnswersAnswerId<
  TData = Extract<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<ReturnType<typeof client.channels>['polls']>['answers']>['get']
      >
    >,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<ReturnType<typeof client.channels>['polls']>['answers']>['get']
      >
    >['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.channels>['polls']>[0]>,
  params3: MaybeRefOrGetter<
    Parameters<ReturnType<ReturnType<typeof client.channels>['polls']>['answers']>[0]
  >,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<
              ReturnType<
                ReturnType<
                  ReturnType<ReturnType<typeof client.channels>['polls']>['answers']
                >['get']
              >
            >,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<
              ReturnType<
                ReturnType<
                  ReturnType<ReturnType<typeof client.channels>['polls']>['answers']
                >['get']
              >
            >,
            { error: null }
          >['data'],
          ReturnType<typeof getChannelsChannelIdPollsMessageIdAnswersAnswerIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['polls']>['answers']>['get']
    >[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() =>
        getChannelsChannelIdPollsMessageIdAnswersAnswerIdQueryKey(
          params,
          params2,
          params3,
          clientOptions,
        ),
      ),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .channels(toValue(params))
          .polls(toValue(params2))
          .answers(toValue(params3))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostChannelsChannelIdPollsMessageIdExpireMutationKey() {
  return ['channels', '/channels/{channel_id}/polls/{message_id}/expire', 'POST'] as const
}

export function getPostChannelsChannelIdPollsMessageIdExpireMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['polls']>['expire']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.channels>['polls']>[0]>,
) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<ReturnType<ReturnType<typeof client.channels>['polls']>['expire']['post']>
      >,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<
        ReturnType<ReturnType<typeof client.channels>['polls']>['expire']['post']
      >[0]
      options?: Parameters<
        ReturnType<ReturnType<typeof client.channels>['polls']>['expire']['post']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostChannelsChannelIdPollsMessageIdExpireMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .channels(toValue(params))
        .polls(toValue(params2))
        .expire.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostChannelsChannelIdPollsMessageIdExpire<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['polls']>['expire']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.channels>['polls']>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<ReturnType<ReturnType<typeof client.channels>['polls']>['expire']['post']>
            >,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<
              ReturnType<ReturnType<typeof client.channels>['polls']>['expire']['post']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.channels>['polls']>['expire']['post']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostChannelsChannelIdPollsMessageIdExpireMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPutChannelsChannelIdRecipientsUserIdMutationKey() {
  return ['channels', '/channels/{channel_id}/recipients/{user_id}', 'PUT'] as const
}

export function getPutChannelsChannelIdRecipientsUserIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['recipients']>['put']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.channels>['recipients']>[0]>,
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.channels>['recipients']>['put']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<ReturnType<typeof client.channels>['recipients']>['put']>[0]
      options?: Parameters<ReturnType<ReturnType<typeof client.channels>['recipients']>['put']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPutChannelsChannelIdRecipientsUserIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .channels(toValue(params))
        .recipients(toValue(params2))
        .put(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePutChannelsChannelIdRecipientsUserId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['recipients']>['put']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.channels>['recipients']>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<ReturnType<ReturnType<typeof client.channels>['recipients']>['put']>
            >,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<ReturnType<typeof client.channels>['recipients']>['put']>[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.channels>['recipients']>['put']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPutChannelsChannelIdRecipientsUserIdMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getDeleteChannelsChannelIdRecipientsUserIdMutationKey() {
  return ['channels', '/channels/{channel_id}/recipients/{user_id}', 'DELETE'] as const
}

export function getDeleteChannelsChannelIdRecipientsUserIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['recipients']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.channels>['recipients']>[0]>,
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.channels>['recipients']>['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<ReturnType<typeof client.channels>['recipients']>['delete']>[0]
      options?: Parameters<
        ReturnType<ReturnType<typeof client.channels>['recipients']>['delete']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteChannelsChannelIdRecipientsUserIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .channels(toValue(params))
        .recipients(toValue(params2))
        .delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeleteChannelsChannelIdRecipientsUserId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['recipients']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.channels>['recipients']>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<ReturnType<ReturnType<typeof client.channels>['recipients']>['delete']>
            >,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<
              ReturnType<ReturnType<typeof client.channels>['recipients']>['delete']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.channels>['recipients']>['delete']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteChannelsChannelIdRecipientsUserIdMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPostChannelsChannelIdSendSoundboardSoundMutationKey() {
  return ['channels', '/channels/{channel_id}/send-soundboard-sound', 'POST'] as const
}

export function getPostChannelsChannelIdSendSoundboardSoundMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.channels>['send-soundboard-sound']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.channels>['send-soundboard-sound']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.channels>['send-soundboard-sound']['post']>[0]
      options?: Parameters<ReturnType<typeof client.channels>['send-soundboard-sound']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostChannelsChannelIdSendSoundboardSoundMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .channels(toValue(params))
        ['send-soundboard-sound'].post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostChannelsChannelIdSendSoundboardSound<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.channels>['send-soundboard-sound']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<ReturnType<typeof client.channels>['send-soundboard-sound']['post']>
            >,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.channels>['send-soundboard-sound']['post']>[0]
            options?: Parameters<
              ReturnType<typeof client.channels>['send-soundboard-sound']['post']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostChannelsChannelIdSendSoundboardSoundMutationOptions<
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

export function getChannelsChannelIdThreadMembersQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  options?: Parameters<ReturnType<typeof client.channels>['thread-members']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['channels', '/channels/{channel_id}/thread-members', toValue(params), keyArgs] as const
}

export function getChannelsChannelIdThreadMembersQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  options?: Parameters<ReturnType<typeof client.channels>['thread-members']['get']>[0],
) {
  return {
    queryKey: computed(() => getChannelsChannelIdThreadMembersQueryKey(params, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .channels(toValue(params))
        ['thread-members'].get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useChannelsChannelIdThreadMembers<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.channels>['thread-members']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.channels>['thread-members']['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.channels>['thread-members']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.channels>['thread-members']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getChannelsChannelIdThreadMembersQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.channels>['thread-members']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getChannelsChannelIdThreadMembersQueryKey(params, clientOptions)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .channels(toValue(params))
          ['thread-members'].get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPutChannelsChannelIdThreadMembersMeMutationKey() {
  return ['channels', '/channels/{channel_id}/thread-members/@me', 'PUT'] as const
}

export function getPutChannelsChannelIdThreadMembersMeMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.channels>['thread-members']['@me']['put']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.channels>['thread-members']['@me']['put']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<typeof client.channels>['thread-members']['@me']['put']>[0]
      options?: Parameters<ReturnType<typeof client.channels>['thread-members']['@me']['put']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPutChannelsChannelIdThreadMembersMeMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .channels(toValue(params))
        ['thread-members']['@me'].put(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePutChannelsChannelIdThreadMembersMe<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.channels>['thread-members']['@me']['put']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.channels>['thread-members']['@me']['put']>>,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<ReturnType<typeof client.channels>['thread-members']['@me']['put']>[0]
            options?: Parameters<
              ReturnType<typeof client.channels>['thread-members']['@me']['put']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPutChannelsChannelIdThreadMembersMeMutationOptions<
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

export function getDeleteChannelsChannelIdThreadMembersMeMutationKey() {
  return ['channels', '/channels/{channel_id}/thread-members/@me', 'DELETE'] as const
}

export function getDeleteChannelsChannelIdThreadMembersMeMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.channels>['thread-members']['@me']['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.channels>['thread-members']['@me']['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<typeof client.channels>['thread-members']['@me']['delete']>[0]
      options?: Parameters<ReturnType<typeof client.channels>['thread-members']['@me']['delete']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteChannelsChannelIdThreadMembersMeMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .channels(toValue(params))
        ['thread-members']['@me'].delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeleteChannelsChannelIdThreadMembersMe<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.channels>['thread-members']['@me']['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<ReturnType<typeof client.channels>['thread-members']['@me']['delete']>
            >,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<
              ReturnType<typeof client.channels>['thread-members']['@me']['delete']
            >[0]
            options?: Parameters<
              ReturnType<typeof client.channels>['thread-members']['@me']['delete']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteChannelsChannelIdThreadMembersMeMutationOptions<
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

export function getChannelsChannelIdThreadMembersUserIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.channels>['thread-members']>[0]>,
  options?: Parameters<ReturnType<ReturnType<typeof client.channels>['thread-members']>['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'channels',
    '/channels/{channel_id}/thread-members/{user_id}',
    toValue(params),
    toValue(params2),
    keyArgs,
  ] as const
}

export function getChannelsChannelIdThreadMembersUserIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.channels>['thread-members']>[0]>,
  options?: Parameters<ReturnType<ReturnType<typeof client.channels>['thread-members']>['get']>[0],
) {
  return {
    queryKey: computed(() =>
      getChannelsChannelIdThreadMembersUserIdQueryKey(params, params2, options),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .channels(toValue(params))
        ['thread-members'](toValue(params2))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useChannelsChannelIdThreadMembersUserId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.channels>['thread-members']>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['thread-members']>['get']>
    >['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.channels>['thread-members']>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<
              ReturnType<ReturnType<ReturnType<typeof client.channels>['thread-members']>['get']>
            >,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<
              ReturnType<ReturnType<ReturnType<typeof client.channels>['thread-members']>['get']>
            >,
            { error: null }
          >['data'],
          ReturnType<typeof getChannelsChannelIdThreadMembersUserIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<ReturnType<typeof client.channels>['thread-members']>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() =>
        getChannelsChannelIdThreadMembersUserIdQueryKey(params, params2, clientOptions),
      ),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .channels(toValue(params))
          ['thread-members'](toValue(params2))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPutChannelsChannelIdThreadMembersUserIdMutationKey() {
  return ['channels', '/channels/{channel_id}/thread-members/{user_id}', 'PUT'] as const
}

export function getPutChannelsChannelIdThreadMembersUserIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['thread-members']>['put']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.channels>['thread-members']>[0]>,
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.channels>['thread-members']>['put']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<ReturnType<typeof client.channels>['thread-members']>['put']>[0]
      options?: Parameters<
        ReturnType<ReturnType<typeof client.channels>['thread-members']>['put']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPutChannelsChannelIdThreadMembersUserIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .channels(toValue(params))
        ['thread-members'](toValue(params2))
        .put(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePutChannelsChannelIdThreadMembersUserId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['thread-members']>['put']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.channels>['thread-members']>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<ReturnType<ReturnType<typeof client.channels>['thread-members']>['put']>
            >,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<
              ReturnType<ReturnType<typeof client.channels>['thread-members']>['put']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.channels>['thread-members']>['put']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPutChannelsChannelIdThreadMembersUserIdMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getDeleteChannelsChannelIdThreadMembersUserIdMutationKey() {
  return ['channels', '/channels/{channel_id}/thread-members/{user_id}', 'DELETE'] as const
}

export function getDeleteChannelsChannelIdThreadMembersUserIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['thread-members']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.channels>['thread-members']>[0]>,
) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<ReturnType<ReturnType<typeof client.channels>['thread-members']>['delete']>
      >,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<
        ReturnType<ReturnType<typeof client.channels>['thread-members']>['delete']
      >[0]
      options?: Parameters<
        ReturnType<ReturnType<typeof client.channels>['thread-members']>['delete']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteChannelsChannelIdThreadMembersUserIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .channels(toValue(params))
        ['thread-members'](toValue(params2))
        .delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeleteChannelsChannelIdThreadMembersUserId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.channels>['thread-members']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.channels>['thread-members']>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<ReturnType<ReturnType<typeof client.channels>['thread-members']>['delete']>
            >,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<
              ReturnType<ReturnType<typeof client.channels>['thread-members']>['delete']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.channels>['thread-members']>['delete']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteChannelsChannelIdThreadMembersUserIdMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPostChannelsChannelIdThreadsMutationKey() {
  return ['channels', '/channels/{channel_id}/threads', 'POST'] as const
}

export function getPostChannelsChannelIdThreadsMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.channels>['threads']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.channels>['threads']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.channels>['threads']['post']>[0]
      options?: Parameters<ReturnType<typeof client.channels>['threads']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostChannelsChannelIdThreadsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.channels(toValue(params)).threads.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostChannelsChannelIdThreads<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.channels>['threads']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.channels>['threads']['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.channels>['threads']['post']>[0]
            options?: Parameters<ReturnType<typeof client.channels>['threads']['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostChannelsChannelIdThreadsMutationOptions<TError, TOnMutateResult>(
    params,
  )
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getChannelsChannelIdThreadsArchivedPrivateQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  options?: Parameters<
    ReturnType<typeof client.channels>['threads']['archived']['private']['get']
  >[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'channels',
    '/channels/{channel_id}/threads/archived/private',
    toValue(params),
    keyArgs,
  ] as const
}

export function getChannelsChannelIdThreadsArchivedPrivateQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  options?: Parameters<
    ReturnType<typeof client.channels>['threads']['archived']['private']['get']
  >[0],
) {
  return {
    queryKey: computed(() => getChannelsChannelIdThreadsArchivedPrivateQueryKey(params, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .channels(toValue(params))
        .threads.archived.private.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useChannelsChannelIdThreadsArchivedPrivate<
  TData = Extract<
    Awaited<
      ReturnType<ReturnType<typeof client.channels>['threads']['archived']['private']['get']>
    >,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.channels>['threads']['archived']['private']['get']>
    >['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<
              ReturnType<
                ReturnType<typeof client.channels>['threads']['archived']['private']['get']
              >
            >,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<
              ReturnType<
                ReturnType<typeof client.channels>['threads']['archived']['private']['get']
              >
            >,
            { error: null }
          >['data'],
          ReturnType<typeof getChannelsChannelIdThreadsArchivedPrivateQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<
      ReturnType<typeof client.channels>['threads']['archived']['private']['get']
    >[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() =>
        getChannelsChannelIdThreadsArchivedPrivateQueryKey(params, clientOptions),
      ),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .channels(toValue(params))
          .threads.archived.private.get({
            ...clientOptions,
            fetch: { ...clientOptions?.fetch, signal },
          })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getChannelsChannelIdThreadsArchivedPublicQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  options?: Parameters<
    ReturnType<typeof client.channels>['threads']['archived']['public']['get']
  >[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'channels',
    '/channels/{channel_id}/threads/archived/public',
    toValue(params),
    keyArgs,
  ] as const
}

export function getChannelsChannelIdThreadsArchivedPublicQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  options?: Parameters<
    ReturnType<typeof client.channels>['threads']['archived']['public']['get']
  >[0],
) {
  return {
    queryKey: computed(() => getChannelsChannelIdThreadsArchivedPublicQueryKey(params, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .channels(toValue(params))
        .threads.archived.public.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useChannelsChannelIdThreadsArchivedPublic<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.channels>['threads']['archived']['public']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.channels>['threads']['archived']['public']['get']>
    >['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<
              ReturnType<ReturnType<typeof client.channels>['threads']['archived']['public']['get']>
            >,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<
              ReturnType<ReturnType<typeof client.channels>['threads']['archived']['public']['get']>
            >,
            { error: null }
          >['data'],
          ReturnType<typeof getChannelsChannelIdThreadsArchivedPublicQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<
      ReturnType<typeof client.channels>['threads']['archived']['public']['get']
    >[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() =>
        getChannelsChannelIdThreadsArchivedPublicQueryKey(params, clientOptions),
      ),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .channels(toValue(params))
          .threads.archived.public.get({
            ...clientOptions,
            fetch: { ...clientOptions?.fetch, signal },
          })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getChannelsChannelIdThreadsSearchQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  options?: Parameters<ReturnType<typeof client.channels>['threads']['search']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['channels', '/channels/{channel_id}/threads/search', toValue(params), keyArgs] as const
}

export function getChannelsChannelIdThreadsSearchQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  options?: Parameters<ReturnType<typeof client.channels>['threads']['search']['get']>[0],
) {
  return {
    queryKey: computed(() => getChannelsChannelIdThreadsSearchQueryKey(params, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .channels(toValue(params))
        .threads.search.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useChannelsChannelIdThreadsSearch<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.channels>['threads']['search']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.channels>['threads']['search']['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.channels>['threads']['search']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.channels>['threads']['search']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getChannelsChannelIdThreadsSearchQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.channels>['threads']['search']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getChannelsChannelIdThreadsSearchQueryKey(params, clientOptions)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .channels(toValue(params))
          .threads.search.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostChannelsChannelIdTypingMutationKey() {
  return ['channels', '/channels/{channel_id}/typing', 'POST'] as const
}

export function getPostChannelsChannelIdTypingMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.channels>['typing']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.channels>['typing']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<typeof client.channels>['typing']['post']>[0]
      options?: Parameters<ReturnType<typeof client.channels>['typing']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostChannelsChannelIdTypingMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.channels(toValue(params)).typing.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostChannelsChannelIdTyping<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.channels>['typing']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.channels>['typing']['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<ReturnType<typeof client.channels>['typing']['post']>[0]
            options?: Parameters<ReturnType<typeof client.channels>['typing']['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostChannelsChannelIdTypingMutationOptions<TError, TOnMutateResult>(
    params,
  )
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getChannelsChannelIdUsersMeThreadsArchivedPrivateQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  options?: Parameters<
    ReturnType<typeof client.channels>['users']['@me']['threads']['archived']['private']['get']
  >[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'channels',
    '/channels/{channel_id}/users/@me/threads/archived/private',
    toValue(params),
    keyArgs,
  ] as const
}

export function getChannelsChannelIdUsersMeThreadsArchivedPrivateQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  options?: Parameters<
    ReturnType<typeof client.channels>['users']['@me']['threads']['archived']['private']['get']
  >[0],
) {
  return {
    queryKey: computed(() =>
      getChannelsChannelIdUsersMeThreadsArchivedPrivateQueryKey(params, options),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .channels(toValue(params))
        .users['@me'].threads.archived.private.get({
          ...options,
          fetch: { ...options?.fetch, signal },
        })
      if (error) throw error
      return data
    },
  }
}

export function useChannelsChannelIdUsersMeThreadsArchivedPrivate<
  TData = Extract<
    Awaited<
      ReturnType<
        ReturnType<typeof client.channels>['users']['@me']['threads']['archived']['private']['get']
      >
    >,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<typeof client.channels>['users']['@me']['threads']['archived']['private']['get']
      >
    >['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
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
          TError,
          TData,
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
          ReturnType<typeof getChannelsChannelIdUsersMeThreadsArchivedPrivateQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<
      ReturnType<typeof client.channels>['users']['@me']['threads']['archived']['private']['get']
    >[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() =>
        getChannelsChannelIdUsersMeThreadsArchivedPrivateQueryKey(params, clientOptions),
      ),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .channels(toValue(params))
          .users['@me'].threads.archived.private.get({
            ...clientOptions,
            fetch: { ...clientOptions?.fetch, signal },
          })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPutChannelsChannelIdVoiceStatusMutationKey() {
  return ['channels', '/channels/{channel_id}/voice-status', 'PUT'] as const
}

export function getPutChannelsChannelIdVoiceStatusMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.channels>['voice-status']['put']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.channels>['voice-status']['put']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.channels>['voice-status']['put']>[0]
      options?: Parameters<ReturnType<typeof client.channels>['voice-status']['put']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPutChannelsChannelIdVoiceStatusMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .channels(toValue(params))
        ['voice-status'].put(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePutChannelsChannelIdVoiceStatus<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.channels>['voice-status']['put']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.channels>['voice-status']['put']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.channels>['voice-status']['put']>[0]
            options?: Parameters<ReturnType<typeof client.channels>['voice-status']['put']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPutChannelsChannelIdVoiceStatusMutationOptions<
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

export function getChannelsChannelIdWebhooksQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
) {
  return ['channels', '/channels/{channel_id}/webhooks', toValue(params)] as const
}

export function getChannelsChannelIdWebhooksQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  options?: Parameters<ReturnType<typeof client.channels>['webhooks']['get']>[0],
) {
  return {
    queryKey: computed(() => getChannelsChannelIdWebhooksQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .channels(toValue(params))
        .webhooks.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useChannelsChannelIdWebhooks<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.channels>['webhooks']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.channels>['webhooks']['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.channels>['webhooks']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.channels>['webhooks']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getChannelsChannelIdWebhooksQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.channels>['webhooks']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getChannelsChannelIdWebhooksQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .channels(toValue(params))
          .webhooks.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostChannelsChannelIdWebhooksMutationKey() {
  return ['channels', '/channels/{channel_id}/webhooks', 'POST'] as const
}

export function getPostChannelsChannelIdWebhooksMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.channels>['webhooks']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.channels>['webhooks']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.channels>['webhooks']['post']>[0]
      options?: Parameters<ReturnType<typeof client.channels>['webhooks']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostChannelsChannelIdWebhooksMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.channels(toValue(params)).webhooks.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostChannelsChannelIdWebhooks<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.channels>['webhooks']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.channels>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.channels>['webhooks']['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.channels>['webhooks']['post']>[0]
            options?: Parameters<ReturnType<typeof client.channels>['webhooks']['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostChannelsChannelIdWebhooksMutationOptions<TError, TOnMutateResult>(
    params,
  )
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getGatewayQueryKey() {
  return ['gateway', '/gateway'] as const
}

export function getGatewayQueryOptions(options?: Parameters<typeof client.gateway.get>[0]) {
  return {
    queryKey: getGatewayQueryKey(),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.gateway.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useGateway<
  TData = Extract<Awaited<ReturnType<typeof client.gateway.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.gateway.get>>['error'], null>,
>(
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<Awaited<ReturnType<typeof client.gateway.get>>, { error: null }>['data'],
          TError,
          TData,
          Extract<Awaited<ReturnType<typeof client.gateway.get>>, { error: null }>['data'],
          ReturnType<typeof getGatewayQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.gateway.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: getGatewayQueryKey(),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.gateway.get({
          ...clientOptions,
          fetch: { ...clientOptions?.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getGatewayBotQueryKey() {
  return ['gateway', '/gateway/bot'] as const
}

export function getGatewayBotQueryOptions(options?: Parameters<typeof client.gateway.bot.get>[0]) {
  return {
    queryKey: getGatewayBotQueryKey(),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.gateway.bot.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useGatewayBot<
  TData = Extract<Awaited<ReturnType<typeof client.gateway.bot.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.gateway.bot.get>>['error'], null>,
>(
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<Awaited<ReturnType<typeof client.gateway.bot.get>>, { error: null }>['data'],
          TError,
          TData,
          Extract<Awaited<ReturnType<typeof client.gateway.bot.get>>, { error: null }>['data'],
          ReturnType<typeof getGatewayBotQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.gateway.bot.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: getGatewayBotQueryKey(),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.gateway.bot.get({
          ...clientOptions,
          fetch: { ...clientOptions?.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getGuildsTemplatesCodeQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds.templates>[0]>,
) {
  return ['guilds', '/guilds/templates/{code}', toValue(params)] as const
}

export function getGuildsTemplatesCodeQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds.templates>[0]>,
  options?: Parameters<ReturnType<typeof client.guilds.templates>['get']>[0],
) {
  return {
    queryKey: computed(() => getGuildsTemplatesCodeQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.guilds
        .templates(toValue(params))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useGuildsTemplatesCode<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds.templates>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds.templates>['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds.templates>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.guilds.templates>['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.guilds.templates>['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getGuildsTemplatesCodeQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.guilds.templates>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getGuildsTemplatesCodeQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.guilds
          .templates(toValue(params))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getGuildsGuildIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  options?: Parameters<ReturnType<typeof client.guilds>['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['guilds', '/guilds/{guild_id}', toValue(params), keyArgs] as const
}

export function getGuildsGuildIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  options?: Parameters<ReturnType<typeof client.guilds>['get']>[0],
) {
  return {
    queryKey: computed(() => getGuildsGuildIdQueryKey(params, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .guilds(toValue(params))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useGuildsGuildId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.guilds>['get']>>['error'], null>,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.guilds>['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.guilds>['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getGuildsGuildIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.guilds>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getGuildsGuildIdQueryKey(params, clientOptions)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .guilds(toValue(params))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPatchGuildsGuildIdMutationKey() {
  return ['guilds', '/guilds/{guild_id}', 'PATCH'] as const
}

export function getPatchGuildsGuildIdMutationOptions<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.guilds>['patch']>>['error'], null>,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.guilds>['patch']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.guilds>['patch']>[0]
      options?: Parameters<ReturnType<typeof client.guilds>['patch']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPatchGuildsGuildIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.guilds(toValue(params)).patch(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePatchGuildsGuildId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.guilds>['patch']>>['error'], null>,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.guilds>['patch']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.guilds>['patch']>[0]
            options?: Parameters<ReturnType<typeof client.guilds>['patch']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPatchGuildsGuildIdMutationOptions<TError, TOnMutateResult>(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getGuildsGuildIdAuditLogsQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  options?: Parameters<ReturnType<typeof client.guilds>['audit-logs']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['guilds', '/guilds/{guild_id}/audit-logs', toValue(params), keyArgs] as const
}

export function getGuildsGuildIdAuditLogsQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  options?: Parameters<ReturnType<typeof client.guilds>['audit-logs']['get']>[0],
) {
  return {
    queryKey: computed(() => getGuildsGuildIdAuditLogsQueryKey(params, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .guilds(toValue(params))
        ['audit-logs'].get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useGuildsGuildIdAuditLogs<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['audit-logs']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['audit-logs']['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.guilds>['audit-logs']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.guilds>['audit-logs']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getGuildsGuildIdAuditLogsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.guilds>['audit-logs']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getGuildsGuildIdAuditLogsQueryKey(params, clientOptions)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .guilds(toValue(params))
          ['audit-logs'].get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getGuildsGuildIdAutoModerationRulesQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
) {
  return ['guilds', '/guilds/{guild_id}/auto-moderation/rules', toValue(params)] as const
}

export function getGuildsGuildIdAutoModerationRulesQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  options?: Parameters<ReturnType<typeof client.guilds>['auto-moderation']['rules']['get']>[0],
) {
  return {
    queryKey: computed(() => getGuildsGuildIdAutoModerationRulesQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .guilds(toValue(params))
        ['auto-moderation'].rules.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useGuildsGuildIdAutoModerationRules<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']['get']>
    >['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<
              ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']['get']>
            >,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<
              ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']['get']>
            >,
            { error: null }
          >['data'],
          ReturnType<typeof getGuildsGuildIdAutoModerationRulesQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.guilds>['auto-moderation']['rules']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getGuildsGuildIdAutoModerationRulesQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .guilds(toValue(params))
          ['auto-moderation'].rules.get({
            ...clientOptions,
            fetch: { ...clientOptions?.fetch, signal },
          })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostGuildsGuildIdAutoModerationRulesMutationKey() {
  return ['guilds', '/guilds/{guild_id}/auto-moderation/rules', 'POST'] as const
}

export function getPostGuildsGuildIdAutoModerationRulesMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.guilds>['auto-moderation']['rules']['post']>[0]
      options?: Parameters<ReturnType<typeof client.guilds>['auto-moderation']['rules']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostGuildsGuildIdAutoModerationRulesMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .guilds(toValue(params))
        ['auto-moderation'].rules.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostGuildsGuildIdAutoModerationRules<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']['post']>
            >,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<
              ReturnType<typeof client.guilds>['auto-moderation']['rules']['post']
            >[0]
            options?: Parameters<
              ReturnType<typeof client.guilds>['auto-moderation']['rules']['post']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostGuildsGuildIdAutoModerationRulesMutationOptions<
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

export function getGuildsGuildIdAutoModerationRulesRuleIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<
    Parameters<ReturnType<typeof client.guilds>['auto-moderation']['rules']>[0]
  >,
) {
  return [
    'guilds',
    '/guilds/{guild_id}/auto-moderation/rules/{rule_id}',
    toValue(params),
    toValue(params2),
  ] as const
}

export function getGuildsGuildIdAutoModerationRulesRuleIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<
    Parameters<ReturnType<typeof client.guilds>['auto-moderation']['rules']>[0]
  >,
  options?: Parameters<
    ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']>['get']
  >[0],
) {
  return {
    queryKey: computed(() => getGuildsGuildIdAutoModerationRulesRuleIdQueryKey(params, params2)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .guilds(toValue(params))
        ['auto-moderation'].rules(toValue(params2))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useGuildsGuildIdAutoModerationRulesRuleId<
  TData = Extract<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']>['get']>
    >,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']>['get']>
    >['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<
    Parameters<ReturnType<typeof client.guilds>['auto-moderation']['rules']>[0]
  >,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<
              ReturnType<
                ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']>['get']
              >
            >,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<
              ReturnType<
                ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']>['get']
              >
            >,
            { error: null }
          >['data'],
          ReturnType<typeof getGuildsGuildIdAutoModerationRulesRuleIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<
      ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']>['get']
    >[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getGuildsGuildIdAutoModerationRulesRuleIdQueryKey(params, params2)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .guilds(toValue(params))
          ['auto-moderation'].rules(toValue(params2))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getDeleteGuildsGuildIdAutoModerationRulesRuleIdMutationKey() {
  return ['guilds', '/guilds/{guild_id}/auto-moderation/rules/{rule_id}', 'DELETE'] as const
}

export function getDeleteGuildsGuildIdAutoModerationRulesRuleIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<
    Parameters<ReturnType<typeof client.guilds>['auto-moderation']['rules']>[0]
  >,
) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<
          ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']>['delete']
        >
      >,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<
        ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']>['delete']
      >[0]
      options?: Parameters<
        ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']>['delete']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteGuildsGuildIdAutoModerationRulesRuleIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .guilds(toValue(params))
        ['auto-moderation'].rules(toValue(params2))
        .delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeleteGuildsGuildIdAutoModerationRulesRuleId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<
    Parameters<ReturnType<typeof client.guilds>['auto-moderation']['rules']>[0]
  >,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<
                ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']>['delete']
              >
            >,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<
              ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']>['delete']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']>['delete']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteGuildsGuildIdAutoModerationRulesRuleIdMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPatchGuildsGuildIdAutoModerationRulesRuleIdMutationKey() {
  return ['guilds', '/guilds/{guild_id}/auto-moderation/rules/{rule_id}', 'PATCH'] as const
}

export function getPatchGuildsGuildIdAutoModerationRulesRuleIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']>['patch']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<
    Parameters<ReturnType<typeof client.guilds>['auto-moderation']['rules']>[0]
  >,
) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<
          ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']>['patch']
        >
      >,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<
        ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']>['patch']
      >[0]
      options?: Parameters<
        ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']>['patch']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPatchGuildsGuildIdAutoModerationRulesRuleIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .guilds(toValue(params))
        ['auto-moderation'].rules(toValue(params2))
        .patch(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePatchGuildsGuildIdAutoModerationRulesRuleId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']>['patch']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<
    Parameters<ReturnType<typeof client.guilds>['auto-moderation']['rules']>[0]
  >,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<
                ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']>['patch']
              >
            >,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<
              ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']>['patch']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.guilds>['auto-moderation']['rules']>['patch']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPatchGuildsGuildIdAutoModerationRulesRuleIdMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getGuildsGuildIdBansQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  options?: Parameters<ReturnType<typeof client.guilds>['bans']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['guilds', '/guilds/{guild_id}/bans', toValue(params), keyArgs] as const
}

export function getGuildsGuildIdBansQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  options?: Parameters<ReturnType<typeof client.guilds>['bans']['get']>[0],
) {
  return {
    queryKey: computed(() => getGuildsGuildIdBansQueryKey(params, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .guilds(toValue(params))
        .bans.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useGuildsGuildIdBans<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['bans']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['bans']['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.guilds>['bans']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.guilds>['bans']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getGuildsGuildIdBansQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.guilds>['bans']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getGuildsGuildIdBansQueryKey(params, clientOptions)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .guilds(toValue(params))
          .bans.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getGuildsGuildIdBansUserIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.guilds>['bans']>[0]>,
) {
  return ['guilds', '/guilds/{guild_id}/bans/{user_id}', toValue(params), toValue(params2)] as const
}

export function getGuildsGuildIdBansUserIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.guilds>['bans']>[0]>,
  options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['bans']>['get']>[0],
) {
  return {
    queryKey: computed(() => getGuildsGuildIdBansUserIdQueryKey(params, params2)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .guilds(toValue(params))
        .bans(toValue(params2))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useGuildsGuildIdBansUserId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['bans']>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['bans']>['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.guilds>['bans']>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['bans']>['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['bans']>['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getGuildsGuildIdBansUserIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['bans']>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getGuildsGuildIdBansUserIdQueryKey(params, params2)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .guilds(toValue(params))
          .bans(toValue(params2))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPutGuildsGuildIdBansUserIdMutationKey() {
  return ['guilds', '/guilds/{guild_id}/bans/{user_id}', 'PUT'] as const
}

export function getPutGuildsGuildIdBansUserIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['bans']>['put']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.guilds>['bans']>[0]>,
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['bans']>['put']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<ReturnType<typeof client.guilds>['bans']>['put']>[0]
      options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['bans']>['put']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPutGuildsGuildIdBansUserIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .guilds(toValue(params))
        .bans(toValue(params2))
        .put(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePutGuildsGuildIdBansUserId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['bans']>['put']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.guilds>['bans']>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['bans']>['put']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<ReturnType<typeof client.guilds>['bans']>['put']>[0]
            options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['bans']>['put']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPutGuildsGuildIdBansUserIdMutationOptions<TError, TOnMutateResult>(
    params,
    params2,
  )
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getDeleteGuildsGuildIdBansUserIdMutationKey() {
  return ['guilds', '/guilds/{guild_id}/bans/{user_id}', 'DELETE'] as const
}

export function getDeleteGuildsGuildIdBansUserIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['bans']>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.guilds>['bans']>[0]>,
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['bans']>['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<ReturnType<typeof client.guilds>['bans']>['delete']>[0]
      options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['bans']>['delete']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteGuildsGuildIdBansUserIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .guilds(toValue(params))
        .bans(toValue(params2))
        .delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeleteGuildsGuildIdBansUserId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['bans']>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.guilds>['bans']>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['bans']>['delete']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<ReturnType<typeof client.guilds>['bans']>['delete']>[0]
            options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['bans']>['delete']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteGuildsGuildIdBansUserIdMutationOptions<TError, TOnMutateResult>(
    params,
    params2,
  )
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPostGuildsGuildIdBulkBanMutationKey() {
  return ['guilds', '/guilds/{guild_id}/bulk-ban', 'POST'] as const
}

export function getPostGuildsGuildIdBulkBanMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['bulk-ban']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.guilds>['bulk-ban']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.guilds>['bulk-ban']['post']>[0]
      options?: Parameters<ReturnType<typeof client.guilds>['bulk-ban']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostGuildsGuildIdBulkBanMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.guilds(toValue(params))['bulk-ban'].post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostGuildsGuildIdBulkBan<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['bulk-ban']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.guilds>['bulk-ban']['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.guilds>['bulk-ban']['post']>[0]
            options?: Parameters<ReturnType<typeof client.guilds>['bulk-ban']['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostGuildsGuildIdBulkBanMutationOptions<TError, TOnMutateResult>(
    params,
  )
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getGuildsGuildIdChannelsQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
) {
  return ['guilds', '/guilds/{guild_id}/channels', toValue(params)] as const
}

export function getGuildsGuildIdChannelsQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  options?: Parameters<ReturnType<typeof client.guilds>['channels']['get']>[0],
) {
  return {
    queryKey: computed(() => getGuildsGuildIdChannelsQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .guilds(toValue(params))
        .channels.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useGuildsGuildIdChannels<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['channels']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['channels']['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.guilds>['channels']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.guilds>['channels']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getGuildsGuildIdChannelsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.guilds>['channels']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getGuildsGuildIdChannelsQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .guilds(toValue(params))
          .channels.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostGuildsGuildIdChannelsMutationKey() {
  return ['guilds', '/guilds/{guild_id}/channels', 'POST'] as const
}

export function getPostGuildsGuildIdChannelsMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['channels']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.guilds>['channels']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.guilds>['channels']['post']>[0]
      options?: Parameters<ReturnType<typeof client.guilds>['channels']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostGuildsGuildIdChannelsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.guilds(toValue(params)).channels.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostGuildsGuildIdChannels<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['channels']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.guilds>['channels']['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.guilds>['channels']['post']>[0]
            options?: Parameters<ReturnType<typeof client.guilds>['channels']['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostGuildsGuildIdChannelsMutationOptions<TError, TOnMutateResult>(
    params,
  )
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPatchGuildsGuildIdChannelsMutationKey() {
  return ['guilds', '/guilds/{guild_id}/channels', 'PATCH'] as const
}

export function getPatchGuildsGuildIdChannelsMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['channels']['patch']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.guilds>['channels']['patch']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.guilds>['channels']['patch']>[0]
      options?: Parameters<ReturnType<typeof client.guilds>['channels']['patch']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPatchGuildsGuildIdChannelsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.guilds(toValue(params)).channels.patch(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePatchGuildsGuildIdChannels<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['channels']['patch']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.guilds>['channels']['patch']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.guilds>['channels']['patch']>[0]
            options?: Parameters<ReturnType<typeof client.guilds>['channels']['patch']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPatchGuildsGuildIdChannelsMutationOptions<TError, TOnMutateResult>(
    params,
  )
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getGuildsGuildIdEmojisQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
) {
  return ['guilds', '/guilds/{guild_id}/emojis', toValue(params)] as const
}

export function getGuildsGuildIdEmojisQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  options?: Parameters<ReturnType<typeof client.guilds>['emojis']['get']>[0],
) {
  return {
    queryKey: computed(() => getGuildsGuildIdEmojisQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .guilds(toValue(params))
        .emojis.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useGuildsGuildIdEmojis<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['emojis']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['emojis']['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.guilds>['emojis']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.guilds>['emojis']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getGuildsGuildIdEmojisQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.guilds>['emojis']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getGuildsGuildIdEmojisQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .guilds(toValue(params))
          .emojis.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostGuildsGuildIdEmojisMutationKey() {
  return ['guilds', '/guilds/{guild_id}/emojis', 'POST'] as const
}

export function getPostGuildsGuildIdEmojisMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['emojis']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.guilds>['emojis']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.guilds>['emojis']['post']>[0]
      options?: Parameters<ReturnType<typeof client.guilds>['emojis']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostGuildsGuildIdEmojisMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.guilds(toValue(params)).emojis.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostGuildsGuildIdEmojis<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['emojis']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.guilds>['emojis']['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.guilds>['emojis']['post']>[0]
            options?: Parameters<ReturnType<typeof client.guilds>['emojis']['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostGuildsGuildIdEmojisMutationOptions<TError, TOnMutateResult>(
    params,
  )
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getGuildsGuildIdEmojisEmojiIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.guilds>['emojis']>[0]>,
) {
  return [
    'guilds',
    '/guilds/{guild_id}/emojis/{emoji_id}',
    toValue(params),
    toValue(params2),
  ] as const
}

export function getGuildsGuildIdEmojisEmojiIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.guilds>['emojis']>[0]>,
  options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['emojis']>['get']>[0],
) {
  return {
    queryKey: computed(() => getGuildsGuildIdEmojisEmojiIdQueryKey(params, params2)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .guilds(toValue(params))
        .emojis(toValue(params2))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useGuildsGuildIdEmojisEmojiId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['emojis']>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['emojis']>['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.guilds>['emojis']>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['emojis']>['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['emojis']>['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getGuildsGuildIdEmojisEmojiIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['emojis']>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getGuildsGuildIdEmojisEmojiIdQueryKey(params, params2)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .guilds(toValue(params))
          .emojis(toValue(params2))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getDeleteGuildsGuildIdEmojisEmojiIdMutationKey() {
  return ['guilds', '/guilds/{guild_id}/emojis/{emoji_id}', 'DELETE'] as const
}

export function getDeleteGuildsGuildIdEmojisEmojiIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['emojis']>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.guilds>['emojis']>[0]>,
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['emojis']>['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<ReturnType<typeof client.guilds>['emojis']>['delete']>[0]
      options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['emojis']>['delete']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteGuildsGuildIdEmojisEmojiIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .guilds(toValue(params))
        .emojis(toValue(params2))
        .delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeleteGuildsGuildIdEmojisEmojiId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['emojis']>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.guilds>['emojis']>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['emojis']>['delete']>>,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<ReturnType<ReturnType<typeof client.guilds>['emojis']>['delete']>[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.guilds>['emojis']>['delete']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteGuildsGuildIdEmojisEmojiIdMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPatchGuildsGuildIdEmojisEmojiIdMutationKey() {
  return ['guilds', '/guilds/{guild_id}/emojis/{emoji_id}', 'PATCH'] as const
}

export function getPatchGuildsGuildIdEmojisEmojiIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['emojis']>['patch']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.guilds>['emojis']>[0]>,
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['emojis']>['patch']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<ReturnType<typeof client.guilds>['emojis']>['patch']>[0]
      options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['emojis']>['patch']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPatchGuildsGuildIdEmojisEmojiIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .guilds(toValue(params))
        .emojis(toValue(params2))
        .patch(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePatchGuildsGuildIdEmojisEmojiId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['emojis']>['patch']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.guilds>['emojis']>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['emojis']>['patch']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<ReturnType<typeof client.guilds>['emojis']>['patch']>[0]
            options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['emojis']>['patch']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPatchGuildsGuildIdEmojisEmojiIdMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPutGuildsGuildIdIncidentActionsMutationKey() {
  return ['guilds', '/guilds/{guild_id}/incident-actions', 'PUT'] as const
}

export function getPutGuildsGuildIdIncidentActionsMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['incident-actions']['put']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.guilds>['incident-actions']['put']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.guilds>['incident-actions']['put']>[0]
      options?: Parameters<ReturnType<typeof client.guilds>['incident-actions']['put']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPutGuildsGuildIdIncidentActionsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .guilds(toValue(params))
        ['incident-actions'].put(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePutGuildsGuildIdIncidentActions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['incident-actions']['put']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.guilds>['incident-actions']['put']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.guilds>['incident-actions']['put']>[0]
            options?: Parameters<ReturnType<typeof client.guilds>['incident-actions']['put']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPutGuildsGuildIdIncidentActionsMutationOptions<
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

export function getGuildsGuildIdIntegrationsQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
) {
  return ['guilds', '/guilds/{guild_id}/integrations', toValue(params)] as const
}

export function getGuildsGuildIdIntegrationsQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  options?: Parameters<ReturnType<typeof client.guilds>['integrations']['get']>[0],
) {
  return {
    queryKey: computed(() => getGuildsGuildIdIntegrationsQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .guilds(toValue(params))
        .integrations.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useGuildsGuildIdIntegrations<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['integrations']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['integrations']['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.guilds>['integrations']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.guilds>['integrations']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getGuildsGuildIdIntegrationsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.guilds>['integrations']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getGuildsGuildIdIntegrationsQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .guilds(toValue(params))
          .integrations.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getDeleteGuildsGuildIdIntegrationsIntegrationIdMutationKey() {
  return ['guilds', '/guilds/{guild_id}/integrations/{integration_id}', 'DELETE'] as const
}

export function getDeleteGuildsGuildIdIntegrationsIntegrationIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['integrations']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.guilds>['integrations']>[0]>,
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['integrations']>['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<ReturnType<typeof client.guilds>['integrations']>['delete']>[0]
      options?: Parameters<
        ReturnType<ReturnType<typeof client.guilds>['integrations']>['delete']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteGuildsGuildIdIntegrationsIntegrationIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .guilds(toValue(params))
        .integrations(toValue(params2))
        .delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeleteGuildsGuildIdIntegrationsIntegrationId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['integrations']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.guilds>['integrations']>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<ReturnType<ReturnType<typeof client.guilds>['integrations']>['delete']>
            >,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<
              ReturnType<ReturnType<typeof client.guilds>['integrations']>['delete']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.guilds>['integrations']>['delete']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteGuildsGuildIdIntegrationsIntegrationIdMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getGuildsGuildIdInvitesQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
) {
  return ['guilds', '/guilds/{guild_id}/invites', toValue(params)] as const
}

export function getGuildsGuildIdInvitesQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  options?: Parameters<ReturnType<typeof client.guilds>['invites']['get']>[0],
) {
  return {
    queryKey: computed(() => getGuildsGuildIdInvitesQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .guilds(toValue(params))
        .invites.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useGuildsGuildIdInvites<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['invites']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['invites']['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.guilds>['invites']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.guilds>['invites']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getGuildsGuildIdInvitesQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.guilds>['invites']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getGuildsGuildIdInvitesQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .guilds(toValue(params))
          .invites.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getGuildsGuildIdMembersQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  options?: Parameters<ReturnType<typeof client.guilds>['members']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['guilds', '/guilds/{guild_id}/members', toValue(params), keyArgs] as const
}

export function getGuildsGuildIdMembersQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  options?: Parameters<ReturnType<typeof client.guilds>['members']['get']>[0],
) {
  return {
    queryKey: computed(() => getGuildsGuildIdMembersQueryKey(params, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .guilds(toValue(params))
        .members.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useGuildsGuildIdMembers<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['members']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['members']['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.guilds>['members']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.guilds>['members']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getGuildsGuildIdMembersQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.guilds>['members']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getGuildsGuildIdMembersQueryKey(params, clientOptions)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .guilds(toValue(params))
          .members.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPatchGuildsGuildIdMembersMeMutationKey() {
  return ['guilds', '/guilds/{guild_id}/members/@me', 'PATCH'] as const
}

export function getPatchGuildsGuildIdMembersMeMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['members']['@me']['patch']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.guilds>['members']['@me']['patch']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.guilds>['members']['@me']['patch']>[0]
      options?: Parameters<ReturnType<typeof client.guilds>['members']['@me']['patch']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPatchGuildsGuildIdMembersMeMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .guilds(toValue(params))
        .members['@me'].patch(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePatchGuildsGuildIdMembersMe<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['members']['@me']['patch']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.guilds>['members']['@me']['patch']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.guilds>['members']['@me']['patch']>[0]
            options?: Parameters<ReturnType<typeof client.guilds>['members']['@me']['patch']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPatchGuildsGuildIdMembersMeMutationOptions<TError, TOnMutateResult>(
    params,
  )
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getGuildsGuildIdMembersSearchQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  options: Parameters<ReturnType<typeof client.guilds>['members']['search']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['guilds', '/guilds/{guild_id}/members/search', toValue(params), keyArgs] as const
}

export function getGuildsGuildIdMembersSearchQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  options: Parameters<ReturnType<typeof client.guilds>['members']['search']['get']>[0],
) {
  return {
    queryKey: computed(() => getGuildsGuildIdMembersSearchQueryKey(params, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .guilds(toValue(params))
        .members.search.get({ ...options, fetch: { ...options.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useGuildsGuildIdMembersSearch<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['members']['search']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['members']['search']['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  options: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.guilds>['members']['search']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.guilds>['members']['search']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getGuildsGuildIdMembersSearchQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<ReturnType<typeof client.guilds>['members']['search']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getGuildsGuildIdMembersSearchQueryKey(params, clientOptions)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .guilds(toValue(params))
          .members.search.get({ ...clientOptions, fetch: { ...clientOptions.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getGuildsGuildIdMembersUserIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.guilds>['members']>[0]>,
) {
  return [
    'guilds',
    '/guilds/{guild_id}/members/{user_id}',
    toValue(params),
    toValue(params2),
  ] as const
}

export function getGuildsGuildIdMembersUserIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.guilds>['members']>[0]>,
  options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['members']>['get']>[0],
) {
  return {
    queryKey: computed(() => getGuildsGuildIdMembersUserIdQueryKey(params, params2)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .guilds(toValue(params))
        .members(toValue(params2))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useGuildsGuildIdMembersUserId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.guilds>['members']>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getGuildsGuildIdMembersUserIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['members']>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getGuildsGuildIdMembersUserIdQueryKey(params, params2)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .guilds(toValue(params))
          .members(toValue(params2))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPutGuildsGuildIdMembersUserIdMutationKey() {
  return ['guilds', '/guilds/{guild_id}/members/{user_id}', 'PUT'] as const
}

export function getPutGuildsGuildIdMembersUserIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['put']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.guilds>['members']>[0]>,
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['put']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<ReturnType<typeof client.guilds>['members']>['put']>[0]
      options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['members']>['put']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPutGuildsGuildIdMembersUserIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .guilds(toValue(params))
        .members(toValue(params2))
        .put(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePutGuildsGuildIdMembersUserId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['put']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.guilds>['members']>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['put']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<ReturnType<typeof client.guilds>['members']>['put']>[0]
            options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['members']>['put']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPutGuildsGuildIdMembersUserIdMutationOptions<TError, TOnMutateResult>(
    params,
    params2,
  )
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getDeleteGuildsGuildIdMembersUserIdMutationKey() {
  return ['guilds', '/guilds/{guild_id}/members/{user_id}', 'DELETE'] as const
}

export function getDeleteGuildsGuildIdMembersUserIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.guilds>['members']>[0]>,
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<ReturnType<typeof client.guilds>['members']>['delete']>[0]
      options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['members']>['delete']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteGuildsGuildIdMembersUserIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .guilds(toValue(params))
        .members(toValue(params2))
        .delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeleteGuildsGuildIdMembersUserId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.guilds>['members']>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['delete']>>,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<ReturnType<ReturnType<typeof client.guilds>['members']>['delete']>[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.guilds>['members']>['delete']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteGuildsGuildIdMembersUserIdMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPatchGuildsGuildIdMembersUserIdMutationKey() {
  return ['guilds', '/guilds/{guild_id}/members/{user_id}', 'PATCH'] as const
}

export function getPatchGuildsGuildIdMembersUserIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['patch']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.guilds>['members']>[0]>,
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['patch']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<ReturnType<typeof client.guilds>['members']>['patch']>[0]
      options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['members']>['patch']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPatchGuildsGuildIdMembersUserIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .guilds(toValue(params))
        .members(toValue(params2))
        .patch(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePatchGuildsGuildIdMembersUserId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['patch']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.guilds>['members']>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['patch']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<ReturnType<typeof client.guilds>['members']>['patch']>[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.guilds>['members']>['patch']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPatchGuildsGuildIdMembersUserIdMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPutGuildsGuildIdMembersUserIdRolesRoleIdMutationKey() {
  return ['guilds', '/guilds/{guild_id}/members/{user_id}/roles/{role_id}', 'PUT'] as const
}

export function getPutGuildsGuildIdMembersUserIdRolesRoleIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['roles']>['put']
      >
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.guilds>['members']>[0]>,
  params3: MaybeRefOrGetter<
    Parameters<ReturnType<ReturnType<typeof client.guilds>['members']>['roles']>[0]
  >,
) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<
          ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['roles']>['put']
        >
      >,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<
        ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['roles']>['put']
      >[0]
      options?: Parameters<
        ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['roles']>['put']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPutGuildsGuildIdMembersUserIdRolesRoleIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .guilds(toValue(params))
        .members(toValue(params2))
        .roles(toValue(params3))
        .put(body, options)
      if (error) throw error
      return data
    },
  })
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
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.guilds>['members']>[0]>,
  params3: MaybeRefOrGetter<
    Parameters<ReturnType<ReturnType<typeof client.guilds>['members']>['roles']>[0]
  >,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<
                ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['roles']>['put']
              >
            >,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<
              ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['roles']>['put']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['roles']>['put']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPutGuildsGuildIdMembersUserIdRolesRoleIdMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2, params3)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getDeleteGuildsGuildIdMembersUserIdRolesRoleIdMutationKey() {
  return ['guilds', '/guilds/{guild_id}/members/{user_id}/roles/{role_id}', 'DELETE'] as const
}

export function getDeleteGuildsGuildIdMembersUserIdRolesRoleIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['roles']>['delete']
      >
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.guilds>['members']>[0]>,
  params3: MaybeRefOrGetter<
    Parameters<ReturnType<ReturnType<typeof client.guilds>['members']>['roles']>[0]
  >,
) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<
          ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['roles']>['delete']
        >
      >,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<
        ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['roles']>['delete']
      >[0]
      options?: Parameters<
        ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['roles']>['delete']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteGuildsGuildIdMembersUserIdRolesRoleIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .guilds(toValue(params))
        .members(toValue(params2))
        .roles(toValue(params3))
        .delete(body, options)
      if (error) throw error
      return data
    },
  })
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
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.guilds>['members']>[0]>,
  params3: MaybeRefOrGetter<
    Parameters<ReturnType<ReturnType<typeof client.guilds>['members']>['roles']>[0]
  >,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<
                ReturnType<
                  ReturnType<ReturnType<typeof client.guilds>['members']>['roles']
                >['delete']
              >
            >,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<
              ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['roles']>['delete']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<ReturnType<typeof client.guilds>['members']>['roles']>['delete']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteGuildsGuildIdMembersUserIdRolesRoleIdMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2, params3)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getGuildsGuildIdMessagesSearchQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  options?: Parameters<ReturnType<typeof client.guilds>['messages']['search']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['guilds', '/guilds/{guild_id}/messages/search', toValue(params), keyArgs] as const
}

export function getGuildsGuildIdMessagesSearchQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  options?: Parameters<ReturnType<typeof client.guilds>['messages']['search']['get']>[0],
) {
  return {
    queryKey: computed(() => getGuildsGuildIdMessagesSearchQueryKey(params, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .guilds(toValue(params))
        .messages.search.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useGuildsGuildIdMessagesSearch<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['messages']['search']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['messages']['search']['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.guilds>['messages']['search']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.guilds>['messages']['search']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getGuildsGuildIdMessagesSearchQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.guilds>['messages']['search']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getGuildsGuildIdMessagesSearchQueryKey(params, clientOptions)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .guilds(toValue(params))
          .messages.search.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getGuildsGuildIdNewMemberWelcomeQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
) {
  return ['guilds', '/guilds/{guild_id}/new-member-welcome', toValue(params)] as const
}

export function getGuildsGuildIdNewMemberWelcomeQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  options?: Parameters<ReturnType<typeof client.guilds>['new-member-welcome']['get']>[0],
) {
  return {
    queryKey: computed(() => getGuildsGuildIdNewMemberWelcomeQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .guilds(toValue(params))
        ['new-member-welcome'].get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useGuildsGuildIdNewMemberWelcome<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['new-member-welcome']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['new-member-welcome']['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.guilds>['new-member-welcome']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.guilds>['new-member-welcome']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getGuildsGuildIdNewMemberWelcomeQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.guilds>['new-member-welcome']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getGuildsGuildIdNewMemberWelcomeQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .guilds(toValue(params))
          ['new-member-welcome'].get({
            ...clientOptions,
            fetch: { ...clientOptions?.fetch, signal },
          })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getGuildsGuildIdOnboardingQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
) {
  return ['guilds', '/guilds/{guild_id}/onboarding', toValue(params)] as const
}

export function getGuildsGuildIdOnboardingQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  options?: Parameters<ReturnType<typeof client.guilds>['onboarding']['get']>[0],
) {
  return {
    queryKey: computed(() => getGuildsGuildIdOnboardingQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .guilds(toValue(params))
        .onboarding.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useGuildsGuildIdOnboarding<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['onboarding']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['onboarding']['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.guilds>['onboarding']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.guilds>['onboarding']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getGuildsGuildIdOnboardingQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.guilds>['onboarding']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getGuildsGuildIdOnboardingQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .guilds(toValue(params))
          .onboarding.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPutGuildsGuildIdOnboardingMutationKey() {
  return ['guilds', '/guilds/{guild_id}/onboarding', 'PUT'] as const
}

export function getPutGuildsGuildIdOnboardingMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['onboarding']['put']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.guilds>['onboarding']['put']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.guilds>['onboarding']['put']>[0]
      options?: Parameters<ReturnType<typeof client.guilds>['onboarding']['put']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPutGuildsGuildIdOnboardingMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.guilds(toValue(params)).onboarding.put(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePutGuildsGuildIdOnboarding<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['onboarding']['put']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.guilds>['onboarding']['put']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.guilds>['onboarding']['put']>[0]
            options?: Parameters<ReturnType<typeof client.guilds>['onboarding']['put']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPutGuildsGuildIdOnboardingMutationOptions<TError, TOnMutateResult>(
    params,
  )
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getGuildsGuildIdPermissionsMemberUserIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<
    Parameters<ReturnType<typeof client.guilds>['permissions']['member']>[0]
  >,
) {
  return [
    'guilds',
    '/guilds/{guild_id}/permissions/member/{user_id}',
    toValue(params),
    toValue(params2),
  ] as const
}

export function getGuildsGuildIdPermissionsMemberUserIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<
    Parameters<ReturnType<typeof client.guilds>['permissions']['member']>[0]
  >,
  options?: Parameters<
    ReturnType<ReturnType<typeof client.guilds>['permissions']['member']>['get']
  >[0],
) {
  return {
    queryKey: computed(() => getGuildsGuildIdPermissionsMemberUserIdQueryKey(params, params2)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .guilds(toValue(params))
        .permissions.member(toValue(params2))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useGuildsGuildIdPermissionsMemberUserId<
  TData = Extract<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['permissions']['member']>['get']>
    >,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['permissions']['member']>['get']>
    >['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<
    Parameters<ReturnType<typeof client.guilds>['permissions']['member']>[0]
  >,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<
              ReturnType<
                ReturnType<ReturnType<typeof client.guilds>['permissions']['member']>['get']
              >
            >,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<
              ReturnType<
                ReturnType<ReturnType<typeof client.guilds>['permissions']['member']>['get']
              >
            >,
            { error: null }
          >['data'],
          ReturnType<typeof getGuildsGuildIdPermissionsMemberUserIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<
      ReturnType<ReturnType<typeof client.guilds>['permissions']['member']>['get']
    >[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getGuildsGuildIdPermissionsMemberUserIdQueryKey(params, params2)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .guilds(toValue(params))
          .permissions.member(toValue(params2))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getGuildsGuildIdPermissionsRoleRoleIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.guilds>['permissions']['role']>[0]>,
) {
  return [
    'guilds',
    '/guilds/{guild_id}/permissions/role/{role_id}',
    toValue(params),
    toValue(params2),
  ] as const
}

export function getGuildsGuildIdPermissionsRoleRoleIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.guilds>['permissions']['role']>[0]>,
  options?: Parameters<
    ReturnType<ReturnType<typeof client.guilds>['permissions']['role']>['get']
  >[0],
) {
  return {
    queryKey: computed(() => getGuildsGuildIdPermissionsRoleRoleIdQueryKey(params, params2)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .guilds(toValue(params))
        .permissions.role(toValue(params2))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useGuildsGuildIdPermissionsRoleRoleId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['permissions']['role']>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['permissions']['role']>['get']>
    >['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.guilds>['permissions']['role']>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<
              ReturnType<ReturnType<ReturnType<typeof client.guilds>['permissions']['role']>['get']>
            >,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<
              ReturnType<ReturnType<ReturnType<typeof client.guilds>['permissions']['role']>['get']>
            >,
            { error: null }
          >['data'],
          ReturnType<typeof getGuildsGuildIdPermissionsRoleRoleIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<
      ReturnType<ReturnType<typeof client.guilds>['permissions']['role']>['get']
    >[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getGuildsGuildIdPermissionsRoleRoleIdQueryKey(params, params2)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .guilds(toValue(params))
          .permissions.role(toValue(params2))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getGuildsGuildIdPreviewQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
) {
  return ['guilds', '/guilds/{guild_id}/preview', toValue(params)] as const
}

export function getGuildsGuildIdPreviewQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  options?: Parameters<ReturnType<typeof client.guilds>['preview']['get']>[0],
) {
  return {
    queryKey: computed(() => getGuildsGuildIdPreviewQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .guilds(toValue(params))
        .preview.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useGuildsGuildIdPreview<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['preview']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['preview']['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.guilds>['preview']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.guilds>['preview']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getGuildsGuildIdPreviewQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.guilds>['preview']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getGuildsGuildIdPreviewQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .guilds(toValue(params))
          .preview.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getGuildsGuildIdPruneQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  options?: Parameters<ReturnType<typeof client.guilds>['prune']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['guilds', '/guilds/{guild_id}/prune', toValue(params), keyArgs] as const
}

export function getGuildsGuildIdPruneQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  options?: Parameters<ReturnType<typeof client.guilds>['prune']['get']>[0],
) {
  return {
    queryKey: computed(() => getGuildsGuildIdPruneQueryKey(params, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .guilds(toValue(params))
        .prune.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useGuildsGuildIdPrune<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['prune']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['prune']['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.guilds>['prune']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.guilds>['prune']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getGuildsGuildIdPruneQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.guilds>['prune']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getGuildsGuildIdPruneQueryKey(params, clientOptions)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .guilds(toValue(params))
          .prune.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostGuildsGuildIdPruneMutationKey() {
  return ['guilds', '/guilds/{guild_id}/prune', 'POST'] as const
}

export function getPostGuildsGuildIdPruneMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['prune']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.guilds>['prune']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.guilds>['prune']['post']>[0]
      options?: Parameters<ReturnType<typeof client.guilds>['prune']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostGuildsGuildIdPruneMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.guilds(toValue(params)).prune.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostGuildsGuildIdPrune<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['prune']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.guilds>['prune']['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.guilds>['prune']['post']>[0]
            options?: Parameters<ReturnType<typeof client.guilds>['prune']['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostGuildsGuildIdPruneMutationOptions<TError, TOnMutateResult>(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getGuildsGuildIdRegionsQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
) {
  return ['guilds', '/guilds/{guild_id}/regions', toValue(params)] as const
}

export function getGuildsGuildIdRegionsQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  options?: Parameters<ReturnType<typeof client.guilds>['regions']['get']>[0],
) {
  return {
    queryKey: computed(() => getGuildsGuildIdRegionsQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .guilds(toValue(params))
        .regions.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useGuildsGuildIdRegions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['regions']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['regions']['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.guilds>['regions']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.guilds>['regions']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getGuildsGuildIdRegionsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.guilds>['regions']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getGuildsGuildIdRegionsQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .guilds(toValue(params))
          .regions.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getGuildsGuildIdRequestsQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  options?: Parameters<ReturnType<typeof client.guilds>['requests']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['guilds', '/guilds/{guild_id}/requests', toValue(params), keyArgs] as const
}

export function getGuildsGuildIdRequestsQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  options?: Parameters<ReturnType<typeof client.guilds>['requests']['get']>[0],
) {
  return {
    queryKey: computed(() => getGuildsGuildIdRequestsQueryKey(params, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .guilds(toValue(params))
        .requests.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useGuildsGuildIdRequests<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['requests']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['requests']['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.guilds>['requests']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.guilds>['requests']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getGuildsGuildIdRequestsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.guilds>['requests']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getGuildsGuildIdRequestsQueryKey(params, clientOptions)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .guilds(toValue(params))
          .requests.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPatchGuildsGuildIdRequestsRequestIdMutationKey() {
  return ['guilds', '/guilds/{guild_id}/requests/{request_id}', 'PATCH'] as const
}

export function getPatchGuildsGuildIdRequestsRequestIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['requests']>['patch']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.guilds>['requests']>[0]>,
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['requests']>['patch']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<ReturnType<typeof client.guilds>['requests']>['patch']>[0]
      options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['requests']>['patch']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPatchGuildsGuildIdRequestsRequestIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .guilds(toValue(params))
        .requests(toValue(params2))
        .patch(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePatchGuildsGuildIdRequestsRequestId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['requests']>['patch']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.guilds>['requests']>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['requests']>['patch']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<ReturnType<typeof client.guilds>['requests']>['patch']>[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.guilds>['requests']>['patch']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPatchGuildsGuildIdRequestsRequestIdMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getGuildsGuildIdRolesQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
) {
  return ['guilds', '/guilds/{guild_id}/roles', toValue(params)] as const
}

export function getGuildsGuildIdRolesQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  options?: Parameters<ReturnType<typeof client.guilds>['roles']['get']>[0],
) {
  return {
    queryKey: computed(() => getGuildsGuildIdRolesQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .guilds(toValue(params))
        .roles.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useGuildsGuildIdRoles<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['roles']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['roles']['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.guilds>['roles']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.guilds>['roles']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getGuildsGuildIdRolesQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.guilds>['roles']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getGuildsGuildIdRolesQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .guilds(toValue(params))
          .roles.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostGuildsGuildIdRolesMutationKey() {
  return ['guilds', '/guilds/{guild_id}/roles', 'POST'] as const
}

export function getPostGuildsGuildIdRolesMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['roles']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.guilds>['roles']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.guilds>['roles']['post']>[0]
      options?: Parameters<ReturnType<typeof client.guilds>['roles']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostGuildsGuildIdRolesMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.guilds(toValue(params)).roles.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostGuildsGuildIdRoles<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['roles']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.guilds>['roles']['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.guilds>['roles']['post']>[0]
            options?: Parameters<ReturnType<typeof client.guilds>['roles']['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostGuildsGuildIdRolesMutationOptions<TError, TOnMutateResult>(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPatchGuildsGuildIdRolesMutationKey() {
  return ['guilds', '/guilds/{guild_id}/roles', 'PATCH'] as const
}

export function getPatchGuildsGuildIdRolesMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['roles']['patch']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.guilds>['roles']['patch']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.guilds>['roles']['patch']>[0]
      options?: Parameters<ReturnType<typeof client.guilds>['roles']['patch']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPatchGuildsGuildIdRolesMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.guilds(toValue(params)).roles.patch(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePatchGuildsGuildIdRoles<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['roles']['patch']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.guilds>['roles']['patch']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.guilds>['roles']['patch']>[0]
            options?: Parameters<ReturnType<typeof client.guilds>['roles']['patch']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPatchGuildsGuildIdRolesMutationOptions<TError, TOnMutateResult>(
    params,
  )
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getGuildsGuildIdRolesMemberCountsQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
) {
  return ['guilds', '/guilds/{guild_id}/roles/member-counts', toValue(params)] as const
}

export function getGuildsGuildIdRolesMemberCountsQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  options?: Parameters<ReturnType<typeof client.guilds>['roles']['member-counts']['get']>[0],
) {
  return {
    queryKey: computed(() => getGuildsGuildIdRolesMemberCountsQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .guilds(toValue(params))
        .roles['member-counts'].get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useGuildsGuildIdRolesMemberCounts<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['roles']['member-counts']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['roles']['member-counts']['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.guilds>['roles']['member-counts']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.guilds>['roles']['member-counts']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getGuildsGuildIdRolesMemberCountsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.guilds>['roles']['member-counts']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getGuildsGuildIdRolesMemberCountsQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .guilds(toValue(params))
          .roles['member-counts'].get({
            ...clientOptions,
            fetch: { ...clientOptions?.fetch, signal },
          })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getGuildsGuildIdRolesRoleIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.guilds>['roles']>[0]>,
) {
  return [
    'guilds',
    '/guilds/{guild_id}/roles/{role_id}',
    toValue(params),
    toValue(params2),
  ] as const
}

export function getGuildsGuildIdRolesRoleIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.guilds>['roles']>[0]>,
  options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['roles']>['get']>[0],
) {
  return {
    queryKey: computed(() => getGuildsGuildIdRolesRoleIdQueryKey(params, params2)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .guilds(toValue(params))
        .roles(toValue(params2))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useGuildsGuildIdRolesRoleId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['roles']>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['roles']>['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.guilds>['roles']>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['roles']>['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['roles']>['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getGuildsGuildIdRolesRoleIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['roles']>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getGuildsGuildIdRolesRoleIdQueryKey(params, params2)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .guilds(toValue(params))
          .roles(toValue(params2))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getDeleteGuildsGuildIdRolesRoleIdMutationKey() {
  return ['guilds', '/guilds/{guild_id}/roles/{role_id}', 'DELETE'] as const
}

export function getDeleteGuildsGuildIdRolesRoleIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['roles']>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.guilds>['roles']>[0]>,
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['roles']>['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<ReturnType<typeof client.guilds>['roles']>['delete']>[0]
      options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['roles']>['delete']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteGuildsGuildIdRolesRoleIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .guilds(toValue(params))
        .roles(toValue(params2))
        .delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeleteGuildsGuildIdRolesRoleId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['roles']>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.guilds>['roles']>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['roles']>['delete']>>,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<ReturnType<ReturnType<typeof client.guilds>['roles']>['delete']>[0]
            options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['roles']>['delete']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteGuildsGuildIdRolesRoleIdMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPatchGuildsGuildIdRolesRoleIdMutationKey() {
  return ['guilds', '/guilds/{guild_id}/roles/{role_id}', 'PATCH'] as const
}

export function getPatchGuildsGuildIdRolesRoleIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['roles']>['patch']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.guilds>['roles']>[0]>,
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['roles']>['patch']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<ReturnType<typeof client.guilds>['roles']>['patch']>[0]
      options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['roles']>['patch']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPatchGuildsGuildIdRolesRoleIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .guilds(toValue(params))
        .roles(toValue(params2))
        .patch(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePatchGuildsGuildIdRolesRoleId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['roles']>['patch']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.guilds>['roles']>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['roles']>['patch']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<ReturnType<typeof client.guilds>['roles']>['patch']>[0]
            options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['roles']>['patch']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPatchGuildsGuildIdRolesRoleIdMutationOptions<TError, TOnMutateResult>(
    params,
    params2,
  )
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getGuildsGuildIdScheduledEventsQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  options?: Parameters<ReturnType<typeof client.guilds>['scheduled-events']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['guilds', '/guilds/{guild_id}/scheduled-events', toValue(params), keyArgs] as const
}

export function getGuildsGuildIdScheduledEventsQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  options?: Parameters<ReturnType<typeof client.guilds>['scheduled-events']['get']>[0],
) {
  return {
    queryKey: computed(() => getGuildsGuildIdScheduledEventsQueryKey(params, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .guilds(toValue(params))
        ['scheduled-events'].get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useGuildsGuildIdScheduledEvents<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getGuildsGuildIdScheduledEventsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.guilds>['scheduled-events']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getGuildsGuildIdScheduledEventsQueryKey(params, clientOptions)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .guilds(toValue(params))
          ['scheduled-events'].get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostGuildsGuildIdScheduledEventsMutationKey() {
  return ['guilds', '/guilds/{guild_id}/scheduled-events', 'POST'] as const
}

export function getPostGuildsGuildIdScheduledEventsMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.guilds>['scheduled-events']['post']>[0]
      options?: Parameters<ReturnType<typeof client.guilds>['scheduled-events']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostGuildsGuildIdScheduledEventsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .guilds(toValue(params))
        ['scheduled-events'].post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostGuildsGuildIdScheduledEvents<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.guilds>['scheduled-events']['post']>[0]
            options?: Parameters<ReturnType<typeof client.guilds>['scheduled-events']['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostGuildsGuildIdScheduledEventsMutationOptions<
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

export function getGuildsGuildIdScheduledEventsGuildScheduledEventIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.guilds>['scheduled-events']>[0]>,
  options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'guilds',
    '/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}',
    toValue(params),
    toValue(params2),
    keyArgs,
  ] as const
}

export function getGuildsGuildIdScheduledEventsGuildScheduledEventIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.guilds>['scheduled-events']>[0]>,
  options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['get']>[0],
) {
  return {
    queryKey: computed(() =>
      getGuildsGuildIdScheduledEventsGuildScheduledEventIdQueryKey(params, params2, options),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .guilds(toValue(params))
        ['scheduled-events'](toValue(params2))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useGuildsGuildIdScheduledEventsGuildScheduledEventId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['get']>
    >['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.guilds>['scheduled-events']>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<
              ReturnType<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['get']>
            >,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<
              ReturnType<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['get']>
            >,
            { error: null }
          >['data'],
          ReturnType<typeof getGuildsGuildIdScheduledEventsGuildScheduledEventIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() =>
        getGuildsGuildIdScheduledEventsGuildScheduledEventIdQueryKey(
          params,
          params2,
          clientOptions,
        ),
      ),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .guilds(toValue(params))
          ['scheduled-events'](toValue(params2))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getDeleteGuildsGuildIdScheduledEventsGuildScheduledEventIdMutationKey() {
  return [
    'guilds',
    '/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}',
    'DELETE',
  ] as const
}

export function getDeleteGuildsGuildIdScheduledEventsGuildScheduledEventIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.guilds>['scheduled-events']>[0]>,
) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['delete']>
      >,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<
        ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['delete']
      >[0]
      options?: Parameters<
        ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['delete']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteGuildsGuildIdScheduledEventsGuildScheduledEventIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .guilds(toValue(params))
        ['scheduled-events'](toValue(params2))
        .delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeleteGuildsGuildIdScheduledEventsGuildScheduledEventId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.guilds>['scheduled-events']>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['delete']>
            >,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<
              ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['delete']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['delete']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults =
    getDeleteGuildsGuildIdScheduledEventsGuildScheduledEventIdMutationOptions<
      TError,
      TOnMutateResult
    >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPatchGuildsGuildIdScheduledEventsGuildScheduledEventIdMutationKey() {
  return [
    'guilds',
    '/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}',
    'PATCH',
  ] as const
}

export function getPatchGuildsGuildIdScheduledEventsGuildScheduledEventIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['patch']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.guilds>['scheduled-events']>[0]>,
) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['patch']>
      >,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['patch']>[0]
      options?: Parameters<
        ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['patch']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPatchGuildsGuildIdScheduledEventsGuildScheduledEventIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .guilds(toValue(params))
        ['scheduled-events'](toValue(params2))
        .patch(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePatchGuildsGuildIdScheduledEventsGuildScheduledEventId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['patch']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.guilds>['scheduled-events']>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['patch']>
            >,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<
              ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['patch']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['patch']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPatchGuildsGuildIdScheduledEventsGuildScheduledEventIdMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPostGuildsGuildIdScheduledEventsGuildScheduledEventIdExceptionsMutationKey() {
  return [
    'guilds',
    '/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}/exceptions',
    'POST',
  ] as const
}

export function getPostGuildsGuildIdScheduledEventsGuildScheduledEventIdExceptionsMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['exceptions']['post']
      >
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.guilds>['scheduled-events']>[0]>,
) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<
          ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['exceptions']['post']
        >
      >,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<
        ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['exceptions']['post']
      >[0]
      options?: Parameters<
        ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['exceptions']['post']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostGuildsGuildIdScheduledEventsGuildScheduledEventIdExceptionsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .guilds(toValue(params))
        ['scheduled-events'](toValue(params2))
        .exceptions.post(body, options)
      if (error) throw error
      return data
    },
  })
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
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.guilds>['scheduled-events']>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<
                ReturnType<
                  ReturnType<typeof client.guilds>['scheduled-events']
                >['exceptions']['post']
              >
            >,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<
              ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['exceptions']['post']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['exceptions']['post']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults =
    getPostGuildsGuildIdScheduledEventsGuildScheduledEventIdExceptionsMutationOptions<
      TError,
      TOnMutateResult
    >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getDeleteGuildsGuildIdScheduledEventsGuildScheduledEventIdExceptionsExceptionIdMutationKey() {
  return [
    'guilds',
    '/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}/exceptions/{exception_id}',
    'DELETE',
  ] as const
}

export function getDeleteGuildsGuildIdScheduledEventsGuildScheduledEventIdExceptionsExceptionIdMutationOptions<
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
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.guilds>['scheduled-events']>[0]>,
  params3: MaybeRefOrGetter<
    Parameters<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['exceptions']>[0]
  >,
) {
  return mutationOptions<
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
    },
    TOnMutateResult
  >({
    mutationKey:
      getDeleteGuildsGuildIdScheduledEventsGuildScheduledEventIdExceptionsExceptionIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .guilds(toValue(params))
        ['scheduled-events'](toValue(params2))
        .exceptions(toValue(params3))
        .delete(body, options)
      if (error) throw error
      return data
    },
  })
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
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.guilds>['scheduled-events']>[0]>,
  params3: MaybeRefOrGetter<
    Parameters<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['exceptions']>[0]
  >,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
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
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults =
    getDeleteGuildsGuildIdScheduledEventsGuildScheduledEventIdExceptionsExceptionIdMutationOptions<
      TError,
      TOnMutateResult
    >(params, params2, params3)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPatchGuildsGuildIdScheduledEventsGuildScheduledEventIdExceptionsExceptionIdMutationKey() {
  return [
    'guilds',
    '/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}/exceptions/{exception_id}',
    'PATCH',
  ] as const
}

export function getPatchGuildsGuildIdScheduledEventsGuildScheduledEventIdExceptionsExceptionIdMutationOptions<
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
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.guilds>['scheduled-events']>[0]>,
  params3: MaybeRefOrGetter<
    Parameters<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['exceptions']>[0]
  >,
) {
  return mutationOptions<
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
    },
    TOnMutateResult
  >({
    mutationKey:
      getPatchGuildsGuildIdScheduledEventsGuildScheduledEventIdExceptionsExceptionIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .guilds(toValue(params))
        ['scheduled-events'](toValue(params2))
        .exceptions(toValue(params3))
        .patch(body, options)
      if (error) throw error
      return data
    },
  })
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
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.guilds>['scheduled-events']>[0]>,
  params3: MaybeRefOrGetter<
    Parameters<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['exceptions']>[0]
  >,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
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
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults =
    getPatchGuildsGuildIdScheduledEventsGuildScheduledEventIdExceptionsExceptionIdMutationOptions<
      TError,
      TOnMutateResult
    >(params, params2, params3)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getGuildsGuildIdScheduledEventsGuildScheduledEventIdUsersQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.guilds>['scheduled-events']>[0]>,
  options?: Parameters<
    ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['users']['get']
  >[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'guilds',
    '/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}/users',
    toValue(params),
    toValue(params2),
    keyArgs,
  ] as const
}

export function getGuildsGuildIdScheduledEventsGuildScheduledEventIdUsersQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.guilds>['scheduled-events']>[0]>,
  options?: Parameters<
    ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['users']['get']
  >[0],
) {
  return {
    queryKey: computed(() =>
      getGuildsGuildIdScheduledEventsGuildScheduledEventIdUsersQueryKey(params, params2, options),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .guilds(toValue(params))
        ['scheduled-events'](toValue(params2))
        .users.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useGuildsGuildIdScheduledEventsGuildScheduledEventIdUsers<
  TData = Extract<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['users']['get']>
    >,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['users']['get']>
    >['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.guilds>['scheduled-events']>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<
              ReturnType<
                ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['users']['get']
              >
            >,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<
              ReturnType<
                ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['users']['get']
              >
            >,
            { error: null }
          >['data'],
          ReturnType<typeof getGuildsGuildIdScheduledEventsGuildScheduledEventIdUsersQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<
      ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['users']['get']
    >[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() =>
        getGuildsGuildIdScheduledEventsGuildScheduledEventIdUsersQueryKey(
          params,
          params2,
          clientOptions,
        ),
      ),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .guilds(toValue(params))
          ['scheduled-events'](toValue(params2))
          .users.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getGuildsGuildIdScheduledEventsGuildScheduledEventIdUsersCountsQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.guilds>['scheduled-events']>[0]>,
  options?: Parameters<
    ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['users']['counts']['get']
  >[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'guilds',
    '/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}/users/counts',
    toValue(params),
    toValue(params2),
    keyArgs,
  ] as const
}

export function getGuildsGuildIdScheduledEventsGuildScheduledEventIdUsersCountsQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.guilds>['scheduled-events']>[0]>,
  options?: Parameters<
    ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['users']['counts']['get']
  >[0],
) {
  return {
    queryKey: computed(() =>
      getGuildsGuildIdScheduledEventsGuildScheduledEventIdUsersCountsQueryKey(
        params,
        params2,
        options,
      ),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .guilds(toValue(params))
        ['scheduled-events'](toValue(params2))
        .users.counts.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useGuildsGuildIdScheduledEventsGuildScheduledEventIdUsersCounts<
  TData = Extract<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['users']['counts']['get']
      >
    >,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['users']['counts']['get']
      >
    >['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.guilds>['scheduled-events']>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
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
          TError,
          TData,
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
          ReturnType<typeof getGuildsGuildIdScheduledEventsGuildScheduledEventIdUsersCountsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<
      ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>['users']['counts']['get']
    >[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() =>
        getGuildsGuildIdScheduledEventsGuildScheduledEventIdUsersCountsQueryKey(
          params,
          params2,
          clientOptions,
        ),
      ),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .guilds(toValue(params))
          ['scheduled-events'](toValue(params2))
          .users.counts.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getGuildsGuildIdScheduledEventsGuildScheduledEventIdGuildScheduledEventExceptionIdUsersQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.guilds>['scheduled-events']>[0]>,
  params3: MaybeRefOrGetter<
    Parameters<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>>[0]
  >,
  options?: Parameters<
    ReturnType<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>>['users']['get']
  >[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'guilds',
    '/guilds/{guild_id}/scheduled-events/{guild_scheduled_event_id}/{guild_scheduled_event_exception_id}/users',
    toValue(params),
    toValue(params2),
    toValue(params3),
    keyArgs,
  ] as const
}

export function getGuildsGuildIdScheduledEventsGuildScheduledEventIdGuildScheduledEventExceptionIdUsersQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.guilds>['scheduled-events']>[0]>,
  params3: MaybeRefOrGetter<
    Parameters<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>>[0]
  >,
  options?: Parameters<
    ReturnType<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>>['users']['get']
  >[0],
) {
  return {
    queryKey: computed(() =>
      getGuildsGuildIdScheduledEventsGuildScheduledEventIdGuildScheduledEventExceptionIdUsersQueryKey(
        params,
        params2,
        params3,
        options,
      ),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .guilds(toValue(params))
        ['scheduled-events'](toValue(params2))(toValue(params3))
        .users.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useGuildsGuildIdScheduledEventsGuildScheduledEventIdGuildScheduledEventExceptionIdUsers<
  TData = Extract<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>>['users']['get']
      >
    >,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>>['users']['get']
      >
    >['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.guilds>['scheduled-events']>[0]>,
  params3: MaybeRefOrGetter<
    Parameters<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>>[0]
  >,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
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
          TError,
          TData,
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
          ReturnType<
            typeof getGuildsGuildIdScheduledEventsGuildScheduledEventIdGuildScheduledEventExceptionIdUsersQueryKey
          >
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['scheduled-events']>>['users']['get']
    >[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() =>
        getGuildsGuildIdScheduledEventsGuildScheduledEventIdGuildScheduledEventExceptionIdUsersQueryKey(
          params,
          params2,
          params3,
          clientOptions,
        ),
      ),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .guilds(toValue(params))
          ['scheduled-events'](toValue(params2))(toValue(params3))
          .users.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getGuildsGuildIdSoundboardSoundsQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
) {
  return ['guilds', '/guilds/{guild_id}/soundboard-sounds', toValue(params)] as const
}

export function getGuildsGuildIdSoundboardSoundsQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  options?: Parameters<ReturnType<typeof client.guilds>['soundboard-sounds']['get']>[0],
) {
  return {
    queryKey: computed(() => getGuildsGuildIdSoundboardSoundsQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .guilds(toValue(params))
        ['soundboard-sounds'].get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useGuildsGuildIdSoundboardSounds<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getGuildsGuildIdSoundboardSoundsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.guilds>['soundboard-sounds']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getGuildsGuildIdSoundboardSoundsQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .guilds(toValue(params))
          ['soundboard-sounds'].get({
            ...clientOptions,
            fetch: { ...clientOptions?.fetch, signal },
          })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostGuildsGuildIdSoundboardSoundsMutationKey() {
  return ['guilds', '/guilds/{guild_id}/soundboard-sounds', 'POST'] as const
}

export function getPostGuildsGuildIdSoundboardSoundsMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.guilds>['soundboard-sounds']['post']>[0]
      options?: Parameters<ReturnType<typeof client.guilds>['soundboard-sounds']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostGuildsGuildIdSoundboardSoundsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .guilds(toValue(params))
        ['soundboard-sounds'].post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostGuildsGuildIdSoundboardSounds<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.guilds>['soundboard-sounds']['post']>[0]
            options?: Parameters<ReturnType<typeof client.guilds>['soundboard-sounds']['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostGuildsGuildIdSoundboardSoundsMutationOptions<
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

export function getGuildsGuildIdSoundboardSoundsSoundIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.guilds>['soundboard-sounds']>[0]>,
) {
  return [
    'guilds',
    '/guilds/{guild_id}/soundboard-sounds/{sound_id}',
    toValue(params),
    toValue(params2),
  ] as const
}

export function getGuildsGuildIdSoundboardSoundsSoundIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.guilds>['soundboard-sounds']>[0]>,
  options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']>['get']>[0],
) {
  return {
    queryKey: computed(() => getGuildsGuildIdSoundboardSoundsSoundIdQueryKey(params, params2)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .guilds(toValue(params))
        ['soundboard-sounds'](toValue(params2))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useGuildsGuildIdSoundboardSoundsSoundId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']>['get']>
    >['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.guilds>['soundboard-sounds']>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<
              ReturnType<ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']>['get']>
            >,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<
              ReturnType<ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']>['get']>
            >,
            { error: null }
          >['data'],
          ReturnType<typeof getGuildsGuildIdSoundboardSoundsSoundIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<
      ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']>['get']
    >[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getGuildsGuildIdSoundboardSoundsSoundIdQueryKey(params, params2)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .guilds(toValue(params))
          ['soundboard-sounds'](toValue(params2))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getDeleteGuildsGuildIdSoundboardSoundsSoundIdMutationKey() {
  return ['guilds', '/guilds/{guild_id}/soundboard-sounds/{sound_id}', 'DELETE'] as const
}

export function getDeleteGuildsGuildIdSoundboardSoundsSoundIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.guilds>['soundboard-sounds']>[0]>,
) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']>['delete']>
      >,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<
        ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']>['delete']
      >[0]
      options?: Parameters<
        ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']>['delete']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteGuildsGuildIdSoundboardSoundsSoundIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .guilds(toValue(params))
        ['soundboard-sounds'](toValue(params2))
        .delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeleteGuildsGuildIdSoundboardSoundsSoundId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.guilds>['soundboard-sounds']>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<
                ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']>['delete']
              >
            >,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<
              ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']>['delete']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']>['delete']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteGuildsGuildIdSoundboardSoundsSoundIdMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPatchGuildsGuildIdSoundboardSoundsSoundIdMutationKey() {
  return ['guilds', '/guilds/{guild_id}/soundboard-sounds/{sound_id}', 'PATCH'] as const
}

export function getPatchGuildsGuildIdSoundboardSoundsSoundIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']>['patch']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.guilds>['soundboard-sounds']>[0]>,
) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']>['patch']>
      >,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<
        ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']>['patch']
      >[0]
      options?: Parameters<
        ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']>['patch']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPatchGuildsGuildIdSoundboardSoundsSoundIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .guilds(toValue(params))
        ['soundboard-sounds'](toValue(params2))
        .patch(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePatchGuildsGuildIdSoundboardSoundsSoundId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']>['patch']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.guilds>['soundboard-sounds']>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']>['patch']>
            >,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<
              ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']>['patch']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.guilds>['soundboard-sounds']>['patch']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPatchGuildsGuildIdSoundboardSoundsSoundIdMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getGuildsGuildIdStickersQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
) {
  return ['guilds', '/guilds/{guild_id}/stickers', toValue(params)] as const
}

export function getGuildsGuildIdStickersQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  options?: Parameters<ReturnType<typeof client.guilds>['stickers']['get']>[0],
) {
  return {
    queryKey: computed(() => getGuildsGuildIdStickersQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .guilds(toValue(params))
        .stickers.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useGuildsGuildIdStickers<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['stickers']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['stickers']['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.guilds>['stickers']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.guilds>['stickers']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getGuildsGuildIdStickersQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.guilds>['stickers']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getGuildsGuildIdStickersQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .guilds(toValue(params))
          .stickers.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostGuildsGuildIdStickersMutationKey() {
  return ['guilds', '/guilds/{guild_id}/stickers', 'POST'] as const
}

export function getPostGuildsGuildIdStickersMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['stickers']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.guilds>['stickers']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.guilds>['stickers']['post']>[0]
      options?: Parameters<ReturnType<typeof client.guilds>['stickers']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostGuildsGuildIdStickersMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.guilds(toValue(params)).stickers.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostGuildsGuildIdStickers<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['stickers']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.guilds>['stickers']['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.guilds>['stickers']['post']>[0]
            options?: Parameters<ReturnType<typeof client.guilds>['stickers']['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostGuildsGuildIdStickersMutationOptions<TError, TOnMutateResult>(
    params,
  )
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getGuildsGuildIdStickersStickerIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.guilds>['stickers']>[0]>,
) {
  return [
    'guilds',
    '/guilds/{guild_id}/stickers/{sticker_id}',
    toValue(params),
    toValue(params2),
  ] as const
}

export function getGuildsGuildIdStickersStickerIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.guilds>['stickers']>[0]>,
  options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['stickers']>['get']>[0],
) {
  return {
    queryKey: computed(() => getGuildsGuildIdStickersStickerIdQueryKey(params, params2)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .guilds(toValue(params))
        .stickers(toValue(params2))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useGuildsGuildIdStickersStickerId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['stickers']>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['stickers']>['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.guilds>['stickers']>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['stickers']>['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['stickers']>['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getGuildsGuildIdStickersStickerIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['stickers']>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getGuildsGuildIdStickersStickerIdQueryKey(params, params2)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .guilds(toValue(params))
          .stickers(toValue(params2))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getDeleteGuildsGuildIdStickersStickerIdMutationKey() {
  return ['guilds', '/guilds/{guild_id}/stickers/{sticker_id}', 'DELETE'] as const
}

export function getDeleteGuildsGuildIdStickersStickerIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['stickers']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.guilds>['stickers']>[0]>,
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['stickers']>['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<ReturnType<typeof client.guilds>['stickers']>['delete']>[0]
      options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['stickers']>['delete']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteGuildsGuildIdStickersStickerIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .guilds(toValue(params))
        .stickers(toValue(params2))
        .delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeleteGuildsGuildIdStickersStickerId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['stickers']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.guilds>['stickers']>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['stickers']>['delete']>>,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<ReturnType<ReturnType<typeof client.guilds>['stickers']>['delete']>[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.guilds>['stickers']>['delete']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteGuildsGuildIdStickersStickerIdMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPatchGuildsGuildIdStickersStickerIdMutationKey() {
  return ['guilds', '/guilds/{guild_id}/stickers/{sticker_id}', 'PATCH'] as const
}

export function getPatchGuildsGuildIdStickersStickerIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['stickers']>['patch']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.guilds>['stickers']>[0]>,
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['stickers']>['patch']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<ReturnType<typeof client.guilds>['stickers']>['patch']>[0]
      options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['stickers']>['patch']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPatchGuildsGuildIdStickersStickerIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .guilds(toValue(params))
        .stickers(toValue(params2))
        .patch(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePatchGuildsGuildIdStickersStickerId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['stickers']>['patch']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.guilds>['stickers']>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['stickers']>['patch']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<ReturnType<typeof client.guilds>['stickers']>['patch']>[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.guilds>['stickers']>['patch']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPatchGuildsGuildIdStickersStickerIdMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getGuildsGuildIdTemplatesQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
) {
  return ['guilds', '/guilds/{guild_id}/templates', toValue(params)] as const
}

export function getGuildsGuildIdTemplatesQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  options?: Parameters<ReturnType<typeof client.guilds>['templates']['get']>[0],
) {
  return {
    queryKey: computed(() => getGuildsGuildIdTemplatesQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .guilds(toValue(params))
        .templates.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useGuildsGuildIdTemplates<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['templates']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['templates']['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.guilds>['templates']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.guilds>['templates']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getGuildsGuildIdTemplatesQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.guilds>['templates']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getGuildsGuildIdTemplatesQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .guilds(toValue(params))
          .templates.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostGuildsGuildIdTemplatesMutationKey() {
  return ['guilds', '/guilds/{guild_id}/templates', 'POST'] as const
}

export function getPostGuildsGuildIdTemplatesMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['templates']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.guilds>['templates']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.guilds>['templates']['post']>[0]
      options?: Parameters<ReturnType<typeof client.guilds>['templates']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostGuildsGuildIdTemplatesMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.guilds(toValue(params)).templates.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostGuildsGuildIdTemplates<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['templates']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.guilds>['templates']['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.guilds>['templates']['post']>[0]
            options?: Parameters<ReturnType<typeof client.guilds>['templates']['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostGuildsGuildIdTemplatesMutationOptions<TError, TOnMutateResult>(
    params,
  )
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPutGuildsGuildIdTemplatesCodeMutationKey() {
  return ['guilds', '/guilds/{guild_id}/templates/{code}', 'PUT'] as const
}

export function getPutGuildsGuildIdTemplatesCodeMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['templates']>['put']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.guilds>['templates']>[0]>,
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['templates']>['put']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<ReturnType<typeof client.guilds>['templates']>['put']>[0]
      options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['templates']>['put']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPutGuildsGuildIdTemplatesCodeMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .guilds(toValue(params))
        .templates(toValue(params2))
        .put(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePutGuildsGuildIdTemplatesCode<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['templates']>['put']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.guilds>['templates']>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['templates']>['put']>>,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<ReturnType<ReturnType<typeof client.guilds>['templates']>['put']>[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.guilds>['templates']>['put']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPutGuildsGuildIdTemplatesCodeMutationOptions<TError, TOnMutateResult>(
    params,
    params2,
  )
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getDeleteGuildsGuildIdTemplatesCodeMutationKey() {
  return ['guilds', '/guilds/{guild_id}/templates/{code}', 'DELETE'] as const
}

export function getDeleteGuildsGuildIdTemplatesCodeMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['templates']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.guilds>['templates']>[0]>,
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['templates']>['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<ReturnType<typeof client.guilds>['templates']>['delete']>[0]
      options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['templates']>['delete']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteGuildsGuildIdTemplatesCodeMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .guilds(toValue(params))
        .templates(toValue(params2))
        .delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeleteGuildsGuildIdTemplatesCode<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['templates']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.guilds>['templates']>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<ReturnType<ReturnType<typeof client.guilds>['templates']>['delete']>
            >,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<
              ReturnType<ReturnType<typeof client.guilds>['templates']>['delete']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.guilds>['templates']>['delete']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteGuildsGuildIdTemplatesCodeMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPatchGuildsGuildIdTemplatesCodeMutationKey() {
  return ['guilds', '/guilds/{guild_id}/templates/{code}', 'PATCH'] as const
}

export function getPatchGuildsGuildIdTemplatesCodeMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['templates']>['patch']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.guilds>['templates']>[0]>,
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['templates']>['patch']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<ReturnType<typeof client.guilds>['templates']>['patch']>[0]
      options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['templates']>['patch']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPatchGuildsGuildIdTemplatesCodeMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .guilds(toValue(params))
        .templates(toValue(params2))
        .patch(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePatchGuildsGuildIdTemplatesCode<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['templates']>['patch']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.guilds>['templates']>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['templates']>['patch']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<ReturnType<typeof client.guilds>['templates']>['patch']>[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.guilds>['templates']>['patch']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPatchGuildsGuildIdTemplatesCodeMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getGuildsGuildIdThreadsActiveQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
) {
  return ['guilds', '/guilds/{guild_id}/threads/active', toValue(params)] as const
}

export function getGuildsGuildIdThreadsActiveQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  options?: Parameters<ReturnType<typeof client.guilds>['threads']['active']['get']>[0],
) {
  return {
    queryKey: computed(() => getGuildsGuildIdThreadsActiveQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .guilds(toValue(params))
        .threads.active.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useGuildsGuildIdThreadsActive<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['threads']['active']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['threads']['active']['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.guilds>['threads']['active']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.guilds>['threads']['active']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getGuildsGuildIdThreadsActiveQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.guilds>['threads']['active']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getGuildsGuildIdThreadsActiveQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .guilds(toValue(params))
          .threads.active.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getGuildsGuildIdVanityUrlQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
) {
  return ['guilds', '/guilds/{guild_id}/vanity-url', toValue(params)] as const
}

export function getGuildsGuildIdVanityUrlQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  options?: Parameters<ReturnType<typeof client.guilds>['vanity-url']['get']>[0],
) {
  return {
    queryKey: computed(() => getGuildsGuildIdVanityUrlQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .guilds(toValue(params))
        ['vanity-url'].get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useGuildsGuildIdVanityUrl<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['vanity-url']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['vanity-url']['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.guilds>['vanity-url']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.guilds>['vanity-url']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getGuildsGuildIdVanityUrlQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.guilds>['vanity-url']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getGuildsGuildIdVanityUrlQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .guilds(toValue(params))
          ['vanity-url'].get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getGuildsGuildIdVoiceStatesMeQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
) {
  return ['guilds', '/guilds/{guild_id}/voice-states/@me', toValue(params)] as const
}

export function getGuildsGuildIdVoiceStatesMeQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  options?: Parameters<ReturnType<typeof client.guilds>['voice-states']['@me']['get']>[0],
) {
  return {
    queryKey: computed(() => getGuildsGuildIdVoiceStatesMeQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .guilds(toValue(params))
        ['voice-states']['@me'].get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useGuildsGuildIdVoiceStatesMe<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['voice-states']['@me']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['voice-states']['@me']['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.guilds>['voice-states']['@me']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.guilds>['voice-states']['@me']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getGuildsGuildIdVoiceStatesMeQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.guilds>['voice-states']['@me']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getGuildsGuildIdVoiceStatesMeQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .guilds(toValue(params))
          ['voice-states']['@me'].get({
            ...clientOptions,
            fetch: { ...clientOptions?.fetch, signal },
          })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPatchGuildsGuildIdVoiceStatesMeMutationKey() {
  return ['guilds', '/guilds/{guild_id}/voice-states/@me', 'PATCH'] as const
}

export function getPatchGuildsGuildIdVoiceStatesMeMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['voice-states']['@me']['patch']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.guilds>['voice-states']['@me']['patch']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.guilds>['voice-states']['@me']['patch']>[0]
      options?: Parameters<ReturnType<typeof client.guilds>['voice-states']['@me']['patch']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPatchGuildsGuildIdVoiceStatesMeMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .guilds(toValue(params))
        ['voice-states']['@me'].patch(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePatchGuildsGuildIdVoiceStatesMe<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['voice-states']['@me']['patch']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.guilds>['voice-states']['@me']['patch']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.guilds>['voice-states']['@me']['patch']>[0]
            options?: Parameters<
              ReturnType<typeof client.guilds>['voice-states']['@me']['patch']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPatchGuildsGuildIdVoiceStatesMeMutationOptions<
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

export function getGuildsGuildIdVoiceStatesUserIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.guilds>['voice-states']>[0]>,
) {
  return [
    'guilds',
    '/guilds/{guild_id}/voice-states/{user_id}',
    toValue(params),
    toValue(params2),
  ] as const
}

export function getGuildsGuildIdVoiceStatesUserIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.guilds>['voice-states']>[0]>,
  options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['voice-states']>['get']>[0],
) {
  return {
    queryKey: computed(() => getGuildsGuildIdVoiceStatesUserIdQueryKey(params, params2)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .guilds(toValue(params))
        ['voice-states'](toValue(params2))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useGuildsGuildIdVoiceStatesUserId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['voice-states']>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['voice-states']>['get']>
    >['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.guilds>['voice-states']>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<
              ReturnType<ReturnType<ReturnType<typeof client.guilds>['voice-states']>['get']>
            >,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<
              ReturnType<ReturnType<ReturnType<typeof client.guilds>['voice-states']>['get']>
            >,
            { error: null }
          >['data'],
          ReturnType<typeof getGuildsGuildIdVoiceStatesUserIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['voice-states']>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getGuildsGuildIdVoiceStatesUserIdQueryKey(params, params2)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .guilds(toValue(params))
          ['voice-states'](toValue(params2))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPatchGuildsGuildIdVoiceStatesUserIdMutationKey() {
  return ['guilds', '/guilds/{guild_id}/voice-states/{user_id}', 'PATCH'] as const
}

export function getPatchGuildsGuildIdVoiceStatesUserIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['voice-states']>['patch']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.guilds>['voice-states']>[0]>,
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.guilds>['voice-states']>['patch']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<ReturnType<typeof client.guilds>['voice-states']>['patch']>[0]
      options?: Parameters<ReturnType<ReturnType<typeof client.guilds>['voice-states']>['patch']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPatchGuildsGuildIdVoiceStatesUserIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .guilds(toValue(params))
        ['voice-states'](toValue(params2))
        .patch(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePatchGuildsGuildIdVoiceStatesUserId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.guilds>['voice-states']>['patch']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.guilds>['voice-states']>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<ReturnType<ReturnType<typeof client.guilds>['voice-states']>['patch']>
            >,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<
              ReturnType<ReturnType<typeof client.guilds>['voice-states']>['patch']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.guilds>['voice-states']>['patch']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPatchGuildsGuildIdVoiceStatesUserIdMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getGuildsGuildIdWebhooksQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
) {
  return ['guilds', '/guilds/{guild_id}/webhooks', toValue(params)] as const
}

export function getGuildsGuildIdWebhooksQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  options?: Parameters<ReturnType<typeof client.guilds>['webhooks']['get']>[0],
) {
  return {
    queryKey: computed(() => getGuildsGuildIdWebhooksQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .guilds(toValue(params))
        .webhooks.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useGuildsGuildIdWebhooks<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['webhooks']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['webhooks']['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.guilds>['webhooks']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.guilds>['webhooks']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getGuildsGuildIdWebhooksQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.guilds>['webhooks']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getGuildsGuildIdWebhooksQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .guilds(toValue(params))
          .webhooks.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getGuildsGuildIdWelcomeScreenQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
) {
  return ['guilds', '/guilds/{guild_id}/welcome-screen', toValue(params)] as const
}

export function getGuildsGuildIdWelcomeScreenQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  options?: Parameters<ReturnType<typeof client.guilds>['welcome-screen']['get']>[0],
) {
  return {
    queryKey: computed(() => getGuildsGuildIdWelcomeScreenQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .guilds(toValue(params))
        ['welcome-screen'].get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useGuildsGuildIdWelcomeScreen<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['welcome-screen']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['welcome-screen']['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.guilds>['welcome-screen']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.guilds>['welcome-screen']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getGuildsGuildIdWelcomeScreenQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.guilds>['welcome-screen']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getGuildsGuildIdWelcomeScreenQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .guilds(toValue(params))
          ['welcome-screen'].get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPatchGuildsGuildIdWelcomeScreenMutationKey() {
  return ['guilds', '/guilds/{guild_id}/welcome-screen', 'PATCH'] as const
}

export function getPatchGuildsGuildIdWelcomeScreenMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['welcome-screen']['patch']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.guilds>['welcome-screen']['patch']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.guilds>['welcome-screen']['patch']>[0]
      options?: Parameters<ReturnType<typeof client.guilds>['welcome-screen']['patch']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPatchGuildsGuildIdWelcomeScreenMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .guilds(toValue(params))
        ['welcome-screen'].patch(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePatchGuildsGuildIdWelcomeScreen<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['welcome-screen']['patch']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.guilds>['welcome-screen']['patch']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.guilds>['welcome-screen']['patch']>[0]
            options?: Parameters<ReturnType<typeof client.guilds>['welcome-screen']['patch']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPatchGuildsGuildIdWelcomeScreenMutationOptions<
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

export function getGuildsGuildIdWidgetQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
) {
  return ['guilds', '/guilds/{guild_id}/widget', toValue(params)] as const
}

export function getGuildsGuildIdWidgetQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  options?: Parameters<ReturnType<typeof client.guilds>['widget']['get']>[0],
) {
  return {
    queryKey: computed(() => getGuildsGuildIdWidgetQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .guilds(toValue(params))
        .widget.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useGuildsGuildIdWidget<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['widget']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['widget']['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.guilds>['widget']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.guilds>['widget']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getGuildsGuildIdWidgetQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.guilds>['widget']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getGuildsGuildIdWidgetQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .guilds(toValue(params))
          .widget.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPatchGuildsGuildIdWidgetMutationKey() {
  return ['guilds', '/guilds/{guild_id}/widget', 'PATCH'] as const
}

export function getPatchGuildsGuildIdWidgetMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['widget']['patch']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.guilds>['widget']['patch']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.guilds>['widget']['patch']>[0]
      options?: Parameters<ReturnType<typeof client.guilds>['widget']['patch']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPatchGuildsGuildIdWidgetMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.guilds(toValue(params)).widget.patch(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePatchGuildsGuildIdWidget<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.guilds>['widget']['patch']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.guilds>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.guilds>['widget']['patch']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.guilds>['widget']['patch']>[0]
            options?: Parameters<ReturnType<typeof client.guilds>['widget']['patch']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPatchGuildsGuildIdWidgetMutationOptions<TError, TOnMutateResult>(
    params,
  )
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getGuildsGuildIdWidgetJsonQueryKey(guild_id: MaybeRefOrGetter<string>) {
  return ['guilds', '/guilds/{guild_id}/widget.json', toValue(guild_id)] as const
}

export function getGuildsGuildIdWidgetJsonQueryOptions(
  guild_id: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string> },
) {
  return {
    queryKey: computed(() => getGuildsGuildIdWidgetJsonQueryKey(guild_id)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const res = await fetch(`/guilds/${encodeURIComponent(toValue(guild_id))}/widget.json`, {
        headers: options?.headers,
        signal,
      })
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function useGuildsGuildIdWidgetJson<TData = WidgetResponse, TError = unknown>(
  guild_id: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          WidgetResponse,
          TError,
          TData,
          WidgetResponse,
          ReturnType<typeof getGuildsGuildIdWidgetJsonQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getGuildsGuildIdWidgetJsonQueryKey(guild_id)),
      queryFn: async ({ signal }) => {
        const res = await fetch(`/guilds/${encodeURIComponent(toValue(guild_id))}/widget.json`, {
          headers: clientOptions?.headers,
          signal,
        })
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
    },
    queryClient,
  )
}

export function getGuildsGuildIdWidgetPngQueryKey(
  guild_id: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return ['guilds', '/guilds/{guild_id}/widget.png', toValue(guild_id), keyArgs] as const
}

export function getGuildsGuildIdWidgetPngQueryOptions(
  guild_id: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return {
    queryKey: computed(() => getGuildsGuildIdWidgetPngQueryKey(guild_id, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const search = new URLSearchParams()
      for (const [k, v] of Object.entries(options?.query ?? {})) {
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
        `/guilds/${encodeURIComponent(toValue(guild_id))}/widget.png${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function useGuildsGuildIdWidgetPng<TData = void, TError = unknown>(
  guild_id: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          void,
          TError,
          TData,
          void,
          ReturnType<typeof getGuildsGuildIdWidgetPngQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getGuildsGuildIdWidgetPngQueryKey(guild_id, clientOptions)),
      queryFn: async ({ signal }) => {
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
          `/guilds/${encodeURIComponent(toValue(guild_id))}/widget.png${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
    },
    queryClient,
  )
}

export function getPostInteractionsInteractionIdInteractionTokenCallbackMutationKey() {
  return [
    'interactions',
    '/interactions/{interaction_id}/{interaction_token}/callback',
    'POST',
  ] as const
}

export function getPostInteractionsInteractionIdInteractionTokenCallbackMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.interactions>>['callback']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.interactions>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.interactions>>[0]>,
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.interactions>>['callback']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<ReturnType<typeof client.interactions>>['callback']['post']>[0]
      options?: Parameters<
        ReturnType<ReturnType<typeof client.interactions>>['callback']['post']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostInteractionsInteractionIdInteractionTokenCallbackMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .interactions(toValue(params))(toValue(params2))
        .callback.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostInteractionsInteractionIdInteractionTokenCallback<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.interactions>>['callback']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.interactions>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.interactions>>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<ReturnType<ReturnType<typeof client.interactions>>['callback']['post']>
            >,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<
              ReturnType<ReturnType<typeof client.interactions>>['callback']['post']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.interactions>>['callback']['post']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostInteractionsInteractionIdInteractionTokenCallbackMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getInvitesCodeQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.invites>[0]>,
  options?: Parameters<ReturnType<typeof client.invites>['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['invites', '/invites/{code}', toValue(params), keyArgs] as const
}

export function getInvitesCodeQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.invites>[0]>,
  options?: Parameters<ReturnType<typeof client.invites>['get']>[0],
) {
  return {
    queryKey: computed(() => getInvitesCodeQueryKey(params, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .invites(toValue(params))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useInvitesCode<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.invites>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.invites>['get']>>['error'], null>,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.invites>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.invites>['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.invites>['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getInvitesCodeQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.invites>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getInvitesCodeQueryKey(params, clientOptions)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .invites(toValue(params))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getDeleteInvitesCodeMutationKey() {
  return ['invites', '/invites/{code}', 'DELETE'] as const
}

export function getDeleteInvitesCodeMutationOptions<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.invites>['delete']>>['error'], null>,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.invites>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.invites>['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<typeof client.invites>['delete']>[0]
      options?: Parameters<ReturnType<typeof client.invites>['delete']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteInvitesCodeMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.invites(toValue(params)).delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeleteInvitesCode<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.invites>['delete']>>['error'], null>,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.invites>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.invites>['delete']>>,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<ReturnType<typeof client.invites>['delete']>[0]
            options?: Parameters<ReturnType<typeof client.invites>['delete']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteInvitesCodeMutationOptions<TError, TOnMutateResult>(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getInvitesCodeTargetUsersQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.invites>[0]>,
) {
  return ['invites', '/invites/{code}/target-users', toValue(params)] as const
}

export function getInvitesCodeTargetUsersQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.invites>[0]>,
  options?: Parameters<ReturnType<typeof client.invites>['target-users']['get']>[0],
) {
  return {
    queryKey: computed(() => getInvitesCodeTargetUsersQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .invites(toValue(params))
        ['target-users'].get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useInvitesCodeTargetUsers<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.invites>['target-users']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.invites>['target-users']['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.invites>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.invites>['target-users']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.invites>['target-users']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getInvitesCodeTargetUsersQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.invites>['target-users']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getInvitesCodeTargetUsersQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .invites(toValue(params))
          ['target-users'].get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPutInvitesCodeTargetUsersMutationKey() {
  return ['invites', '/invites/{code}/target-users', 'PUT'] as const
}

export function getPutInvitesCodeTargetUsersMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.invites>['target-users']['put']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.invites>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.invites>['target-users']['put']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.invites>['target-users']['put']>[0]
      options?: Parameters<ReturnType<typeof client.invites>['target-users']['put']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPutInvitesCodeTargetUsersMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .invites(toValue(params))
        ['target-users'].put(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePutInvitesCodeTargetUsers<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.invites>['target-users']['put']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.invites>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.invites>['target-users']['put']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.invites>['target-users']['put']>[0]
            options?: Parameters<ReturnType<typeof client.invites>['target-users']['put']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPutInvitesCodeTargetUsersMutationOptions<TError, TOnMutateResult>(
    params,
  )
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPostInvitesCodeTargetUsersBulkAddMutationKey() {
  return ['invites', '/invites/{code}/target-users/bulk-add', 'POST'] as const
}

export function getPostInvitesCodeTargetUsersBulkAddMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.invites>['target-users']['bulk-add']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.invites>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.invites>['target-users']['bulk-add']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.invites>['target-users']['bulk-add']['post']>[0]
      options?: Parameters<ReturnType<typeof client.invites>['target-users']['bulk-add']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostInvitesCodeTargetUsersBulkAddMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .invites(toValue(params))
        ['target-users']['bulk-add'].post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostInvitesCodeTargetUsersBulkAdd<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.invites>['target-users']['bulk-add']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.invites>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<ReturnType<typeof client.invites>['target-users']['bulk-add']['post']>
            >,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<
              ReturnType<typeof client.invites>['target-users']['bulk-add']['post']
            >[0]
            options?: Parameters<
              ReturnType<typeof client.invites>['target-users']['bulk-add']['post']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostInvitesCodeTargetUsersBulkAddMutationOptions<
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

export function getPostInvitesCodeTargetUsersBulkDeleteMutationKey() {
  return ['invites', '/invites/{code}/target-users/bulk-delete', 'POST'] as const
}

export function getPostInvitesCodeTargetUsersBulkDeleteMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.invites>['target-users']['bulk-delete']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.invites>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.invites>['target-users']['bulk-delete']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.invites>['target-users']['bulk-delete']['post']>[0]
      options?: Parameters<
        ReturnType<typeof client.invites>['target-users']['bulk-delete']['post']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostInvitesCodeTargetUsersBulkDeleteMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .invites(toValue(params))
        ['target-users']['bulk-delete'].post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostInvitesCodeTargetUsersBulkDelete<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.invites>['target-users']['bulk-delete']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.invites>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<ReturnType<typeof client.invites>['target-users']['bulk-delete']['post']>
            >,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<
              ReturnType<typeof client.invites>['target-users']['bulk-delete']['post']
            >[0]
            options?: Parameters<
              ReturnType<typeof client.invites>['target-users']['bulk-delete']['post']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostInvitesCodeTargetUsersBulkDeleteMutationOptions<
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

export function getInvitesCodeTargetUsersJobStatusQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.invites>[0]>,
) {
  return ['invites', '/invites/{code}/target-users/job-status', toValue(params)] as const
}

export function getInvitesCodeTargetUsersJobStatusQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.invites>[0]>,
  options?: Parameters<ReturnType<typeof client.invites>['target-users']['job-status']['get']>[0],
) {
  return {
    queryKey: computed(() => getInvitesCodeTargetUsersJobStatusQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .invites(toValue(params))
        ['target-users']['job-status'].get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useInvitesCodeTargetUsersJobStatus<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.invites>['target-users']['job-status']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.invites>['target-users']['job-status']['get']>
    >['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.invites>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<
              ReturnType<ReturnType<typeof client.invites>['target-users']['job-status']['get']>
            >,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<
              ReturnType<ReturnType<typeof client.invites>['target-users']['job-status']['get']>
            >,
            { error: null }
          >['data'],
          ReturnType<typeof getInvitesCodeTargetUsersJobStatusQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.invites>['target-users']['job-status']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getInvitesCodeTargetUsersJobStatusQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .invites(toValue(params))
          ['target-users']['job-status'].get({
            ...clientOptions,
            fetch: { ...clientOptions?.fetch, signal },
          })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPutInvitesCodeTargetUsersUserIdMutationKey() {
  return ['invites', '/invites/{code}/target-users/{user_id}', 'PUT'] as const
}

export function getPutInvitesCodeTargetUsersUserIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.invites>['target-users']>['put']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.invites>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.invites>['target-users']>[0]>,
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.invites>['target-users']>['put']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<ReturnType<typeof client.invites>['target-users']>['put']>[0]
      options?: Parameters<ReturnType<ReturnType<typeof client.invites>['target-users']>['put']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPutInvitesCodeTargetUsersUserIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .invites(toValue(params))
        ['target-users'](toValue(params2))
        .put(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePutInvitesCodeTargetUsersUserId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.invites>['target-users']>['put']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.invites>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.invites>['target-users']>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<ReturnType<ReturnType<typeof client.invites>['target-users']>['put']>
            >,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<
              ReturnType<ReturnType<typeof client.invites>['target-users']>['put']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.invites>['target-users']>['put']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPutInvitesCodeTargetUsersUserIdMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getDeleteInvitesCodeTargetUsersUserIdMutationKey() {
  return ['invites', '/invites/{code}/target-users/{user_id}', 'DELETE'] as const
}

export function getDeleteInvitesCodeTargetUsersUserIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.invites>['target-users']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.invites>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.invites>['target-users']>[0]>,
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.invites>['target-users']>['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<ReturnType<typeof client.invites>['target-users']>['delete']>[0]
      options?: Parameters<
        ReturnType<ReturnType<typeof client.invites>['target-users']>['delete']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteInvitesCodeTargetUsersUserIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .invites(toValue(params))
        ['target-users'](toValue(params2))
        .delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeleteInvitesCodeTargetUsersUserId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.invites>['target-users']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.invites>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.invites>['target-users']>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<ReturnType<ReturnType<typeof client.invites>['target-users']>['delete']>
            >,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<
              ReturnType<ReturnType<typeof client.invites>['target-users']>['delete']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.invites>['target-users']>['delete']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteInvitesCodeTargetUsersUserIdMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPutLobbiesMutationKey() {
  return ['lobbies', '/lobbies', 'PUT'] as const
}

export function getPutLobbiesMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.lobbies.put>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.lobbies.put>>, { error: null }>['data'],
    TError,
    {
      body: Parameters<typeof client.lobbies.put>[0]
      options?: Parameters<typeof client.lobbies.put>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPutLobbiesMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.lobbies.put(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePutLobbies<
  TError = Exclude<Awaited<ReturnType<typeof client.lobbies.put>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<Awaited<ReturnType<typeof client.lobbies.put>>, { error: null }>['data'],
          TError,
          {
            body: Parameters<typeof client.lobbies.put>[0]
            options?: Parameters<typeof client.lobbies.put>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPutLobbiesMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPostLobbiesMutationKey() {
  return ['lobbies', '/lobbies', 'POST'] as const
}

export function getPostLobbiesMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.lobbies.post>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.lobbies.post>>, { error: null }>['data'],
    TError,
    {
      body: Parameters<typeof client.lobbies.post>[0]
      options?: Parameters<typeof client.lobbies.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostLobbiesMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.lobbies.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostLobbies<
  TError = Exclude<Awaited<ReturnType<typeof client.lobbies.post>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<Awaited<ReturnType<typeof client.lobbies.post>>, { error: null }>['data'],
          TError,
          {
            body: Parameters<typeof client.lobbies.post>[0]
            options?: Parameters<typeof client.lobbies.post>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostLobbiesMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getLobbiesLobbyIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.lobbies>[0]>,
) {
  return ['lobbies', '/lobbies/{lobby_id}', toValue(params)] as const
}

export function getLobbiesLobbyIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.lobbies>[0]>,
  options?: Parameters<ReturnType<typeof client.lobbies>['get']>[0],
) {
  return {
    queryKey: computed(() => getLobbiesLobbyIdQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .lobbies(toValue(params))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useLobbiesLobbyId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.lobbies>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.lobbies>['get']>>['error'], null>,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.lobbies>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.lobbies>['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.lobbies>['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getLobbiesLobbyIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.lobbies>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getLobbiesLobbyIdQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .lobbies(toValue(params))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getDeleteLobbiesLobbyIdMutationKey() {
  return ['lobbies', '/lobbies/{lobby_id}', 'DELETE'] as const
}

export function getDeleteLobbiesLobbyIdMutationOptions<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.lobbies>['delete']>>['error'], null>,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.lobbies>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.lobbies>['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<typeof client.lobbies>['delete']>[0]
      options?: Parameters<ReturnType<typeof client.lobbies>['delete']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteLobbiesLobbyIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.lobbies(toValue(params)).delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeleteLobbiesLobbyId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.lobbies>['delete']>>['error'], null>,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.lobbies>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.lobbies>['delete']>>,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<ReturnType<typeof client.lobbies>['delete']>[0]
            options?: Parameters<ReturnType<typeof client.lobbies>['delete']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteLobbiesLobbyIdMutationOptions<TError, TOnMutateResult>(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPatchLobbiesLobbyIdMutationKey() {
  return ['lobbies', '/lobbies/{lobby_id}', 'PATCH'] as const
}

export function getPatchLobbiesLobbyIdMutationOptions<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.lobbies>['patch']>>['error'], null>,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.lobbies>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.lobbies>['patch']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.lobbies>['patch']>[0]
      options?: Parameters<ReturnType<typeof client.lobbies>['patch']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPatchLobbiesLobbyIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.lobbies(toValue(params)).patch(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePatchLobbiesLobbyId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.lobbies>['patch']>>['error'], null>,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.lobbies>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.lobbies>['patch']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.lobbies>['patch']>[0]
            options?: Parameters<ReturnType<typeof client.lobbies>['patch']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPatchLobbiesLobbyIdMutationOptions<TError, TOnMutateResult>(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPatchLobbiesLobbyIdChannelLinkingMutationKey() {
  return ['lobbies', '/lobbies/{lobby_id}/channel-linking', 'PATCH'] as const
}

export function getPatchLobbiesLobbyIdChannelLinkingMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.lobbies>['channel-linking']['patch']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.lobbies>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.lobbies>['channel-linking']['patch']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.lobbies>['channel-linking']['patch']>[0]
      options?: Parameters<ReturnType<typeof client.lobbies>['channel-linking']['patch']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPatchLobbiesLobbyIdChannelLinkingMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .lobbies(toValue(params))
        ['channel-linking'].patch(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePatchLobbiesLobbyIdChannelLinking<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.lobbies>['channel-linking']['patch']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.lobbies>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.lobbies>['channel-linking']['patch']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.lobbies>['channel-linking']['patch']>[0]
            options?: Parameters<ReturnType<typeof client.lobbies>['channel-linking']['patch']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPatchLobbiesLobbyIdChannelLinkingMutationOptions<
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

export function getDeleteLobbiesLobbyIdMembersMeMutationKey() {
  return ['lobbies', '/lobbies/{lobby_id}/members/@me', 'DELETE'] as const
}

export function getDeleteLobbiesLobbyIdMembersMeMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.lobbies>['members']['@me']['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.lobbies>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.lobbies>['members']['@me']['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<typeof client.lobbies>['members']['@me']['delete']>[0]
      options?: Parameters<ReturnType<typeof client.lobbies>['members']['@me']['delete']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteLobbiesLobbyIdMembersMeMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .lobbies(toValue(params))
        .members['@me'].delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeleteLobbiesLobbyIdMembersMe<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.lobbies>['members']['@me']['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.lobbies>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.lobbies>['members']['@me']['delete']>>,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<ReturnType<typeof client.lobbies>['members']['@me']['delete']>[0]
            options?: Parameters<ReturnType<typeof client.lobbies>['members']['@me']['delete']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteLobbiesLobbyIdMembersMeMutationOptions<TError, TOnMutateResult>(
    params,
  )
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPostLobbiesLobbyIdMembersMeInvitesMutationKey() {
  return ['lobbies', '/lobbies/{lobby_id}/members/@me/invites', 'POST'] as const
}

export function getPostLobbiesLobbyIdMembersMeInvitesMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.lobbies>['members']['@me']['invites']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.lobbies>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.lobbies>['members']['@me']['invites']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<typeof client.lobbies>['members']['@me']['invites']['post']>[0]
      options?: Parameters<
        ReturnType<typeof client.lobbies>['members']['@me']['invites']['post']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostLobbiesLobbyIdMembersMeInvitesMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .lobbies(toValue(params))
        .members['@me'].invites.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostLobbiesLobbyIdMembersMeInvites<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.lobbies>['members']['@me']['invites']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.lobbies>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<ReturnType<typeof client.lobbies>['members']['@me']['invites']['post']>
            >,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<
              ReturnType<typeof client.lobbies>['members']['@me']['invites']['post']
            >[0]
            options?: Parameters<
              ReturnType<typeof client.lobbies>['members']['@me']['invites']['post']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostLobbiesLobbyIdMembersMeInvitesMutationOptions<
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

export function getPostLobbiesLobbyIdMembersBulkMutationKey() {
  return ['lobbies', '/lobbies/{lobby_id}/members/bulk', 'POST'] as const
}

export function getPostLobbiesLobbyIdMembersBulkMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.lobbies>['members']['bulk']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.lobbies>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.lobbies>['members']['bulk']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.lobbies>['members']['bulk']['post']>[0]
      options?: Parameters<ReturnType<typeof client.lobbies>['members']['bulk']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostLobbiesLobbyIdMembersBulkMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.lobbies(toValue(params)).members.bulk.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostLobbiesLobbyIdMembersBulk<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.lobbies>['members']['bulk']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.lobbies>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.lobbies>['members']['bulk']['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.lobbies>['members']['bulk']['post']>[0]
            options?: Parameters<ReturnType<typeof client.lobbies>['members']['bulk']['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostLobbiesLobbyIdMembersBulkMutationOptions<TError, TOnMutateResult>(
    params,
  )
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPutLobbiesLobbyIdMembersUserIdMutationKey() {
  return ['lobbies', '/lobbies/{lobby_id}/members/{user_id}', 'PUT'] as const
}

export function getPutLobbiesLobbyIdMembersUserIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.lobbies>['members']>['put']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.lobbies>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.lobbies>['members']>[0]>,
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.lobbies>['members']>['put']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<ReturnType<typeof client.lobbies>['members']>['put']>[0]
      options?: Parameters<ReturnType<ReturnType<typeof client.lobbies>['members']>['put']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPutLobbiesLobbyIdMembersUserIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .lobbies(toValue(params))
        .members(toValue(params2))
        .put(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePutLobbiesLobbyIdMembersUserId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.lobbies>['members']>['put']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.lobbies>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.lobbies>['members']>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<ReturnType<typeof client.lobbies>['members']>['put']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<ReturnType<typeof client.lobbies>['members']>['put']>[0]
            options?: Parameters<ReturnType<ReturnType<typeof client.lobbies>['members']>['put']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPutLobbiesLobbyIdMembersUserIdMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getDeleteLobbiesLobbyIdMembersUserIdMutationKey() {
  return ['lobbies', '/lobbies/{lobby_id}/members/{user_id}', 'DELETE'] as const
}

export function getDeleteLobbiesLobbyIdMembersUserIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.lobbies>['members']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.lobbies>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.lobbies>['members']>[0]>,
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.lobbies>['members']>['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<ReturnType<typeof client.lobbies>['members']>['delete']>[0]
      options?: Parameters<ReturnType<ReturnType<typeof client.lobbies>['members']>['delete']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteLobbiesLobbyIdMembersUserIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .lobbies(toValue(params))
        .members(toValue(params2))
        .delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeleteLobbiesLobbyIdMembersUserId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.lobbies>['members']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.lobbies>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.lobbies>['members']>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<ReturnType<typeof client.lobbies>['members']>['delete']>>,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<ReturnType<ReturnType<typeof client.lobbies>['members']>['delete']>[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.lobbies>['members']>['delete']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteLobbiesLobbyIdMembersUserIdMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPostLobbiesLobbyIdMembersUserIdInvitesMutationKey() {
  return ['lobbies', '/lobbies/{lobby_id}/members/{user_id}/invites', 'POST'] as const
}

export function getPostLobbiesLobbyIdMembersUserIdInvitesMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.lobbies>['members']>['invites']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.lobbies>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.lobbies>['members']>[0]>,
) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<ReturnType<ReturnType<typeof client.lobbies>['members']>['invites']['post']>
      >,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<
        ReturnType<ReturnType<typeof client.lobbies>['members']>['invites']['post']
      >[0]
      options?: Parameters<
        ReturnType<ReturnType<typeof client.lobbies>['members']>['invites']['post']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostLobbiesLobbyIdMembersUserIdInvitesMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .lobbies(toValue(params))
        .members(toValue(params2))
        .invites.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostLobbiesLobbyIdMembersUserIdInvites<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.lobbies>['members']>['invites']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.lobbies>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.lobbies>['members']>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<
                ReturnType<ReturnType<typeof client.lobbies>['members']>['invites']['post']
              >
            >,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<
              ReturnType<ReturnType<typeof client.lobbies>['members']>['invites']['post']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.lobbies>['members']>['invites']['post']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostLobbiesLobbyIdMembersUserIdInvitesMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getLobbiesLobbyIdMessagesQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.lobbies>[0]>,
  options?: Parameters<ReturnType<typeof client.lobbies>['messages']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['lobbies', '/lobbies/{lobby_id}/messages', toValue(params), keyArgs] as const
}

export function getLobbiesLobbyIdMessagesQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.lobbies>[0]>,
  options?: Parameters<ReturnType<typeof client.lobbies>['messages']['get']>[0],
) {
  return {
    queryKey: computed(() => getLobbiesLobbyIdMessagesQueryKey(params, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .lobbies(toValue(params))
        .messages.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useLobbiesLobbyIdMessages<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.lobbies>['messages']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.lobbies>['messages']['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.lobbies>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.lobbies>['messages']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.lobbies>['messages']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getLobbiesLobbyIdMessagesQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.lobbies>['messages']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getLobbiesLobbyIdMessagesQueryKey(params, clientOptions)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .lobbies(toValue(params))
          .messages.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostLobbiesLobbyIdMessagesMutationKey() {
  return ['lobbies', '/lobbies/{lobby_id}/messages', 'POST'] as const
}

export function getPostLobbiesLobbyIdMessagesMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.lobbies>['messages']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.lobbies>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.lobbies>['messages']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.lobbies>['messages']['post']>[0]
      options?: Parameters<ReturnType<typeof client.lobbies>['messages']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostLobbiesLobbyIdMessagesMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.lobbies(toValue(params)).messages.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostLobbiesLobbyIdMessages<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.lobbies>['messages']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.lobbies>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.lobbies>['messages']['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.lobbies>['messages']['post']>[0]
            options?: Parameters<ReturnType<typeof client.lobbies>['messages']['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostLobbiesLobbyIdMessagesMutationOptions<TError, TOnMutateResult>(
    params,
  )
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPutLobbiesLobbyIdMessagesMessageIdModerationMetadataMutationKey() {
  return [
    'lobbies',
    '/lobbies/{lobby_id}/messages/{message_id}/moderation-metadata',
    'PUT',
  ] as const
}

export function getPutLobbiesLobbyIdMessagesMessageIdModerationMetadataMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<typeof client.lobbies>['messages']>['moderation-metadata']['put']
      >
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.lobbies>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.lobbies>['messages']>[0]>,
) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<
          ReturnType<ReturnType<typeof client.lobbies>['messages']>['moderation-metadata']['put']
        >
      >,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<
        ReturnType<ReturnType<typeof client.lobbies>['messages']>['moderation-metadata']['put']
      >[0]
      options?: Parameters<
        ReturnType<ReturnType<typeof client.lobbies>['messages']>['moderation-metadata']['put']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPutLobbiesLobbyIdMessagesMessageIdModerationMetadataMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .lobbies(toValue(params))
        .messages(toValue(params2))
        ['moderation-metadata'].put(body, options)
      if (error) throw error
      return data
    },
  })
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
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.lobbies>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.lobbies>['messages']>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<
                ReturnType<
                  ReturnType<typeof client.lobbies>['messages']
                >['moderation-metadata']['put']
              >
            >,
            { error: null }
          >['data'],
          TError,
          {
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
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPutLobbiesLobbyIdMessagesMessageIdModerationMetadataMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getOauth2MeQueryKey() {
  return ['oauth2', '/oauth2/@me'] as const
}

export function getOauth2MeQueryOptions(
  options?: Parameters<(typeof client.oauth2)['@me']['get']>[0],
) {
  return {
    queryKey: getOauth2MeQueryKey(),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.oauth2['@me'].get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useOauth2Me<
  TData = Extract<
    Awaited<ReturnType<(typeof client.oauth2)['@me']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<(typeof client.oauth2)['@me']['get']>>['error'], null>,
>(
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<(typeof client.oauth2)['@me']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<(typeof client.oauth2)['@me']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getOauth2MeQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<(typeof client.oauth2)['@me']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: getOauth2MeQueryKey(),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.oauth2['@me'].get({
          ...clientOptions,
          fetch: { ...clientOptions?.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getOauth2ApplicationsMeQueryKey() {
  return ['oauth2', '/oauth2/applications/@me'] as const
}

export function getOauth2ApplicationsMeQueryOptions(
  options?: Parameters<(typeof client.oauth2.applications)['@me']['get']>[0],
) {
  return {
    queryKey: getOauth2ApplicationsMeQueryKey(),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.oauth2.applications['@me'].get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useOauth2ApplicationsMe<
  TData = Extract<
    Awaited<ReturnType<(typeof client.oauth2.applications)['@me']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<(typeof client.oauth2.applications)['@me']['get']>>['error'],
    null
  >,
>(
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<(typeof client.oauth2.applications)['@me']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<(typeof client.oauth2.applications)['@me']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getOauth2ApplicationsMeQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<(typeof client.oauth2.applications)['@me']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: getOauth2ApplicationsMeQueryKey(),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.oauth2.applications['@me'].get({
          ...clientOptions,
          fetch: { ...clientOptions?.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getOauth2KeysQueryKey() {
  return ['oauth2', '/oauth2/keys'] as const
}

export function getOauth2KeysQueryOptions(options?: Parameters<typeof client.oauth2.keys.get>[0]) {
  return {
    queryKey: getOauth2KeysQueryKey(),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.oauth2.keys.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useOauth2Keys<
  TData = Extract<Awaited<ReturnType<typeof client.oauth2.keys.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.oauth2.keys.get>>['error'], null>,
>(
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<Awaited<ReturnType<typeof client.oauth2.keys.get>>, { error: null }>['data'],
          TError,
          TData,
          Extract<Awaited<ReturnType<typeof client.oauth2.keys.get>>, { error: null }>['data'],
          ReturnType<typeof getOauth2KeysQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.oauth2.keys.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: getOauth2KeysQueryKey(),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.oauth2.keys.get({
          ...clientOptions,
          fetch: { ...clientOptions?.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getOauth2UserinfoQueryKey() {
  return ['oauth2', '/oauth2/userinfo'] as const
}

export function getOauth2UserinfoQueryOptions(
  options?: Parameters<typeof client.oauth2.userinfo.get>[0],
) {
  return {
    queryKey: getOauth2UserinfoQueryKey(),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.oauth2.userinfo.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useOauth2Userinfo<
  TData = Extract<Awaited<ReturnType<typeof client.oauth2.userinfo.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.oauth2.userinfo.get>>['error'], null>,
>(
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<Awaited<ReturnType<typeof client.oauth2.userinfo.get>>, { error: null }>['data'],
          TError,
          TData,
          Extract<Awaited<ReturnType<typeof client.oauth2.userinfo.get>>, { error: null }>['data'],
          ReturnType<typeof getOauth2UserinfoQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.oauth2.userinfo.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: getOauth2UserinfoQueryKey(),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.oauth2.userinfo.get({
          ...clientOptions,
          fetch: { ...clientOptions?.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPutPartnerSdkDmsUserId1UserId2MessagesMessageIdModerationMetadataMutationKey() {
  return [
    'partner-sdk',
    '/partner-sdk/dms/{user_id_1}/{user_id_2}/messages/{message_id}/moderation-metadata',
    'PUT',
  ] as const
}

export function getPutPartnerSdkDmsUserId1UserId2MessagesMessageIdModerationMetadataMutationOptions<
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
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<(typeof client)['partner-sdk']['dms']>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<(typeof client)['partner-sdk']['dms']>>[0]>,
  params3: MaybeRefOrGetter<
    Parameters<ReturnType<ReturnType<(typeof client)['partner-sdk']['dms']>>['messages']>[0]
  >,
) {
  return mutationOptions<
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
    },
    TOnMutateResult
  >({
    mutationKey: getPutPartnerSdkDmsUserId1UserId2MessagesMessageIdModerationMetadataMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client['partner-sdk']
        .dms(toValue(params))(toValue(params2))
        .messages(toValue(params3))
        ['moderation-metadata'].put(body, options)
      if (error) throw error
      return data
    },
  })
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
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<(typeof client)['partner-sdk']['dms']>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<(typeof client)['partner-sdk']['dms']>>[0]>,
  params3: MaybeRefOrGetter<
    Parameters<ReturnType<ReturnType<(typeof client)['partner-sdk']['dms']>>['messages']>[0]
  >,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
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
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults =
    getPutPartnerSdkDmsUserId1UserId2MessagesMessageIdModerationMetadataMutationOptions<
      TError,
      TOnMutateResult
    >(params, params2, params3)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPostPartnerSdkProvisionalAccountsUnmergeMutationKey() {
  return ['partner-sdk', '/partner-sdk/provisional-accounts/unmerge', 'POST'] as const
}

export function getPostPartnerSdkProvisionalAccountsUnmergeMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<(typeof client)['partner-sdk']['provisional-accounts']['unmerge']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<(typeof client)['partner-sdk']['provisional-accounts']['unmerge']['post']>
      >,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<(typeof client)['partner-sdk']['provisional-accounts']['unmerge']['post']>[0]
      options?: Parameters<
        (typeof client)['partner-sdk']['provisional-accounts']['unmerge']['post']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostPartnerSdkProvisionalAccountsUnmergeMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client['partner-sdk']['provisional-accounts'].unmerge.post(
        body,
        options,
      )
      if (error) throw error
      return data
    },
  })
}

export function usePostPartnerSdkProvisionalAccountsUnmerge<
  TError = Exclude<
    Awaited<
      ReturnType<(typeof client)['partner-sdk']['provisional-accounts']['unmerge']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<(typeof client)['partner-sdk']['provisional-accounts']['unmerge']['post']>
            >,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<
              (typeof client)['partner-sdk']['provisional-accounts']['unmerge']['post']
            >[0]
            options?: Parameters<
              (typeof client)['partner-sdk']['provisional-accounts']['unmerge']['post']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostPartnerSdkProvisionalAccountsUnmergeMutationOptions<
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

export function getPostPartnerSdkProvisionalAccountsUnmergeBotMutationKey() {
  return ['partner-sdk', '/partner-sdk/provisional-accounts/unmerge/bot', 'POST'] as const
}

export function getPostPartnerSdkProvisionalAccountsUnmergeBotMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<(typeof client)['partner-sdk']['provisional-accounts']['unmerge']['bot']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<(typeof client)['partner-sdk']['provisional-accounts']['unmerge']['bot']['post']>
      >,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<
        (typeof client)['partner-sdk']['provisional-accounts']['unmerge']['bot']['post']
      >[0]
      options?: Parameters<
        (typeof client)['partner-sdk']['provisional-accounts']['unmerge']['bot']['post']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostPartnerSdkProvisionalAccountsUnmergeBotMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client['partner-sdk']['provisional-accounts'].unmerge.bot.post(
        body,
        options,
      )
      if (error) throw error
      return data
    },
  })
}

export function usePostPartnerSdkProvisionalAccountsUnmergeBot<
  TError = Exclude<
    Awaited<
      ReturnType<(typeof client)['partner-sdk']['provisional-accounts']['unmerge']['bot']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<
                (typeof client)['partner-sdk']['provisional-accounts']['unmerge']['bot']['post']
              >
            >,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<
              (typeof client)['partner-sdk']['provisional-accounts']['unmerge']['bot']['post']
            >[0]
            options?: Parameters<
              (typeof client)['partner-sdk']['provisional-accounts']['unmerge']['bot']['post']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostPartnerSdkProvisionalAccountsUnmergeBotMutationOptions<
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

export function getPostPartnerSdkTokenMutationKey() {
  return ['partner-sdk', '/partner-sdk/token', 'POST'] as const
}

export function getPostPartnerSdkTokenMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<(typeof client)['partner-sdk']['token']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<(typeof client)['partner-sdk']['token']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<(typeof client)['partner-sdk']['token']['post']>[0]
      options?: Parameters<(typeof client)['partner-sdk']['token']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostPartnerSdkTokenMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client['partner-sdk'].token.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostPartnerSdkToken<
  TError = Exclude<
    Awaited<ReturnType<(typeof client)['partner-sdk']['token']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<(typeof client)['partner-sdk']['token']['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<(typeof client)['partner-sdk']['token']['post']>[0]
            options?: Parameters<(typeof client)['partner-sdk']['token']['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostPartnerSdkTokenMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPostPartnerSdkTokenBotMutationKey() {
  return ['partner-sdk', '/partner-sdk/token/bot', 'POST'] as const
}

export function getPostPartnerSdkTokenBotMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<(typeof client)['partner-sdk']['token']['bot']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<(typeof client)['partner-sdk']['token']['bot']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<(typeof client)['partner-sdk']['token']['bot']['post']>[0]
      options?: Parameters<(typeof client)['partner-sdk']['token']['bot']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostPartnerSdkTokenBotMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client['partner-sdk'].token.bot.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostPartnerSdkTokenBot<
  TError = Exclude<
    Awaited<ReturnType<(typeof client)['partner-sdk']['token']['bot']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<(typeof client)['partner-sdk']['token']['bot']['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<(typeof client)['partner-sdk']['token']['bot']['post']>[0]
            options?: Parameters<(typeof client)['partner-sdk']['token']['bot']['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostPartnerSdkTokenBotMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getSkusSkuIdSubscriptionsQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.skus>[0]>,
  options?: Parameters<ReturnType<typeof client.skus>['subscriptions']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['skus', '/skus/{sku_id}/subscriptions', toValue(params), keyArgs] as const
}

export function getSkusSkuIdSubscriptionsQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.skus>[0]>,
  options?: Parameters<ReturnType<typeof client.skus>['subscriptions']['get']>[0],
) {
  return {
    queryKey: computed(() => getSkusSkuIdSubscriptionsQueryKey(params, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .skus(toValue(params))
        .subscriptions.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useSkusSkuIdSubscriptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.skus>['subscriptions']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.skus>['subscriptions']['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.skus>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.skus>['subscriptions']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.skus>['subscriptions']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getSkusSkuIdSubscriptionsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.skus>['subscriptions']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getSkusSkuIdSubscriptionsQueryKey(params, clientOptions)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .skus(toValue(params))
          .subscriptions.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getSkusSkuIdSubscriptionsSubscriptionIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.skus>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.skus>['subscriptions']>[0]>,
  options?: Parameters<ReturnType<ReturnType<typeof client.skus>['subscriptions']>['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'skus',
    '/skus/{sku_id}/subscriptions/{subscription_id}',
    toValue(params),
    toValue(params2),
    keyArgs,
  ] as const
}

export function getSkusSkuIdSubscriptionsSubscriptionIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.skus>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.skus>['subscriptions']>[0]>,
  options?: Parameters<ReturnType<ReturnType<typeof client.skus>['subscriptions']>['get']>[0],
) {
  return {
    queryKey: computed(() =>
      getSkusSkuIdSubscriptionsSubscriptionIdQueryKey(params, params2, options),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .skus(toValue(params))
        .subscriptions(toValue(params2))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useSkusSkuIdSubscriptionsSubscriptionId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.skus>['subscriptions']>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.skus>['subscriptions']>['get']>
    >['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.skus>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.skus>['subscriptions']>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<ReturnType<typeof client.skus>['subscriptions']>['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<ReturnType<typeof client.skus>['subscriptions']>['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getSkusSkuIdSubscriptionsSubscriptionIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<ReturnType<typeof client.skus>['subscriptions']>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() =>
        getSkusSkuIdSubscriptionsSubscriptionIdQueryKey(params, params2, clientOptions),
      ),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .skus(toValue(params))
          .subscriptions(toValue(params2))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getSoundboardDefaultSoundsQueryKey() {
  return ['soundboard-default-sounds', '/soundboard-default-sounds'] as const
}

export function getSoundboardDefaultSoundsQueryOptions(
  options?: Parameters<(typeof client)['soundboard-default-sounds']['get']>[0],
) {
  return {
    queryKey: getSoundboardDefaultSoundsQueryKey(),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client['soundboard-default-sounds'].get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useSoundboardDefaultSounds<
  TData = Extract<
    Awaited<ReturnType<(typeof client)['soundboard-default-sounds']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<(typeof client)['soundboard-default-sounds']['get']>>['error'],
    null
  >,
>(
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<(typeof client)['soundboard-default-sounds']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<(typeof client)['soundboard-default-sounds']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getSoundboardDefaultSoundsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<(typeof client)['soundboard-default-sounds']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: getSoundboardDefaultSoundsQueryKey(),
      queryFn: async ({ signal }) => {
        const { data, error } = await client['soundboard-default-sounds'].get({
          ...clientOptions,
          fetch: { ...clientOptions?.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostStageInstancesMutationKey() {
  return ['stage-instances', '/stage-instances', 'POST'] as const
}

export function getPostStageInstancesMutationOptions<
  TError = Exclude<Awaited<ReturnType<(typeof client)['stage-instances']['post']>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<(typeof client)['stage-instances']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<(typeof client)['stage-instances']['post']>[0]
      options?: Parameters<(typeof client)['stage-instances']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostStageInstancesMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client['stage-instances'].post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostStageInstances<
  TError = Exclude<Awaited<ReturnType<(typeof client)['stage-instances']['post']>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<(typeof client)['stage-instances']['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<(typeof client)['stage-instances']['post']>[0]
            options?: Parameters<(typeof client)['stage-instances']['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostStageInstancesMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getStageInstancesChannelIdQueryKey(
  params: MaybeRefOrGetter<Parameters<(typeof client)['stage-instances']>[0]>,
) {
  return ['stage-instances', '/stage-instances/{channel_id}', toValue(params)] as const
}

export function getStageInstancesChannelIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<(typeof client)['stage-instances']>[0]>,
  options?: Parameters<ReturnType<(typeof client)['stage-instances']>['get']>[0],
) {
  return {
    queryKey: computed(() => getStageInstancesChannelIdQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client['stage-instances'](toValue(params)).get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useStageInstancesChannelId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<(typeof client)['stage-instances']>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<(typeof client)['stage-instances']>['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<(typeof client)['stage-instances']>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<(typeof client)['stage-instances']>['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<(typeof client)['stage-instances']>['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getStageInstancesChannelIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<(typeof client)['stage-instances']>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getStageInstancesChannelIdQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client['stage-instances'](toValue(params)).get({
          ...clientOptions,
          fetch: { ...clientOptions?.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getDeleteStageInstancesChannelIdMutationKey() {
  return ['stage-instances', '/stage-instances/{channel_id}', 'DELETE'] as const
}

export function getDeleteStageInstancesChannelIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<(typeof client)['stage-instances']>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<(typeof client)['stage-instances']>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<(typeof client)['stage-instances']>['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<(typeof client)['stage-instances']>['delete']>[0]
      options?: Parameters<ReturnType<(typeof client)['stage-instances']>['delete']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteStageInstancesChannelIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client['stage-instances'](toValue(params)).delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeleteStageInstancesChannelId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<(typeof client)['stage-instances']>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<(typeof client)['stage-instances']>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<(typeof client)['stage-instances']>['delete']>>,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<ReturnType<(typeof client)['stage-instances']>['delete']>[0]
            options?: Parameters<ReturnType<(typeof client)['stage-instances']>['delete']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteStageInstancesChannelIdMutationOptions<TError, TOnMutateResult>(
    params,
  )
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPatchStageInstancesChannelIdMutationKey() {
  return ['stage-instances', '/stage-instances/{channel_id}', 'PATCH'] as const
}

export function getPatchStageInstancesChannelIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<(typeof client)['stage-instances']>['patch']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<(typeof client)['stage-instances']>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<(typeof client)['stage-instances']>['patch']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<(typeof client)['stage-instances']>['patch']>[0]
      options?: Parameters<ReturnType<(typeof client)['stage-instances']>['patch']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPatchStageInstancesChannelIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client['stage-instances'](toValue(params)).patch(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePatchStageInstancesChannelId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<(typeof client)['stage-instances']>['patch']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<(typeof client)['stage-instances']>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<(typeof client)['stage-instances']>['patch']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<(typeof client)['stage-instances']>['patch']>[0]
            options?: Parameters<ReturnType<(typeof client)['stage-instances']>['patch']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPatchStageInstancesChannelIdMutationOptions<TError, TOnMutateResult>(
    params,
  )
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getStickerPacksQueryKey() {
  return ['sticker-packs', '/sticker-packs'] as const
}

export function getStickerPacksQueryOptions(
  options?: Parameters<(typeof client)['sticker-packs']['get']>[0],
) {
  return {
    queryKey: getStickerPacksQueryKey(),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client['sticker-packs'].get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useStickerPacks<
  TData = Extract<
    Awaited<ReturnType<(typeof client)['sticker-packs']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<(typeof client)['sticker-packs']['get']>>['error'], null>,
>(
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<(typeof client)['sticker-packs']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<(typeof client)['sticker-packs']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getStickerPacksQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<(typeof client)['sticker-packs']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: getStickerPacksQueryKey(),
      queryFn: async ({ signal }) => {
        const { data, error } = await client['sticker-packs'].get({
          ...clientOptions,
          fetch: { ...clientOptions?.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getStickerPacksPackIdQueryKey(
  params: MaybeRefOrGetter<Parameters<(typeof client)['sticker-packs']>[0]>,
) {
  return ['sticker-packs', '/sticker-packs/{pack_id}', toValue(params)] as const
}

export function getStickerPacksPackIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<(typeof client)['sticker-packs']>[0]>,
  options?: Parameters<ReturnType<(typeof client)['sticker-packs']>['get']>[0],
) {
  return {
    queryKey: computed(() => getStickerPacksPackIdQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client['sticker-packs'](toValue(params)).get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useStickerPacksPackId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<(typeof client)['sticker-packs']>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<(typeof client)['sticker-packs']>['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<(typeof client)['sticker-packs']>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<(typeof client)['sticker-packs']>['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<(typeof client)['sticker-packs']>['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getStickerPacksPackIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<(typeof client)['sticker-packs']>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getStickerPacksPackIdQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client['sticker-packs'](toValue(params)).get({
          ...clientOptions,
          fetch: { ...clientOptions?.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getStickersStickerIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.stickers>[0]>,
) {
  return ['stickers', '/stickers/{sticker_id}', toValue(params)] as const
}

export function getStickersStickerIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.stickers>[0]>,
  options?: Parameters<ReturnType<typeof client.stickers>['get']>[0],
) {
  return {
    queryKey: computed(() => getStickersStickerIdQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .stickers(toValue(params))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useStickersStickerId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.stickers>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.stickers>['get']>>['error'], null>,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.stickers>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.stickers>['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.stickers>['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getStickersStickerIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.stickers>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getStickersStickerIdQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .stickers(toValue(params))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getUsersMeQueryKey() {
  return ['users', '/users/@me'] as const
}

export function getUsersMeQueryOptions(
  options?: Parameters<(typeof client.users)['@me']['get']>[0],
) {
  return {
    queryKey: getUsersMeQueryKey(),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.users['@me'].get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useUsersMe<
  TData = Extract<
    Awaited<ReturnType<(typeof client.users)['@me']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<(typeof client.users)['@me']['get']>>['error'], null>,
>(
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<(typeof client.users)['@me']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<(typeof client.users)['@me']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getUsersMeQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<(typeof client.users)['@me']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: getUsersMeQueryKey(),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.users['@me'].get({
          ...clientOptions,
          fetch: { ...clientOptions?.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPatchUsersMeMutationKey() {
  return ['users', '/users/@me', 'PATCH'] as const
}

export function getPatchUsersMeMutationOptions<
  TError = Exclude<Awaited<ReturnType<(typeof client.users)['@me']['patch']>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<(typeof client.users)['@me']['patch']>>, { error: null }>['data'],
    TError,
    {
      body: Parameters<(typeof client.users)['@me']['patch']>[0]
      options?: Parameters<(typeof client.users)['@me']['patch']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPatchUsersMeMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.users['@me'].patch(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePatchUsersMe<
  TError = Exclude<Awaited<ReturnType<(typeof client.users)['@me']['patch']>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<(typeof client.users)['@me']['patch']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<(typeof client.users)['@me']['patch']>[0]
            options?: Parameters<(typeof client.users)['@me']['patch']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPatchUsersMeMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getUsersMeApplicationsApplicationIdEntitlementsQueryKey(
  params: MaybeRefOrGetter<Parameters<(typeof client.users)['@me']['applications']>[0]>,
  options?: Parameters<
    ReturnType<(typeof client.users)['@me']['applications']>['entitlements']['get']
  >[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'users',
    '/users/@me/applications/{application_id}/entitlements',
    toValue(params),
    keyArgs,
  ] as const
}

export function getUsersMeApplicationsApplicationIdEntitlementsQueryOptions(
  params: MaybeRefOrGetter<Parameters<(typeof client.users)['@me']['applications']>[0]>,
  options?: Parameters<
    ReturnType<(typeof client.users)['@me']['applications']>['entitlements']['get']
  >[0],
) {
  return {
    queryKey: computed(() =>
      getUsersMeApplicationsApplicationIdEntitlementsQueryKey(params, options),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.users['@me']
        .applications(toValue(params))
        .entitlements.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useUsersMeApplicationsApplicationIdEntitlements<
  TData = Extract<
    Awaited<
      ReturnType<ReturnType<(typeof client.users)['@me']['applications']>['entitlements']['get']>
    >,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<(typeof client.users)['@me']['applications']>['entitlements']['get']>
    >['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<(typeof client.users)['@me']['applications']>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<
              ReturnType<
                ReturnType<(typeof client.users)['@me']['applications']>['entitlements']['get']
              >
            >,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<
              ReturnType<
                ReturnType<(typeof client.users)['@me']['applications']>['entitlements']['get']
              >
            >,
            { error: null }
          >['data'],
          ReturnType<typeof getUsersMeApplicationsApplicationIdEntitlementsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<
      ReturnType<(typeof client.users)['@me']['applications']>['entitlements']['get']
    >[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() =>
        getUsersMeApplicationsApplicationIdEntitlementsQueryKey(params, clientOptions),
      ),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.users['@me']
          .applications(toValue(params))
          .entitlements.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getUsersMeApplicationsApplicationIdRoleConnectionQueryKey(
  params: MaybeRefOrGetter<Parameters<(typeof client.users)['@me']['applications']>[0]>,
) {
  return [
    'users',
    '/users/@me/applications/{application_id}/role-connection',
    toValue(params),
  ] as const
}

export function getUsersMeApplicationsApplicationIdRoleConnectionQueryOptions(
  params: MaybeRefOrGetter<Parameters<(typeof client.users)['@me']['applications']>[0]>,
  options?: Parameters<
    ReturnType<(typeof client.users)['@me']['applications']>['role-connection']['get']
  >[0],
) {
  return {
    queryKey: computed(() => getUsersMeApplicationsApplicationIdRoleConnectionQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.users['@me']
        .applications(toValue(params))
        ['role-connection'].get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useUsersMeApplicationsApplicationIdRoleConnection<
  TData = Extract<
    Awaited<
      ReturnType<ReturnType<(typeof client.users)['@me']['applications']>['role-connection']['get']>
    >,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<(typeof client.users)['@me']['applications']>['role-connection']['get']>
    >['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<(typeof client.users)['@me']['applications']>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<
              ReturnType<
                ReturnType<(typeof client.users)['@me']['applications']>['role-connection']['get']
              >
            >,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<
              ReturnType<
                ReturnType<(typeof client.users)['@me']['applications']>['role-connection']['get']
              >
            >,
            { error: null }
          >['data'],
          ReturnType<typeof getUsersMeApplicationsApplicationIdRoleConnectionQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<
      ReturnType<(typeof client.users)['@me']['applications']>['role-connection']['get']
    >[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getUsersMeApplicationsApplicationIdRoleConnectionQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.users['@me']
          .applications(toValue(params))
          ['role-connection'].get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPutUsersMeApplicationsApplicationIdRoleConnectionMutationKey() {
  return ['users', '/users/@me/applications/{application_id}/role-connection', 'PUT'] as const
}

export function getPutUsersMeApplicationsApplicationIdRoleConnectionMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<(typeof client.users)['@me']['applications']>['role-connection']['put']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<(typeof client.users)['@me']['applications']>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<
          ReturnType<(typeof client.users)['@me']['applications']>['role-connection']['put']
        >
      >,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<
        ReturnType<(typeof client.users)['@me']['applications']>['role-connection']['put']
      >[0]
      options?: Parameters<
        ReturnType<(typeof client.users)['@me']['applications']>['role-connection']['put']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPutUsersMeApplicationsApplicationIdRoleConnectionMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.users['@me']
        .applications(toValue(params))
        ['role-connection'].put(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePutUsersMeApplicationsApplicationIdRoleConnection<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<(typeof client.users)['@me']['applications']>['role-connection']['put']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<(typeof client.users)['@me']['applications']>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<
                ReturnType<(typeof client.users)['@me']['applications']>['role-connection']['put']
              >
            >,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<
              ReturnType<(typeof client.users)['@me']['applications']>['role-connection']['put']
            >[0]
            options?: Parameters<
              ReturnType<(typeof client.users)['@me']['applications']>['role-connection']['put']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPutUsersMeApplicationsApplicationIdRoleConnectionMutationOptions<
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

export function getDeleteUsersMeApplicationsApplicationIdRoleConnectionMutationKey() {
  return ['users', '/users/@me/applications/{application_id}/role-connection', 'DELETE'] as const
}

export function getDeleteUsersMeApplicationsApplicationIdRoleConnectionMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<(typeof client.users)['@me']['applications']>['role-connection']['delete']
      >
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<(typeof client.users)['@me']['applications']>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<
          ReturnType<(typeof client.users)['@me']['applications']>['role-connection']['delete']
        >
      >,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<
        ReturnType<(typeof client.users)['@me']['applications']>['role-connection']['delete']
      >[0]
      options?: Parameters<
        ReturnType<(typeof client.users)['@me']['applications']>['role-connection']['delete']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteUsersMeApplicationsApplicationIdRoleConnectionMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.users['@me']
        .applications(toValue(params))
        ['role-connection'].delete(body, options)
      if (error) throw error
      return data
    },
  })
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
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<(typeof client.users)['@me']['applications']>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<
                ReturnType<
                  (typeof client.users)['@me']['applications']
                >['role-connection']['delete']
              >
            >,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<
              ReturnType<(typeof client.users)['@me']['applications']>['role-connection']['delete']
            >[0]
            options?: Parameters<
              ReturnType<(typeof client.users)['@me']['applications']>['role-connection']['delete']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteUsersMeApplicationsApplicationIdRoleConnectionMutationOptions<
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

export function getPostUsersMeChannelsMutationKey() {
  return ['users', '/users/@me/channels', 'POST'] as const
}

export function getPostUsersMeChannelsMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<(typeof client.users)['@me']['channels']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<(typeof client.users)['@me']['channels']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<(typeof client.users)['@me']['channels']['post']>[0]
      options?: Parameters<(typeof client.users)['@me']['channels']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostUsersMeChannelsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.users['@me'].channels.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostUsersMeChannels<
  TError = Exclude<
    Awaited<ReturnType<(typeof client.users)['@me']['channels']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<(typeof client.users)['@me']['channels']['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<(typeof client.users)['@me']['channels']['post']>[0]
            options?: Parameters<(typeof client.users)['@me']['channels']['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostUsersMeChannelsMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getUsersMeConnectionsQueryKey() {
  return ['users', '/users/@me/connections'] as const
}

export function getUsersMeConnectionsQueryOptions(
  options?: Parameters<(typeof client.users)['@me']['connections']['get']>[0],
) {
  return {
    queryKey: getUsersMeConnectionsQueryKey(),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.users['@me'].connections.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useUsersMeConnections<
  TData = Extract<
    Awaited<ReturnType<(typeof client.users)['@me']['connections']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<(typeof client.users)['@me']['connections']['get']>>['error'],
    null
  >,
>(
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<(typeof client.users)['@me']['connections']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<(typeof client.users)['@me']['connections']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getUsersMeConnectionsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<(typeof client.users)['@me']['connections']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: getUsersMeConnectionsQueryKey(),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.users['@me'].connections.get({
          ...clientOptions,
          fetch: { ...clientOptions?.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getUsersMeGuildsQueryKey(
  options?: Parameters<(typeof client.users)['@me']['guilds']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['users', '/users/@me/guilds', keyArgs] as const
}

export function getUsersMeGuildsQueryOptions(
  options?: Parameters<(typeof client.users)['@me']['guilds']['get']>[0],
) {
  return {
    queryKey: getUsersMeGuildsQueryKey(options),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.users['@me'].guilds.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useUsersMeGuilds<
  TData = Extract<
    Awaited<ReturnType<(typeof client.users)['@me']['guilds']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<(typeof client.users)['@me']['guilds']['get']>>['error'],
    null
  >,
>(
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<(typeof client.users)['@me']['guilds']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<(typeof client.users)['@me']['guilds']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getUsersMeGuildsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<(typeof client.users)['@me']['guilds']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: getUsersMeGuildsQueryKey(clientOptions),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.users['@me'].guilds.get({
          ...clientOptions,
          fetch: { ...clientOptions?.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getDeleteUsersMeGuildsGuildIdMutationKey() {
  return ['users', '/users/@me/guilds/{guild_id}', 'DELETE'] as const
}

export function getDeleteUsersMeGuildsGuildIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<(typeof client.users)['@me']['guilds']>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<(typeof client.users)['@me']['guilds']>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<(typeof client.users)['@me']['guilds']>['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<(typeof client.users)['@me']['guilds']>['delete']>[0]
      options?: Parameters<ReturnType<(typeof client.users)['@me']['guilds']>['delete']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteUsersMeGuildsGuildIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.users['@me']
        .guilds(toValue(params))
        .delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeleteUsersMeGuildsGuildId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<(typeof client.users)['@me']['guilds']>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<(typeof client.users)['@me']['guilds']>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<(typeof client.users)['@me']['guilds']>['delete']>>,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<ReturnType<(typeof client.users)['@me']['guilds']>['delete']>[0]
            options?: Parameters<ReturnType<(typeof client.users)['@me']['guilds']>['delete']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteUsersMeGuildsGuildIdMutationOptions<TError, TOnMutateResult>(
    params,
  )
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getUsersMeGuildsGuildIdMemberQueryKey(
  params: MaybeRefOrGetter<Parameters<(typeof client.users)['@me']['guilds']>[0]>,
) {
  return ['users', '/users/@me/guilds/{guild_id}/member', toValue(params)] as const
}

export function getUsersMeGuildsGuildIdMemberQueryOptions(
  params: MaybeRefOrGetter<Parameters<(typeof client.users)['@me']['guilds']>[0]>,
  options?: Parameters<ReturnType<(typeof client.users)['@me']['guilds']>['member']['get']>[0],
) {
  return {
    queryKey: computed(() => getUsersMeGuildsGuildIdMemberQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.users['@me']
        .guilds(toValue(params))
        .member.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useUsersMeGuildsGuildIdMember<
  TData = Extract<
    Awaited<ReturnType<ReturnType<(typeof client.users)['@me']['guilds']>['member']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<(typeof client.users)['@me']['guilds']>['member']['get']>
    >['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<(typeof client.users)['@me']['guilds']>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<
              ReturnType<ReturnType<(typeof client.users)['@me']['guilds']>['member']['get']>
            >,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<
              ReturnType<ReturnType<(typeof client.users)['@me']['guilds']>['member']['get']>
            >,
            { error: null }
          >['data'],
          ReturnType<typeof getUsersMeGuildsGuildIdMemberQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<(typeof client.users)['@me']['guilds']>['member']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getUsersMeGuildsGuildIdMemberQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.users['@me']
          .guilds(toValue(params))
          .member.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getUsersUserIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.users>[0]>,
) {
  return ['users', '/users/{user_id}', toValue(params)] as const
}

export function getUsersUserIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.users>[0]>,
  options?: Parameters<ReturnType<typeof client.users>['get']>[0],
) {
  return {
    queryKey: computed(() => getUsersUserIdQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .users(toValue(params))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useUsersUserId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.users>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.users>['get']>>['error'], null>,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.users>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.users>['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.users>['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getUsersUserIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.users>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getUsersUserIdQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .users(toValue(params))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getVoiceRegionsQueryKey() {
  return ['voice', '/voice/regions'] as const
}

export function getVoiceRegionsQueryOptions(
  options?: Parameters<typeof client.voice.regions.get>[0],
) {
  return {
    queryKey: getVoiceRegionsQueryKey(),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.voice.regions.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useVoiceRegions<
  TData = Extract<Awaited<ReturnType<typeof client.voice.regions.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.voice.regions.get>>['error'], null>,
>(
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<Awaited<ReturnType<typeof client.voice.regions.get>>, { error: null }>['data'],
          TError,
          TData,
          Extract<Awaited<ReturnType<typeof client.voice.regions.get>>, { error: null }>['data'],
          ReturnType<typeof getVoiceRegionsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.voice.regions.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: getVoiceRegionsQueryKey(),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.voice.regions.get({
          ...clientOptions,
          fetch: { ...clientOptions?.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getWebhooksWebhookIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.webhooks>[0]>,
) {
  return ['webhooks', '/webhooks/{webhook_id}', toValue(params)] as const
}

export function getWebhooksWebhookIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.webhooks>[0]>,
  options?: Parameters<ReturnType<typeof client.webhooks>['get']>[0],
) {
  return {
    queryKey: computed(() => getWebhooksWebhookIdQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .webhooks(toValue(params))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useWebhooksWebhookId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.webhooks>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.webhooks>['get']>>['error'], null>,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.webhooks>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.webhooks>['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.webhooks>['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getWebhooksWebhookIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.webhooks>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getWebhooksWebhookIdQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .webhooks(toValue(params))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getDeleteWebhooksWebhookIdMutationKey() {
  return ['webhooks', '/webhooks/{webhook_id}', 'DELETE'] as const
}

export function getDeleteWebhooksWebhookIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.webhooks>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.webhooks>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.webhooks>['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<typeof client.webhooks>['delete']>[0]
      options?: Parameters<ReturnType<typeof client.webhooks>['delete']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteWebhooksWebhookIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.webhooks(toValue(params)).delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeleteWebhooksWebhookId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.webhooks>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.webhooks>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.webhooks>['delete']>>,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<ReturnType<typeof client.webhooks>['delete']>[0]
            options?: Parameters<ReturnType<typeof client.webhooks>['delete']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteWebhooksWebhookIdMutationOptions<TError, TOnMutateResult>(
    params,
  )
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPatchWebhooksWebhookIdMutationKey() {
  return ['webhooks', '/webhooks/{webhook_id}', 'PATCH'] as const
}

export function getPatchWebhooksWebhookIdMutationOptions<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.webhooks>['patch']>>['error'], null>,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.webhooks>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.webhooks>['patch']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.webhooks>['patch']>[0]
      options?: Parameters<ReturnType<typeof client.webhooks>['patch']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPatchWebhooksWebhookIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.webhooks(toValue(params)).patch(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePatchWebhooksWebhookId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.webhooks>['patch']>>['error'], null>,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.webhooks>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.webhooks>['patch']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.webhooks>['patch']>[0]
            options?: Parameters<ReturnType<typeof client.webhooks>['patch']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPatchWebhooksWebhookIdMutationOptions<TError, TOnMutateResult>(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getWebhooksWebhookIdWebhookTokenQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.webhooks>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.webhooks>>[0]>,
) {
  return [
    'webhooks',
    '/webhooks/{webhook_id}/{webhook_token}',
    toValue(params),
    toValue(params2),
  ] as const
}

export function getWebhooksWebhookIdWebhookTokenQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.webhooks>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.webhooks>>[0]>,
  options?: Parameters<ReturnType<ReturnType<typeof client.webhooks>>['get']>[0],
) {
  return {
    queryKey: computed(() => getWebhooksWebhookIdWebhookTokenQueryKey(params, params2)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .webhooks(toValue(params))(toValue(params2))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useWebhooksWebhookIdWebhookToken<
  TData = Extract<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.webhooks>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.webhooks>>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getWebhooksWebhookIdWebhookTokenQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<ReturnType<typeof client.webhooks>>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getWebhooksWebhookIdWebhookTokenQueryKey(params, params2)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .webhooks(toValue(params))(toValue(params2))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostWebhooksWebhookIdWebhookTokenMutationKey() {
  return ['webhooks', '/webhooks/{webhook_id}/{webhook_token}', 'POST'] as const
}

export function getPostWebhooksWebhookIdWebhookTokenMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.webhooks>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.webhooks>>[0]>,
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<ReturnType<typeof client.webhooks>>['post']>[0]
      options?: Parameters<ReturnType<ReturnType<typeof client.webhooks>>['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostWebhooksWebhookIdWebhookTokenMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .webhooks(toValue(params))(toValue(params2))
        .post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostWebhooksWebhookIdWebhookToken<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.webhooks>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.webhooks>>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<ReturnType<typeof client.webhooks>>['post']>[0]
            options?: Parameters<ReturnType<ReturnType<typeof client.webhooks>>['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostWebhooksWebhookIdWebhookTokenMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getDeleteWebhooksWebhookIdWebhookTokenMutationKey() {
  return ['webhooks', '/webhooks/{webhook_id}/{webhook_token}', 'DELETE'] as const
}

export function getDeleteWebhooksWebhookIdWebhookTokenMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.webhooks>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.webhooks>>[0]>,
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<ReturnType<typeof client.webhooks>>['delete']>[0]
      options?: Parameters<ReturnType<ReturnType<typeof client.webhooks>>['delete']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteWebhooksWebhookIdWebhookTokenMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .webhooks(toValue(params))(toValue(params2))
        .delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeleteWebhooksWebhookIdWebhookToken<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.webhooks>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.webhooks>>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['delete']>>,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<ReturnType<ReturnType<typeof client.webhooks>>['delete']>[0]
            options?: Parameters<ReturnType<ReturnType<typeof client.webhooks>>['delete']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteWebhooksWebhookIdWebhookTokenMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPatchWebhooksWebhookIdWebhookTokenMutationKey() {
  return ['webhooks', '/webhooks/{webhook_id}/{webhook_token}', 'PATCH'] as const
}

export function getPatchWebhooksWebhookIdWebhookTokenMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['patch']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.webhooks>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.webhooks>>[0]>,
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['patch']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<ReturnType<typeof client.webhooks>>['patch']>[0]
      options?: Parameters<ReturnType<ReturnType<typeof client.webhooks>>['patch']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPatchWebhooksWebhookIdWebhookTokenMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .webhooks(toValue(params))(toValue(params2))
        .patch(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePatchWebhooksWebhookIdWebhookToken<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['patch']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.webhooks>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.webhooks>>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['patch']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<ReturnType<typeof client.webhooks>>['patch']>[0]
            options?: Parameters<ReturnType<ReturnType<typeof client.webhooks>>['patch']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPatchWebhooksWebhookIdWebhookTokenMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPostWebhooksWebhookIdWebhookTokenGithubMutationKey() {
  return ['webhooks', '/webhooks/{webhook_id}/{webhook_token}/github', 'POST'] as const
}

export function getPostWebhooksWebhookIdWebhookTokenGithubMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['github']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.webhooks>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.webhooks>>[0]>,
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['github']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<ReturnType<typeof client.webhooks>>['github']['post']>[0]
      options?: Parameters<ReturnType<ReturnType<typeof client.webhooks>>['github']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostWebhooksWebhookIdWebhookTokenGithubMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .webhooks(toValue(params))(toValue(params2))
        .github.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostWebhooksWebhookIdWebhookTokenGithub<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['github']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.webhooks>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.webhooks>>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['github']['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<ReturnType<typeof client.webhooks>>['github']['post']>[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.webhooks>>['github']['post']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostWebhooksWebhookIdWebhookTokenGithubMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getWebhooksWebhookIdWebhookTokenMessagesOriginalQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.webhooks>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.webhooks>>[0]>,
  options?: Parameters<
    ReturnType<ReturnType<typeof client.webhooks>>['messages']['@original']['get']
  >[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'webhooks',
    '/webhooks/{webhook_id}/{webhook_token}/messages/@original',
    toValue(params),
    toValue(params2),
    keyArgs,
  ] as const
}

export function getWebhooksWebhookIdWebhookTokenMessagesOriginalQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.webhooks>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.webhooks>>[0]>,
  options?: Parameters<
    ReturnType<ReturnType<typeof client.webhooks>>['messages']['@original']['get']
  >[0],
) {
  return {
    queryKey: computed(() =>
      getWebhooksWebhookIdWebhookTokenMessagesOriginalQueryKey(params, params2, options),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .webhooks(toValue(params))(toValue(params2))
        .messages['@original'].get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useWebhooksWebhookIdWebhookTokenMessagesOriginal<
  TData = Extract<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']['@original']['get']>
    >,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']['@original']['get']>
    >['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.webhooks>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.webhooks>>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<
              ReturnType<
                ReturnType<ReturnType<typeof client.webhooks>>['messages']['@original']['get']
              >
            >,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<
              ReturnType<
                ReturnType<ReturnType<typeof client.webhooks>>['messages']['@original']['get']
              >
            >,
            { error: null }
          >['data'],
          ReturnType<typeof getWebhooksWebhookIdWebhookTokenMessagesOriginalQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<
      ReturnType<ReturnType<typeof client.webhooks>>['messages']['@original']['get']
    >[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() =>
        getWebhooksWebhookIdWebhookTokenMessagesOriginalQueryKey(params, params2, clientOptions),
      ),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .webhooks(toValue(params))(toValue(params2))
          .messages['@original'].get({
            ...clientOptions,
            fetch: { ...clientOptions?.fetch, signal },
          })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getDeleteWebhooksWebhookIdWebhookTokenMessagesOriginalMutationKey() {
  return [
    'webhooks',
    '/webhooks/{webhook_id}/{webhook_token}/messages/@original',
    'DELETE',
  ] as const
}

export function getDeleteWebhooksWebhookIdWebhookTokenMessagesOriginalMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']['@original']['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.webhooks>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.webhooks>>[0]>,
) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<
          ReturnType<ReturnType<typeof client.webhooks>>['messages']['@original']['delete']
        >
      >,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<
        ReturnType<ReturnType<typeof client.webhooks>>['messages']['@original']['delete']
      >[0]
      options?: Parameters<
        ReturnType<ReturnType<typeof client.webhooks>>['messages']['@original']['delete']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteWebhooksWebhookIdWebhookTokenMessagesOriginalMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .webhooks(toValue(params))(toValue(params2))
        .messages['@original'].delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeleteWebhooksWebhookIdWebhookTokenMessagesOriginal<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']['@original']['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.webhooks>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.webhooks>>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<
                ReturnType<ReturnType<typeof client.webhooks>>['messages']['@original']['delete']
              >
            >,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<
              ReturnType<ReturnType<typeof client.webhooks>>['messages']['@original']['delete']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.webhooks>>['messages']['@original']['delete']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteWebhooksWebhookIdWebhookTokenMessagesOriginalMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPatchWebhooksWebhookIdWebhookTokenMessagesOriginalMutationKey() {
  return ['webhooks', '/webhooks/{webhook_id}/{webhook_token}/messages/@original', 'PATCH'] as const
}

export function getPatchWebhooksWebhookIdWebhookTokenMessagesOriginalMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']['@original']['patch']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.webhooks>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.webhooks>>[0]>,
) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']['@original']['patch']>
      >,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<
        ReturnType<ReturnType<typeof client.webhooks>>['messages']['@original']['patch']
      >[0]
      options?: Parameters<
        ReturnType<ReturnType<typeof client.webhooks>>['messages']['@original']['patch']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPatchWebhooksWebhookIdWebhookTokenMessagesOriginalMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .webhooks(toValue(params))(toValue(params2))
        .messages['@original'].patch(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePatchWebhooksWebhookIdWebhookTokenMessagesOriginal<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']['@original']['patch']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.webhooks>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.webhooks>>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<
                ReturnType<ReturnType<typeof client.webhooks>>['messages']['@original']['patch']
              >
            >,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<
              ReturnType<ReturnType<typeof client.webhooks>>['messages']['@original']['patch']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.webhooks>>['messages']['@original']['patch']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPatchWebhooksWebhookIdWebhookTokenMessagesOriginalMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getWebhooksWebhookIdWebhookTokenMessagesMessageIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.webhooks>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.webhooks>>[0]>,
  params3: MaybeRefOrGetter<
    Parameters<ReturnType<ReturnType<typeof client.webhooks>>['messages']>[0]
  >,
  options?: Parameters<
    ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']>['get']
  >[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'webhooks',
    '/webhooks/{webhook_id}/{webhook_token}/messages/{message_id}',
    toValue(params),
    toValue(params2),
    toValue(params3),
    keyArgs,
  ] as const
}

export function getWebhooksWebhookIdWebhookTokenMessagesMessageIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.webhooks>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.webhooks>>[0]>,
  params3: MaybeRefOrGetter<
    Parameters<ReturnType<ReturnType<typeof client.webhooks>>['messages']>[0]
  >,
  options?: Parameters<
    ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']>['get']
  >[0],
) {
  return {
    queryKey: computed(() =>
      getWebhooksWebhookIdWebhookTokenMessagesMessageIdQueryKey(params, params2, params3, options),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .webhooks(toValue(params))(toValue(params2))
        .messages(toValue(params3))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useWebhooksWebhookIdWebhookTokenMessagesMessageId<
  TData = Extract<
    Awaited<
      ReturnType<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']>['get']>
    >,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']>['get']>
    >['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.webhooks>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.webhooks>>[0]>,
  params3: MaybeRefOrGetter<
    Parameters<ReturnType<ReturnType<typeof client.webhooks>>['messages']>[0]
  >,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<
              ReturnType<
                ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']>['get']
              >
            >,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<
              ReturnType<
                ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']>['get']
              >
            >,
            { error: null }
          >['data'],
          ReturnType<typeof getWebhooksWebhookIdWebhookTokenMessagesMessageIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<
      ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']>['get']
    >[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() =>
        getWebhooksWebhookIdWebhookTokenMessagesMessageIdQueryKey(
          params,
          params2,
          params3,
          clientOptions,
        ),
      ),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .webhooks(toValue(params))(toValue(params2))
          .messages(toValue(params3))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getDeleteWebhooksWebhookIdWebhookTokenMessagesMessageIdMutationKey() {
  return [
    'webhooks',
    '/webhooks/{webhook_id}/{webhook_token}/messages/{message_id}',
    'DELETE',
  ] as const
}

export function getDeleteWebhooksWebhookIdWebhookTokenMessagesMessageIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.webhooks>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.webhooks>>[0]>,
  params3: MaybeRefOrGetter<
    Parameters<ReturnType<ReturnType<typeof client.webhooks>>['messages']>[0]
  >,
) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']>['delete']>
      >,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<
        ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']>['delete']
      >[0]
      options?: Parameters<
        ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']>['delete']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteWebhooksWebhookIdWebhookTokenMessagesMessageIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .webhooks(toValue(params))(toValue(params2))
        .messages(toValue(params3))
        .delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeleteWebhooksWebhookIdWebhookTokenMessagesMessageId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.webhooks>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.webhooks>>[0]>,
  params3: MaybeRefOrGetter<
    Parameters<ReturnType<ReturnType<typeof client.webhooks>>['messages']>[0]
  >,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<
                ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']>['delete']
              >
            >,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<
              ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']>['delete']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']>['delete']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteWebhooksWebhookIdWebhookTokenMessagesMessageIdMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2, params3)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPatchWebhooksWebhookIdWebhookTokenMessagesMessageIdMutationKey() {
  return [
    'webhooks',
    '/webhooks/{webhook_id}/{webhook_token}/messages/{message_id}',
    'PATCH',
  ] as const
}

export function getPatchWebhooksWebhookIdWebhookTokenMessagesMessageIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']>['patch']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.webhooks>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.webhooks>>[0]>,
  params3: MaybeRefOrGetter<
    Parameters<ReturnType<ReturnType<typeof client.webhooks>>['messages']>[0]
  >,
) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']>['patch']>
      >,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<
        ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']>['patch']
      >[0]
      options?: Parameters<
        ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']>['patch']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPatchWebhooksWebhookIdWebhookTokenMessagesMessageIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .webhooks(toValue(params))(toValue(params2))
        .messages(toValue(params3))
        .patch(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePatchWebhooksWebhookIdWebhookTokenMessagesMessageId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']>['patch']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.webhooks>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.webhooks>>[0]>,
  params3: MaybeRefOrGetter<
    Parameters<ReturnType<ReturnType<typeof client.webhooks>>['messages']>[0]
  >,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<
                ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']>['patch']
              >
            >,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<
              ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']>['patch']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['messages']>['patch']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPatchWebhooksWebhookIdWebhookTokenMessagesMessageIdMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2, params3)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPostWebhooksWebhookIdWebhookTokenSlackMutationKey() {
  return ['webhooks', '/webhooks/{webhook_id}/{webhook_token}/slack', 'POST'] as const
}

export function getPostWebhooksWebhookIdWebhookTokenSlackMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['slack']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.webhooks>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.webhooks>>[0]>,
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['slack']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<ReturnType<typeof client.webhooks>>['slack']['post']>[0]
      options?: Parameters<ReturnType<ReturnType<typeof client.webhooks>>['slack']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostWebhooksWebhookIdWebhookTokenSlackMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .webhooks(toValue(params))(toValue(params2))
        .slack.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostWebhooksWebhookIdWebhookTokenSlack<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['slack']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.webhooks>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.webhooks>>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<ReturnType<typeof client.webhooks>>['slack']['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<ReturnType<typeof client.webhooks>>['slack']['post']>[0]
            options?: Parameters<ReturnType<ReturnType<typeof client.webhooks>>['slack']['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostWebhooksWebhookIdWebhookTokenSlackMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}
