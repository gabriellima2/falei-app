import { BaseExerciseRepositoryImpl } from "./base-exercise.repository.impl";
import type { ReadExerciseEntity } from "@/entities";

export class ReadExerciseRepositoryImpl extends BaseExerciseRepositoryImpl<ReadExerciseEntity> {
	constructor() {
		super("read_exercises");
	}
}
