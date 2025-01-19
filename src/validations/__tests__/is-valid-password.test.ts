import { isValidPassword } from "../utils"

describe('isValidPassword', () => {
	it('should return true for valid passwords', () => {
		expect(isValidPassword('12345678')).toBeTruthy()
		expect(isValidPassword('12345678910')).toBeTruthy()
	})
	it('should return false for invalid passwords', () => {
		expect(isValidPassword('1234')).toBeFalsy()
		expect(isValidPassword('    12345')).toBeFalsy()
		expect(isValidPassword('')).toBeFalsy()
		expect(isValidPassword('            ')).toBeFalsy()
	})
})
