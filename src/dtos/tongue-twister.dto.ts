export type CreateTongueTwisterInputDTO = {
	content: string;
	credits: {
		author: string | null;
	};
};
export type CreateTongueTwisterOutputDTO = Promise<void>;
