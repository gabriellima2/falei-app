import type { ActivityHistoryEntity } from '@/entities/activity-history.entity'
import type { GoalEntity } from '@/entities/goal.entity'
import type { CreateGoalDTO } from '@/dtos/goal.dto'

export interface GoalRepository {
	getById(id: string): Promise<GoalEntity>
	getAll(): Promise<GoalEntity[]>
	addActivityToHistory(
		goalId: string,
		payload: ActivityHistoryEntity,
	): Promise<void>
	create(payload: CreateGoalDTO): Promise<void>
}
