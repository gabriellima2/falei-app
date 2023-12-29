import type {
	CancelNotificationInputDTO,
	CancelNotificationOutputDTO,
	ScheduleNotificationInputDTO,
	ScheduleNotificationOutputDTO,
} from "@/dtos/notification.dto";

export interface NotificationAdapter {
	schedule(params: ScheduleNotificationInputDTO): ScheduleNotificationOutputDTO;
	cancel(id: CancelNotificationInputDTO): CancelNotificationOutputDTO;
	cancelAll(): Promise<void>;
	setDefaultConfig(): void;
	getPermissions(): Promise<void>;
}
