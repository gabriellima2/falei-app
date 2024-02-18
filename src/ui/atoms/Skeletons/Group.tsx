import { type ViewProps } from "react-native";
import styled from "styled-components/native";

import { Text } from "./Text";

type GroupProps = ViewProps & {
	withRightText?: boolean;
};

export const Group = (props: GroupProps) => {
	const { withRightText, children, ...rest } = props;
	return (
		<Container {...rest}>
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
