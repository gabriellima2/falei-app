import { useQuery } from '@tanstack/react-query'

import { makeGoalService } from '@/services/goal.service'
import { QUERY_KEYS } from '@/constants/keys'

import type { QueryOptions } from '@/@types/general'

const goalService = makeGoalService()

export function useGetAllGoals(options?: QueryOptions) {
	const { data, ...rest } = useQuery({
		queryFn: goalService.getAll,
		queryKey: [QUERY_KEYS.GET_GOALS],
		...options,
	})
	return { goals: data, ...rest }
}
