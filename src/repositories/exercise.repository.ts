import type { ExerciseEntity } from "@/entities/exercise.entity";
import type * as DTO from "@/dtos/exercise.dto";

export interface ExerciseRepository {
	create<T extends ExerciseEntity>(
		params: DTO.CreateExerciseInputDTO<T>
	): DTO.CreateExerciseOutputDTO<T>;
	update<T extends ExerciseEntity>(
		params: DTO.UpdateExerciseInputDTO<T>
	): DTO.UpdateExerciseOutputDTO;
	delete(params: DTO.DeleteExerciseInputDTO): DTO.DeleteExerciseOutputDTO;
	getById<T extends ExerciseEntity>(
		params: DTO.GetExerciseByIdInputDTO
	): DTO.GetExerciseByIdOutputDTO<T>;
	getAll<T extends ExerciseEntity>(
		params: DTO.GetAllExercisesInputDTO
	): DTO.GetAllExercisesOutputDTO<T>;
}
