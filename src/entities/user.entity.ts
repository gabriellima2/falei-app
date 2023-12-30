export interface UserEntity {
	id: string;
	email: string | null;
	password: string;
	emailVerified?: boolean;
	isAnonymous?: boolean;
}
