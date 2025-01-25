import { removeCustomBreakLinesAndWhiteSpaces } from "../general"
import {
	CUSTOM_CODE_FOR_BREAK_LINE,
	CUSTOM_CODE_FOR_WHITE_SPACE,
} from '@/constants/general'

describe('removeCustomBreakLinesAndWhiteSpaces', () => {
	it('should remove custom white spaces and break lines', () => {
		const text = `first_text${CUSTOM_CODE_FOR_WHITE_SPACE}mid_text${CUSTOM_CODE_FOR_BREAK_LINE}last_text`
		const result = removeCustomBreakLinesAndWhiteSpaces(text)

		expect(result).toBe('first_textmid_textlast_text')
	})
	it('should remove custom break lines', () => {
		const text = `first_text${CUSTOM_CODE_FOR_BREAK_LINE}mid_text${CUSTOM_CODE_FOR_BREAK_LINE}last_text`
		const result = removeCustomBreakLinesAndWhiteSpaces(text)

		expect(result).toBe('first_textmid_textlast_text')
	})
	it('should remove custom white spaces', () => {
		const text = `first_text${CUSTOM_CODE_FOR_WHITE_SPACE}mid_text${CUSTOM_CODE_FOR_WHITE_SPACE}last_text`
		const result = removeCustomBreakLinesAndWhiteSpaces(text)

		expect(result).toBe('first_textmid_textlast_text')
	})
 it('should return the original text if no custom break lines or white spaces are present', () => {
		const text = 'first_text mid_text last_text'
		const result = removeCustomBreakLinesAndWhiteSpaces(text)

		expect(result).toBe('first_text mid_text last_text')
	})
})
