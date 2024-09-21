import { useQuery } from '@tanstack/react-query'

import { makeTongueTwisterService } from '@/services/tongue-twister.service'
import { QUERY_KEYS } from '@/constants/keys'

import type { QueryOptions } from '@/@types/general'

const tongueTwisterService = makeTongueTwisterService()

export function useGetAllTonguesTwister(options?: QueryOptions) {
	const { data, ...rest } = useQuery({
		queryFn: tongueTwisterService.getAll,
		queryKey: [QUERY_KEYS.GET_TONGUES_TWISTER],
		...options,
	})
	return { tonguesTwister: data, ...rest }
}
