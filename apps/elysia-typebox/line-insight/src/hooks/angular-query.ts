import { injectQuery, queryOptions } from '@tanstack/angular-query'
import type { CreateQueryOptions } from '@tanstack/angular-query'
import { client } from '../lib'

export function getV2Key() {
  return ['v2'] as const
}

export function getV2BotInsightDemographicQueryKey() {
  return ['v2', '/v2/bot/insight/demographic'] as const
}

export function getV2BotInsightDemographicQueryOptions<
  TData = Extract<
    Awaited<ReturnType<typeof client.v2.bot.insight.demographic.get>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.insight.demographic.get>>['error'],
    null
  >,
>(options?: Parameters<typeof client.v2.bot.insight.demographic.get>[0]) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.insight.demographic.get>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getV2BotInsightDemographicQueryKey>
  >({
    queryKey: getV2BotInsightDemographicQueryKey(),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.v2.bot.insight.demographic.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  })
}

export function injectV2BotInsightDemographic<
  TData = Extract<
    Awaited<ReturnType<typeof client.v2.bot.insight.demographic.get>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.insight.demographic.get>>['error'],
    null
  >,
>(
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<typeof client.v2.bot.insight.demographic.get>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getV2BotInsightDemographicQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.v2.bot.insight.demographic.get>[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getV2BotInsightDemographicQueryOptions<TData, TError>(clientOptions), ...query }
  })
}

export function getV2BotInsightMessageDeliveryQueryKey(
  options: Parameters<typeof client.v2.bot.insight.message.delivery.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['v2', '/v2/bot/insight/message/delivery', keyArgs] as const
}

export function getV2BotInsightMessageDeliveryQueryOptions<
  TData = Extract<
    Awaited<ReturnType<typeof client.v2.bot.insight.message.delivery.get>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.insight.message.delivery.get>>['error'],
    null
  >,
>(options: Parameters<typeof client.v2.bot.insight.message.delivery.get>[0]) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.insight.message.delivery.get>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getV2BotInsightMessageDeliveryQueryKey>
  >({
    queryKey: getV2BotInsightMessageDeliveryQueryKey(options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.v2.bot.insight.message.delivery.get({
        ...options,
        fetch: { ...options.fetch, signal },
      })
      if (error) throw error
      return data
    },
  })
}

export function injectV2BotInsightMessageDelivery<
  TData = Extract<
    Awaited<ReturnType<typeof client.v2.bot.insight.message.delivery.get>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.insight.message.delivery.get>>['error'],
    null
  >,
>(
  options: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<typeof client.v2.bot.insight.message.delivery.get>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getV2BotInsightMessageDeliveryQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.v2.bot.insight.message.delivery.get>[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getV2BotInsightMessageDeliveryQueryOptions<TData, TError>(clientOptions), ...query }
  })
}

export function getV2BotInsightFollowersQueryKey(
  options?: Parameters<typeof client.v2.bot.insight.followers.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['v2', '/v2/bot/insight/followers', keyArgs] as const
}

export function getV2BotInsightFollowersQueryOptions<
  TData = Extract<
    Awaited<ReturnType<typeof client.v2.bot.insight.followers.get>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.v2.bot.insight.followers.get>>['error'], null>,
>(options?: Parameters<typeof client.v2.bot.insight.followers.get>[0]) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.insight.followers.get>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getV2BotInsightFollowersQueryKey>
  >({
    queryKey: getV2BotInsightFollowersQueryKey(options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.v2.bot.insight.followers.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  })
}

export function injectV2BotInsightFollowers<
  TData = Extract<
    Awaited<ReturnType<typeof client.v2.bot.insight.followers.get>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.v2.bot.insight.followers.get>>['error'], null>,
>(
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<typeof client.v2.bot.insight.followers.get>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getV2BotInsightFollowersQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.v2.bot.insight.followers.get>[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getV2BotInsightFollowersQueryOptions<TData, TError>(clientOptions), ...query }
  })
}

export function getV2BotInsightMessageEventQueryKey(
  options: Parameters<typeof client.v2.bot.insight.message.event.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['v2', '/v2/bot/insight/message/event', keyArgs] as const
}

export function getV2BotInsightMessageEventQueryOptions<
  TData = Extract<
    Awaited<ReturnType<typeof client.v2.bot.insight.message.event.get>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.insight.message.event.get>>['error'],
    null
  >,
>(options: Parameters<typeof client.v2.bot.insight.message.event.get>[0]) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.insight.message.event.get>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getV2BotInsightMessageEventQueryKey>
  >({
    queryKey: getV2BotInsightMessageEventQueryKey(options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.v2.bot.insight.message.event.get({
        ...options,
        fetch: { ...options.fetch, signal },
      })
      if (error) throw error
      return data
    },
  })
}

export function injectV2BotInsightMessageEvent<
  TData = Extract<
    Awaited<ReturnType<typeof client.v2.bot.insight.message.event.get>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.insight.message.event.get>>['error'],
    null
  >,
