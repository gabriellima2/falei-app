import type { ActivityHistoryEntity } from './activity-history.entity'

export type GoalStatus = 'pending' | 'completed'

export interface GoalEntity {
	id: string
	title: string
	roundsTotal: number
	steps: {
		exhale: number
		hold: number
		inhale: number
	}
	frequencyPerWeek: number
	currentWeekProgress: number
	activityHistory: ActivityHistoryEntity[]
	userId?: string | null
	createdAt: Date
	updatedAt: Date
	status: GoalStatus
}
