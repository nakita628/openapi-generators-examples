import { createQuery, createMutation, queryOptions, mutationOptions } from '@tanstack/svelte-query'
import type { CreateQueryOptions, CreateMutationOptions, QueryClient } from '@tanstack/svelte-query'
import { client } from '../lib'

export function getBotKey() {
  return ['bot'] as const
}

export function getV2Key() {
  return ['v2'] as const
}

export function getV2BotChannelWebhookEndpointQueryKey() {
  return ['v2', '/v2/bot/channel/webhook/endpoint'] as const
}

export function getV2BotChannelWebhookEndpointQueryOptions<
  TData = Extract<
    Awaited<ReturnType<typeof client.v2.bot.channel.webhook.endpoint.get>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.channel.webhook.endpoint.get>>['error'],
    null
  >,
>(options?: Parameters<typeof client.v2.bot.channel.webhook.endpoint.get>[0]) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.channel.webhook.endpoint.get>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getV2BotChannelWebhookEndpointQueryKey>
  >({
    queryKey: getV2BotChannelWebhookEndpointQueryKey(),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.v2.bot.channel.webhook.endpoint.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  })
}

export function createV2BotChannelWebhookEndpoint<
  TData = Extract<
    Awaited<ReturnType<typeof client.v2.bot.channel.webhook.endpoint.get>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.channel.webhook.endpoint.get>>['error'],
    null
  >,
>(
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<typeof client.v2.bot.channel.webhook.endpoint.get>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getV2BotChannelWebhookEndpointQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.v2.bot.channel.webhook.endpoint.get>[0]
  },
  queryClient?: () => QueryClient,
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getV2BotChannelWebhookEndpointQueryOptions<TData, TError>(clientOptions), ...query }
  }, queryClient)
}

export function getPutV2BotChannelWebhookEndpointMutationKey() {
  return ['v2', '/v2/bot/channel/webhook/endpoint', 'PUT'] as const
}

export function getPutV2BotChannelWebhookEndpointMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.channel.webhook.endpoint.put>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.channel.webhook.endpoint.put>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<typeof client.v2.bot.channel.webhook.endpoint.put>[0]
      options?: Parameters<typeof client.v2.bot.channel.webhook.endpoint.put>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPutV2BotChannelWebhookEndpointMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.v2.bot.channel.webhook.endpoint.put(body, options)
      if (error) throw error
      return data
    },
  })
}

export function createPutV2BotChannelWebhookEndpoint<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.channel.webhook.endpoint.put>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<typeof client.v2.bot.channel.webhook.endpoint.put>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<typeof client.v2.bot.channel.webhook.endpoint.put>[0]
          options?: Parameters<typeof client.v2.bot.channel.webhook.endpoint.put>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: () => QueryClient,
) {
  return createMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPutV2BotChannelWebhookEndpointMutationOptions<
      TError,
      TOnMutateResult
    >()
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  }, queryClient)
}

export function getPostV2BotChannelWebhookTestMutationKey() {
  return ['v2', '/v2/bot/channel/webhook/test', 'POST'] as const
}

export function getPostV2BotChannelWebhookTestMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.channel.webhook.test.post>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.channel.webhook.test.post>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<typeof client.v2.bot.channel.webhook.test.post>[0]
      options?: Parameters<typeof client.v2.bot.channel.webhook.test.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostV2BotChannelWebhookTestMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.v2.bot.channel.webhook.test.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function createPostV2BotChannelWebhookTest<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.channel.webhook.test.post>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<typeof client.v2.bot.channel.webhook.test.post>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<typeof client.v2.bot.channel.webhook.test.post>[0]
          options?: Parameters<typeof client.v2.bot.channel.webhook.test.post>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: () => QueryClient,
) {
  return createMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPostV2BotChannelWebhookTestMutationOptions<
      TError,
      TOnMutateResult
    >()
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  }, queryClient)
}

export function getV2BotMessageMessageIdContentQueryKey(
  params: Parameters<typeof client.v2.bot.message>[0],
) {
  return ['v2', '/v2/bot/message/{messageId}/content', params] as const
}

export function getV2BotMessageMessageIdContentQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.message>['content']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.message>['content']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.v2.bot.message>[0],
  options?: Parameters<ReturnType<typeof client.v2.bot.message>['content']['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.v2.bot.message>['content']['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getV2BotMessageMessageIdContentQueryKey>
  >({
    queryKey: getV2BotMessageMessageIdContentQueryKey(params),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.v2.bot
        .message(params)
        .content.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function createV2BotMessageMessageIdContent<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.message>['content']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.message>['content']['get']>>['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.v2.bot.message>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.v2.bot.message>['content']['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getV2BotMessageMessageIdContentQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.v2.bot.message>['content']['get']>[0]
  },
  queryClient?: () => QueryClient,
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getV2BotMessageMessageIdContentQueryOptions<TData, TError>(params(), clientOptions),
      ...query,
    }
  }, queryClient)
}

export function getV2BotMessageMessageIdContentPreviewQueryKey(
  params: Parameters<typeof client.v2.bot.message>[0],
) {
  return ['v2', '/v2/bot/message/{messageId}/content/preview', params] as const
}

export function getV2BotMessageMessageIdContentPreviewQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.message>['content']['preview']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.v2.bot.message>['content']['preview']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.v2.bot.message>[0],
  options?: Parameters<ReturnType<typeof client.v2.bot.message>['content']['preview']['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.v2.bot.message>['content']['preview']['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getV2BotMessageMessageIdContentPreviewQueryKey>
  >({
    queryKey: getV2BotMessageMessageIdContentPreviewQueryKey(params),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.v2.bot
        .message(params)
        .content.preview.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function createV2BotMessageMessageIdContentPreview<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.message>['content']['preview']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.v2.bot.message>['content']['preview']['get']>
    >['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.v2.bot.message>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<
            ReturnType<ReturnType<typeof client.v2.bot.message>['content']['preview']['get']>
          >,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getV2BotMessageMessageIdContentPreviewQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.v2.bot.message>['content']['preview']['get']>[0]
  },
  queryClient?: () => QueryClient,
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getV2BotMessageMessageIdContentPreviewQueryOptions<TData, TError>(params(), clientOptions),
      ...query,
    }
  }, queryClient)
}

export function getV2BotMessageMessageIdContentTranscodingQueryKey(
  params: Parameters<typeof client.v2.bot.message>[0],
) {
  return ['v2', '/v2/bot/message/{messageId}/content/transcoding', params] as const
}

export function getV2BotMessageMessageIdContentTranscodingQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.message>['content']['transcoding']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.v2.bot.message>['content']['transcoding']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.v2.bot.message>[0],
  options?: Parameters<
    ReturnType<typeof client.v2.bot.message>['content']['transcoding']['get']
  >[0],
) {
  return queryOptions<
    Extract<
      Awaited<
        ReturnType<ReturnType<typeof client.v2.bot.message>['content']['transcoding']['get']>
      >,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getV2BotMessageMessageIdContentTranscodingQueryKey>
  >({
    queryKey: getV2BotMessageMessageIdContentTranscodingQueryKey(params),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.v2.bot
        .message(params)
        .content.transcoding.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function createV2BotMessageMessageIdContentTranscoding<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.message>['content']['transcoding']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.v2.bot.message>['content']['transcoding']['get']>
    >['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.v2.bot.message>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<
            ReturnType<ReturnType<typeof client.v2.bot.message>['content']['transcoding']['get']>
          >,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getV2BotMessageMessageIdContentTranscodingQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<
      ReturnType<typeof client.v2.bot.message>['content']['transcoding']['get']
    >[0]
  },
  queryClient?: () => QueryClient,
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getV2BotMessageMessageIdContentTranscodingQueryOptions<TData, TError>(
        params(),
        clientOptions,
      ),
      ...query,
    }
  }, queryClient)
}

export function getPostV2BotMessageReplyMutationKey() {
  return ['v2', '/v2/bot/message/reply', 'POST'] as const
}

export function getPostV2BotMessageReplyMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.v2.bot.message.reply.post>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.v2.bot.message.reply.post>>, { error: null }>['data'],
    TError,
    {
      body: Parameters<typeof client.v2.bot.message.reply.post>[0]
      options?: Parameters<typeof client.v2.bot.message.reply.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostV2BotMessageReplyMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.v2.bot.message.reply.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function createPostV2BotMessageReply<
  TError = Exclude<Awaited<ReturnType<typeof client.v2.bot.message.reply.post>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<typeof client.v2.bot.message.reply.post>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<typeof client.v2.bot.message.reply.post>[0]
          options?: Parameters<typeof client.v2.bot.message.reply.post>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: () => QueryClient,
) {
  return createMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPostV2BotMessageReplyMutationOptions<TError, TOnMutateResult>()
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  }, queryClient)
}

export function getPostV2BotMessagePushMutationKey() {
  return ['v2', '/v2/bot/message/push', 'POST'] as const
}

export function getPostV2BotMessagePushMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.v2.bot.message.push.post>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.v2.bot.message.push.post>>, { error: null }>['data'],
    TError,
    {
      body: Parameters<typeof client.v2.bot.message.push.post>[0]
      options?: Parameters<typeof client.v2.bot.message.push.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostV2BotMessagePushMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.v2.bot.message.push.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function createPostV2BotMessagePush<
  TError = Exclude<Awaited<ReturnType<typeof client.v2.bot.message.push.post>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<typeof client.v2.bot.message.push.post>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<typeof client.v2.bot.message.push.post>[0]
          options?: Parameters<typeof client.v2.bot.message.push.post>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: () => QueryClient,
) {
  return createMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPostV2BotMessagePushMutationOptions<TError, TOnMutateResult>()
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  }, queryClient)
}

export function getPostV2BotMessageMulticastMutationKey() {
  return ['v2', '/v2/bot/message/multicast', 'POST'] as const
}

export function getPostV2BotMessageMulticastMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.v2.bot.message.multicast.post>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.message.multicast.post>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<typeof client.v2.bot.message.multicast.post>[0]
      options?: Parameters<typeof client.v2.bot.message.multicast.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostV2BotMessageMulticastMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.v2.bot.message.multicast.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function createPostV2BotMessageMulticast<
  TError = Exclude<Awaited<ReturnType<typeof client.v2.bot.message.multicast.post>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<typeof client.v2.bot.message.multicast.post>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<typeof client.v2.bot.message.multicast.post>[0]
          options?: Parameters<typeof client.v2.bot.message.multicast.post>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: () => QueryClient,
) {
  return createMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPostV2BotMessageMulticastMutationOptions<TError, TOnMutateResult>()
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  }, queryClient)
}

export function getPostV2BotMessageNarrowcastMutationKey() {
  return ['v2', '/v2/bot/message/narrowcast', 'POST'] as const
}

export function getPostV2BotMessageNarrowcastMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.message.narrowcast.post>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.message.narrowcast.post>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<typeof client.v2.bot.message.narrowcast.post>[0]
      options?: Parameters<typeof client.v2.bot.message.narrowcast.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostV2BotMessageNarrowcastMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.v2.bot.message.narrowcast.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function createPostV2BotMessageNarrowcast<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.message.narrowcast.post>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<typeof client.v2.bot.message.narrowcast.post>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<typeof client.v2.bot.message.narrowcast.post>[0]
          options?: Parameters<typeof client.v2.bot.message.narrowcast.post>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: () => QueryClient,
) {
  return createMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPostV2BotMessageNarrowcastMutationOptions<TError, TOnMutateResult>()
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  }, queryClient)
}

