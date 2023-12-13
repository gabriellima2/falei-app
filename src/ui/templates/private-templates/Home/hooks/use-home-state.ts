import { useGetExercisesOrderedByLastProgress } from "./use-get-exercises-ordered-by-last-progress";
import { useGetIncompleteBreathingExercises } from "./use-get-incomplete-breathing-exercises";
import { useGetAppointments } from "@/hooks/use-get-appointments";

import type {
	BreathingExerciseEntity,
	BreathingAppointmentEntity,
} from "@/entities/breathing-entities";

export type UseHomeStateParams = {
	exercises: BreathingExerciseEntity[];
	appointments: BreathingAppointmentEntity[];
};

export type UseHomeStateReturn = {
	title: string;
	filteredAppointments: BreathingAppointmentEntity[];
	incompleteExercises: BreathingExerciseEntity[] | BreathingAppointmentEntity[];
};

export function useHomeState(params: UseHomeStateParams): UseHomeStateReturn {
	const { exercises, appointments } = params;
	const filteredAppointments = useGetAppointments(appointments);
	const ordedExercises = useGetExercisesOrderedByLastProgress(exercises);
	const incomplete = useGetIncompleteBreathingExercises({
		exercises: ordedExercises,
		appointments: filteredAppointments,
	});

	const getHeaderTitle = () => {
		const appointmentsTotal = filteredAppointments.length;
		return appointmentsTotal
			? `Você tem ${appointmentsTotal} exercício(s) em seus lembretes pendentes`
			: "Torne um exercício parte de sua rotina";
	};

	const getIncompleteExercises = () => {
		const { exercises, appointments } = incomplete;
		if (exercises && appointments) return [...exercises, ...appointments];
		if (exercises) return exercises;
		if (appointments) return appointments;
		return [];
	};

	return {
		title: getHeaderTitle(),
		filteredAppointments,
		incompleteExercises: getIncompleteExercises(),
	};
}
