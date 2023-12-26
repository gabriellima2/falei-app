import * as Notifications from "expo-notifications";

import { NotificationService } from "../notification.service";

import type {
	CancelNotificationInputDTO,
	CancelNotificationOutputDTO,
	ScheduleNotificationInputDTO,
	ScheduleNotificationOutputDTO,
} from "@/dtos/notification.dto";

export class NotificationServiceImpl implements NotificationService {
	constructor() {
		Notifications.setNotificationHandler({
			handleNotification: async () => ({
				shouldShowAlert: true,
				shouldPlaySound: false,
				shouldSetBadge: false,
			}),
		});
	}
	async schedule(
		params: ScheduleNotificationInputDTO
	): ScheduleNotificationOutputDTO {
		const { title, body, scheduledAt } = params;
		const notificationID = await Notifications.scheduleNotificationAsync({
			content: { title, body },
			trigger: { date: scheduledAt },
		});
		return { ...params, id: notificationID };
	}
	async cancel(id: CancelNotificationInputDTO): CancelNotificationOutputDTO {
		await Notifications.cancelScheduledNotificationAsync(id);
	}
	async cancelAll() {
		await Notifications.cancelAllScheduledNotificationsAsync();
	}
}
