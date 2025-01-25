import { parseTimestamp } from "../date"

describe('parseTimestamp', () => {
	it('should parse timestamp to date object', () => {
		const date = parseTimestamp({
			seconds: 1705762790,
			nanoseconds: 123456789,
		})

		expect(date).toBeInstanceOf(Date)
		expect(date.toISOString()).toBe('2024-01-20T14:59:50.000Z')
	})
})
