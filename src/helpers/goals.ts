import type { GoalStatus } from '@/@types/general'
import type { GoalEntity } from '@/entities/goal.entity'

export function isCompletedGoal({
	currentWeekProgress, frequencyPerWeek,
}: { currentWeekProgress: number; frequencyPerWeek: number; }): boolean {
	return currentWeekProgress >= frequencyPerWeek
}

export function isPendingGoal({
	currentWeekProgress,
	frequencyPerWeek,
}: { currentWeekProgress: number; frequencyPerWeek: number }): boolean {
	return currentWeekProgress !== frequencyPerWeek
}

export const filterGoalsByStatus: Record<
	GoalStatus,
	(goals: GoalEntity[]) => GoalEntity[]
> = {
	all: (goals) => goals,
	completed: (goals: GoalEntity[]): GoalEntity[] => {
		return goals.filter((goal) =>
			isCompletedGoal({
				currentWeekProgress: goal.currentWeekProgress,
				frequencyPerWeek: goal.frequencyPerWeek,
			}),
		)
	},
	pending: (goals: GoalEntity[]): GoalEntity[] => {
		return goals.filter((goal) =>
			isPendingGoal({
				currentWeekProgress: goal.currentWeekProgress,
				frequencyPerWeek: goal.frequencyPerWeek,
			}),
		)
	},
}
