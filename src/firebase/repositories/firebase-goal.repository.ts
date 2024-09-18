import { collection, doc, getDoc, getDocs } from 'firebase/firestore'

import { db } from '@/config/firebase'
import { env } from '@/env'

import { GoalNotFoundException } from '@/exceptions/goal-not-found.exception'
import { FirebaseGoalMapper } from '../mappers/firebase-goal.mapper'

import type { GoalRepository } from '@/repositories/goal.repository'
import type { GoalEntity } from '@/entities/goal.entity'

class FirebaseGoal implements GoalRepository {
	private readonly collection
	constructor() {
		this.collection = env.GOALS_COLLECTION_NAME
	}
	async getById(id: string): Promise<GoalEntity> {
		const docRef = doc(db, this.collection, id)
		const docSnap = await getDoc(docRef)
		if (!docSnap.exists()) throw new GoalNotFoundException()
		return FirebaseGoalMapper.toEntity(docSnap)
	}
	async getAll(): Promise<GoalEntity[]> {
		const ref = collection(db, this.collection)
		const docSnap = await getDocs(ref)
		return FirebaseGoalMapper.toEntityList(docSnap.docs)
	}
}

export const makeFirebaseGoal = () => new FirebaseGoal()
