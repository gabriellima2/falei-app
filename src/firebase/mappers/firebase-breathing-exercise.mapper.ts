import type { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore'

import { parseTimestamp } from '@/helpers/date'

import type { FirebaseBreathingExerciseDTO } from '../dtos/firebase-breathing-exercise.dto'
import type { BreathingExerciseEntity } from '@/entities/breathing-exercise.entity'

export class FirebaseBreathingExerciseMapper {
	static toEntity(
		dto: QueryDocumentSnapshot<DocumentData, DocumentData>,
	): BreathingExerciseEntity {
		const data = dto.data() as FirebaseBreathingExerciseDTO
		return {
			id: dto.id,
			roundsTotal: data.rounds_total,
			steps: data.steps,
			title: data.title,
			userId: data.user_id || null,
			createdAt: parseTimestamp(data.created_at),
			updatedAt: parseTimestamp(data.updated_at),
		}
	}
	static toEntityList(
		dtos: QueryDocumentSnapshot<DocumentData, DocumentData>[],
	): BreathingExerciseEntity[] {
		return dtos.map((dto) => FirebaseBreathingExerciseMapper.toEntity(dto))
	}
}
