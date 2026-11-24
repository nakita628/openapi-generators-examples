import { useQuery } from '@tanstack/vue-query'
import type { UseQueryOptions, QueryFunctionContext, QueryClient } from '@tanstack/vue-query'
import { computed, toValue } from 'vue'
import type { MaybeRefOrGetter } from 'vue'
import { client } from '../lib'

export function getV2Key() {
  return ['v2'] as const
}

export function getV2BotInsightDemographicQueryKey() {
  return ['v2', '/v2/bot/insight/demographic'] as const
}

export function getV2BotInsightDemographicQueryOptions(
  options?: Parameters<typeof client.v2.bot.insight.demographic.get>[0],
) {
  return {
    queryKey: getV2BotInsightDemographicQueryKey(),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.v2.bot.insight.demographic.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useV2BotInsightDemographic<
  TData = Extract<
    Awaited<ReturnType<typeof client.v2.bot.insight.demographic.get>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.insight.demographic.get>>['error'],
    null
  >,
>(
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<typeof client.v2.bot.insight.demographic.get>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<typeof client.v2.bot.insight.demographic.get>>,
            { error: null }
          >['data'],
          ReturnType<typeof getV2BotInsightDemographicQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.v2.bot.insight.demographic.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: getV2BotInsightDemographicQueryKey(),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.v2.bot.insight.demographic.get({
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

export function getV2BotInsightMessageDeliveryQueryKey(
  options: Parameters<typeof client.v2.bot.insight.message.delivery.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['v2', '/v2/bot/insight/message/delivery', keyArgs] as const
}

export function getV2BotInsightMessageDeliveryQueryOptions(
  options: Parameters<typeof client.v2.bot.insight.message.delivery.get>[0],
) {
  return {
    queryKey: getV2BotInsightMessageDeliveryQueryKey(options),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.v2.bot.insight.message.delivery.get({
        ...options,
        fetch: { ...options.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useV2BotInsightMessageDelivery<
  TData = Extract<
    Awaited<ReturnType<typeof client.v2.bot.insight.message.delivery.get>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.insight.message.delivery.get>>['error'],
    null
  >,
>(
  options: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<typeof client.v2.bot.insight.message.delivery.get>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<typeof client.v2.bot.insight.message.delivery.get>>,
            { error: null }
          >['data'],
          ReturnType<typeof getV2BotInsightMessageDeliveryQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.v2.bot.insight.message.delivery.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options
  return useQuery(
    {
      ...queryOptions,
      queryKey: getV2BotInsightMessageDeliveryQueryKey(clientOptions),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.v2.bot.insight.message.delivery.get({
          ...clientOptions,
          fetch: { ...clientOptions.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getV2BotInsightFollowersQueryKey(
  options?: Parameters<typeof client.v2.bot.insight.followers.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['v2', '/v2/bot/insight/followers', keyArgs] as const
}

export function getV2BotInsightFollowersQueryOptions(
  options?: Parameters<typeof client.v2.bot.insight.followers.get>[0],
) {
  return {
    queryKey: getV2BotInsightFollowersQueryKey(options),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.v2.bot.insight.followers.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useV2BotInsightFollowers<
  TData = Extract<
    Awaited<ReturnType<typeof client.v2.bot.insight.followers.get>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.v2.bot.insight.followers.get>>['error'], null>,
>(
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<typeof client.v2.bot.insight.followers.get>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<typeof client.v2.bot.insight.followers.get>>,
            { error: null }
          >['data'],
          ReturnType<typeof getV2BotInsightFollowersQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.v2.bot.insight.followers.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: getV2BotInsightFollowersQueryKey(clientOptions),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.v2.bot.insight.followers.get({
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

export function getV2BotInsightMessageEventQueryKey(
  options: Parameters<typeof client.v2.bot.insight.message.event.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['v2', '/v2/bot/insight/message/event', keyArgs] as const
}

export function getV2BotInsightMessageEventQueryOptions(
  options: Parameters<typeof client.v2.bot.insight.message.event.get>[0],
) {
  return {
    queryKey: getV2BotInsightMessageEventQueryKey(options),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.v2.bot.insight.message.event.get({
        ...options,
        fetch: { ...options.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useV2BotInsightMessageEvent<
  TData = Extract<
    Awaited<ReturnType<typeof client.v2.bot.insight.message.event.get>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.insight.message.event.get>>['error'],
    null
  >,
>(
  options: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<typeof client.v2.bot.insight.message.event.get>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<typeof client.v2.bot.insight.message.event.get>>,
            { error: null }
          >['data'],
          ReturnType<typeof getV2BotInsightMessageEventQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.v2.bot.insight.message.event.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options
  return useQuery(
    {
      ...queryOptions,
      queryKey: getV2BotInsightMessageEventQueryKey(clientOptions),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.v2.bot.insight.message.event.get({
          ...clientOptions,
          fetch: { ...clientOptions.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getV2BotInsightMessageEventAggregationQueryKey(
  options: Parameters<typeof client.v2.bot.insight.message.event.aggregation.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['v2', '/v2/bot/insight/message/event/aggregation', keyArgs] as const
}

export function getV2BotInsightMessageEventAggregationQueryOptions(
  options: Parameters<typeof client.v2.bot.insight.message.event.aggregation.get>[0],
) {
  return {
    queryKey: getV2BotInsightMessageEventAggregationQueryKey(options),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.v2.bot.insight.message.event.aggregation.get({
        ...options,
        fetch: { ...options.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useV2BotInsightMessageEventAggregation<
  TData = Extract<
    Awaited<ReturnType<typeof client.v2.bot.insight.message.event.aggregation.get>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.insight.message.event.aggregation.get>>['error'],
    null
  >,
>(
  options: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<typeof client.v2.bot.insight.message.event.aggregation.get>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<typeof client.v2.bot.insight.message.event.aggregation.get>>,
            { error: null }
          >['data'],
          ReturnType<typeof getV2BotInsightMessageEventAggregationQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.v2.bot.insight.message.event.aggregation.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options
  return useQuery(
    {
      ...queryOptions,
      queryKey: getV2BotInsightMessageEventAggregationQueryKey(clientOptions),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.v2.bot.insight.message.event.aggregation.get({
          ...clientOptions,
          fetch: { ...clientOptions.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getV2BotInsightRichmenuRichMenuIdSummaryQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.v2.bot.insight.richmenu>[0]>,
  options: Parameters<ReturnType<typeof client.v2.bot.insight.richmenu>['summary']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['v2', '/v2/bot/insight/richmenu/{richMenuId}/summary', toValue(params), keyArgs] as const
}

export function getV2BotInsightRichmenuRichMenuIdSummaryQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.v2.bot.insight.richmenu>[0]>,
  options: Parameters<ReturnType<typeof client.v2.bot.insight.richmenu>['summary']['get']>[0],
) {
  return {
    queryKey: computed(() => getV2BotInsightRichmenuRichMenuIdSummaryQueryKey(params, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.v2.bot.insight
        .richmenu(toValue(params))
        .summary.get({ ...options, fetch: { ...options.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useV2BotInsightRichmenuRichMenuIdSummary<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.insight.richmenu>['summary']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.v2.bot.insight.richmenu>['summary']['get']>
    >['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.v2.bot.insight.richmenu>[0]>,
  options: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<
              ReturnType<ReturnType<typeof client.v2.bot.insight.richmenu>['summary']['get']>
            >,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<
              ReturnType<ReturnType<typeof client.v2.bot.insight.richmenu>['summary']['get']>
            >,
            { error: null }
          >['data'],
          ReturnType<typeof getV2BotInsightRichmenuRichMenuIdSummaryQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<ReturnType<typeof client.v2.bot.insight.richmenu>['summary']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() =>
        getV2BotInsightRichmenuRichMenuIdSummaryQueryKey(params, clientOptions),
      ),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.v2.bot.insight
          .richmenu(toValue(params))
          .summary.get({ ...clientOptions, fetch: { ...clientOptions.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getV2BotInsightRichmenuRichMenuIdDailyQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.v2.bot.insight.richmenu>[0]>,
  options: Parameters<ReturnType<typeof client.v2.bot.insight.richmenu>['daily']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['v2', '/v2/bot/insight/richmenu/{richMenuId}/daily', toValue(params), keyArgs] as const
}

export function getV2BotInsightRichmenuRichMenuIdDailyQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.v2.bot.insight.richmenu>[0]>,
  options: Parameters<ReturnType<typeof client.v2.bot.insight.richmenu>['daily']['get']>[0],
) {
  return {
    queryKey: computed(() => getV2BotInsightRichmenuRichMenuIdDailyQueryKey(params, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.v2.bot.insight
        .richmenu(toValue(params))
        .daily.get({ ...options, fetch: { ...options.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useV2BotInsightRichmenuRichMenuIdDaily<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.insight.richmenu>['daily']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.insight.richmenu>['daily']['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.v2.bot.insight.richmenu>[0]>,
  options: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.v2.bot.insight.richmenu>['daily']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.v2.bot.insight.richmenu>['daily']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getV2BotInsightRichmenuRichMenuIdDailyQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<ReturnType<typeof client.v2.bot.insight.richmenu>['daily']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() =>
        getV2BotInsightRichmenuRichMenuIdDailyQueryKey(params, clientOptions),
      ),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.v2.bot.insight
          .richmenu(toValue(params))
          .daily.get({ ...clientOptions, fetch: { ...clientOptions.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}