export function getV2BotMessageProgressNarrowcastQueryKey(
  options: Parameters<typeof client.v2.bot.message.progress.narrowcast.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['v2', '/v2/bot/message/progress/narrowcast', keyArgs] as const
}

export function getV2BotMessageProgressNarrowcastQueryOptions<
  TData = Extract<
    Awaited<ReturnType<typeof client.v2.bot.message.progress.narrowcast.get>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.message.progress.narrowcast.get>>['error'],
    null
  >,
>(options: Parameters<typeof client.v2.bot.message.progress.narrowcast.get>[0]) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.message.progress.narrowcast.get>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getV2BotMessageProgressNarrowcastQueryKey>
  >({
    queryKey: getV2BotMessageProgressNarrowcastQueryKey(options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.v2.bot.message.progress.narrowcast.get({
        ...options,
        fetch: { ...options.fetch, signal },
      })
      if (error) throw error
      return data
    },
  })
}

export function createV2BotMessageProgressNarrowcast<
  TData = Extract<
    Awaited<ReturnType<typeof client.v2.bot.message.progress.narrowcast.get>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.message.progress.narrowcast.get>>['error'],
    null
  >,
>(
  options: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<typeof client.v2.bot.message.progress.narrowcast.get>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getV2BotMessageProgressNarrowcastQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.v2.bot.message.progress.narrowcast.get>[0]
  },
  queryClient?: () => QueryClient,
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options()
    return {
      ...getV2BotMessageProgressNarrowcastQueryOptions<TData, TError>(clientOptions),
      ...query,
    }
  }, queryClient)
}

export function getPostV2BotMessageBroadcastMutationKey() {
  return ['v2', '/v2/bot/message/broadcast', 'POST'] as const
}

export function getPostV2BotMessageBroadcastMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.v2.bot.message.broadcast.post>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.message.broadcast.post>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<typeof client.v2.bot.message.broadcast.post>[0]
      options?: Parameters<typeof client.v2.bot.message.broadcast.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostV2BotMessageBroadcastMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.v2.bot.message.broadcast.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function createPostV2BotMessageBroadcast<
  TError = Exclude<Awaited<ReturnType<typeof client.v2.bot.message.broadcast.post>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<typeof client.v2.bot.message.broadcast.post>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<typeof client.v2.bot.message.broadcast.post>[0]
          options?: Parameters<typeof client.v2.bot.message.broadcast.post>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: () => QueryClient,
) {
  return createMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPostV2BotMessageBroadcastMutationOptions<TError, TOnMutateResult>()
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  }, queryClient)
}

export function getV2BotMessageQuotaQueryKey() {
  return ['v2', '/v2/bot/message/quota'] as const
}

export function getV2BotMessageQuotaQueryOptions<
  TData = Extract<
    Awaited<ReturnType<typeof client.v2.bot.message.quota.get>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.v2.bot.message.quota.get>>['error'], null>,
>(options?: Parameters<typeof client.v2.bot.message.quota.get>[0]) {
  return queryOptions<
    Extract<Awaited<ReturnType<typeof client.v2.bot.message.quota.get>>, { error: null }>['data'],
    TError,
    TData,
    ReturnType<typeof getV2BotMessageQuotaQueryKey>
  >({
    queryKey: getV2BotMessageQuotaQueryKey(),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.v2.bot.message.quota.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  })
}

export function createV2BotMessageQuota<
  TData = Extract<
    Awaited<ReturnType<typeof client.v2.bot.message.quota.get>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.v2.bot.message.quota.get>>['error'], null>,
>(
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<typeof client.v2.bot.message.quota.get>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getV2BotMessageQuotaQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.v2.bot.message.quota.get>[0]
  },
  queryClient?: () => QueryClient,
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getV2BotMessageQuotaQueryOptions<TData, TError>(clientOptions), ...query }
  }, queryClient)
}

export function getV2BotMessageQuotaConsumptionQueryKey() {
  return ['v2', '/v2/bot/message/quota/consumption'] as const
}

export function getV2BotMessageQuotaConsumptionQueryOptions<
  TData = Extract<
    Awaited<ReturnType<typeof client.v2.bot.message.quota.consumption.get>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.message.quota.consumption.get>>['error'],
    null
  >,
>(options?: Parameters<typeof client.v2.bot.message.quota.consumption.get>[0]) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.message.quota.consumption.get>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getV2BotMessageQuotaConsumptionQueryKey>
  >({
    queryKey: getV2BotMessageQuotaConsumptionQueryKey(),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.v2.bot.message.quota.consumption.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  })
}

export function createV2BotMessageQuotaConsumption<
  TData = Extract<
    Awaited<ReturnType<typeof client.v2.bot.message.quota.consumption.get>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.message.quota.consumption.get>>['error'],
    null
  >,
>(
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<typeof client.v2.bot.message.quota.consumption.get>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getV2BotMessageQuotaConsumptionQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.v2.bot.message.quota.consumption.get>[0]
  },
  queryClient?: () => QueryClient,
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getV2BotMessageQuotaConsumptionQueryOptions<TData, TError>(clientOptions),
      ...query,
    }
  }, queryClient)
}

export function getV2BotMessageDeliveryReplyQueryKey(
  options: Parameters<typeof client.v2.bot.message.delivery.reply.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['v2', '/v2/bot/message/delivery/reply', keyArgs] as const
}

export function getV2BotMessageDeliveryReplyQueryOptions<
  TData = Extract<
    Awaited<ReturnType<typeof client.v2.bot.message.delivery.reply.get>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.message.delivery.reply.get>>['error'],
    null
  >,
>(options: Parameters<typeof client.v2.bot.message.delivery.reply.get>[0]) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.message.delivery.reply.get>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getV2BotMessageDeliveryReplyQueryKey>
  >({
    queryKey: getV2BotMessageDeliveryReplyQueryKey(options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.v2.bot.message.delivery.reply.get({
        ...options,
        fetch: { ...options.fetch, signal },
      })
      if (error) throw error
      return data
    },
  })
}

export function createV2BotMessageDeliveryReply<
  TData = Extract<
    Awaited<ReturnType<typeof client.v2.bot.message.delivery.reply.get>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.message.delivery.reply.get>>['error'],
    null
  >,
>(
  options: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<typeof client.v2.bot.message.delivery.reply.get>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getV2BotMessageDeliveryReplyQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.v2.bot.message.delivery.reply.get>[0]
  },
  queryClient?: () => QueryClient,
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getV2BotMessageDeliveryReplyQueryOptions<TData, TError>(clientOptions), ...query }
  }, queryClient)
}

export function getV2BotMessageDeliveryPushQueryKey(
  options: Parameters<typeof client.v2.bot.message.delivery.push.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['v2', '/v2/bot/message/delivery/push', keyArgs] as const
}

export function getV2BotMessageDeliveryPushQueryOptions<
  TData = Extract<
    Awaited<ReturnType<typeof client.v2.bot.message.delivery.push.get>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.message.delivery.push.get>>['error'],
    null
  >,
>(options: Parameters<typeof client.v2.bot.message.delivery.push.get>[0]) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.message.delivery.push.get>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getV2BotMessageDeliveryPushQueryKey>
  >({
    queryKey: getV2BotMessageDeliveryPushQueryKey(options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.v2.bot.message.delivery.push.get({
        ...options,
        fetch: { ...options.fetch, signal },
      })
      if (error) throw error
      return data
    },
  })
}

export function createV2BotMessageDeliveryPush<
  TData = Extract<
    Awaited<ReturnType<typeof client.v2.bot.message.delivery.push.get>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.message.delivery.push.get>>['error'],
    null
  >,
>(
  options: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<typeof client.v2.bot.message.delivery.push.get>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getV2BotMessageDeliveryPushQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.v2.bot.message.delivery.push.get>[0]
  },
  queryClient?: () => QueryClient,
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getV2BotMessageDeliveryPushQueryOptions<TData, TError>(clientOptions), ...query }
  }, queryClient)
}

export function getV2BotMessageDeliveryMulticastQueryKey(
  options: Parameters<typeof client.v2.bot.message.delivery.multicast.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['v2', '/v2/bot/message/delivery/multicast', keyArgs] as const
}

export function getV2BotMessageDeliveryMulticastQueryOptions<
  TData = Extract<
    Awaited<ReturnType<typeof client.v2.bot.message.delivery.multicast.get>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.message.delivery.multicast.get>>['error'],
    null
  >,
>(options: Parameters<typeof client.v2.bot.message.delivery.multicast.get>[0]) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.message.delivery.multicast.get>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getV2BotMessageDeliveryMulticastQueryKey>
  >({
    queryKey: getV2BotMessageDeliveryMulticastQueryKey(options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.v2.bot.message.delivery.multicast.get({
        ...options,
        fetch: { ...options.fetch, signal },
      })
      if (error) throw error
      return data
    },
  })
}

export function createV2BotMessageDeliveryMulticast<
  TData = Extract<
    Awaited<ReturnType<typeof client.v2.bot.message.delivery.multicast.get>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.message.delivery.multicast.get>>['error'],
    null
  >,
>(
  options: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<typeof client.v2.bot.message.delivery.multicast.get>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getV2BotMessageDeliveryMulticastQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.v2.bot.message.delivery.multicast.get>[0]
  },
  queryClient?: () => QueryClient,
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options()
    return {
      ...getV2BotMessageDeliveryMulticastQueryOptions<TData, TError>(clientOptions),
      ...query,
    }
  }, queryClient)
}

export function getV2BotMessageDeliveryBroadcastQueryKey(
  options: Parameters<typeof client.v2.bot.message.delivery.broadcast.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['v2', '/v2/bot/message/delivery/broadcast', keyArgs] as const
}

export function getV2BotMessageDeliveryBroadcastQueryOptions<
  TData = Extract<
    Awaited<ReturnType<typeof client.v2.bot.message.delivery.broadcast.get>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.message.delivery.broadcast.get>>['error'],
    null
  >,
>(options: Parameters<typeof client.v2.bot.message.delivery.broadcast.get>[0]) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.message.delivery.broadcast.get>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getV2BotMessageDeliveryBroadcastQueryKey>
  >({
    queryKey: getV2BotMessageDeliveryBroadcastQueryKey(options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.v2.bot.message.delivery.broadcast.get({
        ...options,
        fetch: { ...options.fetch, signal },
      })
      if (error) throw error
      return data
    },
  })
}

export function createV2BotMessageDeliveryBroadcast<
  TData = Extract<
    Awaited<ReturnType<typeof client.v2.bot.message.delivery.broadcast.get>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.message.delivery.broadcast.get>>['error'],
    null
  >,
>(
  options: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<typeof client.v2.bot.message.delivery.broadcast.get>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getV2BotMessageDeliveryBroadcastQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.v2.bot.message.delivery.broadcast.get>[0]
  },
  queryClient?: () => QueryClient,
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options()
    return {
      ...getV2BotMessageDeliveryBroadcastQueryOptions<TData, TError>(clientOptions),
      ...query,
    }
  }, queryClient)
}

export function getPostV2BotMessageValidateReplyMutationKey() {
  return ['v2', '/v2/bot/message/validate/reply', 'POST'] as const
}

