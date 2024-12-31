import { useQuery } from '@tanstack/react-query'

import { makeGoalService } from '@/services/goal.service'

import { filterGoalsByStatus } from '@/helpers/goals'
import { QUERY_KEYS } from '@/constants/keys'

import type { QueryOptions } from '@/@types/general'
import type { GoalEntity } from '@/entities/goal.entity'

const goalService = makeGoalService()

type Goals = GoalEntity[] | undefined

export function useGetAllPendingGoals(options?: QueryOptions<Goals>) {
	const { data, ...rest } = useQuery<Goals>({
		queryFn: async () => {
			const goals = await goalService.getAll()
			return filterGoalsByStatus.pending(goals)
		},
		queryKey: [QUERY_KEYS.GET_PENDING_GOALS],
		refetchOnWindowFocus: false,
		...options,
	})
	return { goals: data, ...rest }
}
