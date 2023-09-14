import { ViewProps } from "react-native";
import styled from "styled-components/native";

import { BOTTOM_TAB_HEIGHT } from "../BottomTab";

type ScrollContainerProps = ViewProps & {
	isBottomTabRendered?: boolean;
};

export const ScrollContainer = (props: ScrollContainerProps) => {
	const { isBottomTabRendered, ...rest } = props;
	return (
		<Container
			{...rest}
			contentContainerStyle={{
				paddingBottom: isBottomTabRendered ? BOTTOM_TAB_HEIGHT + 16 : 0,
			}}
		/>
	);
};

const Container = styled.ScrollView``;