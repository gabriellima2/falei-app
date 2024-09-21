import { useQuery } from '@tanstack/react-query'

import { makePoemService } from '@/services/poem.service'
import { QUERY_KEYS } from '@/constants/keys'

import type { QueryOptions } from '@/@types/general'

const poemService = makePoemService()

export function useGetAllPoems(options?: QueryOptions) {
	const { data, ...rest } = useQuery({
		queryFn: poemService.getAll,
		queryKey: [QUERY_KEYS.GET_POEMS],
		...options,
	})
	return { poems: data, ...rest }
}
