import type { BaseExerciseEntity } from "@/entities";

export type UpdateExerciseInputDTO<T extends BaseExerciseEntity> = Pick<
	T,
	"id"
> &
	Partial<Omit<T, "id">>;
export type UpdateExerciseOutputDTO = Promise<void>;
