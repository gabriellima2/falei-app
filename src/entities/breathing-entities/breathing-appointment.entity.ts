import { AppointmentEntity } from "../appointment.entity";
import { BreathingExerciseEntity } from "./breathing-exercise.entity";

interface Breathing extends Omit<BreathingExerciseEntity, "user_id"> {}

export interface BreathingAppointmentEntity
	extends AppointmentEntity,
		Breathing {}
