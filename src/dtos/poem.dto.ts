export type CreatePoemInputDTO = {
	content: string;
	credits: {
		workName: string | null;
		author: string | null;
	};
};
export type CreatePoemOutputDTO = Promise<void>;
