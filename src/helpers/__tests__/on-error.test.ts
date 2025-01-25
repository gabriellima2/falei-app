import { onError } from '../error'
import { DEFAULT_ERROR_MESSAGES } from '@/constants/default-error-messages'

describe('onError', () => {
	it('should return the error message when the error has a message', () => {
		const message = onError(new Error('any_message'))
		expect(message).toBe('any_message')
	})
	it('should return the fallback message when the error has no message', () => {
		const message = onError(new Error())
		expect(message).toBe(DEFAULT_ERROR_MESSAGES.UNEXPECTED_ERROR)
	})
	it('should return the fallback message when the error is not an instance of Error', () => {
		const message = onError('any' as unknown)
		expect(message).toBe(DEFAULT_ERROR_MESSAGES.UNEXPECTED_ERROR)
	})
	it('should return the fallback message when the error is null or undefined', () => {
		expect(onError(null as unknown)).toBe(DEFAULT_ERROR_MESSAGES.UNEXPECTED_ERROR)
		expect(onError(undefined as unknown)).toBe(DEFAULT_ERROR_MESSAGES.UNEXPECTED_ERROR)
	})
})
