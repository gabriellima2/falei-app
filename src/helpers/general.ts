import { CUSTOM_CODE_FOR_BREAK_LINE, CUSTOM_CODE_FOR_WHITE_SPACE } from '@/constants/general'

export function getSentencesWithBreakLine(text: string) {
	if (!text) return []
	return text.split(CUSTOM_CODE_FOR_BREAK_LINE) || []
}

export function getPoemStanzas(text: string) {
	if (!text) return [[]]
	const stanzas = text.split(CUSTOM_CODE_FOR_WHITE_SPACE)
	const stanzasWithVerses = stanzas.map((stanza) =>
		stanza.split(CUSTOM_CODE_FOR_BREAK_LINE),
	)
	return stanzasWithVerses
}

export function removeLastDot(text: string) {
	return text.replace(/\.(?=[^.]*$)/, '').trim()
}
