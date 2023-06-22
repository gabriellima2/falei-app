import { FlatList, View } from "react-native";

import { useCarouseList } from "./hooks";
import { Indicator } from "./components";

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
	const { ref, handleViewableChange, scrollToIndex } = useCarouseList<TData>({
		changeCurrentItem,
	});
	const dataAmount = data.length;

	return (
		<View>
			<FlatList<TData>
				data={data}
				testID="carousel"
				pagingEnabled
				ref={ref}
				horizontal
				accessibilityLiveRegion="polite"
				showsHorizontalScrollIndicator={false}
				onViewableItemsChanged={handleViewableChange.current}
				viewabilityConfig={{ viewAreaCoveragePercentThreshold: 95 }}
				accessibilityValue={{ max: dataAmount, min: 1, now: currentItem }}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => <Item {...item} />}
			/>
			<>
				{[...new Array(dataAmount)].map((_, i) => (
					<Indicator
						key={i}
						currentPosition={i}
						dataAmount={dataAmount}
						isActive={i === currentItem}
						handlePress={(item) => scrollToIndex(item)}
					/>
				))}
			</>
		</View>
	);
};
