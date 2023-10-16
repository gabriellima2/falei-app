import {
	useFilteredAppointments,
	useIncompleteBreathingExercises,
} from "@/hooks";

import type {
	BreathingExerciseAppointmentEntity,
	BreathingExerciseEntity,
} from "@/entities";
import { hasAppointmentToday } from "@/helpers/has-appointment-today";

export type UseHomeParams = {
	exercises: BreathingExerciseEntity[];
	appointments: BreathingExerciseAppointmentEntity[];
};

export type UseHomeReturn = {
	title: string;
	filteredAppointments: BreathingExerciseAppointmentEntity[];
	incomplete: {
		exercises: BreathingExerciseEntity[] | undefined;
		appointments: BreathingExerciseAppointmentEntity[] | undefined;
	};
};

export function useHome(params: UseHomeParams): UseHomeReturn {
	const { exercises, appointments } = params;
	const filteredAppointments = useFilteredAppointments(appointments);
	const incompleteExercises = useIncompleteBreathingExercises(exercises);
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
