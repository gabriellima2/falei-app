import { GOAL_STATUS } from '@/constants/general'

import type { FilterByGoalStatus } from '@/@types/general'
import type { GoalEntity } from '@/entities/goal.entity'

export const filterGoalsByStatus: Record<
	FilterByGoalStatus,
	(goals: GoalEntity[]) => GoalEntity[]
> = {
	all: (goals) => goals,
	completed: (goals: GoalEntity[]): GoalEntity[] => {
		return goals.filter((goal) => goal.status === GOAL_STATUS.COMPLETED)
	},
	pending: (goals: GoalEntity[]): GoalEntity[] => {
		return goals.filter((goal) => goal.status === GOAL_STATUS.PENDING)
	},
}
