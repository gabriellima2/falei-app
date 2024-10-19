import type { CreateGoalDTO, UpdateGoalProgressDTO } from '@/dtos/goal.dto'
import type { GoalEntity } from '@/entities/goal.entity'

export interface GoalRepository {
	create(payload: CreateGoalDTO): Promise<void>
	getById(id: string): Promise<GoalEntity>
	getAll(): Promise<GoalEntity[]>
	updateProgress(goalId: string, payload: UpdateGoalProgressDTO): Promise<void>
}
