import useSWR from 'swr'
import useSWRImmutable from 'swr/immutable'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { Static } from 'elysia'
import type {
  ApiV2010AccountAddressSchema,
  ApiV2010AccountApplicationSchema,
  ApiV2010AccountAuthorizedConnectAppSchema,
  ApiV2010AccountAvailablePhoneNumberCountrySchema,
  ApiV2010AccountBalanceSchema,
  ApiV2010AccountCallCallNotificationInstanceSchema,
  ApiV2010AccountCallCallRecordingSchema,
  ApiV2010AccountCallPaymentsSchema,
  ApiV2010AccountCallRealtimeTranscriptionSchema,
  ApiV2010AccountCallSchema,
  ApiV2010AccountCallSiprecSchema,
  ApiV2010AccountCallStreamSchema,
  ApiV2010AccountCallUserDefinedMessageSchema,
  ApiV2010AccountCallUserDefinedMessageSubscriptionSchema,
  ApiV2010AccountConferenceConferenceRecordingSchema,
  ApiV2010AccountConferenceParticipantSchema,
  ApiV2010AccountConferenceSchema,
  ApiV2010AccountConnectAppSchema,
  ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnIncomingPhoneNumberAssignedAddOnExtensionSchema,
  ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnSchema,
  ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberLocalSchema,
  ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberMobileSchema,
  ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberTollFreeSchema,
  ApiV2010AccountIncomingPhoneNumberSchema,
  ApiV2010AccountKeySchema,
  ApiV2010AccountMessageMediaSchema,
  ApiV2010AccountMessageMessageFeedbackSchema,
  ApiV2010AccountMessageSchema,
  ApiV2010AccountNewKeySchema,
  ApiV2010AccountNewSigningKeySchema,
  ApiV2010AccountNotificationInstanceSchema,
  ApiV2010AccountOutgoingCallerIdSchema,
  ApiV2010AccountQueueMemberSchema,
  ApiV2010AccountQueueSchema,
  ApiV2010AccountRecordingRecordingAddOnResultRecordingAddOnResultPayloadSchema,
  ApiV2010AccountRecordingRecordingAddOnResultSchema,
  ApiV2010AccountRecordingRecordingTranscriptionSchema,
  ApiV2010AccountRecordingSchema,
  ApiV2010AccountSchema,
  ApiV2010AccountShortCodeSchema,
  ApiV2010AccountSigningKeySchema,
  ApiV2010AccountSipSipCredentialListSchema,
  ApiV2010AccountSipSipCredentialListSipCredentialSchema,
  ApiV2010AccountSipSipDomainSchema,
  ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsCredentialListMappingSchema,
  ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsIpAccessControlListMappingSchema,
  ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrationsSipAuthRegistrationsCredentialListMappingSchema,
  ApiV2010AccountSipSipDomainSipCredentialListMappingSchema,
  ApiV2010AccountSipSipDomainSipIpAccessControlListMappingSchema,
  ApiV2010AccountSipSipIpAccessControlListSchema,
  ApiV2010AccountSipSipIpAccessControlListSipIpAddressSchema,
  ApiV2010AccountTokenSchema,
  ApiV2010AccountTranscriptionSchema,
  ApiV2010AccountUsageUsageTriggerSchema,
  ApiV2010AccountValidationRequestSchema,
} from '../components/schemas'
import { client, clientOrigin } from '../lib'

export function get_20100401Key() {
  return ['2010-04-01'] as const
}

export function getGet20100401AccountsJsonKey(options?: {
  headers?: Record<string, string>
  query?: Record<string, unknown>
}) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return ['2010-04-01', '/2010-04-01/Accounts.json', keyArgs] as const
}

