import type { CreatePoemInputDTO } from "@/dtos/poem.dto";
import type { CreatePoemFields } from "@/schemas";

export function createPoemExerciseMapper(
	fields: CreatePoemFields
): CreatePoemInputDTO {
	return {
		content: fields.content,
		credits: {
			author: fields.credits.author || null,
			workName: fields.credits.workName || null,
		},
	};
}
