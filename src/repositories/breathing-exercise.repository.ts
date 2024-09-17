import type { BreathingExerciseEntity } from '@/entities/breathing-exercise.entity'

export interface BreathingExerciseRepository {
	getById(id: string): Promise<BreathingExerciseEntity>
	getAll(): Promise<BreathingExerciseEntity[]>
}
