import styled, { css } from "styled-components/native";

import { Typography } from "../../Typography";
import type { MenuOption as TMenuOption } from "@/contexts/MenuContext/@types/menu-option";

export type MenuOptionProps = TMenuOption;

export const MenuOption = (props: MenuOptionProps) => {
	const { text, onPress, icon } = props;
	return (
		<Container onPress={onPress} activeOpacity={0.8}>
			{icon && <Icon>{icon({ color: "#fff", size: 20 })}</Icon>}
			<Text>{text}</Text>
		</Container>
	);
};

const Container = styled.TouchableOpacity`
	${({ theme }) => css`
		flex-direction: row;
		align-items: center;
		gap: ${theme.spaces[3]};
		padding: ${theme.spaces[1]} 0px;
	`}
`;

const Icon = styled.View`
	${({ theme }) => css`
		width: 44px;
		height: 44px;
		align-items: center;
		justify-content: center;
		border-radius: ${theme.rounded.regular};
		border: 1.5px solid ${theme.colors.overlay};
		background-color: ${theme.colors.utils.darkGray};
	`}
`;

const Text = styled(Typography.Title)`
	${({ theme }) => css`
		font-size: ${theme.fontSizes.regular};
	`}
`;
