import { or, query, where, type CollectionReference, type DocumentData } from 'firebase/firestore'

import { UnauthenticatedUserException } from '@/exceptions/unauthenticated-user.exception'
import { auth } from '@/config/firebase'

export function getFilterByUserQuery(ref: CollectionReference<DocumentData, DocumentData>) {
	const userId = auth.currentUser?.uid
	if (!userId) throw new UnauthenticatedUserException()
	return query(
		ref,
		or(where('user_id', '==', userId), where('user_id', '==', null)),
	)
}
