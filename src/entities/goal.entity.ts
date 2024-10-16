import type { ActivityHistoryEntity } from './activity-history.entity'

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
}
