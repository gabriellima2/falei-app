export interface NotificationEntity {
	id: string;
	title: string;
	body: string;
	scheduledAt: {
		days: number[];
		hour: number;
		minutes: number;
	};
}
