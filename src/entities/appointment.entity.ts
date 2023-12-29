import { ScheduledAtEntity } from "./scheduled-at.entity";
import { ExerciseEntity } from "./exercise.entity";

export interface AppointmentEntity extends Required<ExerciseEntity> {
	readonly exerciseID: string;
	readonly scheduledAt: ScheduledAtEntity;
}
