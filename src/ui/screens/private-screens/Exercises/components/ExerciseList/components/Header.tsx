import styled, { css } from "styled-components/native";
import { Typography } from "@/ui/components";

type HeaderProps = { title?: string };

export const Header = (props: HeaderProps) => {
	const { title } = props;
	return (
		<Container>
			<Title subtitle>{title}</Title>
		</Container>
	);
};

const Container = styled.View`
	${({ theme }) => css`
		padding-bottom: ${theme.spaces[3]};
	`}
`;

const Title = styled(Typography.Title)``;
