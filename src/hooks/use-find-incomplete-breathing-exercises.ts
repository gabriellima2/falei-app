import { useOrderExercisesByLastProgress } from "./use-order-exercises-by-last-progress";
import { useGetIncompleteExercises } from "./use-get-incomplete-exercises";

import { hasAppointmentToday } from "@/helpers/has-appointment-today";
import type {
	BreathingExerciseEntity,
	BreathingAppointmentEntity,
} from "@/entities/breathing-entities";

export type UseFindIncompleteBreathingExercisesParams = {
	exercises: BreathingExerciseEntity[];
	appointments: BreathingAppointmentEntity[];
};

export function useFindIncompleteBreathingExercises(
	params: UseFindIncompleteBreathingExercisesParams
) {
	const { exercises, appointments } = params;
	const orderedExercises = useOrderExercisesByLastProgress(exercises);
	const incompleteExercises = useGetIncompleteExercises(orderedExercises);
	const incompleteAppointments = useGetIncompleteExercises(
		appointments,
		(appointment) => hasAppointmentToday(appointment.scheduled_at.days)
	);

	const getIncompleteExercises = () => {
		if (incompleteExercises && incompleteAppointments)
			return [...incompleteExercises, ...incompleteAppointments];
		if (incompleteExercises) return incompleteExercises;
		if (incompleteAppointments) return incompleteAppointments;
		return [];
	};

	return getIncompleteExercises();
}
