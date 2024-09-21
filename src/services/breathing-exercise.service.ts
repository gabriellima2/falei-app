import { makeFirebaseBreathingExerciseRepository } from '@/firebase/repositories/firebase-breathing-exercise.repository'
import { UnexpectedException } from '@/exceptions/unexpected.exception'

import type { BreathingExerciseRepository } from '@/repositories/breathing-exercise.repository'
import type { BreathingExerciseEntity } from '@/entities/breathing-exercise.entity'

class BreathingExerciseService {
	constructor(
		private readonly breathingExerciseRepository: BreathingExerciseRepository,
	) {}

	async getById(id: string): Promise<BreathingExerciseEntity> {
		if (!id) throw new UnexpectedException()
		const data = await this.breathingExerciseRepository.getById(id)
		return data
	}
	async getAll(): Promise<BreathingExerciseEntity[]> {
		const data = await this.breathingExerciseRepository.getAll()
		return data
	}
}

export const makeBreathingExerciseService = () => {
	const breathingExerciseRepository = makeFirebaseBreathingExerciseRepository()
	return new BreathingExerciseService(breathingExerciseRepository)
}
