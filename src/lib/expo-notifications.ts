import { Platform } from "react-native";
import { isDevice } from "expo-device";
import * as Notifications from "expo-notifications";

import { NotificationPermissionStatus } from "@/constants/notification-permission-status";

let HAS_NOTIFICATION_CONFIG = false;

export class ExpoNotifications {
	public status: string;
	constructor() {
		this.status = NotificationPermissionStatus.UNDETERMINED;
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
		let finalStatus = status;
		if (status !== NotificationPermissionStatus.GRANTED) {
			const { status } = await Notifications.requestPermissionsAsync();
			finalStatus = status;
		}
		if (finalStatus !== NotificationPermissionStatus.GRANTED) {
			alert("Enable push notifications to use the app!");
		}
		this.status = finalStatus;
		return;
	}
}
