import { skipToken, useQuery } from '@tanstack/react-query'

import { makePoemService } from '@/services/poem.service'
import { QUERY_KEYS } from '@/constants/keys'

import type { QueryOptions } from '@/@types/general'
import type { PoemEntity } from '@/entities/poem.entity'

const poemService = makePoemService()

type Poem = PoemEntity | undefined

export function useGetPoemById(id: string | null, options?: QueryOptions<Poem>) {
	const { data, ...rest } = useQuery<Poem>({
		queryFn: id ? () => poemService.getById(id) : skipToken,
		queryKey: [QUERY_KEYS.GET_POEM, id],
		refetchOnWindowFocus: false,
		throwOnError: true,
		enabled: !!id,
		...options,
	})
	return { poem: data, ...rest }
}
