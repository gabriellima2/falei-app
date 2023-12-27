import { AppointmentRepository } from "@/repositories/appointment.repository";
import { ExerciseRepository } from "@/repositories/exercise.repository";

import type {
	BreathingExerciseEntity,
	BreathingAppointmentEntity,
} from "@/entities/breathing-entities";
import type { GetAllBreathingExerciseOutputDTO } from "@/dtos/breathing-exercise.dto";
import type { BreathingExerciseService } from "../breathing-exercise.service";
import { ExerciseCategoryEntity } from "@/entities/exercise-category.entity";

type BreathingExerciseServiceParams = {
	repositories: {
		exercise: ExerciseRepository;
		appointment: AppointmentRepository<BreathingAppointmentEntity>;
	};
};

export class BreathingExerciseServiceImpl implements BreathingExerciseService {
	constructor(private readonly params: BreathingExerciseServiceParams) {}
	async getAll(): GetAllBreathingExerciseOutputDTO {
		const { repositories } = this.params;
		return {
			appointments: await repositories.appointment.getAll({
				category: ExerciseCategoryEntity.Breathing,
			}),
			exercises: await repositories.exercise.getAll<BreathingExerciseEntity>({
				category: ExerciseCategoryEntity.Breathing,
			}),
		};
	}
}
