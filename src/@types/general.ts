import type { UseQueryOptions } from '@tanstack/react-query'

export type QueryOptions = Omit<UseQueryOptions, 'queryFn' | 'queryKey'>
