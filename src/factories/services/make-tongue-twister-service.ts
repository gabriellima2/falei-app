import { TongueTwisterServiceImpl } from "@/services/impl/tongue-twister.service.impl";
import { makeExerciseRepositoryImpl } from "../repositories/make-exercise-repository-impl";

export const makeTongueTwisterService = () => {
	return new TongueTwisterServiceImpl(makeExerciseRepositoryImpl());
};
