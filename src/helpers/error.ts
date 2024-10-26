import { FirebaseError } from 'firebase/app'

import { FIREBASE_ERROR_MESSAGES } from "@/firebase/constants/firebase-error-messages"
import { DEFAULT_ERROR_MESSAGES } from "@/constants/default-error-messages"

import { getFirebaseErrorByCode } from '@/firebase/helpers/firebase-errors'

export function onError(err: unknown) {
	if (err instanceof FirebaseError) {
		const error = err as FirebaseError
		const { cause } = getFirebaseErrorByCode(error.code)
		const message = FIREBASE_ERROR_MESSAGES[cause]
		if (message) return message
	}
	return (err as Error)?.message || DEFAULT_ERROR_MESSAGES.UNEXPECTED_ERROR
}
