import { useQuery } from '@tanstack/react-query'

import { makeTongueTwisterService } from '@/services/tongue-twister.service'
import { QUERY_KEYS } from '@/constants/keys'

import type { QueryOptions } from '@/@types/general'
import type { TongueTwisterEntity } from '@/entities/tongue-twister.entity'

const tongueTwisterService = makeTongueTwisterService()

type TongueTwisters = TongueTwisterEntity[] | undefined

export function useGetAllTonguesTwister(
	options?: QueryOptions<TongueTwisters>,
) {
	const { data, ...rest } = useQuery<TongueTwisters>({
		queryFn: () => tongueTwisterService.getAll(),
		queryKey: [QUERY_KEYS.GET_TONGUES_TWISTER],
		refetchOnWindowFocus: false,
		...options,
	})
	return { tonguesTwister: data, ...rest }
}