export function getPostV2BotMessageValidateReplyMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.message.validate.reply.post>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.message.validate.reply.post>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<typeof client.v2.bot.message.validate.reply.post>[0]
      options?: Parameters<typeof client.v2.bot.message.validate.reply.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostV2BotMessageValidateReplyMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.v2.bot.message.validate.reply.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function createPostV2BotMessageValidateReply<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.message.validate.reply.post>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<typeof client.v2.bot.message.validate.reply.post>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<typeof client.v2.bot.message.validate.reply.post>[0]
          options?: Parameters<typeof client.v2.bot.message.validate.reply.post>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: () => QueryClient,
) {
  return createMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPostV2BotMessageValidateReplyMutationOptions<
      TError,
      TOnMutateResult
    >()
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  }, queryClient)
}

export function getPostV2BotMessageValidatePushMutationKey() {
  return ['v2', '/v2/bot/message/validate/push', 'POST'] as const
}

export function getPostV2BotMessageValidatePushMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.message.validate.push.post>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.message.validate.push.post>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<typeof client.v2.bot.message.validate.push.post>[0]
      options?: Parameters<typeof client.v2.bot.message.validate.push.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostV2BotMessageValidatePushMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.v2.bot.message.validate.push.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function createPostV2BotMessageValidatePush<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.message.validate.push.post>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<typeof client.v2.bot.message.validate.push.post>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<typeof client.v2.bot.message.validate.push.post>[0]
          options?: Parameters<typeof client.v2.bot.message.validate.push.post>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: () => QueryClient,
) {
  return createMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPostV2BotMessageValidatePushMutationOptions<
      TError,
      TOnMutateResult
    >()
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  }, queryClient)
}

export function getPostV2BotMessageValidateMulticastMutationKey() {
  return ['v2', '/v2/bot/message/validate/multicast', 'POST'] as const
}

export function getPostV2BotMessageValidateMulticastMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.message.validate.multicast.post>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.message.validate.multicast.post>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<typeof client.v2.bot.message.validate.multicast.post>[0]
      options?: Parameters<typeof client.v2.bot.message.validate.multicast.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostV2BotMessageValidateMulticastMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.v2.bot.message.validate.multicast.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function createPostV2BotMessageValidateMulticast<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.message.validate.multicast.post>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<typeof client.v2.bot.message.validate.multicast.post>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<typeof client.v2.bot.message.validate.multicast.post>[0]
          options?: Parameters<typeof client.v2.bot.message.validate.multicast.post>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: () => QueryClient,
) {
  return createMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPostV2BotMessageValidateMulticastMutationOptions<
      TError,
      TOnMutateResult
    >()
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  }, queryClient)
}

export function getPostV2BotMessageValidateNarrowcastMutationKey() {
  return ['v2', '/v2/bot/message/validate/narrowcast', 'POST'] as const
}

export function getPostV2BotMessageValidateNarrowcastMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.message.validate.narrowcast.post>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.message.validate.narrowcast.post>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<typeof client.v2.bot.message.validate.narrowcast.post>[0]
      options?: Parameters<typeof client.v2.bot.message.validate.narrowcast.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostV2BotMessageValidateNarrowcastMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.v2.bot.message.validate.narrowcast.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function createPostV2BotMessageValidateNarrowcast<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.message.validate.narrowcast.post>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<typeof client.v2.bot.message.validate.narrowcast.post>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<typeof client.v2.bot.message.validate.narrowcast.post>[0]
          options?: Parameters<typeof client.v2.bot.message.validate.narrowcast.post>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: () => QueryClient,
) {
  return createMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPostV2BotMessageValidateNarrowcastMutationOptions<
      TError,
      TOnMutateResult
    >()
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  }, queryClient)
}

export function getPostV2BotMessageValidateBroadcastMutationKey() {
  return ['v2', '/v2/bot/message/validate/broadcast', 'POST'] as const
}

export function getPostV2BotMessageValidateBroadcastMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.message.validate.broadcast.post>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.message.validate.broadcast.post>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<typeof client.v2.bot.message.validate.broadcast.post>[0]
      options?: Parameters<typeof client.v2.bot.message.validate.broadcast.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostV2BotMessageValidateBroadcastMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.v2.bot.message.validate.broadcast.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function createPostV2BotMessageValidateBroadcast<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.message.validate.broadcast.post>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<typeof client.v2.bot.message.validate.broadcast.post>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<typeof client.v2.bot.message.validate.broadcast.post>[0]
          options?: Parameters<typeof client.v2.bot.message.validate.broadcast.post>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: () => QueryClient,
) {
  return createMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPostV2BotMessageValidateBroadcastMutationOptions<
      TError,
      TOnMutateResult
    >()
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  }, queryClient)
}

export function getV2BotMessageAggregationInfoQueryKey() {
  return ['v2', '/v2/bot/message/aggregation/info'] as const
}

export function getV2BotMessageAggregationInfoQueryOptions<
  TData = Extract<
    Awaited<ReturnType<typeof client.v2.bot.message.aggregation.info.get>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.message.aggregation.info.get>>['error'],
    null
  >,
>(options?: Parameters<typeof client.v2.bot.message.aggregation.info.get>[0]) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.message.aggregation.info.get>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getV2BotMessageAggregationInfoQueryKey>
  >({
    queryKey: getV2BotMessageAggregationInfoQueryKey(),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.v2.bot.message.aggregation.info.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  })
}

export function createV2BotMessageAggregationInfo<
  TData = Extract<
    Awaited<ReturnType<typeof client.v2.bot.message.aggregation.info.get>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.message.aggregation.info.get>>['error'],
    null
  >,
>(
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<typeof client.v2.bot.message.aggregation.info.get>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getV2BotMessageAggregationInfoQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.v2.bot.message.aggregation.info.get>[0]
  },
  queryClient?: () => QueryClient,
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getV2BotMessageAggregationInfoQueryOptions<TData, TError>(clientOptions), ...query }
  }, queryClient)
}

export function getV2BotMessageAggregationListQueryKey(
  options?: Parameters<typeof client.v2.bot.message.aggregation.list.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['v2', '/v2/bot/message/aggregation/list', keyArgs] as const
}

export function getV2BotMessageAggregationListQueryOptions<
  TData = Extract<
    Awaited<ReturnType<typeof client.v2.bot.message.aggregation.list.get>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.message.aggregation.list.get>>['error'],
    null
  >,
>(options?: Parameters<typeof client.v2.bot.message.aggregation.list.get>[0]) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.message.aggregation.list.get>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getV2BotMessageAggregationListQueryKey>
  >({
    queryKey: getV2BotMessageAggregationListQueryKey(options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.v2.bot.message.aggregation.list.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  })
}

export function createV2BotMessageAggregationList<
  TData = Extract<
    Awaited<ReturnType<typeof client.v2.bot.message.aggregation.list.get>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.message.aggregation.list.get>>['error'],
    null
  >,
>(
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<typeof client.v2.bot.message.aggregation.list.get>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getV2BotMessageAggregationListQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.v2.bot.message.aggregation.list.get>[0]
  },
  queryClient?: () => QueryClient,
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getV2BotMessageAggregationListQueryOptions<TData, TError>(clientOptions), ...query }
  }, queryClient)
}

export function getV2BotProfileUserIdQueryKey(params: Parameters<typeof client.v2.bot.profile>[0]) {
  return ['v2', '/v2/bot/profile/{userId}', params] as const
}

export function getV2BotProfileUserIdQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.profile>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.profile>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.v2.bot.profile>[0],
  options?: Parameters<ReturnType<typeof client.v2.bot.profile>['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.v2.bot.profile>['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getV2BotProfileUserIdQueryKey>
  >({
    queryKey: getV2BotProfileUserIdQueryKey(params),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.v2.bot
        .profile(params)
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function createV2BotProfileUserId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.profile>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.profile>['get']>>['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.v2.bot.profile>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.v2.bot.profile>['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getV2BotProfileUserIdQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.v2.bot.profile>['get']>[0]
  },
  queryClient?: () => QueryClient,
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getV2BotProfileUserIdQueryOptions<TData, TError>(params(), clientOptions),
      ...query,
    }
  }, queryClient)
}

export function getV2BotFollowersIdsQueryKey(
  options?: Parameters<typeof client.v2.bot.followers.ids.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['v2', '/v2/bot/followers/ids', keyArgs] as const
}

export function getV2BotFollowersIdsQueryOptions<
  TData = Extract<
    Awaited<ReturnType<typeof client.v2.bot.followers.ids.get>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.v2.bot.followers.ids.get>>['error'], null>,
>(options?: Parameters<typeof client.v2.bot.followers.ids.get>[0]) {
  return queryOptions<
    Extract<Awaited<ReturnType<typeof client.v2.bot.followers.ids.get>>, { error: null }>['data'],
    TError,
    TData,
    ReturnType<typeof getV2BotFollowersIdsQueryKey>
  >({
    queryKey: getV2BotFollowersIdsQueryKey(options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.v2.bot.followers.ids.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  })
}

export function createV2BotFollowersIds<
  TData = Extract<
    Awaited<ReturnType<typeof client.v2.bot.followers.ids.get>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.v2.bot.followers.ids.get>>['error'], null>,
>(
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<typeof client.v2.bot.followers.ids.get>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getV2BotFollowersIdsQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.v2.bot.followers.ids.get>[0]
  },
  queryClient?: () => QueryClient,
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getV2BotFollowersIdsQueryOptions<TData, TError>(clientOptions), ...query }
  }, queryClient)
}

export function getV2BotInfoQueryKey() {
  return ['v2', '/v2/bot/info'] as const
}

export function getV2BotInfoQueryOptions<
  TData = Extract<Awaited<ReturnType<typeof client.v2.bot.info.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.v2.bot.info.get>>['error'], null>,
>(options?: Parameters<typeof client.v2.bot.info.get>[0]) {
  return queryOptions<
    Extract<Awaited<ReturnType<typeof client.v2.bot.info.get>>, { error: null }>['data'],
    TError,
    TData,
    ReturnType<typeof getV2BotInfoQueryKey>
  >({
    queryKey: getV2BotInfoQueryKey(),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.v2.bot.info.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  })
}

export function createV2BotInfo<
  TData = Extract<Awaited<ReturnType<typeof client.v2.bot.info.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.v2.bot.info.get>>['error'], null>,
>(
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<Awaited<ReturnType<typeof client.v2.bot.info.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getV2BotInfoQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.v2.bot.info.get>[0]
  },
  queryClient?: () => QueryClient,
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getV2BotInfoQueryOptions<TData, TError>(clientOptions), ...query }
  }, queryClient)
}

export function getV2BotGroupGroupIdMemberUserIdQueryKey(
  params: Parameters<typeof client.v2.bot.group>[0],
  params2: Parameters<ReturnType<typeof client.v2.bot.group>['member']>[0],
) {
  return ['v2', '/v2/bot/group/{groupId}/member/{userId}', params, params2] as const
}

