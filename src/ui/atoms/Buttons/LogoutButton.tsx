import styled from "styled-components/native";
import { LogOut } from "lucide-react-native";

import { BaseButton } from "./BaseButton";

type LogoutButtonProps = {
	onLogout?: () => Promise<void> | void;
};

export const LogoutButton = (props: LogoutButtonProps) => {
	const { onLogout } = props;
	return (
		<Button
			accessibilityHint="Você será desconectado e redirecionado para a página inicial"
			accessibilityLabel="Sair"
			onPress={onLogout}
			leftIcon={(props) => <LogOut {...props} />}
		>
			Sair
		</Button>
	);
};

const Button = styled(BaseButton)``;
