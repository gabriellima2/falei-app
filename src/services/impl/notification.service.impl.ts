import * as Notifications from "expo-notifications";

import { NotificationService } from "../notification.service";
import { ExpoNotifications } from "@/lib/expo-notifications";

import { getDiffInSecondsBasedOnDate } from "@/helpers/get-diff-in-seconds-based-on-date";
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
			const { hour, minutes } = scheduledAt;
			const seconds = getDiffInSecondsBasedOnDate({ day, hour, minutes });
			const id = await Notifications.scheduleNotificationAsync({
				content: { title, body },
				trigger: { seconds },
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