export function getV2BotGroupGroupIdMemberUserIdQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.v2.bot.group>['member']>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.v2.bot.group>['member']>['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.v2.bot.group>[0],
  params2: Parameters<ReturnType<typeof client.v2.bot.group>['member']>[0],
  options?: Parameters<ReturnType<ReturnType<typeof client.v2.bot.group>['member']>['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.v2.bot.group>['member']>['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getV2BotGroupGroupIdMemberUserIdQueryKey>
  >({
    queryKey: getV2BotGroupGroupIdMemberUserIdQueryKey(params, params2),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.v2.bot
        .group(params)
        .member(params2)
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function createV2BotGroupGroupIdMemberUserId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.v2.bot.group>['member']>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.v2.bot.group>['member']>['get']>
    >['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.v2.bot.group>[0],
  params2: () => Parameters<ReturnType<typeof client.v2.bot.group>['member']>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<ReturnType<typeof client.v2.bot.group>['member']>['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getV2BotGroupGroupIdMemberUserIdQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<ReturnType<typeof client.v2.bot.group>['member']>['get']>[0]
  },
  queryClient?: () => QueryClient,
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getV2BotGroupGroupIdMemberUserIdQueryOptions<TData, TError>(
        params(),
        params2(),
        clientOptions,
      ),
      ...query,
    }
  }, queryClient)
}

export function getV2BotRoomRoomIdMemberUserIdQueryKey(
  params: Parameters<typeof client.v2.bot.room>[0],
  params2: Parameters<ReturnType<typeof client.v2.bot.room>['member']>[0],
) {
  return ['v2', '/v2/bot/room/{roomId}/member/{userId}', params, params2] as const
}

export function getV2BotRoomRoomIdMemberUserIdQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.v2.bot.room>['member']>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.v2.bot.room>['member']>['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.v2.bot.room>[0],
  params2: Parameters<ReturnType<typeof client.v2.bot.room>['member']>[0],
  options?: Parameters<ReturnType<ReturnType<typeof client.v2.bot.room>['member']>['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.v2.bot.room>['member']>['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getV2BotRoomRoomIdMemberUserIdQueryKey>
  >({
    queryKey: getV2BotRoomRoomIdMemberUserIdQueryKey(params, params2),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.v2.bot
        .room(params)
        .member(params2)
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function createV2BotRoomRoomIdMemberUserId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.v2.bot.room>['member']>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.v2.bot.room>['member']>['get']>
    >['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.v2.bot.room>[0],
  params2: () => Parameters<ReturnType<typeof client.v2.bot.room>['member']>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<ReturnType<typeof client.v2.bot.room>['member']>['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getV2BotRoomRoomIdMemberUserIdQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<ReturnType<typeof client.v2.bot.room>['member']>['get']>[0]
  },
  queryClient?: () => QueryClient,
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getV2BotRoomRoomIdMemberUserIdQueryOptions<TData, TError>(
        params(),
        params2(),
        clientOptions,
      ),
      ...query,
    }
  }, queryClient)
}

export function getV2BotGroupGroupIdMembersIdsQueryKey(
  params: Parameters<typeof client.v2.bot.group>[0],
  options?: Parameters<ReturnType<typeof client.v2.bot.group>['members']['ids']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['v2', '/v2/bot/group/{groupId}/members/ids', params, keyArgs] as const
}

export function getV2BotGroupGroupIdMembersIdsQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.group>['members']['ids']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.group>['members']['ids']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.v2.bot.group>[0],
  options?: Parameters<ReturnType<typeof client.v2.bot.group>['members']['ids']['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.v2.bot.group>['members']['ids']['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getV2BotGroupGroupIdMembersIdsQueryKey>
  >({
    queryKey: getV2BotGroupGroupIdMembersIdsQueryKey(params, options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.v2.bot
        .group(params)
        .members.ids.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function createV2BotGroupGroupIdMembersIds<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.group>['members']['ids']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.group>['members']['ids']['get']>>['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.v2.bot.group>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.v2.bot.group>['members']['ids']['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getV2BotGroupGroupIdMembersIdsQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.v2.bot.group>['members']['ids']['get']>[0]
  },
  queryClient?: () => QueryClient,
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getV2BotGroupGroupIdMembersIdsQueryOptions<TData, TError>(params(), clientOptions),
      ...query,
    }
  }, queryClient)
}

export function getV2BotRoomRoomIdMembersIdsQueryKey(
  params: Parameters<typeof client.v2.bot.room>[0],
  options?: Parameters<ReturnType<typeof client.v2.bot.room>['members']['ids']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['v2', '/v2/bot/room/{roomId}/members/ids', params, keyArgs] as const
}

export function getV2BotRoomRoomIdMembersIdsQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.room>['members']['ids']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.room>['members']['ids']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.v2.bot.room>[0],
  options?: Parameters<ReturnType<typeof client.v2.bot.room>['members']['ids']['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.v2.bot.room>['members']['ids']['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getV2BotRoomRoomIdMembersIdsQueryKey>
  >({
    queryKey: getV2BotRoomRoomIdMembersIdsQueryKey(params, options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.v2.bot
        .room(params)
        .members.ids.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function createV2BotRoomRoomIdMembersIds<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.room>['members']['ids']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.room>['members']['ids']['get']>>['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.v2.bot.room>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.v2.bot.room>['members']['ids']['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getV2BotRoomRoomIdMembersIdsQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.v2.bot.room>['members']['ids']['get']>[0]
  },
  queryClient?: () => QueryClient,
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getV2BotRoomRoomIdMembersIdsQueryOptions<TData, TError>(params(), clientOptions),
      ...query,
    }
  }, queryClient)
}

export function getPostV2BotGroupGroupIdLeaveMutationKey() {
  return ['v2', '/v2/bot/group/{groupId}/leave', 'POST'] as const
}

export function getPostV2BotGroupGroupIdLeaveMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.group>['leave']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: Parameters<typeof client.v2.bot.group>[0]) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.v2.bot.group>['leave']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<typeof client.v2.bot.group>['leave']['post']>[0]
      options?: Parameters<ReturnType<typeof client.v2.bot.group>['leave']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostV2BotGroupGroupIdLeaveMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.v2.bot.group(params).leave.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function createPostV2BotGroupGroupIdLeave<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.group>['leave']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.v2.bot.group>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.v2.bot.group>['leave']['post']>>,
          { error: null }
        >['data'],
        TError,
        {
          body?: Parameters<ReturnType<typeof client.v2.bot.group>['leave']['post']>[0]
          options?: Parameters<ReturnType<typeof client.v2.bot.group>['leave']['post']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: () => QueryClient,
) {
  return createMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPostV2BotGroupGroupIdLeaveMutationOptions<TError, TOnMutateResult>(
      params(),
    )
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  }, queryClient)
}

export function getPostV2BotRoomRoomIdLeaveMutationKey() {
  return ['v2', '/v2/bot/room/{roomId}/leave', 'POST'] as const
}

export function getPostV2BotRoomRoomIdLeaveMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.room>['leave']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: Parameters<typeof client.v2.bot.room>[0]) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.v2.bot.room>['leave']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<typeof client.v2.bot.room>['leave']['post']>[0]
      options?: Parameters<ReturnType<typeof client.v2.bot.room>['leave']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostV2BotRoomRoomIdLeaveMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.v2.bot.room(params).leave.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function createPostV2BotRoomRoomIdLeave<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.room>['leave']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.v2.bot.room>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.v2.bot.room>['leave']['post']>>,
          { error: null }
        >['data'],
        TError,
        {
          body?: Parameters<ReturnType<typeof client.v2.bot.room>['leave']['post']>[0]
          options?: Parameters<ReturnType<typeof client.v2.bot.room>['leave']['post']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: () => QueryClient,
) {
  return createMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPostV2BotRoomRoomIdLeaveMutationOptions<TError, TOnMutateResult>(
      params(),
    )
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  }, queryClient)
}

export function getV2BotGroupGroupIdSummaryQueryKey(
  params: Parameters<typeof client.v2.bot.group>[0],
) {
  return ['v2', '/v2/bot/group/{groupId}/summary', params] as const
}

export function getV2BotGroupGroupIdSummaryQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.group>['summary']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.group>['summary']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.v2.bot.group>[0],
  options?: Parameters<ReturnType<typeof client.v2.bot.group>['summary']['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.v2.bot.group>['summary']['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getV2BotGroupGroupIdSummaryQueryKey>
  >({
    queryKey: getV2BotGroupGroupIdSummaryQueryKey(params),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.v2.bot
        .group(params)
        .summary.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function createV2BotGroupGroupIdSummary<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.group>['summary']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.group>['summary']['get']>>['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.v2.bot.group>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.v2.bot.group>['summary']['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getV2BotGroupGroupIdSummaryQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.v2.bot.group>['summary']['get']>[0]
  },
  queryClient?: () => QueryClient,
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getV2BotGroupGroupIdSummaryQueryOptions<TData, TError>(params(), clientOptions),
      ...query,
    }
  }, queryClient)
}

export function getV2BotGroupGroupIdMembersCountQueryKey(
  params: Parameters<typeof client.v2.bot.group>[0],
) {
  return ['v2', '/v2/bot/group/{groupId}/members/count', params] as const
}

export function getV2BotGroupGroupIdMembersCountQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.group>['members']['count']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.group>['members']['count']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.v2.bot.group>[0],
  options?: Parameters<ReturnType<typeof client.v2.bot.group>['members']['count']['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.v2.bot.group>['members']['count']['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getV2BotGroupGroupIdMembersCountQueryKey>
  >({
    queryKey: getV2BotGroupGroupIdMembersCountQueryKey(params),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.v2.bot
        .group(params)
        .members.count.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function createV2BotGroupGroupIdMembersCount<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.group>['members']['count']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.group>['members']['count']['get']>>['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.v2.bot.group>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.v2.bot.group>['members']['count']['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getV2BotGroupGroupIdMembersCountQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.v2.bot.group>['members']['count']['get']>[0]
  },
  queryClient?: () => QueryClient,
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getV2BotGroupGroupIdMembersCountQueryOptions<TData, TError>(params(), clientOptions),
      ...query,
    }
  }, queryClient)
}

export function getV2BotRoomRoomIdMembersCountQueryKey(
  params: Parameters<typeof client.v2.bot.room>[0],
) {
  return ['v2', '/v2/bot/room/{roomId}/members/count', params] as const
}

export function getV2BotRoomRoomIdMembersCountQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.room>['members']['count']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.room>['members']['count']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.v2.bot.room>[0],
  options?: Parameters<ReturnType<typeof client.v2.bot.room>['members']['count']['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.v2.bot.room>['members']['count']['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getV2BotRoomRoomIdMembersCountQueryKey>
  >({
    queryKey: getV2BotRoomRoomIdMembersCountQueryKey(params),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.v2.bot
        .room(params)
        .members.count.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function createV2BotRoomRoomIdMembersCount<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.room>['members']['count']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.room>['members']['count']['get']>>['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.v2.bot.room>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.v2.bot.room>['members']['count']['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getV2BotRoomRoomIdMembersCountQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.v2.bot.room>['members']['count']['get']>[0]
  },
  queryClient?: () => QueryClient,
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getV2BotRoomRoomIdMembersCountQueryOptions<TData, TError>(params(), clientOptions),
      ...query,
    }
  }, queryClient)
}

export function getPostV2BotRichmenuMutationKey() {
  return ['v2', '/v2/bot/richmenu', 'POST'] as const
}

export function getPostV2BotRichmenuMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.v2.bot.richmenu.post>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.v2.bot.richmenu.post>>, { error: null }>['data'],
    TError,
    {
      body: Parameters<typeof client.v2.bot.richmenu.post>[0]
      options?: Parameters<typeof client.v2.bot.richmenu.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostV2BotRichmenuMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.v2.bot.richmenu.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function createPostV2BotRichmenu<
  TError = Exclude<Awaited<ReturnType<typeof client.v2.bot.richmenu.post>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<Awaited<ReturnType<typeof client.v2.bot.richmenu.post>>, { error: null }>['data'],
        TError,
        {
          body: Parameters<typeof client.v2.bot.richmenu.post>[0]
          options?: Parameters<typeof client.v2.bot.richmenu.post>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: () => QueryClient,
) {
  return createMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPostV2BotRichmenuMutationOptions<TError, TOnMutateResult>()
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  }, queryClient)
}

