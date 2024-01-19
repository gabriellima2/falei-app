import styled, { css } from "styled-components/native";

import { Text, TextProps } from "./Text";
import { removePercentage } from "@/helpers/remove-percentage";

type TextBlockProps = TextProps & {
	lines?: number;
	renderTheLastWithSmallerWidth?: boolean;
};

export const TextBlock = (props: TextBlockProps) => {
	const { lines, width = 180, renderTheLastWithSmallerWidth, ...rest } = props;

	const itemWidth = removePercentage(width.toString());
	const lastItemWidth = renderTheLastWithSmallerWidth
		? itemWidth - 30
		: itemWidth;

	return (
		<Container>
			{[...new Array(lines)].map((_, i) => (
				<Text
					key={i}
					{...rest}
					width={i + 1 === lines ? lastItemWidth : itemWidth}
				/>
			))}
		</Container>
	);
};

const Container = styled.View`
	${({ theme }) => css`
		gap: ${theme.spaces[2]};
	`}
`;
