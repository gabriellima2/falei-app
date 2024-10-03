import { CUSTOM_CODE_FOR_BREAK_LINE_CHAR } from "@/constants/general"

export function getSentencesWithBreakLine(text: string) {
	if (!text) return []
	return text.split(CUSTOM_CODE_FOR_BREAK_LINE_CHAR) || []
}
