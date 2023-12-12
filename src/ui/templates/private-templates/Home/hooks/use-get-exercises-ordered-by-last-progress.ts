import { useMemo } from "react";
import { BreathingExerciseEntity } from "@/entities/breathing-entities";

type LastProgress = Pick<
	BreathingExerciseEntity,
	"last_progress_at"
>["last_progress_at"];

export function useGetExercisesOrderedByLastProgress<
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
			return getHour(prev.last_progress_at) - getHour(next.last_progress_at);
		});
	}, [exercises]);
}
