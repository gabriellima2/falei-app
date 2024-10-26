export const ROUTES = {
	AUTH: {
		SIGN_UP: '/sign-up',
		SIGN_IN: '/sign-in'
	},
	HOME: '/',
	DO_BREATHING_EXERCISE: (id: string) => `/do-breathing-exercise/${id}`,
	DO_GOAL: (id: string) => `/do-goal/${id}`,
	EXERCISE_COMPLETED: '/exercise-completed',
}
