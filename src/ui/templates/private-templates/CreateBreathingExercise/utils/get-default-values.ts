import type { CreateBreathingExerciseFields } from "@/schemas";

export function getDefaultValues(): CreateBreathingExerciseFields {
	return {
		title: "",
		rounds: "",
		days: [],
		time: new Date(),
		steps: { inhale: "1", hold: "1", exhale: "1" },
	};
}
