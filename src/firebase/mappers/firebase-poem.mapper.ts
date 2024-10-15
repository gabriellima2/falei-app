import type { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore'

import { parseTimestamp } from '@/helpers/date'

import type { PoemEntity } from '@/entities/poem.entity'
import type { PoemDTO } from '@/dtos/poem.dto'

export class FirebasePoemMapper {
	static toEntity(
		dto: QueryDocumentSnapshot<DocumentData, DocumentData>,
	): PoemEntity {
		const data = dto.data() as PoemDTO
		return {
			id: dto.id,
			body: data.body,
			title: data.title,
			authorName: data.author_name || null,
			userId: data.user_id || null,
			createdAt: parseTimestamp(data.created_at),
			updatedAt: parseTimestamp(data.updated_at),
		}
	}
	static toEntityList(
		dtos: QueryDocumentSnapshot<DocumentData, DocumentData>[],
	): PoemEntity[] {
		return dtos.map((dto) => FirebasePoemMapper.toEntity(dto))
	}
}
