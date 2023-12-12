import { useGetIncompleteExercises } from "@/hooks";

import { hasAppointmentToday } from "@/helpers/has-appointment-today";
import type {
	BreathingExerciseEntity,
	BreathingAppointmentEntity,
} from "@/entities/breathing-entities";

export type UseGetIncompleteBreathingExercisesParams = {
	exercises: BreathingExerciseEntity[];
	appointments: BreathingAppointmentEntity[];
};

export function useGetIncompleteBreathingExercises(
	params: UseGetIncompleteBreathingExercisesParams
) {
	const { exercises, appointments } = params;
	const incompleteExercises = useGetIncompleteExercises(exercises);
	const incompleteAppointments = useGetIncompleteExercises(
		appointments,
		(appointment) => hasAppointmentToday(appointment.scheduled_at.days)
	);
	return {
		exercises: incompleteExercises,
		appointments: incompleteAppointments,
	};
}
