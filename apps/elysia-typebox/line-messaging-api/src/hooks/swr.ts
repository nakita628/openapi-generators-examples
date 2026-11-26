import useSWR from 'swr'
import useSWRImmutable from 'swr/immutable'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import { client } from '../lib'

export function getBotKey() {
  return ['bot'] as const
}

export function getV2Key() {
  return ['v2'] as const
}

export function getGetV2BotChannelWebhookEndpointKey() {
  return ['v2', '/v2/bot/channel/webhook/endpoint'] as const
}

export function useGetV2BotChannelWebhookEndpoint<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.channel.webhook.endpoint.get>>['error'],
    null
  >,
>(options?: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.channel.webhook.endpoint.get>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.v2.bot.channel.webhook.endpoint.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotChannelWebhookEndpointKey()
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<typeof client.v2.bot.channel.webhook.endpoint.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.channel.webhook.endpoint.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetV2BotChannelWebhookEndpoint<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.channel.webhook.endpoint.get>>['error'],
    null
  >,
>(options?: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.channel.webhook.endpoint.get>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.v2.bot.channel.webhook.endpoint.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotChannelWebhookEndpointKey()
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<typeof client.v2.bot.channel.webhook.endpoint.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.channel.webhook.endpoint.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPutV2BotChannelWebhookEndpointKey() {
  return ['v2', '/v2/bot/channel/webhook/endpoint', 'PUT'] as const
}

export function usePutV2BotChannelWebhookEndpoint<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.channel.webhook.endpoint.put>>['error'],
    null
  >,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.channel.webhook.endpoint.put>>,
      { error: null }
    >['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.v2.bot.channel.webhook.endpoint.put>[0]
      options?: Parameters<typeof client.v2.bot.channel.webhook.endpoint.put>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutV2BotChannelWebhookEndpointKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<typeof client.v2.bot.channel.webhook.endpoint.put>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.v2.bot.channel.webhook.endpoint.put>[0]
        options?: Parameters<typeof client.v2.bot.channel.webhook.endpoint.put>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.v2.bot.channel.webhook.endpoint.put>[0]
            options?: Parameters<typeof client.v2.bot.channel.webhook.endpoint.put>[1]
          }
        },
      ) => {
        const { data, error } = await client.v2.bot.channel.webhook.endpoint.put(
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

export function getPostV2BotChannelWebhookTestKey() {
  return ['v2', '/v2/bot/channel/webhook/test', 'POST'] as const
}

export function usePostV2BotChannelWebhookTest<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.channel.webhook.test.post>>['error'],
    null
  >,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.channel.webhook.test.post>>,
      { error: null }
    >['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.v2.bot.channel.webhook.test.post>[0]
      options?: Parameters<typeof client.v2.bot.channel.webhook.test.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostV2BotChannelWebhookTestKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<typeof client.v2.bot.channel.webhook.test.post>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.v2.bot.channel.webhook.test.post>[0]
        options?: Parameters<typeof client.v2.bot.channel.webhook.test.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.v2.bot.channel.webhook.test.post>[0]
            options?: Parameters<typeof client.v2.bot.channel.webhook.test.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.v2.bot.channel.webhook.test.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetV2BotMessageMessageIdContentKey(
  params: Parameters<typeof client.v2.bot.message>[0],
) {
  return ['v2', '/v2/bot/message/{messageId}/content', params] as const
}

export function useGetV2BotMessageMessageIdContent<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.message>['content']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.v2.bot.message>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.message>['content']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.v2.bot.message>['content']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotMessageMessageIdContentKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.message>['content']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.message(params).content.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetV2BotMessageMessageIdContent<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.message>['content']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.v2.bot.message>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.message>['content']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.v2.bot.message>['content']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotMessageMessageIdContentKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.message>['content']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.message(params).content.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetV2BotMessageMessageIdContentPreviewKey(
  params: Parameters<typeof client.v2.bot.message>[0],
) {
  return ['v2', '/v2/bot/message/{messageId}/content/preview', params] as const
}

export function useGetV2BotMessageMessageIdContentPreview<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.v2.bot.message>['content']['preview']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.v2.bot.message>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.message>['content']['preview']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.v2.bot.message>['content']['preview']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotMessageMessageIdContentPreviewKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.message>['content']['preview']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot
          .message(params)
          .content.preview.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetV2BotMessageMessageIdContentPreview<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.v2.bot.message>['content']['preview']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.v2.bot.message>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.message>['content']['preview']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.v2.bot.message>['content']['preview']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotMessageMessageIdContentPreviewKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.message>['content']['preview']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot
          .message(params)
          .content.preview.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetV2BotMessageMessageIdContentTranscodingKey(
  params: Parameters<typeof client.v2.bot.message>[0],
) {
  return ['v2', '/v2/bot/message/{messageId}/content/transcoding', params] as const
}

export function useGetV2BotMessageMessageIdContentTranscoding<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.v2.bot.message>['content']['transcoding']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.v2.bot.message>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<typeof client.v2.bot.message>['content']['transcoding']['get']>
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<typeof client.v2.bot.message>['content']['transcoding']['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotMessageMessageIdContentTranscodingKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<
          ReturnType<ReturnType<typeof client.v2.bot.message>['content']['transcoding']['get']>
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot
          .message(params)
          .content.transcoding.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetV2BotMessageMessageIdContentTranscoding<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.v2.bot.message>['content']['transcoding']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.v2.bot.message>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<typeof client.v2.bot.message>['content']['transcoding']['get']>
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<typeof client.v2.bot.message>['content']['transcoding']['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotMessageMessageIdContentTranscodingKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<
          ReturnType<ReturnType<typeof client.v2.bot.message>['content']['transcoding']['get']>
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot
          .message(params)
          .content.transcoding.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostV2BotMessageReplyKey() {
  return ['v2', '/v2/bot/message/reply', 'POST'] as const
}

export function usePostV2BotMessageReply<
  TError = Exclude<Awaited<ReturnType<typeof client.v2.bot.message.reply.post>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.v2.bot.message.reply.post>>, { error: null }>['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.v2.bot.message.reply.post>[0]
      options?: Parameters<typeof client.v2.bot.message.reply.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostV2BotMessageReplyKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<typeof client.v2.bot.message.reply.post>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.v2.bot.message.reply.post>[0]
        options?: Parameters<typeof client.v2.bot.message.reply.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.v2.bot.message.reply.post>[0]
            options?: Parameters<typeof client.v2.bot.message.reply.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.v2.bot.message.reply.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostV2BotMessagePushKey() {
  return ['v2', '/v2/bot/message/push', 'POST'] as const
}

export function usePostV2BotMessagePush<
  TError = Exclude<Awaited<ReturnType<typeof client.v2.bot.message.push.post>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.v2.bot.message.push.post>>, { error: null }>['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.v2.bot.message.push.post>[0]
      options?: Parameters<typeof client.v2.bot.message.push.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostV2BotMessagePushKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<Awaited<ReturnType<typeof client.v2.bot.message.push.post>>, { error: null }>['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.v2.bot.message.push.post>[0]
        options?: Parameters<typeof client.v2.bot.message.push.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.v2.bot.message.push.post>[0]
            options?: Parameters<typeof client.v2.bot.message.push.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.v2.bot.message.push.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostV2BotMessageMulticastKey() {
  return ['v2', '/v2/bot/message/multicast', 'POST'] as const
}

export function usePostV2BotMessageMulticast<
  TError = Exclude<Awaited<ReturnType<typeof client.v2.bot.message.multicast.post>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.message.multicast.post>>,
      { error: null }
    >['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.v2.bot.message.multicast.post>[0]
      options?: Parameters<typeof client.v2.bot.message.multicast.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostV2BotMessageMulticastKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<typeof client.v2.bot.message.multicast.post>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.v2.bot.message.multicast.post>[0]
        options?: Parameters<typeof client.v2.bot.message.multicast.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.v2.bot.message.multicast.post>[0]
            options?: Parameters<typeof client.v2.bot.message.multicast.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.v2.bot.message.multicast.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostV2BotMessageNarrowcastKey() {
  return ['v2', '/v2/bot/message/narrowcast', 'POST'] as const
}

export function usePostV2BotMessageNarrowcast<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.message.narrowcast.post>>['error'],
    null
  >,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.message.narrowcast.post>>,
      { error: null }
    >['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.v2.bot.message.narrowcast.post>[0]
      options?: Parameters<typeof client.v2.bot.message.narrowcast.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostV2BotMessageNarrowcastKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<typeof client.v2.bot.message.narrowcast.post>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.v2.bot.message.narrowcast.post>[0]
        options?: Parameters<typeof client.v2.bot.message.narrowcast.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.v2.bot.message.narrowcast.post>[0]
            options?: Parameters<typeof client.v2.bot.message.narrowcast.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.v2.bot.message.narrowcast.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetV2BotMessageProgressNarrowcastKey(
  options: Parameters<typeof client.v2.bot.message.progress.narrowcast.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['v2', '/v2/bot/message/progress/narrowcast', keyArgs] as const
}

export function useGetV2BotMessageProgressNarrowcast<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.message.progress.narrowcast.get>>['error'],
    null
  >,
>(options: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.message.progress.narrowcast.get>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options: Parameters<typeof client.v2.bot.message.progress.narrowcast.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotMessageProgressNarrowcastKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<typeof client.v2.bot.message.progress.narrowcast.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.message.progress.narrowcast.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetV2BotMessageProgressNarrowcast<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.message.progress.narrowcast.get>>['error'],
    null
  >,
>(options: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.message.progress.narrowcast.get>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options: Parameters<typeof client.v2.bot.message.progress.narrowcast.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotMessageProgressNarrowcastKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<typeof client.v2.bot.message.progress.narrowcast.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.message.progress.narrowcast.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostV2BotMessageBroadcastKey() {
  return ['v2', '/v2/bot/message/broadcast', 'POST'] as const
}

export function usePostV2BotMessageBroadcast<
  TError = Exclude<Awaited<ReturnType<typeof client.v2.bot.message.broadcast.post>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.message.broadcast.post>>,
      { error: null }
    >['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.v2.bot.message.broadcast.post>[0]
      options?: Parameters<typeof client.v2.bot.message.broadcast.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostV2BotMessageBroadcastKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<typeof client.v2.bot.message.broadcast.post>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.v2.bot.message.broadcast.post>[0]
        options?: Parameters<typeof client.v2.bot.message.broadcast.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.v2.bot.message.broadcast.post>[0]
            options?: Parameters<typeof client.v2.bot.message.broadcast.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.v2.bot.message.broadcast.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetV2BotMessageQuotaKey() {
  return ['v2', '/v2/bot/message/quota'] as const
}

export function useGetV2BotMessageQuota<
  TError = Exclude<Awaited<ReturnType<typeof client.v2.bot.message.quota.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.v2.bot.message.quota.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.v2.bot.message.quota.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey === undefined ? getGetV2BotMessageQuotaKey() : customKey) : null
  return {
    swrKey,
    ...useSWR<
      Extract<Awaited<ReturnType<typeof client.v2.bot.message.quota.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.message.quota.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetV2BotMessageQuota<
  TError = Exclude<Awaited<ReturnType<typeof client.v2.bot.message.quota.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.v2.bot.message.quota.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.v2.bot.message.quota.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey === undefined ? getGetV2BotMessageQuotaKey() : customKey) : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<Awaited<ReturnType<typeof client.v2.bot.message.quota.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.message.quota.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetV2BotMessageQuotaConsumptionKey() {
  return ['v2', '/v2/bot/message/quota/consumption'] as const
}

export function useGetV2BotMessageQuotaConsumption<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.message.quota.consumption.get>>['error'],
    null
  >,
>(options?: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.message.quota.consumption.get>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.v2.bot.message.quota.consumption.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotMessageQuotaConsumptionKey()
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<typeof client.v2.bot.message.quota.consumption.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.message.quota.consumption.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetV2BotMessageQuotaConsumption<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.message.quota.consumption.get>>['error'],
    null
  >,
>(options?: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.message.quota.consumption.get>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.v2.bot.message.quota.consumption.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotMessageQuotaConsumptionKey()
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<typeof client.v2.bot.message.quota.consumption.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.message.quota.consumption.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetV2BotMessageDeliveryReplyKey(
  options: Parameters<typeof client.v2.bot.message.delivery.reply.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['v2', '/v2/bot/message/delivery/reply', keyArgs] as const
}

export function useGetV2BotMessageDeliveryReply<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.message.delivery.reply.get>>['error'],
    null
  >,
>(options: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.message.delivery.reply.get>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options: Parameters<typeof client.v2.bot.message.delivery.reply.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotMessageDeliveryReplyKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<typeof client.v2.bot.message.delivery.reply.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.message.delivery.reply.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetV2BotMessageDeliveryReply<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.message.delivery.reply.get>>['error'],
    null
  >,
>(options: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.message.delivery.reply.get>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options: Parameters<typeof client.v2.bot.message.delivery.reply.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotMessageDeliveryReplyKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<typeof client.v2.bot.message.delivery.reply.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.message.delivery.reply.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetV2BotMessageDeliveryPushKey(
  options: Parameters<typeof client.v2.bot.message.delivery.push.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['v2', '/v2/bot/message/delivery/push', keyArgs] as const
}

export function useGetV2BotMessageDeliveryPush<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.message.delivery.push.get>>['error'],
    null
  >,
>(options: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.message.delivery.push.get>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options: Parameters<typeof client.v2.bot.message.delivery.push.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotMessageDeliveryPushKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<typeof client.v2.bot.message.delivery.push.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.message.delivery.push.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetV2BotMessageDeliveryPush<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.message.delivery.push.get>>['error'],
    null
  >,
>(options: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.message.delivery.push.get>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options: Parameters<typeof client.v2.bot.message.delivery.push.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotMessageDeliveryPushKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<typeof client.v2.bot.message.delivery.push.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.message.delivery.push.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetV2BotMessageDeliveryMulticastKey(
  options: Parameters<typeof client.v2.bot.message.delivery.multicast.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['v2', '/v2/bot/message/delivery/multicast', keyArgs] as const
}

export function useGetV2BotMessageDeliveryMulticast<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.message.delivery.multicast.get>>['error'],
    null
  >,
>(options: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.message.delivery.multicast.get>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options: Parameters<typeof client.v2.bot.message.delivery.multicast.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotMessageDeliveryMulticastKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<typeof client.v2.bot.message.delivery.multicast.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.message.delivery.multicast.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetV2BotMessageDeliveryMulticast<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.message.delivery.multicast.get>>['error'],
    null
  >,
>(options: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.message.delivery.multicast.get>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options: Parameters<typeof client.v2.bot.message.delivery.multicast.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotMessageDeliveryMulticastKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<typeof client.v2.bot.message.delivery.multicast.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.message.delivery.multicast.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetV2BotMessageDeliveryBroadcastKey(
  options: Parameters<typeof client.v2.bot.message.delivery.broadcast.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['v2', '/v2/bot/message/delivery/broadcast', keyArgs] as const
}

export function useGetV2BotMessageDeliveryBroadcast<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.message.delivery.broadcast.get>>['error'],
    null
  >,
>(options: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.message.delivery.broadcast.get>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options: Parameters<typeof client.v2.bot.message.delivery.broadcast.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotMessageDeliveryBroadcastKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<typeof client.v2.bot.message.delivery.broadcast.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.message.delivery.broadcast.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetV2BotMessageDeliveryBroadcast<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.message.delivery.broadcast.get>>['error'],
    null
  >,
>(options: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.message.delivery.broadcast.get>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options: Parameters<typeof client.v2.bot.message.delivery.broadcast.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotMessageDeliveryBroadcastKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<typeof client.v2.bot.message.delivery.broadcast.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.message.delivery.broadcast.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostV2BotMessageValidateReplyKey() {
  return ['v2', '/v2/bot/message/validate/reply', 'POST'] as const
}

export function usePostV2BotMessageValidateReply<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.message.validate.reply.post>>['error'],
    null
  >,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.message.validate.reply.post>>,
      { error: null }
    >['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.v2.bot.message.validate.reply.post>[0]
      options?: Parameters<typeof client.v2.bot.message.validate.reply.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostV2BotMessageValidateReplyKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<typeof client.v2.bot.message.validate.reply.post>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.v2.bot.message.validate.reply.post>[0]
        options?: Parameters<typeof client.v2.bot.message.validate.reply.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.v2.bot.message.validate.reply.post>[0]
            options?: Parameters<typeof client.v2.bot.message.validate.reply.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.v2.bot.message.validate.reply.post(
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

export function getPostV2BotMessageValidatePushKey() {
  return ['v2', '/v2/bot/message/validate/push', 'POST'] as const
}

export function usePostV2BotMessageValidatePush<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.message.validate.push.post>>['error'],
    null
  >,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.message.validate.push.post>>,
      { error: null }
    >['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.v2.bot.message.validate.push.post>[0]
      options?: Parameters<typeof client.v2.bot.message.validate.push.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostV2BotMessageValidatePushKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<typeof client.v2.bot.message.validate.push.post>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.v2.bot.message.validate.push.post>[0]
        options?: Parameters<typeof client.v2.bot.message.validate.push.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.v2.bot.message.validate.push.post>[0]
            options?: Parameters<typeof client.v2.bot.message.validate.push.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.v2.bot.message.validate.push.post(
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

export function getPostV2BotMessageValidateMulticastKey() {
  return ['v2', '/v2/bot/message/validate/multicast', 'POST'] as const
}

export function usePostV2BotMessageValidateMulticast<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.message.validate.multicast.post>>['error'],
    null
  >,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.message.validate.multicast.post>>,
      { error: null }
    >['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.v2.bot.message.validate.multicast.post>[0]
      options?: Parameters<typeof client.v2.bot.message.validate.multicast.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostV2BotMessageValidateMulticastKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<typeof client.v2.bot.message.validate.multicast.post>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.v2.bot.message.validate.multicast.post>[0]
        options?: Parameters<typeof client.v2.bot.message.validate.multicast.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.v2.bot.message.validate.multicast.post>[0]
            options?: Parameters<typeof client.v2.bot.message.validate.multicast.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.v2.bot.message.validate.multicast.post(
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

export function getPostV2BotMessageValidateNarrowcastKey() {
  return ['v2', '/v2/bot/message/validate/narrowcast', 'POST'] as const
}

export function usePostV2BotMessageValidateNarrowcast<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.message.validate.narrowcast.post>>['error'],
    null
  >,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.message.validate.narrowcast.post>>,
      { error: null }
    >['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.v2.bot.message.validate.narrowcast.post>[0]
      options?: Parameters<typeof client.v2.bot.message.validate.narrowcast.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostV2BotMessageValidateNarrowcastKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<typeof client.v2.bot.message.validate.narrowcast.post>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.v2.bot.message.validate.narrowcast.post>[0]
        options?: Parameters<typeof client.v2.bot.message.validate.narrowcast.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.v2.bot.message.validate.narrowcast.post>[0]
            options?: Parameters<typeof client.v2.bot.message.validate.narrowcast.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.v2.bot.message.validate.narrowcast.post(
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

export function getPostV2BotMessageValidateBroadcastKey() {
  return ['v2', '/v2/bot/message/validate/broadcast', 'POST'] as const
}

export function usePostV2BotMessageValidateBroadcast<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.message.validate.broadcast.post>>['error'],
    null
  >,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.message.validate.broadcast.post>>,
      { error: null }
    >['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.v2.bot.message.validate.broadcast.post>[0]
      options?: Parameters<typeof client.v2.bot.message.validate.broadcast.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostV2BotMessageValidateBroadcastKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<typeof client.v2.bot.message.validate.broadcast.post>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.v2.bot.message.validate.broadcast.post>[0]
        options?: Parameters<typeof client.v2.bot.message.validate.broadcast.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.v2.bot.message.validate.broadcast.post>[0]
            options?: Parameters<typeof client.v2.bot.message.validate.broadcast.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.v2.bot.message.validate.broadcast.post(
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

export function getGetV2BotMessageAggregationInfoKey() {
  return ['v2', '/v2/bot/message/aggregation/info'] as const
}

export function useGetV2BotMessageAggregationInfo<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.message.aggregation.info.get>>['error'],
    null
  >,
>(options?: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.message.aggregation.info.get>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.v2.bot.message.aggregation.info.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotMessageAggregationInfoKey()
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<typeof client.v2.bot.message.aggregation.info.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.message.aggregation.info.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetV2BotMessageAggregationInfo<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.message.aggregation.info.get>>['error'],
    null
  >,
>(options?: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.message.aggregation.info.get>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.v2.bot.message.aggregation.info.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotMessageAggregationInfoKey()
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<typeof client.v2.bot.message.aggregation.info.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.message.aggregation.info.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetV2BotMessageAggregationListKey(
  options?: Parameters<typeof client.v2.bot.message.aggregation.list.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['v2', '/v2/bot/message/aggregation/list', keyArgs] as const
}

export function useGetV2BotMessageAggregationList<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.message.aggregation.list.get>>['error'],
    null
  >,
>(options?: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.message.aggregation.list.get>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.v2.bot.message.aggregation.list.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotMessageAggregationListKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<typeof client.v2.bot.message.aggregation.list.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.message.aggregation.list.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetV2BotMessageAggregationList<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.message.aggregation.list.get>>['error'],
    null
  >,
>(options?: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.message.aggregation.list.get>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.v2.bot.message.aggregation.list.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotMessageAggregationListKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<typeof client.v2.bot.message.aggregation.list.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.message.aggregation.list.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetV2BotProfileUserIdKey(params: Parameters<typeof client.v2.bot.profile>[0]) {
  return ['v2', '/v2/bot/profile/{userId}', params] as const
}

export function useGetV2BotProfileUserId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.profile>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.v2.bot.profile>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.profile>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.v2.bot.profile>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotProfileUserIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.profile>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.profile(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetV2BotProfileUserId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.profile>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.v2.bot.profile>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.profile>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.v2.bot.profile>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotProfileUserIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.profile>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.profile(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetV2BotFollowersIdsKey(
  options?: Parameters<typeof client.v2.bot.followers.ids.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['v2', '/v2/bot/followers/ids', keyArgs] as const
}

export function useGetV2BotFollowersIds<
  TError = Exclude<Awaited<ReturnType<typeof client.v2.bot.followers.ids.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.v2.bot.followers.ids.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.v2.bot.followers.ids.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotFollowersIdsKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<Awaited<ReturnType<typeof client.v2.bot.followers.ids.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.followers.ids.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetV2BotFollowersIds<
  TError = Exclude<Awaited<ReturnType<typeof client.v2.bot.followers.ids.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.v2.bot.followers.ids.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.v2.bot.followers.ids.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotFollowersIdsKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<Awaited<ReturnType<typeof client.v2.bot.followers.ids.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.followers.ids.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetV2BotInfoKey() {
  return ['v2', '/v2/bot/info'] as const
}

export function useGetV2BotInfo<
  TError = Exclude<Awaited<ReturnType<typeof client.v2.bot.info.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.v2.bot.info.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.v2.bot.info.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey === undefined ? getGetV2BotInfoKey() : customKey) : null
  return {
    swrKey,
    ...useSWR<
      Extract<Awaited<ReturnType<typeof client.v2.bot.info.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.info.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetV2BotInfo<
  TError = Exclude<Awaited<ReturnType<typeof client.v2.bot.info.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.v2.bot.info.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.v2.bot.info.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey === undefined ? getGetV2BotInfoKey() : customKey) : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<Awaited<ReturnType<typeof client.v2.bot.info.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.info.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetV2BotGroupGroupIdMemberUserIdKey(
  params: Parameters<typeof client.v2.bot.group>[0],
  params2: Parameters<ReturnType<typeof client.v2.bot.group>['member']>[0],
) {
  return ['v2', '/v2/bot/group/{groupId}/member/{userId}', params, params2] as const
}

export function useGetV2BotGroupGroupIdMemberUserId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.v2.bot.group>['member']>['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.v2.bot.group>[0],
  params2: Parameters<ReturnType<typeof client.v2.bot.group>['member']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.v2.bot.group>['member']>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<ReturnType<typeof client.v2.bot.group>['member']>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotGroupGroupIdMemberUserIdKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.v2.bot.group>['member']>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.group(params).member(params2).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetV2BotGroupGroupIdMemberUserId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.v2.bot.group>['member']>['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.v2.bot.group>[0],
  params2: Parameters<ReturnType<typeof client.v2.bot.group>['member']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.v2.bot.group>['member']>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<ReturnType<typeof client.v2.bot.group>['member']>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotGroupGroupIdMemberUserIdKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.v2.bot.group>['member']>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.group(params).member(params2).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetV2BotRoomRoomIdMemberUserIdKey(
  params: Parameters<typeof client.v2.bot.room>[0],
  params2: Parameters<ReturnType<typeof client.v2.bot.room>['member']>[0],
) {
  return ['v2', '/v2/bot/room/{roomId}/member/{userId}', params, params2] as const
}

export function useGetV2BotRoomRoomIdMemberUserId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.v2.bot.room>['member']>['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.v2.bot.room>[0],
  params2: Parameters<ReturnType<typeof client.v2.bot.room>['member']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.v2.bot.room>['member']>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<ReturnType<typeof client.v2.bot.room>['member']>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotRoomRoomIdMemberUserIdKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.v2.bot.room>['member']>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.room(params).member(params2).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetV2BotRoomRoomIdMemberUserId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.v2.bot.room>['member']>['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.v2.bot.room>[0],
  params2: Parameters<ReturnType<typeof client.v2.bot.room>['member']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.v2.bot.room>['member']>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<ReturnType<typeof client.v2.bot.room>['member']>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotRoomRoomIdMemberUserIdKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.v2.bot.room>['member']>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.room(params).member(params2).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetV2BotGroupGroupIdMembersIdsKey(
  params: Parameters<typeof client.v2.bot.group>[0],
  options?: Parameters<ReturnType<typeof client.v2.bot.group>['members']['ids']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['v2', '/v2/bot/group/{groupId}/members/ids', params, keyArgs] as const
}

export function useGetV2BotGroupGroupIdMembersIds<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.group>['members']['ids']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.v2.bot.group>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.group>['members']['ids']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.v2.bot.group>['members']['ids']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotGroupGroupIdMembersIdsKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.group>['members']['ids']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.group(params).members.ids.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetV2BotGroupGroupIdMembersIds<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.group>['members']['ids']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.v2.bot.group>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.group>['members']['ids']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.v2.bot.group>['members']['ids']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotGroupGroupIdMembersIdsKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.group>['members']['ids']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.group(params).members.ids.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetV2BotRoomRoomIdMembersIdsKey(
  params: Parameters<typeof client.v2.bot.room>[0],
  options?: Parameters<ReturnType<typeof client.v2.bot.room>['members']['ids']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['v2', '/v2/bot/room/{roomId}/members/ids', params, keyArgs] as const
}

export function useGetV2BotRoomRoomIdMembersIds<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.room>['members']['ids']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.v2.bot.room>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.room>['members']['ids']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.v2.bot.room>['members']['ids']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotRoomRoomIdMembersIdsKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.room>['members']['ids']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.room(params).members.ids.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetV2BotRoomRoomIdMembersIds<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.room>['members']['ids']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.v2.bot.room>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.room>['members']['ids']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.v2.bot.room>['members']['ids']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotRoomRoomIdMembersIdsKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.room>['members']['ids']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.room(params).members.ids.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostV2BotGroupGroupIdLeaveKey() {
  return ['v2', '/v2/bot/group/{groupId}/leave', 'POST'] as const
}

export function usePostV2BotGroupGroupIdLeave<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.group>['leave']['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.v2.bot.group>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.group>['leave']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.v2.bot.group>['leave']['post']>[0]
        options?: Parameters<ReturnType<typeof client.v2.bot.group>['leave']['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostV2BotGroupGroupIdLeaveKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.group>['leave']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.v2.bot.group>['leave']['post']>[0]
        options?: Parameters<ReturnType<typeof client.v2.bot.group>['leave']['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<ReturnType<typeof client.v2.bot.group>['leave']['post']>[0]
            options?: Parameters<ReturnType<typeof client.v2.bot.group>['leave']['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client.v2.bot.group(params).leave.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostV2BotRoomRoomIdLeaveKey() {
  return ['v2', '/v2/bot/room/{roomId}/leave', 'POST'] as const
}

export function usePostV2BotRoomRoomIdLeave<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.room>['leave']['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.v2.bot.room>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.room>['leave']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.v2.bot.room>['leave']['post']>[0]
        options?: Parameters<ReturnType<typeof client.v2.bot.room>['leave']['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostV2BotRoomRoomIdLeaveKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.room>['leave']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.v2.bot.room>['leave']['post']>[0]
        options?: Parameters<ReturnType<typeof client.v2.bot.room>['leave']['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<ReturnType<typeof client.v2.bot.room>['leave']['post']>[0]
            options?: Parameters<ReturnType<typeof client.v2.bot.room>['leave']['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client.v2.bot.room(params).leave.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetV2BotGroupGroupIdSummaryKey(
  params: Parameters<typeof client.v2.bot.group>[0],
) {
  return ['v2', '/v2/bot/group/{groupId}/summary', params] as const
}

export function useGetV2BotGroupGroupIdSummary<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.group>['summary']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.v2.bot.group>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.group>['summary']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.v2.bot.group>['summary']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotGroupGroupIdSummaryKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.group>['summary']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.group(params).summary.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetV2BotGroupGroupIdSummary<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.group>['summary']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.v2.bot.group>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.group>['summary']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.v2.bot.group>['summary']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotGroupGroupIdSummaryKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.group>['summary']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.group(params).summary.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetV2BotGroupGroupIdMembersCountKey(
  params: Parameters<typeof client.v2.bot.group>[0],
) {
  return ['v2', '/v2/bot/group/{groupId}/members/count', params] as const
}

export function useGetV2BotGroupGroupIdMembersCount<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.group>['members']['count']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.v2.bot.group>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.group>['members']['count']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.v2.bot.group>['members']['count']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotGroupGroupIdMembersCountKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.group>['members']['count']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.group(params).members.count.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetV2BotGroupGroupIdMembersCount<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.group>['members']['count']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.v2.bot.group>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.group>['members']['count']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.v2.bot.group>['members']['count']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotGroupGroupIdMembersCountKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.group>['members']['count']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.group(params).members.count.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetV2BotRoomRoomIdMembersCountKey(
  params: Parameters<typeof client.v2.bot.room>[0],
) {
  return ['v2', '/v2/bot/room/{roomId}/members/count', params] as const
}

export function useGetV2BotRoomRoomIdMembersCount<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.room>['members']['count']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.v2.bot.room>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.room>['members']['count']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.v2.bot.room>['members']['count']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotRoomRoomIdMembersCountKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.room>['members']['count']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.room(params).members.count.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetV2BotRoomRoomIdMembersCount<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.room>['members']['count']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.v2.bot.room>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.room>['members']['count']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.v2.bot.room>['members']['count']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotRoomRoomIdMembersCountKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.room>['members']['count']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.room(params).members.count.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostV2BotRichmenuKey() {
  return ['v2', '/v2/bot/richmenu', 'POST'] as const
}

export function usePostV2BotRichmenu<
  TError = Exclude<Awaited<ReturnType<typeof client.v2.bot.richmenu.post>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.v2.bot.richmenu.post>>, { error: null }>['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.v2.bot.richmenu.post>[0]
      options?: Parameters<typeof client.v2.bot.richmenu.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostV2BotRichmenuKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<Awaited<ReturnType<typeof client.v2.bot.richmenu.post>>, { error: null }>['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.v2.bot.richmenu.post>[0]
        options?: Parameters<typeof client.v2.bot.richmenu.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.v2.bot.richmenu.post>[0]
            options?: Parameters<typeof client.v2.bot.richmenu.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.v2.bot.richmenu.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostV2BotRichmenuValidateKey() {
  return ['v2', '/v2/bot/richmenu/validate', 'POST'] as const
}

export function usePostV2BotRichmenuValidate<
  TError = Exclude<Awaited<ReturnType<typeof client.v2.bot.richmenu.validate.post>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.richmenu.validate.post>>,
      { error: null }
    >['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.v2.bot.richmenu.validate.post>[0]
      options?: Parameters<typeof client.v2.bot.richmenu.validate.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostV2BotRichmenuValidateKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<typeof client.v2.bot.richmenu.validate.post>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.v2.bot.richmenu.validate.post>[0]
        options?: Parameters<typeof client.v2.bot.richmenu.validate.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.v2.bot.richmenu.validate.post>[0]
            options?: Parameters<typeof client.v2.bot.richmenu.validate.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.v2.bot.richmenu.validate.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetV2BotRichmenuRichMenuIdContentKey(
  params: Parameters<typeof client.v2.bot.richmenu>[0],
) {
  return ['v2', '/v2/bot/richmenu/{richMenuId}/content', params] as const
}

export function useGetV2BotRichmenuRichMenuIdContent<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.richmenu>['content']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.v2.bot.richmenu>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.richmenu>['content']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.v2.bot.richmenu>['content']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotRichmenuRichMenuIdContentKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.richmenu>['content']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.richmenu(params).content.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetV2BotRichmenuRichMenuIdContent<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.richmenu>['content']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.v2.bot.richmenu>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.richmenu>['content']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.v2.bot.richmenu>['content']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotRichmenuRichMenuIdContentKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.richmenu>['content']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.richmenu(params).content.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostV2BotRichmenuRichMenuIdContentKey() {
  return ['v2', '/v2/bot/richmenu/{richMenuId}/content', 'POST'] as const
}

export function usePostV2BotRichmenuRichMenuIdContent<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.richmenu>['content']['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.v2.bot.richmenu>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.richmenu>['content']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.v2.bot.richmenu>['content']['post']>[0]
        options?: Parameters<ReturnType<typeof client.v2.bot.richmenu>['content']['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostV2BotRichmenuRichMenuIdContentKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.richmenu>['content']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.v2.bot.richmenu>['content']['post']>[0]
        options?: Parameters<ReturnType<typeof client.v2.bot.richmenu>['content']['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.v2.bot.richmenu>['content']['post']>[0]
            options?: Parameters<ReturnType<typeof client.v2.bot.richmenu>['content']['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client.v2.bot
          .richmenu(params)
          .content.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetV2BotRichmenuRichMenuIdKey(
  params: Parameters<typeof client.v2.bot.richmenu>[0],
) {
  return ['v2', '/v2/bot/richmenu/{richMenuId}', params] as const
}

export function useGetV2BotRichmenuRichMenuId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.richmenu>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.v2.bot.richmenu>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.richmenu>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.v2.bot.richmenu>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotRichmenuRichMenuIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.richmenu>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.richmenu(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetV2BotRichmenuRichMenuId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.richmenu>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.v2.bot.richmenu>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.richmenu>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.v2.bot.richmenu>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotRichmenuRichMenuIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.richmenu>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.richmenu(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getDeleteV2BotRichmenuRichMenuIdKey() {
  return ['v2', '/v2/bot/richmenu/{richMenuId}', 'DELETE'] as const
}

export function useDeleteV2BotRichmenuRichMenuId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.richmenu>['delete']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.v2.bot.richmenu>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.richmenu>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.v2.bot.richmenu>['delete']>[0]
        options?: Parameters<ReturnType<typeof client.v2.bot.richmenu>['delete']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteV2BotRichmenuRichMenuIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.richmenu>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.v2.bot.richmenu>['delete']>[0]
        options?: Parameters<ReturnType<typeof client.v2.bot.richmenu>['delete']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<ReturnType<typeof client.v2.bot.richmenu>['delete']>[0]
            options?: Parameters<ReturnType<typeof client.v2.bot.richmenu>['delete']>[1]
          }
        },
      ) => {
        const { data, error } = await client.v2.bot.richmenu(params).delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetV2BotRichmenuListKey() {
  return ['v2', '/v2/bot/richmenu/list'] as const
}

export function useGetV2BotRichmenuList<
  TError = Exclude<Awaited<ReturnType<typeof client.v2.bot.richmenu.list.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.v2.bot.richmenu.list.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.v2.bot.richmenu.list.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey === undefined ? getGetV2BotRichmenuListKey() : customKey) : null
  return {
    swrKey,
    ...useSWR<
      Extract<Awaited<ReturnType<typeof client.v2.bot.richmenu.list.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.richmenu.list.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetV2BotRichmenuList<
  TError = Exclude<Awaited<ReturnType<typeof client.v2.bot.richmenu.list.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.v2.bot.richmenu.list.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.v2.bot.richmenu.list.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey === undefined ? getGetV2BotRichmenuListKey() : customKey) : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<Awaited<ReturnType<typeof client.v2.bot.richmenu.list.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.richmenu.list.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostV2BotUserAllRichmenuRichMenuIdKey() {
  return ['v2', '/v2/bot/user/all/richmenu/{richMenuId}', 'POST'] as const
}

export function usePostV2BotUserAllRichmenuRichMenuId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.user.all.richmenu>['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.v2.bot.user.all.richmenu>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.user.all.richmenu>['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.v2.bot.user.all.richmenu>['post']>[0]
        options?: Parameters<ReturnType<typeof client.v2.bot.user.all.richmenu>['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostV2BotUserAllRichmenuRichMenuIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.user.all.richmenu>['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.v2.bot.user.all.richmenu>['post']>[0]
        options?: Parameters<ReturnType<typeof client.v2.bot.user.all.richmenu>['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<ReturnType<typeof client.v2.bot.user.all.richmenu>['post']>[0]
            options?: Parameters<ReturnType<typeof client.v2.bot.user.all.richmenu>['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client.v2.bot.user.all
          .richmenu(params)
          .post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetV2BotUserAllRichmenuKey() {
  return ['v2', '/v2/bot/user/all/richmenu'] as const
}

export function useGetV2BotUserAllRichmenu<
  TError = Exclude<Awaited<ReturnType<typeof client.v2.bot.user.all.richmenu.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.user.all.richmenu.get>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.v2.bot.user.all.richmenu.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotUserAllRichmenuKey()
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<typeof client.v2.bot.user.all.richmenu.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.user.all.richmenu.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetV2BotUserAllRichmenu<
  TError = Exclude<Awaited<ReturnType<typeof client.v2.bot.user.all.richmenu.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.user.all.richmenu.get>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.v2.bot.user.all.richmenu.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotUserAllRichmenuKey()
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<typeof client.v2.bot.user.all.richmenu.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.user.all.richmenu.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getDeleteV2BotUserAllRichmenuKey() {
  return ['v2', '/v2/bot/user/all/richmenu', 'DELETE'] as const
}

export function useDeleteV2BotUserAllRichmenu<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.user.all.richmenu.delete>>['error'],
    null
  >,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.user.all.richmenu.delete>>,
      { error: null }
    >['data'],
    TError,
    Key,
    {
      body?: Parameters<typeof client.v2.bot.user.all.richmenu.delete>[0]
      options?: Parameters<typeof client.v2.bot.user.all.richmenu.delete>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteV2BotUserAllRichmenuKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<typeof client.v2.bot.user.all.richmenu.delete>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<typeof client.v2.bot.user.all.richmenu.delete>[0]
        options?: Parameters<typeof client.v2.bot.user.all.richmenu.delete>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<typeof client.v2.bot.user.all.richmenu.delete>[0]
            options?: Parameters<typeof client.v2.bot.user.all.richmenu.delete>[1]
          }
        },
      ) => {
        const { data, error } = await client.v2.bot.user.all.richmenu.delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostV2BotRichmenuAliasKey() {
  return ['v2', '/v2/bot/richmenu/alias', 'POST'] as const
}

export function usePostV2BotRichmenuAlias<
  TError = Exclude<Awaited<ReturnType<typeof client.v2.bot.richmenu.alias.post>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.v2.bot.richmenu.alias.post>>, { error: null }>['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.v2.bot.richmenu.alias.post>[0]
      options?: Parameters<typeof client.v2.bot.richmenu.alias.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostV2BotRichmenuAliasKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<typeof client.v2.bot.richmenu.alias.post>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.v2.bot.richmenu.alias.post>[0]
        options?: Parameters<typeof client.v2.bot.richmenu.alias.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.v2.bot.richmenu.alias.post>[0]
            options?: Parameters<typeof client.v2.bot.richmenu.alias.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.v2.bot.richmenu.alias.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetV2BotRichmenuAliasRichMenuAliasIdKey(
  params: Parameters<typeof client.v2.bot.richmenu.alias>[0],
) {
  return ['v2', '/v2/bot/richmenu/alias/{richMenuAliasId}', params] as const
}

export function useGetV2BotRichmenuAliasRichMenuAliasId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.richmenu.alias>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.v2.bot.richmenu.alias>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.richmenu.alias>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.v2.bot.richmenu.alias>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotRichmenuAliasRichMenuAliasIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.richmenu.alias>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.richmenu.alias(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetV2BotRichmenuAliasRichMenuAliasId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.richmenu.alias>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.v2.bot.richmenu.alias>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.richmenu.alias>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.v2.bot.richmenu.alias>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotRichmenuAliasRichMenuAliasIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.richmenu.alias>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.richmenu.alias(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostV2BotRichmenuAliasRichMenuAliasIdKey() {
  return ['v2', '/v2/bot/richmenu/alias/{richMenuAliasId}', 'POST'] as const
}

export function usePostV2BotRichmenuAliasRichMenuAliasId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.richmenu.alias>['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.v2.bot.richmenu.alias>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.richmenu.alias>['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.v2.bot.richmenu.alias>['post']>[0]
        options?: Parameters<ReturnType<typeof client.v2.bot.richmenu.alias>['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostV2BotRichmenuAliasRichMenuAliasIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.richmenu.alias>['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.v2.bot.richmenu.alias>['post']>[0]
        options?: Parameters<ReturnType<typeof client.v2.bot.richmenu.alias>['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.v2.bot.richmenu.alias>['post']>[0]
            options?: Parameters<ReturnType<typeof client.v2.bot.richmenu.alias>['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client.v2.bot.richmenu
          .alias(params)
          .post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getDeleteV2BotRichmenuAliasRichMenuAliasIdKey() {
  return ['v2', '/v2/bot/richmenu/alias/{richMenuAliasId}', 'DELETE'] as const
}

export function useDeleteV2BotRichmenuAliasRichMenuAliasId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.richmenu.alias>['delete']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.v2.bot.richmenu.alias>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.richmenu.alias>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.v2.bot.richmenu.alias>['delete']>[0]
        options?: Parameters<ReturnType<typeof client.v2.bot.richmenu.alias>['delete']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteV2BotRichmenuAliasRichMenuAliasIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.richmenu.alias>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.v2.bot.richmenu.alias>['delete']>[0]
        options?: Parameters<ReturnType<typeof client.v2.bot.richmenu.alias>['delete']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<ReturnType<typeof client.v2.bot.richmenu.alias>['delete']>[0]
            options?: Parameters<ReturnType<typeof client.v2.bot.richmenu.alias>['delete']>[1]
          }
        },
      ) => {
        const { data, error } = await client.v2.bot.richmenu
          .alias(params)
          .delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetV2BotRichmenuAliasListKey() {
  return ['v2', '/v2/bot/richmenu/alias/list'] as const
}

export function useGetV2BotRichmenuAliasList<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.richmenu.alias.list.get>>['error'],
    null
  >,
>(options?: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.richmenu.alias.list.get>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.v2.bot.richmenu.alias.list.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotRichmenuAliasListKey()
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<typeof client.v2.bot.richmenu.alias.list.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.richmenu.alias.list.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetV2BotRichmenuAliasList<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.richmenu.alias.list.get>>['error'],
    null
  >,
>(options?: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.richmenu.alias.list.get>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.v2.bot.richmenu.alias.list.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotRichmenuAliasListKey()
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<typeof client.v2.bot.richmenu.alias.list.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.richmenu.alias.list.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetV2BotUserUserIdRichmenuKey(params: Parameters<typeof client.v2.bot.user>[0]) {
  return ['v2', '/v2/bot/user/{userId}/richmenu', params] as const
}

export function useGetV2BotUserUserIdRichmenu<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.user>['richmenu']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.v2.bot.user>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.user>['richmenu']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.v2.bot.user>['richmenu']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotUserUserIdRichmenuKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.user>['richmenu']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.user(params).richmenu.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetV2BotUserUserIdRichmenu<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.user>['richmenu']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.v2.bot.user>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.user>['richmenu']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.v2.bot.user>['richmenu']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotUserUserIdRichmenuKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.user>['richmenu']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.user(params).richmenu.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getDeleteV2BotUserUserIdRichmenuKey() {
  return ['v2', '/v2/bot/user/{userId}/richmenu', 'DELETE'] as const
}

export function useDeleteV2BotUserUserIdRichmenu<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.user>['richmenu']['delete']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.v2.bot.user>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.user>['richmenu']['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.v2.bot.user>['richmenu']['delete']>[0]
        options?: Parameters<ReturnType<typeof client.v2.bot.user>['richmenu']['delete']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteV2BotUserUserIdRichmenuKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.user>['richmenu']['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.v2.bot.user>['richmenu']['delete']>[0]
        options?: Parameters<ReturnType<typeof client.v2.bot.user>['richmenu']['delete']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<ReturnType<typeof client.v2.bot.user>['richmenu']['delete']>[0]
            options?: Parameters<ReturnType<typeof client.v2.bot.user>['richmenu']['delete']>[1]
          }
        },
      ) => {
        const { data, error } = await client.v2.bot
          .user(params)
          .richmenu.delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostV2BotUserUserIdRichmenuRichMenuIdKey() {
  return ['v2', '/v2/bot/user/{userId}/richmenu/{richMenuId}', 'POST'] as const
}

export function usePostV2BotUserUserIdRichmenuRichMenuId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.v2.bot.user>['richmenu']>['post']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.v2.bot.user>[0],
  params2: Parameters<ReturnType<typeof client.v2.bot.user>['richmenu']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.v2.bot.user>['richmenu']>['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<ReturnType<typeof client.v2.bot.user>['richmenu']>['post']>[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.v2.bot.user>['richmenu']>['post']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostV2BotUserUserIdRichmenuRichMenuIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.v2.bot.user>['richmenu']>['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<ReturnType<typeof client.v2.bot.user>['richmenu']>['post']>[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.v2.bot.user>['richmenu']>['post']
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
              ReturnType<ReturnType<typeof client.v2.bot.user>['richmenu']>['post']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.v2.bot.user>['richmenu']>['post']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client.v2.bot
          .user(params)
          .richmenu(params2)
          .post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostV2BotRichmenuBulkLinkKey() {
  return ['v2', '/v2/bot/richmenu/bulk/link', 'POST'] as const
}

export function usePostV2BotRichmenuBulkLink<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.richmenu.bulk.link.post>>['error'],
    null
  >,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.richmenu.bulk.link.post>>,
      { error: null }
    >['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.v2.bot.richmenu.bulk.link.post>[0]
      options?: Parameters<typeof client.v2.bot.richmenu.bulk.link.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostV2BotRichmenuBulkLinkKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<typeof client.v2.bot.richmenu.bulk.link.post>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.v2.bot.richmenu.bulk.link.post>[0]
        options?: Parameters<typeof client.v2.bot.richmenu.bulk.link.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.v2.bot.richmenu.bulk.link.post>[0]
            options?: Parameters<typeof client.v2.bot.richmenu.bulk.link.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.v2.bot.richmenu.bulk.link.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostV2BotRichmenuBulkUnlinkKey() {
  return ['v2', '/v2/bot/richmenu/bulk/unlink', 'POST'] as const
}

export function usePostV2BotRichmenuBulkUnlink<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.richmenu.bulk.unlink.post>>['error'],
    null
  >,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.richmenu.bulk.unlink.post>>,
      { error: null }
    >['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.v2.bot.richmenu.bulk.unlink.post>[0]
      options?: Parameters<typeof client.v2.bot.richmenu.bulk.unlink.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostV2BotRichmenuBulkUnlinkKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<typeof client.v2.bot.richmenu.bulk.unlink.post>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.v2.bot.richmenu.bulk.unlink.post>[0]
        options?: Parameters<typeof client.v2.bot.richmenu.bulk.unlink.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.v2.bot.richmenu.bulk.unlink.post>[0]
            options?: Parameters<typeof client.v2.bot.richmenu.bulk.unlink.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.v2.bot.richmenu.bulk.unlink.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostV2BotRichmenuBatchKey() {
  return ['v2', '/v2/bot/richmenu/batch', 'POST'] as const
}

export function usePostV2BotRichmenuBatch<
  TError = Exclude<Awaited<ReturnType<typeof client.v2.bot.richmenu.batch.post>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.v2.bot.richmenu.batch.post>>, { error: null }>['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.v2.bot.richmenu.batch.post>[0]
      options?: Parameters<typeof client.v2.bot.richmenu.batch.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostV2BotRichmenuBatchKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<typeof client.v2.bot.richmenu.batch.post>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.v2.bot.richmenu.batch.post>[0]
        options?: Parameters<typeof client.v2.bot.richmenu.batch.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.v2.bot.richmenu.batch.post>[0]
            options?: Parameters<typeof client.v2.bot.richmenu.batch.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.v2.bot.richmenu.batch.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostV2BotRichmenuValidateBatchKey() {
  return ['v2', '/v2/bot/richmenu/validate/batch', 'POST'] as const
}

export function usePostV2BotRichmenuValidateBatch<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.richmenu.validate.batch.post>>['error'],
    null
  >,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.richmenu.validate.batch.post>>,
      { error: null }
    >['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.v2.bot.richmenu.validate.batch.post>[0]
      options?: Parameters<typeof client.v2.bot.richmenu.validate.batch.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostV2BotRichmenuValidateBatchKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<typeof client.v2.bot.richmenu.validate.batch.post>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.v2.bot.richmenu.validate.batch.post>[0]
        options?: Parameters<typeof client.v2.bot.richmenu.validate.batch.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.v2.bot.richmenu.validate.batch.post>[0]
            options?: Parameters<typeof client.v2.bot.richmenu.validate.batch.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.v2.bot.richmenu.validate.batch.post(
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

export function getGetV2BotRichmenuProgressBatchKey(
  options: Parameters<typeof client.v2.bot.richmenu.progress.batch.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['v2', '/v2/bot/richmenu/progress/batch', keyArgs] as const
}

export function useGetV2BotRichmenuProgressBatch<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.richmenu.progress.batch.get>>['error'],
    null
  >,
>(options: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.richmenu.progress.batch.get>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options: Parameters<typeof client.v2.bot.richmenu.progress.batch.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotRichmenuProgressBatchKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<typeof client.v2.bot.richmenu.progress.batch.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.richmenu.progress.batch.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetV2BotRichmenuProgressBatch<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.richmenu.progress.batch.get>>['error'],
    null
  >,
>(options: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.richmenu.progress.batch.get>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options: Parameters<typeof client.v2.bot.richmenu.progress.batch.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotRichmenuProgressBatchKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<typeof client.v2.bot.richmenu.progress.batch.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.richmenu.progress.batch.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostV2BotUserUserIdLinkTokenKey() {
  return ['v2', '/v2/bot/user/{userId}/linkToken', 'POST'] as const
}

export function usePostV2BotUserUserIdLinkToken<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.user>['linkToken']['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.v2.bot.user>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.user>['linkToken']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.v2.bot.user>['linkToken']['post']>[0]
        options?: Parameters<ReturnType<typeof client.v2.bot.user>['linkToken']['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostV2BotUserUserIdLinkTokenKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.user>['linkToken']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.v2.bot.user>['linkToken']['post']>[0]
        options?: Parameters<ReturnType<typeof client.v2.bot.user>['linkToken']['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<ReturnType<typeof client.v2.bot.user>['linkToken']['post']>[0]
            options?: Parameters<ReturnType<typeof client.v2.bot.user>['linkToken']['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client.v2.bot
          .user(params)
          .linkToken.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostV2BotMessageMarkAsReadKey() {
  return ['v2', '/v2/bot/message/markAsRead', 'POST'] as const
}

export function usePostV2BotMessageMarkAsRead<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.message.markAsRead.post>>['error'],
    null
  >,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.message.markAsRead.post>>,
      { error: null }
    >['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.v2.bot.message.markAsRead.post>[0]
      options?: Parameters<typeof client.v2.bot.message.markAsRead.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostV2BotMessageMarkAsReadKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<typeof client.v2.bot.message.markAsRead.post>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.v2.bot.message.markAsRead.post>[0]
        options?: Parameters<typeof client.v2.bot.message.markAsRead.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.v2.bot.message.markAsRead.post>[0]
            options?: Parameters<typeof client.v2.bot.message.markAsRead.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.v2.bot.message.markAsRead.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostBotPnpPushKey() {
  return ['bot', '/bot/pnp/push', 'POST'] as const
}

export function usePostBotPnpPush<
  TError = Exclude<Awaited<ReturnType<typeof client.bot.pnp.push.post>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.bot.pnp.push.post>>, { error: null }>['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.bot.pnp.push.post>[0]
      options?: Parameters<typeof client.bot.pnp.push.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostBotPnpPushKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<Awaited<ReturnType<typeof client.bot.pnp.push.post>>, { error: null }>['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.bot.pnp.push.post>[0]
        options?: Parameters<typeof client.bot.pnp.push.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.bot.pnp.push.post>[0]
            options?: Parameters<typeof client.bot.pnp.push.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.bot.pnp.push.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostV2BotMessagePnpTemplatedPushKey() {
  return ['v2', '/v2/bot/message/pnp/templated/push', 'POST'] as const
}

export function usePostV2BotMessagePnpTemplatedPush<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.message.pnp.templated.push.post>>['error'],
    null
  >,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.message.pnp.templated.push.post>>,
      { error: null }
    >['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.v2.bot.message.pnp.templated.push.post>[0]
      options?: Parameters<typeof client.v2.bot.message.pnp.templated.push.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostV2BotMessagePnpTemplatedPushKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<typeof client.v2.bot.message.pnp.templated.push.post>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.v2.bot.message.pnp.templated.push.post>[0]
        options?: Parameters<typeof client.v2.bot.message.pnp.templated.push.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.v2.bot.message.pnp.templated.push.post>[0]
            options?: Parameters<typeof client.v2.bot.message.pnp.templated.push.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.v2.bot.message.pnp.templated.push.post(
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

export function getGetV2BotMessageDeliveryPnpKey(
  options: Parameters<typeof client.v2.bot.message.delivery.pnp.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['v2', '/v2/bot/message/delivery/pnp', keyArgs] as const
}

export function useGetV2BotMessageDeliveryPnp<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.message.delivery.pnp.get>>['error'],
    null
  >,
>(options: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.message.delivery.pnp.get>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options: Parameters<typeof client.v2.bot.message.delivery.pnp.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotMessageDeliveryPnpKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<typeof client.v2.bot.message.delivery.pnp.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.message.delivery.pnp.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetV2BotMessageDeliveryPnp<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.message.delivery.pnp.get>>['error'],
    null
  >,
>(options: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.message.delivery.pnp.get>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options: Parameters<typeof client.v2.bot.message.delivery.pnp.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotMessageDeliveryPnpKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<typeof client.v2.bot.message.delivery.pnp.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.message.delivery.pnp.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetV2BotMessageDeliveryPnpTemplatedKey(
  options: Parameters<typeof client.v2.bot.message.delivery.pnp.templated.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['v2', '/v2/bot/message/delivery/pnp/templated', keyArgs] as const
}

export function useGetV2BotMessageDeliveryPnpTemplated<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.message.delivery.pnp.templated.get>>['error'],
    null
  >,
>(options: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.message.delivery.pnp.templated.get>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options: Parameters<typeof client.v2.bot.message.delivery.pnp.templated.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotMessageDeliveryPnpTemplatedKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<typeof client.v2.bot.message.delivery.pnp.templated.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } =
          await client.v2.bot.message.delivery.pnp.templated.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetV2BotMessageDeliveryPnpTemplated<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.message.delivery.pnp.templated.get>>['error'],
    null
  >,
>(options: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.message.delivery.pnp.templated.get>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options: Parameters<typeof client.v2.bot.message.delivery.pnp.templated.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotMessageDeliveryPnpTemplatedKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<typeof client.v2.bot.message.delivery.pnp.templated.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } =
          await client.v2.bot.message.delivery.pnp.templated.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetV2BotMembershipSubscriptionUserIdKey(
  params: Parameters<typeof client.v2.bot.membership.subscription>[0],
) {
  return ['v2', '/v2/bot/membership/subscription/{userId}', params] as const
}

export function useGetV2BotMembershipSubscriptionUserId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.membership.subscription>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.v2.bot.membership.subscription>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.membership.subscription>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.v2.bot.membership.subscription>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotMembershipSubscriptionUserIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.membership.subscription>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.membership
          .subscription(params)
          .get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetV2BotMembershipSubscriptionUserId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.membership.subscription>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.v2.bot.membership.subscription>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.membership.subscription>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.v2.bot.membership.subscription>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotMembershipSubscriptionUserIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.membership.subscription>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.membership
          .subscription(params)
          .get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetV2BotMembershipListKey() {
  return ['v2', '/v2/bot/membership/list'] as const
}

export function useGetV2BotMembershipList<
  TError = Exclude<Awaited<ReturnType<typeof client.v2.bot.membership.list.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.v2.bot.membership.list.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.v2.bot.membership.list.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotMembershipListKey()
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<typeof client.v2.bot.membership.list.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.membership.list.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetV2BotMembershipList<
  TError = Exclude<Awaited<ReturnType<typeof client.v2.bot.membership.list.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.v2.bot.membership.list.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.v2.bot.membership.list.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotMembershipListKey()
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<typeof client.v2.bot.membership.list.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.membership.list.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetV2BotMembershipMembershipIdUsersIdsKey(
  params: Parameters<typeof client.v2.bot.membership>[0],
  options?: Parameters<ReturnType<typeof client.v2.bot.membership>['users']['ids']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['v2', '/v2/bot/membership/{membershipId}/users/ids', params, keyArgs] as const
}

export function useGetV2BotMembershipMembershipIdUsersIds<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.v2.bot.membership>['users']['ids']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.v2.bot.membership>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.membership>['users']['ids']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.v2.bot.membership>['users']['ids']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotMembershipMembershipIdUsersIdsKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.membership>['users']['ids']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.membership(params).users.ids.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetV2BotMembershipMembershipIdUsersIds<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.v2.bot.membership>['users']['ids']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.v2.bot.membership>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.membership>['users']['ids']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.v2.bot.membership>['users']['ids']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotMembershipMembershipIdUsersIdsKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.membership>['users']['ids']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.membership(params).users.ids.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetV2BotCouponKey(options?: Parameters<typeof client.v2.bot.coupon.get>[0]) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['v2', '/v2/bot/coupon', keyArgs] as const
}

export function useGetV2BotCoupon<
  TError = Exclude<Awaited<ReturnType<typeof client.v2.bot.coupon.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.v2.bot.coupon.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.v2.bot.coupon.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotCouponKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<Awaited<ReturnType<typeof client.v2.bot.coupon.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.coupon.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetV2BotCoupon<
  TError = Exclude<Awaited<ReturnType<typeof client.v2.bot.coupon.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.v2.bot.coupon.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.v2.bot.coupon.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotCouponKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<Awaited<ReturnType<typeof client.v2.bot.coupon.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.coupon.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostV2BotCouponKey() {
  return ['v2', '/v2/bot/coupon', 'POST'] as const
}

export function usePostV2BotCoupon<
  TError = Exclude<Awaited<ReturnType<typeof client.v2.bot.coupon.post>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.v2.bot.coupon.post>>, { error: null }>['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.v2.bot.coupon.post>[0]
      options?: Parameters<typeof client.v2.bot.coupon.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostV2BotCouponKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<Awaited<ReturnType<typeof client.v2.bot.coupon.post>>, { error: null }>['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.v2.bot.coupon.post>[0]
        options?: Parameters<typeof client.v2.bot.coupon.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.v2.bot.coupon.post>[0]
            options?: Parameters<typeof client.v2.bot.coupon.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.v2.bot.coupon.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetV2BotCouponCouponIdKey(params: Parameters<typeof client.v2.bot.coupon>[0]) {
  return ['v2', '/v2/bot/coupon/{couponId}', params] as const
}

export function useGetV2BotCouponCouponId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.coupon>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.v2.bot.coupon>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.coupon>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.v2.bot.coupon>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotCouponCouponIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.coupon>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.coupon(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetV2BotCouponCouponId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.coupon>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.v2.bot.coupon>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.coupon>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.v2.bot.coupon>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetV2BotCouponCouponIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.coupon>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.v2.bot.coupon(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPutV2BotCouponCouponIdCloseKey() {
  return ['v2', '/v2/bot/coupon/{couponId}/close', 'PUT'] as const
}

export function usePutV2BotCouponCouponIdClose<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.coupon>['close']['put']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.v2.bot.coupon>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.coupon>['close']['put']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.v2.bot.coupon>['close']['put']>[0]
        options?: Parameters<ReturnType<typeof client.v2.bot.coupon>['close']['put']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPutV2BotCouponCouponIdCloseKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.v2.bot.coupon>['close']['put']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.v2.bot.coupon>['close']['put']>[0]
        options?: Parameters<ReturnType<typeof client.v2.bot.coupon>['close']['put']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<ReturnType<typeof client.v2.bot.coupon>['close']['put']>[0]
            options?: Parameters<ReturnType<typeof client.v2.bot.coupon>['close']['put']>[1]
          }
        },
      ) => {
        const { data, error } = await client.v2.bot.coupon(params).close.put(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostV2BotChatLoadingStartKey() {
  return ['v2', '/v2/bot/chat/loading/start', 'POST'] as const
}

export function usePostV2BotChatLoadingStart<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.chat.loading.start.post>>['error'],
    null
  >,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.chat.loading.start.post>>,
      { error: null }
    >['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.v2.bot.chat.loading.start.post>[0]
      options?: Parameters<typeof client.v2.bot.chat.loading.start.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostV2BotChatLoadingStartKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<typeof client.v2.bot.chat.loading.start.post>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.v2.bot.chat.loading.start.post>[0]
        options?: Parameters<typeof client.v2.bot.chat.loading.start.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.v2.bot.chat.loading.start.post>[0]
            options?: Parameters<typeof client.v2.bot.chat.loading.start.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.v2.bot.chat.loading.start.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostV2BotChatMarkAsReadKey() {
  return ['v2', '/v2/bot/chat/markAsRead', 'POST'] as const
}

export function usePostV2BotChatMarkAsRead<
  TError = Exclude<Awaited<ReturnType<typeof client.v2.bot.chat.markAsRead.post>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.chat.markAsRead.post>>,
      { error: null }
    >['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.v2.bot.chat.markAsRead.post>[0]
      options?: Parameters<typeof client.v2.bot.chat.markAsRead.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostV2BotChatMarkAsReadKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<typeof client.v2.bot.chat.markAsRead.post>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.v2.bot.chat.markAsRead.post>[0]
        options?: Parameters<typeof client.v2.bot.chat.markAsRead.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.v2.bot.chat.markAsRead.post>[0]
            options?: Parameters<typeof client.v2.bot.chat.markAsRead.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.v2.bot.chat.markAsRead.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}
