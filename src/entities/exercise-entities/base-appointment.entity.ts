import { BaseExerciseEntity } from "./base-exercise.entity";

export interface ScheduledAt {
	days: string[];
	hour: string;
}

export interface BaseAppointmentEntity extends Required<BaseExerciseEntity> {
	readonly exercise_id: string;
	readonly scheduled_at: ScheduledAt;
}