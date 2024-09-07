/* eslint-disable @typescript-eslint/no-unused-vars */
import { Platform } from 'react-native'
import * as Notifications from 'expo-notifications'

import { NOTIFICATION_PERMISSION_STATUS } from '@/constants/status'

import type {
	CancelNotificationInputDTO,
	CancelNotificationOutputDTO,
	ScheduleNotificationInputDTO,
	ScheduleNotificationOutputDTO,
} from '@/dtos/notification.dto'

export interface NotificationAdapter {
	status: string
	schedule(params: ScheduleNotificationInputDTO): ScheduleNotificationOutputDTO
	cancel(id: CancelNotificationInputDTO): CancelNotificationOutputDTO
	cancelAll(): Promise<void>
	setDefaultConfig(): void
	getPermissions(): Promise<void>
}

let HAS_NOTIFICATION_CONFIG = false

class NotificationAdapterImpl implements NotificationAdapter {
	public status: string
	constructor() {
		this.status = NOTIFICATION_PERMISSION_STATUS.UNDETERMINED
	}
	public async schedule(
		params: ScheduleNotificationInputDTO
	): ScheduleNotificationOutputDTO {
		/*const { title, body, scheduledAt } = params
		if (this.status && this.status !== NOTIFICATION_PERMISSION_STATUS.GRANTED) {
			await this.getPermissions()
		}
		const promises = scheduledAt.days.map(async (day) => {
			const { hour, minutes } = scheduledAt
			const seconds = getDiffInSecondsBasedOnDate({ day, hour, minutes })
			const id = await Notifications.scheduleNotificationAsync({
				content: { title, body },
				trigger: { seconds },
			})
			return { ...params, id }
		})
		const notifications = Promise.all(promises)
		return notifications*/
	}
	public async cancel(
		id: CancelNotificationInputDTO
	): CancelNotificationOutputDTO {
		await Notifications.cancelScheduledNotificationAsync(id)
	}
	public async cancelAll() {
		await Notifications.cancelAllScheduledNotificationsAsync()
	}
	public async setDefaultConfig() {
		if (HAS_NOTIFICATION_CONFIG) return
		Notifications.setNotificationHandler({
			handleNotification: async () => ({
				shouldShowAlert: true,
				shouldPlaySound: false,
				shouldSetBadge: false,
			}),
		})
		if (Platform.OS === 'android') {
			await Notifications.setNotificationChannelAsync('default', {
				name: 'default',
				importance: Notifications.AndroidImportance.MAX,
				vibrationPattern: [0, 250, 250, 250],
				lightColor: '#FF231F7C',
			})
		}
		HAS_NOTIFICATION_CONFIG = true
	}
	public async getPermissions() {
		try {
			await this.setDefaultConfig()
			if (this.status === NOTIFICATION_PERMISSION_STATUS.GRANTED) return
			const { status } = await Notifications.getPermissionsAsync()
			this.status = status
			if (status !== NOTIFICATION_PERMISSION_STATUS.GRANTED) {
				const { status } = await Notifications.requestPermissionsAsync()
				this.status = status
			}
		} catch (err) {
			console.error((err as Error).message)
		}
	}
}

export const makeNotificationAdapter = () => new NotificationAdapterImpl()
