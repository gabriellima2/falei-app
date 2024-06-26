import { useMemo } from "react";
import { BreathingExerciseEntity } from "@/entities/breathing-entities";

type LastProgress = {
	seconds: number;
	nanoseconds: number;
};

export function useOrderExercisesByLastProgress<
	T extends BreathingExerciseEntity
>(exercises: T[]) {
	const getHour = (lastProgress: LastProgress) => {
		const { seconds, nanoseconds } = lastProgress;
		const convertedSeconds = seconds * 1000;
		const convertedNanoseconds = nanoseconds / 1000000;
		return convertedSeconds + convertedNanoseconds;
	};

	return useMemo(() => {
		if (!exercises.length) return [];
		return exercises.sort((prev, next) => {
			if (!prev.lastProgressAt || !next.lastProgressAt) return 0;
			return getHour(prev.lastProgressAt) - getHour(next.lastProgressAt);
		});
	}, [exercises]);
}
