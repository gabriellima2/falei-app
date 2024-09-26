import { useQuery } from '@tanstack/react-query'

import { makeGoalService } from '@/services/goal.service'
import { QUERY_KEYS } from '@/constants/keys'

import type { QueryOptions } from '@/@types/general'
import type { GoalEntity } from '@/entities/goal.entity'

const goalService = makeGoalService()

type Goal = GoalEntity | undefined

export function useGetGoalById(id: string, options?: QueryOptions<Goal>) {
	const { data, ...rest } = useQuery<Goal>({
		queryFn: () => goalService.getById(id),
		queryKey: [QUERY_KEYS.GET_GOAL, id],
		throwOnError: true,
		refetchOnWindowFocus: false,
		...options,
	})
	return { goal: data, ...rest }
}
