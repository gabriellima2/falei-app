import { Typography } from "@/components/commons";

export const EmptyAppointments = () => {
	return (
		<Typography.Title testID="empty-data-message">
			Não há lembretes para essa semana !
		</Typography.Title>
	);
};
