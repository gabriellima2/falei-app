import { useQuery } from '@tanstack/react-query'

import { makeTongueTwisterService } from '@/services/tongue-twister.service'
import { QUERY_KEYS } from '@/constants/keys'

import type { QueryOptions } from '@/@types/general'

const tongueTwisterService = makeTongueTwisterService()

export function useGetTongueTwisterById(id: string, options?: QueryOptions) {
	const { data, ...rest } = useQuery({
		queryFn: () => tongueTwisterService.getById(id),
		queryKey: [QUERY_KEYS.GET_TONGUE_TWISTER, id],
		...options,
	})
	return { tongueTwister: data, ...rest }
}
