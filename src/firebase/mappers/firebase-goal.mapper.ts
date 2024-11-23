import type { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore'
import { isThisWeek } from 'date-fns'

import { FirebaseActivityHistoryMapper } from './firebase-activity-history.mapper'
import { parseTimestamp } from '@/helpers/date'

import type { FirebaseCreateGoalDTO, FirebaseGoalDTO } from '../dtos/firebase-goal.dto'
import type { GoalEntity } from '@/entities/goal.entity'
import type { CreateGoalDTO } from '@/dtos/goal.dto'

export class FirebaseGoalMapper {
	static toEntity(
		dto: QueryDocumentSnapshot<DocumentData, DocumentData>,
	): GoalEntity {
		const data = dto.data() as FirebaseGoalDTO

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
	static toFirebase(dto: CreateGoalDTO): FirebaseCreateGoalDTO {
		return {
			title: dto.title,
			activity_history: [],
			frequency_per_week: dto.frequencyPerWeek,
			rounds_total: dto.roundsTotal,
			steps: {
				inhale: dto.steps.inhale,
				hold: dto.steps.hold,
				exhale: dto.steps.exhale,
			},
			user_id: dto.userId || null,
			created_at: new Date(),
			updated_at: new Date(),
		}
	}
}
