import useSWR from 'swr'
import useSWRImmutable from 'swr/immutable'
import type { Key, SWRConfiguration } from 'swr'
import { client } from '../lib'

export function getV2Key() {
  return ['v2'] as const
}

export function getGetV2BotInsightDemographicKey() {
  return ['v2', '/v2/bot/insight/demographic'] as const
}

export function useGetV2BotInsightDemographic<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.insight.demographic.get>>['error'],
    null
  >,
>(options?: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.insight.demographic.get>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.v2.bot.insight.demographic.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotInsightDemographicKey()
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<typeof client.v2.bot.insight.demographic.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.insight.demographic.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetV2BotInsightDemographic<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.insight.demographic.get>>['error'],
    null
  >,
>(options?: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.insight.demographic.get>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.v2.bot.insight.demographic.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotInsightDemographicKey()
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<typeof client.v2.bot.insight.demographic.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.insight.demographic.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetV2BotInsightMessageDeliveryKey(
  options: Parameters<typeof client.v2.bot.insight.message.delivery.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['v2', '/v2/bot/insight/message/delivery', keyArgs] as const
}

export function useGetV2BotInsightMessageDelivery<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.insight.message.delivery.get>>['error'],
    null
  >,
>(options: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.insight.message.delivery.get>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options: Parameters<typeof client.v2.bot.insight.message.delivery.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotInsightMessageDeliveryKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<typeof client.v2.bot.insight.message.delivery.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.insight.message.delivery.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetV2BotInsightMessageDelivery<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.insight.message.delivery.get>>['error'],
    null
  >,
>(options: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.insight.message.delivery.get>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options: Parameters<typeof client.v2.bot.insight.message.delivery.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotInsightMessageDeliveryKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<typeof client.v2.bot.insight.message.delivery.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.insight.message.delivery.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetV2BotInsightFollowersKey(
  options?: Parameters<typeof client.v2.bot.insight.followers.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['v2', '/v2/bot/insight/followers', keyArgs] as const
}

export function useGetV2BotInsightFollowers<
  TError = Exclude<Awaited<ReturnType<typeof client.v2.bot.insight.followers.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.insight.followers.get>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.v2.bot.insight.followers.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotInsightFollowersKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<typeof client.v2.bot.insight.followers.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.insight.followers.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetV2BotInsightFollowers<
  TError = Exclude<Awaited<ReturnType<typeof client.v2.bot.insight.followers.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.insight.followers.get>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.v2.bot.insight.followers.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotInsightFollowersKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<typeof client.v2.bot.insight.followers.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.insight.followers.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetV2BotInsightMessageEventKey(
  options: Parameters<typeof client.v2.bot.insight.message.event.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['v2', '/v2/bot/insight/message/event', keyArgs] as const
}

export function useGetV2BotInsightMessageEvent<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.insight.message.event.get>>['error'],
    null
  >,
>(options: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.insight.message.event.get>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options: Parameters<typeof client.v2.bot.insight.message.event.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotInsightMessageEventKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<typeof client.v2.bot.insight.message.event.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.insight.message.event.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetV2BotInsightMessageEvent<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.insight.message.event.get>>['error'],
    null
  >,
>(options: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.insight.message.event.get>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options: Parameters<typeof client.v2.bot.insight.message.event.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotInsightMessageEventKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<typeof client.v2.bot.insight.message.event.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.insight.message.event.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetV2BotInsightMessageEventAggregationKey(
  options: Parameters<typeof client.v2.bot.insight.message.event.aggregation.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['v2', '/v2/bot/insight/message/event/aggregation', keyArgs] as const
}

export function useGetV2BotInsightMessageEventAggregation<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.insight.message.event.aggregation.get>>['error'],
    null
  >,
>(options: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.insight.message.event.aggregation.get>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options: Parameters<typeof client.v2.bot.insight.message.event.aggregation.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotInsightMessageEventAggregationKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<typeof client.v2.bot.insight.message.event.aggregation.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } =
          await client.v2.bot.insight.message.event.aggregation.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetV2BotInsightMessageEventAggregation<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.insight.message.event.aggregation.get>>['error'],
    null
  >,
>(options: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.insight.message.event.aggregation.get>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options: Parameters<typeof client.v2.bot.insight.message.event.aggregation.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotInsightMessageEventAggregationKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<typeof client.v2.bot.insight.message.event.aggregation.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } =
          await client.v2.bot.insight.message.event.aggregation.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetV2BotInsightRichmenuRichMenuIdSummaryKey(
  params: Parameters<typeof client.v2.bot.insight.richmenu>[0],
  options: Parameters<ReturnType<typeof client.v2.bot.insight.richmenu>['summary']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['v2', '/v2/bot/insight/richmenu/{richMenuId}/summary', params, keyArgs] as const
}

export function useGetV2BotInsightRichmenuRichMenuIdSummary<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.v2.bot.insight.richmenu>['summary']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.v2.bot.insight.richmenu>[0],
  options: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.insight.richmenu>['summary']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options: Parameters<ReturnType<typeof client.v2.bot.insight.richmenu>['summary']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotInsightRichmenuRichMenuIdSummaryKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.insight.richmenu>['summary']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.insight
          .richmenu(params)
          .summary.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetV2BotInsightRichmenuRichMenuIdSummary<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.v2.bot.insight.richmenu>['summary']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.v2.bot.insight.richmenu>[0],
  options: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.insight.richmenu>['summary']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options: Parameters<ReturnType<typeof client.v2.bot.insight.richmenu>['summary']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotInsightRichmenuRichMenuIdSummaryKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.insight.richmenu>['summary']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.insight
          .richmenu(params)
          .summary.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetV2BotInsightRichmenuRichMenuIdDailyKey(
  params: Parameters<typeof client.v2.bot.insight.richmenu>[0],
  options: Parameters<ReturnType<typeof client.v2.bot.insight.richmenu>['daily']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['v2', '/v2/bot/insight/richmenu/{richMenuId}/daily', params, keyArgs] as const
}

export function useGetV2BotInsightRichmenuRichMenuIdDaily<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.insight.richmenu>['daily']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.v2.bot.insight.richmenu>[0],
  options: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.insight.richmenu>['daily']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options: Parameters<ReturnType<typeof client.v2.bot.insight.richmenu>['daily']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotInsightRichmenuRichMenuIdDailyKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.insight.richmenu>['daily']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.insight
          .richmenu(params)
          .daily.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetV2BotInsightRichmenuRichMenuIdDaily<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.insight.richmenu>['daily']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.v2.bot.insight.richmenu>[0],
  options: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.insight.richmenu>['daily']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options: Parameters<ReturnType<typeof client.v2.bot.insight.richmenu>['daily']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotInsightRichmenuRichMenuIdDailyKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.insight.richmenu>['daily']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.insight
          .richmenu(params)
          .daily.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}
