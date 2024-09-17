import type { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore'

import { parseTimestamp } from '@/helpers/date'

import type { BreathingExerciseEntity } from '@/entities/breathing-exercise.entity'
import type { BreathingExerciseDTO } from '@/dtos/breathing-exercise.dto'

export class FirebaseBreathingExerciseMapper {
	static toEntity(
		dto: QueryDocumentSnapshot<DocumentData, DocumentData>,
	): BreathingExerciseEntity {
		const data = dto.data() as BreathingExerciseDTO
		return {
			id: dto.id,
			roundsTotal: data.rounds_total,
			steps: data.steps,
			title: data.title,
			userId: data.user_id,
			createdAt: parseTimestamp(data.created_at).toISOString(),
			updatedAt: parseTimestamp(data.updated_at).toISOString(),
		}
	}
	static toEntityList(
		dtos: QueryDocumentSnapshot<DocumentData, DocumentData>[],
	): BreathingExerciseEntity[] {
		return dtos.map((dto) => FirebaseBreathingExerciseMapper.toEntity(dto))
	}
}
