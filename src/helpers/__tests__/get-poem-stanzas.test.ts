import {
	CUSTOM_CODE_FOR_BREAK_LINE,
	CUSTOM_CODE_FOR_WHITE_SPACE,
} from '@/constants/general'
import { getPoemStanzas } from '../general'

describe('getPoemStanzas', () => {
	it('should return an empty array inside an array for non-valid input', () => {
		expect(getPoemStanzas('')).toEqual([[]])
		expect(getPoemStanzas('   ')).toEqual([[]])
		expect(getPoemStanzas(null as unknown as string)).toEqual([[]])
		expect(getPoemStanzas(undefined as unknown as string)).toEqual([[]])
	})
	it('should return one stanza with multiple verses when text has one stanza and multiple verses', () => {
		const text = `verse1${CUSTOM_CODE_FOR_BREAK_LINE}verse2${CUSTOM_CODE_FOR_BREAK_LINE}verse3`
		const result = getPoemStanzas(text)

		expect(result).toEqual([['verse1', 'verse2', 'verse3']])
	})
	it('should return multiple stanzas with verses when text has multiple stanzas and verses', () => {
		const text = `stanza1_verse1${CUSTOM_CODE_FOR_BREAK_LINE}stanza1_verse2${CUSTOM_CODE_FOR_WHITE_SPACE}stanza2_verse1${CUSTOM_CODE_FOR_BREAK_LINE}stanza2_verse2`
		const result = getPoemStanzas(text)

		expect(result).toEqual([
			['stanza1_verse1', 'stanza1_verse2'],
			['stanza2_verse1', 'stanza2_verse2'],
		])
	})
})

