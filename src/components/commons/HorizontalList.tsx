import { FlatList, FlatListProps } from "react-native";

type HorizontalListProps<TItem> = Omit<FlatListProps<TItem>, "horizontal">;

export const HorizontalList = <TItem extends {}>(
	props: HorizontalListProps<TItem>
) => {
	return (
		<FlatList
			showsHorizontalScrollIndicator={false}
			decelerationRate="normal"
			contentContainerStyle={{
				gap: 16,
				paddingBottom: 16,
			}}
			{...props}
			horizontal
		/>
	);
};
