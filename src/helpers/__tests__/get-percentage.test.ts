import { getPercentage } from "../general"

describe('getPercentage', () => {
	it('should return the correct percentage', () => {
		expect(getPercentage(50, 200)).toBe(25)
		expect(getPercentage(100, 100)).toBe(100)
	})
	it('should cap the percentage at 100 when valueLeft exceeds valueRight', () => {
		expect(getPercentage(150, 100)).toBe(100)
	})
	it('should return 0 when either valueLeft or valueRight is 0', () => {
		expect(getPercentage(100, 0)).toBe(0)
		expect(getPercentage(0, 100)).toBe(0)
	})
})
