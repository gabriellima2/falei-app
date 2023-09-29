import { ReadExerciseRepositoryImpl } from "@/repositories/exercise-repositories/implementations/read-exercise.repository.impl";

export const makeReadExerciseRepositoryImpl = () =>
	new ReadExerciseRepositoryImpl();
