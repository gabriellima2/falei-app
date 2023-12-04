import styled, { css } from "styled-components/native";

import { Typography } from "@/components/commons";
import { dimensions } from "@/constants/dimensions";

export const EmptyAppointments = () => {
	return (
		<Container>
			<Message testID="empty-data-message">
				Você está livre de lembretes para essa semana
			</Message>
		</Container>
	);
};

const Container = styled.View`
	${({ theme }) => css`
		width: ${dimensions.screen.withMargin.width}px;
		flex: 1;
		border-radius: ${theme.rounded.md};
		padding: ${theme.spaces[3]};
		border: 1px solid ${theme.colors.overlay};
		background-color: ${theme.colors.utils.darkGray};
	`}
`;

const Message = styled(Typography.Paragraph)`
	${({ theme }) => css`
		color: ${theme.colors.font.primary};
		font-size: ${theme.fontSizes.regular};
	`}
`;
