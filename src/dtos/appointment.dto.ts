import { ExerciseCategoryEntity } from "@/entities/exercise-category.entity";
import { ExerciseEntity } from "@/entities/exercise.entity";

export type CreateAppointmentInputDTO<T> = Omit<T, "id"> & {
	category: ExerciseCategoryEntity;
};
export type CreateAppointmentOutputDTO<T> = Promise<T>;

export type DeleteAppointmentInputDTO = Pick<ExerciseEntity, "id" | "category">;
export type DeleteAppointmentOutputDTO = Promise<void>;

export type GetAllAppointmentsInputDTO = Pick<ExerciseEntity, "category">;
export type GetAllAppointmentsOutputDTO<T> = Promise<T[]>;

export type GetAppointmentByIdInputDTO = Pick<
	ExerciseEntity,
	"id" | "category"
>;
export type GetAppointmentByIdOutputDTO<T> = Promise<T | undefined>;

export type UpdateAppointmentInputDTO<T extends { id: string }> = Pick<
	T,
	"id"
> & {
	category: ExerciseCategoryEntity;
};
export type UpdateAppointmentOutputDTO = Promise<void>;
