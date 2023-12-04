import styled, { css } from "styled-components/native";

export type ProgressProps = {
	value: number;
};

export const Progress = (props: ProgressProps) => {
	const { value } = props;
	const isGreaterThanOneHundredPercent = value > 100;
	return (
		<Container>
			<CurrentProgress
				testID="current-progress"
				width={isGreaterThanOneHundredPercent ? "100%" : `${value}%`}
			/>
		</Container>
	);
};

type CurrentProgressProps = { width: string };

const Bar = styled.View`
	width: 100%;
	height: 6px;
	border-radius: 16px;
`;

const Container = styled(Bar)`
	${({ theme }) => css`
		background-color: ${theme.colors.overlay};
	`}
`;

const CurrentProgress = styled(Bar)<CurrentProgressProps>`
	${({ theme, width = "0%" }) => css`
		width: ${width};
		background-color: ${theme.colors.utils.white};
	`}
`;
