import { addDoc, arrayUnion, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore'

import { getFilterByUserQuery } from '../helpers/queries'
import { parseError } from '../helpers/firebase-errors'
import { db } from '@/config/firebase'
import { env } from '@/env'

import { FirebaseActivityHistoryMapper } from '../mappers/firebase-activity-history.mapper'
import { GoalNotFoundException } from '@/exceptions/goal-not-found.exception'
import { RepositoryException } from '@/exceptions/repository.exception'
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
		try {
			const raw = FirebaseGoalMapper.toFirebase(payload)
			const ref = collection(db, this.collection)
			await addDoc(ref, raw)
		} catch (err) {
			const { message } = parseError(err)
			throw new RepositoryException(message)
		}
	}
	async getById(id: string): Promise<GoalEntity> {
		try {
			const docRef = doc(db, this.collection, id)
			const docSnap = await getDoc(docRef)
			if (!docSnap.exists()) throw new GoalNotFoundException()
			return FirebaseGoalMapper.toEntity(docSnap)
		} catch (err) {
			const { message } = parseError(err)
			throw new RepositoryException(message)
		}
	}
	async getAll(): Promise<GoalEntity[]> {
		try {
			const ref = collection(db, this.collection)
			const q = getFilterByUserQuery(ref)
			const docSnap = await getDocs(q)
			return FirebaseGoalMapper.toEntityList(docSnap.docs)
		} catch (err) {
			const { message } = parseError(err)
			throw new RepositoryException(message)
		}
	}
	async updateProgress(
		id: string,
		payload: UpdateGoalProgressDTO,
	): Promise<void> {
		try {
			const docRef = doc(db, this.collection, id)
			await updateDoc(docRef, {
				activity_history: arrayUnion(
					FirebaseActivityHistoryMapper.toFirebase(payload.activityHistory),
				),
			})
		} catch (err) {
			const { message } = parseError(err)
			throw new RepositoryException(message)
		}
	}
	async delete(id: string): Promise<void> {
		try {
			const ref = doc(db, this.collection, id)
			await deleteDoc(ref)
		} catch (err) {
			const { message } = parseError(err)
			throw new RepositoryException(message)
		}
	}
}

export const makeFirebaseGoalRepository = () => new FirebaseGoalRepository()
