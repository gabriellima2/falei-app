import { collection, doc, getDoc, getDocs } from 'firebase/firestore'

import { getFilterByUserQuery } from '../helpers/queries'
import { db } from '@/config/firebase'
import { env } from '@/env'

import { BreathingExerciseNotFoundException } from '@/exceptions/breathing-exercise-not-found.exception'
import { FirebaseBreathingExerciseMapper } from '../mappers/firebase-breathing-exercise.mapper'

import type { BreathingExerciseRepository } from '@/repositories/breathing-exercise.repository'
import type { BreathingExerciseEntity } from '@/entities/breathing-exercise.entity'

class FirebaseBreathingExerciseRepository
	implements BreathingExerciseRepository
{
	private readonly collection
	constructor() {
		this.collection = env.BREATHING_EXERCISES_COLLECTION_NAME
	}
	async getById(id: string): Promise<BreathingExerciseEntity> {
		const docRef = doc(db, this.collection, id)
		const docSnap = await getDoc(docRef)
		if (!docSnap.exists()) throw new BreathingExerciseNotFoundException()
		return FirebaseBreathingExerciseMapper.toEntity(docSnap)
	}
	async getAll(): Promise<BreathingExerciseEntity[]> {
		const ref = collection(db, this.collection)
		const q = getFilterByUserQuery(ref)
		const docSnap = await getDocs(q)
		return FirebaseBreathingExerciseMapper.toEntityList(docSnap.docs)
	}
}

export const makeFirebaseBreathingExerciseRepository = () =>
	new FirebaseBreathingExerciseRepository()
