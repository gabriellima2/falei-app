import type { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore'

import { parseTimestamp } from '@/helpers/date'

import type { TongueTwisterEntity } from '@/entities/tongue-twister.entity'
import type { TongueTwisterDTO } from '@/dtos/tongue-twister.dto'

export class FirebaseTongueTwisterMapper {
	static toEntity(
		dto: QueryDocumentSnapshot<DocumentData, DocumentData>,
	): TongueTwisterEntity {
		const data = dto.data() as TongueTwisterDTO
		return {
			id: dto.id,
			body: data.body,
			authorName: data.author_name || null,
			userId: data.user_id || null,
			createdAt: parseTimestamp(data.created_at).toISOString(),
			updatedAt: parseTimestamp(data.updated_at).toISOString(),
		}
	}
	static toEntityList(
		dtos: QueryDocumentSnapshot<DocumentData, DocumentData>[],
	): TongueTwisterEntity[] {
		return dtos.map((dto) => FirebaseTongueTwisterMapper.toEntity(dto))
	}
}