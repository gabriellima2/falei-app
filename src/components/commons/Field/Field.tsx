import styled, { css } from "styled-components/native";

import { Input, InputProps } from "../Input";
import { TextError } from "../Errors";
import { Label } from "../Label";

export type FieldProps = Omit<
	InputProps,
	"accessibilityLabelledBy" | "isInvalid"
> & {
	labelText: string;
	labelId: string;
	errorMessage?: string;
};

export const Field = (props: FieldProps) => {
	const { labelId, labelText, errorMessage, ...rest } = props;
	const hasError = !!errorMessage;
	return (
		<Container>
			<Label id={labelId}>{labelText}</Label>
			<Input
				{...rest}
				isInvalid={hasError}
				aria-labelledby={labelId}
				accessibilityLabelledBy={labelId}
			/>
			<Error accessibilityLiveRegion="polite" aria-live="polite">
				{hasError && <TextError>{errorMessage}</TextError>}
			</Error>
		</Container>
	);
};

const Container = styled.View`
	${({ theme }) => css`
		gap: ${theme.spaces[3]};
	`}
`;

const Error = styled.View``;
