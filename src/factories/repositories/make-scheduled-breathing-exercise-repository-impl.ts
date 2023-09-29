import { ScheduledBreathingExerciseRepositoryImpl } from "@/repositories/exercise-repositories/implementations/scheduled-breathing-exercise.repository.impl";

export const makeScheduledBreathingExerciseRepositoryImpl = () =>
	new ScheduledBreathingExerciseRepositoryImpl();
