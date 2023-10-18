import { BreathingExerciseAppointment } from "./BreathingExerciseAppointment";
import { EmptyBreathingExerciseAppointments } from "./components";
import { HorizontalList } from "@/components/commons";

import type { BreathingExerciseAppointmentEntity } from "@/entities";

export type BreathingExerciseAppointmentsProps = {
	appointments: BreathingExerciseAppointmentEntity[];
};

export const BreathingExerciseAppointments = (
	props: BreathingExerciseAppointmentsProps
) => {
	const { appointments } = props;
	const doesItOnlyHaveOneEl = appointments?.length === 1;
	return (
		<HorizontalList<BreathingExerciseAppointmentEntity>
			data={appointments}
			keyExtractor={(item) => item.id}
			renderItem={({ item }) => (
				<BreathingExerciseAppointment
					autoSize={doesItOnlyHaveOneEl}
					title={item.title}
					rounds={item.rounds}
					scheduled_at={item.scheduled_at}
				/>
			)}
			ListEmptyComponent={EmptyBreathingExerciseAppointments}
		/>
	);
};
