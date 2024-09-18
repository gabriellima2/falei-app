import type { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore'

import { FirebaseActivityHistoryMapper } from './firebase-activity-history.mapper'
import { parseTimestamp } from '@/helpers/date'

import type { GoalEntity } from '@/entities/goal.entity'
import type { GoalDTO } from '@/dtos/goal.dto'

export class FirebaseGoalMapper {
	static toEntity(
		dto: QueryDocumentSnapshot<DocumentData, DocumentData>,
	): GoalEntity {
		const data = dto.data() as GoalDTO
		return {
			id: dto.id,
			roundsTotal: data.rounds_total,
			steps: data.steps,
			title: data.title,
			userId: data.user_id || null,
			frequencyPerWeek: data.frequency_per_week,
			activityHistory: FirebaseActivityHistoryMapper.toEntityList(
				data.activity_history,
			),
			createdAt: parseTimestamp(data.created_at).toISOString(),
			updatedAt: parseTimestamp(data.updated_at).toISOString(),
		}
	}
	static toEntityList(
		dtos: QueryDocumentSnapshot<DocumentData, DocumentData>[],
	): GoalEntity[] {
		return dtos.map((dto) => FirebaseGoalMapper.toEntity(dto))
	}
}
