import { useQuery } from '@tanstack/react-query'

import { makePoemService } from '@/services/poem.service'
import { QUERY_KEYS } from '@/constants/keys'

import type { QueryOptions } from '@/@types/general'
import type { PoemEntity } from '@/entities/poem.entity'

const poemService = makePoemService()

type Poem = PoemEntity | undefined

export function useGetPoemById(id: string, options?: QueryOptions<Poem>) {
	const { data, ...rest } = useQuery<Poem>({
		queryFn: () => poemService.getById(id),
		queryKey: [QUERY_KEYS.GET_POEM, id],
		throwOnError: true,
		refetchOnWindowFocus: false,
		...options,
	})
	return { poem: data, ...rest }
}
