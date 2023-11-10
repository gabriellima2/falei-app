import { useCallback, useMemo } from "react";
import type { BreathingExerciseEntity } from "@/entities/breathing-entities";

export function useIncompleteBreathingExercises<
	T extends BreathingExerciseEntity
>(exercises: T[], additional?: (exercise: T) => boolean): T[] | undefined {
	const isIncomplete = (exercise: T) => {
		return (
			exercise.rounds.rounds_completed > 0 &&
			exercise.rounds.rounds_completed < exercise.rounds.rounds_total
		);
	};

	const getIncomplete = useCallback(
		(data: T[], additional?: (item: T) => boolean) => {
			if (!data || data.length === 0) return;
			const filtered = data.filter(
				(item) => isIncomplete(item) && (additional ? additional(item) : true)
			);
			return filtered.length === 0 ? undefined : filtered;
		},
		[]
	);

	return useMemo(
		() => getIncomplete(exercises, additional),
		[getIncomplete, exercises]
	);
}
