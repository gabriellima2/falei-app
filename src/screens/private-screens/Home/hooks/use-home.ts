import {
	useFilteredAppointments,
	useIncompleteBreathingExercises,
	useExerciseOrderedByLastProgress,
} from "@/hooks";

import { hasAppointmentToday } from "@/helpers/has-appointment-today";

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
	incomplete: {
		exercises: BreathingExerciseEntity[] | undefined;
		appointments: BreathingAppointmentEntity[] | undefined;
	};
};

export function useHome(params: UseHomeParams): UseHomeReturn {
	const { exercises, appointments } = params;
	const filteredAppointments = useFilteredAppointments(appointments);
	const ordedExercises = useExerciseOrderedByLastProgress(exercises);
	const incompleteExercises = useIncompleteBreathingExercises(ordedExercises);
	const incompleteAppointments = useIncompleteBreathingExercises(
		filteredAppointments,
		(appointment) => hasAppointmentToday(appointment.scheduled_at.days)
	);

	const incompleteAppointmentsTotal = incompleteAppointments?.length;
	const title = incompleteAppointmentsTotal
		? `Você tem ${incompleteAppointmentsTotal} exercícios em seus lembretes pendentes`
		: "Torne um exercício parte de sua rotina";

	return {
		title,
		filteredAppointments,
		incomplete: {
			exercises: incompleteExercises,
			appointments: incompleteAppointments,
		},
	};
}
