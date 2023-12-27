import { Platform } from "react-native";
import { isDevice } from "expo-device";
import * as Notifications from "expo-notifications";

import { NotificationService } from "../notification.service";

import type {
	CancelNotificationInputDTO,
	CancelNotificationOutputDTO,
	ScheduleNotificationInputDTO,
	ScheduleNotificationOutputDTO,
} from "@/dtos/notification.dto";

let HAS_NOTIFICATION_CONFIG = false;

export class NotificationServiceImpl implements NotificationService {
	public status: Notifications.PermissionStatus | null;
	constructor() {
		this.status = null;
		this.setDefaultConfig();
	}
	private setDefaultConfig() {
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
	async getPermissions() {
		if (this.status && this.status === "granted") return;
		if (isDevice) {
			const { status } = await Notifications.getPermissionsAsync();
			let finalStatus = status;
			if (status !== "granted") {
				const { status } = await Notifications.requestPermissionsAsync();
				finalStatus = status;
			}
			if (finalStatus !== "granted") {
				alert("Enable push notifications to use the app!");
			}
			this.status = finalStatus;
		} else {
			alert("Must use physical device for Push Notifications");
		}
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
					seconds: 60,
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
