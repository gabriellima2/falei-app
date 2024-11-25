import { DEFAULT_ERROR_MESSAGES } from '@/constants/default-error-messages'

export class UnauthenticatedUserException extends Error {
	constructor() {
		super(DEFAULT_ERROR_MESSAGES.UNAUTHENTICATED_USER)
		this.name = 'UnauthenticatedUserException'
	}
}
