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
		(appointment) => hasAppointmentToday(appointment.scheduledAt.days)
	);

	const getIncompleteExercisesWithoutAppointment = () => {
		return incompleteExercises.filter((exercise) => {
			return incompleteAppointments.some(
				(appointment) => exercise.id !== appointment.exerciseID
			);
		});
	};

	const getIncompleteExercises = () => {
		if (incompleteExercises && incompleteAppointments) {
			return [
				...incompleteAppointments,
				...getIncompleteExercisesWithoutAppointment(),
			];
		}
		if (incompleteExercises) return incompleteExercises;
		if (incompleteAppointments) return incompleteAppointments;
		return [];
	};

	return getIncompleteExercises();
}
