import styled, { css } from "styled-components/native";

import {
	InputNumber,
	type InputNumberProps,
} from "@/ui/components/InputNumber";
import { Typography } from "@/ui/atoms";

type NumberFieldProps = InputNumberProps & {
	label: string;
};

export const NumberField = (props: NumberFieldProps) => {
	const { label, ...rest } = props;
	return (
		<Field>
			<Label>{label}</Label>
			<InputNumber {...rest} />
		</Field>
	);
};

const Field = styled.View`
	gap: 16px;
`;

const Label = styled(Typography.Small)`
	${({ theme }) => css`
		font-family: ${theme.fontFamily.main.medium};
		color: ${theme.colors.font.primary};
	`}
`;
