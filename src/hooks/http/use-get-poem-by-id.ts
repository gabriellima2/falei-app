import { useQuery } from '@tanstack/react-query'

import { makePoemService } from '@/services/poem.service'
import { QUERY_KEYS } from '@/constants/keys'

import type { QueryOptions } from '@/@types/general'

const poemService = makePoemService()

export function useGetPoemById(id: string, options?: QueryOptions) {
	const { data, ...rest } = useQuery({
		queryFn: () => poemService.getById(id),
		queryKey: [QUERY_KEYS.GET_POEM, id],
		...options,
	})
	return { poem: data, ...rest }
}
