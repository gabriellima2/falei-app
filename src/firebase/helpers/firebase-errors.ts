import { FirebaseError } from "firebase/app"

import { FIREBASE_ERROR_MESSAGES } from "../constants/firebase-error-messages"
import { DEFAULT_ERROR_MESSAGES } from "@/constants/default-error-messages"

export function getFirebaseErrorByCode(errorCode: string) {
	const separatorIndex = errorCode.indexOf('/')
	const type = errorCode.slice(0, separatorIndex)
	const cause = errorCode.slice(separatorIndex + 1)
	return { type, cause }
}

export function parseError(err: unknown) {
	try {
		if (err instanceof FirebaseError) {
			const error = err as FirebaseError
			const { cause } = getFirebaseErrorByCode(error.code)
			const message = FIREBASE_ERROR_MESSAGES[cause]
			if (message) return { message }
		}
		return {
			message: (err as Error)?.message || DEFAULT_ERROR_MESSAGES.UNEXPECTED_ERROR,
		}
	} catch (_) {
		return {
			message: DEFAULT_ERROR_MESSAGES.UNEXPECTED_ERROR,
		}
	}
}
