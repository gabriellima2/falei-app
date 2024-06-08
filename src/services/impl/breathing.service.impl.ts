import { AppointmentRepository } from "@/repositories/appointment.repository";
import { ExerciseRepository } from "@/repositories/exercise.repository";
import { NotificationAdapter } from "@/adapters/notification.adapter";

import { ExerciseCategoryEntity } from "@/entities/exercise-category.entity";

import { NotificationPermissionStatus } from "@/constants/notification-permission-status";
import { CREATE_EXERCISE_ERROR, UNEXPECTED_ERROR } from "@/errors";

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
	notification: NotificationAdapter;
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
		const { repositories, notification } = this.params;
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
			if (notification.status !== NotificationPermissionStatus.GRANTED) {
				await notification.getPermissions();
			}
			if (notification.status === NotificationPermissionStatus.GRANTED) {
				const createdNotification = await notification.schedule({
					title: "Prepare-se para o seu próximo exercício!",
					body: `Prepare-se para o exercício ${createdExercise.title}. Lembre-se, cada passo conta!`,
					scheduledAt,
				});
				if (!createdNotification || !createdNotification.length) {
					throw new Error(UNEXPECTED_ERROR);
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
}
