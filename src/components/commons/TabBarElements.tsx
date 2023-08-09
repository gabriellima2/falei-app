import styled, { css, useTheme } from "styled-components/native";

import { Typography } from "@/components";

import { capitalizeFirstLetter } from "@/helpers/capitalize-first-letter";
import type { IconStyles } from "@/@types/icon-styles";

type TabBarElementsProps = {
	label: string;
	Icon: (props: IconStyles) => JSX.Element;
};

type ElementProps = { focused: boolean };

export function TabBarElements(params: TabBarElementsProps) {
	const { label, Icon } = params;
	const { colors } = useTheme();
	return {
		tabBarIcon: ({ focused }: ElementProps) => (
			<Icon size={24} color={focused ? colors.brand : colors.font.primary} />
		),
		tabBarLabel: ({ focused }: ElementProps) => (
			<Label focused={focused}>{capitalizeFirstLetter(label)}</Label>
		),
	};
}

const Label = styled(Typography.Small)<ElementProps>`
	${({ theme, focused }) => css`
		font-family: ${theme.fontFamily.main.medium};
		color: ${focused ? theme.colors.brand : theme.colors.font.secondary};
	`}
`;
