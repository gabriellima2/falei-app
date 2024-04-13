import { Platform } from "react-native";
import * as Notifications from "expo-notifications";

import { NotificationAdapter } from "../notification.adapter";

import { getDiffInSecondsBasedOnDate } from "@/helpers/get-diff-in-seconds-based-on-date";
import { NotificationPermissionStatus } from "@/constants/notification-permission-status";

import type {
	CancelNotificationInputDTO,
	CancelNotificationOutputDTO,
	ScheduleNotificationInputDTO,
	ScheduleNotificationOutputDTO,
} from "@/dtos/notification.dto";

let HAS_NOTIFICATION_CONFIG = false;

export class NotificationAdapterImpl implements NotificationAdapter {
	public status: string;
	constructor() {
		this.status = NotificationPermissionStatus.UNDETERMINED;
		this.setDefaultConfig();
	}
	public async schedule(
		params: ScheduleNotificationInputDTO
	): ScheduleNotificationOutputDTO {
		const { title, body, scheduledAt } = params;
		if (this.status && this.status !== NotificationPermissionStatus.GRANTED) {
			await this.getPermissions();
		}
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
	public async cancel(
		id: CancelNotificationInputDTO
	): CancelNotificationOutputDTO {
		await Notifications.cancelScheduledNotificationAsync(id);
	}
	public async cancelAll() {
		await Notifications.cancelAllScheduledNotificationsAsync();
	}
	public setDefaultConfig() {
		if (HAS_NOTIFICATION_CONFIG) return;
		Notifications.setNotificationHandler({
			handleNotification: async () => ({
				shouldShowAlert: true,
				shouldPlaySound: false,
				shouldSetBadge: false,
			}),
		});
		if (Platform.OS === "android") {
			Notifications.setNotificationChannelAsync("default", {
				name: "default",
				importance: Notifications.AndroidImportance.MAX,
				vibrationPattern: [0, 250, 250, 250],
				lightColor: "#FF231F7C",
			});
		}
		HAS_NOTIFICATION_CONFIG = true;
	}
	public async getPermissions() {
		if (this.status === NotificationPermissionStatus.GRANTED) return;
		const { status } = await Notifications.getPermissionsAsync();
		this.status = status;
		if (status !== NotificationPermissionStatus.GRANTED) {
			const { status } = await Notifications.requestPermissionsAsync();
			this.status = status;
		}
	}
}
