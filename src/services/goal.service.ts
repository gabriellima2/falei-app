import { makeFirebaseGoalRepository } from '@/firebase/repositories/firebase-goal.repository'
import { UnexpectedException } from '@/exceptions/unexpected.exception'

import type { CreateGoalDTO, UpdateGoalProgressDTO } from '@/dtos/goal.dto'
import type { GoalRepository } from '@/repositories/goal.repository'
import type { GoalEntity } from '@/entities/goal.entity'

class GoalService {
	constructor(private readonly goalRepository: GoalRepository) {}

	async create(payload: CreateGoalDTO): Promise<void> {
		if (!payload) throw new UnexpectedException()
		await this.goalRepository.create(payload)
	}
	async getById(id: string): Promise<GoalEntity> {
		if (!id) throw new UnexpectedException()
		const data = await this.goalRepository.getById(id)
		return data
	}
	async getAll(): Promise<GoalEntity[]> {
		const data = await this.goalRepository.getAll()
		return data
	}
	async updateProgress(id: string): Promise<void> {
		if (!id) throw new UnexpectedException()
		const payload: UpdateGoalProgressDTO = {
			activityHistory: {
				createdAt: new Date(),
			},
		}
		await this.goalRepository.updateProgress(id, payload)
	}
	async delete(id: string): Promise<void> {
		if (!id) throw new UnexpectedException()
		await this.goalRepository.delete(id)
	}
}


export const makeGoalService = () => {
	const goalRepository = makeFirebaseGoalRepository()
	return new GoalService(goalRepository)
}
