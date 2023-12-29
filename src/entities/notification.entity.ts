import { ScheduledAtEntity } from "./scheduled-at.entity";

export interface NotificationEntity {
	id: string;
	title: string;
	body: string;
	scheduledAt: ScheduledAtEntity;
}
