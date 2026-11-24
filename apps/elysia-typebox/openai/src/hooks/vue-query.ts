import { useQuery, useMutation, mutationOptions } from '@tanstack/vue-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseMutationOptions,
  QueryClient,
} from '@tanstack/vue-query'
import { computed, toValue } from 'vue'
import type { MaybeRefOrGetter } from 'vue'
import type { Static } from 'elysia'
import type { BetaResponseSchema } from '../components/schemas'
import { client, clientOrigin } from '../lib'

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

export function getAssistantsQueryKey(options?: Parameters<typeof client.assistants.get>[0]) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['assistants', '/assistants', keyArgs] as const
}

export function getAssistantsQueryOptions(options?: Parameters<typeof client.assistants.get>[0]) {
  return {
    queryKey: getAssistantsQueryKey(options),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.assistants.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useAssistants<
  TData = Extract<Awaited<ReturnType<typeof client.assistants.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.assistants.get>>['error'], null>,
>(
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<Awaited<ReturnType<typeof client.assistants.get>>, { error: null }>['data'],
          TError,
          TData,
          Extract<Awaited<ReturnType<typeof client.assistants.get>>, { error: null }>['data'],
          ReturnType<typeof getAssistantsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.assistants.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: getAssistantsQueryKey(clientOptions),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.assistants.get({
          ...clientOptions,
          fetch: { ...clientOptions?.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostAssistantsMutationKey() {
  return ['assistants', '/assistants', 'POST'] as const
}

export function getPostAssistantsMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.assistants.post>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.assistants.post>>, { error: null }>['data'],
    TError,
    {
      body: Parameters<typeof client.assistants.post>[0]
      options?: Parameters<typeof client.assistants.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostAssistantsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.assistants.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostAssistants<
  TError = Exclude<Awaited<ReturnType<typeof client.assistants.post>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<Awaited<ReturnType<typeof client.assistants.post>>, { error: null }>['data'],
          TError,
          {
            body: Parameters<typeof client.assistants.post>[0]
            options?: Parameters<typeof client.assistants.post>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostAssistantsMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getAssistantsAssistantIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.assistants>[0]>,
) {
  return ['assistants', '/assistants/{assistant_id}', toValue(params)] as const
}

export function getAssistantsAssistantIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.assistants>[0]>,
  options?: Parameters<ReturnType<typeof client.assistants>['get']>[0],
) {
  return {
    queryKey: computed(() => getAssistantsAssistantIdQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .assistants(toValue(params))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useAssistantsAssistantId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.assistants>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.assistants>['get']>>['error'], null>,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.assistants>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.assistants>['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.assistants>['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getAssistantsAssistantIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.assistants>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getAssistantsAssistantIdQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .assistants(toValue(params))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostAssistantsAssistantIdMutationKey() {
  return ['assistants', '/assistants/{assistant_id}', 'POST'] as const
}

export function getPostAssistantsAssistantIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.assistants>['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.assistants>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.assistants>['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.assistants>['post']>[0]
      options?: Parameters<ReturnType<typeof client.assistants>['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostAssistantsAssistantIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.assistants(toValue(params)).post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostAssistantsAssistantId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.assistants>['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.assistants>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.assistants>['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.assistants>['post']>[0]
            options?: Parameters<ReturnType<typeof client.assistants>['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostAssistantsAssistantIdMutationOptions<TError, TOnMutateResult>(
    params,
  )
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getDeleteAssistantsAssistantIdMutationKey() {
  return ['assistants', '/assistants/{assistant_id}', 'DELETE'] as const
}

export function getDeleteAssistantsAssistantIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.assistants>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.assistants>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.assistants>['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<typeof client.assistants>['delete']>[0]
      options?: Parameters<ReturnType<typeof client.assistants>['delete']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteAssistantsAssistantIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.assistants(toValue(params)).delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeleteAssistantsAssistantId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.assistants>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.assistants>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.assistants>['delete']>>,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<ReturnType<typeof client.assistants>['delete']>[0]
            options?: Parameters<ReturnType<typeof client.assistants>['delete']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteAssistantsAssistantIdMutationOptions<TError, TOnMutateResult>(
    params,
  )
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPostAudioSpeechMutationKey() {
  return ['audio', '/audio/speech', 'POST'] as const
}

export function getPostAudioSpeechMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.audio.speech.post>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.audio.speech.post>>, { error: null }>['data'],
    TError,
    {
      body: Parameters<typeof client.audio.speech.post>[0]
      options?: Parameters<typeof client.audio.speech.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostAudioSpeechMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.audio.speech.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostAudioSpeech<
  TError = Exclude<Awaited<ReturnType<typeof client.audio.speech.post>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<Awaited<ReturnType<typeof client.audio.speech.post>>, { error: null }>['data'],
          TError,
          {
            body: Parameters<typeof client.audio.speech.post>[0]
            options?: Parameters<typeof client.audio.speech.post>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostAudioSpeechMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPostAudioTranscriptionsMutationKey() {
  return ['audio', '/audio/transcriptions', 'POST'] as const
}

export function getPostAudioTranscriptionsMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.audio.transcriptions.post>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.audio.transcriptions.post>>, { error: null }>['data'],
    TError,
    {
      body: Parameters<typeof client.audio.transcriptions.post>[0]
      options?: Parameters<typeof client.audio.transcriptions.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostAudioTranscriptionsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.audio.transcriptions.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostAudioTranscriptions<
  TError = Exclude<Awaited<ReturnType<typeof client.audio.transcriptions.post>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<typeof client.audio.transcriptions.post>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<typeof client.audio.transcriptions.post>[0]
            options?: Parameters<typeof client.audio.transcriptions.post>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostAudioTranscriptionsMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPostAudioTranslationsMutationKey() {
  return ['audio', '/audio/translations', 'POST'] as const
}

export function getPostAudioTranslationsMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.audio.translations.post>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.audio.translations.post>>, { error: null }>['data'],
    TError,
    {
      body: Parameters<typeof client.audio.translations.post>[0]
      options?: Parameters<typeof client.audio.translations.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostAudioTranslationsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.audio.translations.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostAudioTranslations<
  TError = Exclude<Awaited<ReturnType<typeof client.audio.translations.post>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<typeof client.audio.translations.post>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<typeof client.audio.translations.post>[0]
            options?: Parameters<typeof client.audio.translations.post>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostAudioTranslationsMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getAudioVoiceConsentsQueryKey(
  options?: Parameters<typeof client.audio.voice_consents.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['audio', '/audio/voice_consents', keyArgs] as const
}

export function getAudioVoiceConsentsQueryOptions(
  options?: Parameters<typeof client.audio.voice_consents.get>[0],
) {
  return {
    queryKey: getAudioVoiceConsentsQueryKey(options),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.audio.voice_consents.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useAudioVoiceConsents<
  TData = Extract<
    Awaited<ReturnType<typeof client.audio.voice_consents.get>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.audio.voice_consents.get>>['error'], null>,
>(
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<typeof client.audio.voice_consents.get>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<typeof client.audio.voice_consents.get>>,
            { error: null }
          >['data'],
          ReturnType<typeof getAudioVoiceConsentsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.audio.voice_consents.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: getAudioVoiceConsentsQueryKey(clientOptions),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.audio.voice_consents.get({
          ...clientOptions,
          fetch: { ...clientOptions?.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostAudioVoiceConsentsMutationKey() {
  return ['audio', '/audio/voice_consents', 'POST'] as const
}

export function getPostAudioVoiceConsentsMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.audio.voice_consents.post>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.audio.voice_consents.post>>, { error: null }>['data'],
    TError,
    {
      body: Parameters<typeof client.audio.voice_consents.post>[0]
      options?: Parameters<typeof client.audio.voice_consents.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostAudioVoiceConsentsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.audio.voice_consents.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostAudioVoiceConsents<
  TError = Exclude<Awaited<ReturnType<typeof client.audio.voice_consents.post>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<typeof client.audio.voice_consents.post>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<typeof client.audio.voice_consents.post>[0]
            options?: Parameters<typeof client.audio.voice_consents.post>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostAudioVoiceConsentsMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getAudioVoiceConsentsConsentIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.audio.voice_consents>[0]>,
) {
  return ['audio', '/audio/voice_consents/{consent_id}', toValue(params)] as const
}

export function getAudioVoiceConsentsConsentIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.audio.voice_consents>[0]>,
  options?: Parameters<ReturnType<typeof client.audio.voice_consents>['get']>[0],
) {
  return {
    queryKey: computed(() => getAudioVoiceConsentsConsentIdQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.audio
        .voice_consents(toValue(params))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useAudioVoiceConsentsConsentId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.audio.voice_consents>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.audio.voice_consents>['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.audio.voice_consents>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.audio.voice_consents>['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.audio.voice_consents>['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getAudioVoiceConsentsConsentIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.audio.voice_consents>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getAudioVoiceConsentsConsentIdQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.audio
          .voice_consents(toValue(params))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostAudioVoiceConsentsConsentIdMutationKey() {
  return ['audio', '/audio/voice_consents/{consent_id}', 'POST'] as const
}

export function getPostAudioVoiceConsentsConsentIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.audio.voice_consents>['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.audio.voice_consents>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.audio.voice_consents>['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.audio.voice_consents>['post']>[0]
      options?: Parameters<ReturnType<typeof client.audio.voice_consents>['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostAudioVoiceConsentsConsentIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.audio.voice_consents(toValue(params)).post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostAudioVoiceConsentsConsentId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.audio.voice_consents>['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.audio.voice_consents>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.audio.voice_consents>['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.audio.voice_consents>['post']>[0]
            options?: Parameters<ReturnType<typeof client.audio.voice_consents>['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostAudioVoiceConsentsConsentIdMutationOptions<
    TError,
    TOnMutateResult
  >(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getDeleteAudioVoiceConsentsConsentIdMutationKey() {
  return ['audio', '/audio/voice_consents/{consent_id}', 'DELETE'] as const
}

export function getDeleteAudioVoiceConsentsConsentIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.audio.voice_consents>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.audio.voice_consents>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.audio.voice_consents>['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<typeof client.audio.voice_consents>['delete']>[0]
      options?: Parameters<ReturnType<typeof client.audio.voice_consents>['delete']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteAudioVoiceConsentsConsentIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.audio
        .voice_consents(toValue(params))
        .delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeleteAudioVoiceConsentsConsentId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.audio.voice_consents>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.audio.voice_consents>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.audio.voice_consents>['delete']>>,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<ReturnType<typeof client.audio.voice_consents>['delete']>[0]
            options?: Parameters<ReturnType<typeof client.audio.voice_consents>['delete']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteAudioVoiceConsentsConsentIdMutationOptions<
    TError,
    TOnMutateResult
  >(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPostAudioVoicesMutationKey() {
  return ['audio', '/audio/voices', 'POST'] as const
}

export function getPostAudioVoicesMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.audio.voices.post>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.audio.voices.post>>, { error: null }>['data'],
    TError,
    {
      body: Parameters<typeof client.audio.voices.post>[0]
      options?: Parameters<typeof client.audio.voices.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostAudioVoicesMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.audio.voices.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostAudioVoices<
  TError = Exclude<Awaited<ReturnType<typeof client.audio.voices.post>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<Awaited<ReturnType<typeof client.audio.voices.post>>, { error: null }>['data'],
          TError,
          {
            body: Parameters<typeof client.audio.voices.post>[0]
            options?: Parameters<typeof client.audio.voices.post>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostAudioVoicesMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getDeleteAudioVoicesVoiceIdMutationKey() {
  return ['audio', '/audio/voices/{voice_id}', 'DELETE'] as const
}

export function getDeleteAudioVoicesVoiceIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.audio.voices>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.audio.voices>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.audio.voices>['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<typeof client.audio.voices>['delete']>[0]
      options?: Parameters<ReturnType<typeof client.audio.voices>['delete']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteAudioVoicesVoiceIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.audio.voices(toValue(params)).delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeleteAudioVoicesVoiceId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.audio.voices>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.audio.voices>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.audio.voices>['delete']>>,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<ReturnType<typeof client.audio.voices>['delete']>[0]
            options?: Parameters<ReturnType<typeof client.audio.voices>['delete']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteAudioVoicesVoiceIdMutationOptions<TError, TOnMutateResult>(
    params,
  )
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getBatchesQueryKey(options?: Parameters<typeof client.batches.get>[0]) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['batches', '/batches', keyArgs] as const
}

export function getBatchesQueryOptions(options?: Parameters<typeof client.batches.get>[0]) {
  return {
    queryKey: getBatchesQueryKey(options),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.batches.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useBatches<
  TData = Extract<Awaited<ReturnType<typeof client.batches.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.batches.get>>['error'], null>,
>(
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<Awaited<ReturnType<typeof client.batches.get>>, { error: null }>['data'],
          TError,
          TData,
          Extract<Awaited<ReturnType<typeof client.batches.get>>, { error: null }>['data'],
          ReturnType<typeof getBatchesQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.batches.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: getBatchesQueryKey(clientOptions),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.batches.get({
          ...clientOptions,
          fetch: { ...clientOptions?.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostBatchesMutationKey() {
  return ['batches', '/batches', 'POST'] as const
}

export function getPostBatchesMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.batches.post>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.batches.post>>, { error: null }>['data'],
    TError,
    {
      body: Parameters<typeof client.batches.post>[0]
      options?: Parameters<typeof client.batches.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostBatchesMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.batches.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostBatches<
  TError = Exclude<Awaited<ReturnType<typeof client.batches.post>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<Awaited<ReturnType<typeof client.batches.post>>, { error: null }>['data'],
          TError,
          {
            body: Parameters<typeof client.batches.post>[0]
            options?: Parameters<typeof client.batches.post>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostBatchesMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getBatchesBatchIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.batches>[0]>,
) {
  return ['batches', '/batches/{batch_id}', toValue(params)] as const
}

export function getBatchesBatchIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.batches>[0]>,
  options?: Parameters<ReturnType<typeof client.batches>['get']>[0],
) {
  return {
    queryKey: computed(() => getBatchesBatchIdQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .batches(toValue(params))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useBatchesBatchId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.batches>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.batches>['get']>>['error'], null>,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.batches>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.batches>['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.batches>['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getBatchesBatchIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.batches>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getBatchesBatchIdQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .batches(toValue(params))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostBatchesBatchIdCancelMutationKey() {
  return ['batches', '/batches/{batch_id}/cancel', 'POST'] as const
}

export function getPostBatchesBatchIdCancelMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.batches>['cancel']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.batches>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.batches>['cancel']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<typeof client.batches>['cancel']['post']>[0]
      options?: Parameters<ReturnType<typeof client.batches>['cancel']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostBatchesBatchIdCancelMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.batches(toValue(params)).cancel.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostBatchesBatchIdCancel<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.batches>['cancel']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.batches>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.batches>['cancel']['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<ReturnType<typeof client.batches>['cancel']['post']>[0]
            options?: Parameters<ReturnType<typeof client.batches>['cancel']['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostBatchesBatchIdCancelMutationOptions<TError, TOnMutateResult>(
    params,
  )
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getChatCompletionsQueryKey(
  options?: Parameters<typeof client.chat.completions.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['chat', '/chat/completions', keyArgs] as const
}

export function getChatCompletionsQueryOptions(
  options?: Parameters<typeof client.chat.completions.get>[0],
) {
  return {
    queryKey: getChatCompletionsQueryKey(options),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.chat.completions.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useChatCompletions<
  TData = Extract<Awaited<ReturnType<typeof client.chat.completions.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.chat.completions.get>>['error'], null>,
>(
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<Awaited<ReturnType<typeof client.chat.completions.get>>, { error: null }>['data'],
          TError,
          TData,
          Extract<Awaited<ReturnType<typeof client.chat.completions.get>>, { error: null }>['data'],
          ReturnType<typeof getChatCompletionsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.chat.completions.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: getChatCompletionsQueryKey(clientOptions),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.chat.completions.get({
          ...clientOptions,
          fetch: { ...clientOptions?.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostChatCompletionsMutationKey() {
  return ['chat', '/chat/completions', 'POST'] as const
}

export function getPostChatCompletionsMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.chat.completions.post>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.chat.completions.post>>, { error: null }>['data'],
    TError,
    {
      body: Parameters<typeof client.chat.completions.post>[0]
      options?: Parameters<typeof client.chat.completions.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostChatCompletionsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.chat.completions.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostChatCompletions<
  TError = Exclude<Awaited<ReturnType<typeof client.chat.completions.post>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<typeof client.chat.completions.post>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<typeof client.chat.completions.post>[0]
            options?: Parameters<typeof client.chat.completions.post>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostChatCompletionsMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getChatCompletionsCompletionIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.chat.completions>[0]>,
) {
  return ['chat', '/chat/completions/{completion_id}', toValue(params)] as const
}

export function getChatCompletionsCompletionIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.chat.completions>[0]>,
  options?: Parameters<ReturnType<typeof client.chat.completions>['get']>[0],
) {
  return {
    queryKey: computed(() => getChatCompletionsCompletionIdQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.chat
        .completions(toValue(params))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useChatCompletionsCompletionId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.chat.completions>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.chat.completions>['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.chat.completions>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.chat.completions>['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.chat.completions>['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getChatCompletionsCompletionIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.chat.completions>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getChatCompletionsCompletionIdQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.chat
          .completions(toValue(params))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostChatCompletionsCompletionIdMutationKey() {
  return ['chat', '/chat/completions/{completion_id}', 'POST'] as const
}

export function getPostChatCompletionsCompletionIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.chat.completions>['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.chat.completions>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.chat.completions>['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.chat.completions>['post']>[0]
      options?: Parameters<ReturnType<typeof client.chat.completions>['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostChatCompletionsCompletionIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.chat.completions(toValue(params)).post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostChatCompletionsCompletionId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.chat.completions>['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.chat.completions>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.chat.completions>['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.chat.completions>['post']>[0]
            options?: Parameters<ReturnType<typeof client.chat.completions>['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostChatCompletionsCompletionIdMutationOptions<
    TError,
    TOnMutateResult
  >(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getDeleteChatCompletionsCompletionIdMutationKey() {
  return ['chat', '/chat/completions/{completion_id}', 'DELETE'] as const
}

export function getDeleteChatCompletionsCompletionIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.chat.completions>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.chat.completions>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.chat.completions>['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<typeof client.chat.completions>['delete']>[0]
      options?: Parameters<ReturnType<typeof client.chat.completions>['delete']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteChatCompletionsCompletionIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.chat.completions(toValue(params)).delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeleteChatCompletionsCompletionId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.chat.completions>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.chat.completions>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.chat.completions>['delete']>>,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<ReturnType<typeof client.chat.completions>['delete']>[0]
            options?: Parameters<ReturnType<typeof client.chat.completions>['delete']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteChatCompletionsCompletionIdMutationOptions<
    TError,
    TOnMutateResult
  >(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getChatCompletionsCompletionIdMessagesQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.chat.completions>[0]>,
  options?: Parameters<ReturnType<typeof client.chat.completions>['messages']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['chat', '/chat/completions/{completion_id}/messages', toValue(params), keyArgs] as const
}

export function getChatCompletionsCompletionIdMessagesQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.chat.completions>[0]>,
  options?: Parameters<ReturnType<typeof client.chat.completions>['messages']['get']>[0],
) {
  return {
    queryKey: computed(() => getChatCompletionsCompletionIdMessagesQueryKey(params, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.chat
        .completions(toValue(params))
        .messages.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useChatCompletionsCompletionIdMessages<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.chat.completions>['messages']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.chat.completions>['messages']['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.chat.completions>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.chat.completions>['messages']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.chat.completions>['messages']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getChatCompletionsCompletionIdMessagesQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.chat.completions>['messages']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() =>
        getChatCompletionsCompletionIdMessagesQueryKey(params, clientOptions),
      ),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.chat
          .completions(toValue(params))
          .messages.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostCompletionsMutationKey() {
  return ['completions', '/completions', 'POST'] as const
}

export function getPostCompletionsMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.completions.post>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.completions.post>>, { error: null }>['data'],
    TError,
    {
      body: Parameters<typeof client.completions.post>[0]
      options?: Parameters<typeof client.completions.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostCompletionsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.completions.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostCompletions<
  TError = Exclude<Awaited<ReturnType<typeof client.completions.post>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<Awaited<ReturnType<typeof client.completions.post>>, { error: null }>['data'],
          TError,
          {
            body: Parameters<typeof client.completions.post>[0]
            options?: Parameters<typeof client.completions.post>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostCompletionsMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getContainersQueryKey(options?: Parameters<typeof client.containers.get>[0]) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['containers', '/containers', keyArgs] as const
}

export function getContainersQueryOptions(options?: Parameters<typeof client.containers.get>[0]) {
  return {
    queryKey: getContainersQueryKey(options),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.containers.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useContainers<
  TData = Extract<Awaited<ReturnType<typeof client.containers.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.containers.get>>['error'], null>,
>(
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<Awaited<ReturnType<typeof client.containers.get>>, { error: null }>['data'],
          TError,
          TData,
          Extract<Awaited<ReturnType<typeof client.containers.get>>, { error: null }>['data'],
          ReturnType<typeof getContainersQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.containers.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: getContainersQueryKey(clientOptions),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.containers.get({
          ...clientOptions,
          fetch: { ...clientOptions?.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostContainersMutationKey() {
  return ['containers', '/containers', 'POST'] as const
}

export function getPostContainersMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.containers.post>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.containers.post>>, { error: null }>['data'],
    TError,
    {
      body: Parameters<typeof client.containers.post>[0]
      options?: Parameters<typeof client.containers.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostContainersMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.containers.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostContainers<
  TError = Exclude<Awaited<ReturnType<typeof client.containers.post>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<Awaited<ReturnType<typeof client.containers.post>>, { error: null }>['data'],
          TError,
          {
            body: Parameters<typeof client.containers.post>[0]
            options?: Parameters<typeof client.containers.post>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostContainersMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getContainersContainerIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.containers>[0]>,
) {
  return ['containers', '/containers/{container_id}', toValue(params)] as const
}

export function getContainersContainerIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.containers>[0]>,
  options?: Parameters<ReturnType<typeof client.containers>['get']>[0],
) {
  return {
    queryKey: computed(() => getContainersContainerIdQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .containers(toValue(params))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useContainersContainerId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.containers>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.containers>['get']>>['error'], null>,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.containers>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.containers>['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.containers>['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getContainersContainerIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.containers>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getContainersContainerIdQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .containers(toValue(params))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getDeleteContainersContainerIdMutationKey() {
  return ['containers', '/containers/{container_id}', 'DELETE'] as const
}

export function getDeleteContainersContainerIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.containers>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.containers>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.containers>['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<typeof client.containers>['delete']>[0]
      options?: Parameters<ReturnType<typeof client.containers>['delete']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteContainersContainerIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.containers(toValue(params)).delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeleteContainersContainerId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.containers>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.containers>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.containers>['delete']>>,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<ReturnType<typeof client.containers>['delete']>[0]
            options?: Parameters<ReturnType<typeof client.containers>['delete']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteContainersContainerIdMutationOptions<TError, TOnMutateResult>(
    params,
  )
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getContainersContainerIdFilesQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.containers>[0]>,
  options?: Parameters<ReturnType<typeof client.containers>['files']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['containers', '/containers/{container_id}/files', toValue(params), keyArgs] as const
}

export function getContainersContainerIdFilesQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.containers>[0]>,
  options?: Parameters<ReturnType<typeof client.containers>['files']['get']>[0],
) {
  return {
    queryKey: computed(() => getContainersContainerIdFilesQueryKey(params, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .containers(toValue(params))
        .files.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useContainersContainerIdFiles<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.containers>['files']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.containers>['files']['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.containers>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.containers>['files']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.containers>['files']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getContainersContainerIdFilesQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.containers>['files']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getContainersContainerIdFilesQueryKey(params, clientOptions)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .containers(toValue(params))
          .files.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostContainersContainerIdFilesMutationKey() {
  return ['containers', '/containers/{container_id}/files', 'POST'] as const
}

export function getPostContainersContainerIdFilesMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.containers>['files']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.containers>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.containers>['files']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.containers>['files']['post']>[0]
      options?: Parameters<ReturnType<typeof client.containers>['files']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostContainersContainerIdFilesMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.containers(toValue(params)).files.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostContainersContainerIdFiles<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.containers>['files']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.containers>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.containers>['files']['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.containers>['files']['post']>[0]
            options?: Parameters<ReturnType<typeof client.containers>['files']['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostContainersContainerIdFilesMutationOptions<
    TError,
    TOnMutateResult
  >(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getContainersContainerIdFilesFileIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.containers>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.containers>['files']>[0]>,
) {
  return [
    'containers',
    '/containers/{container_id}/files/{file_id}',
    toValue(params),
    toValue(params2),
  ] as const
}

export function getContainersContainerIdFilesFileIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.containers>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.containers>['files']>[0]>,
  options?: Parameters<ReturnType<ReturnType<typeof client.containers>['files']>['get']>[0],
) {
  return {
    queryKey: computed(() => getContainersContainerIdFilesFileIdQueryKey(params, params2)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .containers(toValue(params))
        .files(toValue(params2))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useContainersContainerIdFilesFileId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.containers>['files']>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.containers>['files']>['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.containers>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.containers>['files']>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<ReturnType<typeof client.containers>['files']>['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<ReturnType<typeof client.containers>['files']>['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getContainersContainerIdFilesFileIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<ReturnType<typeof client.containers>['files']>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getContainersContainerIdFilesFileIdQueryKey(params, params2)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .containers(toValue(params))
          .files(toValue(params2))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getDeleteContainersContainerIdFilesFileIdMutationKey() {
  return ['containers', '/containers/{container_id}/files/{file_id}', 'DELETE'] as const
}

export function getDeleteContainersContainerIdFilesFileIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.containers>['files']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.containers>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.containers>['files']>[0]>,
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.containers>['files']>['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<ReturnType<typeof client.containers>['files']>['delete']>[0]
      options?: Parameters<ReturnType<ReturnType<typeof client.containers>['files']>['delete']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteContainersContainerIdFilesFileIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .containers(toValue(params))
        .files(toValue(params2))
        .delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeleteContainersContainerIdFilesFileId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.containers>['files']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.containers>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.containers>['files']>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<ReturnType<ReturnType<typeof client.containers>['files']>['delete']>
            >,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<
              ReturnType<ReturnType<typeof client.containers>['files']>['delete']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.containers>['files']>['delete']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteContainersContainerIdFilesFileIdMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getContainersContainerIdFilesFileIdContentQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.containers>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.containers>['files']>[0]>,
) {
  return [
    'containers',
    '/containers/{container_id}/files/{file_id}/content',
    toValue(params),
    toValue(params2),
  ] as const
}

export function getContainersContainerIdFilesFileIdContentQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.containers>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.containers>['files']>[0]>,
  options?: Parameters<
    ReturnType<ReturnType<typeof client.containers>['files']>['content']['get']
  >[0],
) {
  return {
    queryKey: computed(() => getContainersContainerIdFilesFileIdContentQueryKey(params, params2)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .containers(toValue(params))
        .files(toValue(params2))
        .content.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useContainersContainerIdFilesFileIdContent<
  TData = Extract<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.containers>['files']>['content']['get']>
    >,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.containers>['files']>['content']['get']>
    >['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.containers>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.containers>['files']>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<
              ReturnType<
                ReturnType<ReturnType<typeof client.containers>['files']>['content']['get']
              >
            >,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<
              ReturnType<
                ReturnType<ReturnType<typeof client.containers>['files']>['content']['get']
              >
            >,
            { error: null }
          >['data'],
          ReturnType<typeof getContainersContainerIdFilesFileIdContentQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<
      ReturnType<ReturnType<typeof client.containers>['files']>['content']['get']
    >[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getContainersContainerIdFilesFileIdContentQueryKey(params, params2)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .containers(toValue(params))
          .files(toValue(params2))
          .content.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getConversationsConversationIdItemsQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.conversations>[0]>,
  options?: Parameters<ReturnType<typeof client.conversations>['items']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'conversations',
    '/conversations/{conversation_id}/items',
    toValue(params),
    keyArgs,
  ] as const
}

export function getConversationsConversationIdItemsQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.conversations>[0]>,
  options?: Parameters<ReturnType<typeof client.conversations>['items']['get']>[0],
) {
  return {
    queryKey: computed(() => getConversationsConversationIdItemsQueryKey(params, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .conversations(toValue(params))
        .items.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useConversationsConversationIdItems<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.conversations>['items']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.conversations>['items']['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.conversations>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.conversations>['items']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.conversations>['items']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getConversationsConversationIdItemsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.conversations>['items']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getConversationsConversationIdItemsQueryKey(params, clientOptions)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .conversations(toValue(params))
          .items.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostConversationsConversationIdItemsMutationKey() {
  return ['conversations', '/conversations/{conversation_id}/items', 'POST'] as const
}

export function getPostConversationsConversationIdItemsMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.conversations>['items']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.conversations>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.conversations>['items']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.conversations>['items']['post']>[0]
      options?: Parameters<ReturnType<typeof client.conversations>['items']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostConversationsConversationIdItemsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.conversations(toValue(params)).items.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostConversationsConversationIdItems<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.conversations>['items']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.conversations>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.conversations>['items']['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.conversations>['items']['post']>[0]
            options?: Parameters<ReturnType<typeof client.conversations>['items']['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostConversationsConversationIdItemsMutationOptions<
    TError,
    TOnMutateResult
  >(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getConversationsConversationIdItemsItemIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.conversations>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.conversations>['items']>[0]>,
  options?: Parameters<ReturnType<ReturnType<typeof client.conversations>['items']>['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'conversations',
    '/conversations/{conversation_id}/items/{item_id}',
    toValue(params),
    toValue(params2),
    keyArgs,
  ] as const
}

export function getConversationsConversationIdItemsItemIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.conversations>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.conversations>['items']>[0]>,
  options?: Parameters<ReturnType<ReturnType<typeof client.conversations>['items']>['get']>[0],
) {
  return {
    queryKey: computed(() =>
      getConversationsConversationIdItemsItemIdQueryKey(params, params2, options),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .conversations(toValue(params))
        .items(toValue(params2))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useConversationsConversationIdItemsItemId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.conversations>['items']>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.conversations>['items']>['get']>
    >['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.conversations>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.conversations>['items']>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<
              ReturnType<ReturnType<ReturnType<typeof client.conversations>['items']>['get']>
            >,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<
              ReturnType<ReturnType<ReturnType<typeof client.conversations>['items']>['get']>
            >,
            { error: null }
          >['data'],
          ReturnType<typeof getConversationsConversationIdItemsItemIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<ReturnType<typeof client.conversations>['items']>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() =>
        getConversationsConversationIdItemsItemIdQueryKey(params, params2, clientOptions),
      ),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .conversations(toValue(params))
          .items(toValue(params2))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getDeleteConversationsConversationIdItemsItemIdMutationKey() {
  return ['conversations', '/conversations/{conversation_id}/items/{item_id}', 'DELETE'] as const
}

export function getDeleteConversationsConversationIdItemsItemIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.conversations>['items']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.conversations>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.conversations>['items']>[0]>,
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.conversations>['items']>['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<ReturnType<typeof client.conversations>['items']>['delete']>[0]
      options?: Parameters<
        ReturnType<ReturnType<typeof client.conversations>['items']>['delete']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteConversationsConversationIdItemsItemIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .conversations(toValue(params))
        .items(toValue(params2))
        .delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeleteConversationsConversationIdItemsItemId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.conversations>['items']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.conversations>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.conversations>['items']>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<ReturnType<ReturnType<typeof client.conversations>['items']>['delete']>
            >,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<
              ReturnType<ReturnType<typeof client.conversations>['items']>['delete']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.conversations>['items']>['delete']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteConversationsConversationIdItemsItemIdMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPostEmbeddingsMutationKey() {
  return ['embeddings', '/embeddings', 'POST'] as const
}

export function getPostEmbeddingsMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.embeddings.post>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.embeddings.post>>, { error: null }>['data'],
    TError,
    {
      body: Parameters<typeof client.embeddings.post>[0]
      options?: Parameters<typeof client.embeddings.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostEmbeddingsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.embeddings.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostEmbeddings<
  TError = Exclude<Awaited<ReturnType<typeof client.embeddings.post>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<Awaited<ReturnType<typeof client.embeddings.post>>, { error: null }>['data'],
          TError,
          {
            body: Parameters<typeof client.embeddings.post>[0]
            options?: Parameters<typeof client.embeddings.post>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostEmbeddingsMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getEvalsQueryKey(options?: Parameters<typeof client.evals.get>[0]) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['evals', '/evals', keyArgs] as const
}

export function getEvalsQueryOptions(options?: Parameters<typeof client.evals.get>[0]) {
  return {
    queryKey: getEvalsQueryKey(options),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.evals.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useEvals<
  TData = Extract<Awaited<ReturnType<typeof client.evals.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.evals.get>>['error'], null>,
>(
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<Awaited<ReturnType<typeof client.evals.get>>, { error: null }>['data'],
          TError,
          TData,
          Extract<Awaited<ReturnType<typeof client.evals.get>>, { error: null }>['data'],
          ReturnType<typeof getEvalsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.evals.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: getEvalsQueryKey(clientOptions),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.evals.get({
          ...clientOptions,
          fetch: { ...clientOptions?.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostEvalsMutationKey() {
  return ['evals', '/evals', 'POST'] as const
}

export function getPostEvalsMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.evals.post>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.evals.post>>, { error: null }>['data'],
    TError,
    {
      body: Parameters<typeof client.evals.post>[0]
      options?: Parameters<typeof client.evals.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostEvalsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.evals.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostEvals<
  TError = Exclude<Awaited<ReturnType<typeof client.evals.post>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<Awaited<ReturnType<typeof client.evals.post>>, { error: null }>['data'],
          TError,
          {
            body: Parameters<typeof client.evals.post>[0]
            options?: Parameters<typeof client.evals.post>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostEvalsMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getEvalsEvalIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.evals>[0]>,
) {
  return ['evals', '/evals/{eval_id}', toValue(params)] as const
}

export function getEvalsEvalIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.evals>[0]>,
  options?: Parameters<ReturnType<typeof client.evals>['get']>[0],
) {
  return {
    queryKey: computed(() => getEvalsEvalIdQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .evals(toValue(params))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useEvalsEvalId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.evals>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.evals>['get']>>['error'], null>,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.evals>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.evals>['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.evals>['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getEvalsEvalIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.evals>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getEvalsEvalIdQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .evals(toValue(params))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostEvalsEvalIdMutationKey() {
  return ['evals', '/evals/{eval_id}', 'POST'] as const
}

export function getPostEvalsEvalIdMutationOptions<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.evals>['post']>>['error'], null>,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.evals>[0]>) {
  return mutationOptions<
    Extract<Awaited<ReturnType<ReturnType<typeof client.evals>['post']>>, { error: null }>['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.evals>['post']>[0]
      options?: Parameters<ReturnType<typeof client.evals>['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostEvalsEvalIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.evals(toValue(params)).post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostEvalsEvalId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.evals>['post']>>['error'], null>,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.evals>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.evals>['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.evals>['post']>[0]
            options?: Parameters<ReturnType<typeof client.evals>['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostEvalsEvalIdMutationOptions<TError, TOnMutateResult>(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getDeleteEvalsEvalIdMutationKey() {
  return ['evals', '/evals/{eval_id}', 'DELETE'] as const
}

export function getDeleteEvalsEvalIdMutationOptions<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.evals>['delete']>>['error'], null>,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.evals>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.evals>['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<typeof client.evals>['delete']>[0]
      options?: Parameters<ReturnType<typeof client.evals>['delete']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteEvalsEvalIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.evals(toValue(params)).delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeleteEvalsEvalId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.evals>['delete']>>['error'], null>,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.evals>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.evals>['delete']>>,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<ReturnType<typeof client.evals>['delete']>[0]
            options?: Parameters<ReturnType<typeof client.evals>['delete']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteEvalsEvalIdMutationOptions<TError, TOnMutateResult>(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getEvalsEvalIdRunsQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.evals>[0]>,
  options?: Parameters<ReturnType<typeof client.evals>['runs']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['evals', '/evals/{eval_id}/runs', toValue(params), keyArgs] as const
}

export function getEvalsEvalIdRunsQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.evals>[0]>,
  options?: Parameters<ReturnType<typeof client.evals>['runs']['get']>[0],
) {
  return {
    queryKey: computed(() => getEvalsEvalIdRunsQueryKey(params, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .evals(toValue(params))
        .runs.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useEvalsEvalIdRuns<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.evals>['runs']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.evals>['runs']['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.evals>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.evals>['runs']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.evals>['runs']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getEvalsEvalIdRunsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.evals>['runs']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getEvalsEvalIdRunsQueryKey(params, clientOptions)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .evals(toValue(params))
          .runs.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostEvalsEvalIdRunsMutationKey() {
  return ['evals', '/evals/{eval_id}/runs', 'POST'] as const
}

export function getPostEvalsEvalIdRunsMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.evals>['runs']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.evals>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.evals>['runs']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.evals>['runs']['post']>[0]
      options?: Parameters<ReturnType<typeof client.evals>['runs']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostEvalsEvalIdRunsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.evals(toValue(params)).runs.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostEvalsEvalIdRuns<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.evals>['runs']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.evals>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.evals>['runs']['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.evals>['runs']['post']>[0]
            options?: Parameters<ReturnType<typeof client.evals>['runs']['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostEvalsEvalIdRunsMutationOptions<TError, TOnMutateResult>(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getEvalsEvalIdRunsRunIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.evals>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.evals>['runs']>[0]>,
) {
  return ['evals', '/evals/{eval_id}/runs/{run_id}', toValue(params), toValue(params2)] as const
}

export function getEvalsEvalIdRunsRunIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.evals>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.evals>['runs']>[0]>,
  options?: Parameters<ReturnType<ReturnType<typeof client.evals>['runs']>['get']>[0],
) {
  return {
    queryKey: computed(() => getEvalsEvalIdRunsRunIdQueryKey(params, params2)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .evals(toValue(params))
        .runs(toValue(params2))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useEvalsEvalIdRunsRunId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.evals>['runs']>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.evals>['runs']>['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.evals>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.evals>['runs']>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<ReturnType<typeof client.evals>['runs']>['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<ReturnType<typeof client.evals>['runs']>['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getEvalsEvalIdRunsRunIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<ReturnType<typeof client.evals>['runs']>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getEvalsEvalIdRunsRunIdQueryKey(params, params2)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .evals(toValue(params))
          .runs(toValue(params2))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getDeleteEvalsEvalIdRunsRunIdMutationKey() {
  return ['evals', '/evals/{eval_id}/runs/{run_id}', 'DELETE'] as const
}

export function getDeleteEvalsEvalIdRunsRunIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.evals>['runs']>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.evals>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.evals>['runs']>[0]>,
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.evals>['runs']>['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<ReturnType<typeof client.evals>['runs']>['delete']>[0]
      options?: Parameters<ReturnType<ReturnType<typeof client.evals>['runs']>['delete']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteEvalsEvalIdRunsRunIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .evals(toValue(params))
        .runs(toValue(params2))
        .delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeleteEvalsEvalIdRunsRunId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.evals>['runs']>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.evals>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.evals>['runs']>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<ReturnType<typeof client.evals>['runs']>['delete']>>,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<ReturnType<ReturnType<typeof client.evals>['runs']>['delete']>[0]
            options?: Parameters<ReturnType<ReturnType<typeof client.evals>['runs']>['delete']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteEvalsEvalIdRunsRunIdMutationOptions<TError, TOnMutateResult>(
    params,
    params2,
  )
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPostEvalsEvalIdRunsRunIdCancelMutationKey() {
  return ['evals', '/evals/{eval_id}/runs/{run_id}/cancel', 'POST'] as const
}

export function getPostEvalsEvalIdRunsRunIdCancelMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.evals>['runs']>['cancel']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.evals>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.evals>['runs']>[0]>,
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.evals>['runs']>['cancel']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<ReturnType<typeof client.evals>['runs']>['cancel']['post']>[0]
      options?: Parameters<ReturnType<ReturnType<typeof client.evals>['runs']>['cancel']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostEvalsEvalIdRunsRunIdCancelMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .evals(toValue(params))
        .runs(toValue(params2))
        .cancel.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostEvalsEvalIdRunsRunIdCancel<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.evals>['runs']>['cancel']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.evals>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.evals>['runs']>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<ReturnType<ReturnType<typeof client.evals>['runs']>['cancel']['post']>
            >,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<
              ReturnType<ReturnType<typeof client.evals>['runs']>['cancel']['post']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.evals>['runs']>['cancel']['post']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostEvalsEvalIdRunsRunIdCancelMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getEvalsEvalIdRunsRunIdOutputItemsQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.evals>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.evals>['runs']>[0]>,
  options?: Parameters<
    ReturnType<ReturnType<typeof client.evals>['runs']>['output_items']['get']
  >[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'evals',
    '/evals/{eval_id}/runs/{run_id}/output_items',
    toValue(params),
    toValue(params2),
    keyArgs,
  ] as const
}

export function getEvalsEvalIdRunsRunIdOutputItemsQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.evals>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.evals>['runs']>[0]>,
  options?: Parameters<
    ReturnType<ReturnType<typeof client.evals>['runs']>['output_items']['get']
  >[0],
) {
  return {
    queryKey: computed(() => getEvalsEvalIdRunsRunIdOutputItemsQueryKey(params, params2, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .evals(toValue(params))
        .runs(toValue(params2))
        .output_items.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useEvalsEvalIdRunsRunIdOutputItems<
  TData = Extract<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.evals>['runs']>['output_items']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.evals>['runs']>['output_items']['get']>
    >['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.evals>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.evals>['runs']>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<
              ReturnType<ReturnType<ReturnType<typeof client.evals>['runs']>['output_items']['get']>
            >,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<
              ReturnType<ReturnType<ReturnType<typeof client.evals>['runs']>['output_items']['get']>
            >,
            { error: null }
          >['data'],
          ReturnType<typeof getEvalsEvalIdRunsRunIdOutputItemsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<
      ReturnType<ReturnType<typeof client.evals>['runs']>['output_items']['get']
    >[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() =>
        getEvalsEvalIdRunsRunIdOutputItemsQueryKey(params, params2, clientOptions),
      ),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .evals(toValue(params))
          .runs(toValue(params2))
          .output_items.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getEvalsEvalIdRunsRunIdOutputItemsOutputItemIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.evals>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.evals>['runs']>[0]>,
  params3: MaybeRefOrGetter<
    Parameters<ReturnType<ReturnType<typeof client.evals>['runs']>['output_items']>[0]
  >,
) {
  return [
    'evals',
    '/evals/{eval_id}/runs/{run_id}/output_items/{output_item_id}',
    toValue(params),
    toValue(params2),
    toValue(params3),
  ] as const
}

export function getEvalsEvalIdRunsRunIdOutputItemsOutputItemIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.evals>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.evals>['runs']>[0]>,
  params3: MaybeRefOrGetter<
    Parameters<ReturnType<ReturnType<typeof client.evals>['runs']>['output_items']>[0]
  >,
  options?: Parameters<
    ReturnType<ReturnType<ReturnType<typeof client.evals>['runs']>['output_items']>['get']
  >[0],
) {
  return {
    queryKey: computed(() =>
      getEvalsEvalIdRunsRunIdOutputItemsOutputItemIdQueryKey(params, params2, params3),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .evals(toValue(params))
        .runs(toValue(params2))
        .output_items(toValue(params3))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useEvalsEvalIdRunsRunIdOutputItemsOutputItemId<
  TData = Extract<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<ReturnType<typeof client.evals>['runs']>['output_items']>['get']
      >
    >,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<ReturnType<typeof client.evals>['runs']>['output_items']>['get']
      >
    >['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.evals>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.evals>['runs']>[0]>,
  params3: MaybeRefOrGetter<
    Parameters<ReturnType<ReturnType<typeof client.evals>['runs']>['output_items']>[0]
  >,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<
              ReturnType<
                ReturnType<
                  ReturnType<ReturnType<typeof client.evals>['runs']>['output_items']
                >['get']
              >
            >,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<
              ReturnType<
                ReturnType<
                  ReturnType<ReturnType<typeof client.evals>['runs']>['output_items']
                >['get']
              >
            >,
            { error: null }
          >['data'],
          ReturnType<typeof getEvalsEvalIdRunsRunIdOutputItemsOutputItemIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<
      ReturnType<ReturnType<ReturnType<typeof client.evals>['runs']>['output_items']>['get']
    >[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() =>
        getEvalsEvalIdRunsRunIdOutputItemsOutputItemIdQueryKey(params, params2, params3),
      ),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .evals(toValue(params))
          .runs(toValue(params2))
          .output_items(toValue(params3))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getFilesQueryKey(options?: Parameters<typeof client.files.get>[0]) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['files', '/files', keyArgs] as const
}

export function getFilesQueryOptions(options?: Parameters<typeof client.files.get>[0]) {
  return {
    queryKey: getFilesQueryKey(options),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.files.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useFiles<
  TData = Extract<Awaited<ReturnType<typeof client.files.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.files.get>>['error'], null>,
>(
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<Awaited<ReturnType<typeof client.files.get>>, { error: null }>['data'],
          TError,
          TData,
          Extract<Awaited<ReturnType<typeof client.files.get>>, { error: null }>['data'],
          ReturnType<typeof getFilesQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.files.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: getFilesQueryKey(clientOptions),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.files.get({
          ...clientOptions,
          fetch: { ...clientOptions?.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostFilesMutationKey() {
  return ['files', '/files', 'POST'] as const
}

export function getPostFilesMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.files.post>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.files.post>>, { error: null }>['data'],
    TError,
    {
      body: Parameters<typeof client.files.post>[0]
      options?: Parameters<typeof client.files.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostFilesMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.files.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostFiles<
  TError = Exclude<Awaited<ReturnType<typeof client.files.post>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<Awaited<ReturnType<typeof client.files.post>>, { error: null }>['data'],
          TError,
          {
            body: Parameters<typeof client.files.post>[0]
            options?: Parameters<typeof client.files.post>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostFilesMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getFilesFileIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.files>[0]>,
) {
  return ['files', '/files/{file_id}', toValue(params)] as const
}

export function getFilesFileIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.files>[0]>,
  options?: Parameters<ReturnType<typeof client.files>['get']>[0],
) {
  return {
    queryKey: computed(() => getFilesFileIdQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .files(toValue(params))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useFilesFileId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.files>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.files>['get']>>['error'], null>,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.files>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.files>['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.files>['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getFilesFileIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.files>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getFilesFileIdQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .files(toValue(params))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getDeleteFilesFileIdMutationKey() {
  return ['files', '/files/{file_id}', 'DELETE'] as const
}

export function getDeleteFilesFileIdMutationOptions<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.files>['delete']>>['error'], null>,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.files>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.files>['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<typeof client.files>['delete']>[0]
      options?: Parameters<ReturnType<typeof client.files>['delete']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteFilesFileIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.files(toValue(params)).delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeleteFilesFileId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.files>['delete']>>['error'], null>,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.files>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.files>['delete']>>,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<ReturnType<typeof client.files>['delete']>[0]
            options?: Parameters<ReturnType<typeof client.files>['delete']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteFilesFileIdMutationOptions<TError, TOnMutateResult>(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getFilesFileIdContentQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.files>[0]>,
) {
  return ['files', '/files/{file_id}/content', toValue(params)] as const
}

export function getFilesFileIdContentQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.files>[0]>,
  options?: Parameters<ReturnType<typeof client.files>['content']['get']>[0],
) {
  return {
    queryKey: computed(() => getFilesFileIdContentQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .files(toValue(params))
        .content.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useFilesFileIdContent<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.files>['content']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.files>['content']['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.files>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.files>['content']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.files>['content']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getFilesFileIdContentQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.files>['content']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getFilesFileIdContentQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .files(toValue(params))
          .content.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostFineTuningAlphaGradersRunMutationKey() {
  return ['fine_tuning', '/fine_tuning/alpha/graders/run', 'POST'] as const
}

export function getPostFineTuningAlphaGradersRunMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<typeof client.fine_tuning.alpha.graders.run.post>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<typeof client.fine_tuning.alpha.graders.run.post>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<typeof client.fine_tuning.alpha.graders.run.post>[0]
      options?: Parameters<typeof client.fine_tuning.alpha.graders.run.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostFineTuningAlphaGradersRunMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.fine_tuning.alpha.graders.run.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostFineTuningAlphaGradersRun<
  TError = Exclude<
    Awaited<ReturnType<typeof client.fine_tuning.alpha.graders.run.post>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<typeof client.fine_tuning.alpha.graders.run.post>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<typeof client.fine_tuning.alpha.graders.run.post>[0]
            options?: Parameters<typeof client.fine_tuning.alpha.graders.run.post>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostFineTuningAlphaGradersRunMutationOptions<
    TError,
    TOnMutateResult
  >()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPostFineTuningAlphaGradersValidateMutationKey() {
  return ['fine_tuning', '/fine_tuning/alpha/graders/validate', 'POST'] as const
}

export function getPostFineTuningAlphaGradersValidateMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<typeof client.fine_tuning.alpha.graders.validate.post>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<typeof client.fine_tuning.alpha.graders.validate.post>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<typeof client.fine_tuning.alpha.graders.validate.post>[0]
      options?: Parameters<typeof client.fine_tuning.alpha.graders.validate.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostFineTuningAlphaGradersValidateMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.fine_tuning.alpha.graders.validate.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostFineTuningAlphaGradersValidate<
  TError = Exclude<
    Awaited<ReturnType<typeof client.fine_tuning.alpha.graders.validate.post>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<typeof client.fine_tuning.alpha.graders.validate.post>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<typeof client.fine_tuning.alpha.graders.validate.post>[0]
            options?: Parameters<typeof client.fine_tuning.alpha.graders.validate.post>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostFineTuningAlphaGradersValidateMutationOptions<
    TError,
    TOnMutateResult
  >()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getFineTuningCheckpointsFineTunedModelCheckpointPermissionsQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.fine_tuning.checkpoints>[0]>,
  options?: Parameters<ReturnType<typeof client.fine_tuning.checkpoints>['permissions']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'fine_tuning',
    '/fine_tuning/checkpoints/{fine_tuned_model_checkpoint}/permissions',
    toValue(params),
    keyArgs,
  ] as const
}

export function getFineTuningCheckpointsFineTunedModelCheckpointPermissionsQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.fine_tuning.checkpoints>[0]>,
  options?: Parameters<ReturnType<typeof client.fine_tuning.checkpoints>['permissions']['get']>[0],
) {
  return {
    queryKey: computed(() =>
      getFineTuningCheckpointsFineTunedModelCheckpointPermissionsQueryKey(params, options),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.fine_tuning
        .checkpoints(toValue(params))
        .permissions.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useFineTuningCheckpointsFineTunedModelCheckpointPermissions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.fine_tuning.checkpoints>['permissions']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.fine_tuning.checkpoints>['permissions']['get']>
    >['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.fine_tuning.checkpoints>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<
              ReturnType<ReturnType<typeof client.fine_tuning.checkpoints>['permissions']['get']>
            >,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<
              ReturnType<ReturnType<typeof client.fine_tuning.checkpoints>['permissions']['get']>
            >,
            { error: null }
          >['data'],
          ReturnType<typeof getFineTuningCheckpointsFineTunedModelCheckpointPermissionsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.fine_tuning.checkpoints>['permissions']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() =>
        getFineTuningCheckpointsFineTunedModelCheckpointPermissionsQueryKey(params, clientOptions),
      ),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.fine_tuning
          .checkpoints(toValue(params))
          .permissions.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostFineTuningCheckpointsFineTunedModelCheckpointPermissionsMutationKey() {
  return [
    'fine_tuning',
    '/fine_tuning/checkpoints/{fine_tuned_model_checkpoint}/permissions',
    'POST',
  ] as const
}

export function getPostFineTuningCheckpointsFineTunedModelCheckpointPermissionsMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.fine_tuning.checkpoints>['permissions']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.fine_tuning.checkpoints>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.fine_tuning.checkpoints>['permissions']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.fine_tuning.checkpoints>['permissions']['post']>[0]
      options?: Parameters<
        ReturnType<typeof client.fine_tuning.checkpoints>['permissions']['post']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostFineTuningCheckpointsFineTunedModelCheckpointPermissionsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.fine_tuning
        .checkpoints(toValue(params))
        .permissions.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostFineTuningCheckpointsFineTunedModelCheckpointPermissions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.fine_tuning.checkpoints>['permissions']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.fine_tuning.checkpoints>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<ReturnType<typeof client.fine_tuning.checkpoints>['permissions']['post']>
            >,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<
              ReturnType<typeof client.fine_tuning.checkpoints>['permissions']['post']
            >[0]
            options?: Parameters<
              ReturnType<typeof client.fine_tuning.checkpoints>['permissions']['post']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults =
    getPostFineTuningCheckpointsFineTunedModelCheckpointPermissionsMutationOptions<
      TError,
      TOnMutateResult
    >(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getDeleteFineTuningCheckpointsFineTunedModelCheckpointPermissionsPermissionIdMutationKey() {
  return [
    'fine_tuning',
    '/fine_tuning/checkpoints/{fine_tuned_model_checkpoint}/permissions/{permission_id}',
    'DELETE',
  ] as const
}

export function getDeleteFineTuningCheckpointsFineTunedModelCheckpointPermissionsPermissionIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<typeof client.fine_tuning.checkpoints>['permissions']>['delete']
      >
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.fine_tuning.checkpoints>[0]>,
  params2: MaybeRefOrGetter<
    Parameters<ReturnType<typeof client.fine_tuning.checkpoints>['permissions']>[0]
  >,
) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<
          ReturnType<ReturnType<typeof client.fine_tuning.checkpoints>['permissions']>['delete']
        >
      >,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<
        ReturnType<ReturnType<typeof client.fine_tuning.checkpoints>['permissions']>['delete']
      >[0]
      options?: Parameters<
        ReturnType<ReturnType<typeof client.fine_tuning.checkpoints>['permissions']>['delete']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey:
      getDeleteFineTuningCheckpointsFineTunedModelCheckpointPermissionsPermissionIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.fine_tuning
        .checkpoints(toValue(params))
        .permissions(toValue(params2))
        .delete(body, options)
      if (error) throw error
      return data
    },
  })
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
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.fine_tuning.checkpoints>[0]>,
  params2: MaybeRefOrGetter<
    Parameters<ReturnType<typeof client.fine_tuning.checkpoints>['permissions']>[0]
  >,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<
                ReturnType<
                  ReturnType<typeof client.fine_tuning.checkpoints>['permissions']
                >['delete']
              >
            >,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<
              ReturnType<ReturnType<typeof client.fine_tuning.checkpoints>['permissions']>['delete']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.fine_tuning.checkpoints>['permissions']>['delete']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults =
    getDeleteFineTuningCheckpointsFineTunedModelCheckpointPermissionsPermissionIdMutationOptions<
      TError,
      TOnMutateResult
    >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getFineTuningJobsQueryKey(
  options?: Parameters<typeof client.fine_tuning.jobs.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['fine_tuning', '/fine_tuning/jobs', keyArgs] as const
}

export function getFineTuningJobsQueryOptions(
  options?: Parameters<typeof client.fine_tuning.jobs.get>[0],
) {
  return {
    queryKey: getFineTuningJobsQueryKey(options),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.fine_tuning.jobs.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useFineTuningJobs<
  TData = Extract<Awaited<ReturnType<typeof client.fine_tuning.jobs.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.fine_tuning.jobs.get>>['error'], null>,
>(
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<Awaited<ReturnType<typeof client.fine_tuning.jobs.get>>, { error: null }>['data'],
          TError,
          TData,
          Extract<Awaited<ReturnType<typeof client.fine_tuning.jobs.get>>, { error: null }>['data'],
          ReturnType<typeof getFineTuningJobsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.fine_tuning.jobs.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: getFineTuningJobsQueryKey(clientOptions),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.fine_tuning.jobs.get({
          ...clientOptions,
          fetch: { ...clientOptions?.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostFineTuningJobsMutationKey() {
  return ['fine_tuning', '/fine_tuning/jobs', 'POST'] as const
}

export function getPostFineTuningJobsMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.fine_tuning.jobs.post>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.fine_tuning.jobs.post>>, { error: null }>['data'],
    TError,
    {
      body: Parameters<typeof client.fine_tuning.jobs.post>[0]
      options?: Parameters<typeof client.fine_tuning.jobs.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostFineTuningJobsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.fine_tuning.jobs.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostFineTuningJobs<
  TError = Exclude<Awaited<ReturnType<typeof client.fine_tuning.jobs.post>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<typeof client.fine_tuning.jobs.post>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<typeof client.fine_tuning.jobs.post>[0]
            options?: Parameters<typeof client.fine_tuning.jobs.post>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostFineTuningJobsMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getFineTuningJobsFineTuningJobIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.fine_tuning.jobs>[0]>,
) {
  return ['fine_tuning', '/fine_tuning/jobs/{fine_tuning_job_id}', toValue(params)] as const
}

export function getFineTuningJobsFineTuningJobIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.fine_tuning.jobs>[0]>,
  options?: Parameters<ReturnType<typeof client.fine_tuning.jobs>['get']>[0],
) {
  return {
    queryKey: computed(() => getFineTuningJobsFineTuningJobIdQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.fine_tuning
        .jobs(toValue(params))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useFineTuningJobsFineTuningJobId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.fine_tuning.jobs>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.fine_tuning.jobs>['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.fine_tuning.jobs>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.fine_tuning.jobs>['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.fine_tuning.jobs>['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getFineTuningJobsFineTuningJobIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.fine_tuning.jobs>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getFineTuningJobsFineTuningJobIdQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.fine_tuning
          .jobs(toValue(params))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostFineTuningJobsFineTuningJobIdCancelMutationKey() {
  return ['fine_tuning', '/fine_tuning/jobs/{fine_tuning_job_id}/cancel', 'POST'] as const
}

export function getPostFineTuningJobsFineTuningJobIdCancelMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.fine_tuning.jobs>['cancel']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.fine_tuning.jobs>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.fine_tuning.jobs>['cancel']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<typeof client.fine_tuning.jobs>['cancel']['post']>[0]
      options?: Parameters<ReturnType<typeof client.fine_tuning.jobs>['cancel']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostFineTuningJobsFineTuningJobIdCancelMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.fine_tuning
        .jobs(toValue(params))
        .cancel.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostFineTuningJobsFineTuningJobIdCancel<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.fine_tuning.jobs>['cancel']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.fine_tuning.jobs>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.fine_tuning.jobs>['cancel']['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<ReturnType<typeof client.fine_tuning.jobs>['cancel']['post']>[0]
            options?: Parameters<ReturnType<typeof client.fine_tuning.jobs>['cancel']['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostFineTuningJobsFineTuningJobIdCancelMutationOptions<
    TError,
    TOnMutateResult
  >(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getFineTuningJobsFineTuningJobIdCheckpointsQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.fine_tuning.jobs>[0]>,
  options?: Parameters<ReturnType<typeof client.fine_tuning.jobs>['checkpoints']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'fine_tuning',
    '/fine_tuning/jobs/{fine_tuning_job_id}/checkpoints',
    toValue(params),
    keyArgs,
  ] as const
}

export function getFineTuningJobsFineTuningJobIdCheckpointsQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.fine_tuning.jobs>[0]>,
  options?: Parameters<ReturnType<typeof client.fine_tuning.jobs>['checkpoints']['get']>[0],
) {
  return {
    queryKey: computed(() => getFineTuningJobsFineTuningJobIdCheckpointsQueryKey(params, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.fine_tuning
        .jobs(toValue(params))
        .checkpoints.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useFineTuningJobsFineTuningJobIdCheckpoints<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.fine_tuning.jobs>['checkpoints']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.fine_tuning.jobs>['checkpoints']['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.fine_tuning.jobs>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.fine_tuning.jobs>['checkpoints']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.fine_tuning.jobs>['checkpoints']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getFineTuningJobsFineTuningJobIdCheckpointsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.fine_tuning.jobs>['checkpoints']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() =>
        getFineTuningJobsFineTuningJobIdCheckpointsQueryKey(params, clientOptions),
      ),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.fine_tuning
          .jobs(toValue(params))
          .checkpoints.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getFineTuningJobsFineTuningJobIdEventsQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.fine_tuning.jobs>[0]>,
  options?: Parameters<ReturnType<typeof client.fine_tuning.jobs>['events']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'fine_tuning',
    '/fine_tuning/jobs/{fine_tuning_job_id}/events',
    toValue(params),
    keyArgs,
  ] as const
}

export function getFineTuningJobsFineTuningJobIdEventsQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.fine_tuning.jobs>[0]>,
  options?: Parameters<ReturnType<typeof client.fine_tuning.jobs>['events']['get']>[0],
) {
  return {
    queryKey: computed(() => getFineTuningJobsFineTuningJobIdEventsQueryKey(params, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.fine_tuning
        .jobs(toValue(params))
        .events.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useFineTuningJobsFineTuningJobIdEvents<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.fine_tuning.jobs>['events']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.fine_tuning.jobs>['events']['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.fine_tuning.jobs>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.fine_tuning.jobs>['events']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.fine_tuning.jobs>['events']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getFineTuningJobsFineTuningJobIdEventsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.fine_tuning.jobs>['events']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() =>
        getFineTuningJobsFineTuningJobIdEventsQueryKey(params, clientOptions),
      ),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.fine_tuning
          .jobs(toValue(params))
          .events.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostFineTuningJobsFineTuningJobIdPauseMutationKey() {
  return ['fine_tuning', '/fine_tuning/jobs/{fine_tuning_job_id}/pause', 'POST'] as const
}

export function getPostFineTuningJobsFineTuningJobIdPauseMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.fine_tuning.jobs>['pause']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.fine_tuning.jobs>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.fine_tuning.jobs>['pause']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<typeof client.fine_tuning.jobs>['pause']['post']>[0]
      options?: Parameters<ReturnType<typeof client.fine_tuning.jobs>['pause']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostFineTuningJobsFineTuningJobIdPauseMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.fine_tuning
        .jobs(toValue(params))
        .pause.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostFineTuningJobsFineTuningJobIdPause<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.fine_tuning.jobs>['pause']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.fine_tuning.jobs>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.fine_tuning.jobs>['pause']['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<ReturnType<typeof client.fine_tuning.jobs>['pause']['post']>[0]
            options?: Parameters<ReturnType<typeof client.fine_tuning.jobs>['pause']['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostFineTuningJobsFineTuningJobIdPauseMutationOptions<
    TError,
    TOnMutateResult
  >(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPostFineTuningJobsFineTuningJobIdResumeMutationKey() {
  return ['fine_tuning', '/fine_tuning/jobs/{fine_tuning_job_id}/resume', 'POST'] as const
}

export function getPostFineTuningJobsFineTuningJobIdResumeMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.fine_tuning.jobs>['resume']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.fine_tuning.jobs>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.fine_tuning.jobs>['resume']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<typeof client.fine_tuning.jobs>['resume']['post']>[0]
      options?: Parameters<ReturnType<typeof client.fine_tuning.jobs>['resume']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostFineTuningJobsFineTuningJobIdResumeMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.fine_tuning
        .jobs(toValue(params))
        .resume.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostFineTuningJobsFineTuningJobIdResume<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.fine_tuning.jobs>['resume']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.fine_tuning.jobs>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.fine_tuning.jobs>['resume']['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<ReturnType<typeof client.fine_tuning.jobs>['resume']['post']>[0]
            options?: Parameters<ReturnType<typeof client.fine_tuning.jobs>['resume']['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostFineTuningJobsFineTuningJobIdResumeMutationOptions<
    TError,
    TOnMutateResult
  >(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPostImagesEditsMutationKey() {
  return ['images', '/images/edits', 'POST'] as const
}

export function getPostImagesEditsMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.images.edits.post>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.images.edits.post>>, { error: null }>['data'],
    TError,
    {
      body: Parameters<typeof client.images.edits.post>[0]
      options?: Parameters<typeof client.images.edits.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostImagesEditsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.images.edits.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostImagesEdits<
  TError = Exclude<Awaited<ReturnType<typeof client.images.edits.post>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<Awaited<ReturnType<typeof client.images.edits.post>>, { error: null }>['data'],
          TError,
          {
            body: Parameters<typeof client.images.edits.post>[0]
            options?: Parameters<typeof client.images.edits.post>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostImagesEditsMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPostImagesGenerationsMutationKey() {
  return ['images', '/images/generations', 'POST'] as const
}

export function getPostImagesGenerationsMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.images.generations.post>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.images.generations.post>>, { error: null }>['data'],
    TError,
    {
      body: Parameters<typeof client.images.generations.post>[0]
      options?: Parameters<typeof client.images.generations.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostImagesGenerationsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.images.generations.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostImagesGenerations<
  TError = Exclude<Awaited<ReturnType<typeof client.images.generations.post>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<typeof client.images.generations.post>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<typeof client.images.generations.post>[0]
            options?: Parameters<typeof client.images.generations.post>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostImagesGenerationsMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPostImagesVariationsMutationKey() {
  return ['images', '/images/variations', 'POST'] as const
}

export function getPostImagesVariationsMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.images.variations.post>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.images.variations.post>>, { error: null }>['data'],
    TError,
    {
      body: Parameters<typeof client.images.variations.post>[0]
      options?: Parameters<typeof client.images.variations.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostImagesVariationsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.images.variations.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostImagesVariations<
  TError = Exclude<Awaited<ReturnType<typeof client.images.variations.post>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<typeof client.images.variations.post>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<typeof client.images.variations.post>[0]
            options?: Parameters<typeof client.images.variations.post>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostImagesVariationsMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPostLiveSessionsMutationKey() {
  return ['live', '/live/sessions', 'POST'] as const
}

export function getPostLiveSessionsMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.live.sessions.post>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.live.sessions.post>>, { error: null }>['data'],
    TError,
    {
      body: Parameters<typeof client.live.sessions.post>[0]
      options?: Parameters<typeof client.live.sessions.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostLiveSessionsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.live.sessions.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostLiveSessions<
  TError = Exclude<Awaited<ReturnType<typeof client.live.sessions.post>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<Awaited<ReturnType<typeof client.live.sessions.post>>, { error: null }>['data'],
          TError,
          {
            body: Parameters<typeof client.live.sessions.post>[0]
            options?: Parameters<typeof client.live.sessions.post>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostLiveSessionsMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPostLiveSessionsSessionIdAcceptMutationKey() {
  return ['live', '/live/sessions/{session_id}/accept', 'POST'] as const
}

export function getPostLiveSessionsSessionIdAcceptMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.live.sessions>['accept']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.live.sessions>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.live.sessions>['accept']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.live.sessions>['accept']['post']>[0]
      options?: Parameters<ReturnType<typeof client.live.sessions>['accept']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostLiveSessionsSessionIdAcceptMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.live.sessions(toValue(params)).accept.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostLiveSessionsSessionIdAccept<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.live.sessions>['accept']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.live.sessions>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.live.sessions>['accept']['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.live.sessions>['accept']['post']>[0]
            options?: Parameters<ReturnType<typeof client.live.sessions>['accept']['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostLiveSessionsSessionIdAcceptMutationOptions<
    TError,
    TOnMutateResult
  >(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPostLiveSessionsSessionIdForkMutationKey() {
  return ['live', '/live/sessions/{session_id}/fork', 'POST'] as const
}

export function getPostLiveSessionsSessionIdForkMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.live.sessions>['fork']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.live.sessions>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.live.sessions>['fork']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.live.sessions>['fork']['post']>[0]
      options?: Parameters<ReturnType<typeof client.live.sessions>['fork']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostLiveSessionsSessionIdForkMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.live.sessions(toValue(params)).fork.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostLiveSessionsSessionIdFork<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.live.sessions>['fork']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.live.sessions>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.live.sessions>['fork']['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.live.sessions>['fork']['post']>[0]
            options?: Parameters<ReturnType<typeof client.live.sessions>['fork']['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostLiveSessionsSessionIdForkMutationOptions<TError, TOnMutateResult>(
    params,
  )
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPostLiveSessionsSessionIdHangupMutationKey() {
  return ['live', '/live/sessions/{session_id}/hangup', 'POST'] as const
}

export function getPostLiveSessionsSessionIdHangupMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.live.sessions>['hangup']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.live.sessions>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.live.sessions>['hangup']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<typeof client.live.sessions>['hangup']['post']>[0]
      options?: Parameters<ReturnType<typeof client.live.sessions>['hangup']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostLiveSessionsSessionIdHangupMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.live.sessions(toValue(params)).hangup.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostLiveSessionsSessionIdHangup<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.live.sessions>['hangup']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.live.sessions>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.live.sessions>['hangup']['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<ReturnType<typeof client.live.sessions>['hangup']['post']>[0]
            options?: Parameters<ReturnType<typeof client.live.sessions>['hangup']['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostLiveSessionsSessionIdHangupMutationOptions<
    TError,
    TOnMutateResult
  >(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPostLiveSessionsSessionIdReferMutationKey() {
  return ['live', '/live/sessions/{session_id}/refer', 'POST'] as const
}

export function getPostLiveSessionsSessionIdReferMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.live.sessions>['refer']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.live.sessions>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.live.sessions>['refer']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.live.sessions>['refer']['post']>[0]
      options?: Parameters<ReturnType<typeof client.live.sessions>['refer']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostLiveSessionsSessionIdReferMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.live.sessions(toValue(params)).refer.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostLiveSessionsSessionIdRefer<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.live.sessions>['refer']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.live.sessions>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.live.sessions>['refer']['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.live.sessions>['refer']['post']>[0]
            options?: Parameters<ReturnType<typeof client.live.sessions>['refer']['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostLiveSessionsSessionIdReferMutationOptions<
    TError,
    TOnMutateResult
  >(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPostLiveSessionsSessionIdRejectMutationKey() {
  return ['live', '/live/sessions/{session_id}/reject', 'POST'] as const
}

export function getPostLiveSessionsSessionIdRejectMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.live.sessions>['reject']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.live.sessions>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.live.sessions>['reject']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.live.sessions>['reject']['post']>[0]
      options?: Parameters<ReturnType<typeof client.live.sessions>['reject']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostLiveSessionsSessionIdRejectMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.live.sessions(toValue(params)).reject.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostLiveSessionsSessionIdReject<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.live.sessions>['reject']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.live.sessions>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.live.sessions>['reject']['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.live.sessions>['reject']['post']>[0]
            options?: Parameters<ReturnType<typeof client.live.sessions>['reject']['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostLiveSessionsSessionIdRejectMutationOptions<
    TError,
    TOnMutateResult
  >(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getModelsQueryKey() {
  return ['models', '/models'] as const
}

export function getModelsQueryOptions(options?: Parameters<typeof client.models.get>[0]) {
  return {
    queryKey: getModelsQueryKey(),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.models.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useModels<
  TData = Extract<Awaited<ReturnType<typeof client.models.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.models.get>>['error'], null>,
>(
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<Awaited<ReturnType<typeof client.models.get>>, { error: null }>['data'],
          TError,
          TData,
          Extract<Awaited<ReturnType<typeof client.models.get>>, { error: null }>['data'],
          ReturnType<typeof getModelsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.models.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: getModelsQueryKey(),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.models.get({
          ...clientOptions,
          fetch: { ...clientOptions?.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getModelsModelQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.models>[0]>,
) {
  return ['models', '/models/{model}', toValue(params)] as const
}

export function getModelsModelQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.models>[0]>,
  options?: Parameters<ReturnType<typeof client.models>['get']>[0],
) {
  return {
    queryKey: computed(() => getModelsModelQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .models(toValue(params))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useModelsModel<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.models>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.models>['get']>>['error'], null>,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.models>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.models>['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.models>['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getModelsModelQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.models>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getModelsModelQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .models(toValue(params))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getDeleteModelsModelMutationKey() {
  return ['models', '/models/{model}', 'DELETE'] as const
}

export function getDeleteModelsModelMutationOptions<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.models>['delete']>>['error'], null>,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.models>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.models>['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<typeof client.models>['delete']>[0]
      options?: Parameters<ReturnType<typeof client.models>['delete']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteModelsModelMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.models(toValue(params)).delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeleteModelsModel<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.models>['delete']>>['error'], null>,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.models>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.models>['delete']>>,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<ReturnType<typeof client.models>['delete']>[0]
            options?: Parameters<ReturnType<typeof client.models>['delete']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteModelsModelMutationOptions<TError, TOnMutateResult>(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPostModerationsMutationKey() {
  return ['moderations', '/moderations', 'POST'] as const
}

export function getPostModerationsMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.moderations.post>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.moderations.post>>, { error: null }>['data'],
    TError,
    {
      body: Parameters<typeof client.moderations.post>[0]
      options?: Parameters<typeof client.moderations.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostModerationsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.moderations.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostModerations<
  TError = Exclude<Awaited<ReturnType<typeof client.moderations.post>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<Awaited<ReturnType<typeof client.moderations.post>>, { error: null }>['data'],
          TError,
          {
            body: Parameters<typeof client.moderations.post>[0]
            options?: Parameters<typeof client.moderations.post>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostModerationsMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getOrganizationAdminApiKeysQueryKey(
  options?: Parameters<typeof client.organization.admin_api_keys.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['organization', '/organization/admin_api_keys', keyArgs] as const
}

export function getOrganizationAdminApiKeysQueryOptions(
  options?: Parameters<typeof client.organization.admin_api_keys.get>[0],
) {
  return {
    queryKey: getOrganizationAdminApiKeysQueryKey(options),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.organization.admin_api_keys.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useOrganizationAdminApiKeys<
  TData = Extract<
    Awaited<ReturnType<typeof client.organization.admin_api_keys.get>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<typeof client.organization.admin_api_keys.get>>['error'],
    null
  >,
>(
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<typeof client.organization.admin_api_keys.get>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<typeof client.organization.admin_api_keys.get>>,
            { error: null }
          >['data'],
          ReturnType<typeof getOrganizationAdminApiKeysQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.organization.admin_api_keys.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: getOrganizationAdminApiKeysQueryKey(clientOptions),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.organization.admin_api_keys.get({
          ...clientOptions,
          fetch: { ...clientOptions?.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostOrganizationAdminApiKeysMutationKey() {
  return ['organization', '/organization/admin_api_keys', 'POST'] as const
}

export function getPostOrganizationAdminApiKeysMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<typeof client.organization.admin_api_keys.post>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<typeof client.organization.admin_api_keys.post>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<typeof client.organization.admin_api_keys.post>[0]
      options?: Parameters<typeof client.organization.admin_api_keys.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostOrganizationAdminApiKeysMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.organization.admin_api_keys.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostOrganizationAdminApiKeys<
  TError = Exclude<
    Awaited<ReturnType<typeof client.organization.admin_api_keys.post>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<typeof client.organization.admin_api_keys.post>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<typeof client.organization.admin_api_keys.post>[0]
            options?: Parameters<typeof client.organization.admin_api_keys.post>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostOrganizationAdminApiKeysMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getOrganizationAdminApiKeysKeyIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.admin_api_keys>[0]>,
) {
  return ['organization', '/organization/admin_api_keys/{key_id}', toValue(params)] as const
}

export function getOrganizationAdminApiKeysKeyIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.admin_api_keys>[0]>,
  options?: Parameters<ReturnType<typeof client.organization.admin_api_keys>['get']>[0],
) {
  return {
    queryKey: computed(() => getOrganizationAdminApiKeysKeyIdQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.organization
        .admin_api_keys(toValue(params))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useOrganizationAdminApiKeysKeyId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.organization.admin_api_keys>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.admin_api_keys>['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.admin_api_keys>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.organization.admin_api_keys>['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.organization.admin_api_keys>['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getOrganizationAdminApiKeysKeyIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.organization.admin_api_keys>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getOrganizationAdminApiKeysKeyIdQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.organization
          .admin_api_keys(toValue(params))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getDeleteOrganizationAdminApiKeysKeyIdMutationKey() {
  return ['organization', '/organization/admin_api_keys/{key_id}', 'DELETE'] as const
}

export function getDeleteOrganizationAdminApiKeysKeyIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.admin_api_keys>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.organization.admin_api_keys>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.organization.admin_api_keys>['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<typeof client.organization.admin_api_keys>['delete']>[0]
      options?: Parameters<ReturnType<typeof client.organization.admin_api_keys>['delete']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteOrganizationAdminApiKeysKeyIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.organization
        .admin_api_keys(toValue(params))
        .delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeleteOrganizationAdminApiKeysKeyId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.admin_api_keys>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.admin_api_keys>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.organization.admin_api_keys>['delete']>>,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<ReturnType<typeof client.organization.admin_api_keys>['delete']>[0]
            options?: Parameters<ReturnType<typeof client.organization.admin_api_keys>['delete']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteOrganizationAdminApiKeysKeyIdMutationOptions<
    TError,
    TOnMutateResult
  >(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getOrganizationAuditLogsQueryKey(
  options?: Parameters<typeof client.organization.audit_logs.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['organization', '/organization/audit_logs', keyArgs] as const
}

export function getOrganizationAuditLogsQueryOptions(
  options?: Parameters<typeof client.organization.audit_logs.get>[0],
) {
  return {
    queryKey: getOrganizationAuditLogsQueryKey(options),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.organization.audit_logs.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useOrganizationAuditLogs<
  TData = Extract<
    Awaited<ReturnType<typeof client.organization.audit_logs.get>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.organization.audit_logs.get>>['error'], null>,
>(
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<typeof client.organization.audit_logs.get>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<typeof client.organization.audit_logs.get>>,
            { error: null }
          >['data'],
          ReturnType<typeof getOrganizationAuditLogsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.organization.audit_logs.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: getOrganizationAuditLogsQueryKey(clientOptions),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.organization.audit_logs.get({
          ...clientOptions,
          fetch: { ...clientOptions?.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getOrganizationCertificatesQueryKey(
  options?: Parameters<typeof client.organization.certificates.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['organization', '/organization/certificates', keyArgs] as const
}

export function getOrganizationCertificatesQueryOptions(
  options?: Parameters<typeof client.organization.certificates.get>[0],
) {
  return {
    queryKey: getOrganizationCertificatesQueryKey(options),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.organization.certificates.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useOrganizationCertificates<
  TData = Extract<
    Awaited<ReturnType<typeof client.organization.certificates.get>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.organization.certificates.get>>['error'], null>,
>(
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<typeof client.organization.certificates.get>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<typeof client.organization.certificates.get>>,
            { error: null }
          >['data'],
          ReturnType<typeof getOrganizationCertificatesQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.organization.certificates.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: getOrganizationCertificatesQueryKey(clientOptions),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.organization.certificates.get({
          ...clientOptions,
          fetch: { ...clientOptions?.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostOrganizationCertificatesMutationKey() {
  return ['organization', '/organization/certificates', 'POST'] as const
}

export function getPostOrganizationCertificatesMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<typeof client.organization.certificates.post>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<typeof client.organization.certificates.post>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<typeof client.organization.certificates.post>[0]
      options?: Parameters<typeof client.organization.certificates.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostOrganizationCertificatesMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.organization.certificates.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostOrganizationCertificates<
  TError = Exclude<
    Awaited<ReturnType<typeof client.organization.certificates.post>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<typeof client.organization.certificates.post>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<typeof client.organization.certificates.post>[0]
            options?: Parameters<typeof client.organization.certificates.post>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostOrganizationCertificatesMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPostOrganizationCertificatesActivateMutationKey() {
  return ['organization', '/organization/certificates/activate', 'POST'] as const
}

export function getPostOrganizationCertificatesActivateMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<typeof client.organization.certificates.activate.post>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<typeof client.organization.certificates.activate.post>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<typeof client.organization.certificates.activate.post>[0]
      options?: Parameters<typeof client.organization.certificates.activate.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostOrganizationCertificatesActivateMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.organization.certificates.activate.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostOrganizationCertificatesActivate<
  TError = Exclude<
    Awaited<ReturnType<typeof client.organization.certificates.activate.post>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<typeof client.organization.certificates.activate.post>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<typeof client.organization.certificates.activate.post>[0]
            options?: Parameters<typeof client.organization.certificates.activate.post>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostOrganizationCertificatesActivateMutationOptions<
    TError,
    TOnMutateResult
  >()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPostOrganizationCertificatesDeactivateMutationKey() {
  return ['organization', '/organization/certificates/deactivate', 'POST'] as const
}

export function getPostOrganizationCertificatesDeactivateMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<typeof client.organization.certificates.deactivate.post>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<typeof client.organization.certificates.deactivate.post>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<typeof client.organization.certificates.deactivate.post>[0]
      options?: Parameters<typeof client.organization.certificates.deactivate.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostOrganizationCertificatesDeactivateMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.organization.certificates.deactivate.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostOrganizationCertificatesDeactivate<
  TError = Exclude<
    Awaited<ReturnType<typeof client.organization.certificates.deactivate.post>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<typeof client.organization.certificates.deactivate.post>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<typeof client.organization.certificates.deactivate.post>[0]
            options?: Parameters<typeof client.organization.certificates.deactivate.post>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostOrganizationCertificatesDeactivateMutationOptions<
    TError,
    TOnMutateResult
  >()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getOrganizationCertificatesCertificateIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.certificates>[0]>,
  options?: Parameters<ReturnType<typeof client.organization.certificates>['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'organization',
    '/organization/certificates/{certificate_id}',
    toValue(params),
    keyArgs,
  ] as const
}

export function getOrganizationCertificatesCertificateIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.certificates>[0]>,
  options?: Parameters<ReturnType<typeof client.organization.certificates>['get']>[0],
) {
  return {
    queryKey: computed(() => getOrganizationCertificatesCertificateIdQueryKey(params, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.organization
        .certificates(toValue(params))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useOrganizationCertificatesCertificateId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.organization.certificates>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.certificates>['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.certificates>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.organization.certificates>['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.organization.certificates>['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getOrganizationCertificatesCertificateIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.organization.certificates>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() =>
        getOrganizationCertificatesCertificateIdQueryKey(params, clientOptions),
      ),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.organization
          .certificates(toValue(params))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostOrganizationCertificatesCertificateIdMutationKey() {
  return ['organization', '/organization/certificates/{certificate_id}', 'POST'] as const
}

export function getPostOrganizationCertificatesCertificateIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.certificates>['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.organization.certificates>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.organization.certificates>['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.organization.certificates>['post']>[0]
      options?: Parameters<ReturnType<typeof client.organization.certificates>['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostOrganizationCertificatesCertificateIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.organization
        .certificates(toValue(params))
        .post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostOrganizationCertificatesCertificateId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.certificates>['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.certificates>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.organization.certificates>['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.organization.certificates>['post']>[0]
            options?: Parameters<ReturnType<typeof client.organization.certificates>['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostOrganizationCertificatesCertificateIdMutationOptions<
    TError,
    TOnMutateResult
  >(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getDeleteOrganizationCertificatesCertificateIdMutationKey() {
  return ['organization', '/organization/certificates/{certificate_id}', 'DELETE'] as const
}

export function getDeleteOrganizationCertificatesCertificateIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.certificates>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.organization.certificates>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.organization.certificates>['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<typeof client.organization.certificates>['delete']>[0]
      options?: Parameters<ReturnType<typeof client.organization.certificates>['delete']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteOrganizationCertificatesCertificateIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.organization
        .certificates(toValue(params))
        .delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeleteOrganizationCertificatesCertificateId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.certificates>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.certificates>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.organization.certificates>['delete']>>,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<ReturnType<typeof client.organization.certificates>['delete']>[0]
            options?: Parameters<ReturnType<typeof client.organization.certificates>['delete']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteOrganizationCertificatesCertificateIdMutationOptions<
    TError,
    TOnMutateResult
  >(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getOrganizationCostsQueryKey(
  options: Parameters<typeof client.organization.costs.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['organization', '/organization/costs', keyArgs] as const
}

export function getOrganizationCostsQueryOptions(
  options: Parameters<typeof client.organization.costs.get>[0],
) {
  return {
    queryKey: getOrganizationCostsQueryKey(options),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.organization.costs.get({
        ...options,
        fetch: { ...options.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useOrganizationCosts<
  TData = Extract<
    Awaited<ReturnType<typeof client.organization.costs.get>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.organization.costs.get>>['error'], null>,
>(
  options: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<typeof client.organization.costs.get>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<typeof client.organization.costs.get>>,
            { error: null }
          >['data'],
          ReturnType<typeof getOrganizationCostsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.organization.costs.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options
  return useQuery(
    {
      ...queryOptions,
      queryKey: getOrganizationCostsQueryKey(clientOptions),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.organization.costs.get({
          ...clientOptions,
          fetch: { ...clientOptions.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getOrganizationDataRetentionQueryKey() {
  return ['organization', '/organization/data_retention'] as const
}

export function getOrganizationDataRetentionQueryOptions(
  options?: Parameters<typeof client.organization.data_retention.get>[0],
) {
  return {
    queryKey: getOrganizationDataRetentionQueryKey(),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.organization.data_retention.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useOrganizationDataRetention<
  TData = Extract<
    Awaited<ReturnType<typeof client.organization.data_retention.get>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<typeof client.organization.data_retention.get>>['error'],
    null
  >,
>(
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<typeof client.organization.data_retention.get>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<typeof client.organization.data_retention.get>>,
            { error: null }
          >['data'],
          ReturnType<typeof getOrganizationDataRetentionQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.organization.data_retention.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: getOrganizationDataRetentionQueryKey(),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.organization.data_retention.get({
          ...clientOptions,
          fetch: { ...clientOptions?.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostOrganizationDataRetentionMutationKey() {
  return ['organization', '/organization/data_retention', 'POST'] as const
}

export function getPostOrganizationDataRetentionMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<typeof client.organization.data_retention.post>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<typeof client.organization.data_retention.post>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<typeof client.organization.data_retention.post>[0]
      options?: Parameters<typeof client.organization.data_retention.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostOrganizationDataRetentionMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.organization.data_retention.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostOrganizationDataRetention<
  TError = Exclude<
    Awaited<ReturnType<typeof client.organization.data_retention.post>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<typeof client.organization.data_retention.post>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<typeof client.organization.data_retention.post>[0]
            options?: Parameters<typeof client.organization.data_retention.post>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostOrganizationDataRetentionMutationOptions<
    TError,
    TOnMutateResult
  >()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getOrganizationGroupsQueryKey(
  options?: Parameters<typeof client.organization.groups.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['organization', '/organization/groups', keyArgs] as const
}

export function getOrganizationGroupsQueryOptions(
  options?: Parameters<typeof client.organization.groups.get>[0],
) {
  return {
    queryKey: getOrganizationGroupsQueryKey(options),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.organization.groups.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useOrganizationGroups<
  TData = Extract<
    Awaited<ReturnType<typeof client.organization.groups.get>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.organization.groups.get>>['error'], null>,
>(
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<typeof client.organization.groups.get>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<typeof client.organization.groups.get>>,
            { error: null }
          >['data'],
          ReturnType<typeof getOrganizationGroupsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.organization.groups.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: getOrganizationGroupsQueryKey(clientOptions),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.organization.groups.get({
          ...clientOptions,
          fetch: { ...clientOptions?.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostOrganizationGroupsMutationKey() {
  return ['organization', '/organization/groups', 'POST'] as const
}

export function getPostOrganizationGroupsMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.organization.groups.post>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.organization.groups.post>>, { error: null }>['data'],
    TError,
    {
      body: Parameters<typeof client.organization.groups.post>[0]
      options?: Parameters<typeof client.organization.groups.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostOrganizationGroupsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.organization.groups.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostOrganizationGroups<
  TError = Exclude<Awaited<ReturnType<typeof client.organization.groups.post>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<typeof client.organization.groups.post>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<typeof client.organization.groups.post>[0]
            options?: Parameters<typeof client.organization.groups.post>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostOrganizationGroupsMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getOrganizationGroupsGroupIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.groups>[0]>,
) {
  return ['organization', '/organization/groups/{group_id}', toValue(params)] as const
}

export function getOrganizationGroupsGroupIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.groups>[0]>,
  options?: Parameters<ReturnType<typeof client.organization.groups>['get']>[0],
) {
  return {
    queryKey: computed(() => getOrganizationGroupsGroupIdQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.organization
        .groups(toValue(params))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useOrganizationGroupsGroupId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.organization.groups>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.groups>['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.groups>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.organization.groups>['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.organization.groups>['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getOrganizationGroupsGroupIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.organization.groups>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getOrganizationGroupsGroupIdQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.organization
          .groups(toValue(params))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostOrganizationGroupsGroupIdMutationKey() {
  return ['organization', '/organization/groups/{group_id}', 'POST'] as const
}

export function getPostOrganizationGroupsGroupIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.groups>['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.organization.groups>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.organization.groups>['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.organization.groups>['post']>[0]
      options?: Parameters<ReturnType<typeof client.organization.groups>['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostOrganizationGroupsGroupIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.organization.groups(toValue(params)).post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostOrganizationGroupsGroupId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.groups>['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.groups>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.organization.groups>['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.organization.groups>['post']>[0]
            options?: Parameters<ReturnType<typeof client.organization.groups>['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostOrganizationGroupsGroupIdMutationOptions<TError, TOnMutateResult>(
    params,
  )
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getDeleteOrganizationGroupsGroupIdMutationKey() {
  return ['organization', '/organization/groups/{group_id}', 'DELETE'] as const
}

export function getDeleteOrganizationGroupsGroupIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.groups>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.organization.groups>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.organization.groups>['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<typeof client.organization.groups>['delete']>[0]
      options?: Parameters<ReturnType<typeof client.organization.groups>['delete']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteOrganizationGroupsGroupIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.organization
        .groups(toValue(params))
        .delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeleteOrganizationGroupsGroupId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.groups>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.groups>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.organization.groups>['delete']>>,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<ReturnType<typeof client.organization.groups>['delete']>[0]
            options?: Parameters<ReturnType<typeof client.organization.groups>['delete']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteOrganizationGroupsGroupIdMutationOptions<
    TError,
    TOnMutateResult
  >(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getOrganizationGroupsGroupIdRolesQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.groups>[0]>,
  options?: Parameters<ReturnType<typeof client.organization.groups>['roles']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'organization',
    '/organization/groups/{group_id}/roles',
    toValue(params),
    keyArgs,
  ] as const
}

export function getOrganizationGroupsGroupIdRolesQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.groups>[0]>,
  options?: Parameters<ReturnType<typeof client.organization.groups>['roles']['get']>[0],
) {
  return {
    queryKey: computed(() => getOrganizationGroupsGroupIdRolesQueryKey(params, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.organization
        .groups(toValue(params))
        .roles.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useOrganizationGroupsGroupIdRoles<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.organization.groups>['roles']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.groups>['roles']['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.groups>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.organization.groups>['roles']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.organization.groups>['roles']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getOrganizationGroupsGroupIdRolesQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.organization.groups>['roles']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getOrganizationGroupsGroupIdRolesQueryKey(params, clientOptions)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.organization
          .groups(toValue(params))
          .roles.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostOrganizationGroupsGroupIdRolesMutationKey() {
  return ['organization', '/organization/groups/{group_id}/roles', 'POST'] as const
}

export function getPostOrganizationGroupsGroupIdRolesMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.groups>['roles']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.organization.groups>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.organization.groups>['roles']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.organization.groups>['roles']['post']>[0]
      options?: Parameters<ReturnType<typeof client.organization.groups>['roles']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostOrganizationGroupsGroupIdRolesMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.organization
        .groups(toValue(params))
        .roles.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostOrganizationGroupsGroupIdRoles<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.groups>['roles']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.groups>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.organization.groups>['roles']['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.organization.groups>['roles']['post']>[0]
            options?: Parameters<ReturnType<typeof client.organization.groups>['roles']['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostOrganizationGroupsGroupIdRolesMutationOptions<
    TError,
    TOnMutateResult
  >(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getOrganizationGroupsGroupIdRolesRoleIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.groups>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.organization.groups>['roles']>[0]>,
) {
  return [
    'organization',
    '/organization/groups/{group_id}/roles/{role_id}',
    toValue(params),
    toValue(params2),
  ] as const
}

export function getOrganizationGroupsGroupIdRolesRoleIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.groups>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.organization.groups>['roles']>[0]>,
  options?: Parameters<
    ReturnType<ReturnType<typeof client.organization.groups>['roles']>['get']
  >[0],
) {
  return {
    queryKey: computed(() => getOrganizationGroupsGroupIdRolesRoleIdQueryKey(params, params2)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.organization
        .groups(toValue(params))
        .roles(toValue(params2))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useOrganizationGroupsGroupIdRolesRoleId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.organization.groups>['roles']>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.organization.groups>['roles']>['get']>
    >['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.groups>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.organization.groups>['roles']>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<
              ReturnType<ReturnType<ReturnType<typeof client.organization.groups>['roles']>['get']>
            >,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<
              ReturnType<ReturnType<ReturnType<typeof client.organization.groups>['roles']>['get']>
            >,
            { error: null }
          >['data'],
          ReturnType<typeof getOrganizationGroupsGroupIdRolesRoleIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<
      ReturnType<ReturnType<typeof client.organization.groups>['roles']>['get']
    >[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getOrganizationGroupsGroupIdRolesRoleIdQueryKey(params, params2)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.organization
          .groups(toValue(params))
          .roles(toValue(params2))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getDeleteOrganizationGroupsGroupIdRolesRoleIdMutationKey() {
  return ['organization', '/organization/groups/{group_id}/roles/{role_id}', 'DELETE'] as const
}

export function getDeleteOrganizationGroupsGroupIdRolesRoleIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.organization.groups>['roles']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.groups>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.organization.groups>['roles']>[0]>,
) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<ReturnType<ReturnType<typeof client.organization.groups>['roles']>['delete']>
      >,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<
        ReturnType<ReturnType<typeof client.organization.groups>['roles']>['delete']
      >[0]
      options?: Parameters<
        ReturnType<ReturnType<typeof client.organization.groups>['roles']>['delete']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteOrganizationGroupsGroupIdRolesRoleIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.organization
        .groups(toValue(params))
        .roles(toValue(params2))
        .delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeleteOrganizationGroupsGroupIdRolesRoleId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.organization.groups>['roles']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.groups>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.organization.groups>['roles']>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<
                ReturnType<ReturnType<typeof client.organization.groups>['roles']>['delete']
              >
            >,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<
              ReturnType<ReturnType<typeof client.organization.groups>['roles']>['delete']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.organization.groups>['roles']>['delete']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteOrganizationGroupsGroupIdRolesRoleIdMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getOrganizationGroupsGroupIdUsersQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.groups>[0]>,
  options?: Parameters<ReturnType<typeof client.organization.groups>['users']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'organization',
    '/organization/groups/{group_id}/users',
    toValue(params),
    keyArgs,
  ] as const
}

export function getOrganizationGroupsGroupIdUsersQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.groups>[0]>,
  options?: Parameters<ReturnType<typeof client.organization.groups>['users']['get']>[0],
) {
  return {
    queryKey: computed(() => getOrganizationGroupsGroupIdUsersQueryKey(params, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.organization
        .groups(toValue(params))
        .users.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useOrganizationGroupsGroupIdUsers<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.organization.groups>['users']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.groups>['users']['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.groups>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.organization.groups>['users']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.organization.groups>['users']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getOrganizationGroupsGroupIdUsersQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.organization.groups>['users']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getOrganizationGroupsGroupIdUsersQueryKey(params, clientOptions)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.organization
          .groups(toValue(params))
          .users.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostOrganizationGroupsGroupIdUsersMutationKey() {
  return ['organization', '/organization/groups/{group_id}/users', 'POST'] as const
}

export function getPostOrganizationGroupsGroupIdUsersMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.groups>['users']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.organization.groups>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.organization.groups>['users']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.organization.groups>['users']['post']>[0]
      options?: Parameters<ReturnType<typeof client.organization.groups>['users']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostOrganizationGroupsGroupIdUsersMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.organization
        .groups(toValue(params))
        .users.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostOrganizationGroupsGroupIdUsers<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.groups>['users']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.groups>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.organization.groups>['users']['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.organization.groups>['users']['post']>[0]
            options?: Parameters<ReturnType<typeof client.organization.groups>['users']['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostOrganizationGroupsGroupIdUsersMutationOptions<
    TError,
    TOnMutateResult
  >(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getOrganizationGroupsGroupIdUsersUserIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.groups>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.organization.groups>['users']>[0]>,
) {
  return [
    'organization',
    '/organization/groups/{group_id}/users/{user_id}',
    toValue(params),
    toValue(params2),
  ] as const
}

export function getOrganizationGroupsGroupIdUsersUserIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.groups>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.organization.groups>['users']>[0]>,
  options?: Parameters<
    ReturnType<ReturnType<typeof client.organization.groups>['users']>['get']
  >[0],
) {
  return {
    queryKey: computed(() => getOrganizationGroupsGroupIdUsersUserIdQueryKey(params, params2)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.organization
        .groups(toValue(params))
        .users(toValue(params2))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useOrganizationGroupsGroupIdUsersUserId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.organization.groups>['users']>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.organization.groups>['users']>['get']>
    >['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.groups>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.organization.groups>['users']>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<
              ReturnType<ReturnType<ReturnType<typeof client.organization.groups>['users']>['get']>
            >,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<
              ReturnType<ReturnType<ReturnType<typeof client.organization.groups>['users']>['get']>
            >,
            { error: null }
          >['data'],
          ReturnType<typeof getOrganizationGroupsGroupIdUsersUserIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<
      ReturnType<ReturnType<typeof client.organization.groups>['users']>['get']
    >[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getOrganizationGroupsGroupIdUsersUserIdQueryKey(params, params2)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.organization
          .groups(toValue(params))
          .users(toValue(params2))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getDeleteOrganizationGroupsGroupIdUsersUserIdMutationKey() {
  return ['organization', '/organization/groups/{group_id}/users/{user_id}', 'DELETE'] as const
}

export function getDeleteOrganizationGroupsGroupIdUsersUserIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.organization.groups>['users']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.groups>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.organization.groups>['users']>[0]>,
) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<ReturnType<ReturnType<typeof client.organization.groups>['users']>['delete']>
      >,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<
        ReturnType<ReturnType<typeof client.organization.groups>['users']>['delete']
      >[0]
      options?: Parameters<
        ReturnType<ReturnType<typeof client.organization.groups>['users']>['delete']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteOrganizationGroupsGroupIdUsersUserIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.organization
        .groups(toValue(params))
        .users(toValue(params2))
        .delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeleteOrganizationGroupsGroupIdUsersUserId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.organization.groups>['users']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.groups>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.organization.groups>['users']>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<
                ReturnType<ReturnType<typeof client.organization.groups>['users']>['delete']
              >
            >,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<
              ReturnType<ReturnType<typeof client.organization.groups>['users']>['delete']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.organization.groups>['users']>['delete']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteOrganizationGroupsGroupIdUsersUserIdMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getOrganizationInvitesQueryKey(
  options?: Parameters<typeof client.organization.invites.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['organization', '/organization/invites', keyArgs] as const
}

export function getOrganizationInvitesQueryOptions(
  options?: Parameters<typeof client.organization.invites.get>[0],
) {
  return {
    queryKey: getOrganizationInvitesQueryKey(options),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.organization.invites.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useOrganizationInvites<
  TData = Extract<
    Awaited<ReturnType<typeof client.organization.invites.get>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.organization.invites.get>>['error'], null>,
>(
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<typeof client.organization.invites.get>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<typeof client.organization.invites.get>>,
            { error: null }
          >['data'],
          ReturnType<typeof getOrganizationInvitesQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.organization.invites.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: getOrganizationInvitesQueryKey(clientOptions),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.organization.invites.get({
          ...clientOptions,
          fetch: { ...clientOptions?.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostOrganizationInvitesMutationKey() {
  return ['organization', '/organization/invites', 'POST'] as const
}

export function getPostOrganizationInvitesMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.organization.invites.post>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.organization.invites.post>>, { error: null }>['data'],
    TError,
    {
      body: Parameters<typeof client.organization.invites.post>[0]
      options?: Parameters<typeof client.organization.invites.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostOrganizationInvitesMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.organization.invites.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostOrganizationInvites<
  TError = Exclude<Awaited<ReturnType<typeof client.organization.invites.post>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<typeof client.organization.invites.post>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<typeof client.organization.invites.post>[0]
            options?: Parameters<typeof client.organization.invites.post>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostOrganizationInvitesMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getOrganizationInvitesInviteIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.invites>[0]>,
) {
  return ['organization', '/organization/invites/{invite_id}', toValue(params)] as const
}

export function getOrganizationInvitesInviteIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.invites>[0]>,
  options?: Parameters<ReturnType<typeof client.organization.invites>['get']>[0],
) {
  return {
    queryKey: computed(() => getOrganizationInvitesInviteIdQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.organization
        .invites(toValue(params))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useOrganizationInvitesInviteId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.organization.invites>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.invites>['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.invites>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.organization.invites>['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.organization.invites>['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getOrganizationInvitesInviteIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.organization.invites>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getOrganizationInvitesInviteIdQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.organization
          .invites(toValue(params))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getDeleteOrganizationInvitesInviteIdMutationKey() {
  return ['organization', '/organization/invites/{invite_id}', 'DELETE'] as const
}

export function getDeleteOrganizationInvitesInviteIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.invites>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.organization.invites>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.organization.invites>['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<typeof client.organization.invites>['delete']>[0]
      options?: Parameters<ReturnType<typeof client.organization.invites>['delete']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteOrganizationInvitesInviteIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.organization
        .invites(toValue(params))
        .delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeleteOrganizationInvitesInviteId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.invites>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.invites>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.organization.invites>['delete']>>,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<ReturnType<typeof client.organization.invites>['delete']>[0]
            options?: Parameters<ReturnType<typeof client.organization.invites>['delete']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteOrganizationInvitesInviteIdMutationOptions<
    TError,
    TOnMutateResult
  >(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getOrganizationProjectsQueryKey(
  options?: Parameters<typeof client.organization.projects.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['organization', '/organization/projects', keyArgs] as const
}

export function getOrganizationProjectsQueryOptions(
  options?: Parameters<typeof client.organization.projects.get>[0],
) {
  return {
    queryKey: getOrganizationProjectsQueryKey(options),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.organization.projects.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useOrganizationProjects<
  TData = Extract<
    Awaited<ReturnType<typeof client.organization.projects.get>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.organization.projects.get>>['error'], null>,
>(
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<typeof client.organization.projects.get>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<typeof client.organization.projects.get>>,
            { error: null }
          >['data'],
          ReturnType<typeof getOrganizationProjectsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.organization.projects.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: getOrganizationProjectsQueryKey(clientOptions),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.organization.projects.get({
          ...clientOptions,
          fetch: { ...clientOptions?.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostOrganizationProjectsMutationKey() {
  return ['organization', '/organization/projects', 'POST'] as const
}

export function getPostOrganizationProjectsMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.organization.projects.post>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.organization.projects.post>>, { error: null }>['data'],
    TError,
    {
      body: Parameters<typeof client.organization.projects.post>[0]
      options?: Parameters<typeof client.organization.projects.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostOrganizationProjectsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.organization.projects.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostOrganizationProjects<
  TError = Exclude<Awaited<ReturnType<typeof client.organization.projects.post>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<typeof client.organization.projects.post>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<typeof client.organization.projects.post>[0]
            options?: Parameters<typeof client.organization.projects.post>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostOrganizationProjectsMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getOrganizationProjectsProjectIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
) {
  return ['organization', '/organization/projects/{project_id}', toValue(params)] as const
}

export function getOrganizationProjectsProjectIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
  options?: Parameters<ReturnType<typeof client.organization.projects>['get']>[0],
) {
  return {
    queryKey: computed(() => getOrganizationProjectsProjectIdQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.organization
        .projects(toValue(params))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useOrganizationProjectsProjectId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.organization.projects>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.projects>['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.organization.projects>['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.organization.projects>['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getOrganizationProjectsProjectIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.organization.projects>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getOrganizationProjectsProjectIdQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.organization
          .projects(toValue(params))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostOrganizationProjectsProjectIdMutationKey() {
  return ['organization', '/organization/projects/{project_id}', 'POST'] as const
}

export function getPostOrganizationProjectsProjectIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.projects>['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.organization.projects>['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.organization.projects>['post']>[0]
      options?: Parameters<ReturnType<typeof client.organization.projects>['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostOrganizationProjectsProjectIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.organization
        .projects(toValue(params))
        .post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostOrganizationProjectsProjectId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.projects>['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.organization.projects>['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.organization.projects>['post']>[0]
            options?: Parameters<ReturnType<typeof client.organization.projects>['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostOrganizationProjectsProjectIdMutationOptions<
    TError,
    TOnMutateResult
  >(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getOrganizationProjectsProjectIdApiKeysQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
  options?: Parameters<ReturnType<typeof client.organization.projects>['api_keys']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'organization',
    '/organization/projects/{project_id}/api_keys',
    toValue(params),
    keyArgs,
  ] as const
}

export function getOrganizationProjectsProjectIdApiKeysQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
  options?: Parameters<ReturnType<typeof client.organization.projects>['api_keys']['get']>[0],
) {
  return {
    queryKey: computed(() => getOrganizationProjectsProjectIdApiKeysQueryKey(params, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.organization
        .projects(toValue(params))
        .api_keys.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useOrganizationProjectsProjectIdApiKeys<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.organization.projects>['api_keys']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.organization.projects>['api_keys']['get']>
    >['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.organization.projects>['api_keys']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.organization.projects>['api_keys']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getOrganizationProjectsProjectIdApiKeysQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.organization.projects>['api_keys']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() =>
        getOrganizationProjectsProjectIdApiKeysQueryKey(params, clientOptions),
      ),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.organization
          .projects(toValue(params))
          .api_keys.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getOrganizationProjectsProjectIdApiKeysApiKeyIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
  params2: MaybeRefOrGetter<
    Parameters<ReturnType<typeof client.organization.projects>['api_keys']>[0]
  >,
) {
  return [
    'organization',
    '/organization/projects/{project_id}/api_keys/{api_key_id}',
    toValue(params),
    toValue(params2),
  ] as const
}

export function getOrganizationProjectsProjectIdApiKeysApiKeyIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
  params2: MaybeRefOrGetter<
    Parameters<ReturnType<typeof client.organization.projects>['api_keys']>[0]
  >,
  options?: Parameters<
    ReturnType<ReturnType<typeof client.organization.projects>['api_keys']>['get']
  >[0],
) {
  return {
    queryKey: computed(() =>
      getOrganizationProjectsProjectIdApiKeysApiKeyIdQueryKey(params, params2),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.organization
        .projects(toValue(params))
        .api_keys(toValue(params2))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useOrganizationProjectsProjectIdApiKeysApiKeyId<
  TData = Extract<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.organization.projects>['api_keys']>['get']>
    >,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.organization.projects>['api_keys']>['get']>
    >['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
  params2: MaybeRefOrGetter<
    Parameters<ReturnType<typeof client.organization.projects>['api_keys']>[0]
  >,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<
              ReturnType<
                ReturnType<ReturnType<typeof client.organization.projects>['api_keys']>['get']
              >
            >,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<
              ReturnType<
                ReturnType<ReturnType<typeof client.organization.projects>['api_keys']>['get']
              >
            >,
            { error: null }
          >['data'],
          ReturnType<typeof getOrganizationProjectsProjectIdApiKeysApiKeyIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<
      ReturnType<ReturnType<typeof client.organization.projects>['api_keys']>['get']
    >[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() =>
        getOrganizationProjectsProjectIdApiKeysApiKeyIdQueryKey(params, params2),
      ),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.organization
          .projects(toValue(params))
          .api_keys(toValue(params2))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostOrganizationProjectsProjectIdApiKeysApiKeyIdMutationKey() {
  return [
    'organization',
    '/organization/projects/{project_id}/api_keys/{api_key_id}',
    'POST',
  ] as const
}

export function getPostOrganizationProjectsProjectIdApiKeysApiKeyIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.organization.projects>['api_keys']>['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
  params2: MaybeRefOrGetter<
    Parameters<ReturnType<typeof client.organization.projects>['api_keys']>[0]
  >,
) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<ReturnType<ReturnType<typeof client.organization.projects>['api_keys']>['post']>
      >,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<
        ReturnType<ReturnType<typeof client.organization.projects>['api_keys']>['post']
      >[0]
      options?: Parameters<
        ReturnType<ReturnType<typeof client.organization.projects>['api_keys']>['post']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostOrganizationProjectsProjectIdApiKeysApiKeyIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.organization
        .projects(toValue(params))
        .api_keys(toValue(params2))
        .post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostOrganizationProjectsProjectIdApiKeysApiKeyId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.organization.projects>['api_keys']>['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
  params2: MaybeRefOrGetter<
    Parameters<ReturnType<typeof client.organization.projects>['api_keys']>[0]
  >,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<
                ReturnType<ReturnType<typeof client.organization.projects>['api_keys']>['post']
              >
            >,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<
              ReturnType<ReturnType<typeof client.organization.projects>['api_keys']>['post']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.organization.projects>['api_keys']>['post']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostOrganizationProjectsProjectIdApiKeysApiKeyIdMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getDeleteOrganizationProjectsProjectIdApiKeysApiKeyIdMutationKey() {
  return [
    'organization',
    '/organization/projects/{project_id}/api_keys/{api_key_id}',
    'DELETE',
  ] as const
}

export function getDeleteOrganizationProjectsProjectIdApiKeysApiKeyIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.organization.projects>['api_keys']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
  params2: MaybeRefOrGetter<
    Parameters<ReturnType<typeof client.organization.projects>['api_keys']>[0]
  >,
) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<
          ReturnType<ReturnType<typeof client.organization.projects>['api_keys']>['delete']
        >
      >,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<
        ReturnType<ReturnType<typeof client.organization.projects>['api_keys']>['delete']
      >[0]
      options?: Parameters<
        ReturnType<ReturnType<typeof client.organization.projects>['api_keys']>['delete']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteOrganizationProjectsProjectIdApiKeysApiKeyIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.organization
        .projects(toValue(params))
        .api_keys(toValue(params2))
        .delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeleteOrganizationProjectsProjectIdApiKeysApiKeyId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.organization.projects>['api_keys']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
  params2: MaybeRefOrGetter<
    Parameters<ReturnType<typeof client.organization.projects>['api_keys']>[0]
  >,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<
                ReturnType<ReturnType<typeof client.organization.projects>['api_keys']>['delete']
              >
            >,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<
              ReturnType<ReturnType<typeof client.organization.projects>['api_keys']>['delete']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.organization.projects>['api_keys']>['delete']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteOrganizationProjectsProjectIdApiKeysApiKeyIdMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPostOrganizationProjectsProjectIdArchiveMutationKey() {
  return ['organization', '/organization/projects/{project_id}/archive', 'POST'] as const
}

export function getPostOrganizationProjectsProjectIdArchiveMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.organization.projects>['archive']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.organization.projects>['archive']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<typeof client.organization.projects>['archive']['post']>[0]
      options?: Parameters<ReturnType<typeof client.organization.projects>['archive']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostOrganizationProjectsProjectIdArchiveMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.organization
        .projects(toValue(params))
        .archive.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostOrganizationProjectsProjectIdArchive<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.organization.projects>['archive']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.organization.projects>['archive']['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<ReturnType<typeof client.organization.projects>['archive']['post']>[0]
            options?: Parameters<
              ReturnType<typeof client.organization.projects>['archive']['post']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostOrganizationProjectsProjectIdArchiveMutationOptions<
    TError,
    TOnMutateResult
  >(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getOrganizationProjectsProjectIdCertificatesQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
  options?: Parameters<ReturnType<typeof client.organization.projects>['certificates']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'organization',
    '/organization/projects/{project_id}/certificates',
    toValue(params),
    keyArgs,
  ] as const
}

export function getOrganizationProjectsProjectIdCertificatesQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
  options?: Parameters<ReturnType<typeof client.organization.projects>['certificates']['get']>[0],
) {
  return {
    queryKey: computed(() => getOrganizationProjectsProjectIdCertificatesQueryKey(params, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.organization
        .projects(toValue(params))
        .certificates.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useOrganizationProjectsProjectIdCertificates<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.organization.projects>['certificates']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.organization.projects>['certificates']['get']>
    >['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<
              ReturnType<ReturnType<typeof client.organization.projects>['certificates']['get']>
            >,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<
              ReturnType<ReturnType<typeof client.organization.projects>['certificates']['get']>
            >,
            { error: null }
          >['data'],
          ReturnType<typeof getOrganizationProjectsProjectIdCertificatesQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.organization.projects>['certificates']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() =>
        getOrganizationProjectsProjectIdCertificatesQueryKey(params, clientOptions),
      ),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.organization
          .projects(toValue(params))
          .certificates.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostOrganizationProjectsProjectIdCertificatesActivateMutationKey() {
  return [
    'organization',
    '/organization/projects/{project_id}/certificates/activate',
    'POST',
  ] as const
}

export function getPostOrganizationProjectsProjectIdCertificatesActivateMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<typeof client.organization.projects>['certificates']['activate']['post']
      >
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<
          ReturnType<typeof client.organization.projects>['certificates']['activate']['post']
        >
      >,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<
        ReturnType<typeof client.organization.projects>['certificates']['activate']['post']
      >[0]
      options?: Parameters<
        ReturnType<typeof client.organization.projects>['certificates']['activate']['post']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostOrganizationProjectsProjectIdCertificatesActivateMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.organization
        .projects(toValue(params))
        .certificates.activate.post(body, options)
      if (error) throw error
      return data
    },
  })
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
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<
                ReturnType<typeof client.organization.projects>['certificates']['activate']['post']
              >
            >,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<
              ReturnType<typeof client.organization.projects>['certificates']['activate']['post']
            >[0]
            options?: Parameters<
              ReturnType<typeof client.organization.projects>['certificates']['activate']['post']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostOrganizationProjectsProjectIdCertificatesActivateMutationOptions<
    TError,
    TOnMutateResult
  >(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPostOrganizationProjectsProjectIdCertificatesDeactivateMutationKey() {
  return [
    'organization',
    '/organization/projects/{project_id}/certificates/deactivate',
    'POST',
  ] as const
}

export function getPostOrganizationProjectsProjectIdCertificatesDeactivateMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<typeof client.organization.projects>['certificates']['deactivate']['post']
      >
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<
          ReturnType<typeof client.organization.projects>['certificates']['deactivate']['post']
        >
      >,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<
        ReturnType<typeof client.organization.projects>['certificates']['deactivate']['post']
      >[0]
      options?: Parameters<
        ReturnType<typeof client.organization.projects>['certificates']['deactivate']['post']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostOrganizationProjectsProjectIdCertificatesDeactivateMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.organization
        .projects(toValue(params))
        .certificates.deactivate.post(body, options)
      if (error) throw error
      return data
    },
  })
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
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<
                ReturnType<
                  typeof client.organization.projects
                >['certificates']['deactivate']['post']
              >
            >,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<
              ReturnType<typeof client.organization.projects>['certificates']['deactivate']['post']
            >[0]
            options?: Parameters<
              ReturnType<typeof client.organization.projects>['certificates']['deactivate']['post']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults =
    getPostOrganizationProjectsProjectIdCertificatesDeactivateMutationOptions<
      TError,
      TOnMutateResult
    >(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getOrganizationProjectsProjectIdDataRetentionQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
) {
  return [
    'organization',
    '/organization/projects/{project_id}/data_retention',
    toValue(params),
  ] as const
}

export function getOrganizationProjectsProjectIdDataRetentionQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
  options?: Parameters<ReturnType<typeof client.organization.projects>['data_retention']['get']>[0],
) {
  return {
    queryKey: computed(() => getOrganizationProjectsProjectIdDataRetentionQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.organization
        .projects(toValue(params))
        .data_retention.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useOrganizationProjectsProjectIdDataRetention<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.organization.projects>['data_retention']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.organization.projects>['data_retention']['get']>
    >['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<
              ReturnType<ReturnType<typeof client.organization.projects>['data_retention']['get']>
            >,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<
              ReturnType<ReturnType<typeof client.organization.projects>['data_retention']['get']>
            >,
            { error: null }
          >['data'],
          ReturnType<typeof getOrganizationProjectsProjectIdDataRetentionQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<
      ReturnType<typeof client.organization.projects>['data_retention']['get']
    >[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getOrganizationProjectsProjectIdDataRetentionQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.organization
          .projects(toValue(params))
          .data_retention.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostOrganizationProjectsProjectIdDataRetentionMutationKey() {
  return ['organization', '/organization/projects/{project_id}/data_retention', 'POST'] as const
}

export function getPostOrganizationProjectsProjectIdDataRetentionMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.organization.projects>['data_retention']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<ReturnType<typeof client.organization.projects>['data_retention']['post']>
      >,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.organization.projects>['data_retention']['post']>[0]
      options?: Parameters<
        ReturnType<typeof client.organization.projects>['data_retention']['post']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostOrganizationProjectsProjectIdDataRetentionMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.organization
        .projects(toValue(params))
        .data_retention.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostOrganizationProjectsProjectIdDataRetention<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.organization.projects>['data_retention']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<ReturnType<typeof client.organization.projects>['data_retention']['post']>
            >,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<
              ReturnType<typeof client.organization.projects>['data_retention']['post']
            >[0]
            options?: Parameters<
              ReturnType<typeof client.organization.projects>['data_retention']['post']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostOrganizationProjectsProjectIdDataRetentionMutationOptions<
    TError,
    TOnMutateResult
  >(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getOrganizationProjectsProjectIdGroupsQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
  options?: Parameters<ReturnType<typeof client.organization.projects>['groups']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'organization',
    '/organization/projects/{project_id}/groups',
    toValue(params),
    keyArgs,
  ] as const
}

export function getOrganizationProjectsProjectIdGroupsQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
  options?: Parameters<ReturnType<typeof client.organization.projects>['groups']['get']>[0],
) {
  return {
    queryKey: computed(() => getOrganizationProjectsProjectIdGroupsQueryKey(params, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.organization
        .projects(toValue(params))
        .groups.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useOrganizationProjectsProjectIdGroups<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.organization.projects>['groups']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.projects>['groups']['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.organization.projects>['groups']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.organization.projects>['groups']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getOrganizationProjectsProjectIdGroupsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.organization.projects>['groups']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() =>
        getOrganizationProjectsProjectIdGroupsQueryKey(params, clientOptions),
      ),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.organization
          .projects(toValue(params))
          .groups.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostOrganizationProjectsProjectIdGroupsMutationKey() {
  return ['organization', '/organization/projects/{project_id}/groups', 'POST'] as const
}

export function getPostOrganizationProjectsProjectIdGroupsMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.projects>['groups']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.organization.projects>['groups']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.organization.projects>['groups']['post']>[0]
      options?: Parameters<ReturnType<typeof client.organization.projects>['groups']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostOrganizationProjectsProjectIdGroupsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.organization
        .projects(toValue(params))
        .groups.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostOrganizationProjectsProjectIdGroups<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.projects>['groups']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.organization.projects>['groups']['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.organization.projects>['groups']['post']>[0]
            options?: Parameters<
              ReturnType<typeof client.organization.projects>['groups']['post']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostOrganizationProjectsProjectIdGroupsMutationOptions<
    TError,
    TOnMutateResult
  >(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getOrganizationProjectsProjectIdGroupsGroupIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
  params2: MaybeRefOrGetter<
    Parameters<ReturnType<typeof client.organization.projects>['groups']>[0]
  >,
  options?: Parameters<
    ReturnType<ReturnType<typeof client.organization.projects>['groups']>['get']
  >[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'organization',
    '/organization/projects/{project_id}/groups/{group_id}',
    toValue(params),
    toValue(params2),
    keyArgs,
  ] as const
}

export function getOrganizationProjectsProjectIdGroupsGroupIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
  params2: MaybeRefOrGetter<
    Parameters<ReturnType<typeof client.organization.projects>['groups']>[0]
  >,
  options?: Parameters<
    ReturnType<ReturnType<typeof client.organization.projects>['groups']>['get']
  >[0],
) {
  return {
    queryKey: computed(() =>
      getOrganizationProjectsProjectIdGroupsGroupIdQueryKey(params, params2, options),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.organization
        .projects(toValue(params))
        .groups(toValue(params2))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useOrganizationProjectsProjectIdGroupsGroupId<
  TData = Extract<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.organization.projects>['groups']>['get']>
    >,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.organization.projects>['groups']>['get']>
    >['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
  params2: MaybeRefOrGetter<
    Parameters<ReturnType<typeof client.organization.projects>['groups']>[0]
  >,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<
              ReturnType<
                ReturnType<ReturnType<typeof client.organization.projects>['groups']>['get']
              >
            >,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<
              ReturnType<
                ReturnType<ReturnType<typeof client.organization.projects>['groups']>['get']
              >
            >,
            { error: null }
          >['data'],
          ReturnType<typeof getOrganizationProjectsProjectIdGroupsGroupIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<
      ReturnType<ReturnType<typeof client.organization.projects>['groups']>['get']
    >[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() =>
        getOrganizationProjectsProjectIdGroupsGroupIdQueryKey(params, params2, clientOptions),
      ),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.organization
          .projects(toValue(params))
          .groups(toValue(params2))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getDeleteOrganizationProjectsProjectIdGroupsGroupIdMutationKey() {
  return [
    'organization',
    '/organization/projects/{project_id}/groups/{group_id}',
    'DELETE',
  ] as const
}

export function getDeleteOrganizationProjectsProjectIdGroupsGroupIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.organization.projects>['groups']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
  params2: MaybeRefOrGetter<
    Parameters<ReturnType<typeof client.organization.projects>['groups']>[0]
  >,
) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<ReturnType<ReturnType<typeof client.organization.projects>['groups']>['delete']>
      >,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<
        ReturnType<ReturnType<typeof client.organization.projects>['groups']>['delete']
      >[0]
      options?: Parameters<
        ReturnType<ReturnType<typeof client.organization.projects>['groups']>['delete']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteOrganizationProjectsProjectIdGroupsGroupIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.organization
        .projects(toValue(params))
        .groups(toValue(params2))
        .delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeleteOrganizationProjectsProjectIdGroupsGroupId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.organization.projects>['groups']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
  params2: MaybeRefOrGetter<
    Parameters<ReturnType<typeof client.organization.projects>['groups']>[0]
  >,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<
                ReturnType<ReturnType<typeof client.organization.projects>['groups']>['delete']
              >
            >,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<
              ReturnType<ReturnType<typeof client.organization.projects>['groups']>['delete']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.organization.projects>['groups']>['delete']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteOrganizationProjectsProjectIdGroupsGroupIdMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getOrganizationProjectsProjectIdHostedToolPermissionsQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
) {
  return [
    'organization',
    '/organization/projects/{project_id}/hosted_tool_permissions',
    toValue(params),
  ] as const
}

export function getOrganizationProjectsProjectIdHostedToolPermissionsQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
  options?: Parameters<
    ReturnType<typeof client.organization.projects>['hosted_tool_permissions']['get']
  >[0],
) {
  return {
    queryKey: computed(() => getOrganizationProjectsProjectIdHostedToolPermissionsQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.organization
        .projects(toValue(params))
        .hosted_tool_permissions.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useOrganizationProjectsProjectIdHostedToolPermissions<
  TData = Extract<
    Awaited<
      ReturnType<ReturnType<typeof client.organization.projects>['hosted_tool_permissions']['get']>
    >,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.organization.projects>['hosted_tool_permissions']['get']>
    >['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<
              ReturnType<
                ReturnType<typeof client.organization.projects>['hosted_tool_permissions']['get']
              >
            >,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<
              ReturnType<
                ReturnType<typeof client.organization.projects>['hosted_tool_permissions']['get']
              >
            >,
            { error: null }
          >['data'],
          ReturnType<typeof getOrganizationProjectsProjectIdHostedToolPermissionsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<
      ReturnType<typeof client.organization.projects>['hosted_tool_permissions']['get']
    >[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() =>
        getOrganizationProjectsProjectIdHostedToolPermissionsQueryKey(params),
      ),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.organization
          .projects(toValue(params))
          .hosted_tool_permissions.get({
            ...clientOptions,
            fetch: { ...clientOptions?.fetch, signal },
          })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostOrganizationProjectsProjectIdHostedToolPermissionsMutationKey() {
  return [
    'organization',
    '/organization/projects/{project_id}/hosted_tool_permissions',
    'POST',
  ] as const
}

export function getPostOrganizationProjectsProjectIdHostedToolPermissionsMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.organization.projects>['hosted_tool_permissions']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<
          ReturnType<typeof client.organization.projects>['hosted_tool_permissions']['post']
        >
      >,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<
        ReturnType<typeof client.organization.projects>['hosted_tool_permissions']['post']
      >[0]
      options?: Parameters<
        ReturnType<typeof client.organization.projects>['hosted_tool_permissions']['post']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostOrganizationProjectsProjectIdHostedToolPermissionsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.organization
        .projects(toValue(params))
        .hosted_tool_permissions.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostOrganizationProjectsProjectIdHostedToolPermissions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.organization.projects>['hosted_tool_permissions']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<
                ReturnType<typeof client.organization.projects>['hosted_tool_permissions']['post']
              >
            >,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<
              ReturnType<typeof client.organization.projects>['hosted_tool_permissions']['post']
            >[0]
            options?: Parameters<
              ReturnType<typeof client.organization.projects>['hosted_tool_permissions']['post']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostOrganizationProjectsProjectIdHostedToolPermissionsMutationOptions<
    TError,
    TOnMutateResult
  >(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getOrganizationProjectsProjectIdModelPermissionsQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
) {
  return [
    'organization',
    '/organization/projects/{project_id}/model_permissions',
    toValue(params),
  ] as const
}

export function getOrganizationProjectsProjectIdModelPermissionsQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
  options?: Parameters<
    ReturnType<typeof client.organization.projects>['model_permissions']['get']
  >[0],
) {
  return {
    queryKey: computed(() => getOrganizationProjectsProjectIdModelPermissionsQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.organization
        .projects(toValue(params))
        .model_permissions.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useOrganizationProjectsProjectIdModelPermissions<
  TData = Extract<
    Awaited<
      ReturnType<ReturnType<typeof client.organization.projects>['model_permissions']['get']>
    >,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.organization.projects>['model_permissions']['get']>
    >['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<
              ReturnType<
                ReturnType<typeof client.organization.projects>['model_permissions']['get']
              >
            >,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<
              ReturnType<
                ReturnType<typeof client.organization.projects>['model_permissions']['get']
              >
            >,
            { error: null }
          >['data'],
          ReturnType<typeof getOrganizationProjectsProjectIdModelPermissionsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<
      ReturnType<typeof client.organization.projects>['model_permissions']['get']
    >[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getOrganizationProjectsProjectIdModelPermissionsQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.organization
          .projects(toValue(params))
          .model_permissions.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostOrganizationProjectsProjectIdModelPermissionsMutationKey() {
  return ['organization', '/organization/projects/{project_id}/model_permissions', 'POST'] as const
}

export function getPostOrganizationProjectsProjectIdModelPermissionsMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.organization.projects>['model_permissions']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<ReturnType<typeof client.organization.projects>['model_permissions']['post']>
      >,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<
        ReturnType<typeof client.organization.projects>['model_permissions']['post']
      >[0]
      options?: Parameters<
        ReturnType<typeof client.organization.projects>['model_permissions']['post']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostOrganizationProjectsProjectIdModelPermissionsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.organization
        .projects(toValue(params))
        .model_permissions.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostOrganizationProjectsProjectIdModelPermissions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.organization.projects>['model_permissions']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<
                ReturnType<typeof client.organization.projects>['model_permissions']['post']
              >
            >,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<
              ReturnType<typeof client.organization.projects>['model_permissions']['post']
            >[0]
            options?: Parameters<
              ReturnType<typeof client.organization.projects>['model_permissions']['post']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostOrganizationProjectsProjectIdModelPermissionsMutationOptions<
    TError,
    TOnMutateResult
  >(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getDeleteOrganizationProjectsProjectIdModelPermissionsMutationKey() {
  return [
    'organization',
    '/organization/projects/{project_id}/model_permissions',
    'DELETE',
  ] as const
}

export function getDeleteOrganizationProjectsProjectIdModelPermissionsMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.organization.projects>['model_permissions']['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<ReturnType<typeof client.organization.projects>['model_permissions']['delete']>
      >,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<
        ReturnType<typeof client.organization.projects>['model_permissions']['delete']
      >[0]
      options?: Parameters<
        ReturnType<typeof client.organization.projects>['model_permissions']['delete']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteOrganizationProjectsProjectIdModelPermissionsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.organization
        .projects(toValue(params))
        .model_permissions.delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeleteOrganizationProjectsProjectIdModelPermissions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.organization.projects>['model_permissions']['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<
                ReturnType<typeof client.organization.projects>['model_permissions']['delete']
              >
            >,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<
              ReturnType<typeof client.organization.projects>['model_permissions']['delete']
            >[0]
            options?: Parameters<
              ReturnType<typeof client.organization.projects>['model_permissions']['delete']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteOrganizationProjectsProjectIdModelPermissionsMutationOptions<
    TError,
    TOnMutateResult
  >(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getOrganizationProjectsProjectIdRateLimitsQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
  options?: Parameters<ReturnType<typeof client.organization.projects>['rate_limits']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'organization',
    '/organization/projects/{project_id}/rate_limits',
    toValue(params),
    keyArgs,
  ] as const
}

export function getOrganizationProjectsProjectIdRateLimitsQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
  options?: Parameters<ReturnType<typeof client.organization.projects>['rate_limits']['get']>[0],
) {
  return {
    queryKey: computed(() => getOrganizationProjectsProjectIdRateLimitsQueryKey(params, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.organization
        .projects(toValue(params))
        .rate_limits.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useOrganizationProjectsProjectIdRateLimits<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.organization.projects>['rate_limits']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.organization.projects>['rate_limits']['get']>
    >['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<
              ReturnType<ReturnType<typeof client.organization.projects>['rate_limits']['get']>
            >,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<
              ReturnType<ReturnType<typeof client.organization.projects>['rate_limits']['get']>
            >,
            { error: null }
          >['data'],
          ReturnType<typeof getOrganizationProjectsProjectIdRateLimitsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.organization.projects>['rate_limits']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() =>
        getOrganizationProjectsProjectIdRateLimitsQueryKey(params, clientOptions),
      ),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.organization
          .projects(toValue(params))
          .rate_limits.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostOrganizationProjectsProjectIdRateLimitsRateLimitIdMutationKey() {
  return [
    'organization',
    '/organization/projects/{project_id}/rate_limits/{rate_limit_id}',
    'POST',
  ] as const
}

export function getPostOrganizationProjectsProjectIdRateLimitsRateLimitIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.organization.projects>['rate_limits']>['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
  params2: MaybeRefOrGetter<
    Parameters<ReturnType<typeof client.organization.projects>['rate_limits']>[0]
  >,
) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<
          ReturnType<ReturnType<typeof client.organization.projects>['rate_limits']>['post']
        >
      >,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<
        ReturnType<ReturnType<typeof client.organization.projects>['rate_limits']>['post']
      >[0]
      options?: Parameters<
        ReturnType<ReturnType<typeof client.organization.projects>['rate_limits']>['post']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostOrganizationProjectsProjectIdRateLimitsRateLimitIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.organization
        .projects(toValue(params))
        .rate_limits(toValue(params2))
        .post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostOrganizationProjectsProjectIdRateLimitsRateLimitId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.organization.projects>['rate_limits']>['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
  params2: MaybeRefOrGetter<
    Parameters<ReturnType<typeof client.organization.projects>['rate_limits']>[0]
  >,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<
                ReturnType<ReturnType<typeof client.organization.projects>['rate_limits']>['post']
              >
            >,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<
              ReturnType<ReturnType<typeof client.organization.projects>['rate_limits']>['post']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.organization.projects>['rate_limits']>['post']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostOrganizationProjectsProjectIdRateLimitsRateLimitIdMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getOrganizationProjectsProjectIdServiceAccountsQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
  options?: Parameters<
    ReturnType<typeof client.organization.projects>['service_accounts']['get']
  >[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'organization',
    '/organization/projects/{project_id}/service_accounts',
    toValue(params),
    keyArgs,
  ] as const
}

export function getOrganizationProjectsProjectIdServiceAccountsQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
  options?: Parameters<
    ReturnType<typeof client.organization.projects>['service_accounts']['get']
  >[0],
) {
  return {
    queryKey: computed(() =>
      getOrganizationProjectsProjectIdServiceAccountsQueryKey(params, options),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.organization
        .projects(toValue(params))
        .service_accounts.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useOrganizationProjectsProjectIdServiceAccounts<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.organization.projects>['service_accounts']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.organization.projects>['service_accounts']['get']>
    >['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<
              ReturnType<ReturnType<typeof client.organization.projects>['service_accounts']['get']>
            >,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<
              ReturnType<ReturnType<typeof client.organization.projects>['service_accounts']['get']>
            >,
            { error: null }
          >['data'],
          ReturnType<typeof getOrganizationProjectsProjectIdServiceAccountsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<
      ReturnType<typeof client.organization.projects>['service_accounts']['get']
    >[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() =>
        getOrganizationProjectsProjectIdServiceAccountsQueryKey(params, clientOptions),
      ),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.organization
          .projects(toValue(params))
          .service_accounts.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostOrganizationProjectsProjectIdServiceAccountsMutationKey() {
  return ['organization', '/organization/projects/{project_id}/service_accounts', 'POST'] as const
}

export function getPostOrganizationProjectsProjectIdServiceAccountsMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.organization.projects>['service_accounts']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<ReturnType<typeof client.organization.projects>['service_accounts']['post']>
      >,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<
        ReturnType<typeof client.organization.projects>['service_accounts']['post']
      >[0]
      options?: Parameters<
        ReturnType<typeof client.organization.projects>['service_accounts']['post']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostOrganizationProjectsProjectIdServiceAccountsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.organization
        .projects(toValue(params))
        .service_accounts.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostOrganizationProjectsProjectIdServiceAccounts<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.organization.projects>['service_accounts']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<
                ReturnType<typeof client.organization.projects>['service_accounts']['post']
              >
            >,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<
              ReturnType<typeof client.organization.projects>['service_accounts']['post']
            >[0]
            options?: Parameters<
              ReturnType<typeof client.organization.projects>['service_accounts']['post']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostOrganizationProjectsProjectIdServiceAccountsMutationOptions<
    TError,
    TOnMutateResult
  >(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getOrganizationProjectsProjectIdServiceAccountsServiceAccountIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
  params2: MaybeRefOrGetter<
    Parameters<ReturnType<typeof client.organization.projects>['service_accounts']>[0]
  >,
) {
  return [
    'organization',
    '/organization/projects/{project_id}/service_accounts/{service_account_id}',
    toValue(params),
    toValue(params2),
  ] as const
}

export function getOrganizationProjectsProjectIdServiceAccountsServiceAccountIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
  params2: MaybeRefOrGetter<
    Parameters<ReturnType<typeof client.organization.projects>['service_accounts']>[0]
  >,
  options?: Parameters<
    ReturnType<ReturnType<typeof client.organization.projects>['service_accounts']>['get']
  >[0],
) {
  return {
    queryKey: computed(() =>
      getOrganizationProjectsProjectIdServiceAccountsServiceAccountIdQueryKey(params, params2),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.organization
        .projects(toValue(params))
        .service_accounts(toValue(params2))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useOrganizationProjectsProjectIdServiceAccountsServiceAccountId<
  TData = Extract<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<typeof client.organization.projects>['service_accounts']>['get']
      >
    >,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<typeof client.organization.projects>['service_accounts']>['get']
      >
    >['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
  params2: MaybeRefOrGetter<
    Parameters<ReturnType<typeof client.organization.projects>['service_accounts']>[0]
  >,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<
              ReturnType<
                ReturnType<
                  ReturnType<typeof client.organization.projects>['service_accounts']
                >['get']
              >
            >,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<
              ReturnType<
                ReturnType<
                  ReturnType<typeof client.organization.projects>['service_accounts']
                >['get']
              >
            >,
            { error: null }
          >['data'],
          ReturnType<typeof getOrganizationProjectsProjectIdServiceAccountsServiceAccountIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<
      ReturnType<ReturnType<typeof client.organization.projects>['service_accounts']>['get']
    >[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() =>
        getOrganizationProjectsProjectIdServiceAccountsServiceAccountIdQueryKey(params, params2),
      ),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.organization
          .projects(toValue(params))
          .service_accounts(toValue(params2))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostOrganizationProjectsProjectIdServiceAccountsServiceAccountIdMutationKey() {
  return [
    'organization',
    '/organization/projects/{project_id}/service_accounts/{service_account_id}',
    'POST',
  ] as const
}

export function getPostOrganizationProjectsProjectIdServiceAccountsServiceAccountIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<typeof client.organization.projects>['service_accounts']>['post']
      >
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
  params2: MaybeRefOrGetter<
    Parameters<ReturnType<typeof client.organization.projects>['service_accounts']>[0]
  >,
) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<
          ReturnType<ReturnType<typeof client.organization.projects>['service_accounts']>['post']
        >
      >,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<
        ReturnType<ReturnType<typeof client.organization.projects>['service_accounts']>['post']
      >[0]
      options?: Parameters<
        ReturnType<ReturnType<typeof client.organization.projects>['service_accounts']>['post']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostOrganizationProjectsProjectIdServiceAccountsServiceAccountIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.organization
        .projects(toValue(params))
        .service_accounts(toValue(params2))
        .post(body, options)
      if (error) throw error
      return data
    },
  })
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
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
  params2: MaybeRefOrGetter<
    Parameters<ReturnType<typeof client.organization.projects>['service_accounts']>[0]
  >,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<
                ReturnType<
                  ReturnType<typeof client.organization.projects>['service_accounts']
                >['post']
              >
            >,
            { error: null }
          >['data'],
          TError,
          {
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
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults =
    getPostOrganizationProjectsProjectIdServiceAccountsServiceAccountIdMutationOptions<
      TError,
      TOnMutateResult
    >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getDeleteOrganizationProjectsProjectIdServiceAccountsServiceAccountIdMutationKey() {
  return [
    'organization',
    '/organization/projects/{project_id}/service_accounts/{service_account_id}',
    'DELETE',
  ] as const
}

export function getDeleteOrganizationProjectsProjectIdServiceAccountsServiceAccountIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<typeof client.organization.projects>['service_accounts']>['delete']
      >
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
  params2: MaybeRefOrGetter<
    Parameters<ReturnType<typeof client.organization.projects>['service_accounts']>[0]
  >,
) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<
          ReturnType<ReturnType<typeof client.organization.projects>['service_accounts']>['delete']
        >
      >,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<
        ReturnType<ReturnType<typeof client.organization.projects>['service_accounts']>['delete']
      >[0]
      options?: Parameters<
        ReturnType<ReturnType<typeof client.organization.projects>['service_accounts']>['delete']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteOrganizationProjectsProjectIdServiceAccountsServiceAccountIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.organization
        .projects(toValue(params))
        .service_accounts(toValue(params2))
        .delete(body, options)
      if (error) throw error
      return data
    },
  })
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
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
  params2: MaybeRefOrGetter<
    Parameters<ReturnType<typeof client.organization.projects>['service_accounts']>[0]
  >,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
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
          {
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
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults =
    getDeleteOrganizationProjectsProjectIdServiceAccountsServiceAccountIdMutationOptions<
      TError,
      TOnMutateResult
    >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getOrganizationProjectsProjectIdSpendAlertsQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
  options?: Parameters<ReturnType<typeof client.organization.projects>['spend_alerts']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'organization',
    '/organization/projects/{project_id}/spend_alerts',
    toValue(params),
    keyArgs,
  ] as const
}

export function getOrganizationProjectsProjectIdSpendAlertsQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
  options?: Parameters<ReturnType<typeof client.organization.projects>['spend_alerts']['get']>[0],
) {
  return {
    queryKey: computed(() => getOrganizationProjectsProjectIdSpendAlertsQueryKey(params, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.organization
        .projects(toValue(params))
        .spend_alerts.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useOrganizationProjectsProjectIdSpendAlerts<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.organization.projects>['spend_alerts']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.organization.projects>['spend_alerts']['get']>
    >['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<
              ReturnType<ReturnType<typeof client.organization.projects>['spend_alerts']['get']>
            >,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<
              ReturnType<ReturnType<typeof client.organization.projects>['spend_alerts']['get']>
            >,
            { error: null }
          >['data'],
          ReturnType<typeof getOrganizationProjectsProjectIdSpendAlertsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.organization.projects>['spend_alerts']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() =>
        getOrganizationProjectsProjectIdSpendAlertsQueryKey(params, clientOptions),
      ),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.organization
          .projects(toValue(params))
          .spend_alerts.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostOrganizationProjectsProjectIdSpendAlertsMutationKey() {
  return ['organization', '/organization/projects/{project_id}/spend_alerts', 'POST'] as const
}

export function getPostOrganizationProjectsProjectIdSpendAlertsMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.organization.projects>['spend_alerts']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.organization.projects>['spend_alerts']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.organization.projects>['spend_alerts']['post']>[0]
      options?: Parameters<
        ReturnType<typeof client.organization.projects>['spend_alerts']['post']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostOrganizationProjectsProjectIdSpendAlertsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.organization
        .projects(toValue(params))
        .spend_alerts.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostOrganizationProjectsProjectIdSpendAlerts<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.organization.projects>['spend_alerts']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<ReturnType<typeof client.organization.projects>['spend_alerts']['post']>
            >,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<
              ReturnType<typeof client.organization.projects>['spend_alerts']['post']
            >[0]
            options?: Parameters<
              ReturnType<typeof client.organization.projects>['spend_alerts']['post']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostOrganizationProjectsProjectIdSpendAlertsMutationOptions<
    TError,
    TOnMutateResult
  >(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getOrganizationProjectsProjectIdSpendAlertsAlertIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
  params2: MaybeRefOrGetter<
    Parameters<ReturnType<typeof client.organization.projects>['spend_alerts']>[0]
  >,
) {
  return [
    'organization',
    '/organization/projects/{project_id}/spend_alerts/{alert_id}',
    toValue(params),
    toValue(params2),
  ] as const
}

export function getOrganizationProjectsProjectIdSpendAlertsAlertIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
  params2: MaybeRefOrGetter<
    Parameters<ReturnType<typeof client.organization.projects>['spend_alerts']>[0]
  >,
  options?: Parameters<
    ReturnType<ReturnType<typeof client.organization.projects>['spend_alerts']>['get']
  >[0],
) {
  return {
    queryKey: computed(() =>
      getOrganizationProjectsProjectIdSpendAlertsAlertIdQueryKey(params, params2),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.organization
        .projects(toValue(params))
        .spend_alerts(toValue(params2))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useOrganizationProjectsProjectIdSpendAlertsAlertId<
  TData = Extract<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.organization.projects>['spend_alerts']>['get']>
    >,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.organization.projects>['spend_alerts']>['get']>
    >['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
  params2: MaybeRefOrGetter<
    Parameters<ReturnType<typeof client.organization.projects>['spend_alerts']>[0]
  >,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<
              ReturnType<
                ReturnType<ReturnType<typeof client.organization.projects>['spend_alerts']>['get']
              >
            >,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<
              ReturnType<
                ReturnType<ReturnType<typeof client.organization.projects>['spend_alerts']>['get']
              >
            >,
            { error: null }
          >['data'],
          ReturnType<typeof getOrganizationProjectsProjectIdSpendAlertsAlertIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<
      ReturnType<ReturnType<typeof client.organization.projects>['spend_alerts']>['get']
    >[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() =>
        getOrganizationProjectsProjectIdSpendAlertsAlertIdQueryKey(params, params2),
      ),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.organization
          .projects(toValue(params))
          .spend_alerts(toValue(params2))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostOrganizationProjectsProjectIdSpendAlertsAlertIdMutationKey() {
  return [
    'organization',
    '/organization/projects/{project_id}/spend_alerts/{alert_id}',
    'POST',
  ] as const
}

export function getPostOrganizationProjectsProjectIdSpendAlertsAlertIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<typeof client.organization.projects>['spend_alerts']>['post']
      >
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
  params2: MaybeRefOrGetter<
    Parameters<ReturnType<typeof client.organization.projects>['spend_alerts']>[0]
  >,
) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<
          ReturnType<ReturnType<typeof client.organization.projects>['spend_alerts']>['post']
        >
      >,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<
        ReturnType<ReturnType<typeof client.organization.projects>['spend_alerts']>['post']
      >[0]
      options?: Parameters<
        ReturnType<ReturnType<typeof client.organization.projects>['spend_alerts']>['post']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostOrganizationProjectsProjectIdSpendAlertsAlertIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.organization
        .projects(toValue(params))
        .spend_alerts(toValue(params2))
        .post(body, options)
      if (error) throw error
      return data
    },
  })
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
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
  params2: MaybeRefOrGetter<
    Parameters<ReturnType<typeof client.organization.projects>['spend_alerts']>[0]
  >,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<
                ReturnType<ReturnType<typeof client.organization.projects>['spend_alerts']>['post']
              >
            >,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<
              ReturnType<ReturnType<typeof client.organization.projects>['spend_alerts']>['post']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.organization.projects>['spend_alerts']>['post']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostOrganizationProjectsProjectIdSpendAlertsAlertIdMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getDeleteOrganizationProjectsProjectIdSpendAlertsAlertIdMutationKey() {
  return [
    'organization',
    '/organization/projects/{project_id}/spend_alerts/{alert_id}',
    'DELETE',
  ] as const
}

export function getDeleteOrganizationProjectsProjectIdSpendAlertsAlertIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<typeof client.organization.projects>['spend_alerts']>['delete']
      >
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
  params2: MaybeRefOrGetter<
    Parameters<ReturnType<typeof client.organization.projects>['spend_alerts']>[0]
  >,
) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<
          ReturnType<ReturnType<typeof client.organization.projects>['spend_alerts']>['delete']
        >
      >,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<
        ReturnType<ReturnType<typeof client.organization.projects>['spend_alerts']>['delete']
      >[0]
      options?: Parameters<
        ReturnType<ReturnType<typeof client.organization.projects>['spend_alerts']>['delete']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteOrganizationProjectsProjectIdSpendAlertsAlertIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.organization
        .projects(toValue(params))
        .spend_alerts(toValue(params2))
        .delete(body, options)
      if (error) throw error
      return data
    },
  })
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
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
  params2: MaybeRefOrGetter<
    Parameters<ReturnType<typeof client.organization.projects>['spend_alerts']>[0]
  >,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<
                ReturnType<
                  ReturnType<typeof client.organization.projects>['spend_alerts']
                >['delete']
              >
            >,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<
              ReturnType<ReturnType<typeof client.organization.projects>['spend_alerts']>['delete']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.organization.projects>['spend_alerts']>['delete']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteOrganizationProjectsProjectIdSpendAlertsAlertIdMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getOrganizationProjectsProjectIdUsersQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
  options?: Parameters<ReturnType<typeof client.organization.projects>['users']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'organization',
    '/organization/projects/{project_id}/users',
    toValue(params),
    keyArgs,
  ] as const
}

export function getOrganizationProjectsProjectIdUsersQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
  options?: Parameters<ReturnType<typeof client.organization.projects>['users']['get']>[0],
) {
  return {
    queryKey: computed(() => getOrganizationProjectsProjectIdUsersQueryKey(params, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.organization
        .projects(toValue(params))
        .users.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useOrganizationProjectsProjectIdUsers<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.organization.projects>['users']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.projects>['users']['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.organization.projects>['users']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.organization.projects>['users']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getOrganizationProjectsProjectIdUsersQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.organization.projects>['users']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() =>
        getOrganizationProjectsProjectIdUsersQueryKey(params, clientOptions),
      ),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.organization
          .projects(toValue(params))
          .users.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostOrganizationProjectsProjectIdUsersMutationKey() {
  return ['organization', '/organization/projects/{project_id}/users', 'POST'] as const
}

export function getPostOrganizationProjectsProjectIdUsersMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.projects>['users']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.organization.projects>['users']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.organization.projects>['users']['post']>[0]
      options?: Parameters<ReturnType<typeof client.organization.projects>['users']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostOrganizationProjectsProjectIdUsersMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.organization
        .projects(toValue(params))
        .users.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostOrganizationProjectsProjectIdUsers<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.projects>['users']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.organization.projects>['users']['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.organization.projects>['users']['post']>[0]
            options?: Parameters<
              ReturnType<typeof client.organization.projects>['users']['post']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostOrganizationProjectsProjectIdUsersMutationOptions<
    TError,
    TOnMutateResult
  >(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getOrganizationProjectsProjectIdUsersUserIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
  params2: MaybeRefOrGetter<
    Parameters<ReturnType<typeof client.organization.projects>['users']>[0]
  >,
) {
  return [
    'organization',
    '/organization/projects/{project_id}/users/{user_id}',
    toValue(params),
    toValue(params2),
  ] as const
}

export function getOrganizationProjectsProjectIdUsersUserIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
  params2: MaybeRefOrGetter<
    Parameters<ReturnType<typeof client.organization.projects>['users']>[0]
  >,
  options?: Parameters<
    ReturnType<ReturnType<typeof client.organization.projects>['users']>['get']
  >[0],
) {
  return {
    queryKey: computed(() => getOrganizationProjectsProjectIdUsersUserIdQueryKey(params, params2)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.organization
        .projects(toValue(params))
        .users(toValue(params2))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useOrganizationProjectsProjectIdUsersUserId<
  TData = Extract<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.organization.projects>['users']>['get']>
    >,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.organization.projects>['users']>['get']>
    >['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
  params2: MaybeRefOrGetter<
    Parameters<ReturnType<typeof client.organization.projects>['users']>[0]
  >,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<
              ReturnType<
                ReturnType<ReturnType<typeof client.organization.projects>['users']>['get']
              >
            >,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<
              ReturnType<
                ReturnType<ReturnType<typeof client.organization.projects>['users']>['get']
              >
            >,
            { error: null }
          >['data'],
          ReturnType<typeof getOrganizationProjectsProjectIdUsersUserIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<
      ReturnType<ReturnType<typeof client.organization.projects>['users']>['get']
    >[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() =>
        getOrganizationProjectsProjectIdUsersUserIdQueryKey(params, params2),
      ),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.organization
          .projects(toValue(params))
          .users(toValue(params2))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostOrganizationProjectsProjectIdUsersUserIdMutationKey() {
  return ['organization', '/organization/projects/{project_id}/users/{user_id}', 'POST'] as const
}

export function getPostOrganizationProjectsProjectIdUsersUserIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.organization.projects>['users']>['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
  params2: MaybeRefOrGetter<
    Parameters<ReturnType<typeof client.organization.projects>['users']>[0]
  >,
) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<ReturnType<ReturnType<typeof client.organization.projects>['users']>['post']>
      >,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<
        ReturnType<ReturnType<typeof client.organization.projects>['users']>['post']
      >[0]
      options?: Parameters<
        ReturnType<ReturnType<typeof client.organization.projects>['users']>['post']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostOrganizationProjectsProjectIdUsersUserIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.organization
        .projects(toValue(params))
        .users(toValue(params2))
        .post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostOrganizationProjectsProjectIdUsersUserId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.organization.projects>['users']>['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
  params2: MaybeRefOrGetter<
    Parameters<ReturnType<typeof client.organization.projects>['users']>[0]
  >,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<
                ReturnType<ReturnType<typeof client.organization.projects>['users']>['post']
              >
            >,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<
              ReturnType<ReturnType<typeof client.organization.projects>['users']>['post']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.organization.projects>['users']>['post']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostOrganizationProjectsProjectIdUsersUserIdMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getDeleteOrganizationProjectsProjectIdUsersUserIdMutationKey() {
  return ['organization', '/organization/projects/{project_id}/users/{user_id}', 'DELETE'] as const
}

export function getDeleteOrganizationProjectsProjectIdUsersUserIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.organization.projects>['users']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
  params2: MaybeRefOrGetter<
    Parameters<ReturnType<typeof client.organization.projects>['users']>[0]
  >,
) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<ReturnType<ReturnType<typeof client.organization.projects>['users']>['delete']>
      >,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<
        ReturnType<ReturnType<typeof client.organization.projects>['users']>['delete']
      >[0]
      options?: Parameters<
        ReturnType<ReturnType<typeof client.organization.projects>['users']>['delete']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteOrganizationProjectsProjectIdUsersUserIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.organization
        .projects(toValue(params))
        .users(toValue(params2))
        .delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeleteOrganizationProjectsProjectIdUsersUserId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.organization.projects>['users']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
  params2: MaybeRefOrGetter<
    Parameters<ReturnType<typeof client.organization.projects>['users']>[0]
  >,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<
                ReturnType<ReturnType<typeof client.organization.projects>['users']>['delete']
              >
            >,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<
              ReturnType<ReturnType<typeof client.organization.projects>['users']>['delete']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.organization.projects>['users']>['delete']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteOrganizationProjectsProjectIdUsersUserIdMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getOrganizationRolesQueryKey(
  options?: Parameters<typeof client.organization.roles.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['organization', '/organization/roles', keyArgs] as const
}

export function getOrganizationRolesQueryOptions(
  options?: Parameters<typeof client.organization.roles.get>[0],
) {
  return {
    queryKey: getOrganizationRolesQueryKey(options),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.organization.roles.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useOrganizationRoles<
  TData = Extract<
    Awaited<ReturnType<typeof client.organization.roles.get>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.organization.roles.get>>['error'], null>,
>(
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<typeof client.organization.roles.get>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<typeof client.organization.roles.get>>,
            { error: null }
          >['data'],
          ReturnType<typeof getOrganizationRolesQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.organization.roles.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: getOrganizationRolesQueryKey(clientOptions),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.organization.roles.get({
          ...clientOptions,
          fetch: { ...clientOptions?.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostOrganizationRolesMutationKey() {
  return ['organization', '/organization/roles', 'POST'] as const
}

export function getPostOrganizationRolesMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.organization.roles.post>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.organization.roles.post>>, { error: null }>['data'],
    TError,
    {
      body: Parameters<typeof client.organization.roles.post>[0]
      options?: Parameters<typeof client.organization.roles.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostOrganizationRolesMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.organization.roles.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostOrganizationRoles<
  TError = Exclude<Awaited<ReturnType<typeof client.organization.roles.post>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<typeof client.organization.roles.post>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<typeof client.organization.roles.post>[0]
            options?: Parameters<typeof client.organization.roles.post>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostOrganizationRolesMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getOrganizationRolesRoleIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.roles>[0]>,
) {
  return ['organization', '/organization/roles/{role_id}', toValue(params)] as const
}

export function getOrganizationRolesRoleIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.roles>[0]>,
  options?: Parameters<ReturnType<typeof client.organization.roles>['get']>[0],
) {
  return {
    queryKey: computed(() => getOrganizationRolesRoleIdQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.organization
        .roles(toValue(params))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useOrganizationRolesRoleId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.organization.roles>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.roles>['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.roles>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.organization.roles>['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.organization.roles>['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getOrganizationRolesRoleIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.organization.roles>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getOrganizationRolesRoleIdQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.organization
          .roles(toValue(params))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostOrganizationRolesRoleIdMutationKey() {
  return ['organization', '/organization/roles/{role_id}', 'POST'] as const
}

export function getPostOrganizationRolesRoleIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.roles>['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.organization.roles>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.organization.roles>['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.organization.roles>['post']>[0]
      options?: Parameters<ReturnType<typeof client.organization.roles>['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostOrganizationRolesRoleIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.organization.roles(toValue(params)).post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostOrganizationRolesRoleId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.roles>['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.roles>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.organization.roles>['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.organization.roles>['post']>[0]
            options?: Parameters<ReturnType<typeof client.organization.roles>['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostOrganizationRolesRoleIdMutationOptions<TError, TOnMutateResult>(
    params,
  )
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getDeleteOrganizationRolesRoleIdMutationKey() {
  return ['organization', '/organization/roles/{role_id}', 'DELETE'] as const
}

export function getDeleteOrganizationRolesRoleIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.roles>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.organization.roles>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.organization.roles>['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<typeof client.organization.roles>['delete']>[0]
      options?: Parameters<ReturnType<typeof client.organization.roles>['delete']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteOrganizationRolesRoleIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.organization.roles(toValue(params)).delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeleteOrganizationRolesRoleId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.roles>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.roles>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.organization.roles>['delete']>>,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<ReturnType<typeof client.organization.roles>['delete']>[0]
            options?: Parameters<ReturnType<typeof client.organization.roles>['delete']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteOrganizationRolesRoleIdMutationOptions<TError, TOnMutateResult>(
    params,
  )
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getOrganizationSpendAlertsQueryKey(
  options?: Parameters<typeof client.organization.spend_alerts.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['organization', '/organization/spend_alerts', keyArgs] as const
}

export function getOrganizationSpendAlertsQueryOptions(
  options?: Parameters<typeof client.organization.spend_alerts.get>[0],
) {
  return {
    queryKey: getOrganizationSpendAlertsQueryKey(options),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.organization.spend_alerts.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useOrganizationSpendAlerts<
  TData = Extract<
    Awaited<ReturnType<typeof client.organization.spend_alerts.get>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.organization.spend_alerts.get>>['error'], null>,
>(
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<typeof client.organization.spend_alerts.get>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<typeof client.organization.spend_alerts.get>>,
            { error: null }
          >['data'],
          ReturnType<typeof getOrganizationSpendAlertsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.organization.spend_alerts.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: getOrganizationSpendAlertsQueryKey(clientOptions),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.organization.spend_alerts.get({
          ...clientOptions,
          fetch: { ...clientOptions?.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostOrganizationSpendAlertsMutationKey() {
  return ['organization', '/organization/spend_alerts', 'POST'] as const
}

export function getPostOrganizationSpendAlertsMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<typeof client.organization.spend_alerts.post>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<typeof client.organization.spend_alerts.post>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<typeof client.organization.spend_alerts.post>[0]
      options?: Parameters<typeof client.organization.spend_alerts.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostOrganizationSpendAlertsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.organization.spend_alerts.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostOrganizationSpendAlerts<
  TError = Exclude<
    Awaited<ReturnType<typeof client.organization.spend_alerts.post>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<typeof client.organization.spend_alerts.post>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<typeof client.organization.spend_alerts.post>[0]
            options?: Parameters<typeof client.organization.spend_alerts.post>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostOrganizationSpendAlertsMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getOrganizationSpendAlertsAlertIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.spend_alerts>[0]>,
) {
  return ['organization', '/organization/spend_alerts/{alert_id}', toValue(params)] as const
}

export function getOrganizationSpendAlertsAlertIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.spend_alerts>[0]>,
  options?: Parameters<ReturnType<typeof client.organization.spend_alerts>['get']>[0],
) {
  return {
    queryKey: computed(() => getOrganizationSpendAlertsAlertIdQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.organization
        .spend_alerts(toValue(params))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useOrganizationSpendAlertsAlertId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.organization.spend_alerts>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.spend_alerts>['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.spend_alerts>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.organization.spend_alerts>['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.organization.spend_alerts>['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getOrganizationSpendAlertsAlertIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.organization.spend_alerts>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getOrganizationSpendAlertsAlertIdQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.organization
          .spend_alerts(toValue(params))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostOrganizationSpendAlertsAlertIdMutationKey() {
  return ['organization', '/organization/spend_alerts/{alert_id}', 'POST'] as const
}

export function getPostOrganizationSpendAlertsAlertIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.spend_alerts>['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.organization.spend_alerts>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.organization.spend_alerts>['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.organization.spend_alerts>['post']>[0]
      options?: Parameters<ReturnType<typeof client.organization.spend_alerts>['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostOrganizationSpendAlertsAlertIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.organization
        .spend_alerts(toValue(params))
        .post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostOrganizationSpendAlertsAlertId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.spend_alerts>['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.spend_alerts>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.organization.spend_alerts>['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.organization.spend_alerts>['post']>[0]
            options?: Parameters<ReturnType<typeof client.organization.spend_alerts>['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostOrganizationSpendAlertsAlertIdMutationOptions<
    TError,
    TOnMutateResult
  >(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getDeleteOrganizationSpendAlertsAlertIdMutationKey() {
  return ['organization', '/organization/spend_alerts/{alert_id}', 'DELETE'] as const
}

export function getDeleteOrganizationSpendAlertsAlertIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.spend_alerts>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.organization.spend_alerts>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.organization.spend_alerts>['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<typeof client.organization.spend_alerts>['delete']>[0]
      options?: Parameters<ReturnType<typeof client.organization.spend_alerts>['delete']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteOrganizationSpendAlertsAlertIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.organization
        .spend_alerts(toValue(params))
        .delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeleteOrganizationSpendAlertsAlertId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.spend_alerts>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.spend_alerts>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.organization.spend_alerts>['delete']>>,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<ReturnType<typeof client.organization.spend_alerts>['delete']>[0]
            options?: Parameters<ReturnType<typeof client.organization.spend_alerts>['delete']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteOrganizationSpendAlertsAlertIdMutationOptions<
    TError,
    TOnMutateResult
  >(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getOrganizationUsageAudioSpeechesQueryKey(
  options: Parameters<typeof client.organization.usage.audio_speeches.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['organization', '/organization/usage/audio_speeches', keyArgs] as const
}

export function getOrganizationUsageAudioSpeechesQueryOptions(
  options: Parameters<typeof client.organization.usage.audio_speeches.get>[0],
) {
  return {
    queryKey: getOrganizationUsageAudioSpeechesQueryKey(options),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.organization.usage.audio_speeches.get({
        ...options,
        fetch: { ...options.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useOrganizationUsageAudioSpeeches<
  TData = Extract<
    Awaited<ReturnType<typeof client.organization.usage.audio_speeches.get>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<typeof client.organization.usage.audio_speeches.get>>['error'],
    null
  >,
>(
  options: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<typeof client.organization.usage.audio_speeches.get>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<typeof client.organization.usage.audio_speeches.get>>,
            { error: null }
          >['data'],
          ReturnType<typeof getOrganizationUsageAudioSpeechesQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.organization.usage.audio_speeches.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options
  return useQuery(
    {
      ...queryOptions,
      queryKey: getOrganizationUsageAudioSpeechesQueryKey(clientOptions),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.organization.usage.audio_speeches.get({
          ...clientOptions,
          fetch: { ...clientOptions.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getOrganizationUsageAudioTranscriptionsQueryKey(
  options: Parameters<typeof client.organization.usage.audio_transcriptions.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['organization', '/organization/usage/audio_transcriptions', keyArgs] as const
}

export function getOrganizationUsageAudioTranscriptionsQueryOptions(
  options: Parameters<typeof client.organization.usage.audio_transcriptions.get>[0],
) {
  return {
    queryKey: getOrganizationUsageAudioTranscriptionsQueryKey(options),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.organization.usage.audio_transcriptions.get({
        ...options,
        fetch: { ...options.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useOrganizationUsageAudioTranscriptions<
  TData = Extract<
    Awaited<ReturnType<typeof client.organization.usage.audio_transcriptions.get>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<typeof client.organization.usage.audio_transcriptions.get>>['error'],
    null
  >,
>(
  options: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<typeof client.organization.usage.audio_transcriptions.get>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<typeof client.organization.usage.audio_transcriptions.get>>,
            { error: null }
          >['data'],
          ReturnType<typeof getOrganizationUsageAudioTranscriptionsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.organization.usage.audio_transcriptions.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options
  return useQuery(
    {
      ...queryOptions,
      queryKey: getOrganizationUsageAudioTranscriptionsQueryKey(clientOptions),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.organization.usage.audio_transcriptions.get({
          ...clientOptions,
          fetch: { ...clientOptions.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getOrganizationUsageCodeInterpreterSessionsQueryKey(
  options: Parameters<typeof client.organization.usage.code_interpreter_sessions.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['organization', '/organization/usage/code_interpreter_sessions', keyArgs] as const
}

export function getOrganizationUsageCodeInterpreterSessionsQueryOptions(
  options: Parameters<typeof client.organization.usage.code_interpreter_sessions.get>[0],
) {
  return {
    queryKey: getOrganizationUsageCodeInterpreterSessionsQueryKey(options),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.organization.usage.code_interpreter_sessions.get({
        ...options,
        fetch: { ...options.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useOrganizationUsageCodeInterpreterSessions<
  TData = Extract<
    Awaited<ReturnType<typeof client.organization.usage.code_interpreter_sessions.get>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<typeof client.organization.usage.code_interpreter_sessions.get>>['error'],
    null
  >,
>(
  options: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<typeof client.organization.usage.code_interpreter_sessions.get>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<typeof client.organization.usage.code_interpreter_sessions.get>>,
            { error: null }
          >['data'],
          ReturnType<typeof getOrganizationUsageCodeInterpreterSessionsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.organization.usage.code_interpreter_sessions.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options
  return useQuery(
    {
      ...queryOptions,
      queryKey: getOrganizationUsageCodeInterpreterSessionsQueryKey(clientOptions),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.organization.usage.code_interpreter_sessions.get({
          ...clientOptions,
          fetch: { ...clientOptions.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getOrganizationUsageCompletionsQueryKey(
  options: Parameters<typeof client.organization.usage.completions.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['organization', '/organization/usage/completions', keyArgs] as const
}

export function getOrganizationUsageCompletionsQueryOptions(
  options: Parameters<typeof client.organization.usage.completions.get>[0],
) {
  return {
    queryKey: getOrganizationUsageCompletionsQueryKey(options),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.organization.usage.completions.get({
        ...options,
        fetch: { ...options.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useOrganizationUsageCompletions<
  TData = Extract<
    Awaited<ReturnType<typeof client.organization.usage.completions.get>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<typeof client.organization.usage.completions.get>>['error'],
    null
  >,
>(
  options: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<typeof client.organization.usage.completions.get>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<typeof client.organization.usage.completions.get>>,
            { error: null }
          >['data'],
          ReturnType<typeof getOrganizationUsageCompletionsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.organization.usage.completions.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options
  return useQuery(
    {
      ...queryOptions,
      queryKey: getOrganizationUsageCompletionsQueryKey(clientOptions),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.organization.usage.completions.get({
          ...clientOptions,
          fetch: { ...clientOptions.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getOrganizationUsageEmbeddingsQueryKey(
  options: Parameters<typeof client.organization.usage.embeddings.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['organization', '/organization/usage/embeddings', keyArgs] as const
}

export function getOrganizationUsageEmbeddingsQueryOptions(
  options: Parameters<typeof client.organization.usage.embeddings.get>[0],
) {
  return {
    queryKey: getOrganizationUsageEmbeddingsQueryKey(options),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.organization.usage.embeddings.get({
        ...options,
        fetch: { ...options.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useOrganizationUsageEmbeddings<
  TData = Extract<
    Awaited<ReturnType<typeof client.organization.usage.embeddings.get>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<typeof client.organization.usage.embeddings.get>>['error'],
    null
  >,
>(
  options: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<typeof client.organization.usage.embeddings.get>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<typeof client.organization.usage.embeddings.get>>,
            { error: null }
          >['data'],
          ReturnType<typeof getOrganizationUsageEmbeddingsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.organization.usage.embeddings.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options
  return useQuery(
    {
      ...queryOptions,
      queryKey: getOrganizationUsageEmbeddingsQueryKey(clientOptions),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.organization.usage.embeddings.get({
          ...clientOptions,
          fetch: { ...clientOptions.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getOrganizationUsageFileSearchCallsQueryKey(
  options: Parameters<typeof client.organization.usage.file_search_calls.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['organization', '/organization/usage/file_search_calls', keyArgs] as const
}

export function getOrganizationUsageFileSearchCallsQueryOptions(
  options: Parameters<typeof client.organization.usage.file_search_calls.get>[0],
) {
  return {
    queryKey: getOrganizationUsageFileSearchCallsQueryKey(options),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.organization.usage.file_search_calls.get({
        ...options,
        fetch: { ...options.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useOrganizationUsageFileSearchCalls<
  TData = Extract<
    Awaited<ReturnType<typeof client.organization.usage.file_search_calls.get>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<typeof client.organization.usage.file_search_calls.get>>['error'],
    null
  >,
>(
  options: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<typeof client.organization.usage.file_search_calls.get>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<typeof client.organization.usage.file_search_calls.get>>,
            { error: null }
          >['data'],
          ReturnType<typeof getOrganizationUsageFileSearchCallsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.organization.usage.file_search_calls.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options
  return useQuery(
    {
      ...queryOptions,
      queryKey: getOrganizationUsageFileSearchCallsQueryKey(clientOptions),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.organization.usage.file_search_calls.get({
          ...clientOptions,
          fetch: { ...clientOptions.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getOrganizationUsageImagesQueryKey(
  options: Parameters<typeof client.organization.usage.images.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['organization', '/organization/usage/images', keyArgs] as const
}

export function getOrganizationUsageImagesQueryOptions(
  options: Parameters<typeof client.organization.usage.images.get>[0],
) {
  return {
    queryKey: getOrganizationUsageImagesQueryKey(options),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.organization.usage.images.get({
        ...options,
        fetch: { ...options.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useOrganizationUsageImages<
  TData = Extract<
    Awaited<ReturnType<typeof client.organization.usage.images.get>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.organization.usage.images.get>>['error'], null>,
>(
  options: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<typeof client.organization.usage.images.get>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<typeof client.organization.usage.images.get>>,
            { error: null }
          >['data'],
          ReturnType<typeof getOrganizationUsageImagesQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.organization.usage.images.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options
  return useQuery(
    {
      ...queryOptions,
      queryKey: getOrganizationUsageImagesQueryKey(clientOptions),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.organization.usage.images.get({
          ...clientOptions,
          fetch: { ...clientOptions.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getOrganizationUsageModerationsQueryKey(
  options: Parameters<typeof client.organization.usage.moderations.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['organization', '/organization/usage/moderations', keyArgs] as const
}

export function getOrganizationUsageModerationsQueryOptions(
  options: Parameters<typeof client.organization.usage.moderations.get>[0],
) {
  return {
    queryKey: getOrganizationUsageModerationsQueryKey(options),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.organization.usage.moderations.get({
        ...options,
        fetch: { ...options.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useOrganizationUsageModerations<
  TData = Extract<
    Awaited<ReturnType<typeof client.organization.usage.moderations.get>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<typeof client.organization.usage.moderations.get>>['error'],
    null
  >,
>(
  options: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<typeof client.organization.usage.moderations.get>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<typeof client.organization.usage.moderations.get>>,
            { error: null }
          >['data'],
          ReturnType<typeof getOrganizationUsageModerationsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.organization.usage.moderations.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options
  return useQuery(
    {
      ...queryOptions,
      queryKey: getOrganizationUsageModerationsQueryKey(clientOptions),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.organization.usage.moderations.get({
          ...clientOptions,
          fetch: { ...clientOptions.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getOrganizationUsageVectorStoresQueryKey(
  options: Parameters<typeof client.organization.usage.vector_stores.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['organization', '/organization/usage/vector_stores', keyArgs] as const
}

export function getOrganizationUsageVectorStoresQueryOptions(
  options: Parameters<typeof client.organization.usage.vector_stores.get>[0],
) {
  return {
    queryKey: getOrganizationUsageVectorStoresQueryKey(options),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.organization.usage.vector_stores.get({
        ...options,
        fetch: { ...options.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useOrganizationUsageVectorStores<
  TData = Extract<
    Awaited<ReturnType<typeof client.organization.usage.vector_stores.get>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<typeof client.organization.usage.vector_stores.get>>['error'],
    null
  >,
>(
  options: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<typeof client.organization.usage.vector_stores.get>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<typeof client.organization.usage.vector_stores.get>>,
            { error: null }
          >['data'],
          ReturnType<typeof getOrganizationUsageVectorStoresQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.organization.usage.vector_stores.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options
  return useQuery(
    {
      ...queryOptions,
      queryKey: getOrganizationUsageVectorStoresQueryKey(clientOptions),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.organization.usage.vector_stores.get({
          ...clientOptions,
          fetch: { ...clientOptions.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getOrganizationUsageWebSearchCallsQueryKey(
  options: Parameters<typeof client.organization.usage.web_search_calls.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['organization', '/organization/usage/web_search_calls', keyArgs] as const
}

export function getOrganizationUsageWebSearchCallsQueryOptions(
  options: Parameters<typeof client.organization.usage.web_search_calls.get>[0],
) {
  return {
    queryKey: getOrganizationUsageWebSearchCallsQueryKey(options),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.organization.usage.web_search_calls.get({
        ...options,
        fetch: { ...options.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useOrganizationUsageWebSearchCalls<
  TData = Extract<
    Awaited<ReturnType<typeof client.organization.usage.web_search_calls.get>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<typeof client.organization.usage.web_search_calls.get>>['error'],
    null
  >,
>(
  options: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<typeof client.organization.usage.web_search_calls.get>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<typeof client.organization.usage.web_search_calls.get>>,
            { error: null }
          >['data'],
          ReturnType<typeof getOrganizationUsageWebSearchCallsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.organization.usage.web_search_calls.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options
  return useQuery(
    {
      ...queryOptions,
      queryKey: getOrganizationUsageWebSearchCallsQueryKey(clientOptions),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.organization.usage.web_search_calls.get({
          ...clientOptions,
          fetch: { ...clientOptions.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getOrganizationUsersQueryKey(
  options?: Parameters<typeof client.organization.users.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['organization', '/organization/users', keyArgs] as const
}

export function getOrganizationUsersQueryOptions(
  options?: Parameters<typeof client.organization.users.get>[0],
) {
  return {
    queryKey: getOrganizationUsersQueryKey(options),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.organization.users.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useOrganizationUsers<
  TData = Extract<
    Awaited<ReturnType<typeof client.organization.users.get>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.organization.users.get>>['error'], null>,
>(
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<typeof client.organization.users.get>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<typeof client.organization.users.get>>,
            { error: null }
          >['data'],
          ReturnType<typeof getOrganizationUsersQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.organization.users.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: getOrganizationUsersQueryKey(clientOptions),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.organization.users.get({
          ...clientOptions,
          fetch: { ...clientOptions?.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getOrganizationUsersUserIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.users>[0]>,
) {
  return ['organization', '/organization/users/{user_id}', toValue(params)] as const
}

export function getOrganizationUsersUserIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.users>[0]>,
  options?: Parameters<ReturnType<typeof client.organization.users>['get']>[0],
) {
  return {
    queryKey: computed(() => getOrganizationUsersUserIdQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.organization
        .users(toValue(params))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useOrganizationUsersUserId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.organization.users>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.users>['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.users>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.organization.users>['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.organization.users>['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getOrganizationUsersUserIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.organization.users>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getOrganizationUsersUserIdQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.organization
          .users(toValue(params))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostOrganizationUsersUserIdMutationKey() {
  return ['organization', '/organization/users/{user_id}', 'POST'] as const
}

export function getPostOrganizationUsersUserIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.users>['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.organization.users>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.organization.users>['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.organization.users>['post']>[0]
      options?: Parameters<ReturnType<typeof client.organization.users>['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostOrganizationUsersUserIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.organization.users(toValue(params)).post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostOrganizationUsersUserId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.users>['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.users>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.organization.users>['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.organization.users>['post']>[0]
            options?: Parameters<ReturnType<typeof client.organization.users>['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostOrganizationUsersUserIdMutationOptions<TError, TOnMutateResult>(
    params,
  )
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getDeleteOrganizationUsersUserIdMutationKey() {
  return ['organization', '/organization/users/{user_id}', 'DELETE'] as const
}

export function getDeleteOrganizationUsersUserIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.users>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.organization.users>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.organization.users>['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<typeof client.organization.users>['delete']>[0]
      options?: Parameters<ReturnType<typeof client.organization.users>['delete']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteOrganizationUsersUserIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.organization.users(toValue(params)).delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeleteOrganizationUsersUserId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.users>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.users>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.organization.users>['delete']>>,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<ReturnType<typeof client.organization.users>['delete']>[0]
            options?: Parameters<ReturnType<typeof client.organization.users>['delete']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteOrganizationUsersUserIdMutationOptions<TError, TOnMutateResult>(
    params,
  )
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getOrganizationUsersUserIdRolesQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.users>[0]>,
  options?: Parameters<ReturnType<typeof client.organization.users>['roles']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['organization', '/organization/users/{user_id}/roles', toValue(params), keyArgs] as const
}

export function getOrganizationUsersUserIdRolesQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.users>[0]>,
  options?: Parameters<ReturnType<typeof client.organization.users>['roles']['get']>[0],
) {
  return {
    queryKey: computed(() => getOrganizationUsersUserIdRolesQueryKey(params, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.organization
        .users(toValue(params))
        .roles.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useOrganizationUsersUserIdRoles<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.organization.users>['roles']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.users>['roles']['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.users>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.organization.users>['roles']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.organization.users>['roles']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getOrganizationUsersUserIdRolesQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.organization.users>['roles']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getOrganizationUsersUserIdRolesQueryKey(params, clientOptions)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.organization
          .users(toValue(params))
          .roles.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostOrganizationUsersUserIdRolesMutationKey() {
  return ['organization', '/organization/users/{user_id}/roles', 'POST'] as const
}

export function getPostOrganizationUsersUserIdRolesMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.users>['roles']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.organization.users>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.organization.users>['roles']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.organization.users>['roles']['post']>[0]
      options?: Parameters<ReturnType<typeof client.organization.users>['roles']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostOrganizationUsersUserIdRolesMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.organization
        .users(toValue(params))
        .roles.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostOrganizationUsersUserIdRoles<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.users>['roles']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.users>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.organization.users>['roles']['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.organization.users>['roles']['post']>[0]
            options?: Parameters<ReturnType<typeof client.organization.users>['roles']['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostOrganizationUsersUserIdRolesMutationOptions<
    TError,
    TOnMutateResult
  >(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getOrganizationUsersUserIdRolesRoleIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.users>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.organization.users>['roles']>[0]>,
) {
  return [
    'organization',
    '/organization/users/{user_id}/roles/{role_id}',
    toValue(params),
    toValue(params2),
  ] as const
}

export function getOrganizationUsersUserIdRolesRoleIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.users>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.organization.users>['roles']>[0]>,
  options?: Parameters<ReturnType<ReturnType<typeof client.organization.users>['roles']>['get']>[0],
) {
  return {
    queryKey: computed(() => getOrganizationUsersUserIdRolesRoleIdQueryKey(params, params2)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.organization
        .users(toValue(params))
        .roles(toValue(params2))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useOrganizationUsersUserIdRolesRoleId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.organization.users>['roles']>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.organization.users>['roles']>['get']>
    >['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.users>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.organization.users>['roles']>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<
              ReturnType<ReturnType<ReturnType<typeof client.organization.users>['roles']>['get']>
            >,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<
              ReturnType<ReturnType<ReturnType<typeof client.organization.users>['roles']>['get']>
            >,
            { error: null }
          >['data'],
          ReturnType<typeof getOrganizationUsersUserIdRolesRoleIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<
      ReturnType<ReturnType<typeof client.organization.users>['roles']>['get']
    >[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getOrganizationUsersUserIdRolesRoleIdQueryKey(params, params2)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.organization
          .users(toValue(params))
          .roles(toValue(params2))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getDeleteOrganizationUsersUserIdRolesRoleIdMutationKey() {
  return ['organization', '/organization/users/{user_id}/roles/{role_id}', 'DELETE'] as const
}

export function getDeleteOrganizationUsersUserIdRolesRoleIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.organization.users>['roles']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.users>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.organization.users>['roles']>[0]>,
) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<ReturnType<ReturnType<typeof client.organization.users>['roles']>['delete']>
      >,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<
        ReturnType<ReturnType<typeof client.organization.users>['roles']>['delete']
      >[0]
      options?: Parameters<
        ReturnType<ReturnType<typeof client.organization.users>['roles']>['delete']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteOrganizationUsersUserIdRolesRoleIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.organization
        .users(toValue(params))
        .roles(toValue(params2))
        .delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeleteOrganizationUsersUserIdRolesRoleId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.organization.users>['roles']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.users>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.organization.users>['roles']>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<
                ReturnType<ReturnType<typeof client.organization.users>['roles']>['delete']
              >
            >,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<
              ReturnType<ReturnType<typeof client.organization.users>['roles']>['delete']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.organization.users>['roles']>['delete']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteOrganizationUsersUserIdRolesRoleIdMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getProjectsProjectIdGroupsGroupIdRolesQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.projects>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.projects>['groups']>[0]>,
  options?: Parameters<ReturnType<ReturnType<typeof client.projects>['groups']>['roles']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'projects',
    '/projects/{project_id}/groups/{group_id}/roles',
    toValue(params),
    toValue(params2),
    keyArgs,
  ] as const
}

export function getProjectsProjectIdGroupsGroupIdRolesQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.projects>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.projects>['groups']>[0]>,
  options?: Parameters<ReturnType<ReturnType<typeof client.projects>['groups']>['roles']['get']>[0],
) {
  return {
    queryKey: computed(() =>
      getProjectsProjectIdGroupsGroupIdRolesQueryKey(params, params2, options),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .projects(toValue(params))
        .groups(toValue(params2))
        .roles.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useProjectsProjectIdGroupsGroupIdRoles<
  TData = Extract<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.projects>['groups']>['roles']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.projects>['groups']>['roles']['get']>
    >['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.projects>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.projects>['groups']>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<
              ReturnType<ReturnType<ReturnType<typeof client.projects>['groups']>['roles']['get']>
            >,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<
              ReturnType<ReturnType<ReturnType<typeof client.projects>['groups']>['roles']['get']>
            >,
            { error: null }
          >['data'],
          ReturnType<typeof getProjectsProjectIdGroupsGroupIdRolesQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<
      ReturnType<ReturnType<typeof client.projects>['groups']>['roles']['get']
    >[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() =>
        getProjectsProjectIdGroupsGroupIdRolesQueryKey(params, params2, clientOptions),
      ),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .projects(toValue(params))
          .groups(toValue(params2))
          .roles.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostProjectsProjectIdGroupsGroupIdRolesMutationKey() {
  return ['projects', '/projects/{project_id}/groups/{group_id}/roles', 'POST'] as const
}

export function getPostProjectsProjectIdGroupsGroupIdRolesMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.projects>['groups']>['roles']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.projects>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.projects>['groups']>[0]>,
) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<ReturnType<ReturnType<typeof client.projects>['groups']>['roles']['post']>
      >,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<ReturnType<typeof client.projects>['groups']>['roles']['post']>[0]
      options?: Parameters<
        ReturnType<ReturnType<typeof client.projects>['groups']>['roles']['post']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostProjectsProjectIdGroupsGroupIdRolesMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .projects(toValue(params))
        .groups(toValue(params2))
        .roles.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostProjectsProjectIdGroupsGroupIdRoles<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.projects>['groups']>['roles']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.projects>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.projects>['groups']>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<ReturnType<ReturnType<typeof client.projects>['groups']>['roles']['post']>
            >,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<
              ReturnType<ReturnType<typeof client.projects>['groups']>['roles']['post']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.projects>['groups']>['roles']['post']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostProjectsProjectIdGroupsGroupIdRolesMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getProjectsProjectIdGroupsGroupIdRolesRoleIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.projects>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.projects>['groups']>[0]>,
  params3: MaybeRefOrGetter<
    Parameters<ReturnType<ReturnType<typeof client.projects>['groups']>['roles']>[0]
  >,
) {
  return [
    'projects',
    '/projects/{project_id}/groups/{group_id}/roles/{role_id}',
    toValue(params),
    toValue(params2),
    toValue(params3),
  ] as const
}

export function getProjectsProjectIdGroupsGroupIdRolesRoleIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.projects>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.projects>['groups']>[0]>,
  params3: MaybeRefOrGetter<
    Parameters<ReturnType<ReturnType<typeof client.projects>['groups']>['roles']>[0]
  >,
  options?: Parameters<
    ReturnType<ReturnType<ReturnType<typeof client.projects>['groups']>['roles']>['get']
  >[0],
) {
  return {
    queryKey: computed(() =>
      getProjectsProjectIdGroupsGroupIdRolesRoleIdQueryKey(params, params2, params3),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .projects(toValue(params))
        .groups(toValue(params2))
        .roles(toValue(params3))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useProjectsProjectIdGroupsGroupIdRolesRoleId<
  TData = Extract<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<ReturnType<typeof client.projects>['groups']>['roles']>['get']
      >
    >,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<ReturnType<typeof client.projects>['groups']>['roles']>['get']
      >
    >['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.projects>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.projects>['groups']>[0]>,
  params3: MaybeRefOrGetter<
    Parameters<ReturnType<ReturnType<typeof client.projects>['groups']>['roles']>[0]
  >,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<
              ReturnType<
                ReturnType<ReturnType<ReturnType<typeof client.projects>['groups']>['roles']>['get']
              >
            >,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<
              ReturnType<
                ReturnType<ReturnType<ReturnType<typeof client.projects>['groups']>['roles']>['get']
              >
            >,
            { error: null }
          >['data'],
          ReturnType<typeof getProjectsProjectIdGroupsGroupIdRolesRoleIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<
      ReturnType<ReturnType<ReturnType<typeof client.projects>['groups']>['roles']>['get']
    >[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() =>
        getProjectsProjectIdGroupsGroupIdRolesRoleIdQueryKey(params, params2, params3),
      ),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .projects(toValue(params))
          .groups(toValue(params2))
          .roles(toValue(params3))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getDeleteProjectsProjectIdGroupsGroupIdRolesRoleIdMutationKey() {
  return ['projects', '/projects/{project_id}/groups/{group_id}/roles/{role_id}', 'DELETE'] as const
}

export function getDeleteProjectsProjectIdGroupsGroupIdRolesRoleIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<ReturnType<typeof client.projects>['groups']>['roles']>['delete']
      >
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.projects>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.projects>['groups']>[0]>,
  params3: MaybeRefOrGetter<
    Parameters<ReturnType<ReturnType<typeof client.projects>['groups']>['roles']>[0]
  >,
) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<
          ReturnType<ReturnType<ReturnType<typeof client.projects>['groups']>['roles']>['delete']
        >
      >,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<
        ReturnType<ReturnType<ReturnType<typeof client.projects>['groups']>['roles']>['delete']
      >[0]
      options?: Parameters<
        ReturnType<ReturnType<ReturnType<typeof client.projects>['groups']>['roles']>['delete']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteProjectsProjectIdGroupsGroupIdRolesRoleIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .projects(toValue(params))
        .groups(toValue(params2))
        .roles(toValue(params3))
        .delete(body, options)
      if (error) throw error
      return data
    },
  })
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
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.projects>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.projects>['groups']>[0]>,
  params3: MaybeRefOrGetter<
    Parameters<ReturnType<ReturnType<typeof client.projects>['groups']>['roles']>[0]
  >,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<
                ReturnType<
                  ReturnType<ReturnType<typeof client.projects>['groups']>['roles']
                >['delete']
              >
            >,
            { error: null }
          >['data'],
          TError,
          {
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
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteProjectsProjectIdGroupsGroupIdRolesRoleIdMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2, params3)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getProjectsProjectIdRolesQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.projects>[0]>,
  options?: Parameters<ReturnType<typeof client.projects>['roles']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['projects', '/projects/{project_id}/roles', toValue(params), keyArgs] as const
}

export function getProjectsProjectIdRolesQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.projects>[0]>,
  options?: Parameters<ReturnType<typeof client.projects>['roles']['get']>[0],
) {
  return {
    queryKey: computed(() => getProjectsProjectIdRolesQueryKey(params, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .projects(toValue(params))
        .roles.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useProjectsProjectIdRoles<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.projects>['roles']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.projects>['roles']['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.projects>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.projects>['roles']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.projects>['roles']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getProjectsProjectIdRolesQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.projects>['roles']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getProjectsProjectIdRolesQueryKey(params, clientOptions)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .projects(toValue(params))
          .roles.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostProjectsProjectIdRolesMutationKey() {
  return ['projects', '/projects/{project_id}/roles', 'POST'] as const
}

export function getPostProjectsProjectIdRolesMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.projects>['roles']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.projects>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.projects>['roles']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.projects>['roles']['post']>[0]
      options?: Parameters<ReturnType<typeof client.projects>['roles']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostProjectsProjectIdRolesMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.projects(toValue(params)).roles.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostProjectsProjectIdRoles<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.projects>['roles']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.projects>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.projects>['roles']['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.projects>['roles']['post']>[0]
            options?: Parameters<ReturnType<typeof client.projects>['roles']['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostProjectsProjectIdRolesMutationOptions<TError, TOnMutateResult>(
    params,
  )
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getProjectsProjectIdRolesRoleIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.projects>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.projects>['roles']>[0]>,
) {
  return [
    'projects',
    '/projects/{project_id}/roles/{role_id}',
    toValue(params),
    toValue(params2),
  ] as const
}

export function getProjectsProjectIdRolesRoleIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.projects>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.projects>['roles']>[0]>,
  options?: Parameters<ReturnType<ReturnType<typeof client.projects>['roles']>['get']>[0],
) {
  return {
    queryKey: computed(() => getProjectsProjectIdRolesRoleIdQueryKey(params, params2)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .projects(toValue(params))
        .roles(toValue(params2))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useProjectsProjectIdRolesRoleId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.projects>['roles']>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.projects>['roles']>['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.projects>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.projects>['roles']>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<ReturnType<typeof client.projects>['roles']>['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<ReturnType<typeof client.projects>['roles']>['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getProjectsProjectIdRolesRoleIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<ReturnType<typeof client.projects>['roles']>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getProjectsProjectIdRolesRoleIdQueryKey(params, params2)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .projects(toValue(params))
          .roles(toValue(params2))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostProjectsProjectIdRolesRoleIdMutationKey() {
  return ['projects', '/projects/{project_id}/roles/{role_id}', 'POST'] as const
}

export function getPostProjectsProjectIdRolesRoleIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.projects>['roles']>['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.projects>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.projects>['roles']>[0]>,
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.projects>['roles']>['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<ReturnType<typeof client.projects>['roles']>['post']>[0]
      options?: Parameters<ReturnType<ReturnType<typeof client.projects>['roles']>['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostProjectsProjectIdRolesRoleIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .projects(toValue(params))
        .roles(toValue(params2))
        .post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostProjectsProjectIdRolesRoleId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.projects>['roles']>['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.projects>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.projects>['roles']>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<ReturnType<typeof client.projects>['roles']>['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<ReturnType<typeof client.projects>['roles']>['post']>[0]
            options?: Parameters<ReturnType<ReturnType<typeof client.projects>['roles']>['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostProjectsProjectIdRolesRoleIdMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getDeleteProjectsProjectIdRolesRoleIdMutationKey() {
  return ['projects', '/projects/{project_id}/roles/{role_id}', 'DELETE'] as const
}

export function getDeleteProjectsProjectIdRolesRoleIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.projects>['roles']>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.projects>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.projects>['roles']>[0]>,
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.projects>['roles']>['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<ReturnType<typeof client.projects>['roles']>['delete']>[0]
      options?: Parameters<ReturnType<ReturnType<typeof client.projects>['roles']>['delete']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteProjectsProjectIdRolesRoleIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .projects(toValue(params))
        .roles(toValue(params2))
        .delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeleteProjectsProjectIdRolesRoleId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.projects>['roles']>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.projects>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.projects>['roles']>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<ReturnType<typeof client.projects>['roles']>['delete']>>,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<ReturnType<ReturnType<typeof client.projects>['roles']>['delete']>[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.projects>['roles']>['delete']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteProjectsProjectIdRolesRoleIdMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getProjectsProjectIdUsersUserIdRolesQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.projects>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.projects>['users']>[0]>,
  options?: Parameters<ReturnType<ReturnType<typeof client.projects>['users']>['roles']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'projects',
    '/projects/{project_id}/users/{user_id}/roles',
    toValue(params),
    toValue(params2),
    keyArgs,
  ] as const
}

export function getProjectsProjectIdUsersUserIdRolesQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.projects>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.projects>['users']>[0]>,
  options?: Parameters<ReturnType<ReturnType<typeof client.projects>['users']>['roles']['get']>[0],
) {
  return {
    queryKey: computed(() =>
      getProjectsProjectIdUsersUserIdRolesQueryKey(params, params2, options),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .projects(toValue(params))
        .users(toValue(params2))
        .roles.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useProjectsProjectIdUsersUserIdRoles<
  TData = Extract<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.projects>['users']>['roles']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.projects>['users']>['roles']['get']>
    >['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.projects>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.projects>['users']>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<
              ReturnType<ReturnType<ReturnType<typeof client.projects>['users']>['roles']['get']>
            >,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<
              ReturnType<ReturnType<ReturnType<typeof client.projects>['users']>['roles']['get']>
            >,
            { error: null }
          >['data'],
          ReturnType<typeof getProjectsProjectIdUsersUserIdRolesQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<ReturnType<typeof client.projects>['users']>['roles']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() =>
        getProjectsProjectIdUsersUserIdRolesQueryKey(params, params2, clientOptions),
      ),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .projects(toValue(params))
          .users(toValue(params2))
          .roles.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostProjectsProjectIdUsersUserIdRolesMutationKey() {
  return ['projects', '/projects/{project_id}/users/{user_id}/roles', 'POST'] as const
}

export function getPostProjectsProjectIdUsersUserIdRolesMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.projects>['users']>['roles']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.projects>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.projects>['users']>[0]>,
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.projects>['users']>['roles']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<ReturnType<typeof client.projects>['users']>['roles']['post']>[0]
      options?: Parameters<
        ReturnType<ReturnType<typeof client.projects>['users']>['roles']['post']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostProjectsProjectIdUsersUserIdRolesMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .projects(toValue(params))
        .users(toValue(params2))
        .roles.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostProjectsProjectIdUsersUserIdRoles<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.projects>['users']>['roles']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.projects>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.projects>['users']>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<ReturnType<ReturnType<typeof client.projects>['users']>['roles']['post']>
            >,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<
              ReturnType<ReturnType<typeof client.projects>['users']>['roles']['post']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.projects>['users']>['roles']['post']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostProjectsProjectIdUsersUserIdRolesMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getProjectsProjectIdUsersUserIdRolesRoleIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.projects>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.projects>['users']>[0]>,
  params3: MaybeRefOrGetter<
    Parameters<ReturnType<ReturnType<typeof client.projects>['users']>['roles']>[0]
  >,
) {
  return [
    'projects',
    '/projects/{project_id}/users/{user_id}/roles/{role_id}',
    toValue(params),
    toValue(params2),
    toValue(params3),
  ] as const
}

export function getProjectsProjectIdUsersUserIdRolesRoleIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.projects>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.projects>['users']>[0]>,
  params3: MaybeRefOrGetter<
    Parameters<ReturnType<ReturnType<typeof client.projects>['users']>['roles']>[0]
  >,
  options?: Parameters<
    ReturnType<ReturnType<ReturnType<typeof client.projects>['users']>['roles']>['get']
  >[0],
) {
  return {
    queryKey: computed(() =>
      getProjectsProjectIdUsersUserIdRolesRoleIdQueryKey(params, params2, params3),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .projects(toValue(params))
        .users(toValue(params2))
        .roles(toValue(params3))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useProjectsProjectIdUsersUserIdRolesRoleId<
  TData = Extract<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<ReturnType<typeof client.projects>['users']>['roles']>['get']
      >
    >,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<ReturnType<typeof client.projects>['users']>['roles']>['get']
      >
    >['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.projects>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.projects>['users']>[0]>,
  params3: MaybeRefOrGetter<
    Parameters<ReturnType<ReturnType<typeof client.projects>['users']>['roles']>[0]
  >,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<
              ReturnType<
                ReturnType<ReturnType<ReturnType<typeof client.projects>['users']>['roles']>['get']
              >
            >,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<
              ReturnType<
                ReturnType<ReturnType<ReturnType<typeof client.projects>['users']>['roles']>['get']
              >
            >,
            { error: null }
          >['data'],
          ReturnType<typeof getProjectsProjectIdUsersUserIdRolesRoleIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<
      ReturnType<ReturnType<ReturnType<typeof client.projects>['users']>['roles']>['get']
    >[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() =>
        getProjectsProjectIdUsersUserIdRolesRoleIdQueryKey(params, params2, params3),
      ),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .projects(toValue(params))
          .users(toValue(params2))
          .roles(toValue(params3))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getDeleteProjectsProjectIdUsersUserIdRolesRoleIdMutationKey() {
  return ['projects', '/projects/{project_id}/users/{user_id}/roles/{role_id}', 'DELETE'] as const
}

export function getDeleteProjectsProjectIdUsersUserIdRolesRoleIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<ReturnType<typeof client.projects>['users']>['roles']>['delete']
      >
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.projects>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.projects>['users']>[0]>,
  params3: MaybeRefOrGetter<
    Parameters<ReturnType<ReturnType<typeof client.projects>['users']>['roles']>[0]
  >,
) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<
          ReturnType<ReturnType<ReturnType<typeof client.projects>['users']>['roles']>['delete']
        >
      >,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<
        ReturnType<ReturnType<ReturnType<typeof client.projects>['users']>['roles']>['delete']
      >[0]
      options?: Parameters<
        ReturnType<ReturnType<ReturnType<typeof client.projects>['users']>['roles']>['delete']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteProjectsProjectIdUsersUserIdRolesRoleIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .projects(toValue(params))
        .users(toValue(params2))
        .roles(toValue(params3))
        .delete(body, options)
      if (error) throw error
      return data
    },
  })
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
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.projects>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.projects>['users']>[0]>,
  params3: MaybeRefOrGetter<
    Parameters<ReturnType<ReturnType<typeof client.projects>['users']>['roles']>[0]
  >,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<
                ReturnType<
                  ReturnType<ReturnType<typeof client.projects>['users']>['roles']
                >['delete']
              >
            >,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<
              ReturnType<ReturnType<ReturnType<typeof client.projects>['users']>['roles']>['delete']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<ReturnType<typeof client.projects>['users']>['roles']>['delete']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteProjectsProjectIdUsersUserIdRolesRoleIdMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2, params3)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPostRealtimeCallsMutationKey() {
  return ['realtime', '/realtime/calls', 'POST'] as const
}

export function getPostRealtimeCallsMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.realtime.calls.post>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.realtime.calls.post>>, { error: null }>['data'],
    TError,
    {
      body: Parameters<typeof client.realtime.calls.post>[0]
      options?: Parameters<typeof client.realtime.calls.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostRealtimeCallsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.realtime.calls.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostRealtimeCalls<
  TError = Exclude<Awaited<ReturnType<typeof client.realtime.calls.post>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<Awaited<ReturnType<typeof client.realtime.calls.post>>, { error: null }>['data'],
          TError,
          {
            body: Parameters<typeof client.realtime.calls.post>[0]
            options?: Parameters<typeof client.realtime.calls.post>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostRealtimeCallsMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPostRealtimeCallsCallIdAcceptMutationKey() {
  return ['realtime', '/realtime/calls/{call_id}/accept', 'POST'] as const
}

export function getPostRealtimeCallsCallIdAcceptMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.realtime.calls>['accept']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.realtime.calls>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.realtime.calls>['accept']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.realtime.calls>['accept']['post']>[0]
      options?: Parameters<ReturnType<typeof client.realtime.calls>['accept']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostRealtimeCallsCallIdAcceptMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.realtime
        .calls(toValue(params))
        .accept.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostRealtimeCallsCallIdAccept<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.realtime.calls>['accept']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.realtime.calls>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.realtime.calls>['accept']['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.realtime.calls>['accept']['post']>[0]
            options?: Parameters<ReturnType<typeof client.realtime.calls>['accept']['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostRealtimeCallsCallIdAcceptMutationOptions<TError, TOnMutateResult>(
    params,
  )
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPostRealtimeCallsCallIdHangupMutationKey() {
  return ['realtime', '/realtime/calls/{call_id}/hangup', 'POST'] as const
}

export function getPostRealtimeCallsCallIdHangupMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.realtime.calls>['hangup']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.realtime.calls>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.realtime.calls>['hangup']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<typeof client.realtime.calls>['hangup']['post']>[0]
      options?: Parameters<ReturnType<typeof client.realtime.calls>['hangup']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostRealtimeCallsCallIdHangupMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.realtime
        .calls(toValue(params))
        .hangup.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostRealtimeCallsCallIdHangup<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.realtime.calls>['hangup']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.realtime.calls>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.realtime.calls>['hangup']['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<ReturnType<typeof client.realtime.calls>['hangup']['post']>[0]
            options?: Parameters<ReturnType<typeof client.realtime.calls>['hangup']['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostRealtimeCallsCallIdHangupMutationOptions<TError, TOnMutateResult>(
    params,
  )
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPostRealtimeCallsCallIdReferMutationKey() {
  return ['realtime', '/realtime/calls/{call_id}/refer', 'POST'] as const
}

export function getPostRealtimeCallsCallIdReferMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.realtime.calls>['refer']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.realtime.calls>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.realtime.calls>['refer']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.realtime.calls>['refer']['post']>[0]
      options?: Parameters<ReturnType<typeof client.realtime.calls>['refer']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostRealtimeCallsCallIdReferMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.realtime.calls(toValue(params)).refer.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostRealtimeCallsCallIdRefer<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.realtime.calls>['refer']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.realtime.calls>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.realtime.calls>['refer']['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.realtime.calls>['refer']['post']>[0]
            options?: Parameters<ReturnType<typeof client.realtime.calls>['refer']['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostRealtimeCallsCallIdReferMutationOptions<TError, TOnMutateResult>(
    params,
  )
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPostRealtimeCallsCallIdRejectMutationKey() {
  return ['realtime', '/realtime/calls/{call_id}/reject', 'POST'] as const
}

export function getPostRealtimeCallsCallIdRejectMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.realtime.calls>['reject']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.realtime.calls>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.realtime.calls>['reject']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.realtime.calls>['reject']['post']>[0]
      options?: Parameters<ReturnType<typeof client.realtime.calls>['reject']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostRealtimeCallsCallIdRejectMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.realtime
        .calls(toValue(params))
        .reject.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostRealtimeCallsCallIdReject<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.realtime.calls>['reject']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.realtime.calls>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.realtime.calls>['reject']['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.realtime.calls>['reject']['post']>[0]
            options?: Parameters<ReturnType<typeof client.realtime.calls>['reject']['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostRealtimeCallsCallIdRejectMutationOptions<TError, TOnMutateResult>(
    params,
  )
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPostRealtimeClientSecretsMutationKey() {
  return ['realtime', '/realtime/client_secrets', 'POST'] as const
}

export function getPostRealtimeClientSecretsMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.realtime.client_secrets.post>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<typeof client.realtime.client_secrets.post>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<typeof client.realtime.client_secrets.post>[0]
      options?: Parameters<typeof client.realtime.client_secrets.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostRealtimeClientSecretsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.realtime.client_secrets.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostRealtimeClientSecrets<
  TError = Exclude<Awaited<ReturnType<typeof client.realtime.client_secrets.post>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<typeof client.realtime.client_secrets.post>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<typeof client.realtime.client_secrets.post>[0]
            options?: Parameters<typeof client.realtime.client_secrets.post>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostRealtimeClientSecretsMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPostRealtimeSessionsMutationKey() {
  return ['realtime', '/realtime/sessions', 'POST'] as const
}

export function getPostRealtimeSessionsMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.realtime.sessions.post>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.realtime.sessions.post>>, { error: null }>['data'],
    TError,
    {
      body: Parameters<typeof client.realtime.sessions.post>[0]
      options?: Parameters<typeof client.realtime.sessions.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostRealtimeSessionsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.realtime.sessions.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostRealtimeSessions<
  TError = Exclude<Awaited<ReturnType<typeof client.realtime.sessions.post>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<typeof client.realtime.sessions.post>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<typeof client.realtime.sessions.post>[0]
            options?: Parameters<typeof client.realtime.sessions.post>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostRealtimeSessionsMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPostRealtimeTranscriptionSessionsMutationKey() {
  return ['realtime', '/realtime/transcription_sessions', 'POST'] as const
}

export function getPostRealtimeTranscriptionSessionsMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<typeof client.realtime.transcription_sessions.post>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<typeof client.realtime.transcription_sessions.post>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<typeof client.realtime.transcription_sessions.post>[0]
      options?: Parameters<typeof client.realtime.transcription_sessions.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostRealtimeTranscriptionSessionsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.realtime.transcription_sessions.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostRealtimeTranscriptionSessions<
  TError = Exclude<
    Awaited<ReturnType<typeof client.realtime.transcription_sessions.post>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<typeof client.realtime.transcription_sessions.post>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<typeof client.realtime.transcription_sessions.post>[0]
            options?: Parameters<typeof client.realtime.transcription_sessions.post>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostRealtimeTranscriptionSessionsMutationOptions<
    TError,
    TOnMutateResult
  >()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPostRealtimeTranslationsClientSecretsMutationKey() {
  return ['realtime', '/realtime/translations/client_secrets', 'POST'] as const
}

export function getPostRealtimeTranslationsClientSecretsMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<typeof client.realtime.translations.client_secrets.post>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<typeof client.realtime.translations.client_secrets.post>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<typeof client.realtime.translations.client_secrets.post>[0]
      options?: Parameters<typeof client.realtime.translations.client_secrets.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostRealtimeTranslationsClientSecretsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.realtime.translations.client_secrets.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostRealtimeTranslationsClientSecrets<
  TError = Exclude<
    Awaited<ReturnType<typeof client.realtime.translations.client_secrets.post>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<typeof client.realtime.translations.client_secrets.post>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<typeof client.realtime.translations.client_secrets.post>[0]
            options?: Parameters<typeof client.realtime.translations.client_secrets.post>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostRealtimeTranslationsClientSecretsMutationOptions<
    TError,
    TOnMutateResult
  >()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPostResponsesMutationKey() {
  return ['responses', '/responses', 'POST'] as const
}

export function getPostResponsesMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.responses.post>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.responses.post>>, { error: null }>['data'],
    TError,
    {
      body: Parameters<typeof client.responses.post>[0]
      options?: Parameters<typeof client.responses.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostResponsesMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.responses.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostResponses<
  TError = Exclude<Awaited<ReturnType<typeof client.responses.post>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<Awaited<ReturnType<typeof client.responses.post>>, { error: null }>['data'],
          TError,
          {
            body: Parameters<typeof client.responses.post>[0]
            options?: Parameters<typeof client.responses.post>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostResponsesMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getResponsesResponseIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.responses>[0]>,
  options?: Parameters<ReturnType<typeof client.responses>['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['responses', '/responses/{response_id}', toValue(params), keyArgs] as const
}

export function getResponsesResponseIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.responses>[0]>,
  options?: Parameters<ReturnType<typeof client.responses>['get']>[0],
) {
  return {
    queryKey: computed(() => getResponsesResponseIdQueryKey(params, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .responses(toValue(params))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useResponsesResponseId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.responses>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.responses>['get']>>['error'], null>,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.responses>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.responses>['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.responses>['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getResponsesResponseIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.responses>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getResponsesResponseIdQueryKey(params, clientOptions)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .responses(toValue(params))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getDeleteResponsesResponseIdMutationKey() {
  return ['responses', '/responses/{response_id}', 'DELETE'] as const
}

export function getDeleteResponsesResponseIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.responses>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.responses>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.responses>['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<typeof client.responses>['delete']>[0]
      options?: Parameters<ReturnType<typeof client.responses>['delete']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteResponsesResponseIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.responses(toValue(params)).delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeleteResponsesResponseId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.responses>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.responses>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.responses>['delete']>>,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<ReturnType<typeof client.responses>['delete']>[0]
            options?: Parameters<ReturnType<typeof client.responses>['delete']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteResponsesResponseIdMutationOptions<TError, TOnMutateResult>(
    params,
  )
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPostResponsesResponseIdCancelMutationKey() {
  return ['responses', '/responses/{response_id}/cancel', 'POST'] as const
}

export function getPostResponsesResponseIdCancelMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.responses>['cancel']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.responses>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.responses>['cancel']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<typeof client.responses>['cancel']['post']>[0]
      options?: Parameters<ReturnType<typeof client.responses>['cancel']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostResponsesResponseIdCancelMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.responses(toValue(params)).cancel.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostResponsesResponseIdCancel<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.responses>['cancel']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.responses>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.responses>['cancel']['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<ReturnType<typeof client.responses>['cancel']['post']>[0]
            options?: Parameters<ReturnType<typeof client.responses>['cancel']['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostResponsesResponseIdCancelMutationOptions<TError, TOnMutateResult>(
    params,
  )
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getResponsesResponseIdInputItemsQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.responses>[0]>,
  options?: Parameters<ReturnType<typeof client.responses>['input_items']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['responses', '/responses/{response_id}/input_items', toValue(params), keyArgs] as const
}

export function getResponsesResponseIdInputItemsQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.responses>[0]>,
  options?: Parameters<ReturnType<typeof client.responses>['input_items']['get']>[0],
) {
  return {
    queryKey: computed(() => getResponsesResponseIdInputItemsQueryKey(params, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .responses(toValue(params))
        .input_items.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useResponsesResponseIdInputItems<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.responses>['input_items']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.responses>['input_items']['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.responses>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.responses>['input_items']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.responses>['input_items']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getResponsesResponseIdInputItemsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.responses>['input_items']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getResponsesResponseIdInputItemsQueryKey(params, clientOptions)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .responses(toValue(params))
          .input_items.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostThreadsMutationKey() {
  return ['threads', '/threads', 'POST'] as const
}

export function getPostThreadsMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.threads.post>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.threads.post>>, { error: null }>['data'],
    TError,
    {
      body: Parameters<typeof client.threads.post>[0]
      options?: Parameters<typeof client.threads.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostThreadsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.threads.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostThreads<
  TError = Exclude<Awaited<ReturnType<typeof client.threads.post>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<Awaited<ReturnType<typeof client.threads.post>>, { error: null }>['data'],
          TError,
          {
            body: Parameters<typeof client.threads.post>[0]
            options?: Parameters<typeof client.threads.post>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostThreadsMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPostThreadsRunsMutationKey() {
  return ['threads', '/threads/runs', 'POST'] as const
}

export function getPostThreadsRunsMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.threads.runs.post>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.threads.runs.post>>, { error: null }>['data'],
    TError,
    {
      body: Parameters<typeof client.threads.runs.post>[0]
      options?: Parameters<typeof client.threads.runs.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostThreadsRunsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.threads.runs.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostThreadsRuns<
  TError = Exclude<Awaited<ReturnType<typeof client.threads.runs.post>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<Awaited<ReturnType<typeof client.threads.runs.post>>, { error: null }>['data'],
          TError,
          {
            body: Parameters<typeof client.threads.runs.post>[0]
            options?: Parameters<typeof client.threads.runs.post>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostThreadsRunsMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getThreadsThreadIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.threads>[0]>,
) {
  return ['threads', '/threads/{thread_id}', toValue(params)] as const
}

export function getThreadsThreadIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.threads>[0]>,
  options?: Parameters<ReturnType<typeof client.threads>['get']>[0],
) {
  return {
    queryKey: computed(() => getThreadsThreadIdQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .threads(toValue(params))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useThreadsThreadId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.threads>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.threads>['get']>>['error'], null>,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.threads>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.threads>['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.threads>['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getThreadsThreadIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.threads>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getThreadsThreadIdQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .threads(toValue(params))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostThreadsThreadIdMutationKey() {
  return ['threads', '/threads/{thread_id}', 'POST'] as const
}

export function getPostThreadsThreadIdMutationOptions<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.threads>['post']>>['error'], null>,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.threads>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.threads>['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.threads>['post']>[0]
      options?: Parameters<ReturnType<typeof client.threads>['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostThreadsThreadIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.threads(toValue(params)).post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostThreadsThreadId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.threads>['post']>>['error'], null>,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.threads>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.threads>['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.threads>['post']>[0]
            options?: Parameters<ReturnType<typeof client.threads>['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostThreadsThreadIdMutationOptions<TError, TOnMutateResult>(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getDeleteThreadsThreadIdMutationKey() {
  return ['threads', '/threads/{thread_id}', 'DELETE'] as const
}

export function getDeleteThreadsThreadIdMutationOptions<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.threads>['delete']>>['error'], null>,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.threads>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.threads>['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<typeof client.threads>['delete']>[0]
      options?: Parameters<ReturnType<typeof client.threads>['delete']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteThreadsThreadIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.threads(toValue(params)).delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeleteThreadsThreadId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.threads>['delete']>>['error'], null>,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.threads>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.threads>['delete']>>,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<ReturnType<typeof client.threads>['delete']>[0]
            options?: Parameters<ReturnType<typeof client.threads>['delete']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteThreadsThreadIdMutationOptions<TError, TOnMutateResult>(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getThreadsThreadIdMessagesQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.threads>[0]>,
  options?: Parameters<ReturnType<typeof client.threads>['messages']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['threads', '/threads/{thread_id}/messages', toValue(params), keyArgs] as const
}

export function getThreadsThreadIdMessagesQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.threads>[0]>,
  options?: Parameters<ReturnType<typeof client.threads>['messages']['get']>[0],
) {
  return {
    queryKey: computed(() => getThreadsThreadIdMessagesQueryKey(params, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .threads(toValue(params))
        .messages.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useThreadsThreadIdMessages<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.threads>['messages']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.threads>['messages']['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.threads>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.threads>['messages']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.threads>['messages']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getThreadsThreadIdMessagesQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.threads>['messages']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getThreadsThreadIdMessagesQueryKey(params, clientOptions)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .threads(toValue(params))
          .messages.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostThreadsThreadIdMessagesMutationKey() {
  return ['threads', '/threads/{thread_id}/messages', 'POST'] as const
}

export function getPostThreadsThreadIdMessagesMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.threads>['messages']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.threads>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.threads>['messages']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.threads>['messages']['post']>[0]
      options?: Parameters<ReturnType<typeof client.threads>['messages']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostThreadsThreadIdMessagesMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.threads(toValue(params)).messages.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostThreadsThreadIdMessages<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.threads>['messages']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.threads>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.threads>['messages']['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.threads>['messages']['post']>[0]
            options?: Parameters<ReturnType<typeof client.threads>['messages']['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostThreadsThreadIdMessagesMutationOptions<TError, TOnMutateResult>(
    params,
  )
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getThreadsThreadIdMessagesMessageIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.threads>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.threads>['messages']>[0]>,
) {
  return [
    'threads',
    '/threads/{thread_id}/messages/{message_id}',
    toValue(params),
    toValue(params2),
  ] as const
}

export function getThreadsThreadIdMessagesMessageIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.threads>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.threads>['messages']>[0]>,
  options?: Parameters<ReturnType<ReturnType<typeof client.threads>['messages']>['get']>[0],
) {
  return {
    queryKey: computed(() => getThreadsThreadIdMessagesMessageIdQueryKey(params, params2)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .threads(toValue(params))
        .messages(toValue(params2))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useThreadsThreadIdMessagesMessageId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.threads>['messages']>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.threads>['messages']>['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.threads>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.threads>['messages']>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<ReturnType<typeof client.threads>['messages']>['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<ReturnType<typeof client.threads>['messages']>['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getThreadsThreadIdMessagesMessageIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<ReturnType<typeof client.threads>['messages']>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getThreadsThreadIdMessagesMessageIdQueryKey(params, params2)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .threads(toValue(params))
          .messages(toValue(params2))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostThreadsThreadIdMessagesMessageIdMutationKey() {
  return ['threads', '/threads/{thread_id}/messages/{message_id}', 'POST'] as const
}

export function getPostThreadsThreadIdMessagesMessageIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.threads>['messages']>['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.threads>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.threads>['messages']>[0]>,
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.threads>['messages']>['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<ReturnType<typeof client.threads>['messages']>['post']>[0]
      options?: Parameters<ReturnType<ReturnType<typeof client.threads>['messages']>['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostThreadsThreadIdMessagesMessageIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .threads(toValue(params))
        .messages(toValue(params2))
        .post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostThreadsThreadIdMessagesMessageId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.threads>['messages']>['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.threads>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.threads>['messages']>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<ReturnType<typeof client.threads>['messages']>['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<ReturnType<typeof client.threads>['messages']>['post']>[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.threads>['messages']>['post']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostThreadsThreadIdMessagesMessageIdMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getDeleteThreadsThreadIdMessagesMessageIdMutationKey() {
  return ['threads', '/threads/{thread_id}/messages/{message_id}', 'DELETE'] as const
}

export function getDeleteThreadsThreadIdMessagesMessageIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.threads>['messages']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.threads>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.threads>['messages']>[0]>,
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.threads>['messages']>['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<ReturnType<typeof client.threads>['messages']>['delete']>[0]
      options?: Parameters<ReturnType<ReturnType<typeof client.threads>['messages']>['delete']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteThreadsThreadIdMessagesMessageIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .threads(toValue(params))
        .messages(toValue(params2))
        .delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeleteThreadsThreadIdMessagesMessageId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.threads>['messages']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.threads>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.threads>['messages']>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<ReturnType<ReturnType<typeof client.threads>['messages']>['delete']>
            >,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<
              ReturnType<ReturnType<typeof client.threads>['messages']>['delete']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.threads>['messages']>['delete']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteThreadsThreadIdMessagesMessageIdMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getThreadsThreadIdRunsQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.threads>[0]>,
  options?: Parameters<ReturnType<typeof client.threads>['runs']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['threads', '/threads/{thread_id}/runs', toValue(params), keyArgs] as const
}

export function getThreadsThreadIdRunsQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.threads>[0]>,
  options?: Parameters<ReturnType<typeof client.threads>['runs']['get']>[0],
) {
  return {
    queryKey: computed(() => getThreadsThreadIdRunsQueryKey(params, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .threads(toValue(params))
        .runs.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useThreadsThreadIdRuns<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.threads>['runs']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.threads>['runs']['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.threads>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.threads>['runs']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.threads>['runs']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getThreadsThreadIdRunsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.threads>['runs']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getThreadsThreadIdRunsQueryKey(params, clientOptions)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .threads(toValue(params))
          .runs.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostThreadsThreadIdRunsMutationKey() {
  return ['threads', '/threads/{thread_id}/runs', 'POST'] as const
}

export function getPostThreadsThreadIdRunsMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.threads>['runs']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.threads>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.threads>['runs']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.threads>['runs']['post']>[0]
      options?: Parameters<ReturnType<typeof client.threads>['runs']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostThreadsThreadIdRunsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.threads(toValue(params)).runs.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostThreadsThreadIdRuns<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.threads>['runs']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.threads>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.threads>['runs']['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.threads>['runs']['post']>[0]
            options?: Parameters<ReturnType<typeof client.threads>['runs']['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostThreadsThreadIdRunsMutationOptions<TError, TOnMutateResult>(
    params,
  )
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getThreadsThreadIdRunsRunIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.threads>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.threads>['runs']>[0]>,
) {
  return [
    'threads',
    '/threads/{thread_id}/runs/{run_id}',
    toValue(params),
    toValue(params2),
  ] as const
}

export function getThreadsThreadIdRunsRunIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.threads>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.threads>['runs']>[0]>,
  options?: Parameters<ReturnType<ReturnType<typeof client.threads>['runs']>['get']>[0],
) {
  return {
    queryKey: computed(() => getThreadsThreadIdRunsRunIdQueryKey(params, params2)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .threads(toValue(params))
        .runs(toValue(params2))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useThreadsThreadIdRunsRunId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.threads>['runs']>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.threads>['runs']>['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.threads>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.threads>['runs']>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<ReturnType<typeof client.threads>['runs']>['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<ReturnType<typeof client.threads>['runs']>['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getThreadsThreadIdRunsRunIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<ReturnType<typeof client.threads>['runs']>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getThreadsThreadIdRunsRunIdQueryKey(params, params2)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .threads(toValue(params))
          .runs(toValue(params2))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostThreadsThreadIdRunsRunIdMutationKey() {
  return ['threads', '/threads/{thread_id}/runs/{run_id}', 'POST'] as const
}

export function getPostThreadsThreadIdRunsRunIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.threads>['runs']>['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.threads>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.threads>['runs']>[0]>,
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.threads>['runs']>['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<ReturnType<typeof client.threads>['runs']>['post']>[0]
      options?: Parameters<ReturnType<ReturnType<typeof client.threads>['runs']>['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostThreadsThreadIdRunsRunIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .threads(toValue(params))
        .runs(toValue(params2))
        .post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostThreadsThreadIdRunsRunId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.threads>['runs']>['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.threads>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.threads>['runs']>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<ReturnType<typeof client.threads>['runs']>['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<ReturnType<typeof client.threads>['runs']>['post']>[0]
            options?: Parameters<ReturnType<ReturnType<typeof client.threads>['runs']>['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostThreadsThreadIdRunsRunIdMutationOptions<TError, TOnMutateResult>(
    params,
    params2,
  )
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPostThreadsThreadIdRunsRunIdCancelMutationKey() {
  return ['threads', '/threads/{thread_id}/runs/{run_id}/cancel', 'POST'] as const
}

export function getPostThreadsThreadIdRunsRunIdCancelMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.threads>['runs']>['cancel']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.threads>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.threads>['runs']>[0]>,
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.threads>['runs']>['cancel']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<ReturnType<typeof client.threads>['runs']>['cancel']['post']>[0]
      options?: Parameters<
        ReturnType<ReturnType<typeof client.threads>['runs']>['cancel']['post']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostThreadsThreadIdRunsRunIdCancelMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .threads(toValue(params))
        .runs(toValue(params2))
        .cancel.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostThreadsThreadIdRunsRunIdCancel<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.threads>['runs']>['cancel']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.threads>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.threads>['runs']>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<ReturnType<ReturnType<typeof client.threads>['runs']>['cancel']['post']>
            >,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<
              ReturnType<ReturnType<typeof client.threads>['runs']>['cancel']['post']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.threads>['runs']>['cancel']['post']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostThreadsThreadIdRunsRunIdCancelMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getThreadsThreadIdRunsRunIdStepsQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.threads>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.threads>['runs']>[0]>,
  options?: Parameters<ReturnType<ReturnType<typeof client.threads>['runs']>['steps']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'threads',
    '/threads/{thread_id}/runs/{run_id}/steps',
    toValue(params),
    toValue(params2),
    keyArgs,
  ] as const
}

export function getThreadsThreadIdRunsRunIdStepsQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.threads>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.threads>['runs']>[0]>,
  options?: Parameters<ReturnType<ReturnType<typeof client.threads>['runs']>['steps']['get']>[0],
) {
  return {
    queryKey: computed(() => getThreadsThreadIdRunsRunIdStepsQueryKey(params, params2, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .threads(toValue(params))
        .runs(toValue(params2))
        .steps.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useThreadsThreadIdRunsRunIdSteps<
  TData = Extract<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.threads>['runs']>['steps']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.threads>['runs']>['steps']['get']>
    >['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.threads>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.threads>['runs']>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<
              ReturnType<ReturnType<ReturnType<typeof client.threads>['runs']>['steps']['get']>
            >,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<
              ReturnType<ReturnType<ReturnType<typeof client.threads>['runs']>['steps']['get']>
            >,
            { error: null }
          >['data'],
          ReturnType<typeof getThreadsThreadIdRunsRunIdStepsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<ReturnType<typeof client.threads>['runs']>['steps']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() =>
        getThreadsThreadIdRunsRunIdStepsQueryKey(params, params2, clientOptions),
      ),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .threads(toValue(params))
          .runs(toValue(params2))
          .steps.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getThreadsThreadIdRunsRunIdStepsStepIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.threads>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.threads>['runs']>[0]>,
  params3: MaybeRefOrGetter<
    Parameters<ReturnType<ReturnType<typeof client.threads>['runs']>['steps']>[0]
  >,
  options?: Parameters<
    ReturnType<ReturnType<ReturnType<typeof client.threads>['runs']>['steps']>['get']
  >[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'threads',
    '/threads/{thread_id}/runs/{run_id}/steps/{step_id}',
    toValue(params),
    toValue(params2),
    toValue(params3),
    keyArgs,
  ] as const
}

export function getThreadsThreadIdRunsRunIdStepsStepIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.threads>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.threads>['runs']>[0]>,
  params3: MaybeRefOrGetter<
    Parameters<ReturnType<ReturnType<typeof client.threads>['runs']>['steps']>[0]
  >,
  options?: Parameters<
    ReturnType<ReturnType<ReturnType<typeof client.threads>['runs']>['steps']>['get']
  >[0],
) {
  return {
    queryKey: computed(() =>
      getThreadsThreadIdRunsRunIdStepsStepIdQueryKey(params, params2, params3, options),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .threads(toValue(params))
        .runs(toValue(params2))
        .steps(toValue(params3))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useThreadsThreadIdRunsRunIdStepsStepId<
  TData = Extract<
    Awaited<
      ReturnType<ReturnType<ReturnType<ReturnType<typeof client.threads>['runs']>['steps']>['get']>
    >,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<ReturnType<typeof client.threads>['runs']>['steps']>['get']>
    >['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.threads>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.threads>['runs']>[0]>,
  params3: MaybeRefOrGetter<
    Parameters<ReturnType<ReturnType<typeof client.threads>['runs']>['steps']>[0]
  >,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<
              ReturnType<
                ReturnType<ReturnType<ReturnType<typeof client.threads>['runs']>['steps']>['get']
              >
            >,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<
              ReturnType<
                ReturnType<ReturnType<ReturnType<typeof client.threads>['runs']>['steps']>['get']
              >
            >,
            { error: null }
          >['data'],
          ReturnType<typeof getThreadsThreadIdRunsRunIdStepsStepIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<
      ReturnType<ReturnType<ReturnType<typeof client.threads>['runs']>['steps']>['get']
    >[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() =>
        getThreadsThreadIdRunsRunIdStepsStepIdQueryKey(params, params2, params3, clientOptions),
      ),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .threads(toValue(params))
          .runs(toValue(params2))
          .steps(toValue(params3))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostThreadsThreadIdRunsRunIdSubmitToolOutputsMutationKey() {
  return ['threads', '/threads/{thread_id}/runs/{run_id}/submit_tool_outputs', 'POST'] as const
}

export function getPostThreadsThreadIdRunsRunIdSubmitToolOutputsMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<typeof client.threads>['runs']>['submit_tool_outputs']['post']
      >
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.threads>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.threads>['runs']>[0]>,
) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<
          ReturnType<ReturnType<typeof client.threads>['runs']>['submit_tool_outputs']['post']
        >
      >,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<
        ReturnType<ReturnType<typeof client.threads>['runs']>['submit_tool_outputs']['post']
      >[0]
      options?: Parameters<
        ReturnType<ReturnType<typeof client.threads>['runs']>['submit_tool_outputs']['post']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostThreadsThreadIdRunsRunIdSubmitToolOutputsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .threads(toValue(params))
        .runs(toValue(params2))
        .submit_tool_outputs.post(body, options)
      if (error) throw error
      return data
    },
  })
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
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.threads>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.threads>['runs']>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<
                ReturnType<ReturnType<typeof client.threads>['runs']>['submit_tool_outputs']['post']
              >
            >,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<
              ReturnType<ReturnType<typeof client.threads>['runs']>['submit_tool_outputs']['post']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.threads>['runs']>['submit_tool_outputs']['post']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostThreadsThreadIdRunsRunIdSubmitToolOutputsMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPostUploadsMutationKey() {
  return ['uploads', '/uploads', 'POST'] as const
}

export function getPostUploadsMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.uploads.post>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.uploads.post>>, { error: null }>['data'],
    TError,
    {
      body: Parameters<typeof client.uploads.post>[0]
      options?: Parameters<typeof client.uploads.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostUploadsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.uploads.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostUploads<
  TError = Exclude<Awaited<ReturnType<typeof client.uploads.post>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<Awaited<ReturnType<typeof client.uploads.post>>, { error: null }>['data'],
          TError,
          {
            body: Parameters<typeof client.uploads.post>[0]
            options?: Parameters<typeof client.uploads.post>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostUploadsMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPostUploadsUploadIdCancelMutationKey() {
  return ['uploads', '/uploads/{upload_id}/cancel', 'POST'] as const
}

export function getPostUploadsUploadIdCancelMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.uploads>['cancel']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.uploads>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.uploads>['cancel']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<typeof client.uploads>['cancel']['post']>[0]
      options?: Parameters<ReturnType<typeof client.uploads>['cancel']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostUploadsUploadIdCancelMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.uploads(toValue(params)).cancel.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostUploadsUploadIdCancel<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.uploads>['cancel']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.uploads>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.uploads>['cancel']['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<ReturnType<typeof client.uploads>['cancel']['post']>[0]
            options?: Parameters<ReturnType<typeof client.uploads>['cancel']['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostUploadsUploadIdCancelMutationOptions<TError, TOnMutateResult>(
    params,
  )
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPostUploadsUploadIdCompleteMutationKey() {
  return ['uploads', '/uploads/{upload_id}/complete', 'POST'] as const
}

export function getPostUploadsUploadIdCompleteMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.uploads>['complete']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.uploads>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.uploads>['complete']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.uploads>['complete']['post']>[0]
      options?: Parameters<ReturnType<typeof client.uploads>['complete']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostUploadsUploadIdCompleteMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.uploads(toValue(params)).complete.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostUploadsUploadIdComplete<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.uploads>['complete']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.uploads>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.uploads>['complete']['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.uploads>['complete']['post']>[0]
            options?: Parameters<ReturnType<typeof client.uploads>['complete']['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostUploadsUploadIdCompleteMutationOptions<TError, TOnMutateResult>(
    params,
  )
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPostUploadsUploadIdPartsMutationKey() {
  return ['uploads', '/uploads/{upload_id}/parts', 'POST'] as const
}

export function getPostUploadsUploadIdPartsMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.uploads>['parts']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.uploads>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.uploads>['parts']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.uploads>['parts']['post']>[0]
      options?: Parameters<ReturnType<typeof client.uploads>['parts']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostUploadsUploadIdPartsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.uploads(toValue(params)).parts.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostUploadsUploadIdParts<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.uploads>['parts']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.uploads>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.uploads>['parts']['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.uploads>['parts']['post']>[0]
            options?: Parameters<ReturnType<typeof client.uploads>['parts']['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostUploadsUploadIdPartsMutationOptions<TError, TOnMutateResult>(
    params,
  )
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getVectorStoresQueryKey(options?: Parameters<typeof client.vector_stores.get>[0]) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['vector_stores', '/vector_stores', keyArgs] as const
}

export function getVectorStoresQueryOptions(
  options?: Parameters<typeof client.vector_stores.get>[0],
) {
  return {
    queryKey: getVectorStoresQueryKey(options),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.vector_stores.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useVectorStores<
  TData = Extract<Awaited<ReturnType<typeof client.vector_stores.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.vector_stores.get>>['error'], null>,
>(
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<Awaited<ReturnType<typeof client.vector_stores.get>>, { error: null }>['data'],
          TError,
          TData,
          Extract<Awaited<ReturnType<typeof client.vector_stores.get>>, { error: null }>['data'],
          ReturnType<typeof getVectorStoresQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.vector_stores.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: getVectorStoresQueryKey(clientOptions),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.vector_stores.get({
          ...clientOptions,
          fetch: { ...clientOptions?.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostVectorStoresMutationKey() {
  return ['vector_stores', '/vector_stores', 'POST'] as const
}

export function getPostVectorStoresMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.vector_stores.post>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.vector_stores.post>>, { error: null }>['data'],
    TError,
    {
      body: Parameters<typeof client.vector_stores.post>[0]
      options?: Parameters<typeof client.vector_stores.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostVectorStoresMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.vector_stores.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostVectorStores<
  TError = Exclude<Awaited<ReturnType<typeof client.vector_stores.post>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<Awaited<ReturnType<typeof client.vector_stores.post>>, { error: null }>['data'],
          TError,
          {
            body: Parameters<typeof client.vector_stores.post>[0]
            options?: Parameters<typeof client.vector_stores.post>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostVectorStoresMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getVectorStoresVectorStoreIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.vector_stores>[0]>,
) {
  return ['vector_stores', '/vector_stores/{vector_store_id}', toValue(params)] as const
}

export function getVectorStoresVectorStoreIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.vector_stores>[0]>,
  options?: Parameters<ReturnType<typeof client.vector_stores>['get']>[0],
) {
  return {
    queryKey: computed(() => getVectorStoresVectorStoreIdQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .vector_stores(toValue(params))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useVectorStoresVectorStoreId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.vector_stores>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.vector_stores>['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.vector_stores>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.vector_stores>['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.vector_stores>['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getVectorStoresVectorStoreIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.vector_stores>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getVectorStoresVectorStoreIdQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .vector_stores(toValue(params))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostVectorStoresVectorStoreIdMutationKey() {
  return ['vector_stores', '/vector_stores/{vector_store_id}', 'POST'] as const
}

export function getPostVectorStoresVectorStoreIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.vector_stores>['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.vector_stores>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.vector_stores>['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.vector_stores>['post']>[0]
      options?: Parameters<ReturnType<typeof client.vector_stores>['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostVectorStoresVectorStoreIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.vector_stores(toValue(params)).post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostVectorStoresVectorStoreId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.vector_stores>['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.vector_stores>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.vector_stores>['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.vector_stores>['post']>[0]
            options?: Parameters<ReturnType<typeof client.vector_stores>['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostVectorStoresVectorStoreIdMutationOptions<TError, TOnMutateResult>(
    params,
  )
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getDeleteVectorStoresVectorStoreIdMutationKey() {
  return ['vector_stores', '/vector_stores/{vector_store_id}', 'DELETE'] as const
}

export function getDeleteVectorStoresVectorStoreIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.vector_stores>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.vector_stores>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.vector_stores>['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<typeof client.vector_stores>['delete']>[0]
      options?: Parameters<ReturnType<typeof client.vector_stores>['delete']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteVectorStoresVectorStoreIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.vector_stores(toValue(params)).delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeleteVectorStoresVectorStoreId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.vector_stores>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.vector_stores>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.vector_stores>['delete']>>,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<ReturnType<typeof client.vector_stores>['delete']>[0]
            options?: Parameters<ReturnType<typeof client.vector_stores>['delete']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteVectorStoresVectorStoreIdMutationOptions<
    TError,
    TOnMutateResult
  >(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPostVectorStoresVectorStoreIdFileBatchesMutationKey() {
  return ['vector_stores', '/vector_stores/{vector_store_id}/file_batches', 'POST'] as const
}

export function getPostVectorStoresVectorStoreIdFileBatchesMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.vector_stores>['file_batches']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.vector_stores>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.vector_stores>['file_batches']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.vector_stores>['file_batches']['post']>[0]
      options?: Parameters<ReturnType<typeof client.vector_stores>['file_batches']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostVectorStoresVectorStoreIdFileBatchesMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .vector_stores(toValue(params))
        .file_batches.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostVectorStoresVectorStoreIdFileBatches<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.vector_stores>['file_batches']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.vector_stores>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.vector_stores>['file_batches']['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.vector_stores>['file_batches']['post']>[0]
            options?: Parameters<ReturnType<typeof client.vector_stores>['file_batches']['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostVectorStoresVectorStoreIdFileBatchesMutationOptions<
    TError,
    TOnMutateResult
  >(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getVectorStoresVectorStoreIdFileBatchesBatchIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.vector_stores>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.vector_stores>['file_batches']>[0]>,
) {
  return [
    'vector_stores',
    '/vector_stores/{vector_store_id}/file_batches/{batch_id}',
    toValue(params),
    toValue(params2),
  ] as const
}

export function getVectorStoresVectorStoreIdFileBatchesBatchIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.vector_stores>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.vector_stores>['file_batches']>[0]>,
  options?: Parameters<
    ReturnType<ReturnType<typeof client.vector_stores>['file_batches']>['get']
  >[0],
) {
  return {
    queryKey: computed(() =>
      getVectorStoresVectorStoreIdFileBatchesBatchIdQueryKey(params, params2),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .vector_stores(toValue(params))
        .file_batches(toValue(params2))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useVectorStoresVectorStoreIdFileBatchesBatchId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.vector_stores>['file_batches']>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.vector_stores>['file_batches']>['get']>
    >['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.vector_stores>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.vector_stores>['file_batches']>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<
              ReturnType<ReturnType<ReturnType<typeof client.vector_stores>['file_batches']>['get']>
            >,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<
              ReturnType<ReturnType<ReturnType<typeof client.vector_stores>['file_batches']>['get']>
            >,
            { error: null }
          >['data'],
          ReturnType<typeof getVectorStoresVectorStoreIdFileBatchesBatchIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<
      ReturnType<ReturnType<typeof client.vector_stores>['file_batches']>['get']
    >[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() =>
        getVectorStoresVectorStoreIdFileBatchesBatchIdQueryKey(params, params2),
      ),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .vector_stores(toValue(params))
          .file_batches(toValue(params2))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostVectorStoresVectorStoreIdFileBatchesBatchIdCancelMutationKey() {
  return [
    'vector_stores',
    '/vector_stores/{vector_store_id}/file_batches/{batch_id}/cancel',
    'POST',
  ] as const
}

export function getPostVectorStoresVectorStoreIdFileBatchesBatchIdCancelMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<typeof client.vector_stores>['file_batches']>['cancel']['post']
      >
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.vector_stores>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.vector_stores>['file_batches']>[0]>,
) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<
          ReturnType<ReturnType<typeof client.vector_stores>['file_batches']>['cancel']['post']
        >
      >,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<
        ReturnType<ReturnType<typeof client.vector_stores>['file_batches']>['cancel']['post']
      >[0]
      options?: Parameters<
        ReturnType<ReturnType<typeof client.vector_stores>['file_batches']>['cancel']['post']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostVectorStoresVectorStoreIdFileBatchesBatchIdCancelMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .vector_stores(toValue(params))
        .file_batches(toValue(params2))
        .cancel.post(body, options)
      if (error) throw error
      return data
    },
  })
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
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.vector_stores>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.vector_stores>['file_batches']>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<
                ReturnType<
                  ReturnType<typeof client.vector_stores>['file_batches']
                >['cancel']['post']
              >
            >,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<
              ReturnType<ReturnType<typeof client.vector_stores>['file_batches']>['cancel']['post']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.vector_stores>['file_batches']>['cancel']['post']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostVectorStoresVectorStoreIdFileBatchesBatchIdCancelMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getVectorStoresVectorStoreIdFileBatchesBatchIdFilesQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.vector_stores>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.vector_stores>['file_batches']>[0]>,
  options?: Parameters<
    ReturnType<ReturnType<typeof client.vector_stores>['file_batches']>['files']['get']
  >[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'vector_stores',
    '/vector_stores/{vector_store_id}/file_batches/{batch_id}/files',
    toValue(params),
    toValue(params2),
    keyArgs,
  ] as const
}

export function getVectorStoresVectorStoreIdFileBatchesBatchIdFilesQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.vector_stores>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.vector_stores>['file_batches']>[0]>,
  options?: Parameters<
    ReturnType<ReturnType<typeof client.vector_stores>['file_batches']>['files']['get']
  >[0],
) {
  return {
    queryKey: computed(() =>
      getVectorStoresVectorStoreIdFileBatchesBatchIdFilesQueryKey(params, params2, options),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .vector_stores(toValue(params))
        .file_batches(toValue(params2))
        .files.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useVectorStoresVectorStoreIdFileBatchesBatchIdFiles<
  TData = Extract<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<typeof client.vector_stores>['file_batches']>['files']['get']
      >
    >,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<typeof client.vector_stores>['file_batches']>['files']['get']
      >
    >['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.vector_stores>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.vector_stores>['file_batches']>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<
              ReturnType<
                ReturnType<ReturnType<typeof client.vector_stores>['file_batches']>['files']['get']
              >
            >,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<
              ReturnType<
                ReturnType<ReturnType<typeof client.vector_stores>['file_batches']>['files']['get']
              >
            >,
            { error: null }
          >['data'],
          ReturnType<typeof getVectorStoresVectorStoreIdFileBatchesBatchIdFilesQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<
      ReturnType<ReturnType<typeof client.vector_stores>['file_batches']>['files']['get']
    >[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() =>
        getVectorStoresVectorStoreIdFileBatchesBatchIdFilesQueryKey(params, params2, clientOptions),
      ),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .vector_stores(toValue(params))
          .file_batches(toValue(params2))
          .files.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getVectorStoresVectorStoreIdFilesQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.vector_stores>[0]>,
  options?: Parameters<ReturnType<typeof client.vector_stores>['files']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'vector_stores',
    '/vector_stores/{vector_store_id}/files',
    toValue(params),
    keyArgs,
  ] as const
}

export function getVectorStoresVectorStoreIdFilesQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.vector_stores>[0]>,
  options?: Parameters<ReturnType<typeof client.vector_stores>['files']['get']>[0],
) {
  return {
    queryKey: computed(() => getVectorStoresVectorStoreIdFilesQueryKey(params, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .vector_stores(toValue(params))
        .files.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useVectorStoresVectorStoreIdFiles<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.vector_stores>['files']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.vector_stores>['files']['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.vector_stores>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.vector_stores>['files']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.vector_stores>['files']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getVectorStoresVectorStoreIdFilesQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.vector_stores>['files']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getVectorStoresVectorStoreIdFilesQueryKey(params, clientOptions)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .vector_stores(toValue(params))
          .files.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostVectorStoresVectorStoreIdFilesMutationKey() {
  return ['vector_stores', '/vector_stores/{vector_store_id}/files', 'POST'] as const
}

export function getPostVectorStoresVectorStoreIdFilesMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.vector_stores>['files']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.vector_stores>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.vector_stores>['files']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.vector_stores>['files']['post']>[0]
      options?: Parameters<ReturnType<typeof client.vector_stores>['files']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostVectorStoresVectorStoreIdFilesMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.vector_stores(toValue(params)).files.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostVectorStoresVectorStoreIdFiles<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.vector_stores>['files']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.vector_stores>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.vector_stores>['files']['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.vector_stores>['files']['post']>[0]
            options?: Parameters<ReturnType<typeof client.vector_stores>['files']['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostVectorStoresVectorStoreIdFilesMutationOptions<
    TError,
    TOnMutateResult
  >(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getVectorStoresVectorStoreIdFilesFileIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.vector_stores>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.vector_stores>['files']>[0]>,
) {
  return [
    'vector_stores',
    '/vector_stores/{vector_store_id}/files/{file_id}',
    toValue(params),
    toValue(params2),
  ] as const
}

export function getVectorStoresVectorStoreIdFilesFileIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.vector_stores>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.vector_stores>['files']>[0]>,
  options?: Parameters<ReturnType<ReturnType<typeof client.vector_stores>['files']>['get']>[0],
) {
  return {
    queryKey: computed(() => getVectorStoresVectorStoreIdFilesFileIdQueryKey(params, params2)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .vector_stores(toValue(params))
        .files(toValue(params2))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useVectorStoresVectorStoreIdFilesFileId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.vector_stores>['files']>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.vector_stores>['files']>['get']>
    >['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.vector_stores>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.vector_stores>['files']>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<
              ReturnType<ReturnType<ReturnType<typeof client.vector_stores>['files']>['get']>
            >,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<
              ReturnType<ReturnType<ReturnType<typeof client.vector_stores>['files']>['get']>
            >,
            { error: null }
          >['data'],
          ReturnType<typeof getVectorStoresVectorStoreIdFilesFileIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<ReturnType<typeof client.vector_stores>['files']>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getVectorStoresVectorStoreIdFilesFileIdQueryKey(params, params2)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .vector_stores(toValue(params))
          .files(toValue(params2))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostVectorStoresVectorStoreIdFilesFileIdMutationKey() {
  return ['vector_stores', '/vector_stores/{vector_store_id}/files/{file_id}', 'POST'] as const
}

export function getPostVectorStoresVectorStoreIdFilesFileIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.vector_stores>['files']>['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.vector_stores>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.vector_stores>['files']>[0]>,
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.vector_stores>['files']>['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<ReturnType<typeof client.vector_stores>['files']>['post']>[0]
      options?: Parameters<ReturnType<ReturnType<typeof client.vector_stores>['files']>['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostVectorStoresVectorStoreIdFilesFileIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .vector_stores(toValue(params))
        .files(toValue(params2))
        .post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostVectorStoresVectorStoreIdFilesFileId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.vector_stores>['files']>['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.vector_stores>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.vector_stores>['files']>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<ReturnType<ReturnType<typeof client.vector_stores>['files']>['post']>
            >,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<
              ReturnType<ReturnType<typeof client.vector_stores>['files']>['post']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.vector_stores>['files']>['post']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostVectorStoresVectorStoreIdFilesFileIdMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getDeleteVectorStoresVectorStoreIdFilesFileIdMutationKey() {
  return ['vector_stores', '/vector_stores/{vector_store_id}/files/{file_id}', 'DELETE'] as const
}

export function getDeleteVectorStoresVectorStoreIdFilesFileIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.vector_stores>['files']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.vector_stores>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.vector_stores>['files']>[0]>,
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.vector_stores>['files']>['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<ReturnType<typeof client.vector_stores>['files']>['delete']>[0]
      options?: Parameters<
        ReturnType<ReturnType<typeof client.vector_stores>['files']>['delete']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteVectorStoresVectorStoreIdFilesFileIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .vector_stores(toValue(params))
        .files(toValue(params2))
        .delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeleteVectorStoresVectorStoreIdFilesFileId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.vector_stores>['files']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.vector_stores>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.vector_stores>['files']>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<ReturnType<ReturnType<typeof client.vector_stores>['files']>['delete']>
            >,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<
              ReturnType<ReturnType<typeof client.vector_stores>['files']>['delete']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.vector_stores>['files']>['delete']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteVectorStoresVectorStoreIdFilesFileIdMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getVectorStoresVectorStoreIdFilesFileIdContentQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.vector_stores>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.vector_stores>['files']>[0]>,
) {
  return [
    'vector_stores',
    '/vector_stores/{vector_store_id}/files/{file_id}/content',
    toValue(params),
    toValue(params2),
  ] as const
}

export function getVectorStoresVectorStoreIdFilesFileIdContentQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.vector_stores>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.vector_stores>['files']>[0]>,
  options?: Parameters<
    ReturnType<ReturnType<typeof client.vector_stores>['files']>['content']['get']
  >[0],
) {
  return {
    queryKey: computed(() =>
      getVectorStoresVectorStoreIdFilesFileIdContentQueryKey(params, params2),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .vector_stores(toValue(params))
        .files(toValue(params2))
        .content.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useVectorStoresVectorStoreIdFilesFileIdContent<
  TData = Extract<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.vector_stores>['files']>['content']['get']>
    >,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.vector_stores>['files']>['content']['get']>
    >['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.vector_stores>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.vector_stores>['files']>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<
              ReturnType<
                ReturnType<ReturnType<typeof client.vector_stores>['files']>['content']['get']
              >
            >,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<
              ReturnType<
                ReturnType<ReturnType<typeof client.vector_stores>['files']>['content']['get']
              >
            >,
            { error: null }
          >['data'],
          ReturnType<typeof getVectorStoresVectorStoreIdFilesFileIdContentQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<
      ReturnType<ReturnType<typeof client.vector_stores>['files']>['content']['get']
    >[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() =>
        getVectorStoresVectorStoreIdFilesFileIdContentQueryKey(params, params2),
      ),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .vector_stores(toValue(params))
          .files(toValue(params2))
          .content.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostVectorStoresVectorStoreIdSearchMutationKey() {
  return ['vector_stores', '/vector_stores/{vector_store_id}/search', 'POST'] as const
}

export function getPostVectorStoresVectorStoreIdSearchMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.vector_stores>['search']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.vector_stores>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.vector_stores>['search']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.vector_stores>['search']['post']>[0]
      options?: Parameters<ReturnType<typeof client.vector_stores>['search']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostVectorStoresVectorStoreIdSearchMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.vector_stores(toValue(params)).search.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostVectorStoresVectorStoreIdSearch<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.vector_stores>['search']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.vector_stores>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.vector_stores>['search']['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.vector_stores>['search']['post']>[0]
            options?: Parameters<ReturnType<typeof client.vector_stores>['search']['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostVectorStoresVectorStoreIdSearchMutationOptions<
    TError,
    TOnMutateResult
  >(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPostConversationsMutationKey() {
  return ['conversations', '/conversations', 'POST'] as const
}

export function getPostConversationsMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.conversations.post>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.conversations.post>>, { error: null }>['data'],
    TError,
    {
      body: Parameters<typeof client.conversations.post>[0]
      options?: Parameters<typeof client.conversations.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostConversationsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.conversations.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostConversations<
  TError = Exclude<Awaited<ReturnType<typeof client.conversations.post>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<Awaited<ReturnType<typeof client.conversations.post>>, { error: null }>['data'],
          TError,
          {
            body: Parameters<typeof client.conversations.post>[0]
            options?: Parameters<typeof client.conversations.post>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostConversationsMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getConversationsConversationIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.conversations>[0]>,
) {
  return ['conversations', '/conversations/{conversation_id}', toValue(params)] as const
}

export function getConversationsConversationIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.conversations>[0]>,
  options?: Parameters<ReturnType<typeof client.conversations>['get']>[0],
) {
  return {
    queryKey: computed(() => getConversationsConversationIdQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .conversations(toValue(params))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useConversationsConversationId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.conversations>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.conversations>['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.conversations>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.conversations>['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.conversations>['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getConversationsConversationIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.conversations>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getConversationsConversationIdQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .conversations(toValue(params))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostConversationsConversationIdMutationKey() {
  return ['conversations', '/conversations/{conversation_id}', 'POST'] as const
}

export function getPostConversationsConversationIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.conversations>['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.conversations>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.conversations>['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.conversations>['post']>[0]
      options?: Parameters<ReturnType<typeof client.conversations>['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostConversationsConversationIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.conversations(toValue(params)).post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostConversationsConversationId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.conversations>['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.conversations>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.conversations>['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.conversations>['post']>[0]
            options?: Parameters<ReturnType<typeof client.conversations>['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostConversationsConversationIdMutationOptions<
    TError,
    TOnMutateResult
  >(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getDeleteConversationsConversationIdMutationKey() {
  return ['conversations', '/conversations/{conversation_id}', 'DELETE'] as const
}

export function getDeleteConversationsConversationIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.conversations>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.conversations>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.conversations>['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<typeof client.conversations>['delete']>[0]
      options?: Parameters<ReturnType<typeof client.conversations>['delete']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteConversationsConversationIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.conversations(toValue(params)).delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeleteConversationsConversationId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.conversations>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.conversations>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.conversations>['delete']>>,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<ReturnType<typeof client.conversations>['delete']>[0]
            options?: Parameters<ReturnType<typeof client.conversations>['delete']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteConversationsConversationIdMutationOptions<
    TError,
    TOnMutateResult
  >(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getSafetyCasesIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.safety.cases>[0]>,
) {
  return ['safety', '/safety/cases/{id}', toValue(params)] as const
}

export function getSafetyCasesIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.safety.cases>[0]>,
  options?: Parameters<ReturnType<typeof client.safety.cases>['get']>[0],
) {
  return {
    queryKey: computed(() => getSafetyCasesIdQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.safety
        .cases(toValue(params))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useSafetyCasesId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.safety.cases>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.safety.cases>['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.safety.cases>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.safety.cases>['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.safety.cases>['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getSafetyCasesIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.safety.cases>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getSafetyCasesIdQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.safety
          .cases(toValue(params))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getSafetyAlertsIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.safety.alerts>[0]>,
) {
  return ['safety', '/safety/alerts/{id}', toValue(params)] as const
}

export function getSafetyAlertsIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.safety.alerts>[0]>,
  options?: Parameters<ReturnType<typeof client.safety.alerts>['get']>[0],
) {
  return {
    queryKey: computed(() => getSafetyAlertsIdQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.safety
        .alerts(toValue(params))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useSafetyAlertsId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.safety.alerts>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.safety.alerts>['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.safety.alerts>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.safety.alerts>['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.safety.alerts>['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getSafetyAlertsIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.safety.alerts>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getSafetyAlertsIdQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.safety
          .alerts(toValue(params))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getOrganizationExternalKeysQueryKey(
  options?: Parameters<typeof client.organization.external_keys.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['organization', '/organization/external_keys', keyArgs] as const
}

export function getOrganizationExternalKeysQueryOptions(
  options?: Parameters<typeof client.organization.external_keys.get>[0],
) {
  return {
    queryKey: getOrganizationExternalKeysQueryKey(options),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.organization.external_keys.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useOrganizationExternalKeys<
  TData = Extract<
    Awaited<ReturnType<typeof client.organization.external_keys.get>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<typeof client.organization.external_keys.get>>['error'],
    null
  >,
>(
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<typeof client.organization.external_keys.get>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<typeof client.organization.external_keys.get>>,
            { error: null }
          >['data'],
          ReturnType<typeof getOrganizationExternalKeysQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.organization.external_keys.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: getOrganizationExternalKeysQueryKey(clientOptions),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.organization.external_keys.get({
          ...clientOptions,
          fetch: { ...clientOptions?.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostOrganizationExternalKeysMutationKey() {
  return ['organization', '/organization/external_keys', 'POST'] as const
}

export function getPostOrganizationExternalKeysMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<typeof client.organization.external_keys.post>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<typeof client.organization.external_keys.post>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<typeof client.organization.external_keys.post>[0]
      options?: Parameters<typeof client.organization.external_keys.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostOrganizationExternalKeysMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.organization.external_keys.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostOrganizationExternalKeys<
  TError = Exclude<
    Awaited<ReturnType<typeof client.organization.external_keys.post>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<typeof client.organization.external_keys.post>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<typeof client.organization.external_keys.post>[0]
            options?: Parameters<typeof client.organization.external_keys.post>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostOrganizationExternalKeysMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getOrganizationExternalKeysExternalKeyIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.external_keys>[0]>,
) {
  return ['organization', '/organization/external_keys/{external_key_id}', toValue(params)] as const
}

export function getOrganizationExternalKeysExternalKeyIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.external_keys>[0]>,
  options?: Parameters<ReturnType<typeof client.organization.external_keys>['get']>[0],
) {
  return {
    queryKey: computed(() => getOrganizationExternalKeysExternalKeyIdQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.organization
        .external_keys(toValue(params))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useOrganizationExternalKeysExternalKeyId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.organization.external_keys>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.external_keys>['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.external_keys>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.organization.external_keys>['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.organization.external_keys>['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getOrganizationExternalKeysExternalKeyIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.organization.external_keys>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getOrganizationExternalKeysExternalKeyIdQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.organization
          .external_keys(toValue(params))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getDeleteOrganizationExternalKeysExternalKeyIdMutationKey() {
  return ['organization', '/organization/external_keys/{external_key_id}', 'DELETE'] as const
}

export function getDeleteOrganizationExternalKeysExternalKeyIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.external_keys>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.organization.external_keys>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.organization.external_keys>['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<typeof client.organization.external_keys>['delete']>[0]
      options?: Parameters<ReturnType<typeof client.organization.external_keys>['delete']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteOrganizationExternalKeysExternalKeyIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.organization
        .external_keys(toValue(params))
        .delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeleteOrganizationExternalKeysExternalKeyId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.external_keys>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.external_keys>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.organization.external_keys>['delete']>>,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<ReturnType<typeof client.organization.external_keys>['delete']>[0]
            options?: Parameters<ReturnType<typeof client.organization.external_keys>['delete']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteOrganizationExternalKeysExternalKeyIdMutationOptions<
    TError,
    TOnMutateResult
  >(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPostOrganizationExternalKeysExternalKeyIdValidateMutationKey() {
  return ['organization', '/organization/external_keys/{external_key_id}/validate', 'POST'] as const
}

export function getPostOrganizationExternalKeysExternalKeyIdValidateMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.organization.external_keys>['validate']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.organization.external_keys>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.organization.external_keys>['validate']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<typeof client.organization.external_keys>['validate']['post']>[0]
      options?: Parameters<
        ReturnType<typeof client.organization.external_keys>['validate']['post']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostOrganizationExternalKeysExternalKeyIdValidateMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.organization
        .external_keys(toValue(params))
        .validate.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostOrganizationExternalKeysExternalKeyIdValidate<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.organization.external_keys>['validate']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.external_keys>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<ReturnType<typeof client.organization.external_keys>['validate']['post']>
            >,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<
              ReturnType<typeof client.organization.external_keys>['validate']['post']
            >[0]
            options?: Parameters<
              ReturnType<typeof client.organization.external_keys>['validate']['post']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostOrganizationExternalKeysExternalKeyIdValidateMutationOptions<
    TError,
    TOnMutateResult
  >(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getLiveSessionsSessionIdContentQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.live.sessions>[0]>,
) {
  return ['live', '/live/sessions/{session_id}/content', toValue(params)] as const
}

export function getLiveSessionsSessionIdContentQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.live.sessions>[0]>,
  options?: Parameters<ReturnType<typeof client.live.sessions>['content']['get']>[0],
) {
  return {
    queryKey: computed(() => getLiveSessionsSessionIdContentQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.live
        .sessions(toValue(params))
        .content.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useLiveSessionsSessionIdContent<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.live.sessions>['content']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.live.sessions>['content']['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.live.sessions>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.live.sessions>['content']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.live.sessions>['content']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getLiveSessionsSessionIdContentQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.live.sessions>['content']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getLiveSessionsSessionIdContentQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.live
          .sessions(toValue(params))
          .content.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getOrganizationWorkloadIdentityProvidersQueryKey(
  options?: Parameters<typeof client.organization.workload_identity_providers.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['organization', '/organization/workload_identity_providers', keyArgs] as const
}

export function getOrganizationWorkloadIdentityProvidersQueryOptions(
  options?: Parameters<typeof client.organization.workload_identity_providers.get>[0],
) {
  return {
    queryKey: getOrganizationWorkloadIdentityProvidersQueryKey(options),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.organization.workload_identity_providers.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useOrganizationWorkloadIdentityProviders<
  TData = Extract<
    Awaited<ReturnType<typeof client.organization.workload_identity_providers.get>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<typeof client.organization.workload_identity_providers.get>>['error'],
    null
  >,
>(
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<typeof client.organization.workload_identity_providers.get>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<typeof client.organization.workload_identity_providers.get>>,
            { error: null }
          >['data'],
          ReturnType<typeof getOrganizationWorkloadIdentityProvidersQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.organization.workload_identity_providers.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: getOrganizationWorkloadIdentityProvidersQueryKey(clientOptions),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.organization.workload_identity_providers.get({
          ...clientOptions,
          fetch: { ...clientOptions?.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostOrganizationWorkloadIdentityProvidersMutationKey() {
  return ['organization', '/organization/workload_identity_providers', 'POST'] as const
}

export function getPostOrganizationWorkloadIdentityProvidersMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<typeof client.organization.workload_identity_providers.post>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<typeof client.organization.workload_identity_providers.post>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<typeof client.organization.workload_identity_providers.post>[0]
      options?: Parameters<typeof client.organization.workload_identity_providers.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostOrganizationWorkloadIdentityProvidersMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.organization.workload_identity_providers.post(
        body,
        options,
      )
      if (error) throw error
      return data
    },
  })
}

export function usePostOrganizationWorkloadIdentityProviders<
  TError = Exclude<
    Awaited<ReturnType<typeof client.organization.workload_identity_providers.post>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<typeof client.organization.workload_identity_providers.post>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<typeof client.organization.workload_identity_providers.post>[0]
            options?: Parameters<typeof client.organization.workload_identity_providers.post>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostOrganizationWorkloadIdentityProvidersMutationOptions<
    TError,
    TOnMutateResult
  >()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.workload_identity_providers>[0]>,
) {
  return [
    'organization',
    '/organization/workload_identity_providers/{workload_identity_provider_id}',
    toValue(params),
  ] as const
}

export function getOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.workload_identity_providers>[0]>,
  options?: Parameters<
    ReturnType<typeof client.organization.workload_identity_providers>['get']
  >[0],
) {
  return {
    queryKey: computed(() =>
      getOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdQueryKey(params),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.organization
        .workload_identity_providers(toValue(params))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.organization.workload_identity_providers>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.organization.workload_identity_providers>['get']>
    >['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.workload_identity_providers>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<
              ReturnType<ReturnType<typeof client.organization.workload_identity_providers>['get']>
            >,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<
              ReturnType<ReturnType<typeof client.organization.workload_identity_providers>['get']>
            >,
            { error: null }
          >['data'],
          ReturnType<
            typeof getOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdQueryKey
          >
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<
      ReturnType<typeof client.organization.workload_identity_providers>['get']
    >[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() =>
        getOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdQueryKey(params),
      ),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.organization
          .workload_identity_providers(toValue(params))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdMutationKey() {
  return [
    'organization',
    '/organization/workload_identity_providers/{workload_identity_provider_id}',
    'POST',
  ] as const
}

export function getPostOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.organization.workload_identity_providers>['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.organization.workload_identity_providers>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<ReturnType<typeof client.organization.workload_identity_providers>['post']>
      >,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<
        ReturnType<typeof client.organization.workload_identity_providers>['post']
      >[0]
      options?: Parameters<
        ReturnType<typeof client.organization.workload_identity_providers>['post']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey:
      getPostOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.organization
        .workload_identity_providers(toValue(params))
        .post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.organization.workload_identity_providers>['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.workload_identity_providers>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<ReturnType<typeof client.organization.workload_identity_providers>['post']>
            >,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<
              ReturnType<typeof client.organization.workload_identity_providers>['post']
            >[0]
            options?: Parameters<
              ReturnType<typeof client.organization.workload_identity_providers>['post']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults =
    getPostOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdMutationOptions<
      TError,
      TOnMutateResult
    >(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getDeleteOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdMutationKey() {
  return [
    'organization',
    '/organization/workload_identity_providers/{workload_identity_provider_id}',
    'DELETE',
  ] as const
}

export function getDeleteOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.organization.workload_identity_providers>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.organization.workload_identity_providers>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<ReturnType<typeof client.organization.workload_identity_providers>['delete']>
      >,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<
        ReturnType<typeof client.organization.workload_identity_providers>['delete']
      >[0]
      options?: Parameters<
        ReturnType<typeof client.organization.workload_identity_providers>['delete']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey:
      getDeleteOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.organization
        .workload_identity_providers(toValue(params))
        .delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeleteOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.organization.workload_identity_providers>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.workload_identity_providers>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<
                ReturnType<typeof client.organization.workload_identity_providers>['delete']
              >
            >,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<
              ReturnType<typeof client.organization.workload_identity_providers>['delete']
            >[0]
            options?: Parameters<
              ReturnType<typeof client.organization.workload_identity_providers>['delete']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults =
    getDeleteOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdMutationOptions<
      TError,
      TOnMutateResult
    >(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRulesQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.workload_identity_providers>[0]>,
  options?: Parameters<
    ReturnType<typeof client.organization.workload_identity_providers>['federation_rules']['get']
  >[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'organization',
    '/organization/workload_identity_providers/{workload_identity_provider_id}/federation_rules',
    toValue(params),
    keyArgs,
  ] as const
}

export function getOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRulesQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.workload_identity_providers>[0]>,
  options?: Parameters<
    ReturnType<typeof client.organization.workload_identity_providers>['federation_rules']['get']
  >[0],
) {
  return {
    queryKey: computed(() =>
      getOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRulesQueryKey(
        params,
        options,
      ),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.organization
        .workload_identity_providers(toValue(params))
        .federation_rules.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRules<
  TData = Extract<
    Awaited<
      ReturnType<
        ReturnType<
          typeof client.organization.workload_identity_providers
        >['federation_rules']['get']
      >
    >,
    { error: null }
  >['data'],
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
  params: MaybeRefOrGetter<Parameters<typeof client.organization.workload_identity_providers>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
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
          TError,
          TData,
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
          ReturnType<
            typeof getOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRulesQueryKey
          >
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<
      ReturnType<typeof client.organization.workload_identity_providers>['federation_rules']['get']
    >[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() =>
        getOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRulesQueryKey(
          params,
          clientOptions,
        ),
      ),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.organization
          .workload_identity_providers(toValue(params))
          .federation_rules.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRulesMutationKey() {
  return [
    'organization',
    '/organization/workload_identity_providers/{workload_identity_provider_id}/federation_rules',
    'POST',
  ] as const
}

export function getPostOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRulesMutationOptions<
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
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.organization.workload_identity_providers>[0]>) {
  return mutationOptions<
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
    },
    TOnMutateResult
  >({
    mutationKey:
      getPostOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRulesMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.organization
        .workload_identity_providers(toValue(params))
        .federation_rules.post(body, options)
      if (error) throw error
      return data
    },
  })
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
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.workload_identity_providers>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
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
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults =
    getPostOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRulesMutationOptions<
      TError,
      TOnMutateResult
    >(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRulesWorkloadIdentityFederationRuleIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.workload_identity_providers>[0]>,
  params2: MaybeRefOrGetter<
    Parameters<
      ReturnType<typeof client.organization.workload_identity_providers>['federation_rules']
    >[0]
  >,
) {
  return [
    'organization',
    '/organization/workload_identity_providers/{workload_identity_provider_id}/federation_rules/{workload_identity_federation_rule_id}',
    toValue(params),
    toValue(params2),
  ] as const
}

export function getOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRulesWorkloadIdentityFederationRuleIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.workload_identity_providers>[0]>,
  params2: MaybeRefOrGetter<
    Parameters<
      ReturnType<typeof client.organization.workload_identity_providers>['federation_rules']
    >[0]
  >,
  options?: Parameters<
    ReturnType<
      ReturnType<typeof client.organization.workload_identity_providers>['federation_rules']
    >['get']
  >[0],
) {
  return {
    queryKey: computed(() =>
      getOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRulesWorkloadIdentityFederationRuleIdQueryKey(
        params,
        params2,
      ),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.organization
        .workload_identity_providers(toValue(params))
        .federation_rules(toValue(params2))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRulesWorkloadIdentityFederationRuleId<
  TData = Extract<
    Awaited<
      ReturnType<
        ReturnType<
          ReturnType<typeof client.organization.workload_identity_providers>['federation_rules']
        >['get']
      >
    >,
    { error: null }
  >['data'],
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
  params: MaybeRefOrGetter<Parameters<typeof client.organization.workload_identity_providers>[0]>,
  params2: MaybeRefOrGetter<
    Parameters<
      ReturnType<typeof client.organization.workload_identity_providers>['federation_rules']
    >[0]
  >,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<
              ReturnType<
                ReturnType<
                  ReturnType<
                    typeof client.organization.workload_identity_providers
                  >['federation_rules']
                >['get']
              >
            >,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<
              ReturnType<
                ReturnType<
                  ReturnType<
                    typeof client.organization.workload_identity_providers
                  >['federation_rules']
                >['get']
              >
            >,
            { error: null }
          >['data'],
          ReturnType<
            typeof getOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRulesWorkloadIdentityFederationRuleIdQueryKey
          >
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<
      ReturnType<
        ReturnType<typeof client.organization.workload_identity_providers>['federation_rules']
      >['get']
    >[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() =>
        getOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRulesWorkloadIdentityFederationRuleIdQueryKey(
          params,
          params2,
        ),
      ),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.organization
          .workload_identity_providers(toValue(params))
          .federation_rules(toValue(params2))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRulesWorkloadIdentityFederationRuleIdMutationKey() {
  return [
    'organization',
    '/organization/workload_identity_providers/{workload_identity_provider_id}/federation_rules/{workload_identity_federation_rule_id}',
    'POST',
  ] as const
}

export function getPostOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRulesWorkloadIdentityFederationRuleIdMutationOptions<
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
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.workload_identity_providers>[0]>,
  params2: MaybeRefOrGetter<
    Parameters<
      ReturnType<typeof client.organization.workload_identity_providers>['federation_rules']
    >[0]
  >,
) {
  return mutationOptions<
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
    },
    TOnMutateResult
  >({
    mutationKey:
      getPostOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRulesWorkloadIdentityFederationRuleIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.organization
        .workload_identity_providers(toValue(params))
        .federation_rules(toValue(params2))
        .post(body, options)
      if (error) throw error
      return data
    },
  })
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
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.workload_identity_providers>[0]>,
  params2: MaybeRefOrGetter<
    Parameters<
      ReturnType<typeof client.organization.workload_identity_providers>['federation_rules']
    >[0]
  >,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<
                ReturnType<
                  ReturnType<
                    typeof client.organization.workload_identity_providers
                  >['federation_rules']
                >['post']
              >
            >,
            { error: null }
          >['data'],
          TError,
          {
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
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults =
    getPostOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRulesWorkloadIdentityFederationRuleIdMutationOptions<
      TError,
      TOnMutateResult
    >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getDeleteOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRulesWorkloadIdentityFederationRuleIdMutationKey() {
  return [
    'organization',
    '/organization/workload_identity_providers/{workload_identity_provider_id}/federation_rules/{workload_identity_federation_rule_id}',
    'DELETE',
  ] as const
}

export function getDeleteOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRulesWorkloadIdentityFederationRuleIdMutationOptions<
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
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.workload_identity_providers>[0]>,
  params2: MaybeRefOrGetter<
    Parameters<
      ReturnType<typeof client.organization.workload_identity_providers>['federation_rules']
    >[0]
  >,
) {
  return mutationOptions<
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
    },
    TOnMutateResult
  >({
    mutationKey:
      getDeleteOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRulesWorkloadIdentityFederationRuleIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.organization
        .workload_identity_providers(toValue(params))
        .federation_rules(toValue(params2))
        .delete(body, options)
      if (error) throw error
      return data
    },
  })
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
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.workload_identity_providers>[0]>,
  params2: MaybeRefOrGetter<
    Parameters<
      ReturnType<typeof client.organization.workload_identity_providers>['federation_rules']
    >[0]
  >,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<
                ReturnType<
                  ReturnType<
                    typeof client.organization.workload_identity_providers
                  >['federation_rules']
                >['delete']
              >
            >,
            { error: null }
          >['data'],
          TError,
          {
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
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults =
    getDeleteOrganizationWorkloadIdentityProvidersWorkloadIdentityProviderIdFederationRulesWorkloadIdentityFederationRuleIdMutationOptions<
      TError,
      TOnMutateResult
    >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getOrganizationUsageDecisionsQueryKey(
  options: Parameters<typeof client.organization.usage.decisions.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['organization', '/organization/usage/decisions', keyArgs] as const
}

export function getOrganizationUsageDecisionsQueryOptions(
  options: Parameters<typeof client.organization.usage.decisions.get>[0],
) {
  return {
    queryKey: getOrganizationUsageDecisionsQueryKey(options),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.organization.usage.decisions.get({
        ...options,
        fetch: { ...options.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useOrganizationUsageDecisions<
  TData = Extract<
    Awaited<ReturnType<typeof client.organization.usage.decisions.get>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<typeof client.organization.usage.decisions.get>>['error'],
    null
  >,
>(
  options: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<typeof client.organization.usage.decisions.get>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<typeof client.organization.usage.decisions.get>>,
            { error: null }
          >['data'],
          ReturnType<typeof getOrganizationUsageDecisionsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options: Parameters<typeof client.organization.usage.decisions.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options
  return useQuery(
    {
      ...queryOptions,
      queryKey: getOrganizationUsageDecisionsQueryKey(clientOptions),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.organization.usage.decisions.get({
          ...clientOptions,
          fetch: { ...clientOptions.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getOrganizationExternalStorageQueryKey(
  options?: Parameters<typeof client.organization.external_storage.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['organization', '/organization/external_storage', keyArgs] as const
}

export function getOrganizationExternalStorageQueryOptions(
  options?: Parameters<typeof client.organization.external_storage.get>[0],
) {
  return {
    queryKey: getOrganizationExternalStorageQueryKey(options),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.organization.external_storage.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useOrganizationExternalStorage<
  TData = Extract<
    Awaited<ReturnType<typeof client.organization.external_storage.get>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<typeof client.organization.external_storage.get>>['error'],
    null
  >,
>(
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<typeof client.organization.external_storage.get>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<typeof client.organization.external_storage.get>>,
            { error: null }
          >['data'],
          ReturnType<typeof getOrganizationExternalStorageQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.organization.external_storage.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: getOrganizationExternalStorageQueryKey(clientOptions),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.organization.external_storage.get({
          ...clientOptions,
          fetch: { ...clientOptions?.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostOrganizationExternalStorageMutationKey() {
  return ['organization', '/organization/external_storage', 'POST'] as const
}

export function getPostOrganizationExternalStorageMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<typeof client.organization.external_storage.post>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<typeof client.organization.external_storage.post>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<typeof client.organization.external_storage.post>[0]
      options?: Parameters<typeof client.organization.external_storage.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostOrganizationExternalStorageMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.organization.external_storage.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostOrganizationExternalStorage<
  TError = Exclude<
    Awaited<ReturnType<typeof client.organization.external_storage.post>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<typeof client.organization.external_storage.post>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<typeof client.organization.external_storage.post>[0]
            options?: Parameters<typeof client.organization.external_storage.post>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostOrganizationExternalStorageMutationOptions<
    TError,
    TOnMutateResult
  >()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getOrganizationExternalStorageExternalStorageIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.external_storage>[0]>,
) {
  return [
    'organization',
    '/organization/external_storage/{external_storage_id}',
    toValue(params),
  ] as const
}

export function getOrganizationExternalStorageExternalStorageIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.external_storage>[0]>,
  options?: Parameters<ReturnType<typeof client.organization.external_storage>['get']>[0],
) {
  return {
    queryKey: computed(() => getOrganizationExternalStorageExternalStorageIdQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.organization
        .external_storage(toValue(params))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useOrganizationExternalStorageExternalStorageId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.organization.external_storage>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.external_storage>['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.external_storage>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.organization.external_storage>['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.organization.external_storage>['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getOrganizationExternalStorageExternalStorageIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.organization.external_storage>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getOrganizationExternalStorageExternalStorageIdQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.organization
          .external_storage(toValue(params))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getDeleteOrganizationExternalStorageExternalStorageIdMutationKey() {
  return ['organization', '/organization/external_storage/{external_storage_id}', 'DELETE'] as const
}

export function getDeleteOrganizationExternalStorageExternalStorageIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.external_storage>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.organization.external_storage>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.organization.external_storage>['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<typeof client.organization.external_storage>['delete']>[0]
      options?: Parameters<ReturnType<typeof client.organization.external_storage>['delete']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteOrganizationExternalStorageExternalStorageIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.organization
        .external_storage(toValue(params))
        .delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeleteOrganizationExternalStorageExternalStorageId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.organization.external_storage>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.external_storage>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.organization.external_storage>['delete']>>,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<ReturnType<typeof client.organization.external_storage>['delete']>[0]
            options?: Parameters<
              ReturnType<typeof client.organization.external_storage>['delete']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteOrganizationExternalStorageExternalStorageIdMutationOptions<
    TError,
    TOnMutateResult
  >(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPostOrganizationExternalStorageExternalStorageIdValidateMutationKey() {
  return [
    'organization',
    '/organization/external_storage/{external_storage_id}/validate',
    'POST',
  ] as const
}

export function getPostOrganizationExternalStorageExternalStorageIdValidateMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.organization.external_storage>['validate']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.organization.external_storage>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<ReturnType<typeof client.organization.external_storage>['validate']['post']>
      >,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<
        ReturnType<typeof client.organization.external_storage>['validate']['post']
      >[0]
      options?: Parameters<
        ReturnType<typeof client.organization.external_storage>['validate']['post']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostOrganizationExternalStorageExternalStorageIdValidateMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.organization
        .external_storage(toValue(params))
        .validate.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostOrganizationExternalStorageExternalStorageIdValidate<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.organization.external_storage>['validate']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.external_storage>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<
                ReturnType<typeof client.organization.external_storage>['validate']['post']
              >
            >,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<
              ReturnType<typeof client.organization.external_storage>['validate']['post']
            >[0]
            options?: Parameters<
              ReturnType<typeof client.organization.external_storage>['validate']['post']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults =
    getPostOrganizationExternalStorageExternalStorageIdValidateMutationOptions<
      TError,
      TOnMutateResult
    >(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getOrganizationSpendLimitQueryKey() {
  return ['organization', '/organization/spend_limit'] as const
}

export function getOrganizationSpendLimitQueryOptions(
  options?: Parameters<typeof client.organization.spend_limit.get>[0],
) {
  return {
    queryKey: getOrganizationSpendLimitQueryKey(),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.organization.spend_limit.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useOrganizationSpendLimit<
  TData = Extract<
    Awaited<ReturnType<typeof client.organization.spend_limit.get>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.organization.spend_limit.get>>['error'], null>,
>(
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<typeof client.organization.spend_limit.get>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<typeof client.organization.spend_limit.get>>,
            { error: null }
          >['data'],
          ReturnType<typeof getOrganizationSpendLimitQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.organization.spend_limit.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: getOrganizationSpendLimitQueryKey(),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.organization.spend_limit.get({
          ...clientOptions,
          fetch: { ...clientOptions?.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostOrganizationSpendLimitMutationKey() {
  return ['organization', '/organization/spend_limit', 'POST'] as const
}

export function getPostOrganizationSpendLimitMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.organization.spend_limit.post>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<typeof client.organization.spend_limit.post>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<typeof client.organization.spend_limit.post>[0]
      options?: Parameters<typeof client.organization.spend_limit.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostOrganizationSpendLimitMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.organization.spend_limit.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostOrganizationSpendLimit<
  TError = Exclude<Awaited<ReturnType<typeof client.organization.spend_limit.post>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<typeof client.organization.spend_limit.post>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<typeof client.organization.spend_limit.post>[0]
            options?: Parameters<typeof client.organization.spend_limit.post>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostOrganizationSpendLimitMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getDeleteOrganizationSpendLimitMutationKey() {
  return ['organization', '/organization/spend_limit', 'DELETE'] as const
}

export function getDeleteOrganizationSpendLimitMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<typeof client.organization.spend_limit.delete>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<typeof client.organization.spend_limit.delete>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<typeof client.organization.spend_limit.delete>[0]
      options?: Parameters<typeof client.organization.spend_limit.delete>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteOrganizationSpendLimitMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.organization.spend_limit.delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeleteOrganizationSpendLimit<
  TError = Exclude<
    Awaited<ReturnType<typeof client.organization.spend_limit.delete>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<typeof client.organization.spend_limit.delete>>,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<typeof client.organization.spend_limit.delete>[0]
            options?: Parameters<typeof client.organization.spend_limit.delete>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteOrganizationSpendLimitMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getOrganizationProjectsProjectIdSpendLimitQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
) {
  return [
    'organization',
    '/organization/projects/{project_id}/spend_limit',
    toValue(params),
  ] as const
}

export function getOrganizationProjectsProjectIdSpendLimitQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
  options?: Parameters<ReturnType<typeof client.organization.projects>['spend_limit']['get']>[0],
) {
  return {
    queryKey: computed(() => getOrganizationProjectsProjectIdSpendLimitQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.organization
        .projects(toValue(params))
        .spend_limit.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useOrganizationProjectsProjectIdSpendLimit<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.organization.projects>['spend_limit']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.organization.projects>['spend_limit']['get']>
    >['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<
              ReturnType<ReturnType<typeof client.organization.projects>['spend_limit']['get']>
            >,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<
              ReturnType<ReturnType<typeof client.organization.projects>['spend_limit']['get']>
            >,
            { error: null }
          >['data'],
          ReturnType<typeof getOrganizationProjectsProjectIdSpendLimitQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.organization.projects>['spend_limit']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getOrganizationProjectsProjectIdSpendLimitQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.organization
          .projects(toValue(params))
          .spend_limit.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostOrganizationProjectsProjectIdSpendLimitMutationKey() {
  return ['organization', '/organization/projects/{project_id}/spend_limit', 'POST'] as const
}

export function getPostOrganizationProjectsProjectIdSpendLimitMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.organization.projects>['spend_limit']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.organization.projects>['spend_limit']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.organization.projects>['spend_limit']['post']>[0]
      options?: Parameters<
        ReturnType<typeof client.organization.projects>['spend_limit']['post']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostOrganizationProjectsProjectIdSpendLimitMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.organization
        .projects(toValue(params))
        .spend_limit.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostOrganizationProjectsProjectIdSpendLimit<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.organization.projects>['spend_limit']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<ReturnType<typeof client.organization.projects>['spend_limit']['post']>
            >,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<
              ReturnType<typeof client.organization.projects>['spend_limit']['post']
            >[0]
            options?: Parameters<
              ReturnType<typeof client.organization.projects>['spend_limit']['post']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostOrganizationProjectsProjectIdSpendLimitMutationOptions<
    TError,
    TOnMutateResult
  >(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getDeleteOrganizationProjectsProjectIdSpendLimitMutationKey() {
  return ['organization', '/organization/projects/{project_id}/spend_limit', 'DELETE'] as const
}

export function getDeleteOrganizationProjectsProjectIdSpendLimitMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.organization.projects>['spend_limit']['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.organization.projects>['spend_limit']['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<typeof client.organization.projects>['spend_limit']['delete']>[0]
      options?: Parameters<
        ReturnType<typeof client.organization.projects>['spend_limit']['delete']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteOrganizationProjectsProjectIdSpendLimitMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.organization
        .projects(toValue(params))
        .spend_limit.delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeleteOrganizationProjectsProjectIdSpendLimit<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.organization.projects>['spend_limit']['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<ReturnType<typeof client.organization.projects>['spend_limit']['delete']>
            >,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<
              ReturnType<typeof client.organization.projects>['spend_limit']['delete']
            >[0]
            options?: Parameters<
              ReturnType<typeof client.organization.projects>['spend_limit']['delete']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteOrganizationProjectsProjectIdSpendLimitMutationOptions<
    TError,
    TOnMutateResult
  >(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getOrganizationProjectsProjectIdServiceTierSettingsQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
) {
  return [
    'organization',
    '/organization/projects/{project_id}/service_tier_settings',
    toValue(params),
  ] as const
}

export function getOrganizationProjectsProjectIdServiceTierSettingsQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
  options?: Parameters<
    ReturnType<typeof client.organization.projects>['service_tier_settings']['get']
  >[0],
) {
  return {
    queryKey: computed(() => getOrganizationProjectsProjectIdServiceTierSettingsQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.organization
        .projects(toValue(params))
        .service_tier_settings.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useOrganizationProjectsProjectIdServiceTierSettings<
  TData = Extract<
    Awaited<
      ReturnType<ReturnType<typeof client.organization.projects>['service_tier_settings']['get']>
    >,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.organization.projects>['service_tier_settings']['get']>
    >['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<
              ReturnType<
                ReturnType<typeof client.organization.projects>['service_tier_settings']['get']
              >
            >,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<
              ReturnType<
                ReturnType<typeof client.organization.projects>['service_tier_settings']['get']
              >
            >,
            { error: null }
          >['data'],
          ReturnType<typeof getOrganizationProjectsProjectIdServiceTierSettingsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<
      ReturnType<typeof client.organization.projects>['service_tier_settings']['get']
    >[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getOrganizationProjectsProjectIdServiceTierSettingsQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.organization
          .projects(toValue(params))
          .service_tier_settings.get({
            ...clientOptions,
            fetch: { ...clientOptions?.fetch, signal },
          })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostOrganizationProjectsProjectIdServiceTierSettingsMutationKey() {
  return [
    'organization',
    '/organization/projects/{project_id}/service_tier_settings',
    'POST',
  ] as const
}

export function getPostOrganizationProjectsProjectIdServiceTierSettingsMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.organization.projects>['service_tier_settings']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<ReturnType<typeof client.organization.projects>['service_tier_settings']['post']>
      >,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<
        ReturnType<typeof client.organization.projects>['service_tier_settings']['post']
      >[0]
      options?: Parameters<
        ReturnType<typeof client.organization.projects>['service_tier_settings']['post']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostOrganizationProjectsProjectIdServiceTierSettingsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.organization
        .projects(toValue(params))
        .service_tier_settings.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostOrganizationProjectsProjectIdServiceTierSettings<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.organization.projects>['service_tier_settings']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<
                ReturnType<typeof client.organization.projects>['service_tier_settings']['post']
              >
            >,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<
              ReturnType<typeof client.organization.projects>['service_tier_settings']['post']
            >[0]
            options?: Parameters<
              ReturnType<typeof client.organization.projects>['service_tier_settings']['post']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostOrganizationProjectsProjectIdServiceTierSettingsMutationOptions<
    TError,
    TOnMutateResult
  >(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPostOrganizationProjectsProjectIdServiceAccountsServiceAccountIdApiKeysMutationKey() {
  return [
    'organization',
    '/organization/projects/{project_id}/service_accounts/{service_account_id}/api_keys',
    'POST',
  ] as const
}

export function getPostOrganizationProjectsProjectIdServiceAccountsServiceAccountIdApiKeysMutationOptions<
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
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
  params2: MaybeRefOrGetter<
    Parameters<ReturnType<typeof client.organization.projects>['service_accounts']>[0]
  >,
) {
  return mutationOptions<
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
    },
    TOnMutateResult
  >({
    mutationKey:
      getPostOrganizationProjectsProjectIdServiceAccountsServiceAccountIdApiKeysMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.organization
        .projects(toValue(params))
        .service_accounts(toValue(params2))
        .api_keys.post(body, options)
      if (error) throw error
      return data
    },
  })
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
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.organization.projects>[0]>,
  params2: MaybeRefOrGetter<
    Parameters<ReturnType<typeof client.organization.projects>['service_accounts']>[0]
  >,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
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
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults =
    getPostOrganizationProjectsProjectIdServiceAccountsServiceAccountIdApiKeysMutationOptions<
      TError,
      TOnMutateResult
    >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPostContentProvenanceChecksMutationKey() {
  return ['content_provenance_checks', '/content_provenance_checks', 'POST'] as const
}

export function getPostContentProvenanceChecksMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<typeof client.content_provenance_checks.post>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<typeof client.content_provenance_checks.post>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<typeof client.content_provenance_checks.post>[0]
      options?: Parameters<typeof client.content_provenance_checks.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostContentProvenanceChecksMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.content_provenance_checks.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostContentProvenanceChecks<
  TError = Exclude<
    Awaited<ReturnType<typeof client.content_provenance_checks.post>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<typeof client.content_provenance_checks.post>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<typeof client.content_provenance_checks.post>[0]
            options?: Parameters<typeof client.content_provenance_checks.post>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostContentProvenanceChecksMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getVideosQueryKey(options?: Parameters<typeof client.videos.get>[0]) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['videos', '/videos', keyArgs] as const
}

export function getVideosQueryOptions(options?: Parameters<typeof client.videos.get>[0]) {
  return {
    queryKey: getVideosQueryKey(options),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.videos.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useVideos<
  TData = Extract<Awaited<ReturnType<typeof client.videos.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.videos.get>>['error'], null>,
>(
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<Awaited<ReturnType<typeof client.videos.get>>, { error: null }>['data'],
          TError,
          TData,
          Extract<Awaited<ReturnType<typeof client.videos.get>>, { error: null }>['data'],
          ReturnType<typeof getVideosQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.videos.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: getVideosQueryKey(clientOptions),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.videos.get({
          ...clientOptions,
          fetch: { ...clientOptions?.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostVideosMutationKey() {
  return ['videos', '/videos', 'POST'] as const
}

export function getPostVideosMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.videos.post>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.videos.post>>, { error: null }>['data'],
    TError,
    {
      body: Parameters<typeof client.videos.post>[0]
      options?: Parameters<typeof client.videos.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostVideosMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.videos.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostVideos<
  TError = Exclude<Awaited<ReturnType<typeof client.videos.post>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<Awaited<ReturnType<typeof client.videos.post>>, { error: null }>['data'],
          TError,
          {
            body: Parameters<typeof client.videos.post>[0]
            options?: Parameters<typeof client.videos.post>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostVideosMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPostVideosCharactersMutationKey() {
  return ['videos', '/videos/characters', 'POST'] as const
}

export function getPostVideosCharactersMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.videos.characters.post>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.videos.characters.post>>, { error: null }>['data'],
    TError,
    {
      body: Parameters<typeof client.videos.characters.post>[0]
      options?: Parameters<typeof client.videos.characters.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostVideosCharactersMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.videos.characters.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostVideosCharacters<
  TError = Exclude<Awaited<ReturnType<typeof client.videos.characters.post>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<typeof client.videos.characters.post>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<typeof client.videos.characters.post>[0]
            options?: Parameters<typeof client.videos.characters.post>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostVideosCharactersMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getVideosCharactersCharacterIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.videos.characters>[0]>,
) {
  return ['videos', '/videos/characters/{character_id}', toValue(params)] as const
}

export function getVideosCharactersCharacterIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.videos.characters>[0]>,
  options?: Parameters<ReturnType<typeof client.videos.characters>['get']>[0],
) {
  return {
    queryKey: computed(() => getVideosCharactersCharacterIdQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.videos
        .characters(toValue(params))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useVideosCharactersCharacterId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.videos.characters>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.videos.characters>['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.videos.characters>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.videos.characters>['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.videos.characters>['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getVideosCharactersCharacterIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.videos.characters>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getVideosCharactersCharacterIdQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.videos
          .characters(toValue(params))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostVideosEditsMutationKey() {
  return ['videos', '/videos/edits', 'POST'] as const
}

export function getPostVideosEditsMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.videos.edits.post>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.videos.edits.post>>, { error: null }>['data'],
    TError,
    {
      body: Parameters<typeof client.videos.edits.post>[0]
      options?: Parameters<typeof client.videos.edits.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostVideosEditsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.videos.edits.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostVideosEdits<
  TError = Exclude<Awaited<ReturnType<typeof client.videos.edits.post>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<Awaited<ReturnType<typeof client.videos.edits.post>>, { error: null }>['data'],
          TError,
          {
            body: Parameters<typeof client.videos.edits.post>[0]
            options?: Parameters<typeof client.videos.edits.post>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostVideosEditsMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPostVideosExtensionsMutationKey() {
  return ['videos', '/videos/extensions', 'POST'] as const
}

export function getPostVideosExtensionsMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.videos.extensions.post>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.videos.extensions.post>>, { error: null }>['data'],
    TError,
    {
      body: Parameters<typeof client.videos.extensions.post>[0]
      options?: Parameters<typeof client.videos.extensions.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostVideosExtensionsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.videos.extensions.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostVideosExtensions<
  TError = Exclude<Awaited<ReturnType<typeof client.videos.extensions.post>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<typeof client.videos.extensions.post>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<typeof client.videos.extensions.post>[0]
            options?: Parameters<typeof client.videos.extensions.post>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostVideosExtensionsMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getVideosVideoIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.videos>[0]>,
) {
  return ['videos', '/videos/{video_id}', toValue(params)] as const
}

export function getVideosVideoIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.videos>[0]>,
  options?: Parameters<ReturnType<typeof client.videos>['get']>[0],
) {
  return {
    queryKey: computed(() => getVideosVideoIdQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .videos(toValue(params))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useVideosVideoId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.videos>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.videos>['get']>>['error'], null>,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.videos>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.videos>['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.videos>['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getVideosVideoIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.videos>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getVideosVideoIdQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .videos(toValue(params))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getDeleteVideosVideoIdMutationKey() {
  return ['videos', '/videos/{video_id}', 'DELETE'] as const
}

export function getDeleteVideosVideoIdMutationOptions<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.videos>['delete']>>['error'], null>,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.videos>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.videos>['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<typeof client.videos>['delete']>[0]
      options?: Parameters<ReturnType<typeof client.videos>['delete']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteVideosVideoIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.videos(toValue(params)).delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeleteVideosVideoId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.videos>['delete']>>['error'], null>,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.videos>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.videos>['delete']>>,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<ReturnType<typeof client.videos>['delete']>[0]
            options?: Parameters<ReturnType<typeof client.videos>['delete']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteVideosVideoIdMutationOptions<TError, TOnMutateResult>(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getVideosVideoIdContentQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.videos>[0]>,
  options?: Parameters<ReturnType<typeof client.videos>['content']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['videos', '/videos/{video_id}/content', toValue(params), keyArgs] as const
}

export function getVideosVideoIdContentQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.videos>[0]>,
  options?: Parameters<ReturnType<typeof client.videos>['content']['get']>[0],
) {
  return {
    queryKey: computed(() => getVideosVideoIdContentQueryKey(params, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .videos(toValue(params))
        .content.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useVideosVideoIdContent<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.videos>['content']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.videos>['content']['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.videos>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.videos>['content']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.videos>['content']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getVideosVideoIdContentQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.videos>['content']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getVideosVideoIdContentQueryKey(params, clientOptions)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .videos(toValue(params))
          .content.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostVideosVideoIdRemixMutationKey() {
  return ['videos', '/videos/{video_id}/remix', 'POST'] as const
}

export function getPostVideosVideoIdRemixMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.videos>['remix']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.videos>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.videos>['remix']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.videos>['remix']['post']>[0]
      options?: Parameters<ReturnType<typeof client.videos>['remix']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostVideosVideoIdRemixMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.videos(toValue(params)).remix.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostVideosVideoIdRemix<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.videos>['remix']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.videos>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.videos>['remix']['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.videos>['remix']['post']>[0]
            options?: Parameters<ReturnType<typeof client.videos>['remix']['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostVideosVideoIdRemixMutationOptions<TError, TOnMutateResult>(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPostResponsesInputTokensMutationKey() {
  return ['responses', '/responses/input_tokens', 'POST'] as const
}

export function getPostResponsesInputTokensMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.responses.input_tokens.post>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<typeof client.responses.input_tokens.post>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<typeof client.responses.input_tokens.post>[0]
      options?: Parameters<typeof client.responses.input_tokens.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostResponsesInputTokensMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.responses.input_tokens.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostResponsesInputTokens<
  TError = Exclude<Awaited<ReturnType<typeof client.responses.input_tokens.post>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<typeof client.responses.input_tokens.post>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<typeof client.responses.input_tokens.post>[0]
            options?: Parameters<typeof client.responses.input_tokens.post>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostResponsesInputTokensMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPostResponsesCompactMutationKey() {
  return ['responses', '/responses/compact', 'POST'] as const
}

export function getPostResponsesCompactMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.responses.compact.post>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.responses.compact.post>>, { error: null }>['data'],
    TError,
    {
      body: Parameters<typeof client.responses.compact.post>[0]
      options?: Parameters<typeof client.responses.compact.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostResponsesCompactMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.responses.compact.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostResponsesCompact<
  TError = Exclude<Awaited<ReturnType<typeof client.responses.compact.post>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<typeof client.responses.compact.post>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<typeof client.responses.compact.post>[0]
            options?: Parameters<typeof client.responses.compact.post>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostResponsesCompactMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getSkillsQueryKey(options?: Parameters<typeof client.skills.get>[0]) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['skills', '/skills', keyArgs] as const
}

export function getSkillsQueryOptions(options?: Parameters<typeof client.skills.get>[0]) {
  return {
    queryKey: getSkillsQueryKey(options),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.skills.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useSkills<
  TData = Extract<Awaited<ReturnType<typeof client.skills.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.skills.get>>['error'], null>,
>(
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<Awaited<ReturnType<typeof client.skills.get>>, { error: null }>['data'],
          TError,
          TData,
          Extract<Awaited<ReturnType<typeof client.skills.get>>, { error: null }>['data'],
          ReturnType<typeof getSkillsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.skills.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: getSkillsQueryKey(clientOptions),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.skills.get({
          ...clientOptions,
          fetch: { ...clientOptions?.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostSkillsMutationKey() {
  return ['skills', '/skills', 'POST'] as const
}

export function getPostSkillsMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.skills.post>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.skills.post>>, { error: null }>['data'],
    TError,
    {
      body: Parameters<typeof client.skills.post>[0]
      options?: Parameters<typeof client.skills.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostSkillsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.skills.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostSkills<
  TError = Exclude<Awaited<ReturnType<typeof client.skills.post>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<Awaited<ReturnType<typeof client.skills.post>>, { error: null }>['data'],
          TError,
          {
            body: Parameters<typeof client.skills.post>[0]
            options?: Parameters<typeof client.skills.post>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostSkillsMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getSkillsSkillIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.skills>[0]>,
) {
  return ['skills', '/skills/{skill_id}', toValue(params)] as const
}

export function getSkillsSkillIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.skills>[0]>,
  options?: Parameters<ReturnType<typeof client.skills>['get']>[0],
) {
  return {
    queryKey: computed(() => getSkillsSkillIdQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .skills(toValue(params))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useSkillsSkillId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.skills>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.skills>['get']>>['error'], null>,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.skills>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.skills>['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.skills>['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getSkillsSkillIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.skills>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getSkillsSkillIdQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .skills(toValue(params))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostSkillsSkillIdMutationKey() {
  return ['skills', '/skills/{skill_id}', 'POST'] as const
}

export function getPostSkillsSkillIdMutationOptions<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.skills>['post']>>['error'], null>,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.skills>[0]>) {
  return mutationOptions<
    Extract<Awaited<ReturnType<ReturnType<typeof client.skills>['post']>>, { error: null }>['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.skills>['post']>[0]
      options?: Parameters<ReturnType<typeof client.skills>['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostSkillsSkillIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.skills(toValue(params)).post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostSkillsSkillId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.skills>['post']>>['error'], null>,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.skills>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.skills>['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.skills>['post']>[0]
            options?: Parameters<ReturnType<typeof client.skills>['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostSkillsSkillIdMutationOptions<TError, TOnMutateResult>(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getDeleteSkillsSkillIdMutationKey() {
  return ['skills', '/skills/{skill_id}', 'DELETE'] as const
}

export function getDeleteSkillsSkillIdMutationOptions<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.skills>['delete']>>['error'], null>,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.skills>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.skills>['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<typeof client.skills>['delete']>[0]
      options?: Parameters<ReturnType<typeof client.skills>['delete']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteSkillsSkillIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.skills(toValue(params)).delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeleteSkillsSkillId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.skills>['delete']>>['error'], null>,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.skills>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.skills>['delete']>>,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<ReturnType<typeof client.skills>['delete']>[0]
            options?: Parameters<ReturnType<typeof client.skills>['delete']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteSkillsSkillIdMutationOptions<TError, TOnMutateResult>(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getSkillsSkillIdContentQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.skills>[0]>,
) {
  return ['skills', '/skills/{skill_id}/content', toValue(params)] as const
}

export function getSkillsSkillIdContentQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.skills>[0]>,
  options?: Parameters<ReturnType<typeof client.skills>['content']['get']>[0],
) {
  return {
    queryKey: computed(() => getSkillsSkillIdContentQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .skills(toValue(params))
        .content.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useSkillsSkillIdContent<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.skills>['content']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.skills>['content']['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.skills>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.skills>['content']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.skills>['content']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getSkillsSkillIdContentQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.skills>['content']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getSkillsSkillIdContentQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .skills(toValue(params))
          .content.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getSkillsSkillIdVersionsQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.skills>[0]>,
  options?: Parameters<ReturnType<typeof client.skills>['versions']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['skills', '/skills/{skill_id}/versions', toValue(params), keyArgs] as const
}

export function getSkillsSkillIdVersionsQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.skills>[0]>,
  options?: Parameters<ReturnType<typeof client.skills>['versions']['get']>[0],
) {
  return {
    queryKey: computed(() => getSkillsSkillIdVersionsQueryKey(params, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .skills(toValue(params))
        .versions.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useSkillsSkillIdVersions<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.skills>['versions']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.skills>['versions']['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.skills>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.skills>['versions']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.skills>['versions']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getSkillsSkillIdVersionsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.skills>['versions']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getSkillsSkillIdVersionsQueryKey(params, clientOptions)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .skills(toValue(params))
          .versions.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostSkillsSkillIdVersionsMutationKey() {
  return ['skills', '/skills/{skill_id}/versions', 'POST'] as const
}

export function getPostSkillsSkillIdVersionsMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.skills>['versions']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.skills>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.skills>['versions']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.skills>['versions']['post']>[0]
      options?: Parameters<ReturnType<typeof client.skills>['versions']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostSkillsSkillIdVersionsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.skills(toValue(params)).versions.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostSkillsSkillIdVersions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.skills>['versions']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.skills>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.skills>['versions']['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.skills>['versions']['post']>[0]
            options?: Parameters<ReturnType<typeof client.skills>['versions']['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostSkillsSkillIdVersionsMutationOptions<TError, TOnMutateResult>(
    params,
  )
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getSkillsSkillIdVersionsVersionQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.skills>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.skills>['versions']>[0]>,
) {
  return [
    'skills',
    '/skills/{skill_id}/versions/{version}',
    toValue(params),
    toValue(params2),
  ] as const
}

export function getSkillsSkillIdVersionsVersionQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.skills>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.skills>['versions']>[0]>,
  options?: Parameters<ReturnType<ReturnType<typeof client.skills>['versions']>['get']>[0],
) {
  return {
    queryKey: computed(() => getSkillsSkillIdVersionsVersionQueryKey(params, params2)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .skills(toValue(params))
        .versions(toValue(params2))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useSkillsSkillIdVersionsVersion<
  TData = Extract<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.skills>['versions']>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.skills>['versions']>['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.skills>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.skills>['versions']>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<ReturnType<typeof client.skills>['versions']>['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<ReturnType<typeof client.skills>['versions']>['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getSkillsSkillIdVersionsVersionQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<ReturnType<typeof client.skills>['versions']>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getSkillsSkillIdVersionsVersionQueryKey(params, params2)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .skills(toValue(params))
          .versions(toValue(params2))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getDeleteSkillsSkillIdVersionsVersionMutationKey() {
  return ['skills', '/skills/{skill_id}/versions/{version}', 'DELETE'] as const
}

export function getDeleteSkillsSkillIdVersionsVersionMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.skills>['versions']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.skills>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.skills>['versions']>[0]>,
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.skills>['versions']>['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<ReturnType<typeof client.skills>['versions']>['delete']>[0]
      options?: Parameters<ReturnType<ReturnType<typeof client.skills>['versions']>['delete']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteSkillsSkillIdVersionsVersionMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .skills(toValue(params))
        .versions(toValue(params2))
        .delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeleteSkillsSkillIdVersionsVersion<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.skills>['versions']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.skills>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.skills>['versions']>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<ReturnType<typeof client.skills>['versions']>['delete']>>,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<ReturnType<ReturnType<typeof client.skills>['versions']>['delete']>[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.skills>['versions']>['delete']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteSkillsSkillIdVersionsVersionMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getSkillsSkillIdVersionsVersionContentQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.skills>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.skills>['versions']>[0]>,
) {
  return [
    'skills',
    '/skills/{skill_id}/versions/{version}/content',
    toValue(params),
    toValue(params2),
  ] as const
}

export function getSkillsSkillIdVersionsVersionContentQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.skills>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.skills>['versions']>[0]>,
  options?: Parameters<
    ReturnType<ReturnType<typeof client.skills>['versions']>['content']['get']
  >[0],
) {
  return {
    queryKey: computed(() => getSkillsSkillIdVersionsVersionContentQueryKey(params, params2)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .skills(toValue(params))
        .versions(toValue(params2))
        .content.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useSkillsSkillIdVersionsVersionContent<
  TData = Extract<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.skills>['versions']>['content']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.skills>['versions']>['content']['get']>
    >['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.skills>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.skills>['versions']>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<
              ReturnType<ReturnType<ReturnType<typeof client.skills>['versions']>['content']['get']>
            >,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<
              ReturnType<ReturnType<ReturnType<typeof client.skills>['versions']>['content']['get']>
            >,
            { error: null }
          >['data'],
          ReturnType<typeof getSkillsSkillIdVersionsVersionContentQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<
      ReturnType<ReturnType<typeof client.skills>['versions']>['content']['get']
    >[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getSkillsSkillIdVersionsVersionContentQueryKey(params, params2)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .skills(toValue(params))
          .versions(toValue(params2))
          .content.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostChatkitSessionsSessionIdCancelMutationKey() {
  return ['chatkit', '/chatkit/sessions/{session_id}/cancel', 'POST'] as const
}

export function getPostChatkitSessionsSessionIdCancelMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.chatkit.sessions>['cancel']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.chatkit.sessions>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.chatkit.sessions>['cancel']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<typeof client.chatkit.sessions>['cancel']['post']>[0]
      options?: Parameters<ReturnType<typeof client.chatkit.sessions>['cancel']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostChatkitSessionsSessionIdCancelMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.chatkit
        .sessions(toValue(params))
        .cancel.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostChatkitSessionsSessionIdCancel<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.chatkit.sessions>['cancel']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.chatkit.sessions>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.chatkit.sessions>['cancel']['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<ReturnType<typeof client.chatkit.sessions>['cancel']['post']>[0]
            options?: Parameters<ReturnType<typeof client.chatkit.sessions>['cancel']['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostChatkitSessionsSessionIdCancelMutationOptions<
    TError,
    TOnMutateResult
  >(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPostChatkitSessionsMutationKey() {
  return ['chatkit', '/chatkit/sessions', 'POST'] as const
}

export function getPostChatkitSessionsMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.chatkit.sessions.post>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.chatkit.sessions.post>>, { error: null }>['data'],
    TError,
    {
      body: Parameters<typeof client.chatkit.sessions.post>[0]
      options?: Parameters<typeof client.chatkit.sessions.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostChatkitSessionsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.chatkit.sessions.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostChatkitSessions<
  TError = Exclude<Awaited<ReturnType<typeof client.chatkit.sessions.post>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<typeof client.chatkit.sessions.post>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<typeof client.chatkit.sessions.post>[0]
            options?: Parameters<typeof client.chatkit.sessions.post>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostChatkitSessionsMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getChatkitThreadsThreadIdItemsQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.chatkit.threads>[0]>,
  options?: Parameters<ReturnType<typeof client.chatkit.threads>['items']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['chatkit', '/chatkit/threads/{thread_id}/items', toValue(params), keyArgs] as const
}

export function getChatkitThreadsThreadIdItemsQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.chatkit.threads>[0]>,
  options?: Parameters<ReturnType<typeof client.chatkit.threads>['items']['get']>[0],
) {
  return {
    queryKey: computed(() => getChatkitThreadsThreadIdItemsQueryKey(params, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.chatkit
        .threads(toValue(params))
        .items.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useChatkitThreadsThreadIdItems<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.chatkit.threads>['items']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.chatkit.threads>['items']['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.chatkit.threads>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.chatkit.threads>['items']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.chatkit.threads>['items']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getChatkitThreadsThreadIdItemsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.chatkit.threads>['items']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getChatkitThreadsThreadIdItemsQueryKey(params, clientOptions)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.chatkit
          .threads(toValue(params))
          .items.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getChatkitThreadsThreadIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.chatkit.threads>[0]>,
) {
  return ['chatkit', '/chatkit/threads/{thread_id}', toValue(params)] as const
}

export function getChatkitThreadsThreadIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.chatkit.threads>[0]>,
  options?: Parameters<ReturnType<typeof client.chatkit.threads>['get']>[0],
) {
  return {
    queryKey: computed(() => getChatkitThreadsThreadIdQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.chatkit
        .threads(toValue(params))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useChatkitThreadsThreadId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.chatkit.threads>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.chatkit.threads>['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.chatkit.threads>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.chatkit.threads>['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.chatkit.threads>['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getChatkitThreadsThreadIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.chatkit.threads>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getChatkitThreadsThreadIdQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.chatkit
          .threads(toValue(params))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getDeleteChatkitThreadsThreadIdMutationKey() {
  return ['chatkit', '/chatkit/threads/{thread_id}', 'DELETE'] as const
}

export function getDeleteChatkitThreadsThreadIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.chatkit.threads>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.chatkit.threads>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.chatkit.threads>['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<typeof client.chatkit.threads>['delete']>[0]
      options?: Parameters<ReturnType<typeof client.chatkit.threads>['delete']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteChatkitThreadsThreadIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.chatkit.threads(toValue(params)).delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeleteChatkitThreadsThreadId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.chatkit.threads>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.chatkit.threads>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.chatkit.threads>['delete']>>,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<ReturnType<typeof client.chatkit.threads>['delete']>[0]
            options?: Parameters<ReturnType<typeof client.chatkit.threads>['delete']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteChatkitThreadsThreadIdMutationOptions<TError, TOnMutateResult>(
    params,
  )
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getChatkitThreadsQueryKey(
  options?: Parameters<typeof client.chatkit.threads.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['chatkit', '/chatkit/threads', keyArgs] as const
}

export function getChatkitThreadsQueryOptions(
  options?: Parameters<typeof client.chatkit.threads.get>[0],
) {
  return {
    queryKey: getChatkitThreadsQueryKey(options),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.chatkit.threads.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useChatkitThreads<
  TData = Extract<Awaited<ReturnType<typeof client.chatkit.threads.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.chatkit.threads.get>>['error'], null>,
>(
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<Awaited<ReturnType<typeof client.chatkit.threads.get>>, { error: null }>['data'],
          TError,
          TData,
          Extract<Awaited<ReturnType<typeof client.chatkit.threads.get>>, { error: null }>['data'],
          ReturnType<typeof getChatkitThreadsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.chatkit.threads.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: getChatkitThreadsQueryKey(clientOptions),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.chatkit.threads.get({
          ...clientOptions,
          fetch: { ...clientOptions?.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostDecisionsMutationKey() {
  return ['decisions', '/decisions', 'POST'] as const
}

export function getPostDecisionsMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.decisions.post>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.decisions.post>>, { error: null }>['data'],
    TError,
    {
      body: Parameters<typeof client.decisions.post>[0]
      options?: Parameters<typeof client.decisions.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostDecisionsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.decisions.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostDecisions<
  TError = Exclude<Awaited<ReturnType<typeof client.decisions.post>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<Awaited<ReturnType<typeof client.decisions.post>>, { error: null }>['data'],
          TError,
          {
            body: Parameters<typeof client.decisions.post>[0]
            options?: Parameters<typeof client.decisions.post>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostDecisionsMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getAgentsAutomationsQueryKey(
  options?: Parameters<typeof client.agents.automations.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['agents', '/agents/automations', keyArgs] as const
}

export function getAgentsAutomationsQueryOptions(
  options?: Parameters<typeof client.agents.automations.get>[0],
) {
  return {
    queryKey: getAgentsAutomationsQueryKey(options),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.agents.automations.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useAgentsAutomations<
  TData = Extract<
    Awaited<ReturnType<typeof client.agents.automations.get>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.agents.automations.get>>['error'], null>,
>(
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<typeof client.agents.automations.get>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<typeof client.agents.automations.get>>,
            { error: null }
          >['data'],
          ReturnType<typeof getAgentsAutomationsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.agents.automations.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: getAgentsAutomationsQueryKey(clientOptions),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.agents.automations.get({
          ...clientOptions,
          fetch: { ...clientOptions?.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostAgentsAutomationsMutationKey() {
  return ['agents', '/agents/automations', 'POST'] as const
}

export function getPostAgentsAutomationsMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.agents.automations.post>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.agents.automations.post>>, { error: null }>['data'],
    TError,
    {
      body: Parameters<typeof client.agents.automations.post>[0]
      options?: Parameters<typeof client.agents.automations.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostAgentsAutomationsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.agents.automations.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostAgentsAutomations<
  TError = Exclude<Awaited<ReturnType<typeof client.agents.automations.post>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<typeof client.agents.automations.post>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<typeof client.agents.automations.post>[0]
            options?: Parameters<typeof client.agents.automations.post>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostAgentsAutomationsMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getAgentsAutomationsAutomationIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.agents.automations>[0]>,
) {
  return ['agents', '/agents/automations/{automation_id}', toValue(params)] as const
}

export function getAgentsAutomationsAutomationIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.agents.automations>[0]>,
  options?: Parameters<ReturnType<typeof client.agents.automations>['get']>[0],
) {
  return {
    queryKey: computed(() => getAgentsAutomationsAutomationIdQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.agents
        .automations(toValue(params))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useAgentsAutomationsAutomationId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.agents.automations>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.agents.automations>['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.agents.automations>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.agents.automations>['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.agents.automations>['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getAgentsAutomationsAutomationIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.agents.automations>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getAgentsAutomationsAutomationIdQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.agents
          .automations(toValue(params))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostAgentsAutomationsAutomationIdMutationKey() {
  return ['agents', '/agents/automations/{automation_id}', 'POST'] as const
}

export function getPostAgentsAutomationsAutomationIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.agents.automations>['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.agents.automations>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.agents.automations>['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.agents.automations>['post']>[0]
      options?: Parameters<ReturnType<typeof client.agents.automations>['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostAgentsAutomationsAutomationIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.agents.automations(toValue(params)).post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostAgentsAutomationsAutomationId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.agents.automations>['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.agents.automations>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.agents.automations>['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.agents.automations>['post']>[0]
            options?: Parameters<ReturnType<typeof client.agents.automations>['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostAgentsAutomationsAutomationIdMutationOptions<
    TError,
    TOnMutateResult
  >(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getDeleteAgentsAutomationsAutomationIdMutationKey() {
  return ['agents', '/agents/automations/{automation_id}', 'DELETE'] as const
}

export function getDeleteAgentsAutomationsAutomationIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.agents.automations>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.agents.automations>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.agents.automations>['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<typeof client.agents.automations>['delete']>[0]
      options?: Parameters<ReturnType<typeof client.agents.automations>['delete']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteAgentsAutomationsAutomationIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.agents.automations(toValue(params)).delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeleteAgentsAutomationsAutomationId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.agents.automations>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.agents.automations>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.agents.automations>['delete']>>,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<ReturnType<typeof client.agents.automations>['delete']>[0]
            options?: Parameters<ReturnType<typeof client.agents.automations>['delete']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteAgentsAutomationsAutomationIdMutationOptions<
    TError,
    TOnMutateResult
  >(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPostAgentsAutomationsAutomationIdPauseMutationKey() {
  return ['agents', '/agents/automations/{automation_id}/pause', 'POST'] as const
}

export function getPostAgentsAutomationsAutomationIdPauseMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.agents.automations>['pause']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.agents.automations>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.agents.automations>['pause']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<typeof client.agents.automations>['pause']['post']>[0]
      options?: Parameters<ReturnType<typeof client.agents.automations>['pause']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostAgentsAutomationsAutomationIdPauseMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.agents
        .automations(toValue(params))
        .pause.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostAgentsAutomationsAutomationIdPause<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.agents.automations>['pause']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.agents.automations>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.agents.automations>['pause']['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<ReturnType<typeof client.agents.automations>['pause']['post']>[0]
            options?: Parameters<ReturnType<typeof client.agents.automations>['pause']['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostAgentsAutomationsAutomationIdPauseMutationOptions<
    TError,
    TOnMutateResult
  >(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPostAgentsAutomationsAutomationIdResumeMutationKey() {
  return ['agents', '/agents/automations/{automation_id}/resume', 'POST'] as const
}

export function getPostAgentsAutomationsAutomationIdResumeMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.agents.automations>['resume']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.agents.automations>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.agents.automations>['resume']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<typeof client.agents.automations>['resume']['post']>[0]
      options?: Parameters<ReturnType<typeof client.agents.automations>['resume']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostAgentsAutomationsAutomationIdResumeMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.agents
        .automations(toValue(params))
        .resume.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostAgentsAutomationsAutomationIdResume<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.agents.automations>['resume']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.agents.automations>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.agents.automations>['resume']['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<ReturnType<typeof client.agents.automations>['resume']['post']>[0]
            options?: Parameters<ReturnType<typeof client.agents.automations>['resume']['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostAgentsAutomationsAutomationIdResumeMutationOptions<
    TError,
    TOnMutateResult
  >(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getAgentsAutomationsAutomationIdInvocationsQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.agents.automations>[0]>,
  options?: Parameters<ReturnType<typeof client.agents.automations>['invocations']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'agents',
    '/agents/automations/{automation_id}/invocations',
    toValue(params),
    keyArgs,
  ] as const
}

export function getAgentsAutomationsAutomationIdInvocationsQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.agents.automations>[0]>,
  options?: Parameters<ReturnType<typeof client.agents.automations>['invocations']['get']>[0],
) {
  return {
    queryKey: computed(() => getAgentsAutomationsAutomationIdInvocationsQueryKey(params, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.agents
        .automations(toValue(params))
        .invocations.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useAgentsAutomationsAutomationIdInvocations<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.agents.automations>['invocations']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.agents.automations>['invocations']['get']>
    >['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.agents.automations>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.agents.automations>['invocations']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.agents.automations>['invocations']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getAgentsAutomationsAutomationIdInvocationsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.agents.automations>['invocations']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() =>
        getAgentsAutomationsAutomationIdInvocationsQueryKey(params, clientOptions),
      ),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.agents
          .automations(toValue(params))
          .invocations.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostAgentsAutomationsAutomationIdInvocationsMutationKey() {
  return ['agents', '/agents/automations/{automation_id}/invocations', 'POST'] as const
}

export function getPostAgentsAutomationsAutomationIdInvocationsMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.agents.automations>['invocations']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.agents.automations>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.agents.automations>['invocations']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<typeof client.agents.automations>['invocations']['post']>[0]
      options?: Parameters<ReturnType<typeof client.agents.automations>['invocations']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostAgentsAutomationsAutomationIdInvocationsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.agents
        .automations(toValue(params))
        .invocations.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostAgentsAutomationsAutomationIdInvocations<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.agents.automations>['invocations']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.agents.automations>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<ReturnType<typeof client.agents.automations>['invocations']['post']>
            >,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<
              ReturnType<typeof client.agents.automations>['invocations']['post']
            >[0]
            options?: Parameters<
              ReturnType<typeof client.agents.automations>['invocations']['post']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostAgentsAutomationsAutomationIdInvocationsMutationOptions<
    TError,
    TOnMutateResult
  >(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getAgentsAutomationsAutomationIdInvocationsInvocationIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.agents.automations>[0]>,
  params2: MaybeRefOrGetter<
    Parameters<ReturnType<typeof client.agents.automations>['invocations']>[0]
  >,
) {
  return [
    'agents',
    '/agents/automations/{automation_id}/invocations/{invocation_id}',
    toValue(params),
    toValue(params2),
  ] as const
}

export function getAgentsAutomationsAutomationIdInvocationsInvocationIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.agents.automations>[0]>,
  params2: MaybeRefOrGetter<
    Parameters<ReturnType<typeof client.agents.automations>['invocations']>[0]
  >,
  options?: Parameters<
    ReturnType<ReturnType<typeof client.agents.automations>['invocations']>['get']
  >[0],
) {
  return {
    queryKey: computed(() =>
      getAgentsAutomationsAutomationIdInvocationsInvocationIdQueryKey(params, params2),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.agents
        .automations(toValue(params))
        .invocations(toValue(params2))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useAgentsAutomationsAutomationIdInvocationsInvocationId<
  TData = Extract<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.agents.automations>['invocations']>['get']>
    >,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.agents.automations>['invocations']>['get']>
    >['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.agents.automations>[0]>,
  params2: MaybeRefOrGetter<
    Parameters<ReturnType<typeof client.agents.automations>['invocations']>[0]
  >,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<
              ReturnType<
                ReturnType<ReturnType<typeof client.agents.automations>['invocations']>['get']
              >
            >,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<
              ReturnType<
                ReturnType<ReturnType<typeof client.agents.automations>['invocations']>['get']
              >
            >,
            { error: null }
          >['data'],
          ReturnType<typeof getAgentsAutomationsAutomationIdInvocationsInvocationIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<
      ReturnType<ReturnType<typeof client.agents.automations>['invocations']>['get']
    >[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() =>
        getAgentsAutomationsAutomationIdInvocationsInvocationIdQueryKey(params, params2),
      ),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.agents
          .automations(toValue(params))
          .invocations(toValue(params2))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getAgentsEnvironmentsQueryKey(
  options?: Parameters<typeof client.agents.environments.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['agents', '/agents/environments', keyArgs] as const
}

export function getAgentsEnvironmentsQueryOptions(
  options?: Parameters<typeof client.agents.environments.get>[0],
) {
  return {
    queryKey: getAgentsEnvironmentsQueryKey(options),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.agents.environments.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useAgentsEnvironments<
  TData = Extract<
    Awaited<ReturnType<typeof client.agents.environments.get>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.agents.environments.get>>['error'], null>,
>(
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<typeof client.agents.environments.get>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<typeof client.agents.environments.get>>,
            { error: null }
          >['data'],
          ReturnType<typeof getAgentsEnvironmentsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.agents.environments.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: getAgentsEnvironmentsQueryKey(clientOptions),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.agents.environments.get({
          ...clientOptions,
          fetch: { ...clientOptions?.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostAgentsEnvironmentsMutationKey() {
  return ['agents', '/agents/environments', 'POST'] as const
}

export function getPostAgentsEnvironmentsMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.agents.environments.post>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.agents.environments.post>>, { error: null }>['data'],
    TError,
    {
      body: Parameters<typeof client.agents.environments.post>[0]
      options?: Parameters<typeof client.agents.environments.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostAgentsEnvironmentsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.agents.environments.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostAgentsEnvironments<
  TError = Exclude<Awaited<ReturnType<typeof client.agents.environments.post>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<typeof client.agents.environments.post>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<typeof client.agents.environments.post>[0]
            options?: Parameters<typeof client.agents.environments.post>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostAgentsEnvironmentsMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getAgentsEnvironmentsEnvironmentIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.agents.environments>[0]>,
) {
  return ['agents', '/agents/environments/{environment_id}', toValue(params)] as const
}

export function getAgentsEnvironmentsEnvironmentIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.agents.environments>[0]>,
  options?: Parameters<ReturnType<typeof client.agents.environments>['get']>[0],
) {
  return {
    queryKey: computed(() => getAgentsEnvironmentsEnvironmentIdQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.agents
        .environments(toValue(params))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useAgentsEnvironmentsEnvironmentId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.agents.environments>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.agents.environments>['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.agents.environments>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.agents.environments>['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.agents.environments>['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getAgentsEnvironmentsEnvironmentIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.agents.environments>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getAgentsEnvironmentsEnvironmentIdQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.agents
          .environments(toValue(params))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getAgentsEnvironmentsEnvironmentIdFilesQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.agents.environments>[0]>,
  options?: Parameters<ReturnType<typeof client.agents.environments>['files']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'agents',
    '/agents/environments/{environment_id}/files',
    toValue(params),
    keyArgs,
  ] as const
}

export function getAgentsEnvironmentsEnvironmentIdFilesQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.agents.environments>[0]>,
  options?: Parameters<ReturnType<typeof client.agents.environments>['files']['get']>[0],
) {
  return {
    queryKey: computed(() => getAgentsEnvironmentsEnvironmentIdFilesQueryKey(params, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.agents
        .environments(toValue(params))
        .files.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useAgentsEnvironmentsEnvironmentIdFiles<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.agents.environments>['files']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.agents.environments>['files']['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.agents.environments>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.agents.environments>['files']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.agents.environments>['files']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getAgentsEnvironmentsEnvironmentIdFilesQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.agents.environments>['files']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() =>
        getAgentsEnvironmentsEnvironmentIdFilesQueryKey(params, clientOptions),
      ),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.agents
          .environments(toValue(params))
          .files.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostAgentsEnvironmentsEnvironmentIdFilesMutationKey() {
  return ['agents', '/agents/environments/{environment_id}/files', 'POST'] as const
}

export function getPostAgentsEnvironmentsEnvironmentIdFilesMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.agents.environments>['files']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.agents.environments>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.agents.environments>['files']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.agents.environments>['files']['post']>[0]
      options?: Parameters<ReturnType<typeof client.agents.environments>['files']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostAgentsEnvironmentsEnvironmentIdFilesMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.agents
        .environments(toValue(params))
        .files.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostAgentsEnvironmentsEnvironmentIdFiles<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.agents.environments>['files']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.agents.environments>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.agents.environments>['files']['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.agents.environments>['files']['post']>[0]
            options?: Parameters<ReturnType<typeof client.agents.environments>['files']['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostAgentsEnvironmentsEnvironmentIdFilesMutationOptions<
    TError,
    TOnMutateResult
  >(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getAgentsSessionsSessionIdSubagentsQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.agents.sessions>[0]>,
  options?: Parameters<ReturnType<typeof client.agents.sessions>['subagents']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['agents', '/agents/sessions/{session_id}/subagents', toValue(params), keyArgs] as const
}

export function getAgentsSessionsSessionIdSubagentsQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.agents.sessions>[0]>,
  options?: Parameters<ReturnType<typeof client.agents.sessions>['subagents']['get']>[0],
) {
  return {
    queryKey: computed(() => getAgentsSessionsSessionIdSubagentsQueryKey(params, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.agents
        .sessions(toValue(params))
        .subagents.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useAgentsSessionsSessionIdSubagents<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['subagents']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['subagents']['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.agents.sessions>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['subagents']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['subagents']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getAgentsSessionsSessionIdSubagentsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.agents.sessions>['subagents']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getAgentsSessionsSessionIdSubagentsQueryKey(params, clientOptions)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.agents
          .sessions(toValue(params))
          .subagents.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getAgentsSessionsSessionIdSubagentsSubagentIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.agents.sessions>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.agents.sessions>['subagents']>[0]>,
) {
  return [
    'agents',
    '/agents/sessions/{session_id}/subagents/{subagent_id}',
    toValue(params),
    toValue(params2),
  ] as const
}

export function getAgentsSessionsSessionIdSubagentsSubagentIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.agents.sessions>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.agents.sessions>['subagents']>[0]>,
  options?: Parameters<
    ReturnType<ReturnType<typeof client.agents.sessions>['subagents']>['get']
  >[0],
) {
  return {
    queryKey: computed(() =>
      getAgentsSessionsSessionIdSubagentsSubagentIdQueryKey(params, params2),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.agents
        .sessions(toValue(params))
        .subagents(toValue(params2))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useAgentsSessionsSessionIdSubagentsSubagentId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.agents.sessions>['subagents']>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.agents.sessions>['subagents']>['get']>
    >['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.agents.sessions>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.agents.sessions>['subagents']>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<
              ReturnType<ReturnType<ReturnType<typeof client.agents.sessions>['subagents']>['get']>
            >,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<
              ReturnType<ReturnType<ReturnType<typeof client.agents.sessions>['subagents']>['get']>
            >,
            { error: null }
          >['data'],
          ReturnType<typeof getAgentsSessionsSessionIdSubagentsSubagentIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<
      ReturnType<ReturnType<typeof client.agents.sessions>['subagents']>['get']
    >[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() =>
        getAgentsSessionsSessionIdSubagentsSubagentIdQueryKey(params, params2),
      ),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.agents
          .sessions(toValue(params))
          .subagents(toValue(params2))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getAgentsSessionsSessionIdSubagentsSubagentIdItemsQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.agents.sessions>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.agents.sessions>['subagents']>[0]>,
  options?: Parameters<
    ReturnType<ReturnType<typeof client.agents.sessions>['subagents']>['items']['get']
  >[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'agents',
    '/agents/sessions/{session_id}/subagents/{subagent_id}/items',
    toValue(params),
    toValue(params2),
    keyArgs,
  ] as const
}

export function getAgentsSessionsSessionIdSubagentsSubagentIdItemsQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.agents.sessions>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.agents.sessions>['subagents']>[0]>,
  options?: Parameters<
    ReturnType<ReturnType<typeof client.agents.sessions>['subagents']>['items']['get']
  >[0],
) {
  return {
    queryKey: computed(() =>
      getAgentsSessionsSessionIdSubagentsSubagentIdItemsQueryKey(params, params2, options),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.agents
        .sessions(toValue(params))
        .subagents(toValue(params2))
        .items.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useAgentsSessionsSessionIdSubagentsSubagentIdItems<
  TData = Extract<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.agents.sessions>['subagents']>['items']['get']>
    >,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.agents.sessions>['subagents']>['items']['get']>
    >['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.agents.sessions>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.agents.sessions>['subagents']>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<
              ReturnType<
                ReturnType<ReturnType<typeof client.agents.sessions>['subagents']>['items']['get']
              >
            >,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<
              ReturnType<
                ReturnType<ReturnType<typeof client.agents.sessions>['subagents']>['items']['get']
              >
            >,
            { error: null }
          >['data'],
          ReturnType<typeof getAgentsSessionsSessionIdSubagentsSubagentIdItemsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<
      ReturnType<ReturnType<typeof client.agents.sessions>['subagents']>['items']['get']
    >[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() =>
        getAgentsSessionsSessionIdSubagentsSubagentIdItemsQueryKey(params, params2, clientOptions),
      ),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.agents
          .sessions(toValue(params))
          .subagents(toValue(params2))
          .items.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getAgentsSessionsSessionIdSubagentsSubagentIdTurnsQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.agents.sessions>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.agents.sessions>['subagents']>[0]>,
  options?: Parameters<
    ReturnType<ReturnType<typeof client.agents.sessions>['subagents']>['turns']['get']
  >[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'agents',
    '/agents/sessions/{session_id}/subagents/{subagent_id}/turns',
    toValue(params),
    toValue(params2),
    keyArgs,
  ] as const
}

export function getAgentsSessionsSessionIdSubagentsSubagentIdTurnsQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.agents.sessions>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.agents.sessions>['subagents']>[0]>,
  options?: Parameters<
    ReturnType<ReturnType<typeof client.agents.sessions>['subagents']>['turns']['get']
  >[0],
) {
  return {
    queryKey: computed(() =>
      getAgentsSessionsSessionIdSubagentsSubagentIdTurnsQueryKey(params, params2, options),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.agents
        .sessions(toValue(params))
        .subagents(toValue(params2))
        .turns.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useAgentsSessionsSessionIdSubagentsSubagentIdTurns<
  TData = Extract<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.agents.sessions>['subagents']>['turns']['get']>
    >,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.agents.sessions>['subagents']>['turns']['get']>
    >['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.agents.sessions>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.agents.sessions>['subagents']>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<
              ReturnType<
                ReturnType<ReturnType<typeof client.agents.sessions>['subagents']>['turns']['get']
              >
            >,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<
              ReturnType<
                ReturnType<ReturnType<typeof client.agents.sessions>['subagents']>['turns']['get']
              >
            >,
            { error: null }
          >['data'],
          ReturnType<typeof getAgentsSessionsSessionIdSubagentsSubagentIdTurnsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<
      ReturnType<ReturnType<typeof client.agents.sessions>['subagents']>['turns']['get']
    >[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() =>
        getAgentsSessionsSessionIdSubagentsSubagentIdTurnsQueryKey(params, params2, clientOptions),
      ),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.agents
          .sessions(toValue(params))
          .subagents(toValue(params2))
          .turns.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getAgentsSessionsSessionIdSubagentsSubagentIdTurnsTurnIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.agents.sessions>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.agents.sessions>['subagents']>[0]>,
  params3: MaybeRefOrGetter<
    Parameters<ReturnType<ReturnType<typeof client.agents.sessions>['subagents']>['turns']>[0]
  >,
) {
  return [
    'agents',
    '/agents/sessions/{session_id}/subagents/{subagent_id}/turns/{turn_id}',
    toValue(params),
    toValue(params2),
    toValue(params3),
  ] as const
}

export function getAgentsSessionsSessionIdSubagentsSubagentIdTurnsTurnIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.agents.sessions>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.agents.sessions>['subagents']>[0]>,
  params3: MaybeRefOrGetter<
    Parameters<ReturnType<ReturnType<typeof client.agents.sessions>['subagents']>['turns']>[0]
  >,
  options?: Parameters<
    ReturnType<ReturnType<ReturnType<typeof client.agents.sessions>['subagents']>['turns']>['get']
  >[0],
) {
  return {
    queryKey: computed(() =>
      getAgentsSessionsSessionIdSubagentsSubagentIdTurnsTurnIdQueryKey(params, params2, params3),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.agents
        .sessions(toValue(params))
        .subagents(toValue(params2))
        .turns(toValue(params3))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useAgentsSessionsSessionIdSubagentsSubagentIdTurnsTurnId<
  TData = Extract<
    Awaited<
      ReturnType<
        ReturnType<
          ReturnType<ReturnType<typeof client.agents.sessions>['subagents']>['turns']
        >['get']
      >
    >,
    { error: null }
  >['data'],
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
  params: MaybeRefOrGetter<Parameters<typeof client.agents.sessions>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.agents.sessions>['subagents']>[0]>,
  params3: MaybeRefOrGetter<
    Parameters<ReturnType<ReturnType<typeof client.agents.sessions>['subagents']>['turns']>[0]
  >,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
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
          TError,
          TData,
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
          ReturnType<typeof getAgentsSessionsSessionIdSubagentsSubagentIdTurnsTurnIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<
      ReturnType<ReturnType<ReturnType<typeof client.agents.sessions>['subagents']>['turns']>['get']
    >[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() =>
        getAgentsSessionsSessionIdSubagentsSubagentIdTurnsTurnIdQueryKey(params, params2, params3),
      ),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.agents
          .sessions(toValue(params))
          .subagents(toValue(params2))
          .turns(toValue(params3))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getAgentsSessionsSessionIdSubagentsSubagentIdTurnsTurnIdItemsQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.agents.sessions>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.agents.sessions>['subagents']>[0]>,
  params3: MaybeRefOrGetter<
    Parameters<ReturnType<ReturnType<typeof client.agents.sessions>['subagents']>['turns']>[0]
  >,
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
    toValue(params),
    toValue(params2),
    toValue(params3),
    keyArgs,
  ] as const
}

export function getAgentsSessionsSessionIdSubagentsSubagentIdTurnsTurnIdItemsQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.agents.sessions>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.agents.sessions>['subagents']>[0]>,
  params3: MaybeRefOrGetter<
    Parameters<ReturnType<ReturnType<typeof client.agents.sessions>['subagents']>['turns']>[0]
  >,
  options?: Parameters<
    ReturnType<
      ReturnType<ReturnType<typeof client.agents.sessions>['subagents']>['turns']
    >['items']['get']
  >[0],
) {
  return {
    queryKey: computed(() =>
      getAgentsSessionsSessionIdSubagentsSubagentIdTurnsTurnIdItemsQueryKey(
        params,
        params2,
        params3,
        options,
      ),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.agents
        .sessions(toValue(params))
        .subagents(toValue(params2))
        .turns(toValue(params3))
        .items.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useAgentsSessionsSessionIdSubagentsSubagentIdTurnsTurnIdItems<
  TData = Extract<
    Awaited<
      ReturnType<
        ReturnType<
          ReturnType<ReturnType<typeof client.agents.sessions>['subagents']>['turns']
        >['items']['get']
      >
    >,
    { error: null }
  >['data'],
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
  params: MaybeRefOrGetter<Parameters<typeof client.agents.sessions>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.agents.sessions>['subagents']>[0]>,
  params3: MaybeRefOrGetter<
    Parameters<ReturnType<ReturnType<typeof client.agents.sessions>['subagents']>['turns']>[0]
  >,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
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
          TError,
          TData,
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
          ReturnType<typeof getAgentsSessionsSessionIdSubagentsSubagentIdTurnsTurnIdItemsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<
      ReturnType<
        ReturnType<ReturnType<typeof client.agents.sessions>['subagents']>['turns']
      >['items']['get']
    >[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() =>
        getAgentsSessionsSessionIdSubagentsSubagentIdTurnsTurnIdItemsQueryKey(
          params,
          params2,
          params3,
          clientOptions,
        ),
      ),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.agents
          .sessions(toValue(params))
          .subagents(toValue(params2))
          .turns(toValue(params3))
          .items.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getAgentsQueryKey(options?: Parameters<typeof client.agents.get>[0]) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['agents', '/agents', keyArgs] as const
}

export function getAgentsQueryOptions(options?: Parameters<typeof client.agents.get>[0]) {
  return {
    queryKey: getAgentsQueryKey(options),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.agents.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useAgents<
  TData = Extract<Awaited<ReturnType<typeof client.agents.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.agents.get>>['error'], null>,
>(
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<Awaited<ReturnType<typeof client.agents.get>>, { error: null }>['data'],
          TError,
          TData,
          Extract<Awaited<ReturnType<typeof client.agents.get>>, { error: null }>['data'],
          ReturnType<typeof getAgentsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.agents.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: getAgentsQueryKey(clientOptions),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.agents.get({
          ...clientOptions,
          fetch: { ...clientOptions?.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostAgentsMutationKey() {
  return ['agents', '/agents', 'POST'] as const
}

export function getPostAgentsMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.agents.post>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.agents.post>>, { error: null }>['data'],
    TError,
    {
      body: Parameters<typeof client.agents.post>[0]
      options?: Parameters<typeof client.agents.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostAgentsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.agents.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostAgents<
  TError = Exclude<Awaited<ReturnType<typeof client.agents.post>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<Awaited<ReturnType<typeof client.agents.post>>, { error: null }>['data'],
          TError,
          {
            body: Parameters<typeof client.agents.post>[0]
            options?: Parameters<typeof client.agents.post>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostAgentsMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getAgentsAgentIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.agents>[0]>,
) {
  return ['agents', '/agents/{agent_id}', toValue(params)] as const
}

export function getAgentsAgentIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.agents>[0]>,
  options?: Parameters<ReturnType<typeof client.agents>['get']>[0],
) {
  return {
    queryKey: computed(() => getAgentsAgentIdQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .agents(toValue(params))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useAgentsAgentId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.agents>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.agents>['get']>>['error'], null>,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.agents>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.agents>['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.agents>['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getAgentsAgentIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.agents>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getAgentsAgentIdQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .agents(toValue(params))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostAgentsAgentIdMutationKey() {
  return ['agents', '/agents/{agent_id}', 'POST'] as const
}

export function getPostAgentsAgentIdMutationOptions<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.agents>['post']>>['error'], null>,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.agents>[0]>) {
  return mutationOptions<
    Extract<Awaited<ReturnType<ReturnType<typeof client.agents>['post']>>, { error: null }>['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.agents>['post']>[0]
      options?: Parameters<ReturnType<typeof client.agents>['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostAgentsAgentIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.agents(toValue(params)).post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostAgentsAgentId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.agents>['post']>>['error'], null>,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.agents>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.agents>['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.agents>['post']>[0]
            options?: Parameters<ReturnType<typeof client.agents>['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostAgentsAgentIdMutationOptions<TError, TOnMutateResult>(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getDeleteAgentsAgentIdMutationKey() {
  return ['agents', '/agents/{agent_id}', 'DELETE'] as const
}

export function getDeleteAgentsAgentIdMutationOptions<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.agents>['delete']>>['error'], null>,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.agents>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.agents>['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<typeof client.agents>['delete']>[0]
      options?: Parameters<ReturnType<typeof client.agents>['delete']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteAgentsAgentIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.agents(toValue(params)).delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeleteAgentsAgentId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.agents>['delete']>>['error'], null>,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.agents>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.agents>['delete']>>,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<ReturnType<typeof client.agents>['delete']>[0]
            options?: Parameters<ReturnType<typeof client.agents>['delete']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteAgentsAgentIdMutationOptions<TError, TOnMutateResult>(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getAgentsEnvironmentsTemplatesQueryKey(
  options?: Parameters<typeof client.agents.environments.templates.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['agents', '/agents/environments/templates', keyArgs] as const
}

export function getAgentsEnvironmentsTemplatesQueryOptions(
  options?: Parameters<typeof client.agents.environments.templates.get>[0],
) {
  return {
    queryKey: getAgentsEnvironmentsTemplatesQueryKey(options),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.agents.environments.templates.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useAgentsEnvironmentsTemplates<
  TData = Extract<
    Awaited<ReturnType<typeof client.agents.environments.templates.get>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<typeof client.agents.environments.templates.get>>['error'],
    null
  >,
>(
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<typeof client.agents.environments.templates.get>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<typeof client.agents.environments.templates.get>>,
            { error: null }
          >['data'],
          ReturnType<typeof getAgentsEnvironmentsTemplatesQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.agents.environments.templates.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: getAgentsEnvironmentsTemplatesQueryKey(clientOptions),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.agents.environments.templates.get({
          ...clientOptions,
          fetch: { ...clientOptions?.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostAgentsEnvironmentsTemplatesMutationKey() {
  return ['agents', '/agents/environments/templates', 'POST'] as const
}

export function getPostAgentsEnvironmentsTemplatesMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<typeof client.agents.environments.templates.post>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<typeof client.agents.environments.templates.post>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<typeof client.agents.environments.templates.post>[0]
      options?: Parameters<typeof client.agents.environments.templates.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostAgentsEnvironmentsTemplatesMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.agents.environments.templates.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostAgentsEnvironmentsTemplates<
  TError = Exclude<
    Awaited<ReturnType<typeof client.agents.environments.templates.post>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<typeof client.agents.environments.templates.post>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<typeof client.agents.environments.templates.post>[0]
            options?: Parameters<typeof client.agents.environments.templates.post>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostAgentsEnvironmentsTemplatesMutationOptions<
    TError,
    TOnMutateResult
  >()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getAgentsEnvironmentsTemplatesEnvironmentTemplateIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.agents.environments.templates>[0]>,
) {
  return [
    'agents',
    '/agents/environments/templates/{environment_template_id}',
    toValue(params),
  ] as const
}

export function getAgentsEnvironmentsTemplatesEnvironmentTemplateIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.agents.environments.templates>[0]>,
  options?: Parameters<ReturnType<typeof client.agents.environments.templates>['get']>[0],
) {
  return {
    queryKey: computed(() => getAgentsEnvironmentsTemplatesEnvironmentTemplateIdQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.agents.environments
        .templates(toValue(params))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useAgentsEnvironmentsTemplatesEnvironmentTemplateId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.agents.environments.templates>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.agents.environments.templates>['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.agents.environments.templates>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.agents.environments.templates>['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.agents.environments.templates>['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getAgentsEnvironmentsTemplatesEnvironmentTemplateIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.agents.environments.templates>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getAgentsEnvironmentsTemplatesEnvironmentTemplateIdQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.agents.environments
          .templates(toValue(params))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostAgentsEnvironmentsTemplatesEnvironmentTemplateIdMutationKey() {
  return ['agents', '/agents/environments/templates/{environment_template_id}', 'POST'] as const
}

export function getPostAgentsEnvironmentsTemplatesEnvironmentTemplateIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.agents.environments.templates>['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.agents.environments.templates>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.agents.environments.templates>['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.agents.environments.templates>['post']>[0]
      options?: Parameters<ReturnType<typeof client.agents.environments.templates>['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostAgentsEnvironmentsTemplatesEnvironmentTemplateIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.agents.environments
        .templates(toValue(params))
        .post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostAgentsEnvironmentsTemplatesEnvironmentTemplateId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.agents.environments.templates>['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.agents.environments.templates>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.agents.environments.templates>['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.agents.environments.templates>['post']>[0]
            options?: Parameters<ReturnType<typeof client.agents.environments.templates>['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostAgentsEnvironmentsTemplatesEnvironmentTemplateIdMutationOptions<
    TError,
    TOnMutateResult
  >(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getDeleteAgentsEnvironmentsTemplatesEnvironmentTemplateIdMutationKey() {
  return ['agents', '/agents/environments/templates/{environment_template_id}', 'DELETE'] as const
}

export function getDeleteAgentsEnvironmentsTemplatesEnvironmentTemplateIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.agents.environments.templates>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.agents.environments.templates>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.agents.environments.templates>['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<typeof client.agents.environments.templates>['delete']>[0]
      options?: Parameters<ReturnType<typeof client.agents.environments.templates>['delete']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteAgentsEnvironmentsTemplatesEnvironmentTemplateIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.agents.environments
        .templates(toValue(params))
        .delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeleteAgentsEnvironmentsTemplatesEnvironmentTemplateId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.agents.environments.templates>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.agents.environments.templates>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.agents.environments.templates>['delete']>>,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<ReturnType<typeof client.agents.environments.templates>['delete']>[0]
            options?: Parameters<
              ReturnType<typeof client.agents.environments.templates>['delete']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteAgentsEnvironmentsTemplatesEnvironmentTemplateIdMutationOptions<
    TError,
    TOnMutateResult
  >(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getAgentsSessionsQueryKey(
  options?: Parameters<typeof client.agents.sessions.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['agents', '/agents/sessions', keyArgs] as const
}

export function getAgentsSessionsQueryOptions(
  options?: Parameters<typeof client.agents.sessions.get>[0],
) {
  return {
    queryKey: getAgentsSessionsQueryKey(options),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.agents.sessions.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useAgentsSessions<
  TData = Extract<Awaited<ReturnType<typeof client.agents.sessions.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.agents.sessions.get>>['error'], null>,
>(
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<Awaited<ReturnType<typeof client.agents.sessions.get>>, { error: null }>['data'],
          TError,
          TData,
          Extract<Awaited<ReturnType<typeof client.agents.sessions.get>>, { error: null }>['data'],
          ReturnType<typeof getAgentsSessionsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.agents.sessions.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: getAgentsSessionsQueryKey(clientOptions),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.agents.sessions.get({
          ...clientOptions,
          fetch: { ...clientOptions?.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostAgentsSessionsMutationKey() {
  return ['agents', '/agents/sessions', 'POST'] as const
}

export function getPostAgentsSessionsMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.agents.sessions.post>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.agents.sessions.post>>, { error: null }>['data'],
    TError,
    {
      body: Parameters<typeof client.agents.sessions.post>[0]
      options?: Parameters<typeof client.agents.sessions.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostAgentsSessionsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.agents.sessions.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostAgentsSessions<
  TError = Exclude<Awaited<ReturnType<typeof client.agents.sessions.post>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<Awaited<ReturnType<typeof client.agents.sessions.post>>, { error: null }>['data'],
          TError,
          {
            body: Parameters<typeof client.agents.sessions.post>[0]
            options?: Parameters<typeof client.agents.sessions.post>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostAgentsSessionsMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getAgentsSessionsSessionIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.agents.sessions>[0]>,
) {
  return ['agents', '/agents/sessions/{session_id}', toValue(params)] as const
}

export function getAgentsSessionsSessionIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.agents.sessions>[0]>,
  options?: Parameters<ReturnType<typeof client.agents.sessions>['get']>[0],
) {
  return {
    queryKey: computed(() => getAgentsSessionsSessionIdQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.agents
        .sessions(toValue(params))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useAgentsSessionsSessionId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.agents.sessions>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getAgentsSessionsSessionIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.agents.sessions>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getAgentsSessionsSessionIdQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.agents
          .sessions(toValue(params))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostAgentsSessionsSessionIdMutationKey() {
  return ['agents', '/agents/sessions/{session_id}', 'POST'] as const
}

export function getPostAgentsSessionsSessionIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.agents.sessions>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.agents.sessions>['post']>[0]
      options?: Parameters<ReturnType<typeof client.agents.sessions>['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostAgentsSessionsSessionIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.agents.sessions(toValue(params)).post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostAgentsSessionsSessionId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.agents.sessions>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.agents.sessions>['post']>[0]
            options?: Parameters<ReturnType<typeof client.agents.sessions>['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostAgentsSessionsSessionIdMutationOptions<TError, TOnMutateResult>(
    params,
  )
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getDeleteAgentsSessionsSessionIdMutationKey() {
  return ['agents', '/agents/sessions/{session_id}', 'DELETE'] as const
}

export function getDeleteAgentsSessionsSessionIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.agents.sessions>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<typeof client.agents.sessions>['delete']>[0]
      options?: Parameters<ReturnType<typeof client.agents.sessions>['delete']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteAgentsSessionsSessionIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.agents.sessions(toValue(params)).delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeleteAgentsSessionsSessionId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.agents.sessions>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['delete']>>,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<ReturnType<typeof client.agents.sessions>['delete']>[0]
            options?: Parameters<ReturnType<typeof client.agents.sessions>['delete']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteAgentsSessionsSessionIdMutationOptions<TError, TOnMutateResult>(
    params,
  )
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getAgentsSessionsSessionIdArtifactsQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.agents.sessions>[0]>,
  options?: Parameters<ReturnType<typeof client.agents.sessions>['artifacts']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['agents', '/agents/sessions/{session_id}/artifacts', toValue(params), keyArgs] as const
}

export function getAgentsSessionsSessionIdArtifactsQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.agents.sessions>[0]>,
  options?: Parameters<ReturnType<typeof client.agents.sessions>['artifacts']['get']>[0],
) {
  return {
    queryKey: computed(() => getAgentsSessionsSessionIdArtifactsQueryKey(params, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.agents
        .sessions(toValue(params))
        .artifacts.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useAgentsSessionsSessionIdArtifacts<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['artifacts']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['artifacts']['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.agents.sessions>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['artifacts']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['artifacts']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getAgentsSessionsSessionIdArtifactsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.agents.sessions>['artifacts']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getAgentsSessionsSessionIdArtifactsQueryKey(params, clientOptions)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.agents
          .sessions(toValue(params))
          .artifacts.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getAgentsSessionsSessionIdArtifactsArtifactIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.agents.sessions>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.agents.sessions>['artifacts']>[0]>,
) {
  return [
    'agents',
    '/agents/sessions/{session_id}/artifacts/{artifact_id}',
    toValue(params),
    toValue(params2),
  ] as const
}

export function getAgentsSessionsSessionIdArtifactsArtifactIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.agents.sessions>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.agents.sessions>['artifacts']>[0]>,
  options?: Parameters<
    ReturnType<ReturnType<typeof client.agents.sessions>['artifacts']>['get']
  >[0],
) {
  return {
    queryKey: computed(() =>
      getAgentsSessionsSessionIdArtifactsArtifactIdQueryKey(params, params2),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.agents
        .sessions(toValue(params))
        .artifacts(toValue(params2))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useAgentsSessionsSessionIdArtifactsArtifactId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.agents.sessions>['artifacts']>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.agents.sessions>['artifacts']>['get']>
    >['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.agents.sessions>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.agents.sessions>['artifacts']>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<
              ReturnType<ReturnType<ReturnType<typeof client.agents.sessions>['artifacts']>['get']>
            >,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<
              ReturnType<ReturnType<ReturnType<typeof client.agents.sessions>['artifacts']>['get']>
            >,
            { error: null }
          >['data'],
          ReturnType<typeof getAgentsSessionsSessionIdArtifactsArtifactIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<
      ReturnType<ReturnType<typeof client.agents.sessions>['artifacts']>['get']
    >[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() =>
        getAgentsSessionsSessionIdArtifactsArtifactIdQueryKey(params, params2),
      ),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.agents
          .sessions(toValue(params))
          .artifacts(toValue(params2))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getDeleteAgentsSessionsSessionIdArtifactsArtifactIdMutationKey() {
  return ['agents', '/agents/sessions/{session_id}/artifacts/{artifact_id}', 'DELETE'] as const
}

export function getDeleteAgentsSessionsSessionIdArtifactsArtifactIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.agents.sessions>['artifacts']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.agents.sessions>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.agents.sessions>['artifacts']>[0]>,
) {
  return mutationOptions<
    Extract<
      Awaited<
        ReturnType<ReturnType<ReturnType<typeof client.agents.sessions>['artifacts']>['delete']>
      >,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<
        ReturnType<ReturnType<typeof client.agents.sessions>['artifacts']>['delete']
      >[0]
      options?: Parameters<
        ReturnType<ReturnType<typeof client.agents.sessions>['artifacts']>['delete']
      >[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteAgentsSessionsSessionIdArtifactsArtifactIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.agents
        .sessions(toValue(params))
        .artifacts(toValue(params2))
        .delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeleteAgentsSessionsSessionIdArtifactsArtifactId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.agents.sessions>['artifacts']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.agents.sessions>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.agents.sessions>['artifacts']>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<
                ReturnType<ReturnType<typeof client.agents.sessions>['artifacts']>['delete']
              >
            >,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<
              ReturnType<ReturnType<typeof client.agents.sessions>['artifacts']>['delete']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.agents.sessions>['artifacts']>['delete']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteAgentsSessionsSessionIdArtifactsArtifactIdMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getAgentsSessionsSessionIdArtifactsArtifactIdContentQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.agents.sessions>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.agents.sessions>['artifacts']>[0]>,
) {
  return [
    'agents',
    '/agents/sessions/{session_id}/artifacts/{artifact_id}/content',
    toValue(params),
    toValue(params2),
  ] as const
}

export function getAgentsSessionsSessionIdArtifactsArtifactIdContentQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.agents.sessions>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.agents.sessions>['artifacts']>[0]>,
  options?: Parameters<
    ReturnType<ReturnType<typeof client.agents.sessions>['artifacts']>['content']['get']
  >[0],
) {
  return {
    queryKey: computed(() =>
      getAgentsSessionsSessionIdArtifactsArtifactIdContentQueryKey(params, params2),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.agents
        .sessions(toValue(params))
        .artifacts(toValue(params2))
        .content.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useAgentsSessionsSessionIdArtifactsArtifactIdContent<
  TData = Extract<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<typeof client.agents.sessions>['artifacts']>['content']['get']
      >
    >,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<
        ReturnType<ReturnType<typeof client.agents.sessions>['artifacts']>['content']['get']
      >
    >['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.agents.sessions>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.agents.sessions>['artifacts']>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<
              ReturnType<
                ReturnType<ReturnType<typeof client.agents.sessions>['artifacts']>['content']['get']
              >
            >,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<
              ReturnType<
                ReturnType<ReturnType<typeof client.agents.sessions>['artifacts']>['content']['get']
              >
            >,
            { error: null }
          >['data'],
          ReturnType<typeof getAgentsSessionsSessionIdArtifactsArtifactIdContentQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<
      ReturnType<ReturnType<typeof client.agents.sessions>['artifacts']>['content']['get']
    >[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() =>
        getAgentsSessionsSessionIdArtifactsArtifactIdContentQueryKey(params, params2),
      ),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.agents
          .sessions(toValue(params))
          .artifacts(toValue(params2))
          .content.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getAgentsSessionsSessionIdEventsQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.agents.sessions>[0]>,
  options?: Parameters<ReturnType<typeof client.agents.sessions>['events']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['agents', '/agents/sessions/{session_id}/events', toValue(params), keyArgs] as const
}

export function getAgentsSessionsSessionIdEventsQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.agents.sessions>[0]>,
  options?: Parameters<ReturnType<typeof client.agents.sessions>['events']['get']>[0],
) {
  return {
    queryKey: computed(() => getAgentsSessionsSessionIdEventsQueryKey(params, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.agents
        .sessions(toValue(params))
        .events.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useAgentsSessionsSessionIdEvents<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['events']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['events']['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.agents.sessions>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['events']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['events']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getAgentsSessionsSessionIdEventsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.agents.sessions>['events']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getAgentsSessionsSessionIdEventsQueryKey(params, clientOptions)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.agents
          .sessions(toValue(params))
          .events.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostAgentsSessionsSessionIdEventsMutationKey() {
  return ['agents', '/agents/sessions/{session_id}/events', 'POST'] as const
}

export function getPostAgentsSessionsSessionIdEventsMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['events']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.agents.sessions>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['events']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.agents.sessions>['events']['post']>[0]
      options?: Parameters<ReturnType<typeof client.agents.sessions>['events']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostAgentsSessionsSessionIdEventsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.agents
        .sessions(toValue(params))
        .events.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostAgentsSessionsSessionIdEvents<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['events']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.agents.sessions>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['events']['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.agents.sessions>['events']['post']>[0]
            options?: Parameters<ReturnType<typeof client.agents.sessions>['events']['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostAgentsSessionsSessionIdEventsMutationOptions<
    TError,
    TOnMutateResult
  >(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getAgentsSessionsSessionIdItemsQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.agents.sessions>[0]>,
  options?: Parameters<ReturnType<typeof client.agents.sessions>['items']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['agents', '/agents/sessions/{session_id}/items', toValue(params), keyArgs] as const
}

export function getAgentsSessionsSessionIdItemsQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.agents.sessions>[0]>,
  options?: Parameters<ReturnType<typeof client.agents.sessions>['items']['get']>[0],
) {
  return {
    queryKey: computed(() => getAgentsSessionsSessionIdItemsQueryKey(params, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.agents
        .sessions(toValue(params))
        .items.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useAgentsSessionsSessionIdItems<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['items']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['items']['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.agents.sessions>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['items']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['items']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getAgentsSessionsSessionIdItemsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.agents.sessions>['items']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getAgentsSessionsSessionIdItemsQueryKey(params, clientOptions)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.agents
          .sessions(toValue(params))
          .items.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getAgentsSessionsSessionIdTracesQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.agents.sessions>[0]>,
  options?: Parameters<ReturnType<typeof client.agents.sessions>['traces']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['agents', '/agents/sessions/{session_id}/traces', toValue(params), keyArgs] as const
}

export function getAgentsSessionsSessionIdTracesQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.agents.sessions>[0]>,
  options?: Parameters<ReturnType<typeof client.agents.sessions>['traces']['get']>[0],
) {
  return {
    queryKey: computed(() => getAgentsSessionsSessionIdTracesQueryKey(params, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.agents
        .sessions(toValue(params))
        .traces.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useAgentsSessionsSessionIdTraces<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['traces']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['traces']['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.agents.sessions>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['traces']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['traces']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getAgentsSessionsSessionIdTracesQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.agents.sessions>['traces']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getAgentsSessionsSessionIdTracesQueryKey(params, clientOptions)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.agents
          .sessions(toValue(params))
          .traces.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getAgentsSessionsSessionIdTurnsQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.agents.sessions>[0]>,
  options?: Parameters<ReturnType<typeof client.agents.sessions>['turns']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['agents', '/agents/sessions/{session_id}/turns', toValue(params), keyArgs] as const
}

export function getAgentsSessionsSessionIdTurnsQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.agents.sessions>[0]>,
  options?: Parameters<ReturnType<typeof client.agents.sessions>['turns']['get']>[0],
) {
  return {
    queryKey: computed(() => getAgentsSessionsSessionIdTurnsQueryKey(params, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.agents
        .sessions(toValue(params))
        .turns.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useAgentsSessionsSessionIdTurns<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['turns']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['turns']['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.agents.sessions>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['turns']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.agents.sessions>['turns']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getAgentsSessionsSessionIdTurnsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.agents.sessions>['turns']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getAgentsSessionsSessionIdTurnsQueryKey(params, clientOptions)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.agents
          .sessions(toValue(params))
          .turns.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getAgentsSessionsSessionIdTurnsTurnIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.agents.sessions>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.agents.sessions>['turns']>[0]>,
) {
  return [
    'agents',
    '/agents/sessions/{session_id}/turns/{turn_id}',
    toValue(params),
    toValue(params2),
  ] as const
}

export function getAgentsSessionsSessionIdTurnsTurnIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.agents.sessions>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.agents.sessions>['turns']>[0]>,
  options?: Parameters<ReturnType<ReturnType<typeof client.agents.sessions>['turns']>['get']>[0],
) {
  return {
    queryKey: computed(() => getAgentsSessionsSessionIdTurnsTurnIdQueryKey(params, params2)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.agents
        .sessions(toValue(params))
        .turns(toValue(params2))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useAgentsSessionsSessionIdTurnsTurnId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.agents.sessions>['turns']>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.agents.sessions>['turns']>['get']>
    >['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.agents.sessions>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.agents.sessions>['turns']>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<
              ReturnType<ReturnType<ReturnType<typeof client.agents.sessions>['turns']>['get']>
            >,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<
              ReturnType<ReturnType<ReturnType<typeof client.agents.sessions>['turns']>['get']>
            >,
            { error: null }
          >['data'],
          ReturnType<typeof getAgentsSessionsSessionIdTurnsTurnIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<ReturnType<typeof client.agents.sessions>['turns']>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getAgentsSessionsSessionIdTurnsTurnIdQueryKey(params, params2)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.agents
          .sessions(toValue(params))
          .turns(toValue(params2))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getAgentsSessionsSessionIdTurnsTurnIdItemsQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.agents.sessions>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.agents.sessions>['turns']>[0]>,
  options?: Parameters<
    ReturnType<ReturnType<typeof client.agents.sessions>['turns']>['items']['get']
  >[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'agents',
    '/agents/sessions/{session_id}/turns/{turn_id}/items',
    toValue(params),
    toValue(params2),
    keyArgs,
  ] as const
}

export function getAgentsSessionsSessionIdTurnsTurnIdItemsQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.agents.sessions>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.agents.sessions>['turns']>[0]>,
  options?: Parameters<
    ReturnType<ReturnType<typeof client.agents.sessions>['turns']>['items']['get']
  >[0],
) {
  return {
    queryKey: computed(() =>
      getAgentsSessionsSessionIdTurnsTurnIdItemsQueryKey(params, params2, options),
    ),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.agents
        .sessions(toValue(params))
        .turns(toValue(params2))
        .items.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useAgentsSessionsSessionIdTurnsTurnIdItems<
  TData = Extract<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.agents.sessions>['turns']>['items']['get']>
    >,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.agents.sessions>['turns']>['items']['get']>
    >['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.agents.sessions>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.agents.sessions>['turns']>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<
              ReturnType<
                ReturnType<ReturnType<typeof client.agents.sessions>['turns']>['items']['get']
              >
            >,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<
              ReturnType<
                ReturnType<ReturnType<typeof client.agents.sessions>['turns']>['items']['get']
              >
            >,
            { error: null }
          >['data'],
          ReturnType<typeof getAgentsSessionsSessionIdTurnsTurnIdItemsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<
      ReturnType<ReturnType<typeof client.agents.sessions>['turns']>['items']['get']
    >[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() =>
        getAgentsSessionsSessionIdTurnsTurnIdItemsQueryKey(params, params2, clientOptions),
      ),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.agents
          .sessions(toValue(params))
          .turns(toValue(params2))
          .items.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getVaultsQueryKey(options?: Parameters<typeof client.vaults.get>[0]) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['vaults', '/vaults', keyArgs] as const
}

export function getVaultsQueryOptions(options?: Parameters<typeof client.vaults.get>[0]) {
  return {
    queryKey: getVaultsQueryKey(options),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.vaults.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useVaults<
  TData = Extract<Awaited<ReturnType<typeof client.vaults.get>>, { error: null }>['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.vaults.get>>['error'], null>,
>(
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<Awaited<ReturnType<typeof client.vaults.get>>, { error: null }>['data'],
          TError,
          TData,
          Extract<Awaited<ReturnType<typeof client.vaults.get>>, { error: null }>['data'],
          ReturnType<typeof getVaultsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.vaults.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: getVaultsQueryKey(clientOptions),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.vaults.get({
          ...clientOptions,
          fetch: { ...clientOptions?.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostVaultsMutationKey() {
  return ['vaults', '/vaults', 'POST'] as const
}

export function getPostVaultsMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.vaults.post>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.vaults.post>>, { error: null }>['data'],
    TError,
    {
      body: Parameters<typeof client.vaults.post>[0]
      options?: Parameters<typeof client.vaults.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostVaultsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.vaults.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostVaults<
  TError = Exclude<Awaited<ReturnType<typeof client.vaults.post>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<Awaited<ReturnType<typeof client.vaults.post>>, { error: null }>['data'],
          TError,
          {
            body: Parameters<typeof client.vaults.post>[0]
            options?: Parameters<typeof client.vaults.post>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostVaultsMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getVaultsVaultIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.vaults>[0]>,
) {
  return ['vaults', '/vaults/{vault_id}', toValue(params)] as const
}

export function getVaultsVaultIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.vaults>[0]>,
  options?: Parameters<ReturnType<typeof client.vaults>['get']>[0],
) {
  return {
    queryKey: computed(() => getVaultsVaultIdQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .vaults(toValue(params))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useVaultsVaultId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.vaults>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.vaults>['get']>>['error'], null>,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.vaults>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.vaults>['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.vaults>['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getVaultsVaultIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.vaults>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getVaultsVaultIdQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .vaults(toValue(params))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostVaultsVaultIdMutationKey() {
  return ['vaults', '/vaults/{vault_id}', 'POST'] as const
}

export function getPostVaultsVaultIdMutationOptions<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.vaults>['post']>>['error'], null>,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.vaults>[0]>) {
  return mutationOptions<
    Extract<Awaited<ReturnType<ReturnType<typeof client.vaults>['post']>>, { error: null }>['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.vaults>['post']>[0]
      options?: Parameters<ReturnType<typeof client.vaults>['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostVaultsVaultIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.vaults(toValue(params)).post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostVaultsVaultId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.vaults>['post']>>['error'], null>,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.vaults>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.vaults>['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.vaults>['post']>[0]
            options?: Parameters<ReturnType<typeof client.vaults>['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostVaultsVaultIdMutationOptions<TError, TOnMutateResult>(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getDeleteVaultsVaultIdMutationKey() {
  return ['vaults', '/vaults/{vault_id}', 'DELETE'] as const
}

export function getDeleteVaultsVaultIdMutationOptions<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.vaults>['delete']>>['error'], null>,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.vaults>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.vaults>['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<typeof client.vaults>['delete']>[0]
      options?: Parameters<ReturnType<typeof client.vaults>['delete']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteVaultsVaultIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.vaults(toValue(params)).delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeleteVaultsVaultId<
  TError = Exclude<Awaited<ReturnType<ReturnType<typeof client.vaults>['delete']>>['error'], null>,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.vaults>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.vaults>['delete']>>,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<ReturnType<typeof client.vaults>['delete']>[0]
            options?: Parameters<ReturnType<typeof client.vaults>['delete']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteVaultsVaultIdMutationOptions<TError, TOnMutateResult>(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getVaultsVaultIdCredentialsQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.vaults>[0]>,
  options?: Parameters<ReturnType<typeof client.vaults>['credentials']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['vaults', '/vaults/{vault_id}/credentials', toValue(params), keyArgs] as const
}

export function getVaultsVaultIdCredentialsQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.vaults>[0]>,
  options?: Parameters<ReturnType<typeof client.vaults>['credentials']['get']>[0],
) {
  return {
    queryKey: computed(() => getVaultsVaultIdCredentialsQueryKey(params, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .vaults(toValue(params))
        .credentials.get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useVaultsVaultIdCredentials<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.vaults>['credentials']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.vaults>['credentials']['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.vaults>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.vaults>['credentials']['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.vaults>['credentials']['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getVaultsVaultIdCredentialsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.vaults>['credentials']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getVaultsVaultIdCredentialsQueryKey(params, clientOptions)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .vaults(toValue(params))
          .credentials.get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostVaultsVaultIdCredentialsMutationKey() {
  return ['vaults', '/vaults/{vault_id}/credentials', 'POST'] as const
}

export function getPostVaultsVaultIdCredentialsMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.vaults>['credentials']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.vaults>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.vaults>['credentials']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.vaults>['credentials']['post']>[0]
      options?: Parameters<ReturnType<typeof client.vaults>['credentials']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostVaultsVaultIdCredentialsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.vaults(toValue(params)).credentials.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostVaultsVaultIdCredentials<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.vaults>['credentials']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.vaults>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.vaults>['credentials']['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.vaults>['credentials']['post']>[0]
            options?: Parameters<ReturnType<typeof client.vaults>['credentials']['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostVaultsVaultIdCredentialsMutationOptions<TError, TOnMutateResult>(
    params,
  )
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getVaultsVaultIdCredentialsCredentialIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.vaults>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.vaults>['credentials']>[0]>,
) {
  return [
    'vaults',
    '/vaults/{vault_id}/credentials/{credential_id}',
    toValue(params),
    toValue(params2),
  ] as const
}

export function getVaultsVaultIdCredentialsCredentialIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.vaults>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.vaults>['credentials']>[0]>,
  options?: Parameters<ReturnType<ReturnType<typeof client.vaults>['credentials']>['get']>[0],
) {
  return {
    queryKey: computed(() => getVaultsVaultIdCredentialsCredentialIdQueryKey(params, params2)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .vaults(toValue(params))
        .credentials(toValue(params2))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useVaultsVaultIdCredentialsCredentialId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<ReturnType<typeof client.vaults>['credentials']>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.vaults>['credentials']>['get']>
    >['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.vaults>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.vaults>['credentials']>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<ReturnType<typeof client.vaults>['credentials']>['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<ReturnType<typeof client.vaults>['credentials']>['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getVaultsVaultIdCredentialsCredentialIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<ReturnType<typeof client.vaults>['credentials']>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getVaultsVaultIdCredentialsCredentialIdQueryKey(params, params2)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .vaults(toValue(params))
          .credentials(toValue(params2))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostVaultsVaultIdCredentialsCredentialIdMutationKey() {
  return ['vaults', '/vaults/{vault_id}/credentials/{credential_id}', 'POST'] as const
}

export function getPostVaultsVaultIdCredentialsCredentialIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.vaults>['credentials']>['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.vaults>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.vaults>['credentials']>[0]>,
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.vaults>['credentials']>['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<ReturnType<typeof client.vaults>['credentials']>['post']>[0]
      options?: Parameters<ReturnType<ReturnType<typeof client.vaults>['credentials']>['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostVaultsVaultIdCredentialsCredentialIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .vaults(toValue(params))
        .credentials(toValue(params2))
        .post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostVaultsVaultIdCredentialsCredentialId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.vaults>['credentials']>['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.vaults>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.vaults>['credentials']>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<ReturnType<ReturnType<typeof client.vaults>['credentials']>['post']>
            >,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<ReturnType<typeof client.vaults>['credentials']>['post']>[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.vaults>['credentials']>['post']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostVaultsVaultIdCredentialsCredentialIdMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getDeleteVaultsVaultIdCredentialsCredentialIdMutationKey() {
  return ['vaults', '/vaults/{vault_id}/credentials/{credential_id}', 'DELETE'] as const
}

export function getDeleteVaultsVaultIdCredentialsCredentialIdMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.vaults>['credentials']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.vaults>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.vaults>['credentials']>[0]>,
) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<ReturnType<typeof client.vaults>['credentials']>['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<ReturnType<typeof client.vaults>['credentials']>['delete']>[0]
      options?: Parameters<ReturnType<ReturnType<typeof client.vaults>['credentials']>['delete']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteVaultsVaultIdCredentialsCredentialIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .vaults(toValue(params))
        .credentials(toValue(params2))
        .delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeleteVaultsVaultIdCredentialsCredentialId<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<ReturnType<typeof client.vaults>['credentials']>['delete']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.vaults>[0]>,
  params2: MaybeRefOrGetter<Parameters<ReturnType<typeof client.vaults>['credentials']>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<ReturnType<ReturnType<typeof client.vaults>['credentials']>['delete']>
            >,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<
              ReturnType<ReturnType<typeof client.vaults>['credentials']>['delete']
            >[0]
            options?: Parameters<
              ReturnType<ReturnType<typeof client.vaults>['credentials']>['delete']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteVaultsVaultIdCredentialsCredentialIdMutationOptions<
    TError,
    TOnMutateResult
  >(params, params2)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getWebhookEndpointsQueryKey(
  options?: Parameters<typeof client.webhook_endpoints.get>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return ['webhook_endpoints', '/webhook_endpoints', keyArgs] as const
}

export function getWebhookEndpointsQueryOptions(
  options?: Parameters<typeof client.webhook_endpoints.get>[0],
) {
  return {
    queryKey: getWebhookEndpointsQueryKey(options),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.webhook_endpoints.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useWebhookEndpoints<
  TData = Extract<
    Awaited<ReturnType<typeof client.webhook_endpoints.get>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.webhook_endpoints.get>>['error'], null>,
>(
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<typeof client.webhook_endpoints.get>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<typeof client.webhook_endpoints.get>>,
            { error: null }
          >['data'],
          ReturnType<typeof getWebhookEndpointsQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.webhook_endpoints.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: getWebhookEndpointsQueryKey(clientOptions),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.webhook_endpoints.get({
          ...clientOptions,
          fetch: { ...clientOptions?.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostWebhookEndpointsMutationKey() {
  return ['webhook_endpoints', '/webhook_endpoints', 'POST'] as const
}

export function getPostWebhookEndpointsMutationOptions<
  TError = Exclude<Awaited<ReturnType<typeof client.webhook_endpoints.post>>['error'], null>,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<Awaited<ReturnType<typeof client.webhook_endpoints.post>>, { error: null }>['data'],
    TError,
    {
      body: Parameters<typeof client.webhook_endpoints.post>[0]
      options?: Parameters<typeof client.webhook_endpoints.post>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostWebhookEndpointsMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.webhook_endpoints.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostWebhookEndpoints<
  TError = Exclude<Awaited<ReturnType<typeof client.webhook_endpoints.post>>['error'], null>,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<typeof client.webhook_endpoints.post>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<typeof client.webhook_endpoints.post>[0]
            options?: Parameters<typeof client.webhook_endpoints.post>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostWebhookEndpointsMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getWebhookEndpointsWebhookEndpointIdQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.webhook_endpoints>[0]>,
) {
  return ['webhook_endpoints', '/webhook_endpoints/{webhook_endpoint_id}', toValue(params)] as const
}

export function getWebhookEndpointsWebhookEndpointIdQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.webhook_endpoints>[0]>,
  options?: Parameters<ReturnType<typeof client.webhook_endpoints>['get']>[0],
) {
  return {
    queryKey: computed(() => getWebhookEndpointsWebhookEndpointIdQueryKey(params)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .webhook_endpoints(toValue(params))
        .get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useWebhookEndpointsWebhookEndpointId<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.webhook_endpoints>['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.webhook_endpoints>['get']>>['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.webhook_endpoints>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.webhook_endpoints>['get']>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.webhook_endpoints>['get']>>,
            { error: null }
          >['data'],
          ReturnType<typeof getWebhookEndpointsWebhookEndpointIdQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.webhook_endpoints>['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getWebhookEndpointsWebhookEndpointIdQueryKey(params)),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .webhook_endpoints(toValue(params))
          .get({ ...clientOptions, fetch: { ...clientOptions?.fetch, signal } })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostWebhookEndpointsWebhookEndpointIdMutationKey() {
  return ['webhook_endpoints', '/webhook_endpoints/{webhook_endpoint_id}', 'POST'] as const
}

export function getPostWebhookEndpointsWebhookEndpointIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.webhook_endpoints>['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.webhook_endpoints>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.webhook_endpoints>['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.webhook_endpoints>['post']>[0]
      options?: Parameters<ReturnType<typeof client.webhook_endpoints>['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostWebhookEndpointsWebhookEndpointIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.webhook_endpoints(toValue(params)).post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostWebhookEndpointsWebhookEndpointId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.webhook_endpoints>['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.webhook_endpoints>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.webhook_endpoints>['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.webhook_endpoints>['post']>[0]
            options?: Parameters<ReturnType<typeof client.webhook_endpoints>['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostWebhookEndpointsWebhookEndpointIdMutationOptions<
    TError,
    TOnMutateResult
  >(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getDeleteWebhookEndpointsWebhookEndpointIdMutationKey() {
  return ['webhook_endpoints', '/webhook_endpoints/{webhook_endpoint_id}', 'DELETE'] as const
}

export function getDeleteWebhookEndpointsWebhookEndpointIdMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.webhook_endpoints>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.webhook_endpoints>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.webhook_endpoints>['delete']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<typeof client.webhook_endpoints>['delete']>[0]
      options?: Parameters<ReturnType<typeof client.webhook_endpoints>['delete']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getDeleteWebhookEndpointsWebhookEndpointIdMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.webhook_endpoints(toValue(params)).delete(body, options)
      if (error) throw error
      return data
    },
  })
}

export function useDeleteWebhookEndpointsWebhookEndpointId<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.webhook_endpoints>['delete']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.webhook_endpoints>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.webhook_endpoints>['delete']>>,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<ReturnType<typeof client.webhook_endpoints>['delete']>[0]
            options?: Parameters<ReturnType<typeof client.webhook_endpoints>['delete']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteWebhookEndpointsWebhookEndpointIdMutationOptions<
    TError,
    TOnMutateResult
  >(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPostWebhookEndpointsWebhookEndpointIdRotateSecretMutationKey() {
  return [
    'webhook_endpoints',
    '/webhook_endpoints/{webhook_endpoint_id}/rotate_secret',
    'POST',
  ] as const
}

export function getPostWebhookEndpointsWebhookEndpointIdRotateSecretMutationOptions<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.webhook_endpoints>['rotate_secret']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.webhook_endpoints>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.webhook_endpoints>['rotate_secret']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.webhook_endpoints>['rotate_secret']['post']>[0]
      options?: Parameters<ReturnType<typeof client.webhook_endpoints>['rotate_secret']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostWebhookEndpointsWebhookEndpointIdRotateSecretMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .webhook_endpoints(toValue(params))
        .rotate_secret.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostWebhookEndpointsWebhookEndpointIdRotateSecret<
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.webhook_endpoints>['rotate_secret']['post']>
    >['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.webhook_endpoints>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<
              ReturnType<ReturnType<typeof client.webhook_endpoints>['rotate_secret']['post']>
            >,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<
              ReturnType<typeof client.webhook_endpoints>['rotate_secret']['post']
            >[0]
            options?: Parameters<
              ReturnType<typeof client.webhook_endpoints>['rotate_secret']['post']
            >[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostWebhookEndpointsWebhookEndpointIdRotateSecretMutationOptions<
    TError,
    TOnMutateResult
  >(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPostWebhookEndpointsWebhookEndpointIdTestMutationKey() {
  return ['webhook_endpoints', '/webhook_endpoints/{webhook_endpoint_id}/test', 'POST'] as const
}

export function getPostWebhookEndpointsWebhookEndpointIdTestMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.webhook_endpoints>['test']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.webhook_endpoints>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.webhook_endpoints>['test']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<ReturnType<typeof client.webhook_endpoints>['test']['post']>[0]
      options?: Parameters<ReturnType<typeof client.webhook_endpoints>['test']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostWebhookEndpointsWebhookEndpointIdTestMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .webhook_endpoints(toValue(params))
        .test.post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostWebhookEndpointsWebhookEndpointIdTest<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.webhook_endpoints>['test']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.webhook_endpoints>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.webhook_endpoints>['test']['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<ReturnType<typeof client.webhook_endpoints>['test']['post']>[0]
            options?: Parameters<ReturnType<typeof client.webhook_endpoints>['test']['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostWebhookEndpointsWebhookEndpointIdTestMutationOptions<
    TError,
    TOnMutateResult
  >(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getWebhookEventTypesQueryKey() {
  return ['webhook_event_types', '/webhook_event_types'] as const
}

export function getWebhookEventTypesQueryOptions(
  options?: Parameters<typeof client.webhook_event_types.get>[0],
) {
  return {
    queryKey: getWebhookEventTypesQueryKey(),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client.webhook_event_types.get({
        ...options,
        fetch: { ...options?.fetch, signal },
      })
      if (error) throw error
      return data
    },
  }
}

export function useWebhookEventTypes<
  TData = Extract<
    Awaited<ReturnType<typeof client.webhook_event_types.get>>,
    { error: null }
  >['data'],
  TError = Exclude<Awaited<ReturnType<typeof client.webhook_event_types.get>>['error'], null>,
>(
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<ReturnType<typeof client.webhook_event_types.get>>,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<ReturnType<typeof client.webhook_event_types.get>>,
            { error: null }
          >['data'],
          ReturnType<typeof getWebhookEventTypesQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<typeof client.webhook_event_types.get>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: getWebhookEventTypesQueryKey(),
      queryFn: async ({ signal }) => {
        const { data, error } = await client.webhook_event_types.get({
          ...clientOptions,
          fetch: { ...clientOptions?.fetch, signal },
        })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostResponsesBetaTrueMutationKey() {
  return ['responses?beta=true', '/responses?beta=true', 'POST'] as const
}

export function getPostResponsesBetaTrueMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<(typeof client)['responses?beta=true']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<(typeof client)['responses?beta=true']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<(typeof client)['responses?beta=true']['post']>[0]
      options?: Parameters<(typeof client)['responses?beta=true']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostResponsesBetaTrueMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client['responses?beta=true'].post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostResponsesBetaTrue<
  TError = Exclude<
    Awaited<ReturnType<(typeof client)['responses?beta=true']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<(typeof client)['responses?beta=true']['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<(typeof client)['responses?beta=true']['post']>[0]
            options?: Parameters<(typeof client)['responses?beta=true']['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostResponsesBetaTrueMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getResponsesResponseIdBetaTrueQueryKey(
  params: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  const { headers: _a, ...keyArgs } = options ?? {}
  return ['responses', '/responses/{response_id}?beta=true', toValue(params), keyArgs] as const
}

export function getResponsesResponseIdBetaTrueQueryOptions(
  params: MaybeRefOrGetter<string>,
  options?: { headers?: Record<string, string>; query?: Record<string, unknown> },
) {
  return {
    queryKey: computed(() => getResponsesResponseIdBetaTrueQueryKey(params, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
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
        `${clientOrigin}/responses/${encodeURIComponent(toValue(params))}?beta=true${search.size ? `?${search}` : ''}`,
        { headers: options?.headers, signal },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  }
}

export function useResponsesResponseIdBetaTrue<
  TData = Static<typeof BetaResponseSchema>,
  TError = unknown,
>(
  params: MaybeRefOrGetter<string>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Static<typeof BetaResponseSchema>,
          TError,
          TData,
          Static<typeof BetaResponseSchema>,
          ReturnType<typeof getResponsesResponseIdBetaTrueQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: { headers?: Record<string, string>; query?: Record<string, unknown> }
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() => getResponsesResponseIdBetaTrueQueryKey(params, clientOptions)),
      queryFn: async ({ signal }) => {
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
          `${clientOrigin}/responses/${encodeURIComponent(toValue(params))}?beta=true${search.size ? `?${search}` : ''}`,
          { headers: clientOptions?.headers, signal },
        )
        if (!res.ok) throw await res.json()
        return JSON.parse(await res.text())
      },
    },
    queryClient,
  )
}

export function getDeleteResponsesResponseIdBetaTrueMutationKey() {
  return ['responses', '/responses/{response_id}?beta=true', 'DELETE'] as const
}

export function getDeleteResponsesResponseIdBetaTrueMutationOptions<
  TError = unknown,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<string>) {
  return mutationOptions<
    unknown,
    TError,
    { body?: unknown; options?: { headers?: Record<string, string> } },
    TOnMutateResult
  >({
    mutationKey: getDeleteResponsesResponseIdBetaTrueMutationKey(),
    mutationFn: async ({ body, options }) => {
      const res = await fetch(
        `${clientOrigin}/responses/${encodeURIComponent(toValue(params))}?beta=true`,
        {
          method: 'DELETE',
          headers: { 'content-type': 'application/json', ...options?.headers },
          body: body === undefined ? undefined : JSON.stringify(body),
        },
      )
      if (!res.ok) throw await res.json()
      return JSON.parse(await res.text())
    },
  })
}

export function useDeleteResponsesResponseIdBetaTrue<TError = unknown, TOnMutateResult = unknown>(
  params: MaybeRefOrGetter<string>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          unknown,
          TError,
          { body?: unknown; options?: { headers?: Record<string, string> } },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getDeleteResponsesResponseIdBetaTrueMutationOptions<
    TError,
    TOnMutateResult
  >(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPostResponsesResponseIdCancelBetaTrueMutationKey() {
  return ['responses', '/responses/{response_id}/cancel?beta=true', 'POST'] as const
}

export function getPostResponsesResponseIdCancelBetaTrueMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.responses>['cancel?beta=true']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(params: MaybeRefOrGetter<Parameters<typeof client.responses>[0]>) {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<ReturnType<typeof client.responses>['cancel?beta=true']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body?: Parameters<ReturnType<typeof client.responses>['cancel?beta=true']['post']>[0]
      options?: Parameters<ReturnType<typeof client.responses>['cancel?beta=true']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostResponsesResponseIdCancelBetaTrueMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client
        .responses(toValue(params))
        ['cancel?beta=true'].post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostResponsesResponseIdCancelBetaTrue<
  TError = Exclude<
    Awaited<ReturnType<ReturnType<typeof client.responses>['cancel?beta=true']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.responses>[0]>,
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<ReturnType<typeof client.responses>['cancel?beta=true']['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body?: Parameters<ReturnType<typeof client.responses>['cancel?beta=true']['post']>[0]
            options?: Parameters<ReturnType<typeof client.responses>['cancel?beta=true']['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostResponsesResponseIdCancelBetaTrueMutationOptions<
    TError,
    TOnMutateResult
  >(params)
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getPostResponsesCompactBetaTrueMutationKey() {
  return ['responses', '/responses/compact?beta=true', 'POST'] as const
}

export function getPostResponsesCompactBetaTrueMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<(typeof client.responses)['compact?beta=true']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<(typeof client.responses)['compact?beta=true']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<(typeof client.responses)['compact?beta=true']['post']>[0]
      options?: Parameters<(typeof client.responses)['compact?beta=true']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostResponsesCompactBetaTrueMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.responses['compact?beta=true'].post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostResponsesCompactBetaTrue<
  TError = Exclude<
    Awaited<ReturnType<(typeof client.responses)['compact?beta=true']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<(typeof client.responses)['compact?beta=true']['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<(typeof client.responses)['compact?beta=true']['post']>[0]
            options?: Parameters<(typeof client.responses)['compact?beta=true']['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostResponsesCompactBetaTrueMutationOptions<TError, TOnMutateResult>()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}

export function getResponsesResponseIdInputItemsBetaTrueQueryKey(
  params: MaybeRefOrGetter<Parameters<typeof client.responses>[0]>,
  options?: Parameters<ReturnType<typeof client.responses>['input_items?beta=true']['get']>[0],
) {
  const { headers: _a, fetch: _b, throwHttpError: _c, ...keyArgs } = options ?? {}
  return [
    'responses',
    '/responses/{response_id}/input_items?beta=true',
    toValue(params),
    keyArgs,
  ] as const
}

export function getResponsesResponseIdInputItemsBetaTrueQueryOptions(
  params: MaybeRefOrGetter<Parameters<typeof client.responses>[0]>,
  options?: Parameters<ReturnType<typeof client.responses>['input_items?beta=true']['get']>[0],
) {
  return {
    queryKey: computed(() => getResponsesResponseIdInputItemsBetaTrueQueryKey(params, options)),
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const { data, error } = await client
        .responses(toValue(params))
        ['input_items?beta=true'].get({ ...options, fetch: { ...options?.fetch, signal } })
      if (error) throw error
      return data
    },
  }
}

export function useResponsesResponseIdInputItemsBetaTrue<
  TData = Extract<
    Awaited<ReturnType<ReturnType<typeof client.responses>['input_items?beta=true']['get']>>,
    { error: null }
  >['data'],
  TError = Exclude<
    Awaited<
      ReturnType<ReturnType<typeof client.responses>['input_items?beta=true']['get']>
    >['error'],
    null
  >,
>(
  params: MaybeRefOrGetter<Parameters<typeof client.responses>[0]>,
  options?: {
    query?: Omit<
      Extract<
        UseQueryOptions<
          Extract<
            Awaited<
              ReturnType<ReturnType<typeof client.responses>['input_items?beta=true']['get']>
            >,
            { error: null }
          >['data'],
          TError,
          TData,
          Extract<
            Awaited<
              ReturnType<ReturnType<typeof client.responses>['input_items?beta=true']['get']>
            >,
            { error: null }
          >['data'],
          ReturnType<typeof getResponsesResponseIdInputItemsBetaTrueQueryKey>
        >,
        { queryKey: unknown }
      >,
      'queryKey' | 'queryFn'
    >
    options?: Parameters<ReturnType<typeof client.responses>['input_items?beta=true']['get']>[0]
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, options: clientOptions } = options ?? {}
  return useQuery(
    {
      ...queryOptions,
      queryKey: computed(() =>
        getResponsesResponseIdInputItemsBetaTrueQueryKey(params, clientOptions),
      ),
      queryFn: async ({ signal }) => {
        const { data, error } = await client
          .responses(toValue(params))
          ['input_items?beta=true'].get({
            ...clientOptions,
            fetch: { ...clientOptions?.fetch, signal },
          })
        if (error) throw error
        return data
      },
    },
    queryClient,
  )
}

export function getPostResponsesInputTokensBetaTrueMutationKey() {
  return ['responses', '/responses/input_tokens?beta=true', 'POST'] as const
}

export function getPostResponsesInputTokensBetaTrueMutationOptions<
  TError = Exclude<
    Awaited<ReturnType<(typeof client.responses)['input_tokens?beta=true']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>() {
  return mutationOptions<
    Extract<
      Awaited<ReturnType<(typeof client.responses)['input_tokens?beta=true']['post']>>,
      { error: null }
    >['data'],
    TError,
    {
      body: Parameters<(typeof client.responses)['input_tokens?beta=true']['post']>[0]
      options?: Parameters<(typeof client.responses)['input_tokens?beta=true']['post']>[1]
    },
    TOnMutateResult
  >({
    mutationKey: getPostResponsesInputTokensBetaTrueMutationKey(),
    mutationFn: async ({ body, options }) => {
      const { data, error } = await client.responses['input_tokens?beta=true'].post(body, options)
      if (error) throw error
      return data
    },
  })
}

export function usePostResponsesInputTokensBetaTrue<
  TError = Exclude<
    Awaited<ReturnType<(typeof client.responses)['input_tokens?beta=true']['post']>>['error'],
    null
  >,
  TOnMutateResult = unknown,
>(
  options?: {
    mutation?: Omit<
      Extract<
        UseMutationOptions<
          Extract<
            Awaited<ReturnType<(typeof client.responses)['input_tokens?beta=true']['post']>>,
            { error: null }
          >['data'],
          TError,
          {
            body: Parameters<(typeof client.responses)['input_tokens?beta=true']['post']>[0]
            options?: Parameters<(typeof client.responses)['input_tokens?beta=true']['post']>[1]
          },
          TOnMutateResult
        >,
        { mutationFn?: unknown }
      >,
      'mutationFn'
    >
  },
  queryClient?: QueryClient,
) {
  const { mutation } = options ?? {}
  const mutationDefaults = getPostResponsesInputTokensBetaTrueMutationOptions<
    TError,
    TOnMutateResult
  >()
  return useMutation(
    {
      ...mutation,
      ...mutationDefaults,
      mutationKey: mutation?.mutationKey ?? mutationDefaults.mutationKey,
    },
    queryClient,
  )
}
