import { useTheme } from "styled-components/native";

import { EmptyAppointments, Appointment } from "./components";
import { HorizontalList } from "@/components/commons";

import type { BreathingAppointmentEntity } from "@/entities/breathing-entities";

export type BreathingExerciseAppointmentsProps = {
	appointments: BreathingAppointmentEntity[];
};

export const BreathingExerciseAppointments = (
	props: BreathingExerciseAppointmentsProps
) => {
	const { appointments } = props;
	const { colors } = useTheme();
	const hasOneItem = appointments && appointments.length === 1;
	return (
		<HorizontalList<BreathingAppointmentEntity>
			data={appointments}
			keyExtractor={(item) => item.id}
			renderItem={({ item, index }) => (
				<Appointment
					autoSize={hasOneItem}
					title={item.title}
					rounds={item.rounds}
					scheduled_at={item.scheduled_at}
					color={Number(index) % 2 === 1 ? colors.utils.blue : colors.brand}
				/>
			)}
			ListEmptyComponent={EmptyAppointments}
		/>
	);
};
