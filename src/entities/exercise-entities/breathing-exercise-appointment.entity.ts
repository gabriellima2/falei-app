import { BreathingExerciseEntity } from "./breathing-exercise.entity";
import { BaseAppointmentEntity } from "./base-appointment.entity";

export interface BreathingExerciseAppointmentEntity
	extends BaseAppointmentEntity,
		Omit<BreathingExerciseEntity, "user_id"> {}
