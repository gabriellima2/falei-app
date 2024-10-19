import type { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore'
import { isThisWeek } from 'date-fns'

import { FirebaseActivityHistoryMapper } from './firebase-activity-history.mapper'
import { parseTimestamp } from '@/helpers/date'

import type { GoalEntity } from '@/entities/goal.entity'
import type { CreateGoalDTO, GoalDTO } from '@/dtos/goal.dto'

export class FirebaseGoalMapper {
	static toEntity(
		dto: QueryDocumentSnapshot<DocumentData, DocumentData>,
	): GoalEntity {
		const data = dto.data() as GoalDTO

		const activityHistoryEntity = FirebaseActivityHistoryMapper.toEntityList(
			data.activity_history,
		)
		const completedThisWeekAmount = activityHistoryEntity.filter((activityHistory) =>
			isThisWeek(activityHistory.createdAt),
		)

		return {
			id: dto.id,
			roundsTotal: data.rounds_total,
			steps: data.steps,
			title: data.title,
			userId: data.user_id || null,
			frequencyPerWeek: data.frequency_per_week,
			currentWeekProgress: completedThisWeekAmount.length,
			activityHistory: activityHistoryEntity,
			createdAt: parseTimestamp(data.created_at),
			updatedAt: parseTimestamp(data.updated_at),
		}
	}
	static toEntityList(
		dtos: QueryDocumentSnapshot<DocumentData, DocumentData>[],
	): GoalEntity[] {
		return dtos.map((dto) => FirebaseGoalMapper.toEntity(dto))
	}
	static toDB(dto: CreateGoalDTO) {
		return {
			title: dto.title,
			activity_history: [],
			frequency_per_week: dto.frequency_per_week,
			rounds_total: dto.rounds_total,
			steps: dto.steps,
			user_id: null,
			created_at: new Date(),
			updated_at: new Date()
		}
	}
}
