import { DEFAULT_ERROR_MESSAGES } from '@/constants/default-error-messages'

export class UnexpectedException extends Error {
	constructor() {
		super(DEFAULT_ERROR_MESSAGES.UNEXPECTED_ERROR)
		this.name = 'UnexpectedException'
	}
}