export function getPostV2BotRichmenuValidateMutationKey() {
  return ['v2', '/v2/bot/richmenu/validate', 'POST'] as const
}

export function getPostV2BotRichmenuValidateMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.v2.bot.richmenu.validate.post>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.richmenu.validate.post>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<typeof client.v2.bot.richmenu.validate.post>[0]
      options?: Parameters<typeof client.v2.bot.richmenu.validate.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostV2BotRichmenuValidateMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.v2.bot.richmenu.validate.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function createPostV2BotRichmenuValidate<
  TError = Exclude<Awaited<ReturnType<typeof client.v2.bot.richmenu.validate.post>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<typeof client.v2.bot.richmenu.validate.post>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<typeof client.v2.bot.richmenu.validate.post>[0]
          options?: Parameters<typeof client.v2.bot.richmenu.validate.post>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: () => QueryClient,
) {
  return createMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPostV2BotRichmenuValidateMutationOptions<TError, TOnMutateResult>()
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  }, queryClient)
}

export function getV2BotRichmenuRichMenuIdContentQueryKey(
  params: Parameters<typeof client.v2.bot.richmenu>[0],
) {
  return ['v2', '/v2/bot/richmenu/{richMenuId}/content', params] as const
}

export function getV2BotRichmenuRichMenuIdContentQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.richmenu>['content']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.richmenu>['content']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.v2.bot.richmenu>[0],
  options?: Parameters<ReturnType<typeof client.v2.bot.richmenu>['content']['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.v2.bot.richmenu>['content']['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getV2BotRichmenuRichMenuIdContentQueryKey>
  >({
    queryKey: getV2BotRichmenuRichMenuIdContentQueryKey(params),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.v2.bot
        .richmenu(params)
        .content.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function createV2BotRichmenuRichMenuIdContent<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.richmenu>['content']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.richmenu>['content']['get']>>['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.v2.bot.richmenu>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.v2.bot.richmenu>['content']['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getV2BotRichmenuRichMenuIdContentQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.v2.bot.richmenu>['content']['get']>[0]
  },
  queryClient?: () => QueryClient,
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getV2BotRichmenuRichMenuIdContentQueryOptions<TData, TError>(params(), clientOptions),
      ...query,
    }
  }, queryClient)
}

export function getPostV2BotRichmenuRichMenuIdContentMutationKey() {
  return ['v2', '/v2/bot/richmenu/{richMenuId}/content', 'POST'] as const
}

export function getPostV2BotRichmenuRichMenuIdContentMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.richmenu>['content']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: Parameters<typeof client.v2.bot.richmenu>[0]) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.v2.bot.richmenu>['content']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.v2.bot.richmenu>['content']['post']>[0]
      options?: Parameters<ReturnType<typeof client.v2.bot.richmenu>['content']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostV2BotRichmenuRichMenuIdContentMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.v2.bot.richmenu(params).content.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function createPostV2BotRichmenuRichMenuIdContent<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.richmenu>['content']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.v2.bot.richmenu>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.v2.bot.richmenu>['content']['post']>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<ReturnType<typeof client.v2.bot.richmenu>['content']['post']>[0]
          options?: Parameters<ReturnType<typeof client.v2.bot.richmenu>['content']['post']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: () => QueryClient,
) {
  return createMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPostV2BotRichmenuRichMenuIdContentMutationOptions<
      TError,
      TOnMutateResult
    >(params())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  }, queryClient)
}

export function getV2BotRichmenuRichMenuIdQueryKey(
  params: Parameters<typeof client.v2.bot.richmenu>[0],
) {
  return ['v2', '/v2/bot/richmenu/{richMenuId}', params] as const
}

export function getV2BotRichmenuRichMenuIdQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.richmenu>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.richmenu>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.v2.bot.richmenu>[0],
  options?: Parameters<ReturnType<typeof client.v2.bot.richmenu>['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.v2.bot.richmenu>['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getV2BotRichmenuRichMenuIdQueryKey>
  >({
    queryKey: getV2BotRichmenuRichMenuIdQueryKey(params),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.v2.bot
        .richmenu(params)
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function createV2BotRichmenuRichMenuId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.richmenu>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.richmenu>['get']>>['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.v2.bot.richmenu>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.v2.bot.richmenu>['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getV2BotRichmenuRichMenuIdQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.v2.bot.richmenu>['get']>[0]
  },
  queryClient?: () => QueryClient,
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getV2BotRichmenuRichMenuIdQueryOptions<TData, TError>(params(), clientOptions),
      ...query,
    }
  }, queryClient)
}

export function getDeleteV2BotRichmenuRichMenuIdMutationKey() {
  return ['v2', '/v2/bot/richmenu/{richMenuId}', 'DELETE'] as const
}

export function getDeleteV2BotRichmenuRichMenuIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.richmenu>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: Parameters<typeof client.v2.bot.richmenu>[0]) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.v2.bot.richmenu>['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<typeof client.v2.bot.richmenu>['delete']>[0]
      options?: Parameters<ReturnType<typeof client.v2.bot.richmenu>['delete']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteV2BotRichmenuRichMenuIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.v2.bot.richmenu(params).delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function createDeleteV2BotRichmenuRichMenuId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.richmenu>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.v2.bot.richmenu>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.v2.bot.richmenu>['delete']>>,
          { error: null }
        >['data'],
        TError,
        {
          body?: Parameters<ReturnType<typeof client.v2.bot.richmenu>['delete']>[0]
          options?: Parameters<ReturnType<typeof client.v2.bot.richmenu>['delete']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: () => QueryClient,
) {
  return createMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getDeleteV2BotRichmenuRichMenuIdMutationOptions<
      TError,
      TOnMutateResult
    >(params())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  }, queryClient)
}

export function getV2BotRichmenuListQueryKey() {
  return ['v2', '/v2/bot/richmenu/list'] as const
}

export function getV2BotRichmenuListQueryOptions<
  TData = Extract<
    Awaited<ReturnType<typeof client.v2.bot.richmenu.list.get>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.v2.bot.richmenu.list.get>>['error'], null>,
>(options?: Parameters<typeof client.v2.bot.richmenu.list.get>[0]) {
  return queryOptions<
    Extract<Awaited<ReturnType<typeof client.v2.bot.richmenu.list.get>>, { error: null }>['data'],
    TError,
    TData,
    ReturnType<typeof getV2BotRichmenuListQueryKey>
  >({
    queryKey: getV2BotRichmenuListQueryKey(),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.v2.bot.richmenu.list.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  })
}

export function createV2BotRichmenuList<
  TData = Extract<
    Awaited<ReturnType<typeof client.v2.bot.richmenu.list.get>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.v2.bot.richmenu.list.get>>['error'], null>,
>(
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<typeof client.v2.bot.richmenu.list.get>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getV2BotRichmenuListQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.v2.bot.richmenu.list.get>[0]
  },
  queryClient?: () => QueryClient,
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getV2BotRichmenuListQueryOptions<TData, TError>(clientOptions), ...query }
  }, queryClient)
}

export function getPostV2BotUserAllRichmenuRichMenuIdMutationKey() {
  return ['v2', '/v2/bot/user/all/richmenu/{richMenuId}', 'POST'] as const
}

export function getPostV2BotUserAllRichmenuRichMenuIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.user.all.richmenu>['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: Parameters<typeof client.v2.bot.user.all.richmenu>[0]) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.v2.bot.user.all.richmenu>['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<typeof client.v2.bot.user.all.richmenu>['post']>[0]
      options?: Parameters<ReturnType<typeof client.v2.bot.user.all.richmenu>['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostV2BotUserAllRichmenuRichMenuIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.v2.bot.user.all.richmenu(params).post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function createPostV2BotUserAllRichmenuRichMenuId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.user.all.richmenu>['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.v2.bot.user.all.richmenu>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.v2.bot.user.all.richmenu>['post']>>,
          { error: null }
        >['data'],
        TError,
        {
          body?: Parameters<ReturnType<typeof client.v2.bot.user.all.richmenu>['post']>[0]
          options?: Parameters<ReturnType<typeof client.v2.bot.user.all.richmenu>['post']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: () => QueryClient,
) {
  return createMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPostV2BotUserAllRichmenuRichMenuIdMutationOptions<
      TError,
      TOnMutateResult
    >(params())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  }, queryClient)
}

export function getV2BotUserAllRichmenuQueryKey() {
  return ['v2', '/v2/bot/user/all/richmenu'] as const
}

export function getV2BotUserAllRichmenuQueryOptions<
  TData = Extract<
    Awaited<ReturnType<typeof client.v2.bot.user.all.richmenu.get>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.v2.bot.user.all.richmenu.get>>['error'], null>,
>(options?: Parameters<typeof client.v2.bot.user.all.richmenu.get>[0]) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.user.all.richmenu.get>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getV2BotUserAllRichmenuQueryKey>
  >({
    queryKey: getV2BotUserAllRichmenuQueryKey(),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.v2.bot.user.all.richmenu.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  })
}

export function createV2BotUserAllRichmenu<
  TData = Extract<
    Awaited<ReturnType<typeof client.v2.bot.user.all.richmenu.get>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.v2.bot.user.all.richmenu.get>>['error'], null>,
>(
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<typeof client.v2.bot.user.all.richmenu.get>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getV2BotUserAllRichmenuQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.v2.bot.user.all.richmenu.get>[0]
  },
  queryClient?: () => QueryClient,
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getV2BotUserAllRichmenuQueryOptions<TData, TError>(clientOptions), ...query }
  }, queryClient)
}

export function getDeleteV2BotUserAllRichmenuMutationKey() {
  return ['v2', '/v2/bot/user/all/richmenu', 'DELETE'] as const
}

export function getDeleteV2BotUserAllRichmenuMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.user.all.richmenu.delete>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.user.all.richmenu.delete>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<typeof client.v2.bot.user.all.richmenu.delete>[0]
      options?: Parameters<typeof client.v2.bot.user.all.richmenu.delete>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteV2BotUserAllRichmenuMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.v2.bot.user.all.richmenu.delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function createDeleteV2BotUserAllRichmenu<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.user.all.richmenu.delete>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<typeof client.v2.bot.user.all.richmenu.delete>>,
          { error: null }
        >['data'],
        TError,
        {
          body?: Parameters<typeof client.v2.bot.user.all.richmenu.delete>[0]
          options?: Parameters<typeof client.v2.bot.user.all.richmenu.delete>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: () => QueryClient,
) {
  return createMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getDeleteV2BotUserAllRichmenuMutationOptions<TError, TOnMutateResult>()
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  }, queryClient)
}

export function getPostV2BotRichmenuAliasMutationKey() {
  return ['v2', '/v2/bot/richmenu/alias', 'POST'] as const
}

