import { injectQuery, injectMutation, queryOptions, mutationOptions } from '@tanstack/angular-query'
import type { CreateQueryOptions, CreateMutationOptions } from '@tanstack/angular-query'
import { client } from '../lib'

export function getV2Key() {
  return ['v2'] as const
}

export function getPostV2BotChannelDetachMutationKey() {
  return ['v2', '/v2/bot/channel/detach', 'POST'] as const
}

export function getPostV2BotChannelDetachMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.v2.bot.channel.detach.post>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.v2.bot.channel.detach.post>>, { error: null }>['data'],
    TError,
    {
      body: Parameters<typeof client.v2.bot.channel.detach.post>[0]
      options?: Parameters<typeof client.v2.bot.channel.detach.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostV2BotChannelDetachMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.v2.bot.channel.detach.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPostV2BotChannelDetach<
  TError = Exclude<Awaited<ReturnType<typeof client.v2.bot.channel.detach.post>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<typeof client.v2.bot.channel.detach.post>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<typeof client.v2.bot.channel.detach.post>[0]
          options?: Parameters<typeof client.v2.bot.channel.detach.post>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPostV2BotChannelDetachMutationOptions<TError, TOnMutateResult>()
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getPostV2BotChatChatIdControlAcquireMutationKey() {
  return ['v2', '/v2/bot/chat/{chatId}/control/acquire', 'POST'] as const
}

export function getPostV2BotChatChatIdControlAcquireMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.v2.bot.chat>['control']['acquire']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: Parameters<typeof client.v2.bot.chat>[0]) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.v2.bot.chat>['control']['acquire']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.v2.bot.chat>['control']['acquire']['post']>[0]
      options?: Parameters<ReturnType<typeof client.v2.bot.chat>['control']['acquire']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostV2BotChatChatIdControlAcquireMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.v2.bot.chat(params).control.acquire.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPostV2BotChatChatIdControlAcquire<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.v2.bot.chat>['control']['acquire']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.v2.bot.chat>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.v2.bot.chat>['control']['acquire']['post']>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<ReturnType<typeof client.v2.bot.chat>['control']['acquire']['post']>[0]
          options?: Parameters<
            ReturnType<typeof client.v2.bot.chat>['control']['acquire']['post']
          >[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPostV2BotChatChatIdControlAcquireMutationOptions<
      TError,
      TOnMutateResult
    >(params())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getPostV2BotChatChatIdControlReleaseMutationKey() {
  return ['v2', '/v2/bot/chat/{chatId}/control/release', 'POST'] as const
}

export function getPostV2BotChatChatIdControlReleaseMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.v2.bot.chat>['control']['release']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: Parameters<typeof client.v2.bot.chat>[0]) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.v2.bot.chat>['control']['release']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<typeof client.v2.bot.chat>['control']['release']['post']>[0]
      options?: Parameters<ReturnType<typeof client.v2.bot.chat>['control']['release']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostV2BotChatChatIdControlReleaseMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.v2.bot.chat(params).control.release.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function injectPostV2BotChatChatIdControlRelease<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.v2.bot.chat>['control']['release']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.v2.bot.chat>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.v2.bot.chat>['control']['release']['post']>>,
          { error: null }
        >['data'],
        TError,
        {
          body?: Parameters<ReturnType<typeof client.v2.bot.chat>['control']['release']['post']>[0]
          options?: Parameters<
            ReturnType<typeof client.v2.bot.chat>['control']['release']['post']
          >[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
) {
  return injectMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPostV2BotChatChatIdControlReleaseMutationOptions<
      TError,
      TOnMutateResult
    >(params())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  })
}

export function getV2BotListQueryKey(options?: Parameters<typeof client.v2.bot.list.get>[0]) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['v2', '/v2/bot/list', keyArgs] as const
}

export function getV2BotListQueryOptions<
  TData = Extract<Awaited<ReturnType<typeof client.v2.bot.list.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.v2.bot.list.get>>['error'], null>,
>(options?: Parameters<typeof client.v2.bot.list.get>[0]) {
  return queryOptions<
    Extract<Awaited<ReturnType<typeof client.v2.bot.list.get>>, { error: null }>['data'],
    TError,
    TData,
    ReturnType<typeof getV2BotListQueryKey>
  >({
    queryKey: getV2BotListQueryKey(options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.v2.bot.list.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  })
}

export function injectV2BotList<
  TData = Extract<Awaited<ReturnType<typeof client.v2.bot.list.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.v2.bot.list.get>>['error'], null>,
>(
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<Awaited<ReturnType<typeof client.v2.bot.list.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getV2BotListQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.v2.bot.list.get>[0]
  },
) {
  return injectQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getV2BotListQueryOptions<TData, TError>(clientOptions), ...query }
  })
}
