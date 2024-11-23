import { or, query, where, type CollectionReference, type DocumentData } from 'firebase/firestore'

import { NoUserAuthenticatedException } from '@/exceptions/no-user-authenticated.exception'
import { auth } from '@/config/firebase'

export function getFilterByUserQuery(ref: CollectionReference<DocumentData, DocumentData>) {
	const userId = auth.currentUser?.uid
	if (!userId) throw new NoUserAuthenticatedException()
	return query(
		ref,
		or(where('user_id', '==', userId), where('user_id', '==', null)),
	)
}
