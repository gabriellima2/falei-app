import { collection, doc, getDoc, getDocs } from 'firebase/firestore'

import { db } from '@/config/firebase'

import { BreathingExerciseFoundException } from '@/exceptions/breathing-exercise-not-found.exception'
import { FirebaseBreathingExerciseMapper } from '../mappers/firebase-breathing-exercise.mapper'

import type { BreathingExerciseRepository } from '@/repositories/breathing-exercise.repository'
import type { BreathingExerciseEntity } from '@/entities/breathing-exercise.entity'

class FirebaseBreathingExerciseRepository
	implements BreathingExerciseRepository
{
	private readonly collection
	constructor() {
		this.collection = 'breathing_exercises'
	}
	async getById(id: string): Promise<BreathingExerciseEntity> {
		const docRef = doc(db, this.collection, id)
		const docSnap = await getDoc(docRef)
		if (!docSnap.exists()) throw new BreathingExerciseFoundException()
		return FirebaseBreathingExerciseMapper.toEntity(docSnap)
	}
	async getAll(): Promise<BreathingExerciseEntity[]> {
		const ref = collection(db, this.collection)
		const docSnap = await getDocs(ref)
		return FirebaseBreathingExerciseMapper.toEntityList(docSnap.docs)
	}
}

export const makeFirebaseBreathingExerciseRepository = () =>
	new FirebaseBreathingExerciseRepository()
