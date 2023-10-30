import { EmptyAppointments, Appointment } from "./components";
import { HorizontalList } from "@/components/commons";

import type { BreathingExerciseAppointmentEntity } from "@/entities";

export type BreathingExerciseAppointmentsProps = {
	appointments: BreathingExerciseAppointmentEntity[];
};

export const BreathingExerciseAppointments = (
	props: BreathingExerciseAppointmentsProps
) => {
	const { appointments } = props;
	const hasOneItem = appointments && appointments.length === 1;
	return (
		<HorizontalList<BreathingExerciseAppointmentEntity>
			data={appointments}
			keyExtractor={(item) => item.id}
			renderItem={({ item }) => (
				<Appointment
					autoSize={hasOneItem}
					title={item.title}
					rounds={item.rounds}
					scheduled_at={item.scheduled_at}
				/>
			)}
			ListEmptyComponent={EmptyAppointments}
		/>
	);
};
