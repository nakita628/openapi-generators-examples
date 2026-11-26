import useSWR from 'swr'
import useSWRImmutable from 'swr/immutable'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import { client } from '../lib'

export function getV2Key() {
  return ['v2'] as const
}

export function getPostV2BotChannelDetachKey() {
  return ['v2', '/v2/bot/channel/detach', 'POST'] as const
}

export function usePostV2BotChannelDetach<
  TError = Exclude<Awaited<ReturnType<typeof client.v2.bot.channel.detach.post>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.v2.bot.channel.detach.post>>, { error: null }>['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.v2.bot.channel.detach.post>[0]
      options?: Parameters<typeof client.v2.bot.channel.detach.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostV2BotChannelDetachKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<typeof client.v2.bot.channel.detach.post>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.v2.bot.channel.detach.post>[0]
        options?: Parameters<typeof client.v2.bot.channel.detach.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.v2.bot.channel.detach.post>[0]
            options?: Parameters<typeof client.v2.bot.channel.detach.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.v2.bot.channel.detach.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostV2BotChatChatIdControlAcquireKey() {
  return ['v2', '/v2/bot/chat/{chatId}/control/acquire', 'POST'] as const
}

export function usePostV2BotChatChatIdControlAcquire<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.v2.bot.chat>['control']['acquire']['post']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.v2.bot.chat>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.chat>['control']['acquire']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.v2.bot.chat>['control']['acquire']['post']>[0]
        options?: Parameters<ReturnType<typeof client.v2.bot.chat>['control']['acquire']['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostV2BotChatChatIdControlAcquireKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.chat>['control']['acquire']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.v2.bot.chat>['control']['acquire']['post']>[0]
        options?: Parameters<ReturnType<typeof client.v2.bot.chat>['control']['acquire']['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.v2.bot.chat>['control']['acquire']['post']>[0]
            options?: Parameters<
              ReturnType<typeof client.v2.bot.chat>['control']['acquire']['post']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client.v2.bot
          .chat(params)
          .control.acquire.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostV2BotChatChatIdControlReleaseKey() {
  return ['v2', '/v2/bot/chat/{chatId}/control/release', 'POST'] as const
}

export function usePostV2BotChatChatIdControlRelease<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.v2.bot.chat>['control']['release']['post']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.v2.bot.chat>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.chat>['control']['release']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.v2.bot.chat>['control']['release']['post']>[0]
        options?: Parameters<ReturnType<typeof client.v2.bot.chat>['control']['release']['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostV2BotChatChatIdControlReleaseKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.chat>['control']['release']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.v2.bot.chat>['control']['release']['post']>[0]
        options?: Parameters<ReturnType<typeof client.v2.bot.chat>['control']['release']['post']>[1]
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
              ReturnType<typeof client.v2.bot.chat>['control']['release']['post']
            >[0]
            options?: Parameters<
              ReturnType<typeof client.v2.bot.chat>['control']['release']['post']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client.v2.bot
          .chat(params)
          .control.release.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetV2BotListKey(options?: Parameters<typeof client.v2.bot.list.get>[0]) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['v2', '/v2/bot/list', keyArgs] as const
}

export function useGetV2BotList<
  TError = Exclude<Awaited<ReturnType<typeof client.v2.bot.list.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.v2.bot.list.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.v2.bot.list.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotListKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<Awaited<ReturnType<typeof client.v2.bot.list.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.list.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetV2BotList<
  TError = Exclude<Awaited<ReturnType<typeof client.v2.bot.list.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.v2.bot.list.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.v2.bot.list.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotListKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<Awaited<ReturnType<typeof client.v2.bot.list.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.list.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}
