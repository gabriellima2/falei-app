export const ROUTES = {
	AUTH: {
		SIGN_UP: '/sign-up',
		SIGN_IN: '/sign-in',
		VERIFY_EMAIL: '/verify-email',
	},
	TABS: {
		HOME: '/(tabs)/',
	},
	APP: {
		DO_BREATHING_EXERCISE: (id: string) => `/(app)/do-breathing-exercise/${id}`,
		DO_GOAL: (id: string) => `/(app)/do-goal/${id}`,
		EXERCISE_COMPLETED: '/(app)/exercise-completed',
	},
}
