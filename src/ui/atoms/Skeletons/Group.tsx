import { type PropsWithChildren } from "react";
import styled from "styled-components/native";

import { Text } from "./Text";

type GroupProps = PropsWithChildren & {
	withRightText?: boolean;
};

export const Group = (props: GroupProps) => {
	const { withRightText, children } = props;
	return (
		<Container>
			<Header>
				<Text width={185} variant="title" />
				{withRightText && <Text variant="small" width={50} />}
			</Header>
			{children}
		</Container>
	);
};

const Container = styled.View`
	gap: 16px;
`;

const Header = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;
