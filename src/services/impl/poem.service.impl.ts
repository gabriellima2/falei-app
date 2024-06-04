import { ExerciseCategoryEntity } from "@/entities/exercise-category.entity";
import { ExerciseRepository } from "@/repositories/exercise.repository";

import type { CreatePoemInputDTO, CreatePoemOutputDTO } from "@/dtos/poem.dto";
import type { ReadExerciseEntity } from "@/entities/read-entities";
import type { PoemService } from "../poem.service";

export class PoemServiceImpl implements PoemService {
	constructor(private readonly repository: ExerciseRepository) {}
	async create(
		userID: string,
		params: CreatePoemInputDTO
	): CreatePoemOutputDTO {
		await this.repository.create<ReadExerciseEntity>({
			userID,
			category: ExerciseCategoryEntity.Poem,
			credits: {
				author: params.credits.author,
				workName: params.credits.workName,
			},
			content: params.content,
		});
	}
}
