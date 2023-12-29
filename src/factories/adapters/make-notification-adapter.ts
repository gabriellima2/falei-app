import { NotificationAdapterImpl } from "@/adapters/impl/notification.adapter.impl";

export const makeNotificationAdapter = () => {
	return new NotificationAdapterImpl();
};
