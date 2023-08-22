import styled from "styled-components/native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { SmallButton, Indicator } from "../commons";

export type NotificationButtonProps = {
	hasNewNotifications?: boolean;
};

export const NotificationButton = (props: NotificationButtonProps) => {
	const { hasNewNotifications } = props;
	return (
		<Container>
			{hasNewNotifications && (
				<NewNotificationsIndicator accessibilityLabel="Indicador de novas notificações" />
			)}
			<Button
				secondary
				accessibilityLabel="Notificações"
				accessibilityHint="Mostrará todas as notificações"
			>
				<Ionicons name="notifications-outline" size={20} />
			</Button>
		</Container>
	);
};

const Container = styled.View`
	position: relative;
`;

const NewNotificationsIndicator = styled(Indicator)`
	position: absolute;
	right: 2px;
	top: 2px;
	z-index: 100;
`;

const Button = styled(SmallButton)`
	flex: none;
`;
