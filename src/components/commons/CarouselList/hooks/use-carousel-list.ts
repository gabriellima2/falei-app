import { useRef } from "react";
import { ViewToken, FlatList } from "react-native";

type UseCarouseListParams = {
	changeCurrentItem: (item: number) => void;
};

type UseCarouseListReturn<TData extends {}> = {
	ref: React.MutableRefObject<FlatList<TData> | null>;
	handleViewableChange: React.MutableRefObject<
		(params: HandleViewableChangeParams) => void
	>;
	scrollToIndex: (indexItem: number) => void;
};

type HandleViewableChangeParams = {
	changed: ViewToken[];
};

export function useCarouseList<TData extends {}>(
	params: UseCarouseListParams
): UseCarouseListReturn<TData> {
	const { changeCurrentItem } = params;

	const ref = useRef<FlatList<TData> | null>(null);

	const handleViewableChange = useRef((params: HandleViewableChangeParams) => {
		const { changed } = params;
		if (!changed[0].isViewable) return;
		changeCurrentItem(changed[0].index as number);
	});

	const scrollToIndex = (indexItem: number) => {
		if (!ref.current) return;
		ref.current.scrollToIndex({ animated: true, index: indexItem });
	};

	return {
		ref,
		handleViewableChange,
		scrollToIndex,
	};
}
