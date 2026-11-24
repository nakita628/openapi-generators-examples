import {
  useQuery,
  useSuspenseQuery,
  useMutation,
  queryOptions,
  mutationOptions,
} from '@tanstack/react-query'
import type {
  UseQueryOptions,
  UseSuspenseQueryOptions,
  UseMutationOptions,
  QueryClient,
} from '@tanstack/react-query'
import type { Static } from 'elysia'
import type {
  ChannelAccessTokenKeyIdsResponseSchema,
  IssueChannelAccessTokenResponseSchema,
  VerifyChannelAccessTokenResponseSchema,
} from '../components/schemas'
import { client, clientOrigin } from '../lib'

export function getOauth2Key() {
  return ['oauth2'] as const
}

export function getV2Key() {
  return ['v2'] as const
}

export function getPostOauth2V3TokenMutationKey() {
  return ['oauth2', '/oauth2/v3/token', 'POST'] as const
}

export function getPostOauth2V3TokenMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.oauth2.v3.token.post>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.oauth2.v3.token.post>>, { error: null }>['data'],
    TError,
    {
      body: Parameters<typeof client.oauth2.v3.token.post>[0]
      options?: Parameters<typeof client.oauth2.v3.token.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostOauth2V3TokenMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.oauth2.v3.token.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostOauth2V3Token<
  TError = Exclude<Awaited<ReturnType<typeof client.oauth2.v3.token.post>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        Extract<Awaited<ReturnType<typeof client.oauth2.v3.token.post>>, { error: null }>['data'],
        TError,
        {
          body: Parameters<typeof client.oauth2.v3.token.post>[0]
          options?: Parameters<typeof client.oauth2.v3.token.post>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostOauth2V3TokenMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getOauth2V21TokensKidQueryKey(options?: {
  headers?: Record<string, string>
  query?: Record<string, unknown>
}) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return ['oauth2', '/oauth2/v2.1/tokens/kid', keyArgs] as const
}

export function getOauth2V21TokensKidQueryOptions<
  TData = Static<typeof ChannelAccessTokenKeyIdsResponseSchema>,
  TError = unknown,
>(options?: { headers?: Record<string, string>; query?: Record<string, unknown> }) {
  return queryOptions<
    Static<typeof ChannelAccessTokenKeyIdsResponseSchema>,
    TError,
    TData,
    ReturnType<typeof getOauth2V21TokensKidQueryKey>
  >({
    queryKey: getOauth2V21TokensKidQueryKey(options),
    queryFn: async ({ signal }) => {
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
        `${clientOrigin}/oauth2/v2.1/tokens/kid${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function useOauth2V21TokensKid<
  TData = Static<typeof ChannelAccessTokenKeyIdsResponseSchema>,
  TError = unknown,
>(
  options?: {
    query?: Omit<
      UseQueryOptions<
        Static<typeof ChannelAccessTokenKeyIdsResponseSchema>,
        TError,
        TData,
        ReturnType<typeof getOauth2V21TokensKidQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    { ...getOauth2V21TokensKidQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
}

export function useSuspenseOauth2V21TokensKid<
  TData = Static<typeof ChannelAccessTokenKeyIdsResponseSchema>,
  TError = unknown,
>(
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Static<typeof ChannelAccessTokenKeyIdsResponseSchema>,
        TError,
        TData,
        ReturnType<typeof getOauth2V21TokensKidQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    { ...getOauth2V21TokensKidQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
}

export function getPostOauth2V21TokenMutationKey() {
  return ['oauth2', '/oauth2/v2.1/token', 'POST'] as const
}

export function getPostOauth2V21TokenMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Static<typeof IssueChannelAccessTokenResponseSchema>,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPostOauth2V21TokenMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(`${clientOrigin}/oauth2/v2.1/token`, {
        method: 'POST',
        headers: { 'content-type': 'application/json', ...options?.headers },
        body: body === undefined ? undefined : JSON.stringify(body),
      })
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function usePostOauth2V21Token<TError = unknown, TOnMutateResult = unknown>(
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        Static<typeof IssueChannelAccessTokenResponseSchema>,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostOauth2V21TokenMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getOauth2V21VerifyQueryKey(options?: {
  headers?: Record<string, string>
  query?: Record<string, unknown>
}) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return ['oauth2', '/oauth2/v2.1/verify', keyArgs] as const
}

export function getOauth2V21VerifyQueryOptions<
  TData = Static<typeof VerifyChannelAccessTokenResponseSchema>,
  TError = unknown,
>(options?: { headers?: Record<string, string>; query?: Record<string, unknown> }) {
  return queryOptions<
    Static<typeof VerifyChannelAccessTokenResponseSchema>,
    TError,
    TData,
    ReturnType<typeof getOauth2V21VerifyQueryKey>
  >({
    queryKey: getOauth2V21VerifyQueryKey(options),
    queryFn: async ({ signal }) => {
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
        `${clientOrigin}/oauth2/v2.1/verify${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function useOauth2V21Verify<
  TData = Static<typeof VerifyChannelAccessTokenResponseSchema>,
  TError = unknown,
>(
  options?: {
    query?: Omit<
      UseQueryOptions<
        Static<typeof VerifyChannelAccessTokenResponseSchema>,
        TError,
        TData,
        ReturnType<typeof getOauth2V21VerifyQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    { ...getOauth2V21VerifyQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
}

export function useSuspenseOauth2V21Verify<
  TData = Static<typeof VerifyChannelAccessTokenResponseSchema>,
  TError = unknown,
>(
  options?: {
    query?: Omit<
      UseSuspenseQueryOptions<
        Static<typeof VerifyChannelAccessTokenResponseSchema>,
        TError,
        TData,
        ReturnType<typeof getOauth2V21VerifyQueryKey>
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useSuspenseQuery(
    { ...getOauth2V21VerifyQueryOptions<TData, TError>(clientOptions), ...queryOptions },
    queryClient,
  )
}

export function getPostOauth2V21RevokeMutationKey() {
  return ['oauth2', '/oauth2/v2.1/revoke', 'POST'] as const
}

export function getPostOauth2V21RevokeMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    void,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getPostOauth2V21RevokeMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(`${clientOrigin}/oauth2/v2.1/revoke`, {
        method: 'POST',
        headers: { 'content-type': 'application/json', ...options?.headers },
        body: body === undefined ? undefined : JSON.stringify(body),
      })
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function usePostOauth2V21Revoke<TError = unknown, TOnMutateResult = unknown>(
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        void,
        TError,
        { body?: unknown; options?: { headers?: Record<string, string> } },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostOauth2V21RevokeMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPostV2OauthAccessTokenMutationKey() {
  return ['v2', '/v2/oauth/accessToken', 'POST'] as const
}

export function getPostV2OauthAccessTokenMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.v2.oauth.accessToken.post>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.v2.oauth.accessToken.post>>, { error: null }>['data'],
    TError,
    {
      body: Parameters<typeof client.v2.oauth.accessToken.post>[0]
      options?: Parameters<typeof client.v2.oauth.accessToken.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostV2OauthAccessTokenMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.v2.oauth.accessToken.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostV2OauthAccessToken<
  TError = Exclude<Awaited<ReturnType<typeof client.v2.oauth.accessToken.post>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        Extract<
          Awaited<ReturnType<typeof client.v2.oauth.accessToken.post>>,
          { error: null }
        >['data'],
        TError,
        {
          body: Parameters<typeof client.v2.oauth.accessToken.post>[0]
          options?: Parameters<typeof client.v2.oauth.accessToken.post>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostV2OauthAccessTokenMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPostV2OauthVerifyMutationKey() {
  return ['v2', '/v2/oauth/verify', 'POST'] as const
}

export function getPostV2OauthVerifyMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.v2.oauth.verify.post>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.v2.oauth.verify.post>>, { error: null }>['data'],
    TError,
    {
      body: Parameters<typeof client.v2.oauth.verify.post>[0]
      options?: Parameters<typeof client.v2.oauth.verify.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostV2OauthVerifyMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.v2.oauth.verify.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostV2OauthVerify<
  TError = Exclude<Awaited<ReturnType<typeof client.v2.oauth.verify.post>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        Extract<Awaited<ReturnType<typeof client.v2.oauth.verify.post>>, { error: null }>['data'],
        TError,
        {
          body: Parameters<typeof client.v2.oauth.verify.post>[0]
          options?: Parameters<typeof client.v2.oauth.verify.post>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostV2OauthVerifyMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPostV2OauthRevokeMutationKey() {
  return ['v2', '/v2/oauth/revoke', 'POST'] as const
}

export function getPostV2OauthRevokeMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.v2.oauth.revoke.post>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.v2.oauth.revoke.post>>, { error: null }>['data'],
    TError,
    {
      body: Parameters<typeof client.v2.oauth.revoke.post>[0]
      options?: Parameters<typeof client.v2.oauth.revoke.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostV2OauthRevokeMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.v2.oauth.revoke.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostV2OauthRevoke<
  TError = Exclude<Awaited<ReturnType<typeof client.v2.oauth.revoke.post>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      UseMutationOptions<
        Extract<Awaited<ReturnType<typeof client.v2.oauth.revoke.post>>, { error: null }>['data'],
        TError,
        {
          body: Parameters<typeof client.v2.oauth.revoke.post>[0]
          options?: Parameters<typeof client.v2.oauth.revoke.post>[1]
        },
        TOnMutateResult
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostV2OauthRevokeMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}
