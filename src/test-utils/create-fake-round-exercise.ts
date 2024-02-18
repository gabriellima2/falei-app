type CreateFakeRoundExerciseParams = {
	roundsCompleted: number;
	roundsTotal: number;
};

export function createFakeRoundExercise(params: CreateFakeRoundExerciseParams) {
	const { roundsCompleted, roundsTotal } = params;
	return {
		rounds: {
			completed: roundsCompleted,
			total: roundsTotal,
		},
		lastProgressAt: {
			seconds: 0,
			nanoseconds: 0,
		},
	};
}
