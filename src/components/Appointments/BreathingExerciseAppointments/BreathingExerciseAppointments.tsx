import { FlatList } from "react-native";

import { BreathingExerciseAppointment } from "./BreathingExerciseAppointment";
import { EmptyBreathingExerciseAppointments } from "./components";

import { BreathingExerciseAppointmentEntity } from "@/entities";

export type BreathingExerciseAppointmentsProps = {
	appointments: BreathingExerciseAppointmentEntity[];
};

export const BreathingExerciseAppointments = (
	props: BreathingExerciseAppointmentsProps
) => {
	const { appointments } = props;
	return (
		<FlatList<BreathingExerciseAppointmentEntity>
			data={appointments}
			keyExtractor={(item) => item.id}
			renderItem={({ item }) => (
				<BreathingExerciseAppointment
					title={item.title}
					rounds={item.rounds}
					scheduled_at={item.scheduled_at}
				/>
			)}
			ListEmptyComponent={EmptyBreathingExerciseAppointments}
			showsHorizontalScrollIndicator={false}
			horizontal
			contentContainerStyle={{ flex: 1 }}
		/>
	);
};
