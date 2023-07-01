import styled, { css } from "styled-components/native";
import type { TextProps } from "react-native";

import { Typography } from "../Typography";

type TextErrorProps = Omit<TextProps, "accessibilityRole">;

export const TextError = (props: TextErrorProps) => (
	<Text {...props} accessibilityRole="alert" />
);

const Text = styled(Typography.Paragraph)`
	${({ theme }) => css`
		color: ${theme.colors.feedbacks.alert};
	`}
`;
