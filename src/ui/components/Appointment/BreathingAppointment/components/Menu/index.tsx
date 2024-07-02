import { useMenuContext } from "@/contexts/MenuContext";
import { MenuButton } from "@/ui/atoms";

import { useGetAppointmentInteractions } from "./hooks/use-get-appointment-interactions";

type MenuProps = {
	appointmentId: string;
	notificationId: string;
};

export const Menu = (props: MenuProps) => {
	const { appointmentId, notificationId } = props;
	const { handleToggle } = useMenuContext();
	const interactions = useGetAppointmentInteractions({
		appointmentId,
		notificationId,
	});
	return <MenuButton onPress={() => handleToggle(interactions)} />;
};