export function getPostV2BotRichmenuAliasMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.v2.bot.richmenu.alias.post>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.v2.bot.richmenu.alias.post>>, { error: null }>['data'],
    TError,
    {
      body: Parameters<typeof client.v2.bot.richmenu.alias.post>[0]
      options?: Parameters<typeof client.v2.bot.richmenu.alias.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostV2BotRichmenuAliasMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.v2.bot.richmenu.alias.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function createPostV2BotRichmenuAlias<
  TError = Exclude<Awaited<ReturnType<typeof client.v2.bot.richmenu.alias.post>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<typeof client.v2.bot.richmenu.alias.post>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<typeof client.v2.bot.richmenu.alias.post>[0]
          options?: Parameters<typeof client.v2.bot.richmenu.alias.post>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: () => QueryClient,
) {
  return createMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPostV2BotRichmenuAliasMutationOptions<TError, TOnMutateResult>()
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  }, queryClient)
}

export function getV2BotRichmenuAliasRichMenuAliasIdQueryKey(
  params: Parameters<typeof client.v2.bot.richmenu.alias>[0],
) {
  return ['v2', '/v2/bot/richmenu/alias/{richMenuAliasId}', params] as const
}

export function getV2BotRichmenuAliasRichMenuAliasIdQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.richmenu.alias>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.richmenu.alias>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.v2.bot.richmenu.alias>[0],
  options?: Parameters<ReturnType<typeof client.v2.bot.richmenu.alias>['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.v2.bot.richmenu.alias>['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getV2BotRichmenuAliasRichMenuAliasIdQueryKey>
  >({
    queryKey: getV2BotRichmenuAliasRichMenuAliasIdQueryKey(params),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.v2.bot.richmenu
        .alias(params)
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function createV2BotRichmenuAliasRichMenuAliasId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.richmenu.alias>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.richmenu.alias>['get']>>['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.v2.bot.richmenu.alias>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.v2.bot.richmenu.alias>['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getV2BotRichmenuAliasRichMenuAliasIdQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.v2.bot.richmenu.alias>['get']>[0]
  },
  queryClient?: () => QueryClient,
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getV2BotRichmenuAliasRichMenuAliasIdQueryOptions<TData, TError>(params(), clientOptions),
      ...query,
    }
  }, queryClient)
}

export function getPostV2BotRichmenuAliasRichMenuAliasIdMutationKey() {
  return ['v2', '/v2/bot/richmenu/alias/{richMenuAliasId}', 'POST'] as const
}

export function getPostV2BotRichmenuAliasRichMenuAliasIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.richmenu.alias>['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: Parameters<typeof client.v2.bot.richmenu.alias>[0]) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.v2.bot.richmenu.alias>['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.v2.bot.richmenu.alias>['post']>[0]
      options?: Parameters<ReturnType<typeof client.v2.bot.richmenu.alias>['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostV2BotRichmenuAliasRichMenuAliasIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.v2.bot.richmenu.alias(params).post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function createPostV2BotRichmenuAliasRichMenuAliasId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.richmenu.alias>['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.v2.bot.richmenu.alias>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.v2.bot.richmenu.alias>['post']>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<ReturnType<typeof client.v2.bot.richmenu.alias>['post']>[0]
          options?: Parameters<ReturnType<typeof client.v2.bot.richmenu.alias>['post']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: () => QueryClient,
) {
  return createMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPostV2BotRichmenuAliasRichMenuAliasIdMutationOptions<
      TError,
      TOnMutateResult
    >(params())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  }, queryClient)
}

export function getDeleteV2BotRichmenuAliasRichMenuAliasIdMutationKey() {
  return ['v2', '/v2/bot/richmenu/alias/{richMenuAliasId}', 'DELETE'] as const
}

export function getDeleteV2BotRichmenuAliasRichMenuAliasIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.richmenu.alias>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: Parameters<typeof client.v2.bot.richmenu.alias>[0]) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.v2.bot.richmenu.alias>['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<typeof client.v2.bot.richmenu.alias>['delete']>[0]
      options?: Parameters<ReturnType<typeof client.v2.bot.richmenu.alias>['delete']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteV2BotRichmenuAliasRichMenuAliasIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.v2.bot.richmenu.alias(params).delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function createDeleteV2BotRichmenuAliasRichMenuAliasId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.richmenu.alias>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.v2.bot.richmenu.alias>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.v2.bot.richmenu.alias>['delete']>>,
          { error: null }
        >['data'],
        TError,
        {
          body?: Parameters<ReturnType<typeof client.v2.bot.richmenu.alias>['delete']>[0]
          options?: Parameters<ReturnType<typeof client.v2.bot.richmenu.alias>['delete']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: () => QueryClient,
) {
  return createMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getDeleteV2BotRichmenuAliasRichMenuAliasIdMutationOptions<
      TError,
      TOnMutateResult
    >(params())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  }, queryClient)
}

export function getV2BotRichmenuAliasListQueryKey() {
  return ['v2', '/v2/bot/richmenu/alias/list'] as const
}

export function getV2BotRichmenuAliasListQueryOptions<
  TData = Extract<
    Awaited<ReturnType<typeof client.v2.bot.richmenu.alias.list.get>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.richmenu.alias.list.get>>['error'],
    null
  >,
>(options?: Parameters<typeof client.v2.bot.richmenu.alias.list.get>[0]) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.richmenu.alias.list.get>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getV2BotRichmenuAliasListQueryKey>
  >({
    queryKey: getV2BotRichmenuAliasListQueryKey(),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.v2.bot.richmenu.alias.list.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  })
}

export function createV2BotRichmenuAliasList<
  TData = Extract<
    Awaited<ReturnType<typeof client.v2.bot.richmenu.alias.list.get>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.richmenu.alias.list.get>>['error'],
    null
  >,
>(
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<typeof client.v2.bot.richmenu.alias.list.get>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getV2BotRichmenuAliasListQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.v2.bot.richmenu.alias.list.get>[0]
  },
  queryClient?: () => QueryClient,
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getV2BotRichmenuAliasListQueryOptions<TData, TError>(clientOptions), ...query }
  }, queryClient)
}

export function getV2BotUserUserIdRichmenuQueryKey(
  params: Parameters<typeof client.v2.bot.user>[0],
) {
  return ['v2', '/v2/bot/user/{userId}/richmenu', params] as const
}

export function getV2BotUserUserIdRichmenuQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.user>['richmenu']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.user>['richmenu']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.v2.bot.user>[0],
  options?: Parameters<ReturnType<typeof client.v2.bot.user>['richmenu']['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.v2.bot.user>['richmenu']['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getV2BotUserUserIdRichmenuQueryKey>
  >({
    queryKey: getV2BotUserUserIdRichmenuQueryKey(params),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.v2.bot
        .user(params)
        .richmenu.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function createV2BotUserUserIdRichmenu<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.user>['richmenu']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.user>['richmenu']['get']>>['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.v2.bot.user>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.v2.bot.user>['richmenu']['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getV2BotUserUserIdRichmenuQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.v2.bot.user>['richmenu']['get']>[0]
  },
  queryClient?: () => QueryClient,
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getV2BotUserUserIdRichmenuQueryOptions<TData, TError>(params(), clientOptions),
      ...query,
    }
  }, queryClient)
}

export function getDeleteV2BotUserUserIdRichmenuMutationKey() {
  return ['v2', '/v2/bot/user/{userId}/richmenu', 'DELETE'] as const
}

export function getDeleteV2BotUserUserIdRichmenuMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.user>['richmenu']['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: Parameters<typeof client.v2.bot.user>[0]) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.v2.bot.user>['richmenu']['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<typeof client.v2.bot.user>['richmenu']['delete']>[0]
      options?: Parameters<ReturnType<typeof client.v2.bot.user>['richmenu']['delete']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteV2BotUserUserIdRichmenuMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.v2.bot.user(params).richmenu.delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function createDeleteV2BotUserUserIdRichmenu<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.user>['richmenu']['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.v2.bot.user>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.v2.bot.user>['richmenu']['delete']>>,
          { error: null }
        >['data'],
        TError,
        {
          body?: Parameters<ReturnType<typeof client.v2.bot.user>['richmenu']['delete']>[0]
          options?: Parameters<ReturnType<typeof client.v2.bot.user>['richmenu']['delete']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: () => QueryClient,
) {
  return createMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getDeleteV2BotUserUserIdRichmenuMutationOptions<
      TError,
      TOnMutateResult
    >(params())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  }, queryClient)
}

export function getPostV2BotUserUserIdRichmenuRichMenuIdMutationKey() {
  return ['v2', '/v2/bot/user/{userId}/richmenu/{richMenuId}', 'POST'] as const
}

export function getPostV2BotUserUserIdRichmenuRichMenuIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.v2.bot.user>['richmenu']>['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: Parameters<typeof client.v2.bot.user>[0],
  params2: Parameters<ReturnType<typeof client.v2.bot.user>['richmenu']>[0],
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.v2.bot.user>['richmenu']>['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<ReturnType<typeof client.v2.bot.user>['richmenu']>['post']>[0]
      options?: Parameters<ReturnType<ReturnType<typeof client.v2.bot.user>['richmenu']>['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostV2BotUserUserIdRichmenuRichMenuIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.v2.bot.user(params).richmenu(params2).post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function createPostV2BotUserUserIdRichmenuRichMenuId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.v2.bot.user>['richmenu']>['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.v2.bot.user>[0],
  params2: () => Parameters<ReturnType<typeof client.v2.bot.user>['richmenu']>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<
            ReturnType<ReturnType<ReturnType<typeof client.v2.bot.user>['richmenu']>['post']>
          >,
          { error: null }
        >['data'],
        TError,
        {
          body?: Parameters<
            ReturnType<ReturnType<typeof client.v2.bot.user>['richmenu']>['post']
          >[0]
          options?: Parameters<
            ReturnType<ReturnType<typeof client.v2.bot.user>['richmenu']>['post']
          >[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: () => QueryClient,
) {
  return createMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPostV2BotUserUserIdRichmenuRichMenuIdMutationOptions<
      TError,
      TOnMutateResult
    >(params(), params2())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  }, queryClient)
}

export function getPostV2BotRichmenuBulkLinkMutationKey() {
  return ['v2', '/v2/bot/richmenu/bulk/link', 'POST'] as const
}

export function getPostV2BotRichmenuBulkLinkMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.richmenu.bulk.link.post>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.richmenu.bulk.link.post>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<typeof client.v2.bot.richmenu.bulk.link.post>[0]
      options?: Parameters<typeof client.v2.bot.richmenu.bulk.link.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostV2BotRichmenuBulkLinkMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.v2.bot.richmenu.bulk.link.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function createPostV2BotRichmenuBulkLink<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.richmenu.bulk.link.post>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<typeof client.v2.bot.richmenu.bulk.link.post>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<typeof client.v2.bot.richmenu.bulk.link.post>[0]
          options?: Parameters<typeof client.v2.bot.richmenu.bulk.link.post>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: () => QueryClient,
) {
  return createMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPostV2BotRichmenuBulkLinkMutationOptions<TError, TOnMutateResult>()
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  }, queryClient)
}

export function getPostV2BotRichmenuBulkUnlinkMutationKey() {
  return ['v2', '/v2/bot/richmenu/bulk/unlink', 'POST'] as const
}

