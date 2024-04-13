import { ScheduledAtEntity } from "./scheduled-at.entity";

export interface AppointmentEntity {
	readonly id: string;
	readonly userID: string;
	readonly exerciseID: string;
	readonly notificationID: string;
	readonly scheduledAt: ScheduledAtEntity;
}
