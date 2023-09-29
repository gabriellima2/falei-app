import { BaseExerciseRepositoryImpl } from ".";
import type { ReadExerciseEntity } from "@/entities";

export class ReadExerciseRepositoryImpl extends BaseExerciseRepositoryImpl<ReadExerciseEntity> {
	constructor() {
		super("read_exercises");
	}
}
