import styled from "styled-components/native";
import { MoreVertical } from "lucide-react-native";
import { type TouchableOpacityProps } from "react-native";

import { theme } from "@/styles/theme";

type MenuButtonProps = TouchableOpacityProps;

export const MenuButton = (props: MenuButtonProps) => {
	return (
		<Button {...props}>
			<MoreVertical color={theme.colors.main} />
		</Button>
	);
};

const Button = styled.TouchableOpacity``;
