import { GenericExerciseEntity } from "@/entities";

export type UpdateExerciseInputDTO<T extends GenericExerciseEntity> = Pick<
	T,
	"id"
> &
	Partial<Omit<T, "id">>;
export type UpdateExerciseOutputDTO = Promise<void>;
