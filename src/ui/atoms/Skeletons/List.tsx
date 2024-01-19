import { FlatList, type FlatListProps } from "react-native";

type ListProps = Omit<
	FlatListProps<unknown>,
	"data" | "renderItem" | "keyExtractor" | "showsHorizontalScrollIndicator"
> & {
	amount?: number;
	renderItem: () => JSX.Element;
};

export const List = (props: ListProps) => {
	const { amount = 4, renderItem, ...rest } = props;
	return (
		<FlatList
			data={[...new Array(amount)]}
			renderItem={() => renderItem()}
			keyExtractor={(_, i) => i.toString() as string}
			contentContainerStyle={{ gap: 16 }}
			{...rest}
			showsHorizontalScrollIndicator={false}
		/>
	);
};
