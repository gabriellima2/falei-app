import type { UseQueryOptions } from '@tanstack/react-query'

export type QueryOptions<T> = Omit<UseQueryOptions<T>, 'queryFn' | 'queryKey'>