export function useGet20100401AccountsJson<TError = unknown>(options?: {
  swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsJsonKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsJson<TError = unknown>(options?: {
  swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsJsonKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getPost20100401AccountsJsonKey() {
  return ['2010-04-01', '/2010-04-01/Accounts.json', 'POST'] as const
}

export function usePost20100401AccountsJson<TError = unknown>(options?: {
  mutation?: SWRMutationConfiguration<
    Static<typeof ApiV2010AccountSchema>,
    TError,
    Key,
    { body?: unknown; options?: { headers?: Record<string, string> } }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPost20100401AccountsJsonKey()
  return {
    swrKey,
    ...useSWRMutation<
      Static<typeof ApiV2010AccountSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    >(
      swrKey,
      async (
        _key: Key,
        { arg }: { arg: { body?: unknown; options?: { headers?: Record<string, string> } } },
      ) => {
        const res = await fetch(`${clientOrigin}/2010-04-01/Accounts.json`, {
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

export function getGet20100401AccountsSidJsonKey(params: string) {
  return ['2010-04-01', '/2010-04-01/Accounts/{Sid}.json', params] as const
}

export function useGet20100401AccountsSidJson<TError = unknown>(
  params: string,
  options?: {
    swr?: SWRConfiguration<Static<typeof ApiV2010AccountSchema>, TError> & {
      swrKey?: Key
      enabled?: boolean
    }
    options?: { headers?: Record<string, string> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsSidJsonKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<Static<typeof ApiV2010AccountSchema>, TError>(
      swrKey,
      async () => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}.json`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsSidJson<TError = unknown>(
  params: string,
  options?: {
    swr?: SWRConfiguration<Static<typeof ApiV2010AccountSchema>, TError> & {
      swrKey?: Key
      enabled?: boolean
    }
    options?: { headers?: Record<string, string> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsSidJsonKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<Static<typeof ApiV2010AccountSchema>, TError>(
      swrKey,
      async () => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}.json`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getPost20100401AccountsSidJsonKey() {
  return ['2010-04-01', '/2010-04-01/Accounts/{Sid}.json', 'POST'] as const
}

export function usePost20100401AccountsSidJson<TError = unknown>(
  params: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      Static<typeof ApiV2010AccountSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPost20100401AccountsSidJsonKey()
  return {
    swrKey,
    ...useSWRMutation<
      Static<typeof ApiV2010AccountSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    >(
      swrKey,
      async (
        _key: Key,
        { arg }: { arg: { body?: unknown; options?: { headers?: Record<string, string> } } },
      ) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}.json`,
          {
            method: 'POST',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidAddressesJsonKey(
  params: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Addresses.json',
    params,
    keyArgs,
  ] as const
}

export function useGet20100401AccountsAccountSidAddressesJson<TError = unknown>(
  params: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidAddressesJsonKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Addresses.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidAddressesJson<TError = unknown>(
  params: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidAddressesJsonKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Addresses.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getPost20100401AccountsAccountSidAddressesJsonKey() {
  return ['2010-04-01', '/2010-04-01/Accounts/{AccountSid}/Addresses.json', 'POST'] as const
}

export function usePost20100401AccountsAccountSidAddressesJson<TError = unknown>(
  params: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      Static<typeof ApiV2010AccountAddressSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPost20100401AccountsAccountSidAddressesJsonKey()
  return {
    swrKey,
    ...useSWRMutation<
      Static<typeof ApiV2010AccountAddressSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    >(
      swrKey,
      async (
        _key: Key,
        { arg }: { arg: { body?: unknown; options?: { headers?: Record<string, string> } } },
      ) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Addresses.json`,
          {
            method: 'POST',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidAddressesSidJsonKey(
  params: string,
  params2: string,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Addresses/{Sid}.json',
    params,
    params2,
  ] as const
}

export function useGet20100401AccountsAccountSidAddressesSidJson<TError = unknown>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<Static<typeof ApiV2010AccountAddressSchema>, TError> & {
      swrKey?: Key
      enabled?: boolean
    }
    options?: { headers?: Record<string, string> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidAddressesSidJsonKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<Static<typeof ApiV2010AccountAddressSchema>, TError>(
      swrKey,
      async () => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Addresses/${encodeURIComponent(params2)}.json`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidAddressesSidJson<TError = unknown>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<Static<typeof ApiV2010AccountAddressSchema>, TError> & {
      swrKey?: Key
      enabled?: boolean
    }
    options?: { headers?: Record<string, string> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidAddressesSidJsonKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<Static<typeof ApiV2010AccountAddressSchema>, TError>(
      swrKey,
      async () => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Addresses/${encodeURIComponent(params2)}.json`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getPost20100401AccountsAccountSidAddressesSidJsonKey() {
  return ['2010-04-01', '/2010-04-01/Accounts/{AccountSid}/Addresses/{Sid}.json', 'POST'] as const
}

export function usePost20100401AccountsAccountSidAddressesSidJson<TError = unknown>(
  params: string,
  params2: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      Static<typeof ApiV2010AccountAddressSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPost20100401AccountsAccountSidAddressesSidJsonKey()
  return {
    swrKey,
    ...useSWRMutation<
      Static<typeof ApiV2010AccountAddressSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    >(
      swrKey,
      async (
        _key: Key,
        { arg }: { arg: { body?: unknown; options?: { headers?: Record<string, string> } } },
      ) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Addresses/${encodeURIComponent(params2)}.json`,
          {
            method: 'POST',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getDelete20100401AccountsAccountSidAddressesSidJsonKey() {
  return ['2010-04-01', '/2010-04-01/Accounts/{AccountSid}/Addresses/{Sid}.json', 'DELETE'] as const
}

export function useDelete20100401AccountsAccountSidAddressesSidJson<TError = unknown>(
  params: string,
  params2: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      void,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDelete20100401AccountsAccountSidAddressesSidJsonKey()
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
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Addresses/${encodeURIComponent(params2)}.json`,
          {
            method: 'DELETE',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidApplicationsJsonKey(
  params: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Applications.json',
    params,
    keyArgs,
  ] as const
}

export function useGet20100401AccountsAccountSidApplicationsJson<TError = unknown>(
  params: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidApplicationsJsonKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Applications.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidApplicationsJson<TError = unknown>(
  params: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidApplicationsJsonKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Applications.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getPost20100401AccountsAccountSidApplicationsJsonKey() {
  return ['2010-04-01', '/2010-04-01/Accounts/{AccountSid}/Applications.json', 'POST'] as const
}

export function usePost20100401AccountsAccountSidApplicationsJson<TError = unknown>(
  params: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      Static<typeof ApiV2010AccountApplicationSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPost20100401AccountsAccountSidApplicationsJsonKey()
  return {
    swrKey,
    ...useSWRMutation<
      Static<typeof ApiV2010AccountApplicationSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    >(
      swrKey,
      async (
        _key: Key,
        { arg }: { arg: { body?: unknown; options?: { headers?: Record<string, string> } } },
      ) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Applications.json`,
          {
            method: 'POST',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidApplicationsSidJsonKey(
  params: string,
  params2: string,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Applications/{Sid}.json',
    params,
    params2,
  ] as const
}

export function useGet20100401AccountsAccountSidApplicationsSidJson<TError = unknown>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<Static<typeof ApiV2010AccountApplicationSchema>, TError> & {
      swrKey?: Key
      enabled?: boolean
    }
    options?: { headers?: Record<string, string> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidApplicationsSidJsonKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<Static<typeof ApiV2010AccountApplicationSchema>, TError>(
      swrKey,
      async () => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Applications/${encodeURIComponent(params2)}.json`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidApplicationsSidJson<TError = unknown>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<Static<typeof ApiV2010AccountApplicationSchema>, TError> & {
      swrKey?: Key
      enabled?: boolean
    }
    options?: { headers?: Record<string, string> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidApplicationsSidJsonKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<Static<typeof ApiV2010AccountApplicationSchema>, TError>(
      swrKey,
      async () => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Applications/${encodeURIComponent(params2)}.json`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getPost20100401AccountsAccountSidApplicationsSidJsonKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Applications/{Sid}.json',
    'POST',
  ] as const
}

export function usePost20100401AccountsAccountSidApplicationsSidJson<TError = unknown>(
  params: string,
  params2: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      Static<typeof ApiV2010AccountApplicationSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPost20100401AccountsAccountSidApplicationsSidJsonKey()
  return {
    swrKey,
    ...useSWRMutation<
      Static<typeof ApiV2010AccountApplicationSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    >(
      swrKey,
      async (
        _key: Key,
        { arg }: { arg: { body?: unknown; options?: { headers?: Record<string, string> } } },
      ) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Applications/${encodeURIComponent(params2)}.json`,
          {
            method: 'POST',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getDelete20100401AccountsAccountSidApplicationsSidJsonKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Applications/{Sid}.json',
    'DELETE',
  ] as const
}

export function useDelete20100401AccountsAccountSidApplicationsSidJson<TError = unknown>(
  params: string,
  params2: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      void,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDelete20100401AccountsAccountSidApplicationsSidJsonKey()
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
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Applications/${encodeURIComponent(params2)}.json`,
          {
            method: 'DELETE',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidAuthorizedConnectAppsConnectAppSidJsonKey(
  params: string,
  params2: string,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/AuthorizedConnectApps/{ConnectAppSid}.json',
    params,
    params2,
  ] as const
}

export function useGet20100401AccountsAccountSidAuthorizedConnectAppsConnectAppSidJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<Static<typeof ApiV2010AccountAuthorizedConnectAppSchema>, TError> & {
      swrKey?: Key
      enabled?: boolean
    }
    options?: { headers?: Record<string, string> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidAuthorizedConnectAppsConnectAppSidJsonKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<Static<typeof ApiV2010AccountAuthorizedConnectAppSchema>, TError>(
      swrKey,
      async () => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/AuthorizedConnectApps/${encodeURIComponent(params2)}.json`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidAuthorizedConnectAppsConnectAppSidJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<Static<typeof ApiV2010AccountAuthorizedConnectAppSchema>, TError> & {
      swrKey?: Key
      enabled?: boolean
    }
    options?: { headers?: Record<string, string> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidAuthorizedConnectAppsConnectAppSidJsonKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<Static<typeof ApiV2010AccountAuthorizedConnectAppSchema>, TError>(
      swrKey,
      async () => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/AuthorizedConnectApps/${encodeURIComponent(params2)}.json`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidAuthorizedConnectAppsJsonKey(
  params: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/AuthorizedConnectApps.json',
    params,
    keyArgs,
  ] as const
}

export function useGet20100401AccountsAccountSidAuthorizedConnectAppsJson<TError = unknown>(
  params: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidAuthorizedConnectAppsJsonKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/AuthorizedConnectApps.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidAuthorizedConnectAppsJson<
  TError = unknown,
>(
  params: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidAuthorizedConnectAppsJsonKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/AuthorizedConnectApps.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidAvailablePhoneNumbersJsonKey(
  params: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers.json',
    params,
    keyArgs,
  ] as const
}

export function useGet20100401AccountsAccountSidAvailablePhoneNumbersJson<TError = unknown>(
  params: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidAvailablePhoneNumbersJsonKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/AvailablePhoneNumbers.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidAvailablePhoneNumbersJson<
  TError = unknown,
>(
  params: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidAvailablePhoneNumbersJsonKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/AvailablePhoneNumbers.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeJsonKey(
  params: string,
  params2: string,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}.json',
    params,
    params2,
  ] as const
}

export function useGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<
      Static<typeof ApiV2010AccountAvailablePhoneNumberCountrySchema>,
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeJsonKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<Static<typeof ApiV2010AccountAvailablePhoneNumberCountrySchema>, TError>(
      swrKey,
      async () => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/AvailablePhoneNumbers/${encodeURIComponent(params2)}.json`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<
      Static<typeof ApiV2010AccountAvailablePhoneNumberCountrySchema>,
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeJsonKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<Static<typeof ApiV2010AccountAvailablePhoneNumberCountrySchema>, TError>(
      swrKey,
      async () => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/AvailablePhoneNumbers/${encodeURIComponent(params2)}.json`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeLocalJsonKey(
  params: string,
  params2: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/Local.json',
    params,
    params2,
    keyArgs,
  ] as const
}

export function useGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeLocalJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeLocalJsonKey(
            params,
            params2,
            clientOptions,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/AvailablePhoneNumbers/${encodeURIComponent(params2)}/Local.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeLocalJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeLocalJsonKey(
            params,
            params2,
            clientOptions,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/AvailablePhoneNumbers/${encodeURIComponent(params2)}/Local.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMachineToMachineJsonKey(
  params: string,
  params2: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/MachineToMachine.json',
    params,
    params2,
    keyArgs,
  ] as const
}

export function useGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMachineToMachineJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMachineToMachineJsonKey(
            params,
            params2,
            clientOptions,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/AvailablePhoneNumbers/${encodeURIComponent(params2)}/MachineToMachine.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMachineToMachineJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMachineToMachineJsonKey(
            params,
            params2,
            clientOptions,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/AvailablePhoneNumbers/${encodeURIComponent(params2)}/MachineToMachine.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMobileJsonKey(
  params: string,
  params2: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/Mobile.json',
    params,
    params2,
    keyArgs,
  ] as const
}

export function useGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMobileJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMobileJsonKey(
            params,
            params2,
            clientOptions,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/AvailablePhoneNumbers/${encodeURIComponent(params2)}/Mobile.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMobileJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMobileJsonKey(
            params,
            params2,
            clientOptions,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/AvailablePhoneNumbers/${encodeURIComponent(params2)}/Mobile.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeNationalJsonKey(
  params: string,
  params2: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/National.json',
    params,
    params2,
    keyArgs,
  ] as const
}

export function useGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeNationalJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeNationalJsonKey(
            params,
            params2,
            clientOptions,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/AvailablePhoneNumbers/${encodeURIComponent(params2)}/National.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeNationalJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeNationalJsonKey(
            params,
            params2,
            clientOptions,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/AvailablePhoneNumbers/${encodeURIComponent(params2)}/National.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeSharedCostJsonKey(
  params: string,
  params2: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/SharedCost.json',
    params,
    params2,
    keyArgs,
  ] as const
}

export function useGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeSharedCostJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeSharedCostJsonKey(
            params,
            params2,
            clientOptions,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/AvailablePhoneNumbers/${encodeURIComponent(params2)}/SharedCost.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeSharedCostJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeSharedCostJsonKey(
            params,
            params2,
            clientOptions,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/AvailablePhoneNumbers/${encodeURIComponent(params2)}/SharedCost.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeTollFreeJsonKey(
  params: string,
  params2: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/TollFree.json',
    params,
    params2,
    keyArgs,
  ] as const
}

export function useGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeTollFreeJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeTollFreeJsonKey(
            params,
            params2,
            clientOptions,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/AvailablePhoneNumbers/${encodeURIComponent(params2)}/TollFree.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeTollFreeJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeTollFreeJsonKey(
            params,
            params2,
            clientOptions,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/AvailablePhoneNumbers/${encodeURIComponent(params2)}/TollFree.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeVoipJsonKey(
  params: string,
  params2: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/Voip.json',
    params,
    params2,
    keyArgs,
  ] as const
}

export function useGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeVoipJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeVoipJsonKey(
            params,
            params2,
            clientOptions,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/AvailablePhoneNumbers/${encodeURIComponent(params2)}/Voip.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeVoipJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeVoipJsonKey(
            params,
            params2,
            clientOptions,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/AvailablePhoneNumbers/${encodeURIComponent(params2)}/Voip.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidBalanceJsonKey(params: string) {
  return ['2010-04-01', '/2010-04-01/Accounts/{AccountSid}/Balance.json', params] as const
}

export function useGet20100401AccountsAccountSidBalanceJson<TError = unknown>(
  params: string,
  options?: {
    swr?: SWRConfiguration<Static<typeof ApiV2010AccountBalanceSchema>, TError> & {
      swrKey?: Key
      enabled?: boolean
    }
    options?: { headers?: Record<string, string> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidBalanceJsonKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<Static<typeof ApiV2010AccountBalanceSchema>, TError>(
      swrKey,
      async () => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Balance.json`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidBalanceJson<TError = unknown>(
  params: string,
  options?: {
    swr?: SWRConfiguration<Static<typeof ApiV2010AccountBalanceSchema>, TError> & {
      swrKey?: Key
      enabled?: boolean
    }
    options?: { headers?: Record<string, string> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidBalanceJsonKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<Static<typeof ApiV2010AccountBalanceSchema>, TError>(
      swrKey,
      async () => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Balance.json`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidCallsJsonKey(
  params: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return ['2010-04-01', '/2010-04-01/Accounts/{AccountSid}/Calls.json', params, keyArgs] as const
}

export function useGet20100401AccountsAccountSidCallsJson<TError = unknown>(
  params: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidCallsJsonKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Calls.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidCallsJson<TError = unknown>(
  params: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidCallsJsonKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Calls.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getPost20100401AccountsAccountSidCallsJsonKey() {
  return ['2010-04-01', '/2010-04-01/Accounts/{AccountSid}/Calls.json', 'POST'] as const
}

export function usePost20100401AccountsAccountSidCallsJson<TError = unknown>(
  params: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      Static<typeof ApiV2010AccountCallSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPost20100401AccountsAccountSidCallsJsonKey()
  return {
    swrKey,
    ...useSWRMutation<
      Static<typeof ApiV2010AccountCallSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    >(
      swrKey,
      async (
        _key: Key,
        { arg }: { arg: { body?: unknown; options?: { headers?: Record<string, string> } } },
      ) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Calls.json`,
          {
            method: 'POST',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidCallsSidJsonKey(params: string, params2: string) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Calls/{Sid}.json',
    params,
    params2,
  ] as const
}

export function useGet20100401AccountsAccountSidCallsSidJson<TError = unknown>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<Static<typeof ApiV2010AccountCallSchema>, TError> & {
      swrKey?: Key
      enabled?: boolean
    }
    options?: { headers?: Record<string, string> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidCallsSidJsonKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<Static<typeof ApiV2010AccountCallSchema>, TError>(
      swrKey,
      async () => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Calls/${encodeURIComponent(params2)}.json`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidCallsSidJson<TError = unknown>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<Static<typeof ApiV2010AccountCallSchema>, TError> & {
      swrKey?: Key
      enabled?: boolean
    }
    options?: { headers?: Record<string, string> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidCallsSidJsonKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<Static<typeof ApiV2010AccountCallSchema>, TError>(
      swrKey,
      async () => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Calls/${encodeURIComponent(params2)}.json`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getPost20100401AccountsAccountSidCallsSidJsonKey() {
  return ['2010-04-01', '/2010-04-01/Accounts/{AccountSid}/Calls/{Sid}.json', 'POST'] as const
}

export function usePost20100401AccountsAccountSidCallsSidJson<TError = unknown>(
  params: string,
  params2: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      Static<typeof ApiV2010AccountCallSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPost20100401AccountsAccountSidCallsSidJsonKey()
  return {
    swrKey,
    ...useSWRMutation<
      Static<typeof ApiV2010AccountCallSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    >(
      swrKey,
      async (
        _key: Key,
        { arg }: { arg: { body?: unknown; options?: { headers?: Record<string, string> } } },
      ) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Calls/${encodeURIComponent(params2)}.json`,
          {
            method: 'POST',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getDelete20100401AccountsAccountSidCallsSidJsonKey() {
  return ['2010-04-01', '/2010-04-01/Accounts/{AccountSid}/Calls/{Sid}.json', 'DELETE'] as const
}

export function useDelete20100401AccountsAccountSidCallsSidJson<TError = unknown>(
  params: string,
  params2: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      void,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDelete20100401AccountsAccountSidCallsSidJsonKey()
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
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Calls/${encodeURIComponent(params2)}.json`,
          {
            method: 'DELETE',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidCallsCallSidEventsJsonKey(
  params: string,
  params2: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Events.json',
    params,
    params2,
    keyArgs,
  ] as const
}

export function useGet20100401AccountsAccountSidCallsCallSidEventsJson<TError = unknown>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidCallsCallSidEventsJsonKey(params, params2, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Calls/${encodeURIComponent(params2)}/Events.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidCallsCallSidEventsJson<TError = unknown>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidCallsCallSidEventsJsonKey(params, params2, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Calls/${encodeURIComponent(params2)}/Events.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidCallsCallSidNotificationsSidJsonKey(
  params: string,
  params2: string,
  params3: string,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Notifications/{Sid}.json',
    params,
    params2,
    params3,
  ] as const
}

export function useGet20100401AccountsAccountSidCallsCallSidNotificationsSidJson<TError = unknown>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    swr?: SWRConfiguration<
      Static<typeof ApiV2010AccountCallCallNotificationInstanceSchema>,
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidCallsCallSidNotificationsSidJsonKey(
            params,
            params2,
            params3,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<Static<typeof ApiV2010AccountCallCallNotificationInstanceSchema>, TError>(
      swrKey,
      async () => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Calls/${encodeURIComponent(params2)}/Notifications/${encodeURIComponent(params3)}.json`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidCallsCallSidNotificationsSidJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    swr?: SWRConfiguration<
      Static<typeof ApiV2010AccountCallCallNotificationInstanceSchema>,
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidCallsCallSidNotificationsSidJsonKey(
            params,
            params2,
            params3,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<Static<typeof ApiV2010AccountCallCallNotificationInstanceSchema>, TError>(
      swrKey,
      async () => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Calls/${encodeURIComponent(params2)}/Notifications/${encodeURIComponent(params3)}.json`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidCallsCallSidNotificationsJsonKey(
  params: string,
  params2: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Notifications.json',
    params,
    params2,
    keyArgs,
  ] as const
}

export function useGet20100401AccountsAccountSidCallsCallSidNotificationsJson<TError = unknown>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidCallsCallSidNotificationsJsonKey(
            params,
            params2,
            clientOptions,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Calls/${encodeURIComponent(params2)}/Notifications.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidCallsCallSidNotificationsJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidCallsCallSidNotificationsJsonKey(
            params,
            params2,
            clientOptions,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Calls/${encodeURIComponent(params2)}/Notifications.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidCallsCallSidRecordingsJsonKey(
  params: string,
  params2: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Recordings.json',
    params,
    params2,
    keyArgs,
  ] as const
}

export function useGet20100401AccountsAccountSidCallsCallSidRecordingsJson<TError = unknown>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidCallsCallSidRecordingsJsonKey(
            params,
            params2,
            clientOptions,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Calls/${encodeURIComponent(params2)}/Recordings.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidCallsCallSidRecordingsJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidCallsCallSidRecordingsJsonKey(
            params,
            params2,
            clientOptions,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Calls/${encodeURIComponent(params2)}/Recordings.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getPost20100401AccountsAccountSidCallsCallSidRecordingsJsonKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Recordings.json',
    'POST',
  ] as const
}

export function usePost20100401AccountsAccountSidCallsCallSidRecordingsJson<TError = unknown>(
  params: string,
  params2: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      Static<typeof ApiV2010AccountCallCallRecordingSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPost20100401AccountsAccountSidCallsCallSidRecordingsJsonKey()
  return {
    swrKey,
    ...useSWRMutation<
      Static<typeof ApiV2010AccountCallCallRecordingSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    >(
      swrKey,
      async (
        _key: Key,
        { arg }: { arg: { body?: unknown; options?: { headers?: Record<string, string> } } },
      ) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Calls/${encodeURIComponent(params2)}/Recordings.json`,
          {
            method: 'POST',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidCallsCallSidRecordingsSidJsonKey(
  params: string,
  params2: string,
  params3: string,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Recordings/{Sid}.json',
    params,
    params2,
    params3,
  ] as const
}

export function useGet20100401AccountsAccountSidCallsCallSidRecordingsSidJson<TError = unknown>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    swr?: SWRConfiguration<Static<typeof ApiV2010AccountCallCallRecordingSchema>, TError> & {
      swrKey?: Key
      enabled?: boolean
    }
    options?: { headers?: Record<string, string> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidCallsCallSidRecordingsSidJsonKey(params, params2, params3)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<Static<typeof ApiV2010AccountCallCallRecordingSchema>, TError>(
      swrKey,
      async () => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Calls/${encodeURIComponent(params2)}/Recordings/${encodeURIComponent(params3)}.json`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidCallsCallSidRecordingsSidJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    swr?: SWRConfiguration<Static<typeof ApiV2010AccountCallCallRecordingSchema>, TError> & {
      swrKey?: Key
      enabled?: boolean
    }
    options?: { headers?: Record<string, string> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidCallsCallSidRecordingsSidJsonKey(params, params2, params3)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<Static<typeof ApiV2010AccountCallCallRecordingSchema>, TError>(
      swrKey,
      async () => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Calls/${encodeURIComponent(params2)}/Recordings/${encodeURIComponent(params3)}.json`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getPost20100401AccountsAccountSidCallsCallSidRecordingsSidJsonKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Recordings/{Sid}.json',
    'POST',
  ] as const
}

export function usePost20100401AccountsAccountSidCallsCallSidRecordingsSidJson<TError = unknown>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      Static<typeof ApiV2010AccountCallCallRecordingSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPost20100401AccountsAccountSidCallsCallSidRecordingsSidJsonKey()
  return {
    swrKey,
    ...useSWRMutation<
      Static<typeof ApiV2010AccountCallCallRecordingSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    >(
      swrKey,
      async (
        _key: Key,
        { arg }: { arg: { body?: unknown; options?: { headers?: Record<string, string> } } },
      ) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Calls/${encodeURIComponent(params2)}/Recordings/${encodeURIComponent(params3)}.json`,
          {
            method: 'POST',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getDelete20100401AccountsAccountSidCallsCallSidRecordingsSidJsonKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Recordings/{Sid}.json',
    'DELETE',
  ] as const
}

export function useDelete20100401AccountsAccountSidCallsCallSidRecordingsSidJson<TError = unknown>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      void,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDelete20100401AccountsAccountSidCallsCallSidRecordingsSidJsonKey()
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
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Calls/${encodeURIComponent(params2)}/Recordings/${encodeURIComponent(params3)}.json`,
          {
            method: 'DELETE',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidConferencesSidJsonKey(
  params: string,
  params2: string,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Conferences/{Sid}.json',
    params,
    params2,
  ] as const
}

export function useGet20100401AccountsAccountSidConferencesSidJson<TError = unknown>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<Static<typeof ApiV2010AccountConferenceSchema>, TError> & {
      swrKey?: Key
      enabled?: boolean
    }
    options?: { headers?: Record<string, string> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidConferencesSidJsonKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<Static<typeof ApiV2010AccountConferenceSchema>, TError>(
      swrKey,
      async () => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Conferences/${encodeURIComponent(params2)}.json`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidConferencesSidJson<TError = unknown>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<Static<typeof ApiV2010AccountConferenceSchema>, TError> & {
      swrKey?: Key
      enabled?: boolean
    }
    options?: { headers?: Record<string, string> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidConferencesSidJsonKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<Static<typeof ApiV2010AccountConferenceSchema>, TError>(
      swrKey,
      async () => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Conferences/${encodeURIComponent(params2)}.json`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getPost20100401AccountsAccountSidConferencesSidJsonKey() {
  return ['2010-04-01', '/2010-04-01/Accounts/{AccountSid}/Conferences/{Sid}.json', 'POST'] as const
}

export function usePost20100401AccountsAccountSidConferencesSidJson<TError = unknown>(
  params: string,
  params2: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      Static<typeof ApiV2010AccountConferenceSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPost20100401AccountsAccountSidConferencesSidJsonKey()
  return {
    swrKey,
    ...useSWRMutation<
      Static<typeof ApiV2010AccountConferenceSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    >(
      swrKey,
      async (
        _key: Key,
        { arg }: { arg: { body?: unknown; options?: { headers?: Record<string, string> } } },
      ) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Conferences/${encodeURIComponent(params2)}.json`,
          {
            method: 'POST',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidConferencesJsonKey(
  params: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Conferences.json',
    params,
    keyArgs,
  ] as const
}

export function useGet20100401AccountsAccountSidConferencesJson<TError = unknown>(
  params: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidConferencesJsonKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Conferences.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidConferencesJson<TError = unknown>(
  params: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidConferencesJsonKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Conferences.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidConferencesConferenceSidRecordingsJsonKey(
  params: string,
  params2: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Recordings.json',
    params,
    params2,
    keyArgs,
  ] as const
}

export function useGet20100401AccountsAccountSidConferencesConferenceSidRecordingsJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidConferencesConferenceSidRecordingsJsonKey(
            params,
            params2,
            clientOptions,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Conferences/${encodeURIComponent(params2)}/Recordings.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidConferencesConferenceSidRecordingsJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidConferencesConferenceSidRecordingsJsonKey(
            params,
            params2,
            clientOptions,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Conferences/${encodeURIComponent(params2)}/Recordings.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJsonKey(
  params: string,
  params2: string,
  params3: string,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Recordings/{Sid}.json',
    params,
    params2,
    params3,
  ] as const
}

export function useGet20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    swr?: SWRConfiguration<
      Static<typeof ApiV2010AccountConferenceConferenceRecordingSchema>,
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJsonKey(
            params,
            params2,
            params3,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<Static<typeof ApiV2010AccountConferenceConferenceRecordingSchema>, TError>(
      swrKey,
      async () => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Conferences/${encodeURIComponent(params2)}/Recordings/${encodeURIComponent(params3)}.json`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    swr?: SWRConfiguration<
      Static<typeof ApiV2010AccountConferenceConferenceRecordingSchema>,
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJsonKey(
            params,
            params2,
            params3,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<Static<typeof ApiV2010AccountConferenceConferenceRecordingSchema>, TError>(
      swrKey,
      async () => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Conferences/${encodeURIComponent(params2)}/Recordings/${encodeURIComponent(params3)}.json`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getPost20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJsonKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Recordings/{Sid}.json',
    'POST',
  ] as const
}

export function usePost20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      Static<typeof ApiV2010AccountConferenceConferenceRecordingSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey =
    customKey ?? getPost20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJsonKey()
  return {
    swrKey,
    ...useSWRMutation<
      Static<typeof ApiV2010AccountConferenceConferenceRecordingSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    >(
      swrKey,
      async (
        _key: Key,
        { arg }: { arg: { body?: unknown; options?: { headers?: Record<string, string> } } },
      ) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Conferences/${encodeURIComponent(params2)}/Recordings/${encodeURIComponent(params3)}.json`,
          {
            method: 'POST',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getDelete20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJsonKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Recordings/{Sid}.json',
    'DELETE',
  ] as const
}

export function useDelete20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      void,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey =
    customKey ?? getDelete20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJsonKey()
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
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Conferences/${encodeURIComponent(params2)}/Recordings/${encodeURIComponent(params3)}.json`,
          {
            method: 'DELETE',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidConnectAppsSidJsonKey(
  params: string,
  params2: string,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/ConnectApps/{Sid}.json',
    params,
    params2,
  ] as const
}

export function useGet20100401AccountsAccountSidConnectAppsSidJson<TError = unknown>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<Static<typeof ApiV2010AccountConnectAppSchema>, TError> & {
      swrKey?: Key
      enabled?: boolean
    }
    options?: { headers?: Record<string, string> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidConnectAppsSidJsonKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<Static<typeof ApiV2010AccountConnectAppSchema>, TError>(
      swrKey,
      async () => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/ConnectApps/${encodeURIComponent(params2)}.json`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidConnectAppsSidJson<TError = unknown>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<Static<typeof ApiV2010AccountConnectAppSchema>, TError> & {
      swrKey?: Key
      enabled?: boolean
    }
    options?: { headers?: Record<string, string> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidConnectAppsSidJsonKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<Static<typeof ApiV2010AccountConnectAppSchema>, TError>(
      swrKey,
      async () => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/ConnectApps/${encodeURIComponent(params2)}.json`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getPost20100401AccountsAccountSidConnectAppsSidJsonKey() {
  return ['2010-04-01', '/2010-04-01/Accounts/{AccountSid}/ConnectApps/{Sid}.json', 'POST'] as const
}

export function usePost20100401AccountsAccountSidConnectAppsSidJson<TError = unknown>(
  params: string,
  params2: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      Static<typeof ApiV2010AccountConnectAppSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPost20100401AccountsAccountSidConnectAppsSidJsonKey()
  return {
    swrKey,
    ...useSWRMutation<
      Static<typeof ApiV2010AccountConnectAppSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    >(
      swrKey,
      async (
        _key: Key,
        { arg }: { arg: { body?: unknown; options?: { headers?: Record<string, string> } } },
      ) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/ConnectApps/${encodeURIComponent(params2)}.json`,
          {
            method: 'POST',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getDelete20100401AccountsAccountSidConnectAppsSidJsonKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/ConnectApps/{Sid}.json',
    'DELETE',
  ] as const
}

export function useDelete20100401AccountsAccountSidConnectAppsSidJson<TError = unknown>(
  params: string,
  params2: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      void,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDelete20100401AccountsAccountSidConnectAppsSidJsonKey()
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
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/ConnectApps/${encodeURIComponent(params2)}.json`,
          {
            method: 'DELETE',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidConnectAppsJsonKey(
  params: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/ConnectApps.json',
    params,
    keyArgs,
  ] as const
}

export function useGet20100401AccountsAccountSidConnectAppsJson<TError = unknown>(
  params: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidConnectAppsJsonKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/ConnectApps.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidConnectAppsJson<TError = unknown>(
  params: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidConnectAppsJsonKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/ConnectApps.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidAddressesAddressSidDependentPhoneNumbersJsonKey(
  params: string,
  params2: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Addresses/{AddressSid}/DependentPhoneNumbers.json',
    params,
    params2,
    keyArgs,
  ] as const
}

export function useGet20100401AccountsAccountSidAddressesAddressSidDependentPhoneNumbersJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidAddressesAddressSidDependentPhoneNumbersJsonKey(
            params,
            params2,
            clientOptions,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Addresses/${encodeURIComponent(params2)}/DependentPhoneNumbers.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidAddressesAddressSidDependentPhoneNumbersJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidAddressesAddressSidDependentPhoneNumbersJsonKey(
            params,
            params2,
            clientOptions,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Addresses/${encodeURIComponent(params2)}/DependentPhoneNumbers.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidIncomingPhoneNumbersSidJsonKey(
  params: string,
  params2: string,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{Sid}.json',
    params,
    params2,
  ] as const
}

export function useGet20100401AccountsAccountSidIncomingPhoneNumbersSidJson<TError = unknown>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<Static<typeof ApiV2010AccountIncomingPhoneNumberSchema>, TError> & {
      swrKey?: Key
      enabled?: boolean
    }
    options?: { headers?: Record<string, string> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidIncomingPhoneNumbersSidJsonKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<Static<typeof ApiV2010AccountIncomingPhoneNumberSchema>, TError>(
      swrKey,
      async () => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/IncomingPhoneNumbers/${encodeURIComponent(params2)}.json`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidIncomingPhoneNumbersSidJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<Static<typeof ApiV2010AccountIncomingPhoneNumberSchema>, TError> & {
      swrKey?: Key
      enabled?: boolean
    }
    options?: { headers?: Record<string, string> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidIncomingPhoneNumbersSidJsonKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<Static<typeof ApiV2010AccountIncomingPhoneNumberSchema>, TError>(
      swrKey,
      async () => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/IncomingPhoneNumbers/${encodeURIComponent(params2)}.json`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getPost20100401AccountsAccountSidIncomingPhoneNumbersSidJsonKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{Sid}.json',
    'POST',
  ] as const
}

export function usePost20100401AccountsAccountSidIncomingPhoneNumbersSidJson<TError = unknown>(
  params: string,
  params2: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      Static<typeof ApiV2010AccountIncomingPhoneNumberSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPost20100401AccountsAccountSidIncomingPhoneNumbersSidJsonKey()
  return {
    swrKey,
    ...useSWRMutation<
      Static<typeof ApiV2010AccountIncomingPhoneNumberSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    >(
      swrKey,
      async (
        _key: Key,
        { arg }: { arg: { body?: unknown; options?: { headers?: Record<string, string> } } },
      ) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/IncomingPhoneNumbers/${encodeURIComponent(params2)}.json`,
          {
            method: 'POST',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getDelete20100401AccountsAccountSidIncomingPhoneNumbersSidJsonKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{Sid}.json',
    'DELETE',
  ] as const
}

export function useDelete20100401AccountsAccountSidIncomingPhoneNumbersSidJson<TError = unknown>(
  params: string,
  params2: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      void,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDelete20100401AccountsAccountSidIncomingPhoneNumbersSidJsonKey()
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
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/IncomingPhoneNumbers/${encodeURIComponent(params2)}.json`,
          {
            method: 'DELETE',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidIncomingPhoneNumbersJsonKey(
  params: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers.json',
    params,
    keyArgs,
  ] as const
}

export function useGet20100401AccountsAccountSidIncomingPhoneNumbersJson<TError = unknown>(
  params: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidIncomingPhoneNumbersJsonKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/IncomingPhoneNumbers.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidIncomingPhoneNumbersJson<TError = unknown>(
  params: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidIncomingPhoneNumbersJsonKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/IncomingPhoneNumbers.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getPost20100401AccountsAccountSidIncomingPhoneNumbersJsonKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers.json',
    'POST',
  ] as const
}

export function usePost20100401AccountsAccountSidIncomingPhoneNumbersJson<TError = unknown>(
  params: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      Static<typeof ApiV2010AccountIncomingPhoneNumberSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPost20100401AccountsAccountSidIncomingPhoneNumbersJsonKey()
  return {
    swrKey,
    ...useSWRMutation<
      Static<typeof ApiV2010AccountIncomingPhoneNumberSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    >(
      swrKey,
      async (
        _key: Key,
        { arg }: { arg: { body?: unknown; options?: { headers?: Record<string, string> } } },
      ) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/IncomingPhoneNumbers.json`,
          {
            method: 'POST',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsSidJsonKey(
  params: string,
  params2: string,
  params3: string,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{ResourceSid}/AssignedAddOns/{Sid}.json',
    params,
    params2,
    params3,
  ] as const
}

export function useGet20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsSidJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    swr?: SWRConfiguration<
      Static<typeof ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnSchema>,
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsSidJsonKey(
            params,
            params2,
            params3,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Static<typeof ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnSchema>,
      TError
    >(
      swrKey,
      async () => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/IncomingPhoneNumbers/${encodeURIComponent(params2)}/AssignedAddOns/${encodeURIComponent(params3)}.json`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsSidJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    swr?: SWRConfiguration<
      Static<typeof ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnSchema>,
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsSidJsonKey(
            params,
            params2,
            params3,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Static<typeof ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnSchema>,
      TError
    >(
      swrKey,
      async () => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/IncomingPhoneNumbers/${encodeURIComponent(params2)}/AssignedAddOns/${encodeURIComponent(params3)}.json`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getDelete20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsSidJsonKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{ResourceSid}/AssignedAddOns/{Sid}.json',
    'DELETE',
  ] as const
}

export function useDelete20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsSidJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      void,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey =
    customKey ??
    getDelete20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsSidJsonKey()
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
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/IncomingPhoneNumbers/${encodeURIComponent(params2)}/AssignedAddOns/${encodeURIComponent(params3)}.json`,
          {
            method: 'DELETE',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsJsonKey(
  params: string,
  params2: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{ResourceSid}/AssignedAddOns.json',
    params,
    params2,
    keyArgs,
  ] as const
}

export function useGet20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsJsonKey(
            params,
            params2,
            clientOptions,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/IncomingPhoneNumbers/${encodeURIComponent(params2)}/AssignedAddOns.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsJsonKey(
            params,
            params2,
            clientOptions,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/IncomingPhoneNumbers/${encodeURIComponent(params2)}/AssignedAddOns.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getPost20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsJsonKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{ResourceSid}/AssignedAddOns.json',
    'POST',
  ] as const
}

export function usePost20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      Static<typeof ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey =
    customKey ??
    getPost20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsJsonKey()
  return {
    swrKey,
    ...useSWRMutation<
      Static<typeof ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    >(
      swrKey,
      async (
        _key: Key,
        { arg }: { arg: { body?: unknown; options?: { headers?: Record<string, string> } } },
      ) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/IncomingPhoneNumbers/${encodeURIComponent(params2)}/AssignedAddOns.json`,
          {
            method: 'POST',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsAssignedAddOnSidExtensionsSidJsonKey(
  params: string,
  params2: string,
  params3: string,
  params4: string,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{ResourceSid}/AssignedAddOns/{AssignedAddOnSid}/Extensions/{Sid}.json',
    params,
    params2,
    params3,
    params4,
  ] as const
}

export function useGet20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsAssignedAddOnSidExtensionsSidJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  params4: string,
  options?: {
    swr?: SWRConfiguration<
      Static<
        typeof ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnIncomingPhoneNumberAssignedAddOnExtensionSchema
      >,
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsAssignedAddOnSidExtensionsSidJsonKey(
            params,
            params2,
            params3,
            params4,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Static<
        typeof ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnIncomingPhoneNumberAssignedAddOnExtensionSchema
      >,
      TError
    >(
      swrKey,
      async () => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/IncomingPhoneNumbers/${encodeURIComponent(params2)}/AssignedAddOns/${encodeURIComponent(params3)}/Extensions/${encodeURIComponent(params4)}.json`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsAssignedAddOnSidExtensionsSidJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  params4: string,
  options?: {
    swr?: SWRConfiguration<
      Static<
        typeof ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnIncomingPhoneNumberAssignedAddOnExtensionSchema
      >,
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsAssignedAddOnSidExtensionsSidJsonKey(
            params,
            params2,
            params3,
            params4,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Static<
        typeof ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberAssignedAddOnIncomingPhoneNumberAssignedAddOnExtensionSchema
      >,
      TError
    >(
      swrKey,
      async () => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/IncomingPhoneNumbers/${encodeURIComponent(params2)}/AssignedAddOns/${encodeURIComponent(params3)}/Extensions/${encodeURIComponent(params4)}.json`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsAssignedAddOnSidExtensionsJsonKey(
  params: string,
  params2: string,
  params3: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{ResourceSid}/AssignedAddOns/{AssignedAddOnSid}/Extensions.json',
    params,
    params2,
    params3,
    keyArgs,
  ] as const
}

export function useGet20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsAssignedAddOnSidExtensionsJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsAssignedAddOnSidExtensionsJsonKey(
            params,
            params2,
            params3,
            clientOptions,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/IncomingPhoneNumbers/${encodeURIComponent(params2)}/AssignedAddOns/${encodeURIComponent(params3)}/Extensions.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsAssignedAddOnSidExtensionsJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsAssignedAddOnSidExtensionsJsonKey(
            params,
            params2,
            params3,
            clientOptions,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/IncomingPhoneNumbers/${encodeURIComponent(params2)}/AssignedAddOns/${encodeURIComponent(params3)}/Extensions.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidIncomingPhoneNumbersLocalJsonKey(
  params: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/Local.json',
    params,
    keyArgs,
  ] as const
}

export function useGet20100401AccountsAccountSidIncomingPhoneNumbersLocalJson<TError = unknown>(
  params: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidIncomingPhoneNumbersLocalJsonKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/IncomingPhoneNumbers/Local.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidIncomingPhoneNumbersLocalJson<
  TError = unknown,
>(
  params: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidIncomingPhoneNumbersLocalJsonKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/IncomingPhoneNumbers/Local.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getPost20100401AccountsAccountSidIncomingPhoneNumbersLocalJsonKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/Local.json',
    'POST',
  ] as const
}

export function usePost20100401AccountsAccountSidIncomingPhoneNumbersLocalJson<TError = unknown>(
  params: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      Static<typeof ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberLocalSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPost20100401AccountsAccountSidIncomingPhoneNumbersLocalJsonKey()
  return {
    swrKey,
    ...useSWRMutation<
      Static<typeof ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberLocalSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    >(
      swrKey,
      async (
        _key: Key,
        { arg }: { arg: { body?: unknown; options?: { headers?: Record<string, string> } } },
      ) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/IncomingPhoneNumbers/Local.json`,
          {
            method: 'POST',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidIncomingPhoneNumbersMobileJsonKey(
  params: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/Mobile.json',
    params,
    keyArgs,
  ] as const
}

export function useGet20100401AccountsAccountSidIncomingPhoneNumbersMobileJson<TError = unknown>(
  params: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidIncomingPhoneNumbersMobileJsonKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/IncomingPhoneNumbers/Mobile.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidIncomingPhoneNumbersMobileJson<
  TError = unknown,
>(
  params: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidIncomingPhoneNumbersMobileJsonKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/IncomingPhoneNumbers/Mobile.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getPost20100401AccountsAccountSidIncomingPhoneNumbersMobileJsonKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/Mobile.json',
    'POST',
  ] as const
}

export function usePost20100401AccountsAccountSidIncomingPhoneNumbersMobileJson<TError = unknown>(
  params: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      Static<typeof ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberMobileSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPost20100401AccountsAccountSidIncomingPhoneNumbersMobileJsonKey()
  return {
    swrKey,
    ...useSWRMutation<
      Static<typeof ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberMobileSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    >(
      swrKey,
      async (
        _key: Key,
        { arg }: { arg: { body?: unknown; options?: { headers?: Record<string, string> } } },
      ) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/IncomingPhoneNumbers/Mobile.json`,
          {
            method: 'POST',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidIncomingPhoneNumbersTollFreeJsonKey(
  params: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/TollFree.json',
    params,
    keyArgs,
  ] as const
}

export function useGet20100401AccountsAccountSidIncomingPhoneNumbersTollFreeJson<TError = unknown>(
  params: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidIncomingPhoneNumbersTollFreeJsonKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/IncomingPhoneNumbers/TollFree.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidIncomingPhoneNumbersTollFreeJson<
  TError = unknown,
>(
  params: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidIncomingPhoneNumbersTollFreeJsonKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/IncomingPhoneNumbers/TollFree.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getPost20100401AccountsAccountSidIncomingPhoneNumbersTollFreeJsonKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/TollFree.json',
    'POST',
  ] as const
}

export function usePost20100401AccountsAccountSidIncomingPhoneNumbersTollFreeJson<TError = unknown>(
  params: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      Static<typeof ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberTollFreeSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPost20100401AccountsAccountSidIncomingPhoneNumbersTollFreeJsonKey()
  return {
    swrKey,
    ...useSWRMutation<
      Static<typeof ApiV2010AccountIncomingPhoneNumberIncomingPhoneNumberTollFreeSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    >(
      swrKey,
      async (
        _key: Key,
        { arg }: { arg: { body?: unknown; options?: { headers?: Record<string, string> } } },
      ) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/IncomingPhoneNumbers/TollFree.json`,
          {
            method: 'POST',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidKeysSidJsonKey(params: string, params2: string) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Keys/{Sid}.json',
    params,
    params2,
  ] as const
}

export function useGet20100401AccountsAccountSidKeysSidJson<TError = unknown>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<Static<typeof ApiV2010AccountKeySchema>, TError> & {
      swrKey?: Key
      enabled?: boolean
    }
    options?: { headers?: Record<string, string> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidKeysSidJsonKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<Static<typeof ApiV2010AccountKeySchema>, TError>(
      swrKey,
      async () => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Keys/${encodeURIComponent(params2)}.json`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidKeysSidJson<TError = unknown>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<Static<typeof ApiV2010AccountKeySchema>, TError> & {
      swrKey?: Key
      enabled?: boolean
    }
    options?: { headers?: Record<string, string> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidKeysSidJsonKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<Static<typeof ApiV2010AccountKeySchema>, TError>(
      swrKey,
      async () => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Keys/${encodeURIComponent(params2)}.json`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getPost20100401AccountsAccountSidKeysSidJsonKey() {
  return ['2010-04-01', '/2010-04-01/Accounts/{AccountSid}/Keys/{Sid}.json', 'POST'] as const
}

export function usePost20100401AccountsAccountSidKeysSidJson<TError = unknown>(
  params: string,
  params2: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      Static<typeof ApiV2010AccountKeySchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPost20100401AccountsAccountSidKeysSidJsonKey()
  return {
    swrKey,
    ...useSWRMutation<
      Static<typeof ApiV2010AccountKeySchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    >(
      swrKey,
      async (
        _key: Key,
        { arg }: { arg: { body?: unknown; options?: { headers?: Record<string, string> } } },
      ) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Keys/${encodeURIComponent(params2)}.json`,
          {
            method: 'POST',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getDelete20100401AccountsAccountSidKeysSidJsonKey() {
  return ['2010-04-01', '/2010-04-01/Accounts/{AccountSid}/Keys/{Sid}.json', 'DELETE'] as const
}

export function useDelete20100401AccountsAccountSidKeysSidJson<TError = unknown>(
  params: string,
  params2: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      void,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDelete20100401AccountsAccountSidKeysSidJsonKey()
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
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Keys/${encodeURIComponent(params2)}.json`,
          {
            method: 'DELETE',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidKeysJsonKey(
  params: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return ['2010-04-01', '/2010-04-01/Accounts/{AccountSid}/Keys.json', params, keyArgs] as const
}

export function useGet20100401AccountsAccountSidKeysJson<TError = unknown>(
  params: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidKeysJsonKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Keys.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidKeysJson<TError = unknown>(
  params: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidKeysJsonKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Keys.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getPost20100401AccountsAccountSidKeysJsonKey() {
  return ['2010-04-01', '/2010-04-01/Accounts/{AccountSid}/Keys.json', 'POST'] as const
}

export function usePost20100401AccountsAccountSidKeysJson<TError = unknown>(
  params: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      Static<typeof ApiV2010AccountNewKeySchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPost20100401AccountsAccountSidKeysJsonKey()
  return {
    swrKey,
    ...useSWRMutation<
      Static<typeof ApiV2010AccountNewKeySchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    >(
      swrKey,
      async (
        _key: Key,
        { arg }: { arg: { body?: unknown; options?: { headers?: Record<string, string> } } },
      ) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Keys.json`,
          {
            method: 'POST',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidMessagesMessageSidMediaSidJsonKey(
  params: string,
  params2: string,
  params3: string,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Messages/{MessageSid}/Media/{Sid}.json',
    params,
    params2,
    params3,
  ] as const
}

export function useGet20100401AccountsAccountSidMessagesMessageSidMediaSidJson<TError = unknown>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    swr?: SWRConfiguration<Static<typeof ApiV2010AccountMessageMediaSchema>, TError> & {
      swrKey?: Key
      enabled?: boolean
    }
    options?: { headers?: Record<string, string> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidMessagesMessageSidMediaSidJsonKey(
            params,
            params2,
            params3,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<Static<typeof ApiV2010AccountMessageMediaSchema>, TError>(
      swrKey,
      async () => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Messages/${encodeURIComponent(params2)}/Media/${encodeURIComponent(params3)}.json`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidMessagesMessageSidMediaSidJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    swr?: SWRConfiguration<Static<typeof ApiV2010AccountMessageMediaSchema>, TError> & {
      swrKey?: Key
      enabled?: boolean
    }
    options?: { headers?: Record<string, string> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidMessagesMessageSidMediaSidJsonKey(
            params,
            params2,
            params3,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<Static<typeof ApiV2010AccountMessageMediaSchema>, TError>(
      swrKey,
      async () => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Messages/${encodeURIComponent(params2)}/Media/${encodeURIComponent(params3)}.json`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getDelete20100401AccountsAccountSidMessagesMessageSidMediaSidJsonKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Messages/{MessageSid}/Media/{Sid}.json',
    'DELETE',
  ] as const
}

export function useDelete20100401AccountsAccountSidMessagesMessageSidMediaSidJson<TError = unknown>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      void,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDelete20100401AccountsAccountSidMessagesMessageSidMediaSidJsonKey()
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
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Messages/${encodeURIComponent(params2)}/Media/${encodeURIComponent(params3)}.json`,
          {
            method: 'DELETE',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidMessagesMessageSidMediaJsonKey(
  params: string,
  params2: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Messages/{MessageSid}/Media.json',
    params,
    params2,
    keyArgs,
  ] as const
}

export function useGet20100401AccountsAccountSidMessagesMessageSidMediaJson<TError = unknown>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidMessagesMessageSidMediaJsonKey(
            params,
            params2,
            clientOptions,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Messages/${encodeURIComponent(params2)}/Media.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidMessagesMessageSidMediaJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidMessagesMessageSidMediaJsonKey(
            params,
            params2,
            clientOptions,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Messages/${encodeURIComponent(params2)}/Media.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidQueuesQueueSidMembersCallSidJsonKey(
  params: string,
  params2: string,
  params3: string,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Queues/{QueueSid}/Members/{CallSid}.json',
    params,
    params2,
    params3,
  ] as const
}

export function useGet20100401AccountsAccountSidQueuesQueueSidMembersCallSidJson<TError = unknown>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    swr?: SWRConfiguration<Static<typeof ApiV2010AccountQueueMemberSchema>, TError> & {
      swrKey?: Key
      enabled?: boolean
    }
    options?: { headers?: Record<string, string> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidQueuesQueueSidMembersCallSidJsonKey(
            params,
            params2,
            params3,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<Static<typeof ApiV2010AccountQueueMemberSchema>, TError>(
      swrKey,
      async () => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Queues/${encodeURIComponent(params2)}/Members/${encodeURIComponent(params3)}.json`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidQueuesQueueSidMembersCallSidJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    swr?: SWRConfiguration<Static<typeof ApiV2010AccountQueueMemberSchema>, TError> & {
      swrKey?: Key
      enabled?: boolean
    }
    options?: { headers?: Record<string, string> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidQueuesQueueSidMembersCallSidJsonKey(
            params,
            params2,
            params3,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<Static<typeof ApiV2010AccountQueueMemberSchema>, TError>(
      swrKey,
      async () => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Queues/${encodeURIComponent(params2)}/Members/${encodeURIComponent(params3)}.json`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getPost20100401AccountsAccountSidQueuesQueueSidMembersCallSidJsonKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Queues/{QueueSid}/Members/{CallSid}.json',
    'POST',
  ] as const
}

export function usePost20100401AccountsAccountSidQueuesQueueSidMembersCallSidJson<TError = unknown>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      Static<typeof ApiV2010AccountQueueMemberSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPost20100401AccountsAccountSidQueuesQueueSidMembersCallSidJsonKey()
  return {
    swrKey,
    ...useSWRMutation<
      Static<typeof ApiV2010AccountQueueMemberSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    >(
      swrKey,
      async (
        _key: Key,
        { arg }: { arg: { body?: unknown; options?: { headers?: Record<string, string> } } },
      ) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Queues/${encodeURIComponent(params2)}/Members/${encodeURIComponent(params3)}.json`,
          {
            method: 'POST',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidQueuesQueueSidMembersJsonKey(
  params: string,
  params2: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Queues/{QueueSid}/Members.json',
    params,
    params2,
    keyArgs,
  ] as const
}

export function useGet20100401AccountsAccountSidQueuesQueueSidMembersJson<TError = unknown>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidQueuesQueueSidMembersJsonKey(
            params,
            params2,
            clientOptions,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Queues/${encodeURIComponent(params2)}/Members.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidQueuesQueueSidMembersJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidQueuesQueueSidMembersJsonKey(
            params,
            params2,
            clientOptions,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Queues/${encodeURIComponent(params2)}/Members.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidMessagesJsonKey(
  params: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return ['2010-04-01', '/2010-04-01/Accounts/{AccountSid}/Messages.json', params, keyArgs] as const
}

export function useGet20100401AccountsAccountSidMessagesJson<TError = unknown>(
  params: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidMessagesJsonKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Messages.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidMessagesJson<TError = unknown>(
  params: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidMessagesJsonKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Messages.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getPost20100401AccountsAccountSidMessagesJsonKey() {
  return ['2010-04-01', '/2010-04-01/Accounts/{AccountSid}/Messages.json', 'POST'] as const
}

export function usePost20100401AccountsAccountSidMessagesJson<TError = unknown>(
  params: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      Static<typeof ApiV2010AccountMessageSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPost20100401AccountsAccountSidMessagesJsonKey()
  return {
    swrKey,
    ...useSWRMutation<
      Static<typeof ApiV2010AccountMessageSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    >(
      swrKey,
      async (
        _key: Key,
        { arg }: { arg: { body?: unknown; options?: { headers?: Record<string, string> } } },
      ) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Messages.json`,
          {
            method: 'POST',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidMessagesSidJsonKey(
  params: string,
  params2: string,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Messages/{Sid}.json',
    params,
    params2,
  ] as const
}

export function useGet20100401AccountsAccountSidMessagesSidJson<TError = unknown>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<Static<typeof ApiV2010AccountMessageSchema>, TError> & {
      swrKey?: Key
      enabled?: boolean
    }
    options?: { headers?: Record<string, string> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidMessagesSidJsonKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<Static<typeof ApiV2010AccountMessageSchema>, TError>(
      swrKey,
      async () => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Messages/${encodeURIComponent(params2)}.json`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidMessagesSidJson<TError = unknown>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<Static<typeof ApiV2010AccountMessageSchema>, TError> & {
      swrKey?: Key
      enabled?: boolean
    }
    options?: { headers?: Record<string, string> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidMessagesSidJsonKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<Static<typeof ApiV2010AccountMessageSchema>, TError>(
      swrKey,
      async () => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Messages/${encodeURIComponent(params2)}.json`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getPost20100401AccountsAccountSidMessagesSidJsonKey() {
  return ['2010-04-01', '/2010-04-01/Accounts/{AccountSid}/Messages/{Sid}.json', 'POST'] as const
}

export function usePost20100401AccountsAccountSidMessagesSidJson<TError = unknown>(
  params: string,
  params2: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      Static<typeof ApiV2010AccountMessageSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPost20100401AccountsAccountSidMessagesSidJsonKey()
  return {
    swrKey,
    ...useSWRMutation<
      Static<typeof ApiV2010AccountMessageSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    >(
      swrKey,
      async (
        _key: Key,
        { arg }: { arg: { body?: unknown; options?: { headers?: Record<string, string> } } },
      ) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Messages/${encodeURIComponent(params2)}.json`,
          {
            method: 'POST',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getDelete20100401AccountsAccountSidMessagesSidJsonKey() {
  return ['2010-04-01', '/2010-04-01/Accounts/{AccountSid}/Messages/{Sid}.json', 'DELETE'] as const
}

export function useDelete20100401AccountsAccountSidMessagesSidJson<TError = unknown>(
  params: string,
  params2: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      void,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDelete20100401AccountsAccountSidMessagesSidJsonKey()
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
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Messages/${encodeURIComponent(params2)}.json`,
          {
            method: 'DELETE',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getPost20100401AccountsAccountSidMessagesMessageSidFeedbackJsonKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Messages/{MessageSid}/Feedback.json',
    'POST',
  ] as const
}

export function usePost20100401AccountsAccountSidMessagesMessageSidFeedbackJson<TError = unknown>(
  params: string,
  params2: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      Static<typeof ApiV2010AccountMessageMessageFeedbackSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPost20100401AccountsAccountSidMessagesMessageSidFeedbackJsonKey()
  return {
    swrKey,
    ...useSWRMutation<
      Static<typeof ApiV2010AccountMessageMessageFeedbackSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    >(
      swrKey,
      async (
        _key: Key,
        { arg }: { arg: { body?: unknown; options?: { headers?: Record<string, string> } } },
      ) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Messages/${encodeURIComponent(params2)}/Feedback.json`,
          {
            method: 'POST',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidSigningKeysJsonKey(
  params: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SigningKeys.json',
    params,
    keyArgs,
  ] as const
}

export function useGet20100401AccountsAccountSidSigningKeysJson<TError = unknown>(
  params: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidSigningKeysJsonKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SigningKeys.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidSigningKeysJson<TError = unknown>(
  params: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidSigningKeysJsonKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SigningKeys.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getPost20100401AccountsAccountSidSigningKeysJsonKey() {
  return ['2010-04-01', '/2010-04-01/Accounts/{AccountSid}/SigningKeys.json', 'POST'] as const
}

export function usePost20100401AccountsAccountSidSigningKeysJson<TError = unknown>(
  params: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      Static<typeof ApiV2010AccountNewSigningKeySchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPost20100401AccountsAccountSidSigningKeysJsonKey()
  return {
    swrKey,
    ...useSWRMutation<
      Static<typeof ApiV2010AccountNewSigningKeySchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    >(
      swrKey,
      async (
        _key: Key,
        { arg }: { arg: { body?: unknown; options?: { headers?: Record<string, string> } } },
      ) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SigningKeys.json`,
          {
            method: 'POST',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidNotificationsSidJsonKey(
  params: string,
  params2: string,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Notifications/{Sid}.json',
    params,
    params2,
  ] as const
}

export function useGet20100401AccountsAccountSidNotificationsSidJson<TError = unknown>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<Static<typeof ApiV2010AccountNotificationInstanceSchema>, TError> & {
      swrKey?: Key
      enabled?: boolean
    }
    options?: { headers?: Record<string, string> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidNotificationsSidJsonKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<Static<typeof ApiV2010AccountNotificationInstanceSchema>, TError>(
      swrKey,
      async () => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Notifications/${encodeURIComponent(params2)}.json`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidNotificationsSidJson<TError = unknown>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<Static<typeof ApiV2010AccountNotificationInstanceSchema>, TError> & {
      swrKey?: Key
      enabled?: boolean
    }
    options?: { headers?: Record<string, string> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidNotificationsSidJsonKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<Static<typeof ApiV2010AccountNotificationInstanceSchema>, TError>(
      swrKey,
      async () => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Notifications/${encodeURIComponent(params2)}.json`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidNotificationsJsonKey(
  params: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Notifications.json',
    params,
    keyArgs,
  ] as const
}

export function useGet20100401AccountsAccountSidNotificationsJson<TError = unknown>(
  params: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidNotificationsJsonKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Notifications.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidNotificationsJson<TError = unknown>(
  params: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidNotificationsJsonKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Notifications.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidOutgoingCallerIdsSidJsonKey(
  params: string,
  params2: string,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/OutgoingCallerIds/{Sid}.json',
    params,
    params2,
  ] as const
}

export function useGet20100401AccountsAccountSidOutgoingCallerIdsSidJson<TError = unknown>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<Static<typeof ApiV2010AccountOutgoingCallerIdSchema>, TError> & {
      swrKey?: Key
      enabled?: boolean
    }
    options?: { headers?: Record<string, string> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidOutgoingCallerIdsSidJsonKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<Static<typeof ApiV2010AccountOutgoingCallerIdSchema>, TError>(
      swrKey,
      async () => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/OutgoingCallerIds/${encodeURIComponent(params2)}.json`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidOutgoingCallerIdsSidJson<TError = unknown>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<Static<typeof ApiV2010AccountOutgoingCallerIdSchema>, TError> & {
      swrKey?: Key
      enabled?: boolean
    }
    options?: { headers?: Record<string, string> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidOutgoingCallerIdsSidJsonKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<Static<typeof ApiV2010AccountOutgoingCallerIdSchema>, TError>(
      swrKey,
      async () => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/OutgoingCallerIds/${encodeURIComponent(params2)}.json`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getPost20100401AccountsAccountSidOutgoingCallerIdsSidJsonKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/OutgoingCallerIds/{Sid}.json',
    'POST',
  ] as const
}

export function usePost20100401AccountsAccountSidOutgoingCallerIdsSidJson<TError = unknown>(
  params: string,
  params2: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      Static<typeof ApiV2010AccountOutgoingCallerIdSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPost20100401AccountsAccountSidOutgoingCallerIdsSidJsonKey()
  return {
    swrKey,
    ...useSWRMutation<
      Static<typeof ApiV2010AccountOutgoingCallerIdSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    >(
      swrKey,
      async (
        _key: Key,
        { arg }: { arg: { body?: unknown; options?: { headers?: Record<string, string> } } },
      ) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/OutgoingCallerIds/${encodeURIComponent(params2)}.json`,
          {
            method: 'POST',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getDelete20100401AccountsAccountSidOutgoingCallerIdsSidJsonKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/OutgoingCallerIds/{Sid}.json',
    'DELETE',
  ] as const
}

export function useDelete20100401AccountsAccountSidOutgoingCallerIdsSidJson<TError = unknown>(
  params: string,
  params2: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      void,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDelete20100401AccountsAccountSidOutgoingCallerIdsSidJsonKey()
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
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/OutgoingCallerIds/${encodeURIComponent(params2)}.json`,
          {
            method: 'DELETE',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidOutgoingCallerIdsJsonKey(
  params: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/OutgoingCallerIds.json',
    params,
    keyArgs,
  ] as const
}

export function useGet20100401AccountsAccountSidOutgoingCallerIdsJson<TError = unknown>(
  params: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidOutgoingCallerIdsJsonKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/OutgoingCallerIds.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidOutgoingCallerIdsJson<TError = unknown>(
  params: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidOutgoingCallerIdsJsonKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/OutgoingCallerIds.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getPost20100401AccountsAccountSidOutgoingCallerIdsJsonKey() {
  return ['2010-04-01', '/2010-04-01/Accounts/{AccountSid}/OutgoingCallerIds.json', 'POST'] as const
}

export function usePost20100401AccountsAccountSidOutgoingCallerIdsJson<TError = unknown>(
  params: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      Static<typeof ApiV2010AccountValidationRequestSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPost20100401AccountsAccountSidOutgoingCallerIdsJsonKey()
  return {
    swrKey,
    ...useSWRMutation<
      Static<typeof ApiV2010AccountValidationRequestSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    >(
      swrKey,
      async (
        _key: Key,
        { arg }: { arg: { body?: unknown; options?: { headers?: Record<string, string> } } },
      ) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/OutgoingCallerIds.json`,
          {
            method: 'POST',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidConferencesConferenceSidParticipantsCallSidJsonKey(
  params: string,
  params2: string,
  params3: string,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Participants/{CallSid}.json',
    params,
    params2,
    params3,
  ] as const
}

export function useGet20100401AccountsAccountSidConferencesConferenceSidParticipantsCallSidJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    swr?: SWRConfiguration<Static<typeof ApiV2010AccountConferenceParticipantSchema>, TError> & {
      swrKey?: Key
      enabled?: boolean
    }
    options?: { headers?: Record<string, string> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidConferencesConferenceSidParticipantsCallSidJsonKey(
            params,
            params2,
            params3,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<Static<typeof ApiV2010AccountConferenceParticipantSchema>, TError>(
      swrKey,
      async () => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Conferences/${encodeURIComponent(params2)}/Participants/${encodeURIComponent(params3)}.json`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidConferencesConferenceSidParticipantsCallSidJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    swr?: SWRConfiguration<Static<typeof ApiV2010AccountConferenceParticipantSchema>, TError> & {
      swrKey?: Key
      enabled?: boolean
    }
    options?: { headers?: Record<string, string> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidConferencesConferenceSidParticipantsCallSidJsonKey(
            params,
            params2,
            params3,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<Static<typeof ApiV2010AccountConferenceParticipantSchema>, TError>(
      swrKey,
      async () => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Conferences/${encodeURIComponent(params2)}/Participants/${encodeURIComponent(params3)}.json`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getPost20100401AccountsAccountSidConferencesConferenceSidParticipantsCallSidJsonKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Participants/{CallSid}.json',
    'POST',
  ] as const
}

export function usePost20100401AccountsAccountSidConferencesConferenceSidParticipantsCallSidJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      Static<typeof ApiV2010AccountConferenceParticipantSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey =
    customKey ??
    getPost20100401AccountsAccountSidConferencesConferenceSidParticipantsCallSidJsonKey()
  return {
    swrKey,
    ...useSWRMutation<
      Static<typeof ApiV2010AccountConferenceParticipantSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    >(
      swrKey,
      async (
        _key: Key,
        { arg }: { arg: { body?: unknown; options?: { headers?: Record<string, string> } } },
      ) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Conferences/${encodeURIComponent(params2)}/Participants/${encodeURIComponent(params3)}.json`,
          {
            method: 'POST',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getDelete20100401AccountsAccountSidConferencesConferenceSidParticipantsCallSidJsonKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Participants/{CallSid}.json',
    'DELETE',
  ] as const
}

export function useDelete20100401AccountsAccountSidConferencesConferenceSidParticipantsCallSidJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      void,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey =
    customKey ??
    getDelete20100401AccountsAccountSidConferencesConferenceSidParticipantsCallSidJsonKey()
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
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Conferences/${encodeURIComponent(params2)}/Participants/${encodeURIComponent(params3)}.json`,
          {
            method: 'DELETE',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidConferencesConferenceSidParticipantsJsonKey(
  params: string,
  params2: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Participants.json',
    params,
    params2,
    keyArgs,
  ] as const
}

export function useGet20100401AccountsAccountSidConferencesConferenceSidParticipantsJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidConferencesConferenceSidParticipantsJsonKey(
            params,
            params2,
            clientOptions,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Conferences/${encodeURIComponent(params2)}/Participants.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidConferencesConferenceSidParticipantsJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidConferencesConferenceSidParticipantsJsonKey(
            params,
            params2,
            clientOptions,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Conferences/${encodeURIComponent(params2)}/Participants.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getPost20100401AccountsAccountSidConferencesConferenceSidParticipantsJsonKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Participants.json',
    'POST',
  ] as const
}

export function usePost20100401AccountsAccountSidConferencesConferenceSidParticipantsJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      Static<typeof ApiV2010AccountConferenceParticipantSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey =
    customKey ?? getPost20100401AccountsAccountSidConferencesConferenceSidParticipantsJsonKey()
  return {
    swrKey,
    ...useSWRMutation<
      Static<typeof ApiV2010AccountConferenceParticipantSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    >(
      swrKey,
      async (
        _key: Key,
        { arg }: { arg: { body?: unknown; options?: { headers?: Record<string, string> } } },
      ) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Conferences/${encodeURIComponent(params2)}/Participants.json`,
          {
            method: 'POST',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getPost20100401AccountsAccountSidCallsCallSidPaymentsJsonKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Payments.json',
    'POST',
  ] as const
}

export function usePost20100401AccountsAccountSidCallsCallSidPaymentsJson<TError = unknown>(
  params: string,
  params2: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      Static<typeof ApiV2010AccountCallPaymentsSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPost20100401AccountsAccountSidCallsCallSidPaymentsJsonKey()
  return {
    swrKey,
    ...useSWRMutation<
      Static<typeof ApiV2010AccountCallPaymentsSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    >(
      swrKey,
      async (
        _key: Key,
        { arg }: { arg: { body?: unknown; options?: { headers?: Record<string, string> } } },
      ) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Calls/${encodeURIComponent(params2)}/Payments.json`,
          {
            method: 'POST',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getPost20100401AccountsAccountSidCallsCallSidPaymentsSidJsonKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Payments/{Sid}.json',
    'POST',
  ] as const
}

export function usePost20100401AccountsAccountSidCallsCallSidPaymentsSidJson<TError = unknown>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      Static<typeof ApiV2010AccountCallPaymentsSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPost20100401AccountsAccountSidCallsCallSidPaymentsSidJsonKey()
  return {
    swrKey,
    ...useSWRMutation<
      Static<typeof ApiV2010AccountCallPaymentsSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    >(
      swrKey,
      async (
        _key: Key,
        { arg }: { arg: { body?: unknown; options?: { headers?: Record<string, string> } } },
      ) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Calls/${encodeURIComponent(params2)}/Payments/${encodeURIComponent(params3)}.json`,
          {
            method: 'POST',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidQueuesSidJsonKey(params: string, params2: string) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Queues/{Sid}.json',
    params,
    params2,
  ] as const
}

export function useGet20100401AccountsAccountSidQueuesSidJson<TError = unknown>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<Static<typeof ApiV2010AccountQueueSchema>, TError> & {
      swrKey?: Key
      enabled?: boolean
    }
    options?: { headers?: Record<string, string> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidQueuesSidJsonKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<Static<typeof ApiV2010AccountQueueSchema>, TError>(
      swrKey,
      async () => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Queues/${encodeURIComponent(params2)}.json`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidQueuesSidJson<TError = unknown>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<Static<typeof ApiV2010AccountQueueSchema>, TError> & {
      swrKey?: Key
      enabled?: boolean
    }
    options?: { headers?: Record<string, string> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidQueuesSidJsonKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<Static<typeof ApiV2010AccountQueueSchema>, TError>(
      swrKey,
      async () => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Queues/${encodeURIComponent(params2)}.json`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getPost20100401AccountsAccountSidQueuesSidJsonKey() {
  return ['2010-04-01', '/2010-04-01/Accounts/{AccountSid}/Queues/{Sid}.json', 'POST'] as const
}

export function usePost20100401AccountsAccountSidQueuesSidJson<TError = unknown>(
  params: string,
  params2: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      Static<typeof ApiV2010AccountQueueSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPost20100401AccountsAccountSidQueuesSidJsonKey()
  return {
    swrKey,
    ...useSWRMutation<
      Static<typeof ApiV2010AccountQueueSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    >(
      swrKey,
      async (
        _key: Key,
        { arg }: { arg: { body?: unknown; options?: { headers?: Record<string, string> } } },
      ) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Queues/${encodeURIComponent(params2)}.json`,
          {
            method: 'POST',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getDelete20100401AccountsAccountSidQueuesSidJsonKey() {
  return ['2010-04-01', '/2010-04-01/Accounts/{AccountSid}/Queues/{Sid}.json', 'DELETE'] as const
}

export function useDelete20100401AccountsAccountSidQueuesSidJson<TError = unknown>(
  params: string,
  params2: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      void,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDelete20100401AccountsAccountSidQueuesSidJsonKey()
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
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Queues/${encodeURIComponent(params2)}.json`,
          {
            method: 'DELETE',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidQueuesJsonKey(
  params: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return ['2010-04-01', '/2010-04-01/Accounts/{AccountSid}/Queues.json', params, keyArgs] as const
}

export function useGet20100401AccountsAccountSidQueuesJson<TError = unknown>(
  params: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidQueuesJsonKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Queues.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidQueuesJson<TError = unknown>(
  params: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidQueuesJsonKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Queues.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getPost20100401AccountsAccountSidQueuesJsonKey() {
  return ['2010-04-01', '/2010-04-01/Accounts/{AccountSid}/Queues.json', 'POST'] as const
}

export function usePost20100401AccountsAccountSidQueuesJson<TError = unknown>(
  params: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      Static<typeof ApiV2010AccountQueueSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPost20100401AccountsAccountSidQueuesJsonKey()
  return {
    swrKey,
    ...useSWRMutation<
      Static<typeof ApiV2010AccountQueueSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    >(
      swrKey,
      async (
        _key: Key,
        { arg }: { arg: { body?: unknown; options?: { headers?: Record<string, string> } } },
      ) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Queues.json`,
          {
            method: 'POST',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getPost20100401AccountsAccountSidCallsCallSidTranscriptionsJsonKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Transcriptions.json',
    'POST',
  ] as const
}

export function usePost20100401AccountsAccountSidCallsCallSidTranscriptionsJson<TError = unknown>(
  params: string,
  params2: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      Static<typeof ApiV2010AccountCallRealtimeTranscriptionSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPost20100401AccountsAccountSidCallsCallSidTranscriptionsJsonKey()
  return {
    swrKey,
    ...useSWRMutation<
      Static<typeof ApiV2010AccountCallRealtimeTranscriptionSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    >(
      swrKey,
      async (
        _key: Key,
        { arg }: { arg: { body?: unknown; options?: { headers?: Record<string, string> } } },
      ) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Calls/${encodeURIComponent(params2)}/Transcriptions.json`,
          {
            method: 'POST',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getPost20100401AccountsAccountSidCallsCallSidTranscriptionsSidJsonKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Transcriptions/{Sid}.json',
    'POST',
  ] as const
}

export function usePost20100401AccountsAccountSidCallsCallSidTranscriptionsSidJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      Static<typeof ApiV2010AccountCallRealtimeTranscriptionSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey =
    customKey ?? getPost20100401AccountsAccountSidCallsCallSidTranscriptionsSidJsonKey()
  return {
    swrKey,
    ...useSWRMutation<
      Static<typeof ApiV2010AccountCallRealtimeTranscriptionSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    >(
      swrKey,
      async (
        _key: Key,
        { arg }: { arg: { body?: unknown; options?: { headers?: Record<string, string> } } },
      ) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Calls/${encodeURIComponent(params2)}/Transcriptions/${encodeURIComponent(params3)}.json`,
          {
            method: 'POST',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidRecordingsSidJsonKey(
  params: string,
  params2: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Recordings/{Sid}.json',
    params,
    params2,
    keyArgs,
  ] as const
}

export function useGet20100401AccountsAccountSidRecordingsSidJson<TError = unknown>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<Static<typeof ApiV2010AccountRecordingSchema>, TError> & {
      swrKey?: Key
      enabled?: boolean
    }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidRecordingsSidJsonKey(params, params2, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<Static<typeof ApiV2010AccountRecordingSchema>, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Recordings/${encodeURIComponent(params2)}.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidRecordingsSidJson<TError = unknown>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<Static<typeof ApiV2010AccountRecordingSchema>, TError> & {
      swrKey?: Key
      enabled?: boolean
    }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidRecordingsSidJsonKey(params, params2, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<Static<typeof ApiV2010AccountRecordingSchema>, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Recordings/${encodeURIComponent(params2)}.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getDelete20100401AccountsAccountSidRecordingsSidJsonKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Recordings/{Sid}.json',
    'DELETE',
  ] as const
}

export function useDelete20100401AccountsAccountSidRecordingsSidJson<TError = unknown>(
  params: string,
  params2: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      void,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDelete20100401AccountsAccountSidRecordingsSidJsonKey()
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
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Recordings/${encodeURIComponent(params2)}.json`,
          {
            method: 'DELETE',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidRecordingsJsonKey(
  params: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Recordings.json',
    params,
    keyArgs,
  ] as const
}

export function useGet20100401AccountsAccountSidRecordingsJson<TError = unknown>(
  params: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidRecordingsJsonKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Recordings.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidRecordingsJson<TError = unknown>(
  params: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidRecordingsJsonKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Recordings.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsSidJsonKey(
  params: string,
  params2: string,
  params3: string,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Recordings/{ReferenceSid}/AddOnResults/{Sid}.json',
    params,
    params2,
    params3,
  ] as const
}

export function useGet20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsSidJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    swr?: SWRConfiguration<
      Static<typeof ApiV2010AccountRecordingRecordingAddOnResultSchema>,
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsSidJsonKey(
            params,
            params2,
            params3,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<Static<typeof ApiV2010AccountRecordingRecordingAddOnResultSchema>, TError>(
      swrKey,
      async () => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Recordings/${encodeURIComponent(params2)}/AddOnResults/${encodeURIComponent(params3)}.json`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsSidJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    swr?: SWRConfiguration<
      Static<typeof ApiV2010AccountRecordingRecordingAddOnResultSchema>,
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsSidJsonKey(
            params,
            params2,
            params3,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<Static<typeof ApiV2010AccountRecordingRecordingAddOnResultSchema>, TError>(
      swrKey,
      async () => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Recordings/${encodeURIComponent(params2)}/AddOnResults/${encodeURIComponent(params3)}.json`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getDelete20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsSidJsonKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Recordings/{ReferenceSid}/AddOnResults/{Sid}.json',
    'DELETE',
  ] as const
}

export function useDelete20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsSidJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      void,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey =
    customKey ?? getDelete20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsSidJsonKey()
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
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Recordings/${encodeURIComponent(params2)}/AddOnResults/${encodeURIComponent(params3)}.json`,
          {
            method: 'DELETE',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsJsonKey(
  params: string,
  params2: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Recordings/{ReferenceSid}/AddOnResults.json',
    params,
    params2,
    keyArgs,
  ] as const
}

export function useGet20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsJsonKey(
            params,
            params2,
            clientOptions,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Recordings/${encodeURIComponent(params2)}/AddOnResults.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsJsonKey(
            params,
            params2,
            clientOptions,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Recordings/${encodeURIComponent(params2)}/AddOnResults.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsSidJsonKey(
  params: string,
  params2: string,
  params3: string,
  params4: string,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Recordings/{ReferenceSid}/AddOnResults/{AddOnResultSid}/Payloads/{Sid}.json',
    params,
    params2,
    params3,
    params4,
  ] as const
}

export function useGet20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsSidJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  params4: string,
  options?: {
    swr?: SWRConfiguration<
      Static<typeof ApiV2010AccountRecordingRecordingAddOnResultRecordingAddOnResultPayloadSchema>,
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsSidJsonKey(
            params,
            params2,
            params3,
            params4,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Static<typeof ApiV2010AccountRecordingRecordingAddOnResultRecordingAddOnResultPayloadSchema>,
      TError
    >(
      swrKey,
      async () => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Recordings/${encodeURIComponent(params2)}/AddOnResults/${encodeURIComponent(params3)}/Payloads/${encodeURIComponent(params4)}.json`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsSidJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  params4: string,
  options?: {
    swr?: SWRConfiguration<
      Static<typeof ApiV2010AccountRecordingRecordingAddOnResultRecordingAddOnResultPayloadSchema>,
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsSidJsonKey(
            params,
            params2,
            params3,
            params4,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Static<typeof ApiV2010AccountRecordingRecordingAddOnResultRecordingAddOnResultPayloadSchema>,
      TError
    >(
      swrKey,
      async () => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Recordings/${encodeURIComponent(params2)}/AddOnResults/${encodeURIComponent(params3)}/Payloads/${encodeURIComponent(params4)}.json`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getDelete20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsSidJsonKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Recordings/{ReferenceSid}/AddOnResults/{AddOnResultSid}/Payloads/{Sid}.json',
    'DELETE',
  ] as const
}

export function useDelete20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsSidJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  params4: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      void,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey =
    customKey ??
    getDelete20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsSidJsonKey()
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
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Recordings/${encodeURIComponent(params2)}/AddOnResults/${encodeURIComponent(params3)}/Payloads/${encodeURIComponent(params4)}.json`,
          {
            method: 'DELETE',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsJsonKey(
  params: string,
  params2: string,
  params3: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Recordings/{ReferenceSid}/AddOnResults/{AddOnResultSid}/Payloads.json',
    params,
    params2,
    params3,
    keyArgs,
  ] as const
}

export function useGet20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsJsonKey(
            params,
            params2,
            params3,
            clientOptions,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Recordings/${encodeURIComponent(params2)}/AddOnResults/${encodeURIComponent(params3)}/Payloads.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsJsonKey(
            params,
            params2,
            params3,
            clientOptions,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Recordings/${encodeURIComponent(params2)}/AddOnResults/${encodeURIComponent(params3)}/Payloads.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsPayloadSidDataJsonKey(
  params: string,
  params2: string,
  params3: string,
  params4: string,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Recordings/{ReferenceSid}/AddOnResults/{AddOnResultSid}/Payloads/{PayloadSid}/Data.json',
    params,
    params2,
    params3,
    params4,
  ] as const
}

export function useGet20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsPayloadSidDataJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  params4: string,
  options?: {
    swr?: SWRConfiguration<void, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsPayloadSidDataJsonKey(
            params,
            params2,
            params3,
            params4,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<void, TError>(
      swrKey,
      async () => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Recordings/${encodeURIComponent(params2)}/AddOnResults/${encodeURIComponent(params3)}/Payloads/${encodeURIComponent(params4)}/Data.json`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsPayloadSidDataJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  params4: string,
  options?: {
    swr?: SWRConfiguration<void, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsPayloadSidDataJsonKey(
            params,
            params2,
            params3,
            params4,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<void, TError>(
      swrKey,
      async () => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Recordings/${encodeURIComponent(params2)}/AddOnResults/${encodeURIComponent(params3)}/Payloads/${encodeURIComponent(params4)}/Data.json`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsSidJsonKey(
  params: string,
  params2: string,
  params3: string,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Recordings/{RecordingSid}/Transcriptions/{Sid}.json',
    params,
    params2,
    params3,
  ] as const
}

export function useGet20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsSidJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    swr?: SWRConfiguration<
      Static<typeof ApiV2010AccountRecordingRecordingTranscriptionSchema>,
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsSidJsonKey(
            params,
            params2,
            params3,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<Static<typeof ApiV2010AccountRecordingRecordingTranscriptionSchema>, TError>(
      swrKey,
      async () => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Recordings/${encodeURIComponent(params2)}/Transcriptions/${encodeURIComponent(params3)}.json`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsSidJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    swr?: SWRConfiguration<
      Static<typeof ApiV2010AccountRecordingRecordingTranscriptionSchema>,
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsSidJsonKey(
            params,
            params2,
            params3,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<Static<typeof ApiV2010AccountRecordingRecordingTranscriptionSchema>, TError>(
      swrKey,
      async () => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Recordings/${encodeURIComponent(params2)}/Transcriptions/${encodeURIComponent(params3)}.json`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getDelete20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsSidJsonKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Recordings/{RecordingSid}/Transcriptions/{Sid}.json',
    'DELETE',
  ] as const
}

export function useDelete20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsSidJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      void,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey =
    customKey ?? getDelete20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsSidJsonKey()
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
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Recordings/${encodeURIComponent(params2)}/Transcriptions/${encodeURIComponent(params3)}.json`,
          {
            method: 'DELETE',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsJsonKey(
  params: string,
  params2: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Recordings/{RecordingSid}/Transcriptions.json',
    params,
    params2,
    keyArgs,
  ] as const
}

export function useGet20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsJsonKey(
            params,
            params2,
            clientOptions,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Recordings/${encodeURIComponent(params2)}/Transcriptions.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsJsonKey(
            params,
            params2,
            clientOptions,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Recordings/${encodeURIComponent(params2)}/Transcriptions.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidSMSShortCodesSidJsonKey(
  params: string,
  params2: string,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SMS/ShortCodes/{Sid}.json',
    params,
    params2,
  ] as const
}

export function useGet20100401AccountsAccountSidSMSShortCodesSidJson<TError = unknown>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<Static<typeof ApiV2010AccountShortCodeSchema>, TError> & {
      swrKey?: Key
      enabled?: boolean
    }
    options?: { headers?: Record<string, string> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidSMSShortCodesSidJsonKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<Static<typeof ApiV2010AccountShortCodeSchema>, TError>(
      swrKey,
      async () => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SMS/ShortCodes/${encodeURIComponent(params2)}.json`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidSMSShortCodesSidJson<TError = unknown>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<Static<typeof ApiV2010AccountShortCodeSchema>, TError> & {
      swrKey?: Key
      enabled?: boolean
    }
    options?: { headers?: Record<string, string> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidSMSShortCodesSidJsonKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<Static<typeof ApiV2010AccountShortCodeSchema>, TError>(
      swrKey,
      async () => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SMS/ShortCodes/${encodeURIComponent(params2)}.json`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getPost20100401AccountsAccountSidSMSShortCodesSidJsonKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SMS/ShortCodes/{Sid}.json',
    'POST',
  ] as const
}

export function usePost20100401AccountsAccountSidSMSShortCodesSidJson<TError = unknown>(
  params: string,
  params2: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      Static<typeof ApiV2010AccountShortCodeSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPost20100401AccountsAccountSidSMSShortCodesSidJsonKey()
  return {
    swrKey,
    ...useSWRMutation<
      Static<typeof ApiV2010AccountShortCodeSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    >(
      swrKey,
      async (
        _key: Key,
        { arg }: { arg: { body?: unknown; options?: { headers?: Record<string, string> } } },
      ) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SMS/ShortCodes/${encodeURIComponent(params2)}.json`,
          {
            method: 'POST',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidSMSShortCodesJsonKey(
  params: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SMS/ShortCodes.json',
    params,
    keyArgs,
  ] as const
}

export function useGet20100401AccountsAccountSidSMSShortCodesJson<TError = unknown>(
  params: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidSMSShortCodesJsonKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SMS/ShortCodes.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidSMSShortCodesJson<TError = unknown>(
  params: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidSMSShortCodesJsonKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SMS/ShortCodes.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidSigningKeysSidJsonKey(
  params: string,
  params2: string,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SigningKeys/{Sid}.json',
    params,
    params2,
  ] as const
}

export function useGet20100401AccountsAccountSidSigningKeysSidJson<TError = unknown>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<Static<typeof ApiV2010AccountSigningKeySchema>, TError> & {
      swrKey?: Key
      enabled?: boolean
    }
    options?: { headers?: Record<string, string> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidSigningKeysSidJsonKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<Static<typeof ApiV2010AccountSigningKeySchema>, TError>(
      swrKey,
      async () => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SigningKeys/${encodeURIComponent(params2)}.json`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidSigningKeysSidJson<TError = unknown>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<Static<typeof ApiV2010AccountSigningKeySchema>, TError> & {
      swrKey?: Key
      enabled?: boolean
    }
    options?: { headers?: Record<string, string> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidSigningKeysSidJsonKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<Static<typeof ApiV2010AccountSigningKeySchema>, TError>(
      swrKey,
      async () => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SigningKeys/${encodeURIComponent(params2)}.json`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getPost20100401AccountsAccountSidSigningKeysSidJsonKey() {
  return ['2010-04-01', '/2010-04-01/Accounts/{AccountSid}/SigningKeys/{Sid}.json', 'POST'] as const
}

export function usePost20100401AccountsAccountSidSigningKeysSidJson<TError = unknown>(
  params: string,
  params2: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      Static<typeof ApiV2010AccountSigningKeySchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPost20100401AccountsAccountSidSigningKeysSidJsonKey()
  return {
    swrKey,
    ...useSWRMutation<
      Static<typeof ApiV2010AccountSigningKeySchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    >(
      swrKey,
      async (
        _key: Key,
        { arg }: { arg: { body?: unknown; options?: { headers?: Record<string, string> } } },
      ) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SigningKeys/${encodeURIComponent(params2)}.json`,
          {
            method: 'POST',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getDelete20100401AccountsAccountSidSigningKeysSidJsonKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SigningKeys/{Sid}.json',
    'DELETE',
  ] as const
}

export function useDelete20100401AccountsAccountSidSigningKeysSidJson<TError = unknown>(
  params: string,
  params2: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      void,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDelete20100401AccountsAccountSidSigningKeysSidJsonKey()
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
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SigningKeys/${encodeURIComponent(params2)}.json`,
          {
            method: 'DELETE',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsJsonKey(
  params: string,
  params2: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Calls/CredentialListMappings.json',
    params,
    params2,
    keyArgs,
  ] as const
}

export function useGet20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsJsonKey(
            params,
            params2,
            clientOptions,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/Domains/${encodeURIComponent(params2)}/Auth/Calls/CredentialListMappings.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsJsonKey(
            params,
            params2,
            clientOptions,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/Domains/${encodeURIComponent(params2)}/Auth/Calls/CredentialListMappings.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getPost20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsJsonKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Calls/CredentialListMappings.json',
    'POST',
  ] as const
}

export function usePost20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      Static<
        typeof ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsCredentialListMappingSchema
      >,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey =
    customKey ??
    getPost20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsJsonKey()
  return {
    swrKey,
    ...useSWRMutation<
      Static<
        typeof ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsCredentialListMappingSchema
      >,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    >(
      swrKey,
      async (
        _key: Key,
        { arg }: { arg: { body?: unknown; options?: { headers?: Record<string, string> } } },
      ) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/Domains/${encodeURIComponent(params2)}/Auth/Calls/CredentialListMappings.json`,
          {
            method: 'POST',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsSidJsonKey(
  params: string,
  params2: string,
  params3: string,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Calls/CredentialListMappings/{Sid}.json',
    params,
    params2,
    params3,
  ] as const
}

export function useGet20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsSidJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    swr?: SWRConfiguration<
      Static<
        typeof ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsCredentialListMappingSchema
      >,
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsSidJsonKey(
            params,
            params2,
            params3,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Static<
        typeof ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsCredentialListMappingSchema
      >,
      TError
    >(
      swrKey,
      async () => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/Domains/${encodeURIComponent(params2)}/Auth/Calls/CredentialListMappings/${encodeURIComponent(params3)}.json`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsSidJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    swr?: SWRConfiguration<
      Static<
        typeof ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsCredentialListMappingSchema
      >,
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsSidJsonKey(
            params,
            params2,
            params3,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Static<
        typeof ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsCredentialListMappingSchema
      >,
      TError
    >(
      swrKey,
      async () => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/Domains/${encodeURIComponent(params2)}/Auth/Calls/CredentialListMappings/${encodeURIComponent(params3)}.json`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getDelete20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsSidJsonKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Calls/CredentialListMappings/{Sid}.json',
    'DELETE',
  ] as const
}

export function useDelete20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsSidJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      void,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey =
    customKey ??
    getDelete20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsSidJsonKey()
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
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/Domains/${encodeURIComponent(params2)}/Auth/Calls/CredentialListMappings/${encodeURIComponent(params3)}.json`,
          {
            method: 'DELETE',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsJsonKey(
  params: string,
  params2: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Calls/IpAccessControlListMappings.json',
    params,
    params2,
    keyArgs,
  ] as const
}

export function useGet20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsJsonKey(
            params,
            params2,
            clientOptions,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/Domains/${encodeURIComponent(params2)}/Auth/Calls/IpAccessControlListMappings.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsJsonKey(
            params,
            params2,
            clientOptions,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/Domains/${encodeURIComponent(params2)}/Auth/Calls/IpAccessControlListMappings.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getPost20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsJsonKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Calls/IpAccessControlListMappings.json',
    'POST',
  ] as const
}

export function usePost20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      Static<
        typeof ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsIpAccessControlListMappingSchema
      >,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey =
    customKey ??
    getPost20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsJsonKey()
  return {
    swrKey,
    ...useSWRMutation<
      Static<
        typeof ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsIpAccessControlListMappingSchema
      >,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    >(
      swrKey,
      async (
        _key: Key,
        { arg }: { arg: { body?: unknown; options?: { headers?: Record<string, string> } } },
      ) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/Domains/${encodeURIComponent(params2)}/Auth/Calls/IpAccessControlListMappings.json`,
          {
            method: 'POST',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsSidJsonKey(
  params: string,
  params2: string,
  params3: string,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Calls/IpAccessControlListMappings/{Sid}.json',
    params,
    params2,
    params3,
  ] as const
}

export function useGet20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsSidJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    swr?: SWRConfiguration<
      Static<
        typeof ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsIpAccessControlListMappingSchema
      >,
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsSidJsonKey(
            params,
            params2,
            params3,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Static<
        typeof ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsIpAccessControlListMappingSchema
      >,
      TError
    >(
      swrKey,
      async () => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/Domains/${encodeURIComponent(params2)}/Auth/Calls/IpAccessControlListMappings/${encodeURIComponent(params3)}.json`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsSidJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    swr?: SWRConfiguration<
      Static<
        typeof ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsIpAccessControlListMappingSchema
      >,
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsSidJsonKey(
            params,
            params2,
            params3,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Static<
        typeof ApiV2010AccountSipSipDomainSipAuthSipAuthCallsSipAuthCallsIpAccessControlListMappingSchema
      >,
      TError
    >(
      swrKey,
      async () => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/Domains/${encodeURIComponent(params2)}/Auth/Calls/IpAccessControlListMappings/${encodeURIComponent(params3)}.json`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getDelete20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsSidJsonKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Calls/IpAccessControlListMappings/{Sid}.json',
    'DELETE',
  ] as const
}

export function useDelete20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsSidJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      void,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey =
    customKey ??
    getDelete20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsSidJsonKey()
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
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/Domains/${encodeURIComponent(params2)}/Auth/Calls/IpAccessControlListMappings/${encodeURIComponent(params3)}.json`,
          {
            method: 'DELETE',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsJsonKey(
  params: string,
  params2: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Registrations/CredentialListMappings.json',
    params,
    params2,
    keyArgs,
  ] as const
}

export function useGet20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsJsonKey(
            params,
            params2,
            clientOptions,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/Domains/${encodeURIComponent(params2)}/Auth/Registrations/CredentialListMappings.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsJsonKey(
            params,
            params2,
            clientOptions,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/Domains/${encodeURIComponent(params2)}/Auth/Registrations/CredentialListMappings.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getPost20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsJsonKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Registrations/CredentialListMappings.json',
    'POST',
  ] as const
}

export function usePost20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      Static<
        typeof ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrationsSipAuthRegistrationsCredentialListMappingSchema
      >,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey =
    customKey ??
    getPost20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsJsonKey()
  return {
    swrKey,
    ...useSWRMutation<
      Static<
        typeof ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrationsSipAuthRegistrationsCredentialListMappingSchema
      >,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    >(
      swrKey,
      async (
        _key: Key,
        { arg }: { arg: { body?: unknown; options?: { headers?: Record<string, string> } } },
      ) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/Domains/${encodeURIComponent(params2)}/Auth/Registrations/CredentialListMappings.json`,
          {
            method: 'POST',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsSidJsonKey(
  params: string,
  params2: string,
  params3: string,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Registrations/CredentialListMappings/{Sid}.json',
    params,
    params2,
    params3,
  ] as const
}

export function useGet20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsSidJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    swr?: SWRConfiguration<
      Static<
        typeof ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrationsSipAuthRegistrationsCredentialListMappingSchema
      >,
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsSidJsonKey(
            params,
            params2,
            params3,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Static<
        typeof ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrationsSipAuthRegistrationsCredentialListMappingSchema
      >,
      TError
    >(
      swrKey,
      async () => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/Domains/${encodeURIComponent(params2)}/Auth/Registrations/CredentialListMappings/${encodeURIComponent(params3)}.json`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsSidJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    swr?: SWRConfiguration<
      Static<
        typeof ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrationsSipAuthRegistrationsCredentialListMappingSchema
      >,
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsSidJsonKey(
            params,
            params2,
            params3,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Static<
        typeof ApiV2010AccountSipSipDomainSipAuthSipAuthRegistrationsSipAuthRegistrationsCredentialListMappingSchema
      >,
      TError
    >(
      swrKey,
      async () => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/Domains/${encodeURIComponent(params2)}/Auth/Registrations/CredentialListMappings/${encodeURIComponent(params3)}.json`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getDelete20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsSidJsonKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Registrations/CredentialListMappings/{Sid}.json',
    'DELETE',
  ] as const
}

export function useDelete20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsSidJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      void,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey =
    customKey ??
    getDelete20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsSidJsonKey()
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
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/Domains/${encodeURIComponent(params2)}/Auth/Registrations/CredentialListMappings/${encodeURIComponent(params3)}.json`,
          {
            method: 'DELETE',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsJsonKey(
  params: string,
  params2: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists/{CredentialListSid}/Credentials.json',
    params,
    params2,
    keyArgs,
  ] as const
}

export function useGet20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsJsonKey(
            params,
            params2,
            clientOptions,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/CredentialLists/${encodeURIComponent(params2)}/Credentials.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsJsonKey(
            params,
            params2,
            clientOptions,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/CredentialLists/${encodeURIComponent(params2)}/Credentials.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getPost20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsJsonKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists/{CredentialListSid}/Credentials.json',
    'POST',
  ] as const
}

export function usePost20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      Static<typeof ApiV2010AccountSipSipCredentialListSipCredentialSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey =
    customKey ??
    getPost20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsJsonKey()
  return {
    swrKey,
    ...useSWRMutation<
      Static<typeof ApiV2010AccountSipSipCredentialListSipCredentialSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    >(
      swrKey,
      async (
        _key: Key,
        { arg }: { arg: { body?: unknown; options?: { headers?: Record<string, string> } } },
      ) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/CredentialLists/${encodeURIComponent(params2)}/Credentials.json`,
          {
            method: 'POST',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsSidJsonKey(
  params: string,
  params2: string,
  params3: string,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists/{CredentialListSid}/Credentials/{Sid}.json',
    params,
    params2,
    params3,
  ] as const
}

export function useGet20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsSidJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    swr?: SWRConfiguration<
      Static<typeof ApiV2010AccountSipSipCredentialListSipCredentialSchema>,
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsSidJsonKey(
            params,
            params2,
            params3,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<Static<typeof ApiV2010AccountSipSipCredentialListSipCredentialSchema>, TError>(
      swrKey,
      async () => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/CredentialLists/${encodeURIComponent(params2)}/Credentials/${encodeURIComponent(params3)}.json`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsSidJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    swr?: SWRConfiguration<
      Static<typeof ApiV2010AccountSipSipCredentialListSipCredentialSchema>,
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsSidJsonKey(
            params,
            params2,
            params3,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Static<typeof ApiV2010AccountSipSipCredentialListSipCredentialSchema>,
      TError
    >(
      swrKey,
      async () => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/CredentialLists/${encodeURIComponent(params2)}/Credentials/${encodeURIComponent(params3)}.json`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getPost20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsSidJsonKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists/{CredentialListSid}/Credentials/{Sid}.json',
    'POST',
  ] as const
}

export function usePost20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsSidJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      Static<typeof ApiV2010AccountSipSipCredentialListSipCredentialSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey =
    customKey ??
    getPost20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsSidJsonKey()
  return {
    swrKey,
    ...useSWRMutation<
      Static<typeof ApiV2010AccountSipSipCredentialListSipCredentialSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    >(
      swrKey,
      async (
        _key: Key,
        { arg }: { arg: { body?: unknown; options?: { headers?: Record<string, string> } } },
      ) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/CredentialLists/${encodeURIComponent(params2)}/Credentials/${encodeURIComponent(params3)}.json`,
          {
            method: 'POST',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getDelete20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsSidJsonKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists/{CredentialListSid}/Credentials/{Sid}.json',
    'DELETE',
  ] as const
}

export function useDelete20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsSidJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      void,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey =
    customKey ??
    getDelete20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsSidJsonKey()
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
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/CredentialLists/${encodeURIComponent(params2)}/Credentials/${encodeURIComponent(params3)}.json`,
          {
            method: 'DELETE',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidSIPCredentialListsJsonKey(
  params: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists.json',
    params,
    keyArgs,
  ] as const
}

export function useGet20100401AccountsAccountSidSIPCredentialListsJson<TError = unknown>(
  params: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidSIPCredentialListsJsonKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/CredentialLists.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidSIPCredentialListsJson<TError = unknown>(
  params: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidSIPCredentialListsJsonKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/CredentialLists.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getPost20100401AccountsAccountSidSIPCredentialListsJsonKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists.json',
    'POST',
  ] as const
}

export function usePost20100401AccountsAccountSidSIPCredentialListsJson<TError = unknown>(
  params: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      Static<typeof ApiV2010AccountSipSipCredentialListSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPost20100401AccountsAccountSidSIPCredentialListsJsonKey()
  return {
    swrKey,
    ...useSWRMutation<
      Static<typeof ApiV2010AccountSipSipCredentialListSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    >(
      swrKey,
      async (
        _key: Key,
        { arg }: { arg: { body?: unknown; options?: { headers?: Record<string, string> } } },
      ) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/CredentialLists.json`,
          {
            method: 'POST',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidSIPCredentialListsSidJsonKey(
  params: string,
  params2: string,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists/{Sid}.json',
    params,
    params2,
  ] as const
}

export function useGet20100401AccountsAccountSidSIPCredentialListsSidJson<TError = unknown>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<Static<typeof ApiV2010AccountSipSipCredentialListSchema>, TError> & {
      swrKey?: Key
      enabled?: boolean
    }
    options?: { headers?: Record<string, string> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidSIPCredentialListsSidJsonKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<Static<typeof ApiV2010AccountSipSipCredentialListSchema>, TError>(
      swrKey,
      async () => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/CredentialLists/${encodeURIComponent(params2)}.json`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidSIPCredentialListsSidJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<Static<typeof ApiV2010AccountSipSipCredentialListSchema>, TError> & {
      swrKey?: Key
      enabled?: boolean
    }
    options?: { headers?: Record<string, string> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidSIPCredentialListsSidJsonKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<Static<typeof ApiV2010AccountSipSipCredentialListSchema>, TError>(
      swrKey,
      async () => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/CredentialLists/${encodeURIComponent(params2)}.json`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getPost20100401AccountsAccountSidSIPCredentialListsSidJsonKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists/{Sid}.json',
    'POST',
  ] as const
}

export function usePost20100401AccountsAccountSidSIPCredentialListsSidJson<TError = unknown>(
  params: string,
  params2: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      Static<typeof ApiV2010AccountSipSipCredentialListSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPost20100401AccountsAccountSidSIPCredentialListsSidJsonKey()
  return {
    swrKey,
    ...useSWRMutation<
      Static<typeof ApiV2010AccountSipSipCredentialListSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    >(
      swrKey,
      async (
        _key: Key,
        { arg }: { arg: { body?: unknown; options?: { headers?: Record<string, string> } } },
      ) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/CredentialLists/${encodeURIComponent(params2)}.json`,
          {
            method: 'POST',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getDelete20100401AccountsAccountSidSIPCredentialListsSidJsonKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists/{Sid}.json',
    'DELETE',
  ] as const
}

export function useDelete20100401AccountsAccountSidSIPCredentialListsSidJson<TError = unknown>(
  params: string,
  params2: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      void,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDelete20100401AccountsAccountSidSIPCredentialListsSidJsonKey()
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
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/CredentialLists/${encodeURIComponent(params2)}.json`,
          {
            method: 'DELETE',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsJsonKey(
  params: string,
  params2: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/CredentialListMappings.json',
    params,
    params2,
    keyArgs,
  ] as const
}

export function useGet20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsJsonKey(
            params,
            params2,
            clientOptions,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/Domains/${encodeURIComponent(params2)}/CredentialListMappings.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsJsonKey(
            params,
            params2,
            clientOptions,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/Domains/${encodeURIComponent(params2)}/CredentialListMappings.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getPost20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsJsonKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/CredentialListMappings.json',
    'POST',
  ] as const
}

export function usePost20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      Static<typeof ApiV2010AccountSipSipDomainSipCredentialListMappingSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey =
    customKey ?? getPost20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsJsonKey()
  return {
    swrKey,
    ...useSWRMutation<
      Static<typeof ApiV2010AccountSipSipDomainSipCredentialListMappingSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    >(
      swrKey,
      async (
        _key: Key,
        { arg }: { arg: { body?: unknown; options?: { headers?: Record<string, string> } } },
      ) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/Domains/${encodeURIComponent(params2)}/CredentialListMappings.json`,
          {
            method: 'POST',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsSidJsonKey(
  params: string,
  params2: string,
  params3: string,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/CredentialListMappings/{Sid}.json',
    params,
    params2,
    params3,
  ] as const
}

export function useGet20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsSidJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    swr?: SWRConfiguration<
      Static<typeof ApiV2010AccountSipSipDomainSipCredentialListMappingSchema>,
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsSidJsonKey(
            params,
            params2,
            params3,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<Static<typeof ApiV2010AccountSipSipDomainSipCredentialListMappingSchema>, TError>(
      swrKey,
      async () => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/Domains/${encodeURIComponent(params2)}/CredentialListMappings/${encodeURIComponent(params3)}.json`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsSidJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    swr?: SWRConfiguration<
      Static<typeof ApiV2010AccountSipSipDomainSipCredentialListMappingSchema>,
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsSidJsonKey(
            params,
            params2,
            params3,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Static<typeof ApiV2010AccountSipSipDomainSipCredentialListMappingSchema>,
      TError
    >(
      swrKey,
      async () => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/Domains/${encodeURIComponent(params2)}/CredentialListMappings/${encodeURIComponent(params3)}.json`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getDelete20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsSidJsonKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/CredentialListMappings/{Sid}.json',
    'DELETE',
  ] as const
}

export function useDelete20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsSidJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      void,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey =
    customKey ??
    getDelete20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsSidJsonKey()
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
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/Domains/${encodeURIComponent(params2)}/CredentialListMappings/${encodeURIComponent(params3)}.json`,
          {
            method: 'DELETE',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidSIPDomainsJsonKey(
  params: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/Domains.json',
    params,
    keyArgs,
  ] as const
}

export function useGet20100401AccountsAccountSidSIPDomainsJson<TError = unknown>(
  params: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidSIPDomainsJsonKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/Domains.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidSIPDomainsJson<TError = unknown>(
  params: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidSIPDomainsJsonKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/Domains.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getPost20100401AccountsAccountSidSIPDomainsJsonKey() {
  return ['2010-04-01', '/2010-04-01/Accounts/{AccountSid}/SIP/Domains.json', 'POST'] as const
}

export function usePost20100401AccountsAccountSidSIPDomainsJson<TError = unknown>(
  params: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      Static<typeof ApiV2010AccountSipSipDomainSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPost20100401AccountsAccountSidSIPDomainsJsonKey()
  return {
    swrKey,
    ...useSWRMutation<
      Static<typeof ApiV2010AccountSipSipDomainSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    >(
      swrKey,
      async (
        _key: Key,
        { arg }: { arg: { body?: unknown; options?: { headers?: Record<string, string> } } },
      ) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/Domains.json`,
          {
            method: 'POST',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidSIPDomainsSidJsonKey(
  params: string,
  params2: string,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{Sid}.json',
    params,
    params2,
  ] as const
}

export function useGet20100401AccountsAccountSidSIPDomainsSidJson<TError = unknown>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<Static<typeof ApiV2010AccountSipSipDomainSchema>, TError> & {
      swrKey?: Key
      enabled?: boolean
    }
    options?: { headers?: Record<string, string> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidSIPDomainsSidJsonKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<Static<typeof ApiV2010AccountSipSipDomainSchema>, TError>(
      swrKey,
      async () => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/Domains/${encodeURIComponent(params2)}.json`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidSIPDomainsSidJson<TError = unknown>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<Static<typeof ApiV2010AccountSipSipDomainSchema>, TError> & {
      swrKey?: Key
      enabled?: boolean
    }
    options?: { headers?: Record<string, string> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidSIPDomainsSidJsonKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<Static<typeof ApiV2010AccountSipSipDomainSchema>, TError>(
      swrKey,
      async () => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/Domains/${encodeURIComponent(params2)}.json`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getPost20100401AccountsAccountSidSIPDomainsSidJsonKey() {
  return ['2010-04-01', '/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{Sid}.json', 'POST'] as const
}

export function usePost20100401AccountsAccountSidSIPDomainsSidJson<TError = unknown>(
  params: string,
  params2: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      Static<typeof ApiV2010AccountSipSipDomainSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPost20100401AccountsAccountSidSIPDomainsSidJsonKey()
  return {
    swrKey,
    ...useSWRMutation<
      Static<typeof ApiV2010AccountSipSipDomainSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    >(
      swrKey,
      async (
        _key: Key,
        { arg }: { arg: { body?: unknown; options?: { headers?: Record<string, string> } } },
      ) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/Domains/${encodeURIComponent(params2)}.json`,
          {
            method: 'POST',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getDelete20100401AccountsAccountSidSIPDomainsSidJsonKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{Sid}.json',
    'DELETE',
  ] as const
}

export function useDelete20100401AccountsAccountSidSIPDomainsSidJson<TError = unknown>(
  params: string,
  params2: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      void,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDelete20100401AccountsAccountSidSIPDomainsSidJsonKey()
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
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/Domains/${encodeURIComponent(params2)}.json`,
          {
            method: 'DELETE',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidSIPIpAccessControlListsJsonKey(
  params: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists.json',
    params,
    keyArgs,
  ] as const
}

export function useGet20100401AccountsAccountSidSIPIpAccessControlListsJson<TError = unknown>(
  params: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidSIPIpAccessControlListsJsonKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/IpAccessControlLists.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidSIPIpAccessControlListsJson<
  TError = unknown,
>(
  params: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidSIPIpAccessControlListsJsonKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/IpAccessControlLists.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getPost20100401AccountsAccountSidSIPIpAccessControlListsJsonKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists.json',
    'POST',
  ] as const
}

export function usePost20100401AccountsAccountSidSIPIpAccessControlListsJson<TError = unknown>(
  params: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      Static<typeof ApiV2010AccountSipSipIpAccessControlListSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPost20100401AccountsAccountSidSIPIpAccessControlListsJsonKey()
  return {
    swrKey,
    ...useSWRMutation<
      Static<typeof ApiV2010AccountSipSipIpAccessControlListSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    >(
      swrKey,
      async (
        _key: Key,
        { arg }: { arg: { body?: unknown; options?: { headers?: Record<string, string> } } },
      ) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/IpAccessControlLists.json`,
          {
            method: 'POST',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidSIPIpAccessControlListsSidJsonKey(
  params: string,
  params2: string,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists/{Sid}.json',
    params,
    params2,
  ] as const
}

export function useGet20100401AccountsAccountSidSIPIpAccessControlListsSidJson<TError = unknown>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<
      Static<typeof ApiV2010AccountSipSipIpAccessControlListSchema>,
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidSIPIpAccessControlListsSidJsonKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<Static<typeof ApiV2010AccountSipSipIpAccessControlListSchema>, TError>(
      swrKey,
      async () => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/IpAccessControlLists/${encodeURIComponent(params2)}.json`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidSIPIpAccessControlListsSidJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<
      Static<typeof ApiV2010AccountSipSipIpAccessControlListSchema>,
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidSIPIpAccessControlListsSidJsonKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<Static<typeof ApiV2010AccountSipSipIpAccessControlListSchema>, TError>(
      swrKey,
      async () => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/IpAccessControlLists/${encodeURIComponent(params2)}.json`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getPost20100401AccountsAccountSidSIPIpAccessControlListsSidJsonKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists/{Sid}.json',
    'POST',
  ] as const
}

export function usePost20100401AccountsAccountSidSIPIpAccessControlListsSidJson<TError = unknown>(
  params: string,
  params2: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      Static<typeof ApiV2010AccountSipSipIpAccessControlListSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPost20100401AccountsAccountSidSIPIpAccessControlListsSidJsonKey()
  return {
    swrKey,
    ...useSWRMutation<
      Static<typeof ApiV2010AccountSipSipIpAccessControlListSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    >(
      swrKey,
      async (
        _key: Key,
        { arg }: { arg: { body?: unknown; options?: { headers?: Record<string, string> } } },
      ) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/IpAccessControlLists/${encodeURIComponent(params2)}.json`,
          {
            method: 'POST',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getDelete20100401AccountsAccountSidSIPIpAccessControlListsSidJsonKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists/{Sid}.json',
    'DELETE',
  ] as const
}

export function useDelete20100401AccountsAccountSidSIPIpAccessControlListsSidJson<TError = unknown>(
  params: string,
  params2: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      void,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDelete20100401AccountsAccountSidSIPIpAccessControlListsSidJsonKey()
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
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/IpAccessControlLists/${encodeURIComponent(params2)}.json`,
          {
            method: 'DELETE',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsSidJsonKey(
  params: string,
  params2: string,
  params3: string,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/IpAccessControlListMappings/{Sid}.json',
    params,
    params2,
    params3,
  ] as const
}

export function useGet20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsSidJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    swr?: SWRConfiguration<
      Static<typeof ApiV2010AccountSipSipDomainSipIpAccessControlListMappingSchema>,
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsSidJsonKey(
            params,
            params2,
            params3,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Static<typeof ApiV2010AccountSipSipDomainSipIpAccessControlListMappingSchema>,
      TError
    >(
      swrKey,
      async () => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/Domains/${encodeURIComponent(params2)}/IpAccessControlListMappings/${encodeURIComponent(params3)}.json`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsSidJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    swr?: SWRConfiguration<
      Static<typeof ApiV2010AccountSipSipDomainSipIpAccessControlListMappingSchema>,
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsSidJsonKey(
            params,
            params2,
            params3,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Static<typeof ApiV2010AccountSipSipDomainSipIpAccessControlListMappingSchema>,
      TError
    >(
      swrKey,
      async () => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/Domains/${encodeURIComponent(params2)}/IpAccessControlListMappings/${encodeURIComponent(params3)}.json`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getDelete20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsSidJsonKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/IpAccessControlListMappings/{Sid}.json',
    'DELETE',
  ] as const
}

export function useDelete20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsSidJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      void,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey =
    customKey ??
    getDelete20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsSidJsonKey()
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
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/Domains/${encodeURIComponent(params2)}/IpAccessControlListMappings/${encodeURIComponent(params3)}.json`,
          {
            method: 'DELETE',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsJsonKey(
  params: string,
  params2: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/IpAccessControlListMappings.json',
    params,
    params2,
    keyArgs,
  ] as const
}

export function useGet20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsJsonKey(
            params,
            params2,
            clientOptions,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/Domains/${encodeURIComponent(params2)}/IpAccessControlListMappings.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsJsonKey(
            params,
            params2,
            clientOptions,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/Domains/${encodeURIComponent(params2)}/IpAccessControlListMappings.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getPost20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsJsonKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/IpAccessControlListMappings.json',
    'POST',
  ] as const
}

export function usePost20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      Static<typeof ApiV2010AccountSipSipDomainSipIpAccessControlListMappingSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey =
    customKey ??
    getPost20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsJsonKey()
  return {
    swrKey,
    ...useSWRMutation<
      Static<typeof ApiV2010AccountSipSipDomainSipIpAccessControlListMappingSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    >(
      swrKey,
      async (
        _key: Key,
        { arg }: { arg: { body?: unknown; options?: { headers?: Record<string, string> } } },
      ) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/Domains/${encodeURIComponent(params2)}/IpAccessControlListMappings.json`,
          {
            method: 'POST',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesJsonKey(
  params: string,
  params2: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists/{IpAccessControlListSid}/IpAddresses.json',
    params,
    params2,
    keyArgs,
  ] as const
}

export function useGet20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesJsonKey(
            params,
            params2,
            clientOptions,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/IpAccessControlLists/${encodeURIComponent(params2)}/IpAddresses.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesJsonKey(
            params,
            params2,
            clientOptions,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/IpAccessControlLists/${encodeURIComponent(params2)}/IpAddresses.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getPost20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesJsonKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists/{IpAccessControlListSid}/IpAddresses.json',
    'POST',
  ] as const
}

export function usePost20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      Static<typeof ApiV2010AccountSipSipIpAccessControlListSipIpAddressSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey =
    customKey ??
    getPost20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesJsonKey()
  return {
    swrKey,
    ...useSWRMutation<
      Static<typeof ApiV2010AccountSipSipIpAccessControlListSipIpAddressSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    >(
      swrKey,
      async (
        _key: Key,
        { arg }: { arg: { body?: unknown; options?: { headers?: Record<string, string> } } },
      ) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/IpAccessControlLists/${encodeURIComponent(params2)}/IpAddresses.json`,
          {
            method: 'POST',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesSidJsonKey(
  params: string,
  params2: string,
  params3: string,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists/{IpAccessControlListSid}/IpAddresses/{Sid}.json',
    params,
    params2,
    params3,
  ] as const
}

export function useGet20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesSidJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    swr?: SWRConfiguration<
      Static<typeof ApiV2010AccountSipSipIpAccessControlListSipIpAddressSchema>,
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesSidJsonKey(
            params,
            params2,
            params3,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<Static<typeof ApiV2010AccountSipSipIpAccessControlListSipIpAddressSchema>, TError>(
      swrKey,
      async () => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/IpAccessControlLists/${encodeURIComponent(params2)}/IpAddresses/${encodeURIComponent(params3)}.json`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesSidJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    swr?: SWRConfiguration<
      Static<typeof ApiV2010AccountSipSipIpAccessControlListSipIpAddressSchema>,
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesSidJsonKey(
            params,
            params2,
            params3,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Static<typeof ApiV2010AccountSipSipIpAccessControlListSipIpAddressSchema>,
      TError
    >(
      swrKey,
      async () => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/IpAccessControlLists/${encodeURIComponent(params2)}/IpAddresses/${encodeURIComponent(params3)}.json`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getPost20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesSidJsonKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists/{IpAccessControlListSid}/IpAddresses/{Sid}.json',
    'POST',
  ] as const
}

export function usePost20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesSidJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      Static<typeof ApiV2010AccountSipSipIpAccessControlListSipIpAddressSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey =
    customKey ??
    getPost20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesSidJsonKey()
  return {
    swrKey,
    ...useSWRMutation<
      Static<typeof ApiV2010AccountSipSipIpAccessControlListSipIpAddressSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    >(
      swrKey,
      async (
        _key: Key,
        { arg }: { arg: { body?: unknown; options?: { headers?: Record<string, string> } } },
      ) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/IpAccessControlLists/${encodeURIComponent(params2)}/IpAddresses/${encodeURIComponent(params3)}.json`,
          {
            method: 'POST',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getDelete20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesSidJsonKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists/{IpAccessControlListSid}/IpAddresses/{Sid}.json',
    'DELETE',
  ] as const
}

export function useDelete20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesSidJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      void,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey =
    customKey ??
    getDelete20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesSidJsonKey()
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
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/SIP/IpAccessControlLists/${encodeURIComponent(params2)}/IpAddresses/${encodeURIComponent(params3)}.json`,
          {
            method: 'DELETE',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getPost20100401AccountsAccountSidCallsCallSidSiprecJsonKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Siprec.json',
    'POST',
  ] as const
}

export function usePost20100401AccountsAccountSidCallsCallSidSiprecJson<TError = unknown>(
  params: string,
  params2: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      Static<typeof ApiV2010AccountCallSiprecSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPost20100401AccountsAccountSidCallsCallSidSiprecJsonKey()
  return {
    swrKey,
    ...useSWRMutation<
      Static<typeof ApiV2010AccountCallSiprecSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    >(
      swrKey,
      async (
        _key: Key,
        { arg }: { arg: { body?: unknown; options?: { headers?: Record<string, string> } } },
      ) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Calls/${encodeURIComponent(params2)}/Siprec.json`,
          {
            method: 'POST',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getPost20100401AccountsAccountSidCallsCallSidSiprecSidJsonKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Siprec/{Sid}.json',
    'POST',
  ] as const
}

export function usePost20100401AccountsAccountSidCallsCallSidSiprecSidJson<TError = unknown>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      Static<typeof ApiV2010AccountCallSiprecSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPost20100401AccountsAccountSidCallsCallSidSiprecSidJsonKey()
  return {
    swrKey,
    ...useSWRMutation<
      Static<typeof ApiV2010AccountCallSiprecSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    >(
      swrKey,
      async (
        _key: Key,
        { arg }: { arg: { body?: unknown; options?: { headers?: Record<string, string> } } },
      ) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Calls/${encodeURIComponent(params2)}/Siprec/${encodeURIComponent(params3)}.json`,
          {
            method: 'POST',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getPost20100401AccountsAccountSidCallsCallSidStreamsJsonKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Streams.json',
    'POST',
  ] as const
}

export function usePost20100401AccountsAccountSidCallsCallSidStreamsJson<TError = unknown>(
  params: string,
  params2: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      Static<typeof ApiV2010AccountCallStreamSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPost20100401AccountsAccountSidCallsCallSidStreamsJsonKey()
  return {
    swrKey,
    ...useSWRMutation<
      Static<typeof ApiV2010AccountCallStreamSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    >(
      swrKey,
      async (
        _key: Key,
        { arg }: { arg: { body?: unknown; options?: { headers?: Record<string, string> } } },
      ) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Calls/${encodeURIComponent(params2)}/Streams.json`,
          {
            method: 'POST',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getPost20100401AccountsAccountSidCallsCallSidStreamsSidJsonKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Streams/{Sid}.json',
    'POST',
  ] as const
}

export function usePost20100401AccountsAccountSidCallsCallSidStreamsSidJson<TError = unknown>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      Static<typeof ApiV2010AccountCallStreamSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPost20100401AccountsAccountSidCallsCallSidStreamsSidJsonKey()
  return {
    swrKey,
    ...useSWRMutation<
      Static<typeof ApiV2010AccountCallStreamSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    >(
      swrKey,
      async (
        _key: Key,
        { arg }: { arg: { body?: unknown; options?: { headers?: Record<string, string> } } },
      ) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Calls/${encodeURIComponent(params2)}/Streams/${encodeURIComponent(params3)}.json`,
          {
            method: 'POST',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getPost20100401AccountsAccountSidTokensJsonKey() {
  return ['2010-04-01', '/2010-04-01/Accounts/{AccountSid}/Tokens.json', 'POST'] as const
}

export function usePost20100401AccountsAccountSidTokensJson<TError = unknown>(
  params: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      Static<typeof ApiV2010AccountTokenSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPost20100401AccountsAccountSidTokensJsonKey()
  return {
    swrKey,
    ...useSWRMutation<
      Static<typeof ApiV2010AccountTokenSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    >(
      swrKey,
      async (
        _key: Key,
        { arg }: { arg: { body?: unknown; options?: { headers?: Record<string, string> } } },
      ) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Tokens.json`,
          {
            method: 'POST',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidTranscriptionsSidJsonKey(
  params: string,
  params2: string,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Transcriptions/{Sid}.json',
    params,
    params2,
  ] as const
}

export function useGet20100401AccountsAccountSidTranscriptionsSidJson<TError = unknown>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<Static<typeof ApiV2010AccountTranscriptionSchema>, TError> & {
      swrKey?: Key
      enabled?: boolean
    }
    options?: { headers?: Record<string, string> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidTranscriptionsSidJsonKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<Static<typeof ApiV2010AccountTranscriptionSchema>, TError>(
      swrKey,
      async () => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Transcriptions/${encodeURIComponent(params2)}.json`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidTranscriptionsSidJson<TError = unknown>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<Static<typeof ApiV2010AccountTranscriptionSchema>, TError> & {
      swrKey?: Key
      enabled?: boolean
    }
    options?: { headers?: Record<string, string> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidTranscriptionsSidJsonKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<Static<typeof ApiV2010AccountTranscriptionSchema>, TError>(
      swrKey,
      async () => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Transcriptions/${encodeURIComponent(params2)}.json`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getDelete20100401AccountsAccountSidTranscriptionsSidJsonKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Transcriptions/{Sid}.json',
    'DELETE',
  ] as const
}

export function useDelete20100401AccountsAccountSidTranscriptionsSidJson<TError = unknown>(
  params: string,
  params2: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      void,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDelete20100401AccountsAccountSidTranscriptionsSidJsonKey()
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
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Transcriptions/${encodeURIComponent(params2)}.json`,
          {
            method: 'DELETE',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidTranscriptionsJsonKey(
  params: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Transcriptions.json',
    params,
    keyArgs,
  ] as const
}

export function useGet20100401AccountsAccountSidTranscriptionsJson<TError = unknown>(
  params: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidTranscriptionsJsonKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Transcriptions.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidTranscriptionsJson<TError = unknown>(
  params: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidTranscriptionsJsonKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Transcriptions.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidUsageRecordsJsonKey(
  params: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Usage/Records.json',
    params,
    keyArgs,
  ] as const
}

export function useGet20100401AccountsAccountSidUsageRecordsJson<TError = unknown>(
  params: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidUsageRecordsJsonKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Usage/Records.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidUsageRecordsJson<TError = unknown>(
  params: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidUsageRecordsJsonKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Usage/Records.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidUsageRecordsAllTimeJsonKey(
  params: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Usage/Records/AllTime.json',
    params,
    keyArgs,
  ] as const
}

export function useGet20100401AccountsAccountSidUsageRecordsAllTimeJson<TError = unknown>(
  params: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidUsageRecordsAllTimeJsonKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Usage/Records/AllTime.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidUsageRecordsAllTimeJson<TError = unknown>(
  params: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidUsageRecordsAllTimeJsonKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Usage/Records/AllTime.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidUsageRecordsDailyJsonKey(
  params: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Usage/Records/Daily.json',
    params,
    keyArgs,
  ] as const
}

export function useGet20100401AccountsAccountSidUsageRecordsDailyJson<TError = unknown>(
  params: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidUsageRecordsDailyJsonKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Usage/Records/Daily.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidUsageRecordsDailyJson<TError = unknown>(
  params: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidUsageRecordsDailyJsonKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Usage/Records/Daily.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidUsageRecordsLastMonthJsonKey(
  params: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Usage/Records/LastMonth.json',
    params,
    keyArgs,
  ] as const
}

export function useGet20100401AccountsAccountSidUsageRecordsLastMonthJson<TError = unknown>(
  params: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidUsageRecordsLastMonthJsonKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Usage/Records/LastMonth.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidUsageRecordsLastMonthJson<
  TError = unknown,
>(
  params: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidUsageRecordsLastMonthJsonKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Usage/Records/LastMonth.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidUsageRecordsMonthlyJsonKey(
  params: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Usage/Records/Monthly.json',
    params,
    keyArgs,
  ] as const
}

export function useGet20100401AccountsAccountSidUsageRecordsMonthlyJson<TError = unknown>(
  params: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidUsageRecordsMonthlyJsonKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Usage/Records/Monthly.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidUsageRecordsMonthlyJson<TError = unknown>(
  params: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidUsageRecordsMonthlyJsonKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Usage/Records/Monthly.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidUsageRecordsThisMonthJsonKey(
  params: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Usage/Records/ThisMonth.json',
    params,
    keyArgs,
  ] as const
}

export function useGet20100401AccountsAccountSidUsageRecordsThisMonthJson<TError = unknown>(
  params: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidUsageRecordsThisMonthJsonKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Usage/Records/ThisMonth.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidUsageRecordsThisMonthJson<
  TError = unknown,
>(
  params: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidUsageRecordsThisMonthJsonKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Usage/Records/ThisMonth.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidUsageRecordsTodayJsonKey(
  params: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Usage/Records/Today.json',
    params,
    keyArgs,
  ] as const
}

export function useGet20100401AccountsAccountSidUsageRecordsTodayJson<TError = unknown>(
  params: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidUsageRecordsTodayJsonKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Usage/Records/Today.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidUsageRecordsTodayJson<TError = unknown>(
  params: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidUsageRecordsTodayJsonKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Usage/Records/Today.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidUsageRecordsYearlyJsonKey(
  params: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Usage/Records/Yearly.json',
    params,
    keyArgs,
  ] as const
}

export function useGet20100401AccountsAccountSidUsageRecordsYearlyJson<TError = unknown>(
  params: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidUsageRecordsYearlyJsonKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Usage/Records/Yearly.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidUsageRecordsYearlyJson<TError = unknown>(
  params: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidUsageRecordsYearlyJsonKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Usage/Records/Yearly.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidUsageRecordsYesterdayJsonKey(
  params: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Usage/Records/Yesterday.json',
    params,
    keyArgs,
  ] as const
}

export function useGet20100401AccountsAccountSidUsageRecordsYesterdayJson<TError = unknown>(
  params: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidUsageRecordsYesterdayJsonKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Usage/Records/Yesterday.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidUsageRecordsYesterdayJson<
  TError = unknown,
>(
  params: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidUsageRecordsYesterdayJsonKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Usage/Records/Yesterday.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidUsageTriggersSidJsonKey(
  params: string,
  params2: string,
) {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Usage/Triggers/{Sid}.json',
    params,
    params2,
  ] as const
}

export function useGet20100401AccountsAccountSidUsageTriggersSidJson<TError = unknown>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<Static<typeof ApiV2010AccountUsageUsageTriggerSchema>, TError> & {
      swrKey?: Key
      enabled?: boolean
    }
    options?: { headers?: Record<string, string> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidUsageTriggersSidJsonKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<Static<typeof ApiV2010AccountUsageUsageTriggerSchema>, TError>(
      swrKey,
      async () => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Usage/Triggers/${encodeURIComponent(params2)}.json`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidUsageTriggersSidJson<TError = unknown>(
  params: string,
  params2: string,
  options?: {
    swr?: SWRConfiguration<Static<typeof ApiV2010AccountUsageUsageTriggerSchema>, TError> & {
      swrKey?: Key
      enabled?: boolean
    }
    options?: { headers?: Record<string, string> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidUsageTriggersSidJsonKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<Static<typeof ApiV2010AccountUsageUsageTriggerSchema>, TError>(
      swrKey,
      async () => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Usage/Triggers/${encodeURIComponent(params2)}.json`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getPost20100401AccountsAccountSidUsageTriggersSidJsonKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Usage/Triggers/{Sid}.json',
    'POST',
  ] as const
}

export function usePost20100401AccountsAccountSidUsageTriggersSidJson<TError = unknown>(
  params: string,
  params2: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      Static<typeof ApiV2010AccountUsageUsageTriggerSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPost20100401AccountsAccountSidUsageTriggersSidJsonKey()
  return {
    swrKey,
    ...useSWRMutation<
      Static<typeof ApiV2010AccountUsageUsageTriggerSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    >(
      swrKey,
      async (
        _key: Key,
        { arg }: { arg: { body?: unknown; options?: { headers?: Record<string, string> } } },
      ) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Usage/Triggers/${encodeURIComponent(params2)}.json`,
          {
            method: 'POST',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getDelete20100401AccountsAccountSidUsageTriggersSidJsonKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Usage/Triggers/{Sid}.json',
    'DELETE',
  ] as const
}

export function useDelete20100401AccountsAccountSidUsageTriggersSidJson<TError = unknown>(
  params: string,
  params2: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      void,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDelete20100401AccountsAccountSidUsageTriggersSidJsonKey()
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
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Usage/Triggers/${encodeURIComponent(params2)}.json`,
          {
            method: 'DELETE',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getGet20100401AccountsAccountSidUsageTriggersJsonKey(
  params: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Usage/Triggers.json',
    params,
    keyArgs,
  ] as const
}

export function useGet20100401AccountsAccountSidUsageTriggersJson<TError = unknown>(
  params: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidUsageTriggersJsonKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Usage/Triggers.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGet20100401AccountsAccountSidUsageTriggersJson<TError = unknown>(
  params: string,
  options?: {
    swr?: SWRConfiguration<unknown, TError> & { swrKey?: Key; enabled?: boolean }
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGet20100401AccountsAccountSidUsageTriggersJsonKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<unknown, TError>(
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
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Usage/Triggers.json${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restSwrOptions,
    ),
  }
}

export function getPost20100401AccountsAccountSidUsageTriggersJsonKey() {
  return ['2010-04-01', '/2010-04-01/Accounts/{AccountSid}/Usage/Triggers.json', 'POST'] as const
}

export function usePost20100401AccountsAccountSidUsageTriggersJson<TError = unknown>(
  params: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      Static<typeof ApiV2010AccountUsageUsageTriggerSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPost20100401AccountsAccountSidUsageTriggersJsonKey()
  return {
    swrKey,
    ...useSWRMutation<
      Static<typeof ApiV2010AccountUsageUsageTriggerSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    >(
      swrKey,
      async (
        _key: Key,
        { arg }: { arg: { body?: unknown; options?: { headers?: Record<string, string> } } },
      ) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Usage/Triggers.json`,
          {
            method: 'POST',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getPost20100401AccountsAccountSidCallsCallSidUserDefinedMessagesJsonKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/UserDefinedMessages.json',
    'POST',
  ] as const
}

export function usePost20100401AccountsAccountSidCallsCallSidUserDefinedMessagesJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      Static<typeof ApiV2010AccountCallUserDefinedMessageSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey =
    customKey ?? getPost20100401AccountsAccountSidCallsCallSidUserDefinedMessagesJsonKey()
  return {
    swrKey,
    ...useSWRMutation<
      Static<typeof ApiV2010AccountCallUserDefinedMessageSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    >(
      swrKey,
      async (
        _key: Key,
        { arg }: { arg: { body?: unknown; options?: { headers?: Record<string, string> } } },
      ) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Calls/${encodeURIComponent(params2)}/UserDefinedMessages.json`,
          {
            method: 'POST',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getPost20100401AccountsAccountSidCallsCallSidUserDefinedMessageSubscriptionsJsonKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/UserDefinedMessageSubscriptions.json',
    'POST',
  ] as const
}

export function usePost20100401AccountsAccountSidCallsCallSidUserDefinedMessageSubscriptionsJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      Static<typeof ApiV2010AccountCallUserDefinedMessageSubscriptionSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey =
    customKey ??
    getPost20100401AccountsAccountSidCallsCallSidUserDefinedMessageSubscriptionsJsonKey()
  return {
    swrKey,
    ...useSWRMutation<
      Static<typeof ApiV2010AccountCallUserDefinedMessageSubscriptionSchema>,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    >(
      swrKey,
      async (
        _key: Key,
        { arg }: { arg: { body?: unknown; options?: { headers?: Record<string, string> } } },
      ) => {
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Calls/${encodeURIComponent(params2)}/UserDefinedMessageSubscriptions.json`,
          {
            method: 'POST',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}

export function getDelete20100401AccountsAccountSidCallsCallSidUserDefinedMessageSubscriptionsSidJsonKey() {
  return [
    '2010-04-01',
    '/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/UserDefinedMessageSubscriptions/{Sid}.json',
    'DELETE',
  ] as const
}

export function useDelete20100401AccountsAccountSidCallsCallSidUserDefinedMessageSubscriptionsSidJson<
  TError = unknown,
>(
  params: string,
  params2: string,
  params3: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      void,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey =
    customKey ??
    getDelete20100401AccountsAccountSidCallsCallSidUserDefinedMessageSubscriptionsSidJsonKey()
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
        const res = await fetch(
          `${clientOrigin}/2010-04-01/Accounts/${encodeURIComponent(params)}/Calls/${encodeURIComponent(params2)}/UserDefinedMessageSubscriptions/${encodeURIComponent(params3)}.json`,
          {
            method: 'DELETE',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
      restMutationOptions,
    ),
  }
}
