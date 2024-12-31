import { parseTimestamp } from '@/helpers/date'

import type { FirebaseActivityHistoryDTO, FirebaseCreateActivityHistoryDTO } from '../dtos/firebase-activity-history.dto'
import type { ActivityHistoryEntity } from '@/entities/activity-history.entity'
import type { CreateActivityHistoryDTO } from '@/dtos/activity-history.dto'

export class FirebaseActivityHistoryMapper {
	static toEntity(dto: FirebaseActivityHistoryDTO): ActivityHistoryEntity {
		return {
			createdAt: parseTimestamp(dto.created_at),
		}
	}
	static toEntityList(dtos: FirebaseActivityHistoryDTO[]): ActivityHistoryEntity[] {
		return dtos.map((dto) => FirebaseActivityHistoryMapper.toEntity(dto))
	}
	static toFirebase(dto: CreateActivityHistoryDTO): FirebaseCreateActivityHistoryDTO {
		return {
			created_at: dto.createdAt,
		}
	}
}