export function getPostV2BotRichmenuBulkUnlinkMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.richmenu.bulk.unlink.post>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.richmenu.bulk.unlink.post>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<typeof client.v2.bot.richmenu.bulk.unlink.post>[0]
      options?: Parameters<typeof client.v2.bot.richmenu.bulk.unlink.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostV2BotRichmenuBulkUnlinkMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.v2.bot.richmenu.bulk.unlink.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function createPostV2BotRichmenuBulkUnlink<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.richmenu.bulk.unlink.post>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<typeof client.v2.bot.richmenu.bulk.unlink.post>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<typeof client.v2.bot.richmenu.bulk.unlink.post>[0]
          options?: Parameters<typeof client.v2.bot.richmenu.bulk.unlink.post>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: () => QueryClient,
) {
  return createMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPostV2BotRichmenuBulkUnlinkMutationOptions<
      TError,
      TOnMutateResult
    >()
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  }, queryClient)
}

export function getPostV2BotRichmenuBatchMutationKey() {
  return ['v2', '/v2/bot/richmenu/batch', 'POST'] as const
}

export function getPostV2BotRichmenuBatchMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.v2.bot.richmenu.batch.post>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.v2.bot.richmenu.batch.post>>, { error: null }>['data'],
    TError,
    {
      body: Parameters<typeof client.v2.bot.richmenu.batch.post>[0]
      options?: Parameters<typeof client.v2.bot.richmenu.batch.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostV2BotRichmenuBatchMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.v2.bot.richmenu.batch.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function createPostV2BotRichmenuBatch<
  TError = Exclude<Awaited<ReturnType<typeof client.v2.bot.richmenu.batch.post>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<typeof client.v2.bot.richmenu.batch.post>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<typeof client.v2.bot.richmenu.batch.post>[0]
          options?: Parameters<typeof client.v2.bot.richmenu.batch.post>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: () => QueryClient,
) {
  return createMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPostV2BotRichmenuBatchMutationOptions<TError, TOnMutateResult>()
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  }, queryClient)
}

export function getPostV2BotRichmenuValidateBatchMutationKey() {
  return ['v2', '/v2/bot/richmenu/validate/batch', 'POST'] as const
}

export function getPostV2BotRichmenuValidateBatchMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.richmenu.validate.batch.post>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.richmenu.validate.batch.post>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<typeof client.v2.bot.richmenu.validate.batch.post>[0]
      options?: Parameters<typeof client.v2.bot.richmenu.validate.batch.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostV2BotRichmenuValidateBatchMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.v2.bot.richmenu.validate.batch.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function createPostV2BotRichmenuValidateBatch<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.richmenu.validate.batch.post>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<typeof client.v2.bot.richmenu.validate.batch.post>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<typeof client.v2.bot.richmenu.validate.batch.post>[0]
          options?: Parameters<typeof client.v2.bot.richmenu.validate.batch.post>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: () => QueryClient,
) {
  return createMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPostV2BotRichmenuValidateBatchMutationOptions<
      TError,
      TOnMutateResult
    >()
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  }, queryClient)
}

export function getV2BotRichmenuProgressBatchQueryKey(
  options: Parameters<typeof client.v2.bot.richmenu.progress.batch.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['v2', '/v2/bot/richmenu/progress/batch', keyArgs] as const
}

export function getV2BotRichmenuProgressBatchQueryOptions<
  TData = Extract<
    Awaited<ReturnType<typeof client.v2.bot.richmenu.progress.batch.get>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.richmenu.progress.batch.get>>['error'],
    null
  >,
>(options: Parameters<typeof client.v2.bot.richmenu.progress.batch.get>[0]) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.richmenu.progress.batch.get>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getV2BotRichmenuProgressBatchQueryKey>
  >({
    queryKey: getV2BotRichmenuProgressBatchQueryKey(options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.v2.bot.richmenu.progress.batch.get({
        ...options,
        fetch: { ...options.fetch, signal },
      })
      if (error) throw error
      return data
    },
  })
}

export function createV2BotRichmenuProgressBatch<
  TData = Extract<
    Awaited<ReturnType<typeof client.v2.bot.richmenu.progress.batch.get>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.richmenu.progress.batch.get>>['error'],
    null
  >,
>(
  options: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<typeof client.v2.bot.richmenu.progress.batch.get>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getV2BotRichmenuProgressBatchQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.v2.bot.richmenu.progress.batch.get>[0]
  },
  queryClient?: () => QueryClient,
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getV2BotRichmenuProgressBatchQueryOptions<TData, TError>(clientOptions), ...query }
  }, queryClient)
}

export function getPostV2BotUserUserIdLinkTokenMutationKey() {
  return ['v2', '/v2/bot/user/{userId}/linkToken', 'POST'] as const
}

export function getPostV2BotUserUserIdLinkTokenMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.user>['linkToken']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: Parameters<typeof client.v2.bot.user>[0]) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.v2.bot.user>['linkToken']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<typeof client.v2.bot.user>['linkToken']['post']>[0]
      options?: Parameters<ReturnType<typeof client.v2.bot.user>['linkToken']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostV2BotUserUserIdLinkTokenMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.v2.bot.user(params).linkToken.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function createPostV2BotUserUserIdLinkToken<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.user>['linkToken']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.v2.bot.user>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.v2.bot.user>['linkToken']['post']>>,
          { error: null }
        >['data'],
        TError,
        {
          body?: Parameters<ReturnType<typeof client.v2.bot.user>['linkToken']['post']>[0]
          options?: Parameters<ReturnType<typeof client.v2.bot.user>['linkToken']['post']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: () => QueryClient,
) {
  return createMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPostV2BotUserUserIdLinkTokenMutationOptions<
      TError,
      TOnMutateResult
    >(params())
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  }, queryClient)
}

export function getPostV2BotMessageMarkAsReadMutationKey() {
  return ['v2', '/v2/bot/message/markAsRead', 'POST'] as const
}

export function getPostV2BotMessageMarkAsReadMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.message.markAsRead.post>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.message.markAsRead.post>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<typeof client.v2.bot.message.markAsRead.post>[0]
      options?: Parameters<typeof client.v2.bot.message.markAsRead.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostV2BotMessageMarkAsReadMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.v2.bot.message.markAsRead.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function createPostV2BotMessageMarkAsRead<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.message.markAsRead.post>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<typeof client.v2.bot.message.markAsRead.post>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<typeof client.v2.bot.message.markAsRead.post>[0]
          options?: Parameters<typeof client.v2.bot.message.markAsRead.post>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: () => QueryClient,
) {
  return createMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPostV2BotMessageMarkAsReadMutationOptions<TError, TOnMutateResult>()
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  }, queryClient)
}

export function getPostBotPnpPushMutationKey() {
  return ['bot', '/bot/pnp/push', 'POST'] as const
}

export function getPostBotPnpPushMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.bot.pnp.push.post>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.bot.pnp.push.post>>, { error: null }>['data'],
    TError,
    {
      body: Parameters<typeof client.bot.pnp.push.post>[0]
      options?: Parameters<typeof client.bot.pnp.push.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostBotPnpPushMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.bot.pnp.push.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function createPostBotPnpPush<
  TError = Exclude<Awaited<ReturnType<typeof client.bot.pnp.push.post>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<Awaited<ReturnType<typeof client.bot.pnp.push.post>>, { error: null }>['data'],
        TError,
        {
          body: Parameters<typeof client.bot.pnp.push.post>[0]
          options?: Parameters<typeof client.bot.pnp.push.post>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: () => QueryClient,
) {
  return createMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPostBotPnpPushMutationOptions<TError, TOnMutateResult>()
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  }, queryClient)
}

export function getPostV2BotMessagePnpTemplatedPushMutationKey() {
  return ['v2', '/v2/bot/message/pnp/templated/push', 'POST'] as const
}

export function getPostV2BotMessagePnpTemplatedPushMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.message.pnp.templated.push.post>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.message.pnp.templated.push.post>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<typeof client.v2.bot.message.pnp.templated.push.post>[0]
      options?: Parameters<typeof client.v2.bot.message.pnp.templated.push.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostV2BotMessagePnpTemplatedPushMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.v2.bot.message.pnp.templated.push.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function createPostV2BotMessagePnpTemplatedPush<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.message.pnp.templated.push.post>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<typeof client.v2.bot.message.pnp.templated.push.post>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<typeof client.v2.bot.message.pnp.templated.push.post>[0]
          options?: Parameters<typeof client.v2.bot.message.pnp.templated.push.post>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: () => QueryClient,
) {
  return createMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPostV2BotMessagePnpTemplatedPushMutationOptions<
      TError,
      TOnMutateResult
    >()
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  }, queryClient)
}

export function getV2BotMessageDeliveryPnpQueryKey(
  options: Parameters<typeof client.v2.bot.message.delivery.pnp.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['v2', '/v2/bot/message/delivery/pnp', keyArgs] as const
}

export function getV2BotMessageDeliveryPnpQueryOptions<
  TData = Extract<
    Awaited<ReturnType<typeof client.v2.bot.message.delivery.pnp.get>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.message.delivery.pnp.get>>['error'],
    null
  >,
>(options: Parameters<typeof client.v2.bot.message.delivery.pnp.get>[0]) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.message.delivery.pnp.get>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getV2BotMessageDeliveryPnpQueryKey>
  >({
    queryKey: getV2BotMessageDeliveryPnpQueryKey(options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.v2.bot.message.delivery.pnp.get({
        ...options,
        fetch: { ...options.fetch, signal },
      })
      if (error) throw error
      return data
    },
  })
}

export function createV2BotMessageDeliveryPnp<
  TData = Extract<
    Awaited<ReturnType<typeof client.v2.bot.message.delivery.pnp.get>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.message.delivery.pnp.get>>['error'],
    null
  >,
>(
  options: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<typeof client.v2.bot.message.delivery.pnp.get>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getV2BotMessageDeliveryPnpQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.v2.bot.message.delivery.pnp.get>[0]
  },
  queryClient?: () => QueryClient,
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options()
    return { ...getV2BotMessageDeliveryPnpQueryOptions<TData, TError>(clientOptions), ...query }
  }, queryClient)
}

export function getV2BotMessageDeliveryPnpTemplatedQueryKey(
  options: Parameters<typeof client.v2.bot.message.delivery.pnp.templated.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['v2', '/v2/bot/message/delivery/pnp/templated', keyArgs] as const
}

export function getV2BotMessageDeliveryPnpTemplatedQueryOptions<
  TData = Extract<
    Awaited<ReturnType<typeof client.v2.bot.message.delivery.pnp.templated.get>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.message.delivery.pnp.templated.get>>['error'],
    null
  >,
>(options: Parameters<typeof client.v2.bot.message.delivery.pnp.templated.get>[0]) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.message.delivery.pnp.templated.get>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getV2BotMessageDeliveryPnpTemplatedQueryKey>
  >({
    queryKey: getV2BotMessageDeliveryPnpTemplatedQueryKey(options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.v2.bot.message.delivery.pnp.templated.get({
        ...options,
        fetch: { ...options.fetch, signal },
      })
      if (error) throw error
      return data
    },
  })
}

export function createV2BotMessageDeliveryPnpTemplated<
  TData = Extract<
    Awaited<ReturnType<typeof client.v2.bot.message.delivery.pnp.templated.get>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.message.delivery.pnp.templated.get>>['error'],
    null
  >,
>(
  options: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<typeof client.v2.bot.message.delivery.pnp.templated.get>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getV2BotMessageDeliveryPnpTemplatedQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.v2.bot.message.delivery.pnp.templated.get>[0]
  },
  queryClient?: () => QueryClient,
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options()
    return {
      ...getV2BotMessageDeliveryPnpTemplatedQueryOptions<TData, TError>(clientOptions),
      ...query,
    }
  }, queryClient)
}

