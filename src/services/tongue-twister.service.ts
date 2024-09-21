import { makeFirebaseTongueTwister } from '@/firebase/repositories/firebase-tongue-twister.repository'
import { UnexpectedException } from '@/exceptions/unexpected.exception'

import type { TongueTwisterRepository } from '@/repositories/tongue-twister.repository'
import type { TongueTwisterEntity } from '@/entities/tongue-twister.entity'

class TongueTwisterService {
	constructor(
		private readonly tongueTwisterRepository: TongueTwisterRepository,
	) {}

	async getById(id: string): Promise<TongueTwisterEntity> {
		if (!id) throw new UnexpectedException()
		const data = await this.tongueTwisterRepository.getById(id)
		return data
	}
	async getAll(): Promise<TongueTwisterEntity[]> {
		const data = await this.tongueTwisterRepository.getAll()
		return data
	}
}

export const makeTongueTwisterService = () => {
	const tongueTwisterRepository = makeFirebaseTongueTwister()
	return new TongueTwisterService(tongueTwisterRepository)
}
