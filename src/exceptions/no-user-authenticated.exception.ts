import { DEFAULT_ERROR_MESSAGES } from '@/constants/default-error-messages'

export class NoUserAuthenticatedEception extends Error {
	constructor() {
		super(DEFAULT_ERROR_MESSAGES.NO_USER_AUTHENTICATED)
		this.name = 'NoUserAuthenticatedEception'
	}
}
