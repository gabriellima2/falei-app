import type { BreathingExerciseRepository } from '@/repositories/breathing-exercise.repository'
import type { BreathingExerciseEntity } from '@/entities/breathing-exercise.entity'
import type { BreathingExerciseService } from '../breathing-exercise.service'

export class BreathingExerciseServiceImpl implements BreathingExerciseService {
	constructor(
		private readonly breathingExerciseRepository: BreathingExerciseRepository
	) {}
	async getAll(): Promise<BreathingExerciseEntity[]> {
		return await this.breathingExerciseRepository.getAll()
	}
	async getById(id: string): Promise<BreathingExerciseEntity> {
		return await this.breathingExerciseRepository.getById(id)
	}
}
