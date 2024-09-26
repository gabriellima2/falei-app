import { useQuery } from '@tanstack/react-query'

import { makePoemService } from '@/services/poem.service'
import { QUERY_KEYS } from '@/constants/keys'

import type { QueryOptions } from '@/@types/general'
import type { PoemEntity } from '@/entities/poem.entity'

const poemService = makePoemService()

type Poems = PoemEntity[] | undefined

export function useGetAllPoems(options?: QueryOptions<Poems>) {
		const { data, ...rest } = useQuery<Poems>({
			queryFn: poemService.getAll,
			queryKey: [QUERY_KEYS.GET_POEMS],
			throwOnError: true,
			refetchOnWindowFocus: false,
			...options,
		})
		return { poems: data, ...rest }
	}
