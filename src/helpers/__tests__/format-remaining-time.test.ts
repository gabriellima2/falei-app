import { formatRemainingTime } from "../date"

describe('formatRemainingTime', () => {
	it('should return the correct remaining in seconds', () => {
		expect(formatRemainingTime(40)).toBe('40 segundos')
		expect(formatRemainingTime(59)).toBe('59 segundos')
	})
	it('should return the correct remaining time when base time is 60 seconds or more', () => {
		expect(formatRemainingTime(60)).toBe('1 minuto')
		expect(formatRemainingTime(120)).toBe('2 minutos')
		expect(formatRemainingTime(125)).toBe('2 minutos e 5 segundos')
		expect(formatRemainingTime(61)).toBe('1 minuto e 1 segundo')
	})
})
