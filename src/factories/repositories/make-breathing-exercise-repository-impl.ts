import { BreathingExerciseRepositoryImpl } from "@/repositories/exercise-repositories/implementations/breathing-exercise.repository.impl";

export const makeBreathingExerciseRepositoryImpl = () =>
	new BreathingExerciseRepositoryImpl();
