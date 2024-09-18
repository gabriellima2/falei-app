import type { GoalEntity } from '@/entities/goal.entity'

export interface GoalRepository {
	getById(id: string): Promise<GoalEntity>
	getAll(): Promise<GoalEntity[]>
}
