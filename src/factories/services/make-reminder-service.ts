import { ReminderServiceImpl } from "@/services/impl/reminder.service.impl";
import { makeAppointmentRepositoryImpl } from "../repositories/make-appointment-repository-impl";
import { makeNotificationAdapter } from "../adapters/make-notification-adapter";

export const makeReminderService = () => {
	return new ReminderServiceImpl(
		makeAppointmentRepositoryImpl(),
		makeNotificationAdapter()
	);
};
