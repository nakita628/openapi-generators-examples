import useSWR from 'swr'
import useSWRImmutable from 'swr/immutable'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
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

export function getPostOauth2V3TokenKey() {
  return ['oauth2', '/oauth2/v3/token', 'POST'] as const
}

export function usePostOauth2V3Token<
  TError = Exclude<Awaited<ReturnType<typeof client.oauth2.v3.token.post>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.oauth2.v3.token.post>>, { error: null }>['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.oauth2.v3.token.post>[0]
      options?: Parameters<typeof client.oauth2.v3.token.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostOauth2V3TokenKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<Awaited<ReturnType<typeof client.oauth2.v3.token.post>>, { error: null }>['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.oauth2.v3.token.post>[0]
        options?: Parameters<typeof client.oauth2.v3.token.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.oauth2.v3.token.post>[0]
            options?: Parameters<typeof client.oauth2.v3.token.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.oauth2.v3.token.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetOauth2V21TokensKidKey(options?: {
  headers?: Record<string, string>
  query?: Record<string, unknown>
}) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return ['oauth2', '/oauth2/v2.1/tokens/kid', keyArgs] as const
}

export function useGetOauth2V21TokensKid<TError = unknown>(options?: {
  swr?: SWRConfiguration<Static<typeof ChannelAccessTokenKeyIdsResponseSchema>, TError> & {
    swrKey?: Key
    enabled?: boolean
  }
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOauth2V21TokensKidKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<Static<typeof ChannelAccessTokenKeyIdsResponseSchema>, TError>(
      swrKey,
      async () => {
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
          `${clientOrigin}/oauth2/v2.1/tokens/kid${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetOauth2V21TokensKid<TError = unknown>(options?: {
  swr?: SWRConfiguration<Static<typeof ChannelAccessTokenKeyIdsResponseSchema>, TError> & {
    swrKey?: Key
    enabled?: boolean
  }
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOauth2V21TokensKidKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<Static<typeof ChannelAccessTokenKeyIdsResponseSchema>, TError>(
      swrKey,
      async () => {
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
          `${clientOrigin}/oauth2/v2.1/tokens/kid${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getPostOauth2V21TokenKey() {
  return ['oauth2', '/oauth2/v2.1/token', 'POST'] as const
}

export function usePostOauth2V21Token<TError = unknown>(options?: {
  mutation?: SWRMutationConfiguration<
    Static<typeof IssueChannelAccessTokenResponseSchema>,
    TError,
    Key,
    { body?: unknown; options?: { headers?: Record<string, string> } }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostOauth2V21TokenKey()
  return {
    swrKey,
    ...useSWRMutation<
      Static<typeof IssueChannelAccessTokenResponseSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    >(
      swrKey,
      async (
        _key: Key,
        { arg }: { arg: { body?: unknown; options?: { headers?: Record<string, string> } } },
      ) => {
        const res = await fetch(`${clientOrigin}/oauth2/v2.1/token`, {
          method: 'POST',
          headers: { 'content-type': 'application/json', ...arg.options?.headers },
          body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
        })
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getGetOauth2V21VerifyKey(options?: {
  headers?: Record<string, string>
  query?: Record<string, unknown>
}) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return ['oauth2', '/oauth2/v2.1/verify', keyArgs] as const
}

export function useGetOauth2V21Verify<TError = unknown>(options?: {
  swr?: SWRConfiguration<Static<typeof VerifyChannelAccessTokenResponseSchema>, TError> & {
    swrKey?: Key
    enabled?: boolean
  }
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOauth2V21VerifyKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<Static<typeof VerifyChannelAccessTokenResponseSchema>, TError>(
      swrKey,
      async () => {
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
          `${clientOrigin}/oauth2/v2.1/verify${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetOauth2V21Verify<TError = unknown>(options?: {
  swr?: SWRConfiguration<Static<typeof VerifyChannelAccessTokenResponseSchema>, TError> & {
    swrKey?: Key
    enabled?: boolean
  }
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOauth2V21VerifyKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<Static<typeof VerifyChannelAccessTokenResponseSchema>, TError>(
      swrKey,
      async () => {
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
          `${clientOrigin}/oauth2/v2.1/verify${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getPostOauth2V21RevokeKey() {
  return ['oauth2', '/oauth2/v2.1/revoke', 'POST'] as const
}

export function usePostOauth2V21Revoke<TError = unknown>(options?: {
  mutation?: SWRMutationConfiguration<
    void,
    TError,
    Key,
    { body?: unknown; options?: { headers?: Record<string, string> } }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostOauth2V21RevokeKey()
  return {
    swrKey,
    ...useSWRMutation<
      void,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    >(
      swrKey,
      async (
        _key: Key,
        { arg }: { arg: { body?: unknown; options?: { headers?: Record<string, string> } } },
      ) => {
        const res = await fetch(`${clientOrigin}/oauth2/v2.1/revoke`, {
          method: 'POST',
          headers: { 'content-type': 'application/json', ...arg.options?.headers },
          body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
        })
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getPostV2OauthAccessTokenKey() {
  return ['v2', '/v2/oauth/accessToken', 'POST'] as const
}

export function usePostV2OauthAccessToken<
  TError = Exclude<Awaited<ReturnType<typeof client.v2.oauth.accessToken.post>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.v2.oauth.accessToken.post>>, { error: null }>['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.v2.oauth.accessToken.post>[0]
      options?: Parameters<typeof client.v2.oauth.accessToken.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostV2OauthAccessTokenKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<typeof client.v2.oauth.accessToken.post>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.v2.oauth.accessToken.post>[0]
        options?: Parameters<typeof client.v2.oauth.accessToken.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.v2.oauth.accessToken.post>[0]
            options?: Parameters<typeof client.v2.oauth.accessToken.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.v2.oauth.accessToken.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostV2OauthVerifyKey() {
  return ['v2', '/v2/oauth/verify', 'POST'] as const
}

export function usePostV2OauthVerify<
  TError = Exclude<Awaited<ReturnType<typeof client.v2.oauth.verify.post>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.v2.oauth.verify.post>>, { error: null }>['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.v2.oauth.verify.post>[0]
      options?: Parameters<typeof client.v2.oauth.verify.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostV2OauthVerifyKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<Awaited<ReturnType<typeof client.v2.oauth.verify.post>>, { error: null }>['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.v2.oauth.verify.post>[0]
        options?: Parameters<typeof client.v2.oauth.verify.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.v2.oauth.verify.post>[0]
            options?: Parameters<typeof client.v2.oauth.verify.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.v2.oauth.verify.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostV2OauthRevokeKey() {
  return ['v2', '/v2/oauth/revoke', 'POST'] as const
}

export function usePostV2OauthRevoke<
  TError = Exclude<Awaited<ReturnType<typeof client.v2.oauth.revoke.post>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.v2.oauth.revoke.post>>, { error: null }>['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.v2.oauth.revoke.post>[0]
      options?: Parameters<typeof client.v2.oauth.revoke.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostV2OauthRevokeKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<Awaited<ReturnType<typeof client.v2.oauth.revoke.post>>, { error: null }>['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.v2.oauth.revoke.post>[0]
        options?: Parameters<typeof client.v2.oauth.revoke.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.v2.oauth.revoke.post>[0]
            options?: Parameters<typeof client.v2.oauth.revoke.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.v2.oauth.revoke.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}