export function getV2BotMembershipSubscriptionUserIdQueryKey(
  params: Parameters<typeof client.v2.bot.membership.subscription>[0],
) {
  return ['v2', '/v2/bot/membership/subscription/{userId}', params] as const
}

export function getV2BotMembershipSubscriptionUserIdQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.membership.subscription>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.membership.subscription>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.v2.bot.membership.subscription>[0],
  options?: Parameters<ReturnType<typeof client.v2.bot.membership.subscription>['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.v2.bot.membership.subscription>['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getV2BotMembershipSubscriptionUserIdQueryKey>
  >({
    queryKey: getV2BotMembershipSubscriptionUserIdQueryKey(params),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.v2.bot.membership
        .subscription(params)
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function createV2BotMembershipSubscriptionUserId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.membership.subscription>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.membership.subscription>['get']>>['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.v2.bot.membership.subscription>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.v2.bot.membership.subscription>['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getV2BotMembershipSubscriptionUserIdQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.v2.bot.membership.subscription>['get']>[0]
  },
  queryClient?: () => QueryClient,
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getV2BotMembershipSubscriptionUserIdQueryOptions<TData, TError>(params(), clientOptions),
      ...query,
    }
  }, queryClient)
}

export function getV2BotMembershipListQueryKey() {
  return ['v2', '/v2/bot/membership/list'] as const
}

export function getV2BotMembershipListQueryOptions<
  TData = Extract<
    Awaited<ReturnType<typeof client.v2.bot.membership.list.get>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.v2.bot.membership.list.get>>['error'], null>,
>(options?: Parameters<typeof client.v2.bot.membership.list.get>[0]) {
  return queryOptions<
    Extract<Awaited<ReturnType<typeof client.v2.bot.membership.list.get>>, { error: null }>['data'],
    TError,
    TData,
    ReturnType<typeof getV2BotMembershipListQueryKey>
  >({
    queryKey: getV2BotMembershipListQueryKey(),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.v2.bot.membership.list.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  })
}

export function createV2BotMembershipList<
  TData = Extract<
    Awaited<ReturnType<typeof client.v2.bot.membership.list.get>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.v2.bot.membership.list.get>>['error'], null>,
>(
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<typeof client.v2.bot.membership.list.get>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getV2BotMembershipListQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.v2.bot.membership.list.get>[0]
  },
  queryClient?: () => QueryClient,
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getV2BotMembershipListQueryOptions<TData, TError>(clientOptions), ...query }
  }, queryClient)
}

export function getV2BotMembershipMembershipIdUsersIdsQueryKey(
  params: Parameters<typeof client.v2.bot.membership>[0],
  options?: Parameters<ReturnType<typeof client.v2.bot.membership>['users']['ids']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['v2', '/v2/bot/membership/{membershipId}/users/ids', params, keyArgs] as const
}

export function getV2BotMembershipMembershipIdUsersIdsQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.membership>['users']['ids']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.v2.bot.membership>['users']['ids']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.v2.bot.membership>[0],
  options?: Parameters<ReturnType<typeof client.v2.bot.membership>['users']['ids']['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.v2.bot.membership>['users']['ids']['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getV2BotMembershipMembershipIdUsersIdsQueryKey>
  >({
    queryKey: getV2BotMembershipMembershipIdUsersIdsQueryKey(params, options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.v2.bot
        .membership(params)
        .users.ids.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function createV2BotMembershipMembershipIdUsersIds<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.membership>['users']['ids']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.v2.bot.membership>['users']['ids']['get']>
    >['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.v2.bot.membership>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.v2.bot.membership>['users']['ids']['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getV2BotMembershipMembershipIdUsersIdsQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.v2.bot.membership>['users']['ids']['get']>[0]
  },
  queryClient?: () => QueryClient,
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getV2BotMembershipMembershipIdUsersIdsQueryOptions<TData, TError>(params(), clientOptions),
      ...query,
    }
  }, queryClient)
}

export function getV2BotCouponQueryKey(options?: Parameters<typeof client.v2.bot.coupon.get>[0]) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['v2', '/v2/bot/coupon', keyArgs] as const
}

export function getV2BotCouponQueryOptions<
  TData = Extract<Awaited<ReturnType<typeof client.v2.bot.coupon.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.v2.bot.coupon.get>>['error'], null>,
>(options?: Parameters<typeof client.v2.bot.coupon.get>[0]) {
  return queryOptions<
    Extract<Awaited<ReturnType<typeof client.v2.bot.coupon.get>>, { error: null }>['data'],
    TError,
    TData,
    ReturnType<typeof getV2BotCouponQueryKey>
  >({
    queryKey: getV2BotCouponQueryKey(options),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.v2.bot.coupon.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  })
}

export function createV2BotCoupon<
  TData = Extract<Awaited<ReturnType<typeof client.v2.bot.coupon.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.v2.bot.coupon.get>>['error'], null>,
>(
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<Awaited<ReturnType<typeof client.v2.bot.coupon.get>>, { error: null }>['data'],
        TError,
        TData,
        ReturnType<typeof getV2BotCouponQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.v2.bot.coupon.get>[0]
  },
  queryClient?: () => QueryClient,
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return { ...getV2BotCouponQueryOptions<TData, TError>(clientOptions), ...query }
  }, queryClient)
}

export function getPostV2BotCouponMutationKey() {
  return ['v2', '/v2/bot/coupon', 'POST'] as const
}

export function getPostV2BotCouponMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.v2.bot.coupon.post>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.v2.bot.coupon.post>>, { error: null }>['data'],
    TError,
    {
      body: Parameters<typeof client.v2.bot.coupon.post>[0]
      options?: Parameters<typeof client.v2.bot.coupon.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostV2BotCouponMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.v2.bot.coupon.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function createPostV2BotCoupon<
  TError = Exclude<Awaited<ReturnType<typeof client.v2.bot.coupon.post>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<Awaited<ReturnType<typeof client.v2.bot.coupon.post>>, { error: null }>['data'],
        TError,
        {
          body: Parameters<typeof client.v2.bot.coupon.post>[0]
          options?: Parameters<typeof client.v2.bot.coupon.post>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: () => QueryClient,
) {
  return createMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPostV2BotCouponMutationOptions<TError, TOnMutateResult>()
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  }, queryClient)
}

export function getV2BotCouponCouponIdQueryKey(params: Parameters<typeof client.v2.bot.coupon>[0]) {
  return ['v2', '/v2/bot/coupon/{couponId}', params] as const
}

export function getV2BotCouponCouponIdQueryOptions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.coupon>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.coupon>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.v2.bot.coupon>[0],
  options?: Parameters<ReturnType<typeof client.v2.bot.coupon>['get']>[0],
) {
  return queryOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.v2.bot.coupon>['get']>>,
      { error: null }
    >['data'],
    TError,
    TData,
    ReturnType<typeof getV2BotCouponCouponIdQueryKey>
  >({
    queryKey: getV2BotCouponCouponIdQueryKey(params),
    queryFn: async ({ signal }) => {
      const { data, error } = await client.v2.bot
        .coupon(params)
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  })
}

export function createV2BotCouponCouponId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.coupon>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.coupon>['get']>>['error'],
    null
  >,
>(
  params: () => Parameters<typeof client.v2.bot.coupon>[0],
  options?: () => {
    query?: Omit<
      CreateQueryOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.v2.bot.coupon>['get']>>,
          { error: null }
        >['data'],
        TError,
        TData,
        ReturnType<typeof getV2BotCouponCouponIdQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.v2.bot.coupon>['get']>[0]
  },
  queryClient?: () => QueryClient,
) {
  return createQuery(() => {
    const { query, options: clientOptions } = options?.() ?? {}
    return {
      ...getV2BotCouponCouponIdQueryOptions<TData, TError>(params(), clientOptions),
      ...query,
    }
  }, queryClient)
}

export function getPutV2BotCouponCouponIdCloseMutationKey() {
  return ['v2', '/v2/bot/coupon/{couponId}/close', 'PUT'] as const
}

export function getPutV2BotCouponCouponIdCloseMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.coupon>['close']['put']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: Parameters<typeof client.v2.bot.coupon>[0]) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.v2.bot.coupon>['close']['put']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<typeof client.v2.bot.coupon>['close']['put']>[0]
      options?: Parameters<ReturnType<typeof client.v2.bot.coupon>['close']['put']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPutV2BotCouponCouponIdCloseMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.v2.bot.coupon(params).close.put(body, options)
      if (error) throw error
      return data
    },
  })
}

export function createPutV2BotCouponCouponIdClose<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.v2.bot.coupon>['close']['put']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: () => Parameters<typeof client.v2.bot.coupon>[0],
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<ReturnType<typeof client.v2.bot.coupon>['close']['put']>>,
          { error: null }
        >['data'],
        TError,
        {
          body?: Parameters<ReturnType<typeof client.v2.bot.coupon>['close']['put']>[0]
          options?: Parameters<ReturnType<typeof client.v2.bot.coupon>['close']['put']>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: () => QueryClient,
) {
  return createMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPutV2BotCouponCouponIdCloseMutationOptions<TError, TOnMutateResult>(
      params(),
    )
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  }, queryClient)
}

export function getPostV2BotChatLoadingStartMutationKey() {
  return ['v2', '/v2/bot/chat/loading/start', 'POST'] as const
}

export function getPostV2BotChatLoadingStartMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.chat.loading.start.post>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.chat.loading.start.post>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<typeof client.v2.bot.chat.loading.start.post>[0]
      options?: Parameters<typeof client.v2.bot.chat.loading.start.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostV2BotChatLoadingStartMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.v2.bot.chat.loading.start.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function createPostV2BotChatLoadingStart<
  TError = Exclude<
    Awaited<ReturnType<typeof client.v2.bot.chat.loading.start.post>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<typeof client.v2.bot.chat.loading.start.post>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<typeof client.v2.bot.chat.loading.start.post>[0]
          options?: Parameters<typeof client.v2.bot.chat.loading.start.post>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: () => QueryClient,
) {
  return createMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPostV2BotChatLoadingStartMutationOptions<TError, TOnMutateResult>()
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  }, queryClient)
}

export function getPostV2BotChatMarkAsReadMutationKey() {
  return ['v2', '/v2/bot/chat/markAsRead', 'POST'] as const
}

export function getPostV2BotChatMarkAsReadMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.v2.bot.chat.markAsRead.post>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<typeof client.v2.bot.chat.markAsRead.post>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<typeof client.v2.bot.chat.markAsRead.post>[0]
      options?: Parameters<typeof client.v2.bot.chat.markAsRead.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostV2BotChatMarkAsReadMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.v2.bot.chat.markAsRead.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function createPostV2BotChatMarkAsRead<
  TError = Exclude<Awaited<ReturnType<typeof client.v2.bot.chat.markAsRead.post>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: () => {
    mutation?: Omit<
      CreateMutationOptions<
        Extract<
          Awaited<ReturnType<typeof client.v2.bot.chat.markAsRead.post>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<typeof client.v2.bot.chat.markAsRead.post>[0]
          options?: Parameters<typeof client.v2.bot.chat.markAsRead.post>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: () => QueryClient,
) {
  return createMutation(() => {
    const { mutation } = options?.() ?? {}
    const mutationDefaults = getPostV2BotChatMarkAsReadMutationOptions<TError, TOnMutateResult>()
    return {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    }
  }, queryClient)
}
