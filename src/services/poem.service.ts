import { makeFirebasePoemRepository } from '@/firebase/repositories/firebase-poem.repository'
import { UnexpectedException } from '@/exceptions/unexpected.exception'

import type { PoemRepository } from '@/repositories/poem.repository'
import type { PoemEntity } from '@/entities/poem.entity'

class PoemService {
	constructor(private readonly poemRepository: PoemRepository) {}

	async getById(id: string): Promise<PoemEntity> {
		if (!id) throw new UnexpectedException()
		const data = await this.poemRepository.getById(id)
		return data
	}
	async getAll(): Promise<PoemEntity[]> {
		const data = await this.poemRepository.getAll()
		return data
	}
}

export const makePoemService = () => {
	const poemRepository = makeFirebasePoemRepository()
	return new PoemService(poemRepository)
}
