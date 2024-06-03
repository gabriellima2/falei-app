import { PoemServiceImpl } from "@/services/impl/poem.service.impl";
import { makeExerciseRepositoryImpl } from "../repositories/make-exercise-repository-impl";

export const makePoemService = () => {
	return new PoemServiceImpl(makeExerciseRepositoryImpl());
};
