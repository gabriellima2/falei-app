import type { ActivityHistoryDTO } from './activity-history.dto'

export interface GoalDTO {
	title: string
	rounds_total: number
	steps: {
		exhale: number
		hold: number
		inhale: number
	}
	frequency_per_week: number
	activity_history: ActivityHistoryDTO[]
	user_id: string | null
	created_at: Timestamp
	updated_at: Timestamp
}

export interface CreateGoalDTO {
	title: string
	rounds_total: number
	steps: {
		exhale: number
		hold: number
		inhale: number
	}
	frequency_per_week: number
}
