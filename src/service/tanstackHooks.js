import { useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export const createCRUDHooks = (service, tableName) => {
  const keys = {
    lists:    (params) => [tableName, 'list', params],
    record:   (id)     => [tableName, 'record', id],
    recent: (id)     => [tableName, 'recent', id],
  }

  const useGetAll = (params = {}, options = {}) =>
    useQuery({
      queryKey: keys.lists(params),
      queryFn: () => service.getAll(params),
      ...options,
    })

  const useGetById = (id, options = {}) =>
    useQuery({
      queryKey: keys.record(id),
      queryFn: () => service.getById(id),
      enabled: !!id,
      ...options,
    })

  const useGetRecent = (excludeId, options = {}) =>
    useQuery({
      queryKey: keys.recent(excludeId),
      queryFn: () => service.getRecent(excludeId),
      enabled: !!excludeId,
      ...options,
    })

  const usePutData = (options = {}) => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: (payload) => service.putData(payload),
      onMutate: async (payload) => {
        await queryClient.cancelQueries({ queryKey: [tableName] })
        const previous = queryClient.getQueriesData({ queryKey: [tableName] })

        queryClient.setQueriesData({ queryKey: [tableName] }, (old) => {
          if(!old?.data) return old
          return { ...old, data: [{ ...payload, id: crypto.randomUUID() }, ...old.data] }
        })

        return { previous }
      },
      onError: (err, _, context) => {
        context.previous.forEach(([key, value]) => queryClient.setQueryData(key, value))
      },
      onSettled: () => queryClient.invalidateQueries({ queryKey: [tableName] }),
      ...options,
    })
  }

  const useUpdateData = (options = {}) => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: ({ payload, id }) => service.updateData(payload, id),
      onMutate: async ({ payload, id }) => {
        await queryClient.cancelQueries({ queryKey: [tableName] })
        const previous = queryClient.getQueriesData({ queryKey: [tableName] })

        queryClient.setQueriesData({ queryKey: [tableName] }, (old) => {
          if(!old?.data) return old
          return { ...old, data: old.data.map(item => item.id === id ? { ...item, ...payload } : item) }
        })

        return { previous }
      },
      onError: (err, _, context) => {
        context.previous.forEach(([key, value]) => queryClient.setQueryData(key, value))
      },
      onSettled: () => queryClient.invalidateQueries({ queryKey: [tableName] }),
      ...options,
    })
  }

  const useDeleteData = (options = {}) => {
    const queryClient = useQueryClient()
    return useMutation({
      mutationFn: ({ column, value }) => service.deleteData({ column, value }),
      onMutate: async ({ column = 'id', value }) => {
        await queryClient.cancelQueries({ queryKey: [tableName] })
        const previous = queryClient.getQueriesData({ queryKey: [tableName] })

        queryClient.setQueriesData({ queryKey: [tableName] }, (old) => {
          if (!old?.data) return old
          return { ...old, data: old.data.filter(item => item[column] !== value) }
        })

        return { previous }
      },
      onError: (err, _, context) => {
        context.previous.forEach(([key, value]) => queryClient.setQueryData(key, value))
      },
      onSettled: () => queryClient.invalidateQueries({ queryKey: [tableName] }),
      ...options,
    })
  }

  const useSubscribe = (extraTables = []) => {
    const queryClient = useQueryClient()
    useEffect(() => {
      const unsubscribe = service.subscribe(() =>
        queryClient.invalidateQueries({ queryKey: [tableName] }),
        extraTables
      )
      return unsubscribe
    }, [queryClient, extraTables])
  }

  return {
    getAll: useGetAll,
    getById: useGetById,
    getRecent: useGetRecent,
    put: usePutData,
    update: useUpdateData,
    delete: useDeleteData,
    subscribe: useSubscribe,
  }
}