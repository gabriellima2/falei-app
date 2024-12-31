import type { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore'

import { parseTimestamp } from '@/helpers/date'

import type { FirebaseTongueTwisterDTO } from '../dtos/firebase-tongue-twister.dto'
import type { TongueTwisterEntity } from '@/entities/tongue-twister.entity'

export class FirebaseTongueTwisterMapper {
	static toEntity(
		dto: QueryDocumentSnapshot<DocumentData, DocumentData>,
	): TongueTwisterEntity {
		const data = dto.data() as FirebaseTongueTwisterDTO
		return {
			id: dto.id,
			body: data.body,
			authorName: data.author_name || null,
			userId: data.user_id || null,
			createdAt: parseTimestamp(data.created_at),
			updatedAt: parseTimestamp(data.updated_at),
		}
	}
	static toEntityList(
		dtos: QueryDocumentSnapshot<DocumentData, DocumentData>[],
	): TongueTwisterEntity[] {
		return dtos.map((dto) => FirebaseTongueTwisterMapper.toEntity(dto))
	}
}
