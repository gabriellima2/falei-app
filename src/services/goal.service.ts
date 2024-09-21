import { makeFirebaseGoal } from '@/firebase/repositories/firebase-goal.repository'
import { UnexpectedException } from '@/exceptions/unexpected.exception'

import type { GoalRepository } from '@/repositories/goal.repository'
import type { GoalEntity } from '@/entities/goal.entity'

class GoalService {
	constructor(private readonly goalRepository: GoalRepository) {}

	async getById(id: string): Promise<GoalEntity> {
		if (!id) throw new UnexpectedException()
		const data = await this.goalRepository.getById(id)
		return data
	}
	async getAll(): Promise<GoalEntity[]> {
		const data = await this.goalRepository.getAll()
		return data
	}
}

export const makeGoalService = () => {
	const goalRepository = makeFirebaseGoal()
	return new GoalService(goalRepository)
}
