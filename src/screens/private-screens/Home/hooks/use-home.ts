import { useGetIncompleteBreathingExercises } from "./use-get-incomplete-breathing-exercises";
import { useGetAppointments } from "./use-get-appointments";
import { useExerciseOrderedByLastProgress } from "@/hooks";

import type {
	BreathingExerciseEntity,
	BreathingAppointmentEntity,
} from "@/entities/breathing-entities";

export type UseHomeParams = {
	exercises: BreathingExerciseEntity[];
	appointments: BreathingAppointmentEntity[];
};

export type UseHomeReturn = {
	title: string;
	filteredAppointments: BreathingAppointmentEntity[];
	incompleteExercises:
		| BreathingExerciseEntity[]
		| BreathingAppointmentEntity[]
		| undefined;
};

export function useHome(params: UseHomeParams): UseHomeReturn {
	const { exercises, appointments } = params;
	const filteredAppointments = useGetAppointments(appointments);
	const ordedExercises = useExerciseOrderedByLastProgress(exercises);
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

	return {
		title: getHeaderTitle(),
		filteredAppointments,
		incompleteExercises: incomplete.appointments || incomplete.exercises,
	};
}
