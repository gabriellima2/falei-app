import { AppointmentRepository } from "@/repositories/appointment.repository";
import { ExerciseRepository } from "@/repositories/exercise.repository";
import { ReminderService } from "../reminder.service";

import { ExerciseCategoryEntity } from "@/entities/exercise-category.entity";

import { CREATE_EXERCISE_ERROR } from "@/errors";

import type {
	BreathingExerciseEntity,
	BreathingAppointmentEntity,
} from "@/entities/breathing-entities";
import type {
	CreateBreathingInputDTO,
	CreateBreathingOutputDTO,
	GetAllBreathingOutputDTO,
} from "@/dtos/breathing.dto";
import type { BreathingService } from "../breathing.service";

type BreathingExerciseServiceParams = {
	repositories: {
		exercise: ExerciseRepository;
		appointment: AppointmentRepository;
	};
	reminder: ReminderService;
};

export class BreathingServiceImpl implements BreathingService {
	constructor(private readonly params: BreathingExerciseServiceParams) {}
	async getAll(): GetAllBreathingOutputDTO {
		const { repositories } = this.params;
		return {
			appointments:
				await repositories.appointment.getAll<BreathingAppointmentEntity>({
					category: ExerciseCategoryEntity.Breathing,
				}),
			exercises: await repositories.exercise.getAll<BreathingExerciseEntity>({
				category: ExerciseCategoryEntity.Breathing,
			}),
		};
	}
	async create(
		userID: string,
		params: CreateBreathingInputDTO
	): CreateBreathingOutputDTO {
		const { repositories, reminder } = this.params;
		const createdExercise =
			await repositories.exercise.create<BreathingExerciseEntity>({
				userID,
				title: params.title,
				category: ExerciseCategoryEntity.Breathing,
				lastProgressAt: null,
				rounds: { completed: 0, total: Number(params.rounds) },
				steps: {
					inhale: Number(params.steps.inhale),
					hold: Number(params.steps.hold),
					exhale: Number(params.steps.exhale),
				},
			});
		if (params.days && params.days.length && params.time) {
			if (!createdExercise) throw new Error(CREATE_EXERCISE_ERROR);
			await reminder.create(userID, {
				id: createdExercise.id,
				title: params.title,
				days: params.days,
				time: params.time,
			});
		}
	}
	async delete(id: string): Promise<void> {
		const { repositories } = this.params;
		return await repositories.exercise.delete({
			id,
			category: ExerciseCategoryEntity.Breathing,
		});
	}
}
