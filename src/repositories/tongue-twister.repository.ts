import type { TongueTwisterEntity } from '@/entities/tongue-twister.entity'

export interface TongueTwisterRepository {
	getById(id: string): Promise<TongueTwisterEntity>
	getAll(): Promise<TongueTwisterEntity[]>
}
