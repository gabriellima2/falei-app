import { collection, doc, getDoc, getDocs } from 'firebase/firestore'

import { db } from '@/config/firebase'
import { env } from '@/env'

import { TongueTwisterNotFoundException } from '@/exceptions/tongue-twister-not-found.exception'
import { FirebaseTongueTwisterMapper } from '../mappers/firebase-tongue-twister.mapper'

import type { TongueTwisterRepository } from '@/repositories/tongue-twister.repository'
import type { TongueTwisterEntity } from '@/entities/tongue-twister.entity'

class FirebaseTongueTwister implements TongueTwisterRepository {
	private readonly collection
	constructor() {
		this.collection = env.TONGUE_TWISTER_COLLECTION_NAME
	}
	async getById(id: string): Promise<TongueTwisterEntity> {
		const docRef = doc(db, this.collection, id)
		const docSnap = await getDoc(docRef)
		if (!docSnap.exists()) throw new TongueTwisterNotFoundException()
		return FirebaseTongueTwisterMapper.toEntity(docSnap)
	}
	async getAll(): Promise<TongueTwisterEntity[]> {
		const ref = collection(db, this.collection)
		const docSnap = await getDocs(ref)
		return FirebaseTongueTwisterMapper.toEntityList(docSnap.docs)
	}
}

export const makeFirebaseTongueTwister = () => new FirebaseTongueTwister()
