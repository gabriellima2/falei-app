import { parseTimestamp } from '@/helpers/date'

import type { ActivityHistoryEntity } from '@/entities/activity-history.entity'
import type { ActivityHistoryDTO } from '@/dtos/activity-history.dto'

export class FirebaseActivityHistoryMapper {
	static toEntity(dto: ActivityHistoryDTO): ActivityHistoryEntity {
		return {
			createdAt: parseTimestamp(dto.created_at).toISOString(),
		}
	}
	static toEntityList(dtos: ActivityHistoryDTO[]): ActivityHistoryEntity[] {
		return dtos.map((dto) => FirebaseActivityHistoryMapper.toEntity(dto))
	}
}