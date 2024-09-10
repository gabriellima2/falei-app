import type { BreathingExerciseEntity } from '@/entities/breathing-exercise.entity'

export interface BreathingExerciseService {
	getById(id: string): Promise<BreathingExerciseEntity>
	getAll(): Promise<BreathingExerciseEntity[]>
}
