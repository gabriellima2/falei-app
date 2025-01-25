import { CUSTOM_CODE_FOR_BREAK_LINE } from "@/constants/general"
import { getSentencesWithBreakLine } from "../general"

describe('getSentencesWithBreakLine', () => {
	it('should return an empty array if the parameter text is empty or only whitespace', () => {
		expect(getSentencesWithBreakLine('')).toHaveLength(0)
		expect(getSentencesWithBreakLine('     ')).toHaveLength(0)
	})
	it('should return an array with sentences split by break line', () => {
		const text = `first_text${CUSTOM_CODE_FOR_BREAK_LINE}mid_text${CUSTOM_CODE_FOR_BREAK_LINE}last_text`
		const sentences = getSentencesWithBreakLine(text)

		expect(sentences).toHaveLength(3)
		expect(sentences[0]).toBe('first_text')
		expect(sentences[1]).toBe('mid_text')
		expect(sentences[2]).toBe('last_text')
	})
	it('should handle multiple consecutive break lines', () => {
		const text = `first_text${CUSTOM_CODE_FOR_BREAK_LINE}${CUSTOM_CODE_FOR_BREAK_LINE}last_text`
		const sentences = getSentencesWithBreakLine(text)

		expect(sentences).toHaveLength(3)
		expect(sentences[0]).toBe('first_text')
		expect(sentences[1]).toBe('')
		expect(sentences[2]).toBe('last_text')
	})
	it('should handle a single sentence without break lines', () => {
		const text = 'single_sentence'
		const sentences = getSentencesWithBreakLine(text)

		expect(sentences).toHaveLength(1)
		expect(sentences[0]).toBe(text)
	})
	it('should return an empty sentences if the text consists only of break lines', () => {
		const text = `${CUSTOM_CODE_FOR_BREAK_LINE}${CUSTOM_CODE_FOR_BREAK_LINE}`
		const sentences = getSentencesWithBreakLine(text)

		expect(sentences).toHaveLength(3)
	})
})
