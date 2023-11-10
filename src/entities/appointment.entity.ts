import { ExerciseEntity } from "./exercise.entity";

export interface Schedule {
	days: string[];
	hour: string;
}

export interface AppointmentEntity extends Required<ExerciseEntity> {
	readonly exercise_id: string;
	readonly scheduled_at: Schedule;
}
