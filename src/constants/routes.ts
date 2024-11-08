export const ROUTES = {
	AUTH: {
		SIGN_UP: '/sign-up',
		SIGN_IN: '/sign-in',
		VERIFY_EMAIL: '/verify-email',
		FORGOT_PASSWORD: '/forgot-password',
	},
	TABS: {
		HOME: '/(tabs)/',
		SETTINGS: '/(tabs)/settings',
	},
	APP: {
		DO_BREATHING_EXERCISE: (id: string) => `/do-breathing-exercise/${id}`,
		DO_GOAL: (id: string) => `/do-goal/${id}`,
		EXERCISE_COMPLETED: '/exercise-completed',
		MY_ACCOUNT: '/my-account',
	},
}
