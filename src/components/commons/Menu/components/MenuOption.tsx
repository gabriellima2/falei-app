import styled from "styled-components/native";

import { Typography } from "../../Typography";
import type { MenuOption as TMenuOption } from "@/contexts/MenuContext/@types/menu-option";

export type MenuOptionProps = TMenuOption;

export const MenuOption = (props: MenuOptionProps) => {
	const { text, onPress, icon } = props;
	return (
		<Container onPress={onPress}>
			{icon && <Icon>{icon({ color: "#fff", size: 24 })}</Icon>}
			<Text>{text}</Text>
		</Container>
	);
};

const Container = styled.TouchableOpacity``;

const Icon = styled.View``;

const Text = styled(Typography.Title)``;
