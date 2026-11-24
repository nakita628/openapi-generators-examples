import useSWR from 'swr'
import useSWRImmutable from 'swr/immutable'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { Static } from 'elysia'
import type { BetaResponseSchema } from '../components/schemas'
import { client, clientOrigin } from '../lib'

const ISO8601 =
  /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/u

const FORMAL_DATE =
  /(?:Sun|Mon|Tue|Wed|Thu|Fri|Sat)\s(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s\d{2}\s\d{4}\s\d{2}:\d{2}:\d{2}\sGMT(?:\+|-)\d{4}\s\([^)]+\)/u

const SHORTENED_DATE =
  /^(?:(?:(?:(?:0?[1-9]|[12][0-9]|3[01])[/\s-](?:0?[1-9]|1[0-2])[/\s-](?:19|20)\d{2})|(?:(?:19|20)\d{2}[/\s-](?:0?[1-9]|1[0-2])[/\s-](?:0?[1-9]|[12][0-9]|3[01]))))(?:\s(?:1[012]|0?[1-9]):[0-5][0-9](?::[0-5][0-9])?(?:\s[AP]M)?)?$/u

function reviveDate(_key: string, value: unknown) {
  if (typeof value !== 'string') return value
  const text = value.replace(/"/gu, '')
  if (!ISO8601.test(text) && !FORMAL_DATE.test(text) && !SHORTENED_DATE.test(text)) return value
  const date = new Date(text)
  return Number.isNaN(date.getTime()) ? value : date
}

async function readResponse(res: Response) {
  const text = await res.text()
  if (res.ok) return text === '' ? undefined : JSON.parse(text, reviveDate)
  let error: unknown
  try {
    error = JSON.parse(text, reviveDate)
  } catch {
    error = Object.assign(new Error(`${res.status} ${res.statusText}`.trim()), {
      status: res.status,
      value: text,
    })
  }
  throw error
}

function toSearch(query: Record<string, unknown> | undefined) {
  const search = new URLSearchParams()
  for (const [key, value] of Object.entries(query ?? {})) {
    for (const item of Array.isArray(value) ? value : [value]) {
      if (item === undefined || item === null) continue
      search.append(
        key,
        item instanceof Date
          ? item.toISOString()
          : typeof item === 'object'
            ? JSON.stringify(item)
            : String(item),
      )
    }
  }
  return search
}

export function getAgentsKey() {
  return ['agents'] as const
}

export function getAssistantsKey() {
  return ['assistants'] as const
}

export function getAudioKey() {
  return ['audio'] as const
}

export function getBatchesKey() {
  return ['batches'] as const
}

export function getChatKey() {
  return ['chat'] as const
}

export function getChatkitKey() {
  return ['chatkit'] as const
}

export function getCompletionsKey() {
  return ['completions'] as const
}

export function getContainersKey() {
  return ['containers'] as const
}

export function getContentProvenanceChecksKey() {
  return ['content_provenance_checks'] as const
}

export function getConversationsKey() {
  return ['conversations'] as const
}

export function getDecisionsKey() {
  return ['decisions'] as const
}

export function getEmbeddingsKey() {
  return ['embeddings'] as const
}

export function getEvalsKey() {
  return ['evals'] as const
}

export function getFilesKey() {
  return ['files'] as const
}

export function getFineTuningKey() {
  return ['fine_tuning'] as const
}

export function getImagesKey() {
  return ['images'] as const
}

export function getLiveKey() {
  return ['live'] as const
}

export function getModelsKey() {
  return ['models'] as const
}

export function getModerationsKey() {
  return ['moderations'] as const
}

export function getOrganizationKey() {
  return ['organization'] as const
}

export function getProjectsKey() {
  return ['projects'] as const
}

export function getRealtimeKey() {
  return ['realtime'] as const
}

export function getResponsesKey() {
  return ['responses'] as const
}

export function getResponsesBetaTrueKey() {
  return ['responses?beta=true'] as const
}

export function getSafetyKey() {
  return ['safety'] as const
}

export function getSkillsKey() {
  return ['skills'] as const
}

export function getThreadsKey() {
  return ['threads'] as const
}

export function getUploadsKey() {
  return ['uploads'] as const
}

export function getVaultsKey() {
  return ['vaults'] as const
}

export function getVectorStoresKey() {
  return ['vector_stores'] as const
}

export function getVideosKey() {
  return ['videos'] as const
}

export function getWebhookEndpointsKey() {
  return ['webhook_endpoints'] as const
}

export function getWebhookEventTypesKey() {
  return ['webhook_event_types'] as const
}

export function getGetAssistantsKey(options?: Parameters<typeof client.assistants.get>[0]) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['assistants', '/assistants', keyArgs] as const
}

export function useGetAssistants<
  TError = Exclude<Awaited<ReturnType<typeof client.assistants.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.assistants.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.assistants.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetAssistantsKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<Awaited<ReturnType<typeof client.assistants.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.assistants.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetAssistants<
  TError = Exclude<Awaited<ReturnType<typeof client.assistants.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.assistants.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.assistants.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetAssistantsKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<Awaited<ReturnType<typeof client.assistants.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.assistants.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostAssistantsKey() {
  return ['assistants', '/assistants', 'POST'] as const
}

export function usePostAssistants<
  TError = Exclude<Awaited<ReturnType<typeof client.assistants.post>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.assistants.post>>, { error: null }>['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.assistants.post>[0]
      options?: Parameters<typeof client.assistants.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostAssistantsKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<Awaited<ReturnType<typeof client.assistants.post>>, { error: null }>['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.assistants.post>[0]
        options?: Parameters<typeof client.assistants.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.assistants.post>[0]
            options?: Parameters<typeof client.assistants.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.assistants.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetAssistantsAssistantIdKey(params: Parameters<typeof client.assistants>[0]) {
  return ['assistants', '/assistants/{assistant_id}', params] as const
}

export function useGetAssistantsAssistantId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.assistants>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.assistants>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.assistants>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.assistants>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetAssistantsAssistantIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.assistants>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.assistants(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetAssistantsAssistantId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.assistants>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.assistants>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.assistants>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.assistants>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetAssistantsAssistantIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.assistants>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.assistants(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostAssistantsAssistantIdKey() {
  return ['assistants', '/assistants/{assistant_id}', 'POST'] as const
}

export function usePostAssistantsAssistantId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.assistants>['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.assistants>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.assistants>['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.assistants>['post']>[0]
        options?: Parameters<ReturnType<typeof client.assistants>['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostAssistantsAssistantIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.assistants>['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.assistants>['post']>[0]
        options?: Parameters<ReturnType<typeof client.assistants>['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.assistants>['post']>[0]
            options?: Parameters<ReturnType<typeof client.assistants>['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client.assistants(params).post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getDeleteAssistantsAssistantIdKey() {
  return ['assistants', '/assistants/{assistant_id}', 'DELETE'] as const
}

export function useDeleteAssistantsAssistantId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.assistants>['delete']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.assistants>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.assistants>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.assistants>['delete']>[0]
        options?: Parameters<ReturnType<typeof client.assistants>['delete']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteAssistantsAssistantIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.assistants>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.assistants>['delete']>[0]
        options?: Parameters<ReturnType<typeof client.assistants>['delete']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<ReturnType<typeof client.assistants>['delete']>[0]
            options?: Parameters<ReturnType<typeof client.assistants>['delete']>[1]
          }
        },
      ) => {
        const { data, error } = await client.assistants(params).delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostAudioSpeechKey() {
  return ['audio', '/audio/speech', 'POST'] as const
}

export function usePostAudioSpeech<
  TError = Exclude<Awaited<ReturnType<typeof client.audio.speech.post>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.audio.speech.post>>, { error: null }>['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.audio.speech.post>[0]
      options?: Parameters<typeof client.audio.speech.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostAudioSpeechKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<Awaited<ReturnType<typeof client.audio.speech.post>>, { error: null }>['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.audio.speech.post>[0]
        options?: Parameters<typeof client.audio.speech.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.audio.speech.post>[0]
            options?: Parameters<typeof client.audio.speech.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.audio.speech.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostAudioTranscriptionsKey() {
  return ['audio', '/audio/transcriptions', 'POST'] as const
}

export function usePostAudioTranscriptions<
  TError = Exclude<Awaited<ReturnType<typeof client.audio.transcriptions.post>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.audio.transcriptions.post>>, { error: null }>['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.audio.transcriptions.post>[0]
      options?: Parameters<typeof client.audio.transcriptions.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostAudioTranscriptionsKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<typeof client.audio.transcriptions.post>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.audio.transcriptions.post>[0]
        options?: Parameters<typeof client.audio.transcriptions.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.audio.transcriptions.post>[0]
            options?: Parameters<typeof client.audio.transcriptions.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.audio.transcriptions.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostAudioTranslationsKey() {
  return ['audio', '/audio/translations', 'POST'] as const
}

export function usePostAudioTranslations<
  TError = Exclude<Awaited<ReturnType<typeof client.audio.translations.post>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.audio.translations.post>>, { error: null }>['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.audio.translations.post>[0]
      options?: Parameters<typeof client.audio.translations.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostAudioTranslationsKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<Awaited<ReturnType<typeof client.audio.translations.post>>, { error: null }>['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.audio.translations.post>[0]
        options?: Parameters<typeof client.audio.translations.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.audio.translations.post>[0]
            options?: Parameters<typeof client.audio.translations.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.audio.translations.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetAudioVoiceConsentsKey(
  options?: Parameters<typeof client.audio.voice_consents.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['audio', '/audio/voice_consents', keyArgs] as const
}

export function useGetAudioVoiceConsents<
  TError = Exclude<Awaited<ReturnType<typeof client.audio.voice_consents.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.audio.voice_consents.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.audio.voice_consents.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetAudioVoiceConsentsKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<Awaited<ReturnType<typeof client.audio.voice_consents.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.audio.voice_consents.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetAudioVoiceConsents<
  TError = Exclude<Awaited<ReturnType<typeof client.audio.voice_consents.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.audio.voice_consents.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.audio.voice_consents.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetAudioVoiceConsentsKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<Awaited<ReturnType<typeof client.audio.voice_consents.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.audio.voice_consents.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostAudioVoiceConsentsKey() {
  return ['audio', '/audio/voice_consents', 'POST'] as const
}

export function usePostAudioVoiceConsents<
  TError = Exclude<Awaited<ReturnType<typeof client.audio.voice_consents.post>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.audio.voice_consents.post>>, { error: null }>['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.audio.voice_consents.post>[0]
      options?: Parameters<typeof client.audio.voice_consents.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostAudioVoiceConsentsKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<typeof client.audio.voice_consents.post>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.audio.voice_consents.post>[0]
        options?: Parameters<typeof client.audio.voice_consents.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.audio.voice_consents.post>[0]
            options?: Parameters<typeof client.audio.voice_consents.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.audio.voice_consents.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetAudioVoiceConsentsConsentIdKey(
  params: Parameters<typeof client.audio.voice_consents>[0],
) {
  return ['audio', '/audio/voice_consents/{consent_id}', params] as const
}

export function useGetAudioVoiceConsentsConsentId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.audio.voice_consents>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.audio.voice_consents>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.audio.voice_consents>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.audio.voice_consents>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetAudioVoiceConsentsConsentIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.audio.voice_consents>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.audio.voice_consents(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetAudioVoiceConsentsConsentId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.audio.voice_consents>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.audio.voice_consents>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.audio.voice_consents>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.audio.voice_consents>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetAudioVoiceConsentsConsentIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.audio.voice_consents>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.audio.voice_consents(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostAudioVoiceConsentsConsentIdKey() {
  return ['audio', '/audio/voice_consents/{consent_id}', 'POST'] as const
}

export function usePostAudioVoiceConsentsConsentId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.audio.voice_consents>['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.audio.voice_consents>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.audio.voice_consents>['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.audio.voice_consents>['post']>[0]
        options?: Parameters<ReturnType<typeof client.audio.voice_consents>['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostAudioVoiceConsentsConsentIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.audio.voice_consents>['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.audio.voice_consents>['post']>[0]
        options?: Parameters<ReturnType<typeof client.audio.voice_consents>['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.audio.voice_consents>['post']>[0]
            options?: Parameters<ReturnType<typeof client.audio.voice_consents>['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client.audio
          .voice_consents(params)
          .post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getDeleteAudioVoiceConsentsConsentIdKey() {
  return ['audio', '/audio/voice_consents/{consent_id}', 'DELETE'] as const
}

export function useDeleteAudioVoiceConsentsConsentId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.audio.voice_consents>['delete']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.audio.voice_consents>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.audio.voice_consents>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.audio.voice_consents>['delete']>[0]
        options?: Parameters<ReturnType<typeof client.audio.voice_consents>['delete']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteAudioVoiceConsentsConsentIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.audio.voice_consents>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.audio.voice_consents>['delete']>[0]
        options?: Parameters<ReturnType<typeof client.audio.voice_consents>['delete']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<ReturnType<typeof client.audio.voice_consents>['delete']>[0]
            options?: Parameters<ReturnType<typeof client.audio.voice_consents>['delete']>[1]
          }
        },
      ) => {
        const { data, error } = await client.audio
          .voice_consents(params)
          .delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostAudioVoicesKey() {
  return ['audio', '/audio/voices', 'POST'] as const
}

export function usePostAudioVoices<
  TError = Exclude<Awaited<ReturnType<typeof client.audio.voices.post>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.audio.voices.post>>, { error: null }>['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.audio.voices.post>[0]
      options?: Parameters<typeof client.audio.voices.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostAudioVoicesKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<Awaited<ReturnType<typeof client.audio.voices.post>>, { error: null }>['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.audio.voices.post>[0]
        options?: Parameters<typeof client.audio.voices.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.audio.voices.post>[0]
            options?: Parameters<typeof client.audio.voices.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.audio.voices.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getDeleteAudioVoicesVoiceIdKey() {
  return ['audio', '/audio/voices/{voice_id}', 'DELETE'] as const
}

export function useDeleteAudioVoicesVoiceId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.audio.voices>['delete']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.audio.voices>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.audio.voices>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.audio.voices>['delete']>[0]
        options?: Parameters<ReturnType<typeof client.audio.voices>['delete']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteAudioVoicesVoiceIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.audio.voices>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.audio.voices>['delete']>[0]
        options?: Parameters<ReturnType<typeof client.audio.voices>['delete']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<ReturnType<typeof client.audio.voices>['delete']>[0]
            options?: Parameters<ReturnType<typeof client.audio.voices>['delete']>[1]
          }
        },
      ) => {
        const { data, error } = await client.audio.voices(params).delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetBatchesKey(options?: Parameters<typeof client.batches.get>[0]) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['batches', '/batches', keyArgs] as const
}

export function useGetBatches<
  TError = Exclude<Awaited<ReturnType<typeof client.batches.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.batches.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.batches.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetBatchesKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<Awaited<ReturnType<typeof client.batches.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.batches.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetBatches<
  TError = Exclude<Awaited<ReturnType<typeof client.batches.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.batches.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.batches.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetBatchesKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<Awaited<ReturnType<typeof client.batches.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.batches.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostBatchesKey() {
  return ['batches', '/batches', 'POST'] as const
}

export function usePostBatches<
  TError = Exclude<Awaited<ReturnType<typeof client.batches.post>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.batches.post>>, { error: null }>['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.batches.post>[0]
      options?: Parameters<typeof client.batches.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostBatchesKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<Awaited<ReturnType<typeof client.batches.post>>, { error: null }>['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.batches.post>[0]
        options?: Parameters<typeof client.batches.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.batches.post>[0]
            options?: Parameters<typeof client.batches.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.batches.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetBatchesBatchIdKey(params: Parameters<typeof client.batches>[0]) {
  return ['batches', '/batches/{batch_id}', params] as const
}

export function useGetBatchesBatchId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.batches>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.batches>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.batches>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.batches>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetBatchesBatchIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.batches>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.batches(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetBatchesBatchId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.batches>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.batches>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.batches>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.batches>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetBatchesBatchIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.batches>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.batches(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostBatchesBatchIdCancelKey() {
  return ['batches', '/batches/{batch_id}/cancel', 'POST'] as const
}

export function usePostBatchesBatchIdCancel<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.batches>['cancel']['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.batches>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.batches>['cancel']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.batches>['cancel']['post']>[0]
        options?: Parameters<ReturnType<typeof client.batches>['cancel']['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostBatchesBatchIdCancelKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.batches>['cancel']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.batches>['cancel']['post']>[0]
        options?: Parameters<ReturnType<typeof client.batches>['cancel']['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<ReturnType<typeof client.batches>['cancel']['post']>[0]
            options?: Parameters<ReturnType<typeof client.batches>['cancel']['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client.batches(params).cancel.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetChatCompletionsKey(
  options?: Parameters<typeof client.chat.completions.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['chat', '/chat/completions', keyArgs] as const
}

export function useGetChatCompletions<
  TError = Exclude<Awaited<ReturnType<typeof client.chat.completions.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.chat.completions.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.chat.completions.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetChatCompletionsKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<Awaited<ReturnType<typeof client.chat.completions.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.chat.completions.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetChatCompletions<
  TError = Exclude<Awaited<ReturnType<typeof client.chat.completions.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.chat.completions.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.chat.completions.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetChatCompletionsKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<Awaited<ReturnType<typeof client.chat.completions.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.chat.completions.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostChatCompletionsKey() {
  return ['chat', '/chat/completions', 'POST'] as const
}

export function usePostChatCompletions<
  TError = Exclude<Awaited<ReturnType<typeof client.chat.completions.post>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.chat.completions.post>>, { error: null }>['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.chat.completions.post>[0]
      options?: Parameters<typeof client.chat.completions.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostChatCompletionsKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<Awaited<ReturnType<typeof client.chat.completions.post>>, { error: null }>['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.chat.completions.post>[0]
        options?: Parameters<typeof client.chat.completions.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.chat.completions.post>[0]
            options?: Parameters<typeof client.chat.completions.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.chat.completions.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetChatCompletionsCompletionIdKey(
  params: Parameters<typeof client.chat.completions>[0],
) {
  return ['chat', '/chat/completions/{completion_id}', params] as const
}

export function useGetChatCompletionsCompletionId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.chat.completions>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.chat.completions>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.chat.completions>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.chat.completions>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetChatCompletionsCompletionIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.chat.completions>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.chat.completions(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetChatCompletionsCompletionId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.chat.completions>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.chat.completions>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.chat.completions>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.chat.completions>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetChatCompletionsCompletionIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.chat.completions>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.chat.completions(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostChatCompletionsCompletionIdKey() {
  return ['chat', '/chat/completions/{completion_id}', 'POST'] as const
}

export function usePostChatCompletionsCompletionId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.chat.completions>['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.chat.completions>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.chat.completions>['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.chat.completions>['post']>[0]
        options?: Parameters<ReturnType<typeof client.chat.completions>['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostChatCompletionsCompletionIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.chat.completions>['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.chat.completions>['post']>[0]
        options?: Parameters<ReturnType<typeof client.chat.completions>['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.chat.completions>['post']>[0]
            options?: Parameters<ReturnType<typeof client.chat.completions>['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client.chat.completions(params).post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getDeleteChatCompletionsCompletionIdKey() {
  return ['chat', '/chat/completions/{completion_id}', 'DELETE'] as const
}

export function useDeleteChatCompletionsCompletionId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.chat.completions>['delete']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.chat.completions>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.chat.completions>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.chat.completions>['delete']>[0]
        options?: Parameters<ReturnType<typeof client.chat.completions>['delete']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteChatCompletionsCompletionIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.chat.completions>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.chat.completions>['delete']>[0]
        options?: Parameters<ReturnType<typeof client.chat.completions>['delete']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<ReturnType<typeof client.chat.completions>['delete']>[0]
            options?: Parameters<ReturnType<typeof client.chat.completions>['delete']>[1]
          }
        },
      ) => {
        const { data, error } = await client.chat.completions(params).delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetChatCompletionsCompletionIdMessagesKey(
  params: Parameters<typeof client.chat.completions>[0],
  options?: Parameters<ReturnType<typeof client.chat.completions>['messages']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['chat', '/chat/completions/{completion_id}/messages', params, keyArgs] as const
}

export function useGetChatCompletionsCompletionIdMessages<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.chat.completions>['messages']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.chat.completions>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.chat.completions>['messages']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.chat.completions>['messages']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetChatCompletionsCompletionIdMessagesKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.chat.completions>['messages']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.chat.completions(params).messages.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetChatCompletionsCompletionIdMessages<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.chat.completions>['messages']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.chat.completions>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.chat.completions>['messages']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.chat.completions>['messages']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetChatCompletionsCompletionIdMessagesKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.chat.completions>['messages']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.chat.completions(params).messages.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostCompletionsKey() {
  return ['completions', '/completions', 'POST'] as const
}

export function usePostCompletions<
  TError = Exclude<Awaited<ReturnType<typeof client.completions.post>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.completions.post>>, { error: null }>['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.completions.post>[0]
      options?: Parameters<typeof client.completions.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostCompletionsKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<Awaited<ReturnType<typeof client.completions.post>>, { error: null }>['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.completions.post>[0]
        options?: Parameters<typeof client.completions.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.completions.post>[0]
            options?: Parameters<typeof client.completions.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.completions.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetContainersKey(options?: Parameters<typeof client.containers.get>[0]) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['containers', '/containers', keyArgs] as const
}

export function useGetContainers<
  TError = Exclude<Awaited<ReturnType<typeof client.containers.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.containers.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.containers.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetContainersKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<Awaited<ReturnType<typeof client.containers.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.containers.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetContainers<
  TError = Exclude<Awaited<ReturnType<typeof client.containers.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.containers.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.containers.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetContainersKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<Awaited<ReturnType<typeof client.containers.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.containers.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostContainersKey() {
  return ['containers', '/containers', 'POST'] as const
}

export function usePostContainers<
  TError = Exclude<Awaited<ReturnType<typeof client.containers.post>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.containers.post>>, { error: null }>['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.containers.post>[0]
      options?: Parameters<typeof client.containers.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostContainersKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<Awaited<ReturnType<typeof client.containers.post>>, { error: null }>['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.containers.post>[0]
        options?: Parameters<typeof client.containers.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.containers.post>[0]
            options?: Parameters<typeof client.containers.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.containers.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetContainersContainerIdKey(params: Parameters<typeof client.containers>[0]) {
  return ['containers', '/containers/{container_id}', params] as const
}

export function useGetContainersContainerId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.containers>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.containers>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.containers>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.containers>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetContainersContainerIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.containers>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.containers(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetContainersContainerId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.containers>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.containers>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.containers>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.containers>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetContainersContainerIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.containers>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.containers(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getDeleteContainersContainerIdKey() {
  return ['containers', '/containers/{container_id}', 'DELETE'] as const
}

export function useDeleteContainersContainerId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.containers>['delete']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.containers>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.containers>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.containers>['delete']>[0]
        options?: Parameters<ReturnType<typeof client.containers>['delete']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteContainersContainerIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.containers>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.containers>['delete']>[0]
        options?: Parameters<ReturnType<typeof client.containers>['delete']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<ReturnType<typeof client.containers>['delete']>[0]
            options?: Parameters<ReturnType<typeof client.containers>['delete']>[1]
          }
        },
      ) => {
        const { data, error } = await client.containers(params).delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetContainersContainerIdFilesKey(
  params: Parameters<typeof client.containers>[0],
  options?: Parameters<ReturnType<typeof client.containers>['files']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['containers', '/containers/{container_id}/files', params, keyArgs] as const
}

export function useGetContainersContainerIdFiles<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.containers>['files']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.containers>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.containers>['files']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.containers>['files']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetContainersContainerIdFilesKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.containers>['files']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.containers(params).files.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetContainersContainerIdFiles<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.containers>['files']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.containers>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.containers>['files']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.containers>['files']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetContainersContainerIdFilesKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.containers>['files']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.containers(params).files.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostContainersContainerIdFilesKey() {
  return ['containers', '/containers/{container_id}/files', 'POST'] as const
}

export function usePostContainersContainerIdFiles<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.containers>['files']['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.containers>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.containers>['files']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.containers>['files']['post']>[0]
        options?: Parameters<ReturnType<typeof client.containers>['files']['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostContainersContainerIdFilesKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.containers>['files']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.containers>['files']['post']>[0]
        options?: Parameters<ReturnType<typeof client.containers>['files']['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.containers>['files']['post']>[0]
            options?: Parameters<ReturnType<typeof client.containers>['files']['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client.containers(params).files.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetContainersContainerIdFilesFileIdKey(
  params: Parameters<typeof client.containers>[0],
  params2: Parameters<ReturnType<typeof client.containers>['files']>[0],
) {
  return ['containers', '/containers/{container_id}/files/{file_id}', params, params2] as const
}

export function useGetContainersContainerIdFilesFileId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.containers>['files']>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.containers>[0],
  params2: Parameters<ReturnType<typeof client.containers>['files']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.containers>['files']>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<ReturnType<typeof client.containers>['files']>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetContainersContainerIdFilesFileIdKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.containers>['files']>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.containers(params).files(params2).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetContainersContainerIdFilesFileId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.containers>['files']>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.containers>[0],
  params2: Parameters<ReturnType<typeof client.containers>['files']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.containers>['files']>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<ReturnType<typeof client.containers>['files']>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetContainersContainerIdFilesFileIdKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.containers>['files']>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.containers(params).files(params2).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getDeleteContainersContainerIdFilesFileIdKey() {
  return ['containers', '/containers/{container_id}/files/{file_id}', 'DELETE'] as const
}

export function useDeleteContainersContainerIdFilesFileId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.containers>['files']>['delete']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.containers>[0],
  params2: Parameters<ReturnType<typeof client.containers>['files']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.containers>['files']>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<ReturnType<typeof client.containers>['files']>['delete']>[0]
        options?: Parameters<ReturnType<ReturnType<typeof client.containers>['files']>['delete']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteContainersContainerIdFilesFileIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.containers>['files']>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<ReturnType<typeof client.containers>['files']>['delete']>[0]
        options?: Parameters<ReturnType<ReturnType<typeof client.containers>['files']>['delete']>[1]
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
              ReturnType<ReturnType<typeof client.containers>['files']>['delete']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.containers>['files']>['delete']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .containers(params)
          .files(params2)
          .delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetContainersContainerIdFilesFileIdContentKey(
  params: Parameters<typeof client.containers>[0],
  params2: Parameters<ReturnType<typeof client.containers>['files']>[0],
) {
  return [
    'containers',
    '/containers/{container_id}/files/{file_id}/content',
    params,
    params2,
  ] as const
}

export function useGetContainersContainerIdFilesFileIdContent<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.containers>['files']>['content']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.containers>[0],
  params2: Parameters<ReturnType<typeof client.containers>['files']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.containers>['files']>['content']['get']>
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<typeof client.containers>['files']>['content']['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetContainersContainerIdFilesFileIdContentKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.containers>['files']>['content']['get']>
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client
          .containers(params)
          .files(params2)
          .content.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetContainersContainerIdFilesFileIdContent<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.containers>['files']>['content']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.containers>[0],
  params2: Parameters<ReturnType<typeof client.containers>['files']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.containers>['files']>['content']['get']>
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<typeof client.containers>['files']>['content']['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetContainersContainerIdFilesFileIdContentKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.containers>['files']>['content']['get']>
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client
          .containers(params)
          .files(params2)
          .content.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetConversationsConversationIdItemsKey(
  params: Parameters<typeof client.conversations>[0],
  options?: Parameters<ReturnType<typeof client.conversations>['items']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['conversations', '/conversations/{conversation_id}/items', params, keyArgs] as const
}

export function useGetConversationsConversationIdItems<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.conversations>['items']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.conversations>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.conversations>['items']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.conversations>['items']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetConversationsConversationIdItemsKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.conversations>['items']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.conversations(params).items.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetConversationsConversationIdItems<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.conversations>['items']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.conversations>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.conversations>['items']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.conversations>['items']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetConversationsConversationIdItemsKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.conversations>['items']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.conversations(params).items.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostConversationsConversationIdItemsKey() {
  return ['conversations', '/conversations/{conversation_id}/items', 'POST'] as const
}

export function usePostConversationsConversationIdItems<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.conversations>['items']['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.conversations>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.conversations>['items']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.conversations>['items']['post']>[0]
        options?: Parameters<ReturnType<typeof client.conversations>['items']['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostConversationsConversationIdItemsKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.conversations>['items']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.conversations>['items']['post']>[0]
        options?: Parameters<ReturnType<typeof client.conversations>['items']['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.conversations>['items']['post']>[0]
            options?: Parameters<ReturnType<typeof client.conversations>['items']['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client.conversations(params).items.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetConversationsConversationIdItemsItemIdKey(
  params: Parameters<typeof client.conversations>[0],
  params2: Parameters<ReturnType<typeof client.conversations>['items']>[0],
  options?: Parameters<ReturnType<ReturnType<typeof client.conversations>['items']>['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'conversations',
    '/conversations/{conversation_id}/items/{item_id}',
    params,
    params2,
    keyArgs,
  ] as const
}

export function useGetConversationsConversationIdItemsItemId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.conversations>['items']>['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.conversations>[0],
  params2: Parameters<ReturnType<typeof client.conversations>['items']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.conversations>['items']>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<ReturnType<typeof client.conversations>['items']>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetConversationsConversationIdItemsItemIdKey(params, params2, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.conversations>['items']>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.conversations(params).items(params2).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetConversationsConversationIdItemsItemId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.conversations>['items']>['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.conversations>[0],
  params2: Parameters<ReturnType<typeof client.conversations>['items']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.conversations>['items']>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<ReturnType<typeof client.conversations>['items']>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetConversationsConversationIdItemsItemIdKey(params, params2, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.conversations>['items']>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.conversations(params).items(params2).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getDeleteConversationsConversationIdItemsItemIdKey() {
  return ['conversations', '/conversations/{conversation_id}/items/{item_id}', 'DELETE'] as const
}

export function useDeleteConversationsConversationIdItemsItemId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.conversations>['items']>['delete']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.conversations>[0],
  params2: Parameters<ReturnType<typeof client.conversations>['items']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.conversations>['items']>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<ReturnType<typeof client.conversations>['items']>['delete']>[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.conversations>['items']>['delete']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteConversationsConversationIdItemsItemIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.conversations>['items']>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<ReturnType<typeof client.conversations>['items']>['delete']>[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.conversations>['items']>['delete']
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
              ReturnType<ReturnType<typeof client.conversations>['items']>['delete']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.conversations>['items']>['delete']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .conversations(params)
          .items(params2)
          .delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostEmbeddingsKey() {
  return ['embeddings', '/embeddings', 'POST'] as const
}

export function usePostEmbeddings<
  TError = Exclude<Awaited<ReturnType<typeof client.embeddings.post>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.embeddings.post>>, { error: null }>['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.embeddings.post>[0]
      options?: Parameters<typeof client.embeddings.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostEmbeddingsKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<Awaited<ReturnType<typeof client.embeddings.post>>, { error: null }>['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.embeddings.post>[0]
        options?: Parameters<typeof client.embeddings.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.embeddings.post>[0]
            options?: Parameters<typeof client.embeddings.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.embeddings.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetEvalsKey(options?: Parameters<typeof client.evals.get>[0]) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['evals', '/evals', keyArgs] as const
}

export function useGetEvals<
  TError = Exclude<Awaited<ReturnType<typeof client.evals.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.evals.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.evals.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey === undefined ? getGetEvalsKey(clientOptions) : customKey) : null
  return {
    swrKey,
    ...useSWR<
      Extract<Awaited<ReturnType<typeof client.evals.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.evals.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetEvals<
  TError = Exclude<Awaited<ReturnType<typeof client.evals.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.evals.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.evals.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey === undefined ? getGetEvalsKey(clientOptions) : customKey) : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<Awaited<ReturnType<typeof client.evals.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.evals.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostEvalsKey() {
  return ['evals', '/evals', 'POST'] as const
}

export function usePostEvals<
  TError = Exclude<Awaited<ReturnType<typeof client.evals.post>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.evals.post>>, { error: null }>['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.evals.post>[0]
      options?: Parameters<typeof client.evals.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostEvalsKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<Awaited<ReturnType<typeof client.evals.post>>, { error: null }>['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.evals.post>[0]
        options?: Parameters<typeof client.evals.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.evals.post>[0]
            options?: Parameters<typeof client.evals.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.evals.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetEvalsEvalIdKey(params: Parameters<typeof client.evals>[0]) {
  return ['evals', '/evals/{eval_id}', params] as const
}

export function useGetEvalsEvalId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.evals>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.evals>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<Awaited<ReturnType<ReturnType<typeof client.evals>['get']>>, { error: null }>['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.evals>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey === undefined ? getGetEvalsEvalIdKey(params) : customKey) : null
  return {
    swrKey,
    ...useSWR<
      Extract<Awaited<ReturnType<ReturnType<typeof client.evals>['get']>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.evals(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetEvalsEvalId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.evals>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.evals>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<Awaited<ReturnType<ReturnType<typeof client.evals>['get']>>, { error: null }>['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.evals>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey === undefined ? getGetEvalsEvalIdKey(params) : customKey) : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<Awaited<ReturnType<ReturnType<typeof client.evals>['get']>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.evals(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostEvalsEvalIdKey() {
  return ['evals', '/evals/{eval_id}', 'POST'] as const
}

export function usePostEvalsEvalId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.evals>['post']>>['error'], null>,
>(
  params: Parameters<typeof client.evals>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.evals>['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.evals>['post']>[0]
        options?: Parameters<ReturnType<typeof client.evals>['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostEvalsEvalIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.evals>['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.evals>['post']>[0]
        options?: Parameters<ReturnType<typeof client.evals>['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.evals>['post']>[0]
            options?: Parameters<ReturnType<typeof client.evals>['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client.evals(params).post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getDeleteEvalsEvalIdKey() {
  return ['evals', '/evals/{eval_id}', 'DELETE'] as const
}

export function useDeleteEvalsEvalId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.evals>['delete']>>['error'], null>,
>(
  params: Parameters<typeof client.evals>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.evals>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.evals>['delete']>[0]
        options?: Parameters<ReturnType<typeof client.evals>['delete']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteEvalsEvalIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.evals>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.evals>['delete']>[0]
        options?: Parameters<ReturnType<typeof client.evals>['delete']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<ReturnType<typeof client.evals>['delete']>[0]
            options?: Parameters<ReturnType<typeof client.evals>['delete']>[1]
          }
        },
      ) => {
        const { data, error } = await client.evals(params).delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetEvalsEvalIdRunsKey(
  params: Parameters<typeof client.evals>[0],
  options?: Parameters<ReturnType<typeof client.evals>['runs']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['evals', '/evals/{eval_id}/runs', params, keyArgs] as const
}

export function useGetEvalsEvalIdRuns<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.evals>['runs']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.evals>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.evals>['runs']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.evals>['runs']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetEvalsEvalIdRunsKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.evals>['runs']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.evals(params).runs.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetEvalsEvalIdRuns<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.evals>['runs']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.evals>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.evals>['runs']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.evals>['runs']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetEvalsEvalIdRunsKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.evals>['runs']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.evals(params).runs.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostEvalsEvalIdRunsKey() {
  return ['evals', '/evals/{eval_id}/runs', 'POST'] as const
}

export function usePostEvalsEvalIdRuns<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.evals>['runs']['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.evals>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.evals>['runs']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.evals>['runs']['post']>[0]
        options?: Parameters<ReturnType<typeof client.evals>['runs']['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostEvalsEvalIdRunsKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.evals>['runs']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.evals>['runs']['post']>[0]
        options?: Parameters<ReturnType<typeof client.evals>['runs']['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.evals>['runs']['post']>[0]
            options?: Parameters<ReturnType<typeof client.evals>['runs']['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client.evals(params).runs.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetEvalsEvalIdRunsRunIdKey(
  params: Parameters<typeof client.evals>[0],
  params2: Parameters<ReturnType<typeof client.evals>['runs']>[0],
) {
  return ['evals', '/evals/{eval_id}/runs/{run_id}', params, params2] as const
}

export function useGetEvalsEvalIdRunsRunId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.evals>['runs']>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.evals>[0],
  params2: Parameters<ReturnType<typeof client.evals>['runs']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.evals>['runs']>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<ReturnType<typeof client.evals>['runs']>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetEvalsEvalIdRunsRunIdKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.evals>['runs']>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.evals(params).runs(params2).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetEvalsEvalIdRunsRunId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.evals>['runs']>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.evals>[0],
  params2: Parameters<ReturnType<typeof client.evals>['runs']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.evals>['runs']>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<ReturnType<typeof client.evals>['runs']>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetEvalsEvalIdRunsRunIdKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.evals>['runs']>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.evals(params).runs(params2).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getDeleteEvalsEvalIdRunsRunIdKey() {
  return ['evals', '/evals/{eval_id}/runs/{run_id}', 'DELETE'] as const
}

export function useDeleteEvalsEvalIdRunsRunId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.evals>['runs']>['delete']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.evals>[0],
  params2: Parameters<ReturnType<typeof client.evals>['runs']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.evals>['runs']>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<ReturnType<typeof client.evals>['runs']>['delete']>[0]
        options?: Parameters<ReturnType<ReturnType<typeof client.evals>['runs']>['delete']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteEvalsEvalIdRunsRunIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.evals>['runs']>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<ReturnType<typeof client.evals>['runs']>['delete']>[0]
        options?: Parameters<ReturnType<ReturnType<typeof client.evals>['runs']>['delete']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<ReturnType<ReturnType<typeof client.evals>['runs']>['delete']>[0]
            options?: Parameters<ReturnType<ReturnType<typeof client.evals>['runs']>['delete']>[1]
          }
        },
      ) => {
        const { data, error } = await client
          .evals(params)
          .runs(params2)
          .delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostEvalsEvalIdRunsRunIdCancelKey() {
  return ['evals', '/evals/{eval_id}/runs/{run_id}/cancel', 'POST'] as const
}

export function usePostEvalsEvalIdRunsRunIdCancel<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.evals>['runs']>['cancel']['post']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.evals>[0],
  params2: Parameters<ReturnType<typeof client.evals>['runs']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.evals>['runs']>['cancel']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<ReturnType<typeof client.evals>['runs']>['cancel']['post']>[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.evals>['runs']>['cancel']['post']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostEvalsEvalIdRunsRunIdCancelKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.evals>['runs']>['cancel']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<ReturnType<typeof client.evals>['runs']>['cancel']['post']>[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.evals>['runs']>['cancel']['post']
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
              ReturnType<ReturnType<typeof client.evals>['runs']>['cancel']['post']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.evals>['runs']>['cancel']['post']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .evals(params)
          .runs(params2)
          .cancel.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetEvalsEvalIdRunsRunIdOutputItemsKey(
  params: Parameters<typeof client.evals>[0],
  params2: Parameters<ReturnType<typeof client.evals>['runs']>[0],
  options?: Parameters<
    ReturnType<ReturnType<typeof client.evals>['runs']>['output_items']['get']
  >[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['evals', '/evals/{eval_id}/runs/{run_id}/output_items', params, params2, keyArgs] as const
}

export function useGetEvalsEvalIdRunsRunIdOutputItems<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.evals>['runs']>['output_items']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.evals>[0],
  params2: Parameters<ReturnType<typeof client.evals>['runs']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.evals>['runs']>['output_items']['get']>
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<typeof client.evals>['runs']>['output_items']['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetEvalsEvalIdRunsRunIdOutputItemsKey(params, params2, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.evals>['runs']>['output_items']['get']>
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client
          .evals(params)
          .runs(params2)
          .output_items.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetEvalsEvalIdRunsRunIdOutputItems<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.evals>['runs']>['output_items']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.evals>[0],
  params2: Parameters<ReturnType<typeof client.evals>['runs']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.evals>['runs']>['output_items']['get']>
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<typeof client.evals>['runs']>['output_items']['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetEvalsEvalIdRunsRunIdOutputItemsKey(params, params2, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.evals>['runs']>['output_items']['get']>
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client
          .evals(params)
          .runs(params2)
          .output_items.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetEvalsEvalIdRunsRunIdOutputItemsOutputItemIdKey(
  params: Parameters<typeof client.evals>[0],
  params2: Parameters<ReturnType<typeof client.evals>['runs']>[0],
  params3: Parameters<ReturnType<ReturnType<typeof client.evals>['runs']>['output_items']>[0],
) {
  return [
    'evals',
    '/evals/{eval_id}/runs/{run_id}/output_items/{output_item_id}',
    params,
    params2,
    params3,
  ] as const
}

export function useGetEvalsEvalIdRunsRunIdOutputItemsOutputItemId<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<ReturnType<typeof client.evals>['runs']>['output_items']>['get']
      >
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.evals>[0],
  params2: Parameters<ReturnType<typeof client.evals>['runs']>[0],
  params3: Parameters<ReturnType<ReturnType<typeof client.evals>['runs']>['output_items']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<ReturnType<typeof client.evals>['runs']>['output_items']>['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<ReturnType<typeof client.evals>['runs']>['output_items']>['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetEvalsEvalIdRunsRunIdOutputItemsOutputItemIdKey(params, params2, params3)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<ReturnType<typeof client.evals>['runs']>['output_items']>['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client
          .evals(params)
          .runs(params2)
          .output_items(params3)
          .get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetEvalsEvalIdRunsRunIdOutputItemsOutputItemId<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<ReturnType<typeof client.evals>['runs']>['output_items']>['get']
      >
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.evals>[0],
  params2: Parameters<ReturnType<typeof client.evals>['runs']>[0],
  params3: Parameters<ReturnType<ReturnType<typeof client.evals>['runs']>['output_items']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<ReturnType<typeof client.evals>['runs']>['output_items']>['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<ReturnType<typeof client.evals>['runs']>['output_items']>['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetEvalsEvalIdRunsRunIdOutputItemsOutputItemIdKey(params, params2, params3)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<ReturnType<typeof client.evals>['runs']>['output_items']>['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client
          .evals(params)
          .runs(params2)
          .output_items(params3)
          .get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetFilesKey(options?: Parameters<typeof client.files.get>[0]) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['files', '/files', keyArgs] as const
}

export function useGetFiles<
  TError = Exclude<Awaited<ReturnType<typeof client.files.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.files.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.files.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey === undefined ? getGetFilesKey(clientOptions) : customKey) : null
  return {
    swrKey,
    ...useSWR<
      Extract<Awaited<ReturnType<typeof client.files.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.files.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetFiles<
  TError = Exclude<Awaited<ReturnType<typeof client.files.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.files.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.files.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey === undefined ? getGetFilesKey(clientOptions) : customKey) : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<Awaited<ReturnType<typeof client.files.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.files.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostFilesKey() {
  return ['files', '/files', 'POST'] as const
}

export function usePostFiles<
  TError = Exclude<Awaited<ReturnType<typeof client.files.post>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.files.post>>, { error: null }>['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.files.post>[0]
      options?: Parameters<typeof client.files.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostFilesKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<Awaited<ReturnType<typeof client.files.post>>, { error: null }>['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.files.post>[0]
        options?: Parameters<typeof client.files.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.files.post>[0]
            options?: Parameters<typeof client.files.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.files.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetFilesFileIdKey(params: Parameters<typeof client.files>[0]) {
  return ['files', '/files/{file_id}', params] as const
}

export function useGetFilesFileId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.files>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.files>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<Awaited<ReturnType<ReturnType<typeof client.files>['get']>>, { error: null }>['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.files>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey === undefined ? getGetFilesFileIdKey(params) : customKey) : null
  return {
    swrKey,
    ...useSWR<
      Extract<Awaited<ReturnType<ReturnType<typeof client.files>['get']>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.files(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetFilesFileId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.files>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.files>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<Awaited<ReturnType<ReturnType<typeof client.files>['get']>>, { error: null }>['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.files>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey === undefined ? getGetFilesFileIdKey(params) : customKey) : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<Awaited<ReturnType<ReturnType<typeof client.files>['get']>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.files(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getDeleteFilesFileIdKey() {
  return ['files', '/files/{file_id}', 'DELETE'] as const
}

export function useDeleteFilesFileId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.files>['delete']>>['error'], null>,
>(
  params: Parameters<typeof client.files>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.files>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.files>['delete']>[0]
        options?: Parameters<ReturnType<typeof client.files>['delete']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteFilesFileIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.files>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.files>['delete']>[0]
        options?: Parameters<ReturnType<typeof client.files>['delete']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<ReturnType<typeof client.files>['delete']>[0]
            options?: Parameters<ReturnType<typeof client.files>['delete']>[1]
          }
        },
      ) => {
        const { data, error } = await client.files(params).delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetFilesFileIdContentKey(params: Parameters<typeof client.files>[0]) {
  return ['files', '/files/{file_id}/content', params] as const
}

export function useGetFilesFileIdContent<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.files>['content']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.files>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.files>['content']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.files>['content']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetFilesFileIdContentKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.files>['content']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.files(params).content.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetFilesFileIdContent<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.files>['content']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.files>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.files>['content']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.files>['content']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetFilesFileIdContentKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.files>['content']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.files(params).content.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostFineTuningAlphaGradersRunKey() {
  return ['fine_tuning', '/fine_tuning/alpha/graders/run', 'POST'] as const
}

export function usePostFineTuningAlphaGradersRun<
  TError = Exclude<
    Awaited<ReturnType<typeof client.fine_tuning.alpha.graders.run.post>>['error'],
    null
  >,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.fine_tuning.alpha.graders.run.post>>,
      { error: null }
    >['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.fine_tuning.alpha.graders.run.post>[0]
      options?: Parameters<typeof client.fine_tuning.alpha.graders.run.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostFineTuningAlphaGradersRunKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<typeof client.fine_tuning.alpha.graders.run.post>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.fine_tuning.alpha.graders.run.post>[0]
        options?: Parameters<typeof client.fine_tuning.alpha.graders.run.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.fine_tuning.alpha.graders.run.post>[0]
            options?: Parameters<typeof client.fine_tuning.alpha.graders.run.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.fine_tuning.alpha.graders.run.post(
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

export function getPostFineTuningAlphaGradersValidateKey() {
  return ['fine_tuning', '/fine_tuning/alpha/graders/validate', 'POST'] as const
}

export function usePostFineTuningAlphaGradersValidate<
  TError = Exclude<
    Awaited<ReturnType<typeof client.fine_tuning.alpha.graders.validate.post>>['error'],
    null
  >,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.fine_tuning.alpha.graders.validate.post>>,
      { error: null }
    >['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.fine_tuning.alpha.graders.validate.post>[0]
      options?: Parameters<typeof client.fine_tuning.alpha.graders.validate.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostFineTuningAlphaGradersValidateKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<typeof client.fine_tuning.alpha.graders.validate.post>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.fine_tuning.alpha.graders.validate.post>[0]
        options?: Parameters<typeof client.fine_tuning.alpha.graders.validate.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.fine_tuning.alpha.graders.validate.post>[0]
            options?: Parameters<typeof client.fine_tuning.alpha.graders.validate.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.fine_tuning.alpha.graders.validate.post(
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

export function getGetFineTuningCheckpointsFineTunedModelCheckpointPermissionsKey(
  params: Parameters<typeof client.fine_tuning.checkpoints>[0],
  options?: Parameters<ReturnType<typeof client.fine_tuning.checkpoints>['permissions']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'fine_tuning',
    '/fine_tuning/checkpoints/{fine_tuned_model_checkpoint}/permissions',
    params,
    keyArgs,
  ] as const
}

export function useGetFineTuningCheckpointsFineTunedModelCheckpointPermissions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.fine_tuning.checkpoints>['permissions']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.fine_tuning.checkpoints>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<typeof client.fine_tuning.checkpoints>['permissions']['get']>
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.fine_tuning.checkpoints>['permissions']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetFineTuningCheckpointsFineTunedModelCheckpointPermissionsKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<
          ReturnType<ReturnType<typeof client.fine_tuning.checkpoints>['permissions']['get']>
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.fine_tuning
          .checkpoints(params)
          .permissions.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetFineTuningCheckpointsFineTunedModelCheckpointPermissions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.fine_tuning.checkpoints>['permissions']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.fine_tuning.checkpoints>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<typeof client.fine_tuning.checkpoints>['permissions']['get']>
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.fine_tuning.checkpoints>['permissions']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetFineTuningCheckpointsFineTunedModelCheckpointPermissionsKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<
          ReturnType<ReturnType<typeof client.fine_tuning.checkpoints>['permissions']['get']>
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.fine_tuning
          .checkpoints(params)
          .permissions.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostFineTuningCheckpointsFineTunedModelCheckpointPermissionsKey() {
  return [
    'fine_tuning',
    '/fine_tuning/checkpoints/{fine_tuned_model_checkpoint}/permissions',
    'POST',
  ] as const
}

export function usePostFineTuningCheckpointsFineTunedModelCheckpointPermissions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.fine_tuning.checkpoints>['permissions']['post']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.fine_tuning.checkpoints>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<typeof client.fine_tuning.checkpoints>['permissions']['post']>
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<
          ReturnType<typeof client.fine_tuning.checkpoints>['permissions']['post']
        >[0]
        options?: Parameters<
          ReturnType<typeof client.fine_tuning.checkpoints>['permissions']['post']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostFineTuningCheckpointsFineTunedModelCheckpointPermissionsKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<ReturnType<typeof client.fine_tuning.checkpoints>['permissions']['post']>
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<
          ReturnType<typeof client.fine_tuning.checkpoints>['permissions']['post']
        >[0]
        options?: Parameters<
          ReturnType<typeof client.fine_tuning.checkpoints>['permissions']['post']
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
            body: Parameters<
              ReturnType<typeof client.fine_tuning.checkpoints>['permissions']['post']
            >[0]
            options?: Parameters<
              ReturnType<typeof client.fine_tuning.checkpoints>['permissions']['post']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client.fine_tuning
          .checkpoints(params)
          .permissions.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getDeleteFineTuningCheckpointsFineTunedModelCheckpointPermissionsPermissionIdKey() {
  return [
    'fine_tuning',
    '/fine_tuning/checkpoints/{fine_tuned_model_checkpoint}/permissions/{permission_id}',
    'DELETE',
  ] as const
}

export function useDeleteFineTuningCheckpointsFineTunedModelCheckpointPermissionsPermissionId<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<typeof client.fine_tuning.checkpoints>['permissions']>['delete']
      >
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.fine_tuning.checkpoints>[0],
  params2: Parameters<ReturnType<typeof client.fine_tuning.checkpoints>['permissions']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<typeof client.fine_tuning.checkpoints>['permissions']>['delete']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<ReturnType<typeof client.fine_tuning.checkpoints>['permissions']>['delete']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.fine_tuning.checkpoints>['permissions']>['delete']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey =
    customKey ?? getDeleteFineTuningCheckpointsFineTunedModelCheckpointPermissionsPermissionIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<typeof client.fine_tuning.checkpoints>['permissions']>['delete']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<ReturnType<typeof client.fine_tuning.checkpoints>['permissions']>['delete']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.fine_tuning.checkpoints>['permissions']>['delete']
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
              ReturnType<ReturnType<typeof client.fine_tuning.checkpoints>['permissions']>['delete']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.fine_tuning.checkpoints>['permissions']>['delete']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client.fine_tuning
          .checkpoints(params)
          .permissions(params2)
          .delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetFineTuningJobsKey(
  options?: Parameters<typeof client.fine_tuning.jobs.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['fine_tuning', '/fine_tuning/jobs', keyArgs] as const
}

export function useGetFineTuningJobs<
  TError = Exclude<Awaited<ReturnType<typeof client.fine_tuning.jobs.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.fine_tuning.jobs.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.fine_tuning.jobs.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetFineTuningJobsKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<Awaited<ReturnType<typeof client.fine_tuning.jobs.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.fine_tuning.jobs.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetFineTuningJobs<
  TError = Exclude<Awaited<ReturnType<typeof client.fine_tuning.jobs.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.fine_tuning.jobs.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.fine_tuning.jobs.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetFineTuningJobsKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<Awaited<ReturnType<typeof client.fine_tuning.jobs.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.fine_tuning.jobs.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostFineTuningJobsKey() {
  return ['fine_tuning', '/fine_tuning/jobs', 'POST'] as const
}

export function usePostFineTuningJobs<
  TError = Exclude<Awaited<ReturnType<typeof client.fine_tuning.jobs.post>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.fine_tuning.jobs.post>>, { error: null }>['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.fine_tuning.jobs.post>[0]
      options?: Parameters<typeof client.fine_tuning.jobs.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostFineTuningJobsKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<Awaited<ReturnType<typeof client.fine_tuning.jobs.post>>, { error: null }>['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.fine_tuning.jobs.post>[0]
        options?: Parameters<typeof client.fine_tuning.jobs.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.fine_tuning.jobs.post>[0]
            options?: Parameters<typeof client.fine_tuning.jobs.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.fine_tuning.jobs.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetFineTuningJobsFineTuningJobIdKey(
  params: Parameters<typeof client.fine_tuning.jobs>[0],
) {
  return ['fine_tuning', '/fine_tuning/jobs/{fine_tuning_job_id}', params] as const
}

export function useGetFineTuningJobsFineTuningJobId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.fine_tuning.jobs>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.fine_tuning.jobs>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.fine_tuning.jobs>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.fine_tuning.jobs>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetFineTuningJobsFineTuningJobIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.fine_tuning.jobs>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.fine_tuning.jobs(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetFineTuningJobsFineTuningJobId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.fine_tuning.jobs>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.fine_tuning.jobs>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.fine_tuning.jobs>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.fine_tuning.jobs>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetFineTuningJobsFineTuningJobIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.fine_tuning.jobs>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.fine_tuning.jobs(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostFineTuningJobsFineTuningJobIdCancelKey() {
  return ['fine_tuning', '/fine_tuning/jobs/{fine_tuning_job_id}/cancel', 'POST'] as const
}

export function usePostFineTuningJobsFineTuningJobIdCancel<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.fine_tuning.jobs>['cancel']['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.fine_tuning.jobs>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.fine_tuning.jobs>['cancel']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.fine_tuning.jobs>['cancel']['post']>[0]
        options?: Parameters<ReturnType<typeof client.fine_tuning.jobs>['cancel']['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostFineTuningJobsFineTuningJobIdCancelKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.fine_tuning.jobs>['cancel']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.fine_tuning.jobs>['cancel']['post']>[0]
        options?: Parameters<ReturnType<typeof client.fine_tuning.jobs>['cancel']['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<ReturnType<typeof client.fine_tuning.jobs>['cancel']['post']>[0]
            options?: Parameters<ReturnType<typeof client.fine_tuning.jobs>['cancel']['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client.fine_tuning
          .jobs(params)
          .cancel.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetFineTuningJobsFineTuningJobIdCheckpointsKey(
  params: Parameters<typeof client.fine_tuning.jobs>[0],
  options?: Parameters<ReturnType<typeof client.fine_tuning.jobs>['checkpoints']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'fine_tuning',
    '/fine_tuning/jobs/{fine_tuning_job_id}/checkpoints',
    params,
    keyArgs,
  ] as const
}

export function useGetFineTuningJobsFineTuningJobIdCheckpoints<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.fine_tuning.jobs>['checkpoints']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.fine_tuning.jobs>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.fine_tuning.jobs>['checkpoints']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.fine_tuning.jobs>['checkpoints']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetFineTuningJobsFineTuningJobIdCheckpointsKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.fine_tuning.jobs>['checkpoints']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.fine_tuning.jobs(params).checkpoints.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetFineTuningJobsFineTuningJobIdCheckpoints<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.fine_tuning.jobs>['checkpoints']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.fine_tuning.jobs>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.fine_tuning.jobs>['checkpoints']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.fine_tuning.jobs>['checkpoints']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetFineTuningJobsFineTuningJobIdCheckpointsKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.fine_tuning.jobs>['checkpoints']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.fine_tuning.jobs(params).checkpoints.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetFineTuningJobsFineTuningJobIdEventsKey(
  params: Parameters<typeof client.fine_tuning.jobs>[0],
  options?: Parameters<ReturnType<typeof client.fine_tuning.jobs>['events']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['fine_tuning', '/fine_tuning/jobs/{fine_tuning_job_id}/events', params, keyArgs] as const
}

export function useGetFineTuningJobsFineTuningJobIdEvents<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.fine_tuning.jobs>['events']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.fine_tuning.jobs>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.fine_tuning.jobs>['events']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.fine_tuning.jobs>['events']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetFineTuningJobsFineTuningJobIdEventsKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.fine_tuning.jobs>['events']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.fine_tuning.jobs(params).events.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetFineTuningJobsFineTuningJobIdEvents<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.fine_tuning.jobs>['events']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.fine_tuning.jobs>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.fine_tuning.jobs>['events']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.fine_tuning.jobs>['events']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetFineTuningJobsFineTuningJobIdEventsKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.fine_tuning.jobs>['events']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.fine_tuning.jobs(params).events.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostFineTuningJobsFineTuningJobIdPauseKey() {
  return ['fine_tuning', '/fine_tuning/jobs/{fine_tuning_job_id}/pause', 'POST'] as const
}

export function usePostFineTuningJobsFineTuningJobIdPause<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.fine_tuning.jobs>['pause']['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.fine_tuning.jobs>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.fine_tuning.jobs>['pause']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.fine_tuning.jobs>['pause']['post']>[0]
        options?: Parameters<ReturnType<typeof client.fine_tuning.jobs>['pause']['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostFineTuningJobsFineTuningJobIdPauseKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.fine_tuning.jobs>['pause']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.fine_tuning.jobs>['pause']['post']>[0]
        options?: Parameters<ReturnType<typeof client.fine_tuning.jobs>['pause']['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<ReturnType<typeof client.fine_tuning.jobs>['pause']['post']>[0]
            options?: Parameters<ReturnType<typeof client.fine_tuning.jobs>['pause']['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client.fine_tuning
          .jobs(params)
          .pause.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostFineTuningJobsFineTuningJobIdResumeKey() {
  return ['fine_tuning', '/fine_tuning/jobs/{fine_tuning_job_id}/resume', 'POST'] as const
}

export function usePostFineTuningJobsFineTuningJobIdResume<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.fine_tuning.jobs>['resume']['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.fine_tuning.jobs>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.fine_tuning.jobs>['resume']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.fine_tuning.jobs>['resume']['post']>[0]
        options?: Parameters<ReturnType<typeof client.fine_tuning.jobs>['resume']['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostFineTuningJobsFineTuningJobIdResumeKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.fine_tuning.jobs>['resume']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.fine_tuning.jobs>['resume']['post']>[0]
        options?: Parameters<ReturnType<typeof client.fine_tuning.jobs>['resume']['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<ReturnType<typeof client.fine_tuning.jobs>['resume']['post']>[0]
            options?: Parameters<ReturnType<typeof client.fine_tuning.jobs>['resume']['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client.fine_tuning
          .jobs(params)
          .resume.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostImagesEditsKey() {
  return ['images', '/images/edits', 'POST'] as const
}

export function usePostImagesEdits<
  TError = Exclude<Awaited<ReturnType<typeof client.images.edits.post>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.images.edits.post>>, { error: null }>['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.images.edits.post>[0]
      options?: Parameters<typeof client.images.edits.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostImagesEditsKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<Awaited<ReturnType<typeof client.images.edits.post>>, { error: null }>['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.images.edits.post>[0]
        options?: Parameters<typeof client.images.edits.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.images.edits.post>[0]
            options?: Parameters<typeof client.images.edits.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.images.edits.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostImagesGenerationsKey() {
  return ['images', '/images/generations', 'POST'] as const
}

export function usePostImagesGenerations<
  TError = Exclude<Awaited<ReturnType<typeof client.images.generations.post>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.images.generations.post>>, { error: null }>['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.images.generations.post>[0]
      options?: Parameters<typeof client.images.generations.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostImagesGenerationsKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<Awaited<ReturnType<typeof client.images.generations.post>>, { error: null }>['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.images.generations.post>[0]
        options?: Parameters<typeof client.images.generations.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.images.generations.post>[0]
            options?: Parameters<typeof client.images.generations.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.images.generations.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostImagesVariationsKey() {
  return ['images', '/images/variations', 'POST'] as const
}

export function usePostImagesVariations<
  TError = Exclude<Awaited<ReturnType<typeof client.images.variations.post>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.images.variations.post>>, { error: null }>['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.images.variations.post>[0]
      options?: Parameters<typeof client.images.variations.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostImagesVariationsKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<Awaited<ReturnType<typeof client.images.variations.post>>, { error: null }>['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.images.variations.post>[0]
        options?: Parameters<typeof client.images.variations.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.images.variations.post>[0]
            options?: Parameters<typeof client.images.variations.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.images.variations.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostLiveSessionsKey() {
  return ['live', '/live/sessions', 'POST'] as const
}

export function usePostLiveSessions<
  TError = Exclude<Awaited<ReturnType<typeof client.live.sessions.post>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.live.sessions.post>>, { error: null }>['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.live.sessions.post>[0]
      options?: Parameters<typeof client.live.sessions.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostLiveSessionsKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<Awaited<ReturnType<typeof client.live.sessions.post>>, { error: null }>['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.live.sessions.post>[0]
        options?: Parameters<typeof client.live.sessions.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.live.sessions.post>[0]
            options?: Parameters<typeof client.live.sessions.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.live.sessions.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostLiveSessionsSessionIdAcceptKey() {
  return ['live', '/live/sessions/{session_id}/accept', 'POST'] as const
}

export function usePostLiveSessionsSessionIdAccept<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.live.sessions>['accept']['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.live.sessions>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.live.sessions>['accept']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.live.sessions>['accept']['post']>[0]
        options?: Parameters<ReturnType<typeof client.live.sessions>['accept']['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostLiveSessionsSessionIdAcceptKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.live.sessions>['accept']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.live.sessions>['accept']['post']>[0]
        options?: Parameters<ReturnType<typeof client.live.sessions>['accept']['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.live.sessions>['accept']['post']>[0]
            options?: Parameters<ReturnType<typeof client.live.sessions>['accept']['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client.live
          .sessions(params)
          .accept.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostLiveSessionsSessionIdForkKey() {
  return ['live', '/live/sessions/{session_id}/fork', 'POST'] as const
}

export function usePostLiveSessionsSessionIdFork<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.live.sessions>['fork']['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.live.sessions>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.live.sessions>['fork']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.live.sessions>['fork']['post']>[0]
        options?: Parameters<ReturnType<typeof client.live.sessions>['fork']['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostLiveSessionsSessionIdForkKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.live.sessions>['fork']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.live.sessions>['fork']['post']>[0]
        options?: Parameters<ReturnType<typeof client.live.sessions>['fork']['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.live.sessions>['fork']['post']>[0]
            options?: Parameters<ReturnType<typeof client.live.sessions>['fork']['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client.live.sessions(params).fork.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostLiveSessionsSessionIdHangupKey() {
  return ['live', '/live/sessions/{session_id}/hangup', 'POST'] as const
}

export function usePostLiveSessionsSessionIdHangup<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.live.sessions>['hangup']['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.live.sessions>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.live.sessions>['hangup']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.live.sessions>['hangup']['post']>[0]
        options?: Parameters<ReturnType<typeof client.live.sessions>['hangup']['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostLiveSessionsSessionIdHangupKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.live.sessions>['hangup']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.live.sessions>['hangup']['post']>[0]
        options?: Parameters<ReturnType<typeof client.live.sessions>['hangup']['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<ReturnType<typeof client.live.sessions>['hangup']['post']>[0]
            options?: Parameters<ReturnType<typeof client.live.sessions>['hangup']['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client.live
          .sessions(params)
          .hangup.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostLiveSessionsSessionIdReferKey() {
  return ['live', '/live/sessions/{session_id}/refer', 'POST'] as const
}

export function usePostLiveSessionsSessionIdRefer<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.live.sessions>['refer']['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.live.sessions>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.live.sessions>['refer']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.live.sessions>['refer']['post']>[0]
        options?: Parameters<ReturnType<typeof client.live.sessions>['refer']['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostLiveSessionsSessionIdReferKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.live.sessions>['refer']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.live.sessions>['refer']['post']>[0]
        options?: Parameters<ReturnType<typeof client.live.sessions>['refer']['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.live.sessions>['refer']['post']>[0]
            options?: Parameters<ReturnType<typeof client.live.sessions>['refer']['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client.live.sessions(params).refer.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostLiveSessionsSessionIdRejectKey() {
  return ['live', '/live/sessions/{session_id}/reject', 'POST'] as const
}

export function usePostLiveSessionsSessionIdReject<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.live.sessions>['reject']['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.live.sessions>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.live.sessions>['reject']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.live.sessions>['reject']['post']>[0]
        options?: Parameters<ReturnType<typeof client.live.sessions>['reject']['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostLiveSessionsSessionIdRejectKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.live.sessions>['reject']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.live.sessions>['reject']['post']>[0]
        options?: Parameters<ReturnType<typeof client.live.sessions>['reject']['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.live.sessions>['reject']['post']>[0]
            options?: Parameters<ReturnType<typeof client.live.sessions>['reject']['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client.live
          .sessions(params)
          .reject.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetModelsKey() {
  return ['models', '/models'] as const
}

export function useGetModels<
  TError = Exclude<Awaited<ReturnType<typeof client.models.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.models.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.models.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey === undefined ? getGetModelsKey() : customKey) : null
  return {
    swrKey,
    ...useSWR<
      Extract<Awaited<ReturnType<typeof client.models.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.models.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetModels<
  TError = Exclude<Awaited<ReturnType<typeof client.models.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.models.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.models.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey === undefined ? getGetModelsKey() : customKey) : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<Awaited<ReturnType<typeof client.models.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.models.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetModelsModelKey(params: Parameters<typeof client.models>[0]) {
  return ['models', '/models/{model}', params] as const
}

export function useGetModelsModel<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.models>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.models>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.models>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.models>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey === undefined ? getGetModelsModelKey(params) : customKey) : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.models>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.models(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetModelsModel<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.models>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.models>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.models>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.models>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey === undefined ? getGetModelsModelKey(params) : customKey) : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.models>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.models(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getDeleteModelsModelKey() {
  return ['models', '/models/{model}', 'DELETE'] as const
}

export function useDeleteModelsModel<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.models>['delete']>>['error'], null>,
>(
  params: Parameters<typeof client.models>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.models>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.models>['delete']>[0]
        options?: Parameters<ReturnType<typeof client.models>['delete']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteModelsModelKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.models>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.models>['delete']>[0]
        options?: Parameters<ReturnType<typeof client.models>['delete']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<ReturnType<typeof client.models>['delete']>[0]
            options?: Parameters<ReturnType<typeof client.models>['delete']>[1]
          }
        },
      ) => {
        const { data, error } = await client.models(params).delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostModerationsKey() {
  return ['moderations', '/moderations', 'POST'] as const
}

export function usePostModerations<
  TError = Exclude<Awaited<ReturnType<typeof client.moderations.post>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.moderations.post>>, { error: null }>['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.moderations.post>[0]
      options?: Parameters<typeof client.moderations.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostModerationsKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<Awaited<ReturnType<typeof client.moderations.post>>, { error: null }>['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.moderations.post>[0]
        options?: Parameters<typeof client.moderations.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.moderations.post>[0]
            options?: Parameters<typeof client.moderations.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.moderations.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetOrganizationAdminApiKeysKey(
  options?: Parameters<typeof client.organization.admin_api_keys.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['organization', '/organization/admin_api_keys', keyArgs] as const
}

export function useGetOrganizationAdminApiKeys<
  TError = Exclude<
    Awaited<ReturnType<typeof client.organization.admin_api_keys.get>>['error'],
    null
  >,
>(options?: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.organization.admin_api_keys.get>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.organization.admin_api_keys.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationAdminApiKeysKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<typeof client.organization.admin_api_keys.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization.admin_api_keys.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetOrganizationAdminApiKeys<
  TError = Exclude<
    Awaited<ReturnType<typeof client.organization.admin_api_keys.get>>['error'],
    null
  >,
>(options?: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.organization.admin_api_keys.get>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.organization.admin_api_keys.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationAdminApiKeysKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<typeof client.organization.admin_api_keys.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization.admin_api_keys.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostOrganizationAdminApiKeysKey() {
  return ['organization', '/organization/admin_api_keys', 'POST'] as const
}

export function usePostOrganizationAdminApiKeys<
  TError = Exclude<
    Awaited<ReturnType<typeof client.organization.admin_api_keys.post>>['error'],
    null
  >,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.organization.admin_api_keys.post>>,
      { error: null }
    >['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.organization.admin_api_keys.post>[0]
      options?: Parameters<typeof client.organization.admin_api_keys.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostOrganizationAdminApiKeysKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<typeof client.organization.admin_api_keys.post>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.organization.admin_api_keys.post>[0]
        options?: Parameters<typeof client.organization.admin_api_keys.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.organization.admin_api_keys.post>[0]
            options?: Parameters<typeof client.organization.admin_api_keys.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.organization.admin_api_keys.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetOrganizationAdminApiKeysKeyIdKey(
  params: Parameters<typeof client.organization.admin_api_keys>[0],
) {
  return ['organization', '/organization/admin_api_keys/{key_id}', params] as const
}

export function useGetOrganizationAdminApiKeysKeyId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.admin_api_keys>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.admin_api_keys>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.admin_api_keys>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.organization.admin_api_keys>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationAdminApiKeysKeyIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.admin_api_keys>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization.admin_api_keys(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetOrganizationAdminApiKeysKeyId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.admin_api_keys>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.admin_api_keys>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.admin_api_keys>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.organization.admin_api_keys>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationAdminApiKeysKeyIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.admin_api_keys>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization.admin_api_keys(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getDeleteOrganizationAdminApiKeysKeyIdKey() {
  return ['organization', '/organization/admin_api_keys/{key_id}', 'DELETE'] as const
}

export function useDeleteOrganizationAdminApiKeysKeyId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.admin_api_keys>['delete']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.admin_api_keys>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.admin_api_keys>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.organization.admin_api_keys>['delete']>[0]
        options?: Parameters<ReturnType<typeof client.organization.admin_api_keys>['delete']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteOrganizationAdminApiKeysKeyIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.admin_api_keys>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.organization.admin_api_keys>['delete']>[0]
        options?: Parameters<ReturnType<typeof client.organization.admin_api_keys>['delete']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<ReturnType<typeof client.organization.admin_api_keys>['delete']>[0]
            options?: Parameters<ReturnType<typeof client.organization.admin_api_keys>['delete']>[1]
          }
        },
      ) => {
        const { data, error } = await client.organization
          .admin_api_keys(params)
          .delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetOrganizationAuditLogsKey(
  options?: Parameters<typeof client.organization.audit_logs.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['organization', '/organization/audit_logs', keyArgs] as const
}

export function useGetOrganizationAuditLogs<
  TError = Exclude<Awaited<ReturnType<typeof client.organization.audit_logs.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.organization.audit_logs.get>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.organization.audit_logs.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationAuditLogsKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<typeof client.organization.audit_logs.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization.audit_logs.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetOrganizationAuditLogs<
  TError = Exclude<Awaited<ReturnType<typeof client.organization.audit_logs.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.organization.audit_logs.get>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.organization.audit_logs.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationAuditLogsKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<typeof client.organization.audit_logs.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization.audit_logs.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetOrganizationCertificatesKey(
  options?: Parameters<typeof client.organization.certificates.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['organization', '/organization/certificates', keyArgs] as const
}

export function useGetOrganizationCertificates<
  TError = Exclude<Awaited<ReturnType<typeof client.organization.certificates.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.organization.certificates.get>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.organization.certificates.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationCertificatesKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<typeof client.organization.certificates.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization.certificates.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetOrganizationCertificates<
  TError = Exclude<Awaited<ReturnType<typeof client.organization.certificates.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.organization.certificates.get>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.organization.certificates.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationCertificatesKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<typeof client.organization.certificates.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization.certificates.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostOrganizationCertificatesKey() {
  return ['organization', '/organization/certificates', 'POST'] as const
}

export function usePostOrganizationCertificates<
  TError = Exclude<
    Awaited<ReturnType<typeof client.organization.certificates.post>>['error'],
    null
  >,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.organization.certificates.post>>,
      { error: null }
    >['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.organization.certificates.post>[0]
      options?: Parameters<typeof client.organization.certificates.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostOrganizationCertificatesKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<typeof client.organization.certificates.post>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.organization.certificates.post>[0]
        options?: Parameters<typeof client.organization.certificates.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.organization.certificates.post>[0]
            options?: Parameters<typeof client.organization.certificates.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.organization.certificates.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostOrganizationCertificatesActivateKey() {
  return ['organization', '/organization/certificates/activate', 'POST'] as const
}

export function usePostOrganizationCertificatesActivate<
  TError = Exclude<
    Awaited<ReturnType<typeof client.organization.certificates.activate.post>>['error'],
    null
  >,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.organization.certificates.activate.post>>,
      { error: null }
    >['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.organization.certificates.activate.post>[0]
      options?: Parameters<typeof client.organization.certificates.activate.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostOrganizationCertificatesActivateKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<typeof client.organization.certificates.activate.post>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.organization.certificates.activate.post>[0]
        options?: Parameters<typeof client.organization.certificates.activate.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.organization.certificates.activate.post>[0]
            options?: Parameters<typeof client.organization.certificates.activate.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.organization.certificates.activate.post(
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

export function getPostOrganizationCertificatesDeactivateKey() {
  return ['organization', '/organization/certificates/deactivate', 'POST'] as const
}

export function usePostOrganizationCertificatesDeactivate<
  TError = Exclude<
    Awaited<ReturnType<typeof client.organization.certificates.deactivate.post>>['error'],
    null
  >,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.organization.certificates.deactivate.post>>,
      { error: null }
    >['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.organization.certificates.deactivate.post>[0]
      options?: Parameters<typeof client.organization.certificates.deactivate.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostOrganizationCertificatesDeactivateKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<typeof client.organization.certificates.deactivate.post>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.organization.certificates.deactivate.post>[0]
        options?: Parameters<typeof client.organization.certificates.deactivate.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.organization.certificates.deactivate.post>[0]
            options?: Parameters<typeof client.organization.certificates.deactivate.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.organization.certificates.deactivate.post(
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

export function getGetOrganizationCertificatesCertificateIdKey(
  params: Parameters<typeof client.organization.certificates>[0],
  options?: Parameters<ReturnType<typeof client.organization.certificates>['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['organization', '/organization/certificates/{certificate_id}', params, keyArgs] as const
}

export function useGetOrganizationCertificatesCertificateId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.certificates>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.certificates>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.certificates>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.organization.certificates>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationCertificatesCertificateIdKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.certificates>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization.certificates(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetOrganizationCertificatesCertificateId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.certificates>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.certificates>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.certificates>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.organization.certificates>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationCertificatesCertificateIdKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.certificates>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization.certificates(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostOrganizationCertificatesCertificateIdKey() {
  return ['organization', '/organization/certificates/{certificate_id}', 'POST'] as const
}

export function usePostOrganizationCertificatesCertificateId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.certificates>['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.certificates>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.certificates>['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.organization.certificates>['post']>[0]
        options?: Parameters<ReturnType<typeof client.organization.certificates>['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostOrganizationCertificatesCertificateIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.certificates>['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.organization.certificates>['post']>[0]
        options?: Parameters<ReturnType<typeof client.organization.certificates>['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.organization.certificates>['post']>[0]
            options?: Parameters<ReturnType<typeof client.organization.certificates>['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client.organization
          .certificates(params)
          .post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getDeleteOrganizationCertificatesCertificateIdKey() {
  return ['organization', '/organization/certificates/{certificate_id}', 'DELETE'] as const
}

export function useDeleteOrganizationCertificatesCertificateId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.certificates>['delete']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.certificates>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.certificates>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.organization.certificates>['delete']>[0]
        options?: Parameters<ReturnType<typeof client.organization.certificates>['delete']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteOrganizationCertificatesCertificateIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.certificates>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.organization.certificates>['delete']>[0]
        options?: Parameters<ReturnType<typeof client.organization.certificates>['delete']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<ReturnType<typeof client.organization.certificates>['delete']>[0]
            options?: Parameters<ReturnType<typeof client.organization.certificates>['delete']>[1]
          }
        },
      ) => {
        const { data, error } = await client.organization
          .certificates(params)
          .delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetOrganizationCostsKey(
  options: Parameters<typeof client.organization.costs.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['organization', '/organization/costs', keyArgs] as const
}

export function useGetOrganizationCosts<
  TError = Exclude<Awaited<ReturnType<typeof client.organization.costs.get>>['error'], null>,
>(options: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.organization.costs.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options: Parameters<typeof client.organization.costs.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationCostsKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<Awaited<ReturnType<typeof client.organization.costs.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization.costs.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetOrganizationCosts<
  TError = Exclude<Awaited<ReturnType<typeof client.organization.costs.get>>['error'], null>,
>(options: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.organization.costs.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options: Parameters<typeof client.organization.costs.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationCostsKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<Awaited<ReturnType<typeof client.organization.costs.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization.costs.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetOrganizationDataRetentionKey() {
  return ['organization', '/organization/data_retention'] as const
}

export function useGetOrganizationDataRetention<
  TError = Exclude<
    Awaited<ReturnType<typeof client.organization.data_retention.get>>['error'],
    null
  >,
>(options?: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.organization.data_retention.get>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.organization.data_retention.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationDataRetentionKey()
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<typeof client.organization.data_retention.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization.data_retention.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetOrganizationDataRetention<
  TError = Exclude<
    Awaited<ReturnType<typeof client.organization.data_retention.get>>['error'],
    null
  >,
>(options?: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.organization.data_retention.get>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.organization.data_retention.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationDataRetentionKey()
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<typeof client.organization.data_retention.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization.data_retention.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostOrganizationDataRetentionKey() {
  return ['organization', '/organization/data_retention', 'POST'] as const
}

export function usePostOrganizationDataRetention<
  TError = Exclude<
    Awaited<ReturnType<typeof client.organization.data_retention.post>>['error'],
    null
  >,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.organization.data_retention.post>>,
      { error: null }
    >['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.organization.data_retention.post>[0]
      options?: Parameters<typeof client.organization.data_retention.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostOrganizationDataRetentionKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<typeof client.organization.data_retention.post>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.organization.data_retention.post>[0]
        options?: Parameters<typeof client.organization.data_retention.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.organization.data_retention.post>[0]
            options?: Parameters<typeof client.organization.data_retention.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.organization.data_retention.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetOrganizationGroupsKey(
  options?: Parameters<typeof client.organization.groups.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['organization', '/organization/groups', keyArgs] as const
}

export function useGetOrganizationGroups<
  TError = Exclude<Awaited<ReturnType<typeof client.organization.groups.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.organization.groups.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.organization.groups.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationGroupsKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<Awaited<ReturnType<typeof client.organization.groups.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization.groups.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetOrganizationGroups<
  TError = Exclude<Awaited<ReturnType<typeof client.organization.groups.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.organization.groups.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.organization.groups.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationGroupsKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<Awaited<ReturnType<typeof client.organization.groups.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization.groups.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostOrganizationGroupsKey() {
  return ['organization', '/organization/groups', 'POST'] as const
}

export function usePostOrganizationGroups<
  TError = Exclude<Awaited<ReturnType<typeof client.organization.groups.post>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.organization.groups.post>>, { error: null }>['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.organization.groups.post>[0]
      options?: Parameters<typeof client.organization.groups.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostOrganizationGroupsKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<Awaited<ReturnType<typeof client.organization.groups.post>>, { error: null }>['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.organization.groups.post>[0]
        options?: Parameters<typeof client.organization.groups.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.organization.groups.post>[0]
            options?: Parameters<typeof client.organization.groups.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.organization.groups.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetOrganizationGroupsGroupIdKey(
  params: Parameters<typeof client.organization.groups>[0],
) {
  return ['organization', '/organization/groups/{group_id}', params] as const
}

export function useGetOrganizationGroupsGroupId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.groups>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.groups>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.groups>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.organization.groups>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationGroupsGroupIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.groups>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization.groups(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetOrganizationGroupsGroupId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.groups>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.groups>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.groups>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.organization.groups>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationGroupsGroupIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.groups>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization.groups(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostOrganizationGroupsGroupIdKey() {
  return ['organization', '/organization/groups/{group_id}', 'POST'] as const
}

export function usePostOrganizationGroupsGroupId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.groups>['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.groups>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.groups>['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.organization.groups>['post']>[0]
        options?: Parameters<ReturnType<typeof client.organization.groups>['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostOrganizationGroupsGroupIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.groups>['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.organization.groups>['post']>[0]
        options?: Parameters<ReturnType<typeof client.organization.groups>['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.organization.groups>['post']>[0]
            options?: Parameters<ReturnType<typeof client.organization.groups>['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client.organization.groups(params).post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getDeleteOrganizationGroupsGroupIdKey() {
  return ['organization', '/organization/groups/{group_id}', 'DELETE'] as const
}

export function useDeleteOrganizationGroupsGroupId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.groups>['delete']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.groups>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.groups>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.organization.groups>['delete']>[0]
        options?: Parameters<ReturnType<typeof client.organization.groups>['delete']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteOrganizationGroupsGroupIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.groups>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.organization.groups>['delete']>[0]
        options?: Parameters<ReturnType<typeof client.organization.groups>['delete']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<ReturnType<typeof client.organization.groups>['delete']>[0]
            options?: Parameters<ReturnType<typeof client.organization.groups>['delete']>[1]
          }
        },
      ) => {
        const { data, error } = await client.organization
          .groups(params)
          .delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetOrganizationGroupsGroupIdRolesKey(
  params: Parameters<typeof client.organization.groups>[0],
  options?: Parameters<ReturnType<typeof client.organization.groups>['roles']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['organization', '/organization/groups/{group_id}/roles', params, keyArgs] as const
}

export function useGetOrganizationGroupsGroupIdRoles<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.groups>['roles']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.groups>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.groups>['roles']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.organization.groups>['roles']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationGroupsGroupIdRolesKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.groups>['roles']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization.groups(params).roles.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetOrganizationGroupsGroupIdRoles<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.groups>['roles']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.groups>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.groups>['roles']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.organization.groups>['roles']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationGroupsGroupIdRolesKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.groups>['roles']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization.groups(params).roles.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostOrganizationGroupsGroupIdRolesKey() {
  return ['organization', '/organization/groups/{group_id}/roles', 'POST'] as const
}

export function usePostOrganizationGroupsGroupIdRoles<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.groups>['roles']['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.groups>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.groups>['roles']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.organization.groups>['roles']['post']>[0]
        options?: Parameters<ReturnType<typeof client.organization.groups>['roles']['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostOrganizationGroupsGroupIdRolesKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.groups>['roles']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.organization.groups>['roles']['post']>[0]
        options?: Parameters<ReturnType<typeof client.organization.groups>['roles']['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.organization.groups>['roles']['post']>[0]
            options?: Parameters<ReturnType<typeof client.organization.groups>['roles']['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client.organization
          .groups(params)
          .roles.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetOrganizationGroupsGroupIdRolesRoleIdKey(
  params: Parameters<typeof client.organization.groups>[0],
  params2: Parameters<ReturnType<typeof client.organization.groups>['roles']>[0],
) {
  return [
    'organization',
    '/organization/groups/{group_id}/roles/{role_id}',
    params,
    params2,
  ] as const
}

export function useGetOrganizationGroupsGroupIdRolesRoleId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.organization.groups>['roles']>['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.groups>[0],
  params2: Parameters<ReturnType<typeof client.organization.groups>['roles']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.organization.groups>['roles']>['get']>
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<typeof client.organization.groups>['roles']>['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationGroupsGroupIdRolesRoleIdKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.organization.groups>['roles']>['get']>
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization
          .groups(params)
          .roles(params2)
          .get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetOrganizationGroupsGroupIdRolesRoleId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.organization.groups>['roles']>['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.groups>[0],
  params2: Parameters<ReturnType<typeof client.organization.groups>['roles']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.organization.groups>['roles']>['get']>
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<typeof client.organization.groups>['roles']>['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationGroupsGroupIdRolesRoleIdKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.organization.groups>['roles']>['get']>
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization
          .groups(params)
          .roles(params2)
          .get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getDeleteOrganizationGroupsGroupIdRolesRoleIdKey() {
  return ['organization', '/organization/groups/{group_id}/roles/{role_id}', 'DELETE'] as const
}

export function useDeleteOrganizationGroupsGroupIdRolesRoleId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.organization.groups>['roles']>['delete']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.groups>[0],
  params2: Parameters<ReturnType<typeof client.organization.groups>['roles']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.organization.groups>['roles']>['delete']>
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<ReturnType<typeof client.organization.groups>['roles']>['delete']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.organization.groups>['roles']>['delete']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteOrganizationGroupsGroupIdRolesRoleIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.organization.groups>['roles']>['delete']>
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<ReturnType<typeof client.organization.groups>['roles']>['delete']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.organization.groups>['roles']>['delete']
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
              ReturnType<ReturnType<typeof client.organization.groups>['roles']>['delete']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.organization.groups>['roles']>['delete']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client.organization
          .groups(params)
          .roles(params2)
          .delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetOrganizationGroupsGroupIdUsersKey(
  params: Parameters<typeof client.organization.groups>[0],
  options?: Parameters<ReturnType<typeof client.organization.groups>['users']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['organization', '/organization/groups/{group_id}/users', params, keyArgs] as const
}

export function useGetOrganizationGroupsGroupIdUsers<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.groups>['users']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.groups>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.groups>['users']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.organization.groups>['users']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationGroupsGroupIdUsersKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.groups>['users']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization.groups(params).users.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetOrganizationGroupsGroupIdUsers<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.groups>['users']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.groups>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.groups>['users']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.organization.groups>['users']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationGroupsGroupIdUsersKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.groups>['users']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization.groups(params).users.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostOrganizationGroupsGroupIdUsersKey() {
  return ['organization', '/organization/groups/{group_id}/users', 'POST'] as const
}

export function usePostOrganizationGroupsGroupIdUsers<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.groups>['users']['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.groups>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.groups>['users']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.organization.groups>['users']['post']>[0]
        options?: Parameters<ReturnType<typeof client.organization.groups>['users']['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostOrganizationGroupsGroupIdUsersKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.groups>['users']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.organization.groups>['users']['post']>[0]
        options?: Parameters<ReturnType<typeof client.organization.groups>['users']['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.organization.groups>['users']['post']>[0]
            options?: Parameters<ReturnType<typeof client.organization.groups>['users']['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client.organization
          .groups(params)
          .users.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetOrganizationGroupsGroupIdUsersUserIdKey(
  params: Parameters<typeof client.organization.groups>[0],
  params2: Parameters<ReturnType<typeof client.organization.groups>['users']>[0],
) {
  return [
    'organization',
    '/organization/groups/{group_id}/users/{user_id}',
    params,
    params2,
  ] as const
}

export function useGetOrganizationGroupsGroupIdUsersUserId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.organization.groups>['users']>['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.groups>[0],
  params2: Parameters<ReturnType<typeof client.organization.groups>['users']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.organization.groups>['users']>['get']>
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<typeof client.organization.groups>['users']>['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationGroupsGroupIdUsersUserIdKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.organization.groups>['users']>['get']>
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization
          .groups(params)
          .users(params2)
          .get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetOrganizationGroupsGroupIdUsersUserId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.organization.groups>['users']>['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.groups>[0],
  params2: Parameters<ReturnType<typeof client.organization.groups>['users']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.organization.groups>['users']>['get']>
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<typeof client.organization.groups>['users']>['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationGroupsGroupIdUsersUserIdKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.organization.groups>['users']>['get']>
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization
          .groups(params)
          .users(params2)
          .get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getDeleteOrganizationGroupsGroupIdUsersUserIdKey() {
  return ['organization', '/organization/groups/{group_id}/users/{user_id}', 'DELETE'] as const
}

export function useDeleteOrganizationGroupsGroupIdUsersUserId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.organization.groups>['users']>['delete']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.groups>[0],
  params2: Parameters<ReturnType<typeof client.organization.groups>['users']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.organization.groups>['users']>['delete']>
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<ReturnType<typeof client.organization.groups>['users']>['delete']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.organization.groups>['users']>['delete']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteOrganizationGroupsGroupIdUsersUserIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.organization.groups>['users']>['delete']>
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<ReturnType<typeof client.organization.groups>['users']>['delete']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.organization.groups>['users']>['delete']
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
              ReturnType<ReturnType<typeof client.organization.groups>['users']>['delete']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.organization.groups>['users']>['delete']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client.organization
          .groups(params)
          .users(params2)
          .delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetOrganizationInvitesKey(
  options?: Parameters<typeof client.organization.invites.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['organization', '/organization/invites', keyArgs] as const
}

export function useGetOrganizationInvites<
  TError = Exclude<Awaited<ReturnType<typeof client.organization.invites.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.organization.invites.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.organization.invites.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationInvitesKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<Awaited<ReturnType<typeof client.organization.invites.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization.invites.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetOrganizationInvites<
  TError = Exclude<Awaited<ReturnType<typeof client.organization.invites.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.organization.invites.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.organization.invites.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationInvitesKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<Awaited<ReturnType<typeof client.organization.invites.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization.invites.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostOrganizationInvitesKey() {
  return ['organization', '/organization/invites', 'POST'] as const
}

export function usePostOrganizationInvites<
  TError = Exclude<Awaited<ReturnType<typeof client.organization.invites.post>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.organization.invites.post>>, { error: null }>['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.organization.invites.post>[0]
      options?: Parameters<typeof client.organization.invites.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostOrganizationInvitesKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<typeof client.organization.invites.post>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.organization.invites.post>[0]
        options?: Parameters<typeof client.organization.invites.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.organization.invites.post>[0]
            options?: Parameters<typeof client.organization.invites.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.organization.invites.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetOrganizationInvitesInviteIdKey(
  params: Parameters<typeof client.organization.invites>[0],
) {
  return ['organization', '/organization/invites/{invite_id}', params] as const
}

export function useGetOrganizationInvitesInviteId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.invites>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.invites>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.invites>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.organization.invites>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationInvitesInviteIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.invites>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization.invites(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetOrganizationInvitesInviteId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.invites>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.invites>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.invites>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.organization.invites>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationInvitesInviteIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.invites>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization.invites(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getDeleteOrganizationInvitesInviteIdKey() {
  return ['organization', '/organization/invites/{invite_id}', 'DELETE'] as const
}

export function useDeleteOrganizationInvitesInviteId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.invites>['delete']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.invites>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.invites>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.organization.invites>['delete']>[0]
        options?: Parameters<ReturnType<typeof client.organization.invites>['delete']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteOrganizationInvitesInviteIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.invites>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.organization.invites>['delete']>[0]
        options?: Parameters<ReturnType<typeof client.organization.invites>['delete']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<ReturnType<typeof client.organization.invites>['delete']>[0]
            options?: Parameters<ReturnType<typeof client.organization.invites>['delete']>[1]
          }
        },
      ) => {
        const { data, error } = await client.organization
          .invites(params)
          .delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetOrganizationProjectsKey(
  options?: Parameters<typeof client.organization.projects.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['organization', '/organization/projects', keyArgs] as const
}

export function useGetOrganizationProjects<
  TError = Exclude<Awaited<ReturnType<typeof client.organization.projects.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.organization.projects.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.organization.projects.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationProjectsKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<typeof client.organization.projects.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization.projects.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetOrganizationProjects<
  TError = Exclude<Awaited<ReturnType<typeof client.organization.projects.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.organization.projects.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.organization.projects.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationProjectsKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<typeof client.organization.projects.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization.projects.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostOrganizationProjectsKey() {
  return ['organization', '/organization/projects', 'POST'] as const
}

export function usePostOrganizationProjects<
  TError = Exclude<Awaited<ReturnType<typeof client.organization.projects.post>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.organization.projects.post>>, { error: null }>['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.organization.projects.post>[0]
      options?: Parameters<typeof client.organization.projects.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostOrganizationProjectsKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<typeof client.organization.projects.post>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.organization.projects.post>[0]
        options?: Parameters<typeof client.organization.projects.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.organization.projects.post>[0]
            options?: Parameters<typeof client.organization.projects.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.organization.projects.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetOrganizationProjectsProjectIdKey(
  params: Parameters<typeof client.organization.projects>[0],
) {
  return ['organization', '/organization/projects/{project_id}', params] as const
}

export function useGetOrganizationProjectsProjectId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.projects>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.projects>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.projects>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.organization.projects>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationProjectsProjectIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.projects>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization.projects(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetOrganizationProjectsProjectId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.projects>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.projects>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.projects>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.organization.projects>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationProjectsProjectIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.projects>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization.projects(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostOrganizationProjectsProjectIdKey() {
  return ['organization', '/organization/projects/{project_id}', 'POST'] as const
}

export function usePostOrganizationProjectsProjectId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.projects>['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.projects>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.projects>['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.organization.projects>['post']>[0]
        options?: Parameters<ReturnType<typeof client.organization.projects>['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostOrganizationProjectsProjectIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.projects>['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.organization.projects>['post']>[0]
        options?: Parameters<ReturnType<typeof client.organization.projects>['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.organization.projects>['post']>[0]
            options?: Parameters<ReturnType<typeof client.organization.projects>['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client.organization
          .projects(params)
          .post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetOrganizationProjectsProjectIdApiKeysKey(
  params: Parameters<typeof client.organization.projects>[0],
  options?: Parameters<ReturnType<typeof client.organization.projects>['api_keys']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['organization', '/organization/projects/{project_id}/api_keys', params, keyArgs] as const
}

export function useGetOrganizationProjectsProjectIdApiKeys<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.organization.projects>['api_keys']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.projects>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.projects>['api_keys']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.organization.projects>['api_keys']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationProjectsProjectIdApiKeysKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.projects>['api_keys']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization
          .projects(params)
          .api_keys.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetOrganizationProjectsProjectIdApiKeys<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.organization.projects>['api_keys']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.projects>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.projects>['api_keys']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.organization.projects>['api_keys']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationProjectsProjectIdApiKeysKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.projects>['api_keys']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization
          .projects(params)
          .api_keys.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetOrganizationProjectsProjectIdApiKeysApiKeyIdKey(
  params: Parameters<typeof client.organization.projects>[0],
  params2: Parameters<ReturnType<typeof client.organization.projects>['api_keys']>[0],
) {
  return [
    'organization',
    '/organization/projects/{project_id}/api_keys/{api_key_id}',
    params,
    params2,
  ] as const
}

export function useGetOrganizationProjectsProjectIdApiKeysApiKeyId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.organization.projects>['api_keys']>['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.projects>[0],
  params2: Parameters<ReturnType<typeof client.organization.projects>['api_keys']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.organization.projects>['api_keys']>['get']>
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<typeof client.organization.projects>['api_keys']>['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationProjectsProjectIdApiKeysApiKeyIdKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.organization.projects>['api_keys']>['get']>
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization
          .projects(params)
          .api_keys(params2)
          .get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetOrganizationProjectsProjectIdApiKeysApiKeyId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.organization.projects>['api_keys']>['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.projects>[0],
  params2: Parameters<ReturnType<typeof client.organization.projects>['api_keys']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.organization.projects>['api_keys']>['get']>
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<typeof client.organization.projects>['api_keys']>['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationProjectsProjectIdApiKeysApiKeyIdKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.organization.projects>['api_keys']>['get']>
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization
          .projects(params)
          .api_keys(params2)
          .get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostOrganizationProjectsProjectIdApiKeysApiKeyIdKey() {
  return [
    'organization',
    '/organization/projects/{project_id}/api_keys/{api_key_id}',
    'POST',
  ] as const
}

export function usePostOrganizationProjectsProjectIdApiKeysApiKeyId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.organization.projects>['api_keys']>['post']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.projects>[0],
  params2: Parameters<ReturnType<typeof client.organization.projects>['api_keys']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<typeof client.organization.projects>['api_keys']>['post']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<
          ReturnType<ReturnType<typeof client.organization.projects>['api_keys']>['post']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.organization.projects>['api_keys']>['post']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostOrganizationProjectsProjectIdApiKeysApiKeyIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<typeof client.organization.projects>['api_keys']>['post']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<
          ReturnType<ReturnType<typeof client.organization.projects>['api_keys']>['post']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.organization.projects>['api_keys']>['post']
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
            body: Parameters<
              ReturnType<ReturnType<typeof client.organization.projects>['api_keys']>['post']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.organization.projects>['api_keys']>['post']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client.organization
          .projects(params)
          .api_keys(params2)
          .post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getDeleteOrganizationProjectsProjectIdApiKeysApiKeyIdKey() {
  return [
    'organization',
    '/organization/projects/{project_id}/api_keys/{api_key_id}',
    'DELETE',
  ] as const
}

export function useDeleteOrganizationProjectsProjectIdApiKeysApiKeyId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.organization.projects>['api_keys']>['delete']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.projects>[0],
  params2: Parameters<ReturnType<typeof client.organization.projects>['api_keys']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<typeof client.organization.projects>['api_keys']>['delete']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<ReturnType<typeof client.organization.projects>['api_keys']>['delete']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.organization.projects>['api_keys']>['delete']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteOrganizationProjectsProjectIdApiKeysApiKeyIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<typeof client.organization.projects>['api_keys']>['delete']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<ReturnType<typeof client.organization.projects>['api_keys']>['delete']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.organization.projects>['api_keys']>['delete']
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
              ReturnType<ReturnType<typeof client.organization.projects>['api_keys']>['delete']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.organization.projects>['api_keys']>['delete']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client.organization
          .projects(params)
          .api_keys(params2)
          .delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostOrganizationProjectsProjectIdArchiveKey() {
  return ['organization', '/organization/projects/{project_id}/archive', 'POST'] as const
}

export function usePostOrganizationProjectsProjectIdArchive<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.organization.projects>['archive']['post']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.projects>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.projects>['archive']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.organization.projects>['archive']['post']>[0]
        options?: Parameters<ReturnType<typeof client.organization.projects>['archive']['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostOrganizationProjectsProjectIdArchiveKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.projects>['archive']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.organization.projects>['archive']['post']>[0]
        options?: Parameters<ReturnType<typeof client.organization.projects>['archive']['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<ReturnType<typeof client.organization.projects>['archive']['post']>[0]
            options?: Parameters<
              ReturnType<typeof client.organization.projects>['archive']['post']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client.organization
          .projects(params)
          .archive.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetOrganizationProjectsProjectIdCertificatesKey(
  params: Parameters<typeof client.organization.projects>[0],
  options?: Parameters<ReturnType<typeof client.organization.projects>['certificates']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'organization',
    '/organization/projects/{project_id}/certificates',
    params,
    keyArgs,
  ] as const
}

export function useGetOrganizationProjectsProjectIdCertificates<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.organization.projects>['certificates']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.projects>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.projects>['certificates']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.organization.projects>['certificates']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationProjectsProjectIdCertificatesKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.projects>['certificates']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization
          .projects(params)
          .certificates.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetOrganizationProjectsProjectIdCertificates<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.organization.projects>['certificates']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.projects>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.projects>['certificates']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.organization.projects>['certificates']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationProjectsProjectIdCertificatesKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.projects>['certificates']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization
          .projects(params)
          .certificates.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostOrganizationProjectsProjectIdCertificatesActivateKey() {
  return [
    'organization',
    '/organization/projects/{project_id}/certificates/activate',
    'POST',
  ] as const
}

export function usePostOrganizationProjectsProjectIdCertificatesActivate<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<typeof client.organization.projects>['certificates']['activate']['post']
      >
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.projects>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<typeof client.organization.projects>['certificates']['activate']['post']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<
          ReturnType<typeof client.organization.projects>['certificates']['activate']['post']
        >[0]
        options?: Parameters<
          ReturnType<typeof client.organization.projects>['certificates']['activate']['post']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostOrganizationProjectsProjectIdCertificatesActivateKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<typeof client.organization.projects>['certificates']['activate']['post']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<
          ReturnType<typeof client.organization.projects>['certificates']['activate']['post']
        >[0]
        options?: Parameters<
          ReturnType<typeof client.organization.projects>['certificates']['activate']['post']
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
            body: Parameters<
              ReturnType<typeof client.organization.projects>['certificates']['activate']['post']
            >[0]
            options?: Parameters<
              ReturnType<typeof client.organization.projects>['certificates']['activate']['post']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client.organization
          .projects(params)
          .certificates.activate.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostOrganizationProjectsProjectIdCertificatesDeactivateKey() {
  return [
    'organization',
    '/organization/projects/{project_id}/certificates/deactivate',
    'POST',
  ] as const
}

export function usePostOrganizationProjectsProjectIdCertificatesDeactivate<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<typeof client.organization.projects>['certificates']['deactivate']['post']
      >
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.projects>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<typeof client.organization.projects>['certificates']['deactivate']['post']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<
          ReturnType<typeof client.organization.projects>['certificates']['deactivate']['post']
        >[0]
        options?: Parameters<
          ReturnType<typeof client.organization.projects>['certificates']['deactivate']['post']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostOrganizationProjectsProjectIdCertificatesDeactivateKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<typeof client.organization.projects>['certificates']['deactivate']['post']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<
          ReturnType<typeof client.organization.projects>['certificates']['deactivate']['post']
        >[0]
        options?: Parameters<
          ReturnType<typeof client.organization.projects>['certificates']['deactivate']['post']
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
            body: Parameters<
              ReturnType<typeof client.organization.projects>['certificates']['deactivate']['post']
            >[0]
            options?: Parameters<
              ReturnType<typeof client.organization.projects>['certificates']['deactivate']['post']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client.organization
          .projects(params)
          .certificates.deactivate.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetOrganizationProjectsProjectIdDataRetentionKey(
  params: Parameters<typeof client.organization.projects>[0],
) {
  return ['organization', '/organization/projects/{project_id}/data_retention', params] as const
}

export function useGetOrganizationProjectsProjectIdDataRetention<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.organization.projects>['data_retention']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.projects>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<typeof client.organization.projects>['data_retention']['get']>
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<typeof client.organization.projects>['data_retention']['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationProjectsProjectIdDataRetentionKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<
          ReturnType<ReturnType<typeof client.organization.projects>['data_retention']['get']>
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization
          .projects(params)
          .data_retention.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetOrganizationProjectsProjectIdDataRetention<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.organization.projects>['data_retention']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.projects>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<typeof client.organization.projects>['data_retention']['get']>
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<typeof client.organization.projects>['data_retention']['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationProjectsProjectIdDataRetentionKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<
          ReturnType<ReturnType<typeof client.organization.projects>['data_retention']['get']>
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization
          .projects(params)
          .data_retention.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostOrganizationProjectsProjectIdDataRetentionKey() {
  return ['organization', '/organization/projects/{project_id}/data_retention', 'POST'] as const
}

export function usePostOrganizationProjectsProjectIdDataRetention<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.organization.projects>['data_retention']['post']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.projects>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<typeof client.organization.projects>['data_retention']['post']>
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<
          ReturnType<typeof client.organization.projects>['data_retention']['post']
        >[0]
        options?: Parameters<
          ReturnType<typeof client.organization.projects>['data_retention']['post']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostOrganizationProjectsProjectIdDataRetentionKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<ReturnType<typeof client.organization.projects>['data_retention']['post']>
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<
          ReturnType<typeof client.organization.projects>['data_retention']['post']
        >[0]
        options?: Parameters<
          ReturnType<typeof client.organization.projects>['data_retention']['post']
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
            body: Parameters<
              ReturnType<typeof client.organization.projects>['data_retention']['post']
            >[0]
            options?: Parameters<
              ReturnType<typeof client.organization.projects>['data_retention']['post']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client.organization
          .projects(params)
          .data_retention.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetOrganizationProjectsProjectIdGroupsKey(
  params: Parameters<typeof client.organization.projects>[0],
  options?: Parameters<ReturnType<typeof client.organization.projects>['groups']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['organization', '/organization/projects/{project_id}/groups', params, keyArgs] as const
}

export function useGetOrganizationProjectsProjectIdGroups<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.projects>['groups']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.projects>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.projects>['groups']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.organization.projects>['groups']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationProjectsProjectIdGroupsKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.projects>['groups']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization.projects(params).groups.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetOrganizationProjectsProjectIdGroups<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.projects>['groups']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.projects>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.projects>['groups']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.organization.projects>['groups']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationProjectsProjectIdGroupsKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.projects>['groups']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization.projects(params).groups.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostOrganizationProjectsProjectIdGroupsKey() {
  return ['organization', '/organization/projects/{project_id}/groups', 'POST'] as const
}

export function usePostOrganizationProjectsProjectIdGroups<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.projects>['groups']['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.projects>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.projects>['groups']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.organization.projects>['groups']['post']>[0]
        options?: Parameters<ReturnType<typeof client.organization.projects>['groups']['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostOrganizationProjectsProjectIdGroupsKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.projects>['groups']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.organization.projects>['groups']['post']>[0]
        options?: Parameters<ReturnType<typeof client.organization.projects>['groups']['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.organization.projects>['groups']['post']>[0]
            options?: Parameters<
              ReturnType<typeof client.organization.projects>['groups']['post']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client.organization
          .projects(params)
          .groups.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetOrganizationProjectsProjectIdGroupsGroupIdKey(
  params: Parameters<typeof client.organization.projects>[0],
  params2: Parameters<ReturnType<typeof client.organization.projects>['groups']>[0],
  options?: Parameters<
    ReturnType<ReturnType<typeof client.organization.projects>['groups']>['get']
  >[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'organization',
    '/organization/projects/{project_id}/groups/{group_id}',
    params,
    params2,
    keyArgs,
  ] as const
}

export function useGetOrganizationProjectsProjectIdGroupsGroupId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.organization.projects>['groups']>['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.projects>[0],
  params2: Parameters<ReturnType<typeof client.organization.projects>['groups']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.organization.projects>['groups']>['get']>
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<typeof client.organization.projects>['groups']>['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationProjectsProjectIdGroupsGroupIdKey(params, params2, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.organization.projects>['groups']>['get']>
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization
          .projects(params)
          .groups(params2)
          .get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetOrganizationProjectsProjectIdGroupsGroupId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.organization.projects>['groups']>['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.projects>[0],
  params2: Parameters<ReturnType<typeof client.organization.projects>['groups']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.organization.projects>['groups']>['get']>
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<typeof client.organization.projects>['groups']>['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationProjectsProjectIdGroupsGroupIdKey(params, params2, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.organization.projects>['groups']>['get']>
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization
          .projects(params)
          .groups(params2)
          .get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getDeleteOrganizationProjectsProjectIdGroupsGroupIdKey() {
  return [
    'organization',
    '/organization/projects/{project_id}/groups/{group_id}',
    'DELETE',
  ] as const
}

export function useDeleteOrganizationProjectsProjectIdGroupsGroupId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.organization.projects>['groups']>['delete']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.projects>[0],
  params2: Parameters<ReturnType<typeof client.organization.projects>['groups']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<typeof client.organization.projects>['groups']>['delete']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<ReturnType<typeof client.organization.projects>['groups']>['delete']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.organization.projects>['groups']>['delete']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteOrganizationProjectsProjectIdGroupsGroupIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<typeof client.organization.projects>['groups']>['delete']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<ReturnType<typeof client.organization.projects>['groups']>['delete']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.organization.projects>['groups']>['delete']
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
              ReturnType<ReturnType<typeof client.organization.projects>['groups']>['delete']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.organization.projects>['groups']>['delete']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client.organization
          .projects(params)
          .groups(params2)
          .delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetOrganizationProjectsProjectIdHostedToolPermissionsKey(
  params: Parameters<typeof client.organization.projects>[0],
) {
  return [
    'organization',
    '/organization/projects/{project_id}/hosted_tool_permissions',
    params,
  ] as const
}

export function useGetOrganizationProjectsProjectIdHostedToolPermissions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.organization.projects>['hosted_tool_permissions']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.projects>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<typeof client.organization.projects>['hosted_tool_permissions']['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<typeof client.organization.projects>['hosted_tool_permissions']['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationProjectsProjectIdHostedToolPermissionsKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<typeof client.organization.projects>['hosted_tool_permissions']['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization
          .projects(params)
          .hosted_tool_permissions.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetOrganizationProjectsProjectIdHostedToolPermissions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.organization.projects>['hosted_tool_permissions']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.projects>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<typeof client.organization.projects>['hosted_tool_permissions']['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<typeof client.organization.projects>['hosted_tool_permissions']['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationProjectsProjectIdHostedToolPermissionsKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<typeof client.organization.projects>['hosted_tool_permissions']['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization
          .projects(params)
          .hosted_tool_permissions.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostOrganizationProjectsProjectIdHostedToolPermissionsKey() {
  return [
    'organization',
    '/organization/projects/{project_id}/hosted_tool_permissions',
    'POST',
  ] as const
}

export function usePostOrganizationProjectsProjectIdHostedToolPermissions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.organization.projects>['hosted_tool_permissions']['post']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.projects>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<typeof client.organization.projects>['hosted_tool_permissions']['post']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<
          ReturnType<typeof client.organization.projects>['hosted_tool_permissions']['post']
        >[0]
        options?: Parameters<
          ReturnType<typeof client.organization.projects>['hosted_tool_permissions']['post']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostOrganizationProjectsProjectIdHostedToolPermissionsKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<typeof client.organization.projects>['hosted_tool_permissions']['post']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<
          ReturnType<typeof client.organization.projects>['hosted_tool_permissions']['post']
        >[0]
        options?: Parameters<
          ReturnType<typeof client.organization.projects>['hosted_tool_permissions']['post']
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
            body: Parameters<
              ReturnType<typeof client.organization.projects>['hosted_tool_permissions']['post']
            >[0]
            options?: Parameters<
              ReturnType<typeof client.organization.projects>['hosted_tool_permissions']['post']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client.organization
          .projects(params)
          .hosted_tool_permissions.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetOrganizationProjectsProjectIdModelPermissionsKey(
  params: Parameters<typeof client.organization.projects>[0],
) {
  return ['organization', '/organization/projects/{project_id}/model_permissions', params] as const
}

export function useGetOrganizationProjectsProjectIdModelPermissions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.organization.projects>['model_permissions']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.projects>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<typeof client.organization.projects>['model_permissions']['get']>
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<typeof client.organization.projects>['model_permissions']['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationProjectsProjectIdModelPermissionsKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<
          ReturnType<ReturnType<typeof client.organization.projects>['model_permissions']['get']>
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization
          .projects(params)
          .model_permissions.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetOrganizationProjectsProjectIdModelPermissions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.organization.projects>['model_permissions']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.projects>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<typeof client.organization.projects>['model_permissions']['get']>
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<typeof client.organization.projects>['model_permissions']['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationProjectsProjectIdModelPermissionsKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<
          ReturnType<ReturnType<typeof client.organization.projects>['model_permissions']['get']>
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization
          .projects(params)
          .model_permissions.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostOrganizationProjectsProjectIdModelPermissionsKey() {
  return ['organization', '/organization/projects/{project_id}/model_permissions', 'POST'] as const
}

export function usePostOrganizationProjectsProjectIdModelPermissions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.organization.projects>['model_permissions']['post']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.projects>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<typeof client.organization.projects>['model_permissions']['post']>
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<
          ReturnType<typeof client.organization.projects>['model_permissions']['post']
        >[0]
        options?: Parameters<
          ReturnType<typeof client.organization.projects>['model_permissions']['post']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostOrganizationProjectsProjectIdModelPermissionsKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<ReturnType<typeof client.organization.projects>['model_permissions']['post']>
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<
          ReturnType<typeof client.organization.projects>['model_permissions']['post']
        >[0]
        options?: Parameters<
          ReturnType<typeof client.organization.projects>['model_permissions']['post']
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
            body: Parameters<
              ReturnType<typeof client.organization.projects>['model_permissions']['post']
            >[0]
            options?: Parameters<
              ReturnType<typeof client.organization.projects>['model_permissions']['post']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client.organization
          .projects(params)
          .model_permissions.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getDeleteOrganizationProjectsProjectIdModelPermissionsKey() {
  return [
    'organization',
    '/organization/projects/{project_id}/model_permissions',
    'DELETE',
  ] as const
}

export function useDeleteOrganizationProjectsProjectIdModelPermissions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.organization.projects>['model_permissions']['delete']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.projects>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<typeof client.organization.projects>['model_permissions']['delete']>
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<typeof client.organization.projects>['model_permissions']['delete']
        >[0]
        options?: Parameters<
          ReturnType<typeof client.organization.projects>['model_permissions']['delete']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteOrganizationProjectsProjectIdModelPermissionsKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<ReturnType<typeof client.organization.projects>['model_permissions']['delete']>
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<typeof client.organization.projects>['model_permissions']['delete']
        >[0]
        options?: Parameters<
          ReturnType<typeof client.organization.projects>['model_permissions']['delete']
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
              ReturnType<typeof client.organization.projects>['model_permissions']['delete']
            >[0]
            options?: Parameters<
              ReturnType<typeof client.organization.projects>['model_permissions']['delete']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client.organization
          .projects(params)
          .model_permissions.delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetOrganizationProjectsProjectIdRateLimitsKey(
  params: Parameters<typeof client.organization.projects>[0],
  options?: Parameters<ReturnType<typeof client.organization.projects>['rate_limits']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'organization',
    '/organization/projects/{project_id}/rate_limits',
    params,
    keyArgs,
  ] as const
}

export function useGetOrganizationProjectsProjectIdRateLimits<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.organization.projects>['rate_limits']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.projects>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.projects>['rate_limits']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.organization.projects>['rate_limits']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationProjectsProjectIdRateLimitsKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.projects>['rate_limits']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization
          .projects(params)
          .rate_limits.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetOrganizationProjectsProjectIdRateLimits<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.organization.projects>['rate_limits']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.projects>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.projects>['rate_limits']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.organization.projects>['rate_limits']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationProjectsProjectIdRateLimitsKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.projects>['rate_limits']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization
          .projects(params)
          .rate_limits.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostOrganizationProjectsProjectIdRateLimitsRateLimitIdKey() {
  return [
    'organization',
    '/organization/projects/{project_id}/rate_limits/{rate_limit_id}',
    'POST',
  ] as const
}

export function usePostOrganizationProjectsProjectIdRateLimitsRateLimitId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.organization.projects>['rate_limits']>['post']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.projects>[0],
  params2: Parameters<ReturnType<typeof client.organization.projects>['rate_limits']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<typeof client.organization.projects>['rate_limits']>['post']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<
          ReturnType<ReturnType<typeof client.organization.projects>['rate_limits']>['post']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.organization.projects>['rate_limits']>['post']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostOrganizationProjectsProjectIdRateLimitsRateLimitIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<typeof client.organization.projects>['rate_limits']>['post']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<
          ReturnType<ReturnType<typeof client.organization.projects>['rate_limits']>['post']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.organization.projects>['rate_limits']>['post']
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
            body: Parameters<
              ReturnType<ReturnType<typeof client.organization.projects>['rate_limits']>['post']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.organization.projects>['rate_limits']>['post']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client.organization
          .projects(params)
          .rate_limits(params2)
          .post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetOrganizationProjectsProjectIdServiceAccountsKey(
  params: Parameters<typeof client.organization.projects>[0],
  options?: Parameters<
    ReturnType<typeof client.organization.projects>['service_accounts']['get']
  >[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'organization',
    '/organization/projects/{project_id}/service_accounts',
    params,
    keyArgs,
  ] as const
}

export function useGetOrganizationProjectsProjectIdServiceAccounts<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.organization.projects>['service_accounts']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.projects>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<typeof client.organization.projects>['service_accounts']['get']>
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<typeof client.organization.projects>['service_accounts']['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationProjectsProjectIdServiceAccountsKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<
          ReturnType<ReturnType<typeof client.organization.projects>['service_accounts']['get']>
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization
          .projects(params)
          .service_accounts.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetOrganizationProjectsProjectIdServiceAccounts<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.organization.projects>['service_accounts']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.projects>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<typeof client.organization.projects>['service_accounts']['get']>
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<typeof client.organization.projects>['service_accounts']['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationProjectsProjectIdServiceAccountsKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<
          ReturnType<ReturnType<typeof client.organization.projects>['service_accounts']['get']>
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization
          .projects(params)
          .service_accounts.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostOrganizationProjectsProjectIdServiceAccountsKey() {
  return ['organization', '/organization/projects/{project_id}/service_accounts', 'POST'] as const
}

export function usePostOrganizationProjectsProjectIdServiceAccounts<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.organization.projects>['service_accounts']['post']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.projects>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<typeof client.organization.projects>['service_accounts']['post']>
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<
          ReturnType<typeof client.organization.projects>['service_accounts']['post']
        >[0]
        options?: Parameters<
          ReturnType<typeof client.organization.projects>['service_accounts']['post']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostOrganizationProjectsProjectIdServiceAccountsKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<ReturnType<typeof client.organization.projects>['service_accounts']['post']>
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<
          ReturnType<typeof client.organization.projects>['service_accounts']['post']
        >[0]
        options?: Parameters<
          ReturnType<typeof client.organization.projects>['service_accounts']['post']
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
            body: Parameters<
              ReturnType<typeof client.organization.projects>['service_accounts']['post']
            >[0]
            options?: Parameters<
              ReturnType<typeof client.organization.projects>['service_accounts']['post']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client.organization
          .projects(params)
          .service_accounts.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetOrganizationProjectsProjectIdServiceAccountsServiceAccountIdKey(
  params: Parameters<typeof client.organization.projects>[0],
  params2: Parameters<ReturnType<typeof client.organization.projects>['service_accounts']>[0],
) {
  return [
    'organization',
    '/organization/projects/{project_id}/service_accounts/{service_account_id}',
    params,
    params2,
  ] as const
}

export function useGetOrganizationProjectsProjectIdServiceAccountsServiceAccountId<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<typeof client.organization.projects>['service_accounts']>['get']
      >
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.projects>[0],
  params2: Parameters<ReturnType<typeof client.organization.projects>['service_accounts']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<typeof client.organization.projects>['service_accounts']>['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<typeof client.organization.projects>['service_accounts']>['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationProjectsProjectIdServiceAccountsServiceAccountIdKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<typeof client.organization.projects>['service_accounts']>['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization
          .projects(params)
          .service_accounts(params2)
          .get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetOrganizationProjectsProjectIdServiceAccountsServiceAccountId<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<typeof client.organization.projects>['service_accounts']>['get']
      >
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.projects>[0],
  params2: Parameters<ReturnType<typeof client.organization.projects>['service_accounts']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<typeof client.organization.projects>['service_accounts']>['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<typeof client.organization.projects>['service_accounts']>['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationProjectsProjectIdServiceAccountsServiceAccountIdKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<typeof client.organization.projects>['service_accounts']>['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization
          .projects(params)
          .service_accounts(params2)
          .get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostOrganizationProjectsProjectIdServiceAccountsServiceAccountIdKey() {
  return [
    'organization',
    '/organization/projects/{project_id}/service_accounts/{service_account_id}',
    'POST',
  ] as const
}

export function usePostOrganizationProjectsProjectIdServiceAccountsServiceAccountId<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<typeof client.organization.projects>['service_accounts']>['post']
      >
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.projects>[0],
  params2: Parameters<ReturnType<typeof client.organization.projects>['service_accounts']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<typeof client.organization.projects>['service_accounts']>['post']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<
          ReturnType<ReturnType<typeof client.organization.projects>['service_accounts']>['post']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.organization.projects>['service_accounts']>['post']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey =
    customKey ?? getPostOrganizationProjectsProjectIdServiceAccountsServiceAccountIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<typeof client.organization.projects>['service_accounts']>['post']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<
          ReturnType<ReturnType<typeof client.organization.projects>['service_accounts']>['post']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.organization.projects>['service_accounts']>['post']
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
            body: Parameters<
              ReturnType<
                ReturnType<typeof client.organization.projects>['service_accounts']
              >['post']
            >[0]
            options?: Parameters<
              ReturnType<
                ReturnType<typeof client.organization.projects>['service_accounts']
              >['post']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client.organization
          .projects(params)
          .service_accounts(params2)
          .post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getDeleteOrganizationProjectsProjectIdServiceAccountsServiceAccountIdKey() {
  return [
    'organization',
    '/organization/projects/{project_id}/service_accounts/{service_account_id}',
    'DELETE',
  ] as const
}

export function useDeleteOrganizationProjectsProjectIdServiceAccountsServiceAccountId<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<typeof client.organization.projects>['service_accounts']>['delete']
      >
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.projects>[0],
  params2: Parameters<ReturnType<typeof client.organization.projects>['service_accounts']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<
              ReturnType<typeof client.organization.projects>['service_accounts']
            >['delete']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<ReturnType<typeof client.organization.projects>['service_accounts']>['delete']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.organization.projects>['service_accounts']>['delete']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey =
    customKey ?? getDeleteOrganizationProjectsProjectIdServiceAccountsServiceAccountIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<
              ReturnType<typeof client.organization.projects>['service_accounts']
            >['delete']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<ReturnType<typeof client.organization.projects>['service_accounts']>['delete']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.organization.projects>['service_accounts']>['delete']
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
              ReturnType<
                ReturnType<typeof client.organization.projects>['service_accounts']
              >['delete']
            >[0]
            options?: Parameters<
              ReturnType<
                ReturnType<typeof client.organization.projects>['service_accounts']
              >['delete']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client.organization
          .projects(params)
          .service_accounts(params2)
          .delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetOrganizationProjectsProjectIdSpendAlertsKey(
  params: Parameters<typeof client.organization.projects>[0],
  options?: Parameters<ReturnType<typeof client.organization.projects>['spend_alerts']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'organization',
    '/organization/projects/{project_id}/spend_alerts',
    params,
    keyArgs,
  ] as const
}

export function useGetOrganizationProjectsProjectIdSpendAlerts<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.organization.projects>['spend_alerts']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.projects>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.projects>['spend_alerts']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.organization.projects>['spend_alerts']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationProjectsProjectIdSpendAlertsKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.projects>['spend_alerts']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization
          .projects(params)
          .spend_alerts.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetOrganizationProjectsProjectIdSpendAlerts<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.organization.projects>['spend_alerts']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.projects>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.projects>['spend_alerts']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.organization.projects>['spend_alerts']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationProjectsProjectIdSpendAlertsKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.projects>['spend_alerts']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization
          .projects(params)
          .spend_alerts.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostOrganizationProjectsProjectIdSpendAlertsKey() {
  return ['organization', '/organization/projects/{project_id}/spend_alerts', 'POST'] as const
}

export function usePostOrganizationProjectsProjectIdSpendAlerts<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.organization.projects>['spend_alerts']['post']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.projects>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<typeof client.organization.projects>['spend_alerts']['post']>
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.organization.projects>['spend_alerts']['post']>[0]
        options?: Parameters<
          ReturnType<typeof client.organization.projects>['spend_alerts']['post']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostOrganizationProjectsProjectIdSpendAlertsKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<ReturnType<typeof client.organization.projects>['spend_alerts']['post']>
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.organization.projects>['spend_alerts']['post']>[0]
        options?: Parameters<
          ReturnType<typeof client.organization.projects>['spend_alerts']['post']
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
            body: Parameters<
              ReturnType<typeof client.organization.projects>['spend_alerts']['post']
            >[0]
            options?: Parameters<
              ReturnType<typeof client.organization.projects>['spend_alerts']['post']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client.organization
          .projects(params)
          .spend_alerts.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetOrganizationProjectsProjectIdSpendAlertsAlertIdKey(
  params: Parameters<typeof client.organization.projects>[0],
  params2: Parameters<ReturnType<typeof client.organization.projects>['spend_alerts']>[0],
) {
  return [
    'organization',
    '/organization/projects/{project_id}/spend_alerts/{alert_id}',
    params,
    params2,
  ] as const
}

export function useGetOrganizationProjectsProjectIdSpendAlertsAlertId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.organization.projects>['spend_alerts']>['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.projects>[0],
  params2: Parameters<ReturnType<typeof client.organization.projects>['spend_alerts']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<typeof client.organization.projects>['spend_alerts']>['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<typeof client.organization.projects>['spend_alerts']>['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationProjectsProjectIdSpendAlertsAlertIdKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<typeof client.organization.projects>['spend_alerts']>['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization
          .projects(params)
          .spend_alerts(params2)
          .get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetOrganizationProjectsProjectIdSpendAlertsAlertId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.organization.projects>['spend_alerts']>['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.projects>[0],
  params2: Parameters<ReturnType<typeof client.organization.projects>['spend_alerts']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<typeof client.organization.projects>['spend_alerts']>['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<typeof client.organization.projects>['spend_alerts']>['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationProjectsProjectIdSpendAlertsAlertIdKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<typeof client.organization.projects>['spend_alerts']>['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization
          .projects(params)
          .spend_alerts(params2)
          .get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostOrganizationProjectsProjectIdSpendAlertsAlertIdKey() {
  return [
    'organization',
    '/organization/projects/{project_id}/spend_alerts/{alert_id}',
    'POST',
  ] as const
}

export function usePostOrganizationProjectsProjectIdSpendAlertsAlertId<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<typeof client.organization.projects>['spend_alerts']>['post']
      >
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.projects>[0],
  params2: Parameters<ReturnType<typeof client.organization.projects>['spend_alerts']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<typeof client.organization.projects>['spend_alerts']>['post']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<
          ReturnType<ReturnType<typeof client.organization.projects>['spend_alerts']>['post']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.organization.projects>['spend_alerts']>['post']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostOrganizationProjectsProjectIdSpendAlertsAlertIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<typeof client.organization.projects>['spend_alerts']>['post']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<
          ReturnType<ReturnType<typeof client.organization.projects>['spend_alerts']>['post']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.organization.projects>['spend_alerts']>['post']
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
            body: Parameters<
              ReturnType<ReturnType<typeof client.organization.projects>['spend_alerts']>['post']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.organization.projects>['spend_alerts']>['post']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client.organization
          .projects(params)
          .spend_alerts(params2)
          .post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getDeleteOrganizationProjectsProjectIdSpendAlertsAlertIdKey() {
  return [
    'organization',
    '/organization/projects/{project_id}/spend_alerts/{alert_id}',
    'DELETE',
  ] as const
}

export function useDeleteOrganizationProjectsProjectIdSpendAlertsAlertId<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<typeof client.organization.projects>['spend_alerts']>['delete']
      >
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.projects>[0],
  params2: Parameters<ReturnType<typeof client.organization.projects>['spend_alerts']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<typeof client.organization.projects>['spend_alerts']>['delete']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<ReturnType<typeof client.organization.projects>['spend_alerts']>['delete']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.organization.projects>['spend_alerts']>['delete']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteOrganizationProjectsProjectIdSpendAlertsAlertIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<typeof client.organization.projects>['spend_alerts']>['delete']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<ReturnType<typeof client.organization.projects>['spend_alerts']>['delete']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.organization.projects>['spend_alerts']>['delete']
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
              ReturnType<ReturnType<typeof client.organization.projects>['spend_alerts']>['delete']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.organization.projects>['spend_alerts']>['delete']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client.organization
          .projects(params)
          .spend_alerts(params2)
          .delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetOrganizationProjectsProjectIdUsersKey(
  params: Parameters<typeof client.organization.projects>[0],
  options?: Parameters<ReturnType<typeof client.organization.projects>['users']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['organization', '/organization/projects/{project_id}/users', params, keyArgs] as const
}

export function useGetOrganizationProjectsProjectIdUsers<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.projects>['users']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.projects>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.projects>['users']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.organization.projects>['users']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationProjectsProjectIdUsersKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.projects>['users']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization.projects(params).users.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetOrganizationProjectsProjectIdUsers<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.projects>['users']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.projects>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.projects>['users']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.organization.projects>['users']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationProjectsProjectIdUsersKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.projects>['users']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization.projects(params).users.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostOrganizationProjectsProjectIdUsersKey() {
  return ['organization', '/organization/projects/{project_id}/users', 'POST'] as const
}

export function usePostOrganizationProjectsProjectIdUsers<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.projects>['users']['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.projects>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.projects>['users']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.organization.projects>['users']['post']>[0]
        options?: Parameters<ReturnType<typeof client.organization.projects>['users']['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostOrganizationProjectsProjectIdUsersKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.projects>['users']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.organization.projects>['users']['post']>[0]
        options?: Parameters<ReturnType<typeof client.organization.projects>['users']['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.organization.projects>['users']['post']>[0]
            options?: Parameters<
              ReturnType<typeof client.organization.projects>['users']['post']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client.organization
          .projects(params)
          .users.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetOrganizationProjectsProjectIdUsersUserIdKey(
  params: Parameters<typeof client.organization.projects>[0],
  params2: Parameters<ReturnType<typeof client.organization.projects>['users']>[0],
) {
  return [
    'organization',
    '/organization/projects/{project_id}/users/{user_id}',
    params,
    params2,
  ] as const
}

export function useGetOrganizationProjectsProjectIdUsersUserId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.organization.projects>['users']>['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.projects>[0],
  params2: Parameters<ReturnType<typeof client.organization.projects>['users']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.organization.projects>['users']>['get']>
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<typeof client.organization.projects>['users']>['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationProjectsProjectIdUsersUserIdKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.organization.projects>['users']>['get']>
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization
          .projects(params)
          .users(params2)
          .get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetOrganizationProjectsProjectIdUsersUserId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.organization.projects>['users']>['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.projects>[0],
  params2: Parameters<ReturnType<typeof client.organization.projects>['users']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.organization.projects>['users']>['get']>
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<typeof client.organization.projects>['users']>['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationProjectsProjectIdUsersUserIdKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.organization.projects>['users']>['get']>
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization
          .projects(params)
          .users(params2)
          .get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostOrganizationProjectsProjectIdUsersUserIdKey() {
  return ['organization', '/organization/projects/{project_id}/users/{user_id}', 'POST'] as const
}

export function usePostOrganizationProjectsProjectIdUsersUserId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.organization.projects>['users']>['post']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.projects>[0],
  params2: Parameters<ReturnType<typeof client.organization.projects>['users']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.organization.projects>['users']>['post']>
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<
          ReturnType<ReturnType<typeof client.organization.projects>['users']>['post']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.organization.projects>['users']>['post']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostOrganizationProjectsProjectIdUsersUserIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.organization.projects>['users']>['post']>
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<
          ReturnType<ReturnType<typeof client.organization.projects>['users']>['post']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.organization.projects>['users']>['post']
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
            body: Parameters<
              ReturnType<ReturnType<typeof client.organization.projects>['users']>['post']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.organization.projects>['users']>['post']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client.organization
          .projects(params)
          .users(params2)
          .post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getDeleteOrganizationProjectsProjectIdUsersUserIdKey() {
  return ['organization', '/organization/projects/{project_id}/users/{user_id}', 'DELETE'] as const
}

export function useDeleteOrganizationProjectsProjectIdUsersUserId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.organization.projects>['users']>['delete']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.projects>[0],
  params2: Parameters<ReturnType<typeof client.organization.projects>['users']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.organization.projects>['users']>['delete']>
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<ReturnType<typeof client.organization.projects>['users']>['delete']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.organization.projects>['users']>['delete']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteOrganizationProjectsProjectIdUsersUserIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.organization.projects>['users']>['delete']>
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<ReturnType<typeof client.organization.projects>['users']>['delete']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.organization.projects>['users']>['delete']
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
              ReturnType<ReturnType<typeof client.organization.projects>['users']>['delete']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.organization.projects>['users']>['delete']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client.organization
          .projects(params)
          .users(params2)
          .delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetOrganizationRolesKey(
  options?: Parameters<typeof client.organization.roles.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['organization', '/organization/roles', keyArgs] as const
}

export function useGetOrganizationRoles<
  TError = Exclude<Awaited<ReturnType<typeof client.organization.roles.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.organization.roles.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.organization.roles.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationRolesKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<Awaited<ReturnType<typeof client.organization.roles.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization.roles.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetOrganizationRoles<
  TError = Exclude<Awaited<ReturnType<typeof client.organization.roles.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.organization.roles.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.organization.roles.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationRolesKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<Awaited<ReturnType<typeof client.organization.roles.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization.roles.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostOrganizationRolesKey() {
  return ['organization', '/organization/roles', 'POST'] as const
}

export function usePostOrganizationRoles<
  TError = Exclude<Awaited<ReturnType<typeof client.organization.roles.post>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.organization.roles.post>>, { error: null }>['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.organization.roles.post>[0]
      options?: Parameters<typeof client.organization.roles.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostOrganizationRolesKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<Awaited<ReturnType<typeof client.organization.roles.post>>, { error: null }>['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.organization.roles.post>[0]
        options?: Parameters<typeof client.organization.roles.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.organization.roles.post>[0]
            options?: Parameters<typeof client.organization.roles.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.organization.roles.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetOrganizationRolesRoleIdKey(
  params: Parameters<typeof client.organization.roles>[0],
) {
  return ['organization', '/organization/roles/{role_id}', params] as const
}

export function useGetOrganizationRolesRoleId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.roles>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.roles>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.roles>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.organization.roles>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationRolesRoleIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.roles>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization.roles(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetOrganizationRolesRoleId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.roles>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.roles>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.roles>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.organization.roles>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationRolesRoleIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.roles>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization.roles(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostOrganizationRolesRoleIdKey() {
  return ['organization', '/organization/roles/{role_id}', 'POST'] as const
}

export function usePostOrganizationRolesRoleId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.roles>['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.roles>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.roles>['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.organization.roles>['post']>[0]
        options?: Parameters<ReturnType<typeof client.organization.roles>['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostOrganizationRolesRoleIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.roles>['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.organization.roles>['post']>[0]
        options?: Parameters<ReturnType<typeof client.organization.roles>['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.organization.roles>['post']>[0]
            options?: Parameters<ReturnType<typeof client.organization.roles>['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client.organization.roles(params).post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getDeleteOrganizationRolesRoleIdKey() {
  return ['organization', '/organization/roles/{role_id}', 'DELETE'] as const
}

export function useDeleteOrganizationRolesRoleId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.roles>['delete']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.roles>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.roles>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.organization.roles>['delete']>[0]
        options?: Parameters<ReturnType<typeof client.organization.roles>['delete']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteOrganizationRolesRoleIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.roles>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.organization.roles>['delete']>[0]
        options?: Parameters<ReturnType<typeof client.organization.roles>['delete']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<ReturnType<typeof client.organization.roles>['delete']>[0]
            options?: Parameters<ReturnType<typeof client.organization.roles>['delete']>[1]
          }
        },
      ) => {
        const { data, error } = await client.organization
          .roles(params)
          .delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetOrganizationSpendAlertsKey(
  options?: Parameters<typeof client.organization.spend_alerts.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['organization', '/organization/spend_alerts', keyArgs] as const
}

export function useGetOrganizationSpendAlerts<
  TError = Exclude<Awaited<ReturnType<typeof client.organization.spend_alerts.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.organization.spend_alerts.get>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.organization.spend_alerts.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationSpendAlertsKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<typeof client.organization.spend_alerts.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization.spend_alerts.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetOrganizationSpendAlerts<
  TError = Exclude<Awaited<ReturnType<typeof client.organization.spend_alerts.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.organization.spend_alerts.get>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.organization.spend_alerts.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationSpendAlertsKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<typeof client.organization.spend_alerts.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization.spend_alerts.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostOrganizationSpendAlertsKey() {
  return ['organization', '/organization/spend_alerts', 'POST'] as const
}

export function usePostOrganizationSpendAlerts<
  TError = Exclude<
    Awaited<ReturnType<typeof client.organization.spend_alerts.post>>['error'],
    null
  >,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.organization.spend_alerts.post>>,
      { error: null }
    >['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.organization.spend_alerts.post>[0]
      options?: Parameters<typeof client.organization.spend_alerts.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostOrganizationSpendAlertsKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<typeof client.organization.spend_alerts.post>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.organization.spend_alerts.post>[0]
        options?: Parameters<typeof client.organization.spend_alerts.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.organization.spend_alerts.post>[0]
            options?: Parameters<typeof client.organization.spend_alerts.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.organization.spend_alerts.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetOrganizationSpendAlertsAlertIdKey(
  params: Parameters<typeof client.organization.spend_alerts>[0],
) {
  return ['organization', '/organization/spend_alerts/{alert_id}', params] as const
}

export function useGetOrganizationSpendAlertsAlertId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.spend_alerts>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.spend_alerts>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.spend_alerts>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.organization.spend_alerts>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationSpendAlertsAlertIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.spend_alerts>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization.spend_alerts(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetOrganizationSpendAlertsAlertId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.spend_alerts>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.spend_alerts>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.spend_alerts>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.organization.spend_alerts>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationSpendAlertsAlertIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.spend_alerts>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization.spend_alerts(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostOrganizationSpendAlertsAlertIdKey() {
  return ['organization', '/organization/spend_alerts/{alert_id}', 'POST'] as const
}

export function usePostOrganizationSpendAlertsAlertId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.spend_alerts>['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.spend_alerts>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.spend_alerts>['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.organization.spend_alerts>['post']>[0]
        options?: Parameters<ReturnType<typeof client.organization.spend_alerts>['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostOrganizationSpendAlertsAlertIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.spend_alerts>['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.organization.spend_alerts>['post']>[0]
        options?: Parameters<ReturnType<typeof client.organization.spend_alerts>['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.organization.spend_alerts>['post']>[0]
            options?: Parameters<ReturnType<typeof client.organization.spend_alerts>['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client.organization
          .spend_alerts(params)
          .post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getDeleteOrganizationSpendAlertsAlertIdKey() {
  return ['organization', '/organization/spend_alerts/{alert_id}', 'DELETE'] as const
}

export function useDeleteOrganizationSpendAlertsAlertId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.spend_alerts>['delete']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.spend_alerts>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.spend_alerts>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.organization.spend_alerts>['delete']>[0]
        options?: Parameters<ReturnType<typeof client.organization.spend_alerts>['delete']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteOrganizationSpendAlertsAlertIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.spend_alerts>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.organization.spend_alerts>['delete']>[0]
        options?: Parameters<ReturnType<typeof client.organization.spend_alerts>['delete']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<ReturnType<typeof client.organization.spend_alerts>['delete']>[0]
            options?: Parameters<ReturnType<typeof client.organization.spend_alerts>['delete']>[1]
          }
        },
      ) => {
        const { data, error } = await client.organization
          .spend_alerts(params)
          .delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetOrganizationUsageAudioSpeechesKey(
  options: Parameters<typeof client.organization.usage.audio_speeches.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['organization', '/organization/usage/audio_speeches', keyArgs] as const
}

export function useGetOrganizationUsageAudioSpeeches<
  TError = Exclude<
    Awaited<ReturnType<typeof client.organization.usage.audio_speeches.get>>['error'],
    null
  >,
>(options: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.organization.usage.audio_speeches.get>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options: Parameters<typeof client.organization.usage.audio_speeches.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationUsageAudioSpeechesKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<typeof client.organization.usage.audio_speeches.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization.usage.audio_speeches.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetOrganizationUsageAudioSpeeches<
  TError = Exclude<
    Awaited<ReturnType<typeof client.organization.usage.audio_speeches.get>>['error'],
    null
  >,
>(options: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.organization.usage.audio_speeches.get>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options: Parameters<typeof client.organization.usage.audio_speeches.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationUsageAudioSpeechesKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<typeof client.organization.usage.audio_speeches.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization.usage.audio_speeches.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetOrganizationUsageAudioTranscriptionsKey(
  options: Parameters<typeof client.organization.usage.audio_transcriptions.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['organization', '/organization/usage/audio_transcriptions', keyArgs] as const
}

export function useGetOrganizationUsageAudioTranscriptions<
  TError = Exclude<
    Awaited<ReturnType<typeof client.organization.usage.audio_transcriptions.get>>['error'],
    null
  >,
>(options: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.organization.usage.audio_transcriptions.get>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options: Parameters<typeof client.organization.usage.audio_transcriptions.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationUsageAudioTranscriptionsKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<typeof client.organization.usage.audio_transcriptions.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } =
          await client.organization.usage.audio_transcriptions.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetOrganizationUsageAudioTranscriptions<
  TError = Exclude<
    Awaited<ReturnType<typeof client.organization.usage.audio_transcriptions.get>>['error'],
    null
  >,
>(options: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.organization.usage.audio_transcriptions.get>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options: Parameters<typeof client.organization.usage.audio_transcriptions.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationUsageAudioTranscriptionsKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<typeof client.organization.usage.audio_transcriptions.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } =
          await client.organization.usage.audio_transcriptions.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetOrganizationUsageCodeInterpreterSessionsKey(
  options: Parameters<typeof client.organization.usage.code_interpreter_sessions.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['organization', '/organization/usage/code_interpreter_sessions', keyArgs] as const
}

export function useGetOrganizationUsageCodeInterpreterSessions<
  TError = Exclude<
    Awaited<ReturnType<typeof client.organization.usage.code_interpreter_sessions.get>>['error'],
    null
  >,
>(options: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.organization.usage.code_interpreter_sessions.get>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options: Parameters<typeof client.organization.usage.code_interpreter_sessions.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationUsageCodeInterpreterSessionsKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<typeof client.organization.usage.code_interpreter_sessions.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } =
          await client.organization.usage.code_interpreter_sessions.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetOrganizationUsageCodeInterpreterSessions<
  TError = Exclude<
    Awaited<ReturnType<typeof client.organization.usage.code_interpreter_sessions.get>>['error'],
    null
  >,
>(options: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.organization.usage.code_interpreter_sessions.get>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options: Parameters<typeof client.organization.usage.code_interpreter_sessions.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationUsageCodeInterpreterSessionsKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<typeof client.organization.usage.code_interpreter_sessions.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } =
          await client.organization.usage.code_interpreter_sessions.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetOrganizationUsageCompletionsKey(
  options: Parameters<typeof client.organization.usage.completions.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['organization', '/organization/usage/completions', keyArgs] as const
}

export function useGetOrganizationUsageCompletions<
  TError = Exclude<
    Awaited<ReturnType<typeof client.organization.usage.completions.get>>['error'],
    null
  >,
>(options: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.organization.usage.completions.get>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options: Parameters<typeof client.organization.usage.completions.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationUsageCompletionsKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<typeof client.organization.usage.completions.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization.usage.completions.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetOrganizationUsageCompletions<
  TError = Exclude<
    Awaited<ReturnType<typeof client.organization.usage.completions.get>>['error'],
    null
  >,
>(options: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.organization.usage.completions.get>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options: Parameters<typeof client.organization.usage.completions.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationUsageCompletionsKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<typeof client.organization.usage.completions.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization.usage.completions.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetOrganizationUsageEmbeddingsKey(
  options: Parameters<typeof client.organization.usage.embeddings.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['organization', '/organization/usage/embeddings', keyArgs] as const
}

export function useGetOrganizationUsageEmbeddings<
  TError = Exclude<
    Awaited<ReturnType<typeof client.organization.usage.embeddings.get>>['error'],
    null
  >,
>(options: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.organization.usage.embeddings.get>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options: Parameters<typeof client.organization.usage.embeddings.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationUsageEmbeddingsKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<typeof client.organization.usage.embeddings.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization.usage.embeddings.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetOrganizationUsageEmbeddings<
  TError = Exclude<
    Awaited<ReturnType<typeof client.organization.usage.embeddings.get>>['error'],
    null
  >,
>(options: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.organization.usage.embeddings.get>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options: Parameters<typeof client.organization.usage.embeddings.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationUsageEmbeddingsKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<typeof client.organization.usage.embeddings.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization.usage.embeddings.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetOrganizationUsageFileSearchCallsKey(
  options: Parameters<typeof client.organization.usage.file_search_calls.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['organization', '/organization/usage/file_search_calls', keyArgs] as const
}

export function useGetOrganizationUsageFileSearchCalls<
  TError = Exclude<
    Awaited<ReturnType<typeof client.organization.usage.file_search_calls.get>>['error'],
    null
  >,
>(options: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.organization.usage.file_search_calls.get>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options: Parameters<typeof client.organization.usage.file_search_calls.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationUsageFileSearchCallsKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<typeof client.organization.usage.file_search_calls.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization.usage.file_search_calls.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetOrganizationUsageFileSearchCalls<
  TError = Exclude<
    Awaited<ReturnType<typeof client.organization.usage.file_search_calls.get>>['error'],
    null
  >,
>(options: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.organization.usage.file_search_calls.get>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options: Parameters<typeof client.organization.usage.file_search_calls.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationUsageFileSearchCallsKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<typeof client.organization.usage.file_search_calls.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization.usage.file_search_calls.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetOrganizationUsageImagesKey(
  options: Parameters<typeof client.organization.usage.images.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['organization', '/organization/usage/images', keyArgs] as const
}

export function useGetOrganizationUsageImages<
  TError = Exclude<Awaited<ReturnType<typeof client.organization.usage.images.get>>['error'], null>,
>(options: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.organization.usage.images.get>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options: Parameters<typeof client.organization.usage.images.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationUsageImagesKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<typeof client.organization.usage.images.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization.usage.images.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetOrganizationUsageImages<
  TError = Exclude<Awaited<ReturnType<typeof client.organization.usage.images.get>>['error'], null>,
>(options: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.organization.usage.images.get>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options: Parameters<typeof client.organization.usage.images.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationUsageImagesKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<typeof client.organization.usage.images.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization.usage.images.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetOrganizationUsageModerationsKey(
  options: Parameters<typeof client.organization.usage.moderations.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['organization', '/organization/usage/moderations', keyArgs] as const
}

export function useGetOrganizationUsageModerations<
  TError = Exclude<
    Awaited<ReturnType<typeof client.organization.usage.moderations.get>>['error'],
    null
  >,
>(options: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.organization.usage.moderations.get>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options: Parameters<typeof client.organization.usage.moderations.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationUsageModerationsKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<typeof client.organization.usage.moderations.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization.usage.moderations.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetOrganizationUsageModerations<
  TError = Exclude<
    Awaited<ReturnType<typeof client.organization.usage.moderations.get>>['error'],
    null
  >,
>(options: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.organization.usage.moderations.get>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options: Parameters<typeof client.organization.usage.moderations.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationUsageModerationsKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<typeof client.organization.usage.moderations.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization.usage.moderations.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetOrganizationUsageVectorStoresKey(
  options: Parameters<typeof client.organization.usage.vector_stores.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['organization', '/organization/usage/vector_stores', keyArgs] as const
}

export function useGetOrganizationUsageVectorStores<
  TError = Exclude<
    Awaited<ReturnType<typeof client.organization.usage.vector_stores.get>>['error'],
    null
  >,
>(options: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.organization.usage.vector_stores.get>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options: Parameters<typeof client.organization.usage.vector_stores.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationUsageVectorStoresKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<typeof client.organization.usage.vector_stores.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization.usage.vector_stores.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetOrganizationUsageVectorStores<
  TError = Exclude<
    Awaited<ReturnType<typeof client.organization.usage.vector_stores.get>>['error'],
    null
  >,
>(options: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.organization.usage.vector_stores.get>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options: Parameters<typeof client.organization.usage.vector_stores.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationUsageVectorStoresKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<typeof client.organization.usage.vector_stores.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization.usage.vector_stores.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetOrganizationUsageWebSearchCallsKey(
  options: Parameters<typeof client.organization.usage.web_search_calls.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['organization', '/organization/usage/web_search_calls', keyArgs] as const
}

export function useGetOrganizationUsageWebSearchCalls<
  TError = Exclude<
    Awaited<ReturnType<typeof client.organization.usage.web_search_calls.get>>['error'],
    null
  >,
>(options: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.organization.usage.web_search_calls.get>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options: Parameters<typeof client.organization.usage.web_search_calls.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationUsageWebSearchCallsKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<typeof client.organization.usage.web_search_calls.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization.usage.web_search_calls.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetOrganizationUsageWebSearchCalls<
  TError = Exclude<
    Awaited<ReturnType<typeof client.organization.usage.web_search_calls.get>>['error'],
    null
  >,
>(options: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.organization.usage.web_search_calls.get>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options: Parameters<typeof client.organization.usage.web_search_calls.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationUsageWebSearchCallsKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<typeof client.organization.usage.web_search_calls.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization.usage.web_search_calls.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetOrganizationUsersKey(
  options?: Parameters<typeof client.organization.users.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['organization', '/organization/users', keyArgs] as const
}

export function useGetOrganizationUsers<
  TError = Exclude<Awaited<ReturnType<typeof client.organization.users.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.organization.users.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.organization.users.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationUsersKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<Awaited<ReturnType<typeof client.organization.users.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization.users.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetOrganizationUsers<
  TError = Exclude<Awaited<ReturnType<typeof client.organization.users.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.organization.users.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.organization.users.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationUsersKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<Awaited<ReturnType<typeof client.organization.users.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization.users.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetOrganizationUsersUserIdKey(
  params: Parameters<typeof client.organization.users>[0],
) {
  return ['organization', '/organization/users/{user_id}', params] as const
}

export function useGetOrganizationUsersUserId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.users>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.users>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.users>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.organization.users>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationUsersUserIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.users>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization.users(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetOrganizationUsersUserId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.users>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.users>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.users>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.organization.users>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationUsersUserIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.users>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization.users(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostOrganizationUsersUserIdKey() {
  return ['organization', '/organization/users/{user_id}', 'POST'] as const
}

export function usePostOrganizationUsersUserId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.users>['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.users>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.users>['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.organization.users>['post']>[0]
        options?: Parameters<ReturnType<typeof client.organization.users>['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostOrganizationUsersUserIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.users>['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.organization.users>['post']>[0]
        options?: Parameters<ReturnType<typeof client.organization.users>['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.organization.users>['post']>[0]
            options?: Parameters<ReturnType<typeof client.organization.users>['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client.organization.users(params).post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getDeleteOrganizationUsersUserIdKey() {
  return ['organization', '/organization/users/{user_id}', 'DELETE'] as const
}

export function useDeleteOrganizationUsersUserId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.users>['delete']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.users>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.users>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.organization.users>['delete']>[0]
        options?: Parameters<ReturnType<typeof client.organization.users>['delete']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteOrganizationUsersUserIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.users>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.organization.users>['delete']>[0]
        options?: Parameters<ReturnType<typeof client.organization.users>['delete']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<ReturnType<typeof client.organization.users>['delete']>[0]
            options?: Parameters<ReturnType<typeof client.organization.users>['delete']>[1]
          }
        },
      ) => {
        const { data, error } = await client.organization
          .users(params)
          .delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetOrganizationUsersUserIdRolesKey(
  params: Parameters<typeof client.organization.users>[0],
  options?: Parameters<ReturnType<typeof client.organization.users>['roles']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['organization', '/organization/users/{user_id}/roles', params, keyArgs] as const
}

export function useGetOrganizationUsersUserIdRoles<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.users>['roles']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.users>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.users>['roles']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.organization.users>['roles']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationUsersUserIdRolesKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.users>['roles']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization.users(params).roles.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetOrganizationUsersUserIdRoles<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.users>['roles']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.users>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.users>['roles']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.organization.users>['roles']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationUsersUserIdRolesKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.users>['roles']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization.users(params).roles.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostOrganizationUsersUserIdRolesKey() {
  return ['organization', '/organization/users/{user_id}/roles', 'POST'] as const
}

export function usePostOrganizationUsersUserIdRoles<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.users>['roles']['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.users>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.users>['roles']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.organization.users>['roles']['post']>[0]
        options?: Parameters<ReturnType<typeof client.organization.users>['roles']['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostOrganizationUsersUserIdRolesKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.users>['roles']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.organization.users>['roles']['post']>[0]
        options?: Parameters<ReturnType<typeof client.organization.users>['roles']['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.organization.users>['roles']['post']>[0]
            options?: Parameters<ReturnType<typeof client.organization.users>['roles']['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client.organization
          .users(params)
          .roles.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetOrganizationUsersUserIdRolesRoleIdKey(
  params: Parameters<typeof client.organization.users>[0],
  params2: Parameters<ReturnType<typeof client.organization.users>['roles']>[0],
) {
  return ['organization', '/organization/users/{user_id}/roles/{role_id}', params, params2] as const
}

export function useGetOrganizationUsersUserIdRolesRoleId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.organization.users>['roles']>['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.users>[0],
  params2: Parameters<ReturnType<typeof client.organization.users>['roles']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.organization.users>['roles']>['get']>
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<typeof client.organization.users>['roles']>['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationUsersUserIdRolesRoleIdKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.organization.users>['roles']>['get']>
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization
          .users(params)
          .roles(params2)
          .get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetOrganizationUsersUserIdRolesRoleId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.organization.users>['roles']>['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.users>[0],
  params2: Parameters<ReturnType<typeof client.organization.users>['roles']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.organization.users>['roles']>['get']>
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<typeof client.organization.users>['roles']>['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationUsersUserIdRolesRoleIdKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.organization.users>['roles']>['get']>
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization
          .users(params)
          .roles(params2)
          .get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getDeleteOrganizationUsersUserIdRolesRoleIdKey() {
  return ['organization', '/organization/users/{user_id}/roles/{role_id}', 'DELETE'] as const
}

export function useDeleteOrganizationUsersUserIdRolesRoleId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.organization.users>['roles']>['delete']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.users>[0],
  params2: Parameters<ReturnType<typeof client.organization.users>['roles']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.organization.users>['roles']>['delete']>
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<ReturnType<typeof client.organization.users>['roles']>['delete']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.organization.users>['roles']>['delete']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteOrganizationUsersUserIdRolesRoleIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.organization.users>['roles']>['delete']>
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<ReturnType<typeof client.organization.users>['roles']>['delete']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.organization.users>['roles']>['delete']
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
              ReturnType<ReturnType<typeof client.organization.users>['roles']>['delete']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.organization.users>['roles']>['delete']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client.organization
          .users(params)
          .roles(params2)
          .delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetProjectsProjectIdGroupsGroupIdRolesKey(
  params: Parameters<typeof client.projects>[0],
  params2: Parameters<ReturnType<typeof client.projects>['groups']>[0],
  options?: Parameters<ReturnType<ReturnType<typeof client.projects>['groups']>['roles']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'projects',
    '/projects/{project_id}/groups/{group_id}/roles',
    params,
    params2,
    keyArgs,
  ] as const
}

export function useGetProjectsProjectIdGroupsGroupIdRoles<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.projects>['groups']>['roles']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.projects>[0],
  params2: Parameters<ReturnType<typeof client.projects>['groups']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.projects>['groups']>['roles']['get']>
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<typeof client.projects>['groups']>['roles']['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetProjectsProjectIdGroupsGroupIdRolesKey(params, params2, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.projects>['groups']>['roles']['get']>
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client
          .projects(params)
          .groups(params2)
          .roles.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetProjectsProjectIdGroupsGroupIdRoles<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.projects>['groups']>['roles']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.projects>[0],
  params2: Parameters<ReturnType<typeof client.projects>['groups']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.projects>['groups']>['roles']['get']>
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<typeof client.projects>['groups']>['roles']['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetProjectsProjectIdGroupsGroupIdRolesKey(params, params2, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.projects>['groups']>['roles']['get']>
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client
          .projects(params)
          .groups(params2)
          .roles.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostProjectsProjectIdGroupsGroupIdRolesKey() {
  return ['projects', '/projects/{project_id}/groups/{group_id}/roles', 'POST'] as const
}

export function usePostProjectsProjectIdGroupsGroupIdRoles<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.projects>['groups']>['roles']['post']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.projects>[0],
  params2: Parameters<ReturnType<typeof client.projects>['groups']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.projects>['groups']>['roles']['post']>
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<
          ReturnType<ReturnType<typeof client.projects>['groups']>['roles']['post']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.projects>['groups']>['roles']['post']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostProjectsProjectIdGroupsGroupIdRolesKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.projects>['groups']>['roles']['post']>
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<
          ReturnType<ReturnType<typeof client.projects>['groups']>['roles']['post']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.projects>['groups']>['roles']['post']
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
            body: Parameters<
              ReturnType<ReturnType<typeof client.projects>['groups']>['roles']['post']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.projects>['groups']>['roles']['post']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .projects(params)
          .groups(params2)
          .roles.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetProjectsProjectIdGroupsGroupIdRolesRoleIdKey(
  params: Parameters<typeof client.projects>[0],
  params2: Parameters<ReturnType<typeof client.projects>['groups']>[0],
  params3: Parameters<ReturnType<ReturnType<typeof client.projects>['groups']>['roles']>[0],
) {
  return [
    'projects',
    '/projects/{project_id}/groups/{group_id}/roles/{role_id}',
    params,
    params2,
    params3,
  ] as const
}

export function useGetProjectsProjectIdGroupsGroupIdRolesRoleId<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<ReturnType<typeof client.projects>['groups']>['roles']>['get']
      >
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.projects>[0],
  params2: Parameters<ReturnType<typeof client.projects>['groups']>[0],
  params3: Parameters<ReturnType<ReturnType<typeof client.projects>['groups']>['roles']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<ReturnType<typeof client.projects>['groups']>['roles']>['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<ReturnType<typeof client.projects>['groups']>['roles']>['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetProjectsProjectIdGroupsGroupIdRolesRoleIdKey(params, params2, params3)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<ReturnType<typeof client.projects>['groups']>['roles']>['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client
          .projects(params)
          .groups(params2)
          .roles(params3)
          .get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetProjectsProjectIdGroupsGroupIdRolesRoleId<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<ReturnType<typeof client.projects>['groups']>['roles']>['get']
      >
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.projects>[0],
  params2: Parameters<ReturnType<typeof client.projects>['groups']>[0],
  params3: Parameters<ReturnType<ReturnType<typeof client.projects>['groups']>['roles']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<ReturnType<typeof client.projects>['groups']>['roles']>['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<ReturnType<typeof client.projects>['groups']>['roles']>['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetProjectsProjectIdGroupsGroupIdRolesRoleIdKey(params, params2, params3)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<ReturnType<typeof client.projects>['groups']>['roles']>['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client
          .projects(params)
          .groups(params2)
          .roles(params3)
          .get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getDeleteProjectsProjectIdGroupsGroupIdRolesRoleIdKey() {
  return ['projects', '/projects/{project_id}/groups/{group_id}/roles/{role_id}', 'DELETE'] as const
}

export function useDeleteProjectsProjectIdGroupsGroupIdRolesRoleId<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<ReturnType<typeof client.projects>['groups']>['roles']>['delete']
      >
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.projects>[0],
  params2: Parameters<ReturnType<typeof client.projects>['groups']>[0],
  params3: Parameters<ReturnType<ReturnType<typeof client.projects>['groups']>['roles']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<ReturnType<typeof client.projects>['groups']>['roles']>['delete']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<ReturnType<ReturnType<typeof client.projects>['groups']>['roles']>['delete']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<ReturnType<typeof client.projects>['groups']>['roles']>['delete']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteProjectsProjectIdGroupsGroupIdRolesRoleIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<ReturnType<typeof client.projects>['groups']>['roles']>['delete']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<ReturnType<ReturnType<typeof client.projects>['groups']>['roles']>['delete']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<ReturnType<typeof client.projects>['groups']>['roles']>['delete']
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
              ReturnType<
                ReturnType<ReturnType<typeof client.projects>['groups']>['roles']
              >['delete']
            >[0]
            options?: Parameters<
              ReturnType<
                ReturnType<ReturnType<typeof client.projects>['groups']>['roles']
              >['delete']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .projects(params)
          .groups(params2)
          .roles(params3)
          .delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetProjectsProjectIdRolesKey(
  params: Parameters<typeof client.projects>[0],
  options?: Parameters<ReturnType<typeof client.projects>['roles']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['projects', '/projects/{project_id}/roles', params, keyArgs] as const
}

export function useGetProjectsProjectIdRoles<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.projects>['roles']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.projects>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.projects>['roles']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.projects>['roles']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetProjectsProjectIdRolesKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.projects>['roles']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.projects(params).roles.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetProjectsProjectIdRoles<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.projects>['roles']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.projects>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.projects>['roles']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.projects>['roles']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetProjectsProjectIdRolesKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.projects>['roles']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.projects(params).roles.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostProjectsProjectIdRolesKey() {
  return ['projects', '/projects/{project_id}/roles', 'POST'] as const
}

export function usePostProjectsProjectIdRoles<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.projects>['roles']['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.projects>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.projects>['roles']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.projects>['roles']['post']>[0]
        options?: Parameters<ReturnType<typeof client.projects>['roles']['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostProjectsProjectIdRolesKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.projects>['roles']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.projects>['roles']['post']>[0]
        options?: Parameters<ReturnType<typeof client.projects>['roles']['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.projects>['roles']['post']>[0]
            options?: Parameters<ReturnType<typeof client.projects>['roles']['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client.projects(params).roles.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetProjectsProjectIdRolesRoleIdKey(
  params: Parameters<typeof client.projects>[0],
  params2: Parameters<ReturnType<typeof client.projects>['roles']>[0],
) {
  return ['projects', '/projects/{project_id}/roles/{role_id}', params, params2] as const
}

export function useGetProjectsProjectIdRolesRoleId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.projects>['roles']>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.projects>[0],
  params2: Parameters<ReturnType<typeof client.projects>['roles']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.projects>['roles']>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<ReturnType<typeof client.projects>['roles']>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetProjectsProjectIdRolesRoleIdKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.projects>['roles']>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.projects(params).roles(params2).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetProjectsProjectIdRolesRoleId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.projects>['roles']>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.projects>[0],
  params2: Parameters<ReturnType<typeof client.projects>['roles']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.projects>['roles']>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<ReturnType<typeof client.projects>['roles']>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetProjectsProjectIdRolesRoleIdKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.projects>['roles']>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.projects(params).roles(params2).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostProjectsProjectIdRolesRoleIdKey() {
  return ['projects', '/projects/{project_id}/roles/{role_id}', 'POST'] as const
}

export function usePostProjectsProjectIdRolesRoleId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.projects>['roles']>['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.projects>[0],
  params2: Parameters<ReturnType<typeof client.projects>['roles']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.projects>['roles']>['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<ReturnType<typeof client.projects>['roles']>['post']>[0]
        options?: Parameters<ReturnType<ReturnType<typeof client.projects>['roles']>['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostProjectsProjectIdRolesRoleIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.projects>['roles']>['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<ReturnType<typeof client.projects>['roles']>['post']>[0]
        options?: Parameters<ReturnType<ReturnType<typeof client.projects>['roles']>['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<ReturnType<typeof client.projects>['roles']>['post']>[0]
            options?: Parameters<ReturnType<ReturnType<typeof client.projects>['roles']>['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client
          .projects(params)
          .roles(params2)
          .post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getDeleteProjectsProjectIdRolesRoleIdKey() {
  return ['projects', '/projects/{project_id}/roles/{role_id}', 'DELETE'] as const
}

export function useDeleteProjectsProjectIdRolesRoleId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.projects>['roles']>['delete']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.projects>[0],
  params2: Parameters<ReturnType<typeof client.projects>['roles']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.projects>['roles']>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<ReturnType<typeof client.projects>['roles']>['delete']>[0]
        options?: Parameters<ReturnType<ReturnType<typeof client.projects>['roles']>['delete']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteProjectsProjectIdRolesRoleIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.projects>['roles']>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<ReturnType<typeof client.projects>['roles']>['delete']>[0]
        options?: Parameters<ReturnType<ReturnType<typeof client.projects>['roles']>['delete']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<ReturnType<ReturnType<typeof client.projects>['roles']>['delete']>[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.projects>['roles']>['delete']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .projects(params)
          .roles(params2)
          .delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetProjectsProjectIdUsersUserIdRolesKey(
  params: Parameters<typeof client.projects>[0],
  params2: Parameters<ReturnType<typeof client.projects>['users']>[0],
  options?: Parameters<ReturnType<ReturnType<typeof client.projects>['users']>['roles']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'projects',
    '/projects/{project_id}/users/{user_id}/roles',
    params,
    params2,
    keyArgs,
  ] as const
}

export function useGetProjectsProjectIdUsersUserIdRoles<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.projects>['users']>['roles']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.projects>[0],
  params2: Parameters<ReturnType<typeof client.projects>['users']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.projects>['users']>['roles']['get']>
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<ReturnType<typeof client.projects>['users']>['roles']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetProjectsProjectIdUsersUserIdRolesKey(params, params2, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.projects>['users']>['roles']['get']>
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client
          .projects(params)
          .users(params2)
          .roles.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetProjectsProjectIdUsersUserIdRoles<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.projects>['users']>['roles']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.projects>[0],
  params2: Parameters<ReturnType<typeof client.projects>['users']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.projects>['users']>['roles']['get']>
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<ReturnType<typeof client.projects>['users']>['roles']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetProjectsProjectIdUsersUserIdRolesKey(params, params2, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.projects>['users']>['roles']['get']>
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client
          .projects(params)
          .users(params2)
          .roles.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostProjectsProjectIdUsersUserIdRolesKey() {
  return ['projects', '/projects/{project_id}/users/{user_id}/roles', 'POST'] as const
}

export function usePostProjectsProjectIdUsersUserIdRoles<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.projects>['users']>['roles']['post']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.projects>[0],
  params2: Parameters<ReturnType<typeof client.projects>['users']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.projects>['users']>['roles']['post']>
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<
          ReturnType<ReturnType<typeof client.projects>['users']>['roles']['post']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.projects>['users']>['roles']['post']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostProjectsProjectIdUsersUserIdRolesKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.projects>['users']>['roles']['post']>
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<
          ReturnType<ReturnType<typeof client.projects>['users']>['roles']['post']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.projects>['users']>['roles']['post']
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
            body: Parameters<
              ReturnType<ReturnType<typeof client.projects>['users']>['roles']['post']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.projects>['users']>['roles']['post']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .projects(params)
          .users(params2)
          .roles.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetProjectsProjectIdUsersUserIdRolesRoleIdKey(
  params: Parameters<typeof client.projects>[0],
  params2: Parameters<ReturnType<typeof client.projects>['users']>[0],
  params3: Parameters<ReturnType<ReturnType<typeof client.projects>['users']>['roles']>[0],
) {
  return [
    'projects',
    '/projects/{project_id}/users/{user_id}/roles/{role_id}',
    params,
    params2,
    params3,
  ] as const
}

export function useGetProjectsProjectIdUsersUserIdRolesRoleId<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<ReturnType<typeof client.projects>['users']>['roles']>['get']
      >
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.projects>[0],
  params2: Parameters<ReturnType<typeof client.projects>['users']>[0],
  params3: Parameters<ReturnType<ReturnType<typeof client.projects>['users']>['roles']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<ReturnType<typeof client.projects>['users']>['roles']>['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<ReturnType<typeof client.projects>['users']>['roles']>['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetProjectsProjectIdUsersUserIdRolesRoleIdKey(params, params2, params3)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<ReturnType<typeof client.projects>['users']>['roles']>['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client
          .projects(params)
          .users(params2)
          .roles(params3)
          .get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetProjectsProjectIdUsersUserIdRolesRoleId<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<ReturnType<typeof client.projects>['users']>['roles']>['get']
      >
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.projects>[0],
  params2: Parameters<ReturnType<typeof client.projects>['users']>[0],
  params3: Parameters<ReturnType<ReturnType<typeof client.projects>['users']>['roles']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<ReturnType<typeof client.projects>['users']>['roles']>['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<ReturnType<typeof client.projects>['users']>['roles']>['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetProjectsProjectIdUsersUserIdRolesRoleIdKey(params, params2, params3)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<ReturnType<typeof client.projects>['users']>['roles']>['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client
          .projects(params)
          .users(params2)
          .roles(params3)
          .get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getDeleteProjectsProjectIdUsersUserIdRolesRoleIdKey() {
  return ['projects', '/projects/{project_id}/users/{user_id}/roles/{role_id}', 'DELETE'] as const
}

export function useDeleteProjectsProjectIdUsersUserIdRolesRoleId<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<ReturnType<typeof client.projects>['users']>['roles']>['delete']
      >
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.projects>[0],
  params2: Parameters<ReturnType<typeof client.projects>['users']>[0],
  params3: Parameters<ReturnType<ReturnType<typeof client.projects>['users']>['roles']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<ReturnType<typeof client.projects>['users']>['roles']>['delete']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<ReturnType<ReturnType<typeof client.projects>['users']>['roles']>['delete']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<ReturnType<typeof client.projects>['users']>['roles']>['delete']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteProjectsProjectIdUsersUserIdRolesRoleIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<ReturnType<typeof client.projects>['users']>['roles']>['delete']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<ReturnType<ReturnType<typeof client.projects>['users']>['roles']>['delete']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<ReturnType<typeof client.projects>['users']>['roles']>['delete']
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
              ReturnType<ReturnType<ReturnType<typeof client.projects>['users']>['roles']>['delete']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<ReturnType<typeof client.projects>['users']>['roles']>['delete']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .projects(params)
          .users(params2)
          .roles(params3)
          .delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostRealtimeCallsKey() {
  return ['realtime', '/realtime/calls', 'POST'] as const
}

export function usePostRealtimeCalls<
  TError = Exclude<Awaited<ReturnType<typeof client.realtime.calls.post>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.realtime.calls.post>>, { error: null }>['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.realtime.calls.post>[0]
      options?: Parameters<typeof client.realtime.calls.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostRealtimeCallsKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<Awaited<ReturnType<typeof client.realtime.calls.post>>, { error: null }>['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.realtime.calls.post>[0]
        options?: Parameters<typeof client.realtime.calls.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.realtime.calls.post>[0]
            options?: Parameters<typeof client.realtime.calls.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.realtime.calls.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostRealtimeCallsCallIdAcceptKey() {
  return ['realtime', '/realtime/calls/{call_id}/accept', 'POST'] as const
}

export function usePostRealtimeCallsCallIdAccept<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.realtime.calls>['accept']['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.realtime.calls>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.realtime.calls>['accept']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.realtime.calls>['accept']['post']>[0]
        options?: Parameters<ReturnType<typeof client.realtime.calls>['accept']['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostRealtimeCallsCallIdAcceptKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.realtime.calls>['accept']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.realtime.calls>['accept']['post']>[0]
        options?: Parameters<ReturnType<typeof client.realtime.calls>['accept']['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.realtime.calls>['accept']['post']>[0]
            options?: Parameters<ReturnType<typeof client.realtime.calls>['accept']['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client.realtime
          .calls(params)
          .accept.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostRealtimeCallsCallIdHangupKey() {
  return ['realtime', '/realtime/calls/{call_id}/hangup', 'POST'] as const
}

export function usePostRealtimeCallsCallIdHangup<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.realtime.calls>['hangup']['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.realtime.calls>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.realtime.calls>['hangup']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.realtime.calls>['hangup']['post']>[0]
        options?: Parameters<ReturnType<typeof client.realtime.calls>['hangup']['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostRealtimeCallsCallIdHangupKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.realtime.calls>['hangup']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.realtime.calls>['hangup']['post']>[0]
        options?: Parameters<ReturnType<typeof client.realtime.calls>['hangup']['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<ReturnType<typeof client.realtime.calls>['hangup']['post']>[0]
            options?: Parameters<ReturnType<typeof client.realtime.calls>['hangup']['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client.realtime
          .calls(params)
          .hangup.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostRealtimeCallsCallIdReferKey() {
  return ['realtime', '/realtime/calls/{call_id}/refer', 'POST'] as const
}

export function usePostRealtimeCallsCallIdRefer<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.realtime.calls>['refer']['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.realtime.calls>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.realtime.calls>['refer']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.realtime.calls>['refer']['post']>[0]
        options?: Parameters<ReturnType<typeof client.realtime.calls>['refer']['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostRealtimeCallsCallIdReferKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.realtime.calls>['refer']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.realtime.calls>['refer']['post']>[0]
        options?: Parameters<ReturnType<typeof client.realtime.calls>['refer']['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.realtime.calls>['refer']['post']>[0]
            options?: Parameters<ReturnType<typeof client.realtime.calls>['refer']['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client.realtime
          .calls(params)
          .refer.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostRealtimeCallsCallIdRejectKey() {
  return ['realtime', '/realtime/calls/{call_id}/reject', 'POST'] as const
}

export function usePostRealtimeCallsCallIdReject<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.realtime.calls>['reject']['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.realtime.calls>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.realtime.calls>['reject']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.realtime.calls>['reject']['post']>[0]
        options?: Parameters<ReturnType<typeof client.realtime.calls>['reject']['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostRealtimeCallsCallIdRejectKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.realtime.calls>['reject']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.realtime.calls>['reject']['post']>[0]
        options?: Parameters<ReturnType<typeof client.realtime.calls>['reject']['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.realtime.calls>['reject']['post']>[0]
            options?: Parameters<ReturnType<typeof client.realtime.calls>['reject']['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client.realtime
          .calls(params)
          .reject.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostRealtimeClientSecretsKey() {
  return ['realtime', '/realtime/client_secrets', 'POST'] as const
}

export function usePostRealtimeClientSecrets<
  TError = Exclude<Awaited<ReturnType<typeof client.realtime.client_secrets.post>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.realtime.client_secrets.post>>,
      { error: null }
    >['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.realtime.client_secrets.post>[0]
      options?: Parameters<typeof client.realtime.client_secrets.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostRealtimeClientSecretsKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<typeof client.realtime.client_secrets.post>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.realtime.client_secrets.post>[0]
        options?: Parameters<typeof client.realtime.client_secrets.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.realtime.client_secrets.post>[0]
            options?: Parameters<typeof client.realtime.client_secrets.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.realtime.client_secrets.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostRealtimeSessionsKey() {
  return ['realtime', '/realtime/sessions', 'POST'] as const
}

export function usePostRealtimeSessions<
  TError = Exclude<Awaited<ReturnType<typeof client.realtime.sessions.post>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.realtime.sessions.post>>, { error: null }>['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.realtime.sessions.post>[0]
      options?: Parameters<typeof client.realtime.sessions.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostRealtimeSessionsKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<Awaited<ReturnType<typeof client.realtime.sessions.post>>, { error: null }>['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.realtime.sessions.post>[0]
        options?: Parameters<typeof client.realtime.sessions.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.realtime.sessions.post>[0]
            options?: Parameters<typeof client.realtime.sessions.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.realtime.sessions.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostRealtimeTranscriptionSessionsKey() {
  return ['realtime', '/realtime/transcription_sessions', 'POST'] as const
}

export function usePostRealtimeTranscriptionSessions<
  TError = Exclude<
    Awaited<ReturnType<typeof client.realtime.transcription_sessions.post>>['error'],
    null
  >,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.realtime.transcription_sessions.post>>,
      { error: null }
    >['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.realtime.transcription_sessions.post>[0]
      options?: Parameters<typeof client.realtime.transcription_sessions.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostRealtimeTranscriptionSessionsKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<typeof client.realtime.transcription_sessions.post>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.realtime.transcription_sessions.post>[0]
        options?: Parameters<typeof client.realtime.transcription_sessions.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.realtime.transcription_sessions.post>[0]
            options?: Parameters<typeof client.realtime.transcription_sessions.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.realtime.transcription_sessions.post(
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

export function getPostRealtimeTranslationsClientSecretsKey() {
  return ['realtime', '/realtime/translations/client_secrets', 'POST'] as const
}

export function usePostRealtimeTranslationsClientSecrets<
  TError = Exclude<
    Awaited<ReturnType<typeof client.realtime.translations.client_secrets.post>>['error'],
    null
  >,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.realtime.translations.client_secrets.post>>,
      { error: null }
    >['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.realtime.translations.client_secrets.post>[0]
      options?: Parameters<typeof client.realtime.translations.client_secrets.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostRealtimeTranslationsClientSecretsKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<typeof client.realtime.translations.client_secrets.post>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.realtime.translations.client_secrets.post>[0]
        options?: Parameters<typeof client.realtime.translations.client_secrets.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.realtime.translations.client_secrets.post>[0]
            options?: Parameters<typeof client.realtime.translations.client_secrets.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.realtime.translations.client_secrets.post(
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

export function getPostResponsesKey() {
  return ['responses', '/responses', 'POST'] as const
}

export function usePostResponses<
  TError = Exclude<Awaited<ReturnType<typeof client.responses.post>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.responses.post>>, { error: null }>['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.responses.post>[0]
      options?: Parameters<typeof client.responses.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostResponsesKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<Awaited<ReturnType<typeof client.responses.post>>, { error: null }>['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.responses.post>[0]
        options?: Parameters<typeof client.responses.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.responses.post>[0]
            options?: Parameters<typeof client.responses.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.responses.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetResponsesResponseIdKey(
  params: Parameters<typeof client.responses>[0],
  options?: Parameters<ReturnType<typeof client.responses>['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['responses', '/responses/{response_id}', params, keyArgs] as const
}

export function useGetResponsesResponseId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.responses>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.responses>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.responses>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.responses>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetResponsesResponseIdKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.responses>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.responses(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetResponsesResponseId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.responses>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.responses>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.responses>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.responses>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetResponsesResponseIdKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.responses>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.responses(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getDeleteResponsesResponseIdKey() {
  return ['responses', '/responses/{response_id}', 'DELETE'] as const
}

export function useDeleteResponsesResponseId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.responses>['delete']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.responses>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.responses>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.responses>['delete']>[0]
        options?: Parameters<ReturnType<typeof client.responses>['delete']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteResponsesResponseIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.responses>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.responses>['delete']>[0]
        options?: Parameters<ReturnType<typeof client.responses>['delete']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<ReturnType<typeof client.responses>['delete']>[0]
            options?: Parameters<ReturnType<typeof client.responses>['delete']>[1]
          }
        },
      ) => {
        const { data, error } = await client.responses(params).delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostResponsesResponseIdCancelKey() {
  return ['responses', '/responses/{response_id}/cancel', 'POST'] as const
}

export function usePostResponsesResponseIdCancel<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.responses>['cancel']['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.responses>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.responses>['cancel']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.responses>['cancel']['post']>[0]
        options?: Parameters<ReturnType<typeof client.responses>['cancel']['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostResponsesResponseIdCancelKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.responses>['cancel']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.responses>['cancel']['post']>[0]
        options?: Parameters<ReturnType<typeof client.responses>['cancel']['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<ReturnType<typeof client.responses>['cancel']['post']>[0]
            options?: Parameters<ReturnType<typeof client.responses>['cancel']['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client.responses(params).cancel.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetResponsesResponseIdInputItemsKey(
  params: Parameters<typeof client.responses>[0],
  options?: Parameters<ReturnType<typeof client.responses>['input_items']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['responses', '/responses/{response_id}/input_items', params, keyArgs] as const
}

export function useGetResponsesResponseIdInputItems<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.responses>['input_items']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.responses>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.responses>['input_items']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.responses>['input_items']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetResponsesResponseIdInputItemsKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.responses>['input_items']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.responses(params).input_items.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetResponsesResponseIdInputItems<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.responses>['input_items']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.responses>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.responses>['input_items']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.responses>['input_items']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetResponsesResponseIdInputItemsKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.responses>['input_items']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.responses(params).input_items.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostThreadsKey() {
  return ['threads', '/threads', 'POST'] as const
}

export function usePostThreads<
  TError = Exclude<Awaited<ReturnType<typeof client.threads.post>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.threads.post>>, { error: null }>['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.threads.post>[0]
      options?: Parameters<typeof client.threads.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostThreadsKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<Awaited<ReturnType<typeof client.threads.post>>, { error: null }>['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.threads.post>[0]
        options?: Parameters<typeof client.threads.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.threads.post>[0]
            options?: Parameters<typeof client.threads.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.threads.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostThreadsRunsKey() {
  return ['threads', '/threads/runs', 'POST'] as const
}

export function usePostThreadsRuns<
  TError = Exclude<Awaited<ReturnType<typeof client.threads.runs.post>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.threads.runs.post>>, { error: null }>['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.threads.runs.post>[0]
      options?: Parameters<typeof client.threads.runs.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostThreadsRunsKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<Awaited<ReturnType<typeof client.threads.runs.post>>, { error: null }>['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.threads.runs.post>[0]
        options?: Parameters<typeof client.threads.runs.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.threads.runs.post>[0]
            options?: Parameters<typeof client.threads.runs.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.threads.runs.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetThreadsThreadIdKey(params: Parameters<typeof client.threads>[0]) {
  return ['threads', '/threads/{thread_id}', params] as const
}

export function useGetThreadsThreadId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.threads>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.threads>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.threads>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.threads>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetThreadsThreadIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.threads>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.threads(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetThreadsThreadId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.threads>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.threads>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.threads>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.threads>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetThreadsThreadIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.threads>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.threads(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostThreadsThreadIdKey() {
  return ['threads', '/threads/{thread_id}', 'POST'] as const
}

export function usePostThreadsThreadId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.threads>['post']>>['error'], null>,
>(
  params: Parameters<typeof client.threads>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.threads>['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.threads>['post']>[0]
        options?: Parameters<ReturnType<typeof client.threads>['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostThreadsThreadIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.threads>['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.threads>['post']>[0]
        options?: Parameters<ReturnType<typeof client.threads>['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.threads>['post']>[0]
            options?: Parameters<ReturnType<typeof client.threads>['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client.threads(params).post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getDeleteThreadsThreadIdKey() {
  return ['threads', '/threads/{thread_id}', 'DELETE'] as const
}

export function useDeleteThreadsThreadId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.threads>['delete']>>['error'], null>,
>(
  params: Parameters<typeof client.threads>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.threads>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.threads>['delete']>[0]
        options?: Parameters<ReturnType<typeof client.threads>['delete']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteThreadsThreadIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.threads>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.threads>['delete']>[0]
        options?: Parameters<ReturnType<typeof client.threads>['delete']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<ReturnType<typeof client.threads>['delete']>[0]
            options?: Parameters<ReturnType<typeof client.threads>['delete']>[1]
          }
        },
      ) => {
        const { data, error } = await client.threads(params).delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetThreadsThreadIdMessagesKey(
  params: Parameters<typeof client.threads>[0],
  options?: Parameters<ReturnType<typeof client.threads>['messages']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['threads', '/threads/{thread_id}/messages', params, keyArgs] as const
}

export function useGetThreadsThreadIdMessages<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.threads>['messages']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.threads>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.threads>['messages']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.threads>['messages']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetThreadsThreadIdMessagesKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.threads>['messages']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.threads(params).messages.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetThreadsThreadIdMessages<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.threads>['messages']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.threads>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.threads>['messages']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.threads>['messages']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetThreadsThreadIdMessagesKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.threads>['messages']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.threads(params).messages.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostThreadsThreadIdMessagesKey() {
  return ['threads', '/threads/{thread_id}/messages', 'POST'] as const
}

export function usePostThreadsThreadIdMessages<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.threads>['messages']['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.threads>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.threads>['messages']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.threads>['messages']['post']>[0]
        options?: Parameters<ReturnType<typeof client.threads>['messages']['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostThreadsThreadIdMessagesKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.threads>['messages']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.threads>['messages']['post']>[0]
        options?: Parameters<ReturnType<typeof client.threads>['messages']['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.threads>['messages']['post']>[0]
            options?: Parameters<ReturnType<typeof client.threads>['messages']['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client.threads(params).messages.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetThreadsThreadIdMessagesMessageIdKey(
  params: Parameters<typeof client.threads>[0],
  params2: Parameters<ReturnType<typeof client.threads>['messages']>[0],
) {
  return ['threads', '/threads/{thread_id}/messages/{message_id}', params, params2] as const
}

export function useGetThreadsThreadIdMessagesMessageId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.threads>['messages']>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.threads>[0],
  params2: Parameters<ReturnType<typeof client.threads>['messages']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.threads>['messages']>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<ReturnType<typeof client.threads>['messages']>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetThreadsThreadIdMessagesMessageIdKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.threads>['messages']>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.threads(params).messages(params2).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetThreadsThreadIdMessagesMessageId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.threads>['messages']>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.threads>[0],
  params2: Parameters<ReturnType<typeof client.threads>['messages']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.threads>['messages']>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<ReturnType<typeof client.threads>['messages']>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetThreadsThreadIdMessagesMessageIdKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.threads>['messages']>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.threads(params).messages(params2).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostThreadsThreadIdMessagesMessageIdKey() {
  return ['threads', '/threads/{thread_id}/messages/{message_id}', 'POST'] as const
}

export function usePostThreadsThreadIdMessagesMessageId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.threads>['messages']>['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.threads>[0],
  params2: Parameters<ReturnType<typeof client.threads>['messages']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.threads>['messages']>['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<ReturnType<typeof client.threads>['messages']>['post']>[0]
        options?: Parameters<ReturnType<ReturnType<typeof client.threads>['messages']>['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostThreadsThreadIdMessagesMessageIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.threads>['messages']>['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<ReturnType<typeof client.threads>['messages']>['post']>[0]
        options?: Parameters<ReturnType<ReturnType<typeof client.threads>['messages']>['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<ReturnType<typeof client.threads>['messages']>['post']>[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.threads>['messages']>['post']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .threads(params)
          .messages(params2)
          .post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getDeleteThreadsThreadIdMessagesMessageIdKey() {
  return ['threads', '/threads/{thread_id}/messages/{message_id}', 'DELETE'] as const
}

export function useDeleteThreadsThreadIdMessagesMessageId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.threads>['messages']>['delete']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.threads>[0],
  params2: Parameters<ReturnType<typeof client.threads>['messages']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.threads>['messages']>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<ReturnType<typeof client.threads>['messages']>['delete']>[0]
        options?: Parameters<ReturnType<ReturnType<typeof client.threads>['messages']>['delete']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteThreadsThreadIdMessagesMessageIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.threads>['messages']>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<ReturnType<typeof client.threads>['messages']>['delete']>[0]
        options?: Parameters<ReturnType<ReturnType<typeof client.threads>['messages']>['delete']>[1]
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
              ReturnType<ReturnType<typeof client.threads>['messages']>['delete']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.threads>['messages']>['delete']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .threads(params)
          .messages(params2)
          .delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetThreadsThreadIdRunsKey(
  params: Parameters<typeof client.threads>[0],
  options?: Parameters<ReturnType<typeof client.threads>['runs']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['threads', '/threads/{thread_id}/runs', params, keyArgs] as const
}

export function useGetThreadsThreadIdRuns<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.threads>['runs']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.threads>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.threads>['runs']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.threads>['runs']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetThreadsThreadIdRunsKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.threads>['runs']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.threads(params).runs.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetThreadsThreadIdRuns<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.threads>['runs']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.threads>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.threads>['runs']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.threads>['runs']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetThreadsThreadIdRunsKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.threads>['runs']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.threads(params).runs.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostThreadsThreadIdRunsKey() {
  return ['threads', '/threads/{thread_id}/runs', 'POST'] as const
}

export function usePostThreadsThreadIdRuns<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.threads>['runs']['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.threads>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.threads>['runs']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.threads>['runs']['post']>[0]
        options?: Parameters<ReturnType<typeof client.threads>['runs']['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostThreadsThreadIdRunsKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.threads>['runs']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.threads>['runs']['post']>[0]
        options?: Parameters<ReturnType<typeof client.threads>['runs']['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.threads>['runs']['post']>[0]
            options?: Parameters<ReturnType<typeof client.threads>['runs']['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client.threads(params).runs.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetThreadsThreadIdRunsRunIdKey(
  params: Parameters<typeof client.threads>[0],
  params2: Parameters<ReturnType<typeof client.threads>['runs']>[0],
) {
  return ['threads', '/threads/{thread_id}/runs/{run_id}', params, params2] as const
}

export function useGetThreadsThreadIdRunsRunId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.threads>['runs']>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.threads>[0],
  params2: Parameters<ReturnType<typeof client.threads>['runs']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.threads>['runs']>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<ReturnType<typeof client.threads>['runs']>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetThreadsThreadIdRunsRunIdKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.threads>['runs']>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.threads(params).runs(params2).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetThreadsThreadIdRunsRunId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.threads>['runs']>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.threads>[0],
  params2: Parameters<ReturnType<typeof client.threads>['runs']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.threads>['runs']>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<ReturnType<typeof client.threads>['runs']>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetThreadsThreadIdRunsRunIdKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.threads>['runs']>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.threads(params).runs(params2).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostThreadsThreadIdRunsRunIdKey() {
  return ['threads', '/threads/{thread_id}/runs/{run_id}', 'POST'] as const
}

export function usePostThreadsThreadIdRunsRunId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.threads>['runs']>['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.threads>[0],
  params2: Parameters<ReturnType<typeof client.threads>['runs']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.threads>['runs']>['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<ReturnType<typeof client.threads>['runs']>['post']>[0]
        options?: Parameters<ReturnType<ReturnType<typeof client.threads>['runs']>['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostThreadsThreadIdRunsRunIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.threads>['runs']>['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<ReturnType<typeof client.threads>['runs']>['post']>[0]
        options?: Parameters<ReturnType<ReturnType<typeof client.threads>['runs']>['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<ReturnType<typeof client.threads>['runs']>['post']>[0]
            options?: Parameters<ReturnType<ReturnType<typeof client.threads>['runs']>['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client
          .threads(params)
          .runs(params2)
          .post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostThreadsThreadIdRunsRunIdCancelKey() {
  return ['threads', '/threads/{thread_id}/runs/{run_id}/cancel', 'POST'] as const
}

export function usePostThreadsThreadIdRunsRunIdCancel<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.threads>['runs']>['cancel']['post']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.threads>[0],
  params2: Parameters<ReturnType<typeof client.threads>['runs']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.threads>['runs']>['cancel']['post']>
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<ReturnType<typeof client.threads>['runs']>['cancel']['post']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.threads>['runs']>['cancel']['post']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostThreadsThreadIdRunsRunIdCancelKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.threads>['runs']>['cancel']['post']>
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<ReturnType<typeof client.threads>['runs']>['cancel']['post']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.threads>['runs']>['cancel']['post']
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
              ReturnType<ReturnType<typeof client.threads>['runs']>['cancel']['post']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.threads>['runs']>['cancel']['post']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .threads(params)
          .runs(params2)
          .cancel.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetThreadsThreadIdRunsRunIdStepsKey(
  params: Parameters<typeof client.threads>[0],
  params2: Parameters<ReturnType<typeof client.threads>['runs']>[0],
  options?: Parameters<ReturnType<ReturnType<typeof client.threads>['runs']>['steps']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['threads', '/threads/{thread_id}/runs/{run_id}/steps', params, params2, keyArgs] as const
}

export function useGetThreadsThreadIdRunsRunIdSteps<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.threads>['runs']>['steps']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.threads>[0],
  params2: Parameters<ReturnType<typeof client.threads>['runs']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.threads>['runs']>['steps']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<ReturnType<typeof client.threads>['runs']>['steps']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetThreadsThreadIdRunsRunIdStepsKey(params, params2, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.threads>['runs']>['steps']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.threads(params).runs(params2).steps.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetThreadsThreadIdRunsRunIdSteps<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.threads>['runs']>['steps']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.threads>[0],
  params2: Parameters<ReturnType<typeof client.threads>['runs']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.threads>['runs']>['steps']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<ReturnType<typeof client.threads>['runs']>['steps']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetThreadsThreadIdRunsRunIdStepsKey(params, params2, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.threads>['runs']>['steps']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.threads(params).runs(params2).steps.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetThreadsThreadIdRunsRunIdStepsStepIdKey(
  params: Parameters<typeof client.threads>[0],
  params2: Parameters<ReturnType<typeof client.threads>['runs']>[0],
  params3: Parameters<ReturnType<ReturnType<typeof client.threads>['runs']>['steps']>[0],
  options?: Parameters<
    ReturnType<ReturnType<ReturnType<typeof client.threads>['runs']>['steps']>['get']
  >[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'threads',
    '/threads/{thread_id}/runs/{run_id}/steps/{step_id}',
    params,
    params2,
    params3,
    keyArgs,
  ] as const
}

export function useGetThreadsThreadIdRunsRunIdStepsStepId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<ReturnType<typeof client.threads>['runs']>['steps']>['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.threads>[0],
  params2: Parameters<ReturnType<typeof client.threads>['runs']>[0],
  params3: Parameters<ReturnType<ReturnType<typeof client.threads>['runs']>['steps']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<ReturnType<typeof client.threads>['runs']>['steps']>['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<ReturnType<typeof client.threads>['runs']>['steps']>['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetThreadsThreadIdRunsRunIdStepsStepIdKey(params, params2, params3, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<ReturnType<typeof client.threads>['runs']>['steps']>['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client
          .threads(params)
          .runs(params2)
          .steps(params3)
          .get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetThreadsThreadIdRunsRunIdStepsStepId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<ReturnType<typeof client.threads>['runs']>['steps']>['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.threads>[0],
  params2: Parameters<ReturnType<typeof client.threads>['runs']>[0],
  params3: Parameters<ReturnType<ReturnType<typeof client.threads>['runs']>['steps']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<ReturnType<typeof client.threads>['runs']>['steps']>['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<ReturnType<typeof client.threads>['runs']>['steps']>['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetThreadsThreadIdRunsRunIdStepsStepIdKey(params, params2, params3, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<ReturnType<typeof client.threads>['runs']>['steps']>['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client
          .threads(params)
          .runs(params2)
          .steps(params3)
          .get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostThreadsThreadIdRunsRunIdSubmitToolOutputsKey() {
  return ['threads', '/threads/{thread_id}/runs/{run_id}/submit_tool_outputs', 'POST'] as const
}

export function usePostThreadsThreadIdRunsRunIdSubmitToolOutputs<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<typeof client.threads>['runs']>['submit_tool_outputs']['post']
      >
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.threads>[0],
  params2: Parameters<ReturnType<typeof client.threads>['runs']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<typeof client.threads>['runs']>['submit_tool_outputs']['post']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<
          ReturnType<ReturnType<typeof client.threads>['runs']>['submit_tool_outputs']['post']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.threads>['runs']>['submit_tool_outputs']['post']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostThreadsThreadIdRunsRunIdSubmitToolOutputsKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<typeof client.threads>['runs']>['submit_tool_outputs']['post']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<
          ReturnType<ReturnType<typeof client.threads>['runs']>['submit_tool_outputs']['post']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.threads>['runs']>['submit_tool_outputs']['post']
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
            body: Parameters<
              ReturnType<ReturnType<typeof client.threads>['runs']>['submit_tool_outputs']['post']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.threads>['runs']>['submit_tool_outputs']['post']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .threads(params)
          .runs(params2)
          .submit_tool_outputs.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostUploadsKey() {
  return ['uploads', '/uploads', 'POST'] as const
}

export function usePostUploads<
  TError = Exclude<Awaited<ReturnType<typeof client.uploads.post>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.uploads.post>>, { error: null }>['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.uploads.post>[0]
      options?: Parameters<typeof client.uploads.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostUploadsKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<Awaited<ReturnType<typeof client.uploads.post>>, { error: null }>['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.uploads.post>[0]
        options?: Parameters<typeof client.uploads.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.uploads.post>[0]
            options?: Parameters<typeof client.uploads.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.uploads.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostUploadsUploadIdCancelKey() {
  return ['uploads', '/uploads/{upload_id}/cancel', 'POST'] as const
}

export function usePostUploadsUploadIdCancel<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.uploads>['cancel']['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.uploads>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.uploads>['cancel']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.uploads>['cancel']['post']>[0]
        options?: Parameters<ReturnType<typeof client.uploads>['cancel']['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostUploadsUploadIdCancelKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.uploads>['cancel']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.uploads>['cancel']['post']>[0]
        options?: Parameters<ReturnType<typeof client.uploads>['cancel']['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<ReturnType<typeof client.uploads>['cancel']['post']>[0]
            options?: Parameters<ReturnType<typeof client.uploads>['cancel']['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client.uploads(params).cancel.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostUploadsUploadIdCompleteKey() {
  return ['uploads', '/uploads/{upload_id}/complete', 'POST'] as const
}

export function usePostUploadsUploadIdComplete<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.uploads>['complete']['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.uploads>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.uploads>['complete']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.uploads>['complete']['post']>[0]
        options?: Parameters<ReturnType<typeof client.uploads>['complete']['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostUploadsUploadIdCompleteKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.uploads>['complete']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.uploads>['complete']['post']>[0]
        options?: Parameters<ReturnType<typeof client.uploads>['complete']['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.uploads>['complete']['post']>[0]
            options?: Parameters<ReturnType<typeof client.uploads>['complete']['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client.uploads(params).complete.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostUploadsUploadIdPartsKey() {
  return ['uploads', '/uploads/{upload_id}/parts', 'POST'] as const
}

export function usePostUploadsUploadIdParts<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.uploads>['parts']['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.uploads>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.uploads>['parts']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.uploads>['parts']['post']>[0]
        options?: Parameters<ReturnType<typeof client.uploads>['parts']['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostUploadsUploadIdPartsKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.uploads>['parts']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.uploads>['parts']['post']>[0]
        options?: Parameters<ReturnType<typeof client.uploads>['parts']['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.uploads>['parts']['post']>[0]
            options?: Parameters<ReturnType<typeof client.uploads>['parts']['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client.uploads(params).parts.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetVectorStoresKey(options?: Parameters<typeof client.vector_stores.get>[0]) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['vector_stores', '/vector_stores', keyArgs] as const
}

export function useGetVectorStores<
  TError = Exclude<Awaited<ReturnType<typeof client.vector_stores.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.vector_stores.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.vector_stores.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetVectorStoresKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<Awaited<ReturnType<typeof client.vector_stores.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.vector_stores.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetVectorStores<
  TError = Exclude<Awaited<ReturnType<typeof client.vector_stores.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.vector_stores.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.vector_stores.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetVectorStoresKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<Awaited<ReturnType<typeof client.vector_stores.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.vector_stores.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostVectorStoresKey() {
  return ['vector_stores', '/vector_stores', 'POST'] as const
}

export function usePostVectorStores<
  TError = Exclude<Awaited<ReturnType<typeof client.vector_stores.post>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.vector_stores.post>>, { error: null }>['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.vector_stores.post>[0]
      options?: Parameters<typeof client.vector_stores.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostVectorStoresKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<Awaited<ReturnType<typeof client.vector_stores.post>>, { error: null }>['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.vector_stores.post>[0]
        options?: Parameters<typeof client.vector_stores.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.vector_stores.post>[0]
            options?: Parameters<typeof client.vector_stores.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.vector_stores.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetVectorStoresVectorStoreIdKey(
  params: Parameters<typeof client.vector_stores>[0],
) {
  return ['vector_stores', '/vector_stores/{vector_store_id}', params] as const
}

export function useGetVectorStoresVectorStoreId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.vector_stores>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.vector_stores>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.vector_stores>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.vector_stores>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetVectorStoresVectorStoreIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.vector_stores>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.vector_stores(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetVectorStoresVectorStoreId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.vector_stores>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.vector_stores>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.vector_stores>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.vector_stores>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetVectorStoresVectorStoreIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.vector_stores>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.vector_stores(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostVectorStoresVectorStoreIdKey() {
  return ['vector_stores', '/vector_stores/{vector_store_id}', 'POST'] as const
}

export function usePostVectorStoresVectorStoreId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.vector_stores>['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.vector_stores>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.vector_stores>['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.vector_stores>['post']>[0]
        options?: Parameters<ReturnType<typeof client.vector_stores>['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostVectorStoresVectorStoreIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.vector_stores>['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.vector_stores>['post']>[0]
        options?: Parameters<ReturnType<typeof client.vector_stores>['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.vector_stores>['post']>[0]
            options?: Parameters<ReturnType<typeof client.vector_stores>['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client.vector_stores(params).post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getDeleteVectorStoresVectorStoreIdKey() {
  return ['vector_stores', '/vector_stores/{vector_store_id}', 'DELETE'] as const
}

export function useDeleteVectorStoresVectorStoreId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.vector_stores>['delete']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.vector_stores>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.vector_stores>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.vector_stores>['delete']>[0]
        options?: Parameters<ReturnType<typeof client.vector_stores>['delete']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteVectorStoresVectorStoreIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.vector_stores>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.vector_stores>['delete']>[0]
        options?: Parameters<ReturnType<typeof client.vector_stores>['delete']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<ReturnType<typeof client.vector_stores>['delete']>[0]
            options?: Parameters<ReturnType<typeof client.vector_stores>['delete']>[1]
          }
        },
      ) => {
        const { data, error } = await client.vector_stores(params).delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostVectorStoresVectorStoreIdFileBatchesKey() {
  return ['vector_stores', '/vector_stores/{vector_store_id}/file_batches', 'POST'] as const
}

export function usePostVectorStoresVectorStoreIdFileBatches<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.vector_stores>['file_batches']['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.vector_stores>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.vector_stores>['file_batches']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.vector_stores>['file_batches']['post']>[0]
        options?: Parameters<ReturnType<typeof client.vector_stores>['file_batches']['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostVectorStoresVectorStoreIdFileBatchesKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.vector_stores>['file_batches']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.vector_stores>['file_batches']['post']>[0]
        options?: Parameters<ReturnType<typeof client.vector_stores>['file_batches']['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.vector_stores>['file_batches']['post']>[0]
            options?: Parameters<ReturnType<typeof client.vector_stores>['file_batches']['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client
          .vector_stores(params)
          .file_batches.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetVectorStoresVectorStoreIdFileBatchesBatchIdKey(
  params: Parameters<typeof client.vector_stores>[0],
  params2: Parameters<ReturnType<typeof client.vector_stores>['file_batches']>[0],
) {
  return [
    'vector_stores',
    '/vector_stores/{vector_store_id}/file_batches/{batch_id}',
    params,
    params2,
  ] as const
}

export function useGetVectorStoresVectorStoreIdFileBatchesBatchId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.vector_stores>['file_batches']>['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.vector_stores>[0],
  params2: Parameters<ReturnType<typeof client.vector_stores>['file_batches']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.vector_stores>['file_batches']>['get']>
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<typeof client.vector_stores>['file_batches']>['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetVectorStoresVectorStoreIdFileBatchesBatchIdKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.vector_stores>['file_batches']>['get']>
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client
          .vector_stores(params)
          .file_batches(params2)
          .get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetVectorStoresVectorStoreIdFileBatchesBatchId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.vector_stores>['file_batches']>['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.vector_stores>[0],
  params2: Parameters<ReturnType<typeof client.vector_stores>['file_batches']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.vector_stores>['file_batches']>['get']>
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<typeof client.vector_stores>['file_batches']>['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetVectorStoresVectorStoreIdFileBatchesBatchIdKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.vector_stores>['file_batches']>['get']>
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client
          .vector_stores(params)
          .file_batches(params2)
          .get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostVectorStoresVectorStoreIdFileBatchesBatchIdCancelKey() {
  return [
    'vector_stores',
    '/vector_stores/{vector_store_id}/file_batches/{batch_id}/cancel',
    'POST',
  ] as const
}

export function usePostVectorStoresVectorStoreIdFileBatchesBatchIdCancel<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<typeof client.vector_stores>['file_batches']>['cancel']['post']
      >
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.vector_stores>[0],
  params2: Parameters<ReturnType<typeof client.vector_stores>['file_batches']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<typeof client.vector_stores>['file_batches']>['cancel']['post']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<ReturnType<typeof client.vector_stores>['file_batches']>['cancel']['post']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.vector_stores>['file_batches']>['cancel']['post']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostVectorStoresVectorStoreIdFileBatchesBatchIdCancelKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<typeof client.vector_stores>['file_batches']>['cancel']['post']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<ReturnType<typeof client.vector_stores>['file_batches']>['cancel']['post']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.vector_stores>['file_batches']>['cancel']['post']
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
              ReturnType<ReturnType<typeof client.vector_stores>['file_batches']>['cancel']['post']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.vector_stores>['file_batches']>['cancel']['post']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .vector_stores(params)
          .file_batches(params2)
          .cancel.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetVectorStoresVectorStoreIdFileBatchesBatchIdFilesKey(
  params: Parameters<typeof client.vector_stores>[0],
  params2: Parameters<ReturnType<typeof client.vector_stores>['file_batches']>[0],
  options?: Parameters<
    ReturnType<ReturnType<typeof client.vector_stores>['file_batches']>['files']['get']
  >[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'vector_stores',
    '/vector_stores/{vector_store_id}/file_batches/{batch_id}/files',
    params,
    params2,
    keyArgs,
  ] as const
}

export function useGetVectorStoresVectorStoreIdFileBatchesBatchIdFiles<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<typeof client.vector_stores>['file_batches']>['files']['get']
      >
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.vector_stores>[0],
  params2: Parameters<ReturnType<typeof client.vector_stores>['file_batches']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<typeof client.vector_stores>['file_batches']>['files']['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<typeof client.vector_stores>['file_batches']>['files']['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetVectorStoresVectorStoreIdFileBatchesBatchIdFilesKey(params, params2, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<typeof client.vector_stores>['file_batches']>['files']['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client
          .vector_stores(params)
          .file_batches(params2)
          .files.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetVectorStoresVectorStoreIdFileBatchesBatchIdFiles<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<typeof client.vector_stores>['file_batches']>['files']['get']
      >
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.vector_stores>[0],
  params2: Parameters<ReturnType<typeof client.vector_stores>['file_batches']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<typeof client.vector_stores>['file_batches']>['files']['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<typeof client.vector_stores>['file_batches']>['files']['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetVectorStoresVectorStoreIdFileBatchesBatchIdFilesKey(params, params2, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<typeof client.vector_stores>['file_batches']>['files']['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client
          .vector_stores(params)
          .file_batches(params2)
          .files.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetVectorStoresVectorStoreIdFilesKey(
  params: Parameters<typeof client.vector_stores>[0],
  options?: Parameters<ReturnType<typeof client.vector_stores>['files']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['vector_stores', '/vector_stores/{vector_store_id}/files', params, keyArgs] as const
}

export function useGetVectorStoresVectorStoreIdFiles<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.vector_stores>['files']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.vector_stores>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.vector_stores>['files']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.vector_stores>['files']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetVectorStoresVectorStoreIdFilesKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.vector_stores>['files']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.vector_stores(params).files.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetVectorStoresVectorStoreIdFiles<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.vector_stores>['files']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.vector_stores>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.vector_stores>['files']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.vector_stores>['files']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetVectorStoresVectorStoreIdFilesKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.vector_stores>['files']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.vector_stores(params).files.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostVectorStoresVectorStoreIdFilesKey() {
  return ['vector_stores', '/vector_stores/{vector_store_id}/files', 'POST'] as const
}

export function usePostVectorStoresVectorStoreIdFiles<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.vector_stores>['files']['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.vector_stores>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.vector_stores>['files']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.vector_stores>['files']['post']>[0]
        options?: Parameters<ReturnType<typeof client.vector_stores>['files']['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostVectorStoresVectorStoreIdFilesKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.vector_stores>['files']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.vector_stores>['files']['post']>[0]
        options?: Parameters<ReturnType<typeof client.vector_stores>['files']['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.vector_stores>['files']['post']>[0]
            options?: Parameters<ReturnType<typeof client.vector_stores>['files']['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client.vector_stores(params).files.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetVectorStoresVectorStoreIdFilesFileIdKey(
  params: Parameters<typeof client.vector_stores>[0],
  params2: Parameters<ReturnType<typeof client.vector_stores>['files']>[0],
) {
  return [
    'vector_stores',
    '/vector_stores/{vector_store_id}/files/{file_id}',
    params,
    params2,
  ] as const
}

export function useGetVectorStoresVectorStoreIdFilesFileId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.vector_stores>['files']>['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.vector_stores>[0],
  params2: Parameters<ReturnType<typeof client.vector_stores>['files']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.vector_stores>['files']>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<ReturnType<typeof client.vector_stores>['files']>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetVectorStoresVectorStoreIdFilesFileIdKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.vector_stores>['files']>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.vector_stores(params).files(params2).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetVectorStoresVectorStoreIdFilesFileId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.vector_stores>['files']>['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.vector_stores>[0],
  params2: Parameters<ReturnType<typeof client.vector_stores>['files']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.vector_stores>['files']>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<ReturnType<typeof client.vector_stores>['files']>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetVectorStoresVectorStoreIdFilesFileIdKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.vector_stores>['files']>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.vector_stores(params).files(params2).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostVectorStoresVectorStoreIdFilesFileIdKey() {
  return ['vector_stores', '/vector_stores/{vector_store_id}/files/{file_id}', 'POST'] as const
}

export function usePostVectorStoresVectorStoreIdFilesFileId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.vector_stores>['files']>['post']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.vector_stores>[0],
  params2: Parameters<ReturnType<typeof client.vector_stores>['files']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.vector_stores>['files']>['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<ReturnType<typeof client.vector_stores>['files']>['post']>[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.vector_stores>['files']>['post']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostVectorStoresVectorStoreIdFilesFileIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.vector_stores>['files']>['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<ReturnType<typeof client.vector_stores>['files']>['post']>[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.vector_stores>['files']>['post']
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
            body: Parameters<
              ReturnType<ReturnType<typeof client.vector_stores>['files']>['post']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.vector_stores>['files']>['post']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .vector_stores(params)
          .files(params2)
          .post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getDeleteVectorStoresVectorStoreIdFilesFileIdKey() {
  return ['vector_stores', '/vector_stores/{vector_store_id}/files/{file_id}', 'DELETE'] as const
}

export function useDeleteVectorStoresVectorStoreIdFilesFileId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.vector_stores>['files']>['delete']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.vector_stores>[0],
  params2: Parameters<ReturnType<typeof client.vector_stores>['files']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.vector_stores>['files']>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<ReturnType<typeof client.vector_stores>['files']>['delete']>[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.vector_stores>['files']>['delete']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteVectorStoresVectorStoreIdFilesFileIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.vector_stores>['files']>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<ReturnType<typeof client.vector_stores>['files']>['delete']>[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.vector_stores>['files']>['delete']
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
              ReturnType<ReturnType<typeof client.vector_stores>['files']>['delete']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.vector_stores>['files']>['delete']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .vector_stores(params)
          .files(params2)
          .delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetVectorStoresVectorStoreIdFilesFileIdContentKey(
  params: Parameters<typeof client.vector_stores>[0],
  params2: Parameters<ReturnType<typeof client.vector_stores>['files']>[0],
) {
  return [
    'vector_stores',
    '/vector_stores/{vector_store_id}/files/{file_id}/content',
    params,
    params2,
  ] as const
}

export function useGetVectorStoresVectorStoreIdFilesFileIdContent<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.vector_stores>['files']>['content']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.vector_stores>[0],
  params2: Parameters<ReturnType<typeof client.vector_stores>['files']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.vector_stores>['files']>['content']['get']>
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<typeof client.vector_stores>['files']>['content']['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetVectorStoresVectorStoreIdFilesFileIdContentKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.vector_stores>['files']>['content']['get']>
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client
          .vector_stores(params)
          .files(params2)
          .content.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetVectorStoresVectorStoreIdFilesFileIdContent<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.vector_stores>['files']>['content']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.vector_stores>[0],
  params2: Parameters<ReturnType<typeof client.vector_stores>['files']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.vector_stores>['files']>['content']['get']>
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<typeof client.vector_stores>['files']>['content']['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetVectorStoresVectorStoreIdFilesFileIdContentKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.vector_stores>['files']>['content']['get']>
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client
          .vector_stores(params)
          .files(params2)
          .content.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostVectorStoresVectorStoreIdSearchKey() {
  return ['vector_stores', '/vector_stores/{vector_store_id}/search', 'POST'] as const
}

export function usePostVectorStoresVectorStoreIdSearch<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.vector_stores>['search']['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.vector_stores>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.vector_stores>['search']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.vector_stores>['search']['post']>[0]
        options?: Parameters<ReturnType<typeof client.vector_stores>['search']['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostVectorStoresVectorStoreIdSearchKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.vector_stores>['search']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.vector_stores>['search']['post']>[0]
        options?: Parameters<ReturnType<typeof client.vector_stores>['search']['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.vector_stores>['search']['post']>[0]
            options?: Parameters<ReturnType<typeof client.vector_stores>['search']['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client
          .vector_stores(params)
          .search.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostConversationsKey() {
  return ['conversations', '/conversations', 'POST'] as const
}

export function usePostConversations<
  TError = Exclude<Awaited<ReturnType<typeof client.conversations.post>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.conversations.post>>, { error: null }>['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.conversations.post>[0]
      options?: Parameters<typeof client.conversations.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostConversationsKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<Awaited<ReturnType<typeof client.conversations.post>>, { error: null }>['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.conversations.post>[0]
        options?: Parameters<typeof client.conversations.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.conversations.post>[0]
            options?: Parameters<typeof client.conversations.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.conversations.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetConversationsConversationIdKey(
  params: Parameters<typeof client.conversations>[0],
) {
  return ['conversations', '/conversations/{conversation_id}', params] as const
}

export function useGetConversationsConversationId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.conversations>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.conversations>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.conversations>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.conversations>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetConversationsConversationIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.conversations>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.conversations(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetConversationsConversationId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.conversations>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.conversations>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.conversations>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.conversations>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetConversationsConversationIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.conversations>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.conversations(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostConversationsConversationIdKey() {
  return ['conversations', '/conversations/{conversation_id}', 'POST'] as const
}

export function usePostConversationsConversationId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.conversations>['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.conversations>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.conversations>['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.conversations>['post']>[0]
        options?: Parameters<ReturnType<typeof client.conversations>['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostConversationsConversationIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.conversations>['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.conversations>['post']>[0]
        options?: Parameters<ReturnType<typeof client.conversations>['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.conversations>['post']>[0]
            options?: Parameters<ReturnType<typeof client.conversations>['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client.conversations(params).post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getDeleteConversationsConversationIdKey() {
  return ['conversations', '/conversations/{conversation_id}', 'DELETE'] as const
}

export function useDeleteConversationsConversationId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.conversations>['delete']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.conversations>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.conversations>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.conversations>['delete']>[0]
        options?: Parameters<ReturnType<typeof client.conversations>['delete']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteConversationsConversationIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.conversations>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.conversations>['delete']>[0]
        options?: Parameters<ReturnType<typeof client.conversations>['delete']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<ReturnType<typeof client.conversations>['delete']>[0]
            options?: Parameters<ReturnType<typeof client.conversations>['delete']>[1]
          }
        },
      ) => {
        const { data, error } = await client.conversations(params).delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetSafetyCasesIdKey(params: Parameters<typeof client.safety.cases>[0]) {
  return ['safety', '/safety/cases/{id}', params] as const
}

export function useGetSafetyCasesId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.safety.cases>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.safety.cases>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.safety.cases>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.safety.cases>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetSafetyCasesIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.safety.cases>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.safety.cases(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetSafetyCasesId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.safety.cases>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.safety.cases>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.safety.cases>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.safety.cases>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetSafetyCasesIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.safety.cases>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.safety.cases(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetSafetyAlertsIdKey(params: Parameters<typeof client.safety.alerts>[0]) {
  return ['safety', '/safety/alerts/{id}', params] as const
}

export function useGetSafetyAlertsId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.safety.alerts>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.safety.alerts>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.safety.alerts>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.safety.alerts>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetSafetyAlertsIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.safety.alerts>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.safety.alerts(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetSafetyAlertsId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.safety.alerts>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.safety.alerts>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.safety.alerts>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.safety.alerts>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetSafetyAlertsIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.safety.alerts>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.safety.alerts(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetOrganizationExternalKeysKey(
  options?: Parameters<typeof client.organization.external_keys.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['organization', '/organization/external_keys', keyArgs] as const
}

export function useGetOrganizationExternalKeys<
  TError = Exclude<
    Awaited<ReturnType<typeof client.organization.external_keys.get>>['error'],
    null
  >,
>(options?: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.organization.external_keys.get>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.organization.external_keys.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationExternalKeysKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<typeof client.organization.external_keys.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization.external_keys.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetOrganizationExternalKeys<
  TError = Exclude<
    Awaited<ReturnType<typeof client.organization.external_keys.get>>['error'],
    null
  >,
>(options?: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.organization.external_keys.get>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.organization.external_keys.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationExternalKeysKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<typeof client.organization.external_keys.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization.external_keys.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostOrganizationExternalKeysKey() {
  return ['organization', '/organization/external_keys', 'POST'] as const
}

export function usePostOrganizationExternalKeys<
  TError = Exclude<
    Awaited<ReturnType<typeof client.organization.external_keys.post>>['error'],
    null
  >,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.organization.external_keys.post>>,
      { error: null }
    >['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.organization.external_keys.post>[0]
      options?: Parameters<typeof client.organization.external_keys.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostOrganizationExternalKeysKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<typeof client.organization.external_keys.post>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.organization.external_keys.post>[0]
        options?: Parameters<typeof client.organization.external_keys.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.organization.external_keys.post>[0]
            options?: Parameters<typeof client.organization.external_keys.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.organization.external_keys.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetOrganizationExternalKeysExternalKeyIdKey(
  params: Parameters<typeof client.organization.external_keys>[0],
) {
  return ['organization', '/organization/external_keys/{external_key_id}', params] as const
}

export function useGetOrganizationExternalKeysExternalKeyId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.external_keys>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.external_keys>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.external_keys>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.organization.external_keys>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationExternalKeysExternalKeyIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.external_keys>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization.external_keys(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetOrganizationExternalKeysExternalKeyId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.external_keys>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.external_keys>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.external_keys>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.organization.external_keys>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationExternalKeysExternalKeyIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.external_keys>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization.external_keys(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getDeleteOrganizationExternalKeysExternalKeyIdKey() {
  return ['organization', '/organization/external_keys/{external_key_id}', 'DELETE'] as const
}

export function useDeleteOrganizationExternalKeysExternalKeyId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.external_keys>['delete']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.external_keys>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.external_keys>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.organization.external_keys>['delete']>[0]
        options?: Parameters<ReturnType<typeof client.organization.external_keys>['delete']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteOrganizationExternalKeysExternalKeyIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.external_keys>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.organization.external_keys>['delete']>[0]
        options?: Parameters<ReturnType<typeof client.organization.external_keys>['delete']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<ReturnType<typeof client.organization.external_keys>['delete']>[0]
            options?: Parameters<ReturnType<typeof client.organization.external_keys>['delete']>[1]
          }
        },
      ) => {
        const { data, error } = await client.organization
          .external_keys(params)
          .delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostOrganizationExternalKeysExternalKeyIdValidateKey() {
  return ['organization', '/organization/external_keys/{external_key_id}/validate', 'POST'] as const
}

export function usePostOrganizationExternalKeysExternalKeyIdValidate<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.organization.external_keys>['validate']['post']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.external_keys>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<typeof client.organization.external_keys>['validate']['post']>
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<typeof client.organization.external_keys>['validate']['post']
        >[0]
        options?: Parameters<
          ReturnType<typeof client.organization.external_keys>['validate']['post']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostOrganizationExternalKeysExternalKeyIdValidateKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<ReturnType<typeof client.organization.external_keys>['validate']['post']>
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<typeof client.organization.external_keys>['validate']['post']
        >[0]
        options?: Parameters<
          ReturnType<typeof client.organization.external_keys>['validate']['post']
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
              ReturnType<typeof client.organization.external_keys>['validate']['post']
            >[0]
            options?: Parameters<
              ReturnType<typeof client.organization.external_keys>['validate']['post']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client.organization
          .external_keys(params)
          .validate.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetLiveSessionsSessionIdContentKey(
  params: Parameters<typeof client.live.sessions>[0],
) {
  return ['live', '/live/sessions/{session_id}/content', params] as const
}

export function useGetLiveSessionsSessionIdContent<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.live.sessions>['content']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.live.sessions>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.live.sessions>['content']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.live.sessions>['content']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetLiveSessionsSessionIdContentKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.live.sessions>['content']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.live.sessions(params).content.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetLiveSessionsSessionIdContent<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.live.sessions>['content']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.live.sessions>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.live.sessions>['content']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.live.sessions>['content']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetLiveSessionsSessionIdContentKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.live.sessions>['content']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.live.sessions(params).content.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetOrganizationWorkloadIdentityProvidersKey(
  options?: Parameters<typeof client.organization.workload_identity_providers.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['organization', '/organization/workload_identity_providers', keyArgs] as const
}

export function useGetOrganizationWorkloadIdentityProviders<
  TError = Exclude<
    Awaited<ReturnType<typeof client.organization.workload_identity_providers.get>>['error'],
    null
  >,
>(options?: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.organization.workload_identity_providers.get>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.organization.workload_identity_providers.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationWorkloadIdentityProvidersKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<typeof client.organization.workload_identity_providers.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } =
          await client.organization.workload_identity_providers.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetOrganizationWorkloadIdentityProviders<
  TError = Exclude<
    Awaited<ReturnType<typeof client.organization.workload_identity_providers.get>>['error'],
    null
  >,
>(options?: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.organization.workload_identity_providers.get>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.organization.workload_identity_providers.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationWorkloadIdentityProvidersKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<typeof client.organization.workload_identity_providers.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } =
          await client.organization.workload_identity_providers.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostOrganizationWorkloadIdentityProvidersKey() {
  return ['organization', '/organization/workload_identity_providers', 'POST'] as const
}

export function usePostOrganizationWorkloadIdentityProviders<
  TError = Exclude<
    Awaited<ReturnType<typeof client.organization.workload_identity_providers.post>>['error'],
    null
  >,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.organization.workload_identity_providers.post>>,
      { error: null }
    >['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.organization.workload_identity_providers.post>[0]
      options?: Parameters<typeof client.organization.workload_identity_providers.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostOrganizationWorkloadIdentityProvidersKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<typeof client.organization.workload_identity_providers.post>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.organization.workload_identity_providers.post>[0]
        options?: Parameters<typeof client.organization.workload_identity_providers.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.organization.workload_identity_providers.post>[0]
            options?: Parameters<typeof client.organization.workload_identity_providers.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.organization.workload_identity_providers.post(
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

export function getGetOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdKey(
  params: Parameters<typeof client.organization.workload_identity_providers>[0],
) {
  return [
    'organization',
    '/organization/workload_identity_providers/{workload_identity_provider_id}',
    params,
  ] as const
}

export function useGetOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.organization.workload_identity_providers>['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.workload_identity_providers>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<typeof client.organization.workload_identity_providers>['get']>
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<typeof client.organization.workload_identity_providers>['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<
          ReturnType<ReturnType<typeof client.organization.workload_identity_providers>['get']>
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization
          .workload_identity_providers(params)
          .get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.organization.workload_identity_providers>['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.workload_identity_providers>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<typeof client.organization.workload_identity_providers>['get']>
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<typeof client.organization.workload_identity_providers>['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<
          ReturnType<ReturnType<typeof client.organization.workload_identity_providers>['get']>
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization
          .workload_identity_providers(params)
          .get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdKey() {
  return [
    'organization',
    '/organization/workload_identity_providers/{workload_identity_provider_id}',
    'POST',
  ] as const
}

export function usePostOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.organization.workload_identity_providers>['post']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.workload_identity_providers>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<typeof client.organization.workload_identity_providers>['post']>
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<
          ReturnType<typeof client.organization.workload_identity_providers>['post']
        >[0]
        options?: Parameters<
          ReturnType<typeof client.organization.workload_identity_providers>['post']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey =
    customKey ?? getPostOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<ReturnType<typeof client.organization.workload_identity_providers>['post']>
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<
          ReturnType<typeof client.organization.workload_identity_providers>['post']
        >[0]
        options?: Parameters<
          ReturnType<typeof client.organization.workload_identity_providers>['post']
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
            body: Parameters<
              ReturnType<typeof client.organization.workload_identity_providers>['post']
            >[0]
            options?: Parameters<
              ReturnType<typeof client.organization.workload_identity_providers>['post']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client.organization
          .workload_identity_providers(params)
          .post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getDeleteOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdKey() {
  return [
    'organization',
    '/organization/workload_identity_providers/{workload_identity_provider_id}',
    'DELETE',
  ] as const
}

export function useDeleteOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.organization.workload_identity_providers>['delete']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.workload_identity_providers>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<typeof client.organization.workload_identity_providers>['delete']>
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<typeof client.organization.workload_identity_providers>['delete']
        >[0]
        options?: Parameters<
          ReturnType<typeof client.organization.workload_identity_providers>['delete']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey =
    customKey ?? getDeleteOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<ReturnType<typeof client.organization.workload_identity_providers>['delete']>
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<typeof client.organization.workload_identity_providers>['delete']
        >[0]
        options?: Parameters<
          ReturnType<typeof client.organization.workload_identity_providers>['delete']
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
              ReturnType<typeof client.organization.workload_identity_providers>['delete']
            >[0]
            options?: Parameters<
              ReturnType<typeof client.organization.workload_identity_providers>['delete']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client.organization
          .workload_identity_providers(params)
          .delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRulesKey(
  params: Parameters<typeof client.organization.workload_identity_providers>[0],
  options?: Parameters<
    ReturnType<typeof client.organization.workload_identity_providers>['federation_rules']['get']
  >[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'organization',
    '/organization/workload_identity_providers/{workload_identity_provider_id}/federation_rules',
    params,
    keyArgs,
  ] as const
}

export function useGetOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRules<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<
          typeof client.organization.workload_identity_providers
        >['federation_rules']['get']
      >
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.workload_identity_providers>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<
              typeof client.organization.workload_identity_providers
            >['federation_rules']['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<typeof client.organization.workload_identity_providers>['federation_rules']['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRulesKey(
            params,
            clientOptions,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<
              typeof client.organization.workload_identity_providers
            >['federation_rules']['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization
          .workload_identity_providers(params)
          .federation_rules.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRules<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<
          typeof client.organization.workload_identity_providers
        >['federation_rules']['get']
      >
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.workload_identity_providers>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<
              typeof client.organization.workload_identity_providers
            >['federation_rules']['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<typeof client.organization.workload_identity_providers>['federation_rules']['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRulesKey(
            params,
            clientOptions,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<
              typeof client.organization.workload_identity_providers
            >['federation_rules']['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization
          .workload_identity_providers(params)
          .federation_rules.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRulesKey() {
  return [
    'organization',
    '/organization/workload_identity_providers/{workload_identity_provider_id}/federation_rules',
    'POST',
  ] as const
}

export function usePostOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRules<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<
          typeof client.organization.workload_identity_providers
        >['federation_rules']['post']
      >
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.workload_identity_providers>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<
              typeof client.organization.workload_identity_providers
            >['federation_rules']['post']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<
          ReturnType<
            typeof client.organization.workload_identity_providers
          >['federation_rules']['post']
        >[0]
        options?: Parameters<
          ReturnType<
            typeof client.organization.workload_identity_providers
          >['federation_rules']['post']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey =
    customKey ??
    getPostOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRulesKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<
              typeof client.organization.workload_identity_providers
            >['federation_rules']['post']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<
          ReturnType<
            typeof client.organization.workload_identity_providers
          >['federation_rules']['post']
        >[0]
        options?: Parameters<
          ReturnType<
            typeof client.organization.workload_identity_providers
          >['federation_rules']['post']
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
            body: Parameters<
              ReturnType<
                typeof client.organization.workload_identity_providers
              >['federation_rules']['post']
            >[0]
            options?: Parameters<
              ReturnType<
                typeof client.organization.workload_identity_providers
              >['federation_rules']['post']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client.organization
          .workload_identity_providers(params)
          .federation_rules.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRulesWorkloadIdentityFederationRuleIdKey(
  params: Parameters<typeof client.organization.workload_identity_providers>[0],
  params2: Parameters<
    ReturnType<typeof client.organization.workload_identity_providers>['federation_rules']
  >[0],
) {
  return [
    'organization',
    '/organization/workload_identity_providers/{workload_identity_provider_id}/federation_rules/{workload_identity_federation_rule_id}',
    params,
    params2,
  ] as const
}

export function useGetOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRulesWorkloadIdentityFederationRuleId<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<
          ReturnType<typeof client.organization.workload_identity_providers>['federation_rules']
        >['get']
      >
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.workload_identity_providers>[0],
  params2: Parameters<
    ReturnType<typeof client.organization.workload_identity_providers>['federation_rules']
  >[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<
              ReturnType<typeof client.organization.workload_identity_providers>['federation_rules']
            >['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<
        ReturnType<typeof client.organization.workload_identity_providers>['federation_rules']
      >['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRulesWorkloadIdentityFederationRuleIdKey(
            params,
            params2,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<
              ReturnType<typeof client.organization.workload_identity_providers>['federation_rules']
            >['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization
          .workload_identity_providers(params)
          .federation_rules(params2)
          .get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRulesWorkloadIdentityFederationRuleId<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<
          ReturnType<typeof client.organization.workload_identity_providers>['federation_rules']
        >['get']
      >
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.workload_identity_providers>[0],
  params2: Parameters<
    ReturnType<typeof client.organization.workload_identity_providers>['federation_rules']
  >[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<
              ReturnType<typeof client.organization.workload_identity_providers>['federation_rules']
            >['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<
        ReturnType<typeof client.organization.workload_identity_providers>['federation_rules']
      >['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRulesWorkloadIdentityFederationRuleIdKey(
            params,
            params2,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<
              ReturnType<typeof client.organization.workload_identity_providers>['federation_rules']
            >['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization
          .workload_identity_providers(params)
          .federation_rules(params2)
          .get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRulesWorkloadIdentityFederationRuleIdKey() {
  return [
    'organization',
    '/organization/workload_identity_providers/{workload_identity_provider_id}/federation_rules/{workload_identity_federation_rule_id}',
    'POST',
  ] as const
}

export function usePostOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRulesWorkloadIdentityFederationRuleId<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<
          ReturnType<typeof client.organization.workload_identity_providers>['federation_rules']
        >['post']
      >
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.workload_identity_providers>[0],
  params2: Parameters<
    ReturnType<typeof client.organization.workload_identity_providers>['federation_rules']
  >[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<
              ReturnType<typeof client.organization.workload_identity_providers>['federation_rules']
            >['post']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<
          ReturnType<
            ReturnType<typeof client.organization.workload_identity_providers>['federation_rules']
          >['post']
        >[0]
        options?: Parameters<
          ReturnType<
            ReturnType<typeof client.organization.workload_identity_providers>['federation_rules']
          >['post']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey =
    customKey ??
    getPostOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRulesWorkloadIdentityFederationRuleIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<
              ReturnType<typeof client.organization.workload_identity_providers>['federation_rules']
            >['post']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<
          ReturnType<
            ReturnType<typeof client.organization.workload_identity_providers>['federation_rules']
          >['post']
        >[0]
        options?: Parameters<
          ReturnType<
            ReturnType<typeof client.organization.workload_identity_providers>['federation_rules']
          >['post']
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
            body: Parameters<
              ReturnType<
                ReturnType<
                  typeof client.organization.workload_identity_providers
                >['federation_rules']
              >['post']
            >[0]
            options?: Parameters<
              ReturnType<
                ReturnType<
                  typeof client.organization.workload_identity_providers
                >['federation_rules']
              >['post']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client.organization
          .workload_identity_providers(params)
          .federation_rules(params2)
          .post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getDeleteOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRulesWorkloadIdentityFederationRuleIdKey() {
  return [
    'organization',
    '/organization/workload_identity_providers/{workload_identity_provider_id}/federation_rules/{workload_identity_federation_rule_id}',
    'DELETE',
  ] as const
}

export function useDeleteOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRulesWorkloadIdentityFederationRuleId<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<
          ReturnType<typeof client.organization.workload_identity_providers>['federation_rules']
        >['delete']
      >
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.workload_identity_providers>[0],
  params2: Parameters<
    ReturnType<typeof client.organization.workload_identity_providers>['federation_rules']
  >[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<
              ReturnType<typeof client.organization.workload_identity_providers>['federation_rules']
            >['delete']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<
            ReturnType<typeof client.organization.workload_identity_providers>['federation_rules']
          >['delete']
        >[0]
        options?: Parameters<
          ReturnType<
            ReturnType<typeof client.organization.workload_identity_providers>['federation_rules']
          >['delete']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey =
    customKey ??
    getDeleteOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRulesWorkloadIdentityFederationRuleIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<
              ReturnType<typeof client.organization.workload_identity_providers>['federation_rules']
            >['delete']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<
            ReturnType<typeof client.organization.workload_identity_providers>['federation_rules']
          >['delete']
        >[0]
        options?: Parameters<
          ReturnType<
            ReturnType<typeof client.organization.workload_identity_providers>['federation_rules']
          >['delete']
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
              ReturnType<
                ReturnType<
                  typeof client.organization.workload_identity_providers
                >['federation_rules']
              >['delete']
            >[0]
            options?: Parameters<
              ReturnType<
                ReturnType<
                  typeof client.organization.workload_identity_providers
                >['federation_rules']
              >['delete']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client.organization
          .workload_identity_providers(params)
          .federation_rules(params2)
          .delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetOrganizationUsageDecisionsKey(
  options: Parameters<typeof client.organization.usage.decisions.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['organization', '/organization/usage/decisions', keyArgs] as const
}

export function useGetOrganizationUsageDecisions<
  TError = Exclude<
    Awaited<ReturnType<typeof client.organization.usage.decisions.get>>['error'],
    null
  >,
>(options: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.organization.usage.decisions.get>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options: Parameters<typeof client.organization.usage.decisions.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationUsageDecisionsKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<typeof client.organization.usage.decisions.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization.usage.decisions.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetOrganizationUsageDecisions<
  TError = Exclude<
    Awaited<ReturnType<typeof client.organization.usage.decisions.get>>['error'],
    null
  >,
>(options: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.organization.usage.decisions.get>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options: Parameters<typeof client.organization.usage.decisions.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationUsageDecisionsKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<typeof client.organization.usage.decisions.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization.usage.decisions.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetOrganizationExternalStorageKey(
  options?: Parameters<typeof client.organization.external_storage.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['organization', '/organization/external_storage', keyArgs] as const
}

export function useGetOrganizationExternalStorage<
  TError = Exclude<
    Awaited<ReturnType<typeof client.organization.external_storage.get>>['error'],
    null
  >,
>(options?: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.organization.external_storage.get>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.organization.external_storage.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationExternalStorageKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<typeof client.organization.external_storage.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization.external_storage.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetOrganizationExternalStorage<
  TError = Exclude<
    Awaited<ReturnType<typeof client.organization.external_storage.get>>['error'],
    null
  >,
>(options?: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.organization.external_storage.get>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.organization.external_storage.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationExternalStorageKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<typeof client.organization.external_storage.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization.external_storage.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostOrganizationExternalStorageKey() {
  return ['organization', '/organization/external_storage', 'POST'] as const
}

export function usePostOrganizationExternalStorage<
  TError = Exclude<
    Awaited<ReturnType<typeof client.organization.external_storage.post>>['error'],
    null
  >,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.organization.external_storage.post>>,
      { error: null }
    >['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.organization.external_storage.post>[0]
      options?: Parameters<typeof client.organization.external_storage.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostOrganizationExternalStorageKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<typeof client.organization.external_storage.post>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.organization.external_storage.post>[0]
        options?: Parameters<typeof client.organization.external_storage.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.organization.external_storage.post>[0]
            options?: Parameters<typeof client.organization.external_storage.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.organization.external_storage.post(
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

export function getGetOrganizationExternalStorageExternalStorageIdKey(
  params: Parameters<typeof client.organization.external_storage>[0],
) {
  return ['organization', '/organization/external_storage/{external_storage_id}', params] as const
}

export function useGetOrganizationExternalStorageExternalStorageId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.external_storage>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.external_storage>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.external_storage>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.organization.external_storage>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationExternalStorageExternalStorageIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.external_storage>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization
          .external_storage(params)
          .get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetOrganizationExternalStorageExternalStorageId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.external_storage>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.external_storage>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.external_storage>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.organization.external_storage>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationExternalStorageExternalStorageIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.external_storage>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization
          .external_storage(params)
          .get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getDeleteOrganizationExternalStorageExternalStorageIdKey() {
  return ['organization', '/organization/external_storage/{external_storage_id}', 'DELETE'] as const
}

export function useDeleteOrganizationExternalStorageExternalStorageId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.external_storage>['delete']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.external_storage>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.external_storage>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.organization.external_storage>['delete']>[0]
        options?: Parameters<ReturnType<typeof client.organization.external_storage>['delete']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteOrganizationExternalStorageExternalStorageIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.external_storage>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.organization.external_storage>['delete']>[0]
        options?: Parameters<ReturnType<typeof client.organization.external_storage>['delete']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<ReturnType<typeof client.organization.external_storage>['delete']>[0]
            options?: Parameters<
              ReturnType<typeof client.organization.external_storage>['delete']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client.organization
          .external_storage(params)
          .delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostOrganizationExternalStorageExternalStorageIdValidateKey() {
  return [
    'organization',
    '/organization/external_storage/{external_storage_id}/validate',
    'POST',
  ] as const
}

export function usePostOrganizationExternalStorageExternalStorageIdValidate<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.organization.external_storage>['validate']['post']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.external_storage>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<typeof client.organization.external_storage>['validate']['post']>
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<typeof client.organization.external_storage>['validate']['post']
        >[0]
        options?: Parameters<
          ReturnType<typeof client.organization.external_storage>['validate']['post']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostOrganizationExternalStorageExternalStorageIdValidateKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<ReturnType<typeof client.organization.external_storage>['validate']['post']>
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<typeof client.organization.external_storage>['validate']['post']
        >[0]
        options?: Parameters<
          ReturnType<typeof client.organization.external_storage>['validate']['post']
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
              ReturnType<typeof client.organization.external_storage>['validate']['post']
            >[0]
            options?: Parameters<
              ReturnType<typeof client.organization.external_storage>['validate']['post']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client.organization
          .external_storage(params)
          .validate.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetOrganizationSpendLimitKey() {
  return ['organization', '/organization/spend_limit'] as const
}

export function useGetOrganizationSpendLimit<
  TError = Exclude<Awaited<ReturnType<typeof client.organization.spend_limit.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.organization.spend_limit.get>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.organization.spend_limit.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationSpendLimitKey()
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<typeof client.organization.spend_limit.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization.spend_limit.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetOrganizationSpendLimit<
  TError = Exclude<Awaited<ReturnType<typeof client.organization.spend_limit.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.organization.spend_limit.get>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.organization.spend_limit.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationSpendLimitKey()
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<typeof client.organization.spend_limit.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization.spend_limit.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostOrganizationSpendLimitKey() {
  return ['organization', '/organization/spend_limit', 'POST'] as const
}

export function usePostOrganizationSpendLimit<
  TError = Exclude<Awaited<ReturnType<typeof client.organization.spend_limit.post>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.organization.spend_limit.post>>,
      { error: null }
    >['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.organization.spend_limit.post>[0]
      options?: Parameters<typeof client.organization.spend_limit.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostOrganizationSpendLimitKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<typeof client.organization.spend_limit.post>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.organization.spend_limit.post>[0]
        options?: Parameters<typeof client.organization.spend_limit.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.organization.spend_limit.post>[0]
            options?: Parameters<typeof client.organization.spend_limit.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.organization.spend_limit.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getDeleteOrganizationSpendLimitKey() {
  return ['organization', '/organization/spend_limit', 'DELETE'] as const
}

export function useDeleteOrganizationSpendLimit<
  TError = Exclude<
    Awaited<ReturnType<typeof client.organization.spend_limit.delete>>['error'],
    null
  >,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.organization.spend_limit.delete>>,
      { error: null }
    >['data'],
    TError,
    Key,
    {
      body?: Parameters<typeof client.organization.spend_limit.delete>[0]
      options?: Parameters<typeof client.organization.spend_limit.delete>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteOrganizationSpendLimitKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<typeof client.organization.spend_limit.delete>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<typeof client.organization.spend_limit.delete>[0]
        options?: Parameters<typeof client.organization.spend_limit.delete>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<typeof client.organization.spend_limit.delete>[0]
            options?: Parameters<typeof client.organization.spend_limit.delete>[1]
          }
        },
      ) => {
        const { data, error } = await client.organization.spend_limit.delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetOrganizationProjectsProjectIdSpendLimitKey(
  params: Parameters<typeof client.organization.projects>[0],
) {
  return ['organization', '/organization/projects/{project_id}/spend_limit', params] as const
}

export function useGetOrganizationProjectsProjectIdSpendLimit<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.organization.projects>['spend_limit']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.projects>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.projects>['spend_limit']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.organization.projects>['spend_limit']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationProjectsProjectIdSpendLimitKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.projects>['spend_limit']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization
          .projects(params)
          .spend_limit.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetOrganizationProjectsProjectIdSpendLimit<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.organization.projects>['spend_limit']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.projects>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.projects>['spend_limit']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.organization.projects>['spend_limit']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationProjectsProjectIdSpendLimitKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.projects>['spend_limit']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization
          .projects(params)
          .spend_limit.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostOrganizationProjectsProjectIdSpendLimitKey() {
  return ['organization', '/organization/projects/{project_id}/spend_limit', 'POST'] as const
}

export function usePostOrganizationProjectsProjectIdSpendLimit<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.organization.projects>['spend_limit']['post']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.projects>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.projects>['spend_limit']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.organization.projects>['spend_limit']['post']>[0]
        options?: Parameters<
          ReturnType<typeof client.organization.projects>['spend_limit']['post']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostOrganizationProjectsProjectIdSpendLimitKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.organization.projects>['spend_limit']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.organization.projects>['spend_limit']['post']>[0]
        options?: Parameters<
          ReturnType<typeof client.organization.projects>['spend_limit']['post']
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
            body: Parameters<
              ReturnType<typeof client.organization.projects>['spend_limit']['post']
            >[0]
            options?: Parameters<
              ReturnType<typeof client.organization.projects>['spend_limit']['post']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client.organization
          .projects(params)
          .spend_limit.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getDeleteOrganizationProjectsProjectIdSpendLimitKey() {
  return ['organization', '/organization/projects/{project_id}/spend_limit', 'DELETE'] as const
}

export function useDeleteOrganizationProjectsProjectIdSpendLimit<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.organization.projects>['spend_limit']['delete']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.projects>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<typeof client.organization.projects>['spend_limit']['delete']>
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<typeof client.organization.projects>['spend_limit']['delete']
        >[0]
        options?: Parameters<
          ReturnType<typeof client.organization.projects>['spend_limit']['delete']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteOrganizationProjectsProjectIdSpendLimitKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<ReturnType<typeof client.organization.projects>['spend_limit']['delete']>
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<typeof client.organization.projects>['spend_limit']['delete']
        >[0]
        options?: Parameters<
          ReturnType<typeof client.organization.projects>['spend_limit']['delete']
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
              ReturnType<typeof client.organization.projects>['spend_limit']['delete']
            >[0]
            options?: Parameters<
              ReturnType<typeof client.organization.projects>['spend_limit']['delete']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client.organization
          .projects(params)
          .spend_limit.delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetOrganizationProjectsProjectIdServiceTierSettingsKey(
  params: Parameters<typeof client.organization.projects>[0],
) {
  return [
    'organization',
    '/organization/projects/{project_id}/service_tier_settings',
    params,
  ] as const
}

export function useGetOrganizationProjectsProjectIdServiceTierSettings<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.organization.projects>['service_tier_settings']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.projects>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<typeof client.organization.projects>['service_tier_settings']['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<typeof client.organization.projects>['service_tier_settings']['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationProjectsProjectIdServiceTierSettingsKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<typeof client.organization.projects>['service_tier_settings']['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization
          .projects(params)
          .service_tier_settings.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetOrganizationProjectsProjectIdServiceTierSettings<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.organization.projects>['service_tier_settings']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.projects>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<typeof client.organization.projects>['service_tier_settings']['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<typeof client.organization.projects>['service_tier_settings']['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetOrganizationProjectsProjectIdServiceTierSettingsKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<typeof client.organization.projects>['service_tier_settings']['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.organization
          .projects(params)
          .service_tier_settings.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostOrganizationProjectsProjectIdServiceTierSettingsKey() {
  return [
    'organization',
    '/organization/projects/{project_id}/service_tier_settings',
    'POST',
  ] as const
}

export function usePostOrganizationProjectsProjectIdServiceTierSettings<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.organization.projects>['service_tier_settings']['post']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.projects>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<typeof client.organization.projects>['service_tier_settings']['post']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<
          ReturnType<typeof client.organization.projects>['service_tier_settings']['post']
        >[0]
        options?: Parameters<
          ReturnType<typeof client.organization.projects>['service_tier_settings']['post']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostOrganizationProjectsProjectIdServiceTierSettingsKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<typeof client.organization.projects>['service_tier_settings']['post']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<
          ReturnType<typeof client.organization.projects>['service_tier_settings']['post']
        >[0]
        options?: Parameters<
          ReturnType<typeof client.organization.projects>['service_tier_settings']['post']
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
            body: Parameters<
              ReturnType<typeof client.organization.projects>['service_tier_settings']['post']
            >[0]
            options?: Parameters<
              ReturnType<typeof client.organization.projects>['service_tier_settings']['post']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client.organization
          .projects(params)
          .service_tier_settings.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostOrganizationProjectsProjectIdServiceAccountsServiceAccountIdApiKeysKey() {
  return [
    'organization',
    '/organization/projects/{project_id}/service_accounts/{service_account_id}/api_keys',
    'POST',
  ] as const
}

export function usePostOrganizationProjectsProjectIdServiceAccountsServiceAccountIdApiKeys<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<
          ReturnType<typeof client.organization.projects>['service_accounts']
        >['api_keys']['post']
      >
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.organization.projects>[0],
  params2: Parameters<ReturnType<typeof client.organization.projects>['service_accounts']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<
              ReturnType<typeof client.organization.projects>['service_accounts']
            >['api_keys']['post']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<
          ReturnType<
            ReturnType<typeof client.organization.projects>['service_accounts']
          >['api_keys']['post']
        >[0]
        options?: Parameters<
          ReturnType<
            ReturnType<typeof client.organization.projects>['service_accounts']
          >['api_keys']['post']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey =
    customKey ?? getPostOrganizationProjectsProjectIdServiceAccountsServiceAccountIdApiKeysKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<
              ReturnType<typeof client.organization.projects>['service_accounts']
            >['api_keys']['post']
          >
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<
          ReturnType<
            ReturnType<typeof client.organization.projects>['service_accounts']
          >['api_keys']['post']
        >[0]
        options?: Parameters<
          ReturnType<
            ReturnType<typeof client.organization.projects>['service_accounts']
          >['api_keys']['post']
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
            body: Parameters<
              ReturnType<
                ReturnType<typeof client.organization.projects>['service_accounts']
              >['api_keys']['post']
            >[0]
            options?: Parameters<
              ReturnType<
                ReturnType<typeof client.organization.projects>['service_accounts']
              >['api_keys']['post']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client.organization
          .projects(params)
          .service_accounts(params2)
          .api_keys.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostContentProvenanceChecksKey() {
  return ['content_provenance_checks', '/content_provenance_checks', 'POST'] as const
}

export function usePostContentProvenanceChecks<
  TError = Exclude<
    Awaited<ReturnType<typeof client.content_provenance_checks.post>>['error'],
    null
  >,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.content_provenance_checks.post>>,
      { error: null }
    >['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.content_provenance_checks.post>[0]
      options?: Parameters<typeof client.content_provenance_checks.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostContentProvenanceChecksKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<typeof client.content_provenance_checks.post>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.content_provenance_checks.post>[0]
        options?: Parameters<typeof client.content_provenance_checks.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.content_provenance_checks.post>[0]
            options?: Parameters<typeof client.content_provenance_checks.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.content_provenance_checks.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetVideosKey(options?: Parameters<typeof client.videos.get>[0]) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['videos', '/videos', keyArgs] as const
}

export function useGetVideos<
  TError = Exclude<Awaited<ReturnType<typeof client.videos.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.videos.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.videos.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetVideosKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<Awaited<ReturnType<typeof client.videos.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.videos.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetVideos<
  TError = Exclude<Awaited<ReturnType<typeof client.videos.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.videos.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.videos.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetVideosKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<Awaited<ReturnType<typeof client.videos.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.videos.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostVideosKey() {
  return ['videos', '/videos', 'POST'] as const
}

export function usePostVideos<
  TError = Exclude<Awaited<ReturnType<typeof client.videos.post>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.videos.post>>, { error: null }>['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.videos.post>[0]
      options?: Parameters<typeof client.videos.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostVideosKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<Awaited<ReturnType<typeof client.videos.post>>, { error: null }>['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.videos.post>[0]
        options?: Parameters<typeof client.videos.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.videos.post>[0]
            options?: Parameters<typeof client.videos.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.videos.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostVideosCharactersKey() {
  return ['videos', '/videos/characters', 'POST'] as const
}

export function usePostVideosCharacters<
  TError = Exclude<Awaited<ReturnType<typeof client.videos.characters.post>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.videos.characters.post>>, { error: null }>['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.videos.characters.post>[0]
      options?: Parameters<typeof client.videos.characters.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostVideosCharactersKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<Awaited<ReturnType<typeof client.videos.characters.post>>, { error: null }>['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.videos.characters.post>[0]
        options?: Parameters<typeof client.videos.characters.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.videos.characters.post>[0]
            options?: Parameters<typeof client.videos.characters.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.videos.characters.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetVideosCharactersCharacterIdKey(
  params: Parameters<typeof client.videos.characters>[0],
) {
  return ['videos', '/videos/characters/{character_id}', params] as const
}

export function useGetVideosCharactersCharacterId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.videos.characters>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.videos.characters>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.videos.characters>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.videos.characters>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetVideosCharactersCharacterIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.videos.characters>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.videos.characters(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetVideosCharactersCharacterId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.videos.characters>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.videos.characters>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.videos.characters>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.videos.characters>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetVideosCharactersCharacterIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.videos.characters>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.videos.characters(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostVideosEditsKey() {
  return ['videos', '/videos/edits', 'POST'] as const
}

export function usePostVideosEdits<
  TError = Exclude<Awaited<ReturnType<typeof client.videos.edits.post>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.videos.edits.post>>, { error: null }>['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.videos.edits.post>[0]
      options?: Parameters<typeof client.videos.edits.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostVideosEditsKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<Awaited<ReturnType<typeof client.videos.edits.post>>, { error: null }>['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.videos.edits.post>[0]
        options?: Parameters<typeof client.videos.edits.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.videos.edits.post>[0]
            options?: Parameters<typeof client.videos.edits.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.videos.edits.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostVideosExtensionsKey() {
  return ['videos', '/videos/extensions', 'POST'] as const
}

export function usePostVideosExtensions<
  TError = Exclude<Awaited<ReturnType<typeof client.videos.extensions.post>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.videos.extensions.post>>, { error: null }>['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.videos.extensions.post>[0]
      options?: Parameters<typeof client.videos.extensions.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostVideosExtensionsKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<Awaited<ReturnType<typeof client.videos.extensions.post>>, { error: null }>['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.videos.extensions.post>[0]
        options?: Parameters<typeof client.videos.extensions.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.videos.extensions.post>[0]
            options?: Parameters<typeof client.videos.extensions.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.videos.extensions.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetVideosVideoIdKey(params: Parameters<typeof client.videos>[0]) {
  return ['videos', '/videos/{video_id}', params] as const
}

export function useGetVideosVideoId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.videos>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.videos>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.videos>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.videos>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetVideosVideoIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.videos>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.videos(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetVideosVideoId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.videos>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.videos>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.videos>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.videos>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetVideosVideoIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.videos>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.videos(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getDeleteVideosVideoIdKey() {
  return ['videos', '/videos/{video_id}', 'DELETE'] as const
}

export function useDeleteVideosVideoId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.videos>['delete']>>['error'], null>,
>(
  params: Parameters<typeof client.videos>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.videos>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.videos>['delete']>[0]
        options?: Parameters<ReturnType<typeof client.videos>['delete']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteVideosVideoIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.videos>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.videos>['delete']>[0]
        options?: Parameters<ReturnType<typeof client.videos>['delete']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<ReturnType<typeof client.videos>['delete']>[0]
            options?: Parameters<ReturnType<typeof client.videos>['delete']>[1]
          }
        },
      ) => {
        const { data, error } = await client.videos(params).delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetVideosVideoIdContentKey(
  params: Parameters<typeof client.videos>[0],
  options?: Parameters<ReturnType<typeof client.videos>['content']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['videos', '/videos/{video_id}/content', params, keyArgs] as const
}

export function useGetVideosVideoIdContent<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.videos>['content']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.videos>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.videos>['content']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.videos>['content']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetVideosVideoIdContentKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.videos>['content']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.videos(params).content.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetVideosVideoIdContent<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.videos>['content']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.videos>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.videos>['content']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.videos>['content']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetVideosVideoIdContentKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.videos>['content']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.videos(params).content.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostVideosVideoIdRemixKey() {
  return ['videos', '/videos/{video_id}/remix', 'POST'] as const
}

export function usePostVideosVideoIdRemix<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.videos>['remix']['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.videos>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.videos>['remix']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.videos>['remix']['post']>[0]
        options?: Parameters<ReturnType<typeof client.videos>['remix']['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostVideosVideoIdRemixKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.videos>['remix']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.videos>['remix']['post']>[0]
        options?: Parameters<ReturnType<typeof client.videos>['remix']['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.videos>['remix']['post']>[0]
            options?: Parameters<ReturnType<typeof client.videos>['remix']['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client.videos(params).remix.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostResponsesInputTokensKey() {
  return ['responses', '/responses/input_tokens', 'POST'] as const
}

export function usePostResponsesInputTokens<
  TError = Exclude<Awaited<ReturnType<typeof client.responses.input_tokens.post>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.responses.input_tokens.post>>,
      { error: null }
    >['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.responses.input_tokens.post>[0]
      options?: Parameters<typeof client.responses.input_tokens.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostResponsesInputTokensKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<typeof client.responses.input_tokens.post>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.responses.input_tokens.post>[0]
        options?: Parameters<typeof client.responses.input_tokens.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.responses.input_tokens.post>[0]
            options?: Parameters<typeof client.responses.input_tokens.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.responses.input_tokens.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostResponsesCompactKey() {
  return ['responses', '/responses/compact', 'POST'] as const
}

export function usePostResponsesCompact<
  TError = Exclude<Awaited<ReturnType<typeof client.responses.compact.post>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.responses.compact.post>>, { error: null }>['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.responses.compact.post>[0]
      options?: Parameters<typeof client.responses.compact.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostResponsesCompactKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<Awaited<ReturnType<typeof client.responses.compact.post>>, { error: null }>['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.responses.compact.post>[0]
        options?: Parameters<typeof client.responses.compact.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.responses.compact.post>[0]
            options?: Parameters<typeof client.responses.compact.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.responses.compact.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetSkillsKey(options?: Parameters<typeof client.skills.get>[0]) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['skills', '/skills', keyArgs] as const
}

export function useGetSkills<
  TError = Exclude<Awaited<ReturnType<typeof client.skills.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.skills.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.skills.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetSkillsKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<Awaited<ReturnType<typeof client.skills.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.skills.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetSkills<
  TError = Exclude<Awaited<ReturnType<typeof client.skills.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.skills.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.skills.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetSkillsKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<Awaited<ReturnType<typeof client.skills.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.skills.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostSkillsKey() {
  return ['skills', '/skills', 'POST'] as const
}

export function usePostSkills<
  TError = Exclude<Awaited<ReturnType<typeof client.skills.post>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.skills.post>>, { error: null }>['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.skills.post>[0]
      options?: Parameters<typeof client.skills.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostSkillsKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<Awaited<ReturnType<typeof client.skills.post>>, { error: null }>['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.skills.post>[0]
        options?: Parameters<typeof client.skills.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.skills.post>[0]
            options?: Parameters<typeof client.skills.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.skills.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetSkillsSkillIdKey(params: Parameters<typeof client.skills>[0]) {
  return ['skills', '/skills/{skill_id}', params] as const
}

export function useGetSkillsSkillId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.skills>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.skills>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.skills>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.skills>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetSkillsSkillIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.skills>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.skills(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetSkillsSkillId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.skills>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.skills>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.skills>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.skills>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetSkillsSkillIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.skills>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.skills(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostSkillsSkillIdKey() {
  return ['skills', '/skills/{skill_id}', 'POST'] as const
}

export function usePostSkillsSkillId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.skills>['post']>>['error'], null>,
>(
  params: Parameters<typeof client.skills>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.skills>['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.skills>['post']>[0]
        options?: Parameters<ReturnType<typeof client.skills>['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostSkillsSkillIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.skills>['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.skills>['post']>[0]
        options?: Parameters<ReturnType<typeof client.skills>['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.skills>['post']>[0]
            options?: Parameters<ReturnType<typeof client.skills>['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client.skills(params).post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getDeleteSkillsSkillIdKey() {
  return ['skills', '/skills/{skill_id}', 'DELETE'] as const
}

export function useDeleteSkillsSkillId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.skills>['delete']>>['error'], null>,
>(
  params: Parameters<typeof client.skills>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.skills>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.skills>['delete']>[0]
        options?: Parameters<ReturnType<typeof client.skills>['delete']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteSkillsSkillIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.skills>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.skills>['delete']>[0]
        options?: Parameters<ReturnType<typeof client.skills>['delete']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<ReturnType<typeof client.skills>['delete']>[0]
            options?: Parameters<ReturnType<typeof client.skills>['delete']>[1]
          }
        },
      ) => {
        const { data, error } = await client.skills(params).delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetSkillsSkillIdContentKey(params: Parameters<typeof client.skills>[0]) {
  return ['skills', '/skills/{skill_id}/content', params] as const
}

export function useGetSkillsSkillIdContent<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.skills>['content']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.skills>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.skills>['content']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.skills>['content']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetSkillsSkillIdContentKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.skills>['content']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.skills(params).content.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetSkillsSkillIdContent<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.skills>['content']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.skills>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.skills>['content']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.skills>['content']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetSkillsSkillIdContentKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.skills>['content']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.skills(params).content.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetSkillsSkillIdVersionsKey(
  params: Parameters<typeof client.skills>[0],
  options?: Parameters<ReturnType<typeof client.skills>['versions']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['skills', '/skills/{skill_id}/versions', params, keyArgs] as const
}

export function useGetSkillsSkillIdVersions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.skills>['versions']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.skills>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.skills>['versions']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.skills>['versions']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetSkillsSkillIdVersionsKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.skills>['versions']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.skills(params).versions.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetSkillsSkillIdVersions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.skills>['versions']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.skills>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.skills>['versions']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.skills>['versions']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetSkillsSkillIdVersionsKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.skills>['versions']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.skills(params).versions.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostSkillsSkillIdVersionsKey() {
  return ['skills', '/skills/{skill_id}/versions', 'POST'] as const
}

export function usePostSkillsSkillIdVersions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.skills>['versions']['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.skills>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.skills>['versions']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.skills>['versions']['post']>[0]
        options?: Parameters<ReturnType<typeof client.skills>['versions']['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostSkillsSkillIdVersionsKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.skills>['versions']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.skills>['versions']['post']>[0]
        options?: Parameters<ReturnType<typeof client.skills>['versions']['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.skills>['versions']['post']>[0]
            options?: Parameters<ReturnType<typeof client.skills>['versions']['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client.skills(params).versions.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetSkillsSkillIdVersionsVersionKey(
  params: Parameters<typeof client.skills>[0],
  params2: Parameters<ReturnType<typeof client.skills>['versions']>[0],
) {
  return ['skills', '/skills/{skill_id}/versions/{version}', params, params2] as const
}

export function useGetSkillsSkillIdVersionsVersion<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.skills>['versions']>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.skills>[0],
  params2: Parameters<ReturnType<typeof client.skills>['versions']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.skills>['versions']>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<ReturnType<typeof client.skills>['versions']>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetSkillsSkillIdVersionsVersionKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.skills>['versions']>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.skills(params).versions(params2).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetSkillsSkillIdVersionsVersion<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.skills>['versions']>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.skills>[0],
  params2: Parameters<ReturnType<typeof client.skills>['versions']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.skills>['versions']>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<ReturnType<typeof client.skills>['versions']>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetSkillsSkillIdVersionsVersionKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.skills>['versions']>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.skills(params).versions(params2).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getDeleteSkillsSkillIdVersionsVersionKey() {
  return ['skills', '/skills/{skill_id}/versions/{version}', 'DELETE'] as const
}

export function useDeleteSkillsSkillIdVersionsVersion<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.skills>['versions']>['delete']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.skills>[0],
  params2: Parameters<ReturnType<typeof client.skills>['versions']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.skills>['versions']>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<ReturnType<typeof client.skills>['versions']>['delete']>[0]
        options?: Parameters<ReturnType<ReturnType<typeof client.skills>['versions']>['delete']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteSkillsSkillIdVersionsVersionKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.skills>['versions']>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<ReturnType<typeof client.skills>['versions']>['delete']>[0]
        options?: Parameters<ReturnType<ReturnType<typeof client.skills>['versions']>['delete']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<ReturnType<ReturnType<typeof client.skills>['versions']>['delete']>[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.skills>['versions']>['delete']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .skills(params)
          .versions(params2)
          .delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetSkillsSkillIdVersionsVersionContentKey(
  params: Parameters<typeof client.skills>[0],
  params2: Parameters<ReturnType<typeof client.skills>['versions']>[0],
) {
  return ['skills', '/skills/{skill_id}/versions/{version}/content', params, params2] as const
}

export function useGetSkillsSkillIdVersionsVersionContent<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.skills>['versions']>['content']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.skills>[0],
  params2: Parameters<ReturnType<typeof client.skills>['versions']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.skills>['versions']>['content']['get']>
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<typeof client.skills>['versions']>['content']['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetSkillsSkillIdVersionsVersionContentKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.skills>['versions']>['content']['get']>
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client
          .skills(params)
          .versions(params2)
          .content.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetSkillsSkillIdVersionsVersionContent<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.skills>['versions']>['content']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.skills>[0],
  params2: Parameters<ReturnType<typeof client.skills>['versions']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.skills>['versions']>['content']['get']>
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<typeof client.skills>['versions']>['content']['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetSkillsSkillIdVersionsVersionContentKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.skills>['versions']>['content']['get']>
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client
          .skills(params)
          .versions(params2)
          .content.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostChatkitSessionsSessionIdCancelKey() {
  return ['chatkit', '/chatkit/sessions/{session_id}/cancel', 'POST'] as const
}

export function usePostChatkitSessionsSessionIdCancel<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.chatkit.sessions>['cancel']['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.chatkit.sessions>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.chatkit.sessions>['cancel']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.chatkit.sessions>['cancel']['post']>[0]
        options?: Parameters<ReturnType<typeof client.chatkit.sessions>['cancel']['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostChatkitSessionsSessionIdCancelKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.chatkit.sessions>['cancel']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.chatkit.sessions>['cancel']['post']>[0]
        options?: Parameters<ReturnType<typeof client.chatkit.sessions>['cancel']['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<ReturnType<typeof client.chatkit.sessions>['cancel']['post']>[0]
            options?: Parameters<ReturnType<typeof client.chatkit.sessions>['cancel']['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client.chatkit
          .sessions(params)
          .cancel.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostChatkitSessionsKey() {
  return ['chatkit', '/chatkit/sessions', 'POST'] as const
}

export function usePostChatkitSessions<
  TError = Exclude<Awaited<ReturnType<typeof client.chatkit.sessions.post>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.chatkit.sessions.post>>, { error: null }>['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.chatkit.sessions.post>[0]
      options?: Parameters<typeof client.chatkit.sessions.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostChatkitSessionsKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<Awaited<ReturnType<typeof client.chatkit.sessions.post>>, { error: null }>['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.chatkit.sessions.post>[0]
        options?: Parameters<typeof client.chatkit.sessions.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.chatkit.sessions.post>[0]
            options?: Parameters<typeof client.chatkit.sessions.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.chatkit.sessions.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetChatkitThreadsThreadIdItemsKey(
  params: Parameters<typeof client.chatkit.threads>[0],
  options?: Parameters<ReturnType<typeof client.chatkit.threads>['items']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['chatkit', '/chatkit/threads/{thread_id}/items', params, keyArgs] as const
}

export function useGetChatkitThreadsThreadIdItems<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.chatkit.threads>['items']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.chatkit.threads>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.chatkit.threads>['items']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.chatkit.threads>['items']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetChatkitThreadsThreadIdItemsKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.chatkit.threads>['items']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.chatkit.threads(params).items.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetChatkitThreadsThreadIdItems<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.chatkit.threads>['items']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.chatkit.threads>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.chatkit.threads>['items']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.chatkit.threads>['items']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetChatkitThreadsThreadIdItemsKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.chatkit.threads>['items']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.chatkit.threads(params).items.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetChatkitThreadsThreadIdKey(
  params: Parameters<typeof client.chatkit.threads>[0],
) {
  return ['chatkit', '/chatkit/threads/{thread_id}', params] as const
}

export function useGetChatkitThreadsThreadId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.chatkit.threads>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.chatkit.threads>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.chatkit.threads>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.chatkit.threads>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetChatkitThreadsThreadIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.chatkit.threads>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.chatkit.threads(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetChatkitThreadsThreadId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.chatkit.threads>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.chatkit.threads>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.chatkit.threads>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.chatkit.threads>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetChatkitThreadsThreadIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.chatkit.threads>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.chatkit.threads(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getDeleteChatkitThreadsThreadIdKey() {
  return ['chatkit', '/chatkit/threads/{thread_id}', 'DELETE'] as const
}

export function useDeleteChatkitThreadsThreadId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.chatkit.threads>['delete']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.chatkit.threads>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.chatkit.threads>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.chatkit.threads>['delete']>[0]
        options?: Parameters<ReturnType<typeof client.chatkit.threads>['delete']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteChatkitThreadsThreadIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.chatkit.threads>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.chatkit.threads>['delete']>[0]
        options?: Parameters<ReturnType<typeof client.chatkit.threads>['delete']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<ReturnType<typeof client.chatkit.threads>['delete']>[0]
            options?: Parameters<ReturnType<typeof client.chatkit.threads>['delete']>[1]
          }
        },
      ) => {
        const { data, error } = await client.chatkit.threads(params).delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetChatkitThreadsKey(
  options?: Parameters<typeof client.chatkit.threads.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['chatkit', '/chatkit/threads', keyArgs] as const
}

export function useGetChatkitThreads<
  TError = Exclude<Awaited<ReturnType<typeof client.chatkit.threads.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.chatkit.threads.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.chatkit.threads.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetChatkitThreadsKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<Awaited<ReturnType<typeof client.chatkit.threads.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.chatkit.threads.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetChatkitThreads<
  TError = Exclude<Awaited<ReturnType<typeof client.chatkit.threads.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.chatkit.threads.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.chatkit.threads.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetChatkitThreadsKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<Awaited<ReturnType<typeof client.chatkit.threads.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.chatkit.threads.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostDecisionsKey() {
  return ['decisions', '/decisions', 'POST'] as const
}

export function usePostDecisions<
  TError = Exclude<Awaited<ReturnType<typeof client.decisions.post>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.decisions.post>>, { error: null }>['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.decisions.post>[0]
      options?: Parameters<typeof client.decisions.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostDecisionsKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<Awaited<ReturnType<typeof client.decisions.post>>, { error: null }>['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.decisions.post>[0]
        options?: Parameters<typeof client.decisions.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.decisions.post>[0]
            options?: Parameters<typeof client.decisions.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.decisions.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetAgentsAutomationsKey(
  options?: Parameters<typeof client.agents.automations.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['agents', '/agents/automations', keyArgs] as const
}

export function useGetAgentsAutomations<
  TError = Exclude<Awaited<ReturnType<typeof client.agents.automations.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.agents.automations.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.agents.automations.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetAgentsAutomationsKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<Awaited<ReturnType<typeof client.agents.automations.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.agents.automations.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetAgentsAutomations<
  TError = Exclude<Awaited<ReturnType<typeof client.agents.automations.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.agents.automations.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.agents.automations.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetAgentsAutomationsKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<Awaited<ReturnType<typeof client.agents.automations.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.agents.automations.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostAgentsAutomationsKey() {
  return ['agents', '/agents/automations', 'POST'] as const
}

export function usePostAgentsAutomations<
  TError = Exclude<Awaited<ReturnType<typeof client.agents.automations.post>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.agents.automations.post>>, { error: null }>['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.agents.automations.post>[0]
      options?: Parameters<typeof client.agents.automations.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostAgentsAutomationsKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<Awaited<ReturnType<typeof client.agents.automations.post>>, { error: null }>['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.agents.automations.post>[0]
        options?: Parameters<typeof client.agents.automations.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.agents.automations.post>[0]
            options?: Parameters<typeof client.agents.automations.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.agents.automations.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetAgentsAutomationsAutomationIdKey(
  params: Parameters<typeof client.agents.automations>[0],
) {
  return ['agents', '/agents/automations/{automation_id}', params] as const
}

export function useGetAgentsAutomationsAutomationId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.agents.automations>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.agents.automations>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.agents.automations>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.agents.automations>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetAgentsAutomationsAutomationIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.agents.automations>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.agents.automations(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetAgentsAutomationsAutomationId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.agents.automations>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.agents.automations>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.agents.automations>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.agents.automations>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetAgentsAutomationsAutomationIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.agents.automations>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.agents.automations(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostAgentsAutomationsAutomationIdKey() {
  return ['agents', '/agents/automations/{automation_id}', 'POST'] as const
}

export function usePostAgentsAutomationsAutomationId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.agents.automations>['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.agents.automations>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.agents.automations>['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.agents.automations>['post']>[0]
        options?: Parameters<ReturnType<typeof client.agents.automations>['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostAgentsAutomationsAutomationIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.agents.automations>['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.agents.automations>['post']>[0]
        options?: Parameters<ReturnType<typeof client.agents.automations>['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.agents.automations>['post']>[0]
            options?: Parameters<ReturnType<typeof client.agents.automations>['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client.agents.automations(params).post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getDeleteAgentsAutomationsAutomationIdKey() {
  return ['agents', '/agents/automations/{automation_id}', 'DELETE'] as const
}

export function useDeleteAgentsAutomationsAutomationId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.agents.automations>['delete']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.agents.automations>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.agents.automations>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.agents.automations>['delete']>[0]
        options?: Parameters<ReturnType<typeof client.agents.automations>['delete']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteAgentsAutomationsAutomationIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.agents.automations>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.agents.automations>['delete']>[0]
        options?: Parameters<ReturnType<typeof client.agents.automations>['delete']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<ReturnType<typeof client.agents.automations>['delete']>[0]
            options?: Parameters<ReturnType<typeof client.agents.automations>['delete']>[1]
          }
        },
      ) => {
        const { data, error } = await client.agents
          .automations(params)
          .delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostAgentsAutomationsAutomationIdPauseKey() {
  return ['agents', '/agents/automations/{automation_id}/pause', 'POST'] as const
}

export function usePostAgentsAutomationsAutomationIdPause<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.agents.automations>['pause']['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.agents.automations>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.agents.automations>['pause']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.agents.automations>['pause']['post']>[0]
        options?: Parameters<ReturnType<typeof client.agents.automations>['pause']['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostAgentsAutomationsAutomationIdPauseKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.agents.automations>['pause']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.agents.automations>['pause']['post']>[0]
        options?: Parameters<ReturnType<typeof client.agents.automations>['pause']['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<ReturnType<typeof client.agents.automations>['pause']['post']>[0]
            options?: Parameters<ReturnType<typeof client.agents.automations>['pause']['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client.agents
          .automations(params)
          .pause.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostAgentsAutomationsAutomationIdResumeKey() {
  return ['agents', '/agents/automations/{automation_id}/resume', 'POST'] as const
}

export function usePostAgentsAutomationsAutomationIdResume<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.agents.automations>['resume']['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.agents.automations>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.agents.automations>['resume']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.agents.automations>['resume']['post']>[0]
        options?: Parameters<ReturnType<typeof client.agents.automations>['resume']['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostAgentsAutomationsAutomationIdResumeKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.agents.automations>['resume']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.agents.automations>['resume']['post']>[0]
        options?: Parameters<ReturnType<typeof client.agents.automations>['resume']['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<ReturnType<typeof client.agents.automations>['resume']['post']>[0]
            options?: Parameters<ReturnType<typeof client.agents.automations>['resume']['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client.agents
          .automations(params)
          .resume.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetAgentsAutomationsAutomationIdInvocationsKey(
  params: Parameters<typeof client.agents.automations>[0],
  options?: Parameters<ReturnType<typeof client.agents.automations>['invocations']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['agents', '/agents/automations/{automation_id}/invocations', params, keyArgs] as const
}

export function useGetAgentsAutomationsAutomationIdInvocations<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.agents.automations>['invocations']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.agents.automations>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.agents.automations>['invocations']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.agents.automations>['invocations']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetAgentsAutomationsAutomationIdInvocationsKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.agents.automations>['invocations']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.agents
          .automations(params)
          .invocations.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetAgentsAutomationsAutomationIdInvocations<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.agents.automations>['invocations']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.agents.automations>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.agents.automations>['invocations']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.agents.automations>['invocations']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetAgentsAutomationsAutomationIdInvocationsKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.agents.automations>['invocations']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.agents
          .automations(params)
          .invocations.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostAgentsAutomationsAutomationIdInvocationsKey() {
  return ['agents', '/agents/automations/{automation_id}/invocations', 'POST'] as const
}

export function usePostAgentsAutomationsAutomationIdInvocations<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.agents.automations>['invocations']['post']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.agents.automations>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.agents.automations>['invocations']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.agents.automations>['invocations']['post']>[0]
        options?: Parameters<ReturnType<typeof client.agents.automations>['invocations']['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostAgentsAutomationsAutomationIdInvocationsKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.agents.automations>['invocations']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.agents.automations>['invocations']['post']>[0]
        options?: Parameters<ReturnType<typeof client.agents.automations>['invocations']['post']>[1]
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
              ReturnType<typeof client.agents.automations>['invocations']['post']
            >[0]
            options?: Parameters<
              ReturnType<typeof client.agents.automations>['invocations']['post']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client.agents
          .automations(params)
          .invocations.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetAgentsAutomationsAutomationIdInvocationsInvocationIdKey(
  params: Parameters<typeof client.agents.automations>[0],
  params2: Parameters<ReturnType<typeof client.agents.automations>['invocations']>[0],
) {
  return [
    'agents',
    '/agents/automations/{automation_id}/invocations/{invocation_id}',
    params,
    params2,
  ] as const
}

export function useGetAgentsAutomationsAutomationIdInvocationsInvocationId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.agents.automations>['invocations']>['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.agents.automations>[0],
  params2: Parameters<ReturnType<typeof client.agents.automations>['invocations']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.agents.automations>['invocations']>['get']>
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<typeof client.agents.automations>['invocations']>['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetAgentsAutomationsAutomationIdInvocationsInvocationIdKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.agents.automations>['invocations']>['get']>
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.agents
          .automations(params)
          .invocations(params2)
          .get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetAgentsAutomationsAutomationIdInvocationsInvocationId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.agents.automations>['invocations']>['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.agents.automations>[0],
  params2: Parameters<ReturnType<typeof client.agents.automations>['invocations']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.agents.automations>['invocations']>['get']>
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<typeof client.agents.automations>['invocations']>['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetAgentsAutomationsAutomationIdInvocationsInvocationIdKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.agents.automations>['invocations']>['get']>
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.agents
          .automations(params)
          .invocations(params2)
          .get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetAgentsEnvironmentsKey(
  options?: Parameters<typeof client.agents.environments.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['agents', '/agents/environments', keyArgs] as const
}

export function useGetAgentsEnvironments<
  TError = Exclude<Awaited<ReturnType<typeof client.agents.environments.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.agents.environments.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.agents.environments.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetAgentsEnvironmentsKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<Awaited<ReturnType<typeof client.agents.environments.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.agents.environments.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetAgentsEnvironments<
  TError = Exclude<Awaited<ReturnType<typeof client.agents.environments.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.agents.environments.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.agents.environments.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetAgentsEnvironmentsKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<Awaited<ReturnType<typeof client.agents.environments.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.agents.environments.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostAgentsEnvironmentsKey() {
  return ['agents', '/agents/environments', 'POST'] as const
}

export function usePostAgentsEnvironments<
  TError = Exclude<Awaited<ReturnType<typeof client.agents.environments.post>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.agents.environments.post>>, { error: null }>['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.agents.environments.post>[0]
      options?: Parameters<typeof client.agents.environments.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostAgentsEnvironmentsKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<Awaited<ReturnType<typeof client.agents.environments.post>>, { error: null }>['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.agents.environments.post>[0]
        options?: Parameters<typeof client.agents.environments.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.agents.environments.post>[0]
            options?: Parameters<typeof client.agents.environments.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.agents.environments.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetAgentsEnvironmentsEnvironmentIdKey(
  params: Parameters<typeof client.agents.environments>[0],
) {
  return ['agents', '/agents/environments/{environment_id}', params] as const
}

export function useGetAgentsEnvironmentsEnvironmentId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.agents.environments>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.agents.environments>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.agents.environments>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.agents.environments>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetAgentsEnvironmentsEnvironmentIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.agents.environments>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.agents.environments(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetAgentsEnvironmentsEnvironmentId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.agents.environments>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.agents.environments>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.agents.environments>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.agents.environments>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetAgentsEnvironmentsEnvironmentIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.agents.environments>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.agents.environments(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetAgentsEnvironmentsEnvironmentIdFilesKey(
  params: Parameters<typeof client.agents.environments>[0],
  options?: Parameters<ReturnType<typeof client.agents.environments>['files']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['agents', '/agents/environments/{environment_id}/files', params, keyArgs] as const
}

export function useGetAgentsEnvironmentsEnvironmentIdFiles<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.agents.environments>['files']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.agents.environments>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.agents.environments>['files']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.agents.environments>['files']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetAgentsEnvironmentsEnvironmentIdFilesKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.agents.environments>['files']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.agents.environments(params).files.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetAgentsEnvironmentsEnvironmentIdFiles<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.agents.environments>['files']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.agents.environments>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.agents.environments>['files']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.agents.environments>['files']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetAgentsEnvironmentsEnvironmentIdFilesKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.agents.environments>['files']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.agents.environments(params).files.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostAgentsEnvironmentsEnvironmentIdFilesKey() {
  return ['agents', '/agents/environments/{environment_id}/files', 'POST'] as const
}

export function usePostAgentsEnvironmentsEnvironmentIdFiles<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.agents.environments>['files']['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.agents.environments>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.agents.environments>['files']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.agents.environments>['files']['post']>[0]
        options?: Parameters<ReturnType<typeof client.agents.environments>['files']['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostAgentsEnvironmentsEnvironmentIdFilesKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.agents.environments>['files']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.agents.environments>['files']['post']>[0]
        options?: Parameters<ReturnType<typeof client.agents.environments>['files']['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.agents.environments>['files']['post']>[0]
            options?: Parameters<ReturnType<typeof client.agents.environments>['files']['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client.agents
          .environments(params)
          .files.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetAgentsSessionsSessionIdSubagentsKey(
  params: Parameters<typeof client.agents.sessions>[0],
  options?: Parameters<ReturnType<typeof client.agents.sessions>['subagents']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['agents', '/agents/sessions/{session_id}/subagents', params, keyArgs] as const
}

export function useGetAgentsSessionsSessionIdSubagents<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['subagents']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.agents.sessions>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['subagents']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.agents.sessions>['subagents']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetAgentsSessionsSessionIdSubagentsKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['subagents']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.agents.sessions(params).subagents.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetAgentsSessionsSessionIdSubagents<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['subagents']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.agents.sessions>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['subagents']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.agents.sessions>['subagents']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetAgentsSessionsSessionIdSubagentsKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['subagents']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.agents.sessions(params).subagents.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetAgentsSessionsSessionIdSubagentsSubagentIdKey(
  params: Parameters<typeof client.agents.sessions>[0],
  params2: Parameters<ReturnType<typeof client.agents.sessions>['subagents']>[0],
) {
  return [
    'agents',
    '/agents/sessions/{session_id}/subagents/{subagent_id}',
    params,
    params2,
  ] as const
}

export function useGetAgentsSessionsSessionIdSubagentsSubagentId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.agents.sessions>['subagents']>['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.agents.sessions>[0],
  params2: Parameters<ReturnType<typeof client.agents.sessions>['subagents']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.agents.sessions>['subagents']>['get']>
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<typeof client.agents.sessions>['subagents']>['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetAgentsSessionsSessionIdSubagentsSubagentIdKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.agents.sessions>['subagents']>['get']>
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.agents
          .sessions(params)
          .subagents(params2)
          .get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetAgentsSessionsSessionIdSubagentsSubagentId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.agents.sessions>['subagents']>['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.agents.sessions>[0],
  params2: Parameters<ReturnType<typeof client.agents.sessions>['subagents']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.agents.sessions>['subagents']>['get']>
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<typeof client.agents.sessions>['subagents']>['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetAgentsSessionsSessionIdSubagentsSubagentIdKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.agents.sessions>['subagents']>['get']>
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.agents
          .sessions(params)
          .subagents(params2)
          .get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetAgentsSessionsSessionIdSubagentsSubagentIdItemsKey(
  params: Parameters<typeof client.agents.sessions>[0],
  params2: Parameters<ReturnType<typeof client.agents.sessions>['subagents']>[0],
  options?: Parameters<
    ReturnType<ReturnType<typeof client.agents.sessions>['subagents']>['items']['get']
  >[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'agents',
    '/agents/sessions/{session_id}/subagents/{subagent_id}/items',
    params,
    params2,
    keyArgs,
  ] as const
}

export function useGetAgentsSessionsSessionIdSubagentsSubagentIdItems<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.agents.sessions>['subagents']>['items']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.agents.sessions>[0],
  params2: Parameters<ReturnType<typeof client.agents.sessions>['subagents']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<typeof client.agents.sessions>['subagents']>['items']['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<typeof client.agents.sessions>['subagents']>['items']['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetAgentsSessionsSessionIdSubagentsSubagentIdItemsKey(params, params2, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<typeof client.agents.sessions>['subagents']>['items']['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.agents
          .sessions(params)
          .subagents(params2)
          .items.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetAgentsSessionsSessionIdSubagentsSubagentIdItems<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.agents.sessions>['subagents']>['items']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.agents.sessions>[0],
  params2: Parameters<ReturnType<typeof client.agents.sessions>['subagents']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<typeof client.agents.sessions>['subagents']>['items']['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<typeof client.agents.sessions>['subagents']>['items']['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetAgentsSessionsSessionIdSubagentsSubagentIdItemsKey(params, params2, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<typeof client.agents.sessions>['subagents']>['items']['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.agents
          .sessions(params)
          .subagents(params2)
          .items.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetAgentsSessionsSessionIdSubagentsSubagentIdTurnsKey(
  params: Parameters<typeof client.agents.sessions>[0],
  params2: Parameters<ReturnType<typeof client.agents.sessions>['subagents']>[0],
  options?: Parameters<
    ReturnType<ReturnType<typeof client.agents.sessions>['subagents']>['turns']['get']
  >[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'agents',
    '/agents/sessions/{session_id}/subagents/{subagent_id}/turns',
    params,
    params2,
    keyArgs,
  ] as const
}

export function useGetAgentsSessionsSessionIdSubagentsSubagentIdTurns<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.agents.sessions>['subagents']>['turns']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.agents.sessions>[0],
  params2: Parameters<ReturnType<typeof client.agents.sessions>['subagents']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<typeof client.agents.sessions>['subagents']>['turns']['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<typeof client.agents.sessions>['subagents']>['turns']['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetAgentsSessionsSessionIdSubagentsSubagentIdTurnsKey(params, params2, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<typeof client.agents.sessions>['subagents']>['turns']['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.agents
          .sessions(params)
          .subagents(params2)
          .turns.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetAgentsSessionsSessionIdSubagentsSubagentIdTurns<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.agents.sessions>['subagents']>['turns']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.agents.sessions>[0],
  params2: Parameters<ReturnType<typeof client.agents.sessions>['subagents']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<typeof client.agents.sessions>['subagents']>['turns']['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<typeof client.agents.sessions>['subagents']>['turns']['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetAgentsSessionsSessionIdSubagentsSubagentIdTurnsKey(params, params2, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<typeof client.agents.sessions>['subagents']>['turns']['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.agents
          .sessions(params)
          .subagents(params2)
          .turns.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetAgentsSessionsSessionIdSubagentsSubagentIdTurnsTurnIdKey(
  params: Parameters<typeof client.agents.sessions>[0],
  params2: Parameters<ReturnType<typeof client.agents.sessions>['subagents']>[0],
  params3: Parameters<
    ReturnType<ReturnType<typeof client.agents.sessions>['subagents']>['turns']
  >[0],
) {
  return [
    'agents',
    '/agents/sessions/{session_id}/subagents/{subagent_id}/turns/{turn_id}',
    params,
    params2,
    params3,
  ] as const
}

export function useGetAgentsSessionsSessionIdSubagentsSubagentIdTurnsTurnId<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<
          ReturnType<ReturnType<typeof client.agents.sessions>['subagents']>['turns']
        >['get']
      >
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.agents.sessions>[0],
  params2: Parameters<ReturnType<typeof client.agents.sessions>['subagents']>[0],
  params3: Parameters<
    ReturnType<ReturnType<typeof client.agents.sessions>['subagents']>['turns']
  >[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<
              ReturnType<ReturnType<typeof client.agents.sessions>['subagents']>['turns']
            >['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<ReturnType<typeof client.agents.sessions>['subagents']>['turns']>['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetAgentsSessionsSessionIdSubagentsSubagentIdTurnsTurnIdKey(params, params2, params3)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<
              ReturnType<ReturnType<typeof client.agents.sessions>['subagents']>['turns']
            >['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.agents
          .sessions(params)
          .subagents(params2)
          .turns(params3)
          .get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetAgentsSessionsSessionIdSubagentsSubagentIdTurnsTurnId<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<
          ReturnType<ReturnType<typeof client.agents.sessions>['subagents']>['turns']
        >['get']
      >
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.agents.sessions>[0],
  params2: Parameters<ReturnType<typeof client.agents.sessions>['subagents']>[0],
  params3: Parameters<
    ReturnType<ReturnType<typeof client.agents.sessions>['subagents']>['turns']
  >[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<
              ReturnType<ReturnType<typeof client.agents.sessions>['subagents']>['turns']
            >['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<ReturnType<typeof client.agents.sessions>['subagents']>['turns']>['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetAgentsSessionsSessionIdSubagentsSubagentIdTurnsTurnIdKey(params, params2, params3)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<
              ReturnType<ReturnType<typeof client.agents.sessions>['subagents']>['turns']
            >['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.agents
          .sessions(params)
          .subagents(params2)
          .turns(params3)
          .get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetAgentsSessionsSessionIdSubagentsSubagentIdTurnsTurnIdItemsKey(
  params: Parameters<typeof client.agents.sessions>[0],
  params2: Parameters<ReturnType<typeof client.agents.sessions>['subagents']>[0],
  params3: Parameters<
    ReturnType<ReturnType<typeof client.agents.sessions>['subagents']>['turns']
  >[0],
  options?: Parameters<
    ReturnType<
      ReturnType<ReturnType<typeof client.agents.sessions>['subagents']>['turns']
    >['items']['get']
  >[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'agents',
    '/agents/sessions/{session_id}/subagents/{subagent_id}/turns/{turn_id}/items',
    params,
    params2,
    params3,
    keyArgs,
  ] as const
}

export function useGetAgentsSessionsSessionIdSubagentsSubagentIdTurnsTurnIdItems<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<
          ReturnType<ReturnType<typeof client.agents.sessions>['subagents']>['turns']
        >['items']['get']
      >
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.agents.sessions>[0],
  params2: Parameters<ReturnType<typeof client.agents.sessions>['subagents']>[0],
  params3: Parameters<
    ReturnType<ReturnType<typeof client.agents.sessions>['subagents']>['turns']
  >[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<
              ReturnType<ReturnType<typeof client.agents.sessions>['subagents']>['turns']
            >['items']['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<
        ReturnType<ReturnType<typeof client.agents.sessions>['subagents']>['turns']
      >['items']['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetAgentsSessionsSessionIdSubagentsSubagentIdTurnsTurnIdItemsKey(
            params,
            params2,
            params3,
            clientOptions,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<
              ReturnType<ReturnType<typeof client.agents.sessions>['subagents']>['turns']
            >['items']['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.agents
          .sessions(params)
          .subagents(params2)
          .turns(params3)
          .items.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetAgentsSessionsSessionIdSubagentsSubagentIdTurnsTurnIdItems<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<
          ReturnType<ReturnType<typeof client.agents.sessions>['subagents']>['turns']
        >['items']['get']
      >
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.agents.sessions>[0],
  params2: Parameters<ReturnType<typeof client.agents.sessions>['subagents']>[0],
  params3: Parameters<
    ReturnType<ReturnType<typeof client.agents.sessions>['subagents']>['turns']
  >[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<
              ReturnType<ReturnType<typeof client.agents.sessions>['subagents']>['turns']
            >['items']['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<
        ReturnType<ReturnType<typeof client.agents.sessions>['subagents']>['turns']
      >['items']['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetAgentsSessionsSessionIdSubagentsSubagentIdTurnsTurnIdItemsKey(
            params,
            params2,
            params3,
            clientOptions,
          )
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<
              ReturnType<ReturnType<typeof client.agents.sessions>['subagents']>['turns']
            >['items']['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.agents
          .sessions(params)
          .subagents(params2)
          .turns(params3)
          .items.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetAgentsKey(options?: Parameters<typeof client.agents.get>[0]) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['agents', '/agents', keyArgs] as const
}

export function useGetAgents<
  TError = Exclude<Awaited<ReturnType<typeof client.agents.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.agents.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.agents.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetAgentsKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<Awaited<ReturnType<typeof client.agents.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.agents.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetAgents<
  TError = Exclude<Awaited<ReturnType<typeof client.agents.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.agents.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.agents.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetAgentsKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<Awaited<ReturnType<typeof client.agents.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.agents.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostAgentsKey() {
  return ['agents', '/agents', 'POST'] as const
}

export function usePostAgents<
  TError = Exclude<Awaited<ReturnType<typeof client.agents.post>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.agents.post>>, { error: null }>['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.agents.post>[0]
      options?: Parameters<typeof client.agents.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostAgentsKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<Awaited<ReturnType<typeof client.agents.post>>, { error: null }>['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.agents.post>[0]
        options?: Parameters<typeof client.agents.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.agents.post>[0]
            options?: Parameters<typeof client.agents.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.agents.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetAgentsAgentIdKey(params: Parameters<typeof client.agents>[0]) {
  return ['agents', '/agents/{agent_id}', params] as const
}

export function useGetAgentsAgentId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.agents>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.agents>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.agents>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.agents>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetAgentsAgentIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.agents>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.agents(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetAgentsAgentId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.agents>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.agents>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.agents>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.agents>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetAgentsAgentIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.agents>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.agents(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostAgentsAgentIdKey() {
  return ['agents', '/agents/{agent_id}', 'POST'] as const
}

export function usePostAgentsAgentId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.agents>['post']>>['error'], null>,
>(
  params: Parameters<typeof client.agents>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.agents>['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.agents>['post']>[0]
        options?: Parameters<ReturnType<typeof client.agents>['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostAgentsAgentIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.agents>['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.agents>['post']>[0]
        options?: Parameters<ReturnType<typeof client.agents>['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.agents>['post']>[0]
            options?: Parameters<ReturnType<typeof client.agents>['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client.agents(params).post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getDeleteAgentsAgentIdKey() {
  return ['agents', '/agents/{agent_id}', 'DELETE'] as const
}

export function useDeleteAgentsAgentId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.agents>['delete']>>['error'], null>,
>(
  params: Parameters<typeof client.agents>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.agents>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.agents>['delete']>[0]
        options?: Parameters<ReturnType<typeof client.agents>['delete']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteAgentsAgentIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.agents>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.agents>['delete']>[0]
        options?: Parameters<ReturnType<typeof client.agents>['delete']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<ReturnType<typeof client.agents>['delete']>[0]
            options?: Parameters<ReturnType<typeof client.agents>['delete']>[1]
          }
        },
      ) => {
        const { data, error } = await client.agents(params).delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetAgentsEnvironmentsTemplatesKey(
  options?: Parameters<typeof client.agents.environments.templates.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['agents', '/agents/environments/templates', keyArgs] as const
}

export function useGetAgentsEnvironmentsTemplates<
  TError = Exclude<
    Awaited<ReturnType<typeof client.agents.environments.templates.get>>['error'],
    null
  >,
>(options?: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.agents.environments.templates.get>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.agents.environments.templates.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetAgentsEnvironmentsTemplatesKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<typeof client.agents.environments.templates.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.agents.environments.templates.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetAgentsEnvironmentsTemplates<
  TError = Exclude<
    Awaited<ReturnType<typeof client.agents.environments.templates.get>>['error'],
    null
  >,
>(options?: {
  swr?: SWRConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.agents.environments.templates.get>>,
      { error: null }
    >['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.agents.environments.templates.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetAgentsEnvironmentsTemplatesKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<typeof client.agents.environments.templates.get>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.agents.environments.templates.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostAgentsEnvironmentsTemplatesKey() {
  return ['agents', '/agents/environments/templates', 'POST'] as const
}

export function usePostAgentsEnvironmentsTemplates<
  TError = Exclude<
    Awaited<ReturnType<typeof client.agents.environments.templates.post>>['error'],
    null
  >,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<
      Awaited<ReturnType<typeof client.agents.environments.templates.post>>,
      { error: null }
    >['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.agents.environments.templates.post>[0]
      options?: Parameters<typeof client.agents.environments.templates.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostAgentsEnvironmentsTemplatesKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<typeof client.agents.environments.templates.post>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.agents.environments.templates.post>[0]
        options?: Parameters<typeof client.agents.environments.templates.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.agents.environments.templates.post>[0]
            options?: Parameters<typeof client.agents.environments.templates.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.agents.environments.templates.post(
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

export function getGetAgentsEnvironmentsTemplatesEnvironmentTemplateIdKey(
  params: Parameters<typeof client.agents.environments.templates>[0],
) {
  return ['agents', '/agents/environments/templates/{environment_template_id}', params] as const
}

export function useGetAgentsEnvironmentsTemplatesEnvironmentTemplateId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.agents.environments.templates>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.agents.environments.templates>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.agents.environments.templates>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.agents.environments.templates>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetAgentsEnvironmentsTemplatesEnvironmentTemplateIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.agents.environments.templates>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.agents.environments
          .templates(params)
          .get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetAgentsEnvironmentsTemplatesEnvironmentTemplateId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.agents.environments.templates>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.agents.environments.templates>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.agents.environments.templates>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.agents.environments.templates>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetAgentsEnvironmentsTemplatesEnvironmentTemplateIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.agents.environments.templates>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.agents.environments
          .templates(params)
          .get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostAgentsEnvironmentsTemplatesEnvironmentTemplateIdKey() {
  return ['agents', '/agents/environments/templates/{environment_template_id}', 'POST'] as const
}

export function usePostAgentsEnvironmentsTemplatesEnvironmentTemplateId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.agents.environments.templates>['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.agents.environments.templates>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.agents.environments.templates>['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.agents.environments.templates>['post']>[0]
        options?: Parameters<ReturnType<typeof client.agents.environments.templates>['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostAgentsEnvironmentsTemplatesEnvironmentTemplateIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.agents.environments.templates>['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.agents.environments.templates>['post']>[0]
        options?: Parameters<ReturnType<typeof client.agents.environments.templates>['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.agents.environments.templates>['post']>[0]
            options?: Parameters<ReturnType<typeof client.agents.environments.templates>['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client.agents.environments
          .templates(params)
          .post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getDeleteAgentsEnvironmentsTemplatesEnvironmentTemplateIdKey() {
  return ['agents', '/agents/environments/templates/{environment_template_id}', 'DELETE'] as const
}

export function useDeleteAgentsEnvironmentsTemplatesEnvironmentTemplateId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.agents.environments.templates>['delete']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.agents.environments.templates>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.agents.environments.templates>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.agents.environments.templates>['delete']>[0]
        options?: Parameters<ReturnType<typeof client.agents.environments.templates>['delete']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteAgentsEnvironmentsTemplatesEnvironmentTemplateIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.agents.environments.templates>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.agents.environments.templates>['delete']>[0]
        options?: Parameters<ReturnType<typeof client.agents.environments.templates>['delete']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<ReturnType<typeof client.agents.environments.templates>['delete']>[0]
            options?: Parameters<
              ReturnType<typeof client.agents.environments.templates>['delete']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client.agents.environments
          .templates(params)
          .delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetAgentsSessionsKey(
  options?: Parameters<typeof client.agents.sessions.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['agents', '/agents/sessions', keyArgs] as const
}

export function useGetAgentsSessions<
  TError = Exclude<Awaited<ReturnType<typeof client.agents.sessions.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.agents.sessions.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.agents.sessions.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetAgentsSessionsKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<Awaited<ReturnType<typeof client.agents.sessions.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.agents.sessions.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetAgentsSessions<
  TError = Exclude<Awaited<ReturnType<typeof client.agents.sessions.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.agents.sessions.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.agents.sessions.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetAgentsSessionsKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<Awaited<ReturnType<typeof client.agents.sessions.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.agents.sessions.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostAgentsSessionsKey() {
  return ['agents', '/agents/sessions', 'POST'] as const
}

export function usePostAgentsSessions<
  TError = Exclude<Awaited<ReturnType<typeof client.agents.sessions.post>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.agents.sessions.post>>, { error: null }>['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.agents.sessions.post>[0]
      options?: Parameters<typeof client.agents.sessions.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostAgentsSessionsKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<Awaited<ReturnType<typeof client.agents.sessions.post>>, { error: null }>['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.agents.sessions.post>[0]
        options?: Parameters<typeof client.agents.sessions.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.agents.sessions.post>[0]
            options?: Parameters<typeof client.agents.sessions.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.agents.sessions.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetAgentsSessionsSessionIdKey(
  params: Parameters<typeof client.agents.sessions>[0],
) {
  return ['agents', '/agents/sessions/{session_id}', params] as const
}

export function useGetAgentsSessionsSessionId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.agents.sessions>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.agents.sessions>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetAgentsSessionsSessionIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.agents.sessions(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetAgentsSessionsSessionId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.agents.sessions>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.agents.sessions>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetAgentsSessionsSessionIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.agents.sessions(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostAgentsSessionsSessionIdKey() {
  return ['agents', '/agents/sessions/{session_id}', 'POST'] as const
}

export function usePostAgentsSessionsSessionId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.agents.sessions>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.agents.sessions>['post']>[0]
        options?: Parameters<ReturnType<typeof client.agents.sessions>['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostAgentsSessionsSessionIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.agents.sessions>['post']>[0]
        options?: Parameters<ReturnType<typeof client.agents.sessions>['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.agents.sessions>['post']>[0]
            options?: Parameters<ReturnType<typeof client.agents.sessions>['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client.agents.sessions(params).post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getDeleteAgentsSessionsSessionIdKey() {
  return ['agents', '/agents/sessions/{session_id}', 'DELETE'] as const
}

export function useDeleteAgentsSessionsSessionId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['delete']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.agents.sessions>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.agents.sessions>['delete']>[0]
        options?: Parameters<ReturnType<typeof client.agents.sessions>['delete']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteAgentsSessionsSessionIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.agents.sessions>['delete']>[0]
        options?: Parameters<ReturnType<typeof client.agents.sessions>['delete']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<ReturnType<typeof client.agents.sessions>['delete']>[0]
            options?: Parameters<ReturnType<typeof client.agents.sessions>['delete']>[1]
          }
        },
      ) => {
        const { data, error } = await client.agents.sessions(params).delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetAgentsSessionsSessionIdArtifactsKey(
  params: Parameters<typeof client.agents.sessions>[0],
  options?: Parameters<ReturnType<typeof client.agents.sessions>['artifacts']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['agents', '/agents/sessions/{session_id}/artifacts', params, keyArgs] as const
}

export function useGetAgentsSessionsSessionIdArtifacts<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['artifacts']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.agents.sessions>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['artifacts']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.agents.sessions>['artifacts']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetAgentsSessionsSessionIdArtifactsKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['artifacts']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.agents.sessions(params).artifacts.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetAgentsSessionsSessionIdArtifacts<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['artifacts']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.agents.sessions>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['artifacts']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.agents.sessions>['artifacts']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetAgentsSessionsSessionIdArtifactsKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['artifacts']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.agents.sessions(params).artifacts.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetAgentsSessionsSessionIdArtifactsArtifactIdKey(
  params: Parameters<typeof client.agents.sessions>[0],
  params2: Parameters<ReturnType<typeof client.agents.sessions>['artifacts']>[0],
) {
  return [
    'agents',
    '/agents/sessions/{session_id}/artifacts/{artifact_id}',
    params,
    params2,
  ] as const
}

export function useGetAgentsSessionsSessionIdArtifactsArtifactId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.agents.sessions>['artifacts']>['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.agents.sessions>[0],
  params2: Parameters<ReturnType<typeof client.agents.sessions>['artifacts']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.agents.sessions>['artifacts']>['get']>
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<typeof client.agents.sessions>['artifacts']>['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetAgentsSessionsSessionIdArtifactsArtifactIdKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.agents.sessions>['artifacts']>['get']>
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.agents
          .sessions(params)
          .artifacts(params2)
          .get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetAgentsSessionsSessionIdArtifactsArtifactId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.agents.sessions>['artifacts']>['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.agents.sessions>[0],
  params2: Parameters<ReturnType<typeof client.agents.sessions>['artifacts']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.agents.sessions>['artifacts']>['get']>
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<typeof client.agents.sessions>['artifacts']>['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetAgentsSessionsSessionIdArtifactsArtifactIdKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.agents.sessions>['artifacts']>['get']>
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.agents
          .sessions(params)
          .artifacts(params2)
          .get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getDeleteAgentsSessionsSessionIdArtifactsArtifactIdKey() {
  return ['agents', '/agents/sessions/{session_id}/artifacts/{artifact_id}', 'DELETE'] as const
}

export function useDeleteAgentsSessionsSessionIdArtifactsArtifactId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.agents.sessions>['artifacts']>['delete']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.agents.sessions>[0],
  params2: Parameters<ReturnType<typeof client.agents.sessions>['artifacts']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.agents.sessions>['artifacts']>['delete']>
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<ReturnType<typeof client.agents.sessions>['artifacts']>['delete']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.agents.sessions>['artifacts']>['delete']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteAgentsSessionsSessionIdArtifactsArtifactIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.agents.sessions>['artifacts']>['delete']>
        >,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<
          ReturnType<ReturnType<typeof client.agents.sessions>['artifacts']>['delete']
        >[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.agents.sessions>['artifacts']>['delete']
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
              ReturnType<ReturnType<typeof client.agents.sessions>['artifacts']>['delete']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.agents.sessions>['artifacts']>['delete']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client.agents
          .sessions(params)
          .artifacts(params2)
          .delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetAgentsSessionsSessionIdArtifactsArtifactIdContentKey(
  params: Parameters<typeof client.agents.sessions>[0],
  params2: Parameters<ReturnType<typeof client.agents.sessions>['artifacts']>[0],
) {
  return [
    'agents',
    '/agents/sessions/{session_id}/artifacts/{artifact_id}/content',
    params,
    params2,
  ] as const
}

export function useGetAgentsSessionsSessionIdArtifactsArtifactIdContent<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<typeof client.agents.sessions>['artifacts']>['content']['get']
      >
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.agents.sessions>[0],
  params2: Parameters<ReturnType<typeof client.agents.sessions>['artifacts']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<typeof client.agents.sessions>['artifacts']>['content']['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<typeof client.agents.sessions>['artifacts']>['content']['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetAgentsSessionsSessionIdArtifactsArtifactIdContentKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<typeof client.agents.sessions>['artifacts']>['content']['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.agents
          .sessions(params)
          .artifacts(params2)
          .content.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetAgentsSessionsSessionIdArtifactsArtifactIdContent<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<typeof client.agents.sessions>['artifacts']>['content']['get']
      >
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.agents.sessions>[0],
  params2: Parameters<ReturnType<typeof client.agents.sessions>['artifacts']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<typeof client.agents.sessions>['artifacts']>['content']['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<typeof client.agents.sessions>['artifacts']>['content']['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetAgentsSessionsSessionIdArtifactsArtifactIdContentKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<
          ReturnType<
            ReturnType<ReturnType<typeof client.agents.sessions>['artifacts']>['content']['get']
          >
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.agents
          .sessions(params)
          .artifacts(params2)
          .content.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetAgentsSessionsSessionIdEventsKey(
  params: Parameters<typeof client.agents.sessions>[0],
  options?: Parameters<ReturnType<typeof client.agents.sessions>['events']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['agents', '/agents/sessions/{session_id}/events', params, keyArgs] as const
}

export function useGetAgentsSessionsSessionIdEvents<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['events']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.agents.sessions>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['events']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.agents.sessions>['events']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetAgentsSessionsSessionIdEventsKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['events']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.agents.sessions(params).events.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetAgentsSessionsSessionIdEvents<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['events']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.agents.sessions>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['events']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.agents.sessions>['events']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetAgentsSessionsSessionIdEventsKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['events']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.agents.sessions(params).events.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostAgentsSessionsSessionIdEventsKey() {
  return ['agents', '/agents/sessions/{session_id}/events', 'POST'] as const
}

export function usePostAgentsSessionsSessionIdEvents<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['events']['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.agents.sessions>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['events']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.agents.sessions>['events']['post']>[0]
        options?: Parameters<ReturnType<typeof client.agents.sessions>['events']['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostAgentsSessionsSessionIdEventsKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['events']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.agents.sessions>['events']['post']>[0]
        options?: Parameters<ReturnType<typeof client.agents.sessions>['events']['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.agents.sessions>['events']['post']>[0]
            options?: Parameters<ReturnType<typeof client.agents.sessions>['events']['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client.agents
          .sessions(params)
          .events.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetAgentsSessionsSessionIdItemsKey(
  params: Parameters<typeof client.agents.sessions>[0],
  options?: Parameters<ReturnType<typeof client.agents.sessions>['items']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['agents', '/agents/sessions/{session_id}/items', params, keyArgs] as const
}

export function useGetAgentsSessionsSessionIdItems<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['items']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.agents.sessions>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['items']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.agents.sessions>['items']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetAgentsSessionsSessionIdItemsKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['items']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.agents.sessions(params).items.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetAgentsSessionsSessionIdItems<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['items']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.agents.sessions>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['items']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.agents.sessions>['items']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetAgentsSessionsSessionIdItemsKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['items']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.agents.sessions(params).items.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetAgentsSessionsSessionIdTracesKey(
  params: Parameters<typeof client.agents.sessions>[0],
  options?: Parameters<ReturnType<typeof client.agents.sessions>['traces']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['agents', '/agents/sessions/{session_id}/traces', params, keyArgs] as const
}

export function useGetAgentsSessionsSessionIdTraces<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['traces']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.agents.sessions>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['traces']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.agents.sessions>['traces']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetAgentsSessionsSessionIdTracesKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['traces']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.agents.sessions(params).traces.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetAgentsSessionsSessionIdTraces<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['traces']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.agents.sessions>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['traces']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.agents.sessions>['traces']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetAgentsSessionsSessionIdTracesKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['traces']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.agents.sessions(params).traces.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetAgentsSessionsSessionIdTurnsKey(
  params: Parameters<typeof client.agents.sessions>[0],
  options?: Parameters<ReturnType<typeof client.agents.sessions>['turns']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['agents', '/agents/sessions/{session_id}/turns', params, keyArgs] as const
}

export function useGetAgentsSessionsSessionIdTurns<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['turns']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.agents.sessions>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['turns']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.agents.sessions>['turns']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetAgentsSessionsSessionIdTurnsKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['turns']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.agents.sessions(params).turns.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetAgentsSessionsSessionIdTurns<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['turns']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.agents.sessions>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['turns']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.agents.sessions>['turns']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetAgentsSessionsSessionIdTurnsKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['turns']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.agents.sessions(params).turns.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetAgentsSessionsSessionIdTurnsTurnIdKey(
  params: Parameters<typeof client.agents.sessions>[0],
  params2: Parameters<ReturnType<typeof client.agents.sessions>['turns']>[0],
) {
  return ['agents', '/agents/sessions/{session_id}/turns/{turn_id}', params, params2] as const
}

export function useGetAgentsSessionsSessionIdTurnsTurnId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.agents.sessions>['turns']>['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.agents.sessions>[0],
  params2: Parameters<ReturnType<typeof client.agents.sessions>['turns']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.agents.sessions>['turns']>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<ReturnType<typeof client.agents.sessions>['turns']>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetAgentsSessionsSessionIdTurnsTurnIdKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.agents.sessions>['turns']>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.agents
          .sessions(params)
          .turns(params2)
          .get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetAgentsSessionsSessionIdTurnsTurnId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.agents.sessions>['turns']>['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.agents.sessions>[0],
  params2: Parameters<ReturnType<typeof client.agents.sessions>['turns']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.agents.sessions>['turns']>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<ReturnType<typeof client.agents.sessions>['turns']>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetAgentsSessionsSessionIdTurnsTurnIdKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.agents.sessions>['turns']>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.agents
          .sessions(params)
          .turns(params2)
          .get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetAgentsSessionsSessionIdTurnsTurnIdItemsKey(
  params: Parameters<typeof client.agents.sessions>[0],
  params2: Parameters<ReturnType<typeof client.agents.sessions>['turns']>[0],
  options?: Parameters<
    ReturnType<ReturnType<typeof client.agents.sessions>['turns']>['items']['get']
  >[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'agents',
    '/agents/sessions/{session_id}/turns/{turn_id}/items',
    params,
    params2,
    keyArgs,
  ] as const
}

export function useGetAgentsSessionsSessionIdTurnsTurnIdItems<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.agents.sessions>['turns']>['items']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.agents.sessions>[0],
  params2: Parameters<ReturnType<typeof client.agents.sessions>['turns']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.agents.sessions>['turns']>['items']['get']>
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<typeof client.agents.sessions>['turns']>['items']['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetAgentsSessionsSessionIdTurnsTurnIdItemsKey(params, params2, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.agents.sessions>['turns']>['items']['get']>
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.agents
          .sessions(params)
          .turns(params2)
          .items.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetAgentsSessionsSessionIdTurnsTurnIdItems<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.agents.sessions>['turns']>['items']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.agents.sessions>[0],
  params2: Parameters<ReturnType<typeof client.agents.sessions>['turns']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.agents.sessions>['turns']>['items']['get']>
        >,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<
      ReturnType<ReturnType<typeof client.agents.sessions>['turns']>['items']['get']
    >[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetAgentsSessionsSessionIdTurnsTurnIdItemsKey(params, params2, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<
          ReturnType<ReturnType<ReturnType<typeof client.agents.sessions>['turns']>['items']['get']>
        >,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.agents
          .sessions(params)
          .turns(params2)
          .items.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getGetVaultsKey(options?: Parameters<typeof client.vaults.get>[0]) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['vaults', '/vaults', keyArgs] as const
}

export function useGetVaults<
  TError = Exclude<Awaited<ReturnType<typeof client.vaults.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.vaults.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.vaults.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetVaultsKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<Awaited<ReturnType<typeof client.vaults.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.vaults.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetVaults<
  TError = Exclude<Awaited<ReturnType<typeof client.vaults.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.vaults.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.vaults.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetVaultsKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<Awaited<ReturnType<typeof client.vaults.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.vaults.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostVaultsKey() {
  return ['vaults', '/vaults', 'POST'] as const
}

export function usePostVaults<
  TError = Exclude<Awaited<ReturnType<typeof client.vaults.post>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.vaults.post>>, { error: null }>['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.vaults.post>[0]
      options?: Parameters<typeof client.vaults.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostVaultsKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<Awaited<ReturnType<typeof client.vaults.post>>, { error: null }>['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.vaults.post>[0]
        options?: Parameters<typeof client.vaults.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.vaults.post>[0]
            options?: Parameters<typeof client.vaults.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.vaults.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetVaultsVaultIdKey(params: Parameters<typeof client.vaults>[0]) {
  return ['vaults', '/vaults/{vault_id}', params] as const
}

export function useGetVaultsVaultId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.vaults>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.vaults>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.vaults>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.vaults>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetVaultsVaultIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.vaults>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.vaults(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetVaultsVaultId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.vaults>['get']>>['error'], null>,
>(
  params: Parameters<typeof client.vaults>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.vaults>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.vaults>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetVaultsVaultIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.vaults>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.vaults(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostVaultsVaultIdKey() {
  return ['vaults', '/vaults/{vault_id}', 'POST'] as const
}

export function usePostVaultsVaultId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.vaults>['post']>>['error'], null>,
>(
  params: Parameters<typeof client.vaults>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.vaults>['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.vaults>['post']>[0]
        options?: Parameters<ReturnType<typeof client.vaults>['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostVaultsVaultIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.vaults>['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.vaults>['post']>[0]
        options?: Parameters<ReturnType<typeof client.vaults>['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.vaults>['post']>[0]
            options?: Parameters<ReturnType<typeof client.vaults>['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client.vaults(params).post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getDeleteVaultsVaultIdKey() {
  return ['vaults', '/vaults/{vault_id}', 'DELETE'] as const
}

export function useDeleteVaultsVaultId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.vaults>['delete']>>['error'], null>,
>(
  params: Parameters<typeof client.vaults>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.vaults>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.vaults>['delete']>[0]
        options?: Parameters<ReturnType<typeof client.vaults>['delete']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteVaultsVaultIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.vaults>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.vaults>['delete']>[0]
        options?: Parameters<ReturnType<typeof client.vaults>['delete']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<ReturnType<typeof client.vaults>['delete']>[0]
            options?: Parameters<ReturnType<typeof client.vaults>['delete']>[1]
          }
        },
      ) => {
        const { data, error } = await client.vaults(params).delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetVaultsVaultIdCredentialsKey(
  params: Parameters<typeof client.vaults>[0],
  options?: Parameters<ReturnType<typeof client.vaults>['credentials']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['vaults', '/vaults/{vault_id}/credentials', params, keyArgs] as const
}

export function useGetVaultsVaultIdCredentials<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.vaults>['credentials']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.vaults>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.vaults>['credentials']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.vaults>['credentials']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetVaultsVaultIdCredentialsKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.vaults>['credentials']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.vaults(params).credentials.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetVaultsVaultIdCredentials<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.vaults>['credentials']['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.vaults>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.vaults>['credentials']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.vaults>['credentials']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetVaultsVaultIdCredentialsKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.vaults>['credentials']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.vaults(params).credentials.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostVaultsVaultIdCredentialsKey() {
  return ['vaults', '/vaults/{vault_id}/credentials', 'POST'] as const
}

export function usePostVaultsVaultIdCredentials<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.vaults>['credentials']['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.vaults>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.vaults>['credentials']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.vaults>['credentials']['post']>[0]
        options?: Parameters<ReturnType<typeof client.vaults>['credentials']['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostVaultsVaultIdCredentialsKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.vaults>['credentials']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.vaults>['credentials']['post']>[0]
        options?: Parameters<ReturnType<typeof client.vaults>['credentials']['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.vaults>['credentials']['post']>[0]
            options?: Parameters<ReturnType<typeof client.vaults>['credentials']['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client.vaults(params).credentials.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetVaultsVaultIdCredentialsCredentialIdKey(
  params: Parameters<typeof client.vaults>[0],
  params2: Parameters<ReturnType<typeof client.vaults>['credentials']>[0],
) {
  return ['vaults', '/vaults/{vault_id}/credentials/{credential_id}', params, params2] as const
}

export function useGetVaultsVaultIdCredentialsCredentialId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.vaults>['credentials']>['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.vaults>[0],
  params2: Parameters<ReturnType<typeof client.vaults>['credentials']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.vaults>['credentials']>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<ReturnType<typeof client.vaults>['credentials']>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetVaultsVaultIdCredentialsCredentialIdKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.vaults>['credentials']>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.vaults(params).credentials(params2).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetVaultsVaultIdCredentialsCredentialId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.vaults>['credentials']>['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.vaults>[0],
  params2: Parameters<ReturnType<typeof client.vaults>['credentials']>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.vaults>['credentials']>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<ReturnType<typeof client.vaults>['credentials']>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetVaultsVaultIdCredentialsCredentialIdKey(params, params2)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.vaults>['credentials']>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.vaults(params).credentials(params2).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostVaultsVaultIdCredentialsCredentialIdKey() {
  return ['vaults', '/vaults/{vault_id}/credentials/{credential_id}', 'POST'] as const
}

export function usePostVaultsVaultIdCredentialsCredentialId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.vaults>['credentials']>['post']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.vaults>[0],
  params2: Parameters<ReturnType<typeof client.vaults>['credentials']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.vaults>['credentials']>['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<ReturnType<typeof client.vaults>['credentials']>['post']>[0]
        options?: Parameters<ReturnType<ReturnType<typeof client.vaults>['credentials']>['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostVaultsVaultIdCredentialsCredentialIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.vaults>['credentials']>['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<ReturnType<typeof client.vaults>['credentials']>['post']>[0]
        options?: Parameters<ReturnType<ReturnType<typeof client.vaults>['credentials']>['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<ReturnType<typeof client.vaults>['credentials']>['post']>[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.vaults>['credentials']>['post']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .vaults(params)
          .credentials(params2)
          .post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getDeleteVaultsVaultIdCredentialsCredentialIdKey() {
  return ['vaults', '/vaults/{vault_id}/credentials/{credential_id}', 'DELETE'] as const
}

export function useDeleteVaultsVaultIdCredentialsCredentialId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.vaults>['credentials']>['delete']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.vaults>[0],
  params2: Parameters<ReturnType<typeof client.vaults>['credentials']>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.vaults>['credentials']>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<ReturnType<typeof client.vaults>['credentials']>['delete']>[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.vaults>['credentials']>['delete']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteVaultsVaultIdCredentialsCredentialIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<ReturnType<typeof client.vaults>['credentials']>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<ReturnType<typeof client.vaults>['credentials']>['delete']>[0]
        options?: Parameters<
          ReturnType<ReturnType<typeof client.vaults>['credentials']>['delete']
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
              ReturnType<ReturnType<typeof client.vaults>['credentials']>['delete']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.vaults>['credentials']>['delete']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .vaults(params)
          .credentials(params2)
          .delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetWebhookEndpointsKey(
  options?: Parameters<typeof client.webhook_endpoints.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['webhook_endpoints', '/webhook_endpoints', keyArgs] as const
}

export function useGetWebhookEndpoints<
  TError = Exclude<Awaited<ReturnType<typeof client.webhook_endpoints.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.webhook_endpoints.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.webhook_endpoints.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetWebhookEndpointsKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<Awaited<ReturnType<typeof client.webhook_endpoints.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.webhook_endpoints.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetWebhookEndpoints<
  TError = Exclude<Awaited<ReturnType<typeof client.webhook_endpoints.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.webhook_endpoints.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.webhook_endpoints.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetWebhookEndpointsKey(clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<Awaited<ReturnType<typeof client.webhook_endpoints.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.webhook_endpoints.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostWebhookEndpointsKey() {
  return ['webhook_endpoints', '/webhook_endpoints', 'POST'] as const
}

export function usePostWebhookEndpoints<
  TError = Exclude<Awaited<ReturnType<typeof client.webhook_endpoints.post>>['error'], null>,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<Awaited<ReturnType<typeof client.webhook_endpoints.post>>, { error: null }>['data'],
    TError,
    Key,
    {
      body: Parameters<typeof client.webhook_endpoints.post>[0]
      options?: Parameters<typeof client.webhook_endpoints.post>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostWebhookEndpointsKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<Awaited<ReturnType<typeof client.webhook_endpoints.post>>, { error: null }>['data'],
      TError,
      Key,
      {
        body: Parameters<typeof client.webhook_endpoints.post>[0]
        options?: Parameters<typeof client.webhook_endpoints.post>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<typeof client.webhook_endpoints.post>[0]
            options?: Parameters<typeof client.webhook_endpoints.post>[1]
          }
        },
      ) => {
        const { data, error } = await client.webhook_endpoints.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetWebhookEndpointsWebhookEndpointIdKey(
  params: Parameters<typeof client.webhook_endpoints>[0],
) {
  return ['webhook_endpoints', '/webhook_endpoints/{webhook_endpoint_id}', params] as const
}

export function useGetWebhookEndpointsWebhookEndpointId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.webhook_endpoints>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.webhook_endpoints>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.webhook_endpoints>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.webhook_endpoints>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetWebhookEndpointsWebhookEndpointIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.webhook_endpoints>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.webhook_endpoints(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetWebhookEndpointsWebhookEndpointId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.webhook_endpoints>['get']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.webhook_endpoints>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.webhook_endpoints>['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.webhook_endpoints>['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetWebhookEndpointsWebhookEndpointIdKey(params)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.webhook_endpoints>['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.webhook_endpoints(params).get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostWebhookEndpointsWebhookEndpointIdKey() {
  return ['webhook_endpoints', '/webhook_endpoints/{webhook_endpoint_id}', 'POST'] as const
}

export function usePostWebhookEndpointsWebhookEndpointId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.webhook_endpoints>['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.webhook_endpoints>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.webhook_endpoints>['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.webhook_endpoints>['post']>[0]
        options?: Parameters<ReturnType<typeof client.webhook_endpoints>['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostWebhookEndpointsWebhookEndpointIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.webhook_endpoints>['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.webhook_endpoints>['post']>[0]
        options?: Parameters<ReturnType<typeof client.webhook_endpoints>['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.webhook_endpoints>['post']>[0]
            options?: Parameters<ReturnType<typeof client.webhook_endpoints>['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client.webhook_endpoints(params).post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getDeleteWebhookEndpointsWebhookEndpointIdKey() {
  return ['webhook_endpoints', '/webhook_endpoints/{webhook_endpoint_id}', 'DELETE'] as const
}

export function useDeleteWebhookEndpointsWebhookEndpointId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.webhook_endpoints>['delete']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.webhook_endpoints>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.webhook_endpoints>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.webhook_endpoints>['delete']>[0]
        options?: Parameters<ReturnType<typeof client.webhook_endpoints>['delete']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteWebhookEndpointsWebhookEndpointIdKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.webhook_endpoints>['delete']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.webhook_endpoints>['delete']>[0]
        options?: Parameters<ReturnType<typeof client.webhook_endpoints>['delete']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<ReturnType<typeof client.webhook_endpoints>['delete']>[0]
            options?: Parameters<ReturnType<typeof client.webhook_endpoints>['delete']>[1]
          }
        },
      ) => {
        const { data, error } = await client.webhook_endpoints(params).delete(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostWebhookEndpointsWebhookEndpointIdRotateSecretKey() {
  return [
    'webhook_endpoints',
    '/webhook_endpoints/{webhook_endpoint_id}/rotate_secret',
    'POST',
  ] as const
}

export function usePostWebhookEndpointsWebhookEndpointIdRotateSecret<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.webhook_endpoints>['rotate_secret']['post']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.webhook_endpoints>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.webhook_endpoints>['rotate_secret']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.webhook_endpoints>['rotate_secret']['post']>[0]
        options?: Parameters<
          ReturnType<typeof client.webhook_endpoints>['rotate_secret']['post']
        >[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostWebhookEndpointsWebhookEndpointIdRotateSecretKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.webhook_endpoints>['rotate_secret']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.webhook_endpoints>['rotate_secret']['post']>[0]
        options?: Parameters<
          ReturnType<typeof client.webhook_endpoints>['rotate_secret']['post']
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
            body: Parameters<
              ReturnType<typeof client.webhook_endpoints>['rotate_secret']['post']
            >[0]
            options?: Parameters<
              ReturnType<typeof client.webhook_endpoints>['rotate_secret']['post']
            >[1]
          }
        },
      ) => {
        const { data, error } = await client
          .webhook_endpoints(params)
          .rotate_secret.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostWebhookEndpointsWebhookEndpointIdTestKey() {
  return ['webhook_endpoints', '/webhook_endpoints/{webhook_endpoint_id}/test', 'POST'] as const
}

export function usePostWebhookEndpointsWebhookEndpointIdTest<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.webhook_endpoints>['test']['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.webhook_endpoints>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.webhook_endpoints>['test']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.webhook_endpoints>['test']['post']>[0]
        options?: Parameters<ReturnType<typeof client.webhook_endpoints>['test']['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostWebhookEndpointsWebhookEndpointIdTestKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.webhook_endpoints>['test']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<ReturnType<typeof client.webhook_endpoints>['test']['post']>[0]
        options?: Parameters<ReturnType<typeof client.webhook_endpoints>['test']['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<ReturnType<typeof client.webhook_endpoints>['test']['post']>[0]
            options?: Parameters<ReturnType<typeof client.webhook_endpoints>['test']['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client
          .webhook_endpoints(params)
          .test.post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetWebhookEventTypesKey() {
  return ['webhook_event_types', '/webhook_event_types'] as const
}

export function useGetWebhookEventTypes<
  TError = Exclude<Awaited<ReturnType<typeof client.webhook_event_types.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.webhook_event_types.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.webhook_event_types.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey === undefined ? getGetWebhookEventTypesKey() : customKey) : null
  return {
    swrKey,
    ...useSWR<
      Extract<Awaited<ReturnType<typeof client.webhook_event_types.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.webhook_event_types.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetWebhookEventTypes<
  TError = Exclude<Awaited<ReturnType<typeof client.webhook_event_types.get>>['error'], null>,
>(options?: {
  swr?: SWRConfiguration<
    Extract<Awaited<ReturnType<typeof client.webhook_event_types.get>>, { error: null }>['data'],
    TError
  > & { swrKey?: Key; enabled?: boolean }
  options?: Parameters<typeof client.webhook_event_types.get>[0]
}) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false ? (customKey === undefined ? getGetWebhookEventTypesKey() : customKey) : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<Awaited<ReturnType<typeof client.webhook_event_types.get>>, { error: null }>['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client.webhook_event_types.get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostResponsesBetaTrueKey() {
  return ['responses?beta=true', '/responses?beta=true', 'POST'] as const
}

export function usePostResponsesBetaTrue<
  TError = Exclude<
    Awaited<ReturnType<(typeof client)['responses?beta=true']['post']>>['error'],
    null
  >,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<
      Awaited<ReturnType<(typeof client)['responses?beta=true']['post']>>,
      { error: null }
    >['data'],
    TError,
    Key,
    {
      body: Parameters<(typeof client)['responses?beta=true']['post']>[0]
      options?: Parameters<(typeof client)['responses?beta=true']['post']>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostResponsesBetaTrueKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<(typeof client)['responses?beta=true']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<(typeof client)['responses?beta=true']['post']>[0]
        options?: Parameters<(typeof client)['responses?beta=true']['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<(typeof client)['responses?beta=true']['post']>[0]
            options?: Parameters<(typeof client)['responses?beta=true']['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client['responses?beta=true'].post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getGetResponsesResponseIdBetaTrueKey(
  params: string,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return ['responses', '/responses/{response_id}?beta=true', params, keyArgs] as const
}

export function useGetResponsesResponseIdBetaTrue<TError = unknown>(
  params: string,
  options?: {
    swr?: SWRConfiguration<Static<typeof BetaResponseSchema>, TError> & {
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
        ? getGetResponsesResponseIdBetaTrueKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<Static<typeof BetaResponseSchema>, TError>(
      swrKey,
      async () => {
        const search = toSearch(clientOptions?.query)
        const res = await fetch(
          `${clientOrigin}/responses/${encodeURIComponent(params)}?beta=true${search.size ? `&${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        return readResponse(res)
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetResponsesResponseIdBetaTrue<TError = unknown>(
  params: string,
  options?: {
    swr?: SWRConfiguration<Static<typeof BetaResponseSchema>, TError> & {
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
        ? getGetResponsesResponseIdBetaTrueKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<Static<typeof BetaResponseSchema>, TError>(
      swrKey,
      async () => {
        const search = toSearch(clientOptions?.query)
        const res = await fetch(
          `${clientOrigin}/responses/${encodeURIComponent(params)}?beta=true${search.size ? `&${search}` : ''}`,
          { headers: clientOptions?.headers },
        )
        return readResponse(res)
      },
      restSwrOptions,
    ),
  }
}

export function getDeleteResponsesResponseIdBetaTrueKey() {
  return ['responses', '/responses/{response_id}?beta=true', 'DELETE'] as const
}

export function useDeleteResponsesResponseIdBetaTrue<TError = unknown>(
  params: string,
  options?: {
    mutation?: SWRMutationConfiguration<
      unknown,
      TError,
      Key,
      { body?: unknown; options?: { headers?: Record<string, string> } }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getDeleteResponsesResponseIdBetaTrueKey()
  return {
    swrKey,
    ...useSWRMutation<
      unknown,
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
          `${clientOrigin}/responses/${encodeURIComponent(params)}?beta=true`,
          {
            method: 'DELETE',
            headers: { 'content-type': 'application/json', ...arg.options?.headers },
            body: arg.body === undefined ? undefined : JSON.stringify(arg.body),
          },
        )
        return readResponse(res)
      },
      restMutationOptions,
    ),
  }
}

export function getPostResponsesResponseIdCancelBetaTrueKey() {
  return ['responses', '/responses/{response_id}/cancel?beta=true', 'POST'] as const
}

export function usePostResponsesResponseIdCancelBetaTrue<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.responses>['cancel?beta=true']['post']>>['error'],
    null
  >,
>(
  params: Parameters<typeof client.responses>[0],
  options?: {
    mutation?: SWRMutationConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.responses>['cancel?beta=true']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.responses>['cancel?beta=true']['post']>[0]
        options?: Parameters<ReturnType<typeof client.responses>['cancel?beta=true']['post']>[1]
      }
    > & { swrKey?: Key; throwOnError?: boolean }
  },
) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostResponsesResponseIdCancelBetaTrueKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.responses>['cancel?beta=true']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body?: Parameters<ReturnType<typeof client.responses>['cancel?beta=true']['post']>[0]
        options?: Parameters<ReturnType<typeof client.responses>['cancel?beta=true']['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body?: Parameters<ReturnType<typeof client.responses>['cancel?beta=true']['post']>[0]
            options?: Parameters<ReturnType<typeof client.responses>['cancel?beta=true']['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client
          .responses(params)
          ['cancel?beta=true'].post(arg.body, arg.options)
        if (error) throw error
        return data
      },
      restMutationOptions,
    ),
  }
}

export function getPostResponsesCompactBetaTrueKey() {
  return ['responses', '/responses/compact?beta=true', 'POST'] as const
}

export function usePostResponsesCompactBetaTrue<
  TError = Exclude<
    Awaited<ReturnType<(typeof client.responses)['compact?beta=true']['post']>>['error'],
    null
  >,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<
      Awaited<ReturnType<(typeof client.responses)['compact?beta=true']['post']>>,
      { error: null }
    >['data'],
    TError,
    Key,
    {
      body: Parameters<(typeof client.responses)['compact?beta=true']['post']>[0]
      options?: Parameters<(typeof client.responses)['compact?beta=true']['post']>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostResponsesCompactBetaTrueKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<(typeof client.responses)['compact?beta=true']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<(typeof client.responses)['compact?beta=true']['post']>[0]
        options?: Parameters<(typeof client.responses)['compact?beta=true']['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<(typeof client.responses)['compact?beta=true']['post']>[0]
            options?: Parameters<(typeof client.responses)['compact?beta=true']['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client.responses['compact?beta=true'].post(
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

export function getGetResponsesResponseIdInputItemsBetaTrueKey(
  params: Parameters<typeof client.responses>[0],
  options?: Parameters<ReturnType<typeof client.responses>['input_items?beta=true']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['responses', '/responses/{response_id}/input_items?beta=true', params, keyArgs] as const
}

export function useGetResponsesResponseIdInputItemsBetaTrue<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.responses>['input_items?beta=true']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.responses>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.responses>['input_items?beta=true']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.responses>['input_items?beta=true']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetResponsesResponseIdInputItemsBetaTrueKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWR<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.responses>['input_items?beta=true']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client
          .responses(params)
          ['input_items?beta=true'].get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function useImmutableGetResponsesResponseIdInputItemsBetaTrue<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.responses>['input_items?beta=true']['get']>
    >['error'],
    null
  >,
>(
  params: Parameters<typeof client.responses>[0],
  options?: {
    swr?: SWRConfiguration<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.responses>['input_items?beta=true']['get']>>,
        { error: null }
      >['data'],
      TError
    > & { swrKey?: Key; enabled?: boolean }
    options?: Parameters<ReturnType<typeof client.responses>['input_items?beta=true']['get']>[0]
  },
) {
  const { swr: swrOptions, options: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const swrKey =
    enabled !== false
      ? customKey === undefined
        ? getGetResponsesResponseIdInputItemsBetaTrueKey(params, clientOptions)
        : customKey
      : null
  return {
    swrKey,
    ...useSWRImmutable<
      Extract<
        Awaited<ReturnType<ReturnType<typeof client.responses>['input_items?beta=true']['get']>>,
        { error: null }
      >['data'],
      TError
    >(
      swrKey,
      async () => {
        const { data, error } = await client
          .responses(params)
          ['input_items?beta=true'].get(clientOptions)
        if (error) throw error
        return data
      },
      restSwrOptions,
    ),
  }
}

export function getPostResponsesInputTokensBetaTrueKey() {
  return ['responses', '/responses/input_tokens?beta=true', 'POST'] as const
}

export function usePostResponsesInputTokensBetaTrue<
  TError = Exclude<
    Awaited<ReturnType<(typeof client.responses)['input_tokens?beta=true']['post']>>['error'],
    null
  >,
>(options?: {
  mutation?: SWRMutationConfiguration<
    Extract<
      Awaited<ReturnType<(typeof client.responses)['input_tokens?beta=true']['post']>>,
      { error: null }
    >['data'],
    TError,
    Key,
    {
      body: Parameters<(typeof client.responses)['input_tokens?beta=true']['post']>[0]
      options?: Parameters<(typeof client.responses)['input_tokens?beta=true']['post']>[1]
    }
  > & { swrKey?: Key; throwOnError?: boolean }
}) {
  const { mutation: mutationOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey = customKey ?? getPostResponsesInputTokensBetaTrueKey()
  return {
    swrKey,
    ...useSWRMutation<
      Extract<
        Awaited<ReturnType<(typeof client.responses)['input_tokens?beta=true']['post']>>,
        { error: null }
      >['data'],
      TError,
      Key,
      {
        body: Parameters<(typeof client.responses)['input_tokens?beta=true']['post']>[0]
        options?: Parameters<(typeof client.responses)['input_tokens?beta=true']['post']>[1]
      }
    >(
      swrKey,
      async (
        _key: Key,
        {
          arg,
        }: {
          arg: {
            body: Parameters<(typeof client.responses)['input_tokens?beta=true']['post']>[0]
            options?: Parameters<(typeof client.responses)['input_tokens?beta=true']['post']>[1]
          }
        },
      ) => {
        const { data, error } = await client.responses['input_tokens?beta=true'].post(
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
