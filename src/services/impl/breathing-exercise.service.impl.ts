import { AppointmentRepository } from "@/repositories/appointment.repository";
import { ExerciseRepository } from "@/repositories/exercise.repository";

import type {
	BreathingExerciseEntity,
	BreathingAppointmentEntity,
} from "@/entities/breathing-entities";
import type { GetAllBreathingExerciseOutputDTO } from "@/dtos/breathing-exercise.dto";
import type { BreathingExerciseService } from "../breathing-exercise.service";
import { ExerciseCategoryEntity } from "@/entities/exercise-category.entity";
import { NotificationAdapter } from "@/adapters/notification.adapter";

type BreathingExerciseServiceParams = {
	repositories: {
		exercise: ExerciseRepository;
		appointment: AppointmentRepository<BreathingAppointmentEntity>;
	};
	notification: NotificationAdapter;
};

type Exercise = {
	days: string[];
	rounds: string;
	steps: { exhale: string; hold: string; inhale: string };
	time: Date;
	title: string;
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
	async create(userID: string, params: Exercise) {
		const { repositories, notification } = this.params;
		const hasAppointment = params.days && params.days.length && params.time;
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
		if (hasAppointment) {
			if (!createdExercise) {
				throw new Error("Não foi possível adicionar o lembrete ao exercício");
			}
			const date = new Date(params.time);
			const scheduledAt = {
				days: params.days.reduce((acc, day) => {
					const dayNumber = Number(day);
					if (!isNaN(dayNumber)) {
						acc.push(dayNumber);
					}
					return acc;
				}, [] as number[]),
				hour: date.getUTCHours(),
				minutes: date.getUTCMinutes(),
			};
			const createdNotification = await notification.schedule({
				title: "Hora do exercício",
				body: `Exercício ${createdExercise.title}`,
				scheduledAt,
			});
			if (!createdNotification || !createdNotification.length) {
				throw new Error("Não foi possível adicionar o lembrete ao exercício");
			}
			await repositories.appointment.create({
				userID,
				exerciseID: createdExercise.id,
				notificationID: createdNotification[0].id,
				category: ExerciseCategoryEntity.Breathing,
				scheduledAt,
			});
		}
	}
}
