import { formatDurationTime } from "../date"

describe('formatDurationTime', () => {
	it('should return the correct duration in seconds', () => {
		expect(formatDurationTime(25000)).toBe('25 seg.')
		expect(formatDurationTime(2000)).toBe('2 seg.')
	})
	it('should return the correct duration in minutes when total time is 60 seconds or more', () => {
		expect(formatDurationTime(120000)).toBe('2 min.')
		expect(formatDurationTime(60000)).toBe('1 min.')
	})
})
