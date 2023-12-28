import * as Notifications from "expo-notifications";

import { NotificationService } from "../notification.service";
import { ExpoNotifications } from "@/lib/expo-notifications";

import type {
	CancelNotificationInputDTO,
	CancelNotificationOutputDTO,
	ScheduleNotificationInputDTO,
	ScheduleNotificationOutputDTO,
} from "@/dtos/notification.dto";

type ScheduleDate = {
	day: number;
	hour: number;
	minutes: number;
};

function scheduleToNextWeek(params: ScheduleDate) {
	const { day, hour, minutes } = params;
	const date = new Date();
	const resultDate = new Date(date.getTime());
	resultDate.setDate(date.getDate() + ((7 + day - date.getDay() - 1) % 7) + 1);
	resultDate.setHours(hour);
	resultDate.setMinutes(minutes);
	resultDate.setSeconds(0);
	const now = new Date().getTime();
	const scheduled = resultDate.getTime();
	const differenceInSeconds = (scheduled - now) / 1000 - date.getSeconds();
	return differenceInSeconds;
}

function transformTimeInSeconds(hour: number, minutes: number) {
	const currentHourInSeconds = hour * 3600;
	const currentMinutesInSeconds = minutes * 60;
	return currentHourInSeconds + currentMinutesInSeconds;
}

function scheduleToday(params: Omit<ScheduleDate, "day">) {
	const { hour, minutes } = params;
	const date = new Date();
	const currentTimeInSeconds = transformTimeInSeconds(
		date.getHours(),
		date.getMinutes()
	);
	const scheduledTimeInSeconds = transformTimeInSeconds(hour, minutes);
	return scheduledTimeInSeconds - currentTimeInSeconds - date.getSeconds();
}

function handleScheduleDate(params: ScheduleDate) {
	const { day, hour, minutes } = params;
	const date = new Date();
	if (
		date.getDay() === day &&
		hour >= date.getHours() &&
		minutes > date.getMinutes()
	) {
		return scheduleToday({ hour, minutes });
	}
	return scheduleToNextWeek(params);
}

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
			const seconds = handleScheduleDate({ day, hour, minutes });
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
