import { ExerciseEntity } from "@/entities/exercise.entity";

export type CreateExerciseInputDTO<T> = Omit<T, "id">;
export type CreateExerciseOutputDTO<T> = Promise<T>;

export type DeleteExerciseInputDTO = Pick<ExerciseEntity, "id" | "category">;
export type DeleteExerciseOutputDTO = Promise<void>;

export type GetAllExercisesInputDTO = Pick<ExerciseEntity, "category">;
export type GetAllExercisesOutputDTO<T> = Promise<T[]>;

export type GetExerciseByIdInputDTO = Pick<ExerciseEntity, "id" | "category">;
export type GetExerciseByIdOutputDTO<T> = Promise<T | undefined>;

export type UpdateExerciseInputDTO<T extends ExerciseEntity> = Pick<
	T,
	"id" | "category"
> &
	Partial<Omit<T, "id" | "category">>;
export type UpdateExerciseOutputDTO = Promise<void>;
