import { FlatList } from "react-native";
import { Indicator } from "./components";

export type CarouselListProps<TData extends {}> = {
	data: TData[];
	activeItem: number;
	Item: (props: TData) => JSX.Element;
};

export const CarouselList = <TData extends object>(
	props: CarouselListProps<TData>
) => {
	const { activeItem, data, Item } = props;
	const dataAmount = data.length;
	return (
		<FlatList<TData>
			data={data}
			testID="carousel"
			accessibilityValue={{ max: dataAmount, min: 1, now: activeItem }}
			renderItem={({ item }) => <Item {...item} />}
			ListFooterComponent={() => (
				<>
					{[...new Array(dataAmount)].map((_, index) => (
						<Indicator
							key={index}
							currentPosition={index + 1}
							dataAmount={dataAmount}
							isActive={index + 1 === activeItem}
							handlePress={(item) => console.log(item)}
						/>
					))}
				</>
			)}
		/>
	);
};
