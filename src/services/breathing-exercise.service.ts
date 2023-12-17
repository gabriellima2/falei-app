import { AppointmentRepository } from "@/repositories/appointment.repository";
import { ExerciseRepository } from "@/repositories/exercise.repository";

import {
	BreathingExerciseEntity,
	BreathingAppointmentEntity,
} from "@/entities/breathing-entities";
import { ExerciseCategoryEntity } from "@/entities/exercise-category.entity";

export class BreathingExerciseService {
	constructor(
		private readonly repositories: {
			exercise: ExerciseRepository;
			appointment: AppointmentRepository<BreathingAppointmentEntity>;
		}
	) {}
	async getAll() {
		return {
			appointments: await this.repositories.appointment.getAll({
				category: ExerciseCategoryEntity.Breathing,
			}),
			exercises:
				await this.repositories.exercise.getAll<BreathingExerciseEntity>({
					category: ExerciseCategoryEntity.Breathing,
				}),
		};
	}
}
