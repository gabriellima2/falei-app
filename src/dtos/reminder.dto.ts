export type CreateReminderInputDTO = {
	title: string;
	id: string;
	days: string[];
	time: Date;
};
export type CreateReminderOutputDTO = Promise<void>;
