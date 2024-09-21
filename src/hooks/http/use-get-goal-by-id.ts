import { useQuery } from '@tanstack/react-query'

import { makeGoalService } from '@/services/goal.service'
import { QUERY_KEYS } from '@/constants/keys'

import type { QueryOptions } from '@/@types/general'

const goalService = makeGoalService()

export function useGetGoalById(id: string, options?: QueryOptions) {
	const { data, ...rest } = useQuery({
		queryFn: () => goalService.getById(id),
		queryKey: [QUERY_KEYS.GET_GOAL, id],
		...options,
	})
	return { goal: data, ...rest }
}
