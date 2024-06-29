export type CreateReminderInputDTO = {
	days: string[];
	time: Date;
};
export type CreateReminderOutputDTO = Promise<void>;
