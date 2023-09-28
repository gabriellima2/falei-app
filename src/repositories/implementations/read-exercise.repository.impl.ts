import { ReadExerciseEntity } from "@/entities";
import { GenericExerciseRepositoryImpl } from ".";

export class ReadExerciseRepositoryImpl extends GenericExerciseRepositoryImpl<ReadExerciseEntity> {
	constructor() {
		super("read_exercises");
	}
}
