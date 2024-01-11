import { ScrollViewProps } from "react-native";
import styled from "styled-components/native";

import { BOTTOM_TAB_HEIGHT } from "../components/BottomTab";

type ScrollContainerProps = ScrollViewProps & {
	horizontalSpacing?: boolean;
	isBottomTabRendered?: boolean;
};

export const ScrollContainer = (props: ScrollContainerProps) => {
	const { horizontalSpacing, isBottomTabRendered, ...rest } = props;
	return (
		<Container
			{...rest}
			showsVerticalScrollIndicator={false}
			contentContainerStyle={{
				paddingHorizontal: horizontalSpacing ? 16 : 0,
				paddingBottom: isBottomTabRendered ? BOTTOM_TAB_HEIGHT + 16 : 0,
			}}
		/>
	);
};

const Container = styled.ScrollView``;
