import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore'

import { db } from '@/config/firebase'
import { env } from '@/env'

import { FirebaseActivityHistoryMapper } from '../mappers/firebase-activity-history.mapper'
import { GoalNotFoundException } from '@/exceptions/goal-not-found.exception'
import { FirebaseGoalMapper } from '../mappers/firebase-goal.mapper'

import type { ActivityHistoryEntity } from '@/entities/activity-history.entity'
import type { GoalRepository } from '@/repositories/goal.repository'
import type { GoalEntity } from '@/entities/goal.entity'
import type { CreateGoalDTO } from '@/dtos/goal.dto'

class FirebaseGoalRepository implements GoalRepository {
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
	async addActivityToHistory(
		id: string,
		payload: ActivityHistoryEntity,
	): Promise<void> {
		const docRef = doc(db, this.collection, id)
		await updateDoc(docRef, {
			activity_history: arrayUnion(
				FirebaseActivityHistoryMapper.toAddDTO(payload),
			),
		})
	}
	async create(payload: CreateGoalDTO): Promise<void> {
		const raw = FirebaseGoalMapper.toDB(payload)
		const ref = collection(db, this.collection)
		await addDoc(ref, raw)
	}
}

export const makeFirebaseGoalRepository = () => new FirebaseGoalRepository()
