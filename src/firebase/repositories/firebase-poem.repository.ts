import { collection, doc, getDoc, getDocs } from 'firebase/firestore'

import { getFilterByUserQuery } from '../helpers/queries'
import { parseError } from '../helpers/firebase-errors'
import { db } from '@/config/firebase'
import { env } from '@/env'

import { PoemNotFoundException } from '@/exceptions/poem-not-found.exception'
import { RepositoryException } from '@/exceptions/repository.exception'
import { FirebasePoemMapper } from '../mappers/firebase-poem.mapper'

import type { PoemRepository } from '@/repositories/poem.repository'
import type { PoemEntity } from '@/entities/poem.entity'

class FirebasePoemRepository implements PoemRepository {
	private readonly collection
	constructor() {
		this.collection = env.POEMS_COLLECTION_NAME
	}
	async getById(id: string): Promise<PoemEntity> {
		try {
			const docRef = doc(db, this.collection, id)
			const docSnap = await getDoc(docRef)
			if (!docSnap.exists()) throw new PoemNotFoundException()
			return FirebasePoemMapper.toEntity(docSnap)
		} catch (err) {
			const { message } = parseError(err)
			throw new RepositoryException(message)
		}
	}
	async getAll(): Promise<PoemEntity[]> {
		try {
			const ref = collection(db, this.collection)
			const q = getFilterByUserQuery(ref)
			const docSnap = await getDocs(q)
			return FirebasePoemMapper.toEntityList(docSnap.docs)
		} catch (err) {
			const { message } = parseError(err)
			throw new RepositoryException(message)
		}
	}
}

export const makeFirebasePoemRepository = () => new FirebasePoemRepository()
