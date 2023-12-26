import { useMemo } from "react";

type UseCalcTotalRoundDuration = {
	rounds: number;
	duration: number;
};

const SECONDS = 60;

export function useCalcTotalRoundDuration(params: UseCalcTotalRoundDuration) {
	const { rounds, duration } = params;

	return useMemo(() => {
		const total = duration * rounds;
		if (total < SECONDS) return `${total} Seg.`;
		const totalInMinutes = Math.floor(total / SECONDS);
		return `${totalInMinutes} Min.`;
	}, [rounds, duration]);
}
