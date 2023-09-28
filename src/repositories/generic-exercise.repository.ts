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
import { GenericExerciseEntity } from "@/entities";

export interface GenericExerciseRepository<T extends GenericExerciseEntity> {
	create(params: CreateExerciseInputDTO<T>): CreateExerciseOutputDTO<T>;
	update(params: UpdateExerciseInputDTO<T>): UpdateExerciseOutputDTO;
	delete(id: DeleteExerciseInputDTO): DeleteExerciseOutputDTO;
	getById(id: GetExerciseByIdInputDTO): GetExerciseByIdOutputDTO<T>;
	getAll(): GetAllExercisesOutputDTO<T>;
}
