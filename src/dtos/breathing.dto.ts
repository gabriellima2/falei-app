import type {
	BreathingAppointmentEntity,
	BreathingExerciseEntity,
} from "@/entities/breathing-entities";

export type GetAllBreathingOutputDTO = Promise<{
	appointments: BreathingAppointmentEntity[];
	exercises: BreathingExerciseEntity[];
}>;

export type CreateBreathingInputDTO = {
	days?: string[];
	rounds: string;
	steps: { exhale: string; hold: string; inhale: string };
	time?: Date;
	title: string;
};

export type CreateBreathingOutputDTO = Promise<void>;

export type GetBreathingByIdOutputDTO = Promise<BreathingExerciseEntity>;
