import {
	useFindIncompleteBreathingExercises,
	useWeekAppointments,
} from "@/hooks";

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
	weekAppointments: BreathingAppointmentEntity[];
	incompleteExercises: BreathingExerciseEntity[] | BreathingAppointmentEntity[];
};

export function useHomeState(params: UseHomeStateParams): UseHomeStateReturn {
	const { exercises, appointments } = params;
	const weekAppointments = useWeekAppointments(appointments);
	const incompleteExercises = useFindIncompleteBreathingExercises({
		exercises,
		appointments: weekAppointments,
	});

	const getHeaderTitle = () => {
		const appointmentsTotal = weekAppointments.length;
		return appointmentsTotal
			? `Você tem ${appointmentsTotal} exercício(s) em seus lembretes pendentes`
			: "Torne um exercício parte de sua rotina";
	};

	return {
		title: getHeaderTitle(),
		weekAppointments,
		incompleteExercises,
	};
}
