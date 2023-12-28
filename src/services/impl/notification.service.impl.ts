import * as Notifications from "expo-notifications";

import { NotificationService } from "../notification.service";
import { ExpoNotifications } from "@/lib/expo-notifications";

import type {
	CancelNotificationInputDTO,
	CancelNotificationOutputDTO,
	ScheduleNotificationInputDTO,
	ScheduleNotificationOutputDTO,
} from "@/dtos/notification.dto";

export class NotificationServiceImpl
	extends ExpoNotifications
	implements NotificationService
{
	constructor() {
		super();
		this.setDefaultConfig();
	}
	async schedule(
		params: ScheduleNotificationInputDTO
	): ScheduleNotificationOutputDTO {
		const { title, body, scheduledAt } = params;
		if (this.status && this.status !== "granted") return [];
		const promises = scheduledAt.days.map(async (day) => {
			const { hour, minute } = scheduledAt;
			const id = await Notifications.scheduleNotificationAsync({
				content: { title, body },
				trigger: {
					seconds: 10,
				},
			});
			return { ...params, id };
		});
		const notifications = Promise.all(promises);
		return notifications;
	}
	async cancel(id: CancelNotificationInputDTO): CancelNotificationOutputDTO {
		await Notifications.cancelScheduledNotificationAsync(id);
	}
	async cancelAll() {
		await Notifications.cancelAllScheduledNotificationsAsync();
	}
}