>(
  options: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<typeof client.v2.bot.insight.message.event.get>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getV2BotInsightMessageEventQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.v2.bot.insight.message.event.get>[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getV2BotInsightMessageEventQueryOptions<TData, TError>(clientOptions), ...query }
  })
}

export function getV2BotInsightMessageEventAggregationQueryKey(
  options: Parameters<typeof client.v2.bot.insight.message.event.aggregation.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['v2', '/v2/bot/insight/message/event/aggregation', keyArgs] as const
}

export function getV2BotInsightMessageEventAggregationQueryOptions<
  TData = Extract<
    Awaited<ReturnType<typeof client.v2.bot.insight.message.event.aggregation.get>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.insight.message.event.aggregation.get>>['error'],
    null
  >,
>(options: Parameters<typeof client.v2.bot.insight.message.event.aggregation.get>[0]) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.insight.message.event.aggregation.get>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getV2BotInsightMessageEventAggregationQueryKey>
  >({
    queryKey: getV2BotInsightMessageEventAggregationQueryKey(options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.v2.bot.insight.message.event.aggregation.get({
        ...options,
        fetch: { ...options.fetch, signal },
      })
      if (error) throw error
      return data
    },
  })
}

export function injectV2BotInsightMessageEventAggregation<
  TData = Extract<
    Awaited<ReturnType<typeof client.v2.bot.insight.message.event.aggregation.get>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.insight.message.event.aggregation.get>>['error'],
    null
  >,
>(
  options: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<typeof client.v2.bot.insight.message.event.aggregation.get>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getV2BotInsightMessageEventAggregationQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.v2.bot.insight.message.event.aggregation.get>[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options()
    return {
      ...getV2BotInsightMessageEventAggregationQueryOptions<TData, TError>(clientOptions),
      ...query,
    }
  })
}

export function getV2BotInsightRichmenuRichMenuIdSummaryQueryKey(
  params: Parameters<typeof client.v2.bot.insight.richmenu>[0],
  options: Parameters<ReturnType<typeof client.v2.bot.insight.richmenu>['summary']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['v2', '/v2/bot/insight/richmenu/{richMenuId}/summary', params, keyArgs] as const
}

export function getV2BotInsightRichmenuRichMenuIdSummaryQueryOptions<
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
  params: Parameters<typeof client.v2.bot.insight.richmenu>[0],
  options: Parameters<ReturnType<typeof client.v2.bot.insight.richmenu>['summary']['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.v2.bot.insight.richmenu>['summary']['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getV2BotInsightRichmenuRichMenuIdSummaryQueryKey>
  >({
    queryKey: getV2BotInsightRichmenuRichMenuIdSummaryQueryKey(params, options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.v2.bot.insight
        .richmenu(params)
        .summary.get({ ...options, fetch: { ...options.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectV2BotInsightRichmenuRichMenuIdSummary<
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
  params: () => Parameters<typeof client.v2.bot.insight.richmenu>[0],
  options: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.v2.bot.insight.richmenu>['summary']['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getV2BotInsightRichmenuRichMenuIdSummaryQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<ReturnType<typeof client.v2.bot.insight.richmenu>['summary']['get']>[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options()
    return {
      ...getV2BotInsightRichmenuRichMenuIdSummaryQueryOptions<TData, TError>(
        params(),
        clientOptions,
      ),
      ...query,
    }
  })
}

export function getV2BotInsightRichmenuRichMenuIdDailyQueryKey(
  params: Parameters<typeof client.v2.bot.insight.richmenu>[0],
  options: Parameters<ReturnType<typeof client.v2.bot.insight.richmenu>['daily']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['v2', '/v2/bot/insight/richmenu/{richMenuId}/daily', params, keyArgs] as const
}

export function getV2BotInsightRichmenuRichMenuIdDailyQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.insight.richmenu>['daily']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.insight.richmenu>['daily']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.v2.bot.insight.richmenu>[0],
  options: Parameters<ReturnType<typeof client.v2.bot.insight.richmenu>['daily']['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.v2.bot.insight.richmenu>['daily']['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getV2BotInsightRichmenuRichMenuIdDailyQueryKey>
  >({
    queryKey: getV2BotInsightRichmenuRichMenuIdDailyQueryKey(params, options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.v2.bot.insight
        .richmenu(params)
        .daily.get({ ...options, fetch: { ...options.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function injectV2BotInsightRichmenuRichMenuIdDaily<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.insight.richmenu>['daily']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.insight.richmenu>['daily']['get']>>['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.v2.bot.insight.richmenu>[0],
  options: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.v2.bot.insight.richmenu>['daily']['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getV2BotInsightRichmenuRichMenuIdDailyQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<ReturnType<typeof client.v2.bot.insight.richmenu>['daily']['get']>[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options()
    return {
      ...getV2BotInsightRichmenuRichMenuIdDailyQueryOptions<TData, TError>(params(), clientOptions),
      ...query,
    }
  })
}
