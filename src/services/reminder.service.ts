import {
	type CreateReminderInputDTO,
	type CreateReminderOutputDTO,
} from "@/dtos/reminder.dto";

export interface ReminderService {
	create: (
		userID: string,
		params: CreateReminderInputDTO
	) => CreateReminderOutputDTO;
	delete: (appointmentId: string, notificationId: string) => Promise<void>;
}
