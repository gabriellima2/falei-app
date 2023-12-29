import { AppointmentEntity } from "../appointment.entity";
import { BreathingExerciseEntity } from "./breathing-exercise.entity";

interface Breathing extends Omit<BreathingExerciseEntity, "userID"> {}

export interface BreathingAppointmentEntity
	extends AppointmentEntity,
		Breathing {}
