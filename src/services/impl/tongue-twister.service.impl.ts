import { ExerciseCategoryEntity } from "@/entities/exercise-category.entity";
import { ExerciseRepository } from "@/repositories/exercise.repository";

import type {
	CreateTongueTwisterInputDTO,
	CreateTongueTwisterOutputDTO,
} from "@/dtos/tongue-twister.dto";
import type { ReadExerciseEntity } from "@/entities/read-entities";
import type { TongueTwisterService } from "../tongue-twister.service";

export class TongueTwisterServiceImpl implements TongueTwisterService {
	constructor(private readonly repository: ExerciseRepository) {}
	async create(
		userID: string,
		params: CreateTongueTwisterInputDTO
	): CreateTongueTwisterOutputDTO {
		await this.repository.create<ReadExerciseEntity>({
			userID,
			category: ExerciseCategoryEntity.TongueTwister,
			credits: {
				author: params.credits.author,
				workName: null,
			},
			content: params.content,
		});
	}
}
