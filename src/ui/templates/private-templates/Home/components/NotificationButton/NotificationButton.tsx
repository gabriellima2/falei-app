import styled from "styled-components/native";
import { Bell } from "lucide-react-native";

import { SmallButton } from "../../../../../atoms/Buttons/SmallButton";
import { Indicator } from "../../../../../atoms/Indicator";

import { theme } from "@/styles/theme";

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
				<Bell color={theme.colors.font.primary} size={20} />
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
