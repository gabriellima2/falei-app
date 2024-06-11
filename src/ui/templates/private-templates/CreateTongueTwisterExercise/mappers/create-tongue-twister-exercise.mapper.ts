import type { CreateTongueTwisterInputDTO } from "@/dtos/tongue-twister.dto";
import type { CreateTongueTwisterFields } from "@/schemas";

export function createTongueTwisterExerciseMapper(
	fields: CreateTongueTwisterFields
): CreateTongueTwisterInputDTO {
	return {
		content: fields.content,
		credits: {
			author: fields.author || null,
		},
	};
}
