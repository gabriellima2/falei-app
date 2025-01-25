import { collection, doc, getDoc, getDocs } from 'firebase/firestore'

import { getFilterByUserQuery } from '../helpers/queries'
import { parseError } from '../helpers/firebase-errors'
import { db } from '@/config/firebase'
import { env } from '@/env'

import { TongueTwisterNotFoundException } from '@/exceptions/tongue-twister-not-found.exception'
import { FirebaseTongueTwisterMapper } from '../mappers/firebase-tongue-twister.mapper'
import { RepositoryException } from '@/exceptions/repository.exception'

import type { TongueTwisterRepository } from '@/repositories/tongue-twister.repository'
import type { TongueTwisterEntity } from '@/entities/tongue-twister.entity'

class FirebaseTongueTwisterRepository implements TongueTwisterRepository {
	private readonly collection
	constructor() {
		this.collection = env.TONGUE_TWISTER_COLLECTION_NAME
	}
	async getById(id: string): Promise<TongueTwisterEntity> {
		try {
			const docRef = doc(db, this.collection, id)
			const docSnap = await getDoc(docRef)
			if (!docSnap.exists()) throw new TongueTwisterNotFoundException()
			return FirebaseTongueTwisterMapper.toEntity(docSnap)
		} catch (err) {
			const { message } = parseError(err)
			throw new RepositoryException(message)
		}
	}
	async getAll(): Promise<TongueTwisterEntity[]> {
		try {
			const ref = collection(db, this.collection)
			const q = getFilterByUserQuery(ref)
			const docSnap = await getDocs(q)
			return FirebaseTongueTwisterMapper.toEntityList(docSnap.docs)
		} catch (err) {
			const { message } = parseError(err)
			throw new RepositoryException(message)
		}
	}
}

export const makeFirebaseTongueTwisterRepository = () => new FirebaseTongueTwisterRepository()
