import styled, { css } from "styled-components/native";

import { TextBlock } from "./TextBlock";
import { Button } from "./Button";

import type { TextProps } from "./Text";

type HeaderProps = TextProps & {
	titleLines: number;
	withBackButton?: boolean;
	renderRight?: () => JSX.Element;
};

export const Header = (props: HeaderProps) => {
	const { titleLines, renderRight, withBackButton, ...rest } = props;
	return (
		<Container>
			<Content>
				{withBackButton && <Button variant="square" />}
				<TextBlock
					lines={titleLines}
					renderTheLastWithSmallerWidth={titleLines >= 2}
					variant="title"
					{...rest}
				/>
			</Content>
			{renderRight && renderRight()}
		</Container>
	);
};

const Container = styled.View`
	flex-direction: row;
	justify-content: space-between;
`;

const Content = styled.View`
	${({ theme }) => css`
		flex-direction: row;
		gap: ${theme.spaces[3]};
	`}
`;
