import { VALIDATION_RULES } from './constants'

export function isValidPassword(password: string) {
	return password.trim().length >= VALIDATION_RULES.MIN_LENGTH_PASSWORD
}
