import type { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore'

import { timestampToDate } from '@/helpers/date'
import type { BreathingExerciseEntity } from '@/entities/breathing-exercise.entity'

export class FirebaseBreathingExerciseMapper {
	static toEntity(
		dto: QueryDocumentSnapshot<DocumentData, DocumentData>
	): BreathingExerciseEntity {
		const data = dto.data()
		return {
			id: dto.id,
			roundsTotal: data.roundsTotal,
			steps: data.steps,
			title: data.title,
			userId: data.userId,
			createdAt: timestampToDate(data.createdAt).toISOString(),
			updatedAt: timestampToDate(data.updatedAt).toISOString(),
		}
	}
	static toEntityList(
		dtos: QueryDocumentSnapshot<DocumentData, DocumentData>[]
	): BreathingExerciseEntity[] {
		return dtos.map((dto) => this.toEntity(dto))
	}
}
