type CreateFakeRoundExerciseParams = {
	roundsCompleted: number;
	roundsTotal: number;
};

export function createFakeRoundExercise(params: CreateFakeRoundExerciseParams) {
	const { roundsCompleted, roundsTotal } = params;
	return {
		rounds: {
			rounds_completed: roundsCompleted,
			rounds_total: roundsTotal,
		},
	};
}