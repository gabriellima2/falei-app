export interface BreathingExerciseEntity {
	id: string
	title: string
	roundsTotal: number
	steps: {
		exhale: number
		hold: number
		inhale: number
	}
	userId: string | null
	createdAt: string
	updatedAt: string
}
