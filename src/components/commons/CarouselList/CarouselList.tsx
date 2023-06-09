import { useEffect } from "react";
import { FlatList } from "react-native";
import styled, { css } from "styled-components/native";

import { useCarouseList } from "./hooks";
import { CarouselIndicator } from "./components";

export type CarouselListProps<TData extends {}> = {
	data: TData[];
	currentItem: number;
	changeCurrentItem: (item: number) => void;
	Item: (props: TData) => JSX.Element;
};

type DefaultData = { id: string };

export const CarouselList = <TData extends DefaultData>(
	props: CarouselListProps<TData>
) => {
	const { currentItem, data, changeCurrentItem, Item } = props;
	const { ref, handleViewableChange, scrollToIndex, tryScrollingToIndexAgain } =
		useCarouseList<TData>({
			changeCurrentItem,
		});

	const dataAmount = data.length;
	useEffect(() => {
		if (currentItem < 0 || currentItem >= dataAmount) return;
		scrollToIndex(currentItem);
	}, [currentItem]);

	return (
		<Container>
			<FlatList<TData>
				data={data}
				testID="carousel"
				pagingEnabled
				ref={ref}
				horizontal
				initialScrollIndex={currentItem}
				onScrollToIndexFailed={({ index }) => tryScrollingToIndexAgain(index)}
				accessibilityLiveRegion="polite"
				showsHorizontalScrollIndicator={false}
				onViewableItemsChanged={handleViewableChange.current}
				viewabilityConfig={{ viewAreaCoveragePercentThreshold: 95 }}
				accessibilityValue={{ max: dataAmount, min: 1, now: currentItem }}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => <Item {...item} />}
			/>
			<Controls>
				{[...new Array(dataAmount)].map((_, i) => (
					<CarouselIndicator
						key={i}
						currentPosition={i}
						dataAmount={dataAmount}
						isActive={i === currentItem}
						handlePress={(item) => changeCurrentItem(item)}
					/>
				))}
			</Controls>
		</Container>
	);
};

const Container = styled.View`
	width: 100%;
	flex: 1;
	align-items: center;
`;

const Controls = styled.View`
	${({ theme }) => css`
		align-items: flex-start;
		flex-direction: row;
		gap: ${theme.spaces[3]};
		margin-bottom: ${theme.spaces[3]};
	`}
`;
