import { useTheme } from "styled-components/native";

import { BreathingAppointment } from "@/ui/components";
import { EmptyDataMessage, HorizontalList } from "@/ui/atoms";

import type { BreathingAppointmentEntity } from "@/entities/breathing-entities";

export type BreathingAppointmentsProps = {
	appointments: BreathingAppointmentEntity[];
};

export const BreathingAppointments = (props: BreathingAppointmentsProps) => {
	const { appointments } = props;
	const { colors } = useTheme();
	const hasOneItem = appointments && appointments.length === 1;
	return (
		<HorizontalList<BreathingAppointmentEntity>
			data={appointments}
			keyExtractor={(item) => item.id}
			renderItem={({ item, index }) => (
				<BreathingAppointment
					title={item.title}
					rounds={item.rounds}
					scheduledAt={item.scheduledAt}
					steps={item.steps}
					autoSize={hasOneItem}
					color={Number(index) % 2 === 1 ? colors.utils.blue : colors.brand}
				/>
			)}
			ListEmptyComponent={() => (
				<EmptyDataMessage message="Você está livre de lembretes" />
			)}
		/>
	);
};
