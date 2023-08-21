import Ionicons from "@expo/vector-icons/Ionicons";
import { SmallButton } from "../commons";
import styled from "styled-components/native";
import { Indicator } from "../commons/Indicator";

export type NotificationButtonProps = {
	hasNewNotifications?: boolean;
};

export const NotificationButton = (props: NotificationButtonProps) => {
	const { hasNewNotifications } = props;
	return (
		<Container>
			{hasNewNotifications && (
				<Indicator accessibilityLabel="Indicador de novas notificações" />
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

const Container = styled.View``;

const Button = styled(SmallButton)`
	flex: none;
`;
