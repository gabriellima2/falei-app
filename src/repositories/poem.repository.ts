import type { PoemEntity } from '@/entities/poem.entity'

export interface PoemRepository {
	getById(id: string): Promise<PoemEntity>
	getAll(): Promise<PoemEntity[]>
}
