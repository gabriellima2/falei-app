import type {
	BreathingAppointmentEntity,
	BreathingExerciseEntity,
} from "@/entities/breathing-entities";

export type GetAllBreathingExerciseOutputDTO = Promise<{
	appointments: BreathingAppointmentEntity[];
	exercises: BreathingExerciseEntity[];
}>;
