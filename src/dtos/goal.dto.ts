import type { CreateActivityHistoryDTO } from "./activity-history.dto"

export interface CreateGoalDTO {
	title: string
	roundsTotal: number
	steps: {
		exhale: number
		hold: number
		inhale: number
	}
	frequencyPerWeek: number
	userId?: string | null
}

export interface UpdateGoalProgressDTO {
	activityHistory: CreateActivityHistoryDTO
}
