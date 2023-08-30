import styled, { css } from "styled-components/native";

type ProgressProps = {
	value: string;
};

export const Progress = (props: ProgressProps) => {
	const { value } = props;
	return (
		<Container>
			<CurrentProgress testID="current-progress" value={value} />
		</Container>
	);
};

type CurrentProgressProps = Pick<ProgressProps, "value">;

const Bar = styled.View``;

const Container = styled(Bar)``;

const CurrentProgress = styled(Bar)<CurrentProgressProps>`
	${({ value = "0%" }) => css`
		width: ${value};
	`}
`;
