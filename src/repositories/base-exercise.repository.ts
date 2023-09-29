import {
	GetExerciseByIdInputDTO,
	GetExerciseByIdOutputDTO,
	GetAllExercisesOutputDTO,
	DeleteExerciseInputDTO,
	DeleteExerciseOutputDTO,
	CreateExerciseInputDTO,
	CreateExerciseOutputDTO,
	UpdateExerciseInputDTO,
	UpdateExerciseOutputDTO,
} from "@/dtos/exercise-dtos";
import { BaseExerciseEntity } from "@/entities";

export interface BaseExerciseRepository<T extends BaseExerciseEntity> {
	create(params: CreateExerciseInputDTO<T>): CreateExerciseOutputDTO<T>;
	update(params: UpdateExerciseInputDTO<T>): UpdateExerciseOutputDTO;
	delete(id: DeleteExerciseInputDTO): DeleteExerciseOutputDTO;
	getById(id: GetExerciseByIdInputDTO): GetExerciseByIdOutputDTO<T>;
	getAll(): GetAllExercisesOutputDTO<T>;
}
