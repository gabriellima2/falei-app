import { BaseExerciseRepositoryImpl } from ".";
import { ReadExerciseEntity } from "@/entities";

export class ReadExerciseRepositoryImpl extends BaseExerciseRepositoryImpl<ReadExerciseEntity> {
	constructor() {
		super("read_exercises");
	}
}
