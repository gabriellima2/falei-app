import { AppointmentRepository } from "@/repositories/appointment.repository";
import { NotificationAdapter } from "@/adapters/notification.adapter";

import { ExerciseCategoryEntity } from "@/entities/exercise-category.entity";

import { NotificationPermissionStatus } from "@/constants/notification-permission-status";
import { UNEXPECTED_ERROR } from "@/errors";

import {
	CreateReminderInputDTO,
	CreateReminderOutputDTO,
} from "@/dtos/reminder.dto";
import type { ReminderService } from "../reminder.service";

export class ReminderServiceImpl implements ReminderService {
	constructor(
		private readonly appointment: AppointmentRepository,
		private readonly notification: NotificationAdapter
	) {}
	async create(
		userID: string,
		params: CreateReminderInputDTO
	): CreateReminderOutputDTO {
		const date = new Date(params.time);
		const scheduledAt = {
			days: params.days.reduce((acc, day) => {
				const dayNumber = Number(day);
				if (!isNaN(dayNumber)) {
					acc.push(dayNumber);
				}
				return acc;
			}, [] as number[]),
			hour: date.getUTCHours(),
			minutes: date.getUTCMinutes(),
		};
		if (this.notification.status !== NotificationPermissionStatus.GRANTED) {
			await this.notification.getPermissions();
		}
		if (this.notification.status === NotificationPermissionStatus.GRANTED) {
			const createdNotification = await this.notification.schedule({
				title: "Prepare-se para o seu próximo exercício!",
				body: `Prepare-se para o exercício ${params.title}. Lembre-se, cada passo conta!`,
				scheduledAt,
			});
			if (!createdNotification || !createdNotification.length) {
				throw new Error(UNEXPECTED_ERROR);
			}
			await this.appointment.create({
				userID,
				exerciseID: params.id,
				notificationID: createdNotification[0].id,
				category: ExerciseCategoryEntity.Breathing,
				scheduledAt,
			});
		}
	}
}
