import { BreathingExerciseEntity } from "./breathing-exercise.entity";
import { AppointmentEntity } from "../appointment.entity";

export interface BreathingAppointmentEntity
	extends AppointmentEntity,
		Omit<BreathingExerciseEntity, "id" | "userID"> {}
