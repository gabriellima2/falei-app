import { ExerciseRepository } from "@/repositories/exercise.repository";

import type { CreatePoemInputDTO, CreatePoemOutputDTO } from "@/dtos/poem.dto";
import type { PoemService } from "../poem.service";

export class PoemServiceImpl implements PoemService {
	constructor(private readonly repository: ExerciseRepository) {}
	async create(
		userID: string,
		params: CreatePoemInputDTO
	): CreatePoemOutputDTO {
		await new Promise((resolve) => resolve({}));
	}
}
