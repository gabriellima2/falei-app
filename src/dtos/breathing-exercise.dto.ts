export interface BreathingExerciseDTO {
	title: string
	rounds_total: number
	steps: {
		exhale: number
		hold: number
		inhale: number
	}
	user_id: string | null
	created_at: Timestamp
	updated_at: Timestamp
}
