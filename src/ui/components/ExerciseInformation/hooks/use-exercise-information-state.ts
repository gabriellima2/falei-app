export type UseExerciseInformationStateParams = {
	rounds: {
		total: number;
		completed: number;
		duration: number;
	};
};

const SECONDS = 60;

export function useExerciseInformationState(
	params: UseExerciseInformationStateParams
) {
	const { rounds } = params;
	const roundsTotal =
		rounds.completed === 0
			? rounds.total
			: `${rounds.total} / ${rounds.completed}`;

	const getTotalRoundDuration = () => {
		const total = rounds.duration * rounds.total;
		if (total < SECONDS) return `${total} Seg.`;
		const totalInMinutes = Math.floor(total / SECONDS);
		return `${totalInMinutes} Min.`;
	};

	return {
		rounds: roundsTotal,
		duration: getTotalRoundDuration(),
	};
}
