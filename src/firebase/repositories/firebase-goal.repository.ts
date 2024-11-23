import { addDoc, arrayUnion, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore'

import { getFilterByUserQuery } from '../helpers/queries'
import { db } from '@/config/firebase'
import { env } from '@/env'

import { FirebaseActivityHistoryMapper } from '../mappers/firebase-activity-history.mapper'
import { GoalNotFoundException } from '@/exceptions/goal-not-found.exception'
import { FirebaseGoalMapper } from '../mappers/firebase-goal.mapper'

import type { CreateGoalDTO, UpdateGoalProgressDTO } from '@/dtos/goal.dto'
import type { GoalRepository } from '@/repositories/goal.repository'
import type { GoalEntity } from '@/entities/goal.entity'

class FirebaseGoalRepository implements GoalRepository {
	private readonly collection
	constructor() {
		this.collection = env.GOALS_COLLECTION_NAME
	}
	async create(payload: CreateGoalDTO): Promise<void> {
		const raw = FirebaseGoalMapper.toFirebase(payload)
		const ref = collection(db, this.collection)
		await addDoc(ref, raw)
	}
	async getById(id: string): Promise<GoalEntity> {
		const docRef = doc(db, this.collection, id)
		const docSnap = await getDoc(docRef)
		if (!docSnap.exists()) throw new GoalNotFoundException()
		return FirebaseGoalMapper.toEntity(docSnap)
	}
	async getAll(): Promise<GoalEntity[]> {
		const ref = collection(db, this.collection)
		const q = getFilterByUserQuery(ref)
		const docSnap = await getDocs(q)
		return FirebaseGoalMapper.toEntityList(docSnap.docs)
	}
	async updateProgress(
		id: string,
		payload: UpdateGoalProgressDTO,
	): Promise<void> {
		const docRef = doc(db, this.collection, id)
		await updateDoc(docRef, {
			activity_history: arrayUnion(
				FirebaseActivityHistoryMapper.toFirebase(payload.activityHistory),
			),
		})
	}
	async delete(id: string): Promise<void> {
		const ref = doc(db, this.collection, id)
		await deleteDoc(ref)
	}
}

export const makeFirebaseGoalRepository = () => new FirebaseGoalRepository()
