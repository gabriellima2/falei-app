import { DEFAULT_ERROR_MESSAGES } from "@/constants/default-error-messages"

export function onError(err: unknown) {
	return (err as Error)?.message || DEFAULT_ERROR_MESSAGES.UNEXPECTED_ERROR
}
