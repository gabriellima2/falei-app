import { AppointmentRepository } from "@/repositories/appointment.repository";
import { ExerciseRepository } from "@/repositories/exercise.repository";

import type {
	BreathingExerciseEntity,
	BreathingAppointmentEntity,
} from "@/entities/breathing-entities";
import { ExerciseCategoryEntity } from "@/entities/exercise-category.entity";

type BreathingExerciseServiceParams = {
	repositories: {
		exercise: ExerciseRepository;
		appointment: AppointmentRepository<BreathingAppointmentEntity>;
	};
};

export class BreathingExerciseService {
	constructor(private readonly params: BreathingExerciseServiceParams) {}
	async getAll() {
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
