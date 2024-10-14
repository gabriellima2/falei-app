import { collection, doc, getDoc, getDocs } from 'firebase/firestore'

import { db } from '@/config/firebase'
import { env } from '@/env'

import { PoemNotFoundException } from '@/exceptions/poem-not-found.exception'
import { FirebasePoemMapper } from '../mappers/firebase-poem.mapper'

import type { PoemRepository } from '@/repositories/poem.repository'
import type { PoemEntity } from '@/entities/poem.entity'

class FirebasePoemRepository implements PoemRepository {
	private readonly collection
	constructor() {
		this.collection = env.POEMS_COLLECTION_NAME
	}
	async getById(id: string): Promise<PoemEntity> {
		const docRef = doc(db, this.collection, id)
		const docSnap = await getDoc(docRef)
		if (!docSnap.exists()) throw new PoemNotFoundException()
		return FirebasePoemMapper.toEntity(docSnap)
	}
	async getAll(): Promise<PoemEntity[]> {
		const ref = collection(db, this.collection)
		const docSnap = await getDocs(ref)
		return FirebasePoemMapper.toEntityList(docSnap.docs)
	}
}

export const makeFirebasePoemRepository = () => new FirebasePoemRepository()
