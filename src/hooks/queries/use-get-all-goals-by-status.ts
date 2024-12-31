import { useQuery } from '@tanstack/react-query'

import { makeGoalService } from '@/services/goal.service'

import { filterGoalsByStatus } from '@/helpers/goals'
import { QUERY_KEYS } from '@/constants/keys'

import type { FilterByGoalStatus, QueryOptions } from '@/@types/general'
import type { GoalEntity } from '@/entities/goal.entity'

const goalService = makeGoalService()

type Goals = GoalEntity[] | undefined

export function useGetAllGoalsByStatus(
	status: FilterByGoalStatus,
	options?: QueryOptions<Goals>,
) {
	const { data, ...rest } = useQuery<Goals>({
		queryFn: async () => {
			const goals = await goalService.getAll()
			const filterStrategy = filterGoalsByStatus[status]
			return filterStrategy(goals)
		},
		queryKey: [QUERY_KEYS.GET_GOALS, status],
		refetchOnWindowFocus: false,
		...options,
	})
	return { goals: data, ...rest }
}
