import {
	CreateExerciseInputDTO,
	CreateExerciseOutputDTO,
	DeleteExerciseInputDTO,
	DeleteExerciseOutputDTO,
	GetAllExercisesOutputDTO,
	UpdateExerciseInputDTO,
	UpdateExerciseOutputDTO,
} from "@/dtos/exercise-dtos";
import { BaseExerciseEntity } from "@/entities";

export interface BaseScheduledExerciseRepository<T extends BaseExerciseEntity> {
	create(params: CreateExerciseInputDTO<T>): CreateExerciseOutputDTO<T>;
	update(params: UpdateExerciseInputDTO<T>): UpdateExerciseOutputDTO;
	delete(id: DeleteExerciseInputDTO): DeleteExerciseOutputDTO;
	getAll(): GetAllExercisesOutputDTO<T>;
}
