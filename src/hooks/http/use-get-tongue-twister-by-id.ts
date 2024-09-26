import { useQuery } from '@tanstack/react-query'

import { makeTongueTwisterService } from '@/services/tongue-twister.service'
import { QUERY_KEYS } from '@/constants/keys'

import type { QueryOptions } from '@/@types/general'
import type { TongueTwisterEntity } from '@/entities/tongue-twister.entity'

const tongueTwisterService = makeTongueTwisterService()

type TongueTwister = TongueTwisterEntity | undefined

export function useGetTongueTwisterById(
	id: string,
	options?: QueryOptions<TongueTwister>,
) {
	const { data, ...rest } = useQuery<TongueTwister>({
		queryFn: () => tongueTwisterService.getById(id),
		queryKey: [QUERY_KEYS.GET_TONGUE_TWISTER, id],
		throwOnError: true,
		refetchOnWindowFocus: false,
		...options,
	})
	return { tongueTwister: data, ...rest }
}
