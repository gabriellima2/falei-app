import type { FirebaseActivityHistoryDTO } from "./firebase-activity-history.dto"

export interface FirebaseGoalDTO {
	title: string
	rounds_total: number
	steps: {
		exhale: number
		hold: number
		inhale: number
	}
	frequency_per_week: number
	activity_history: FirebaseActivityHistoryDTO[]
	user_id: string | null
	created_at: Timestamp
	updated_at: Timestamp
}

export interface FirebaseCreateGoalDTO {
	title: string
	activity_history: {
		created_at: Date
	}[]
	frequency_per_week: number
	rounds_total: number
	steps: {
		exhale: number
		hold: number
		inhale: number
	}
	user_id: string | null
	created_at: Date
	updated_at: Date
}
