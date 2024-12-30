import type { GoalStatus } from '@/@types/general'
import type { GoalEntity } from '@/entities/goal.entity'

export const filterGoalsByStatus: Record<
	GoalStatus,
	(goals: GoalEntity[]) => GoalEntity[]
> = {
	all: (goals) => goals,
	completed: (goals: GoalEntity[]): GoalEntity[] => {
		return goals.filter(
			(goal) => goal.currentWeekProgress >= goal.frequencyPerWeek,
		)
	},
	pending: (goals: GoalEntity[]): GoalEntity[] => {
		return goals.filter(
			(goal) => goal.currentWeekProgress !== goal.frequencyPerWeek,
		)
	},
}
