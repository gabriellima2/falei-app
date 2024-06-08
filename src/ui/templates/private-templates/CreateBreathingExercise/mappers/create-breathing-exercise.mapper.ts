import type { CreateBreathingInputDTO } from "@/dtos/breathing.dto";
import type { CreateBreathingExerciseFields } from "@/schemas";

export function createBreathingExerciseMapper(
	fields: CreateBreathingExerciseFields
): CreateBreathingInputDTO {
	return {
		title: fields.title,
		time: fields.time,
		days: fields.days,
		rounds: fields.rounds,
		steps: fields.steps,
	};
}
