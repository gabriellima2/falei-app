import { ExerciseEntity } from "@/entities/exercise.entity";

export type CreateAppointmentInputDTO<T> = Omit<T, "id">;
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

export type UpdateAppointmentInputDTO<T extends ExerciseEntity> = Pick<
	T,
	"id" | "category"
> &
	Partial<Omit<T, "id" | "category">>;
export type UpdateAppointmentOutputDTO = Promise<void>;
