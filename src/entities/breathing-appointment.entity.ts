export interface BreathingAppointmentEntity {
	id: string
	title: string
	roundsTotal: number
	steps: {
		exhale: number
		hold: number
		inhale: number
	}
	scheduledAt: {
		days: number[]
		hour: number
		minutes: number
	}
	notificationId: string
	userId: string
	createdAt: string
	updatedAt: string
}
