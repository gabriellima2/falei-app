import type {
	CancelNotificationInputDTO,
	CancelNotificationOutputDTO,
	ScheduleNotificationInputDTO,
	ScheduleNotificationOutputDTO,
} from "@/dtos/notification.dto";

export interface NotificationService {
	schedule(params: ScheduleNotificationInputDTO): ScheduleNotificationOutputDTO;
	cancel(id: CancelNotificationInputDTO): CancelNotificationOutputDTO;
	cancelAll(): Promise<void>;
	getPermissions(): Promise<void>;
}
