import { CUSTOM_CODE_FOR_BREAK_LINE, CUSTOM_CODE_FOR_WHITE_SPACE } from '@/constants/general'
import { Dimensions } from 'react-native'

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

export function removeCustomBreakLinesAndWhiteSpaces(text: string) {
	return text
		.replaceAll(CUSTOM_CODE_FOR_BREAK_LINE, '')
		.replaceAll(CUSTOM_CODE_FOR_WHITE_SPACE, '')
}

export function getWindowDimensions() {
	const { width, height } = Dimensions.get('window')
	return { width, height }
}

export function getPercentage(valueLeft: number, valueRight: number): number {
	return Math.min((valueLeft / valueRight) * 100, 100)
}
