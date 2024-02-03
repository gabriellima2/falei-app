import styled, { css } from "styled-components/native";
import { NumberField, type NumberFieldProps } from "./Fields";

export type DefaultControlProps = Omit<NumberFieldProps, "label">;

const Root = styled.View`
	${({ theme }) => css`
		flex-wrap: wrap;
		flex-direction: row;
		gap: ${theme.spaces[5]};
	`}
`;

const Inhale = (props: DefaultControlProps) => (
	<NumberField label="Inspirar" {...props} />
);

const Hold = (props: DefaultControlProps) => (
	<NumberField label="Segurar" {...props} />
);

const Exhale = (props: DefaultControlProps) => (
	<NumberField label="Expirar" {...props} />
);

export const BreathingControl = {
	Root,
	Inhale,
	Hold,
	Exhale,
};
