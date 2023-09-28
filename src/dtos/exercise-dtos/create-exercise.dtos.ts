export type CreateExerciseInputDTO<T> = Omit<T, "id">;
export type CreateExerciseOutputDTO<T> = Promise<T>;
